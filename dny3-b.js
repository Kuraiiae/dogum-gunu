/* BÖLÜM B: sahne iskeleti — 3 SAYFA (Deneyim Çekirdeği 4.2, kişiye özel)
   1: fişek + isim + kutlama + İLK NOT (aşağı düğmesi)
   2: kişisel özel not (aşağı düğmesi; boşsa atlanır)
   3: hediye zarfı (tıkla → zarftan çıkar → otomatik video/müzik + önizlemeli link) */
(function(){'use strict';var D=window.__dny3;if(!D)return;var EN=D.EN,E=D.esc;
var em=(D.temaEmoji||[]).filter(function(x){return !!x;});
if(!em.length){em=['✨','🎉','⭐'];}
var sahne=document.createElement('div');
sahne.className='dny3-sahne';sahne.id='dny3Sahne';
sahne.setAttribute('role','dialog');
sahne.setAttribute('aria-modal','true');
sahne.setAttribute('aria-label',EN?'Birthday surprise':'Doğum günü sürprizi');
sahne.style.setProperty('--dny-vurgu',D.vurgu);
sahne.style.setProperty('--dny-parlama',D.parlama);
sahne.style.setProperty('--dny-zemin1',D.zemin1);
sahne.style.setProperty('--dny-zemin2',D.zemin2);
var i,h='';
h+='<canvas class="dny3-gokyuzu" id="dny3Sky" aria-hidden="true"></canvas>';
h+='<div class="dny3-flas" id="dny3Flas" aria-hidden="true"></div>';
h+='<div class="dny3-emojiler" id="dny3Emoji" aria-hidden="true"></div>';

/* ============ 1. SAYFA: fişek + isim + kutlama + İLK NOT ============ */
h+='<section class="dny3-sayfa" data-sayfa="0" aria-label="'+(EN?'Greeting':'Karşılama')+'"><div class="dny3-sayfa-ic"><div class="dny3-kart">';
h+='<div class="dny3-kalpbuyu">'+(em[0]||'🎉')+'</div>';
h+='<h1 class="dny3-isim">'+D.kelimele(D.isimGoster,0.55,0.18)+'</h1>';
h+='<div class="dny3-kutlama">'+D.kelimele(D.kutlama,1.15,0.1)+'</div>';
h+='<div class="dny3-sus-satir" aria-hidden="true">';
for(i=0;i<em.length;i++){h+='<span style="animation-delay:'+(1.5+i*0.14).toFixed(2)+'s">'+em[i]+'</span>';}
h+='</div>';
if(D.NOT){
  h+='<div class="dny3-ilknot"><span class="ilknot-baslik">'+(EN?'A wish for you':'Senin için bir dilek')+'</span><p>'+E(D.NOT)+'</p></div>';
}else{
  h+='<div class="dny3-altnot">'+E(D.selam||'')+'</div>';
}
h+='<button class="dny3-asagi" type="button" data-git="1" aria-label="'+(EN?'Go down':'Aşağı in')+'"><span class="asagi-met">'+(EN?'Down':'Aşağı')+'</span><span class="ok">&#8964;</span></button>';
h+='<span class="klavye-ipucu" aria-hidden="true">'+(EN?'↓ ↑ keys work too':'↓ ↑ tuşlarıyla da geçebilirsin')+'</span>';
h+='</div></div></section>';

/* ============ 2. SAYFA: KİŞİSEL ÖZEL NOT (boşsa atlanır) ============ */
h+='<section class="dny3-sayfa'+(D.dizeler.length?'':' gizli-sayfa')+'" data-sayfa="1" aria-label="'+(EN?'Personal note':'Kişisel not')+'"><div class="dny3-sayfa-ic"><div class="dny3-kart">';
h+='<h2 class="dny3-baslik">'+(EN?'A Few Words Just For You':'Sana Özel Birkaç Söz')+'</h2>';
h+='<div class="dny3-mesaj" id="dny3Mesaj">'+D.dizeHtml+'</div>';
h+='<div class="dny3-dize-sayac" aria-hidden="true"><span>'+(EN?'Lines':'Dize')+'</span><b id="dny3Sayac">0/'+D.dizeler.length+'</b></div>';
h+='<button class="dny3-asagi" type="button" data-git="2" aria-label="'+(EN?'Go to the gift':'Hediyeye git')+'"><span class="asagi-met">'+(EN?'Your gift':'Hediyen')+'</span><span class="ok">&#8964;</span></button>';
h+='<span class="klavye-ipucu" aria-hidden="true">'+(EN?'↓ ↑ keys work too':'↓ ↑ tuşlarıyla da geçebilirsin')+'</span>';
h+='</div></div></section>';
window.__dny3.__h=h;window.__dny3.__em=em;

/* ============ 3. SAYFA: HEDİYE ZARFI (tıkla → zarftan çıkar, otomatik oynar) ============ */
h+='<section class="dny3-sayfa" data-sayfa="2" aria-label="'+(EN?'Gift':'Hediye')+'"><div class="dny3-sayfa-ic"><div class="dny3-kart">';
h+='<h2 class="dny3-baslik">'+(EN?'Your Gift':'Hediyen')+'</h2>';
h+='<div class="dny3-zarf-sahne"><div class="dny3-zarf" id="dny3Zarf" role="button" tabindex="0" aria-label="'+(EN?'Open the gift':'Hediyeyi aç')+'">';
h+='<div class="dny3-zarf-govde"></div><div class="dny3-zarf-kapak"></div>';
h+='<div class="dny3-zarf-muhur">🎁</div>';
h+='<div class="dny3-zarf-bekleme">'+(EN?'Open me':'Beni aç')+'</div>';
h+='</div></div>';
h+='<div class="dny3-zarf-ipucu">'+(EN?'Tap the envelope':'Zarfın üstüne dokun')+'</div>';
h+='<div class="dny3-mektup" id="dny3Mektup" aria-live="polite">';
h+='<div class="dny3-mektup-ust"><b>'+(EN?'With love':'Sevgiyle')+'</b><em>'+E(D.isimGoster)+'</em></div>';
h+='<div class="dny3-mektup-not" id="dny3MektupNot"></div>';
h+='<div class="dny3-mektup-imza" id="dny3MektupImza"></div>';
h+='<div class="dny3-hediye" id="dny3Hediye"></div>';
h+='</div>';
if(!D.hediyeVar){
  h+='<div class="dny3-bos-kapanis"><div class="buyuk">&#127874;</div>';
  h+='<div class="dny3-kutlama">'+D.kelimele(EN?'Happy Birthday!':'Nice mutlu yıllara!',0.25,0.12)+'</div>';
  h+='<div class="dny3-altnot">'+E(D.selam||'')+'</div></div>';
}
h+='</div></div></section>';

sahne.innerHTML=h;
document.body.appendChild(sahne);
document.body.style.overflow='hidden';
window.__dny3Aktif=true;
D.sahne=sahne;
window.__dny3.noktalar=sahne.querySelectorAll('.dny3-nokta');
window.__dny3.sayfalar=[].slice.call(sahne.querySelectorAll('.dny3-sayfa'));

/* ---- gökyüzü canvas ---- */
var sky=document.getElementById('dny3Sky'),sx=sky?sky.getContext('2d'):null;
function boy(){if(!sky){return;}sky.width=window.innerWidth;sky.height=window.innerHeight;}
boy();window.addEventListener('resize',boy);
D.sky=sky;D.sx=sx;D.par=[];

/* ---- tema emojileri: yumuşak ambiyans ---- */
var kap=document.getElementById('dny3Emoji');
if(kap&&em.length){
  for(i=0;i<14;i++){
    var s=document.createElement('span');
    s.textContent=em[i%em.length];
    s.style.left=(2+Math.random()*94).toFixed(1)+'%';
    s.style.animationDuration=(11+Math.random()*9).toFixed(1)+'s';
    s.style.animationDelay=(-Math.random()*14).toFixed(1)+'s';
    s.style.fontSize=(1+Math.random()*1.1).toFixed(2)+'rem';
    kap.appendChild(s);
  }
}

/* ---- açılışta 1. sayfa görünür olsun ---- */
setTimeout(function(){
  var ilk=sahne.querySelector('.dny3-sayfa[data-sayfa="0"]');
  if(ilk){ilk.classList.add('gorunur');}
  if(document.title.indexOf('Doğum')===-1&&!EN){
    document.title='Doğum günün kutlu olsun'+(D.ISIM?', '+D.ISIM:'')+'! '+(em[0]||'🎉');
  }
},60);
})();