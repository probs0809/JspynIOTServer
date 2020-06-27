var eventEmitter = require("./events.js");
var io = require("./socket.js");
var mqtt              = require('mqtt');
var mqttClient        = mqtt.connect('mqtt://localhost');

class Utility {
    constructor() {

    }

    isJSON(item) {
        item = typeof item !== "string" ? JSON.stringify(item) : item;

        try {
            item = JSON.parse(item);
        } catch (e) {
            return false;
        }

        if (typeof item === "object" && item !== null) {
            return true;
        }
        return false;
    };

    getAPI() {
        var d = new Date();
        var id = 'xxxx0xyxx8xxxy0xxxx9xxxxjxxxysxxyxxpxxxnx'.replace(/[xy]/g, (e) => {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (e == 'x' ? r : (r & 0x3 | 0x9)).toString(16);
        });
        return id;
    }

    sensorDataUpload(api, index, sensorName, value) {
        eventEmitter.emit(
            api + sensorName + String.toString(index),
            value
        );
        var send = io.of(
            "/" + api + "/" + sensorName + "/" + index
        );
        send.emit("sensorValue", value);
        send.emit("sensorName", sensorName);
        res.writeHead(200);
        res.end();
    }

    gps(api, index, alattitude, alongitude) {
        var GPSobject = {
            lattitude: alattitude,
            longitude: alongitude,
        };

        var gpsSend = JSON.stringify(GPSobject);
        eventEmitter.emit(api + "GPS" + index, gpsSend);
        var send = io.of("/" + api + "/" + index);
        send.emit("lattitude", alattitude);
        send.emit("longitude", alongitude);
    };


    transmit(api, gpioValue){
        io.of("/" + api).emit("value" , gpioValue);
        eventEmitter.emit("api" , api);
        eventEmitter.emit("IOT_DEVICE" , gpioValue);
        eventEmitter.emit("IOT_DEVICE-" + api , gpioValue);
        mqttClient.publish(api, gpioValue);
            
    }

}

module.exports = new Utility();