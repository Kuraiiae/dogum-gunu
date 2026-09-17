/* BÖLÜM B: sahne iskeleti — 4 SAYFALI ANİMASYONLU KARŞILAMA (Deneyim Çekirdeği 4.1) */
(function(){'use strict';var D=window.__dny3;if(!D)return;var EN=D.EN,E=D.esc;
var em=(D.temaEmoji||[]).filter(function(x){return !!x;});
if(!em.length){em=['✨','🎉','⭐'];}
var sahne=document.createElement('div');
sahne.className='dny3-sahne';sahne.id='dny3Sahne';
sahne.style.setProperty('--dny-vurgu',D.vurgu);
sahne.style.setProperty('--dny-parlama',D.parlama);
sahne.style.setProperty('--dny-zemin1',D.zemin1);
sahne.style.setProperty('--dny-zemin2',D.zemin2);
var i,h='';
h+='<canvas class="dny3-gokyuzu" id="dny3Sky" aria-hidden="true"></canvas>';
h+='<div class="dny3-emojiler" id="dny3Emoji" aria-hidden="true"></div>';
/* üst bar: 4 adım göstergesi + oto akış düğmesi */
h+='<div class="dny3-ustbar"><div class="dny3-noktalar" id="dny3Bar" role="tablist" aria-label="'+(EN?'Pages':'Sayfalar')+'">';
for(i=0;i<4;i++){h+='<button class="dny3-nokta" type="button" data-git="'+i+'" role="tab" aria-label="'+(i+1)+'. '+(EN?'page':'sayfa')+'"></button>';}
h+='</div><button class="dny3-oto" id="dny3Oto" type="button" aria-pressed="true">'+(EN?'Auto flow: ON':'Oto akış: Açık')+'</button></div>';

/* ============ 1. SAYFA: tema efekti + havai fişek + isim (kelime kelime) ============ */
h+='<section class="dny3-sayfa" data-sayfa="0" aria-label="'+(EN?'Greeting':'Karşılama')+'"><div class="dny3-sayfa-ic"><div class="dny3-kart">';
h+='<span class="dny3-rozet"><i></i>'+(EN?'1/4 · Fireworks':'1/4 · Havai Fişekler')+'</span>';
h+='<div class="dny3-kalpbuyu">'+(em[0]||'🎉')+'</div>';
h+='<h1 class="dny3-isim">'+D.kelimele(D.isimGoster,0.55,0.18)+'</h1>';
h+='<div class="dny3-kutlama">'+D.kelimele(D.kutlama,1.15,0.1)+'</div>';
h+='<div class="dny3-sus-satir" aria-hidden="true">';
for(i=0;i<em.length;i++){h+='<span style="animation-delay:'+(1.5+i*0.14).toFixed(2)+'s">'+em[i]+'</span>';}
h+='</div>';
h+='<div class="dny3-altnot">'+E(D.selam||'')+(D.NOT?'<br>'+E(D.NOT):'')+'</div>';
h+='<div class="dny3-kaydir"><span>'+(EN?'Auto scrolling':'Otomatik geçiyor')+'</span><span class="ok">&#8964;</span></div>';
h+='</div></div></section>';

/* ============ 2. SAYFA: kişisel mesaj / şarkı sözleri (efektli geçişler) ============ */
h+='<section class="dny3-sayfa" data-sayfa="1" aria-label="'+(EN?'Message':'Kişisel mesaj')+'"><div class="dny3-sayfa-ic"><div class="dny3-kart">';
h+='<span class="dny3-rozet"><i></i>'+(EN?'2/4 · Message':'2/4 · Kişisel Mesaj')+'</span>';
h+='<h2 class="dny3-baslik">'+(EN?'A Note Just For You':'Sana Özel Notlar')+'</h2>';
h+='<div class="dny3-mesaj" id="dny3Mesaj">'+(D.dizeler.length?D.dizeHtml
  :'<div class="dny3-mesaj-bos">'+E(D.NOT||(EN?'Made with love':'Sevgiyle hazırlandı'))+'</div>')+'</div>';
h+='<div class="dny3-dize-sayac"><span>'+(EN?'Lines':'Dize')+'</span><b id="dny3Sayac">0/'+D.dizeler.length+'</b></div>';
h+='<div class="dny3-kaydir"><span>'+(EN?'Keep going':'Devam ediyor')+'</span><span class="ok">&#8964;</span></div>';
h+='</div></div></section>';
window.__dny3.__h=h;window.__dny3.__em=em;window.__dny3.__sahne=sahne;

/* ============ 3. SAYFA: hediye zarfı (kendiliğinden gelir + otomatik açılır) ============ */
h+='<section class="dny3-sayfa" data-sayfa="2" aria-label="'+(EN?'Gift':'Hediye')+'"><div class="dny3-sayfa-ic"><div class="dny3-kart">';
h+='<span class="dny3-rozet"><i></i>'+(EN?'3/4 · Gift':'3/4 · Hediye Zarfı')+'</span>';
h+='<h2 class="dny3-baslik">'+(EN?'Your Gift Envelope':'Hediye Zarfın')+'</h2>';
h+='<div class="dny3-zarf-sahne"><div class="dny3-zarf" id="dny3Zarf" role="button" tabindex="0" aria-label="'+(EN?'Open gift':'Hediyeyi aç')+'">';
h+='<div class="dny3-zarf-govde"></div><div class="dny3-zarf-kapak"></div>';
h+='<div class="dny3-zarf-muhur">🎁</div>';
h+='<div class="dny3-zarf-bekleme">'+(EN?'Opening…':'Zarf açılıyor…')+'</div>';
h+='</div></div>';
h+='<div class="dny3-zarf-ipucu">'+(EN?'It opens by itself':'Kendiliğinden açılır')+'</div>';
h+='<div class="dny3-mektup" id="dny3Mektup">';
h+='<div class="dny3-mektup-ust"><b>'+(EN?'With love':'Sevgiyle')+'</b><em>'+(EN?'Personal letter':'Kişisel mektup')+'</em></div>';
h+='<div class="dny3-mektup-not" id="dny3MektupNot"></div>';
h+='<div class="dny3-mektup-imza" id="dny3MektupImza"></div>';
h+='<div class="dny3-hediye" id="dny3Hediye"></div>';
h+='</div>';
h+='</div></div></section>';

/* ============ 4. SAYFA: final ============ */
h+='<section class="dny3-sayfa" data-sayfa="3" aria-label="'+(EN?'Finale':'Final')+'"><div class="dny3-sayfa-ic"><div class="dny3-kart">';
h+='<span class="dny3-rozet"><i></i>'+(EN?'4/4 · Finale':'4/4 · Final')+'</span>';
h+='<div class="dny3-final">';
h+='<div class="buyuk">🎂</div>';
h+='<h2 class="dny3-isim" style="font-size:clamp(1.7rem,6.4vw,2.5rem)">'+D.kelimele(EN?'Happy Birthday!':'Nice mutlu yaşlara!',0.25,0.14)+'</h2>';
h+='<div class="dny3-final-sus" aria-hidden="true">';
for(i=0;i<em.length;i++){h+='<span style="animation-delay:'+(0.6+i*0.12).toFixed(2)+'s">'+em[i]+'</span>';}
h+='</div>';
h+='<div class="dny3-altnot">'+E(D.temaAd)+' '+em.slice(0,3).join(' ')+'</div>';
h+='<button class="dny3-tekrar" id="dny3Tekrar" type="button">'+(EN?'Watch again':'Tekrar İzle')+'</button>';
h+='<a class="dny3-sablon-link" id="dny3SablonLink" href="#">'+(EN?'See the card design':'Kart tasarımını gör')+'</a>';
h+='</div></div></div></section>';

h+='<div class="dny3-altbar"><a href="index.html">'+(EN?'Create a card':'Kart oluştur')+'</a>';
h+='<a href="#" id="dny3Paylas">'+(EN?'Copy link':'Bağlantıyı kopyala')+'</a></div>';

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