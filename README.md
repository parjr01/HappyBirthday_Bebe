# 🎉 Happy 24th Birthday Dakshita (My Bebe) — Interactive Website

A handcrafted, interactive, and romantic 10-page birthday website built specifically for **Dakshita (Bebe)** by **Ratnesh (her soon-to-be groom)**.

---

## 📸 Adding Your Photos & Videos (NO RENAMING REQUIRED!)

You do **NOT** have to rename your photos or videos to `photo1.jpg` or `video1.mp4`! You can keep your original filenames (like `IMG_20240512.jpg`, `WhatsApp_Image.jpeg`, `bebe_smile.png`, `VID_2026.mp4`).

### How to use your own filenames:
1. Place your pictures in `assets/photos/album1/` to `album5/` and your videos in `assets/videos/album1/` to `album3/`.
2. Open `script.js` in any text editor.
3. At the very top of `script.js`, simply list your filenames inside the `CUSTOM_MEDIA_CONFIG` block:
   ```javascript
   window.CUSTOM_MEDIA_CONFIG = {
     photos: {
       album1: [
         "IMG_20240512.jpg",
         "WhatsApp_Image.jpeg",
         "bebe_smile.png"
       ],
       album2: [
         "lonavala_rain.jpg",
         "waterfall.jpg"
       ],
       album3: [],
       album4: [],
       album5: []
     },
     videos: {
       album1: [
         "train_clip.mp4",
         "office_couch.mov"
       ],
       album2: [],
       album3: []
     }
   };
   ```
4. Save `script.js`. The website will automatically display your custom photos and videos!

*(If you don't list custom names, it will automatically look for `photo1.jpg` to `photo10.jpg` and `video1.mp4` to `video4.mp4` with clean SVG fallbacks).*

---

## 🔐 Secret Admin Access (Ratnesh Only)
- The website is strictly locked with a live countdown ticking down to **September 5, 2026 at 00:00:00 IST**.
- **To bypass the lock and preview the full website**:
  1. Click the pulsing lock icon or click **"🔑 Ratnesh Passcode Login"** on the lock screen.
  2. Enter the passcode: **`0802`**. *(Zero hints are shown anywhere on screen).*
  3. Click **Unlock Website**.
  4. Explore all 10 pages and click **"🔒 Re-enable Lock for Dakshita"** at the top whenever you want to test her locked view again.

---

Made with ❤️ by Ratnesh for Dakshita.
