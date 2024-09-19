const bodyEl = document.getElementsByTagName("body")[0]
const menuButtonEl = document.getElementById("menu-button")
const menuListEl = document.getElementById("menu-list")

menuButtonEl.addEventListener("click", () => {
    if(menuListEl.style.display === "none" || !(menuListEl.style.display)){
        menuListEl.style.display = "flex"
        setTimeout(() => {
            menuListEl.style.opacity = '1'
        }, 1)
        
    }else{
        menuListEl.style.opacity = '0'
        setTimeout(() => {
            menuListEl.style.display = "none"
        }, 250)
    }
})

menuListEl.addEventListener("click", () => {
    menuListEl.style.opacity = '0'
    setTimeout(() => {
        menuListEl.style.display = "none"
    }, 250)
})

setTimeout(() => {
    bodyEl.style.overflowY = "auto"
}, 8500)