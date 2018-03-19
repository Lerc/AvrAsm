Sugar.extend();
"use strict"
$(init);

var error = console.log;
var note = console.log;

var sampleMain = decodeURI(
  "%0A.include%20defs%0A%0A%0A%0Avar%20dot_x%201%0Avar%20dot_y%201%0A%0Aletw%20testX%201234%0Aletw%20testY%203456%0A%0A%0Ainit:%0A%09setStackPointer%20$ffff%0A%09load_let_values%0A%09ldi%20r16,150%0A%20%20%20%20sts%20dot_x,r16%0A%20%20%20%20ldi%20r16,100%0A%20%20%20%20sts%20dot_y,r16%0A%20%20%20%20%0Amainloop:%0A%0A%09in%20r24,port_MouseX%0A%09in%20r25,port_MouseY%0A%20%20%20%20ldi%09r26,2%0A%20%20%20%20call%20plotPixel%0A%20%20%20%20lds%20r24,dot_x%0A%20%20%20%20lds%20r25,dot_y%0A%20%20%20%20ldi%09r26,3%20%20%20%20%0A%20%20%20%20call%20plotPixel%0A%20%20%20%20lds%20r24,dot_x%0A%20%20%20%20lds%20r25,dot_y%0A%20%20%20%20inc%20r24%0A%20%20%20%20mov%20r26,r24%0A%20%20%20%20asr%20r26%0A%20%20%20%20asr%20r26%0A%20%20%20%20asr%20r26%20%20%20%20%0A%20%20%20%20asr%20r26%20%20%20%20%0A%20%20%20%20add%20r25,r26%0A%20%20%20%20sts%20dot_x,r24%0A%20%20%20%20sts%20dot_y,r25%0A%20%20%20%20ldi%20r26,2%0A%20%20%20%20call%20plotPixel%0A%20%20%20%20%0A%09mov%20r24,r18%0A%20%20%20%20mov%20r25,r19%0A%09ldi%20r26,0%0A%20%20%20%20call%20plotPixel%0A%09addi%20r18,1%0A%20%20%20%20addi%20r19,1%0A%09mov%20r24,r18%0A%20%20%20%20mov%20r25,r19%0A%09ldi%20r26,2%0A%20%20%20%20call%20plotPixel%0A%20%20%20%20%0A%09ldi%20r17,$00%0A%09out%20$20,r17%0A%09vwait%0A%09jmp%20mainloop%0A%0AplotPixel:%0A%09call%20setPixelCursor%0A%20%20%20%20out%20port_SerialPixelSet,%20r26%0A%20%20%20%20ret%0A%20%20%20%20%0AsetPixelCursor:%0A%09out%20port_SerialPixelAddress_L,r24%0A%20%20%20%20sub%20r24,r24%0A%20%20%20%20add%09r25,r25%0A%20%20%20%20adc%20r24,r24%0A%20%20%20%20out%20port_SerialPixelAddress_M,r25%0A%20%20%20%20out%20port_SerialPixelAddress_H,r24%0A%20%20%20%20ret%0A%0A%09mov%20r0,%20r20%0Atestcode:%0A%09mov%20r0,%20r20%0A%09adc%20r31,%20r0%0A%09out%2035,%20r0%0A%09in%20r31,%20$32%0A%09ld%20r0,-X%0A%09ld%20r0,Y+13%0A%09brcc%20testcode%0A%09breq%20.lp%0A%09ld%20r0,Y+double(fish)%0A%09andi%20r20,1%0A%09rol%20r1%0A.lp:%0A%09adiw%20r25:r24,1%0A%09movw%20r21:r20,r1:r0%0A%09jmp%20.lp%0A%0A%0A%0Adata:%0A%09%20.dw%20175,298,3254,32768%0A%09%20.dw%20$8040,%20$3060,%20$E246,%20$d020,%20$F00D%0A"
);
var sampleDefs = decodeURI(
  "%20twopi=2PI%0A%20%0A%20.macro%20rol%20reg%0A%09adc%20reg,reg%0A.endmacro%0A%0A.macro%20addi%20reg,imm%0A%09subi%20reg,-imm%0A.endmacro%0A%0A%09port_MouseX%20=%20$2a%0A%09port_MouseY%20=%20$2b%0A%20%20%20%20%0A%09port_SerialPixelAddress_L%20=%20$22%0A%09port_SerialPixelAddress_M%20=%20$23%0A%09port_SerialPixelAddress_H%20=%20$24%0A%0A%09port_SerialPixelSet%20=%20$25%0A%20%20%20%20%0A%09fish=7%0A%09double(x)=2x%0A%09low(x)=x%20&%20$ff%0A%09high(x)=%20(%20x%20%3E%3E%208%20)%20&%20$ff%0A%0A_var_start_address=$300%0A_var_address=_var_start_address%0A%0A.macro%20var%20name%20size%0A%09name%20=%20_var_address%0A%20%20%20%20_var_address%20=%20_var_address+size%0A.endmacro%0A%0A_let_data_start%20=%20$1000%0A_let_data_address=_let_data_start%0A%0A.snip%20_let_data%0A_let_data_initial_values:%0A.endsnip%0A%0A.macro%20letw%20name%20value%0A%09name%20=%20_let_data_address%0A%20%20%20%20_let_data_address%20=%20_let_data_address%20+%202%0A%20%20%20%20.snip%20_let_data%0A%20%20%20%20%09.dw%09value%0A%20%20%20%20.endsnip%0A.endmacro%20%20%20%20%0A%0A.snip%20_let_copy%0Acopy_let_values_to_ram:%0A%09ldi%20r28,low(_let_data_start)%0A%20%20%20%20ldi%20r29,high(_let_data_start)%0A%09ldi%20r26,low(_let_data_address)%0A%20%20%20%20ldi%20r27,high(_let_data_address)%0A%20%20%20%20ldi%20r30,low(_let_data_initial_values)%0A%20%20%20%20ldi%20r31,high(_let_data_initial_values)%20%20%20%20%20%20%20%20%0A.lp:%0A%09lpm%20r0,Z+%0A%20%20%20%20st%20%20y+,r0%0A%20%20%20%20cp%20r28,r26%0A%20%20%20%20cpc%20r29,r27%0A%20%20%20%20brne%20.lp%0A%09ret%0A.endsnip%0A%20%20%20%20%0A%20.macro%20load_let_values%0A%20%09.use%20_let_data%0A%20%09.use%20_let_copy%0A%20%09call%20copy_let_values_to_ram%0A%20.endmacro%0A%20%0A.snip%20WaitForFrame%0Avwait_:%0A%09push%20r0%0A%09push%20r1%0A%09in%20r1,$28+4%0A.lp:%0A%09in%20r0,$28+4%0A%09cp%20r0,r1%0A%09breq%20.lp%0A%09pop%20r1%0A%09pop%20r0%0A%09ret%0A.endsnip%0A%0A.macro%20vwait%20%0A%09.use%20WaitForFrame%0A%09call%20vwait_%0A.endmacro%0A%0A.macro%20setStackPointer%20value%0A%09ldi%20r28,low(value)%0A%20%20%20%20out%20$3d,r28%0A%09ldi%20r28,high(value)%0A%20%20%20%20out%20$3e,r28%0A%20%20%20%20eor%20r28,r28%0A%20%20%20%20out%20$3f,r28%0A.endmacro%0A%0A%20%20%20%20"
); 
  function makeBreakPointMarker() {
    var marker = document.createElement("div");
    marker.style.color = "#822";
    marker.innerHTML = "●";
    return marker;
  }

