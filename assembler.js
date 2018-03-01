
var avrInstructionEncodings = {
  ADC:    "0001 11rd dddd rrrr",
  ADD:    "0000 11rd dddd rrrr",
  ADIW:   "1001 0110 KKdd KKKK", 
  AND:    "0010 00rd dddd rrrr",
  ANDI:   "0111 KKKK dddd KKKK",
  ASR:    "1001 010d dddd 0101",
  BCLR:   "1001 0100 1sss 1000", //*
  BLD:    "1111 100d dddd 0bbb", 
  BRBC:   "1111 01kk kkkk ksss",//*
  BRBS:   "1111 00kk kkkk ksss",//*
  BRCC:   "1111 01kk kkkk k000",
  BRCS:   "1111 00kk kkkk k000",
  BREAK:  "1001 0101 1001 1000",
  BREQ:   "1111 00kk kkkk k001",
  BRGE:   "1111 01kk kkkk k100",
  BRHC:   "1111 01kk kkkk k101",
  BRHS:   "1111 00kk kkkk k101",
  BRID:   "1111 01kk kkkk k111",
  BRIE:   "1111 00kk kkkk k111",
  BRLO:   "1111 00kk kkkk k000",
  BRLT:   "1111 00kk kkkk k100",
  BRMI:   "1111 00kk kkkk k010",
  BRNE:   "1111 01kk kkkk k001",
  BRPL:   "1111 01kk kkkk k010",
  BRSH:   "1111 01kk kkkk k000",
  BRTC:   "1111 01kk kkkk k110",
  BRTS:   "1111 00kk kkkk k110",
  BRVC:   "0111 01kk kkkk k001",
  BRVS:   "0111 00kk kkkk k001",
  BSET:   "1001 0100 0sss 1000", //*
  BST:    "1111 101d dddd 0bbb",
  CALL:   "1001 010k kkkk 111k kkkk kkkk kkkk kkkk", //*
  CBI:    "1001 1000 AAAA Abbb", //*
  CLC:    "1001 0100 1000 1000", 
  CLH:    "1001 0100 1101 1000",
  CLI:    "1001 0100 1111 1000",
  CLN:    "1001 0100 1010 1000",
  CLS:    "1001 0100 1100 1000",
  CLT:    "1001 0100 1110 1000",
  CLV:    "1001 0100 1011 1000",
  CLZ:    "1001 0100 1001 1000",
  COM:    "1001 010d dddd 0000",
  CP:     "0001 01rd dddd rrrr",
  CPC:    "0000 01rd dddd rrrr",
  CPI:    "0011 KKKK dddd KKKK",
  CPSE:   "0001 00rd dddd rrrr",
  DEC:    "1001 010d dddd 1010",
  EICALL: "1001 0101 0001 1001", //*
  EIJMP:  "1001 0100 0001 1001", //*
  ELPM_RO:"1001 0101 1101 1000", //*
  ELPM:   "1001 000d dddd 011I", //*
  EOR:    "0010 01rd dddd rrrr",
  FMUL:   "0000 0011 0ddd 1rrr",
  FMULS:  "0000 0011 1ddd 0rrr",
  FMULSU: "0000 0011 1ddd 1rrr",
  ICALL:  "1001 0101 0000 1001",
  IJMP:   "1001 0100 0000 1001",
  IN:     "1011 0AAd dddd AAAA",
  INC:    "1001 010d dddd 0011",
  JMP:    "1001 010k kkkk 110k kkkk kkkk kkkk kkkk",  
  //LD is complex
  LDI:    "1110 KKKK dddd KKKK",
  LDS:    "1001 000d dddd 0000 kkkk kkkk kkkk kkkk",
  //LPM is complex
  //LSL is ADD Rd,Rd
  LSR:    "1001 010d dddd 0110",
  MOV:    "0010 11rd dddd rrrr",
  MOVW:   "0000 0001 dddd rrrr",
  MUL:    "1001 11rd dddd rrrr",
  MULS:   "0000 0010 dddd rrrr",
  MULSU:  "0000 0011 0ddd 0rrr",
  NEG:    "1001 010d dddd 0001",
  NOP:    "0000 0000 0000 0000",
  OR:     "0010 10rd dddd rrrr",
  ORI:    "0110 KKKK dddd KKKK",
  OUT:    "1011 1AAr rrrr AAAA",
  POP:    "1001 000d dddd 1111",
  PUSH:   "1001 001d dddd 1111",
  RCALL:  "1101 kkkk kkkk kkkk",
  RET:    "1001 0101 0000 1000",
  RETI:   "1001 0101 0001 1000",
  RJMP:   "1100 kkkk kkkk kkkk",
  //ROL is ADC Rd,Rd
  ROR:    "1001 010d dddd 1111",
  SBC:    "0000 10rd dddd rrrr",
  SBCI:   "0100 KKKK dddd KKKK",
  SBI:    "1001 1010 AAAA Abbb",
  SBIC:   "1001 1001 AAAA Abbb",
  SBIS:   "1001 1011 AAAA Abbb",
  SBIW:   "1001 0111 KKdd KKKK",
  SBRC:   "1111 110r rrrr 0bbb",
  SBRS:   "1111 111r rrrr 0bbb",
  SEC:    "1001 0100 0000 1000",
  SEH:    "1001 0100 0101 1000",
  SEI:    "1001 0100 0111 1000",
  SEN:    "1001 0100 0010 1000",
  SES:    "1001 0100 0100 1000",
  SET:    "1001 0100 0110 1000",
  SEV:    "1001 0100 0011 1000",
  SEZ:    "1001 0100 0001 1000",
  SLEEP:  "1001 0101 1000 1000",
  //SPM:    "1001 0101 1110 1000",
  //ST is complex
  STS:    "1001 001r rrrr 0000 kkkk kkkk kkkk kkkk",
  SUB:    "0001 10rd dddd rrrr",
  SUBI:   "0101 KKKK dddd KKKK",
  SWAP:   "1001 010d dddd 0010",
  TST:    "0010 00dd dddd dddd",
  WDR:    "1001 0101 1010 1000",

  LD:""
}

