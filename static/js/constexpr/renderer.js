let body_wrapper
const header = document.createElement('header')
const article = document.querySelector('article')
let footer

let global_cfg
let all_posts
let nav_items

async function render_base_page() {
  [
    '/collections/config.json',
    '/collections/intellij_logos.json',
    '/collections/nav.json',
    '/collections/posts.json',
    '/collections/projects.json'
  ].forEach(p => window._ConstexprJS_.addExclusion(p));
  [global_cfg, all_posts, nav_items] = await Promise.all(
    [
      fetch('/collections/config.json'),
      fetch('/collections/posts.json'),
      fetch('/collections/nav.json')
    ].map(p => p.then(res => res.json()))
  )

  const this_post = all_posts.filter(p => p.url === document.location.pathname)[0]

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
          `<link rel="stylesheet" href='/static/css/styles.css'>`
    )
  )
  document.head.appendChild(
    make_element(
      `<link rel="preconnect" href="https://fonts.gstatic.com">`
    )
  )
  document.head.appendChild(
    make_element(
      `<link href="https://fonts.googleapis.com/css2?family=Ubuntu+Condensed&display=swap" rel="stylesheet">`
    )
  )
  document.head.appendChild(
    make_element(
      `<link href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">`
    )
  )
  if (this_post) {
    document.head.appendChild(
      make_element(
        `<meta name="description" content="${this_post.description}">`
      )
    )
    document.head.appendChild(
      make_element(
        `<meta name="keywords" content="${this_post.tags.join(',')}">`
      )
    )
  }
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

  let heading = document.querySelector('#main_title');
  if (!heading) {
    let title
    if (this_post) {
      title = this_post.title
    }
    if (title) {
      heading = make_element(`<h1 id="main_title">${title}</h1>`)
    } else {
      heading = make_element(`<h1 id="main_title"></h1>`)
    }
  }
  header.appendChild(heading)
  document.head.appendChild(
    make_element(`<title>${heading.textContent}</title>`)
  )

  if (this_post) {
    const tags_el = make_element(`<ul class="tags_list"></ul>`)
    this_post.tags.forEach(tag => tags_el.appendChild(make_element(`<li><a class="tag_element" href="/tags/generator.html?${tag}">${tag}</a></li>`)))
    header.appendChild(tags_el)
  }

  header.appendChild(make_element(`<div style="width: calc(100% - 2em); height: 5px; margin: 1em auto 0; border: solid black; border-width: 1px 0;"></div>`))

  const ne = document.createElement("nav")
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

  footer = make_element(`
<footer>
    <div class="links">
        <div class="social">
            <div class="footer-title">Share this page:</div>
            <a rel="noopener" title="twitter" class="svg-icon twitter" target="_blank" href="https://twitter.com/share?text=${document.querySelector('title').textContent}&url=${global_cfg.url + window.location.pathname}"></a>
            <a rel="noopener" title="facebook" class="svg-icon facebook" target="_blank" href="https://www.facebook.com/sharer.php?u=${global_cfg.url + window.location.pathname}"></a>
            <a rel="noopener" title="reddit" class="svg-icon reddit" target="_blank" href="https://www.reddit.com/submit?title=${document.querySelector('title').textContent}&url=${global_cfg.url + window.location.pathname}"></a>
        </div>
        <div class="social">
            <div class="footer-title">Contacts:</div>
            <a rel="noopener" title="github" href="https://github.com/fctorial" class="svg-icon github"></a>
            <a rel="noopener" title="twitter" href="https://twitter.com/fctorial1" class="svg-icon twitter"></a>
            <a rel="noopener" title="email" href="mailto:fctorial@gmail.com" class="svg-icon email"></a>
        </div>
    </div>
</div>
</footer>
`)
  if (this_post && this_post.discussion) {
    footer.appendChild(make_element(`<a rel="noopener" class="discussion" target="_blank" href="${this_post.discussion}">Join the discussion here</a>`))
  }

  article.remove()
  body_wrapper = make_element(`<div id="body_wrapper" class="first_body_wrapper"></div>`)
  body_wrapper.appendChild(header)
  body_wrapper.appendChild(article)
  body_wrapper.appendChild(footer)

  document.body.appendChild(body_wrapper)

  document.querySelectorAll('img:not([alt])').forEach(el => el.setAttribute('alt', ''))
}

function setup_bg() {
  insertFirst(document.body, make_element('<img class="bg" id="main_bg" src="/static/img/bg.jpg" />'))
}

async function fetchFile(path) {
  return await (await fetch(path)).text()
}

async function evalScript(path) {
  window._ConstexprJS_.addExclusion(path)
  eval(await fetchFile(path))
}

async function syntax_highlight() {
  document.querySelectorAll('prog, progi').forEach(el => {
    el.setAttribute('role', 'figure')
    el.textContent = el.textContent.trim()
  })
  const els = [...document.querySelectorAll('prog[class]')]
  if (els.length > 0) {
    window.Prism = {manual: true};
    await evalScript("/static/js/constexpr/third_party/prism.js")
    document.head.appendChild(
      make_element(`<link rel="stylesheet" href="/static/css/prism.css">`)
    )
    await Promise.all(els.map(
      el => new Promise((resolve) => {
        Prism.highlightElement(el, null, () => resolve())
      })
    ))
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
  window.onfocus = () => {
    // setTimeout(() => window.location.reload(), 200)
  }
}
