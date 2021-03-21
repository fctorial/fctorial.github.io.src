rm -rf ../fctorial.github.io/*
../ConstexprJS/constexpr.js "$@" --input=. --output=../fctorial.github.io --jobs 10 --exclusions=/collections:/tags/generator.html:/static/files --force --verbose --depfile deps.json
