//List Devices
let HID = require('node-hid');
//let devices = HID.devices();
//console.log(devices);

//Device YOU want to select
/*
//Xbox
let device = new HID.HID(vid,pid);
    vendorId: 1118,
    productId: 767,

//PS4
let device = new HID.HID(vid,pid);
    venderId: 1356;
    productId: 1476;
*/
const hidDev = '\\\\?\\hid#vid_054c&pid_05c4#8&10555951&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}';
const ps4con = new HID.HID(1356,1476);

//Read Button Presses On PS4 Controller

let hexString = "1";

ps4con.on("data", function(data){
    const dataBuf = data;
    //const dataHex = data.toString('hex');
    //Console used to read data output
    //Use buffer.slice() to capture the one you want
    //console.log(dataBuf);

    // X Axis Left Stick (Left Right Only) //
    let ds4LABuf = dataBuf;
    let ds4XAVal = ds4LABuf.slice(1,2);
    let ds4_Xaxis = ds4XAVal.toString('hex');
    //console.log(ds4_Xaxis); 
        function hexToDecX(hexString){
            return console.log(parseInt( hexString, 16));
        }

        hexToDecX(ds4_Xaxis);

    // Y Axis Left Stick (Up Down Only) //
    let ds4YAVal = ds4LABuf.slice(2,3);
    let ds4_Yaxis = ds4YAVal.toString('hex');
        function hexToDecY(hexString){
            return console.log(parseInt(hexString, 16));
        }

        hexToDecY(ds4_Yaxis);
    //console.log(ds4_Yaxis); 00 = up ff = down

});


