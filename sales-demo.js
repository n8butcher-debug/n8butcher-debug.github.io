const SalesDemo = (() => {
  const reps = [
    {id:'rep-west', name:'Avery Stone', region:'West'},
    {id:'rep-east', name:'Riley Chen', region:'East'}
  ];
  const accounts = [
    {id:'northline', rep:'rep-west', name:'Northline Medical Center', area:'Coastal district', doctors:['Maya Ellis','Leo Park']},
    {id:'cedar', rep:'rep-west', name:'Cedar Point Clinic', area:'Valley district', doctors:['Nina Cole','Owen Reed']},
    {id:'lakecrest', rep:'rep-west', name:'Lakecrest Hospital', area:'North district', doctors:['Lena Shah','Evan Brooks']},
    {id:'eastfield', rep:'rep-east', name:'Eastfield Medical Center', area:'Central district', doctors:['Ada Morgan','Noah Kim']},
    {id:'willow', rep:'rep-east', name:'Willow Grove Clinic', area:'East district', doctors:['Mila Chen','Theo Wells']},
    {id:'ridgeway', rep:'rep-east', name:'Ridgeway Hospital', area:'South district', doctors:['Iris Lane','Arun Bell']}
  ];
  const templates = [
    {channel:'Email', action:'Opened', asset:'Product overview', engaged:false},
    {channel:'Web', action:'Viewed', asset:'Clinical evidence page', engaged:false},
    {channel:'Email', action:'Clicked', asset:'Evidence summary', engaged:true},
    {channel:'Web', action:'Downloaded', asset:'Research brief', engaged:true},
    {channel:'Paid media', action:'Viewed', asset:'Education campaign', engaged:false},
    {channel:'Web', action:'Watched', asset:'Technique overview video', engaged:true},
    {channel:'Paid media', action:'Clicked', asset:'Education series', engaged:true},
    {channel:'Email', action:'Opened', asset:'Webinar invitation', engaged:false}
  ];
  const events = accounts.flatMap((a,ai) => templates.map((event,i) => ({
    ...event, id:`${a.id}-${i}`, account:a.id, doctor:a.doctors[i % 2],
    day:12-i-(ai%3), time:`${String(9+(i%7)).padStart(2,'0')}:20`
  })));
  const stages = [
    ['Data streams','Separate account records, doctor records, and channel activity feed into the same warehouse.'],
    ['Snowflake','Account and doctor relationships connect activity to the relevant channel and asset.'],
    ['API','The dashboard requests the account view through an API. This illustration uses the selected rep to determine which accounts appear.'],
    ['Rep dashboard','Reps move from their account list to the doctors, channels, and assets behind each interaction.']
  ];
  const icons = [
    '<path d="M4 5h16M4 12h16M4 19h16"/><circle cx="8" cy="5" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="8" cy="19" r="2"/>',
    '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
    '<path d="m8 6-5 6 5 6M16 6l5 6-5 6M14 4l-4 16"/>',
    '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18M9 9v11M12 13h6M12 16h4"/>'
  ];
  const h = text => String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function view(repId, accountId, channel='all', doctor='all') {
    const assigned = accounts.filter(a => a.rep === repId);
    const account = assigned.find(a => a.id === accountId) || assigned[0];
    const allEvents = account ? events.filter(e => e.account === account.id) : [];
    return {assigned, account, allEvents, visible:allEvents.filter(e =>
      (channel === 'all' || e.channel === channel) && (doctor === 'all' || e.doctor === doctor))};
  }
  function mount(root) {
    let repId = reps[0].id, accountId = accounts[0].id, channel = 'all', doctor = 'all';
    root.innerHTML = `
      <div class="sales-flow" role="group" aria-label="Explore the data flow">${stages.map(([label],i)=>`
        <button type="button" data-sales-stage="${i}" aria-pressed="${i===0}"><svg viewBox="0 0 24 24" aria-hidden="true">${icons[i]}</svg><span>${label}</span></button>`).join('')}
      </div>
      <p class="sales-flow-caption" role="status">${stages[0][1]}</p>
      <div class="sales-surface">
        <div class="sales-toolbar"><div><h3>Account activity</h3><p>Synthetic data. Try a different rep or filter the activity.</p></div>
          <label class="sales-rep">View as rep<select data-sales-rep aria-label="View as representative">${reps.map(r=>`<option value="${r.id}">${r.name} (${r.region})</option>`).join('')}</select></label>
        </div>
        <div class="sales-workspace">
          <aside class="sales-accounts" aria-label="Assigned accounts"><h4>Your accounts <span data-sales-account-count></span></h4><div data-sales-accounts></div></aside>
          <div class="sales-detail">
            <div class="sales-account-heading"><h4 data-sales-account-name></h4><p data-sales-account-summary></p></div>
            <div class="sales-filters"><label>Doctor<select data-sales-doctor aria-label="Filter by doctor"></select></label><label>Channel<select data-sales-channel aria-label="Filter by channel"><option value="all">All channels</option><option>Email</option><option>Web</option><option>Paid media</option></select></label></div>
            <div class="sales-history-heading"><h4>Engagement history</h4><p data-sales-count role="status"></p></div>
            <ul class="sales-events" data-sales-events aria-label="Channel and asset activity"></ul>
            <div class="sales-key"><span><i></i>Exposure</span><span><i class="engaged"></i>Interaction</span></div>
          </div>
        </div>
      </div>`;
    function render(resetAccounts=false, resetDoctors=false) {
      const data = view(repId,accountId,channel,doctor);
      accountId = data.account.id;
      if (resetAccounts) {
        root.querySelector('[data-sales-accounts]').innerHTML = data.assigned.map(a=>`<button type="button" data-sales-account="${a.id}"><strong>${h(a.name)}</strong><span>${h(a.area)}</span></button>`).join('');
        root.querySelector('[data-sales-account-count]').textContent = data.assigned.length;
      }
      root.querySelectorAll('[data-sales-account]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.salesAccount===accountId)));
      if (resetDoctors) root.querySelector('[data-sales-doctor]').innerHTML = '<option value="all">All doctors</option>'+data.account.doctors.map(d=>`<option value="${h(d)}">Dr. ${h(d)}</option>`).join('');
      root.querySelector('[data-sales-account-name]').textContent = data.account.name;
      root.querySelector('[data-sales-account-summary]').textContent = `${data.account.doctors.length} doctors, ${data.allEvents.length} recorded events`;
      root.querySelector('[data-sales-count]').textContent = `${data.visible.length} ${data.visible.length===1?'event':'events'}`;
      root.querySelector('[data-sales-events]').innerHTML = data.visible.length ? data.visible.map(e=>`
        <li class="${e.engaged?'is-engaged':''}"><i class="sales-event-dot" aria-hidden="true"></i><div><span class="sales-doctor">Dr. ${h(e.doctor)}</span><strong>${h(e.asset)}</strong><span class="sales-event-action">${h(e.channel)} <span aria-hidden="true">/</span> ${h(e.action)}</span></div><time datetime="2026-11-${String(e.day).padStart(2,'0')}T${e.time}:00">Nov ${e.day}</time></li>`).join('') : '<li class="sales-empty">No activity matches these filters. Try another doctor or channel.</li>';
    }
    root.addEventListener('change',e=>{
      if(e.target.matches('[data-sales-rep]')) {
        repId=e.target.value; accountId=''; doctor='all'; render(true,true);
      } else if(e.target.matches('[data-sales-doctor]')) {
        doctor=e.target.value; render();
      } else if(e.target.matches('[data-sales-channel]')) {
        channel=e.target.value; render();
      }
    });
    root.addEventListener('click',e=>{
      const accountButton=e.target.closest('[data-sales-account]');
      if(accountButton) {accountId=accountButton.dataset.salesAccount; doctor='all'; render(false,true);}
      const stageButton=e.target.closest('[data-sales-stage]');
      if(stageButton) {
        root.querySelectorAll('[data-sales-stage]').forEach(b=>b.setAttribute('aria-pressed',String(b===stageButton)));
        root.querySelector('.sales-flow-caption').textContent=stages[Number(stageButton.dataset.salesStage)][1];
      }
    });
    render(true,true);
  }
  return {mount,view};
})();
if(typeof module !== 'undefined') module.exports=SalesDemo;
