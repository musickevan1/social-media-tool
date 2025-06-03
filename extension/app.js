(function(){
  const e = React.createElement;

  function useChromeStorage(key, defaultValue){
    const [value, setValue] = React.useState(defaultValue);
    React.useEffect(()=>{
      chrome.storage.local.get([key], (res)=>{
        if(res[key] !== undefined) setValue(res[key]);
      });
    },[]);
    React.useEffect(()=>{ chrome.storage.local.set({[key]: value}); },[value]);
    return [value, setValue];
  }

  function ActivityLog(props){
    return e('div',{className:'log'},[
      props.logs.map((l,i)=>e('div',{key:i,className:'log-entry'},`${l.time}: ${l.preview}`)),
      e('button',{className:'clear-btn',onClick:props.onClear},'Clear Log')
    ]);
  }

  let running = false;
  function wait(ms){ return new Promise(r=>setTimeout(r,ms)); }

  function match(post, kws){
    const text = post.innerText.toLowerCase();
    return kws.some(k=>text.includes(k.toLowerCase()));
  }

  async function startAutoLike(settings, addLog){
    running = true;
    const {keywords, sessionLimit, hourLimit, safeMode} = settings;
    let liked = 0;
    const delayMin = safeMode ? 4000 : 2000;
    const delayMax = safeMode ? 7000 : 4000;
    const startTime = Date.now();
    while(running && liked < sessionLimit){
      const posts = document.querySelectorAll('div.feed-shared-update-v2');
      for(const post of posts){
        if(!running) break;
        if(liked >= sessionLimit) break;
        if(match(post, keywords)){
          const btn = post.querySelector('button[aria-label*="Like"]');
          if(btn && btn.getAttribute('aria-pressed') !== 'true'){
            btn.scrollIntoView({behavior:'smooth',block:'center'});
            await wait(500 + Math.random()*500);
            btn.click();
            liked++;
            const preview = post.innerText.slice(0,80).replace(/\s+/g,' ');
            const entry = {time:new Date().toLocaleTimeString(), preview};
            addLog(entry);
            if(liked >= sessionLimit) break;
            await wait(delayMin + Math.random()*(delayMax-delayMin));
          }
        }
      }
      window.scrollBy(0,600);
      await wait(2000 + Math.random()*1000);
      if(Date.now()-startTime > 3600000 || liked >= hourLimit){ running = false; }
    }
    running = false;
  }
  function stopAutoLike(){ running = false; }

  function AutoLike(){
    const [keywords,setKeywords] = useChromeStorage('sgb_keywords','');
    const [sessionLimit,setSessionLimit] = useChromeStorage('sgb_sessionLimit',5);
    const [hourLimit,setHourLimit] = useChromeStorage('sgb_hourLimit',20);
    const [safeMode,setSafeMode] = useChromeStorage('sgb_safeMode',true);
    const [logs,setLogs] = useChromeStorage('sgb_logs',[]);
    const [isRunning,setIsRunning] = React.useState(false);

    const addLog = (entry) => setLogs([...logs,entry]);
    const clearLogs = () => setLogs([]);

    const start = ()=>{
      if(isRunning) return;
      setIsRunning(true);
      startAutoLike({keywords:keywords.split(/,\s*/), sessionLimit, hourLimit, safeMode}, addLog)
        .then(()=>setIsRunning(false));
    };
    const stop = ()=>{ stopAutoLike(); setIsRunning(false); };

    return e('div',{className:'tool-panel'},[
      e('h2',{key:'h'},'AutoLike'),
      e('div',{key:'k',className:'field'},[
        e('label',null,'Keywords/hashtags'),
        e('input',{value:keywords,onChange:ev=>setKeywords(ev.target.value)})
      ]),
      e('div',{key:'s',className:'field'},[
        e('label',null,'Likes per session'),
        e('input',{type:'number',value:sessionLimit,onChange:ev=>setSessionLimit(parseInt(ev.target.value)||0)})
      ]),
      e('div',{key:'h',className:'field'},[
        e('label',null,'Likes per hour limit'),
        e('input',{type:'number',value:hourLimit,onChange:ev=>setHourLimit(parseInt(ev.target.value)||0)})
      ]),
      e('div',{key:'safe',className:'field'},[
        e('label',null,[
          e('input',{type:'checkbox',checked:safeMode,onChange:ev=>setSafeMode(ev.target.checked)}),
          ' Safe Mode'
        ])
      ]),
      e('div',{key:'c',className:'controls'},[
        e('button',{onClick:start,disabled:isRunning},isRunning?'Running...':'Start'),
        e('button',{onClick:stop},'Stop')
      ]),
      e(ActivityLog,{key:'log',logs:logs,onClear:clearLogs})
    ]);
  }

  function ComingSoon(props){
    return e('div',{className:'coming-soon'},`${props.name} coming soon...`);
  }

  function Sidebar(props){
    const tools = ['AutoLike','AutoReply','AutoConnect','Analytics','Settings'];
    return e('div',{className:'sidebar'},
      tools.map(t=>e('div',{key:t,className:'side-item'+(t===props.active?' active':''),onClick:()=>props.setActive(t)},t))
    );
  }

  function App(){
    const [active,setActive] = React.useState('AutoLike');
    return e('div',{className:'sgb-app'},[
      e(Sidebar,{key:'s',active:active,setActive:setActive}),
      e('div',{key:'p',className:'main-panel'},[
        active==='AutoLike' ? e(AutoLike) : e(ComingSoon,{name:active})
      ])
    ]);
  }

  // Expose the App component so it can be mounted by the content script
  window.SGBApp = App;
})();
