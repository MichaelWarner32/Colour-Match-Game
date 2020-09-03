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

class buttonColor {
    constructor(id, color) {
        this.id = id;
        this.color = color;
    }
}
var blue = new buttonColor(1, "blue");
var green = new buttonColor(2, "green");
var red = new buttonColor(3, "red");
var yellow = new buttonColor(4, "yellow");

//--When clicking power button--//

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
    $("#oneLifeButton").css("background", "red");
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

//-- When clicking one life button--//

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

//-- When clicking start button--//

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

//--When clicking the coloured panels--//

$("div[id*='button']").on("click", function() {
    if (power == "on" && run) {
        if (event.which == 1) {
            $("#sound" + this.id).get(0).cloneNode().play();
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
                    setTimeout(function() {runningMemory = setInterval(playMemory, tmepo);}, 1000);
                }
                else {
                    setTimeout(function() {runningMemory = setInterval(playMemory, tempo);}, 1000);
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
                                    tempo = 1000;
                                        break;
                                case 5:
                                    tempo = 700;
                                        break;
                                case 10:
                                    tempo = 500;
                                        break;
                                case 14:
                                    tempo = 300;
                                        break;
                            }
                            setTimeout(function() {runningMemory = setInterval(playMemory, tempo);}, 1000);
                            $(".fourButtons").css("pointer-events", "none");
                        }
                    }
                }
            }
        }
    }
});