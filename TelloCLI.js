const dgram = require('dgram');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line',(input)=>{
    console.log(`Recieved: ${input}`);
});