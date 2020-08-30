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

function buttonColor(id, color) {
    this.id =id;
    this.color = color;
}
var blue = new buttonColor(1, "blue");
var green = new buttonColor(2, "green");
var red = new buttonColor(3, "red");
var yellow = new buttonColor(4, "yellow");

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
        $("#textDisplay").css("opacity", "1");
        power = "off";

    }
});