if (!window._ConstexprJS_) {
  window._ConstexprJS_ = {
    compile: () => {},
    abort: () => {},
    addPath: () => {},
    addExclusion: () => {},
    addDependency: () => {},
    log: () => {}
  }
}

let loadersCount = 0
let startedLoading = false
function startLoading() {
  startedLoading = true
  loadersCount += 1
}

function _finishLoading() {
  loadersCount -= 1
  if (loadersCount === 0 && startedLoading) {
    window._ConstexprJS_.compile()
  }
}

function finishLoading() {
  setTimeout(_finishLoading, 300)
}

function abortCompilation(message) {
  window._ConstexprJS_.abort(message)
}
