export OUT=../fctorial.github.io/
rm -rf ${OUT:?}/*
./devtools/generate_rss.js &
../ConstexprJS/constexpr.js "$@" --input=. --output=$OUT --entry /index.html --jobcount 10 --exclusion /collections --depfile devtools/deps.json
cp -r raw ${OUT}/raw
