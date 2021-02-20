const ne = document.createElement("nav")
const header = document.querySelector('header');

startLoading()
fetch("/collections/nav.json")
  .then(res => res.json())
  .then(res => Object.keys(res).forEach(k => {
    const item = document.createElement('a')
    item.setAttribute('href', res[k])
    if (res[k] === window.location.pathname || res[k] + 'index.html' === window.location.pathname) {
      item.classList.add("current")
    }
    item.innerText = k
    ne.appendChild(item)
  }))
  .then(() => header.parentElement.insertBefore(ne, header))
  .then(() => finishLoading())

window.onfocus = () => {
  setTimeout(() => window.location.reload(), 100)
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
