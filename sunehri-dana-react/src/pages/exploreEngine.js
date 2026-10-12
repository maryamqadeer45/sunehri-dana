/* Explore 3D gallery engine, converted from explore.html for React.
   initExplore() returns a cleanup function (used by useEffect). */
export default function initExplore(opts){
"use strict";
var dead=false,timers=[],offs=[];
function T(f,ms){var id=setTimeout(function(){if(!dead)f()},ms);timers.push(id);return id}
function on(t,e,f,o){t.addEventListener(e,f,o);offs.push(function(){t.removeEventListener(e,f,o)})}
var DATA={"items": [{"k": "dish", "key": "biryani", "bg": "#ffe9d2", "title": "Biryani", "place": "Dish · best with 1121 Kernel Basmati", "note": "Layered, spiced and aromatic. The star of every dawat. Use 1121 or Sella. Par-boil to 70% before layering.", "href": "best-rice-for-biryani.html", "cta": "Shop rice for biryani"}, {"k": "prod", "pid": 0, "col": "#fdebc8", "title": "Super Kernel Basmati", "place": "Basmati rice · Rs 360/kg · 25 kg pack Rs 8,650", "note": "Long, aromatic grain for everyday pulao and special meals. Soak 30 min, rice to water 1 : 1.5, cooks in about 15–18 min."}, {"k": "field", "title": "Where It Begins", "place": "Punjab · Paddy fields", "note": "Our rice comes from Punjab's rice-growing belt, where the grain ripens under the long summer sun before it reaches our mill in Faisalabad.", "href": "about.html", "cta": "About our process"}, {"k": "dish", "key": "pulao", "bg": "#fff3d6", "title": "Pulao", "place": "Dish · best with Super Kernel Basmati", "note": "Fragrant yakhni rice with whole spices and tender meat. Soak 30 minutes and cook in yakhni at 1 : 1.5.", "href": "best-rice-for-pulao.html", "cta": "Shop rice for pulao"}, {"k": "prod", "pid": 1, "col": "#fbe0a8", "title": "1121 Kernel Basmati", "place": "Basmati rice · Rs 410/kg · 25 kg pack Rs 9,850", "note": "Extra-long grain that stays fluffy and separate. Ideal for biryani. Soak 30 min, rice to water 1 : 1.5, cooks in about 15 min."}, {"k": "dish", "key": "zarda", "bg": "#fff0c9", "title": "Zarda", "place": "Dish · best with 1121 Golden Sella", "note": "Sweet saffron-coloured rice with dry fruits, a wedding classic. Extra-long grain keeps each dane separate when sweetened.", "href": "best-rice-for-zarda.html", "cta": "Shop rice for zarda"}, {"k": "prod", "pid": 2, "col": "#f9d58e", "title": "Steam Basmati 1121", "place": "Basmati rice · Rs 440/kg · 25 kg pack Rs 10,550", "note": "Steam processed so grains stay unbroken and beautifully separate. Soak 20–30 min, rice to water 1 : 1.5, cooks in about 12–15 min."}, {"k": "macro", "title": "Every Grain Counts", "place": "Mill · Faisalabad", "note": "Cleaned, graded and sorted so broken and discoloured grains are removed before packing. What you see here is what we ship.", "href": "shop.html", "cta": "Shop rice"}, {"k": "dish", "key": "kheer", "bg": "#f4ecff", "title": "Kheer", "place": "Dish · best with Broken Rice (Tota)", "note": "Creamy milk pudding with cardamom, nuts and silver leaf. Broken rice melts into a naturally creamy kheer.", "href": "best-rice-for-kheer.html", "cta": "Shop rice for kheer"}, {"k": "prod", "pid": 3, "col": "#f7cf86", "title": "Super Sella Golden", "place": "Sella rice · Rs 390/kg · 25 kg pack Rs 9,350", "note": "Golden parboiled rice that cooks firm, fluffy and non-sticky. Soak 45–60 min, rice to water 1 : 2, cooks in about 20–25 min."}, {"k": "dish", "key": "khichri", "bg": "#fff6d9", "title": "Khichri", "place": "Dish · best with Irri-6 White", "note": "Comfort food with daal, ghee and fried onion. Irri or Tota cooks soft and blends with daal.", "href": "best-rice-for-khichri.html", "cta": "Shop rice for khichri"}, {"k": "prod", "pid": 4, "col": "#f4c36d", "title": "1121 Golden Sella", "place": "Sella rice · Rs 450/kg · 25 kg pack Rs 10,800", "note": "Long golden grain with rich aroma. Perfect for big weddings and degs. Soak 45–60 min, rice to water 1 : 2, cooks in about 20–25 min."}, {"k": "dish", "key": "daal", "bg": "#fff0d1", "title": "Daal Chawal", "place": "Dish · best with Irri-6 White", "note": "Simple, filling and loved in every home. Irri-6 for daily budget. Super Kernel for a better plate.", "href": "best-rice-for-daal-chawal.html", "cta": "Shop rice for daal chawal"}, {"k": "prod", "pid": 5, "col": "#eef0f4", "title": "Irri-6 White", "place": "Daily rice · Rs 195/kg · 25 kg pack Rs 4,675", "note": "Clean everyday white rice at an affordable price. Soak 15 min, rice to water 1 : 2, cooks in about 15 min."}, {"k": "dish", "key": "fried", "bg": "#f1f5e3", "title": "Fried Rice", "place": "Dish · best with Irri-6 White", "note": "Chinese-style rice with egg, vegetables and soy. Cool the cooked rice first for non-sticky fried rice.", "href": "best-rice-for-fried-rice.html", "cta": "Shop rice for fried rice"}, {"k": "prod", "pid": 6, "col": "#f1e6cf", "title": "Irri-9 Sella", "place": "Daily rice · Rs 235/kg · 25 kg pack Rs 5,650", "note": "Parboiled grain suited to plain rice, daal chawal and khichri. Soak 30 min, rice to water 1 : 2, cooks in about 20 min."}, {"k": "bori", "tall": true, "title": "The 50 kg Bori", "place": "Wholesale · best value per kg", "note": "Our largest pack carries the lowest price per kg, 6% below the 5 kg price. Ideal for shops, restaurants and big families.", "href": "prices.html", "cta": "See the price list"}, {"k": "dish", "key": "bowl", "bg": "#e8f4ee", "title": "Healthy Rice Bowl", "place": "Dish · best with Brown Rice", "note": "Brown rice, veggies and protein. A balanced everyday bowl. Soak brown rice at least 60 minutes for softer grain.", "href": "best-rice-for-healthy-bowl.html", "cta": "Shop rice for healthy rice bowl"}, {"k": "prod", "pid": 7, "col": "#ebe7dc", "title": "Broken Rice (Tota)", "place": "Daily rice · Rs 145/kg · 25 kg pack Rs 3,475", "note": "Broken grain for khichri, kheer and large-batch cooking. Soak 10 min, rice to water 1 : 2.5, cooks in about 15 min."}, {"k": "prod", "pid": 8, "col": "#e6cfae", "title": "Brown Rice", "place": "Special rice · Rs 330/kg · 25 kg pack Rs 7,925", "note": "Whole grain with the bran left on. Rich in fibre. Soak 60 min, rice to water 1 : 2.5, cooks in about 35–40 min."}, {"k": "prod", "pid": 9, "col": "#fbe6b5", "title": "Kainat 1121 Extra Long", "place": "Special rice · Rs 480/kg · 25 kg pack Rs 11,525", "note": "Hand-picked extra-long grain with the finest aroma we sell. Soak 30 min, rice to water 1 : 1.5, cooks in about 15 min."}], "disc": {"5": 0, "10": 0.02, "25": 0.04, "50": 0.06}};
if(opts&&opts.data)opts.data(DATA);
var DISC=DATA.disc;
function bag(col,w){
 return '<svg viewBox="0 0 120 130" width="'+(w||118)+'" aria-hidden="true"><path d="M22 26Q60 8 98 26L104 112Q60 126 16 112Z" fill="'+col+'" stroke="#f85606" stroke-width="2.500"/><path d="M22 26Q60 42 98 26" fill="none" stroke="#f85606" stroke-width="2.500"/><circle cx="60" cy="78" r="23" fill="#fff" stroke="#f85606" stroke-width="2"/><path d="M60 94V68M60 86q-8-2-10-9M60 86q8-2 10-9M60 74q-5-1-6-6M60 74q5-1 6-6" stroke="#17233b" stroke-width="2.500" fill="none" stroke-linecap="round"/></svg>';
}
function rnd(seed){var s=seed;return function(){s=(s*16807)%2147483647;return (s-1)/2147483646}}
function scat(n,cx,cy,rx,ry,seed,fn){var r=rnd(seed),o="";for(var i=0;i<n;i++){var a=r()*6.283,d=Math.sqrt(r());o+=fn(cx+Math.cos(a)*d*rx,cy+Math.sin(a)*d*ry,r,i)}return o}
function grains(n,cx,cy,rx,ry,seed,cols){return scat(n,cx,cy,rx,ry,seed,function(x,y,r,i){return '<ellipse cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" rx="3.400" ry="1.300" transform="rotate('+Math.round(r()*180)+' '+x.toFixed(1)+' '+y.toFixed(1)+')" fill="'+cols[i%cols.length]+'"/>'})}
function dots(n,cx,cy,rx,ry,seed,col,rad){return scat(n,cx,cy,rx,ry,seed,function(x,y){return '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+rad+'" fill="'+col+'"/>'})}
function plate(){return '<ellipse cx="100" cy="122" rx="78" ry="9" fill="#a3b1c6" opacity=".3"/><ellipse cx="100" cy="90" rx="82" ry="46" fill="#fff" stroke="#dfe3ea" stroke-width="2"/><ellipse cx="100" cy="90" rx="66" ry="37" fill="#f6f7fa" stroke="#e8ebf0"/>'}
function dishSvg(id,bg){
 var f="";
 if(id==="biryani")f=plate()+'<ellipse cx="100" cy="84" rx="58" ry="30" fill="#f2a93b"/>'+grains(80,100,82,54,26,11,["#fff4d6","#f6c15a","#e98a2e"])+dots(5,100,80,40,16,3,"#a63d17",7)+dots(14,100,80,48,22,5,"#43a047",2.200)+'<circle cx="150" cy="104" r="12" fill="#ffe066" stroke="#f0b800" stroke-width="2"/><path d="M150 92v24M138 104h24" stroke="#f0b800"/>';
 else if(id==="pulao")f=plate()+'<ellipse cx="100" cy="84" rx="58" ry="30" fill="#f1d48a"/>'+grains(80,100,82,54,26,21,["#fff7e0","#f5dc9a","#ecc873"])+dots(9,100,80,44,20,7,"#8c5a2b",4)+dots(8,100,80,44,20,9,"#fb8c00",2.500)+dots(8,100,80,44,20,13,"#66bb6a",2);
 else if(id==="zarda")f=plate()+'<ellipse cx="100" cy="84" rx="58" ry="30" fill="#ffc233"/>'+grains(80,100,82,54,26,31,["#ffd95e","#ffb300","#ffe38a"])+dots(8,100,80,46,21,2,"#e53935",3)+dots(8,100,80,46,21,4,"#43a047",2.500)+dots(9,100,80,46,21,8,"#fff8e1",2.800)+dots(6,100,80,46,21,12,"#c68b4a",3);
 else if(id==="kheer")f='<ellipse cx="100" cy="124" rx="62" ry="8" fill="#a3b1c6" opacity=".3"/><path d="M42 78Q46 130 100 132Q154 130 158 78Z" fill="#fff" stroke="#d9c9a8" stroke-width="2"/><ellipse cx="100" cy="78" rx="58" ry="20" fill="#fffaf0" stroke="#d9c9a8" stroke-width="2"/><ellipse cx="100" cy="79" rx="50" ry="15" fill="#fbf1dc"/>'+dots(14,100,79,44,12,6,"#7cb342",2.500)+dots(9,100,79,44,12,9,"#c68b4a",2.800)+scat(7,100,79,40,11,14,function(x,y){return '<path d="M'+x.toFixed(1)+' '+y.toFixed(1)+'l5 -2" stroke="#f57c00" stroke-width="1.200"/>'});
 else if(id==="khichri")f=plate()+'<ellipse cx="100" cy="84" rx="56" ry="29" fill="#ecd58a"/>'+grains(70,100,82,52,25,41,["#f8ecb8","#e6c96a","#d9b55a"])+'<ellipse cx="100" cy="80" rx="14" ry="6" fill="#ffd54f"/>'+dots(14,100,80,42,18,17,"#7b4a1e",2.600)+'<path d="M140 98q14 6 22 0" stroke="#43a047" stroke-width="3" fill="none" stroke-linecap="round"/>';
 else if(id==="daal")f=plate()+'<ellipse cx="76" cy="90" rx="34" ry="26" fill="#fff" stroke="#eceff4"/>'+grains(40,76,88,30,20,51,["#fff","#f1f1ee","#ebe9e0"])+'<ellipse cx="126" cy="92" rx="34" ry="24" fill="#e6a817"/><path d="M104 90q10-8 20 0t20 0" stroke="#c98a0b" stroke-width="2.500" fill="none"/>'+dots(7,126,90,28,18,22,"#d32f2f",2.200)+dots(7,126,90,28,18,23,"#388e3c",2);
 else if(id==="fried")f=plate()+'<ellipse cx="100" cy="84" rx="58" ry="30" fill="#e9c58d"/>'+grains(70,100,82,54,26,61,["#fff2cf","#d9a85f","#f3d9a0"])+dots(12,100,80,46,21,3,"#66bb6a",2.600)+dots(10,100,80,46,21,5,"#fb8c00",2.800)+dots(5,100,80,40,17,8,"#ffe57f",4.500)+dots(6,100,80,46,21,10,"#2e7d32",1.800);
 else f='<ellipse cx="100" cy="124" rx="62" ry="8" fill="#a3b1c6" opacity=".3"/><path d="M40 70Q44 126 100 128Q156 126 160 70Z" fill="#e0e6ef" stroke="#c4ccd9" stroke-width="2"/><ellipse cx="100" cy="70" rx="60" ry="22" fill="#eef1f6" stroke="#c4ccd9" stroke-width="2"/><path d="M52 70q22-16 48-4v18q-26 8-48-2z" fill="#b88a5a"/>'+grains(30,76,72,22,8,71,["#d2a574","#a07245"])+'<path d="M100 66q26-14 48 4q-6 14-48 16z" fill="#8bc34a"/><circle cx="112" cy="76" r="6" fill="#e53935"/><circle cx="130" cy="74" r="5" fill="#e53935"/><ellipse cx="100" cy="86" rx="14" ry="7" fill="#fff"/><circle cx="100" cy="86" r="4" fill="#ffb300"/>';
 return '<svg viewBox="0 0 200 150" role="img" aria-label="'+id+' illustration"><rect width="200" height="150" rx="0" fill="'+bg+'"/>'+f+'</svg>';
}

document.documentElement.style.overflow="hidden";
try{history.scrollRestoration="manual"}catch(e){}
window.scrollTo(0,0);

function xml(s){return s.replace("<svg ",'<svg xmlns="http://www.w3.org/2000/svg" ')}
function uri(s){return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(xml(s))}
function prodSvg(it){
 return '<svg viewBox="0 0 300 200"><rect width="300" height="200" fill="'+it.col+'"/><circle cx="150" cy="96" r="92" fill="#fff" opacity=".42"/><g transform="translate(150 96) scale(1.18) translate(-60 -65)"><path d="M22 26Q60 8 98 26L104 112Q60 126 16 112Z" fill="'+it.col+'" stroke="#f85606" stroke-width="2.5"/><path d="M22 26Q60 42 98 26" fill="none" stroke="#f85606" stroke-width="2.5"/><circle cx="60" cy="78" r="23" fill="#fff" stroke="#f85606" stroke-width="2"/><path d="M60 94V68M60 86q-8-2-10-9M60 86q8-2 10-9M60 74q-5-1-6-6M60 74q5-1 6-6" stroke="#17233b" stroke-width="2.5" fill="none" stroke-linecap="round"/></g><text x="150" y="190" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="#17233b">'+it.title+'</text></svg>';
}
function fieldSvg(){
 var o='<svg viewBox="0 0 300 200"><defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9cc9f2"/><stop offset="1" stop-color="#fff0cf"/></linearGradient></defs><rect width="300" height="200" fill="url(#sk)"/><circle cx="228" cy="52" r="22" fill="#ffe08a"/><path d="M0 104Q70 84 150 100T300 92V200H0Z" fill="#7fae5a"/>';
 var r=rnd(7);
 for(var row=0;row<9;row++){var y=108+row*10.5,gold=row>3;
  for(var x=-4;x<306;x+=5+row*.4){var h=7+row*1.4+r()*3;o+='<path d="M'+x.toFixed(1)+' '+y.toFixed(1)+'q'+(1.5+r()*2).toFixed(1)+' -'+(h*.6).toFixed(1)+' '+(3+r()*2).toFixed(1)+' -'+h.toFixed(1)+'" stroke="'+(gold?(r()>.5?"#e0b341":"#c99a2e"):(r()>.5?"#4f8f3a":"#68a748"))+'" stroke-width="'+(1+row*.12).toFixed(2)+'" fill="none" stroke-linecap="round"/>'}}
 return o+'</svg>';
}
function macroSvg(){
 var cols=["#fffaf0","#f6ead0","#fff3dc","#f1e2c0"];
 var o='<svg viewBox="0 0 300 200"><rect width="300" height="200" fill="#e9d6ae"/>';
 o+=scat(70,150,100,150,96,5,function(x,y,r,i){var a=Math.round(r()*180),c=cols[i%4];return '<g transform="rotate('+a+' '+x.toFixed(1)+' '+y.toFixed(1)+')"><ellipse cx="'+(x+2).toFixed(1)+'" cy="'+(y+3).toFixed(1)+'" rx="17" ry="5.4" fill="#000" opacity=".16"/><ellipse cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" rx="17" ry="5.4" fill="'+c+'" stroke="#d9c79c" stroke-width=".8"/></g>'});
 return o+'</svg>';
}
function boriSvg(){
 return '<svg viewBox="0 0 240 300"><rect width="240" height="300" fill="#fbe6c8"/><circle cx="120" cy="150" r="118" fill="#fff" opacity=".4"/><path d="M52 52Q120 20 188 52L200 268Q120 292 40 268Z" fill="#fdebc8" stroke="#f85606" stroke-width="4"/><path d="M52 52Q120 84 188 52" fill="none" stroke="#f85606" stroke-width="4"/><circle cx="120" cy="150" r="46" fill="#fff" stroke="#f85606" stroke-width="3"/><path d="M120 184V128M120 168q-14-3-18-16M120 168q14-3 18-16M120 146q-9-2-11-11M120 146q9-2 11-11" stroke="#17233b" stroke-width="4" fill="none" stroke-linecap="round"/><text x="120" y="226" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="20" fill="#17233b">50 KG</text><text x="120" y="250" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" letter-spacing="2" fill="#a05a00">SUNEHRI DANA</text></svg>';
}
var items=DATA.items;
items.forEach(function(it){
 var s;
 if(it.k==="dish")s=dishSvg(it.key,it.bg);else if(it.k==="prod")s=prodSvg(it);else if(it.k==="field")s=fieldSvg();else if(it.k==="macro")s=macroSvg();else s=boriSvg();
 it.src=it.img||uri(s);
});

var $=function(s){return document.querySelector(s)},body=document.body,root=document.documentElement;
var stage=$("#stage"),world=$("#world"),orb=$("#orb"),head=$("#headline"),gridEl=$("#grid .rows");
var N=items.length,GA=Math.PI*(3-Math.sqrt(5)),RAD=Math.PI/180;
var cards=[],R=300,cw=160,persp=1150,focused=-1,revealed=false;

/* Fibonacci sphere */
items.forEach(function(it,i){
 var y=1-(i/(N-1))*2,rad=Math.sqrt(Math.max(0,1-y*y)),th=i*GA,x=Math.cos(th)*rad,z=Math.sin(th)*rad;
 var el=document.createElement("div");el.className="card"+(it.tall?" tall":"");el.dataset.idx=i;
 var fig=document.createElement("figure"),img=document.createElement("img");img.alt=it.title;img.decoding="async";
 fig.appendChild(img);el.appendChild(fig);orb.appendChild(el);
 cards.push({el:el,img:img,x:x,y:y,z:z,lat:Math.asin(y)/RAD,lon:Math.atan2(x,z)/RAD,o:-1,d:-1});
 var gf=document.createElement("figure");gf.dataset.idx=i;gf.innerHTML='<img alt="'+it.title.replace(/"/g,"&quot;")+'"><figcaption>'+it.title+'</figcaption>';
 var gi=gf.querySelector("img");gi.src=it.src;gridEl.appendChild(gf);
 cards[i].gfig=gf;
});

/* splash progress */
var loaded=0,t0=Date.now(),splash=$("#splash"),barEl=$("#bar"),splashDone=false;
function setBar(){barEl.style.transform="scaleX("+Math.min(1,loaded/(N+1))+")"}
function checkSplash(){
 if(splashDone)return;var el=Date.now()-t0;
 if((loaded>=N&&el>=1150)||el>=9000){endSplash()}else if(loaded>=N){T(checkSplash,1150-el+10)}
}
cards.forEach(function(c,i){
 var im=new Image();
 im.onload=im.onerror=function(){c.img.src=items[i].src;c.img.classList.add("in");loaded++;setBar();checkSplash()};
 im.src=items[i].src;
});
T(checkSplash,1200);T(checkSplash,9050);
function endSplash(){
 if(splashDone)return;splashDone=true;loaded=N+1;setBar();
 T(function(){splash.classList.add("out");T(function(){splash.remove()},950);startIntro()},420);
}

/* intro (falling grain film, plays at 2x speed) */
var intro=$("#intro"),film=intro.querySelector(".film"),introT=0,hardT=0;
for(var g=0;g<70;g++){var gi=document.createElement("i");
 gi.style.setProperty("--x",(Math.random()*100).toFixed(1)+"vw");gi.style.setProperty("--dx",(Math.random()*18-9).toFixed(1)+"vw");
 gi.style.setProperty("--t",(.9+Math.random()*1.2).toFixed(2)+"s");gi.style.setProperty("--dl",(Math.random()*1.4).toFixed(2)+"s");
 gi.style.setProperty("--r0",Math.round(Math.random()*180)+"deg");gi.style.setProperty("--r1",Math.round(180+Math.random()*360)+"deg");film.appendChild(gi)}
function startIntro(){
 intro.classList.add("play");
 var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
 introT=T(reveal,reduce?1200:3400);hardT=T(reveal,14000);
 var wake=function(){};document.removeEventListener("pointerdown",wake);
}
$("#skip").addEventListener("click",function(){reveal()});
function reveal(){
 if(revealed)return;revealed=true;clearTimeout(introT);clearTimeout(hardT);
 intro.classList.add("closing");body.classList.remove("locked");root.style.overflow="";
 layout();requestAnimationFrame(layout);
 T(function(){layout();body.classList.add("revealed");intro.classList.add("gone");T(function(){intro.remove()},700)},1000);
}

/* layout */
var lastW=0,lastH=0;
function layout(){
 var w=innerWidth,h=innerHeight;lastW=w;lastH=h;
 var hr=w<=380?.38:w<=640?.42:.46,wr=w<=380?.48:w<=640?.52:.58,fl=w<=380?108:w<=640?120:155;
 R=Math.max(fl,Math.min(480,h*hr,w*wr));
 var sc=w<=380?.44:w<=640?.46:.47;cw=Math.round(Math.max(72,R*sc));
 persp=w<=380?620:w<=640?760:w<=900?920:1150;
 root.style.setProperty("--persp",persp+"px");orb.style.setProperty("--cw",cw+"px");
 cards.forEach(function(c){c.el.style.transform="translate3d("+(c.x*R).toFixed(2)+"px,"+(-c.y*R).toFixed(2)+"px,"+(c.z*R).toFixed(2)+"px) rotateY("+c.lon.toFixed(3)+"deg) rotateX("+c.lat.toFixed(3)+"deg)"});
}
function onResize(){var w=innerWidth,h=innerHeight;if(Math.abs(w-lastW)<20&&Math.abs(h-lastH)<20)return;layout()}
on(window,"resize",onResize);
on(window,"orientationchange",function(){T(function(){lastW=lastH=0;layout()},220)});
if(window.visualViewport){on(visualViewport,"resize",onResize);on(visualViewport,"scroll",onResize)}

/* camera loop */
var spin=0,tilt=-4,camZ=0,dragX=0,dragY=0,velX=0,velY=0,PL=32,dragging=false;
function frame(){
 var lit=body.classList.contains("lit");
 if(!dragging&&!lit){dragX+=velX;dragY+=velY;velX*=.94;velY*=.94;if(Math.abs(velX)<.002)velX=0;if(Math.abs(velY)<.002)velY=0}
 if(tilt+dragY>PL)dragY=PL-tilt;if(tilt+dragY<-PL)dragY=-PL-tilt;
 var maxS=innerHeight*.16;if(scrollY>maxS+1)scrollTo(0,maxS);
 var p=Math.max(0,Math.min(1,scrollY/maxS));
 var tgt=p*Math.min(64,R*.12);camZ+=(tgt-camZ)*.075;
 var sx=tilt+dragY,sy=spin+dragX;
 world.style.transform="translateZ("+camZ.toFixed(2)+"px) rotateY("+sy.toFixed(3)+"deg) rotateX("+sx.toFixed(3)+"deg)";
 head.style.transform="rotateX("+(-sx).toFixed(3)+"deg) rotateY("+(-sy).toFixed(3)+"deg) translateZ("+(R*.62).toFixed(1)+"px)";
 head.style.opacity=Math.max(0,1-p*.55).toFixed(3);
 var csx=Math.cos(sx*RAD),snx=Math.sin(sx*RAD),csy=Math.cos(sy*RAD),sny=Math.sin(sy*RAD),near=persp*.66,open=focused>-1&&lit;
 for(var i=0;i<N;i++){
  var c=cards[i],vx=c.x,vy=-c.y,vz=c.z;
  var z1=vy*snx+vz*csx,zf=-vx*sny+z1*csy;
  var base=.14+.86*Math.pow((zf+1)/2,.85),shade=1-Math.min(1,p*1.6),dim=shade*(1-base);
  var absZ=zf*R+camZ,fade=1;if(absZ>near)fade=Math.max(0,1-(absZ-near)/190);
  if(open){dim=Math.min(1,dim+.78);if(i===focused)fade=0}
  dim=Math.round(dim*1000)/1000;fade=Math.round(fade*1000)/1000;
  if(c.o!==fade){c.o=fade;c.el.style.opacity=fade}
  if(c.d!==dim){c.d=dim;c.el.style.setProperty("--d",dim)}
 }
 body.classList.toggle("deep",p>.35);
 if(!dead)requestAnimationFrame(frame);
}
layout();frame();

/* drag */
var down=null;
stage.addEventListener("pointerdown",function(e){
 if(body.classList.contains("lit")||body.classList.contains("menuopen"))return;
 down={id:e.pointerId,type:e.pointerType,x0:e.clientX,y0:e.clientY,lx:e.clientX,ly:e.clientY,moved:0,card:e.target.closest?e.target.closest(".card"):null};
 if(e.pointerType!=="touch"){dragging=true;velX=velY=0;try{stage.setPointerCapture(e.pointerId)}catch(_){}}
});
stage.addEventListener("pointermove",function(e){
 if(!down||e.pointerId!==down.id)return;
 var dx=e.clientX-down.lx,dy=e.clientY-down.ly;down.lx=e.clientX;down.ly=e.clientY;
 var ax=e.clientX-down.x0,ay=e.clientY-down.y0;down.moved=Math.max(down.moved,Math.hypot(ax,ay));
 if(down.type==="touch"&&!dragging){
  if(Math.max(Math.abs(ax),Math.abs(ay))>10){if(Math.abs(ay)>Math.abs(ax)*1.15){down=null;return}dragging=true;velX=velY=0;try{stage.setPointerCapture(e.pointerId)}catch(_){}}else return;
 }
 if(dragging){dragX+=dx*.13;dragY-=dy*.13;velX=dx*.13;velY=-dy*.13}
});
function endDrag(e){
 if(!down||(e.pointerId!==undefined&&e.pointerId!==down.id))return;
 var slop=down.type==="touch"?14:6,card=down.card,moved=down.moved,id=down.id;
 down=null;dragging=false;try{stage.releasePointerCapture(id)}catch(_){}
 if(e.type==="pointerup"&&moved<=slop&&card)openIdx(+card.dataset.idx,card);
}
stage.addEventListener("pointerup",endDrag);stage.addEventListener("pointercancel",endDrag);

/* grid view + menu */
var gridBtn=$("#gridBtn"),menuBtn=$("#menuBtn");
gridBtn.addEventListener("click",function(){body.classList.toggle("gridview")});
function setMenu(on){body.classList.toggle("menuopen",on);menuBtn.setAttribute("aria-expanded",on);menuBtn.setAttribute("aria-label",on?"Close menu":"Open menu");$("#menu").setAttribute("aria-hidden",!on)}
menuBtn.addEventListener("click",function(){setMenu(!body.classList.contains("menuopen"))});
document.querySelectorAll("#menu nav a").forEach(function(a){a.addEventListener("click",function(e){
 if(a.hasAttribute("data-grid")){e.preventDefault();setMenu(false);body.classList.add("gridview")}
 else if(a.getAttribute("href")==="#"){e.preventDefault();setMenu(false)}
})});
gridEl.addEventListener("click",function(e){var f=e.target.closest("figure");if(f)openIdx(+f.dataset.idx,f)});

/* lightbox with FLIP */
var lit=$("#lit"),plate=lit.querySelector(".plate"),litImg=$("#litImg"),tok=0,srcEl=null;
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;")}
function wa(t){return "https://wa.me/923026333536?text="+encodeURIComponent(t)}
function openIdx(i,el){
 var it=items[i];tok++;
 litImg.src=it.src;litImg.alt=it.title;
 $("#litTitle").textContent=it.title;$("#litWhere").textContent=it.place;$("#litNote").textContent=it.note;
 var acts="";
 if(it.k==="prod")acts='<button class="abtn pri" data-add="'+it.pid+'">Add 25 kg to cart</button><a class="abtn" href="shop.html">Open the shop</a><a class="abtn" target="_blank" rel="noopener" href="'+wa("Assalam o Alaikum, I would like to order "+it.title+". Please confirm today\'s rate.")+'">Order on WhatsApp</a>';
 else acts='<a class="abtn pri" href="'+it.href+'">'+esc(it.cta)+'</a><a class="abtn" target="_blank" rel="noopener" href="'+wa("Assalam o Alaikum, I saw "+it.title+" in your gallery and would like to know more.")+'">Ask on WhatsApp</a>';
 $("#litActs").innerHTML=acts;
 srcEl=el||(cards[i]&&cards[i].el);focused=i;
 var r=srcEl.getBoundingClientRect(),pr=plate.getBoundingClientRect();
 var dx=r.left+r.width/2-(pr.left+pr.width/2),dy=r.top+r.height/2-(pr.top+pr.height/2),sc=Math.max(.04,r.width/pr.width);
 plate.style.transition="none";plate.style.transform="translate("+dx+"px,"+dy+"px) scale("+sc+")";plate.style.opacity="0";
 void plate.offsetWidth;
 plate.style.transition="";plate.style.transform="";plate.style.opacity="";
 root.style.overflow="hidden";body.classList.add("lit");
 T(function(){var c=lit.querySelector(".close");c&&c.focus()},60);
}
function closeLit(){
 if(!body.classList.contains("lit"))return;
 focused=-1;
 var r=srcEl&&srcEl.getBoundingClientRect(),pr=plate.getBoundingClientRect();
 body.classList.remove("lit");root.style.overflow="";
 if(r){var dx=r.left+r.width/2-(pr.left+pr.width/2),dy=r.top+r.height/2-(pr.top+pr.height/2),sc=Math.max(.04,r.width/pr.width);
  plate.style.transform="translate("+dx+"px,"+dy+"px) scale("+sc+")";plate.style.opacity="0"}
 T(function(){if(!body.classList.contains("lit")){plate.style.transition="none";plate.style.transform="";plate.style.opacity=""}},640);
}
lit.addEventListener("click",function(e){if(e.target.closest("[data-close]"))closeLit();
 var a=e.target.closest("[data-add]");if(a)addCart(+a.dataset.add)});
on(document,"keydown",function(e){
 if(e.key!=="Escape")return;
 if(body.classList.contains("lit"))closeLit();else if(body.classList.contains("menuopen"))setMenu(false);else if(body.classList.contains("gridview"))body.classList.remove("gridview");
});

/* cart (same storage as the store pages) */
var tt;
function toast(html){var t=$("#toast");t.innerHTML=html;t.classList.add("on");clearTimeout(tt);tt=T(function(){t.classList.remove("on")},4200)}
function addCart(pid){
 if(opts&&opts.addCart)opts.addCart(pid);
 toast("Added 25 kg to your cart.<a href=\"shop.html?cart=1\">View cart</a>");
}

/* custom cursor */
if(matchMedia("(hover:hover) and (pointer:fine)").matches){
 var dot=$("#dot"),mx=-100,my=-100,cx=mx,cy=my;
 on(window,"pointermove",function(e){mx=e.clientX;my=e.clientY});
 on(document,"mouseover",function(e){dot.classList.toggle("wide",!!(e.target.closest&&e.target.closest(".card,a,button,#grid figure")))});
 (function loop(){cx+=(mx-cx)*.2;cy+=(my-cy)*.2;dot.style.transform="translate3d("+cx.toFixed(1)+"px,"+cy.toFixed(1)+"px,0)";(dead||requestAnimationFrame(loop))})();
}
/* first interaction wakes nothing special: intro is pure CSS, so no autoplay gate is needed */
return function cleanup(){
  dead=true;timers.forEach(clearTimeout);offs.forEach(function(f){f()});
  try{history.scrollRestoration="auto"}catch(e){}
  document.body.className="";document.documentElement.style.overflow="";
};
}
