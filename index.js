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

const linksArray = Array.prototype.slice.call(document.getElementsByTagName("a"))
linksArray.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault()
        let sectionId = link.textContent
            .toLowerCase()
            .replace(" ","-")
            .concat("-section")
        if(sectionId === "-section"){
            sectionId = "main-section"
        }
        const sectionEl = document.getElementById(sectionId)
        const y = sectionEl.getBoundingClientRect().top + window.scrollY;
        window.scroll({
            top: y,
            behavior: 'smooth'
        });
    })
})