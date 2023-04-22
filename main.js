//Global variables
let ccName = "";
let timeLimit = 0;
let upperExc = "";
let lowerExc = "";
let compound = "";
let cardio = "";
let circuit = '{"circuits":[]}';
//----------------------------------------

//Button
const plusBut = document.getElementById("plusBut");
const timeSlider = document.getElementById("timeSlider");
const timeDisplay = document.getElementById("timeDisplay");
const circuitName = document.getElementById("circuitName");
const firstCircuit = document.getElementById("firstCircuit");
const cancelBut = document.getElementById("cancelBut");
const menu = document.getElementById("menu");
const pause = document.getElementById("pause");
const stop = document.getElementById("stop");
//----------------------------------------

//Pages
const countdown = document.getElementById("countdown")
const mainPage = document.getElementById("mainPage");
const firstTime = document.getElementById("firstTime");
const homePage = document.getElementById("homePage");
const createCircuit = document.getElementById("createCircuit");
const createCircuit2 = document.getElementById("createCircuit2");
const createCircuit3 = document.getElementById("createCircuit3");
const createCircuit4 = document.getElementById("createCircuit4");
const createCircuit5 = document.getElementById("createCircuit5");
const circuitPage = document.getElementById("circuitPage");
//----------------------------------------

//Set Pages Default
firstTime.style.display = "none";
homePage.style.display = "none";
createCircuit.style.display = "none";
createCircuit2.style.display = "none";
createCircuit3.style.display = "none";
createCircuit4.style.display = "none";
createCircuit5.style.display = "none";
countdown.style.display = "none"
circuitPage.style.display = "block"
//----------------------------------------

//bodymovin js to play Lottiefiles
const loadAnimation = document.getElementById("loadani");
const firstAnimation = document.getElementById("firstAnim");
const countdAnimation = document.getElementById("countdani");
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

const countdAni = bodymovin.loadAnimation({
    wrapper: countdAnimation,
    animType: 'svg',
    loop: false,
    autoplay: false,
    path:'Assets/countdown.json'
})



//----------------------------------------

// Using JQUERY to handle page load with a delay because page is not heavy enough.
$(window).on("load",function(){
    // $(".loader-wrapper").delay(2000).slideToggle(300);
    $(".loader-wrapper").hide();
});
//----------------------------------------

// Set Delay on homepage element to change the index after 2 sec
// setTimeout(() => {
//     mainPage.style.zIndex = "1";
//     if (typeof (Storage) !== "undefined") {
//         if (localStorage.hasOwnProperty("first")) {
//             homePage.style.display = "block";
//              renderCircuits();
//         } else {
//             firstTime.style.display = "block";
//         }
//     } else {
//         alert("your Browser doesn't has local storage")
//     }

// }, 2400);
//----------------------------------------

//create user first circuit run only one time
firstCircuit.onclick = () =>{
    localStorage.setItem("first", 'yes')
    firstTime.style.display = "none"
    createCircuit.style.display = "block"
}
//----------------------------------------

//toggle classes
let toggleWidth = (circuitTab) => {
    circuitTab.classList.toggle("expandTab");
}
let toggleExc = (excTab) => {
    excTab.classList.toggle("excExpandTab");
}
//----------------------------------------

//Begin Circuit

let BeginCircit = (name, time, upper, lower, compound, cardio) => {
    console.log(name + time + upper + lower + compound + cardio)
    homePage.style.display = "none"
    countdown.style.display = "block"
    countdAni.play();
    $(".countdown-wrapper").delay(3000).fadeToggle(400);
    setTimeout(() => {
        circuitPage.style.display = "block"
        countdown.style.display = "none"
    },3500)
}
//----------------------------------------

//Plus buton bring the create circuit page up
plusBut.onclick = () => {
    homePage.style.display = "none"
    createCircuit.style.display = "block";
}
//----------------------------------------

//display the time limit when user use the slider
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
//----------------------------------------

//set Circuit name
let nameCircuit = () => {
     ccName = circuitName.value;
}
//----------------------------------------

//Check for the value from the create circuit page
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
//----------------------------------------

//cancel button function
cancelBut.onclick = () =>{
    createCircuit.style.display = "none";
    homePage.style.display = "block";
}
//----------------------------------------

