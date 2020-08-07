PUBLIC_URL="$1"
REACT_APP="$(env | grep REACT_APP)"
echo "window.env = {" > $PUBLIC_URL
while read -r line || [[ -n "$line" ]];
do
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')

    value=$(printf '%s\n' "${!varname}")
    [[ -z $value ]] && value=${varvalue}
    echo "  $varname: \"$value\"," >> $PUBLIC_URL
  fi
done <<<"$REACT_APP"
echo "}" >> $PUBLIC_URL
