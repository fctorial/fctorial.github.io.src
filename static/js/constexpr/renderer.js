const header = document.createElement('header')
const article = document.querySelector('article');

async function render_base_page() {
  document.head.appendChild(
    make_element(
      `<meta charset="UTF-8">`
    )
  )
  document.head.appendChild(
    make_element(
      `<link rel="icon" href="/favicon.ico" sizes="32x32" type="image/x-icon">`
    )
  )
  document.head.appendChild(
    make_element(
      `<meta name="viewport" content="width=device-width, min-width=800">`
    )
  )
  document.head.appendChild(
    make_element(
      `<link rel="stylesheet" href="/static/css/global_styles.css">`
    )
  )
  document.head.appendChild(
    make_element(`
<style constexpr>
    body {
        border: 2px solid red;
    }
</style>
  `)
  )
  insertFirst(document.body, make_element(`<noscript constexpr>Please enable javascript</noscript>`))

  const all_posts = await fetch('/collections/posts.json').then(res => res.json())
  const this_post = all_posts.filter(p => p.url === document.location.pathname)[0]

  let heading = document.querySelector('#main_title');
  if (! heading) {
    let title
    if (this_post) {
      title = this_post.title
    }
    if (title) {
      heading = make_element(`<h1 id="main_title">${title}</h1>`)
    } else {
      heading = make_element(`<h1 id="main_title"></h1>`)
    }
    header.appendChild(heading)
  }
  document.head.appendChild(
    make_element(`<title>${heading.textContent}</title>`)
  )

  if (this_post) {
    const tags_el = make_element(`<ul class="tags_list"></ul>`)
    this_post.tags.forEach(tag => tags_el.appendChild(make_element(`<li><a class="tag_element" href="/tags/generator.html?${tag}">${tag}</a></li>`)))
    header.appendChild(tags_el)
  }

  header.appendChild(make_element(`<div style="width: 100%; height: 5px; margin: 1em 0 0; border: solid black; border-width: 1px 0;"></div>`))

  const ne = document.createElement("nav")
  const nav_items = await fetch("/collections/nav.json").then(res => res.json())
  Object.keys(nav_items).forEach(name => {
    const item = make_element(
      `
          <a href="${nav_items[name]}">
              ${name}
          </a>
          `
    )
    if (nav_items[name] === window.location.pathname || nav_items[name] + 'index.html' === window.location.pathname) {
      item.classList.add("current")
    }
    ne.appendChild(item)
  })
  insertFirst(header, ne)


  const footer = make_element(`
<footer>
    <div class="social">
        <a title="github" href="https://github.com/fctorial" class="svg-icon github"></a>
        <a title="twitter" href="https://twitter.com/fctorial1" class="svg-icon twitter"></a>
        <a title="email" href="mailto:fctorial@gmail.com" class="svg-icon email"></a>
        <a title="rss" href="/static/rss.xml" class="svg-icon rss"></a>
    </div>
</footer>
`)
  if (this_post) {
    footer.appendChild(make_element(`<a class="discussion" target="_blank" href="${this_post.discussion}">Join the discussion here</a>`))
  }

  const bw = make_element(`<div id="body_wrapper"></div>`)
  bw.appendChild(header)
  bw.appendChild(article)
  bw.appendChild(footer)

  document.body.appendChild(bw)

  document.querySelectorAll('img:not([alt])').forEach(el => el.setAttribute('alt', ''))
}

function setup_bg() {
  insertFirst(document.body, make_element('<img class="bg" id="main_bg" src="/static/img/bg.jpg" />'))
}

async function fetchFile(path) {
  return await (await fetch(path)).text()
}

async function evalScript(path) {
  window._ConstexprJS_.addExclusions([path])
  eval(await fetchFile(path))
}

async function syntax_highlight() {
  document.querySelectorAll('prog').forEach(el => {
    el.textContent = el.textContent.trim()
  })
  const els = [...document.querySelectorAll('prog[class]')]
  if (els.length > 0) {
    window.Prism = {manual: true};
    await evalScript("/static/js/constexpr/third_party/prism.js")
    await Promise.all(els.map(
      el => new Promise((resolve) => {
        Prism.highlightElement(el, null, () => resolve())
      })
    ))
    document.head.appendChild(
      make_element(`<link rel="stylesheet" href="/static/css/prism.css">`)
    )
  }
}

async function render_latex() {
  const blocks = document.querySelectorAll('formula')
  if (blocks.length > 0) {
    await evalScript("/static/packages/katex/katex.js")
    await evalScript("/static/packages/katex/contrib/auto-render.js")
    document.head.appendChild(make_element(`<link rel="stylesheet" href="/static/packages/katex/katex.css">`))
    blocks.forEach(block => renderMathInElement(block))
  }
}

async function site_global_rendering() {
  setup_bg()
  await Promise.all([render_base_page(), syntax_highlight(), render_latex()])
}

window.onfocus = () => {
  // setTimeout(() => window.location.reload(), 150)
}
