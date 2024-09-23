const bodyEl = document.getElementsByTagName("body")[0]
const menuButtonEl = document.getElementById("menu-button")
const menuListEl = document.getElementById("menu-list")
const mainLink = document.getElementsByClassName("nav-link")[0]

const mainSectionElHeight = document.getElementById("main-section").offsetHeight
if(window.scrollY > mainSectionElHeight){
    document.documentElement.style.setProperty("--logo-animation", "unset");
    document.documentElement.style.setProperty("--li-animation", "unset");
}

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

menuListEl.addEventListener("click", (event) => {
    const target = event.target
    if(target.classList?.length && target.classList[0] === 'nav-link'){
        event.preventDefault()
        const id = target.getAttribute("href").replace("/#", "")
        let headerOffset = document.getElementsByTagName("header")[0].offsetHeight;
        let sectionPosition = document.getElementById(id).offsetTop;
        var offsetPosition = sectionPosition - headerOffset - 16;
    
        if(id === "about"){
            if(window.innerWidth >= 500){
                window.scrollTo({
                    top: sectionPosition,
                    behavior: "smooth"
                })
            }else{
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                })
            } 
        }else if(id === "contact"){
            window.scrollTo({
                top: sectionPosition,
                behavior: "smooth"
            })
        }else{
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })
        }
    }
    if(window.innerWidth < 751){
        menuListEl.style.opacity = '0'
    }
    setTimeout(() => {
        if(window.innerWidth < 751){
            menuListEl.style.display = "none"
        }
        
    }, 250)
})

setTimeout(() => {
    bodyEl.style.overflowY = "auto"
}, 8500)

mainLink.addEventListener("click", (event) => {
    event.preventDefault()
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})