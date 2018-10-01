require('mraa');

var requestify = require('requestify');

var groveSensor = require('jsupm_grove');
var sensorModule = require('jsupm_ttp223');

var sleep = require("sleep");

var myThing = "t141_dm120_Leandro";

var temperatureSensor = new groveSensor.GroveTemp(0);//A0
var lightSensor = new groveSensor.GroveLight(1);//A1
var touchSensor = new sensorModule.TTP223(4);//D4
var buttonSensor = new groveSensor.GroveButton(8);//D8
var buzzerSensor = new groveSensor.GroveLed(2);//D2

var playOn = false;
var statusAcceptable = "acceptable ambient temperature";
var statusLow = "low ambient temperature";
var statusHigh = "high ambient temperature";
var status = statusAcceptable;
var alarmeActiveted = false;

var temperatureCelsiusLocal = 0;
var luminosityLuxLocal = 0;
var touchPressLocal = 0;
var buttonStateLocal = false;

function postDataSensor() {
    //console.log("1 - postDataSensor [IN]");
    
    var changes = false;

    var temperatureCelsius = temperatureSensor.value();
    if( temperatureCelsiusLocal != temperatureCelsius )
    {
        if (temperatureCelsius < 28)
            status = statusLow;
        else if (temperatureCelsius >= 28 && temperatureCelsius < 30)
            status = statusAcceptable;
        else
            status = statusHigh;
        temperatureCelsiusLocal = temperatureCelsius;
        changes = true;
        //console.log("1 - postDataSensor  = temperatureCelsius: " + temperatureCelsius + " status: "+ status );
    }

    var luminosityLux = lightSensor.value();
    if( luminosityLuxLocal != luminosityLux )
    {
        luminosityLuxLocal = luminosityLux;
        changes = true;
        //console.log("1 - postDataSensor  = luminosityLux: " + luminosityLux );
    }
   
    var touchPress = touchSensor.isPressed();
    if( touchPressLocal != touchPress )
    {
        touchPressLocal = touchPress;
        changes = true;
        //console.log("1 - postDataSensor  = touchPress: " + touchPress );
    }

    var buttonState = buttonSensor.value();
    if ( buttonStateLocal != buttonState ) {
        buttonStateLocal = buttonState;
        changes = true;
        alarmeActiveted = !alarmeActiveted;
        //console.log("1 - postDataSensor  = buttonState: " + buttonState + " alarmeActiveted: "+ alarmeActiveted );
    }

    if( changes )
    {
        console.log("1 - postDataSensor - post - temperatureCelsius: " + temperatureCelsius);
        console.log("1 - postDataSensor - post - luminosityLux: " + luminosityLux);
        console.log("1 - postDataSensor - post - buttonState: " + buttonState);
        console.log("1 - postDataSensor - post - touchPress: " + touchPress);
        console.log("1 - postDataSensor - post - alarmeActiveted: " + alarmeActiveted);
        console.log("1 - postDataSensor - post - status: " + status);

        var urlPost = "https://dweet.io:443/dweet/for/" + myThing;

        var body = {
            temperatureCelsius: temperatureCelsius,
            luminosityLux: luminosityLux,
            buttonState: buttonState,
            touchPress: touchPress,
            alarmeActiveted: alarmeActiveted,
            status: status
        };

        requestify.post(urlPost, body)
                    .then(function (response) 
                        {
                            response.getBody();
                            //console.log(response.body);
                        }
                    );
    }
    //console.log("1 - postDataSensor [OUT]");

    setTimeout(postDataSensor, 250);
}

function getDataCloud() {
    console.log("#########");
    console.log("3 - getDataCloud [IN]");

    var urlGet = "https://dweet.io:443/get/latest/dweet/for/" + myThing;

    requestify.get(urlGet)
                .then(function (response) 
                    {

                        var body = response.getBody();

                        var temperatureCelsius = body.with[0].content.temperatureCelsius;
                        var luminosityLux = body.with[0].content.luminosityLux;
                        var buttonState = body.with[0].content.buttonState;
                        var touchPress = body.with[0].content.touchPress;
                        var alarmeActiveted = body.with[0].content.alarmeActiveted;
                        var status = body.with[0].content.status;

                        console.log("3 - getDataCloud - get - temperatureCelsius: " + temperatureCelsius)
                        console.log("3 - getDataCloud - get - luminosityLux: " + luminosityLux)
                        console.log("3 - getDataCloud - get - buttonState: " + buttonState)
                        console.log("3 - getDataCloud - get - touchPress: " + touchPress)
                        console.log("3 - getDataCloud - get - alarmeActiveted: " + alarmeActiveted)
                        console.log("3 - getDataCloud - get - status: " + status)

                        if (alarmeActiveted) {
                            playOn = true;
                        } else {
                            playOn = false;
                        }
                        console.log("3 - getDataCloud - get - playOn "+playOn)
                    }
                );
    console.log("3 - getDataCloud [OUT]");
    console.log("#########");

    setTimeout(getDataCloud, 1000);
}

function play() {
    //console.log("************************");
    //console.log("4 - play - playOn: "+playOn);

    if (playOn) 
    {
        console.log("4 - play - playSound ");
        buzzerSensor.on()
        sleep.msleep(500);
        buzzerSensor.off()
    }
    else 
    {
        console.log("4 - play - stopSound ")
        buzzerSensor.off()
    }

    //console.log("************************");
    
    setTimeout(play, 1000);
}

play();
postDataSensor();
getDataCloud();
