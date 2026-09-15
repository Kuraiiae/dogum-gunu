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

  // ====== QR Geçerlilik Süresi Kontrolü (7 gün) ======
  var EXP = p('exp');
  if (EXP) {
    var expSec = parseInt(EXP, 10);
    var nowSec = Math.floor(Date.now() / 1000);
    if (!isNaN(expSec) && nowSec > expSec) {
      var EN_exp = (p('dil') || '').toLowerCase() === 'en' ||
                   ((navigator.language || 'tr').toLowerCase().indexOf('en') === 0);
      document.body.innerHTML = '';
      document.body.style.cssText = [
        'margin:0;padding:0;min-height:100vh;',
        'display:flex;align-items:center;justify-content:center;',
        'background:linear-gradient(135deg,#FBF6EA 0%,#F1E8D4 100%);',
        'font-family:system-ui,sans-serif;'
      ].join('');
      var surehDiv = document.createElement('div');
      surehDiv.style.cssText = 'text-align:center;padding:2.5rem 2rem;max-width:420px;width:90%;';
      surehDiv.innerHTML =
        '<div style="font-size:4rem;margin-bottom:1rem;display:inline-block;' +
          'animation:sureKalp 2s ease-in-out infinite">⏰</div>' +
        '<h1 style="font-size:1.6rem;color:#332C22;margin:0 0 .8rem;font-weight:700;">' +
          (EN_exp ? 'This card has expired' : 'Bu kartın süresi doldu') +
        '</h1>' +
        '<p style="color:#82745E;font-size:.98rem;line-height:1.65;margin:0 0 1.6rem;">' +
          (EN_exp
            ? 'Birthday cards are valid for <strong>7 days</strong> from creation.<br>Ask the sender to create a new one! 🎂'
            : 'Doğum günü kartları oluşturulduğundan itibaren <strong>7 gün</strong> geçerlidir.<br>Gönderenden yeni bir kart oluşturmasını iste! 🎂') +
        '</p>' +
        '<div style="background:#fff;border:1px solid rgba(75,62,40,.16);border-radius:16px;' +
          'padding:1.1rem 1.3rem;font-size:.9rem;color:#82745E;box-shadow:0 8px 24px -12px rgba(75,62,40,.2);">' +
          '🎉 ' + (EN_exp ? 'Create free cards at' : 'Ücretsiz kart oluşturmak için') +
          ' <a href="/" style="color:#9C7A3C;font-weight:700;text-decoration:none;">doğumgünü.com</a>' +
        '</div>';
      var expStil = document.createElement('style');
      expStil.textContent = '@keyframes sureKalp{0%,100%{transform:rotate(-12deg) scale(1)}50%{transform:rotate(12deg) scale(1.15)}}';
      document.head.appendChild(expStil);
      document.body.appendChild(surehDiv);
      return;
    }
  }

  // ====== Metinler ======
  var EN = DIL === 'en';
  var M = {
    zarf: EN ? 'A special gift for you' : 'Sana özel bir hediye',
    davet: EN ? 'Someone wants to celebrate you!' : 'Birileri seni kutlamak istiyor!',
    kaydir: EN ? 'Swipe down' : 'Aşağı kaydır',
    devam: EN ? 'Open' : 'Aç',
    kartBaslik: EN ? 'Happy Birthday!' : 'İyi ki Doğdun!',
    kutlama: EN ? 'Happy Birthday to You!' : 'Doğum günün kutlu olsun!',
    kutlamaAlt: EN ? 'Happy birthday' : 'İyi ki doğdun',
    niceSenelere: EN ? 'Many more happy years ahead! 🥳' : 'Nice senelere! 🥳',
    hedBaslik: EN ? 'A Gift For You' : 'Sana Bir Hediye',
    hedAc: EN ? 'Tap to open the gift' : 'Hediyeyi açmak için dokun',
    hedLink: EN ? 'Open Link' : 'Bağlantıyı Aç',
    hedResim: EN ? 'Gift Image' : 'Hediye Resmi',
    hedMuzik: EN ? 'Gift Music' : 'Hediye Müziği',
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
        '<div class="zf-kutlama">' + cevir('kutlama') + '</div>' +
        '<div class="zf-kutlama-alt">' + cevir('kutlamaAlt') + ' 🎉</div>' +
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
      for (i = 0; i < 40; i++) {
        patikVer((genislik * (0.08 + Math.random() * 0.84)) | 0,
                 (yk * (0.12 + Math.random() * 0.55)) | 0,
                 balonIkon[(Math.random() * balonIkon.length) | 0]);
      }
    }, 250);
    // Konfeti yağmuru: zarf ekranda kaldığı sürece periyodik patlar
    var konfetiDongu = setInterval(function () {
      if (!sahne.parentNode || sahne.hasAttribute('data-acildi')) { clearInterval(konfetiDongu); return; }
      var genislik = innerWidth || document.documentElement.clientWidth;
      var yk = innerHeight || document.documentElement.clientHeight;
      for (var k = 0; k < 8; k++) {
        patikVer((genislik * Math.random()) | 0, (yk * Math.random() * 0.5) | 0,
                 balonIkon[(Math.random() * balonIkon.length) | 0]);
      }
    }, 1400);
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

    // === YENİ AKILLI ŞENLIK AKIŞI ===

    // 1. Şenlik/animasyon göster (atajı ateşleme efekti)
    var celebration = elYap('div', 'celebration-overlay');
    celebration.innerHTML = '\n      <div class="celebration-content">\n        <h1 class="celebration-title">🎉</h1>\n        <div class="celebration-fireworks"></div>\n      </div>\n    ';
    document.body.appendChild(celebration);

    // 2. İsim ve "Doğum günün kutlu olsun" + ilk not göster
    var isimNotBasligi = elYap('div', 'isim-not-basligi');
    isimNotBasligi.innerHTML = '\n      <div class="isim-basligi">' + (ISIM || 'Sevgili') + '</div>\n      <div class="kutlu-baslik">' + cevir('kutlama') + '</div>\n      <div class="ilk-not">' + (NOT || '') + '</div>\n    ';
    document.body.appendChild(isimNotBasligi);

    // 3. Aşağı kaydır ipucu (şablona uygun animasyonlu)
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

    // 4. İkinci notu zarf içinde göster (zarf hâlâ görünüyorsa ve not varsa)
    // Zarfı hâlâ göster ve ikinci notu göster (sadece not varsa)
    if (NOT) {
      var zarfIkinciNot = elYap('div', 'zarf-ikinci-not');
      zarfIkinciNot.innerHTML = '\n      <div class="zarf-ic-ikinci-not">' + NOT + '</div>\n    ';
      // Zarf hâlâ DOM'da olduğu için onu bul ve içeriğini güncelle
      var zarfSahne = document.querySelector('.zarf-sahne');
      if (zarfSahne) {
        // Zarf içeriğine ikinci not ekle
        var zarfIc = zarfSahne.querySelector('.zf-ic');
        if (zarfIc) {
          var ikinciNotEl = elYap('div', 'zarf-ikinci-not-el');
          ikinciNotEl.textContent = NOT;
          zarfIc.appendChild(ikinciNotEl);
        }
      }
    }

    // 5. Yaş bilgisi
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

    // 6. Zamanlama: not yoksa hemen, varsa 7 saniye sonra hediye
    var hediyeGecikmesi = NOT ? 7000 : 0; // 7 saniye not varsa, yoksa hemen

    setTimeout(function() {
      // Şenlik overlayini kaldır
      if (celebration && celebration.parentNode) {
        celebration.parentNode.removeChild(celebration);
      }
      if (isimNotBasligi && isimNotBasligi.parentNode) {
        isimNotBasligi.parentNode.removeChild(isimNotBasligi);
      }
      // İkinci notu zarfından kaldır (eğer eklendiyse ve NOT varsa)
      if (NOT) {
        var zarfIkinciNotEl = document.querySelector('.zarf-ikinci-not-el');
        if (zarfIkinciNotEl && zarfIkinciNotEl.parentNode) {
          zarfIkinciNotEl.parentNode.removeChild(zarfIkinciNotEl);
        }
      }

      // Hediye kutusunu göster
      if (GIFT.deger) {
        hediyeKur();
      }
    }, hediyeGecikmesi);
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
    } else if (GIFT.turd === 'muzik' || GIFT.turd === 'müzik' || GIFT.turd === 'audio' || GIFT.turd === 'music') {
      // Hediye müziği: tıklayınca kutu açılır ve ses oynatıcı belirir
      var muzik = elYap('audio', 'muzik-hediye');
      muzik.controls = true;
      muzik.preload = 'none';
      muzik.src = GIFT.deger;
      muzik.style.display = 'none';
      ic.appendChild(muzik);
      kutu.addEventListener('click', function () {
        kutu.classList.add('acik', 'acilacak');
        kutu.classList.remove('kapak-once');
        setTimeout(function () {
          ic.classList.add('acik');
          muzik.style.display = 'block';
          muzik.play().catch(function () { /* otomatik oynatma engellenebilir */ });
        }, 350);
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