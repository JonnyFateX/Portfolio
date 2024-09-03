const projectsSectionEl = document.getElementById("projects-section")
let debounceActive = false
const pathToJson = "./projectData.json"
fetch(pathToJson)
    .then(res => res.json())
    .then(json => {
        json.forEach(article => {
            const articleEl = getArticleElement(article)
            projectsSectionEl.innerHTML += articleEl
        })
        initButtons()
    })

function initButtons(){
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
}

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

function getArticleElement(articleData){
    let utilities = articleData.utilities.join("  <strong>|</strong>  ")
    const article = 
    `
        <article>
            <div class="article-info">
                <h1>${articleData.title}</h1>
                <p>${articleData.content}</p>
                <p class="article-utilities">${utilities}</p>
                <div class="article-links-container">
                    <a class="article-link" href="${articleData.githubUrl}" target="_blank">
                        <svg width="98px" height="96px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/></svg>
                    </a>
                    <a class="article-link url" href="${articleData.websiteUrl}" target="_blank">
                        <svg width="98px" height="98px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><path d="M84 128.6H54.6C36.6 128.6 22 114 22 96c0-9 3.7-17.2 9.6-23.1 5.9-5.9 14.1-9.6 23.1-9.6H84m24 65.3h29.4c9 0 17.2-3.7 23.1-9.6 5.9-5.9 9.6-14.1 9.6-23.1 0-18-14.6-32.6-32.6-32.6H108M67.9 96h56.2" style="fill:none;stroke:#272a30;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"/></svg>
                    </a>
                </div>
                
            </div>
            <div class="article-image-container">
                <img class="" src="${articleData.images[0]}" alt="my anime recommendations welcome page">
                <img class="hidden" src="${articleData.images[1]}" alt="anime card">
                <img class="hidden" src="${articleData.images[2]}" alt="anime details card">
                <div class="circle-button-container">
                    <button class="circle-button button-active"></button>
                    <button class="circle-button"></button>
                    <button class="circle-button"></button>
                </div>
            </div>
        </article>
    `
    return article
}