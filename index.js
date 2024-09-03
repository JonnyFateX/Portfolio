const menuEl = document.getElementById("menu-list")
const menuButtonEl = document.getElementById("menu-button")
let debounceActive = false

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
        if(link.classList.contains("icon-link")){
            return
        }
        event.preventDefault()
        const sectionId = link.textContent
            .toLowerCase()
            .replace(" ","-")
            .concat("-section")
        if(sectionId === "-section"){
            window.scroll({
                top: 0,
                behavior: 'smooth'
            });
        }else{
            const sectionEl = document.getElementById(sectionId)
            const y = sectionEl.getBoundingClientRect().top + window.scrollY;
            window.scroll({
                top: y,
                behavior: 'smooth'
            });
        }
        if(window.innerWidth < 600){
            menuEl.style.display = "none" 
        }
    })
})

const buttonContainers = Array.prototype.slice.call(document.getElementsByClassName("circle-button-container"))
buttonContainers.forEach((buttonContainer, containerIndex) => {
    const circleButtons = Array.prototype.slice.call(buttonContainer.children)
    circleButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            if(!debounceActive){
                imageSlideHandler(containerIndex, index, button)
            }
        })
    })
})

function imageSlideHandler(containerIndex, index, buttonEl){
    debounceActive = true
    //button active
    const activeButton = document.getElementsByClassName("button-active")
    if(activeButton){
        activeButton[0].classList = "circle-button"
    }
    buttonEl.classList = "circle-button button-active"
    //image handling
    const imagesInContainer = document
        .getElementsByClassName("article-image-container")[containerIndex]
        .getElementsByTagName("img")
    let safe
    for(let i = 0; i < imagesInContainer.length; i++){
        if(imagesInContainer[i].classList[0]?.includes("animation") || !(imagesInContainer[i].classList[0])){
            if(i === index){
                return
            }
            if(index > i){
                safe = true
                imagesInContainer[i].classList = "slide-from-left-animation reverse-animation hidden"
            }else{
                imagesInContainer[i].classList = "slide-from-right-animation reverse-animation hidden"
            }
            
            setTimeout(() => {
                imagesInContainer[i].classList = "hidden"
            }, 900)
        }else{
            imagesInContainer[i].classList = "hidden"
        }
    }
    if(!safe){
        imagesInContainer[index].classList = "slide-from-left-animation normal-animation"
    }else{
        imagesInContainer[index].classList = "slide-from-right-animation normal-animation"
    }
    setTimeout(() => {
        imagesInContainer[index].classList = ""
        debounceActive = false
    }, 1000)
}

document.querySelector('.html5').style.setProperty('--c','#E5532E');
document.querySelector('.css3').style.setProperty('--c','#2D53E5');
document.querySelector('.javascript').style.setProperty('--c','#F7E029');
document.querySelector('.react').style.setProperty('--c','#17D9FF');
document.querySelector('.firebase').style.setProperty('--c','#FFCD36');
document.querySelector('.flutter').style.setProperty('--c','#65CBF8');
document.querySelector('.dart').style.setProperty('--c','#0E5D9E');
document.querySelector('.api').style.setProperty('--c','purple');
document.querySelector('.git').style.setProperty('--c','#F1553B');
