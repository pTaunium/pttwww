/*
 * PTTwww Article Page
 * Copyright (c) 2016-2019 pTaunium
 * Licensed under the MIT License
 */

import { isInBoard } from './constants';
import * as utils from './utils';

let floorCount = 0;
let pushCount = 0;
let arrowCount = 0;
let booCount = 0;
let isCounterInaccurate = false;
let highlightedID = '';
let content: HTMLDivElement;

export const init = () => {
    content = document.getElementById('main-content') as HTMLDivElement;
    content.innerHTML = content.innerHTML.replace(
        /(<span class="(f1 )?hl)(.*class="f3 b1 hl)(".*class="f3)(".*span>)([\d/.: ]*\n)/g,
        '<div class="push">$1 push-tag$3 push-userid$4 push-content$5<span class="push-ipdatetime">$6</span></div>',
    );

    addOriPoCSS();
    pushCounterMain();
    // richContentMain();

    const contentObserver = new MutationObserver(([mutation]) => {
        const addedNodes = mutation.addedNodes as NodeListOf<HTMLDivElement>;
        for (const node of addedNodes) {
            if (node.className !== 'new-push') { continue; }
            for (const newPushNode of (
                node.getElementsByClassName('push')
            ) as HTMLCollectionOf<HTMLDivElement>) {
                editPushNode(newPushNode);
            }
        }
        window.scrollTo({
            top: addedNodes[0].offsetTop,
            behavior: 'smooth',
        });
    });

    if (isInBoard) {
        new MutationObserver(([mutation], self) => {
            const target = mutation.target as HTMLDivElement;
            if (target.textContent === '推文會自動更新，並會自動捲動') {
                contentObserver.observe(content, {
                    childList: true,
                });
            } else {
                contentObserver.disconnect();
                if (target.className === 'fatal-error') {
                    self.disconnect();
                }
            }
        }).observe(document.getElementById('article-polling'), {
            childList: true,
        });
    }
};

const pushCounterMain = () => {
    for (const node of content.children as HTMLCollectionOf<HTMLDivElement>) {
        if (node.textContent.startsWith('※ 發信站:')) {
            resetPushCounter();
        } else if (node.className === 'push') {
            editPushNode(node);
        } else if (node.className === 'push center warning-box') {
            isCounterInaccurate = true;
        } else if (/^\(\w+ 刪除 \w+ 的推文:/.test(node.textContent)) {
            floorCount++;
        }
    }

    document.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as HTMLDivElement;
        if (target.classList.contains('push-userid')) {
            const userId = target.textContent.trim();
            if (userId === highlightedID) {
                return;
            }
            content.classList.add('push-highlight-mode');
            for (const node of content.getElementsByClassName(`push-userid-${highlightedID}`)) {
                node.classList.remove('push-highlighted');
            }
            for (const node of content.getElementsByClassName(`push-userid-${userId}`)) {
                node.classList.add('push-highlighted');
            }
            highlightedID = userId;
        } else if (highlightedID) {
            content.classList.remove('push-highlight-mode');
            for (const node of content.getElementsByClassName(`push-userid-${highlightedID}`)) {
                node.classList.remove('push-highlighted');
            }
            highlightedID = '';
        }
    });
};

const addOriPoCSS = () => {
    const amv = document.getElementsByClassName('article-meta-value')[0];
    if (amv) {
        const oriPoster = amv.textContent.match(/[\w\d]+/)[0];
        utils.injectStyles(`.push-userid-${oriPoster} .push-tag {color: #8ff;}`);
    }
};

const editPushNode = (pushNode: HTMLDivElement) => {
    const fragment = document.createDocumentFragment();
    const pushTag = pushNode.getElementsByClassName('push-tag')[0].textContent;
    const userId = pushNode.getElementsByClassName('push-userid')[0].textContent.trim();

    pushNode.classList.add(`push-userid-${userId}`);
    fragment.appendChild(newFloorSpan());
    if (pushTag === '推 ') {
        fragment.appendChild(newPushSpan());
    } else if (pushTag === '噓 ') {
        fragment.appendChild(newBooSpan());
    } else {
        fragment.appendChild(newArrowSpan());
    }
    pushNode.appendChild(fragment);
};

const resetPushCounter = () => {
    floorCount = 0;
    pushCount = 0;
    arrowCount = 0;
    booCount = 0;
};

const newSpan = (className: string, textContent: string) => {
    const span = document.createElement('span');
    span.className = className;
    if (isCounterInaccurate) {
        span.classList.add('inaccurate');
    }
    span.appendChild(document.createTextNode(textContent));
    return span;
};

const newFloorSpan = () => {
    floorCount += 1;
    return newSpan('push-counter-floor', floorCount.toString());
};

const newPushSpan = () => {
    pushCount += 1;
    return newSpan('push-counter-push', pushCount.toString());
};

const newArrowSpan = () => {
    arrowCount += 1;
    return newSpan('push-counter-arrow', arrowCount.toString());
};

const newBooSpan = () => {
    booCount += 1;
    return newSpan('push-counter-boo', booCount.toString());
};
