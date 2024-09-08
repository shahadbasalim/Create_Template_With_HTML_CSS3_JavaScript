//check if there is local storage color option
let mainColors = localStorage.getItem("color-option");
if (mainColors !== null) {
    document.documentElement.style.setProperty("--main-color", mainColors);
    //check for active class from all colors list item
    document.querySelectorAll(".colors-list li").forEach((element) => {
        element.classList.remove("active");
        //add active class 
        if (element.dataset.color === mainColors) {
            element.classList.add("active");
        }        
    });   
}

//random bachground option
let backgroundOption = true;
//variable to control the background interval
let bachgroundInterval;

//check if there is local storage random background item
let bachgroundLocalItem = localStorage.getItem("bachground_option");
if (bachgroundLocalItem !== null) {
    if (bachgroundLocalItem === 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    //remove active class from all spans
    document.querySelectorAll(".randon-backgrounds span").forEach((element) => {
        element.classList.remove("active");
    });
    if (bachgroundLocalItem === 'true') {
        document.querySelector(".randon-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".randon-backgrounds .no").classList.add("active")
    }
}  

//toggle spin class on icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
}

//switch colors
const colorLis = document.querySelectorAll(".colors-list li");
colorLis.forEach((li) => {
    li.addEventListener('click', (e) => {
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        //set color on local storage
        localStorage.setItem("color-option", e.target.dataset.color);

        handleActiveClass(e);
    })
})
//switch randon backgrounds option
const randonBackEl = document.querySelectorAll(".randon-backgrounds span");
randonBackEl.forEach((span) => {
    span.addEventListener('click', (e) => {
        handleActiveClass(e);

        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("bachground_option", true);
            
        } else {
            backgroundOption = false;
            clearInterval(bachgroundInterval);
            localStorage.setItem("bachground_option", false);
        }
    })
})

//select landing page element
let landingPage = document.querySelector(".landing-page");
//get array of images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

//function to randomize images
function randomizeImgs() {
    if (backgroundOption === true) {
        bachgroundInterval = setInterval(() => {
            //get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            //change background image url
            landingPage.style.backgroundImage = 'url("imgs/'+ imgsArray[randomNumber] +'")';
        }, 10000);
    } 
}
randomizeImgs();

//skills section
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
    let skillsOffsetTop = ourSkills.offsetTop;
    let skillsOuterHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)- 200) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach((skill) => {
            skill.style.width = skill.dataset.progress;
        })
    }
}

//create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
    img.addEventListener('click', (e) => {
        //create overlay element
        let overlay = document.createElement("div");
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);

        //create popup
        let popupBox = document.createElement("div");
        popupBox.className = 'popup-box';

        //create heading
        if (img.alt !== null) {
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        };
        
        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        //create close span
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = 'close-button';
        popupBox.appendChild(closeButton);
    });
});
document.addEventListener('click', function (e) {
    if (e.target.className === 'close-button') {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove()
    }
})

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// Select All Links
const allLinks = document.querySelectorAll(".links a");

function scrollToSection(elements) {
        elements.forEach(ele => {
            ele.addEventListener("click", (e) => { 
                e.preventDefault(); 
                document.querySelector(e.target.dataset.section).scrollIntoView({ 
                    behavior: 'smooth'
            });
        });  
    });
}
scrollToSection(allBullets);
scrollToSection(allLinks);

//handle active class
function handleActiveClass(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active");
    });
    ev.target.classList.add("active");
};

//show and hide bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsLocalItem = localStorage.getItem("bullets-option");
if (bulletsLocalItem !== null) {
    bulletsSpan.forEach((span) => {
        span.classList.remove("active");
    });
    if (bulletsLocalItem === 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}
bulletsSpan.forEach((span) => {
    span.addEventListener('click', (e) => {
        if (span.dataset.display === 'yes') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets-option", 'block');
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets-option", 'none');
        };

        handleActiveClass(e);
    })
});

//create reser options function
document.querySelector(".reser-options").onclick = function () {
    // localStorage.clear();
    localStorage.removeItem("bullets-option");
    localStorage.removeItem("color-option");
    localStorage.removeItem("bachground_option");
    
    window.location.reload();
};

//toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function () {
    tLinks.classList.toggle("open");
};
//click anywhere outside menu and toggle button 
document.addEventListener('click', (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks) {
        //check if menu is open
        if (tLinks.classList.contains("open")) {
            tLinks.classList.toggle("open");
        }
    }
})
