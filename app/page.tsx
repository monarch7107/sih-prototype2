'use client'

import { useState } from 'react'

type NavItem = { icon:string; label:string; badge?:string }
const nav:NavItem[] = [
  {icon:'⌂',label:'Overview'}, {icon:'◈',label:'My learning'}, {icon:'◎',label:'AI tutor',badge:'3'},
  {icon:'⌁',label:'Campus'}, {icon:'◫',label:'Projects'}, {icon:'♢',label:'Achievements'}
]
const zones = [
  {emoji:'▦', name:'Learning Library', meta:'124 courses', color:'cyan'}, {emoji:'✦', name:'AI Academy',meta:'8 AI mentors',color:'violet'},
  {emoji:'⌘',name:'Programming Building',meta:'32 labs',color:'orange'}, {emoji:'◉',name:'Research Center',meta:'Live intelligence',color:'green'}
]
const courses = [
  {title:'Full-stack AI Engineer', type:'LEARNING PATH', progress:68, lessons:'18 / 26 lessons', color:'purple', icon:'⬡'},
  {title:'Cloud architecture patterns', type:'COURSE', progress:42, lessons:'7 / 16 lessons', color:'blue', icon:'☁'},
  {title:'Tamil · Python foundations', type:'COURSE', progress:24, lessons:'5 / 21 lessons', color:'orange', icon:'ஆ'}
]

function Icon({children}:{children:React.ReactNode}) { return <span className="icon">{children}</span> }

function WorkspacePanel({active, notify}:{active:string; notify:(message:string)=>void}) {
  const names:Record<string,string>={"My learning":"Your learning paths","AI tutor":"Ask anything. Learn everything.",Campus:"Explore the learning universe",Projects:"Build proof, not just notes",Achievements:"Your progress, made visible",Explore:"Find your next breakthrough"}
  const title=names[active]||names["My learning"]
  const items=active==='Campus'?zones:active==='Projects'?[{emoji:'◈',name:'AI study planner',meta:'In review · 72% complete',color:'violet'},{emoji:'◉',name:'Tamil voice notes',meta:'Building · 38% complete',color:'cyan'},{emoji:'⌁',name:'Cloud cost visualizer',meta:'Planning · Just started',color:'orange'}]:courses.map(c=>({emoji:c.icon,name:c.title,meta:c.lessons+' · '+c.progress+'% complete',color:c.color}))
  return <div className="workspace-panel">
    <div className="workspace-hero"><div><p className="eyebrow">{active.toUpperCase()} <span className="live-dot"/> SYNCED</p><h1>{title} <span>✦</span></h1><p className="subhead">A focused space for your next breakthrough.</p></div><button className="primary-btn" onClick={()=>notify(active==='AI tutor'?'Nova is ready for your question':active+' action started')}><span>✦</span>{active==='AI tutor'?'Start a conversation':'Create new'}</button></div>
    {active==='AI tutor' ? <div className="tutor-layout"><div className="chat-card"><div className="chat-head"><span className="mentor-avatar">✦</span><div><strong>Nova · AI Mentor</strong><small>Online · responds in seconds</small></div><span className="online" /></div><div className="message nova">Hi Arun. I know you&apos;re working through RAG architecture. What would you like to make clearer today?</div><div className="suggestions"><button onClick={()=>notify('Explaining RAG architecture')}>Explain RAG simply</button><button onClick={()=>notify('Generating practice quiz')}>Give me a quiz</button><button onClick={()=>notify('Creating revision plan')}>Make a revision plan</button></div><div className="chat-input">Ask Nova anything... <b>↑</b></div></div><div className="side-stack"><div className="stat-card"><span className="eyebrow">TODAY&apos;S PLAN</span><strong>2 of 3 tasks</strong><div className="mini-progress"><i style={{width:'66%'}} /></div><small>12 min left to stay on track</small></div><div className="stat-card accent"><span className="eyebrow">SMART TIP</span><p>Try explaining your current concept in Tamil, then switch back to English. Dual-language recall improves retention.</p></div></div></div> : <div className="panel-grid"><div className="list-card"><div className="card-heading"><div><span className="eyebrow">{active==='Campus'?'ZONES TO VISIT':active==='Projects'?'ACTIVE BUILDS':'RECOMMENDED FOR YOU'}</span><h2>{active==='Campus'?'Your campus is ready':active==='Projects'?'Projects in motion':'Continue your journey'}</h2></div></div>{items.map((item,i)=><button className="wide-item" key={item.name} onClick={()=>notify('Opening '+item.name)}><span className={'zone-icon '+item.color}>{item.emoji}</span><span><strong>{item.name}</strong><small>{item.meta}</small></span><b>{active==='Campus'?'Teleport ↗':active==='Projects'?['72%','38%','12%'][i]:'→'}</b></button>)}</div><div className="focus-card"><div className="ring"><strong>{active==='Achievements'?'18':'68'}<small>%</small></strong></div><span className="eyebrow">{active==='Achievements'?'MASTERY SCORE':'WEEKLY FOCUS'}</span><h3>{active==='Explore'?'Recommended next step':'You are ahead of schedule'}</h3><p>Your consistency is turning into real momentum. Keep going.</p><button className="primary-btn" onClick={()=>notify('Focus session started')}>Enter focus mode →</button></div></div>}
  </div>
}

