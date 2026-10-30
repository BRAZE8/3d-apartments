// Усі координати — пікселі 2D-плану (569×711), масштаб 18.9 px = 1 м
const K=18.9,OX=150,OY=30;
const M=(p)=>p/K;
// горизонтальні: [y,x0,x1,товщина,[[a,b,тип]...]]  типи: w вікно, d двері, b балконні двері, o отвір
const H=[
[31,148,442,10,[[158,248,'w'],[345,425,'w']]],
[670,148,442,6,[[158,245,'w'],[345,425,'w']]],
[159,153,263,3,[]],[159,267,303,4,[[274,292,'d']]],
[97.5,303,441,4,[]],[75,267,333,3,[[268,286,'d'],[312,330,'d']]],
[226,153,263,3,[[238,256,'d']]],[290,153,232,3,[[182,199,'d']]],
[307,200,262,3,[[204,219,'d'],[231,248,'d']]],
[150,305,352,3,[[320,338,'d']]],[162,357,441,3,[]],[190,310,336,3,[[314,330,'d']]],
[241,306,441,5,[]],[292,306,336,3,[]],[327,306,441,3,[[312,330,'d'],[360,385,'o']]],
[376,305,350,4,[]],[380,305,347,4,[]],[414,305,347,4,[]],[386,347,433,5,[]],
[353,153,263,5,[]],[413,153,263,5,[]],
[459,347,433,3,[[350,372,'o']]],[461,305,347,4,[]],[500,306,336,3,[[312,328,'d']]],
[547,306,441,5,[]],[543,153,263,3,[[236,254,'d']]],[605,153,263,5,[]],
[607,337,441,3,[[350,372,'o']]],[625,267,335,3,[[270,288,'d'],[300,318,'d']]],
[418,153,200,3,[]],[462,200,263,3,[[205,220,'d'],[232,248,'d']]],[480,153,232,3,[]],
[357,118,150,3,[]],[405,118,150,3,[]],
// балкони: поручні
[98,123,150,2,[]],[152,123,150,2,[]],[232,125,150,2,[]],[290,125,150,2,[]],
[480,125,150,2,[]],[540,125,150,2,[]],[607,125,150,2,[]],[668,125,150,2,[]],
[100,442,465,2,[]],[152,442,465,2,[]],[300,442,462,2,[]],[336,442,462,2,[]]
];
// вертикальні: [x,y0,y1,товщина,[[a,b,тип]...]]
const V=[
[150.5,26,672,5,[[42,90,'w'],[103,148,'b'],[170,225,'w'],[238,285,'b'],[295,345,'w'],[368,396,'d'],[425,470,'w'],[488,533,'b'],[548,603,'w'],[612,660,'b']]],
[435,36,97,4,[[45,90,'b']]],[441,97,240,5,[[105,150,'b'],[175,235,'w']]],
[441,240,330,5,[[255,315,'w']]],[433,330,458,4,[[340,383,'b'],[392,452,'b']]],
[441,458,548,5,[[470,540,'w']]],[441,548,608,5,[]],[435,605,670,4,[[615,655,'b']]],
[264.5,36,160,5,[[76,93,'d'],[114,131,'d']]],
[264.5,160,670,5,[[250,272,'d'],[380,402,'d'],[468,488,'d'],[612,630,'d']]],
[306,160,350,6,[[168,186,'d'],[298,320,'d']]],[306,330,462,5,[]],
[306,462,548,6,[[468,486,'d']]],[304,548,625,4,[[571,590,'d']]],[305,97,160,5,[]],
[292,36,75,3,[]],[334,36,75,3,[]],
[232,226,290,3,[[243,258,'d']]],[200,290,350,4,[]],[226.5,307,350,3,[]],
[352,98,150,3,[]],[337,162,240,4,[[165,185,'d']]],[336,190,232,3,[]],
[336,245,290,3,[]],[345,292,325,3,[[298,318,'d']]],[347,330,376,4,[[345,362,'d']]],
[347,376,460,4,[]],[336,500,545,3,[]],[337,462,547,4,[[470,490,'d']]],
[337,548,610,4,[[565,585,'d']]],[293,625,670,3,[]],[334,607,670,4,[[612,630,'d']]],
[200,418,480,4,[]],[226.5,420,462,3,[]],[232,480,543,3,[[490,506,'d']]],
[118,357,405,3,[[375,395,'d']]],[336,550,595,3,[]],
[437,38,97,2,[]],[437,340,383,2,[]],[437,388,455,2,[]],[437,610,660,2,[]]
];
// кімнати: [кв, тип, назва, м², x0,y0,x1,y1]
const R=[
[1,'bed','Житлова кімн. 1',17.40,153,36,263,97],[1,'bed','Житлова кімн. 2',18.85,153,97,263,159],
[1,'hall','Хол',10.27,267,75,336,159],[1,'bath','В.к.',3.74,267,36,292,75],[1,'bath','Т.Б.',2.09,294,36,333,75],
[1,'kit','Кухня',14.09,336,36,435,97],[1,'balc','Балкон',6.01,123,98,149,152],[1,'balc','Лоджія',4.88,437,38,452,95],
[2,'kit','Кухня',12.58,357,98,435,162],[2,'bath','С/в',4.90,305,98,352,150],[2,'hall','Хол',6.8,308,150,357,190],
[2,'bed','Житлова кімн.',20.05,337,162,440,240],[2,'ward','Гардероб',3.24,310,190,335,240],[2,'balc','Балкон',3.85,443,100,465,152],
[3,'bed','Житлова кімн. 2',18.29,153,159,263,226],[3,'sofa','Житлова кімн. 1',12.37,153,226,232,290],
[3,'hall','Хол',9.34,232,226,263,307],[3,'hall','Хол',0,200,290,263,307],[3,'kit','Кухня',12.18,153,290,200,350],
[3,'bath','Т.Б.',2.24,200,307,226,350],[3,'bath','В.к.',3.64,227,307,263,350],[3,'balc','Балкон',8.91,125,232,149,290],
[4,'sofa','Житлова кімн.',20.20,337,242,440,327],[4,'ward','Гардероб',2.94,310,245,335,290],[4,'hall','Хол',5.28,308,292,345,327],
[4,'kit','Кухня',12.66,347,327,433,386],[4,'bath','С/в',4.93,305,327,347,376],[4,'balc','Балкон',1.69,443,300,462,336],[4,'balc','Лоджія',5.46,437,340,452,383],
[5,'kit','Кухня',12.71,347,386,433,459],[5,'bath','С/в',5.03,305,414,347,461],[5,'hall','Хол',5.28,308,461,345,500],
[5,'ward','Гардероб',2.94,310,500,335,547],[5,'bed','Житлова кімн.',20.20,337,459,440,547],[5,'balc','Лоджія',5.46,437,388,452,455],
[6,'kit','Кухня',12.18,153,418,200,480],[6,'bath','Т.Б.',2.24,200,420,226,462],[6,'bath','В.к.',3.63,227,420,263,462],
[6,'hall','Хол',8.35,200,462,263,490],[6,'sofa','Житлова кімн. 1',12.37,153,480,232,543],[6,'hall','',0,232,490,263,543],
[6,'bed','Житлова кімн. 2',18.43,153,543,263,605],[6,'balc','Балкон',3.86,125,480,149,540],
[7,'bed','Житлова кімн. 2',16.87,153,605,263,670],[7,'hall','Хол',10.25,267,547,336,625],[7,'bath','В.к.',3.56,267,625,292,670],
[7,'bath','Т.Б.',2.30,295,625,333,670],[7,'ward','Гардероб',2.07,310,550,335,595],
[7,'sofa','Житлова кімн. 1',14.72,337,547,440,607],[7,'kit','Кухня',14.28,337,607,435,670],[7,'balc','Балкон',4.00,125,607,149,668],[7,'balc','Лоджія',4.89,437,610,455,660]
];
// загальні зони (не квартири)
const COMMON=[['corr',267,160,303,547],['stair',153,353,263,413],['tamb',118,357,150,405],['shaft',305,380,347,414]];
const APT={
1:{n:'Квартира 1',rooms:2,l:36.25,t:66.44,b:72.52,c:[210,98]},
2:{n:'Квартира 2',rooms:1,l:20.05,t:47.40,b:48.56,c:[370,190]},
3:{n:'Квартира 3',rooms:2,l:30.66,t:58.06,b:59.23,c:[210,255]},
4:{n:'Квартира 4',rooms:1,l:20.20,t:46.01,b:51.98,c:[370,300]},
5:{n:'Квартира 5',rooms:1,l:20.20,t:46.16,b:52.13,c:[375,490]},
6:{n:'Квартира 6',rooms:2,l:30.80,t:58.20,b:59.36,c:[210,510]},
7:{n:'Квартира 7',rooms:2,l:31.39,t:63.85,b:69.94,c:[290,610]}
};
const cv=document.getElementById('c');
const ren=new THREE.WebGLRenderer({canvas:cv,antialias:true});
ren.setPixelRatio(Math.min(devicePixelRatio,2));ren.shadowMap.enabled=true;ren.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();
const dark=()=>matchMedia('(prefers-color-scheme: dark)').matches&&document.documentElement.dataset.theme!=='light'||document.documentElement.dataset.theme==='dark';
function bgc(){return dark()?0x1d1b19:0xe9e4dc}
scene.background=new THREE.Color(bgc());
const cam=new THREE.PerspectiveCamera(36,1,0.1,400);
scene.add(new THREE.HemisphereLight(0xffffff,0x8a8070,0.75));
const sun=new THREE.DirectionalLight(0xfff2de,0.85);sun.position.set(-10,28,30);sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048);const sc=sun.shadow.camera;sc.left=-30;sc.right=30;sc.top=40;sc.bottom=-40;sc.far=120;sun.target.position.set(8,0,17);
scene.add(sun,sun.target);
const MAT={};const mat=(c,o={})=>{const k=c+JSON.stringify(o);return MAT[k]||(MAT[k]=new THREE.MeshLambertMaterial(Object.assign({color:c},o)))};
const root=new THREE.Group();scene.add(root);
const X=(p)=>M(p-OX),Z=(p)=>M(p-OY);
function bx(x0,y0,x1,y1,h,col,e=0,grp=root,o={}){ // у пікселях плану
  const w=Math.abs(x1-x0)/K,d=Math.abs(y1-y0)/K;if(w<=0||d<=0||h<=0)return null;
  const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),o.m||mat(col));
  m.position.set(X((x0+x1)/2),e+h/2,Z((y0+y1)/2));m.castShadow=!o.ns;m.receiveShadow=true;grp.add(m);return m}
