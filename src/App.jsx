import { useState, useEffect, useRef } from "react";

const FONT = "'Nunito','Comic Neue','Segoe UI',sans-serif";
const GREEN = "#2E7D32";
const WOOD = "linear-gradient(180deg,#8B6914 0%,#A0782C 15%,#6B4F10 100%)";
const SKY = "linear-gradient(180deg,#87CEEB 0%,#B6E3F4 40%,#d4f0d4 100%)";
const EMOJIS = ["🌍","🌱","♻️","💧","🔥","⚡","🏭","🌊","🐝","🌳","🚀","💡","🎯","📊","🧪","🏠","🎓","💰","🛒","🌡️","🐾","🌻","🏔️","🐟"];

let _uid = 0;
const uid = () => `u${++_uid}`;

/* ═══ THEMES ═══ */
const THEMES = [
  { id:"forest", title:"Вирубка лісів vs Збереження", type:2,
    left:{label:"Вирубка лісів",color:"#B71C1C",emoji:"🪓"},
    right:{label:"Збереження лісів",color:"#1B5E20",emoji:"🌳"},
    theory:{title:"🌲 Ліси — легені планети",text:"Ліси покривають 31% суходолу Землі. Вони поглинають CO₂ і виробляють кисень. Щороку планета втрачає 10 мільйонів гектарів лісу — це як вся територія Ісландії! В Україні ліси займають лише 16% території. Карпатські ліси — одні з найцінніших в Європі."},
    cards:[
      {id:"f1",text:"Зникають тварини",correct:"left"},{id:"f2",text:"Чисте повітря",correct:"right"},
      {id:"f3",text:"Ерозія ґрунту",correct:"left"},{id:"f4",text:"Біорізноманіття",correct:"right"},
      {id:"f5",text:"Деревина для будівництва",correct:"left"},{id:"f6",text:"Водний баланс",correct:"right"},
      {id:"f7",text:"Потреба людей у ресурсах",correct:"center"},{id:"f8",text:"Вплив на клімат",correct:"center"},
    ]},
  { id:"battery", title:"Батарейки: небезпека vs утилізація", type:2,
    left:{label:"Небезпека батарейок",color:"#E65100",emoji:"☠️"},
    right:{label:"Правильна утилізація",color:"#2E7D32",emoji:"♻️"},
    theory:{title:"🔋 Одна батарейка = 20 м² отрути",text:"Одна пальчикова батарейка забруднює 20 м² ґрунту та 400 літрів води. В Україні щороку викидають понад 300 мільйонів батарейок, і лише 2% з них переробляють. Батарейки містять свинець, ртуть, кадмій — речовини, небезпечні для людей і тварин."},
    cards:[
      {id:"b1",text:"Забруднення ґрунту",correct:"left"},{id:"b2",text:"Спеціальні контейнери",correct:"right"},
      {id:"b3",text:"Токсичні метали",correct:"left"},{id:"b4",text:"Переробка на заводі",correct:"right"},
      {id:"b5",text:"Отруєння води",correct:"left"},{id:"b6",text:"Еко-пункти збору",correct:"right"},
      {id:"b7",text:"Використання в побуті",correct:"center"},{id:"b8",text:"Потреба в енергії",correct:"center"},
    ]},
  { id:"fashion", title:"Швидка мода vs Усвідомлений одяг", type:2,
    left:{label:"Швидка мода",color:"#C62828",emoji:"👗"},
    right:{label:"Усвідомлений одяг",color:"#2E7D32",emoji:"🧵"},
    theory:{title:"👕 Мода, що вбиває планету",text:"Текстильна промисловість — другий найбільший забруднювач після нафтової. Щороку у світі викидають 92 мільйони тонн одягу. Для однієї бавовняної футболки потрібно 2700 літрів води! Усвідомлене споживання — купувати менше, але якісніше."},
    cards:[
      {id:"m1",text:"Дешево та швидко",correct:"left"},{id:"m2",text:"Якісні матеріали",correct:"right"},
      {id:"m3",text:"Багато відходів",correct:"left"},{id:"m4",text:"Довго носиться",correct:"right"},
      {id:"m5",text:"Експлуатація працівників",correct:"left"},{id:"m6",text:"Справедлива оплата",correct:"right"},
      {id:"m7",text:"Самовираження",correct:"center"},{id:"m8",text:"Потреба в одязі",correct:"center"},
    ]},
  { id:"transport", title:"Авто vs Велосипед", type:2,
    left:{label:"Автомобіль",color:"#4A148C",emoji:"🚗"},
    right:{label:"Велосипед",color:"#1B5E20",emoji:"🚲"},
    theory:{title:"🚗 Транспорт і планета",text:"Транспорт — це 16% світових викидів CO₂. Один автомобіль викидає 4.6 тонн CO₂ на рік. Велосипед — нуль! Якби 10% людей пересіли на велосипед, викиди зменшились би на 11%. Велосипедисти хворіють на 50% менше."},
    cards:[
      {id:"t1",text:"Забруднює повітря",correct:"left"},{id:"t2",text:"Корисно для здоров'я",correct:"right"},
      {id:"t3",text:"Потребує пального",correct:"left"},{id:"t4",text:"Нуль викидів",correct:"right"},
      {id:"t5",text:"Шумове забруднення",correct:"left"},{id:"t6",text:"Безкоштовно їздити",correct:"right"},
      {id:"t7",text:"Переміщення людей",correct:"center"},{id:"t8",text:"Свобода руху",correct:"center"},
    ]},
  { id:"eco3", title:"Природа • Людина • Технології", type:3,
    circles:[
      {key:"nature",label:"Природа",color:"#2E7D32",emoji:"🌿"},
      {key:"human",label:"Людина",color:"#1565C0",emoji:"👤"},
      {key:"tech",label:"Технології",color:"#F9A825",emoji:"⚡"},
    ],
    theory:{title:"🌍 Гармонія — запорука майбутнього",text:"Природа дає нам все для життя: повітря, воду, їжу. Людина використовує ці ресурси, але часто шкодить. Технології можуть як допомогти (сонячні панелі, переробка), так і нашкодити (заводи, пластик). Коли всі працюють разом — це сталий розвиток!"},
    cards:[
      {id:"e1",text:"Ліси та річки",correct:"nature"},{id:"e2",text:"Чисте повітря",correct:"nature"},
      {id:"e3",text:"Відповідальність",correct:"human"},{id:"e4",text:"Споживання",correct:"human"},
      {id:"e5",text:"Сонячні панелі",correct:"tech"},{id:"e6",text:"Переробка сміття",correct:"tech"},
      {id:"e7",text:"Захист природи",correct:"center"},{id:"e8",text:"Сталий розвиток",correct:"all"},
    ]},
  { id:"energy3", title:"Сонце • Вітер • Вода", type:3,
    circles:[
      {key:"sun",label:"Сонце",color:"#F57F17",emoji:"☀️"},
      {key:"wind",label:"Вітер",color:"#0277BD",emoji:"💨"},
      {key:"water",label:"Вода",color:"#00838F",emoji:"💧"},
    ],
    theory:{title:"⚡ Відновлювана енергія",text:"Сонце, вітер та вода — три головних джерела чистої енергії. Сонячні панелі перетворюють світло на електрику. Вітряки використовують силу вітру. ГЕС працюють завдяки воді. Всі вони не забруднюють повітря і не закінчуються!"},
    cards:[
      {id:"n1",text:"Сонячні панелі",correct:"sun"},{id:"n2",text:"Фотосинтез",correct:"sun"},
      {id:"n3",text:"Вітрові турбіни",correct:"wind"},{id:"n4",text:"Повітряні потоки",correct:"wind"},
      {id:"n5",text:"ГЕС",correct:"water"},{id:"n6",text:"Річки та океани",correct:"water"},
      {id:"n7",text:"Чиста енергія",correct:"all"},{id:"n8",text:"Відновлювана",correct:"center"},
    ]},
];

