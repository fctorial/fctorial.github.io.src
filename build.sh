rm -rf ../fctorial.github.io/*
constexpr.js "$@" --input=. --output=../fctorial.github.io --jobs 5 --exclusions=/demos:/collections:/static/js/constexpr/third_party --force --verbose
#cp -r demos favicon.png ../fctorial.github.io
