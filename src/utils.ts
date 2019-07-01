/*
 * PTTwww Utilities
 * Copyright (c) 2016-2019 pTaunium
 * Licensed under the MIT License
 */

/**
 * inject style rules to the document
 * @param {string} rules
 */
export const injectStyles = (rules: string): HTMLStyleElement => {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = rules;
    return document.head.appendChild(style);
};

/**
 * inject a script file to the document
 * @param {string} scriptUrl url of the script file
 * @param {string} encoding character encoding of the script file, defalut: 'utf-8'
 */
export const injectScript = (scriptUrl: string, encoding: string = 'utf-8'): HTMLScriptElement => {
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.charset = encoding;
    return document.head.appendChild(script);
};

/**
 * inject a meta tag to the document
 * @param {string} name
 * @param {string} content
 */
export const injectMetaTag = (name: string, content: string): HTMLMetaElement => {
    const meta = document.createElement('meta');
    meta.name = name;
    meta.content = content;
    return document.head.appendChild(meta);
};

/**
 * copy text to clipboard
 * @param {string} text
 * @param {HTMLElement} parent parent of the invisible textarea
 */
export const copyToClipboard = (text: string, parent: HTMLElement = document.body): boolean => {
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
