export default ({ header, sidebar, container, content }) => {

  function MouseWheelHandler(event) {
    var event         = window.event || event // old IE support
    var delta         = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail))) * 60
    var marginTop     = Number(sidebar.style.marginTop.replace('px', ''))
    var newMarginTop  = marginTop + delta

    var sidebarHeight         = sidebar.clientHeight
    var sidebarWrapperHeight  = sidebar.parentNode.clientHeight

    if (newMarginTop > 0) {
      newMarginTop = 0
    }

    if (sidebarWrapperHeight - sidebarHeight > newMarginTop) {
      newMarginTop = sidebarWrapperHeight - sidebarHeight
    }

    sidebar.style.marginTop = newMarginTop + 'px'
    container.scrollTop -= delta
  }

  (function addMouseWheelListener() {
    if (sidebar.addEventListener) {
      // IE9, Chrome, Safari, Opera
      sidebar.addEventListener('mousewheel', MouseWheelHandler, false)
      // Firefox
      sidebar.addEventListener('DOMMouseScroll', MouseWheelHandler, false)
    }
    // IE 6/7/8
    else sidebar.attachEvent('onmousewheel', MouseWheelHandler)
  })()


  container.onscroll = () => {
    var top   = container.scrollTop
    var left  = container.scrollLeft

    sidebar.style.marginTop = -top + 'px'
    header.style.marginLeft = -left + 'px'
  }


  // content.onmouseover = (event) => {
  //   var target    = event.target
  //   var className = target.className
  //
  //   if (className.indexOf('cell') >= 0) {
  //     var index   = target.parentNode.getAttribute('data-index')
  //     var row     = sidebar.children[index]
  //
  //     row.className += ' hovered'
  //   }
  // }
  //
  // content.onmouseout = (event) => {
  //   var target    = event.target
  //   var className = target.className
  //
  //   if (className.indexOf('cell') >= 0) {
  //     var index         = target.parentNode.getAttribute('data-index')
  //     var row           = sidebar.children[index]
  //     var newClassName  = row.className.replace(' hovered', '')
  //
  //     sidebar.children[index].className = newClassName
  //   }
  // }
  //
  //
  // sidebar.onmouseover = (event) => {
  //   var target    = event.target
  //   var className = target.className
  //
  //   if (className.indexOf('sidebarRow') >= 0) {
  //     var index   = target.getAttribute('index')
  //     var row     = content.children[index]
  //
  //     row.className += ' hovered'
  //   }
  // }
  //
  // sidebar.onmouseout = (event) => {
  //   var target    = event.target
  //   var className = target.className
  //
  //   if (className.indexOf('sidebarRow') >= 0) {
  //     var index         = target.getAttribute('index')
  //     var row           = content.children[index]
  //     var newClassName  = row.className.replace(' hovered', '')
  //
  //     content.children[index].className = newClassName
  //   }
  // }

}
