export OUT=../fctorial.github.io/
rm -rf ${OUT:?}/*
./devtools/generate_rss.js &
constexpr.js "$@" --input=. --output=$OUT --entry /index.html --jobcount 10 --depfile devtools/deps.json
cp -r raw ${OUT}/raw
