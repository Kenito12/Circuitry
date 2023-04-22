//Global variables
let ccName = "";
let timeLimit = 0;
let upperExc = "";
let lowerExc = "";
let compound = "";
let cardio = "";
let circuit = '{"circuits":[]}';
let paused = false;
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
const stopMenu = document.getElementById("stopMenu");
const pauseMenu = document.getElementById("pauseMenu");
//----------------------------------------
stopMenu.style.display = "none"
pauseMenu.style.display = "none"

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
const menuPop = document.getElementById("menuPop");
const congrate = document.getElementById("congrate");
//----------------------------------------

//Set Pages Default
firstTime.style.display = "none";
homePage.style.display = "none";
createCircuit.style.display = "none";
createCircuit2.style.display = "none";
createCircuit3.style.display = "none";
createCircuit4.style.display = "none";
createCircuit5.style.display = "none";
countdown.style.display = "none";
circuitPage.style.display = "none";
menuPop.style.display = "none";
congrate.style.display = "none";
//----------------------------------------

//bodymovin js to play Lottiefiles
const loadAnimation = document.getElementById("loadani");
const firstAnimation = document.getElementById("firstAnim");
const countdAnimation = document.getElementById("countdani");
const congrateani = document.getElementById("congrateani");
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

const congratAni = bodymovin.loadAnimation({
    wrapper: congrateani,
    animType: 'svg',
    loop: true,
    autoplay: true,
    path:'https://assets5.lottiefiles.com/packages/lf20_obhph3sh.json'
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
             renderCircuits();
        } else {
            firstTime.style.display = "block";
        }
    } else {
        alert("your Browser doesn't has local storage")
    }

}, 2400);
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


let timer;
//Begin Circuit
let BeginCircit = (name, time, upper, lower, compound, cardio) => {
    console.log(name + time + upper + lower + compound + cardio)
    homePage.style.display = "none"
    countdown.style.display = "block"
    countdAni.play();
    $(".countdown-wrapper").delay(3000).fadeToggle(400);
    setTimeout(() => {
        circuitPage.style.display = "block"
        circuitStart(time, upper, lower, compound, cardio);
        countdown.style.display = "none"
        countdAni.stop();
    },3500)
}

let uppertime = 60;
let lowertime = 60;
let compoundtime = 60;
let cardiotime = 60;
let breaktime = 60;
const cctimeDisplay = document.getElementById("CircuitTimeDisplay");
const excDisplay = document.getElementById("excDisplay");
const ccDes = document.getElementById("ccDes");

let checkCircuit = (set, upper, lower, compound,cardio) => {
    if(!paused) {
        if(uppertime > 0){
            uppertime--;
            if(uppertime <= 9){
                cctimeDisplay.innerText = "00:" + "0"+uppertime;
            }
            else{
                cctimeDisplay.innerText = "00:" + uppertime;
            }
            ccDes.innerText = DesCheck(upper)
            excDisplay.innerText = upper
        }
        else if(uppertime <= 0 && lowertime > 0){
            lowertime--;
            if(lowertime <= 9){
                cctimeDisplay.innerText = "00:" + "0"+lowertime;
            }
            else{
                cctimeDisplay.innerText = "00:" + lowertime;
            }
            ccDes.innerText = DesCheck(lower)
            excDisplay.innerText = lower
        }
        else if(lowertime <= 0 && compoundtime > 0){
            compoundtime--;
            if(compoundtime <= 9){
                cctimeDisplay.innerText = "00:" + "0"+compoundtime;
            }
            else{
                cctimeDisplay.innerText = "00:" + compoundtime;
            }
            ccDes.innerText = DesCheck(compound)
            excDisplay.innerText = compound
        }
        else if(compoundtime <= 0 && cardiotime > 0){
            cardiotime--;
            if(cardiotime <= 9){
                cctimeDisplay.innerText = "00:" + "0"+cardiotime;
            }
            else{
                cctimeDisplay.innerText = "00:" + cardiotime;
            }
            ccDes.innerText = DesCheck(cardio)
            excDisplay.innerText = cardio
        }
        else if(cardiotime <= 0 && breaktime > 0){
            breaktime--;
            if(breaktime <= 9){
                cctimeDisplay.innerText = "00:" + "0"+breaktime;
            }
            else{
                cctimeDisplay.innerText = "00:" + breaktime;
            }
            ccDes.innerText = DesCheck("")
            excDisplay.innerText = "Break!"
        }
        else if(breaktime <= 0 && set > 0){
            uppertime = 60;
            lowertime = 60;
            compoundtime = 60;
            cardiotime = 60;
            breaktime = 60;
        }
        else{
            console.log("circuit complete")
            congratualation();
        }
    }
}

let congratualation = () => {
    congrate.style.display = "block"
    setTimeout(()=>{
        location.reload();
    }, 2000)
}

let circuitStart = (time, upper, lower, compound, cardio) =>{
    let set = time * 60;
    console.log(set)
    
    timer = setInterval(() => {
        
    checkCircuit(set, upper, lower, compound,cardio)
    --set;
    }
    , 1000);
}

