/*
 * PTTwww Navigation Bar
 * Copyright (c) 2016-2019 pTaunium
 * Licensed under the MIT License
 */

import { isInArticle, isInBoard, isInManual, url } from './constants';
import { AIDMenu } from './pttAIDS';
import { SettingsMenu } from './settings';
import * as utils from './utils';

/* button icons */
const aboutIcon =
    '<svg viewBox="0 0 256 256"><circle cx="128" cy="128" r="96" fill="none"/><circle cx="128" cy="80" r="16" stroke-width="0"/><path d="M114 108h22v76h12v8h-40v-8h12v-68h-6z"/></svg>';
const bulbIcon =
    '<svg viewBox="0 0 256 256"><path d="M94 182c0-22-11-40-21-54s-16-24-16-36 6-32 20-42 30-18 51-18 37 7 51 18 20 31 20 42-6 22-16 36-21 34-21 54z" fill="none"/><path d="M98 196h60M103 210h50M108 224h40"/></svg>';
const copyIcon =
    '<svg viewBox="0 0 256 256"><path d="M174 25H90v17.8M176 203.2h40V67l-42-42v42h42M124 52.8H40V231h126V94.8l-42-42v42h42" fill="none"/></svg>';
const gearIcon =
    '<svg viewBox="0 0 256 256"><path d="M32 138v-20l25.8-6a72 72 0 0 1 9.25-22.32l-14-22.5 14.14-14.13 22.49 14A72 72 0 0 1 112 57.8l6-25.8h20l6 25.8a72 72 0 0 1 22.32 9.25l22.5-14 14.13 14.14-14 22.49A72 72 0 0 1 198.2 112l25.8 6v20l-25.8 6a72 72 0 0 1-9.25 22.32l14 22.5-14.14 14.13-22.49-14A72 72 0 0 1 144 198.2l-6 25.8h-20l-6-25.8a72 72 0 0 1-22.32-9.25l-22.5 14-14.13-14 14-22.63A72 72 0 0 1 57.8 144z" fill="none"/><circle cx="128" cy="128" r="40" fill="none"/></svg>';
const leftarrowIcon =
    '<svg viewBox="0 0 256 256"><path d="M36 128h184M36 128l92-92M36 128l92 92" stroke-width="24"/></svg>';
const mailIcon =
    '<svg viewBox="0 0 256 256"><path d="M28 58h200v140H28V58l88 66q12 9 24 0l88-66" fill="none"/></svg>';
const sharpIcon =
    '<svg viewBox="0 0 256 256"><path d="M44 84h176M36 172h176M92 40L76 216M180 40l-16 176" stroke-width="24"/></svg>';

let bar: HTMLDivElement;

export const init = () => {
    if (!isInArticle && isInBoard) {
        bar = document.createElement('div');
        bar.id = 'navigation';
        bar.className = 'bbs-content';

        const div = document.createElement('div');
        div.id = 'navigation-container';
        div.appendChild(bar);
        document.body.insertBefore(div, document.getElementById('main-container'));
    } else {
        bar = document.getElementById('navigation') as HTMLDivElement;
    }

    editBarContent();
    addNavBtns();
};

const addNavBtns = () => {
    /* button container */
    const elem = document.createElement('div');
    elem.className = 'nav-btn-container';

    if (isInManual) {
        /* go up one level */
        const root = (bar.lastChild as HTMLAnchorElement).href;
        if (url !== root) {
            let upUrl = url.replace('/index.html', '');
            upUrl = upUrl.substr(0, upUrl.lastIndexOf('/')) + '/index.html';
            elem.appendChild(
                newNavBtn('返回上層', leftarrowIcon, () => {
                    window.location.href = upUrl;
                }),
            );
        }
    }

    if (isInArticle) {
        /* copy title and url */
        elem.appendChild(
            newNavBtn('複製文章標題/網址', copyIcon, (e: MouseEvent) => {
                const metatag = document.querySelector('meta[property="og:title"]');
                const parent = (e.target as HTMLDivElement).parentElement;
                let text = url;
                if (metatag) {
                    const title = metatag.getAttribute('content');
                    text = title + '\n' + text;
                }
                utils.copyToClipboard(text, parent);
            }),
        );

        /* AID Menu */
        const aidMenu = new AIDMenu();
        elem.appendChild(
            newNavBtn('文章代碼(AID)', sharpIcon, () => {
                aidMenu.show();
            }),
        );

        /* plain text mode */
        elem.appendChild(
            newNavBtn('開/關燈', bulbIcon, () => {
                document.getElementById('main-content').classList.toggle('plain-mode');
            }),
        );
    }

    /* setting menu */
    const settingMenu = new SettingsMenu();
    elem.appendChild(
        newNavBtn('設定', gearIcon, () => {
            settingMenu.show();
        }),
    );

    /* contact page */
    elem.appendChild(
        newNavBtn('聯絡批踢踢實業坊', mailIcon, () => {
            window.open('/contact.html');
        }),
    );

    /* about page */
    elem.appendChild(
        newNavBtn('關於批踢踢實業坊', aboutIcon, () => {
            window.open('/about.html');
        }),
    );

    bar.appendChild(elem);
};

const editBarContent = () => {
    const topbar = document.getElementById('topbar');

    bar.innerHTML = ''; // Empty navigation
    bar.appendChild(topbar.firstElementChild); // logo
    bar.appendChild(topbar.firstElementChild); // >
    bar.appendChild(topbar.firstElementChild); // board name
};

const newNavBtn = (
    title: string,
    icon: string,
    clickEvent: (this: HTMLDivElement, ev: MouseEvent) => any,
) => {
    const btn = document.createElement('div');
    btn.className = 'nav-btn';
    btn.title = title;
    btn.innerHTML = icon;
    btn.addEventListener('click', clickEvent, false);
    return btn;
};
