rm -rf ../fctorial.github.io/*
node ../ConstexprJS/constexpr.js --input=. --output=../fctorial.github.io --jobs 5 --exclusions=/demos:/collections:/_template.html --force "$@"
cp -r demos ../fctorial.github.io
