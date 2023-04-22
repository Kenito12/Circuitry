//Global variables
let ccName = "";
let timeLimit = 0;
//----------------------------------------

//Button
const plusBut = document.getElementById("plusBut");
const timeSlider = document.getElementById("timeSlider");
const timeDisplay = document.getElementById("timeDisplay");
const circuitName = document.getElementById("circuitName");
const firstCircuit = document.getElementById("firstCircuit");
const cancelBut = document.getElementById("cancelBut");
//----------------------------------------

//Pages
const mainPage = document.getElementById("mainPage");
const firstTime = document.getElementById("firstTime");
const homePage = document.getElementById("homePage");
const createCircuit = document.getElementById("createCircuit");
const createCircuit2 = document.getElementById("createCircuit2");
//----------------------------------------

//Set Pages Default
firstTime.style.display = "none";
homePage.style.display = "none";
createCircuit.style.display = "none";
createCircuit2.style.display = "none";
//----------------------------------------

//bodymovin js to play Lottiefiles
const loadAnimation = document.getElementById("loadani")
const firstAnimation = document.getElementById("firstAnim")
const animItem = bodymovin.loadAnimation({
    wrapper: loadAnimation,
    animType: 'svg',
    loop: false,
    autoplay: true,
    path:'Assets/Logo.json'
});

const firstAnim = bodymovin.loadAnimation({
    wrapper: firstAnimation,
    animType: 'svg',
    loop: true,
    autoplay:true,
    path: 'https://assets10.lottiefiles.com/private_files/lf30_i5o0xxk6.json',
})
//----------------------------------------

// Using JQUERY to handle page load with a delay because page is not heavy enough.
$(window).on("load",function(){
    $(".loader-wrapper").delay(2000).slideToggle(300);
    // $(".loader-wrapper").hide();
});
//----------------------------------------

// Set Delay on homepage element to change the index after 2 sec
setTimeout(() => {
    mainPage.style.zIndex = "1";
    if (typeof (Storage) !== "undefined") {
        if (localStorage.hasOwnProperty("first")) {
            homePage.style.display = "block";
        } else {
            localStorage.setItem("first", 'yes')
            firstTime.style.display = "block";
        }
    } else {
        alert("your Browser doesn't has local storage")
    }

}, 2400);
//----------------------------------------

firstCircuit.onclick = () =>{
    firstTime.style.display = "none"
    createCircuit.style.display = "block"
}

let toggleWidth = (circuitTab) => {
    circuitTab.classList.toggle("expandTab");
}

let BeginCircit = () => {
    console.log('circuit start')
}

plusBut.onclick = () => {
    homePage.style.display = "none"
    createCircuit.style.display = "block";
}

let displayTime = () =>{
    let time = timeSlider.value;
    if(time >= 10){
        timeDisplay.innerHTML = time + ":00";
    }
    else{
        timeDisplay.innerHTML = "0"+ time + ":00"
    }
    timeLimit = time
}

let nameCircuit = () => {
     ccName = circuitName.value;
}

let firstNext = () =>{
    if(ccName == "" || timeLimit == 0){
        alert("please enter your Circuit name and Time Limit")
    }
    else{
        console.log(ccName);
        console.log(timeLimit);
        createCircuit.style.display = "none";
        createCircuit2.style.display = "block";
    }
}

cancelBut.onclick = () =>{
    createCircuit.style.display = "none";
    homePage.style.display = "block";
}