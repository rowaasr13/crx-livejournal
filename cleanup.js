(()=>{

"use strict";

let on_dom_loaded_remove_selectors = [
    "[prev-next-nav]",
    "#Logo",
    "#Userpic",
    "#hello-world",
    "#Search",
    "#Upgrade",
    "#NavMenuListTitle",

    "iframe[src*='/crossStorageServ.html']",
]

const { setup_evaluate_on_page } = env

const on_dom_loaded = (event) => {
    document.querySelectorAll(on_dom_loaded_remove_selectors.join(',')).forEach(
        el => el.remove()
    )

    setup_evaluate_on_page(() => ({
        scheme: window?.Site?.page?.scheme
    }), (data) => {
        if (data.scheme == "xcolibur") { on_xcolibur_detected() }
    })
}
window.addEventListener('DOMContentLoaded',  on_dom_loaded, { once: true })

const on_xcolibur_detected = () => {
    let el = document.querySelector("#NavMenuList"); if (el) {
        const style = el.style
        const height = window.getComputedStyle(el).height
        const color = window.getComputedStyle(document.querySelector("#FooterNav")).backgroundColor
        style.top = "0px"
        style.left = "0px"

        document.body.style.backgroundImage = `linear-gradient(${color} ${height}, transparent ${height})`

        document.querySelector("#Content").style.paddingTop = height
    }
}

})()