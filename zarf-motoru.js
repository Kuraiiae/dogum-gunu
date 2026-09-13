/* ============================================================
   ZARF MOTORU (zarf-motoru.js)
   URL'den okur: isim, not, yas, hediye(t:|v:), dil, zarf
   Akış: zarf açılır → konfeti/balon → "aşağı kaydır" →
         kart görünür → cümle cümle not → hediye kutusu
   ============================================================ */
(function () {
  'use strict';

  var P = new URLSearchParams(location.search);
  function p(key) { try { return P.get(key) || ''; } catch (e) { return ''; } }

  var ISIM = (p('isim') || '').trim();
  var NOT  = (p('not')  || '').trim();
  var HASHTAG = (p('hashtag') || '').trim();
  var YAS = '';
  if (/^\d{1,3}$/.test(p('yas'))) {
    var yN = parseInt(p('yas'), 10);
    if (yN > 0 && yN < 130) { YAS = String(yN); }
  }
  var GIFT = { turd: '', deger: '' };
  var giftRaw = (p('hediye') || '').trim();
  if (giftRaw) {
    try {
      var g = JSON.parse(giftRaw);
      if (g && typeof g === 'object') {
        GIFT.turd = g.t || g.tur || '';
        GIFT.deger = g.v || g.deger || '';
      }
    } catch (e) {
      var ik = giftRaw.indexOf(':');
      if (ik > 0) {
        GIFT.turd = giftRaw.slice(0, ik).toLowerCase();
        GIFT.deger = giftRaw.slice(ik + 1).trim();
      } else { GIFT.deger = giftRaw; }
    }
  }
  if (!GIFT.turd && GIFT.deger) { GIFT.turd = 'link'; }

  // Dil: ?dil= | navigator.language
  var DIL = (p('dil') || '').toLowerCase();
  if (DIL !== 'tr' && DIL !== 'en') {
    DIL = (navigator.language || 'tr').toLowerCase().indexOf('en') === 0 ? 'en' : 'tr';
  }

  // ====== Metinler ======
  var EN = DIL === 'en';
  var M = {
    zarf: EN ? 'A special gift for you' : 'Sana özel bir hediye',
    davet: EN ? 'Someone wants to celebrate you!' : 'Birileri seni kutlamak istiyor!',
    kaydir: EN ? 'Swipe down' : 'Aşağı kaydır',
    devam: EN ? 'Open' : 'Aç',
    kartBaslik: EN ? 'Happy Birthday!' : 'İyi ki Doğdun!',
    hedBaslik: EN ? 'A Gift For You' : 'Sana Bir Hediye',
    hedAc: EN ? 'Tap to open the gift' : 'Hediyeyi açmak için dokun',
    hedLink: EN ? 'Open Link' : 'Bağlantıyı Aç',
    hedResim: EN ? 'Gift Image' : 'Hediye Resmi',
    hedSoz: EN ? 'A Word From Heart' : 'Kalpten Bir Söz',
    yaSiz: EN
      ? ['The best age is the one you feel...',
         'A birthday worth celebrating, no matter the number!',
         'Some things never count in years: joy, love and you!']
      : ['En güzel yaş, içinde hissettiğindir...',
         'Sayı ne de önemli, sen varsın ya!',
         'Yıllar geçer ama sen hep güzel kalırsın!'],
    yasIle: EN ? 'You turned {y} today. Wonderful!' : 'Bugün {y} yaşına bastın. Harika!',
    eskiYas: EN ? '{y} years around the sun' : '{y} yıldır güneş gibi parıldıyorsun',
    notUst: EN ? 'A few words for you...' : 'Sana birkaç söz...',
    hedLinkHint: EN ? 'Click to open a surprise link' : 'Sürpriz bağlantıyı açmak için tıkla'
  };
  function cevir(k) { return M[k] || k; }
  function doldur(metin) { return (metin || '').split('${y}').join(YAS || '?'); }

  var azHareket = window.matchMedia && window.matchMedia('( prefers-reduced-motion: reduce)').matches;
// ====== DOM yardımcıları ======
  function els(id) { return document.getElementById(id); }
  function elYap(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) { e.className = cls; }
    if (html !== undefined) { e.innerHTML = html; }
    return e;
  }

  if (azHareket) { document.body.classList.add('az-hareket'); }

  // ====== Zarf sahnesi kur ======
  var sahne = elYap('div', 'zarf-sahne');
  sahne.innerHTML =
    '<div class="zf-sus" style="left:8%;top:14%">✨</div>' +
    '<div class="zf-sus" style="left:80%;top:22%">🎈</div>' +
    '<div class="zf-sus" style="left:14%;top:72%">🎀</div>' +
    '<div class="zf-sus" style="left:72%;top:66%">⭐</div>' +
    '<div class="zarf-gorsel">' +
      '<div class="zf-ic">' +
        '<div class="zf-davet">' + cevir('davet') + '</div>' +
        '<div class="zf-isim">' + (ISIM || (EN ? 'Dear friend' : 'Sevgili dostum')) + '</div>' +
      '</div>' +
      '<div class="zg-alt"></div>' +
      '<div class="zg-kapak"></div>' +
      '<div class="zf-kalp">🎂</div>' +
    '</div>' +
    '<div class="zf-balonlar"></div>' +
    '<button type="button" class="zf-kaydir">' +
      '<span>' + cevir('kaydir') + '</span><span class="zf-ok">' + cevir('oku') + '</span>' +
    '</button>';

  document.body.appendChild(sahne);

  // Zarf balonları
  var balonlar = sahne.querySelector('.zf-balonlar');
  var balonIkon = ['🎈', '🎉', '💖', '🧁', '🎀', '⭐', '✨'];
  var i;
  for (i = 0; i < 9; i++) {
    var b = elYap('div', 'zf-balon');
    b.textContent = balonIkon[i % balonIkon.length];
    b.style.left = (4 + Math.random() * 88) + '%';
    b.style.animationDelay = (Math.random() * 3) + 's';
    b.style.animationDuration = (4 + Math.random() * 3) + 's';
    balonlar.appendChild(b);
  }
  function patikVer(x, y, sembol) {
    var sp = elYap('div', 'zf-patik');
    sp.textContent = sembol || '🎉';
    sp.style.left = x + 'px'; sp.style.top = y + 'px';
    sahne.appendChild(sp);
    setTimeout(function () { sp.remove(); }, 950);
  }

  if (!azHareket) {
    setTimeout(function () {
      var genislik = innerWidth || document.documentElement.clientWidth;
      var yk = innerHeight || document.documentElement.clientHeight;
      for (i = 0; i < 22; i++) {
        patikVer((genislik * (0.15 + Math.random() * 0.7)) | 0,
                 (yk * (0.2 + Math.random() * 0.45)) | 0,
                 balonIkon[(Math.random() * balonIkon.length) | 0]);
      }
    }, 350);
  }

  // Zarf açılış sahneleri
  function zarfaTik() {
    if (!sahne.hasAttribute('data-zarf-acik') && !sahne.hasAttribute('data-acildi')) {
      sahne.setAttribute('data-zarf-acik', '1');
    }
  }
  sahne.addEventListener('touchstart', zarfaTik, {passive:true, once:true});

  var gecildi = false;
  function zarfiKaldir() {
    if (gecildi) return;
    gecildi = true;
    sahne.setAttribute('data-zarf-acik', '1');
    setTimeout(function () {
      sahne.setAttribute('data-acildi', '1');
      setTimeout(haydi, 420);
    }, 500);
  }
  var kaydirBtn = sahne.querySelector('.zf-kaydir');
  kaydirBtn.addEventListener('click', zarfiKaldir);
  sahne.addEventListener('touchend', zarfiKaldir, {passive: true});
  document.addEventListener('wheel', function (e) {
    if (sahne.parentNode && e.deltaY > 40) { zarfiKaldir(); }
  }, {passive: true});
// ====== Kart akışı: zarf gittikten sonra ======
  // Mevcut şablonlardaki kart görünür; biz cümle cümle not + hediye ekleriz.
  var isimEl = els('isimYazisi');
  var notEl  = els('notYazisi');
  var butonEl = els('buton');

  function haydi() {
    var mainKart = document.querySelector('main, .sahne, .kart');
    if (!NOT && !GIFT.deger) {
      // not ve hediye yok: sadece mevcut kartın animasyonu devam eder
      document.body.className = document.body.className + ' zarf-gecti';
      return;
    }

    // "Aşağı kaydır" ipucu: sayfayı yavaşça aç (scroll davet)
    var kaydir2 = elYap('button', 'zf-kaydir');
    kaydir2.style.position = 'static';
    kaydir2.style.margin = '1.4rem auto';
    kaydir2.innerHTML = '<span>' + cevir('kaydir') + ' ↓</span>';
    kaydir2.addEventListener('click', function () {
      var hedef = notEl ? notEl.parentNode : document.body;
      hedef.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    var eklendiMi = false;
    if (notEl && notEl.parentNode && !eklendiMi) {
      notEl.parentNode.appendChild(kaydir2);
      eklendiMi = true;
    } else if (mainKart) {
      mainKart.appendChild(kaydir2);
      eklendiMi = true;
    }

    // NOT cümle cümle yaz
    if (notEl && NOT) {
      var orijinal = notEl.textContent;
      notEl.setAttribute('data-son', orijinal);
      notEl.innerHTML = '';
      cumleCumleYaz(notEl, NOT);
    }

    // Yaş bilgisi: dinamik yazı (not üzerinde veya ek bir satırda)
    var yasSatir = elYap('div', 'dinamik-yas');
    var yasMetin;
    if (YAS) {
      yasMetin = M.eskiYas.split('{y}').join(YAS);
    } else {
      var secim = M.yaSiz[(Math.random() * M.yaSiz.length) | 0];
      yasMetin = secim;
    }
    yasSatir.textContent = yasMetin;
    if (yasSatir.parentNode !== notEl) {
      // not kutusunun hemen üstüne ekle
      if (notEl && notEl.parentNode) {
        notEl.parentNode.insertBefore(yasSatir, notEl);
      } else if (mainKart) {
        mainKart.appendChild(yasSatir);
      } else {
        document.body.appendChild(yasSatir);
      }
    }

    // Hediye bölümü
    if (GIFT.deger) {
      setTimeout(hediyeKur, 1200);
    }
  }

  function cumleCumleYaz(hedef, metin) {
    // Nokta / ünlem / soru işaretinden böl (lookbehind gerektirmeyen güvenli yöntem)
    var ara = metin.replace(/([.!?…])\s+/g, '$1\u0000');
    var parcalar = ara.split('\u0000').map(function (s) { return s.trim(); }).filter(function (s) { return s; });
    if (parcalar.length === 0) { parcalar = [metin]; }
    hedef.innerHTML = '';
    var sirasi = 0;
    (function birSonraki() {
      if (sirasi >= parcalar.length) { return; }
      var satir = elYap('span', 'not-satir');
      satir.textContent = parcalar[sirasi];
      satir.style.display = 'block';
      satir.style.marginBottom = '.55rem';
      hedef.appendChild(satir);
      // görünürlük için rAF
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          satir.classList.add('geldi');
          if (sirasi === 0) { satir.classList.add('imlec'); }
          else {
            var onceki = hedef.querySelectorAll('.not-satir')[sirasi - 1];
            if (onceki) { onceki.classList.remove('imlec'); }
          }
        });
      });
      sirasi++;
      var gecikme = azHareket ? 60 : (parcalar[sirasi - 1].length * 42 + 320);
      setTimeout(birSonraki, gecikme);
    })();
  }

  // ====== Hediye kutusu ======
  function hediyeKur() {
    var bolum = elYap('section', 'hediye-bolum');
    var baslik = elYap('div', 'hediye-baslik');
    baslik.textContent = cevir('hedBaslik');
    bolum.appendChild(baslik);

    var kutu = elYap('div', 'hediye-kutu kapak-once');
    var kapak = elYap('div', 'hk-kapak');
    var yazi  = elYap('div', 'hk-yazi');
    yazi.textContent = '🎁';
    kutu.appendChild(yazi);
    kutu.appendChild(kapak);
    bolum.appendChild(kutu);

    var ic = elYap('div', 'hediye-ic');
    bolum.appendChild(ic);

    if (GIFT.turd === 'resim' || GIFT.turd === 'png' || GIFT.turd === 'image') {
      var img = elYap('img', 'resim-hediyesi');
      img.alt = cevir('hedResim');
      img.loading = 'lazy';
      img.onerror = function () { sozDoldur(ic, curGorev); };
      var curGorev = 'resim';
      if (isLink(GIFT.deger)) {
        img.src = GIFT.deger;
        ic.appendChild(img);
        ic.classList.remove('acik');
        kutu.addEventListener('click', function () {
          kutu.classList.add('acik', 'acilacak');
          kutu.classList.remove('kapak-once');
          setTimeout(function () { ic.classList.add('acik'); }, 350);
        });
      } else { sozDoldur(ic, GIFT.deger); }
    } else if (GIFT.turd === 'soz' || GIFT.turd === 'metin' || GIFT.turd === 'quote') {
      sozDoldur(ic, GIFT.deger);
      kutu.addEventListener('click', function () {
        kutu.classList.add('acik', 'acilacak');
        kutu.classList.remove('kapak-once');
        setTimeout(function () { ic.classList.add('acik'); }, 350);
      });
    } else { // link
      var linkText = elYap('a', 'link-hediye', cevir('hedLink') + ' 🔗');
      linkText.target = '_blank'; linkText.rel = 'noopener';
      if (isLink(GIFT.deger)) { linkText.href = GIFT.deger; }
      else { linkText.textContent = GIFT.deger; }
      ic.appendChild(linkText);
      kutu.addEventListener('click', function () {
        kutu.classList.add('acik', 'acilacak');
        kutu.classList.remove('kapak-once');
        setTimeout(function () { ic.classList.add('acik'); }, 350);
      });
    }

    var kaynak = document.querySelector('main, .sahne, .kart') || document.body;
    kaynak.parentNode.insertBefore(bolum, kaynak.nextSibling);
    // scroll animasyonu için görünce highlight
    if ('IntersectionObserver' in window) {
      var goz = new IntersectionObserver(function (kayitlar) {
        kayitlar.forEach(function (k) {
          if (k.isIntersecting) {
            kutu.classList.add('acilacak');
            goz.disconnect();
          }
        });
      }, { threshold: 0.45 });
      goz.observe(kutu);
    }
  }

  function sozDoldur(ic, metin) {
    var p = elYap('p', 'soz-hediye', metin || (EN ? 'A special wish for you.' : 'Sana özel bir dilek.'));
    ic.appendChild(p);
  }

  function isLink(v) {
    return /^(https?:\/\/|data:image\/|\.\.?\/(?!\/)|#)/i.test(v || '');
  }
// ====== Başlangıç: ana bir çalıştırıcı ======
  // ?zarf=1 ile gelen QR linklerinde zarf açılır.
  // index.html önizleme iframe'leri ?zarf=0 gönderir → zarf gösterilmez.
  var zarfParam = p('zarf');

  // Zarf modu: ?zarf=1 veya ?isim geldi ve ?zarf=0 değil
  var ZARF_ACIK = true;
  if (zarfParam === '0') { ZARF_ACIK = false; }
  else if (zarfParam === '1') { ZARF_ACIK = true; }
  else { ZARF_ACIK = !!ISIM; }

  if (ZARF_ACIK) {
    // Sayfa hazır olduğunda zarf sahnesi zaten eklenmişti.
    // Kartın arkasındaki patlamalar zarf kalktığında görünür.
    document.body.classList.add('zarf-modu');
  } else {
    // İndex önizleme: zarf sahnesini kaldır, kart direkt başlasın
    if (sahne && sahne.parentNode) {
      sahne.remove();
    }
  }

  // Hata ayıklama kolaylığı: pencere temizleyicisi
  window.__zarfMotor = {
    ac: zarfiKaldir,
    hediye: hediyeKur,
    yaz: cumleCumleYaz
  };
})();