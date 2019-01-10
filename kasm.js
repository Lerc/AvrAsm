#!/usr/bin/env node
const assemble = require("./assembler.js");
const fs=require("fs");

var fileLoader = filename=>fs.readFileSync(filename,'utf8');


function byteAsHex(byte) {
  let d1 = ((byte >> 4) &0x0f);
  let d2 = byte &0x0f;

  return d1.toString(16)+d2.toString(16);
}

var hexFile = function(){
  let file = [];

  function hexRecord(data,offset=0,type=0) {
    let offsetLow = offset&0xff;
    let offsetHigh = (offset >>8) & 0xff;
    let bytes = [data.length,offsetHigh,offsetLow,type,...data];

    let result=":";
    
    let a = 0;
    for (b of bytes) {
      result+=byteAsHex(b);
      a+=b;
    }
		result += byteAsHex(-a);
		return result;
  }

  function addEof() {
    file.push( hexRecord([],0,1) );
  }

  function addAddress(address) {
    let data = [
      (address >> 24) & 0xff,
      (address >> 16) & 0xff,
      (address >> 8) & 0xff,
      (address >> 0) & 0xff,
    ];
    file.push(hexRecord(data,0,5));
  }

  function addData(address,data) {
   // addAddress(address);
		let offset=0;
		
    for (let offset=0; offset<data.length; offset+=16) {
			let line = data.slice(offset,offset+16);
			file.push(hexRecord(line,offset+address,0));
		}
  }

  function clear() {
    file=[];
  }
  function getText() {
    return file.join('\n');
  }

  return {addEof, addAddress, addData, clear, getText, hexRecord};
}


var mainSourceName = process.argv[process.argv.length-1];
var outputFilename = "out.hex";
console.log ("assembling "+mainSourceName);
fileLoader(mainSourceName);

try {
	var {output,debugInfo} = assemble(mainSourceName,fileLoader);
	let hex=hexFile();
	for (let chunk of output) {
		hex.addData(chunk.address*2,new Uint8Array(chunk.data.buffer));
	}
	hex.addEof();
	console.log("writing "+outputFilename );
	fs.writeFileSync(outputFilename,hex.getText());

} catch (e) {
	console.log("Fatal error:" + e.message);
}

