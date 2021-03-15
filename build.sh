rm -rf ../fctorial.github.io/*
../ConstexprJS/constexpr.js "$@" --input=. --output=../fctorial.github.io --jobs 5 --exclusions=/collections:/tags/generator.html:/static/files:/static/js/constexpr/third_party --force --verbose
cp -r favicon.ico ../fctorial.github.io
