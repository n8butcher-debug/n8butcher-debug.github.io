(() => {
  const card=document.querySelector('.portrait-viewer');
  if(!card)return;
  const photo=card.querySelector('img'),canvas=card.querySelector('canvas');
  const replay=card.querySelector('button');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0;
  function scan(){
    if(motion.matches)return;
    card.classList.remove('is-scanning');
    requestAnimationFrame(()=>requestAnimationFrame(()=>card.classList.add('is-scanning')));
  }
  function prepare(){
    // Sobel contours from the portrait pixels provide the scan's feature layer.
    canvas.width=400;canvas.height=Math.round(400*photo.naturalHeight/photo.naturalWidth);
    const ctx=canvas.getContext('2d',{willReadFrequently:true});
    ctx.drawImage(photo,0,0,canvas.width,canvas.height);
    const source=ctx.getImageData(0,0,canvas.width,canvas.height),out=ctx.createImageData(canvas.width,canvas.height);
    const width=canvas.width,height=canvas.height,gray=new Float32Array(width*height);
    for(let i=0;i<gray.length;i++)gray[i]=source.data[i*4]*.299+source.data[i*4+1]*.587+source.data[i*4+2]*.114;
    for(let y=1;y<height-1;y++)for(let x=1;x<width-1;x++){
      const i=y*width+x;
      const gx=-gray[i-width-1]+gray[i-width+1]-2*gray[i-1]+2*gray[i+1]-gray[i+width-1]+gray[i+width+1];
      const gy=-gray[i-width-1]-2*gray[i-width]-gray[i-width+1]+gray[i+width-1]+2*gray[i+width]+gray[i+width+1];
      const edge=Math.hypot(gx,gy);
      out.data[i*4]=164;out.data[i*4+1]=255;out.data[i*4+2]=240;
      out.data[i*4+3]=source.data[i*4+3]>80?Math.min(255,Math.max(0,edge-24)*2):0;
    }
    ctx.putImageData(out,0,0);
    card.classList.add('portrait-ready');scan();
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
  card.addEventListener('pointerleave',reset);
  window.addEventListener('resize',reset);
  canvas.addEventListener('animationend',()=>card.classList.remove('is-scanning'));
  replay.addEventListener('click',scan);
  function preference(){replay.hidden=motion.matches;if(motion.matches){reset();card.classList.remove('is-scanning');}}
  motion.addEventListener('change',preference);preference();
})();