const WH=2.7,EXT=0xe3b894,INT=0xf4f0e8,GLASS=new THREE.MeshLambertMaterial({color:0x9fd0e6,transparent:true,opacity:.38});
function wallpiece(h0,h1,x0,y0,x1,y1,ext,t){ // h0..h1 в метрах
  bx(x0,y0,x1,y1,h1-h0,ext?EXT:INT,h0,walls)}
const walls=new THREE.Group();root.add(walls);
function build(list,horiz){
  list.forEach((w,i)=>{
    const [c,a0,a1,t,gaps]=w;const rail=t<=2;
    const ext=!rail&&(horiz?(c===31||c===670):(w===list[0]||t===5&&(c===441||c===150.5)||c===435&&t===4||c===433));
    const seg=(s,e,lo,hi,mt)=>{if(e-s<0.2)return;const hh=hi-lo;
      const x0=horiz?s:c-t/2,x1=horiz?e:c+t/2,y0=horiz?c-t/2:s,y1=horiz?c+t/2:e;
      if(mt==='g'){bx(x0,y0,x1,y1,hh,0,lo,walls,{m:GLASS,ns:1})}
      else bx(x0,y0,x1,y1,hh,ext?EXT:INT,lo,walls)};
    if(rail){ // поручні: скло + метал
      seg(a0,a1,0.05,1.05,'g');seg(a0,a1,1.0,1.08);return}
    const gs=gaps.slice().sort((p,q)=>p[0]-q[0]);let cur=a0;
    gs.forEach(([a,b,ty])=>{seg(cur,a,0,WH);
      if(ty==='w'){seg(a,b,0,0.9);seg(a,b,2.1/K*K,WH);seg(a,b,0.9,2.1,'g')}
      else if(ty==='b'){seg(a,b,2.1,WH);seg(a,b,0.05,2.1,'g')}
      else seg(a,b,2.1,WH);cur=b});
    seg(cur,a1,0,WH)});
}
// seg uses px along axis but heights are meters -> fix: heights given directly
build(H,true);build(V,false);
// підлога
const FL={bed:0xcfa77a,sofa:0xcfa77a,hall:0xd9cdb8,kit:0xdad2c4,bath:0xbfd0d4,ward:0xd9cdb8,balc:0xb9b3a8};
const floors=[],fgrp=new THREE.Group();root.add(fgrp);
const base=bx(118,26,470,674,0.06,0xcfc8bc,-0.06,root);
function floor(r,apt,col){const m=bx(r[0],r[1],r[2],r[3],0.05,col,0,fgrp,{m:new THREE.MeshLambertMaterial({color:col})});if(m){m.userData={apt,base:col};floors.push(m)}return m}
R.forEach(r=>floor(r.slice(4),r[0],FL[r[1]]));
COMMON.forEach(c=>floor(c.slice(1),0,c[0]==='corr'?0xe4dccd:c[0]==='stair'?0xc9c4bb:0xd0c9bd));
// сходи
(function(){for(let i=0;i<14;i++)bx(158+i*4,360,162+i*4,404,0.12*(i+1)*0.5,0xe7e1d6,0,fgrp)})();
// меблі
const furn={};for(let i=1;i<=7;i++){furn[i]=new THREE.Group();root.add(furn[i])}
const mm=(a)=>a/K;
function F(g,x0,y0,w,d,h,col,e=0){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(col));m.position.set(x0+w/2,e+h/2,y0+d/2);m.castShadow=true;m.receiveShadow=true;g.add(m)}
function furnish(r){
  const [a,k,nm,ar,px0,py0,px1,py1]=r,g=furn[a];if(!g)return;
  const x0=X(px0)+0.12,y0=Z(py0)+0.12,w=(px1-px0)/K-0.24,d=(py1-py0)/K-0.24;if(w<1||d<1)return;
  const horiz=w>=d;
  if(k==='bed'){const bw=Math.min(1.6,d-0.3),bl=2.0;
    F(g,x0+0.55,y0+(d-bw)/2,bl,bw,0.4,0x7a4a2e);F(g,x0+0.6,y0+(d-bw)/2+0.05,bl-0.1,bw-0.1,0.2,0xf2ebe0,0.4);
    F(g,x0+0.57,y0+(d-bw)/2,0.1,bw,0.9,0x5a3420);F(g,x0+0.7,y0+(d-bw)/2+0.1,0.4,bw/2-0.15,0.1,0xffffff,0.6);F(g,x0+0.7,y0+d/2+0.05,0.4,bw/2-0.15,0.1,0xffffff,0.6);
    F(g,x0+0.5,y0+(d-bw)/2-0.45,0.4,0.4,0.45,0x7a4a2e);F(g,x0+0.5,y0+(d+bw)/2+0.05,0.4,0.4,0.45,0x7a4a2e);
    F(g,x0+w-0.6,y0+0.1,0.6,Math.min(d-0.2,1.8),2.0,0xe9e0d0);
    F(g,x0+1.7,y0+d/2-0.6,1.3,1.2,0.02,0xb86a4a,0.0)}
  else if(k==='sofa'){const sx=x0+w/2-1;
    F(g,sx,y0+0.1,2.0,0.9,0.45,0xe9e1d3);F(g,sx,y0+0.05,2.0,0.25,0.9,0xe9e1d3);
    F(g,sx+0.2,y0+1.4,1.1,0.6,0.35,0x6b4a35);F(g,sx-0.2,y0+1.0,2.4,1.5,0.02,0x8a8f93);
    F(g,x0+0.1,y0+d-0.5,Math.min(w-0.2,2.2),0.4,0.5,0x6b4a35);F(g,x0+w-0.2,y0+0.3,0.3,0.4,0.9,0x4d3a2c)}
  else if(k==='kit'){
    F(g,x0,y0,w,0.6,0.9,0xe0b57a);F(g,x0,y0,w,0.6,0.04,0x4a4a4a,0.9);F(g,x0,y0+0.05,w,0.3,0.7,0xe0b57a,1.5);
    if(d>2.2){F(g,x0+w-0.6,y0+0.6,0.6,d-0.6,0.9,0xe0b57a);F(g,x0+w-0.6,y0+0.6,0.6,d-0.6,0.04,0x4a4a4a,0.9)}
    const tx=x0+w/2-0.5,ty=y0+d/2+0.1;if(w>1.8&&d>2){F(g,tx,ty,1.0,0.8,0.05,0xc9a074,0.72);F(g,tx+0.1,ty+0.1,0.06,0.06,0.72,0x5a3420);F(g,tx+0.1,ty-0.45,0.4,0.4,0.45,0x7a4a2e);F(g,tx+0.5,ty+0.85,0.4,0.4,0.45,0x7a4a2e)}}
  else if(k==='bath'){
    if(w>1.2){F(g,x0,y0,0.75,Math.min(d,1.6),0.55,0xf8f8f8);}
    F(g,x0+w-0.5,y0+0.05,0.4,0.55,0.4,0xf8f8f8);F(g,x0+w-0.45,y0+d-0.55,0.45,0.5,0.85,0xf8f8f8)}
  else if(k==='ward'){F(g,x0,y0,w,0.4,1.9,0xe9e0d0)}
  else if(k==='hall'){if(w>1.5||d>1.5)F(g,x0,y0,0.3,0.9,0.8,0x7a4a2e);F(g,x0+(w>d?w/2-0.7:0.1),y0+(w>d?d/2-0.5:d/2-0.7),1.4,1,0.01,0xa8a094,0)}
  else if(k==='balc'&&w*d>3){F(g,x0+w/2-0.4,y0+d/2-0.4,0.8,0.8,0.04,0xc9a074,0.7);F(g,x0+w/2-0.04,y0+d/2-0.04,0.08,0.08,0.7,0x555555);F(g,x0+w/2-0.7,y0+d/2-0.2,0.4,0.4,0.45,0xddd2bc);F(g,x0+w/2+0.35,y0+d/2-0.2,0.4,0.4,0.45,0xddd2bc)}
}
R.forEach(furnish);
// камера та керування
const tgt=new THREE.Vector3(8,0,16),goal=tgt.clone();
let az=0.0,el=0.95,dist=52,gAz=az,gEl=el,gDist=dist;
function setCam(){cam.position.set(tgt.x+dist*Math.sin(az)*Math.cos(el),tgt.y+dist*Math.sin(el),tgt.z+dist*Math.cos(az)*Math.cos(el));cam.lookAt(tgt)}
function resize(){const w=cv.clientWidth,h=cv.clientHeight;ren.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();if(w<600&&sel==null){gDist=Math.max(gDist,80)}}
addEventListener('resize',resize);
let drag=null,moved=0;
cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);drag={x:e.clientX,y:e.clientY,pan:e.shiftKey||e.button===2};moved=0});
cv.addEventListener('pointermove',e=>{
  if(drag){const dx=e.clientX-drag.x,dy=e.clientY-drag.y;moved+=Math.abs(dx)+Math.abs(dy);drag.x=e.clientX;drag.y=e.clientY;
    if(drag.pan){const s=dist*0.0016;goal.x-=dx*s*Math.cos(az);goal.z+=dx*s*Math.sin(az);goal.x-=dy*s*Math.sin(az);goal.z-=dy*s*Math.cos(az)}
    else{gAz-=dx*0.006;gEl=Math.min(1.45,Math.max(0.25,gEl+dy*0.005))}}
  else hover(e)});
