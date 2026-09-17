/* BÖLÜM C: tema efekt motoru (havai fişek & şablona özel partiküller) + sayfa sayfa akış
   Deneyim Çekirdeği 4.1 */
(function(){'use strict';var D=window.__dny3;if(!D||!D.sahne)return;
var sahne=D.sahne,sky=D.sky,ctx=D.sx,par=D.par;
var sayfalar=D.sayfalar||[],noktalar=D.noktalar;
var EN=D.EN;
var azHareket=false;
try{azHareket=window.matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){}
var PALET=[D.vurgu,'#FFFFFF','#FFD700','#FF6B9D','#5FD3F3',D.vurgu];
function rr(a,b){return a+Math.random()*(b-a);}
function palet(){return PALET[Math.floor(Math.random()*PALET.length)];}

/* ---------- parçacık üretimi ---------- */
function pEkle(o){if(par.length<1100){par.push(o);}}
function fisek(x,y,renk){
  var n=azHareket?26:74,i;
  for(i=0;i<n;i++){
    var a=Math.random()*Math.PI*2,s=rr(1.6,5.8);
    pEkle({tur:'nokta',x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,renk:renk||palet(),
      omur:rr(46,88),maks:88,boy:rr(1.6,3.4),g:0.045,surt:0.985});
  }
  for(i=0;i<12;i++){
    var a2=Math.random()*Math.PI*2,s2=rr(.6,2.1);
    pEkle({tur:'yildiz',x:x,y:y,vx:Math.cos(a2)*s2,vy:Math.sin(a2)*s2,renk:'#FFFFFF',
      omur:rr(60,112),maks:112,boy:rr(2,4.4),g:0.02,surt:0.99,tit:0.05,faz:rr(0,6)});
  }
}
function serp(tur,sayi,y0){
  var i;sayi=sayi||1;
  for(i=0;i<sayi;i++){
    var x=rr(0,sky.width),y=(typeof y0==='number')?y0:rr(-40,sky.height*.3);
    if(tur==='balon'){pEkle({tur:'balon',x:x,y:sky.height+rr(10,120),vx:rr(-.3,.3),vy:rr(-1.6,-.85),
      renk:palet(),omur:rr(240,430),maks:430,boy:rr(9,17),g:0,wob:rr(.6,1.6),faz:rr(0,6)});}
    else if(tur==='yaprak'){pEkle({tur:'yaprak',x:x,y:y,vx:rr(-.45,.8),vy:rr(.75,1.8),
      renk:palet(),omur:rr(210,390),maks:390,boy:rr(6,12),g:0.004,dond:rr(-.05,.05),aci:rr(0,6)});}
    else if(tur==='konfeti'){pEkle({tur:'konfeti',x:x,y:y,vx:rr(-1,1),vy:rr(1,2.7),
      renk:palet(),omur:rr(180,330),maks:330,boy:rr(3,6.4),g:0.01,dond:rr(-.2,.2),aci:rr(0,6)});}
    else if(tur==='kalp'){pEkle({tur:'kalp',x:x,y:sky.height+rr(10,90),vx:rr(-.4,.4),vy:rr(-1.4,-.62),
      renk:palet(),omur:rr(220,410),maks:410,boy:rr(7,14),g:0,wob:rr(.5,1.3),faz:rr(0,6)});}
    else if(tur==='yildiz'){pEkle({tur:'yildiz',x:x,y:rr(0,sky.height*.85),vx:rr(-.22,.22),vy:rr(-.13,.1),
      renk:'#FFFFFF',omur:rr(250,470),maks:470,boy:rr(1.4,3.6),g:0,tit:rr(.03,.11),faz:rr(0,6)});}
    else if(tur==='kivilcim'){pEkle({tur:'nokta',x:x,y:sky.height+rr(0,40),vx:rr(-.6,.6),vy:rr(-2.7,-1),
      renk:palet(),omur:rr(70,155),maks:155,boy:rr(1.2,2.7),g:0.012,surt:0.985});}
    else if(tur==='kabarcik'){pEkle({tur:'kabarcik',x:x,y:sky.height+rr(10,80),vx:rr(-.25,.25),vy:rr(-1.15,-.5),
      renk:palet(),omur:rr(210,390),maks:390,boy:rr(4,12),g:0,wob:rr(.4,1.1),faz:rr(0,6)});}
    else if(tur==='nota'){pEkle({tur:'nota',x:x,y:sky.height+rr(10,60),vx:rr(-.35,.35),vy:rr(-1.6,-.75),
      renk:palet(),omur:rr(200,350),maks:350,boy:rr(13,23),g:0,wob:rr(.5,1.4),faz:rr(0,6)});}
    else if(tur==='isik'){pEkle({tur:'isik',x:x,y:sky.height,vx:0,vy:0,
      renk:palet(),omur:rr(130,250),maks:250,boy:rr(3,9),g:0});}
    else if(tur==='hiz'){pEkle({tur:'hiz',x:rr(-140,sky.width),y:rr(sky.height*.25,sky.height),
      vx:rr(7.5,15),vy:rr(-.5,.5),renk:palet(),omur:rr(42,84),maks:84,boy:rr(26,80),g:0});}
  }
}
/* ---------- çizim ---------- */
function alfa(p){var f=p.omur/p.maks;return f>1?1:(f<0?0:f);}
function kalpCiz(c,x,y,b,a,renk){
  c.save();c.globalAlpha=a;c.fillStyle=renk||'#FF6B9D';c.translate(x,y);c.scale(b/14,b/14);
  c.beginPath();c.moveTo(0,4);
  c.bezierCurveTo(-8,-6,-14,2,0,12);
  c.bezierCurveTo(14,2,8,-6,0,4);
  c.fill();c.restore();
}
function ciz(p){
  var a=alfa(p);
  if(p.tur==='nokta'){ctx.globalAlpha=a;ctx.fillStyle=p.renk;
    ctx.beginPath();ctx.arc(p.x,p.y,p.boy*a+0.4,0,6.2832);ctx.fill();}
  else if(p.tur==='yildiz'){ctx.globalAlpha=a;ctx.strokeStyle=p.renk;ctx.lineWidth=1.6;
    ctx.beginPath();ctx.moveTo(p.x-p.boy,p.y);ctx.lineTo(p.x+p.boy,p.y);
    ctx.moveTo(p.x,p.y-p.boy);ctx.lineTo(p.x,p.y+p.boy);ctx.stroke();}
  else if(p.tur==='balon'){ctx.globalAlpha=a*.9;ctx.fillStyle=p.renk;
    ctx.beginPath();ctx.ellipse(p.x,p.y,p.boy*.78,p.boy,0,0,6.2832);ctx.fill();
    ctx.globalAlpha=a*.5;ctx.strokeStyle='rgba(255,255,255,.7)';ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(p.x,p.y+p.boy);ctx.lineTo(p.x,p.y+p.boy*2.4);ctx.stroke();}
  else if(p.tur==='yaprak'){ctx.globalAlpha=a*.92;ctx.fillStyle=p.renk;
    ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.aci);
    ctx.beginPath();ctx.ellipse(0,0,p.boy*.42,p.boy,0,0,6.2832);ctx.fill();ctx.restore();}
  else if(p.tur==='konfeti'){ctx.globalAlpha=a;ctx.fillStyle=p.renk;
    ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.aci);
    ctx.fillRect(-p.boy/2,-p.boy/4,p.boy,p.boy/2);ctx.restore();}
  else if(p.tur==='kalp'){kalpCiz(ctx,p.x,p.y,p.boy,a,p.renk);}
  else if(p.tur==='kabarcik'){ctx.globalAlpha=a*.75;ctx.strokeStyle=p.renk;ctx.lineWidth=1.3;
    ctx.beginPath();ctx.arc(p.x,p.y,p.boy,0,6.2832);ctx.stroke();}
  else if(p.tur==='nota'){ctx.globalAlpha=a;ctx.fillStyle=p.renk;
    ctx.font='700 '+Math.round(p.boy)+'px Georgia,serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText('\u266A',p.x,p.y);}
  else if(p.tur==='isik'){ctx.globalAlpha=a*.32;
    var gr=ctx.createLinearGradient(p.x,p.y,p.x,p.y-sky.height*.55);
    gr.addColorStop(0,p.renk);gr.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=gr;ctx.fillRect(p.x-p.boy/2,p.y-sky.height*.55,p.boy,sky.height*.55);}
  else if(p.tur==='hiz'){ctx.globalAlpha=a*.55;ctx.strokeStyle=p.renk;ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-p.boy,p.y);ctx.stroke();}
  ctx.globalAlpha=1;
}
/* ---------- animasyon döngüsü ---------- */
var donguAcik=false;
function dongu(){
  if(!sky||!ctx){return;}
  ctx.globalCompositeOperation='destination-out';
  ctx.fillStyle='rgba(0,0,0,0.2)';
  ctx.fillRect(0,0,sky.width,sky.height);
  ctx.globalCompositeOperation='source-over';
  var i,p;
  for(i=par.length-1;i>=0;i--){
    p=par[i];
    if(p.wob){p.faz+=0.045;p.x+=p.vx+Math.sin(p.faz)*p.wob;}
    else{p.x+=p.vx;}
    p.y+=p.vy;
    if(p.g){p.vy+=p.g;}
    if(p.surt){p.vx*=p.surt;p.vy*=p.surt;}
    if(p.dond){p.aci+=p.dond;}
    p.omur--;
    if(p.omur<=0||p.y>sky.height+150||p.y<-170||p.x<-220||p.x>sky.width+220){par.splice(i,1);continue;}
    ciz(p);
  }
  requestAnimationFrame(dongu);
}
if(!azHareket&&sky&&ctx){donguAcik=true;requestAnimationFrame(dongu);}

