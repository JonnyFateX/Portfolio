const projectsSectionEl = document.getElementById("projects-section")
const pathToJson = "./projectData.json"
let debounceActive = false
let timer

const indexes = {}
let indexesProxy

fetch(pathToJson)
    .then(res => res.json())
    .then(json => {
        json.forEach((article, index) => {
            const articleEl = getArticleElement(article, index)
            projectsSectionEl.innerHTML += articleEl
        })
        indexesProxy = createProxy()
        initButtons(indexesProxy)
        timer = setTimeout(() => {
            indexesProxy["imgContainer1"] = 1
        }, 8000)
    })

function createProxy(){
    return new Proxy(indexes, {
        set: function (target, key, newValue) {
            if(!target[key]){
                target[key] = 0
            }
            debounceActive = true
            const imgContainer = document.getElementById(key)
            const prevImage = imgContainer.getElementsByTagName("img")[target[key]]
            const newImage = imgContainer.getElementsByTagName("img")[newValue]
            const buttons = imgContainer.getElementsByTagName("button")
            if(target[key] < newValue){
                prevImage.classList = "slideOutFromLeft-animation hidden"
                newImage.classList = "slideInFromRight-animation"
            }else if(target[key] > newValue){
                prevImage.classList = "slideOutFromRight-animation hidden"
                newImage.classList = "slideInFromLeft-animation"
            }
            buttons[target[key]].classList = "circle-button"
            buttons[newValue].classList = "circle-button button-active"
            setTimeout(() => {
                prevImage.classList = "hidden"
                debounceActive = false
            }, 700)

            if(timer){
                clearTimeout(timer)
            }
    
            timer = setTimeout(() => {
                if((target[key] + 1) > 2){
                    indexesProxy[key] = 0
                }else{
                    indexesProxy[key]++
                }    
            }, 8000)

            target[key] = newValue
            return true
        }
    })
}

function initButtons(proxy){
    const buttonContainers = Array.prototype.slice.call(document.getElementsByClassName("circle-button-container"))
    buttonContainers.forEach((buttonContainer, containerIndex) => {
        const circleButtons = Array.prototype.slice.call(buttonContainer.children)
        circleButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                if(!debounceActive){
                    const key = "imgContainer" + (containerIndex + 1).toString()
                    proxy[key] = index
                }
            })
        })
    })
}


function getArticleElement(articleData, index){
    let utilities = articleData.utilities.join("  <strong>|</strong>  ")
    const article = 
    `
        <article>
            <div class="article-info">
                <h1>${articleData.title}</h1>
                <p class="article-content">${articleData.content}</p>
                <p class="article-utilities">${utilities}</p>
                <div class="article-links-container">
                    <a class="article-link" href="${articleData.githubUrl}" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a class="article-link url" href="${articleData.websiteUrl}" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 192 192"><path d="M84 128.6H54.6C36.6 128.6 22 114 22 96c0-9 3.7-17.2 9.6-23.1 5.9-5.9 14.1-9.6 23.1-9.6H84m24 65.3h29.4c9 0 17.2-3.7 23.1-9.6 5.9-5.9 9.6-14.1 9.6-23.1 0-18-14.6-32.6-32.6-32.6H108M67.9 96h56.2" style="fill:none;stroke:#272a30;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"/></svg>
                    </a>
                </div>
                
            </div>
            <div class="article-image-container" id="imgContainer${(index + 1)}">
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