cv.addEventListener('pointerup',e=>{if(moved<5)pick(e);drag=null});
cv.addEventListener('contextmenu',e=>e.preventDefault());
cv.addEventListener('wheel',e=>{e.preventDefault();gDist=Math.min(120,Math.max(8,gDist*(1+e.deltaY*0.001)))},{passive:false});
const ray=new THREE.Raycaster(),mv=new THREE.Vector2();
function hit(e){const r=cv.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,cam);
  const f=ray.intersectObjects(floors,false);return f[0]?f[0].object.userData.apt:null}
const tip=document.getElementById('tip');
function hover(e){const a=hit(e);if(a){tip.style.display='block';tip.textContent=APT[a].n;tip.style.left=e.clientX+12+'px';tip.style.top=e.clientY+12+'px';cv.style.cursor='pointer'}else{tip.style.display='none';cv.style.cursor='grab'}}
function pick(e){const a=hit(e);if(a)select(a)}
let sel=null;const lab=new THREE.Group(),numLab=new THREE.Group();root.add(lab,numLab);
function sprite(txt,big,sub){const c=document.createElement('canvas');c.width=256;c.height=big?256:96;const g=c.getContext('2d');
  if(big){g.fillStyle='rgba(181,83,46,.95)';g.beginPath();g.arc(128,128,100,0,7);g.fill();g.fillStyle='#fff';g.font='700 130px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(txt,128,138)}
  else{g.fillStyle='rgba(255,255,255,.92)';g.fillRect(0,0,256,96);g.fillStyle='#2a2622';g.font='600 30px sans-serif';g.textAlign='center';g.fillText(txt,128,40);g.font='26px sans-serif';g.fillText(sub,128,78)}
  const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false}));s.renderOrder=9;return s}
