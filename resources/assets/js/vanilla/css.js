/*************************************************************************************************************
 *                                                                                      VARIABLES FOR STYLES
 *************************************************************************************************************/

var renderVarForCss = () => {
    let windowHeight = $(window).outerHeight()
    let navHeight = $("nav").outerHeight()
    document.documentElement.style.setProperty('--app-content-height', `${windowHeight - navHeight }px`)
    document.documentElement.style.setProperty('--app-window-height', `${windowHeight}px`)
    document.documentElement.style.setProperty('--app-nav-height', `${navHeight}px`)
    setTimeout(() => {
        let appContentWidth = $(".app-content").outerWidth()
        document.documentElement.style.setProperty('--app-content-width', `${appContentWidth}px`)
    }, 400);
}

var renderSliderTranslateX = () => {
    setTimeout(() => {
        if ($('#sld').length > 0) {
            let appContentWidth = $(".app-content").outerWidth()
            document.getElementById('sld').style.transform = "translateX(" + (appContentWidth * -1) + "px)";
        }
    }, 400);
}

var main = () => {
    renderVarForCss()
    renderSliderTranslateX()
}


window.renderVarForCss = renderVarForCss
window.renderSliderTranslateX = renderSliderTranslateX

addEventListener('load', main)
addEventListener('resize', main)
