/*
 * PTTwww Constants
 * Copyright (c) 2016-2019 pTaunium
 * Licensed under the MIT License
 */

export const url = window.location.href;

export const isInArticle = /[M|G]\.\d+\.A(?:\.[0-9A-F]{3})?\.html/.test(url);
export const isInBoard = /bbs\/[\w-]+\//.test(url);
export const isInManual = /man\/[\w-]+\//.test(url);
export const isInSearchResult = /bbs\/[\w-]+\/search/.test(url);

export const boardName = isInBoard && url.split('/')[4];