Object.keys(APT).forEach(k=>{const s=sprite(k,true);const a=APT[k];s.position.set(X(a.c[0]),3.4,Z(a.c[1]));s.scale.set(2.2,2.2,1);s.userData.k=k;numLab.add(s)});
function select(a){sel=a;
  floors.forEach(f=>{const on=a==null||f.userData.apt===a||f.userData.apt===0;f.material.color.setHex(on?f.userData.base:0xb4aea4)});
  for(let i=1;i<=7;i++)furn[i].visible=a==null||a===i;
  lab.clear();numLab.visible=a==null;
  if(a){R.filter(r=>r[0]===a&&r[2]&&r[1]!=='hall'||r[0]===a&&r[2]==='Хол'&&r[3]>0).forEach(r=>{const s=sprite(r[2],false,r[3].toFixed(2)+' м²');s.scale.set(2.4,0.9,1);s.position.set(X((r[4]+r[6])/2),2.2,Z((r[5]+r[7])/2));lab.add(s)});
    const c=APT[a].c;goal.set(X(c[0]),0,Z(c[1]));gDist=a%1===0&&APT[a].rooms===2?30:24;gEl=1.1}
  else{goal.set(8,0,16);gDist=innerWidth<600?80:52;gEl=0.95;gAz=0}
  ui()}