let DesCheck = (exc) => {

    let output;

    switch(exc) {
        case "Push-up":
            output = 'Push-ups are a classic bodyweight exercise that primarily target the chest, triceps, and shoulders, by lifting and lowering your body using your arms while maintaining a plank position, and they can be modified in various ways to suit different fitness levels.'
        break;
        case "Tricep dip":
            output = 'Tricep dips are an effective bodyweight exercise that target the triceps muscles, using a bench or sturdy surface for support, and they can be modified in various ways to increase or decrease the difficulty level.'
        break;
        case "Bent-over row":
            output = 'Bent-over rows are a compound strength-training exercise that targets multiple muscle groups in the upper body, particularly the back, biceps, and shoulders, and involve leaning forward with a slight bend in the knees, holding a weight in each hand, and pulling the weights towards your chest while keeping your elbows close to your body.'
        break;
        case "Squat":
            output = 'Squats are a fundamental strength-training exercise that targets multiple muscle groups, particularly the quadriceps, glutes, and hamstrings, and involve standing with feet shoulder-width apart, bending your knees and hips to lower your body into a sitting position, and then standing back up. Proper form, including keeping your knees in line with your toes and maintaining a neutral spine, is important to prevent injury and maximize the benefits of this exercise.'
        break;
        case "Superman":
            output = 'The Superman exercise is a bodyweight exercise that targets the lower back and glute muscles, and involves lying face down on the ground with arms extended overhead and legs straight, then simultaneously lifting your arms, chest, and legs off the ground, holding briefly, and then lowering back down. This exercise can be modified by lifting only the arms or only the legs, or by using a stability ball for support.'
        break;
        case "Forward lunge":
            output = 'Forward lunges are a lower body strength-training exercise that target the quadriceps, hamstrings, and glutes, and involve standing with feet hip-width apart, stepping one foot forward and bending both knees to lower your body towards the ground, keeping your front knee in line with your toes and your back knee pointing towards the floor, and then pushing back up to the starting position. This exercise can be performed with bodyweight or with added weight using dumbbells or a barbell.'
        break;
        case "Jumping lunge":
            output = 'Jumping lunges are a dynamic variation of the lunge exercise that increases the intensity and adds a cardiovascular component, targeting the quadriceps, hamstrings, and glutes, and involve starting in a lunge position with one leg forward and one leg back, then jumping explosively and switching the position of your legs mid-air to land in a lunge with the opposite leg forward, and repeating for the desired number of reps or time. Proper form, including keeping your knees in line with your toes and maintaining a neutral spine, is important to prevent injury.'
        break;
        case "Mountain climbers":
            output = 'Mountain climbers are a dynamic bodyweight exercise that target multiple muscle groups, including the core, shoulders, and legs, and involve starting in a plank position with your hands shoulder-width apart and your body in a straight line, then bringing one knee towards your chest, then quickly switching legs in a running-like motion, keeping your hips level and your core engaged throughout the movement. This exercise can be performed for a set number of reps or for time.'
        break;
        case "Thruster":
            output = 'The thruster is a compound strength-training exercise that combines a front squat with an overhead press, targeting multiple muscle groups including the quadriceps, glutes, shoulders, and triceps, and involves holding a barbell or dumbbells at shoulder height, squatting down until your thighs are parallel to the ground, then standing up and pressing the weights overhead in one fluid motion. This exercise requires proper form and coordination to perform safely and effectively.'
        break;
        case "Jumping rope":
            output = 'Jumping rope is a cardiovascular exercise that involves jumping over a fast-moving rope while maintaining proper form, including keeping your feet together and your elbows close to your sides, and landing softly on the balls of your feet to minimize impact on your joints. This exercise can be performed with a variety of jumping techniques and variations, such as single-leg jumps, double unders, or criss-crosses, and can be an effective way to improve coordination, endurance, and agility.'
        break;
        case "Running":
            output = 'Running is a popular form of cardiovascular exercise that involves moving at a faster pace than walking or jogging, and can be performed indoors on a treadmill or outdoors on a track, road, or trail. Proper form, including maintaining a relaxed posture and landing mid-foot, as well as gradually increasing intensity and distance, can help prevent injury and maximize the benefits of running, such as improved cardiovascular fitness, weight management, and stress reduction.'
        break;
        case "Cycling":
            output = 'Cycling is a low-impact cardiovascular exercise that can be performed indoors on a stationary bike or outdoors on a road, trail, or mountain bike, and targets multiple muscle groups including the quadriceps, hamstrings, glutes, and calves. Proper form, including maintaining a neutral spine and adjusting the resistance level to match your fitness level, can help prevent injury and maximize the benefits of cycling, such as improved cardiovascular fitness, weight management, and stress reduction.'
        break;
        default:
        output = 'Great job on your workout! Remember to take breaks as needed and stay hydrated by drinking water throughout your session. Your body will thank you for it.'   
    }

    return output;
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
    menuPop.style.display = "block";
    pauseMenu.style.display = "block"
    paused = true;
}
stop.onclick = () =>{
    menuPop.style.display = "block";
    stopMenu.style.display ="block";
    paused = true;
}
pauseMenu.onclick = () =>{
    menuPop.style.display = "none";
    pauseMenu.style.display = "none";
    paused = false;
}

let stopY = () => {
    console.log("stop");
    location.reload();
    // homePage.style.display = "block"
    // menuPop.style.display = "none";
    // stopMenu.style.display ="none";
}

let stopN = () => {
    menuPop.style.display = "none";
    stopMenu.style.display ="none";
}
//----------------------------------------

renderCircuits();//call default