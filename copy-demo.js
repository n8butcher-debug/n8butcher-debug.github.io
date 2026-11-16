const CopyDemo = (() => {
  const drafts={email:'Northline: 5 new clinical insights',search:'Northline clinical evidence'};
  const h=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function evaluate(text,mode,brand='Northline',day='Tuesday',hour='10'){
    const line=text.trim(),words=line.split(/\s+/).filter(Boolean),length=line.length;
    if(!line)return {rate:null,signals:[['notice','Enter a line to see the sample estimate.']]};
    const email=mode==='email',limit=email?60:35,ideal=email?36:25;
    const number=/\d/.test(line),branded=brand.trim()&&line.toLowerCase().includes(brand.trim().toLowerCase());
    const caps=words.length>2&&/[a-z]/i.test(line)&&line===line.toUpperCase(),punct=/[!?]{2,}/.test(line);
    const vague=/click here|amazing|best ever|guaranteed/i.test(line),specific=/clinical|evidence|research|insights|webinar|study/i.test(line);
    let rate=(email?25:4.2)-Math.abs(length-ideal)*(email?.065:.035)+(number?(email?1.2:.25):0)+(branded?(email?.8:.2):0)+(specific?(email?1.5:.5):0)-(caps?(email?4:1):0)-(punct?(email?2:.5):0)-(vague?(email?2:.4):0);
    if(email)rate+=({Monday:0,Tuesday:.8,Wednesday:.6,Thursday:.3,Friday:-.8}[day]||0)+({'8':.1,'10':.6,'14':.2,'18':-.7}[hour]||0);
    const signals=[
      [length>limit?'notice':'good',length>limit?`${length} characters. Try a shorter line.`:`${length} characters. Compact enough for this example.`],
      [branded?'good':'neutral',branded?'Brand term detected.':'No brand term detected.'],
      [caps||punct||vague?'notice':'good',caps?'Try sentence case.':punct?'Remove repeated punctuation.':vague?'Describe the content more specifically.':number?'Number detected in the copy.':'Punctuation and casing look straightforward.']
    ];
    return {rate:Math.max(email?8:.8,Math.min(email?45:9,rate)),signals};
  }
  function mount(root){
    let mode='email';const saved={...drafts};
    root.innerHTML=`<div class="copy-surface"><div class="copy-demo-heading"><h3>Try a draft</h3><p>Edit the copy and watch the estimate and feedback change.</p></div><div class="copy-tabs" role="group" aria-label="Prediction type"><button type="button" data-copy-mode="email" aria-pressed="true">Email subject</button><button type="button" data-copy-mode="search" aria-pressed="false">Search headline</button></div><div class="copy-demo-grid"><div class="copy-editor"><label><span data-copy-label>Email subject line</span><textarea data-copy-text aria-label="Draft copy" rows="3" maxlength="240">${drafts.email}</textarea></label><div class="copy-context" data-copy-email><label>Day<select data-copy-day aria-label="Send day">${['Monday','Tuesday','Wednesday','Thursday','Friday'].map(d=>`<option${d==='Tuesday'?' selected':''}>${d}</option>`).join('')}</select></label><label>Time<select data-copy-hour aria-label="Send time"><option value="8">8:00 AM</option><option value="10" selected>10:00 AM</option><option value="14">2:00 PM</option><option value="18">6:00 PM</option></select></label></div><label class="copy-brand">Brand term<input data-copy-brand aria-label="Brand term" value="Northline" maxlength="40"></label></div><div class="copy-result"><p data-copy-metric>Predicted open rate</p><output data-copy-rate aria-live="polite"></output><ul data-copy-feedback aria-label="Copy feedback"></ul></div></div><p class="copy-note">Illustrative estimates and feedback use synthetic scoring rules. The original trained model is not connected.</p></div>`;
    function render(){
      const result=evaluate(root.querySelector('[data-copy-text]').value,mode,root.querySelector('[data-copy-brand]').value,root.querySelector('[data-copy-day]').value,root.querySelector('[data-copy-hour]').value);
      root.querySelector('[data-copy-rate]').textContent=result.rate===null?'—':result.rate.toFixed(1)+'%';
      root.querySelector('[data-copy-feedback]').innerHTML=result.signals.map(([tone,text])=>`<li class="${tone}">${h(text)}</li>`).join('');
    }
    root.addEventListener('input',render);root.addEventListener('change',render);
    root.addEventListener('click',e=>{
      const button=e.target.closest('[data-copy-mode]');if(!button)return;
      saved[mode]=root.querySelector('[data-copy-text]').value;mode=button.dataset.copyMode;
      root.querySelectorAll('[data-copy-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      root.querySelector('[data-copy-text]').value=saved[mode];
      root.querySelector('[data-copy-label]').textContent=mode==='email'?'Email subject line':'Search headline';
      root.querySelector('[data-copy-metric]').textContent=mode==='email'?'Predicted open rate':'Predicted click rate';
      root.querySelector('[data-copy-email]').hidden=mode!=='email';render();
    });render();
  }
  return {mount,evaluate};
})();
if(typeof module!=='undefined')module.exports=CopyDemo;
