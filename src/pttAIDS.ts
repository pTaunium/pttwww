/*
 * PTTwww PTT Article IDentification System
 * Copyright (c) 2016-2019 pTaunium
 * Licensed under the MIT License
 */

// Reference:
// https://github.com/ptt/pttbbs/blob/master/docs/aids.txt

import { boardName, url } from './constants';
import { Popup } from './popup';

const aidTable = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';

/**
 * filename to AID
 * @param {string} fn filename
 * @returns {string} AID compressed
 */
export const fn2aid = (fn: string): string => {
    let [, type, v1, v2] = fn.match(/(M|G)\.(\d+)\.A(?:\.([0-9A-F]{3}))?/);

    if (type === 'M') {
        type = '0000';
    } else if (type === 'G') {
        type = '0001';
    }
    v1 = parseInt(v1, 10).toString(2).padStart(32, '0');
    v2 = parseInt(v2 || '0', 16).toString(2).padStart(12, '0');

    const aidu = type + v1 + v2;
    let aidc = '';
    for (const sp of aidu.match(/[01]{6}/g)) {
        aidc += aidTable[parseInt(sp, 2)];
    }
    return aidc;
};

/**
 * AID to filename
 * @param {string} aidc AID compressed
 * @returns {string} filename
 */
export const aid2fn = (aidc: string): string => {
    let aidu = '';
    for (const sp of aidc) {
        aidu += aidTable.indexOf(sp).toString(2).padStart(6, '0');
    }

    let type = aidu.substring(0, 4);
    let v1 = aidu.substring(4, 36);
    let v2 = aidu.substring(36);

    if (type === '0000') {
        type = 'M';
    } else if (type === '0001') {
        type = 'G';
    } else {
        return '';
    }
    v1 = parseInt(v1, 2).toString();
    v2 = parseInt(v2, 2).toString(16).toUpperCase().padStart(3, '0');

    if (v2 === '000') {
        return `${type}.${v1}.A`;
    }
    return `${type}.${v1}.A.${v2}`;
};

export class AIDMenu extends Popup {
    private data: {
        aid: string,
        boardName: string,
    };

    protected init() {
        this.data = { aid: '', boardName: '' };

        const boardNameInput = document.createElement('input');
        boardNameInput.type = 'text';
        boardNameInput.value = boardName;
        boardNameInput.maxLength = 12;
        boardNameInput.placeholder = '看板名稱';
        boardNameInput.style.width = '8em';

        const aidInput = document.createElement('input');
        aidInput.type = 'text';
        aidInput.maxLength = 9;
        aidInput.placeholder = '文章代碼(AID)';
        aidInput.style.width = '8em';

        const submitBtn = document.createElement('input');
        submitBtn.type = 'submit';
        submitBtn.value = '出發！';
        submitBtn.disabled = true;

        this.content.oninput = () => {
            const bname = boardNameInput.value.trim();
            let aid = aidInput.value.trim();

            if (aid && !aid.startsWith('#')) {
                aid = `#${aid}`;
                aidInput.value = aid;
            }

            submitBtn.disabled = false;
            if (/^#[0-9A-Za-z-_]{8}$/.test(aid)) {
                aidInput.classList.remove('error');
                this.data.aid = aid;
            } else {
                aidInput.classList.add('error');
                submitBtn.disabled = true;
            }

            if (/^[0-9A-Za-z-_]{2,12}$/.test(bname)) {
                boardNameInput.classList.remove('error');
                this.data.boardName = bname;
            } else {
                boardNameInput.classList.add('error');
                submitBtn.disabled = true;
            }
        };

        this.content.onsubmit = () => {
            const bname = this.data.boardName;
            const fname = aid2fn(this.data.aid.replace('#', ''));
            if (fname) {
                window.open(`/bbs/${bname}/${fname}.html`);
            } else {
                aidInput.classList.add('error');
                submitBtn.disabled = true;
            }
            return false;
        };

        const infoText = `文章代碼(AID): #${fn2aid(url)} (${boardName})`;
        this.content.appendChild(document.createTextNode(infoText));
        this.content.appendChild(document.createElement('br'));
        this.content.appendChild(document.createElement('br'));
        this.content.appendChild(document.createTextNode('傳送門：'));
        this.content.appendChild(boardNameInput);
        this.content.appendChild(aidInput);
        this.content.appendChild(submitBtn);
    }
}
