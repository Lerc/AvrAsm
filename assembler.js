
if ("undefined"=== typeof(Sugar)) {
  let test =require("./sugar.min.js");
  Sugar.extend();
}

if ("undefined"=== typeof(math)) {
  global.math =require("./math.min.js");
}

// Add a Register datatype to Math 
function Register (value) {
  if (Number.isInteger(value)  && value>=0 && value<=31)  {
    this.value = value;
  }
}
Register.prototype.isRegister = true;
Register.prototype.toString = function () {
  return 'r' + this.value;
}

math.typed.addType({
  name: 'Register',
  test: function (x) {
    // test whether x is a valid register
    return x && x.isRegister && x.value;
  }
})
{
  let compare = math.typed('compare', {
    'Register, Register': (a,b) => math.compare(a.value, b.value)}
    );
  let equal = math.typed('equal', {
    'Register, Register': (a,b) => math.equal(a.value, b.value)}
    );
  let unequal = math.typed('unequal', {
    'Register, Register': (a,b) => math.unequal(a.value, b.value)}
    );
    
  let smaller = math.typed('smaller', {
    'Register, Register': (a,b) => math.smaller(a.value, b.value)}
    );
  let larger = math.typed('larger', {
      'Register, Register': (a,b) => math.larger(a.value, b.value)}
      );
  let smallerEq = math.typed('smallerEq', {
        'Register, Register': (a,b) => math.smallerEq(a.value, b.value)}
        );
  let largerEq = math.typed('largerEq', {
          'Register, Register': (a,b) => math.largerEq(a.value, b.value)}
          );
  let isRegister = a=>!!a.isRegister;

  let isLabel = math.typed('isLabel', {
      'string': (a) => typeof a === "string"}
      );
  
  math.import({compare,smaller,larger,smallerEq,largerEq,isRegister,equal,unequal,isLabel});

  console.log("math.evaluate",math.evaluate("isRegister(r16)",{r16:new Register(16)}) );
}


var avrInstructionEncodings = {
  ADC:    "0001 11rd dddd rrrr",
  ADD:    "0000 11rd dddd rrrr",
  ADIW:   "1001 0110 KKdd KKKK", 
  AND:    "0010 00rd dddd rrrr",
  ANDI:   "0111 KKKK dddd KKKK",
  ASR:    "1001 010d dddd 0101",
  BCLR:   "1001 0100 1sss 1000", 
  BLD:    "1111 100d dddd 0bbb", 
  BRBC:   "1111 01kk kkkk ksss",
  BRBS:   "1111 00kk kkkk ksss",
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
  BSET:   "1001 0100 0sss 1000", 
  BST:    "1111 101d dddd 0bbb",
  CALL:   "1001 010k kkkk 111k kkkk kkkk kkkk kkkk", //*
  CBI:    "1001 1000 AAAA Abbb", 
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
  ROR:    "1001 010d dddd 0111",
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
  //TST:    "0010 00dd dddd dddd", is and Rd,Rd
  WDR:    "1001 0101 1010 1000",

  LD:""
}

var op_plain = "BREAK CLC CLH CLI CLN CLS CLT CLV CLZ RET".split(" ");
var op_anyreg = "ASR COM DEC INC LSR NEG POP PUSH ROR SWAP".split(" ");
var op_anyreg_anyreg = "ADC ADD AND CP CPC CPSE EOR MOV MUL OR SBC SUB".split(" ");
var op_highreg_imm8bit = "ANDI CPI LDI ORI SBCI SUBI".split(" ");
var op_anyreg_imm3bit = "BLD BST SBRC SBRS".split(" ");
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
  var subExpression=pattern.source;

  pattern=new RegExp(subExpression);
  var result = {kind,pattern,subExpression}
  rules.push(result);
  return result;
}

function combinedMatcher(list) {
  let combined = list.map(({kind,pattern,subExpression})=>"("+subExpression+")").join("|");

  let regex = new RegExp(combined,"g");

  return function(text) {
    let matches =Array.from(text.matchAll(regex)).map(
      function (match) {
        let index=1;
        while (index < match.length & !match[index] ) index++;
        let pos=match.index;
        let value = match[0];
        let token = list[index-1];
        return {pos,value,token};
      }
    );
    return matches;
  }  
}