function ui(){const b=document.getElementById('btns');b.innerHTML='';
  const mk=(t,v)=>{const x=document.createElement('button');x.textContent=t;if(sel===v)x.className='on';x.onclick=()=>select(v);b.appendChild(x)};
  mk('Усі',null);Object.keys(APT).forEach(k=>mk(k,+k));
  const i=document.getElementById('info');
  if(!sel){i.innerHTML='<h2>Секція №2, поверх</h2><p class="hint">Натисніть на квартиру або номер. Ліва кнопка миші: обертання, колесо: масштаб, Shift або права кнопка: зсув.</p>'}
  else{const a=APT[sel],rs=R.filter(r=>r[0]===sel&&r[3]>0&&r[2]);
    i.innerHTML=`<h2>${a.n} · ${a.rooms}-кімнатна</h2><div class="nums"><div><b>${a.l.toFixed(2)}</b><span>житлова, м²</span></div><div><b>${a.t.toFixed(2)}</b><span>загальна, м²</span></div><div><b>${a.b.toFixed(2)}</b><span>з балконом, м²</span></div></div><table>${rs.map(r=>`<tr><td>${r[2]}</td><td>${r[3].toFixed(2)} м²</td></tr>`).join('')}</table>`}}
function loop(){const k=0.12;az+=(gAz-az)*k;el+=(gEl-el)*k;dist+=(gDist-dist)*k;tgt.lerp(goal,k);setCam();
  if(!sel)numLab.children.forEach(s=>s.scale.setScalar(Math.max(1.6,dist/24)));
  ren.render(scene,cam);requestAnimationFrame(loop)}
resize();ui();select(null);loop();
setInterval(()=>{scene.background.setHex(bgc())},1500);
