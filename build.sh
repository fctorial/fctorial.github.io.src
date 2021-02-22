rm -rf ../fctorial.github.io/*
constexpr.js "$@" --input=. --output=../fctorial.github.io --jobs 5 --exclusions=/demos:/collections:/_template.html --force --verbose
cp -r demos ../fctorial.github.io
cp serve.sh ../fctorial.github.io
