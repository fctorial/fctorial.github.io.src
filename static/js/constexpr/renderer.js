const article = document.querySelector('article');
let header = document.querySelector('header');

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
  let this_post
  if (! header) {
    const posts = await (await fetch('/collections/posts.json')).json()
    this_post = posts.filter(p => p.url === document.location.pathname)[0]
    let title
    if (this_post) {
      title = this_post.title
    }
    if (title) {
      header = make_element(`<header><h3 id="main_title">${title}</h3></header>`)
    } else {
      header = make_element(`<header><h3 id="main_title"></h3></header>`)
    }
    insertFirst(article, header)
  }
  document.head.appendChild(
    make_element(`<title>${header.innerText}</title>`)
  )
  insertFirst(document.body, make_element(`<noscript constexpr>Please enable javascript</noscript>`))

  insertAfter(header, make_element(`<div style="width: 100%; height: 5px; margin: 1em 0 2em; border: solid black; border-width: 1px 0;"></div>`))

  if (this_post) {
    const tags_el = make_element(`<div id="tags_list"></div>`)
    this_post.tags.forEach(tag => tags_el.appendChild(make_element(`<a href="/tags/generator.html?${tag}"><div>${tag}</div></a>`)))
    insertAfter(header, tags_el)
  }

  const ne = document.createElement("nav")
  const nav_items = await (await fetch("/collections/nav.json")).json()
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
    insertBefore(article, ne)
    ne.appendChild(item)
  })
}

function setup_bg() {
  insertFirst(document.body, make_element('<img class="bg" id="main_bg" src="/static/img/bg.jpg" />'))
}

async function syntax_highlight() {
  document.head.appendChild(
    make_element(`<link rel="stylesheet" href="/static/css/prism.css">`)
  )
  window.Prism = {manual: true};
  const code = await (await fetch("/static/js/constexpr/third_party/prism.js")).text()
  eval(code)
  await Promise.all([...document.querySelectorAll('prog[class]')].map(
    el => new Promise((resolve) => {
      el.textContent = el.textContent.trim()
      Prism.highlightElement(el, null, () => resolve())
    })
  ))
}

async function render_page() {
  setup_bg()
  await Promise.all([render_base_page(), syntax_highlight()])
}

window.onfocus = () => {
  setTimeout(() => window.location.reload(), 100)
}