var op_plain = "BREAK CLC CLH CLI CLN CLS CLT CLV CLZ RET".split(" ");
var op_anyreg = "ASR COM DEC INC LSR NEG POP PUSH ROR SWAP TST".split(" ");
var op_anyreg_anyreg = "ADC ADD AND CP CPC CPSE EOR MOV MUL OR SBC SUB".split(" ");
var op_highreg_imm8bit = "ANDI CPI LDI ORI SBCI SUBI".split(" ");
var op_anyreg_imm3bit = "BLD BST SBRC SBRS  ".split(" ");
var op_branchcc = "BRCC BRCS BREQ BRGE BRHC BRHS BRID BRIE BRLO BRLT BRMI BRNE BRPL BRSH BRTC BRTS BRVC BRVS".split(" ");

var sts_test = {
      base : [0x9200,0x0000], 
      parameters : {
        r : { mask : [0x01f0, 0x0000], bits: 5 },
        k : { mask : [0x0000, 0xffff], bits: 16}
      }
}

function popCount (x) {
  x -= x >> 1 & 0x55555555
  x = (x & 0x33333333) + (x >> 2 & 0x33333333)
  x = x + (x >> 4) & 0x0f0f0f0f
  x += x >> 8
  x += x >> 16
  return x & 0x7f
}

function setValueIntoMask(value, mask) {
  var result =0;
  var bit=1;
  while (value != 0) {
    if ( (mask & bit) == bit) {
      if ( (value & 1) == 1)  { 
        result|=bit;
      }
      value>>=1;
    }
    bit<<=1;
    if (bit > mask) break;
  }
  return result;
}

