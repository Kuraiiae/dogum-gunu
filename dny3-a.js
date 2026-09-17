/* BOLUM A: veri + yardimcilar */
(function(){'use strict';
var P=new URLSearchParams(location.search);
function qp(k){try{return P.get(k)||'';}catch(e){return '';}}
var ISIM=(qp('isim')||'').trim();
var NOT=(qp('not')||'').trim();
var NOT2=(qp('not2')||'').trim();
var YAS='';if(/^\d{1,3}$/.test(qp('yas'))){var yn=parseInt(qp('yas'),10);if(yn>0&&yn<130){YAS=String(yn);}}
var RENK=(qp('renk')||'').trim();
var GIFT={tur:'none',deger:'',lyric:''};
var raw=(qp('hediye')||'').trim();
if(raw){try{var g=JSON.parse(raw);
if(g&&typeof g==='object'){GIFT.tur=g.t||g.tur||'';GIFT.deger=g.v||g.deger||'';GIFT.lyric=g.l||g.lyric||'';}
}catch(e){var ik=raw.indexOf(':');
if(ik>0){GIFT.tur=raw.slice(0,ik).toLowerCase();GIFT.deger=raw.slice(ik+1).trim();}
else{GIFT.deger=raw;GIFT.tur='soz';}}}
var DIL=(qp('dil')||'').toLowerCase();
if(DIL!=='tr'&&DIL!=='en'){DIL=(navigator.language||'tr').toLowerCase().indexOf('en')===0?'en':'tr';}
var EN=DIL==='en';
var EXP=qp('exp');
if(EXP){var eS=parseInt(EXP,10),nS=Math.floor(Date.now()/1000);
if(!isNaN(eS)&&nS>eS){document.body.innerHTML='';
document.body.style.cssText='margin:0;padding:2rem;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#090C12;color:#FFF;text-align:center;font-family:system-ui,sans-serif;';
document.body.innerHTML='<div><div style="font-size:4rem">X</div><h1>'+(EN?'This card has expired':'Bu kartin suresi doldu')+'</h1></div>';return;}}
if(qp('zarf')==='0'){return;}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function kelimele(metin,taban){var k=String(metin||'').split(/\s+/).filter(Boolean);var c='';
for(var i=0;i<k.length;i++){c+='<span class="kelime" style="animation-delay:'+(taban+i*0.16).toFixed(2)+'s">'+esc(k[i])+'</span> ';}
return c;}
var vurgu='#FFD700',parlama='rgba(255,215,0,.55)';
if(/^[0-9a-fA-F]{6}$/.test(RENK)){vurgu='#'+RENK.toUpperCase();
var r=parseInt(RENK.slice(0,2),16),gg=parseInt(RENK.slice(2,4),16),bb=parseInt(RENK.slice(4,6),16);
parlama='rgba('+r+','+gg+','+bb+',.55)';}
var isimGoster=ISIM||(EN?'Birthday Star':'Dogum Gunu Yildizi');
var kutlama=YAS?(EN?'Happy '+YAS+'th Birthday':'Iyi ki dogdun, '+YAS+' yasindasin'):(EN?'Happy Birthday To You':'Dogum Gunun Kutlu Olsun');
var dizeler=NOT2?NOT2.split('\n'):[];var temiz=[];for(var di=0;di<dizeler.length;di++){if(dizeler[di].trim()){temiz.push(dizeler[di].trim());}}
var dizeHtml='';if(temiz.length){for(var dj=0;dj<temiz.length;dj++){dizeHtml+='<div class="dny3-dize">'+esc(temiz[dj])+'</div>';}}
else{dizeHtml='<div class="dny3-mesaj-bos">'+esc(EN?'No personal message.':(NOT||'Bu kart sevgiyle hazirlandi.'))+'</div>';}
window.__dny3={ISIM:ISIM,NOT:NOT,NOT2:NOT2,YAS:YAS,RENK:RENK,GIFT:GIFT,EN:EN,vurgu:vurgu,parlama:parlama,isimGoster:isimGoster,kutlama:kutlama,dizeHtml:dizeHtml,esc:esc,kelimele:kelimele};
})();
