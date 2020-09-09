var power = "off";
var oneLife = "off";
var run = false;
var memory = [];
var memoryCount = 0;
var user = [];
var userCount = 0;
var levelCount = 1;
var tempColor;
var runningMemory;
var matching = true;
var speed;

class colorButton {
    constructor(id, color) {
        this.id = id;
        this.color = color;
    }
}
var blue = new colorButton(1, "Blue");
var green = new colorButton(2, "Green");
var red = new colorButton(3, "Red");
var yellow = new colorButton(4, "Yellow");

//-- When clicking power button --//

$("#powerSwitch").on("click", function() {
if (power == "off") {
    $("#onButton").css("visibility", "visible");
    $("#offButton").css("visibility", "hidden");
    $("#textDisplay").css("opacity", "1");
    power = "on";
    }
else if (power == "on") {
     $("#onButton").css ("visibility", "hidden");
    $("#offButton").css("visibility", "visible");
    $("#textDisplay").css("opacity", "0.2");
    power = "off";
    oneLife = "off";
    $("#oneLifeButton").css("background", "green");
    $("#oneLifeButton").removeClass("fa fa-check");
    run = false;
    $("#startButton").css("background", "orange");
    memory = [];
    user = [];
    levelCount = 1;
    $("#textDisplay").html("--");
    memoryCount = 0;
    userCount = 0;
    matching = true;
    clearInterval(runningMemory);
    $(".fourButtons").css("pointer-events", "none");
    }
});

//-- When clicking one life button --//

$("#oneLifeButton").on("click", function() {
    if (power == "on" && run == false) {
        if (oneLife == "off") {
            $("#oneLifeButton").css("background", "red");
        $("#oneLifeButton").addClass("fa fa-check");
        oneLife = "on";
        }
    else if (oneLife == "on") {
            $("#oneLifeButton").css("background", "green");
            $("#oneLifeButton").removeClass("fa fa-check");
            oneLife = "off";
        }
    }
});

//-- When clicking start button --//

$("#startButton").on("click", function() {
    if (power == "on") {
        $("#startButton").css("background", "blue");
        run == true;
        user = [];
        memory = [];
        memoryCount = 0;
        userCount = 0;
        levelCount = 1;
        $("#textDisplay").html("--");
        matching = true;
        clearInterval(runningMemory);
        $(".fourButtons").css("pointer-events", "none");
        newMemory();
        console.log(memory);
        setTimeout(function() {runningMemory = setInterval(playMemory, 1000);}, 1000);
    }
});

//-- When clicking the coloured panels --//

//-- Add event listeners for each coloured panel instead of below --//

$("div[id*='#button']").on("click", function() {
    if (power == "on" && run) {
        if (event.which == 1) {
            $("#sound" + this.id).get(0).play();
            user.push(this.id.slice(6, 9));
            userCount++;

            for (i = 0; i < user.length; i++) {
                if (memory[i] != user[i]) {
                    matching = false;
                }
            }
            if (!matching) {
                $("#textDisplay").html("!!");
                $("#soundFailButton").get(0).play();
                user = [];
                memoryCount = 0;
                userCount = 0;
                matching = true;
                $(".fourButtons").css("pointer-events", "none");
                if (oneLife = "on") {
                    memory = [];
                    levelCount = 1;
                    newMemory();
                    console.log(memory);
                    setTimeout(function() {runningMemory = setInterval(playMemory, speed);}, 1000);
                }
                else {
                    setTimeout(function() {runningMemory = setInterval(playMemory, speed);}, 1000);
                }
            }
            else {
                if (userCount == memoryCount) {
                    if (matching) {
                        if (levelCount == 25) {
                            win();
                        }
                        else {
                            user = [];
                            memoryCount = 0;
                            userCount = 0;
                            newMemory();
                            levelCount++;

                            switch(levelCount) {
                                case 1:
                                case 2:
                                case 3:
                                case 4:
                                    speed = 1000;
                                        break;
                                case 5:
                                    speed = 700;
                                        break;
                                case 10:
                                    speed = 500;
                                        break;
                                case 14:
                                    speed = 300;
                                        break;
                            }
                            setTimeout(function() {runningMemory = setInterval(playMemory, speed);}, 1000);
                            $(".fourButtons").css("pointer-events", "none");
                        }
                    }
                }
            }
        }
    }
});

