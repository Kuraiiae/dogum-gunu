/* BOLUM D: hediye + zarf + kapanis */
(function(){'use strict';var D=window.__dny3;if(!D||!D.sahne)return;
var hedef=document.getElementById('dny3Hediye');var G=D.GIFT;
function ok(u){return /^https?:\/\//i.test(u||'')?u:'';}
if(G.tur==='resim'&&ok(G.deger)){var im=document.createElement('div');im.className='dny3-onizleme-kart';
var g=document.createElement('img');g.alt='Hediye';g.src=G.deger;
g.onerror=function(){im.innerHTML='<div class="dny3-soz">'+D.esc(G.deger)+'</div>';};
im.appendChild(g);hedef.appendChild(im);}
else if(G.tur==='link'&&ok(G.deger)){var a=document.createElement('a');a.className='dny3-link-btn';
a.href=G.deger;a.target='_blank';a.rel='noopener';a.textContent='Hediyeni Ac';hedef.appendChild(a);}
else if(G.tur==='muzik'&&ok(G.deger)){var mk=document.createElement('div');mk.className='dny3-onizleme-kart';
var au=document.createElement('audio');au.src=G.deger;au.preload='auto';
var satir=document.createElement('div');satir.className='dny3-muzik-satir';
satir.innerHTML='<button class="dny3-oynat" type="button">Oynat</button><div class="dny3-dalga"><span></span><span></span><span></span><span></span></div>';
mk.appendChild(satir);
var sm=G.lyric||D.NOT2||'';var arr=sm.split('\n');var soz=[];for(var i=0;i<arr.length;i++){if(arr[i].trim()){soz.push(arr[i].trim());}}
if(soz.length){var kutu=document.createElement('div');kutu.className='dny3-mesaj-liste';var htm='';
for(var s2=0;s2<soz.length;s2++){htm+='<div class="dny3-dize" style="opacity:1;transform:none">'+D.esc(soz[s2])+'</div>';}
kutu.innerHTML=htm;mk.appendChild(kutu);
au.addEventListener('timeupdate',function(){if(!au.duration)return;
var oran=au.currentTime/au.duration,dz=kutu.querySelectorAll('.dny3-dize');
var ai=Math.min(dz.length-1,Math.floor(oran*dz.length));
for(var d=0;d<dz.length;d++){if(d===ai){dz[d].classList.add('vurgulu');}else{dz[d].classList.remove('vurgulu');}}});}
mk.appendChild(au);hedef.appendChild(mk);
var ob=satir.querySelector('.dny3-oynat'),oyn=false;
ob.addEventListener('click',function(){if(oyn){au.pause();ob.textContent='Oynat';oyn=false;}
else{au.play().then(function(){ob.textContent='Duraklat';oyn=true;}).catch(function(){});}});
try{au.play().catch(function(){});}catch(e){}}
else{var sz=document.createElement('div');sz.className='dny3-soz';
sz.textContent='\u201C'+(G.deger||D.NOT||'Harika bir yil dilerim!')+'\u201D';hedef.appendChild(sz);}
var zarf=document.getElementById('dny3Zarf');
function zarfAc(){zarf.classList.add('acik');
setTimeout(function(){try{hedef.scrollIntoView({behavior:'smooth',block:'nearest'});}catch(e){}},650);
if(!D.azHareket){D.fisek(innerWidth*0.5,innerHeight*0.35,90);}}
zarf.addEventListener('click',zarfAc);
zarf.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();zarfAc();}});
document.getElementById('dny3Tekrar').addEventListener('click',function(){D.sahne.scrollTo({top:0,behavior:'smooth'});
if(!D.azHareket){setTimeout(function(){D.fisek(innerWidth*0.5,innerHeight*0.4,110);},500);}});
document.getElementById('dny3SablonLink').addEventListener('click',function(e){e.preventDefault();
document.body.style.overflow='';D.sahne.style.display='none';});
})();
