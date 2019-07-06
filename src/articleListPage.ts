/*
 * PTTwww Article List Page
 * Copyright (c) 2016-2019 pTaunium
 * Licensed under the MIT License
 */

import { boardName, url } from './constants';

let listContainer: HTMLDivElement;
let topPage = 0;
let bottomPage = 0;

export const init = async () => {
    listContainer = document.getElementsByClassName('r-list-container')[0] as HTMLDivElement;
    if (!listContainer) { return; }

    await moveSearchBar();

    const pages = url.match(/index(\d*)\.html(?:#(\d+)\.\.(\d+))?/);
    if (pages[1] && pages[1] !== '0') {
        await load(+pages[1], false);
    } else if (pages[2]) {
        await load(+pages[2]);
    } else {
        const anch = document.getElementsByClassName('btn wide')[1] as HTMLAnchorElement;
        const page = anch.href.match(/(\d+)\.html/)[1];
        await load(+page + 1);
    }

    const topDiv = document.createElement('div');
    let topLoading = false;
    topDiv.className = 'r-ent-top';
    topDiv.textContent = 'Loading...';
    listContainer.insertBefore(topDiv, listContainer.firstChild);
    window.scrollBy(0, topDiv.clientHeight);
    new IntersectionObserver(async ([entry], self) => {
        if (entry.isIntersecting && !topLoading) {
            topLoading = true;
            const list = await getList(topPage - 1);
            if (list) {
                const listHeight = document.getElementsByClassName('r-ent')[0].clientHeight;
                const listLength = list.children.length;
                listContainer.insertBefore(list, topDiv.nextSibling);
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
    listContainer.appendChild(bottomDiv);
    new IntersectionObserver(async ([entry], self) => {
        if (entry.isIntersecting && !bottomLoading) {
            bottomLoading = true;
            const list = await getList(bottomPage + 1);
            if (list) {
                listContainer.insertBefore(list, bottomDiv);
                bottomPage += 1;
                updateHistory();
            } else {
                self.disconnect();
                bottomDiv.remove();
            }
            bottomLoading = false;
        }
    }).observe(bottomDiv);

    listContainer.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as HTMLDivElement;
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

export const moveSearchBar = async () => {
    document
        .getElementsByClassName('action-bar')[0]
        .appendChild(document.getElementsByClassName('search-bar')[0]);
};

const load = async (page = 1, reload = true) => {
    if (reload) {
        while (listContainer.firstChild) {  // Empty the list
            listContainer.firstChild.remove();
        }
        let list = await getList(page);
        if (!list) {
            const anch = document.getElementsByClassName('btn wide')[1] as HTMLAnchorElement;
            page = parseInt(anch.href.match(/(\d+)\.html/)[1], 10);
            list = await getList(page);
        }
        listContainer.appendChild(list);
    }
    topPage = page;
    bottomPage = page;
    updateHistory();
};

const getList = async (page: number) => {
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
    window.history.replaceState(
        '',
        '',
        `//www.ptt.cc/bbs/${boardName}/index.html#${topPage}..${bottomPage}`,
    );
};
