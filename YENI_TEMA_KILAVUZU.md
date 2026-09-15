# Yeni Tema Ekleme Kılavuzu

Bu kılavuz, `dogum-gunu` projesi için yeni bir tema ekleme adımlarını açıklamaktadır.

## Tema Sistemi Nasıl Çalışır?

Proje, CSS Custom Properties (CSS Değişkenleri) kullanarak bir tema sistemi uygulamaktadır. Tema değişkenleri `:root` seçicisinde tanımlanır ve farklı `[data-theme="tema-adi"]` seçicileriyle override edilir.

### Temel Tema Değişkenleri

Aşağıdaki değişkenler tema sistemi için kullanılır:

- `--kagit`: Ana sayfa arka plan rengi
- `--kagit2`: Form kartları, önizleme alanları gibi secondary surfaces
- `--kagit3`: Tertiary surfaces, disabled states
- `--murekkep`: Ana metin rengi
- `--murekkep-acik`: Secondary metin rengi
- `--cizgi`: Border/divider rengi
- `--cizgi-koyu`: Daha prominent border/rengi
- `--altin`: Vurgu rengi (genellikle altın/sarı tonlar)
- `--altin-soluk`: Hafif altın rengi (gölgeler, hafif efektler)
- `--bordo`: İkincil vurgu rengi
- `--vurgu`: Ana vurgu/rengi (butonlar, aktif durumlar)
- `--vurgu-koyu`: Daha koyu vurgu rengi
- `--vurgu-acik`: Hafif vurgu rengi (gölgeler, hafka efektler)
- `--secili-bg`: Seçili öğelerin arka plan rengi
- `--qr-renk`: QR kodu 어두 kısımların rengi
- `--odak`: Odak rengi (form input focus, vb.)
- `--odak-halka`: Odak hafka effect rengi
- `--golge`: Genel drop gölge efekti
- `--golge-kucuk`: Daha küçük drop gölge efekti
- `--yazi-vurgu`: Başlık/font vurgusu için font ailesi
- `--yazi-govde`: Ana metin için font ailesi
- `--yazi-el`: Şıft/el yazısı için font ailesi

## Yeni Tema Ekleme Adımları

### 1. CSS'te Tema Tanımlamasını Ekleyin

`olustur.html` ve `index.html` dosyalarının `<style>` bölümünde, mevcut tema tanımlarının ardından yeni temanızı ekleyin:

```css
/* ============ YENİ TEMA ADINIZ ============ */
[data-theme="yeni-tema-adiniz"]{
  --kagit:#DEĞER; /* Ana arka plan */
  --kagit2:#DEĞER; /* Secondary surfaces */
  --kagit3:#DEĞER; /* Tertiary surfaces */
  --murekkep:#DEĞER; /* Ana metin */
  --murekkep-acik:#DEĞER; /* Secondary metin */
  --cizgi:rgba(DEĞER,DEĞER,DEĞER,.16); /* Border rengi */
  --cizgi-koyu:rgba(DEĞER,DEĞER,DEĞER,.3); /* Daha kalın border */
  --altin:#DEĞER; /* Altın/Sarı vurgu */
  --altin-soluk:rgba(DEĞER,DEĞER,DEĞER,.18); /* Hafif altın */
  --bordo:#DEĞER; /* İkincil vurgu */
  --vurgu:#DEĞER; /* Ana vurgu/rengi */
  --vurgu-koyu:#DEĞER; /* Daha koyu vurgu */
  --vurgu-acik:rgba(DEĞER,DEĞER,DEĞER,.16); /* Hafif vurgu */
  --secili-bg:#DEĞER; /* Seçili öğeler */
  --qr-renk:#DEĞER; /* QR kodu rengi */
  --odak:#DEĞER; /* Odak rengi */
  --odak-halka:rgba(DEĞER,DEĞER,DEĞER,.16); /* Odak hafka */
  --golge:0 16px 38px -24px rgba(DEĞER,DEĞER,DEĞER,.4); /* Gölge */
  --golge-kucuk:0 8px 18px -12px rgba(DEĞER,DEĞER,DEĞER,.28); /* Küçük gölge */
}
```

### 2. Cinsiyet Bazlı Override'ları Güncelleyin (Opsiyonel)

Eğer temanız erkek ve kız kullanıcıları için farklı vurgu renkleri gerektiriyorsa, `body[data-cinsiyet="erkek"]` seçicisinde gerekli override'ları ekleyin/güncelleyin:

```css
/* Cinsiyet 기반 geçersiz kılma - tema tanımlarından sonra gelir */
body[data-cinsiyet="erkek"]{
  --vurgu:#DEĞER; /* Erkek için vurgu rengi */
  --vurgu-koyu:#DEĞER; /* Erkek için daha koyu vurgu */
  --vurgu-acik:rgba(DEĞER,DEĞER,DEĞER,.16); /* Erkek için hafif vurgu */
  --secili-bg:#DEĞER; /* Erkek için seçili arka plan */
  --qr-renk:#DEĞER; /* Erkek için QR kodu rengi */
}
```

### 3. Tema Listesini Güncelleyen JavaScript'i Düzenleyin

Her iki HTML dosyasında (`olustur.html` ve `index.html`), aşağıdaki JavaScript bölümlerini bulup güncelleyin:

