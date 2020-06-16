(()=>{

"use strict";

const setup = (func_evaluate, func_oncomplete) => {
    const script = document.createElement('script')
    document.body.appendChild(script)
    script.onload = process
    script.on_evaluate_complete = func_oncomplete
    script.src = "data:text/javascript;base64," + btoa(
        'document.currentScript.setAttribute("return_data", JSON.stringify((' +  func_evaluate + ')()))'
    )
}

const process = (event) => {
    const script = event.target
    const data = script.getAttribute("return_data")
    const func_oncomplete = script.on_evaluate_complete
    script.remove()
    func_oncomplete(JSON.parse(data))
}

env.setup_evaluate_on_page = setup

})()