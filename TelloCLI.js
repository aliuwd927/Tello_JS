//Require Section
const dgram = require('dgram');
const readline = require('readline');

//Send Command & Recieve Response
const telloIp = '192.168.10.1';
const telloPort = 8889;

//Recieve Tello State ( For Data Telemetry Stuff )
const udpServer = '0.0.0.0';
const udpPort = 8890;

//Tx & Rx To Tello
const djiTello = dgram.createSocket('udp4');

//Event Emitters from Tello
djiTello.on('message',(message,rinfo)=>{
    console.log(`${message} from ${rinfo.address}:${rinfo.port}`);
});

djiTello.on('error',(err)=>{
    console.log(`Error:\n${err}`);
});

djiTello.on('listening',()=>{
    const address = djiTello.address();
    console.log(`Tello listening on ${address.address}:${address.port}`);
});

djiTello.bind(telloPort);

//CLI To Tx To Tello
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
    
rl.on('line',(input)=>{
    djiTello.send(input,0,input.length,telloPort,telloIp);
});

