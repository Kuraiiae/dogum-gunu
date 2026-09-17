/* BÖLÜM A: veri + ŞABLON TEMASI + yardımcılar — Deneyim Çekirdeği 4.1 */
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
document.body.innerHTML='<div><div style="font-size:4rem">&#9203;</div><h1>'+(EN?'This card has expired':'Bu kartın süresi doldu')+'</h1></div>';return;}}
if(qp('zarf')==='0'){return;}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
/* Kelime kelime (isim / kutlama) */
function kelimele(metin,taban,adim){var k=String(metin||'').split(/\s+/).filter(Boolean);
var c='';adim=adim||0.16;
for(var i=0;i<k.length;i++){c+='<span class="hk" style="animation-delay:'+(taban+i*adim).toFixed(2)+'s">'+esc(k[i])+'</span> ';}
return c;}
/* Harf harf (mesaj dizeleri) */
function harfle(metin,taban){var k=String(metin||'').split('');
var c='';var n=0;
for(var i=0;i<k.length;i++){if(k[i]===' '){c+=' ';continue;}
c+='<span class="dk" style="animation-delay:'+(taban+n*0.028).toFixed(2)+'s">'+esc(k[i])+'</span>';n++;}
return c;}

/* ---- ŞABLON TEMALARI: ad, vurgu, zemin1, zemin2, efektler, selam, emojiler ---- */
function t(ad,v,z1,z2,ef,sel,em){return{ad:ad,vurgu:v,z1:z1,z2:z2,efekt:ef.split(','),selam:sel,emoji:em.split(',')};}
var TEMA_AYAR={
 cicek:   t('Çiçek Bahçesi','#FF6B9D','#3A1E33','#120817','yaprak,balon,kivilcim','Bahçenin en güzel çiçeği','🌸,🌷,🌼,🦋,'),
 oyuncak: t('Oyuncak Dünyası','#FFB3D9','#2A1E36','#100A18','balon,konfeti,kalp','Oyuncak dünyası kutlamada','🧸,🎈,,🎁,'),
 ruya:    t('Rüya Diyarı','#B983EF','#241C3A','#0B0814','kabarcik,yildiz,kivilcim','Rüyaların gerçek olsun','✨,☁️,,🌙,💫'),
 muzik:   t('Müzik Sahnesi','#5FD3F3','#10222E','#050B10','nota,kivilcim,konfeti','Şarkılar senin için çalıyor','🎵,🎶,🎧,🎤,💿'),
 sehir:   t('Şehir Işıkları','#7C6CFF','#171A2E','#07070F','isik,kivilcim,konfeti','Şehrin ışıkları senin için yandı','🌃,,🏙️,✨,'),
 yildiz:  t('Yıldız Tozu','#FFD86B','#141C33','#05070E','yildiz,kivilcim,fisek','Bir yıldız daha kaydı','⭐,🌟,💫,🌠,✨'),
 gece:    t('Gece Sessizliği','#FFD700','#0F1626','#03040A','yildiz,kivilcim,fisek','Bu gece tüm gökyüzü senin','🌙,⭐,✨,🕯️,🌌'),
 rose:    t('Gül Bahçesi','#E0577E','#331723','#100509','yaprak,kalp,kivilcim','Güller senin adına açtı','🌹,,💗,✨,🌸'),
 zumrut:  t('Zümrüt Işıltısı','#25D07A','#0E2A24','#03100C','kivilcim,konfeti,yildiz','Zümrüt gibi parlıyorsun',',💎,,✨,🍀'),
 araba:   t('Motor Sesi','#FF5A36','#2A1610','#0C0503','hiz,kivilcim,konfeti','Motorlar senin için gürlüyor','🏎️,🚗,💨,🔥,🏁'),
 dinozor: t('Dinozor Çağı','#7ED957','#182B14','#060F05','yaprak,kivilcim,konfeti','Milyon yıllık bir kutlama','🦖,🦕,🌿,,🌋'),
 futbol:  t('Stadyum','#3DDC84','#12261A','#040C07','konfeti,kivilcim,yildiz','Tribünler senin için ayakta',',🏆,,🎉,🔥'),
 oyun:    t('Oyun Dünyası','#9D4EDD','#1E1030','#080311','kivilcim,konfeti,hiz','Yeni seviye açıldı','🎮,🕹️,👾,,⚡'),
 sokak:   t('Sokak Ritmi','#FF2E88','#1A1026','#07030D','hiz,kivilcim,konfeti','Şehrin ritmi artık senin',',🛹,🌆,🔥,'),
 uzay:    t('Derin Uzay','#6EC8FF','#101A35','#04060F','yildiz,kivilcim,fisek','Yıldızlar senin için parlıyor','🚀,,🌟,🪐,'),
 deniz:   t('Okyanus','#2FC7D6','#0D2331','#03090D','kabarcik,kivilcim,konfeti','Dalgalar senin için coştu','⚓,🐚,🌊,,💙'),
 orman:   t('Orman','#4CAF6E','#12261B','#040C07','yaprak,kivilcim,yildiz','Doğa senin için yeşillendi','🌲,🍃,🍄,🦋,'),
 modern:  t('Modern Minimal','#E8C87A','#17181C','#050506','kivilcim,konfeti,fisek','Sadelik içinde büyük kutlama','🖤,✨,🏅,🎯,✨'),
 konfeti: t('Konfeti Partisi','#FF7BAC','#2A1522','#0D0509','konfeti,fisek,kalp','Konfetiler senin için yağıyor','🎉,,🎈,✨,💖'),
 zarif:   t('Zarif Kutlama','#D9B36C','#1B1A16','#070605','kivilcim,fisek,yildiz','Zarafetinle nice mutlu yaşlara','🥂,✨,,🌿,'),
 kalp:    t('Kalp Atışı','#FF6B9D','#2A1522','#0D0509','kalp,fisek,konfeti','Kalpler senin için atıyor',',🎀,🌸,✨,🎉'),
 fisek:   t('Havai Fişek','#4FA8FF','#101C2E','#04070E','fisek,konfeti,kivilcim','Gökyüzü senin için yanıyor','⚡,🎉,,🚀,⭐')
};
/* Dosya adından tema bul */
var dosya=String(location.pathname||'').split('/').pop().toLowerCase();
var ANAHTAR=['cicek','oyuncak','ruya','muzik','sehir','yildiz','gece','rose','zumrut','araba',
 'dinozor','futbol','oyun','sokak','uzay','deniz','orman','modern'];
