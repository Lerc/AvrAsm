
Sugar.extend();
"use strict"


$(init);

var files = {}
files.Main = decodeURI(
  "%0A.include%20%22defs%22%0A.include%20%22kwak8%22%0A.include%20%22utility%22%0A.include%20%22scratch%22%0A%0Aletb%20dot_x%20100%0Aletb%20dot_y%2050%0A%0Aletw%20testX%201000%0Aletb%20testByte%20$B0%0Aletw%20testY%20$5678%0A%0A.use%20print_numbers%0A%0A.org%200%0A%20%20ldx%20testX%0A%20%20adiw%20x,1%0A%20%20stx%20testX%0A%09jmp%20init%20%20%20%20%20%20%0A%0A.org%20$10%0Ainit:%0A%20%20set_stack_pointer%20RAMEND%0A%0A%20%20load_let_values%0A%0A%20%20ldix%20$4000%0A%20%20stx%20mode0_Page%0A%0A%20%20ldi%20r16,10%0A%20%20ldi%20r17,8%0A%20%20ldwordi%20r19:r18,SomeText%0A%20%20ldi%20r20,$20%0A%20%20call%20drawRomString%0A%0A%20%20%20%20%0Amainloop:%0A%20%20ldword%20r19:r18%20testX%0A%20%20ldi%20r16,30%0A%20%20ldi%20r17,6%0A%20%20ldi%20r20,$20%0A%20%20call%20PrintUint16%0A%20%20%0A%20%20ldz%20mode0_Page%0A%20%20ldi%20r24,$cc%0A%20%20ldi%20r25,$3a%0A%20%20st%20z+,r24%0A%20%20st%20z+,r25%0A%20%20st%20z+,r24%0A%20%20st%20z+,r25%0A%20%20%0A%20%20ldi%20r24,10%0A%20%20ldi%20r25,32%0A%20%20ldi%09r26,2%0A%20%20call%20plotPixel%0A%20%20call%20renderMode0%0A%0A%0A%20%20call%20showPalette%0A%20%20%0A%20%20in%20r24,port_MouseX%0A%20%20in%20r25,port_MouseY%0A%20%20ldi%09r26,2%0A%20%20call%20plotPixel%0A%20%20lds%20r24,dot_x%0A%20%20lds%20r25,dot_y%0A%20%20ldi%09r26,3%20%20%20%20%0A%20%20call%20plotPixel%0A%20%20lds%20r24,dot_x%0A%20%20lds%20r25,dot_y%0A%20%20inc%20r24%0A%20%20mov%20r26,r24%0A%20%20asr%20r26%0A%20%20asr%20r26%0A%20%20asr%20r26%20%20%20%20%0A%20%20asr%20r26%20%20%20%20%0A%20%20add%20r25,r26%0A%20%20sts%20dot_x,r24%0A%20%20sts%20dot_y,r25%0A%20%20ldi%20r26,2%0A%20%20call%20plotPixel%0A%20%20%20%20%0A%20%20mov%20r24,r18%0A%20%20mov%20r25,r19%0A%20%20ldi%20r26,0%0A%20%20call%20plotPixel%0A%20%20inc%20r8%0A%20%20inc%20r9%0A%20%20mov%20r24,r8%0A%20%20mov%20r25,r9%0A%20%20ldi%20r26,2%0A%20%20%0A%20%20call%20plotPixel%0A%0A%0A%0A%20%20ldi%20r17,fbc_ShowDisplay%0A%20%20out%20port_FrameBufferControl,r17%0A%20%20vwait%0A%20%20%20%20%0A%20%20push%20r26%0A%20%20push%20r27%0A%20%20ldx%20testX%0A%20%20adiw%20x,1%0A%20%20stx%20testX%0A%20%20pop%20r27%0A%20%20pop%20r26%0A%20%20jmp%20mainloop%0A%0A%0AshowPalette:%0A%09ldi%20r24,125%0A%20%20ldi%20r25,10%0A%20%20ldi%20r26,0%0A%20%20ldi%20r16,6%0A%20%20ldi%20r17,6%0A%20%20ldi%20r19,16%0A%20%20push%20r24%0A.linelp:%0A%09pop%20r24%0A%20%20push%20r24%0A%20%20ldi%20r18,16%0A.lp:%20%20%0A%20%20call%20fillRect%0A%20%20inc%20r26%0A%20%20add%20r24,r16%0A%20%20inc%20r24%0A%20%20dec%20r18%0A%20%20brne%20.lp%0A%20%20add%20r25,r16%0A%20%20inc%20r25%0A%20%20dec%20r19%0A%20%20brne%20.linelp%0A%20%20pop%20r24%0A%09ret%0A%0A.org%20$8000%0A%0A%0A%0A%0AfillRect:%0A%09//%20r24=x%20r25=y%20%20r26=color%0A%20%20//%20r16=width%20r17=height%20%0A%20%0A%20%09push%20r0%0A%20%20push%20r1%0A%20%20push%20r25%0A%20%20push%20r16%0A%20%20ldi%20r16,2%0A%20%20out%20port_SerialPixelBase,r16%0A%20%20ldi%20r16,$77%0A%20%20out%20port_SerialPixelControl,r16%20%20%0A%20%20pop%20r16%0A%20%20mov%20r1,r17%0A.lineLoop:%20%20%0A%20%20mov%20r0,r16%0A%20%20call%20setPixelCursor%0A.pixelLoop:%0A%09out%20port_SerialPixelSub,%20r26%0A%09dec%20r0%0A%20%20brne%20.pixelLoop%0A%20%20inc%20r25%0A%20%20dec%20r1%0A%20%20brne%20.lineLoop%0A%20%20pop%20r25%0A%20%20pop%20r1%0A%20%20pop%20r0%0A%20%20ret%0A%20%20%0A%20%20%0ASomeText:%0A%09.db%20%22Hello%20World%22,0%0A"
);
files.defs = decodeURI(
  "%09low(x)=x%20&%20$ff%0A%09high(x)=%20(%20x%20%3E%3E%208%20)%20&%20$ff%0A%09.def%20XH%20r27%0A%09.def%20XL%20r26%0A%09.def%20YH%20r29%0A%09.def%20YL%20r28%0A%09.def%20ZH%20r31%0A%09.def%20ZL%20r30%0A%0A%20%20.def%20arg1%20r17:r16%0A%20%20.def%20arg2%20r19:r18%0A%20%20.def%20arg3%20r21:r20%0A%20%20.def%20arg4%20r23:r22%0A%20%20.def%20arg5%20r25:r24%0A%20%20%0A.macro%20rol%20reg%0A%09adc%20reg,reg%0A.endmacro%0A%0A.macro%20lsl%20reg%0A%09add%20reg,reg%0A.endmacro%0A%0A.macro%20clr%20reg%0A%09eor%20reg,reg%0A.endmacro%0A%0A%0A.macro%20addi%20reg,imm%0A%09subi%20reg,-imm%0A.endmacro%0A%0A.macro%20ldword%20ra,rb,address%0A%09lds%20rb,address%0A%20%20lds%20ra,address+1%0A.endmacro%0A%0A.macro%20ldwordi%20ra,rb,imm%0A%09ldi%20rb,low(imm)%0A%20%20ldi%20ra,high(imm)%0A.endmacro%0A%0A.macro%20stword%20address,ra,rb%0A%09sts%20address,rb%0A%09sts%20address+1,ra%0A.endmacro%0A%0A%0A.macro%20ldx%20address%0A%09ldword%20r27:r26,address%0A.endmacro%0A%0A.macro%20ldy%20address%0A%09ldword%20r29:r28,address%0A.endmacro%0A%0A.macro%20ldz%20address%0A%09ldword%20r31:r30,address%0A.endmacro%0A%0A.macro%20ldix%20imm%0A%09ldwordi%20r27:r26,imm%0A.endmacro%0A%0A.macro%20ldiy%20imm%0A%09ldwordi%20r29:r28,imm%0A.endmacro%0A%0A.macro%20ldiz%20imm%0A%09ldwordi%20r31:r30,imm%0A.endmacro%0A%0A.macro%20stx%20address%0A%09stword%20address,r27:r26%0A.endmacro%0A%0A.macro%20sty%20address%0A%09stword%20address,r29:r28%0A.endmacro%0A%0A.macro%20stz%20address%0A%09stword%20address,r31:r30%0A.endmacro%0A%0A%0A%09_var_start_address=$300%0A%09_var_address=_var_start_address%0A%0A.macro%20var%20name%20size%0A%09name%20=%20_var_address%0A%20%20%20%20_var_address%20=%20_var_address+size%0A.endmacro%0A%0A_let_data_start%20=%20$1000%0A_let_data_address=_let_data_start%0A%0A.snip%20_let_data%0A_let_data_initial_values:%0A.endsnip%0A%0A.macro%20letb%20name%20value%0A%09name%20=%20_let_data_address%0A%20%20%20%20_let_data_address%20=%20_let_data_address%20+%201%0A%20%20%20%20.snip%20_let_data%0A%20%20%20%20%09.db%09value%0A%20%20%20%20.endsnip%0A.endmacro%20%20%20%20%0A%0A.macro%20letw%20name%20value%0A%09_let_data_address%20=%20_let_data_address%20+%20(_let_data_address%20&%201)%0A%09name%20=%20_let_data_address%0A%09_let_data_address%20=%20_let_data_address%20+%202%0A%20%20%20%20.snip%20_let_data%0A%20%20%20%20%09.dw%09value%0A%20%20%20%20.endsnip%0A.endmacro%20%20%20%20%0A%0A.snip%20_let_copy%0Acopy_let_values_to_ram:%0A%20%20ldi%20r28,low(_let_data_start)%0A%20%20ldi%20r29,high(_let_data_start)%0A%20%20ldi%20r26,low(_let_data_address)%0A%20%20ldi%20r27,high(_let_data_address)%0A%20%20ldi%20r30,low(_let_data_initial_values)%0A%20%20ldi%20r31,high(_let_data_initial_values)%20%20%20%20%20%20%20%20%0A.lp:%0A%20%20lpm%20r0,Z+%0A%20%20st%20%20y+,r0%0A%20%20cp%20r28,r26%0A%20%20cpc%20r29,r27%0A%20%20brne%20.lp%0A%20%20ret%0A.endsnip%0A%20%20%20%20%0A%20.macro%20load_let_values%0A%20%09.use%20_let_data%0A%20%09.use%20_let_copy%0A%20%09call%20copy_let_values_to_ram%0A%20.endmacro%0A%20%0A%20%20%20%20"
); 
files.kwak8 = decodeURI(
  "%0A%20%20port_InputBase%20=%20$10%0A%20%20port_Buttons1%20=%20port_InputBase+0%20%0A%20%20port_Buttons2%20=%20port_InputBase+1%20%20%20%20%20%0A%20%20port_MouseX%20=%20port_InputBase+2%20%0A%20%20port_MouseY%20=%20port_InputBase+3%20%0A%20%20port_FrameTick%20=%20port_InputBase+4%20%0A%20%20port_SecondsTick%20=%20port_InputBase+5%20%0A%20%20port_Console%20=%20port_InputBase+6%0A%0A%0A%20%20port_FrameBufferControl%20=%20$08%0A%20%20port_DisplayShiftX%20=%20$09%0A%20%20port_DisplayShiftX%20=%20$0A%0A%20%20port_BlitControl%20=%20$0B%0A%0A%20%20port_SerialPixelAddress_L%20=%20$00%0A%20%20port_SerialPixelAddress_M%20=%20$01%0A%20%20port_SerialPixelAddress_H%20=%20$02%0A%0A%09port_SerialPixelControl%20=%20$03%0A%20%20port_SerialPixelBase%20=%20$04%0A%20%20%0A%20%20port_SerialPixelAdd%20=%20$05%0A%20%20port_SerialPixelSub%20=%20$06%0A%20%20port_SerialPixelMul%20=%20$07%0A%0A%0A%20%20fbc_ShowDisplay%20=%200%0A%20%20fbc_ShowHiresDisplay%20=%201%0A%20%20%0A%20%20blitcon_Blit_8%20=%20$1%0A%20%20blitcon_Blit_4%20=%20$2%0A%20%20blitcon_Blit_3%20=%20$3%0A%20%20blitcon_Blit_2%20=%20$4%0A%20%20%0A%20%20blitcon_Mode0%20=%20$10%0A%20%20blitcon_Mode1%20=%20$11%0A%0A%20%20port_mode0_ImageData_L%20=%20$28%0A%20%20port_mode0_ImageData_H%20=%20$29%0A%20%20port_mode0_CellsWide%20=%20$2A%0A%20%20port_mode0_CellsHigh%20=%20$2B%0A%20%20port_mode0_LineIncrement=%20$2C%0A%20%20%0A%20%20port_mode1_TileImage_L%20=%20$28%0A%20%20port_mode1_TileImage_H%20=%20$29%0A%20%20port_mode1_MapDataStart_L%20=%20$2A%0A%20%20port_mode1_MapDataStart_H%20=%20$2B%0A%20%20port_mode1_MapDataIncrement=%20$2C%0A%20%20port_mode1_Palettes_L%20=%20$2D%0A%20%20port_mode1_Palettes_H%20=%20$2E%0A%20%20port_mode1_Shift%20=%20$2F%0A%0A%20%20port_blit_ImageData_L%20=%20$28%0A%20%20port_blit_ImageData_H%20=%20$29%0A%20%20port_blit_BytesWide%20=%20$2A%0A%20%20port_blit_Height%20=%20$2B%0A%20%20port_blit_LineIncement%20=%20$2C%0A%20%20port_blit_Palettes_L%20=%20$2D%0A%20%20port_blit_Palettes_H%20=%20$2E%0A%20%20port_blit_Flags%20=%20$2F%0A%0A%09audio_Volume%20=%20$0c%0A%20%20voice_Select%20=%20$0d%0A%0A%20%20voice_Base%20=%20$30%0A%20%20%0A%20%20voice_Freq_L%20=%20voice_Base%20+%20$00%0A%20%20voice_Freq_H%20=%20voice_Base%20+%20$01%0A%20%20voice_Volume%20=%20voice_Base%20+%20$02%0A%20%20voice_WaveShape%20=%20voice_Base%20+%20$03%0A%20%20voice_BendWave%20=%20voice_Base%20+%20$04%0A%20%20voice_BendAmplitude%20=%20voice_Base%20+%20$05%0A%20%20voice_NoiseHold%20=%20voice_Base%20+%20$06%0A%20%20voice_AttackRelease%20=%20voice_Base%20+%20$07%0A%0A%20%20RAMEND%20=%20$ffff%0A%0A.snip%20WaitForFrame%0Avwait_:%0A%09push%20r0%0A%09push%20r1%0A%09in%20r1,port_FrameTick%0A.lp:%0A%09in%20r0,port_FrameTick%0A%09cp%20r0,r1%0A%09breq%20.lp%0A%09pop%20r1%0A%09pop%20r0%0A%09ret%0A.endsnip%0A%0A.macro%20vwait%20%0A%09.use%20WaitForFrame%0A%09call%20vwait_%0A.endmacro%0A%0A.macro%20set_stack_pointer%20value%0A%09ldi%20r28,low(value)%0A%09out%20$3d,r28%0A%09ldi%20r28,high(value)%0A%09out%20$3e,r28%0A%09eor%20r28,r28%0A%09out%20$3f,r28%0A.endmacro%0A%0A%20%20%20%20"  
); 
files.utility = decodeURI(   
  "%0A.snip%20Pixels%0AplotPixel:%0A%09call%20setPixelCursor%0A%09out%20port_SerialPixelAdd,%20r26%0A%09ret%0A%20%20%20%20%0AsetPixelCursor:%0A%09push%20r24%0A%20%20push%20r25%0A%20%20out%20port_SerialPixelAddress_L,r24%0A%20%20sub%20r24,r24%0A%20%20add%09r25,r25%0A%20%20adc%20r24,r24%0A%20%20out%20port_SerialPixelAddress_M,r25%0A%20%20out%20port_SerialPixelAddress_H,r24%0A%20%20pop%20r25%0A%20%20pop%20r24%0A%20%20ret%0A.endsnip%0A%0A%0A.snip%20font%0A%0AFontData:%0A%20%20.byte%20$00,$00,$00,$00,$00,$00,$00%0A%20%20.byte%20$80,$df,$00,$24,$00,$04,$00%0A%20%20.byte%20$00,$90,$48,$02,$01,$00,$00%0A%20%20.byte%20$20,$90,$48,$28,$cb,$12,$09%0A%20%20.byte%20$a8,$8b,$88,$ca,$88,$ca,$0a%0A%20%20.byte%20$00,$aa,$90,$a0,$81,$02,$15%0A%20%20.byte%20$00,$70,$40,$71,$c1,$31,$11%0A%20%20.byte%20$80,$df,$00,$04,$00,$00,$00%0A%20%20.byte%20$a0,$ff,$08,$db,$00,$04,$08%0A%20%20.byte%20$00,$20,$40,$00,$49,$20,$01%0A%20%20.byte%20$00,$40,$80,$ba,$59,$01,$02%0A%20%20.byte%20$a0,$ff,$00,$c3,$18,$04,$00%0A%20%20.byte%20$28,$00,$00,$ff,$40,$ff,$09%0A%20%20.byte%20$00,$00,$00,$38,$18,$00,$00%0A%20%20.byte%20$20,$00,$00,$ff,$40,$04,$01%0A%20%20.byte%20$00,$00,$90,$a0,$01,$02,$00%0A%20%20.byte%20$00,$a0,$88,$92,$92,$04,$01%0A%20%20.byte%20$a0,$5f,$00,$db,$00,$06,$01%0A%20%20.byte%20$20,$a0,$88,$ff,$0a,$06,$03%0A%20%20.byte%20$00,$30,$58,$04,$91,$06,$01%0A%20%20.byte%20$a0,$ff,$48,$35,$c9,$00,$01%0A%20%20.byte%20$00,$b0,$18,$06,$91,$06,$01%0A%20%20.byte%20$00,$a0,$08,$96,$91,$04,$01%0A%20%20.byte%20$20,$30,$98,$ff,$0a,$04,$00%0A%20%20.byte%20$00,$a0,$88,$94,$91,$04,$01%0A%20%20.byte%20$00,$a0,$88,$22,$9a,$04,$01%0A%20%20.byte%20$a0,$ff,$40,$fb,$41,$04,$01%0A%20%20.byte%20$a8,$ff,$40,$fb,$41,$ff,$09%0A%20%20.byte%20$20,$00,$c0,$71,$00,$00,$03%0A%20%20.byte%20$20,$00,$00,$38,$c3,$00,$00%0A%20%20.byte%20$20,$c0,$00,$fb,$51,$03,$00%0A%20%20.byte%20$00,$14,$91,$24,$01,$04,$00%0A%20%20.byte%20$00,$70,$48,$6d,$0a,$06,$01%0A%20%20.byte%20$00,$a0,$40,$79,$9a,$01,$02%0A%20%20.byte%20$00,$78,$88,$4f,$91,$07,$01%0A%20%20.byte%20$00,$a0,$88,$92,$80,$04,$01%0A%20%20.byte%20$00,$b0,$88,$92,$92,$06,$01%0A%20%20.byte%20$00,$b0,$18,$96,$01,$06,$03%0A%20%20.byte%20$00,$b0,$18,$96,$01,$02,$00%0A%20%20.byte%20$00,$a0,$88,$92,$98,$04,$01%0A%20%20.byte%20$00,$90,$90,$96,$93,$02,$02%0A%20%20.byte%20$a0,$cf,$08,$db,$00,$06,$01%0A%20%20.byte%20$00,$20,$58,$40,$49,$06,$00%0A%20%20.byte%20$00,$90,$50,$96,$88,$02,$02%0A%20%20.byte%20$00,$90,$00,$92,$00,$06,$03%0A%20%20.byte%20$00,$c8,$d0,$6d,$92,$01,$02%0A%20%20.byte%20$80,$6f,$90,$92,$93,$02,$02%0A%20%20.byte%20$00,$70,$88,$49,$92,$06,$01%0A%20%20.byte%20$00,$b0,$88,$b2,$0a,$02,$00%0A%20%20.byte%20$00,$a0,$88,$b2,$d2,$04,$11%0A%20%20.byte%20$00,$b0,$88,$b2,$8a,$02,$02%0A%20%20.byte%20$00,$a0,$88,$84,$88,$04,$01%0A%20%20.byte%20$a0,$c7,$18,$db,$00,$04,$00%0A%20%20.byte%20$00,$90,$90,$92,$92,$04,$01%0A%20%20.byte%20$20,$90,$90,$cd,$5a,$04,$01%0A%20%20.byte%20$00,$48,$90,$ed,$d2,$01,$02%0A%20%20.byte%20$00,$88,$50,$a4,$40,$01,$02%0A%20%20.byte%20$20,$48,$90,$dd,$01,$04,$00%0A%20%20.byte%20$00,$30,$98,$a0,$01,$06,$03%0A%20%20.byte%20$00,$b0,$08,$92,$00,$06,$01%0A%20%20.byte%20$00,$90,$00,$04,$88,$00,$02%0A%20%20.byte%20$00,$30,$48,$00,$49,$06,$01%0A%20%20.byte%20$00,$a0,$40,$01,$02,$00,$00%0A%20%20.byte%20$08,$00,$00,$00,$00,$3f,$c0%0A%20%20.byte%20$00,$20,$40,$00,$00,$00,$00%0A%20%20.byte%20$00,$00,$00,$94,$93,$04,$03%0A%20%20.byte%20$00,$90,$00,$96,$91,$06,$01%0A%20%20.byte%20$00,$00,$00,$94,$03,$04,$03%0A%20%20.byte%20$00,$00,$90,$94,$93,$04,$03%0A%20%20.byte%20$20,$00,$00,$6b,$19,$04,$03%0A%20%20.byte%20$a0,$ff,$88,$cb,$08,$04,$00%0A%20%20.byte%20$08,$00,$00,$94,$91,$fb,$53%0A%20%20.byte%20$00,$90,$00,$96,$91,$02,$02%0A%20%20.byte%20$20,$20,$00,$d9,$00,$06,$01%0A%20%20.byte%20$08,$00,$08,$04,$49,$ef,$09%0A%20%20.byte%20$00,$90,$00,$b2,$41,$02,$02%0A%20%20.byte%20$a0,$cf,$00,$db,$00,$06,$01%0A%20%20.byte%20$20,$00,$00,$94,$91,$01,$02%0A%20%20.byte%20$00,$00,$00,$96,$91,$02,$02%0A%20%20.byte%20$00,$00,$00,$94,$91,$04,$01%0A%20%20.byte%20$00,$00,$00,$96,$91,$96,$01%0A%20%20.byte%20$00,$00,$00,$94,$93,$04,$93%0A%20%20.byte%20$00,$00,$00,$b2,$11,$02,$00%0A%20%20.byte%20$00,$00,$00,$34,$c3,$06,$01%0A%20%20.byte%20$a0,$df,$00,$d9,$81,$00,$01%0A%20%20.byte%20$00,$00,$00,$92,$92,$04,$03%0A%20%20.byte%20$20,$00,$00,$ed,$52,$04,$01%0A%20%20.byte%20$20,$00,$00,$96,$92,$02,$01%0A%20%20.byte%20$20,$00,$00,$dd,$4a,$02,$02%0A%20%20.byte%20$08,$00,$00,$92,$92,$eb,$53%0A%20%20.byte%20$20,$00,$00,$f9,$0b,$06,$03%0A%20%20.byte%20$a0,$df,$01,$dd,$00,$00,$01%0A%20%20.byte%20$a0,$df,$00,$db,$00,$24,$00%0A%20%20.byte%20$a0,$dd,$00,$df,$01,$02,$00%0A%20%20.byte%20$80,$ff,$80,$02,$01,$00,$00%0A%20%20.byte%20$00,$40,$80,$ba,$59,$01,$02%0A.endsnip%20%0A%0A%0A.snip%20Mode0Code%0A.use%20Pixels%0A%0Aletw%09mode0_Page%20$8000%0Aletb%09mode0_Width%20160%0Aletb%20%09mode0_Height%20120%0Aletb%20%20mode0_Left%2010%0Aletb%20%20mode0_Top%20%2030%0A%0ArenderMode0:%0A%09push%20r24%0A%09push%20r25%0A%09push%20r26%0A%20%20push%20r27%0A%20%20ldx%20mode0_Page%0A%20%20%20%20out%20port_mode0_ImageData_L,r26%20%20%20%20%0A%20%20%20%20out%20port_mode0_ImageData_H,r27%0A%20%20%20%20lds%20r26,mode0_Width%0A%20%20%20%20out%09port_mode0_CellsWide,r26%20%20%20%20%0A%09%09out%20port_mode0_LineIncrement,r26%0A%09%09out%20port_mode0_LineIncrement+1,r26%0A%09%09out%20port_mode0_LineIncrement+2,r26%0A%09%09out%20port_mode0_LineIncrement+3,r26%0A%0A%09lds%20r26,mode0_Height%0A%20%20%20%20out%20port_mode0_CellsHigh,r26%0A%20%20%20%20%0A%20%20%20%20lds%20r24,mode0_Left%0A%20%20%20%20lds%20r25,mode0_Top%0A%20%20%20%20call%20setPixelCursor%0A%20%20%20%20%0A%20%20%20%20%0A%20%20%20%20ldi%20r26,blitcon_Mode0%0A%20%20%20%20out%20port_BlitControl,r26%0A%20%20%20%20%0A%20%20%20%20%0A%20%20%20%20pop%20r27%0A%20%20%20%20pop%20r26%0A%20%20%20%20pop%20r25%0A%20%20%20%20pop%20r24%0A%20%20%20%20ret%0A%0AdrawDigit:%0A%09addi%09r18,48%0AdrawChar:%0A%09//%20r16=x%20r17=y%20r18=char%20r19=attr%0A%09push%20r24%0A%09push%20r25%0A%09push%20r26%0A%09push%20r27%0A%09push%20r28%0A%09push%20r29%20%20%20%20%0A%09push%20r30%0A%09push%20r31%0A%0A%09clr%20r3%0A%09lds%09r2,mode0_Width%0A%09lsl%20r2%0A%09adc%20r3,r3%20%20//%20r2:r3%20has%20line%20width%20in%20bytes%0A%0A%09mul%20r3,r17%0A%09mov%20r4,r0%0A%09mul%20r2,r17%0A%09add%20r1,r4%20%20//%20r0:r1%20is%20y*%20linewidth%0A%0A%09movw%20r25:r24,r1:r0%0A%09add%20r24,r0%0A%09adc%20r25,r1%0A%09add%20r24,r0%0A%09adc%20r25,r1%0A%09clr%20r1%0A%09add%20r24,r16%0A%09adc%20r25,r1%20%20%0A%09add%20r24,r16%0A%09adc%20r25,r1%20%20//%20r24:r25%20is%20now%20y*linewidth*3+x*2%0A%09ldx%20mode0_Page%0A%09add%20r26,r24%0A%09adc%20r27,r25%0A%09movw%20y,x%0A%0A%09subi%20r18,32%0A%09ldi%20r31,7%0A%09mul%20r18,r31%0A%09ldiz%20FontData%0A%09add%20r30,r0%0A%09adc%20r31,r1%0A%0A%09lpm%20r0,Z+%0A%0A%09rcall%20.cell%0A%09rcall%20.cell%0A%0A%09add%20r28,r2%0A%09adc%20r29,r3%0A%09movw%20X,Y%0A%0A%09rcall%20.cell%0A%09rcall%20.cell%0A%0A%09add%20r28,r2%0A%09adc%20r29,r3%0A%09movw%20X,Y%0A%0A%09rcall%20.cell%0A%09rcall%20.cell%0A%0A%09pop%20r31%0A%09pop%20r30%0A%09pop%20r29%0A%09pop%20r28%0A%09pop%20r27%0A%09pop%20r26%0A%09pop%20r25%0A%09pop%20r24%0A%20%20%20%0A%09ret%0A.cell:%0A%09lpm%20r1,Z+%20%20%20%20%0A%09st%20X+,r1%0A%09sbrs%20r0,7%0A%09swap%20r19%20%20%20%20%0A%09st%20X+,r19%0A%09sbrs%20r0,7%0A%09swap%20r19%20%20%20%20%0A%09lsl%20r0%20%20%20%20%0A%09ret%0A%0AdrawRomString:%0A%09//%20r16=x%20r17=y%20r:19:r18=string%20r20=attr%0A%09movw%20W,%20r17:r16%0A%09movw%20Z,%20r19:r18%0A%09mov%20r26,r20%0A.lp:%20%20%20%20%0A%09movw%20r17:r16,W%0A%09lpm%20r18,Z+%0A%09cpi%20r18,0%0A%09breq%20.done%0A%09mov%20r19,r26%0A%09call%20drawChar%0A%09addi%20r24,2%0A%09jmp%20.lp%0A.done:%0A%09ret%0A%0A.endsnip%20%20%20%20%0A%0A.use%20font%20%0A.use%20Mode0Code%0A"  
);
files.scratch =  decodeURI(
  ".snip%20small_constant_divides%0A%20%20.use%20divider%0A%20%20%20%20%20%20scaledReciprocal(x)%20=%20round($80000%20/%20x);%0A%0A%20%20.macro%20divByN%20n%20%0A%20%20%20%20//%20X/n%20=%3E%20r19:r18%20%0A%20%20%20%20%20%20ldi%20r17,n%0A%20%20%20%20%20%20ldiy%20scaledReciprocal(n)%0A%20%20%20%20%20%20jmp%20DivUsingReciprocal%0A%20%20.endmacro%0A%0A%20%20DivBy9:%20divByN%209%0A%20%20DivBy10:%20divByN%2010%0A%20%20DivBy11:%20divByN%2011%0A%20%20DivBy12:%20divByN%2012%0A%20%20DivBy13:%20divByN%2013%0A%20%20DivBy14:%20divByN%2014%0A%20%20DivBy15:%20divByN%2015%0A%20%20DivBy16:%20divByN%2016%0A.endsnip%0A%0A%0A.snip%20divider%20%0ADivUsingReciprocal:%0A%09push%20r17%0A%09;%20Q%20=%20X%20*%20Y%0A%09;%20(r19:r18:r17%5B:rXX%5D%20=%20XH:XL%20*%20YH:YL)%0A%20%20%20%20clr%20%20%20%20%20r2%0A%20%20%20%20mul%20%20%20%20%20XH,%20YH%09%09;%20ah%20*%20bh%0A%20%20%20%20movw%20%20%20%20r19:r18,%20r1:r0%0A%20%20%20%20mul%20%20%20%20%20XL,%20YL%09%09;%20al%20*%20bl%0A%09mov%09r17,r1%09%09;%20r0%20to%20%5BrXX%5D%20is%20superfluous%0A%20%20%20%20mul%20%20%20%20%20XH,%20YL%09%09;%20ah%20*%20bl%0A%20%20%20%20add%20%20%20%20%20r17,%20r0%0A%20%20%20%20adc%20%20%20%20%20r18,%20r1%0A%20%20%20%20adc%20%20%20%20%20r19,%20r2%0A%20%20%20%20mul%20%20%20%20%20YH,%20XL%09%09;%20bh%20*%20al%0A%20%20%20%20add%20%20%20%20%20r17,%20r0%0A%20%20%20%20adc%20%20%20%20%20r18,%20r1%0A%20%20%20%20adc%20%20%20%20%20r19,%20r2%0A%0A%09;%20Q%20=%20Q%20%3E%3E%2016:%20use%20r19:r18%20as%20word%0A%09;%20Q%20=%20Q%20%3E%3E%203%0A%09lsr%09r19%09%09;%20do%20the%20last%203%20shifts%0A%09ror%09r18%0A%09lsr%09r19%0A%09ror%09r18%0A%09lsr%09r19%0A%09ror%09r18%0A%0A%09;calc%20remainder%20my%20mult%20and%20sub%0A%20%20%20%20pop%20r17%0A%20%20%20%20mul%20r18,r17%0A%20%20%20%20mov%20r17,XL%0A%20%20%20%20sub%20r17,r0%0A%20%20%20%20ret%20%20//%20result%20r19:r18%20%20remainder%20r17%0A.endsnip%20%0A%0A.snip%20print_numbers%0A%20%20.use%20small_constant_divides%0A%0APrintUint16:%0A%09//%20r16=x%20r17=y%20r19:r18%20=Uint16%20r20=attr%0A%20%20%20%20push%20r8%0A%20%20%20%20clr%20r8%0A%20%20%20%20%0A%09movw%20W,r17:r16%0A%20%20%20%20movw%20X,r19:r18%0A.lp:%20%20%20%20%0A%20%20%20%20call%20DivBy10%0A%20%20%20%20push%20r17%0A%20%20%20%20movw%20X,r19:r18%20%0A%20%20%20%20inc%20r8%0A%20%20%20%20clr%20r0%0A%20%20%20%20cp%09r18,r0%0A%20%20%20%20cpc%20r19,r0%0A%20%20%20%20brne%20.lp%0A%0A%20%20%20%20mov%20r19,r20%0A.writelp:%20%20%20%20%0A%09pop%20r18%0A%20%20%20%20movw%20r17:r16,W%0A%20%20%20%20addi%20r24,2%0A%20%20%20%20call%20drawDigit%0A%20%20%20%20dec%20r8%0A%20%20%20%20brne%20.writelp%0A%20%20%20%20pop%20r8%0A%20%20%20%20ret%0A%20%20%20%20%0A.endsnip%0A"
)


  function makeBreakPointMarker() {
    var marker = document.createElement("div");
    marker.style.color = "#822";
    marker.innerHTML = "● ";
    return marker;
  }

  function selectElementContents(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

function init() {
  $("select option:contains(Input)").prop({selected:true}).trigger("change");

  var editorBox = $('<div class="editor"><ul class="tabs"></ul><div class="addtab">+</div><div class="code"></div></div>');
  var controlBox = $('<div class="controls"></div>')
  var assembleButton = $("<button>Assemble</button>");
  var runButton = $("<button>Assemble and Run</button>");
  var outputBox = $('<textarea class="output" readonly="true" >Output</textarea>');
  
  controlBox.append(assembleButton).append(runButton).append(outputBox);

  var assemblerBox = $("#assembler");
  assemblerBox.append(editorBox).append(controlBox);


  assemblerBox.find('.tabs li').on("click",tabClick); 
  var editorOptions = {
    lineNumbers:true,
    theme: "cobalt",
    tabSize: 2,
    mode: "kasm",
    gutters: ["CodeMirror-linenumbers","breakpoints"]
  }
  var editor = CodeMirror($('#assembler .code')[0], editorOptions);
  window.editor=editor;
  editor.on("gutterClick", handleGutterClick);
  
  var editorDocuments = {};      
  var PCLine = {doc : null, lineNumber: 0};
  var errorLine = {doc : null, lineNumber: 0};;

  function handleGutterClick(cm,n) {
    if (cm.lineInfo(n).gutterMarkers) {
      cm.setGutterMarker(n,"breakpoints",null);
    }
    else {
      cm.setGutterMarker(n,"breakpoints",makeBreakPointMarker() );
    }
    
  }
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

  function clearErrorLine() {
    if (errorLine.doc) {
      errorLine.doc.removeLineClass(errorLine.lineNumber-1,"background","Error" )
      errorLine={doc : null, lineNumber: 0};
    }
  }

  function setErrorLine(filename,lineNumber) {
    clearErrorLine();
    let doc=fileDoc(filename);
    errorLine={doc,lineNumber};
    if (doc) {
      doc.addLineClass(errorLine.lineNumber-1,"background","Error");
    }
  }
  
  function clearMarks() {
    clearErrorLine();
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
    return assemble("Main",loadFile,reportError,outLine);   
  }

  function loadChunks(chunks,debugInfo) {
    var byteChunks=chunks.map(chunk => 
      ( {address:chunk.address*2, data: new Uint8Array(chunk.data.buffer) }) );
    window.compiledChunks=byteChunks;
    emulatorHost.currentProgram=byteChunks;
    emulatorHost.loadCodeChunks(byteChunks,debugInfo)
  }

  assembleButton.on('click', function () {
    var result = assembleEditorContents();
    loadChunks(result.output,result.debugInfo);
    emulatorHost.set_halted(true);
  });

  runButton.on('click',function (){
    var result = assembleEditorContents();
    loadChunks(result.output,result.debugInfo);    
  });

  var outLine = s=>{outputBox[0].value+=s+"\n";}

  function reportError(message,pos) {
    outLine(message)  
    let {filename,lineNumber} = pos;
    setErrorLine(filename,lineNumber);
    showLine(filename,lineNumber)
  }

  function addTab(name,content) {
    let tab = $('<li>'+name+'</li>')[0];
    assemblerBox.find('.tabs').append(tab);
    tab.addEventListener("click",tabClick);
    tab.addEventListener("dblclick",tabDblClick);
    tab.addEventListener("input",tabInput);
    tab.addEventListener("keydown",tabKeyDown);
    tab.addEventListener("blur",tabBlur);

    let doc = CodeMirror.Doc(content,"kasm");
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
    if (e.ctrlKey) {
    }
  }

  function tabDblClick(e) {
    let tab=e.currentTarget;
    selectTab(tab);
    tab.contentEditable="true";
    selectElementContents(tab);
    tab.focus();
  }

  function tabBlur(e) {
    let tab=e.currentTarget;    
    if (tab.isContentEditable) {
      tabStopRename(tab);
    }
  }

  function tabKeyDown(e) {
    let tab=e.currentTarget;    
    if (tab.isContentEditable) {
      if (e.keyCode === 13) {
        tabStopRename(tab);
      }
      if (e.keyCode === 27) {
        tabStopRename(tab);
        tab.textContent=tab.filename;
      }
    }
  }

  function tabStopRename(tab) {
    tab.removeAttribute("contenteditable");
    window.getSelection().removeAllRanges();
  }

  function tabInput(e) {
    let text = e.currentTarget.textContent;
    console.log(text);
  }

  function loadFile(name) {
    if (! editorDocuments.hasOwnProperty(name)) throw new Error("File not found: "+name)
    
    var code = fileDoc(name).getValue();
    return code;
  }

  for (let name of Object.keys(files)) {
    addTab(name,files[name]);    
  }
  addTab("extra","");

  selectEditor("Main");
}

CodeMirror.defineSimpleMode("kasm", {
  // The start state contains the rules that are intially used
  start: [
    // The regex matches the token, the token property contains the type
    {regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string"},

    {regex: /((?:R|r)(?:[0-9]|[12][0-9]|3[01]))\b/, token: "register"},
   
    {regex: /\.\w+:/, sol: true,
      token: "local"},
    {regex: /\.\w+/, sol: true,
        token: "directive"},
    {regex: /\w+:/, sol: true,
          token: "label"},

    {regex: /(?:in|out|adiw|addi|clc|clh|cli|cln|cls|clt|clv|clz|sec|seh|sei|sen|ses|set|sev|sez|blcr|bset|icall|ijmp|lpm|elpm|nop|ret|reti|sleep|break|wdr|spm|adc|add|and|cp|cpc|cpse|eor|mov|mul|or|sbc|sub|clr|lsl|rol|tst|andi|cbr|ldi|ser|ori|sbr|cpi|sbci|subi|sbrc|sbrc|brcc|brcs|breq|brge|brhc|brhs|brid|brie|brlo|brlt|brmi|brne|brpl|brsh|brtc|brts|brvc|brvs|rcall|jrmp|call|jmp|asr|com|dec|inc|lsr|neg|pop|push|ror|swap|movw|muls|mulsu|fmul|fmuls|fmulsu|sts|lds|ldd|ld|std|st|eicall|eijmp)\b/,
        token: "instruction"},
       
    // Rules are matched in the order in which they appear, 
    {regex: /(0x|\$)[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
     token: "number"},
    {regex: /(\/\/|;).*/, token: "comment"},
    {regex: /\/(?:[^\\]|\\.)*?\//, token: "variable-3"},
    // A next property will cause the mode to move to a different state
    {regex: /\/\*/, token: "comment", next: "comment"},
    {regex: /[-+\/*=<>!]+/, token: "operator"},
    // indent and dedent properties guide autoindentation
    {regex: /[a-zA-Z$][\w$]*/, token: "variable"},


    
  ],
  // The multi-line comment state.
  comment: [
    {regex: /.*?\*\//, token: "comment", next: "start"},
    {regex: /.*/, token: "comment"}
  ],
  // The meta property contains global information about the mode. It
  // can contain properties like lineComment, which are supported by
  // all modes, and also directives like dontIndentStates, which are
  // specific to simple modes.
  meta: {
    dontIndentStates: ["comment"],
    lineComment: "//"
  }
});


function makeCart(name="Trial by Fire") {
  var screenShot = $(".emulator.host canvas")[0];
  var cartImage=Cart.encode(emulatorHost.currentProgram,screenShot,name);
  var decoded = Cart.decode(cartImage);
  console.log(decoded);
  
  emulatorHost.loadCodeChunks(decoded);

  window.open(cartImage.toDataURL());
}