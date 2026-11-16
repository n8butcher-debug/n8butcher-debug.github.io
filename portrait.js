(() => {
  const card=document.querySelector('.portrait-viewer');
  if(!card)return;
  const photo=card.querySelector('img'),canvas=card.querySelector('canvas');
  const replay=card.querySelector('button'),slider=card.querySelector('input');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,scanFrame=0;
  function amount(value){slider.value=String(Math.round(value));card.style.setProperty('--reveal',`${100-value}%`);}
  function stop(){cancelAnimationFrame(scanFrame);card.classList.remove('is-scanning');}
  function scan(){
    stop();if(motion.matches)return;
    card.classList.add('is-scanning');const start=performance.now();
    const ease=t=>t*t*(3-2*t);
    function tick(now){
      const elapsed=now-start;
      const value=elapsed<2800?100*ease(elapsed/2800):elapsed<4400?100:elapsed<7400?100-65*ease((elapsed-4400)/3000):35;
      amount(value);
      if(elapsed<7400)scanFrame=requestAnimationFrame(tick);else stop();
    }
    scanFrame=requestAnimationFrame(tick);
  }
  function prepare(){
    canvas.width=600;canvas.height=Math.round(600*photo.naturalHeight/photo.naturalWidth);
    const ctx=canvas.getContext('2d',{willReadFrequently:true});
    ctx.drawImage(photo,0,0,canvas.width,canvas.height);
    const source=ctx.getImageData(0,0,canvas.width,canvas.height),out=ctx.createImageData(canvas.width,canvas.height);
    const width=canvas.width,height=canvas.height,gray=new Float32Array(width*height);
    for(let i=0;i<gray.length;i++)gray[i]=source.data[i*4]*.299+source.data[i*4+1]*.587+source.data[i*4+2]*.114;
    for(let y=1;y<height-1;y++)for(let x=1;x<width-1;x++){
      const i=y*width+x,alpha=source.data[i*4+3];if(alpha<20)continue;
      const gx=-gray[i-width-1]+gray[i-width+1]-2*gray[i-1]+2*gray[i+1]-gray[i+width-1]+gray[i+width+1];
      const gy=-gray[i-width-1]-2*gray[i-width]-gray[i-width+1]+gray[i+width-1]+2*gray[i+width]+gray[i+width+1];
      const edge=Math.min(1,Math.max(0,Math.hypot(gx,gy)-20)/130);
      out.data[i*4]=15+edge*125;out.data[i*4+1]=38+edge*210;out.data[i*4+2]=94+edge*145;out.data[i*4+3]=alpha;
    }
    ctx.putImageData(out,0,0);ctx.lineWidth=.55;
    for(let y=7;y<height-7;y+=7)for(let x=7;x<width-7;x+=7){
      const i=y*width+x;if(source.data[i*4+3]<150)continue;
      const light=gray[i]/255;ctx.fillStyle=`rgba(166,255,236,${.35+light*.6})`;
      ctx.beginPath();ctx.arc(x,y,.65+light*.7,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle=`rgba(109,225,234,${.07+light*.13})`;
      for(const [dx,dy] of [[7,0],[0,7]])if(source.data[((y+dy)*width+x+dx)*4+3]>150){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+dx,y+dy);ctx.stroke();}
    }
    card.classList.add('portrait-ready');if(motion.matches)amount(35);else scan();
  }
  if(photo.complete&&photo.naturalWidth)prepare();else photo.addEventListener('load',prepare,{once:true});
  card.addEventListener('pointermove',e=>{
    if(motion.matches||e.pointerType!=='mouse')return;
    const r=card.getBoundingClientRect(),x=Math.max(-.5,Math.min(.5,(e.clientX-r.left)/r.width-.5)),y=Math.max(-.5,Math.min(.5,(e.clientY-r.top)/r.height-.5));
    cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
      card.style.setProperty('--px',`${x*12}px`);card.style.setProperty('--py',`${y*9}px`);
      card.style.setProperty('--rx',`${-y*2}deg`);card.style.setProperty('--ry',`${x*3}deg`);
      card.style.setProperty('--light-x',`${50+x*25}%`);card.style.setProperty('--light-y',`${40+y*25}%`);
    });
  });
  function reset(){cancelAnimationFrame(frame);for(const key of ['--px','--py','--rx','--ry','--light-x','--light-y'])card.style.removeProperty(key);}
  card.addEventListener('pointerleave',reset);window.addEventListener('resize',reset);
  slider.addEventListener('input',()=>{stop();amount(Number(slider.value));});
  replay.addEventListener('click',scan);
  motion.addEventListener('change',()=>{stop();reset();replay.hidden=motion.matches;amount(35);});
  replay.hidden=motion.matches;
})();
