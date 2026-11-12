// A small regression network fitted to simulated campaign results.
// ROI = 100 * (attributed gross profit - campaign cost) / campaign cost.
function buildLearningStudy() {
  let seed=41;
  function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
  const samples=[],hidden=16,count=hidden*3+1;
  for(let i=0;i<64;i++) {
    const spend=2200+i/63*17600+(random()-.5)*220;
    // Two budget windows perform better in this simulated campaign mix.
    const firstWindow=125*Math.exp(-Math.pow((spend-6500)/1850,2));
    const secondWindow=95*Math.exp(-Math.pow((spend-14500)/2100,2));
    const roi=12+firstWindow+secondWindow-.00065*(spend-2000)+(random()+random()-1)*18;
    const grossProfit=spend*(1+roi/100);
    samples.push({spend,grossProfit,roi});
  }
  samples.sort((a,b)=>a.spend-b.spend);
  const weights=Float64Array.from({length:count},(_,i)=>i===count-1?0:(random()-.5)*.8);
  const momentum=new Float64Array(count),velocity=new Float64Array(count),gradients=new Float64Array(count),activations=new Float64Array(hidden);
  function predict(w,spend){
    const x=(spend-11000)/9000;
    let score=w[count-1];
    for(let j=0;j<hidden;j++)score+=Math.tanh(w[j*2]*x+w[j*2+1])*w[hidden*2+j];
    return score*150;
  }
  const frames=[{weights:weights.slice(),step:0}];
  for(let step=1;step<=3000;step++) {
    gradients.fill(0);
    for(const sample of samples) {
      const x=(sample.spend-11000)/9000;
      let score=weights[count-1];
      for(let j=0;j<hidden;j++){activations[j]=Math.tanh(weights[j*2]*x+weights[j*2+1]);score+=activations[j]*weights[hidden*2+j];}
      const error=score-sample.roi/150;
      gradients[count-1]+=error;
      for(let j=0;j<hidden;j++) {
        gradients[hidden*2+j]+=error*activations[j];
        const delta=error*weights[hidden*2+j]*(1-activations[j]*activations[j]);
        gradients[j*2]+=delta*x;gradients[j*2+1]+=delta;
      }
    }
    const correction1=1-Math.pow(.9,step),correction2=1-Math.pow(.999,step);
    for(let j=0;j<count;j++) {
      const g=gradients[j]/samples.length;
      momentum[j]=.9*momentum[j]+.1*g;velocity[j]=.999*velocity[j]+.001*g*g;
      weights[j]-=.012*(momentum[j]/correction1)/(Math.sqrt(velocity[j]/correction2)+1e-8);
    }
    if(step%30===0)frames.push({weights:weights.slice(),step});
  }
  return {samples,frames,predict};
}

if (typeof module !== 'undefined' && module.exports) module.exports = {buildLearningStudy};
if (typeof document !== 'undefined') (() => {
  const canvas=document.querySelector('#model'),ctx=canvas.getContext('2d');
  const slider=document.querySelector('#training-step'),output=document.querySelector('#step-value');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const study=buildLearningStudy();
  let width=0,height=0,index=reducedMotion.matches?100:0,paused=reducedMotion.matches,inView=true,request=null,lastTime=0;
  function draw() {
    if(!width||!height)return;
    ctx.clearRect(0,0,width,height);
    const left=50,right=width-27,top=106,bottom=height-205;
    const plotWidth=right-left,plotHeight=bottom-top;
    const point=(spend,roi)=>[left+(spend-2000)/18000*plotWidth,top+(180-roi)/200*plotHeight];
    const w=study.frames[index].weights;
    const background=ctx.createLinearGradient(0,top,0,bottom);
    background.addColorStop(0,'#2447c8');background.addColorStop(1,'#213fbb');
    ctx.fillStyle=background;ctx.fillRect(left,top,plotWidth,plotHeight);
    ctx.lineWidth=.7;ctx.strokeStyle='#d5e3ff18';
    for(const budget of [2000,6000,10000,14000,18000]){const [x]=point(budget,0);ctx.beginPath();ctx.moveTo(x,top);ctx.lineTo(x,bottom);ctx.stroke();}
    for(const roi of [-20,0,50,100,150,180]){const [,y]=point(2000,roi);ctx.beginPath();ctx.moveTo(left,y);ctx.lineTo(right,y);ctx.strokeStyle=roi===0?'#d5e3ff55':'#d5e3ff18';ctx.stroke();}
    ctx.save();ctx.beginPath();ctx.rect(left,top,plotWidth,plotHeight);ctx.clip();
    for(const sample of study.samples){const [x,y]=point(sample.spend,sample.roi);ctx.beginPath();ctx.arc(x,y,width<400?2.7:3.2,0,Math.PI*2);ctx.fillStyle='#ffffffdb';ctx.fill();}
    ctx.beginPath();
    for(let i=0;i<=130;i++){const spend=2000+i/130*18000;const [x,y]=point(spend,study.predict(w,spend));if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
    ctx.strokeStyle='#70e4db';ctx.lineWidth=2.5;ctx.stroke();ctx.restore();
    ctx.fillStyle='#dce8ff';ctx.font='10px Arial, sans-serif';ctx.textAlign='center';
    for(const budget of [2000,10000,20000]){const [x]=point(budget,0);ctx.fillText(`$${budget/1000}k`,x,bottom+14);}
    ctx.fillText('Campaign spend',left+plotWidth/2,bottom+32);
    ctx.textAlign='right';
    for(const roi of [0,50,100,150]){const [,y]=point(2000,roi);ctx.fillText(String(roi),left-8,y+3);}
    ctx.save();ctx.translate(14,top+plotHeight/2);ctx.rotate(-Math.PI/2);ctx.textAlign='center';ctx.fillText('ROI (%)',0,0);ctx.restore();
    slider.value=index;output.textContent=`${index}%`;slider.setAttribute('aria-valuetext',`${index}% of training playback`);
  }
  function resize() {
    const rect=canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
    width=rect.width;height=rect.height;canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw();
  }
  function updateButton() {
    const button=document.querySelector('#pause');
    button.setAttribute('aria-pressed',String(paused));button.setAttribute('aria-label',paused?'Play training playback':'Pause training playback');
    button.innerHTML=paused?'<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="m6 4 8 5-8 5Z" fill="currentColor"/></svg>':'<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M6 4v10M12 4v10" stroke="currentColor" stroke-width="2"/></svg>';
  }
  function animate(time) {
    request=null;
    if(paused||!inView||document.hidden){lastTime=0;return;}
    if(time-lastTime>90){index=Math.min(100,index+1);draw();lastTime=time;}
    if(index===100){paused=true;updateButton();return;}
    request=requestAnimationFrame(animate);
  }
  function play(){if(request===null&&!paused&&inView&&!document.hidden)request=requestAnimationFrame(animate);}
  document.querySelector('#pause').addEventListener('click',()=>{paused=!paused;if(!paused&&index===100)index=0;updateButton();draw();play();});
  document.querySelector('#replay').addEventListener('click',()=>{index=0;lastTime=0;paused=reducedMotion.matches;updateButton();draw();play();});
  slider.addEventListener('input',()=>{index=Number(slider.value);paused=true;updateButton();draw();});
  reducedMotion.addEventListener('change',e=>{if(e.matches){paused=true;updateButton();}});
  document.addEventListener('visibilitychange',play);
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;play();},{threshold:.05}).observe(canvas);
  updateButton();play();
})();
