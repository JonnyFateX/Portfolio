const clipboardEl = document.getElementById("clipboard")
const emailEl = document.getElementById("contact-email")
let xOffset = 80


let timeout
emailEl.addEventListener("mouseover", () => {
    timeout? clearTimeout(timeout): ""
    clipboardEl.innerText = "Copy to clipboard"
    clipboardEl.style.visibility = "visible"
    clipboardEl.style.opacity = 1
    document.onmousemove = (event) => {
        clipboardEl.style.top = (event.clientY - 60) + "px"
        clipboardEl.style.left = (event.clientX - xOffset) + "px"
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

    xOffset = 45
    clipboardEl.style.left = (event.clientX - xOffset) + "px"
    setTimeout(() => {
        clipboardEl.innerText = "Copy to clipboard"
        xOffset = 80
        clipboardEl.style.left = (event.clientX - xOffset) + "px"
    }, 4000)
})