//-- Random selection of colours flashing associated with level --//

function newMemory() {
    var temp = Math.floor((Math.random() * 4) + 1);
    switch(temp) {
        case 1:
            memory.push("Blue");
                break;
        case 2:
            memory.push("Green");
                break;
        case 3:
            memory.push("Red");
                break;
        case 4:
            memory.push("Yellow");
                break;
    }
}

function playMemory() {
    $("#textDisplay").html(levelCount);
    tempColor = memory[memoryCount];
    $(`#sound${tempColor}Button`)[0].play();
    $(`#button${tempColor}`).addClass("activated");
    setTimeout(function() {$("#button" + tempColor).removeClass("activated");}, 250);
    memoryCount++;
    if (memoryCount == memory.length) {
        clearInterval(runningMemory);
        $(".fourButtons").css("pointer-events", "auto");
    }
}

function win() {
    $("#textDisplay").html("WIN");
    $("#buttonBlue").addClass("activated");
    setTimeout(function() {
        $("#buttonBlue").removeCLass("activated");}, 250);
    setTimeout(function() {
        $("#buttonGreen").addClass("activated");}, 250);
    setTimeout(function() {
            $("#buttonGreen").removeClass("activated");}, 500);
    setTimeout(function() {
        $("#buttonRed").addClass("activated");}, 500);
    setTimeout(function() {
        $("#buttonRed").removeClass("activated");}, 750);
    setTimeout(function() {
        $("#buttonYellow").addClass("activated");}, 750);
    setTimeout(function() {
        $("#buttonYellow").removeClass("activated");}, 1000);
    
    setTimeout(function() {
        $("#buttonBlue").addClass("activated");}, 1250);
    setTimeout(function() {
        $("#buttonGreen").addClass("activated");}, 1250);
    setTimeout(function() {
        $("#buttonRed").addClass("activated");}, 1250);
    setTimeout(function() {
        $("#buttonYellow").addClass("activated");}, 1250);
    setTimeout(function() {
        $("#buttonBlue").removeClass("activated");}, 1500);
    setTimeout(function() {
        $("#buttonGreen").removeClass("activated");}, 1500);
    setTimeout(function() {
        $("#buttonRed").removeClass("activated");}, 1500);
    setTimeout(function() {
        $("#buttonYellow").removeClass("activated");}, 1500);

    setTimeout(function() {
        $("#buttonBlue").addClass("activated");}, 1750);
    setTimeout(function() {
        $("#buttonGreen").addClass("activated");}, 1750);
    setTimeout(function() {
        $("#buttonRed").addClass("activated");}, 1750);
    setTimeout(function() {
        $("#buttonYellow").addClass("activated");}, 1750);
    setTimeout(function() {
        $("#buttonBlue").removeClass("activated");}, 2000);
    setTimeout(function() {
        $("#buttonGreen").removeClass("activated");}, 2000);
    setTimeout(function() {
        $("#buttonRed").removeClass("activated");}, 2000);
    setTimeout(function() {
        $("#buttonYellow").removeClass("activated");}, 2000);

    setTimeout(function() {
        user = [];
        memory = [];
        memoryCount = 0;
        userCount = 0;
        levelCount = 1;
        $("#textDisplay").html("--");
        matching = true;
        clearInterva(runningMemory);
        $(".fourButtons").css("pointer-events", "none");
        newMemory();
        console.log(memory);
        setTimeout(function() {runningMemory = setInterval(playMemory, 1000);}, 1000);
    }, 3000);
}