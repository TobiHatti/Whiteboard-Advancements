// ==UserScript==
// @name         Whiteboard-Extensions
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*.whiteboardfox.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=whiteboardfox.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.pencolor = "blue";
    window.rulerActive = false;

    ApplyNewStyles(`
    #menuStrip{
    background: DimGray;
    background: radial-gradient(circle, #444444 0%, #666666 100%);
    }

    .gwt-ToggleButton,
    .gwt-PushButton,
    .gwt-PushButton-up{
    background: DimGray;
    background: radial-gradient(circle, #444444 0%, #666666 100%);
    border:none;
    border-bottom: 2px solid #666666;
    color: white;
    outline: none;
    border-radius: 0;
    transition: padding-left ease-out 0.3s;
    }

    .gwt-ToggleButton-up-hovering,
    .gwt-PushButton-up-hovering{
    background: DimGray;
    background: radial-gradient(circle, #666666 0%, #1E90FF 100%);
    color: #E0FFFF;
    outline: none;
    }

    .gwt-ToggleButton-down-hovering,
    .gwt-PushButton-down-hovering,
    .gwt-ToggleButton-down,
    .gwt-PushButton-down{
    background: DimGray;
    background: radial-gradient(circle, #666666 0%, #2b97ff 100%);
    color: #00BFFF;
    outline: none;
    padding-left: 10px;
    transition: padding-left ease-out 0.05s;
    }

    .html-face img{
    filter: contrast(100%) brightness(1005%);
    }

    #exp-msg{
    left: 0px;
    top: 785px;
    height: 75px;
    width: 140px;
    box-sizing: border-box;
    overflow-wrap: break-word;

    min-width: 0;
    margin-left: 0;
    }

    #mouseFollower{
     position: fixed;
     z-index: 10000;
     pointer-events:none;
    }

    .mousePenBlack,
    .mousePenBlue,
    .mousePenAqua,
    .mousePenRed,
    .mousePenGreen,
    .mousePenPurple,
    .mousePenYellow{
    width: 8px;
    height: 8px;
    border-radius: 100%;
    cursor : none;
    }

    .mousePenBlack{
    background-color: #4a4a4a;
    }

    .mousePenBlue{
    background-color: #2761a4;
    }

    .mousePenAqua{
    background-color: #44bff2;
    }

    .mousePenRed{
    background-color: #c1086c;
    }

    .mousePenGreen{
    background-color: #98bb13;
    }

    .mousePenPurple{
    background-color: #ac90e3;
    }

    .mousePenYellow{
    background-color: #e6b82e;
    }

    .mousePenMove{

    }

    .mousePenEraser{
    background-color: red;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    opacity: 0.8;
    }

    .mousePenEraser:before{
    content:"";
    display: block;
    width: 16px;
    height: 16px;
    border: 3px solid red;
    transform: rotate(45deg);
    margin-left: -7px;
    margin-top: -7px;
    border-radius: 2px;
    opacity: 0.5;
    }

    .mousePenRuler:after{
    content:"";
    display: block;
    background-color: #333333;
    transform: rotate(-45deg);
    margin-left: 5px;
    margin-top: 10px;
    width: 16px;
    height: 4px;
    }

    canvas{
    cursor: none;
    }
    `);


    setTimeout(function () {


        ApplyLayout2();

//         document.addEventListener("keypress", function(event) {

//         if (event.keyCode == 43) {
//             console.log('+');
//         }

//         if (event.keyCode == 45) {
//             console.log('-');
//         }
    // });


    }, 1000);

    CreateMouseFollower();

})
();


