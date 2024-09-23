const clipboardEl = document.getElementById("clipboard")
const emailEl = document.getElementById("contact-email")
let xOffset = 80

let timeout
emailEl.addEventListener("mouseover", () => {
    timeout? clearTimeout(timeout): ""
    clipboardEl.innerText = "Copy to clipboard"
    clipboardEl.style.visibility = "visible"
    clipboardEl.style.opacity = 1
    emailEl.onmousemove = (event) => {
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

emailEl.addEventListener("mouseout", () => {
    clipboardEl.style.opacity = "0"
    timeout = setTimeout(() => {
        clipboardEl.style.visibility = "hidden"
    }, 300)
    document.onmousemove = null
})

emailEl.addEventListener("mouseup", (event) => {
    if(window.innerWidth < 1000) return
    navigator.clipboard.writeText(event.target.innerText);
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
})


function getXOffset(){
    return xOffset
}