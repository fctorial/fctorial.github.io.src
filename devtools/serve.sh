(sleep 1; google-chrome-stable --new-window http://localhost:1750)
sass --watch static/scss/styles.scss:static/css/styles.css --style compressed&
SASS_JOB=$!
http-server -p 1750
kill -9 $SASS_JOB
