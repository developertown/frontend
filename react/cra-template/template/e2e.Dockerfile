FROM cypress/base:12.14.1

ENV CI=1
ARG CYPRESS_VERSION="5.3.0"
ARG CYPRESS_TESTING_LIBRARY_VERSION="^7.0.1"
ARG TYPESCRIPT_VERSION="^4.0.3"
WORKDIR /e2e

RUN echo "whoami: $(whoami)"
RUN npm config -g set user $(whoami)
RUN npm install "cypress@${CYPRESS_VERSION}" "typescript@${TYPESCRIPT_VERSION}" "@testing-library/cypress@${CYPRESS_TESTING_LIBRARY_VERSION}"
ENV PATH ./node_modules/.bin:$PATH
RUN cypress verify
