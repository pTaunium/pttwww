// ==UserScript==
// @name         PTTwww
// @version      3.0.0
// @namespace    https://github.com/pTaunium/
// @description  改良PTT網頁版的介面與功能
// @author       pTaunium
// @homepage     https://github.com/pTaunium/pttwww
// @supportURL   https://github.com/pTaunium/pttwww/issues
// @license      MIT
//
// @include      /https://www\.ptt\.cc/(ask|bbs|cls|man|captcha)/
// @run-at       document-start
//
// @updateURL    https://github.com/pTaunium/pttwww/raw/master/dist/pttwww.meta.js
// @downloadURL  https://github.com/pTaunium/pttwww/raw/master/dist/pttwww.user.js
// ==/UserScript==

const css = `@charset "UTF-8";
:root {
  --font-size: 16px;
  --fm-serif: serif;
  --fm-sans: Inconsolata, sans-serif;
  --fm-mono: 細明體, AR PL UMing TW, Inconsolata, LiSongPro, monospace;
}
@media screen and (min-width: 800px) and (min-height: 480px) {
  :root { --font-size: 20px; }
}
@media screen and (min-width: 960px) and (min-height: 576px) {
  :root { --font-size: 24px; }
}
@media screen and (min-width: 1120px) and (min-height: 672px) {
  :root { --font-size: 28px; }
}
body {
  margin: 0;
  padding: 0;
  overflow-y: scroll;
  font-family: var(--fm-serif);
  font-size: var(--font-size);
  -webkit-font-variant-ligatures: none;
          font-variant-ligatures: none;
  font-weight: 400;
}
img {
  max-width: 100%;
  max-height: 100%;
}
#topbar-container {
  display: none;
}
#main-container {
  width: 100%;
  padding: 0 0 1.5em;
}
#main-content {
  margin: .25em auto;
}
#main-content a:link {
  box-shadow: none;
  text-decoration: underline;
}
#main-content a:hover {
  box-shadow: none;
}
.bbs-screen {
  width: 40em;
  min-width: 40em;
  max-width: 40em;
  font-family: var(--fm-mono);
}
.bbs-content {
  font-family: var(--fm-mono);
  font-size: var(--font-size);
}
.richcontent {
  max-width: 32em;
}
.article-meta-tag,
.article-meta-value {
  display: inline-block;
}
#article-polling {
  min-width: 40em;
  max-width: 40em;
  margin: .5em auto;
  padding: 0 .25em;
  font-family: var(--fm-mono);
  font-size: var(--font-size);
  line-height: 1.5;
}
#article-polling:hover {
  background-color: #444;
  color: #aaa;
}
#article-polling.fatal-error {
  cursor: not-allowed !important;
}
.bbs-footer-message {
  margin: .5em auto;
}
#navigation {
  position: relative;
  width: 40em;
  min-width: 40em;
  max-width: 40em;
  height: 1.5em;
}
#navigation > * {
  padding: 0;
  line-height: 1.5;
}
#navigation #logo {
  padding: 0 .25em;
  color: #0c0a66;
}
#navigation .board {
  padding: 0 .25em;
}
#navigation .board-label {
  font-size: 50%;
  text-decoration: none;
}
#navigation .nav-btn-container {
  position: absolute;
  right: 0;
}
#navigation .nav-btn {
  display: inline-block;
  width: 1.3em;
  height: 1.3em;
  margin: .1em;
  border-radius: .2em;
  cursor: pointer;
}
#navigation .nav-btn:hover {
  background-color: #eee;
  box-shadow: .05em .05em .05em #888;
}
#navigation .nav-btn:active {
  background-color: #eee;
  box-shadow: inset .05em .05em .05em #888;
}
#navigation .nav-btn svg {
  fill: #333;
  stroke: #333;
  stroke-width: 8;
  stroke-linecap: round;
  stroke-linejoin: round;
  position: relative;
}
#navigation .nav-btn:active svg {
  top: .025em;
  left: .025em;
}
.push {
  width: 39em;
  line-height: 1;
}
.push-tag {
  min-width: 0;
}
[class^='push-counter'] {
  display: none;
  float: right;
  color: #fff;
}
[class^='push-counter'].inaccurate {
  opacity: .5;
}
.push-counter-floor::after {
  content: 'F';
}
.push-counter-push::before,
.push-counter-arrow::before,
.push-counter-boo::before {
  content: '#';
}
.push-counter-push::after {
  color: #6f6;
  content: '推 ';
}
.push-counter-arrow::after {
  color: #ff6;
  content: '→ ';
}
.push-counter-boo::after {
  color: #f66;
  content: '噓 ';
}
.push:hover {
  background-color: #fff1;
}
.push:hover > .push-ipdatetime {
  display: none;
}
.push:hover > [class^='push-counter'] {
  display: inline-block;
}
.push-userid {
  cursor: pointer;
}
.push-highlight-mode .push > span {
  opacity: .1;
}
.push-highlight-mode .push-userid:hover {
  opacity: .75;
}
.push-highlight-mode .push.push-highlighted > span {
  opacity: 1;
}
.warning-box {
  margin: .25em 0;
  line-height: 1.5;
  cursor: not-allowed;
}
.warning-box:hover {
  background-color: #333;
}
#action-bar-container {
  padding: 0;
  background-color: transparent;
}
.action-bar {
  width: 40em;
  min-width: 40em;
  max-width: 40em;
  height: 2.4em;
  background-color: rgba(0,0,0,.75);
}
.btn-group {
  display: -webkit-box;
  display: flex;
  font-size: var(--font-size);
}
.btn-group-dir {
  width: auto;
  float: left;
}
.btn-group-paging {
  display: none;
}
.btn-group .btn {
  margin: 0;
  padding: 0 1.5em;
  font-family: var(--fm-sans);
  font-size: .75em;
  line-height: 3.2;
}
.btn-group .btn + .btn {
  margin: 0;
}
.search-bar {
  padding: 0;
  float: right;
  font-size: var(--font-size);
}
.search-bar .query {
  width: 10em;
  height: 2.4em;
  padding: 0 .5em;
  -webkit-transition: width .4s;
  transition: width .4s;
}
.search-bar .query:focus {
  width: 24em;
}
.search-bar .query:hover {
  border-color: #888;
}
.b-list-container {
  margin: 2.4em auto -1.25em;
  padding: 0;
}
.b-ent {
  line-height: 1;
}
.b-ent .board {
  height: 1em;
  padding: 0;
  font-size: var(--font-size);
}
.b-ent .board > div {
  font-family: var(--fm-mono);
  font-size: var(--font-size);
}
.b-ent .board > :first-child {
  padding: 0;
}
.board-name {
  width: 10em;
}
.board-nuser {
  width: 5em;
  padding: 0;
}
.board-class {
  width: 3em;
}
.r-list-container {
  margin: 2.75em auto .5em;
  padding-top: 0;
}
.r-ent-top,
.r-ent-bottom {
  line-height: 2.5;
  text-align: center;
}
.r-ent {
  height: 2.5em;
  margin: 0;
  padding: 0;
  line-height: 1.25;
}
.r-ent:hover {
  background-color: #222;
}
.r-ent > div {
  font-size: var(--font-size);
}
.r-ent .nrec {
  width: 2em;
  padding: 0;
  font-family: var(--fm-serif);
}
.r-ent .title,
.r-ent .meta {
  margin: 0 0 0 3em;
  padding: 0;
}
.r-ent .meta .author {
  padding: 0;
  font-family: var(--fm-mono);
}
.r-ent .meta .article-menu {
  width: 2em;
  height: 1.25em;
  margin: 0;
  padding: 0;
}
.article-menu:hover {
  background-color: #333;
}
.article-menu .trigger {
  margin: 0;
}
.article-menu .dropdown {
  display: block;
}
.article-menu .item a {
  padding: .5em;
  line-height: 1;
}
.article-menu .item {
  height: 0;
  overflow: hidden;
  line-height: 1;
  -webkit-transition: height .2s;
  transition: height .2s;
}
.article-menu.shown .item {
  height: 2em;
}
.r-ent .meta .date {
  min-width: 3em;
  margin: 0;
  padding: 0;
  font-family: var(--fm-serif);
}
.r-ent .meta .mark {
  width: 1em;
  margin: 0;
  padding: 0;
  font-family: var(--fm-sans);
}
.m-list-container {
  margin-top: 2.75em;
  margin-bottom: 0;
  padding-top: 0;
}
.m-ent {
  height: 1em;
  margin: 0;
  padding: 0;
  line-height: 1;
}
.m-ent:hover {
  background-color: #222;
}
.m-ent > div {
  font-family: var(--fm-mono);
  font-size: var(--font-size);
}
.m-ent a {
  text-decoration: none;
  white-space: pre-wrap;
}
.over18-notice p {
  margin: 1em;
  text-align: justify;
}
.bbs-screen a,
.bbs-screen a:link,
.bbs-screen a:visited {
  color: inherit;
}
.bbs-screen a:hover {
  background-color: #bbb;
  color: #000;
}
a > span {
  text-decoration: underline;
}
a:hover .b0,
a:hover .b1,
a:hover .b2,
a:hover .b3,
a:hover .b4,
a:hover .b5,
a:hover .b6,
a:hover .b7,
a:hover .b8 { background-color: inherit; }
a:hover .f0,
a:hover .f1,
a:hover .f2,
a:hover .f3,
a:hover .f4,
a:hover .f5,
a:hover .f6,
a:hover .f7,
a:hover .f8,
a:hover .hl { color: inherit; }
.b0 a:hover, a:hover .b0 { color: #000; }
.b1 a:hover, a:hover .b1 { color: #b00; }
.b2 a:hover, a:hover .b2 { color: #0b0; }
.b3 a:hover, a:hover .b3 { color: #bb0; }
.b4 a:hover, a:hover .b4 { color: #00b; }
.b5 a:hover, a:hover .b5 { color: #b0b; }
.b6 a:hover, a:hover .b6 { color: #0bb; }
.b7 a:hover, a:hover .b7 { color: #bbb; }
.f0 a:hover, a:hover .f0 { background-color: #000; }
.f1 a:hover, a:hover .f1 { background-color: #900; }
.f2 a:hover, a:hover .f2 { background-color: #090; }
.f3 a:hover, a:hover .f3 { background-color: #990; }
.f4 a:hover, a:hover .f4 { background-color: #009; }
.f5 a:hover, a:hover .f5 { background-color: #909; }
.f6 a:hover, a:hover .f6 { background-color: #099; }
.f7 a:hover, a:hover .f7 { background-color: #000; }
.hl    a:hover, a:hover .hl    { background-color: #fff; }
.hl.f0 a:hover, a:hover .hl.f0 { background-color: #666; }
.hl.f1 a:hover, a:hover .hl.f1 { background-color: #f66; }
.hl.f2 a:hover, a:hover .hl.f2 { background-color: #6f6; }
.hl.f3 a:hover, a:hover .hl.f3 { background-color: #ff6; }
.hl.f4 a:hover, a:hover .hl.f4 { background-color: #66f; }
.hl.f5 a:hover, a:hover .hl.f5 { background-color: #f6f; }
.hl.f6 a:hover, a:hover .hl.f6 { background-color: #6ff; }
.hl.f7 a:hover, a:hover .hl.f7 { background-color: #fff; }
.plain-mode .f0,
.plain-mode .f1,
.plain-mode .f2,
.plain-mode .f3,
.plain-mode .f4,
.plain-mode .f5,
.plain-mode .f6,
.plain-mode .f7,
.plain-mode .f8,
.plain-mode .hl { color: #bbb; }
.plain-mode .b0,
.plain-mode .b1,
.plain-mode .b2,
.plain-mode .b3,
.plain-mode .b4,
.plain-mode .b5,
.plain-mode .b6,
.plain-mode .b7,
.plain-mode .b8 { background-color: transparent; }
.plain-mode a:hover,
.plain-mode a:hover .f0 {
  background-color: #bbb;
  color: #000;
}
.pttwww-popup-overlay {
  z-index: 999;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,.875);
  opacity: 1;
  -webkit-transition: .4s;
  transition: .4s;
}
.pttwww-popup-container {
  position: absolute;
  top: 50%;
  width: 100%;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
  -webkit-transition: .4s;
  transition: .4s;
}
.pttwww-popup-content {
  display: table;
  margin: 0 auto;
  padding: 1em 2em;
  border-radius: .25em;
  background-color: #fff;
  font-family: var(--fm-sans);
  font-size: .75em;
}
.pttwww-popup-content label {
  display: inline-block;
  margin-top: .5em;
  font-weight: bold;
}
.pttwww-popup-content input,
.pttwww-popup-content select {
  box-sizing: content-box;
  height: 2em;
  margin: .25em;
  padding: 0 .5em;
  border: #ccc .05em solid;
  border-radius: .25em;
  outline: none !important;
  font-family: inherit;
  font-size: inherit;
  vertical-align: middle;
}
.pttwww-popup-content input[type=submit] {
  cursor: pointer;
}
.pttwww-popup-content input:hover,
.pttwww-popup-content select:hover {
  border-color: #aaa;
}
.pttwww-popup-content input:focus,
.pttwww-popup-content input:active,
.pttwww-popup-content select:focus,
.pttwww-popup-content select:active {
  border-color: #333
}
.pttwww-popup-content input:disabled {
  border-color: initial;
  cursor: not-allowed;
}
.pttwww-popup-content input.error {
  border-color: #f00;
}
.pttwww-popup-overlay.hide {
  z-index: -1;
  opacity: 0;
}
.pttwww-popup-overlay.hide > .pttwww-popup-container {
  top: 100%;
}
`;
const url = window.location.href;
const isInArticle = /[M|G]\.\d+\.A(?:\.[0-9A-F]{3})?\.html/.test(url);
const isInBoard = /bbs\/[\w-]+\//.test(url);
const isInManual = /man\/[\w-]+\//.test(url);
const isInSearchResult = /bbs\/[\w-]+\/search/.test(url);
const boardName = isInBoard && url.split('/')[4];

