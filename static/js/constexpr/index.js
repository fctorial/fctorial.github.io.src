if (!window._ConstexprJS_) {
  window._ConstexprJS_ = {
    compile: () => {}
  }
}

let loadersCount = 0
let startedLoading = false
function startLoading() {
  startedLoading = true
  loadersCount += 1
}
function finishLoading() {
  loadersCount -= 1
  if (loadersCount === 0 && startedLoading) {
    window._ConstexprJS_.compile()
  }
}
