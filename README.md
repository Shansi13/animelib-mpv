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

---

# AnimeLib → mpv (Русский)

Открывайте серии AnimeLib в [mpv](https://mpv.io/) одним нажатием, передавая выбранный видеопоток и обнаруженные в браузере субтитры.

> Небольшая интеграция для Windows: userscript Tampermonkey, обработчик протокола `mpv://` и PowerShell.

## Возможности

- Добавляет кнопку **Открыть в mpv** на страницах серий AnimeLib.
- Выбирает источник MP4 в 1080p, если он доступен.
- Ищет URL субтитров в видео-тегах или среди загруженных браузером ресурсов.
- Передаёт mpv Referer страницы и User-Agent браузера.
- Запускает mpv с подключёнными субтитрами.

## Требования

- Windows
- mpv
- Chrome или другой браузер на Chromium
- [Tampermonkey](https://www.tampermonkey.net/)
- Доступ к AnimeLib через браузер

## Установка

### 1. Установите mpv

Установите mpv и проверьте, что путь к исполняемому файлу совпадает с указанным в `install/launch-mpv.ps1`.

Путь по умолчанию:

```text
C:\Program Files (x86)\mpv\bootstrapper\mpv.exe
```

Если mpv установлен в другом месте, измените переменную `$mpv` в `launch-mpv.ps1`.

### 2. Установите скрипт запуска

1. Создайте папку:

   ```text
   C:\mpv-launcher
   ```

2. Скопируйте в неё файл `install/launch-mpv.ps1`.

### 3. Зарегистрируйте протокол `mpv://`

Дважды нажмите на `install/mpv-protocol.reg` и подтвердите внесение изменений в реестр Windows.

Этот ключ сообщает Windows, что ссылки `mpv://` нужно передавать скрипту PowerShell.

### 4. Установите userscript

1. Установите Tampermonkey в браузер.
2. Откройте панель управления Tampermonkey.
3. Создайте новый userscript.
4. Скопируйте содержимое `userscript/AnimeLib-to-mpv.user.js` в редактор.
5. Сохраните скрипт.

### 5. Использование

1. Откройте страницу серии AnimeLib.
2. Убедитесь, что видео и субтитры загрузились в браузере.
3. Нажмите **Открыть в mpv**.
4. mpv должен запуститься с выбранным видео и субтитрами.

## Как это работает

Userscript находит HTML-элемент видео и доступные источники. Он предпочитает ссылку, заканчивающуюся на `_1080.mp4`, а затем ищет субтитры в `<track>` или среди ресурсов, загруженных браузером.

Скрипт формирует URI `mpv://`, содержащий ссылку на видео, субтитры и Referer страницы. Windows запускает PowerShell-скрипт, который передаёт эти параметры mpv.

## Решение проблем

### mpv не запускается

- Проверьте, существует ли `mpv.exe` по пути, указанному в `launch-mpv.ps1`.
- Убедитесь, что файл регистрации протокола `mpv://` был импортирован в реестр.
- Повторно попробуйте открыть видео кнопкой на сайте.

### Видео возвращает HTTP 403

CDN может требовать корректный Referer. Скрипт передаёт адрес страницы AnimeLib. Если сайт сменит домен, userscript может потребовать обновления.

### Субтитры не обнаруживаются

- Сначала включите субтитры в плеере AnimeLib.
- Дождитесь загрузки ресурса субтитров.
- Нажмите кнопку повторно.

### Кнопка не появляется

- Проверьте, включён ли Tampermonkey.
- Проверьте, включён ли userscript.
- Перезагрузите страницу серии.

## Удаление

1. Удалите или отключите userscript в Tampermonkey.
2. Удалите папку `C:\mpv-launcher`.
3. Удалите регистрацию протокола через PowerShell:

   ```powershell
   Remove-Item -Path 'HKCU:\Software\Classes\mpv' -Recurse -Force
   ```

## Примечания

Это неофициальная интеграция браузера с mpv. Проект не размещает, не скачивает и не предоставляет видео AnimeLib. Доступность и работа зависят от сайта AnimeLib, его плеера и CDN.

Скрипты представлены как небольшой пример интеграции. Изменения на сайте могут нарушить работу и потребовать обновления.
