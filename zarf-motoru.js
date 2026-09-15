/* ============================================================
   ZARF MOTORU 2.0 (zarf-motoru.js)
   Havai Fişekler · Yeni Yaş · Uzayan Parşömen · Kişisel Mesaj (Lyrics)
   Mesaj Postası · Hediye (Resim / Link / Söz / Müzik + Lyrics)
   ============================================================ */
(function () {
  'use strict';

  var P = new URLSearchParams(location.search);
  function p(key) { try { return P.get(key) || ''; } catch (e) { return ''; } }

  var ISIM  = (p('isim')  || '').trim();
  var NOT   = (p('not')   || '').trim();
  var NOT2  = (p('not2')  || '').trim();
  var YAS   = '';
  if (/^\d{1,3}$/.test(p('yas'))) {
    var yN = parseInt(p('yas'), 10);
    if (yN > 0 && yN < 130) { YAS = String(yN); }
  }

  // Hediye verisi çözümleme
  var GIFT = { tur: 'none', deger: '', lyric: '' };
  var giftRaw = (p('hediye') || '').trim();
  if (giftRaw) {
    try {
      var g = JSON.parse(giftRaw);
      if (g && typeof g === 'object') {
        GIFT.tur = g.t || g.tur || '';
        GIFT.deger = g.v || g.deger || '';
        GIFT.lyric = g.l || g.lyric || '';
      }
    } catch (e) {
      var ik = giftRaw.indexOf(':');
      if (ik > 0) {
        GIFT.tur = giftRaw.slice(0, ik).toLowerCase();
        GIFT.deger = giftRaw.slice(ik + 1).trim();
      } else { GIFT.deger = giftRaw; GIFT.tur = 'soz'; }
    }
  }

  // Dil
  var DIL = (p('dil') || '').toLowerCase();
  if (DIL !== 'tr' && DIL !== 'en') {
    DIL = (navigator.language || 'tr').toLowerCase().indexOf('en') === 0 ? 'en' : 'tr';
  }
  var EN = DIL === 'en';

  // Geçerlilik Süresi (7 gün)
  var EXP = p('exp');
  if (EXP) {
    var expSec = parseInt(EXP, 10);
    var nowSec = Math.floor(Date.now() / 1000);
    if (!isNaN(expSec) && nowSec > expSec) {
      document.body.innerHTML = '';
      document.body.style.cssText = 'margin:0;padding:2rem;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#090C12;font-family:system-ui,sans-serif;color:#FFF;text-align:center;';
      document.body.innerHTML = '<div><div style="font-size:4rem;margin-bottom:1rem">⏰</div><h1 style="font-size:1.8rem;color:#FFD700">' + (EN ? 'This card has expired' : 'Bu kartın süresi doldu') + '</h1><p style="color:#A0AAB8;max-width:380px;margin:1rem auto">' + (EN ? 'Birthday cards are valid for 7 days.' : 'Doğum günü kartları oluşturulduktan sonra 7 gün geçerlidir.') + '</p></div>';
      return;
    }
  }

  // Zarf modu kontrolü (?zarf=0 ise önizleme için gizle)
  var zarfParam = p('zarf');
  if (zarfParam === '0') {
    return; // Şablonun doğrudan kendisini göster
  }

  // ====== HAVAİ FİŞEK MOTORU (CANVAS) ======
  function havaiFisekMotoruBaslat(canvas) {
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    function boyutlandir() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    boyutlandir();
    window.addEventListener('resize', boyutlandir);

    var partikuller = [];
    var renkler = ['#FFD700', '#FF3366', '#00FFCC', '#FF9900', '#33CCFF', '#FF0066', '#FFFFFF', '#FFCC00'];

    function Partikul(x, y, renk) {
      this.x = x;
      this.y = y;
      this.renk = renk;
      var aci = Math.random() * Math.PI * 2;
      var hiz = Math.random() * 5 + 2;
      this.vx = Math.cos(aci) * hiz;
      this.vy = Math.sin(aci) * hiz;
      this.omur = Math.random() * 30 + 40;
      this.maksOmur = this.omur;
      this.yaricap = Math.random() * 2.6 + 1.2;
    }
    Partikul.prototype.guncelle = function () {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.05; // yerçekimi
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.omur--;
    };
    Partikul.prototype.ciz = function () {
      var alfa = Math.max(0, this.omur / this.maksOmur);
      ctx.save();
      ctx.globalAlpha = alfa;
      ctx.fillStyle = this.renk;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.yaricap, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    function patlat() {
      var x = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
      var y = Math.random() * (canvas.height * 0.45) + canvas.height * 0.08;
      var r = renkler[Math.floor(Math.random() * renkler.length)];
      for (var i = 0; i < 40; i++) {
        partikuller.push(new Partikul(x, y, r));
      }
    }

    // İlk seri patlamalar
    patlat();
    setTimeout(patlat, 400);
    setTimeout(patlat, 900);
    setTimeout(patlat, 1600);
    setTimeout(patlat, 2400);
    setInterval(patlat, 2800);

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = partikuller.length - 1; i >= 0; i--) {
        var p = partikuller[i];
        p.guncelle();
        p.ciz();
        if (p.omur <= 0) { partikuller.splice(i, 1); }
      }
      requestAnimationFrame(loop);
    }
    loop();
  }

  // ====== PARŞÖMEN VE AÇILIŞ ARAYÜZÜNÜ KUR ======
  function deneyimiBaslat() {
    var katman = document.createElement('div');
    katman.className = 'parsomen-deneyim';
    katman.id = 'parsomenDeneyim';

    // 1. Havai Fişek Canvası
    var canvas = document.createElement('canvas');
    canvas.id = 'fireworksCanvas';
    katman.appendChild(canvas);

    // 2. Yeni Yaş / Şenlik Başlığı
    var yasKutu = document.createElement('div');
    yasKutu.className = 'yas-havai-kutu';
    var yasMetni = YAS ? ('✨ ' + YAS + (EN ? ' YEARS OLD! ✨' : ' YAŞINDA! ✨')) : (EN ? '✨ HAPPY BIRTHDAY! ✨' : '✨ İYİ Kİ DOĞDUN! ✨');
    yasKutu.innerHTML =
      '<div class="yas-rakam-vurgu">' + yasMetni + '</div>' +
      '<div class="yas-alt-tebrik">' + (EN ? 'May all your wishes come true' : 'Tüm dileklerin gerçek olsun') + '</div>';
    katman.appendChild(yasKutu);

    // 3. Uzayan Parşömen Rulosu
    var parsomenKapsayici = document.createElement('div');
    parsomenKapsayici.className = 'parsomen-kapsayici';

    // Üst Rulo Çubuğu
    var ustCubuk = document.createElement('div');
    ustCubuk.className = 'rulo-baslik-cubuk';
    parsomenKapsayici.appendChild(ustCubuk);

    // Parşömen Gövdesi
    var govde = document.createElement('div');
    govde.className = 'parsomen-govde';

    // Parşömen Tepe / İsim & Tebrik
    var tepe = document.createElement('div');
    tepe.className = 'parsomen-tepe';
    var isimGosterim = ISIM || (EN ? 'Dear Friend' : 'Sevgili Dostum');
    tepe.innerHTML =
      '<div class="parsomen-sus-satir">✦ ❧ ✦</div>' +
      '<h1 class="parsomen-isim">' + isimGosterim + '</h1>' +
      '<div class="parsomen-tebrik-alt">' + (EN ? 'Happy Birthday to You! 🎉' : 'Doğum Günün Kutlu Olsun! 🎉') + '</div>';
    govde.appendChild(tepe);

    // İlk Not
    if (NOT) {
      var ilkNotKutu = document.createElement('div');
      ilkNotKutu.className = 'parsomen-ilk-not';
      ilkNotKutu.textContent = NOT;
      govde.appendChild(ilkNotKutu);
    }

    // Aşağı Kaydır İpucu
    var kaydirIpu = document.createElement('div');
    kaydirIpu.className = 'parsomen-kaydir-ipucu';
    kaydirIpu.innerHTML = '<span>' + (EN ? 'Scroll down' : 'Aşağıya kaydır') + '</span><span>↓</span>';
    govde.appendChild(kaydirIpu);

    // 4. Kişisel Mesaj (Lyrics Formatında)
    if (NOT2) {
      var lyricsAlan = document.createElement('div');
      lyricsAlan.className = 'parsomen-lyrics-alani';
      var dizeler = NOT2.split('\n').filter(function (s) { return s.trim().length > 0; });
      var dizelerHtml = dizeler.map(function (dize) {
        return '<div class="lyrics-tek-dize">♪ ' + dize.trim() + '</div>';
      }).join('');

      lyricsAlan.innerHTML =
        '<div class="lyrics-ayrac-baslik">' +
          '<span>🎵 ' + (EN ? 'Personal Message & Verses' : 'Özel Mesaj & Şarkı Sözleri') + ' 🎵</span>' +
        '</div>' +
        '<div class="lyrics-dizeler-listesi">' + dizelerHtml + '</div>';
      govde.appendChild(lyricsAlan);
    }

    // 5. Mesaj Postası & Hediye Zarfı
    if (GIFT && GIFT.deger) {
      var postaBolum = document.createElement('div');
      postaBolum.className = 'posta-hediye-bolumu';
      postaBolum.innerHTML =
        '<div style="font-family:\'Playfair Display\', serif; font-size:1.1rem; color:#8C7040; margin-bottom:.9rem; font-weight:700">' +
          '✉️ ' + (EN ? 'You Have a Special Delivery' : 'Sana Özel Bir Mesaj Postası Var') +
        '</div>' +
        '<div class="posta-zarf-kutu" id="postaZarfKutu" title="' + (EN ? 'Tap to open' : 'Açmak için dokun') + '">' +
          '<div class="mum-muhur">❧</div>' +
        '</div>' +
        '<p style="font-size:.82rem; color:#8C7040; margin-top:.7rem; font-weight:600">' +
          (EN ? 'Tap the wax seal to open 🎁' : 'Mühüre dokun ve hediyeyi aç 🎁') +
        '</p>' +
        '<div class="posta-acilan-icerik" id="postaIcerik"></div>';

      govde.appendChild(postaBolum);
    }

    // Alt Kapanış & Şablon Butonu
    var altBar = document.createElement('div');
    altBar.className = 'parsomen-kapanis-bar';
    altBar.innerHTML =
      '<button type="button" class="sablonu-gor-btn" id="sablonKapatBtn">' +
        (EN ? 'View Original Card Design 🎨' : 'Tasarım Şablonunu Gör 🎨') +
      '</button>';
    govde.appendChild(altBar);

    parsomenKapsayici.appendChild(govde);

    // Alt Rulo Çubuğu
    var altCubuk = document.createElement('div');
    altCubuk.className = 'rulo-baslik-cubuk';
    parsomenKapsayici.appendChild(altCubuk);

    katman.appendChild(parsomenKapsayici);
    document.body.appendChild(katman);

    // Havai fişekleri başlat
    havaiFisekMotoruBaslat(canvas);

    // Zarf Açılış Olayı
    var zarfKutu = document.getElementById('postaZarfKutu');
    var postaIcerik = document.getElementById('postaIcerik');
    if (zarfKutu && postaIcerik) {
      zarfKutu.addEventListener('click', function () {
        if (zarfKutu.classList.contains('acildi')) return;
        zarfKutu.classList.add('acildi');
        zarfKutu.style.transform = 'scale(0.92)';
        setTimeout(function () {
          zarfKutu.style.display = 'none';
          postaIcerik.classList.add('aktif');
          hediyeyiDoldur(postaIcerik);
        }, 400);
      });
    }

    // Şablonu Gör butonu
    var kapatBtn = document.getElementById('sablonKapatBtn');
    if (kapatBtn) {
      kapatBtn.addEventListener('click', function () {
        katman.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        katman.style.opacity = '0';
        katman.style.transform = 'scale(1.05)';
        setTimeout(function () {
          katman.style.display = 'none';
        }, 600);
      });
    }
  }

  // ====== HEDİYEYİ DOLDURMA ======
  function hediyeyiDoldur(hedef) {
    if (!hedef) return;
    hedef.innerHTML = '';

    // A) RESİM / FOTOĞRAF HEDİYESİ
    if (GIFT.tur === 'resim' || GIFT.tur === 'image' || GIFT.tur === 'png') {
      var polaroid = document.createElement('div');
      polaroid.className = 'hediye-polaroid';
      polaroid.innerHTML =
        '<img src="' + GIFT.deger + '" alt="Hediye Fotoğraf" onerror="this.onerror=null; this.src=\'\'; this.alt=\'Görsel yüklenemedi\';">' +
        '<div class="hediye-polaroid-alt">En güzel anılarımıza... 🌸</div>';
      hedef.appendChild(polaroid);
    }
    // B) LİNK HEDİYESİ
    else if (GIFT.tur === 'link') {
      var linkBtn = document.createElement('a');
      linkBtn.className = 'hediye-link-btn';
      linkBtn.href = GIFT.deger;
      linkBtn.target = '_blank';
      linkBtn.rel = 'noopener noreferrer';
      linkBtn.innerHTML = '<span>🔗 ' + (EN ? 'Open Surprise Link' : 'Sürpriz Bağlantıyı Aç') + '</span>';
      hedef.appendChild(linkBtn);
    }
    // C) MÜZİK + LYRICS HEDİYESİ
    else if (GIFT.tur === 'muzik' || GIFT.tur === 'music' || GIFT.tur === 'audio') {
      var muzikKapsayici = document.createElement('div');
      muzikKapsayici.className = 'hediye-muzik-kapsayici';

      var audioEl = document.createElement('audio');
      audioEl.src = GIFT.deger;
      audioEl.preload = 'auto';

      muzikKapsayici.innerHTML =
        '<div class="muzik-header">' +
          '<div class="muzik-bilgi-baslik">🎵 ' + (EN ? 'Special Birthday Song' : 'Sana Özel Şarkı') + '</div>' +
          '<div class="muzik-dalgalar">' +
            '<span class="m-dalga"></span><span class="m-dalga"></span>' +
            '<span class="m-dalga"></span><span class="m-dalga"></span>' +
          '</div>' +
        '</div>' +
        '<div class="muzik-player-kontroller">' +
          '<button type="button" class="muzik-oynat-btn" id="mPlayBtn" aria-label="Oynat/Durdur">▶</button>' +
        '</div>';

      // Şarkı sözleri (lyrics) varsa altta göster
      var sozMetni = GIFT.lyric || NOT2;
      if (sozMetni) {
        var lyricKutusu = document.createElement('div');
        lyricKutusu.className = 'muzik-lyrics-ekrani';
        var satirlar = sozMetni.split('\n').filter(function (s) { return s.trim().length > 0; });
        var satirlarHtml = satirlar.map(function (satir) {
          return '<div class="muzik-lyrics-dize">' + satir.trim() + '</div>';
        }).join('');
        lyricKutusu.innerHTML = satirlarHtml;
        muzikKapsayici.appendChild(lyricKutusu);
      }

      hedef.appendChild(muzikKapsayici);
      hedef.appendChild(audioEl);

      var playBtn = muzikKapsayici.querySelector('#mPlayBtn');
      var oynuyor = false;
      playBtn.addEventListener('click', function () {
        if (oynuyor) {
          audioEl.pause();
          playBtn.textContent = '▶';
          oynuyor = false;
        } else {
          audioEl.play().then(function () {
            playBtn.textContent = '⏸';
            oynuyor = true;
          }).catch(function () {
            playBtn.textContent = '▶';
          });
        }
      });

      // Müzik aktıkça lyrics dizelerini sırayla vurgula ve odakla
      audioEl.addEventListener('timeupdate', function () {
        if (!audioEl.duration || !lyricKutusu) return;
        var oran = audioEl.currentTime / audioEl.duration;
        var dizeElems = lyricKutusu.querySelectorAll('.muzik-lyrics-dize');
        if (dizeElems.length === 0) return;
        var aktifIdx = Math.min(dizeElems.length - 1, Math.floor(oran * dizeElems.length));
        for (var di = 0; di < dizeElems.length; di++) {
          if (di === aktifIdx) {
            dizeElems[di].classList.add('vurgulu');
            try { dizeElems[di].scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e) {}
          } else {
            dizeElems[di].classList.remove('vurgulu');
          }
        }
      });

      // Otomatik çalmayı dene
      audioEl.play().then(function () {
        playBtn.textContent = '⏸';
        oynuyor = true;
      }).catch(function () {});
    }
    // D) SÖZ / MESAJ HEDİYESİ
    else {
      var sozKutu = document.createElement('div');
      sozKutu.className = 'hediye-soz-kutusu';
      sozKutu.innerHTML = '“' + (GIFT.deger || (EN ? 'A heartfelt wish for you...' : 'Kalpten en güzel dileklerimle...')) + '”';
      hedef.appendChild(sozKutu);
    }
  }

  // Sayfa hazır olduğunda çalıştır
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', deneyimiBaslat);
  } else {
    deneyimiBaslat();
  }

})();