rm -rf ../fctorial.github.io/*
../ConstexprJS/constexpr.js "$@" --input=. --output=../fctorial.github.io --entry /index.html --jobcount 10 --exclusion /collections --depfile devtools/deps.json
cp -r raw ../fctorial.github.io/raw
