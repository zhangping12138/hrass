export const imgerror = {
  inserted(dom, obj) {
    const { value } = obj
    dom.onerror = function() {
      dom.src = value
    }
  }
}
