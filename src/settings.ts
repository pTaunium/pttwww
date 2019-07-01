/*
 * PTTwww Settings
 * Copyright (c) 2016-2019 pTaunium
 * Licensed under the MIT License
 */

import { Popup } from './popup';
import * as utils from './utils';

interface ISettings {
    fontSize: string;
    fontFamily: string;
    idBlacklist: string;
    idBlacklistType: string;
}

const defaultSettings: ISettings = {
    fontSize: '',
    fontFamily: '',
    idBlacklist: '',
    idBlacklistType: 'fade',
};

const id = 'PTTwwwUserSettings';
const userSettings = defaultSettings;
let style: HTMLStyleElement;

export const init = () => {
    style = utils.injectStyles('');

    const settings = localStorage.getItem(id);
    if (settings) {
        apply(JSON.parse(settings));
    }
};

const apply = (settings: ISettings) => {
    Object.assign(userSettings, settings);

    let styleRule = '';
    if (parseInt(userSettings.fontSize, 10) > 0) {
        styleRule += `--font-size:${userSettings.fontSize}px;`;
    }
    if (userSettings.fontFamily) {
        styleRule += `--fm-mono:${userSettings.fontFamily};`;
    }
    styleRule = `:root{${styleRule}}`;

    if (userSettings.idBlacklist) {
        let list = '';
        switch (userSettings.idBlacklistType) {
            case 'fade':
                list = userSettings.idBlacklist.replace(/ *, */g, ',.push-userid-');
                styleRule += `.push-userid-${list}{opacity:.25}\n`;
                break;
            case 'mute':
                list = userSettings.idBlacklist.replace(/ *, */g, ' .push-content,.push-userid-');
                styleRule += `.push-userid-${list} .push-content{display:none}\n`;
                break;
            case 'hide':
                list = userSettings.idBlacklist.replace(/ *, */g, ',.push-userid-');
                styleRule += `.push-userid-${list}{display:none}\n`;
                break;
        }
    }
    style.innerHTML = styleRule;
};

const save = () => {
    localStorage.setItem(id, JSON.stringify(userSettings));
};

export class SettingsMenu extends Popup {
    private settings: ISettings;

    public hide() {
        super.hide();
        apply(this.settings);
        save();
    }

    protected init() {
        const fontSizeInput = document.createElement('input');
        fontSizeInput.id = 'pttwww-fontsize';
        fontSizeInput.name = 'fontSize';
        fontSizeInput.type = 'number';
        fontSizeInput.value = userSettings.fontSize;
        fontSizeInput.min = '12';
        fontSizeInput.max = '40';
        fontSizeInput.placeholder = '自動';
        fontSizeInput.style.width = '8em';

        const fontSizeLabel = document.createElement('label');
        fontSizeLabel.htmlFor = fontSizeInput.id;
        fontSizeLabel.textContent = '字體大小：';

        const fontFamilyInput = document.createElement('input');
        fontFamilyInput.id = 'pttwww-fontfamily';
        fontFamilyInput.name = 'fontFamily';
        fontFamilyInput.type = 'text';
        fontFamilyInput.value = userSettings.fontFamily;
        fontFamilyInput.placeholder = '字型之間請用逗號隔開';
        fontFamilyInput.style.width = '24em';

        const fontFamilyLabel = document.createElement('label');
        fontFamilyLabel.htmlFor = fontFamilyInput.id;
        fontFamilyLabel.textContent = '字型：';

        const idBlacklistInput = document.createElement('input');
        idBlacklistInput.id = 'pttwww-idblacklist';
        idBlacklistInput.type = 'text';
        idBlacklistInput.value = userSettings.idBlacklist;
        idBlacklistInput.placeholder = 'ID之間請用逗號隔開';
        idBlacklistInput.style.width = '24em';

        const idBlacklistSelect = document.createElement('select');
        idBlacklistSelect.innerHTML =
            '<option value="fade">淡化</option>' +
            '<option value="mute">靜音</option>' +
            '<option value="hide">隱藏</option>';
        idBlacklistSelect.value = userSettings.idBlacklistType;

        const idBlacklistLabel = document.createElement('label');
        idBlacklistLabel.htmlFor = idBlacklistInput.id;
        idBlacklistLabel.textContent = 'ID 黑名單(僅適用於推文)：';

        this.content.oninput = () => {
            const fontSize = parseInt(fontSizeInput.value, 10);
            fontSizeInput.value = fontSize > 0 ? fontSize.toString() : '';

            idBlacklistInput.value = idBlacklistInput.value.replace(/[^a-zA-Z0-9, ]/, '');

            this.settings = {
                fontFamily: fontFamilyInput.value,
                fontSize: fontSizeInput.value,
                idBlacklist: idBlacklistInput.value,
                idBlacklistType: idBlacklistSelect.value,
            };
        };

        this.content.onsubmit = () => false;

        this.content.appendChild(fontSizeLabel);
        this.content.appendChild(document.createElement('br'));
        this.content.appendChild(fontSizeInput);
        this.content.appendChild(document.createElement('br'));
        this.content.appendChild(fontFamilyLabel);
        this.content.appendChild(document.createElement('br'));
        this.content.appendChild(fontFamilyInput);
        this.content.appendChild(document.createElement('br'));
        this.content.appendChild(idBlacklistLabel);
        this.content.appendChild(document.createElement('br'));
        this.content.appendChild(idBlacklistInput);
        this.content.appendChild(idBlacklistSelect);
        this.content.appendChild(document.createElement('br'));
    }
}