function ApplyLayout2(){
    var zoomInButton = document.querySelector('div[title="Focus on a smaller whiteboard area"]').parentElement;
    var zoomOutButton = document.querySelector('div[title="Focus on a larger whiteboard area"]').parentElement;

    var rulerButton = document.querySelector('div[title="Draw straight lines"]').parentElement;
    var moveButton = document.querySelector('div[title="Reposition the view or move elements"]').parentElement;

    var textButton = document.querySelector('div[title="Insert text into the whiteboard"]').parentElement;
    var imageButton = document.querySelector('div[title="Insert a picture from an image file"]').parentElement;

    var settingsButton = document.querySelector('div[title="More whiteboard options"]').parentElement;
    var clearButton = document.querySelector('div[title="Erase multiple drawing elements in a single action"]').parentElement;

    var eraseButton = document.querySelector('div[title="Erase whiteboard elements"]').parentElement;
    var penSelector = document.querySelector('div[title="Draw with a pencil (press again to show color palette)"]').parentElement;

    var penBlackButton = document.getElementsByClassName("gwt-PushButton")[2].parentElement;
    var penBlueButton = document.getElementsByClassName("gwt-PushButton")[3].parentElement;
    var penAquaButton = document.getElementsByClassName("gwt-PushButton")[4].parentElement;
    var penRedButton = document.getElementsByClassName("gwt-PushButton")[5].parentElement;
    var penGreenButton = document.getElementsByClassName("gwt-PushButton")[6].parentElement;
    var penPurpleButton = document.getElementsByClassName("gwt-PushButton")[7].parentElement;
    var penYellowButton = document.getElementsByClassName("gwt-PushButton")[8].parentElement;

    zoomInButton.style.top = "350px";
    zoomInButton.style.left = "0px";
    zoomInButton.style.width = "70px";

    zoomOutButton.style.top = "350px";
    zoomOutButton.style.left = "70px";
    zoomOutButton.style.width = "70px";

    rulerButton.style.top = "600px";
    rulerButton.style.left = "0px";
    rulerButton.style.width = "140px";

    textButton.style.top = "670px";
    textButton.style.left = "0px";
    textButton.style.width = "70px";

    imageButton.style.top = "670px";
    imageButton.style.left = "70px";
    imageButton.style.width = "70px";


    clearButton.style.top = "860px";
    clearButton.style.left = "0px";
    clearButton.style.width = "70px";

    settingsButton.style.top = "860px";
    settingsButton.style.left = "70px";
    settingsButton.style.width = "70px";

    penSelector.onclick = function() {
        switch(window.pencolor){
            case "black":
                document.getElementById("mouseFollower").className = "mousePenBlack";
                break;
            case "blue":
                document.getElementById("mouseFollower").className = "mousePenBlue";
                break;
            case "aqua":
                document.getElementById("mouseFollower").className = "mousePenAqua";
                break;
            case "red":
                document.getElementById("mouseFollower").className = "mousePenRed";
                break;
            case "green":
                document.getElementById("mouseFollower").className = "mousePenGreen";
                break;
            case "purple":
                document.getElementById("mouseFollower").className = "mousePenPurple";
                break;
            case "yellow":
                document.getElementById("mouseFollower").className = "mousePenYellow";
                break;

        }

        if(window.rulerActive){
            document.getElementById("mouseFollower").classList.add("mousePenRuler");
        }

        document.querySelector("canvas").style.cursor = "none";

    };

    penBlackButton.onclick = function() {
        document.getElementById("mouseFollower").className = "mousePenBlack";
        document.querySelector("canvas").style.cursor = "none";
        window.pencolor = "black";

        if(window.rulerActive){
            document.getElementById("mouseFollower").classList.add("mousePenRuler");
        }
    };

    penBlueButton.onclick = function() {
        document.getElementById("mouseFollower").className = "mousePenBlue";
        document.querySelector("canvas").style.cursor = "none";
        window.pencolor = "blue";

        if(window.rulerActive){
            document.getElementById("mouseFollower").classList.add("mousePenRuler");
        }
    };

    penAquaButton.onclick = function() {
        document.getElementById("mouseFollower").className = "mousePenAqua";
        document.querySelector("canvas").style.cursor = "none";
        window.pencolor = "aqua";

        if(window.rulerActive){
            document.getElementById("mouseFollower").classList.add("mousePenRuler");
        }
    };

    penRedButton.onclick = function() {
        document.getElementById("mouseFollower").className = "mousePenRed";
        document.querySelector("canvas").style.cursor = "none";
        window.pencolor = "red";

        if(window.rulerActive){
            document.getElementById("mouseFollower").classList.add("mousePenRuler");
        }
    };

    penGreenButton.onclick = function() {
        document.getElementById("mouseFollower").className = "mousePenGreen";
        document.querySelector("canvas").style.cursor = "none";
        window.pencolor = "green";

        if(window.rulerActive){
            document.getElementById("mouseFollower").classList.add("mousePenRuler");
        }
    };

    penPurpleButton.onclick = function() {
        document.getElementById("mouseFollower").className = "mousePenPurple";
        document.querySelector("canvas").style.cursor = "none";
        window.pencolor = "purple";

        if(window.rulerActive){
            document.getElementById("mouseFollower").classList.add("mousePenRuler");
        }
    };

    penYellowButton.onclick = function() {
        document.getElementById("mouseFollower").className = "mousePenYellow";
        document.querySelector("canvas").style.cursor = "none";
        window.pencolor = "yellow";

        if(window.rulerActive){
            document.getElementById("mouseFollower").classList.add("mousePenRuler");
        }
    };

    moveButton.onclick = function() {
        document.getElementById("mouseFollower").className = "mousePenMove";
        document.querySelector("canvas").style.cursor = "move";
    };

    eraseButton.onclick = function() {
        document.getElementById("mouseFollower").className = "mousePenEraser";
        document.querySelector("canvas").style.cursor = "none";
    };

    rulerButton.onclick = function() {
        window.rulerActive = !window.rulerActive;

        if(window.rulerActive){
            document.getElementById("mouseFollower").classList.add("mousePenRuler");
        }
        else{
            document.getElementById("mouseFollower").classList.remove("mousePenRuler");
        }
    };

    document.getElementById("menuStrip").appendChild(zoomInButton);
    document.getElementById("menuStrip").appendChild(zoomOutButton);
    document.getElementById("menuStrip").appendChild(rulerButton);
    document.getElementById("menuStrip").appendChild(textButton);
    document.getElementById("menuStrip").appendChild(imageButton);
}



