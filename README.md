# 🎂 doğumgünü.com

**QR ile animasyonlu doğum günü kartı üretici** — ismini, şablonunu ve notunu seç; çıkan QR'ı telefonla tarat, kart anında açılır.

## 🔗 Canlı Site

👉 **https://Kuraiiae.github.io/dogum-gunu/**

## ✨ Özellikler

- 👧👦 **Kız ve erkek temaları** — tatlı/pastelden çizgi roman aksiyonuna
- 🎂 **Yaş kategorileri**: Çocuk · Genç · Yetişkin (yetişkinler için olgun ve zarif temalar)
- 📝 **Örnek notlar + özel not** (kopyala, düzenle)
- 🔒 **Kişiye özel QR**: her kart tahmin edilemez gizli bağlantıyla üretilir, isteğe bağlı 4-6 haneli PIN kilidi
- 🎉 **Animasyonlu kartlar**: balonlar, kalpler, konfeti, şimşekler, yarış arabası, dönüşüm kalkanı
- ⬇️ QR PNG indir + bağlantı kopyala
- 📱 Mobil öncelikli, sıfır bağımlılık (sadece istemci)

## 📁 Dosyalar

| Dosya | İçerik |
|---|---|
| `index.html` | Ana site: şablon galerisi + kart üretici (QR motoru) |
| `dogum-gunu-kiz.html` | Kız şablonu — Çocuk (pastel, balon, kalp) |
| `dogum-gunu-erkek.html` | Erkek şablonu — Çocuk (çizgi roman, şimşek, yarış arabası) |
| `dogum-gunu-kiz-genc.html` | Kız şablonu — Genç (rüya gibi lavanta) |
| `dogum-gunu-kiz-yetiskin.html` | Kız şablonu — Yetişkin (zarif, krem + altın) |
| `dogum-gunu-erkek-genc.html` | Erkek şablonu — Genç (urban/espor, neon) |
| `dogum-gunu-erkek-yetiskin.html` | Erkek şablonu — Yetişkin (olgun, lacivert + altın) |

## 🛠️ Şablonları Özelleştirme

Her kart dosyası tek başına çalışır. Başında şu sabitler bulunur:

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