const contactFormEl = document.getElementById("contact-form")
const inputElementList = document.getElementsByTagName("input")
const textareaEl = document.getElementsByTagName("textarea")[0]
const tipElementList = document
    .getElementById("contact-form")
    .getElementsByTagName("p")
const submitButtonEl = document.getElementById("submit-button")

for(let i = 2; i < inputElementList.length + 1; i++){
    if(i === 3){
        textareaEl.addEventListener("input", () => {
            validateField(textareaEl, i-1)
        })
    }else{
        inputElementList[i].addEventListener("input", () => {
            validateField(inputElementList[i], i-1)
        })
    }
}

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
        }else if(name === "message"){
            index = 2
        }
        if(!value){
            tipElementList[index].classList = ""
            formCorrect = false
        }
    })
    if(formCorrect){
        //send email
        event.target.submit()
        for(let i = 0; i < tipElementList.length; i++){
            tipElementList[index].classList = "tip-hidden"
        }
    }
})

function validateEmail(emailField){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return (reg.test(emailField))
}

function validateField(target, index){
    if(target.value === "" || !(target.value)){
        tipElementList[index].classList = ""
    }else{
        tipElementList[index].classList = "tip-hidden"
    }
}