/* ---------- ambiyans: sürekli hafif tema efektleri ---------- */
var ortamZaman=null;
function ortamBasla(){
  if(azHareket||ortamZaman){return;}
  ortamZaman=setInterval(function(){
    if(document.hidden){return;}
    var ef=D.efekt||[],tur=ef[Math.floor(Math.random()*ef.length)]||'kivilcim';
    serp(tur,Math.random()<0.35?4:2);
  },850);
}
function fisekPatlat(sayi){
  if(azHareket||!sky){return;}
  var i;
  for(i=0;i<sayi;i++){
    (function(n){
      setTimeout(function(){
        fisek(rr(sky.width*.12,sky.width*.88),rr(sky.height*.1,sky.height*.5));
      },n*420);
    })(i);
  }
}
/* ---------- animasyon sıfırlama (tekrar izle) ---------- */
function animSifirla(kok){
  if(!kok){return;}
  var els=kok.querySelectorAll('.hk,.dk'),i,el;
  for(i=0;i<els.length;i++){
    el=els[i];
    var d=el.style.animationDelay||'0s';
    el.setAttribute('data-ad',d);
    el.style.animation='none';
  }
  void kok.offsetWidth;
  for(i=0;i<els.length;i++){
    el=els[i];
    el.style.animation='';
    el.style.animationDelay=el.getAttribute('data-ad')||'0s';
  }
}

