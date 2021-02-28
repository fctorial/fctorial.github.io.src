const article = document.querySelector('article');
const header = document.querySelector('header');

function render_base_page() {
  startLoading()
  document.head.appendChild(
    make_element(
      `<meta charset="UTF-8">`
    )
  )
  document.head.appendChild(
    make_element(
      `<link rel="icon" href="/favicon.png" sizes="420x420" type="image/png">`
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
  insertAfter(header, make_element(`<div style="width: 100%; height: 5px; margin: 1em 0 2em; border: solid black; border-width: 1px 0;"></div>`))
  const ne = document.createElement("nav")
  fetch("/collections/nav.json")
    .then(res => res.json())
    .then(nav_items => Object.keys(nav_items).forEach(name => {
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
      article.parentElement.insertBefore(ne, article)
      ne.appendChild(item)
    }))
    .then(() => finishLoading())
}

function setup_bg() {
  insertFirst(document.body, make_element('<div style="background: #00000044;z-index: -1; position: fixed; top: 0; left: 0; bottom: 0; right: 0; "></div>'))
  insertFirst(document.body, make_element('<img id="bg" src="/static/img/bg.jpg" style="z-index: -2; position: fixed; top: 0; left: 0; width: 100%; height: 100%; filter: blur(10px); transition: opacity 500ms;" />'))
}

function syntax_highlight() {
  startLoading()
  document.head.appendChild(
    make_element(`<link rel="stylesheet" href="/static/css/prism.css">`)
  )
  window.Prism = {manual: true}
  fetch("/static/js/constexpr/third_party/prism.js")
    .then(res => res.text())
    .then(code => eval(code))
    .then(() => {
      Promise.all([...document.querySelectorAll('prog[class]')].map(
        el => new Promise((resolve) => {
          Prism.highlightElement(el, null, () => resolve())
        })
      )).then(() => finishLoading())
    })
}

(() => {
  render_base_page()
  setup_bg()
  syntax_highlight()
})()

window.onfocus = () => {
  setTimeout(() => window.location.reload(), 100)
}
