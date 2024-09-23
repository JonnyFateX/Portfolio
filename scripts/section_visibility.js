function callbackFunc(entries, observer)
{
  entries.forEach(entry => {
    const targetSection = entry.target
    if(entry.isIntersecting){
        targetSection.classList = "section section-visible"
    }
    
  })
}

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
}

const options2 = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
}

let projectsObserver = new IntersectionObserver(callbackFunc, options)
let restObservery = new IntersectionObserver(callbackFunc, options2)

restObservery.observe(document.getElementById('about'))
projectsObserver.observe(document.getElementById('projects'))
restObservery.observe(document.getElementById('contact'))