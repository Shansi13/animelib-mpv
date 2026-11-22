# AnimeLib → mpv

Open AnimeLib episodes in [mpv](https://mpv.io/) with a single click, including the selected video stream and browser-detected subtitles.

> A lightweight Windows integration using a Tampermonkey userscript, a custom `mpv://` protocol handler, and PowerShell.

## Features

- Adds an **Open in mpv** button to AnimeLib episode pages.
- Selects the 1080p MP4 source when available.
- Detects subtitle URLs from the page's video tracks or loaded browser resources.
- Passes the page Referer and a browser-like User-Agent to mpv.
- Launches mpv with the subtitle track attached.

## Requirements

- Windows
- mpv
- Chrome or another Chromium-based browser
- [Tampermonkey](https://www.tampermonkey.net/)
- AnimeLib access in your browser

## Installation

### 1. Install mpv

Install mpv and make sure its executable path matches the path in `install/launch-mpv.ps1`.

Default expected path:

```text
C:\Program Files (x86)\mpv\bootstrapper\mpv.exe
```

If your installation uses another location, edit the `$mpv` variable in `launch-mpv.ps1`.

### 2. Install the launcher

1. Create this folder:

   ```text
   C:\mpv-launcher
   ```

2. Copy `install/launch-mpv.ps1` into it.

### 3. Register the `mpv://` protocol

Double-click `install/mpv-protocol.reg` and approve the Windows Registry prompt.

The registry entry tells Windows to pass `mpv://` links to the PowerShell launcher.

### 4. Install the userscript

1. Install Tampermonkey in your browser.
2. Open Tampermonkey's dashboard.
3. Create a new userscript.
4. Copy the contents of `userscript/AnimeLib-to-mpv.user.js` into the editor.
5. Save the script.

### 5. Use it

1. Open an AnimeLib episode page.
2. Make sure the video and subtitles have loaded in the browser.
3. Click **Открыть в mpv**.
4. mpv should open the selected video with subtitles.

## How it works

The userscript finds the HTML video element and its available sources. It prefers a source ending in `_1080.mp4`, then looks for subtitles in the video's `<track>` element or among browser-loaded resources.

It creates an `mpv://` URI containing the video URL, subtitle URL, and page Referer. Windows launches the PowerShell script, which passes these parameters to mpv.

## Troubleshooting

### mpv does not launch

- Check that `mpv.exe` exists at the path configured in `launch-mpv.ps1`.
- Confirm that the `mpv://` protocol registry file was imported.
- Try opening a video using the browser button again.

### Video returns HTTP 403

The CDN may require a valid Referer. The launcher passes the AnimeLib page origin. If the site changes domains, the userscript may need an update.

### Subtitles are not detected

- Enable subtitles in the AnimeLib player first.
- Wait for the subtitle resource to load.
- Click the button again.

### The button does not appear

- Check that Tampermonkey is enabled.
- Check that the userscript is enabled.
- Reload the episode page.

## Uninstall

1. Remove or disable the Tampermonkey userscript.
2. Delete `C:\mpv-launcher`.
3. Remove the registry protocol entry by running PowerShell:

   ```powershell
   Remove-Item -Path 'HKCU:\Software\Classes\mpv' -Recurse -Force
   ```

## Notes

This project is an unofficial browser-to-mpv integration. It does not host, download, or provide AnimeLib video content. Availability and behavior depend on AnimeLib's website, video player, and CDN.

The launcher and userscript are provided as a small example integration. Website changes may break it and require maintenance.