var comment =  makeToken("comment",/(?:(?:\/\/)|(?:[\;])).*/);

var directive = makeToken("directive",/\.(?:if|ifdef|else|endif|note|fail|report|macro|endmacro|include|snip|endsnip|org|dw|word|db|byte|use|def)\b/);
//var macro = makeToken("macro",/^[.]macro/);
var register = makeToken("register",/(?:(?:R|r)(?:[0-9]|[12][0-9]|3[01]))\b/);
var label = makeToken("label",/\w+:/);
var local = makeToken("local label",/\.\w+:/);
var pseudoRegister = makeToken("X,Y, or Z",/(?:X|Y|Z|W|x|y|z|w)\b/);
var localLabelName = makeToken("local label name",/\.\w+/);
var real =  makeToken("Real",/\d*\.\d+/);
var uint =  makeToken("Integer",/\d+/);
var hexint =  makeToken("Hex Value",/(?:(?:(?:0[xX])|(?:[$]))[0-9a-fA-F]+)/);
var identifier = makeToken("identifier",/\w+/);
var mathOnlyOperators =  makeToken("operator",/(?:==|!=|>=|>|<=|<|\*|\/|\||\&|\!|^\|\[|\]|\.|\?)/);
var equals =  makeToken("=",/[=]/);
var comma =  makeToken(",",/[,]/);
var minus =  makeToken("-",/[-]/);
var plus =  makeToken("+",/[+]/);
var colon =  makeToken(":",/[:]/);
var bra =  makeToken("(",/[(]/);
var ket =  makeToken(")",/[)]/);