let container;
let topPage = 0;
let bottomPage = 0;
const init = async () => {
    container = document.getElementsByClassName('r-list-container')[0];
    if (!container) {
        return;
    }
    moveSearchBar();
    const pages = url.match(/index(\d*)\.html(?:#(\d+)\.\.(\d+))?/);
    if (pages[1] && pages[1] !== '0') {
        await load(+pages[1], false);
    } else if (pages[2]) {
        await load(+pages[2]);
    } else {
        const anch = document.getElementsByClassName('btn wide')[1];
        const page = anch.href.match(/(\d+)\.html/)[1];
        await load(+page + 1);
    }
    const topDiv = document.createElement('div');
    let topLoading = false;
    topDiv.className = 'r-ent-top';
    topDiv.textContent = 'Loading...';
    container.insertBefore(topDiv, container.firstChild);
    window.scrollBy(0, topDiv.clientHeight);
    new IntersectionObserver(async ([entry], self) => {
        if (entry.isIntersecting && !topLoading) {
            topLoading = true;
            const list = await getList(topPage - 1);
            if (list) {
                const listHeight = document.getElementsByClassName('r-ent')[0].clientHeight;
                const listLength = list.children.length;
                container.insertBefore(list, topDiv.nextSibling);
                topPage -= 1;
                updateHistory();
                window.scrollBy(0, listHeight * listLength);
            }
            topLoading = false;
        } else if (topPage === 1) {
            self.disconnect();
            topDiv.remove();
        }
    }).observe(topDiv);
    const bottomDiv = document.createElement('div');
    let bottomLoading = false;
    bottomDiv.className = 'r-ent-bottom';
    bottomDiv.textContent = 'Loading...';
    container.appendChild(bottomDiv);
    new IntersectionObserver(async ([entry], self) => {
        if (entry.isIntersecting && !bottomLoading) {
            bottomLoading = true;
            const list = await getList(bottomPage + 1);
            if (list) {
                container.insertBefore(list, bottomDiv);
                bottomPage += 1;
                updateHistory();
            } else {
                self.disconnect();
                bottomDiv.remove();
            }
            bottomLoading = false;
        }
    }).observe(bottomDiv);
    container.addEventListener('click', (e) => {
        const target = e.target;
        if (target.className === 'trigger') {
            const isShown = target.parentElement.classList.contains('shown');
            for (const node of document.querySelectorAll('.article-menu.shown')) {
                node.classList.toggle('shown');
            }
            if (!isShown) {
                target.parentElement.classList.toggle('shown');
            }
            e.stopPropagation();
        }
    });
};
const moveSearchBar = () => {
    document
        .getElementsByClassName('action-bar')[0]
        .appendChild(document.getElementsByClassName('search-bar')[0]);
};
const load = async (page = 1, reload = true) => {
    if (reload) {
        container.innerHTML = '';
        let list = await getList(page);
        if (!list) {
            const anch = document.getElementsByClassName('btn wide')[1];
            page = parseInt(anch.href.match(/(\d+)\.html/)[1], 10);
            list = await getList(page);
        }
        container.appendChild(list);
    }
    topPage = page;
    bottomPage = page;
    updateHistory();
};
const getList = async (page) => {
    const res = await fetch(`index${page}.html`, {
        method: 'GET',
        credentials: 'same-origin',
    });
    if (res.ok) {
        const parser = new DOMParser();
        const resp = parser.parseFromString(await res.text(), 'text/html');
        const list = resp.getElementsByClassName('r-list-container')[0];
        const fragment = document.createDocumentFragment();
        while (list.firstElementChild) {
            const item = list.firstElementChild;
            if (item.className === 'search-bar') {
                item.remove();
            } else {
                fragment.appendChild(item);
            }
        }
        return fragment;
    } else {
        return null;
    }
};
const updateHistory = () => {
    window.history.replaceState('', '', `//www.ptt.cc/bbs/${boardName}/index.html#${topPage}..${bottomPage}`);
};

const injectStyles = (rules) => {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = rules;
    return document.head.appendChild(style);
};
const injectMetaTag = (name, content) => {
    const meta = document.createElement('meta');
    meta.name = name;
    meta.content = content;
    return document.head.appendChild(meta);
};
const copyToClipboard = (text, parent = document.body) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    parent.appendChild(textarea);
    textarea.select();
    try {
        return document.execCommand('copy');
    } catch (err) {
        console.warn('Copy text to clipboard failed.', err);
        return false;
    } finally {
        textarea.remove();
    }
};

let floorCount = 0;
let pushCount = 0;
let arrowCount = 0;
let booCount = 0;
let isCounterInaccurate = false;
let highlightedID = '';
let content;
const init$1 = () => {
    content = document.getElementById('main-content');
    content.innerHTML = content.innerHTML.replace(/(<span class="(f1 )?hl)(.*class="f3 b1 hl)(".*class="f3)(".*span>)([\d/.: ]*\n)/g, '<div class="push">$1 push-tag$3 push-userid$4 push-content$5<span class="push-ipdatetime">$6</span></div>');
    addOriPoCSS();
    pushCounterMain();
    const contentObserver = new MutationObserver(([mutation]) => {
        const addedNodes = mutation.addedNodes;
        for (const node of addedNodes) {
            if (node.className !== 'new-push') {
                continue;
            }
            for (const newPushNode of (node.getElementsByClassName('push'))) {
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
            const target = mutation.target;
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
    for (const node of content.children) {
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
    document.addEventListener('click', (e) => {
        const target = e.target;
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
        injectStyles(`.push-userid-${oriPoster} .push-tag {color: #8ff;}`);
    }
};
const editPushNode = (pushNode) => {
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
const newSpan = (className, textContent) => {
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

class Popup {
    constructor() {
        const overlay = document.createElement('div');
        const container = document.createElement('div');
        const content = document.createElement('form');
        overlay.className = 'pttwww-popup-overlay hide';
        container.className = 'pttwww-popup-container';
        content.className = 'pttwww-popup-content';
        overlay.addEventListener('click', (e) => {
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
    show() {
        const mainContainer = document.getElementById('main-container');
        const y = mainContainer.getBoundingClientRect().top - mainContainer.offsetTop;
        mainContainer.style.top = `${y}px`;
        mainContainer.style.position = 'fixed';
        this.overlay.classList.remove('hide');
    }
    hide() {
        const mainContainer = document.getElementById('main-container');
        const y = parseFloat(mainContainer.style.top);
        mainContainer.style.position = '';
        mainContainer.style.top = '';
        window.scrollBy(0, -y);
        this.overlay.classList.add('hide');
    }
}

const aidTable = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
const fn2aid = (fn) => {
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
const aid2fn = (aidc) => {
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
class AIDMenu extends Popup {
    init() {
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

const defaultSettings = {
    fontSize: '',
    fontFamily: '',
    idBlacklist: '',
    idBlacklistType: 'fade',
};
const id = 'PTTwwwUserSettings';
const userSettings = defaultSettings;
let style;
const init$2 = () => {
    style = injectStyles('');
    const settings = localStorage.getItem(id);
    if (settings) {
        apply(JSON.parse(settings));
    }
};
const apply = (settings) => {
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
class SettingsMenu extends Popup {
    hide() {
        super.hide();
        apply(this.settings);
        save();
    }
    init() {
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

const aboutIcon = '<svg viewBox="0 0 256 256"><circle cx="128" cy="128" r="96" fill="none"/><circle cx="128" cy="80" r="16" stroke-width="0"/><path d="M114 108h22v76h12v8h-40v-8h12v-68h-6z"/></svg>';
const bulbIcon = '<svg viewBox="0 0 256 256"><path d="M94 182c0-22-11-40-21-54s-16-24-16-36 6-32 20-42 30-18 51-18 37 7 51 18 20 31 20 42-6 22-16 36-21 34-21 54z" fill="none"/><path d="M98 196h60M103 210h50M108 224h40"/></svg>';
const copyIcon = '<svg viewBox="0 0 256 256"><path d="M174 25H90v17.8M176 203.2h40V67l-42-42v42h42M124 52.8H40V231h126V94.8l-42-42v42h42" fill="none"/></svg>';
const gearIcon = '<svg viewBox="0 0 256 256"><path d="M32 138v-20l25.8-6a72 72 0 0 1 9.25-22.32l-14-22.5 14.14-14.13 22.49 14A72 72 0 0 1 112 57.8l6-25.8h20l6 25.8a72 72 0 0 1 22.32 9.25l22.5-14 14.13 14.14-14 22.49A72 72 0 0 1 198.2 112l25.8 6v20l-25.8 6a72 72 0 0 1-9.25 22.32l14 22.5-14.14 14.13-22.49-14A72 72 0 0 1 144 198.2l-6 25.8h-20l-6-25.8a72 72 0 0 1-22.32-9.25l-22.5 14-14.13-14 14-22.63A72 72 0 0 1 57.8 144z" fill="none"/><circle cx="128" cy="128" r="40" fill="none"/></svg>';
const leftarrowIcon = '<svg viewBox="0 0 256 256"><path d="M36 128h184M36 128l92-92M36 128l92 92" stroke-width="24"/></svg>';
const mailIcon = '<svg viewBox="0 0 256 256"><path d="M28 58h200v140H28V58l88 66q12 9 24 0l88-66" fill="none"/></svg>';
const sharpIcon = '<svg viewBox="0 0 256 256"><path d="M44 84h176M36 172h176M92 40L76 216M180 40l-16 176" stroke-width="24"/></svg>';
let bar;
const init$3 = () => {
    if (!isInArticle && isInBoard) {
        bar = document.createElement('div');
        bar.id = 'navigation';
        bar.className = 'bbs-content';
        const div = document.createElement('div');
        div.id = 'navigation-container';
        div.appendChild(bar);
        document.body.insertBefore(div, document.getElementById('main-container'));
    } else {
        bar = document.getElementById('navigation');
    }
    editBarContent();
    addNavBtns();
};
const addNavBtns = () => {
    const elem = document.createElement('div');
    elem.className = 'nav-btn-container';
    if (isInManual) {
        const root = bar.lastChild.href;
        if (url !== root) {
            let upUrl = url.replace('/index.html', '');
            upUrl = upUrl.substr(0, upUrl.lastIndexOf('/')) + '/index.html';
            elem.appendChild(newNavBtn('返回上層', leftarrowIcon, () => {
                window.location.href = upUrl;
            }));
        }
    }
    if (isInArticle) {
        elem.appendChild(newNavBtn('複製文章標題/網址', copyIcon, (e) => {
            const metatag = document.querySelector('meta[property="og:title"]');
            const parent = e.target.parentElement;
            let text = url;
            if (metatag) {
                const title = metatag.getAttribute('content');
                text = title + '\n' + text;
            }
            copyToClipboard(text, parent);
        }));
        const aidMenu = new AIDMenu();
        elem.appendChild(newNavBtn('文章代碼(AID)', sharpIcon, () => {
            aidMenu.show();
        }));
        elem.appendChild(newNavBtn('開/關燈', bulbIcon, () => {
            document.getElementById('main-content').classList.toggle('plain-mode');
        }));
    }
    const settingMenu = new SettingsMenu();
    elem.appendChild(newNavBtn('設定', gearIcon, () => {
        settingMenu.show();
    }));
    elem.appendChild(newNavBtn('聯絡批踢踢實業坊', mailIcon, () => {
        window.open('/contact.html');
    }));
    elem.appendChild(newNavBtn('關於批踢踢實業坊', aboutIcon, () => {
        window.open('/about.html');
    }));
    bar.appendChild(elem);
};
const editBarContent = () => {
    const topbar = document.getElementById('topbar');
    bar.innerHTML = '';
    bar.appendChild(topbar.firstElementChild);
    bar.appendChild(topbar.firstElementChild);
    bar.appendChild(topbar.firstElementChild);
};
const newNavBtn = (title, icon, clickEvent) => {
    const btn = document.createElement('div');
    btn.className = 'nav-btn';
    btn.title = title;
    btn.innerHTML = icon;
    btn.addEventListener('click', clickEvent, false);
    return btn;
};

const main = () => {
    if (isInArticle) {
        init$1();
    } else if (isInBoard) {
        if (isInSearchResult) {
            moveSearchBar();
        } else {
            init();
        }
    }
    init$3();
};
const init$4 = () => {
    if (document.head === null) {
        setTimeout(init$4, 50);
        return;
    }
    if (window.navigator.userAgent.indexOf('Edge') > -1) {
        injectMetaTag('referrer', 'never');
    } else {
        injectMetaTag('referrer', 'no-referrer');
    }
    injectStyles(css);
    init$2();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }
};
init$4();
