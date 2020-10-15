const dgram = require('dgram');

//UDP To Send To Tello
const telloIP = '192.168.10.1';
const telloPort = 8889;
//UDP To Send To Tello

//UDP To Recieved From Tello
const telloLocalIP= '0.0.0.0';
const telloPortTx = 8890;
//UDP To Recieved From Tello

//UDP For Video Feed Tello
const telloVideoIp = '0.0.0.0';
const telloVideoPort = 11111;
//UDP For Video Feed Tello

//This Sends To Tello
const djiTello = dgram.createSocket('udp4');

//This Recieves From Tello
const djiTelloRx = dgram.createSocket('udp4');

//Video Feed From Tello
const djiTelloV = dgram.createSocket('udp4');

// When Tello Rcv Commands and accepted, returns Ok.
 djiTello.on('message',(message) =>{
    //const message = msg.toString();
    console.log("Tello: " + message);
}); 

// Rcv Flight Data Telemetry From Tello

function rxFrmTello(){
    djiTelloRx.addListener('message', (msg) =>{
        const message = msg.toString(); 
            function parseData(telemetry){
                return telemetry.split(';').map(x => x.split(':'));
                    // parse this data
                    // pitch:0;roll:0;yaw:23;vgx:0;vgy:0;vgz:0;templ:67;temph:69;tof:78;h:50;bat:100;baro:29.57;time:7;agx:2.00;agy:7.00;agz:-1003.00;
            }
        parseData(message);
        console.log(parseData(message));
    });
    djiTelloRx.bind(telloPortTx,telloLocalIP,()=>{
        console.log('Listening');
    }); 
}

//This returns error on the Network side ( NOT TELLO )
function errorMsg(error){
    if(error){
        console.log("Tello: " + error );
    }
}

/* //Safe Mode Testing Only Comment when not using.
let sdkCom = 'command';
let batState = 'battery?';
djiTello.send(sdkCom,0,sdkCom.length,telloPort,telloIP,errorMsg);
djiTello.send(batState,0,batState.length,telloPort,telloIP,errorMsg);
*/

let testFlightCommands = ['command','takeoff','battery?','land'];
let i = 0;
//Test Flight ( Sends Commands to Dji Tello based off Array )
function testFlight(){
    //console.log(flightCommand);
    let flightCommand = testFlightCommands[i];
    console.log(flightCommand);
    djiTello.send(flightCommand,0,flightCommand.length,telloPort,telloIP,errorMsg());
    if(i++ < testFlightCommands.length){
        setTimeout(testFlight,5000);      
    }
    
  console.log('done');


}

//Execute
rxFrmTello();
testFlight(); 
