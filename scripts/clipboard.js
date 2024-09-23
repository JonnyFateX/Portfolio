const clipboardEl = document.getElementById("clipboard")
const clipboardMobileEl = document.getElementById("clipboard-mobile")
const emailEl = document.getElementById("contact-email")
const emailMobileEl = document.getElementById("contact-email-mobile")
let xOffset = 80

let timeout
emailEl.addEventListener("mouseenter", (event) => {
    if(!(event.relatedTarget)) return
    const relatedTarget = event.relatedTarget.classList.toString()
    if(relatedTarget === "contact-header") return
    timeout? clearTimeout(timeout): ""
    clipboardEl.innerText = "Copy to clipboard"
    clipboardEl.style.visibility = "visible"
    clipboardEl.style.opacity = 1
    emailEl.onmousemove = (event) => {
        if(event.target.id === "clipboard") return
        clipboardEl.style.visibility = "visible"
        clipboardEl.style.opacity = 1
        const rect = event.target.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        if(!x){
            clipboardEl.style.left = (Number(clipboardEl.style.left.replace("px", "")) - 38) + "px"
        }else{
            clipboardEl.style.left = (Math.floor(x) - getXOffset()) + "px"
        }
        clipboardEl.style.top = (Math.floor(y) - 60) + "px"
        
    }
})

emailEl.addEventListener("mouseleave", (event) => {
    const relatedTarget = event.relatedTarget.classList.toString()
    if(relatedTarget === "contact-header") return
    clipboardEl.style.opacity = "0"
    timeout = setTimeout(() => {
        clipboardEl.style.visibility = "hidden"
    }, 300)
    document.onmousemove = null
})

emailEl.addEventListener("mouseup", (event) => {
    if(window.innerWidth < 1000) return

    if(!(emailEl.onmousemove)){
        navigator.clipboard.writeText(event.target.innerText)
        clipboardEl.innerText = "Copied to clipboard!"

        if(mobileTimeout){
            clearTimeout(mobileTimeout)
            mobileTimeout = null
        }
        clipboardEl.style.visibility = "visible"
        clipboardEl.style.opacity = 1
    
        const rect = event.target.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        clipboardEl.style.left = (x - 82) + "px"
        clipboardEl.style.top = (y - 60) + "px"
    
        mobileTimeout = setTimeout(() => {
            clipboardEl.style.opacity = 0
            setTimeout(() => {
                clipboardEl.style.visibility = "hidden"
                clipboardEl.innerText = "Copy to clipboard"
            }, 300)
        }, 2000)
    }else{
        navigator.clipboard.writeText(event.target.innerText)
        clipboardEl.innerText = "Copied!"

        xOffset = 42
        const rect = event.target.getBoundingClientRect()
        const x = event.clientX - rect.left
        clipboardEl.style.left = (x - getXOffset()) + "px"
        
        setTimeout(() => {  
            clipboardEl.innerText = "Copy to clipboard"
            const newEvent = new Event('mousemove')
            xOffset = 80
            emailEl.dispatchEvent(newEvent)
        }, 4000)
    }

    
})

let mobileTimeout
emailMobileEl.addEventListener("click", (event) => {
    if(mobileTimeout){
        clearTimeout(mobileTimeout)
        mobileTimeout = null
    }
    navigator.clipboard.writeText(event.target.innerText)
    clipboardMobileEl.style.visibility = "visible"
    clipboardMobileEl.style.opacity = 1

    const width = event.target.offsetWidth
    clipboardMobileEl.style.left = ((width/2) - 92) + "px"
    clipboardMobileEl.style.left = ((width/2) - 92) + "px"

    const rect = event.target.getBoundingClientRect()
    const y = event.clientY - rect.top
    clipboardMobileEl.style.top = (y - 60) + "px"

    mobileTimeout = setTimeout(() => {
        clipboardMobileEl.style.opacity = 0
        setTimeout(() => {
            clipboardMobileEl.style.visibility = "hidden"
        }, 300)
    }, 2000)
})


function getXOffset(){
    return xOffset
}