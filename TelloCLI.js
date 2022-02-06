//--Require Section
const dgram = require("dgram");
const readline = require("readline");
const { clearInterval } = require("timers");

/* Ip Information Begin State for DJI Ryze Tello */

//--Send Command & Recieve Response from Tello on same port
const telloIp = "192.168.10.1";
const udpTxRxPort = 8889;

//--Recieve Tello State ( For Data Telemetry Stuff)
const udpServer = "0.0.0.0";
const udpTelloStatePort = 8890;

//--Tello Video To Stream
const udpTelloVideoPort = 11111;

/*Ip Information End State for DJI RYZE TELLO */

//--Tx & Rx To Tello using dgram
const djiTello = dgram.createSocket("udp4");
const djiTelloState = dgram.createSocket("udp4");
const djiTellVideo = dgram.createSocket("udp4");

//--Event Emitters from Tello
djiTello.on("listening", () => {
  const address = djiTello.address();
  console.log(`Tello listening on ${telloIp}:${address.port}`);
});

djiTello.on("message", (message) => {
  //Returns a reponse from Tello...When command is valid, the OK is returned from Tello To Client.
  console.log(`Tello: ${message}`);
});

djiTello.on("error", (err) => {
  console.log(`Error:\n${err}`);
});

djiTello.bind(udpTxRxPort);

/*Event Emitter for Tello State for Data Telemetry START*/

djiTelloState
  .on("message", (message) => {
    console.log(`${message}`);
  })
  .bind(udpTelloStatePort);

/*Event Emitter for Tello State for Data Telemetry END*/

/* Tello Command Line */
//--CLI To Tx To Tello
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//--This Keeps the connection alive ( When Tello is idle )
let countDown;

function startInterval() {
  countDown = setInterval(() => {
    const dummy = "command";
    djiTello.send(dummy, 0, dummy.length, udpTxRxPort, telloIp);
  }, 15 * 1000);
}

function endInterval() {
  clearInterval(countDown);
}
//--End Live Connnection

//--This is the CLI that send commands to Tello
rl.on("line", (input) => {
  endInterval();
  djiTello.send(input, 0, input.length, udpTxRxPort, telloIp); //this send command to 8889, standard command port, for video send to 8889, stream on 11111
  startInterval();
});