/* ═══ UI helpers ═══ */
const Btn = ({children, onClick, color, sx, disabled}) => (
  <button onClick={onClick} disabled={disabled} style={{
    background: color || "linear-gradient(135deg,#4CAF50,#2E7D32)",
    color:"#fff", border:"2px solid #1B5E20", borderRadius:14,
    padding:"10px 20px", fontSize:16, fontWeight:800, cursor: disabled?"default":"pointer",
    fontFamily:FONT, boxShadow:"0 3px 10px rgba(0,0,0,.15)",
    textShadow:"0 1px 2px rgba(0,0,0,.2)", transition:"transform .1s",
    opacity: disabled?.5:1, ...sx,
  }}
  onMouseDown={e=>!disabled&&(e.currentTarget.style.transform="scale(.96)")}
  onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}
  onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
  >{children}</button>
);

const DropZone = ({zone,color,label,emoji,cards,placed,textItems,dragCard,onDrop,onAddText,onRemoveText,showText,isMobile}) => {
  const [inp,setInp] = useState("");
  const placedHere = cards.filter(c=>placed[c.id]?.zone===zone);
  const txtHere = textItems[zone]||[];
  return(
    <div
      onClick={()=>{if(dragCard)onDrop(zone);}}
      onDragOver={e=>e.preventDefault()}
      onDrop={e=>{e.preventDefault();onDrop(zone);}}
      style={{
        background:`${color}0A`, border:`2.5px solid ${color}44`, borderRadius:16,
        padding:isMobile?10:14, minHeight:isMobile?80:100, cursor:dragCard?"pointer":"default",
        transition:"all .15s",
        boxShadow: dragCard?`0 0 0 3px ${color}33`:"none",
      }}>
      <div style={{fontWeight:800,fontSize:isMobile?13:15,color,marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
        <span style={{fontSize:isMobile?18:22}}>{emoji}</span>{label}
        <span style={{marginLeft:"auto",background:`${color}22`,borderRadius:12,padding:"1px 10px",fontSize:12}}>{placedHere.length+txtHere.length}</span>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
        {placedHere.map(c=>(
          <span key={c.id} style={{background:`${color}18`,border:`1.5px solid ${color}55`,borderRadius:12,padding:"3px 10px",fontSize:12,fontWeight:600,color,animation:"popIn .2s ease"}}>
            {placed[c.id]?.correct?"✅ ":"❌ "}{c.text}
          </span>
        ))}
        {txtHere.map(t=>(
          <span key={t.id} style={{background:`${color}18`,border:`1.5px solid ${color}55`,borderRadius:12,padding:"3px 10px",fontSize:12,fontWeight:600,color,display:"inline-flex",alignItems:"center",gap:3,animation:"popIn .2s ease"}}>
            {t.text}
            <button onClick={(e)=>{e.stopPropagation();onRemoveText(zone,t.id);}} style={{background:"none",border:"none",cursor:"pointer",color,fontSize:11,opacity:.5,padding:0}}>✕</button>
          </span>
        ))}
      </div>
      {showText&&(
        <div style={{display:"flex",gap:4,marginTop:8}}>
          <input value={inp} onChange={e=>setInp(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&inp.trim()){onAddText(zone,inp.trim());setInp("");}}}
            onClick={e=>e.stopPropagation()}
            placeholder="Твоя ідея..."
            style={{flex:1,border:`2px solid ${color}55`,borderRadius:10,padding:"6px 10px",fontSize:13,outline:"none",background:"rgba(255,255,255,.95)",fontFamily:FONT,minWidth:0}}/>
          <button onClick={(e)=>{e.stopPropagation();if(inp.trim()){onAddText(zone,inp.trim());setInp("");}}}
            style={{background:color,color:"#fff",border:"none",borderRadius:10,padding:"6px 14px",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:FONT}}>+</button>
        </div>
      )}
    </div>
  );
};

/* ═══ SCREENS ═══ */
const Menu = ({m, onStart, onRules, onSettings}) => (
  <div style={{minHeight:"100vh",background:SKY,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:m?16:24,padding:m?"20px 12px":"40px 24px",fontFamily:FONT}}>
    <div style={{background:WOOD,borderRadius:20,padding:m?"12px 20px":"18px 36px",border:"4px solid #5C3D0E",boxShadow:"0 6px 24px rgba(0,0,0,.3)",textAlign:"center"}}>
      <h1 style={{margin:0,fontSize:m?32:52,fontWeight:900,color:"#FFEB3B",textShadow:"0 3px 8px rgba(0,0,0,.4)",letterSpacing:2}}>🌿 ЕКО-БЛУМ 🌿</h1>
      <div style={{fontSize:m?14:20,color:"#FFF9C4",fontWeight:700,marginTop:4}}>Екологічне Коло Венна</div>
      <div style={{fontSize:m?11:15,color:"#C8E6C9",fontWeight:600,marginTop:2}}>Створюємо Гармонію Разом!</div>
    </div>
    <svg viewBox="0 0 300 180" style={{width:m?220:320}}>
      <circle cx={115} cy={95} r={70} fill="#4CAF5025" stroke="#4CAF50" strokeWidth="3"/>
      <circle cx={185} cy={95} r={70} fill="#2196F325" stroke="#2196F3" strokeWidth="3"/>
      <clipPath id="mvo"><circle cx={115} cy={95} r={70}/></clipPath>
      <circle cx={185} cy={95} r={70} fill="#FFEB3B20" clipPath="url(#mvo)"/>
      <text x={88} y={92} fontSize="22" textAnchor="middle">🌿</text>
      <text x={88} y={112} fontSize="9" fontWeight="800" fill="#2E7D32" textAnchor="middle">ПРИРОДА</text>
      <text x={150} y={98} fontSize="18" textAnchor="middle">🤝</text>
      <text x={212} y={92} fontSize="22" textAnchor="middle">👤</text>
      <text x={212} y={112} fontSize="9" fontWeight="800" fill="#1565C0" textAnchor="middle">ЛЮДИНА</text>
    </svg>
    <div style={{fontSize:m?14:17,color:"#14532d",fontWeight:700}}>🎮 Інтерактивна гра для учнів 6 класу</div>
    <div style={{display:"flex",flexDirection:"column",gap:12,width:"100%",maxWidth:380}}>
      <Btn onClick={onStart} sx={{fontSize:m?20:24,padding:"16px"}}>🚀 РОЗПОЧАТИ ГРУ</Btn>
      <Btn onClick={onRules} color="linear-gradient(135deg,#FF9800,#E65100)" sx={{border:"3px solid #BF360C"}}>📋 ПРАВИЛА</Btn>
      <Btn onClick={onSettings} color="linear-gradient(135deg,#78909C,#546E7A)" sx={{border:"3px solid #37474F"}}>⚙️ НАЛАШТУВАННЯ</Btn>
    </div>
  </div>
);

const Rules = ({m, onBack}) => (
  <div style={{minHeight:"100vh",background:SKY,padding:m?16:32,fontFamily:FONT}}>
    <div style={{maxWidth:560,margin:"0 auto"}}>
      <Btn onClick={onBack}>← Назад</Btn>
      <div style={{background:WOOD,borderRadius:18,padding:"14px 24px",margin:"16px 0 20px",textAlign:"center",border:"3px solid #5C3D0E"}}>
        <h2 style={{margin:0,fontSize:m?24:34,color:"#FFEB3B",fontWeight:900}}>📋 ПРАВИЛА ГРИ</h2>
      </div>
      {[
        {e:"1️⃣",t:"Обери тему",d:"Обери екологічну тему — від вирубки лісів до технологій."},
        {e:"2️⃣",t:"Вивчи теорію",d:"Натисни «📖 Теорія» щоб прочитати цікаві факти."},
        {e:"3️⃣",t:"Грай!",d:"Перетягуй картки у правильне коло або вводь свої ідеї."},
        {e:"4️⃣",t:"Збирай зірки",d:"Правильна відповідь = ⭐. Змагайся з однокласниками!"},
      ].map((s,i)=>(
        <div key={i} style={{background:"rgba(255,255,255,.9)",borderRadius:16,padding:16,border:"2px solid #22863a44",display:"flex",gap:14,alignItems:"flex-start",boxShadow:"0 3px 10px rgba(0,0,0,.08)",marginBottom:12,animation:`slideUp .3s ease ${i*.1}s both`}}>
          <span style={{fontSize:32,flexShrink:0}}>{s.e}</span>
          <div><div style={{fontWeight:800,fontSize:17,color:"#14532d",marginBottom:4}}>{s.t}</div><div style={{fontSize:14,color:"#444",lineHeight:1.5}}>{s.d}</div></div>
        </div>
      ))}
      <div style={{background:"#FFF9C4",borderRadius:14,padding:16,border:"2px solid #F9A825",textAlign:"center"}}>
        <span style={{fontSize:16,fontWeight:800,color:"#F57F17"}}>💡 Головне — міркувати! Немає неправильних думок!</span>
      </div>
    </div>
  </div>
);

const Settings = ({onBack,mode,setMode,m}) => (
  <div style={{minHeight:"100vh",background:SKY,padding:m?16:32,fontFamily:FONT}}>
    <div style={{maxWidth:500,margin:"0 auto"}}>
      <Btn onClick={onBack}>← Назад</Btn>
      <div style={{background:WOOD,borderRadius:18,padding:"14px 24px",margin:"16px 0 20px",textAlign:"center",border:"3px solid #5C3D0E"}}>
        <h2 style={{margin:0,fontSize:m?24:32,color:"#fff",fontWeight:900}}>⚙️ НАЛАШТУВАННЯ</h2>
      </div>
      <div style={{background:"rgba(255,255,255,.9)",borderRadius:16,padding:20,border:"2px solid #22863a44"}}>
        <div style={{fontWeight:800,fontSize:16,color:"#14532d",marginBottom:12}}>🎮 Режим гри:</div>
        {[["drag","🎯 Drag & Drop","Перетягуй картки у правильне коло"],
          ["text","✍️ Текстовий ввід","Учні вводять власні ідеї"],
          ["both","🔄 Обидва","Спочатку картки, потім свої ідеї"]
        ].map(([v,l,d])=>(
          <button key={v} onClick={()=>setMode(v)} style={{
            display:"block",width:"100%",textAlign:"left",
            background:mode===v?"#E8F5E9":"#fff",
            border:mode===v?"2px solid #2E7D32":"2px solid #e0e0e0",
            borderRadius:12,padding:"12px 16px",marginBottom:8,cursor:"pointer",fontFamily:FONT,
          }}>
            <div style={{fontWeight:700,fontSize:15,color:mode===v?"#1B5E20":"#333"}}>{l}</div>
            <div style={{fontSize:12,color:"#666",marginTop:2}}>{d}</div>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const ThemeSelect = ({onBack,onSelect,customs,onAddCustom,m}) => (
  <div style={{minHeight:"100vh",background:SKY,padding:m?12:32,fontFamily:FONT}}>
    <div style={{maxWidth:700,margin:"0 auto"}}>
      <Btn onClick={onBack}>← Меню</Btn>
      <div style={{background:WOOD,borderRadius:18,padding:"14px 24px",margin:"12px 0 16px",textAlign:"center",border:"3px solid #5C3D0E"}}>
        <h2 style={{margin:0,fontSize:m?22:30,color:"#fff",fontWeight:900}}>🎯 ОБЕРИ ТЕМУ</h2>
      </div>
      <div style={{display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",gap:12}}>
        {[...THEMES,...customs].map(t=>(
          <button key={t.id} onClick={()=>onSelect(t)} style={{
            background:"rgba(255,255,255,.92)",border:`3px solid ${t.type===3?"#F9A825":"#22863a"}`,
            borderRadius:16,padding:16,cursor:"pointer",textAlign:"left",fontFamily:FONT,
            boxShadow:"0 4px 14px rgba(0,0,0,.08)",transition:"transform .15s",
          }}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.03)"}
          onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
            <div style={{fontSize:22,marginBottom:4}}>
              {t.type===3?t.circles.map(c=>c.emoji).join(" "):`${t.left.emoji} vs ${t.right.emoji}`}
            </div>
            <div style={{fontWeight:800,fontSize:16,color:"#1a1a2e",marginBottom:6}}>{t.title}</div>
            <span style={{background:(t.type===3?"#F9A825":GREEN)+"22",border:`2px solid ${t.type===3?"#F9A825":GREEN}`,borderRadius:20,padding:"2px 12px",fontSize:12,fontWeight:700,color:t.type===3?"#F9A825":GREEN}}>
              {t.type===3?"3 кола":"2 кола"}
            </span>
            {t.custom&&<span style={{marginLeft:6,background:"#E6510022",border:"2px solid #E65100",borderRadius:20,padding:"2px 12px",fontSize:12,fontWeight:700,color:"#E65100"}}>Ваша</span>}
          </button>
        ))}
        <button onClick={onAddCustom} style={{
          background:"rgba(255,255,255,.6)",border:"3px dashed #66BB6A",borderRadius:16,padding:16,
          cursor:"pointer",textAlign:"center",fontFamily:FONT,minHeight:100,
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,
        }}>
          <span style={{fontSize:32}}>➕</span>
          <span style={{fontWeight:800,fontSize:15,color:GREEN}}>Додати свою тему</span>
        </button>
      </div>
    </div>
  </div>
);

/* ═══ GAME ═══ */
const Game = ({theme,mode,onBack,m}) => {
  const [placed,setPlaced]=useState({});
  const [texts,setTexts]=useState(()=>{
    const o={center:[]};
    if(theme.type===3){theme.circles.forEach(c=>{o[c.key]=[];});o.all=[];}
    else{o.left=[];o.right=[];}
    return o;
  });
  const [score,setScore]=useState(0);
  const [showTheory,setShowTheory]=useState(false);
  const [drag,setDrag]=useState(null);

  const cards=theme.cards||[];
  const showDrag=mode==="drag"||mode==="both";
  const showText=mode==="text"||mode==="both";
  const cC="#B8860B";

  const doDrop=(zone)=>{
    if(!drag)return;
    const card=cards.find(c=>c.id===drag);
    if(!card||placed[card.id])return;
    const ok=card.correct===zone;
    setPlaced(p=>({...p,[card.id]:{zone,correct:ok}}));
    if(ok) setScore(s=>s+1);
    setDrag(null);
  };

  const addTxt=(zone,t)=>{setTexts(p=>({...p,[zone]:[...(p[zone]||[]),{id:uid(),text:t}]}));setScore(s=>s+1);};
  const rmTxt=(zone,id)=>{setTexts(p=>({...p,[zone]:(p[zone]||[]).filter(x=>x.id!==id)}));};

  const allDone=cards.length>0&&Object.keys(placed).length===cards.length;
  const correctCount=cards.filter(c=>placed[c.id]?.correct).length;

  const zones = theme.type===3
    ? [...theme.circles.map(c=>({key:c.key,label:c.label,color:c.color,emoji:c.emoji})),{key:"center",label:"Спільне",color:"#6D4C41",emoji:"🤝"},{key:"all",label:"Усе разом",color:"#E65100",emoji:"🌍"}]
    : [{key:"left",...theme.left},{key:"center",label:"Спільне",color:cC,emoji:"⚡"},{key:"right",...theme.right}];

  return(
    <div style={{minHeight:"100vh",background:SKY,padding:m?8:20,fontFamily:FONT}}>
      <div style={{maxWidth:900,margin:"0 auto"}}>
        {/* Top bar */}
        <div style={{display:"flex",flexWrap:"wrap",gap:8,alignItems:"center",marginBottom:12}}>
          <Btn onClick={onBack} sx={{padding:"8px 16px",fontSize:14}}>← Теми</Btn>
          <div style={{flex:1}}/>
          {theme.theory&&<Btn onClick={()=>setShowTheory(true)} color="linear-gradient(135deg,#1565C0,#1976D2)" sx={{border:"2px solid #0D47A1",padding:"8px 16px",fontSize:14}}>📖 Теорія</Btn>}
          <span style={{background:"#F9A82522",border:"2px solid #F9A825",borderRadius:20,padding:"4px 14px",fontSize:14,fontWeight:700,color:"#F57F17"}}>⭐ {score}</span>
        </div>

        {/* Title */}
        <div style={{background:WOOD,borderRadius:14,padding:"10px 20px",marginBottom:14,textAlign:"center",border:"3px solid #5C3D0E"}}>
          <h2 style={{margin:0,fontSize:m?17:24,color:"#fff",fontWeight:900}}>
            {theme.type===3?theme.circles.map(c=>c.emoji).join(" "):`${theme.left.emoji} vs ${theme.right.emoji}`} {theme.title}
          </h2>
        </div>

        {/* Card pool */}
        {showDrag&&cards.length>0&&(
          <div style={{background:"rgba(255,255,255,.85)",borderRadius:14,padding:12,marginBottom:12,border:"2px solid #e0e0e0"}}>
            <div style={{fontSize:13,fontWeight:700,color:"#666",marginBottom:8}}>🃏 Перетягни або натисни на картку, потім натисни на зону:</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {cards.map(c=>(
                <div key={c.id} draggable={!placed[c.id]} onDragStart={()=>setDrag(c.id)}
                  onClick={()=>{if(!placed[c.id])setDrag(c.id);}}
                  style={{
                    background:placed[c.id]?`${placed[c.id].correct?GREEN:"#E53935"}22`:drag===c.id?"#FFF9C4":"#fff",
                    border:`2px solid ${placed[c.id]?(placed[c.id].correct?GREEN:"#E53935"):drag===c.id?"#F9A825":"#ccc"}`,
                    borderRadius:14,padding:"8px 14px",fontSize:14,fontWeight:700,
                    color:placed[c.id]?(placed[c.id].correct?GREEN:"#C62828"):"#333",
                    cursor:placed[c.id]?"default":"grab",userSelect:"none",
                    opacity:placed[c.id]?.6:1,textDecoration:placed[c.id]?"line-through":"none",
                    boxShadow:drag===c.id?"0 0 0 3px #F9A82566":placed[c.id]?"none":"0 3px 8px rgba(0,0,0,.1)",
                    transition:"all .2s",
                  }}>{placed[c.id]?(placed[c.id].correct?"✓ ":"✗ "):""}{c.text}</div>
              ))}
            </div>
            {drag&&<div style={{marginTop:8,fontSize:13,fontWeight:700,color:"#F57F17",textAlign:"center"}}>
              📌 «{cards.find(c=>c.id===drag)?.text}» — натисни на зону
            </div>}
          </div>
        )}

        {/* Venn SVG + zones */}
        <div style={{background:"rgba(255,255,255,.7)",borderRadius:20,padding:m?8:16,border:"2px solid #22863a33"}}>
          {/* 2-circle SVG — FIXED: bigger overlap, labels ABOVE circles */}
          {theme.type===2&&(
            <div style={{position:"relative",marginBottom:8}}>
              {/* Labels above the circles */}
              <div style={{display:"flex",justifyContent:"space-between",padding:"0 8%",marginBottom:4}}>
                <span style={{fontWeight:800,fontSize:m?13:16,color:theme.left.color}}>{theme.left.emoji} {theme.left.label}</span>
                <span style={{fontWeight:800,fontSize:m?12:14,color:cC}}>⚡ Спільне</span>
                <span style={{fontWeight:800,fontSize:m?13:16,color:theme.right.color}}>{theme.right.emoji} {theme.right.label}</span>
              </div>
              <svg viewBox="0 0 800 260" style={{width:"100%",display:"block"}}>
                <defs><clipPath id="g2ov"><circle cx={300} cy={135} r={130}/></clipPath></defs>
                {/* Left circle at 300, Right at 500 — overlap zone is 300+130-500 = -70... need closer */}
                {/* Left at 280, Right at 520, r=160: overlap = 280+160=440 to 520-160=360 → 360 to 440 = 80px overlap ✓ */}
                <circle cx={280} cy={140} r={125} fill={`${theme.left.color}10`} stroke={theme.left.color} strokeWidth="3"/>
                <circle cx={520} cy={140} r={125} fill={`${theme.right.color}10`} stroke={theme.right.color} strokeWidth="3"/>
                <clipPath id="g2ov2"><circle cx={280} cy={140} r={125}/></clipPath>
                <circle cx={520} cy={140} r={125} fill="#F4D03F18" clipPath="url(#g2ov2)"/>
                <circle cx={520} cy={140} r={125} fill="none" stroke="#D4AC0D" strokeWidth="2" strokeDasharray="6 4" clipPath="url(#g2ov2)"/>
              </svg>
            </div>
          )}

          {/* 3-circle SVG */}
          {theme.type===3&&(
            <div style={{marginBottom:8}}>
              <svg viewBox="0 0 500 280" style={{width:"100%",maxWidth:500,display:"block",margin:"0 auto"}}>
                {theme.circles.map((c,i)=>{
                  const cx=[185,315,250][i],cy=[110,110,200][i];
                  return <circle key={i} cx={cx} cy={cy} r={95} fill={`${c.color}0C`} stroke={c.color} strokeWidth="2.5"/>;
                })}
                {theme.circles.map((c,i)=>{
                  const x=[130,370,250][i],y=[55,55,265][i];
                  return <text key={i} x={x} y={y} textAnchor="middle" fontSize="13" fontWeight="800" fill={c.color}>{c.emoji} {c.label}</text>;
                })}
                <text x={250} y={145} textAnchor="middle" fontSize="16">🌍</text>
              </svg>
            </div>
          )}

          {/* Drop zone cards */}
          <div style={{
            display:"grid",
            gridTemplateColumns:m?"1fr":theme.type===3?"1fr 1fr":"1fr 1fr 1fr",
            gap:10,
          }}>
            {zones.map(z=>(
              <DropZone key={z.key} zone={z.key} color={z.color} label={z.label} emoji={z.emoji}
                cards={cards} placed={placed} textItems={texts} dragCard={drag}
                onDrop={doDrop} onAddText={addTxt} onRemoveText={rmTxt}
                showText={showText} isMobile={m}/>
            ))}
          </div>
        </div>

        {/* Results */}
        {allDone&&(
          <div style={{background:"#E8F5E9",borderRadius:14,padding:16,marginTop:14,textAlign:"center",border:"2px solid #2E7D32"}}>
            <div style={{fontSize:24,fontWeight:900,color:"#14532d"}}>🎉 Вітаємо!</div>
            <div style={{fontSize:18,fontWeight:700,color:"#F9A825",marginTop:6}}>
              ⭐ {correctCount} з {cards.length} правильно ({Math.round(correctCount/cards.length*100)}%)
            </div>
            {correctCount===cards.length&&<div style={{fontSize:16,marginTop:8,color:GREEN}}>🏆 Ідеальний результат! Ти справжній еко-герой!</div>}
          </div>
        )}
      </div>

      {/* Theory modal */}
      {showTheory&&theme.theory&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}
          onClick={()=>setShowTheory(false)}>
          <div style={{background:"linear-gradient(180deg,#E8F5E9,#FFF9C4)",borderRadius:20,padding:28,maxWidth:500,width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,.3)",border:"3px solid #22863a"}}
            onClick={e=>e.stopPropagation()}>
            <h3 style={{margin:"0 0 12px",fontSize:22,fontWeight:900,color:"#14532d"}}>{theme.theory.title}</h3>
            <p style={{fontSize:15,lineHeight:1.7,color:"#333",margin:"0 0 20px"}}>{theme.theory.text}</p>
            <Btn onClick={()=>setShowTheory(false)} sx={{width:"100%",border:"3px solid #1B5E20"}}>Зрозуміло! 👍</Btn>
          </div>
        </div>
      )}
    </div>
  );
};

/* ═══ Creator ═══ */
const Creator = ({onAdd,onClose}) => {
  const[title,setTitle]=useState("");
  const[lL,setLL]=useState("");const[rL,setRL]=useState("");
  const[lE,setLE]=useState("🌍");const[rE,setRE]=useState("🌱");
  const[lC,setLC]=useState("#D32F2F");const[rC,setRC]=useState("#2E7D32");
  const ok=title.trim()&&lL.trim()&&rL.trim();
  const f={border:"2px solid #C8E6C9",borderRadius:10,padding:"10px 14px",fontSize:15,outline:"none",fontFamily:FONT,width:"100%",boxSizing:"border-box"};
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div style={{background:"#fff",borderRadius:20,padding:24,maxWidth:480,width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,.2)"}} onClick={e=>e.stopPropagation()}>
        <h3 style={{margin:"0 0 16px",fontSize:22,fontWeight:900,color:"#14532d",textAlign:"center"}}>➕ Нова тема (2 кола)</h3>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder='"Село vs Місто"' style={{...f,marginBottom:14,fontWeight:700}}/>
        <div style={{display:"flex",gap:12,marginBottom:14}}>
          {[[lL,setLL,lC,setLC,lE,setLE,"Ліва сторона",0],[rL,setRL,rC,setRC,rE,setRE,"Права сторона",12]].map(([lb,sL,cl,sC,em,sE,ttl,ei])=>(
            <div key={ttl} style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:cl,marginBottom:4}}>{ttl}</div>
              <input value={lb} onChange={e=>sL(e.target.value)} placeholder="Назва" style={{...f,borderColor:cl+"66",marginBottom:6}}/>
              <div style={{display:"flex",gap:3,alignItems:"center",flexWrap:"wrap"}}>
                <input type="color" value={cl} onChange={e=>sC(e.target.value)} style={{width:28,height:28,border:"none",cursor:"pointer",borderRadius:6}}/>
                {EMOJIS.slice(ei,ei+12).map(e=>(
                  <button key={e} onClick={()=>sE(e)} style={{fontSize:15,background:em===e?"#E8F5E9":"transparent",border:em===e?"2px solid #2E7D32":"2px solid transparent",borderRadius:6,cursor:"pointer",padding:"1px 2px"}}>{e}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:10}}>
          <Btn onClick={onClose} sx={{flex:1,background:"#aaa",border:"2px solid #888"}}>Скасувати</Btn>
          <Btn onClick={()=>{if(ok){onAdd({id:`c${Date.now()}`,title:title.trim(),type:2,custom:true,left:{label:lL.trim(),color:lC,emoji:lE},right:{label:rL.trim(),color:rC,emoji:rE},theory:null,cards:[]});onClose();}}}
            disabled={!ok} sx={{flex:1,border:"3px solid #1B5E20"}}>Створити</Btn>
        </div>
      </div>
    </div>
  );
};

/* ═══ ROOT ═══ */
export default function EcoBloomGame(){
  const[screen,setScreen]=useState("menu");
  const[mode,setMode]=useState("both");
  const[activeTheme,setActiveTheme]=useState(null);
  const[customs,setCustoms]=useState([]);
  const[showCreator,setShowCreator]=useState(false);
  const[m,setM]=useState(false);
  const ref=useRef(null);

  useEffect(()=>{
    const c=()=>setM((ref.current?.offsetWidth||window.innerWidth)<640);
    c();window.addEventListener("resize",c);return()=>window.removeEventListener("resize",c);
  },[]);

  return(
    <div ref={ref}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Comic+Neue:wght@400;700&display=swap" rel="stylesheet"/>
      {screen==="menu"&&<Menu m={m} onStart={()=>setScreen("themes")} onRules={()=>setScreen("rules")} onSettings={()=>setScreen("settings")}/>}
      {screen==="rules"&&<Rules m={m} onBack={()=>setScreen("menu")}/>}
      {screen==="settings"&&<Settings m={m} onBack={()=>setScreen("menu")} mode={mode} setMode={setMode}/>}
      {screen==="themes"&&<ThemeSelect m={m} onBack={()=>setScreen("menu")} onSelect={t=>{setActiveTheme(t);setScreen("game");}} customs={customs} onAddCustom={()=>setShowCreator(true)}/>}
      {screen==="game"&&activeTheme&&<Game theme={activeTheme} mode={mode} m={m} onBack={()=>setScreen("themes")}/>}
      {showCreator&&<Creator onAdd={t=>{setCustoms(p=>[...p,t]);setShowCreator(false);}} onClose={()=>setShowCreator(false)}/>}
    </div>
  );
}
