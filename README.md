# 🎉 Happy 24th Birthday Dakshita (My Bebe) — Interactive Website

A handcrafted, interactive, and romantic birthday website built specifically for **Dakshita (Bebe)** by **Ratnesh (her soon-to-be groom)**.

---

## ⚠️ Files Too Large for GitHub? (Solutions for > 25 MB Files)

GitHub has a **25 MB limit** per file when uploading through the web browser. If your high-resolution iPhone videos or large photos exceed this limit, here are the two easiest ways to handle it:

### 🌟 Solution 1: Use Google Drive or YouTube Links (Easiest & No Upload to GitHub!)
You do **NOT** need to push heavy video files to GitHub! 
1. Upload your video to **Google Drive** (set sharing to *"Anyone with the link can view"*), or to **YouTube** (set visibility to *"Unlisted"* so only you and Dakshita can view it).
2. Open `script.js`.
3. In `window.MEDIA_STREAM_FILES` at the top of `script.js`, paste your Google Drive or YouTube link directly:
   ```javascript
   window.MEDIA_STREAM_FILES = [
     "my_photo.jpg",
     "https://drive.google.com/file/d/1ABCXYZ.../view?usp=sharing",
     "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
     "another_pic.heic"
   ];
   ```
4. The website will automatically fetch the thumbnail, place it in the rotating stream, and play the full video in the maximizer!

---

### 🚀 Solution 2: Quick Free Compression (Shrink 100 MB ➔ 8 MB in 10 Seconds)
If you prefer keeping your files local inside `assets/`:
1. **For Videos**: Go to [FreeConvert Video Compressor](https://www.freeconvert.com/video-compressor) (or [Clideo](https://clideo.com/compress-video)). Drop your video, choose target size (e.g. 15 MB), download, and drop into `assets/`.
2. **For iPhone Photos (HEIC)**:
   - When AirDropping or exporting from iPhone, choose **"Automatic"** or **"Most Compatible"** (JPEG) which reduces size by 80%.
   - Or compress online at [TinyPNG](https://tinypng.com/).

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
