import React,{useEffect,useState} from 'react';
import {AbsoluteFill,cancelRender,continueRender,delayRender,Easing,Img,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {openingConfig as config} from './openingConfig';
import AsciiGradientBackground from './AsciiGradientBackground';

const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease=Easing.bezier(.2,.7,.2,1);
const useFonts=()=>{
 const [handle]=useState(()=>delayRender('加载片头字体'));
 useEffect(()=>{Promise.all([
  new FontFace('Headline',`url(${staticFile('fonts/JiangChengLvDongSong.ttf')})`,{weight:'400'}).load(),
  new FontFace('Support',`url(${staticFile('fonts/AlibabaHealth-Bold.ttf')})`,{weight:'700'}).load(),
  new FontFace('Text',`url(${staticFile('fonts/AlibabaHealth-Regular.ttf')})`,{weight:'400'}).load(),
 ]).then(fonts=>{fonts.forEach(font=>document.fonts.add(font));continueRender(handle);}).catch(cancelRender);},[handle]);
};
const Display:React.FC<{children:React.ReactNode;size:number;warm?:boolean;style?:React.CSSProperties;name?:string}>=({children,size,warm=false,style,name})=><div data-title={name} style={{position:'absolute',fontFamily:'Headline',fontWeight:400,fontSize:size,lineHeight:1.12,letterSpacing:-4,whiteSpace:'nowrap',...style}}>
 <div aria-hidden style={{position:'absolute',inset:0,color:warm?'#71421d':'#112b46',transform:'translate(3px,6px)',textShadow:'0 13px 24px rgba(0,0,0,.6)'}}>{children}</div>
 <div style={{position:'relative',color:'transparent',background:warm?'linear-gradient(180deg,#fff0b8 0%,#ffd27c 27%,#e9a536 58%,#bb711f 100%)':'linear-gradient(180deg,#f7fcff 0%,#e5f3ff 34%,#b8daf1 65%,#4d79a2 100%)',backgroundClip:'text',WebkitBackgroundClip:'text'}}>{children}</div>
</div>;

const YearRoll:React.FC<{swap:number}>=({swap})=>{
 const frame=useCurrentFrame();
 const roll=interpolate(frame,[0,4,9,15,22],[0,.15,1.3,2.4,3],clamp);
 const arc=Math.sin(Math.PI*swap);
 return <div data-layer="年份滚轮" data-year={frame>=22?'2027':'2024→2027'} style={{position:'absolute',left:130+910*swap,top:230-90*swap-120*arc,width:704,height:400,transform:`scale(${1-.59*swap})`,transformOrigin:'0 0'}}>
  {[2,0,2].map((n,i)=><Display key={i} size={340} name={`年份固定数字${i}`} style={{left:i*174,top:0,width:174,textAlign:'center',letterSpacing:0}}>{n}</Display>)}
  <div style={{position:'absolute',left:522,top:0,width:180,height:400,overflow:'hidden',maskImage:'linear-gradient(to bottom,transparent 0%,#000 7%,#000 91%,transparent 100%)'}}>
   <div style={{position:'absolute',left:0,top:-roll*400,width:180,height:1600}}>
    {[4,5,6,7].map((n,i)=><Display key={n} size={340} name={`年份末位${n}`} warm={n===7} style={{left:0,top:i*400,width:174,textAlign:'center',letterSpacing:0}}>{n}</Display>)}
   </div>
  </div>
 </div>;
};

export const Opening:React.FC=()=>{
 useFonts();
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),t=config.timingMs;
 const f=(ms:number)=>Math.round(ms*fps/1000);
 const tween=(start:number,duration:number,easing=ease)=>interpolate(frame,[f(start),f(start+duration)],[0,1],{...clamp,easing});
 const enter=(start:number,duration=140)=>tween(start,duration);
 const swap=tween(t.turn,580,Easing.bezier(.42,0,.18,1));
 const arc=Math.sin(Math.PI*swap);
 const resale=enter(t.resaleHouse,220);
 const newHouseExit=enter(t.resaleHouse,160);
 const newHouseColour='saturate(1.32) contrast(1.08) brightness(1.06)';
 const resaleColour='saturate(1.16) contrast(1.06) brightness(1.03)';
 const houseLeft=1080-990*swap,houseTop=125+45*swap+65*arc;
 const houseScale=1-.17*arc;
 const titleLeft=1040+630*(1-swap);
 return <AbsoluteFill style={{background:config.colors.background,overflow:'hidden'}}>
  <AsciiGradientBackground renderTime={frame/fps} colors={['#123e83','#bce7ff','#4aa2d4','#117f9e']} gradientOpacity={.93} glyphOpacity={.62} glow={.15} intro={false} mouseInteraction={false} clickEffect="none" dpr={1} style={{position:'absolute',inset:0,opacity:.76}}/>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 52%,rgba(12,23,35,.08) 5%,rgba(9,19,30,.38) 100%)'}}/>

  <div data-layer="住宅接力" style={{position:'absolute',left:houseLeft,top:houseTop,width:740,height:870,transform:`scale(${houseScale})`,transformOrigin:'50% 65%'}}>
   <Img data-subject="现代住宅" src={staticFile(config.assets.newHouse)} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain',opacity:1-newHouseExit,transform:`translateX(${-110*newHouseExit}px) scale(${1+.025*enter(t.newHouse,260)-.14*newHouseExit})`,filter:`${newHouseColour} brightness(${.97+.07*enter(t.newHouse,220)}) drop-shadow(0 22px 17px rgba(0,0,0,.34))`}}/>
   <Img data-subject="成熟社区住宅" src={staticFile(config.assets.resaleHouse)} style={{position:'absolute',left:-55,top:25,width:880,height:820,objectFit:'contain',opacity:resale,transform:`translateX(${145*(1-resale)}px) scale(${.92+.08*resale})`,transformOrigin:'50% 100%',filter:`${resaleColour} drop-shadow(0 22px 17px rgba(0,0,0,.34))`}}/>
  </div>

  <YearRoll swap={swap}/>
  <div data-layer="年买房" style={{position:'absolute',left:150+1180*swap,top:655-482*swap-80*arc,transform:`scale(${1-.43*swap})`,transformOrigin:'0 0'}}>
   <Display size={170} style={{left:0,top:0,opacity:enter(t.yearSettled,120)}}>年</Display>
   <Display size={170} style={{left:183,top:0,opacity:enter(t.buy,160)}}>买房</Display>
  </div>

  <div data-layer="分水岭判断" style={{position:'absolute',left:titleLeft,top:0,opacity:enter(t.turn,180)}}>
   <Display name="真正的" size={124} style={{left:8,top:342}}>真正的</Display>
   <Display name="分水岭" size={224} warm style={{left:0,top:500,opacity:enter(t.divide,160)}}>分水岭</Display>
  </div>
  <div data-layer="否定与类别" style={{position:'absolute',left:1040,top:797,display:'flex',alignItems:'baseline',gap:11,fontFamily:'Headline',whiteSpace:'nowrap'}}>
   <Display name="不是" size={100} warm style={{position:'relative',opacity:enter(t.negation,140)}}>不是</Display>
   <Display name="新房" size={94} style={{position:'relative',opacity:enter(t.newHouse,140)}}>新房</Display>
   <Display name="和" size={77} style={{position:'relative',opacity:enter(t.and,100),margin:'0 2px'}}>和</Display>
   <Display name="二手房" size={94} warm style={{position:'relative',opacity:enter(t.resaleHouse,120)}}>二手房</Display>
  </div>

  <div style={{position:'absolute',right:108,top:40,fontFamily:'Text',fontSize:30,letterSpacing:1,color:'#cbd9e2',textShadow:'0 2px 8px #000',display:'flex',alignItems:'center',gap:15}}><span style={{width:25,height:3,background:'#94adbd'}}/><span>{config.text.identity}</span></div>
 </AbsoluteFill>;
};
