# 🎉 Happy 24th Birthday Dakshita (My Bebe) — Interactive Website

A handcrafted, interactive, and romantic birthday website built specifically for **Dakshita (Bebe)** by **Ratnesh (her soon-to-be groom)**.

---

## 🎞️ Continuous Rotating Media Showcase (Page 5)

All albums and video tabs have been replaced with a **single, smooth, infinite auto-scrolling rotating media showcase**:
- Photos and looping video previews smoothly glide across the screen in two opposing continuous tracks.
- Hovering or touching pauses the scroll.
- **Click any photo or video to maximize**:
  - **Photos (`.jpg`, `.png`, `.heic`, `.webp`)**: Expands into high-definition full-screen view with next/prev arrows.
  - **Videos (`.mp4`, `.mov`, `.webm`)**: Expands into a cinematic video player with sound, scrub bar, and controls.
  - **Apple `.HEIC` Support**: Includes automatic client-side HEIC decoding via `heic2any` so iPhone photos display on all devices!

### How to add your photos and videos:
1. Drop your files directly into the **`assets/`** folder. You do **NOT** need to rename them or create subfolders!
2. Open **`script.js`** in any text editor.
3. At the very top (line 12), simply list your filenames inside `window.MEDIA_STREAM_FILES`:
   ```javascript
   window.MEDIA_STREAM_FILES = [
     "IMG_1024.HEIC",
     "bebe_smile.jpg",
     "train_clip.mov",
     "couch_night.mp4",
     "WhatsApp_Pic.jpeg",
     "lonavala.png"
   ];
   ```
4. Save `script.js` and push to GitHub. They will rotate seamlessly in the stream!

*(If left blank, the website automatically loads 16 aesthetic sample cards so it works right out of the box).*

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
