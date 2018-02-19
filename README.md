# AvrAsm
An assembler for 8-bit AVR written in JavaScript


This is a work-in-progress AVR assembler.

I have taken the liberty of experimenting with the assembler syntax
plain instructions should be familiar, but directives are not going to
be exact matches.  

The assembler leverages Math.js for some of the features.  This allows
constant functions to be defined

````
  double(x)=2*x
  some_constant = 12

  ld r0,Y+double(some_constant)

````

There is a .snippit directive that enables code to be included but 
not assembled unless explicitly requested with a .use directive

This can be used in conjuntion with a .macro directive to provide 
macro operations that use shared helper code. 

````

.snippit divide_8bit_by_8bit
  div8u:
    sub	r15,r15
    ldi	r18,9	
  .d1:
  	rol	r16		
    dec	r18		
    brne	.d2		
    ret			
  .d2:
  	rol	r15		
    sub	r15,r17	
    brcc	.d3		
    add	r15,r17	
    clc		
    rjmp	.d1
  .d3:	sec			
    rjmp	.d1


  .macro divi reg,imm
  ;this macro modifies r15-r18 
    .use divide_8bit_by_8bit
    ldi r17,imm
    mov r16,reg
    call div8u
    mov reg,r16
  .end

````
The code in the divide_8bit_by_8bit snippet will not be assmbled unless the divi macro is invoked.
