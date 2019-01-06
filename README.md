# AvrAsm
An assembler for 8-bit AVR written in JavaScript


This is a work-in-progress AVR assembler.  The code has been written to support in-browser assembly for the Kwak-8 emulator.  It has a few assumptions based on the Kwak-8 architecture.  It shouldn't be too hard to patch it to be more flexible though.


I have taken the liberty of experimenting with the assembler syntax.  My goal has been to make something that eases my asm coding, rather than something code compatible with existing assemblers. Plain instructions should be familiar, but directives are not going to be exact matches.  

The assembler leverages Math.js for some of the features.  This allows constant functions to be defined.

````
  double(x)=2*x
  some_constant = 12

  ld r0,Y+double(some_constant)

````

Labels are identifiers ending in a colon.  Labels beginning with a dot ````.```` are local, scoped to the most recent global label

There are multiple forms of definitions in the assembler. 

* Constants 
* String Replacement
* Multi line macros with arguments
* Code snippits 

You can combine these aspects

````
.snip small_constant_divides
  .use reciprocal_divider
      scaledReciprocal(x) = round($80000 / x);

  .macro divByN n 
    // X/n => r19:r18 remainder r17
      ldi r17,n
      ldiy scaledReciprocal(n)
      jmp DivUsingReciprocal
  .endmacro

  DivBy9: divByN 9
  DivBy10: divByN 10
  DivBy11: divByN 11
  DivBy12: divByN 12
  DivBy13: divByN 13
  DivBy14: divByN 14
  DivBy15: divByN 15
  DivBy16: divByN 16
.endsnip


.snip reciprocal_divider 
DivUsingReciprocal:    ; takes value in X, reciprocal in Y and divisor in r17 
  .... code removed for brevity ....
.endsnip  
````

Including ```` .use small_constant_divides ```` in the assembly will trigger the generation of the code in the snip which will in turn trigger the inclusion of the ```` reciprocal_divider ```` snip.  No matter how many times a snip is used, it will only be included once.



## Directives 

#### .macro    (completed with .endmacro )
````
.macro addi reg,imm
	subi reg,-imm
.endmacro
````
macros can be used where instructions are expected and can generate multiple instructions from a single macro 'opcode'

#### .def
````
  .def XL r26
  .def move_to_r0 mov r0,

  move_to_r0 HL   // this will generate MOV r0,r26

````
.def can replace any identifier with a series of tokens.  

#### .include
````
.include filename
````
Inludes another file at this point in the source.  Filename Without quotes. 

#### .snip   (completed with .endsnip )

````
.snip divide_8bit_by_8bit
  div8u:
    sub	r15,r15
    ldi	r18,9	
  .d1:
    rol	r16		
    dec	r18		
    brne .d2		
    ret			
  .d2:
    rol	r15		
    sub	r15,r17	
    brcc .d3		
    add	r15,r17	
    clc		
    rjmp .d1
  .d3:	sec			
    rjmp .d1


  .macro divi reg,imm
  ;this macro modifies r15-r18 
    .use divide_8bit_by_8bit
    ldi r17,imm
    mov r16,reg
    call div8u
    mov reg,r16
  .endsnip

````
The code in the divide_8bit_by_8bit snippet will not be assmbled unless the divi macro is invoked.

#### .use
Causes a snip to be assembled.  Snips are appended to the end to the source if they are used.  The snip is included once.  Multiple .use directives referencing the same snip do not cause additional instances to be assembled.

````
.snip TestSnip
  ComeRightBack:
    ret
.endsnip

.use TestSnip
  call ComeRightBack
````

#### .org
Sets the starting address for subsequent code generation.

#### .dw   (alias .word)
direct word generation.


#### .db   (alias .byte)
direct byte generation.  String literals may be used to provide a series of bytes.

##### Note:
  .db generates half-word data.   Any following code generation other than .db will be padded to be word aligned. 
  




