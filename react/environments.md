# Environments

DeveloperTown projects will typcially utitlize at least **two** deployed environments. A typical setup will include a `Test` environment used internally by developers to verify working code as it is integrated into the larger application. DeveloperTown projects _may_ promote code changes directly from the `Test` environment to a `Production` environment in the simpliest of configurations. Depending on project/client need there may be additional environments such as `Staging`, `UAT`, `Perf`, etc that sit between the `Test` environment and the `Production` environment to facilitate specific testing needs.

## Managing Configuration for multiple environments

When we start to consider multiple environments, `Test`, `Production`, etc we also need to start thinking about the parts of our applications that may be different for each environment. For example an application that uses Google Analytics for user Analytics may require different values for `TrackingID` in the `Test` environment vs the `Production` environment. Other scenarios where data may be configurable on a per environment basis might include: base urls for apis or authorization providers, client ids for oauth flows, and many more.

### Create React App Environment Variables

Create React App has [documentation](https://create-react-app.dev/docs/adding-custom-environment-variables) talking about Environment Variables. If you are familar with environment variables in NodeJS or pretty much any backend development environment, Create React App's environment variables will seem very familar and will "just work" in a local development environment

```sh
REACT_APP_MY_ENVIRONMENT_DEPENDENT_VALUE="value in dev mode" yarn start
```

```tsx
const Example: React.FC = () => {
  return <h1>{process.env.REACT_APP_MY_ENVIRONMENT_DEPENDENT_VALUE}</h1>;
};
```

Perfect, The value you want shows up in the React App.

#### Well maybe...

As the Create React App documentation correctly points out these environment variables are baked in at build time

> The environment variables are embedded during the build time. Since Create React App produces a static HTML/CSS/JS bundle, it can’t possibly read them at runtime.

If you've worked with environment variables on the backend you may understandably find this to be confusing. Using Create React App Environment variables can cause some unexpected behavior due to the way we like to think about Deploying code.

At DeveloperTown we typically like to create our CI/CD pipelines in such a way that they produce a build artifact (static HTML/CSS/JS) **once** which is _promoted_ from one environment to the next to ensure confidence the code will work exactly the same from one environment to the next. In backend apis we can easily build a binary that is promoted from one environment to the next. The built binary in the backend deployment can consume environment variables at runtime. However, this strategy does not translate as well to frontend applications because the "environment" variables are replaced at build time with the value provided on the build server. This means the value of the environment variable will be identical for each and every environment the build artifacts are deployed which works quite differently than backend systems.

#### So what do we do...

Option 1:

Create a unique build for each and every environment we are deploying the application to by providing the proper environment variables for each build at the time the assets are built.

Downsides

- Storage of multiple copies of the same code
- If new environments are added we may not have a suitable build for that environment
- The built code is technically different from environment to environment which _could_ reduce confidence as we promote changes through the process.
- The values of the environment variables are determined at **build** time which could be days, weeks or even months from **deploy** time. In the period between **build** and **deploy** it is possible a value of one environment variable could change. If an environment variable change occurs it would require new code be built to avoid stale values from being used.
- To mitigate the gap between **build** and **deploy** time we could build code as part of the deploy to a particular environment. The risk associated with this approach is that our deploys are fairly dependent on the ability to build source code.

Option 2:

Create a single build for all environment we are deploying the application to but provide a file that can be generated at runtime by the hosting environment. (see Runtime Variables with Docker)

Downsides

- Does not work in all deployment strategies

### Runtime Variables with Docker

We can create the illusion of true environment variable support within web applications through the use of global variables defined on `window` by loading a javascript file during page load.

#### index.html

The index.html file or whereever the application's entry point exists needs to be updated to include an additional script.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
    <script src="%PUBLIC_URL%/env.js"></script>
  </head>
  <body>
    ...
    <div id="root"></div>
  </body>
</html>
```

#### env.js

The env.js file below is an example. In reality a file like this will be generated using a script described below.

```js
window.env = {
  REACT_APP_MY_ENVIRONMENT_DEPENDENT_VALUE: "value in dev mode",
};
```

#### Application Code

```tsx
export type CustomWindow = Window & {
  env?: {
    REACT_APP_MY_ENVIRONMENT_DEPENDENT_VALUE: string;
  };
};

const Example: React.FC = () => {
  const runtime: CustomWindow = window;

  return <h1>{runtime.env?.REACT_APP_MY_ENVIRONMENT_DEPENDENT_VALUE}</h1>;
};
```

The key in enabling this strategy is to create the contents of `env.js` during the startup of the container hosting the the static content vs defining the values at **build** or **deploy** time as would be required by the functionality supported by Create React App out of the box. This works reasonably well in Docker based environments through customization of the `CMD` command.

#### Building env.js at startup with env.sh

To create env.js when the server first starts we need a script. The following script will read the environment variables from the server / container, filter the full list of environment variables to only those with the prefix `REACT_APP` to avoid leaking sensitive secrets. The `REACT_APP` environment variables are then converted to a javascript object which is assigned to `window.env` and written to a file called `env.js`

```sh
PUBLIC_URL="$1"
rm -rf $PUBLIC_URL
touch $PUBLIC_URL
REACT_APP="$(env | grep REACT_APP)"
echo "window.env = {" >> $PUBLIC_URL
while read -r line || [[ -n "$line" ]];
do
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi
  value=$(printf '%s\n' "${!varname}")
  [[ -z $value ]] && value=${varvalue}
  echo "  $varname: \"$value\"," >> $PUBLIC_URL
done <<<"$REACT_APP"
echo "}" >> $PUBLIC_URL
```

with the introduction of this script, it is now possible to refresh the environment variables in the application simply by running the `env.sh` script. For simplicity we can configure docker to run the env.sh file as part of the docker `CMD` to ensure any environment variables passed to the docker container are available to the react app.

```dockerfile
FROM nginx
COPY build /usr/share/nginx/html
COPY ./env.sh .
RUN chmod +x env.sh

CMD bash -c "./env.sh /usr/share/nginx/html/env.js" && nginx -g 'daemon off;'
```

now simply by running

```
docker run -it -p 8080:80 -e REACT_APP_MY_ENVIRONMENT_DEPENDENT_VALUE='value for this environment' image_name
```

The environment variables provided to docker run will be made available to the application via the env.js file. Changing the environment variables is as simple as restarting the container with a different configuration which is very similar to environment variables work in other parts of the system.

## Sensitive Data

The content above discusses a few approaches for enabling configuration in frontend applications. It should be noted that with any of the strategies above the configuration values are stored in plaintext either as part of the application bundle or in a separate script file. In all cases care should be given to ensure that values that are intended to be remain truly secret are not accidently leaked. Whitelisting environment variables to only those with the prefix `REACT_APP` is an attempt to reduce the likelihood of leaking secrets.