#### olustur.html'de:
```javascript
// ============ TEMA SİSTEMİ ============
var TEMA = (localStorage.getItem('dogumgunu-tema') || 'clasik');
var TEMA_LISTESI = ['clasik', 'gece', 'neon', 'pastel', 'yeni-tema-adiniz']; // Yeni temayı ekleyin
var TEMA_GOSTERIMLERI = {
  'clasik': '📄 Klasik',
  'gece': '🌙 Gece',
  'neon': '💥 Neon',
  'pastel': '🎨 Pastel',
  'yeni-tema-adiniz': '🆕 Yeni Tema İsim' // Gösterim metnini ekleyin
};
```

#### index.html'da:
```javascript
// ============ TEMA SİSTEMİ ============
var TEMA = (localStorage.getItem('dogumgunu-tema') || 'clasik');
var TEMA_LISTESI = ['clasik', 'gece', 'neon', 'pastel', 'yeni-tema-adiniz']; // Yeni temayı ekleyin
var TEMA_GOSTERIMLERI = {
  'clasik': '📄 Klasik',
  'gece': '🌙 Gece',
  'neon': '💥 Neon',
  'pastel': '🎨 Pastel',
  'yeni-tema-adiniz': '🆕 Yeni Tema İsim' // Gösterim metnini ekleyin
};
```

### 4. Tema Gösterim İkonunu Güncelleyin (Opsiyonel)

Tema butonunun gösterdiği emoji/ikonu güncellemek isterseniz, aynı JavaScript bölümlerindeki `TEMA_GOSTERIMLERI` nesnesindeki değeri değiştirin.

## Renk Seçimi İpuçları

### Erişilebilirlik
- Metin ve arka plan arasında yeterli kontrast sağlayın (WCAG AA standartları için en az 4.5:1 oran)
- `--murekkep` ve `--kagit` arasında, `--murekkep-acik` ve `--kagit2` arasında iyi kontrast olmalı
- QR kodu için `--qr-renk` ve `--kagit2` arasında iyi kontrast olmalı (tarayıcılar QR kodunu okuyabilmeli)

### Uyum
- Tema değişkenleri 기존 tasarım elemanlarıyla uyumlu olmalı
- Benzer tonlar içinde değişiklik yaparak tutarlı bir görünüm sağlayın
- Açık temalar için açık arka plan + koyu metin, koyu temalar için koyu arka plan + açık metin principe'ini izleyin

### Örnek Temalar

#### Pastel Tema (Mevcut örnek):
```css
[data-theme="pastel"]{
  --kagit:#FFF8F0; --kagit2:#FEF6E9; --kagit3:#FDEEDC;
  --murekkep:#5D4037; --murekkep-acik:#8D6E63;
  --cizgi:rgba(93,64,55,.1); --cizgi-koyu:rgba(93,64,55,.1);
  --altin:#FFD700; --altin-soluk:rgba(255,215,0,.18);
  --bordo:#8D6E63;
  --vurgu:#FF8A65; --vurgu-koyu:#FF7043; --vurgu-acik:rgba(255,138,101,.16);
  --secili-bg:#F5E6D3;
  --qr-renk:#FF8A65;
  --odak:#FF8A65; --odak-halka:rgba(255,138,101,.16);
  --golge:0 16px 38px -24px rgba(93,64,55,.3);
  --golge-kucuk:0 8px 18px -12px rgba(93,64,55,.18);
}
```

#### Gece Tema (Mevcut örnek):
```css
[data-theme="gece"]{
  --kagit:#0F1419; --kagit2:#1A1F28; --kagit3:#252E3A;
  --murekkep:#E0E0E0; --murekkep-acik:#B0B0B0;
  --cizgi:rgba(255,255,255,.1); --cizgi-koyu:rgba(255,255,255,.2);
  --altin:#FFD700; --altin-soluk:rgba(255,215,0,.18);
  --bordo:#8B0000;
  --vurgu:#00FFAA; --vurgu-koyu:#00CC88; --vurgu-acik:rgba(0,255,170,.16);
  --secili-bg:#1A1F28;
  --qr-renk:#00FFAA;
  --odak:#00FFAA; --odak-halka:rgba(0,255,170,.16);
  --golge:0 16px 38px -24px rgba(0,0,0,.4);
  --golge-kucuk:0 8px 18px -12px rgba(0,0,0,.28);
}
```

## Test Edin

Yeni temanızı ekledikten sonra:
1. Sayfayı yenileyin
2. Tema değiştirici butonunu kullanarak yeni temaya geçiş yapın
3. Hem kız hem erkek seçenekleri için temanın doğru uygulandığını kontrol edin
4. Form elemanları, butonlar, QR kodu gibi tüm UI elemanlarının görünümünü test edin
5. LocalStorage'da tema seçiminizin kalıcı olarak saklandığını doğrulayın (sayfa yeniledikten sonra aynı tema aktif kalmalı)

## Notlar

- Temalar `%` değeriyle tanımlanmalı değildir, çözünürlük bağımsızlığı için kesin renk değerleri kullanın
- `--cizgi` ve `--cizgi-koyu` değişkenleri `rgba()` formatında tanımlanmalı böylece opaklık değeri tema üzerinden kontrol edilebilir
- Tema değişikliği anlık olarak uygulanmalıdır, sayfa yenilemeye gerek yoktur
- Eğer `zarf-motoru.css` veya `zarf-motoru.js` dosyalarında tema özel stiller varsa, onları da güncellemeyi unutmayın