function setValueIntoMaskArray(value, mask) {
  var result = new Uint16Array(mask.length);
  var bit=1;
  var index = mask.length-1;
  while (value != 0) {
    if ( (mask[index] & bit) == bit) {
      if ( (value & 1) == 1)  { 
        result[index]|=bit;
      }
      value>>=1;
    }
    bit<<=1;
    if (bit >= 0x10000) {
      bit=1;
      index-=1;
      if (index <0) break;
    }
  }
  return result;
}

function instructionWord(instruction, parameters) {
  var result = instruction.base;

  for (let field in instruction.parameters) {
    if (parameters.hasOwnProperty(field)) {
        let p = setValueIntoMaskArray(parameters[field],instruction.parameters[field].mask);
        result = result.map((a,i)=>a|p[i]);
    }
  }
  return result;
}


function makeInstructionFromTemplate(template) {
  var bits = template.removeAll(" ").chars().inGroupsOf(16);
  var parameters = {};


  var makeMask = c=>bits.map( word=>word.reduce( (a,b)=>(a<<1)+ (b==c?1:0) , 0 ) );
  function makeParameter(c) {
    let mask = makeMask(c);
    let bits = mask.reduce((a,b) =>a+popCount(b),0);
    return {mask,bits};
  } 

  let base = makeMask("1");

  template.forEach( c=>{if ( /[a-zA-Z]/.test(c) && !Object.has(parameters,c)) parameters[c]=makeParameter(c) });
  
  let result = { base, parameters }
  return result;

}

var rules = [];
function makeToken(kind,pattern) {
  var result = {kind,pattern}
  rules.push(result);
  return result;
}

var directive = makeToken("directive",/^\.(?:macro|endmacro|snip|endsnip|org|dw|db|use)\b/);
//var macro = makeToken("macro",/^[.]macro/);
var register = makeToken("register",/^(?:R|r)(?:[0-9]|[12][0-9]|3[01])\b/);
var label = makeToken("label",/^\w+:/);
var local = makeToken("local label",/^\.\w+:/);
var pseudoRegister = makeToken("X,Y, or Z",/^(?:X|Y|Z|x|y|z)/);
var localLabelName = makeToken("local label name",/^\.\w+/);
var uint =  makeToken("Integer",/^\d+/);
var hexint =  makeToken("Hex Value",/^((?:(?:0[xX])|(?:[$]))[0-9a-fA-F]+)/);
var identifier = makeToken("identifier",/^\w+/);
var equals =  makeToken("=",/^[=]/);
var comma =  makeToken(",",/^[,]/);
var minus =  makeToken("-",/^[-]/);
var plus =  makeToken("+",/^[+]/);
var colon =  makeToken(":",/^[:]/);
var bra =  makeToken("(",/^[(]/);
var ket =  makeToken(")",/^[)]/);
//var whitespace =  makeToken("whitespace",/^[ ]+/);

var notsure =  makeToken("Don't know what this is",/^\s/);

var endToken = {kind:"end"};

function tokenizeLine (line) {
  var result =[];
  result.text=line;
  var pos=0;
  var match;
  do  {
    match=/^\s+/.exec(line);
    if (match) {
      value=match[0];
      pos+=value.length;
      line=line.from(value.length);
    }
    //todo: match single and double quote spans
    //todo: match out comments 
    for (let rule of rules) {
      match= rule.pattern.exec(line);
      if (match) {
        let value = match[0];
        if (value.length <=0 ) {
          console.log("zero length match", rule);
          return;
        }
        pos+=match.index;
        result.push({token:rule, value,pos});        
        line=line.from(match.index+value.length);
        pos+=value.length;
        break;
      }     
    }         
  } while (match);
  return result;
}


