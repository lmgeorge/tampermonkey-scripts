// ==UserScript==
// @name         Print Styles: Paypal
// @version      0.1
// @description  A userscript that sets up better print styles for Paypal.
// @license      MIT
// @author       Lauren George <https://atomicpurple.com>
// @namespace    https://github.com/lmgeorge/tampermonkey-scripts
// @updateURL    https://raw.githubusercontent.com/lmgeorge/tampermonkey-scripts/main/print-styles-paypal.user.js
// @downloadURL  https://raw.githubusercontent.com/lmgeorge/tampermonkey-scripts/main/print-styles-paypal.user.js
// @match        https://www.paypal.com/myaccount/transactions/details/*
// @grant        none
// @run-at       document-idle
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    const css = `
        <style>
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
})();