# 🎂 doğumgünü.com

**QR ile animasyonlu doğum günü kartı üretici** — ismini, şablonunu, notunu ve hediyeni seç; çıkan QR'ı telefonla tarat, **kart zarf gibi açılır** 🎉

## 🔗 Canlı Site

👉 **https://Kuraiiae.github.io/dogum-gunu/**

> Kaynak kodu bu repoda yer almaktadır. Site GitHub Pages üzerinde **herkese ücretsiz** açıktır — uygulama kurmak gerekmez.

## ✨ Özellikler

- 🧧👦 **24 animasyonlu şablon** — Kız & Erkek × Çocuk · Genç · Yetişkin (her kategoride 4 tasarım)
- 💌 **Zarf açılışı**: QR okutulunca konfeti + balonlarla zarf açılır, *"aşağı kaydır"* ile kart içinden çıkar
- 📜 **Cümle cümle not**: mesaj satır satır yazılır (typewriter animasyonu)
- 🎂 **Dinamik yaş yazısı**: yaş girilmezse her açılışta farklı zarif bir cümle
- 🎁 **Hediye kutusu**: tıklayınca açılan kutuda *söz / link / resim / müzik* gösterilir
- 🌐 **TR / EN dil desteği** (sağ üstten değiştirilir, tercih hatırlanır)
- 🖼️ **Canlı önizleme**: oluşturucu sayfasında sticky panel — form kaydırılırken önizleme sabit durur
- 🔒 **QR sadece istediğinizde oluşturulur**: "QR Oluştur" butonuna basılınca kilitlenir, form değişince değişmez
- ⏰ **7 günlük QR geçerliliği**: QR bağlantısı oluşturulduktan 1 hafta sonra otomatik geçersiz sayılır
- 🔍 **Logolu QR**: QR'ın tam ortasında doğum günü logosu
- 🔒 **Kişiye özel QR**: tahmin edilemez gizli bağlantı + isteğe bağlı 4-6 haneli PIN kilidi
- ⬇️ QR PNG indir + bağlantı kopyala
- 📱 Mobil öncelikli, `prefers-reduced-motion` uyumlu, sıfır bağımlılık (sadece istemci)

## 📁 Dosyalar

| Dosya | İçerik |
|---|---|
| `index.html` | Ana site: şablon galerisi (animasyonlu kartlar) |
| `olustur.html` | Kart üretici — form + sticky önizleme + QR oluştur butonu |
| `zarf-motoru.js` / `zarf-motoru.css` | Tüm şablonlarda ortak zarf → kaydır → hediye akışı + süre kontrolü |
| `dogum-gunu-kiz*.html` | Kız şablonları — Çocuk/Genç/Yetişkin (4'er tasarım) |
| `dogum-gunu-erkek*.html` | Erkek şablonları — Çocuk/Genç/Yetişkin (4'er tasarım) |
| `.gitattributes` | HTML/CSS/JS şablon dosyalarını GitHub dil istatistiklerinden gizler |
| `.nojekyll` | GitHub Pages'in Jekyll işlemesini devre dışı bırakır |

## ⏰ QR Geçerlilik Süresi

Oluşturulan her QR kodu, **oluşturulduğu tarihten itibaren 7 gün** geçerlidir. Süre dolduktan sonra:
- QR taranınca güzel bir animasyonlu "Süre Doldu" ekranı gösterilir
- Yeni bir kart oluşturmak için siteye yönlendirme yapılır

Süreyi değiştirmek için `olustur.html` ve `index.html`'deki `kartBaglantisiUret` fonksiyonunda:
```js
var exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 gün
```

## 🚀 Yerel Çalıştırma

```bash
python -m http.server 8000
# → http://localhost:8000
```

## 🏗️ Teknoloji

Saf HTML + CSS + JS. QR üretimi [qrcodejs](https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js) (CDN), fontlar Google Fonts. Backend yok, veri kaydı yok — tam gizlilik.

---

Sevgiyle, doğumgünü.com ❤️