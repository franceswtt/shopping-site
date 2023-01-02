//mobile nav bar 
const menuBtn = document.getElementById("menuBtn") 
const nav = document.querySelector("nav")

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active")
})

//search section
const searchBtn = document.getElementById("searchBtn")
const closeBtn = document.getElementById("closeBtn")
const searchSection = document.querySelector(".search-section")
const searchBoxSpan = document.querySelector(".search-box span")
const searchInput = document.querySelector(".search-input")
searchBtn.addEventListener("click", () => {
    searchSection.classList.toggle("active")
    
})

mobileSearchBtn.addEventListener("click", () => {
    searchSection.classList.toggle("active")
})


closeBtn.addEventListener("click", () => {
    searchSection.classList.remove("active")
 })


 searchInput.addEventListener("focus", () => {
    searchBoxSpan.classList.add("active")
 })

 searchInput.addEventListener("blur", () => {

    if(searchInput.value === "") {
        searchBoxSpan.classList.remove("active")
    }
 
 })


//sideshow
const slides = document.querySelectorAll(".slide")
const slidePreBtn = document.getElementById("slidePreBtn")
const slideNextBtn = document.getElementById("slideNextBtn")
const slideNumber = document.getElementById("slideNumber")
slides.forEach((slide, index) => {
    slide.style.left = `${index*100}%`
})

let slideCounter = 0

setInterval(() => {
    slideCounter++
    carousel()
}, 8000)

slideNextBtn.addEventListener("click", () => {
    slideCounter++
    carousel()
    
})

slidePreBtn.addEventListener("click", () => {
    slideCounter--
    carousel()
})

function carousel() {

    if(slideCounter === slides.length){
        slideCounter =  0
    }

    if(slideCounter < 0){
        slideCounter = slides.length -1
    }
    slides.forEach((slide) => {
        slide.style.transform = `translateX(-${slideCounter*100}%)`
    })
    slideNumber.innerText = `${slideCounter+1}/${slides.length}`
}

//press testimonial

const pressTestimonials = document.querySelectorAll(".press-testimonial")
const pressControls = document.querySelector(".press-controls")


pressTestimonials.forEach((item, index) => {
    item.style.left = `${index*100}%`
    const btn = document.createElement("INPUT")
    btn.setAttribute("type", "radio")
    btn.setAttribute("name", "radio-btn")
    btn.setAttribute("id", `radio${index}`)
    if(index === 0){
        btn.checked = true
    }
    pressControls.appendChild(btn)
})

const radioBtns = document.getElementsByName("radio-btn")
    radioBtns.forEach((radioBtn, index) => {
        radioBtn.addEventListener("change", () => {
            if(radioBtn.checked) {
                pressTestimonials.forEach((item) => {
                    item.style.transform = `translateX(-${index*100}%)`
                })
            }
        })
    })
    

//

//newsletter
const input = document.querySelector(".newsletter input")
const newsletter = document.querySelector(".newsletter")
input.addEventListener("focus", () => {
    newsletter.classList.add("focus")
})

input.addEventListener("blur", () => {
    if(input.value === "") {
        newsletter.classList.remove("focus")
    }
    
})

