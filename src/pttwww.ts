/*
 * PTTwww Main
 * Copyright (c) 2016-2019 pTaunium
 * Licensed under the MIT License
 */

import { isInArticle, isInBoard, isInSearchResult } from './constants';

import * as articleListPage from './articleListPage';
import * as articlePage from './articlePage';
import * as navbar from './navbar';
import * as settings from './settings';
import * as utils from './utils';

/** text from `pttwww.css` */
declare const css: string;

const main = () => {
    if (isInArticle) {
        articlePage.init();
    } else if (isInBoard) {
        if (isInSearchResult) {
            articleListPage.moveSearchBar();
        } else {
            articleListPage.init();
        }
    }
    navbar.init();
};

const init = () => {
    if (document.head === null) {
        setTimeout(init, 50);
        return;
    }

    if (window.navigator.userAgent.indexOf('Edge') > -1) {
        utils.injectMetaTag('referrer', 'never');
    } else {
        utils.injectMetaTag('referrer', 'no-referrer');
    }

    utils.injectStyles(css);
    settings.init();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }
};

init();
