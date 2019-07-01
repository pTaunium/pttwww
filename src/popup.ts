/*
 * PTTwww Pop-up Menu
 * Copyright (c) 2016-2019 pTaunium
 * Licensed under the MIT License
 */

/** Pop-up Menu */
export abstract class Popup {
    protected overlay: HTMLDivElement;
    protected content: HTMLFormElement;

    constructor() {
        const overlay = document.createElement('div');
        const container = document.createElement('div');
        const content = document.createElement('form');

        overlay.className = 'pttwww-popup-overlay hide';
        container.className = 'pttwww-popup-container';
        content.className = 'pttwww-popup-content';

        overlay.addEventListener('click', (e: MouseEvent) => {
            if (e.target === overlay || e.target === container) {
                this.hide();
            }
        });

        container.appendChild(content);
        overlay.appendChild(container);
        document.body.appendChild(overlay);

        this.overlay = overlay;
        this.content = content;

        this.init();
    }

    public show() {
        const mainContainer = document.getElementById('main-container');
        const y = mainContainer.getBoundingClientRect().top - mainContainer.offsetTop;
        mainContainer.style.top = `${y}px`;
        mainContainer.style.position = 'fixed';
        this.overlay.classList.remove('hide');
    }

    public hide() {
        const mainContainer = document.getElementById('main-container');
        const y = parseFloat(mainContainer.style.top);
        mainContainer.style.position = '';
        mainContainer.style.top = '';
        window.scrollBy(0, -y);
        this.overlay.classList.add('hide');
    }

    protected abstract init(): void; // To be implemented
}
