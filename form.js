const contactFormEl = document.getElementById("contact-form")
const inputElementList = document.getElementsByTagName("input")
const tipElementList = document
    .getElementById("contact-form")
    .getElementsByTagName("p")
const submitButtonEl = document.getElementById("submit-button")

contactFormEl.addEventListener("submit", event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    let formCorrect = true
    let index
    formData.forEach((value, name) => { 
        if(name === "email"){
            index = 0
            if(!validateEmail(value)){
                tipElementList[0].classList = ""
                formCorrect = false
            }
        }else if(name === "name"){
            index = 1
        }else if(name === "subject"){
            index = 2
        }else if(name === "message"){
            index = 3
        }
        if(!value){
            tipElementList[index].classList = ""
            formCorrect = false
        }
    })
    if(formCorrect){
        //send email
        for(let i = 0; i < tipElementList.length; i++){
            tipElementList[index].classList = "tip-hidden"
        }
    }
})

for(let i = 1; i < inputElementList.length; i++){
    inputElementList[i].addEventListener("blur", () => {
        validateField(inputElementList[i], i)
    })
}

function validateEmail(emailField){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return (reg.test(emailField))
}

function validateField(target, index){
    if(target.value === "" || !(target.value)){
        tipElementList[index].classList = ""
    }else{
        console.log("here")
        tipElementList[index].classList = "tip-hidden"
    }
}