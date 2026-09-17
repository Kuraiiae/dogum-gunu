/* BÖLÜM D: zarf (kendiliğinden gelir + otomatik açılır) · mektup · hediye (müzik/yazı)
   Deneyim Çekirdeği 4.1 */
(function(){'use strict';
var D=window.__dny3;if(!D||!D.sahne)return;
var EN=D.EN,G=D.GIFT,E=D.esc,AH=D.azHareket;
var zarfEl=document.getElementById('dny3Zarf');
var mektup=document.getElementById('dny3Mektup');
var notEl=document.getElementById('dny3MektupNot');
var imzaEl=document.getElementById('dny3MektupImza');
var hedEl=document.getElementById('dny3Hediye');
var zamanlar=[],muzik=null,sozSatirlar=[],sozSayac=null,acikMi=false;
D.caliyor=false;

function sonra(fn,ms){var t=setTimeout(fn,AH?0:ms);zamanlar.push(t);return t;}
function temizle(){var i;for(i=0;i<zamanlar.length;i++){clearTimeout(zamanlar[i]);}zamanlar=[];}
function diziYap(metin){return String(metin||'').split(/\s+/).filter(Boolean);}
/* mektup: kelime kelime yazılan metin */
function mektupYazisi(metin){
  if(!notEl){return;}
  var k=diziYap(metin),h='',i;
  if(!k.length){notEl.innerHTML='<span class="harf" style="animation-delay:.15s">'+
    E(EN?'With love…':'(Mektup notu girilmemiş)')+'</span>';return;}
  for(i=0;i<k.length;i++){
    h+='<span class="harf" style="animation-delay:'+(0.25+i*0.055).toFixed(2)+'s">'+E(k[i])+'</span> ';
  }
  notEl.innerHTML=h;
}
function imzaYaz(){
  if(!imzaEl){return;}
  var em=(D.temaEmoji||[])[0]||'';
  imzaEl.innerHTML='— '+E(D.isimGoster)+' '+(AH?'':('<span class="harf" style="animation-delay:1.1s">'+em+'</span>'));
}
/* ---- zarf: kendiliğinden gelir, otomatik açılır ---- */
function zarfBaslat(){
  temizle();
  acikMi=false;
  if(mektup){mektup.classList.remove('mektup-acik');}
  if(!zarfEl){mektupAc();return;}
  zarfEl.classList.remove('acik','geldi');
  /* mektup metni + imza hazırlanır */
  mektupYazisi(D.NOT2||D.NOT);
  imzaYaz();
  sonra(function(){zarfEl.classList.add('geldi');},180);
  sonra(function(){zarfiAc();},1900);
}
function zarfiAc(){
  if(acikMi){return;}
  acikMi=true;
  if(!zarfEl){mektupAc();return;}
  zarfEl.classList.add('acik');
  if(!AH&&D.fisekPatlat){D.fisekPatlat(2);}
  sonra(mektupAc,950);
}
function mektupAc(){
  if(!mektup||mektup.classList.contains('mektup-acik')){return;}
  mektup.classList.add('mektup-acik');
  if(!AH&&D.fisekPatlat){D.fisekPatlat(2);}
  sonra(muzikDene,900);
}
D.zarfBaslat=zarfBaslat;D.zarfiAc=zarfiAc;D.mektupAc=mektupAc;

/* ---------- hediye içeriği ---------- */
function medyaEtiket(t){return '<span class="dny3-medya-etiket">'+E(t)+'</span>';}
function hediyeKur(){
  if(!hedEl){return;}
  hedEl.innerHTML='';
  var tur=(G.tur||'none').toLowerCase(),deger=G.deger||'';
  if(tur==='none'||!deger){return;}
  if(tur==='resim'){
    var img=document.createElement('img');
    img.alt=EN?'Gift image':'Hediye görseli';
    img.loading='lazy';
    img.addEventListener('error',function(){
      hedEl.innerHTML='<div class="dny3-soz">'+
        '<div class="dny3-medya-etiket">'+E(EN?'Note':'Söz')+'</div>'+E(deger)+'</div>';
    });
    var sarmal=document.createElement('div');
    sarmal.className='dny3-onizleme-kart';
    sarmal.innerHTML=medyaEtiket(EN?'Photo preview':'Resim önizleme');
    sarmal.appendChild(img);
    hedEl.appendChild(sarmal);
    img.src=deger;
  } else if(tur==='link'){
    hedEl.innerHTML='<a class="dny3-link-btn" href="'+E(deger)+'" target="_blank" rel="noopener noreferrer">'+
      E(EN?'Open gift link':'Hediye bağlantısını aç')+' 🔗</a>';
  } else if(tur==='soz'){
    hedEl.innerHTML='<div class="dny3-soz">'+E(deger)+'</div>';
  } else if(tur==='muzik'){
    hedEl.innerHTML=
      '<div class="dny3-muzik-satir">'+
        '<button class="dny3-oynat" id="dny3Oynat" type="button" aria-label="'+
          (EN?'Play':'Çal')+'">&#9654;</button>'+
        '<span class="dny3-dalga durgun" id="dny3Dalga" aria-hidden="true">'+
          '<span></span><span></span><span></span><span></span><span></span></span>'+
        '<span class="dny3-calan" id="dny3Calan">'+
          E(EN?'Gift music':'Hediye müziği')+'</span>'+
      '</div>'+
      '<audio id="dny3Ses" preload="none" playsinline src="'+E(deger)+'"></audio>'+
      (D.sozDizeler&&D.sozDizeler.length?'<div class="dny3-soz-kutu" id="dny3SozKutu" aria-label="'+
        (EN?'Lyrics':'Şarkı sözleri')+'"></div>':'');
  } else if(tur==='video'){
    hedEl.innerHTML='<video class="dny3-medya-video" id="dny3Ses" controls preload="none" playsinline src="'+
      E(deger)+'"></video>';
  }
}

/* ---------- müzik çalar + söz takibi (karaoke) ---------- */
function dalgaAyarla(caliyor){
  var d=document.getElementById('dny3Dalga');
  if(d){d.classList.toggle('durgun',!caliyor);}
  var b=document.getElementById('dny3Oynat');
  if(b){b.innerHTML=caliyor?'&#10074;&#10074;':'&#9654;';
    b.setAttribute('aria-label',caliyor?(EN?'Pause':'Duraklat'):(EN?'Play':'Çal'));}
}
function sozKur(){
  var kutu=document.getElementById('dny3SozKutu');
  if(!kutu||!D.sozDizeler||!D.sozDizeler.length){return;}
  var i,h='';
  for(i=0;i<D.sozDizeler.length;i++){
    h+='<div class="dny3-soz-satir" data-s="'+i+'">'+E(D.sozDizeler[i])+'</div>';
  }
  kutu.innerHTML=h;
  sozSatirlar=[].slice.call(kutu.querySelectorAll('.dny3-soz-satir'));
}
function sozVurgula(i){
  var k;
  for(k=0;k<sozSatirlar.length;k++){
    sozSatirlar[k].classList.toggle('aktif',k===i);
  }
  if(sozSatirlar[i]&&sozSatirlar[i].scrollIntoView){
    try{sozSatirlar[i].scrollIntoView({block:'nearest',behavior:AH?'auto':'smooth'});}catch(e){}
  }
  if(!AH&&i>=0&&Math.random()<0.5&&D.fisek){
    D.fisek(window.innerWidth*(0.15+Math.random()*0.7),window.innerHeight*0.55);
  }
}
function sozTakip(){
  if(!muzik||!sozSatirlar.length){return;}
  var sure=muzik.duration,an=muzik.currentTime;
  if(!sure||!isFinite(sure)||sure<=0){return;}
  var i=Math.floor(an/sure*sozSatirlar.length);
  if(i>=sozSatirlar.length){i=sozSatirlar.length-1;}
  if(i!==sozSayac){sozSayac=i;sozVurgula(i);}
}
function muzikDene(){
  if(!muzik){return;}
  var p=muzik.play();
  if(p&&p.then){
    p.then(function(){D.caliyor=true;dalgaAyarla(true);},function(){
      D.caliyor=false;dalgaAyarla(false);
      var b=document.getElementById('dny3Oynat');
      if(b){b.classList.add('dny3-nabiz');}
    });
  } else { D.caliyor=true;dalgaAyarla(true); }
}
function muzikKur(){
  muzik=document.getElementById('dny3Ses');
  sozSatirlar=[];sozSayac=-1;
  if(!muzik){return;}
  sozKur();
  dalgaAyarla(false);
  var b=document.getElementById('dny3Oynat');
  if(b){
    b.addEventListener('click',function(){
      if(muzik.paused){muzikDene();}else{muzik.pause();}
    });
  }
  muzik.addEventListener('play',function(){D.caliyor=true;dalgaAyarla(true);});
  muzik.addEventListener('pause',function(){D.caliyor=false;dalgaAyarla(false);});
  muzik.addEventListener('ended',function(){D.caliyor=false;dalgaAyarla(false);
    for(var k=0;k<sozSatirlar.length;k++){sozSatirlar[k].classList.remove('aktif');}});
  muzik.addEventListener('timeupdate',sozTakip);
  muzik.addEventListener('error',function(){
    var c=document.getElementById('dny3Calan');
    if(c){c.textContent=EN?'Audio could not be loaded':'Müzik yüklenemedi';}
  });
}
function muzikDurdur(){
  if(muzik){try{muzik.pause();muzik.currentTime=0;}catch(e){}}
  D.caliyor=false;dalgaAyarla(false);
  var k;for(k=0;k<sozSatirlar.length;k++){sozSatirlar[k].classList.remove('aktif');}
  sozSayac=-1;
}
function muzikDuraklat(){
  if(muzik&&!muzik.paused){try{muzik.pause();}catch(e){}}
  D.caliyor=false;dalgaAyarla(false);
}
D.muzikDurdur=muzikDurdur;D.muzikDuraklat=muzikDuraklat;D.caliyorGetir=function(){return D.caliyor;};

/* ---------- zarf sıfırlama (tekrar izle) ---------- */
function zarfSifirla(){
  temizle();acikMi=false;
  muzikDurdur();
  if(zarfEl){zarfEl.classList.remove('acik','geldi');}
  if(mektup){mektup.classList.remove('mektup-acik');}
  if(notEl){notEl.innerHTML='';}
  if(imzaEl){imzaEl.innerHTML='';}
}
D.zarfSifirla=zarfSifirla;

/* ---------- kurulum ---------- */
hediyeKur();
muzikKur();
})();