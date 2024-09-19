const pfpEl = document.getElementById("pfp")
let animationActive = false
let index = 0
const imgSources = [
    "./assets/toge_pfp.jpg",
    "./assets/me_pfp.jpg",
]

pfpEl.addEventListener("click", () => {
    if(!animationActive){
        animationActive = true
        spinImg()
        setTimeout(() => {
            animationActive = false
        }, 4000)
    }
})

function getImgSrc(){
    if(index >= imgSources.length){
        index = 0
    }
    return imgSources[index]
}

function spinImg(){
    if(pfpEl.classList[0] === "spin"){
        pfpEl.classList = "pfp"
    }else{
        pfpEl.classList = "spin pfp"
    }
    setTimeout(() => {
        index++
        pfpEl.src = getImgSrc()
    }, 2000)
}

