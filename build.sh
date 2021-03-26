rm -rf ../fctorial.github.io/*
../ConstexprJS/constexpr.js "$@" --input=. --output=../fctorial.github.io --entry /index.html --jobcount 10 --exclusion /collections --exclusion /raw --depfile deps.json
cp -r raw ../fctorial.github.io/raw
