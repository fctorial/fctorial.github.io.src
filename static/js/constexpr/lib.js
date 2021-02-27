function make_element (str) {
  const p = document.createElement("template")
  p.innerHTML = str
  return p.content.cloneNode(true).children[0]
}

function insertFirst(par, ch) {
  par.insertBefore(ch, par.children[0])
}
function insertBefore(sib, el) {
  sib.parentNode.insertBefore(el, sib.parentNode.firstChild)
}
function insertAfter(sib, el) {
  sib.parentNode.insertBefore(el, sib.nextSibling)
}

function trace(data) {
  console.log(JSON.stringify(data, null, 4))
  return data
}
