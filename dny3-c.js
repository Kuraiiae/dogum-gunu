/* BOLUM C: fisekler + adim gozlemi */
(function(){'use strict';var D=window.__dny3;if(!D||!D.sahne)return;
var FR=['#FFD700','#FF3366','#00FFCC','#FF9900','#33CCFF','#FFFFFF',D.vurgu];
function fisek(x,y,n){for(var i=0;i<(n||70);i++){var a=Math.random()*6.283,h=2+Math.random()*5;
D.par.push({x:x,y:y,vx:Math.cos(a)*h,vy:Math.sin(a)*h,o:50+Math.random()*30,r:1+Math.random()*2.4,c:FR[(Math.random()*FR.length)|0]});}}
D.fisek=fisek;
function dongu(){D.sx.clearRect(0,0,D.sky.width,D.sky.height);
for(var i=D.par.length-1;i>=0;i--){var q=D.par[i];q.x+=q.vx;q.y+=q.vy;q.vy+=0.06;q.vx*=0.985;q.vy*=0.985;q.o--;
D.sx.globalAlpha=Math.max(0,q.o/70);D.sx.fillStyle=q.c;D.sx.beginPath();D.sx.arc(q.x,q.y,q.r,0,6.283);D.sx.fill();}
D.sx.globalAlpha=1;requestAnimationFrame(dongu);}
dongu();
var az=(matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);D.azHareket=az;
if(!az){setTimeout(function(){fisek(innerWidth*0.5,innerHeight*0.4,120);},450);
setTimeout(function(){fisek(innerWidth*0.2,innerHeight*0.6,70);},900);
setTimeout(function(){fisek(innerWidth*0.8,innerHeight*0.55,70);},1300);}
var adimlar=D.sahne.querySelectorAll('.dny3-adim');
var bar=document.getElementById('dny3Bar').querySelectorAll('i');
function barG(){var g=0,k;for(k=0;k<adimlar.length;k++){if(adimlar[k].classList.contains('gorunur')){g++;}}
for(k=0;k<bar.length;k++){if(k<g){bar[k].classList.add('dolu');}else{bar[k].classList.remove('dolu');}}}
if('IntersectionObserver' in window){var go=new IntersectionObserver(function(es){
for(var e=0;e<es.length;e++){if(es[e].isIntersecting){es[e].target.classList.add('gorunur');barG();
var dz=es[e].target.querySelectorAll('.dny3-dize');
for(var k=0;k<dz.length;k++){(function(el,idx){setTimeout(function(){el.classList.add('vurgulu');
setTimeout(function(){el.classList.remove('vurgulu');},1600);},idx*900);})(dz[k],k);}}}},{root:D.sahne,threshold:0.3});
for(var a=0;a<adimlar.length;a++){go.observe(adimlar[a]);}
}else{for(var a2=0;a2<adimlar.length;a2++){adimlar[a2].classList.add('gorunur');}barG();}
D.sahne.addEventListener('scroll',function(){D.sky.style.opacity=D.sahne.scrollTop>innerHeight*2.2?'0.25':'1';},{passive:true});
})();
