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
  // Each row groups repeated activity for one doctor, asset, and day.
  // Accounts have deliberately different channel mixes, assets, and volumes.
  const activity = {
    northline:[
      [0,'Email','Opened','Product overview',34,14],[0,'Email','Clicked','Evidence summary',12,14],
      [1,'Email','Opened','Webinar invitation',21,13],[1,'Email','Clicked','Webinar registration',7,13],
      [0,'Web','Viewed','Clinical evidence page',18,12],[1,'Web','Viewed','Clinical evidence page',9,11],
      [0,'Web','Clicked','Study details',5,12],[1,'Web','Downloaded','Research brief',3,11],
      [0,'Email','Opened','Research update',16,8],[0,'Email','Clicked','Research update',4,8]
    ],
    cedar:[
      [1,'Paid media','Viewed','Education campaign',286,14],[0,'Paid media','Viewed','Awareness campaign',174,13],
      [1,'Paid media','Clicked','Education series',13,14],[0,'Paid media','Clicked','Product introduction',8,13],
      [1,'Web','Viewed','Product introduction',17,12],[1,'Web','Clicked','Learn more',4,12],
      [0,'Email','Opened','Product overview',8,5]
    ],
    lakecrest:[
      [0,'Web','Viewed','Clinical evidence page',54,14],[1,'Web','Viewed','Technique library',38,13],
      [0,'Web','Clicked','Study details',11,14],[1,'Web','Clicked','Technique overview video',9,13],
      [1,'Web','Watched','Technique overview video',24,13],[0,'Web','Downloaded','Research brief',14,12],
      [0,'Web','Viewed','Research archive',22,10],[1,'Web','Viewed','Webinar replay',19,9],
      [1,'Web','Watched','Webinar replay',12,9],[0,'Email','Opened','Research update',11,7],
      [0,'Email','Clicked','Research update',3,7],[1,'Paid media','Viewed','Education campaign',42,3]
    ],
    eastfield:[
      [1,'Email','Opened','Webinar invitation',42,14],[1,'Email','Clicked','Webinar registration',17,14],
      [0,'Email','Opened','Webinar reminder',23,12],[0,'Email','Clicked','Webinar registration',8,12],
      [1,'Web','Viewed','Webinar registration',26,14],[0,'Web','Viewed','Faculty overview',18,12],
      [0,'Web','Clicked','Webinar registration',6,12],[1,'Web','Watched','Webinar replay',15,8],
      [0,'Paid media','Viewed','Webinar promotion',132,6],[0,'Paid media','Clicked','Webinar promotion',4,6]
    ],
    willow:[
      [0,'Web','Viewed','Product overview',5,11],[1,'Web','Viewed','Clinical evidence page',3,7],
      [1,'Email','Opened','Research update',6,4],[1,'Email','Clicked','Research update',1,4]
    ],
    ridgeway:[
      [0,'Paid media','Viewed','Awareness campaign',147,14],[1,'Paid media','Viewed','Education series',93,13],
      [0,'Paid media','Clicked','Product introduction',9,14],[1,'Paid media','Clicked','Education series',7,13],
      [1,'Email','Opened','Evidence summary',39,14],[0,'Email','Opened','Product overview',28,12],
      [1,'Email','Clicked','Evidence summary',14,14],[0,'Email','Clicked','Product overview',6,12],
      [0,'Web','Viewed','Clinical evidence page',47,13],[1,'Web','Viewed','Technique library',31,12],
      [0,'Web','Clicked','Study details',12,13],[1,'Web','Clicked','Technique overview video',8,12],
      [1,'Web','Watched','Technique overview video',18,12],[0,'Web','Downloaded','Research brief',9,10],
      [1,'Email','Opened','Research update',21,8],[0,'Web','Viewed','Research archive',18,5]
    ]
  };
  const events = accounts.flatMap(a => activity[a.id].map(([di,channel,action,asset,count,day],i) => ({
    id:a.id+'-'+i, account:a.id, doctor:a.doctors[di], channel,action,asset,count,day,
    engaged:['Clicked','Downloaded','Watched'].includes(action), time:'10:20'
  }))).sort((a,b)=>b.day-a.day);
  function totals(rows) {
    return ['Email','Web','Paid media'].map(channel=>{
      const selected=rows.filter(e=>e.channel===channel);
      const sum=action=>selected.filter(e=>e.action===action).reduce((n,e)=>n+e.count,0);
      return {channel,views:sum('Viewed'),opens:sum('Opened'),clicks:sum('Clicked')};
    });
  }
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
    const visible=allEvents.filter(e => (channel === 'all' || e.channel === channel) && (doctor === 'all' || e.doctor === doctor));
    return {assigned, account, allEvents, visible, totals:totals(visible).filter(t=>channel==='all'||t.channel===channel)};
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
            <div class="sales-channel-summary"><h4>Channel totals</h4><table><thead><tr><th scope="col">Channel</th><th scope="col">Views / opens</th><th scope="col">Clicks</th></tr></thead><tbody data-sales-totals></tbody></table></div>
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
      root.querySelector('[data-sales-account-summary]').textContent = `${data.account.doctors.length} doctors, ${data.allEvents.reduce((n,e)=>n+e.count,0).toLocaleString()} activities`;
      root.querySelector('[data-sales-count]').textContent = `${data.visible.length} activity records`;
      root.querySelector('[data-sales-totals]').innerHTML=data.totals.map(t=>`<tr><th scope="row">${h(t.channel)}</th><td>${(t.channel==='Email'?t.opens:t.views).toLocaleString()} <span>${t.channel==='Email'?'opens':'views'}</span></td><td>${t.clicks.toLocaleString()}</td></tr>`).join('');
      root.querySelector('[data-sales-events]').innerHTML = data.visible.length ? data.visible.map(e=>`
        <li class="${e.engaged?'is-engaged':''}"><i class="sales-event-dot" aria-hidden="true"></i><div><span class="sales-doctor">Dr. ${h(e.doctor)}</span><strong>${h(e.asset)}</strong><span class="sales-event-action">${h(e.channel)} <span aria-hidden="true">/</span> ${e.count} ${h(({Opened:'opens',Viewed:'views',Clicked:'clicks',Downloaded:'downloads',Watched:'video plays'})[e.action])}</span></div><time datetime="2026-11-${String(e.day).padStart(2,'0')}T${e.time}:00">Nov ${e.day}</time></li>`).join('') : '<li class="sales-empty">No activity matches these filters. Try another doctor or channel.</li>';
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