//Back but fuctions
let backBut = () => {
    if(createCircuit2.style.display == "block"){
        createCircuit.style.display = "block";
        createCircuit2.style.display = "none";
    }
    else if(createCircuit3.style.display == "block"){
        createCircuit2.style.display = "block";
        createCircuit3.style.display = "none";
    }
    else if(createCircuit4.style.display == "block"){
        createCircuit3.style.display = "block";
        createCircuit4.style.display = "none";
    }
    else if(createCircuit5.style.display == "block"){
        createCircuit4.style.display = "block";
        createCircuit5.style.display = "none";
    }
}
//----------------------------------------

//Excercise Picking Funciton
let excPick = (type, exc) => {
    switch(type){
        case "upperBody":
            upperExc = exc;
            console.log(upperExc)
            break;
        case "lowerBody":
            lowerExc = exc;
            console.log(lowerExc)
            break;
        case "compound":
            compound = exc;
            console.log(compound)
            break;
        case "cardio":
            cardio = exc;
            console.log(cardio)
            break;
    }

    if(createCircuit2.style.display == "block"){
        createCircuit3.style.display = "block";
        createCircuit2.style.display = "none";
    }
    else if(createCircuit3.style.display == "block"){
        createCircuit4.style.display = "block";
        createCircuit3.style.display = "none";
    }
    else if(createCircuit4.style.display == "block"){
        createCircuit5.style.display = "block";
        createCircuit4.style.display = "none";
    }
    else if(createCircuit5.style.display == "block"){
        circuitCreated();
        homePage.style.display = "block";
        createCircuit5.style.display = "none";
    }
}
//----------------------------------------

//create circuit and link to local storage
let circuitCreated = () => {
    let circuitObj
    if (localStorage.hasOwnProperty("circuits")) {
        circuit = localStorage.getItem("circuits")
        circuitObj = JSON.parse(circuit);
        circuitObj['circuits'].push({
            "name":ccName,
            "time":timeLimit,
            "upper": upperExc,
            "lower": lowerExc,
            "compound": compound,
            "cardio": cardio,
        })
        circuit = JSON.stringify(circuitObj);
        localStorage.setItem("circuits", circuit);
        renderCircuits();
    } else {
        circuitObj = JSON.parse(circuit);
        circuitObj['circuits'].push({
            "name":ccName,
            "time":timeLimit,
            "upper": upperExc,
            "lower": lowerExc,
            "compound": compound,
            "cardio": cardio,
        })
        circuit = JSON.stringify(circuitObj);
        localStorage.setItem("circuits", circuit);
        renderCircuits();
    }
    console.log(circuitObj);
}
//----------------------------------------

//render the Circuit from the local storage if has one, as a tab on home page
let renderCircuits = () => {
    const tabrender = document.getElementById("tabrender");
    let circuitObj;
    if(localStorage.hasOwnProperty("circuits")){
        circuit = localStorage.getItem("circuits")
        circuitObj = JSON.parse(circuit);
        tabrender.innerHTML = ""
        for ( let i = 0; i < circuitObj.circuits.length; i++){
            let tab = `
            <div class="circuitTab" onclick="toggleWidth(this)">
                <h2 class="circuitname">${circuitObj.circuits[i].name} <span class="time">${circuitObj.circuits[i].time}min</span></h2>
                <div class="subBut" onclick="BeginCircit('${circuitObj.circuits[i].name}','${circuitObj.circuits[i].time}', '${circuitObj.circuits[i].upper}', '${circuitObj.circuits[i].lower}', '${circuitObj.circuits[i].compound}', '${circuitObj.circuits[i].cardio}')">
                    <h2>Begin Circuit</h2>
                    <img src="Assets/arrow.png" alt="arrow.png">
                </div>
            </div>
            `

            tabrender.innerHTML += tab;
        }
    }
}
//----------------------------------------

//Stager Menu on CircuitPage
menu.onclick = () =>{
    pause.classList.toggle("pauseUp");
    stop.classList.toggle("stopUp");
}

pause.onclick = () =>{
    console.log("pause!");
}
stop.onclick = () =>{
    console.log("stop");
}

renderCircuits();