var stringLiteral =  makeToken("string",/(?:(?:["][^"]*["])|(?:['][^']*[']))/);

//var whitespace =  makeToken("whitespace",/^[ ]+/);

var whitespace =  makeToken("WhiteSpace",/\s+/);
var unknownMatch = makeToken("Don't know what this is",/\S+/);
var endToken = {kind:"end"};

let matchLine = combinedMatcher(rules);

function tokenizeLine (line,definitions = {} ) {
  let result = matchLine(line).
    filter(  ({token})=>token!==whitespace&&token!==comment  ).
    map(
      ({pos,value,token})=>
      definitions.hasOwnProperty(value)?definitions[value]:{pos,value,token}
  ).flat(1);
  result.text=line;
  result.tokenText = result.reduce((a,b)=>a+b.value+" ","");
  return result;
}

function createSourceIterator(mainFilename, loadFn, debugInfo, definitions) {
  let stack = [];

  function loadLines(filename) {
    let text;
    try {
      text = loadFn(filename);
    } catch (e) {
      throw new Error("Could not load file " + filename);
    }
    let existing = debugInfo.fileList.indexOf(filename);
    let fileNumber = existing >= 0 ? existing : debugInfo.fileList.push(filename) - 1;
    return {filename, fileNumber, lines:text.split('\n'), index:0};
  }

  return {
    reset() {
      stack = [loadLines(mainFilename)];
    },
    include(filename) {
      stack.push(loadLines(filename));
    },
    includeStack() {
      return stack.map(a=>a.filename);
    },
    next() {
      while (stack.length > 0) {
        let current = stack[stack.length-1];
        if (current.index >= current.lines.length) {
          stack.pop();
          continue;
        }
        let lineNumber = current.index + 1;
        let text = current.lines[current.index++];
        return {
          filename: current.filename,
          fileNumber: current.fileNumber,
          lineNumber,
          text,
          tokens: tokenizeLine(text,definitions)
        };
      }
      return null;
    }
  };
}

function ParserContext(pass=1) {
  return {
    pass,
    includeStack: [],
    blockStack: [],
    expansionContext: {macroCallStack: []},
    source: null
  };
}

let predefinedFunctions = new Set(
  "isRegister,isInteger,isNegative,isNumeric,isLabel,hasNumericValue,isPositive,isZero,isNaN,typeOf,typeof,equalScalar,number,string,boolean,bignumber,complex,fraction,matrix,splitUnit,unaryMinus,unaryPlus,abs,apply,addScalar,cbrt,ceil,cube,exp,expm1,fix,floor,gcd,lcm,log10,log2,mod,multiplyScalar,multiply,nthRoot,sign,sqrt,square,subtract,xgcd,dotMultiply,bitAnd,bitNot,bitOr,bitXor,arg,conj,im,re,not,or,xor,concat,column,cross,diag,eye,filter,flatten,forEach,getMatrixDataType,identity,kron,map,ones,range,reshape,resize,row,size,squeeze,subset,transpose,ctranspose,zeros,erf,mode,prod,format,print,to,isPrime,numeric,divideScalar,pow,round,log,log1p,nthRoots,dotPow,dotDivide,lsolve,usolve,leftShift,rightArithShift,rightLogShift,and,compare,compareNatural,compareText,equal,equalText,smaller,smallerEq,larger,largerEq,deepEqual,unequal,partitionSelect,sort,max,min,unit,sparse,createUnit,acos,acosh,acot,acoth,acsc,acsch,asec,asech,asin,asinh,atan,atan2,atanh,cos,cosh,cot,coth,csc,csch,sec,sech,sin,sinh,tan,tanh,setCartesian,setDifference,setDistinct,setIntersect,setIsSubset,setMultiplicity,setPowerset,setSize,setSymDifference,setUnion,add,hypot,norm,dot,trace,index,parse,compile,evaluate,eval,parser,lup,qr,slu,lusolve,help,det,inv,expm,sqrtm,divide,distance,intersect,sum,mean,median,mad,variance,var,quantileSeq,std,combinations,combinationsWithRep,gamma,factorial,kldivergence,multinomial,permutations,pickRandom,random,randomInt,stirlingS2,bellNumbers,catalan,composition,simplify,derivative,rationalize,reviver,e,E,false,i,Infinity,LN10,LN2,LOG10E,LOG2E,NaN,null,phi,pi,PI,SQRT1_2,SQRT2,tau,true,version,atomicMass,avogadro,bohrMagneton,bohrRadius,boltzmann,classicalElectronRadius,conductanceQuantum,coulomb,deuteronMass,efimovFactor,electricConstant,electronMass,elementaryCharge,faraday,fermiCoupling,fineStructure,firstRadiation,gasConstant,gravitationConstant,gravity,hartreeEnergy,inverseConductanceQuantum,klitzing,loschmidt,magneticConstant,magneticFluxQuantum,molarMass,molarMassC12,molarPlanckConstant,molarVolume,neutronMass,nuclearMagneton,planckCharge,planckConstant,planckLength,planckMass,planckTemperature,planckTime,protonMass,quantumOfCirculation,reducedPlanckConstant,rydberg,sackurTetrode,secondRadiation,speedOfLight,stefanBoltzmann,thomsonCrossSection,vacuumImpedance,weakMixingAngle,wienDisplacement"
  .split(","));

let defaultProxyHandler = {
  set : function (obj, prop, value) {
    obj[prop] = value;
    return true;
  },
  get : function (obj,prop) {
    if (prop in obj) return obj[prop];
    return 0;
  },
  has : function (obj,prop) {
    if (predefinedFunctions.has(prop)) return false;
    return true;
  }
}

function assemble(mainFilename, loadFn, errorfn=console.log, notefn=console.log) {
  var lineNumber = 0;
  var fileNumber = 0;
  var mathStateCore = {}
  var mathStateProxy =new Proxy(mathStateCore,defaultProxyHandler);
  var mathState=mathStateProxy;
  var instructions = {};
  var output = [];
  var debugInfo = {fileList:[],addressMap:{}};
  var definitions = {};
  var currentChunk = {};
  var labels = {};
  var pass=0;
  var macros = {};
  var snippits = {};
  var usedSnippits = new Set();
  var previousLabel = "";
  var parserContext = ParserContext();
  var macroStack = parserContext.expansionContext.macroCallStack;
  
  function error(...args) {
    errorfn(...args);
  }
  
  function note(...args) {
    if (pass == 1) {
      //only show notes on pass 1
      notefn(...args)
    }
  }

  for (let i=0;i<32;i++) {
    let reg = "r"+i;
    mathStateCore[reg]=new Register(i);
  }

  function currentCodePosition() {
    return currentChunk.address+currentChunk.data.length;
  }

  function initPass() {
    if (pass===1) {
      mathState=mathStateProxy;
    } else {
      mathState=mathStateCore;
    }

    lineNumber=0;
    fileNumber=0;
    macros={};
    snippits={};
    definitions={};
    usedSnippits=new Set();
    parserContext = ParserContext(pass);
    macroStack = parserContext.expansionContext.macroCallStack;
    previousLabel = "_start_of_program_";
    output = [];
    debugInfo={fileList:[],addressMap:{}};
    parserContext.source = createSourceIterator(mainFilename, loadFn, debugInfo, definitions);
    parserContext.source.reset();
    parserContext.includeStack = parserContext.source.includeStack();
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
    
    let address=currentCodePosition()
    labels[id] = {name: id, address} 
    mathState[id]=address*2; 
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

    let address=currentCodePosition()
    labels[fullName] = {name: id, address} 
    mathState[fullName]=address*2; 
  }

  function findLabelAddress(id) {
    if (! labels.hasOwnProperty(id) ) {      
        console.log(labels, " does not have ", id);
        fail("cannot find label "+id)
      }
    return labels[id].address;
  }

  function emitWords(wordArray) {
    wordAlign();
    currentChunk.data=currentChunk.data.concat(wordArray);
    //note("\t\t\t\t\t\t\temitting words [" + wordArray.map(a=>a.toString(16))+"]");
  }

  function emitWord(word) {
    emitWords([word]);
  }

  var storedByte = null

  function emitByte(byte) {
    if (storedByte == null) {
      storedByte=byte;
    } else {
      let word = (byte << 8) + ( storedByte) 
      storedByte = null;
      emitWord(word);
    }
  }

  function wordAlign() {
    if (storedByte != null) {
      currentChunk.data.push(storedByte);
      storedByte = null;
    }
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

  function remainingTokens() {
    return tokenList.slice(tokenIndex-1);
  }

  function match(tokenType) {
    if (tokenType === look.token) {
      var result = look.value;
      getToken();
      return result;
    } 
    console.log({look,tokenType});
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

  function regNumber(reg) {
    return reg.from(1).toNumber();
  }

  function mathEvaluate(line) {
    function hexToInt(s) {
      if (s[0]=="$") s=s.substr(1);        
      return parseInt(s,16);
    }
    //note("going to try an expression of : "+ line);
    line=line.replace(/((?:(?:0[xX])|(?:[$]))[0-9a-fA-F]+)/g,hexToInt);
    //note("translated line: "+ line);
    try {
      
      var result=math.evaluate(line,mathState);
      return result;
    }
    catch  (e) {
      fail("expression '"+line+"' failed : " + e.message);
    }
  }
  
  function parse_intExpression() {
    //console.log("intexpression ",look.token);
    if (!mightBeIntExpression(look.token)) {
      fail("constant integer expression expected, found "+look.token.kind);
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
    return(mathEvaluate(line))        
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
    if (pointer === "W" ) fail("W (r25:r24) can't be used as an index register");

    //note ("pointer "+source);
    
    if (look.token === plus) {
      if (preDec) {
        fail("can't post increment or add offset while pre decrementing");
      } 
      match(plus);

      if (mightBeIntExpression(look.token)) {
        //let line=tokenList.from(tokenIndex-1).reduce( ((a,b)=>a+" "+b.value) ,"");
        //offset = mathEvaluate(line);           
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

  function parse_anyreg_imm3bit(instruction) {
    let d = regNumber(match(register));    
    match(comma);
    let b=parse_intExpression();            
    if ((b<0) || (b>7)) fail("number in 0...7 expected");
    emitWords(instructionWord(instructions[instruction],{d,b}));    
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

  function matchRegisterPair() {
    if (look.token === pseudoRegister) {
      let p = match(pseudoRegister).toUpperCase();
      switch (p) {
        case "W": return [24,25];
        case "X": return [26,27];
        case "Y": return [28,29];
        case "Z": return [30,31];
      }
      fail("matched "+P+" as a pseudoRegister?  shouldn't happen")
    }
    let high = regNumber(match(register));
    match(colon);
    let low = regNumber(match(register));

    if (high-1 !== low) fail("registerpair must be n+1:n ")
    if (low&1 == 1) fail("second(low) half  of register pair must be an even numbered register");

    return [low,high];
  }
  function parse_adiw(instruction) {
    let [d,d1] = matchRegisterPair();

    if ( !([24,26,28,30].includes(d)) ) {
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


    let [d,d1] = matchRegisterPair();

    if ( !([24,26,28,30].includes(d)) ) {
      fail("register pair must be one of r25:r24   r27:r26   r29:r28   r31:r30 ")
    }
    d=(d-24)>>1;
    emitWords(instructionWord(instructions[instruction],{K,d}));   
  }

  function parse_movw(instruction) {
    let [d,d1] = matchRegisterPair();

    match(comma);

    let [r,r1] = matchRegisterPair();

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

  function parse_db() {
    function check(v) {
      if ( (v > 255) ||  (v < -128)) fail("value must be 8 bit word, received:"+ v);
      return v;
    }
    function doEntry() {
      if (look.token === stringLiteral) {
        let s = match(stringLiteral);
        s=s.substring(1,s.length-1);
        for (let c of s) {
          emitByte(check(c.charCodeAt(0)));
        }
      }
      else {
        let value = parse_intExpression();
        emitByte(check(value));
      }
    }
    doEntry();
    while (look.token === comma) {
      match(comma);
      doEntry();
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
    if (look.token !== endToken) {
      //var line=tokenList.from(tokenIndex-2).reduce( ((a,b)=>a+" "+b.value) ,"");
      var line = tokenList.text.from(tokenList[tokenIndex-2].pos);
      mathEvaluate(line);
    } else {
      fail("couldn't figure out what this was at all")
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


     
  function start_macro() {
    let name = match(identifier);
    let parameters = [];
    while (look.token != endToken) {
      if (look.token===identifier) {
        parameters.push(match(identifier));
      } else {
        if ( (look.token === comma) || (look.token===colon) ) skipToken(); else {
          fail(` ${look.token.kind} "${look.value}" not expected here.  Only identifiers separated by spaces, colons, or commas are allowed`);
        }
      }
    }
    parserContext.blockStack.push({
      kind:"macro",
      openedAt:{fileNumber,lineNumber},
      payload:{recordingMacro:{name,parameters,lineNumber,segments:[]}}
    });
  }

  function record_macro_line(macro, sourceLine) {
    macro.segments.push({
      text: sourceLine.text,
      tokens: sourceLine.tokens,
      lineNumber: sourceLine.lineNumber,
      fileNumber: sourceLine.fileNumber
    });
  }

  function replay_segment(segment) {
    let text = segment.text;
    let tokens = segment.tokens;
    if (!tokens) {
      tokens = tokenizeLine(text,definitions);
    }
    assembleSourceLine({
      filename: debugInfo.fileList[segment.fileNumber] || "<macro>",
      fileNumber: segment.fileNumber,
      lineNumber: segment.lineNumber,
      text,
      tokens
    });
  }

  function play_macro(macro) {
    if (macro.parameters.length === 0) {
      match(endToken);
      macroStack.push(macro.name);
      macro.segments.forEach(replay_segment);
      macroStack.pop();
      return;
    }
    function getParameter() {
      let lastWasIdentifier=false;
      if (look.token === endToken) {
        fail(`more parameters expected for macro ${macro.name} expected ${macro.parameters.length}`);
      }
      let result = "";
      let depth = 0;

      while (look.token !== endToken) {

        if ( (depth==0)  &&  ((look.token === comma) || (look.token === colon)) ) {
          skipToken();
          return result;
        }

        if (look.token === bra)  {
          depth+=1;
        } else
        if (look.token === ket) {
          depth-=1;
        }
        let isIdentifier=look.token===identifier
        if (isIdentifier && lastWasIdentifier) {
          result+=" ";
        }

        result+=match(look.token);
        lastWasIdentifier=isIdentifier;
      }
      return result;
    }

    let parameters={}
    for (let p of macro.parameters) {
        parameters[p]=getParameter();
    }
    macroStack.push(macro.name);
    let rx = new RegExp("\\b("+macro.parameters.join("|")+")\\b","g");
    for (let segment of macro.segments) {
      let translatedLine = segment.text.replace(rx,match=>parameters[match]);
      try {
        replay_segment({...segment,text:translatedLine,tokens:null});
      }
      catch (e) {
        note("macro translated line");
        note("from:" +segment.text);
        note("to  :" +translatedLine);
        throw e;
      }
    }
    macroStack.pop();
  }

  function start_snippit() {
    let name = match(identifier);
    match(endToken);
    parserContext.blockStack.push({
      kind:"snip",
      openedAt:{fileNumber,lineNumber},
      payload:{recordingSnippit:{name,segments:[], fileNumber, lineNumber}}
    });
  }

  function record_snippit_line(snippit, sourceLine) {
    snippit.segments.push({
      text: sourceLine.text,
      tokens: sourceLine.tokens,
      lineNumber: sourceLine.lineNumber,
      fileNumber: sourceLine.fileNumber
    });
  }

  function play_snippit(snippit) {
    for (let part of snippit) {
      part.segments.forEach(replay_segment);
    }
  }

  function use_snippit(name) {
    if (!snippits.hasOwnProperty(name)) {
      fail("no snippit with name '"+name+"' found");
    }
    usedSnippits.add(snippits[name]);
  }

  function parse_include() {
    let includeName = match(stringLiteral).replace(/(^["'])|(["']$)/g,'');
    parserContext.source.include(includeName);
    parserContext.includeStack = parserContext.source.includeStack();
  }

  function parse_org() {
    var address =parse_intExpression();
    if ( (address < 0) || (address > 0x1ffff) ) fail("address out of range ");
    if ( (address & 1) === 1 ) fail("must be even numbered byte address ");

    newChunk(address/2);
  }

  function parse_def() {
    let name = match(identifier);
    definitions[name]=remainingTokens();
  }

  function parse_ifdef() {
    let name = match(identifier);
    parserContext.blockStack.push({
      kind:"if",
      openedAt:{fileNumber,lineNumber},
      payload:{active:definitions.hasOwnProperty(name), elseSeen:false}
    });
  }

  function parse_if() {
    let expression = tokenList.tokenText.slice(4);
    let result = !!mathEvaluate(expression);
    parserContext.blockStack.push({
      kind:"if",
      openedAt:{fileNumber,lineNumber},
      payload:{active:result, elseSeen:false}
    });
  }

  function parseCloseDirective(kind) {
    let expectedKind = {
      ".endif": "if",
      ".endmacro": "macro",
      ".endsnip": "snip"
    }[kind];

    let block = parserContext.blockStack.pop();
    if (!block) {
      fail(kind+" without matching ."+expectedKind);
    }

    if (block.kind !== expectedKind) {
      fail(kind+" closes ."+expectedKind+" but top of stack is ."+block.kind);
    }

    if (kind === ".endmacro") {
      macros[block.payload.recordingMacro.name] = block.payload.recordingMacro;
    }
    if (kind === ".endsnip") {
      let name = block.payload.recordingSnippit.name;
      if (!snippits.hasOwnProperty(name)) snippits[name] = [];
      snippits[name].push(block.payload.recordingSnippit);
    }
  }

  function parse_structuralDirective(kind) {
    switch (kind) {
      case ".if":
        parse_if();
        return;
      case ".ifdef":
        parse_ifdef();
        return;
      case ".else": {
        let block = parserContext.blockStack[parserContext.blockStack.length-1];
        if (!block) fail(".else without matching .if .ifdef");
        if (block.kind !== "if") {
          fail(".else expected top block .if but found ."+block.kind);
        }
        if (block.payload.elseSeen) fail("duplicate .else in conditional block");
        block.payload.elseSeen = true;
        block.payload.active = !block.payload.active;
        return;
      }
      case ".endif":
      case ".endmacro":
      case ".endsnip":
        parseCloseDirective(kind);
        return;
      case ".macro":
        start_macro();
        return;
      case ".snip":
        start_snippit();
        return;
    }
    return false;
  }

  function parse_nonStructuralDirective(kind) {
    switch (kind) {
      case ".def":
        parse_def();
        return true;
      case ".include":
        parse_include();
        return true;
      case ".org":
        parse_org();
        return true;
      case ".dw":
      case ".word":
        parse_dw();
        return true;
      case ".db":
      case ".byte":
        parse_db();
        return true;
      case ".use":
        use_snippit(match(identifier));
        return true;
      case ".note":
        note(tokenList.text.slice(tokenList.text.indexOf(".note")+6));
        return true;
      case ".report": {
        let line= tokenList.slice(1).map(a=>a.value).join(" ");
        note(line);
        return true;
      }
      case ".fail":
        fail(tokenList.text.slice(tokenList.text.indexOf(".fail")+6));
        return true;
    }
    return false;
  }

  function parse_directive(kind) {
    if (parse_structuralDirective(kind) !== false) return;
    if (parse_nonStructuralDirective(kind)) return;
    fail("directive "+kind+" not implemented yet");
  }

  function currentBlock() {
    return parserContext.blockStack[parserContext.blockStack.length-1] || null;
  }

  function shouldAssembleLine() {
    return !parserContext.blockStack.some(a=>a.kind==="if" && !a.payload.active);
  }

  function parse_standard_line(sourceLine) {
    tokenList = sourceLine.tokens;
    useTokens(tokenList);

    let block = currentBlock();
    if (block && block.kind === "macro") {
      if (look.token === directive && look.value === ".endmacro") {
        parse_directive(match(directive));
      } else {
        record_macro_line(block.payload.recordingMacro, sourceLine);
      }
      return;
    }

    if (block && block.kind === "snip") {
      if (look.token === directive && look.value === ".endsnip") {
        parse_directive(match(directive));
      } else {
        record_snippit_line(block.payload.recordingSnippit, sourceLine);
      }
      return;
    }

    let active = shouldAssembleLine();
    if (!active) {
      if (look.token === directive) {
        let k = look.value;
        if (k === ".if" || k === ".ifdef") {
          parserContext.blockStack.push({
            kind:"if",
            openedAt:{fileNumber,lineNumber},
            payload:{active:false, elseSeen:false}
          });
        } else if (k === ".else" || k === ".endif") {
          parse_directive(match(directive));
        }
      }
      return;
    }

    switch(look.token) {
      case directive:
        parse_directive(match(directive));
        return;
      case label:
        wordAlign();
        addLabel(look.value.slice(0,-1));
        match(label);
      break;
      case local:
        wordAlign();
        addLocalLabel(look.value.slice(0,-1));
        match(local);
      break;
    }
    parse_asm();
  }

  function assembleSourceLine(sourceLine) {
    ({lineNumber,fileNumber}=sourceLine);
    parserContext.includeStack = parserContext.source.includeStack();
    debugInfo.addressMap[currentCodePosition()]={lineNumber,fileNumber};
    parse_standard_line(sourceLine);
  }

  function assembleTextLine(text) {
    let activeFile = debugInfo.fileList[fileNumber] || "<macro>";
    assembleSourceLine({
      filename: activeFile,
      fileNumber,
      lineNumber,
      text,
      tokens: tokenizeLine(text,definitions)
    });
  }

  function parseSourceStream() {
    while (true) {
      let sourceLine = parserContext.source.next();
      if (!sourceLine) break;
      try {
        assembleSourceLine(sourceLine);
      }
      catch (e) {
        let filename = sourceLine.filename;
        error("error in "+filename+" on line "+ sourceLine.lineNumber+":  "+e.message,{filename,lineNumber:sourceLine.lineNumber});
        throw e;
      }
    }

    let dangling = currentBlock();
    if (!dangling) return;
    let filename = debugInfo.fileList[fileNumber];
    if (dangling.kind === "macro") {
      error("reached end of file while in macro: ",{filename,lineNumber:dangling.payload.recordingMacro.lineNumber});
      return;
    }
    if (dangling.kind === "snip") {
      error("reached end of file while in snippit: ",{filename,lineNumber:dangling.payload.recordingSnippit.lineNumber});
      return;
    }
    error("reached end of file while in conditional block: ",{filename,lineNumber});
  }

  function doPass(passNum=1) {
    pass=passNum;

    initPass();
    parseSourceStream();

    try {
       usedSnippits.forEach(play_snippit)
    }
    catch (e)  {
      let filename = debugInfo.fileList[fileNumber];
      error("error in "+filename+" on line "+ lineNumber+":  "+e.message,{filename,lineNumber});
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
  for (let op of op_anyreg_imm3bit) {
    instructions[op].parse=parse_anyreg_imm3bit;    
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
  output = output.filter((address,data)=>data>0);

  for (let chunk of output) {
    chunk.data = new Uint16Array(chunk.data);
  }

  notefn("generated "+output.reduce((a,b)=>a+b.data.byteLength,0) + " bytes in "+output.length+" chunks");

  return {output,debugInfo};
}

if ("undefined"!== typeof(module)) module.exports=assemble;
