Sugar.extend();
"use strict"
$(init);

var error = console.log;
var note = console.log;

var sampleCode = decodeURI(
  "%09port_MouseX%20=%20$2a%0A%09port_MouseY%20=%20$2b%0A%20%20%20%20%0A%09port_SerialPixelAddress_L%20=%20$22%0A%09port_SerialPixelAddress_M%20=%20$23%0A%09port_SerialPixelAddress_H%20=%20$24%0A%0A%09port_SerialPixelSet%20=%20$25%0A%20%20%20%20%0A%0A%09fish=7%0A%09double(x)=2x%0A%0A.snippit%20WaitForFrame%0Avwait_:%0A%09push%20r0%0A%09push%20r1%0A%09in%20r1,$28+4%0A.lp:%0A%09in%20r0,$28+4%0A%09cp%20r0,r1%0A%09breq%20.lp%0A%09pop%20r1%0A%09pop%20r0%0A%09ret%0A.end%0A%0A%0A.macro%20meat%20flavour%0A%09adc%20flavour,flavour%0A.end%0A%0A.macro%20addi%20reg,imm%0A%09subi%20reg,-imm%0A.end%0A%0A.macro%20vwait%20%0A%09.use%20WaitForFrame%0A%09call%20vwait_%0A.end%0A%0Astart:%0A%0A%09in%20r24,port_MouseX%0A%09in%20r25,port_MouseY%0A%20%20%20%20ldi%09r26,2%0A%20%20%20%20call%20plotPixel%0A%09mov%20r24,r18%0A%20%20%20%20mov%20r25,r19%0A%09ldi%20r26,0%0A%20%20%20%20call%20plotPixel%0A%09addi%20r18,1%0A%20%20%20%20addi%20r19,1%0A%09mov%20r24,r18%0A%20%20%20%20mov%20r25,r19%0A%09ldi%20r26,2%0A%20%20%20%20call%20plotPixel%0A%20%20%20%20%0A%09ldi%20r17,$00%0A%09out%20$20,r17%0A%09vwait%0A%09jmp%20start%0A%0AplotPixel:%0A%09call%20setPixelCursor%0A%20%20%20%20out%20port_SerialPixelSet,%20r26%0A%20%20%20%20ret%0A%20%20%20%20%0AsetPixelCursor:%0A%09out%20port_SerialPixelAddress_L,r24%0A%20%20%20%20sub%20r24,r24%0A%20%20%20%20add%09r25,r25%0A%20%20%20%20adc%20r24,r24%0A%20%20%20%20out%20port_SerialPixelAddress_M,r25%0A%20%20%20%20out%20port_SerialPixelAddress_H,r24%0A%20%20%20%20ret%0A%0A%09mov%20r0,%20r20%0Atestcode:%0A%09mov%20r0,%20r20%0A%09adc%20r31,%20r0%0A%09out%2035,%20r0%0A%09in%20r31,%20$32%0A%09ld%20r0,-X%0A%09ld%20r0,Y+13%0A%09brcc%20start%0A%09breq%20.lp%0A%09ld%20r0,Y+double(fish)%0A%09andi%20r20,1%0A%09meat%20r1%0A.lp:%0A%09adiw%20r25:24,1%0A%09movw%20r21:20,r1:r0%0A%09jmp%20.lp%0Aend:%0A%0A%0Adata:%0A%09%20.dw%20175,298,3254,32768%0A%09%20.dw%20$8040,%20$3060,%20$E246,%20$d020,%20$F00D%0A"  
);
  
  function makeBreakPointMarker() {
    var marker = document.createElement("div");
    marker.style.color = "#822";
    marker.innerHTML = "●";
    return marker;
  }

function init() {
  var textBox = $("<textarea>"+sampleCode+"</textarea>");
  var assembleButton = $("<button>Assemble</button>");
  var outputBox = $('<textarea readonly="true" >Output</textarea>');
  
  var assemblerBox = $("#assembler");
  assemblerBox.append(textBox).append(assembleButton).append(outputBox);

  var editorOptions = {
    lineNumbers:true,
    gutters: ["CodeMirror-linenumbers","breakpoints"]
  }
  var editor = CodeMirror.fromTextArea(textBox[0], editorOptions);
  window.editor=editor;
  editor.on("gutterClick", 
        (cm,n)=> cm.setGutterMarker(n,"breakpoints",cm.lineInfo(n).gutterMarkers?null:makeBreakPointMarker()) );

  var PCLine = 0;

  function setPCLine(value) {
    if (PCLine>=0) editor.doc.removeLineClass(PCLine,"background","ProgramCounter");
    PCLine=value;
    if (PCLine>=0) {
      editor.doc.addLineClass(PCLine,"background","ProgramCounter");
      editor.scrollIntoView(PCLine,0,50);
    }
  }
    
  emulatorHost.onUpdateDebugInfo = context => {
    if (!context) return;
    let avr = emulatorHost.avr;

    //console.log("debug", avr.PC, context[avr.PC]);
    setPCLine(context[avr.PC]-1);
  }  

  assembleButton.on('click',function (){
    setPCLine(-1);
    var code = editor.doc.getValue();
    outputBox[0].value='';
    var result = assemble(code);   
    var byteChunks = result.output.map( chunk => 
      ( {address:chunk.address, data: new Uint8Array(chunk.data.buffer) }) );
   
    emulatorHost.loadCodeChunks(byteChunks,result.map);
    
  });

  var outLine = s=>{outputBox[0].value+=s+"\n";}

  error = outLine;
  note = outLine;

}