/* ---------- sayfa akışı (4.2: SADECE düğme; elle kaydırma kilitli) ---------- */
var aktif=-1,otoAcik=false,dizideZaman=[],sayfaFisekZaman=null;
function noktaGuncelle(){
  if(!noktalar){return;}
  var i;
  for(i=0;i<noktalar.length;i++){
    noktalar[i].classList.toggle('dolu',i<=aktif);
    noktalar[i].setAttribute('aria-selected',i===aktif?'true':'false');
  }
}
/* 2. sayfa: dizeler sırayla belirir + parlar */
function dizeBaslat(){
  var kutu=document.getElementById('dny3Mesaj');
  if(!kutu){return;}
  var i;
  for(i=0;i<dizideZaman.length;i++){clearTimeout(dizideZaman[i]);}
  dizideZaman=[];
  var dz=[].slice.call(kutu.querySelectorAll('.dny3-dize'));
  var bos=kutu.querySelector('.dny3-mesaj-bos');
  var sayac=document.getElementById('dny3Sayac');
  for(i=0;i<dz.length;i++){
    dz[i].classList.remove('gorundu','vurgulu');
    animSifirla(dz[i]);
  }
  if(bos){bos.classList.remove('gorundu');
    dizideZaman.push(setTimeout(function(){bos.classList.add('gorundu');},450));}
  if(sayac){sayac.textContent='0/'+dz.length;}
  for(i=0;i<dz.length;i++){
    (function(el,n){
      dizideZaman.push(setTimeout(function(){
        el.classList.add('gorundu');
        dizideZaman.push(setTimeout(function(){
          el.classList.add('vurgulu');
          if(sayac){sayac.textContent=(n+1)+'/'+dz.length;}
          if(!azHareket&&Math.random()<0.7){
            var r=el.getBoundingClientRect();
            fisek(r.left+r.width*(0.25+Math.random()*0.5),r.top+r.height/2);
          }
          dizideZaman.push(setTimeout(function(){el.classList.remove('vurgulu');},1600));
        },430));
      },520+n*1150));
    })(dz[i],i);
  }
}
/* ---------- 4.3: olu kod temizligi (sureBul/otoZamanla kaldirildi: otomatik gecis YOK) ---------- */
function sayfaEtkinlestir(i,yon){
  var j;
  for(j=0;j<sayfalar.length;j++){sayfalar[j].classList.toggle('gorunur',j===i);}
  /* 4.3: hedef karta yön bazlı sinematik giriş (ileri: sağdan-alttan, geri: soldan-üstten) */
  var hsayfa=sayfalar[i];
  if(hsayfa){
    var kart=hsayfa.querySelector('.dny3-kart');
    if(kart){
      kart.classList.remove('giris-ileri','giris-geri');
      /* animasyonu yeniden tetiklemek için akışı zorla */
      void kart.offsetWidth;
      kart.classList.add(yon<0?'giris-geri':'giris-ileri');
    }
  }
  /* 4.3: geçiş flaşı + fişek senkronu */
  flasCak();
  aktif=i;
  noktaGuncelle();
  /* 1. sayfada ek kutlama: hem girişte hem beklerken fisek yağmuru */
  if(sayfaFisekZaman){clearInterval(sayfaFisekZaman);sayfaFisekZaman=null;}
  if(i===0){
    fisekPatlat(3);
    if(!azHareket){sayfaFisekZaman=setInterval(function(){
      if(aktif!==0){clearInterval(sayfaFisekZaman);sayfaFisekZaman=null;return;}
      if(document.hidden){return;}
      fisek(rr(sky.width*.12,sky.width*.88),rr(sky.height*.1,sky.height*.45));
    },1400);}
  }
  else if(i===1){dizeBaslat();fisekPatlat(1);}
  else if(i===2){if(typeof D.zarfBaslat==='function'){D.zarfBaslat();}}
  /* (sayfa 3 dali + oto cagri kaldirildi: iskelet 3 sayfa) */
}
/* 4.3: geçiş flaşı — vurgu renginde kısa ışık çakar (hareket azaltmada kapalı) */
function flasCak(){
  if(azHareket){return;}
  var f=document.getElementById('dny3Flas');
  if(!f){return;}
  f.classList.remove('cak');
  void f.offsetWidth;
  f.classList.add('cak');
}
function oncekiHedef(i){
  /* 4.3: geri dönüşte de boş sayfaları atla — dizeler boşsa 2. sayfadan 0'a */
  var j=i;
  if(j===1&&!(D.dizeler&&D.dizeler.length)){j=0;}
  if(j<0){j=0;}
  if(j>=sayfalar.length){j=sayfalar.length-1;}
  return j;
}
function sonrakiHedef(i){
  /* 4.2: boş sayfaları atla — 2. not yoksa 1. sayfadan direkt zarfa */
  var j=i;
  if(j===1&&!(D.dizeler&&D.dizeler.length)){j=2;}
  if(j<0){j=0;}
  if(j>=sayfalar.length){j=sayfalar.length-1;}
  return j;
}
function git(i,yon){
  i=sonrakiHedef(i);
  if(i<0||i>=sayfalar.length){return;}
  var hedef=sayfalar[i];
  try{hedef.scrollIntoView({behavior:azHareket?'auto':'smooth',block:'start'});}
  catch(e){hedef.scrollIntoView();}
  if(i!==aktif){sayfaEtkinlestir(i,yon||0);}
}
function geri(i){
  /* 4.3: ↑ ile geri dönüş — boş sayfa atlanır; zarf sayfasından çıkınca müzik durur */
  i=oncekiHedef(i);
  if(i<0||i>=sayfalar.length){return;}
  if(aktif===2&&i!==2&&typeof D.muzikDuraklat==='function'&&D.caliyor){D.muzikDuraklat();}
  var hedef=sayfalar[i];
  try{hedef.scrollIntoView({behavior:azHareket?'auto':'smooth',block:'start'});}
  catch(e){hedef.scrollIntoView();}
  if(i!==aktif){sayfaEtkinlestir(i,-1);}
}
/* 4.2: scroll kilitli — geçiş SADECE .dny3-asagi düğmeleriyle.
   (Dokunma/tekerlek/ok sayfa değiştirmez; zarf içindeki mektup kendi içinde kayar.) */
