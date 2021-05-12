#!/usr/bin/env node
const posts = require('../collections/posts.json')
const config = require('../collections/config.json')
const fs = require('fs')

let result = ''

posts.forEach(
  post => {
    let tags = ''
    post.tags.forEach(tag => {
      tags += `
      <category>${tag}</category>`
    })
    let description = ''
    if (post.description) {
      description = `<description>${post.description}</description>`
    }
    let comments = ''
    if (post.discussion) {
      comments = `<comments>${post.discussion}</comments>`
    }
    result = `
  <item>
      <title>${post.title}</title>
      <pubDate>${post.date}</pubDate>
      <link>${config.url}${post.url}</link>
      ${description}
      ${comments}
      ${tags}
  </item>` + result
  })

result = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">

<channel>
  <title>fctorial</title>
  <link>${config.url}</link>
  <description>A blog where I'll post (mostly tech related) stuff</description>
` + result

result += `

</channel>
</rss>`

fs.writeFileSync('static/rss.xml', result)
