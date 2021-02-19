// ==UserScript==
// @name         Print Styles: Paypal
// @version      0.2
// @description  A userscript that sets up better print styles for Paypal.
// @license      MIT
// @author       Lauren George <https://atomicpurple.com>
// @namespace    https://github.com/lmgeorge/tampermonkey-scripts
// @updateURL    https://raw.githubusercontent.com/lmgeorge/tampermonkey-scripts/main/print-styles-paypal.user.js
// @downloadURL  https://raw.githubusercontent.com/lmgeorge/tampermonkey-scripts/main/print-styles-paypal.user.js
// @include      https://www.paypal.com/myaccount/transactions/details/*
// @include      https://paypal.com/myaccount/transactions/details/*
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const css = `
        <style title="atomicpurple:print-styles-paypal">
            @media print {

                .td-fullpage-container ~ *,
                .globalNav-main,
                .vx_globalFooter,
                .ppvx_text--sm.action {
                    display: none;
                }

            }
        </style>
        `
    document.body.insertAdjacentHTML('beforeend', css)
    if(!document.querySelector('style[title="atomicpurple:print-styles-paypal"]')){
        console.warn("[atomicpurple:print-styles-paypal.js] - couldn't insert styles using native DOM API. Trying with TamperMonkey:GM_addStyle.")
        GM_addStyle(css, document.body)
    }
})();