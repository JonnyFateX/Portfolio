const menuEl = document.getElementById("menu-list")
const menuButtonEl = document.getElementById("menu-button")

menuButtonEl.addEventListener("click", () => {
    if(!(menuEl.style.display) || menuEl.style.display === "none"){
        menuEl.style.display = "flex"
    }else{
        menuEl.style.display = "none"
    }
})

window.addEventListener("resize", () => {
    const width = window.innerWidth
    if(width > 600){
        menuEl.style.display = "flex"
    }else{
        menuEl.style.display = "none"
    }
})