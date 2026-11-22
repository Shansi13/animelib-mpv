// ==UserScript==
// @name         AnimeLib to mpv
// @namespace    animelib-mpv
// @version      2.0
// @description  Open AnimeLib video and subtitles in mpv
// @match        https://animelib.org/*
// @match        https://*.animelib.org/*
// @match        https://animelib.me/*
// @match        https://*.animelib.me/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function createButton() {
        if (document.getElementById('mpv-button')) return;

        const button = document.createElement('button');
        button.id = 'mpv-button';
        button.textContent = 'Открыть в mpv';

        Object.assign(button.style, {
            position: 'fixed',
            right: '25px',
            bottom: '25px',
            zIndex: '999999',
            padding: '14px 20px',
            background: '#222',
            color: '#fff',
            border: '1px solid #777',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
        });

        button.onclick = function () {
            const video = document.querySelector('video');

            if (!video) {
                alert('Видео не найдено');
                return;
            }

            const sources = [...video.querySelectorAll('source')];
            const source1080 = sources.find(s =>
                s.src.includes('_1080.mp4')
            );

            const videoUrl = source1080
                ? source1080.src
                : video.currentSrc || video.src;

            let subtitleUrl = '';

            const track = document.querySelector('video track[src]');

            if (track) {
                subtitleUrl = track.src;
            }

            if (!subtitleUrl) {
                const resources = performance
                    .getEntriesByType('resource')
                    .map(r => r.name);

                subtitleUrl = resources.find(url =>
                    /\\.vtt(?:\\?|$)/i.test(url)
                ) || '';
            }

            if (!videoUrl) {
                alert('Видео не найдено');
                return;
            }

            if (!subtitleUrl) {
                alert('Субтитры VTT не найдены. Включи субтитры в браузере и попробуй снова.');
                return;
            }

            const referer = location.origin + '/';

            const launchUrl =
                'mpv://open/?url=' + encodeURIComponent(videoUrl) +
                '&sub=' + encodeURIComponent(subtitleUrl) +
                '&referer=' + encodeURIComponent(referer);

            window.location.href = launchUrl;
        };

        document.body.appendChild(button);
    }

    createButton();

    new MutationObserver(createButton).observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );
})();