export default function Home() {
  const [active,setActive] = useState('Overview')
  const [lang,setLang] = useState('EN')
  const [streak,setStreak] = useState(7)
  const [toast,setToast] = useState('')
  const notify=(message:string)=>{setToast(message); setTimeout(()=>setToast(''),2600)}
  return <main className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><span>✦</span></div><div><strong>learnverse</strong><small>AI LEARNING UNIVERSE</small></div></div>
      <div className="workspace-label">YOUR WORKSPACE <span>⌄</span></div>
      <nav>{nav.map(item=><button key={item.label} className={active===item.label?'nav-item active':'nav-item'} onClick={()=>{setActive(item.label);notify(item.label+' workspace opened')}}><Icon>{item.icon}</Icon><span>{item.label}</span>{item.badge&&<b>{item.badge}</b>}</button>)}</nav>
      <div className="side-divider"/><div className="workspace-label">YOUR WORLD</div>
      <button className="nav-item" onClick={()=>{setActive('Explore');notify('Explore mode ready')}}><Icon>⌖</Icon><span>Explore paths</span></button>
      <button className="nav-item" onClick={()=>notify('Knowledge import opened')}><Icon>↥</Icon><span>Import knowledge</span></button>
      <div className="sidebar-bottom"><div className="xp-card"><div className="xp-row"><span>LEVEL 12</span><strong>2,480 XP</strong></div><div className="xp-track"><i/></div><p>520 XP to level 13</p></div><div className="user-row"><div className="avatar">AR</div><div><strong>Arun Raj</strong><small>Builder</small></div><span className="more">•••</span></div></div>
    </aside>
    <section className="main-area">
      <header className="topbar"><div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{active}</strong></div><div className="top-actions"><button className="search" onClick={()=>notify('Search is ready')}><span>⌕</span> Search anything <kbd>⌘ K</kbd></button><button className="lang" onClick={()=>setLang(lang==='EN'?'தமிழ்':'EN')}>{lang}⌄</button><button className="bell" onClick={()=>notify('You are all caught up')}>♧<i/></button><div className="avatar small">AR</div></div></header>
      <div className={active==='Overview'?'content':'content alt-content'}>
        {active!=='Overview' && <WorkspacePanel active={active} notify={notify}/>} 
        <div className="welcome-row"><div><p className="eyebrow">TUESDAY, OCTOBER 8, 2026 <span className="live-dot"/> LIVE SYNC</p><h1>Good morning, Arun <span>✦</span></h1><p className="subhead">Your next breakthrough is waiting to be built.</p></div><button className="primary-btn" onClick={()=>notify('AI Mentor is planning your next session')}><span>✦</span> Ask your mentor</button></div>
        <div className="hero-grid"><div className="continue-card"><div className="card-top"><span className="eyebrow">CONTINUE LEARNING</span><span className="dots">•••</span></div><div className="continue-main"><div className="course-symbol"><span>⌘</span><i>AI</i></div><div className="continue-copy"><h2>Build intelligent products</h2><p>Full-stack AI Engineer <span>·</span> Module 04</p><div className="progress-line"><i/></div><div className="progress-meta"><span>68% complete</span><strong>Continue lesson <b>→</b></strong></div></div></div><div className="lesson"><div className="play">▶</div><div><b>04.2 · RAG architecture patterns</b><small>12 min remaining</small></div><span className="lesson-arrow">↗</span></div></div>
          <div className="streak-card"><div className="card-top"><span className="eyebrow">YOUR MOMENTUM</span><span className="flame">♨</span></div><div className="streak-number">{streak}<small>days</small></div><p>You&apos;re on fire! Keep the streak alive.</p><div className="week">{['M','T','W','T','F','S','S'].map((d,i)=><div key={i} className={i<5?'day done':'day'}><span>{d}</span><b>{i<5?'✓':''}</b></div>)}</div><button onClick={()=>{setStreak(streak+1);notify('Streak extended — nice work!')}}>Log today&apos;s progress <b>→</b></button></div></div>
        <div className="section-head"><div><h2>Pick up where you left off</h2><p>Small steps. Serious momentum.</p></div><button className="text-btn" onClick={()=>notify('All learning paths opened')}>View all paths <b>→</b></button></div>
        <div className="course-grid">{courses.map(c=><div className="course-card" key={c.title}><div className={'course-art '+c.color}><span>{c.icon}</span><button onClick={()=>notify(c.title+' added to your queue')}>•••</button></div><div className="course-body"><span className="tag">{c.type}</span><h3>{c.title}</h3><p>{c.lessons}</p><div className="mini-progress"><i style={{width:c.progress+'%'}}/></div><div className="course-foot"><span>{c.progress}% complete</span><b>→</b></div></div></div>)}</div>
        <div className="lower-grid"><div><div className="section-head compact"><div><h2>Explore your world</h2><p>Step into a new way to learn.</p></div><button className="text-btn" onClick={()=>{setActive('Campus');notify('Campus map opened')}}>Open campus <b>→</b></button></div><div className="zones">{zones.map(z=><button className="zone" key={z.name} onClick={()=>notify('Entering '+z.name)}><span className={'zone-icon '+z.color}>{z.emoji}</span><span><strong>{z.name}</strong><small>{z.meta}</small></span><b>↗</b></button>)}</div></div><div className="mentor-panel"><div className="mentor-head"><span className="mentor-avatar">✦</span><div><span className="eyebrow">AI MENTOR</span><strong>Nova is here</strong></div><i className="online"/></div><p>“You&apos;re close to mastering RAG systems. Want to run a 5-minute challenge?”</p><button onClick={()=>notify('Challenge started with Nova')}>Start challenge <b>→</b></button></div></div>
      </div>
    </section>
    {toast&&<div className="toast"><span>✦</span>{toast}</div>}
  </main>
}
