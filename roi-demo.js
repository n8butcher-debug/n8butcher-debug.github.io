const RoiDemo = (() => {
  const campaigns = [
    {name:'Clinical education',spend:32000,revenue:121600,views:54000,clicks:720,visits:1480},
    {name:'Webinar series',spend:24000,revenue:81600,views:28000,clicks:610,visits:960},
    {name:'Search campaign',spend:18000,revenue:55800,views:19000,clicks:830,visits:790},
    {name:'Broad awareness',spend:42000,revenue:37800,views:176000,clicks:460,visits:320}
  ];
  const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
  function mount(root) {
    root.innerHTML=`<div class="roi-process" aria-label="Analysis flow"><span>Snowflake data</span><b aria-hidden="true">→</b><span>Marketing + revenue</span><b aria-hidden="true">→</b><span>Regression + trees</span><b aria-hidden="true">→</b><span>Campaign return</span></div>
      <div class="roi-illustration"><div class="roi-demo-heading"><h3>Campaign return analysis</h3><p>Synthetic examples. Select a campaign to explore the inputs and estimate.</p></div>
      <div class="roi-demo-grid"><div class="roi-campaigns" role="group" aria-label="Select a synthetic campaign">${campaigns.map((c,i)=>`<button type="button" data-roi-campaign="${i}" aria-pressed="${i===0}"><span>${c.name}</span><strong>${(c.revenue/c.spend).toFixed(1)}×</strong><i aria-hidden="true"><em style="width:${c.revenue/c.spend/4*100}%"></em></i></button>`).join('')}<p>Modeled revenue per $1 of campaign spend</p></div>
      <div class="roi-detail" aria-live="polite"><h4 data-roi-name></h4><dl class="roi-features"><div><dt>Views</dt><dd data-roi-views></dd></div><div><dt>Clicks</dt><dd data-roi-clicks></dd></div><div><dt>Web visits</dt><dd data-roi-visits></dd></div></dl><dl class="roi-calculation"><div><dt>Campaign spend</dt><dd data-roi-spend></dd></div><div><dt>Modeled revenue</dt><dd data-roi-revenue></dd></div><div class="roi-return"><dt>Revenue return</dt><dd data-roi-return></dd></div></dl></div></div>
      <p class="roi-formula">Return multiple = modeled revenue ÷ campaign spend. This illustration does not estimate profit or run the original models.</p></div>`;
    function select(i){
      const c=campaigns[i];
      root.querySelectorAll('[data-roi-campaign]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.roiCampaign)===i)));
      for(const key of ['name','views','clicks','visits','spend','revenue','return']) {
        const value=key==='return'?(c.revenue/c.spend).toFixed(1)+'×':key==='spend'||key==='revenue'?money(c[key]):typeof c[key]==='number'?c[key].toLocaleString():c[key];
        root.querySelector('[data-roi-'+key+']').textContent=value;
      }
    }
    root.addEventListener('click',e=>{const button=e.target.closest('[data-roi-campaign]');if(button) select(Number(button.dataset.roiCampaign));});
    select(0);
  }
  return {mount,campaigns};
})();
if(typeof module!=='undefined')module.exports=RoiDemo;