function assemble(code) {
  var lineNumber = 0;
  var mathState={};
  var instructions = {};
  var output = [];
  var map = {};

  var currentChunk = {};
  var labels = {};
  var pass=0;
  var macros = {};
  var snippits = {};
  var usedSnippits = new Set();
  var labels = {};
  var previousLabel = "";
  var macroStack = [];
  var macroImplID =0; 
  function currentCodePosition() {
    return currentChunk.address+currentChunk.data.length;
  }

  function initPass() {
    lineNumber=1;
    macros={};
    snippits={};
    usedSnippits=new Set();
    macroStack = [];
    previousLabel = "_start_of_program_";
    output = [];
    map={};
    newChunk();
  }

  function newChunk(address=0) {
    currentChunk ={address, data:[]};
    output.push(currentChunk);
  }

  function addLabel(id) {
    previousLabel=id;
    if (pass!=1) return; 
    //note("add label "+id)
    if (labels.hasOwnProperty(id)) error ("duplicate label:  "+id);
    
    labels[id] = {name: id, address:currentCodePosition()} 
  }

  function localLabelContext() {
    let result = previousLabel;
    if (macroStack.length>0) result+="_"+lineNumber+"_"+macroStack.join('_');
    return result

  }
  function addLocalLabel(id) {
    if (pass!=1) return; 
    let fullName = localLabelContext()+id;
    //note("add local label "+id+ "  as "+fullName)
    if (labels.hasOwnProperty(fullName)) error ("duplicate label:  "+id +" after "+previousLabel);

    labels[fullName] = {name: id, address:currentCodePosition()} 
  }

  function findLabelAddress(id) {
    if (! labels.hasOwnProperty(id) ) {      
        console.log(labels, " does not have ", id);
        fail("cannot find label "+id)
      }
    return labels[id].address;
  }


  function emitWords(wordArray) {
    currentChunk.data=currentChunk.data.concat(wordArray);
    //note("\t\t\t\t\t\t\temitting words [" + wordArray.map(a=>a.toString(16))+"]");
  }

  function emitWord(word) {
    emitWords([word]);
  }

  function isInstruction(s) {
    return instructions.hasOwnProperty(s.toUpperCase());
  }
    
  for (let instruction in avrInstructionEncodings) {
    let r = makeInstructionFromTemplate(avrInstructionEncodings[instruction]);  
    r.parse = x=>{note(x +" is not handled yet!")};
    instructions[instruction] = r;
  }

  function fail(message)  {
    throw new Error(message);
  }

  let tokenIndex=0;
  let look=null;
  let tokenList = null;
  
  function useTokens(tokens) {
    tokenList=tokens;
    tokenIndex=0;
    getToken();
  }

  function readToken() {
    if (tokenIndex >= tokenList.length) return {token: endToken};
    return tokenList[tokenIndex++];
  }

  function getToken() {
    look = readToken();
  }
  function skipToken() {
    getToken();
  }

  function match(tokenType) {
    if (tokenType === look.token) {
      var result = look.value;
      getToken();
      return result;
    } 
    fail('expected '+ tokenType.kind+" found "+look.token.kind+ " ("+look.value+")");
    return "";    
  }

  function mightBeIntExpression(token) {
    return  (token === identifier ) ||
      (token === uint) ||
      (token === hexint) ||
      (token === bra) ||
      (token === plus) ||
      (token === minus);
  }

  function is_reg0_31(token)  {

  }
  function is_reg15_31(token) {

  }

  function regNumber(reg) {
    return reg.from(1).toNumber();
  }

  function mathEval(line) {
    function hexToInt(s) {
      if (s[0]=="$") s=s.substr(1);        
      return parseInt(s,16);
    }
    //note("going to try an expression of : "+ line);
    line=line.replace(/((?:(?:0[xX])|(?:[$]))[0-9a-fA-F]+)/g,hexToInt);
    //note("translated line: "+ line);
    try {
      var result=math.eval(line,mathState);
      return result;
    }
    catch  (e) {
      fail("expression failed : " + e.message);
    }
  }
  
  function parse_intExpression() {
    //console.log("intexpression ",look.token);
    if (!mightBeIntExpression(look.token)) {
      fail("constant integer expression expected, found "+look.token);
      return;
    }
    let line=""; 
    let bracketDepth=0;

    do {
      //note("intexpression token "+look.token.kind);
      if (look.token===endToken) {
        if (bracketDepth >0 ) fail("unclosed bracket")
        else break;
      }        
      if (look.token==bra) bracketDepth+=1;
      if (look.token==ket) {
        bracketDepth-=1;
        if (bracketDepth <0) fail ("no matching open bracket");
      } 
      line+=" "+match(look.token);
      //note( line );
    } while ( look.token!==comma || bracketDepth!==0);
    return(mathEval(line))        
  }
  function emit_LDST(pointer,register,predec,postinc,offset=0,store=false) {
    if (predec || postinc)  {
      let word = 1;
      if (predec) word = 2;
      if (store) word|=0x0200;
      switch(pointer) {
        case "X": word|= 0x900c;
        case "Y": word|= 0x9008;
        case "Z": word|= 0x9000;          
      }
      word|= register<<4;
      emitWord(word);
    } else  {
      if ( (offset < 0) || (offset > 63) ) fail("offset must be 0-63: (got "+offset+" )");        
      
      let word = (pointer=="Z") ? 0x8000 : 0x8008;
      if (store) word|=0x0200;
      word|= register<<4;
      word|= setValueIntoMask(offset,0x2c07);        
      emitWord(word);
    }
    //note("ldst emit " + source+" "+dest+" "+(predec?"predec":"") + (postinc?"postinc":"") +"  offset="+offset );

  }

  function parse_indexRegister() {
    let preDec = false;
    let postInc = false;
    let offset=0;
    if (look.token === minus) {
      preDec = true;
      match(minus);
    }
    //console.log(look)
    let pointer=match(pseudoRegister).toUpperCase();
    //note ("pointer "+source);
    
    if (look.token === plus) {
      if (preDec) {
        fail("can't post increment or add offset while pre decrementing");
      } 
      match(plus);

      if (mightBeIntExpression(look.token)) {
        //let line=tokenList.from(tokenIndex-1).reduce( ((a,b)=>a+" "+b.value) ,"");
        //offset = mathEval(line);           
        offset = parse_intExpression();
      } else {
        postInc=true; 
      }
    }
    return {pointer,preDec,postInc,offset}
  }
  function parse_ld() {
    //note("load");
    let dest=regNumber(match(register));
    match(comma);

    let {pointer,preDec,postInc,offset} = parse_indexRegister();    
    emit_LDST(pointer,dest,preDec,postInc,offset)        
  }

  function parse_st() {
    let {pointer,preDec,postInc,offset} = parse_indexRegister();    
    match(comma);
    let source=regNumber(match(register));
    emit_LDST(pointer,source,preDec,postInc,offset,true);
    
  }

  function parse_lpm() {
    let d=regNumber(match(register));;
    match(comma);
    let {pointer,preDec,postInc,offset} = parse_indexRegister();    
    if (offset !=0) {
      fail ("LPM does not support an offset")
    }
    if (pointer != "Z") {
      fail ("LPM must use Z as a source")
    }
    if (preDec==true) {
      fail ("LPM cannot pre-decrement Z")
    }
    let word = 0x9004 | (d << 4) | (postInc?1:0);
    emitWord(word);
  }

  function parse_plain(instruction) {
    match(endToken);
    emitWords(instructionWord(instructions[instruction],{}));    
  }

  function parse_anyreg(instruction) {
    let d = regNumber(match(register));
    match(endToken);
    emitWords(instructionWord(instructions[instruction],{d}));    
  }

  function parse_anyreg_anyreg(instruction) {
    let d = regNumber(match(register));
    match(comma);
    let r = regNumber(match(register));
    match(endToken);
    emitWords(instructionWord(instructions[instruction],{d,r}));
  }

  function parse_highreg_imm8bit(instruction) {
    let d = regNumber(match(register))-16;
    if (d<0) fail("instruction may only use r16-r31");
    
    match(comma);
    //let line=tokenList.from(tokenIndex-1).reduce( ((a,b)=>a+" "+b.value) ,"");
    let K=parse_intExpression();            
    if ((K<-128) || (K>=256)) fail("constant 8 bit value expected");
    K&=0xff;
    emitWords(instructionWord(instructions[instruction],{d,K}));    
  }

  function parse_addressReferance() {
    var id;
    if (look.token === localLabelName ) {
      id=localLabelContext() +match(localLabelName);
    } else {
      id = match(identifier);
    }

    if (pass!=2) return 0; 
    return(findLabelAddress(id));
  }

  function parse_jump(instruction) {
    var k=parse_addressReferance();
    emitWords(instructionWord(instructions[instruction],{k}));   
  }

  function parse_branch(instruction) {
    var k=0;
    if (pass==2) {
      let target =parse_addressReferance();
      let here = currentCodePosition();
      k=target - here - 1;
      if ((k<-64) || (k >63)) fail("target is beyond -64..+63 range :" +k);
    }
    emitWords(instructionWord(instructions[instruction],{k}));   
  }

  function parse_rcall(instruction) {
    var k=0;
    if (pass==2) {
      let target =parse_addressReferance();
      let here = currentCodePosition();
      k=target - here - 1;
      if ((k<-2048) || (k >2047)) fail("target is beyond -2048..+2047 range :" +k);
    }
    emitWords(instructionWord(instructions[instruction],{k}));   
  }

  function parse_out(instruction) {
    let A=parse_intExpression();
    if ((A<0) || (A>=64)) fail("PORT range must be within 0-63");
    match(comma);
    let r = regNumber(match(register));
    emitWords(instructionWord(instructions[instruction],{A,r}));   
  }

  function parse_in(instruction) {
    let d = regNumber(match(register));
    match(comma);
    let A=parse_intExpression();
    if ((A<0) || (A>=64)) fail("PORT range must be within 0-63");
    emitWords(instructionWord(instructions[instruction],{A,d}));   
  }

  function parse_sts(instruction) {
    let k=parse_intExpression();
    if ((k<0) || (k>=65536)) fail("Address range must be within 0-$ffff");
    match(comma);
    let r = regNumber(match(register));
    emitWords(instructionWord(instructions[instruction],{k,r}));   
  }

  function parse_lds(instruction) {
    let d = regNumber(match(register));
    match(comma);
    let k=parse_intExpression();
    if ((k<0) || (k>=65536)) fail("Address range must be within 0-$ffff");
    emitWords(instructionWord(instructions[instruction],{k,d}));   
  }

  function parse_adiw(instruction) {
    let d1 = regNumber(match(register));
    match(colon);
    let d = regNumber(match(register));

    if ( (d+1 != d1)  ||  !([24,26,28,30].includes(d)) ) {
      fail("register pair must be one of r25:r24   r27:r26   r29:r28   r31:r30 ")
    }

    match(comma);
    let K=parse_intExpression();
    if ((K<0) || (K>=64)) fail("constant must be within 0-63");
    d=(d-24)>>1;
    emitWords(instructionWord(instructions[instruction],{K,d}));   
  
  }

  function parse_sbiw(instruction) {
    let K=parse_intExpression();
    if ((K<0) || (K>=64)) fail("constant must be within 0-63");
    match(comma);

    let d1 = regNumber(match(register));
    match(colon);
    let d = regNumber(match(register));

    if ( (d+1 != d1)  ||  !([24,26,28,30].includes(d)) ) {
      fail("register pair must be one of r25:r24   r27:r26   r29:r28   r31:r30 ")
    }
    d=(d-24)>>1;
    emitWords(instructionWord(instructions[instruction],{K,d}));   
  }
  function parse_movw(instruction) {
    let d1 = regNumber(match(register));
    match(colon);
    let d = regNumber(match(register));

    match(comma);

    let r1 = regNumber(match(register));
    match(colon);
    let r = regNumber(match(register));
    if ( (d&1==1) || (r&1==1))
      fail("second half of register pair must be an even numbered register");

    if ( (d+1 != d1)  || (r+1 != r1)  ) {
      fail("register pair must be r[n+1]:r[n] ")
    }

    d>>=1;
    r>>=1;
    emitWords(instructionWord(instructions[instruction],{r,d}));   
  }

  function parse_dw() {
    function check(v) {
      if ( (v > 65535) ||  (v < -32768)) fail("value must be 16 bit word, received:"+ v);
      return v;
    }
    var firstValue = parse_intExpression();
    emitWord(check(firstValue));
    while (look.token === comma) {
      match(comma);
      let value = parse_intExpression();
      emitWord(check(value));
    }
    if (look.token != endToken) {
      fail ("comma or end of line expected");
    }
  }
  function parse_instruction (id) {
    //note("instruction "+id); 
    id=id.toUpperCase();

    instructions[id].parse(id);
  }

  function parse_nonInstruction (id) {
    //note(id+" is not an instruction");
    if (macros.hasOwnProperty(id)) {
      let macro = macros[id];
      play_macro(macro);

      return;
    } 
    //if ( (look.token === equals) || (look.token === bra) ) {
    if (true) {
      //var line=tokenList.from(tokenIndex-2).reduce( ((a,b)=>a+" "+b.value) ,"");
      var line = tokenList.text.from(tokenList[tokenIndex-2].pos);
      mathEval(line);
    } else {
      fail("coudn't figure out what "+look.value+" was doing here.")
    }
  }
  
  function parse_asm() {
    if (look.token === endToken) return;
    //note("asm line",look);
    if (look.token !== identifier) {
      fail("unexpected "+look.token.kind+" found  "+look.value);
      return;
    }

    var id = look.value;
    match(identifier);
    if (isInstruction(id)) {
      parse_instruction(id)
    } else { 
      parse_nonInstruction(id)
    }
  }


  var lineParser = parse_standard_line;

  var recordingMacro = null;  
     
  function start_macro() {
    let name = match(identifier);
    let parameters = [];
    while (look.token != endToken) {
      if (look.token===identifier) {
        parameters.push(match(identifier));
      } else {
        skipToken();
      }
    }
    recordingMacro = {name,parameters,lines:[]};
    lineParser=record_macro_line;
  }

  function record_macro_line(line) {
    if (line.trim()===".endmacro" ) {
      macros[recordingMacro.name] = recordingMacro;
      //note("added macro "+recordingMacro.name+" of "+recordingMacro.lines.length+ " lines");
      lineParser=parse_standard_line;
    }
    else {
      recordingMacro.lines.push(line);
    }
  }


  function play_macro(macro) {
    //note("macro "+macro.name+"  "+macro.parameters.length);
    if (macro.parameters.length === 0) {
      match(endToken);
      macroStack.push(macro.name);
      macro.lines.forEach(assembleLine);
      macroStack.pop();
      return;
    }
    function getParameter() {
      while( (look.token === comma) || (look.token === colon) ) {
        skipToken();
      }
      if (look.token === endToken) {
          fail("more parameters expected for macro "+macro.name);
      }
      return match(look.token);
    }
    let parameters={}
    for (let p of macro.parameters) {
        parameters[p]=getParameter();
    }
    macroStack.push(macro.name);
    let rx = new RegExp("\\b("+macro.parameters.join("|")+")\\b","g");
    //console.log(rx);
    for (let macroLine of macro.lines) {
      let translatedLine = macroLine.replace(rx,match=>parameters[match]);
      //note("macro translated line");
      //note("from:" +macroLine);
      //note("to  :" +translatedLine);
      assembleLine(translatedLine);
    }
    macroStack.pop();
  }

  var recordingSnippit = null;  
     
  function start_snippit() {
    let name = match(identifier);
    match(endToken);
    recordingSnippit = {name,lines:[], lineNumber};
    lineParser=record_snippit_line;
  }

  function record_snippit_line(line) {
    if (line.trim()===".endsnip" ) {
      let name = recordingSnippit.name;
      if (!snippits.hasOwnProperty(name)) snippits[name] = [];

      snippits[name].push(recordingSnippit);
      //note("added snippit "+recordingSnippit.name+" of "+recordingSnippit.lines.length+ " lines");
      lineParser=parse_standard_line;
    }
    else {
      recordingSnippit.lines.push(line);
    }
  }

  function play_snippit(snippit) {
    for (let part of snippit) {
      lineNumber=part.lineNumber;
      for (let line of part.lines) {
        lineNumber+=1;
        assembleLine(line);
      }
    }
  }

  function use_snippit(name) {
    if (!snippits.hasOwnProperty(name)) {
      fail("no snippit with name '"+name+"' found");
    }
    usedSnippits.add(snippits[name]);
  }

  function parse_directive(kind) {
    switch (kind) {
      case ".macro":
        start_macro();
        break;
      case ".dw":
        parse_dw();
        break
      case ".snip":      
        start_snippit();
        break;
      case ".use":
        use_snippit(match(identifier));
        break;
      default:
        fail("directive "+kind+" not implemented yet");
    }

  }
  function parse_standard_line(line) {
    var t = tokenizeLine(line);    
    //if (pass==1) console.log( line, t);
    useTokens(t);     
    switch(look.token) {
      case directive: 
        parse_directive(match(directive));
        return;
      case label:
        addLabel(look.value.slice(0,-1));
        match(label);
      break;
    case local:
        addLocalLabel(look.value.slice(0,-1));
        match(local);
      break;
    }
    parse_asm();    
  }

  function assembleLine(line) {
    map[currentCodePosition()]=lineNumber;
    lineParser(line);
  }

  function doPass(passNum=1) {
    pass=passNum;

    initPass();
    let lines = code.split('\n');
    for (let line of lines) {
      try {
        assembleLine(line);      
        lineNumber+=1;
      }
      catch (e)  {
        error("error on line "+ lineNumber+":  "+e.message,lineNumber);
        throw e;
      }
    }  

    try {
       usedSnippits.forEach(play_snippit) 
    }
    catch (e)  {
      error("error on line "+ lineNumber+":  "+e.message,lineNumber);
      throw e;
    }      
      

  }
  instructions.LD={parse:parse_ld};
  instructions.ST={parse:parse_st};
  instructions.LPM={parse:parse_lpm};
  
  for (let op of op_plain) {    
    instructions[op].parse=parse_plain;
  }
  for (let op of op_anyreg_anyreg) {    
    instructions[op].parse=parse_anyreg_anyreg;
  }
  for (let op of op_anyreg) {
    instructions[op].parse=parse_anyreg;    
  }
  for (let op of op_highreg_imm8bit) {
    instructions[op].parse=parse_highreg_imm8bit;    
  }
  
  for (let op of op_branchcc) {
    instructions[op].parse=parse_branch;    
  }
  instructions.JMP.parse = parse_jump;
  instructions.CALL.parse = parse_jump;
  instructions.RCALL.parse = parse_rcall;
  instructions.IN.parse = parse_in;
  instructions.OUT.parse = parse_out;
  instructions.STS.parse = parse_sts;
  instructions.LDS.parse = parse_lds;
  instructions.ADIW.parse = parse_adiw;
  instructions.SBIW.parse = parse_sbiw;
  instructions.MOVW.parse = parse_movw;
  
  doPass(1);
  doPass(2);

  //console.log(mathState);
  //note(JSON.stringify(mathState));
  //note(JSON.stringify(labels));

  for (let chunk of output) {
    chunk.data = new Uint16Array(chunk.data);
  }
  console.log(map)
  return {output,map};
}