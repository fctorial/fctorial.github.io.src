const article = document.querySelector('article');

function render_base_page() {
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
      `<meta name="viewport" content="width=device-width">`
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
  document.body.insertBefore(
    make_element(`<noscript constexpr>Please enable javascript</noscript>`),
    document.body.firstChild
  )
  const ne = document.createElement("nav")
  startLoading()
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
  syntax_highlight()
})()

window.onfocus = () => {
  setTimeout(() => window.location.reload(), 100)
}