function ApplyNewStyles(styles){
    let head = document.head;
    let style = document.createElement('style');
    head.appendChild(style);
    style.type = 'text/css';
    if (style.styleSheet){
        // This is required for IE8 and below.
        style.styleSheet.cssText = styles;
    } else {
        style.appendChild(document.createTextNode(styles));
    }
}

function CreateMouseFollower(){

    let body = document.body;
    let pointer = document.createElement('div');
    body.appendChild(pointer);
    pointer.id = "mouseFollower";
    document.getElementById("mouseFollower").className = "mousePenBlue";

     document.onpointermove = handleMouseMove;

     document.body.onpointerdown = function() {
         document.getElementById("mouseFollower").style.display = "none";
     }
     document.body.onpointerup = function() {
         document.getElementById("mouseFollower").style.display = "block";

     }
}

 function handleMouseMove(event) {
     var eventDoc, doc, body;

     event = event || window.event; // IE-ism

     // If pageX/Y aren't available and clientX/Y are,
     // calculate pageX/Y - logic taken from jQuery.
     // (This is to support old IE)
     if (event.pageX == null && event.clientX != null) {
         eventDoc = (event.target && event.target.ownerDocument) || document;
         doc = eventDoc.documentElement;
         body = eventDoc.body;

         event.pageX = event.clientX +
             (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
             (doc && doc.clientLeft || body && body.clientLeft || 0);
         event.pageY = event.clientY +
             (doc && doc.scrollTop || body && body.scrollTop || 0) -
             (doc && doc.clientTop || body && body.clientTop || 0 );
     }

     // Use event.pageX / event.pageY here

     document.getElementById("mouseFollower").style.left = event.pageX - 4 + "px";
     document.getElementById("mouseFollower").style.top = event.pageY - 4 + "px";

 }
