rm -rf ../fctorial.github.io/*
constexpr.js "$@" --input=. --output=../fctorial.github.io --jobs 5 --exclusions=/demos:/collections:/_template.html:/static/js/constexpr/prism.js --force --verbose
cp -r demos favicon.png ../fctorial.github.io
