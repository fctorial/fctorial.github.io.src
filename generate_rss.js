#!/usr/bin/env node
const posts = require('./collections/posts.json')
const fs = require('fs')

let result = ''

posts.forEach(
  post => {
    let tags = ''
    post.tags.forEach(tag => {
      tags += `
      <category>${tag}</category>`
    })
    result = `
  <item>
      <title>${post.title}</title>
      <pubDate>${post.date}</pubDate>
      <link>https://fctorial.github.io${post.url}</link>
      ${tags}
  </item>` + result
  })

result = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">

<channel>
  <title>fctorial</title>
  <link>https://fctorial.github.io</link>
  <description>A blog where I'll post (mostly tech related) stuff</description>
` + result

result += `

</channel>
</rss>`

fs.writeFileSync('static/rss.xml', result)