function kaydirmaKilidi(ev){
  var t=ev.target;
  while(t&&t!==sahne){
    if(t.classList&&(t.classList.contains('dny3-mektup')||t.classList.contains('dny3-soz-kutu'))){return;}
    t=t.parentNode;
  }
  ev.preventDefault();
}
try{sahne.addEventListener('wheel',kaydirmaKilidi,{passive:false});}catch(e){sahne.addEventListener('wheel',kaydirmaKilidi);}
try{sahne.addEventListener('touchmove',kaydirmaKilidi,{passive:false});}catch(e){sahne.addEventListener('touchmove',kaydirmaKilidi);}
sahne.classList.add('kilitli');
var asagiDugmeler=sahne.querySelectorAll('.dny3-asagi');
var ai;
for(ai=0;ai<asagiDugmeler.length;ai++){
  (function(b){
    b.addEventListener('click',function(){git(parseInt(b.getAttribute('data-git'),10)||0,1);});
  })(asagiDugmeler[ai]);
}
/* 4.3: klavye ile sayfa geçişi — ↓/PageDown ileri, ↑/PageUp geri.
   Tekerlek kilitli kalır; yazı alanlarındayken ve PIN ekranı açıkken çalışmaz. */
function klavyeKur(){
  document.addEventListener('keydown',function(ev){
    if(!window.__dny3Aktif){return;}
    if(window.__dny3PinAcik){return;}
    var k=ev.key||'';
    var ileri=(k==='ArrowDown'||k==='PageDown');
    var gerik=(k==='ArrowUp'||k==='PageUp');
    if(!ileri&&!gerik){return;}
    var t=ev.target;
    if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT'||t.isContentEditable)){return;}
    ev.preventDefault();
    if(ileri){
      if(aktif===0){git(1,1);}
      else if(aktif===1){git(2,1);}
    }else{
      if(aktif===2){geri(1);}
      else if(aktif===1){geri(0);}
    }
  });
}
klavyeKur();
/* zarf: TIKLA -> animasyonla açılır (açılış ve medya BÖLÜM D'de) */
var zarfEl=document.getElementById('dny3Zarf');
if(zarfEl){
  function zarfTik(){
    if(zarfEl.classList.contains('acik')){return;}
    zarfEl.classList.add('acik');
    if(typeof D.zarfiAc==='function'){D.zarfiAc();}
    else if(typeof D.mektupAc==='function'){D.mektupAc();}
  }
  zarfEl.addEventListener('click',zarfTik);
  zarfEl.addEventListener('keydown',function(ev){
    if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();zarfTik();}
  });
}
document.addEventListener('visibilitychange',function(){
  if(document.hidden&&typeof D.muzikDuraklat==='function'&&D.caliyor){D.muzikDuraklat();}
});

/* ---------- başlat ---------- */
ortamBasla();
setTimeout(function(){sayfaEtkinlestir(0);},120);

/* dışarıya açılan API (D bölümü kullanır) */
D.fisek=fisek;D.serp=serp;D.git=git;D.fisekPatlat=fisekPatlat;D.animSifirla=animSifirla;
D.azHareket=azHareket;D.aktifGetir=function(){return aktif;};
})();