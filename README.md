# 🎂 doğumgünü.com

**QR ile animasyonlu doğum günü kartı üretici** — ismini, şablonunu, notunu ve hediyeni seç; çıkan QR'ı telefonla tarat, **kart zarf gibi açılır** 🎉.

## 🔗 Canlı Site

👉 **https://Kuraiiae.github.io/dogum-gunu/**

## ✨ Özellikler

- 🧧👦 **24 şablon** — Kız & Erkek × Çocuk · Genç · Yetişkin (her kategoride 4 tasarım)
- 💌 **Zarf açılışı**: QR okutulunca konfeti + balonlarla zarf açılır, *"aşağı kaydır"* ile kart içinden çıkar
- 📜 **Cümle cümle not**: mesaj satır satır yazılır (typewriter animasyonu)
- 🎂 **Dinamik yaş yazısı**: yaş girilmezse her açılışta farklı zarif bir cümle
- 🎁 **Hediye kutusu**: tıklayınca açılan kutuda *söz / link / resim* gösterilir (resim URL'si yüklenemezse söz olarak düşer)
- 🌐 **TR / EN dil desteği** (sağ üstten değiştirilir, tercih hatırlanır)
- 🖼️ **Canlı önizleme**: şablona tıklayınca kart üreticide anında görünür
- 🔍 **Logolu QR**: QR'ın tam ortasında doğum günü logosu
- 🔒 **Kişiye özel QR**: tahmin edilemez gizli bağlantı + isteğe bağlı 4-6 haneli PIN kilidi
- 🎉 **Animasyonlu kartlar**: balonlar, kalpler, konfeti, şimşekler, yarış arabası, uzay, müzik…
- ⬇️ QR PNG indir + bağlantı kopyala
- 📱 Mobil öncelikli, `prefers-reduced-motion` uyumlu, sıfır bağımlılık (sadece istemci)

## 📁 Dosyalar

| Dosya | İçerik |
|---|---|
| `index.html` | Ana site: şablon galerisi + kart üretici (QR motoru, TR/EN) |
| `zarf-motoru.js` / `zarf-motoru.css` | Tüm şablonlarda ortak çalışan zarf → kaydır → hediye akışı |
| `dogum-gunu-kiz*.html` | Kız şablonları — Çocuk/Genç/Yetişkin (4'er tasarım) |
| `dogum-gunu-erkek*.html` | Erkek şablonları — Çocuk/Genç/Yetişkin (4'er tasarım) |

## 🛠️ Şablonları Özelleştirme

Her kart dosyası tek başına çalışır ve `zarf-motoru.js`'i bağlar. Başında şu sabitler bulunur:

```html
<script>
// ==================== BURAYA İSMİ VE NOTU YAZ ====================
const VARSAYILAN_ISIM = "İSİM";
const VARSAYILAN_NOT  = "Senin için en güzel dileklerimle...";
```

Değiştir, `git push` yap — site otomatik güncellenir.

## 🚀 Yerel Çalıştırma

```bash
python -m http.server 8000
# → http://localhost:8000
```

## 🏗️ Teknoloji

Saf HTML + CSS + JS. QR üretimi [qrcodejs](https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js) (CDN), fontlar Google Fonts. Backend yok, veri kaydı yok — tümleşik gizlilik.

---

Sevgiyle, doğumgünü.com ❤️