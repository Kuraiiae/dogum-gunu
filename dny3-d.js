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
  var t=String(metin||'').trim();
  /* 4.2: boş bırakılan not YOK sayılır — mektupta yer kaplamaz */
  if(!t){notEl.innerHTML='';notEl.style.display='none';return;}
  notEl.style.display='';
  var k=diziYap(t),h='',i;
  for(i=0;i<k.length;i++){
    h+='<span class="harf" style="animation-delay:'+(0.25+i*0.055).toFixed(2)+'s">'+E(k[i])+'</span> ';
  }
  notEl.innerHTML=h;
}
function imzaYaz(){
  if(!imzaEl){return;}
  /* 4.2: isim girilmediyse imza da gösterilmez */
  if(!D.ISIM){imzaEl.innerHTML='';imzaEl.style.display='none';return;}
  imzaEl.style.display='';
  var em=(D.temaEmoji||[])[0]||'';
  imzaEl.innerHTML='— '+E(D.isimGoster)+' '+(AH?'':('<span class="harf" style="animation-delay:1.1s">'+em+'</span>'));
}
/* ---- zarf: kendiliğinden gelir, otomatik açılır ---- */
function zarfBaslat(){
  /* 4.2: zarf sayfa açılınca YERİNDE durur; AÇILIŞ SADECE TIKLAMAYLA olur.
     Hediye yoksa (boş bırakıldıysa) zarf hiç gösterilmez (yok sayılır). */
  temizle();
  acikMi=false;
  if(mektup){mektup.classList.remove('mektup-acik');}
  var zarfSahneEl=zarfEl?zarfEl.parentNode:null;
  if(!D.hediyeVar){
    if(zarfEl){zarfEl.style.display='none';}
    if(zarfSahneEl&&zarfSahneEl.classList){zarfSahneEl.style.display='none';}
    var ip=zarfEl?zarfEl.closest('.dny3-sayfa'):null;
    var ipucu=ip?ip.querySelector('.dny3-zarf-ipucu'):document.querySelector('.dny3-zarf-ipucu');
    if(ipucu){ipucu.style.display='none';}
    var kapanis=document.querySelector('.dny3-bos-kapanis');
    if(kapanis){kapanis.classList.add('gorundu');}
    if(D.fisekPatlat){D.fisekPatlat(4);}
    return;
  }
  if(!zarfEl){mektupAc();return;}
  zarfEl.style.display='';
  if(zarfSahneEl&&zarfSahneEl.classList){zarfSahneEl.style.display='';}
  zarfEl.classList.remove('acik');
  /* 4.2: geri gelindiğinde ipucu yeniden görünür */
  var ipucu0=document.querySelector('.dny3-zarf-ipucu');
  if(ipucu0){ipucu0.style.display='';ipucu0.style.opacity='';}
  /* mektup metni + imza hazırlanır */
  mektupYazisi(D.NOT2||D.NOT);
  imzaYaz();
  sonra(function(){zarfEl.classList.add('geldi');},180);
  /* OTOMATİK AÇILIŞ YOK — kullanıcı zarfa dokununca zarfiAc() çağrılır */
}
function zarfiAc(){
  if(acikMi){return;}
  acikMi=true;
  if(!zarfEl){mektupAc();return;}
  zarfEl.classList.add('acik');
  /* 4.2: zarf açıldı → "üstüne dokun" ipucu kaybolur */
  var ip=document.querySelector('.dny3-zarf-ipucu');
  if(ip){ip.style.opacity='0';}
  if(!AH&&D.fisekPatlat){D.fisekPatlat(2);}
  sonra(mektupAc,950);
}
function mektupAc(){
  if(!mektup||mektup.classList.contains('mektup-acik')){return;}
  mektup.classList.add('mektup-acik');
  if(!AH&&D.fisekPatlat){D.fisekPatlat(2);}
  sonra(muzikDene,900);
  sonra(videoDene,700);
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
    /* 4.2: ONIZLEMELI LINK — video/GIF gomulu oynaticiyla otomatik oynar, digerleri kart onizlemesiyle */
    var LK=String(deger||'').trim();
    var guvenli=/^https?:\/\//i.test(LK);
    var videoMu=/\.(mp4|webm|ogg|mov)(\?|#|$)/i.test(LK)||/^https?:\/\/(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\//i.test(LK);
    var gorselMu=/\.(gif|webp|png|jpe?g)(\?|#|$)/i.test(LK);
    if(!guvenli){
      hedEl.innerHTML='<div class="dny3-soz"><div class="dny3-medya-etiket">'+E(EN?'Note':'Not')+'</div>'+E(LK)+'</div>';
    } else if(videoMu){
      hedEl.innerHTML='<div class="dny3-onizleme-kart">'+medyaEtiket(EN?'Video gift — auto plays':'Videolu hediye — otomatik oynar')+
        '<video class="dny3-medya-video" src="'+E(LK)+'" controls playsinline loop muted autoplay preload="metadata"></video>'+
        '<a class="dny3-link-btn" style="margin-top:.6rem" href="'+E(LK)+'" target="_blank" rel="noopener noreferrer">'+
        E(EN?'Open in new tab':'Yeni sekmede aç')+' &#128279;</a></div>';
    } else if(gorselMu){
      hedEl.innerHTML='<div class="dny3-onizleme-kart">'+medyaEtiket(EN?'Preview':'Önizleme')+
        '<img src="'+E(LK)+'" alt="'+E(EN?'Gift preview':'Hediye önizleme')+'" loading="lazy">'+
        '<a class="dny3-link-btn" style="margin-top:.6rem" href="'+E(LK)+'" target="_blank" rel="noopener noreferrer">'+
        E(EN?'Open gift link':'Hediye bağlantısını aç')+' &#128279;</a></div>';
    } else {
      hedEl.innerHTML='<div class="dny3-onizleme-kart">'+medyaEtiket(EN?'Link preview':'Bağlantı önizleme')+
        '<div class="dny3-link-adres">'+E(LK)+'</div>'+
        '<a class="dny3-link-btn" style="margin-top:.6rem" href="'+E(LK)+'" target="_blank" rel="noopener noreferrer">'+
        E(EN?'Open gift link':'Hediye bağlantısını aç')+' &#128279;</a></div>';
    }
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
function videoDene(){
  /* 4.2: mektuptaki video/GIF önizlemeleri kendiliğinden oynar (sessiz + döngü) */
  var vids=document.querySelectorAll('#dny3Mektup video');
  var vi;
  for(vi=0;vi<vids.length;vi++){
    try{
      vids[vi].muted=true;
      var pr=vids[vi].play();
      if(pr&&pr.catch){pr.catch(function(){});}
    }catch(e){}
  }
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