var tema='';var ti;
for(ti=0;ti<ANAHTAR.length;ti++){if(dosya.indexOf(ANAHTAR[ti])>-1){tema=ANAHTAR[ti];break;}}
if(!tema){if(dosya.indexOf('genc')>-1){tema='konfeti';}
else if(dosya.indexOf('yetiskin')>-1){tema='zarif';}
else{tema=dosya.indexOf('erkek')>-1?'fisek':'kalp';}}
if(!TEMA_AYAR[tema]){tema='fisek';}
var AY=TEMA_AYAR[tema];
if(dosya.indexOf('erkek')>-1&&tema==='konfeti'){
  AY={ad:AY.ad,vurgu:'#4FA8FF',z1:'#101C2E',z2:'#04070E',efekt:AY.efekt,
    selam:AY.selam,emoji:['🎉','🎊','⚡','','⭐']};}
if(dosya.indexOf('erkek')>-1&&tema==='zarif'){
  AY={ad:'Zarif Kutlama',vurgu:'#9FB8D9',z1:'#14181F',z2:'#050608',
    efekt:['kivilcim','fisek','yildiz'],selam:'Zarafetinle nice mutlu yaşlara',
    emoji:['🥂','✨','🏅','','⚡']};}
function rgbaHex(hex,a){var h=String(hex||'').replace('#','');
if(!/^[0-9a-fA-F]{6}$/.test(h)){return 'rgba(255,215,0,'+a+')';}
var r=parseInt(h.slice(0,2),16),gg=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);
return 'rgba('+r+','+gg+','+b+','+a+')';}
var vurgu=AY.vurgu,parlama=rgbaHex(AY.vurgu,.55);
if(/^[0-9a-fA-F]{6}$/.test(RENK)){vurgu='#'+RENK.toUpperCase();parlama=rgbaHex(vurgu,.55);}
var isimGoster=ISIM||(EN?'Birthday Star':'Doğum Günü Yıldızı');
var kutlama=YAS?(EN?'Happy '+YAS+'th Birthday':'İyi ki doğdun, '+YAS+' yaşındasın')
  :(EN?'Happy Birthday To You':'Doğum Günün Kutlu Olsun');
/* 2. not: dizeler (efektli geçiş için harf harf) */
var dizeler=[],dizi=NOT2?NOT2.split('\n'):[],di;
for(di=0;di<dizi.length;di++){if(dizi[di].trim()){dizeler.push(dizi[di].trim());}}
var dizeHtml='';
for(di=0;di<dizeler.length;di++){
dizeHtml+='<div class="dny3-dize '+(di%2===0?'soldan':'sagdan')+'" data-i="'+di+'">'+harfle(dizeler[di],0)+'</div>';}
/* müzik sözleri (karaoke) */
var muzikSoz=GIFT.lyric||NOT2||'';var sozDizeler=[];
var sd=muzikSoz.split('\n'),si;
for(si=0;si<sd.length;si++){if(sd[si].trim()){sozDizeler.push(sd[si].trim());}}
window.__dny3={ISIM:ISIM,NOT:NOT,NOT2:NOT2,YAS:YAS,RENK:RENK,GIFT:GIFT,EN:EN,dosya:dosya,
 vurgu:vurgu,parlama:parlama,zemin1:AY.z1,zemin2:AY.z2,tema:tema,temaAd:AY.ad,temaEmoji:AY.emoji,
 efekt:AY.efekt,selam:AY.selam,isimGoster:isimGoster,kutlama:kutlama,dizeler:dizeler,
 dizeHtml:dizeHtml,sozDizeler:sozDizeler,esc:esc,kelimele:kelimele,harfle:harfle};
})();