function init() {
  $("select option:contains(Input)").prop({selected:true}).trigger("change");

  var editorBox = $('<div class="editor"><ul class="tabs"></ul><div class="code"></div></div>');
  var assembleButton = $("<button>Assemble</button>");
  var runButton = $("<button>Assemble and Run</button>");
  var outputBox = $('<textarea class="output" readonly="true" >Output</textarea>');
  
  var assemblerBox = $("#assembler");
  assemblerBox.append(editorBox).append(assembleButton).append(runButton).append(outputBox);


  assemblerBox.find('.tabs li').on("click",tabClick); 
  var editorOptions = {
    lineNumbers:true,
    gutters: ["CodeMirror-linenumbers","breakpoints"]
  }
  var editor = CodeMirror($('#assembler .code')[0], editorOptions);
  window.editor=editor;
  editor.on("gutterClick", 
        (cm,n)=> cm.setGutterMarker(n,"breakpoints",cm.lineInfo(n).gutterMarkers?null:makeBreakPointMarker()) );


  
  var editorDocuments = {};      
  var PCLine = {doc : null, lineNumber: 0};
  var errorLine = -1;

  function fileDoc(name)  {
    if (! editorDocuments.hasOwnProperty(name)) throw new Error("File not found: "+name)
    return editorDocuments[name].doc;
  }

  function showLine(filename,lineNumber) {
    selectEditor(filename);
    editor.scrollIntoView(lineNumber-1,0,50);
  }

  function setPCLine(filename,lineNumber) {
    clearPCLine();
    let doc=fileDoc(filename);
    PCLine={doc,lineNumber};
    if (doc) {
      doc.addLineClass(lineNumber-1,"background","ProgramCounter");
    }
  }

  function clearPCLine() {
    if (PCLine.doc) {
      PCLine.doc.removeLineClass(PCLine.lineNumber-1,"background","ProgramCounter" )
      PCLine={doc : null, lineNumber: 0};
    }
  }

  function setErrorLine(value) {
    if (errorLine>=0) editor.doc.removeLineClass(errorLine,"background","Error");
    errorLine=value;
    if (errorLine>=0) {
      editor.doc.addLineClass(errorLine,"background","Error");
      editor.scrollIntoView(errorLine,0,50);
    }
  }
  
  function clearMarks() {
    setErrorLine(-1);
    clearPCLine();
  }

  emulatorHost.onUpdateDebugInfo = debugInfo => {
    if (!debugInfo) return;
    let avr = emulatorHost.avr;

    //console.log("debug", avr.PC, context[avr.PC]);
    let {fileNumber, lineNumber} = debugInfo.addressMap[avr.PC];
    console.log(debugInfo.addressMap[avr.PC])
    let filename=debugInfo.fileList[fileNumber];
    console.log({filename,lineNumber})

    setPCLine(filename,lineNumber);
    showLine(filename,lineNumber);

  }  

  function assembleEditorContents() {
    clearMarks();
    outputBox[0].value='';
    return assemble("Main",loadFile);   
  }

  assembleButton.on('click', function () {
    var result = assembleEditorContents();

    var byteChunks = result.output.map( chunk => 
      ( {address:chunk.address, data: new Uint8Array(chunk.data.buffer) }) );
   
    emulatorHost.loadCodeChunks(byteChunks,result.debugInfo);
    emulatorHost.set_halted(true);

  });
  runButton.on('click',function (){
    var result = assembleEditorContents();
    var byteChunks = result.output.map( chunk => 
      ( {address:chunk.address, data: new Uint8Array(chunk.data.buffer) }) );
   
    emulatorHost.loadCodeChunks(byteChunks,result.debugInfo);
    
  });

  var outLine = s=>{outputBox[0].value+=s+"\n";}

  function reportError(message,lineNumber) {
    outLine(message)  
    setErrorLine(lineNumber-1);
    editor.scrollIntoView(lineNumber,0,50);
    
  }

  error = reportError;
  note = outLine;


  function addTab(name,content) {
    let tab = $('<li>'+name+'</li>')[0];
    assemblerBox.find('.tabs').append(tab);
    tab.addEventListener("click",tabClick);
    let doc = CodeMirror.Doc(content);
    tab.filename = name;
    editorDocuments[name]={doc,tab};
  }

  function selectTab(tab) {
    for (let c of tab.parentNode.children) {
      c.classList.remove("selected");
    }
    tab.classList.add("selected");
    var ed=editorDocuments[tab.filename];
    editor.swapDoc(ed.doc);
  }

  function selectEditor(name) { 
    selectTab(editorDocuments[name].tab);
  }

  function tabClick(e) {
    let tab=e.currentTarget;
    if (! tab.classList.contains("selected")) {
      selectTab(tab);
    }
  }

  function loadFile(name) {
    if (! editorDocuments.hasOwnProperty(name)) throw new Error("File not found: "+name)
    
    var code = fileDoc(name).getValue();
    return code;
  }

  addTab("Main",sampleMain);
  addTab("defs",sampleDefs);

  selectEditor("Main");
}
