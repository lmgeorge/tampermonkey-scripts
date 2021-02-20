// ==UserScript==
// @name         Print Styles: Paypal
// @version      0.3
// @description  A userscript that sets up better print styles for Paypal.
// @license      MIT
// @author       Lauren George <https://atomicpurple.com>
// @namespace    https://github.com/lmgeorge/tampermonkey-scripts
// @updateURL    https://raw.githubusercontent.com/lmgeorge/tampermonkey-scripts/main/print-styles-paypal.user.js
// @downloadURL  https://raw.githubusercontent.com/lmgeorge/tampermonkey-scripts/main/print-styles-paypal.user.js
// @include      https://www.paypal.com/myaccount/transactions/details/*
// @include      https://paypal.com/myaccount/transactions/details/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

(function() {
    'use strict';

    const css = `
        <style title="atomicpurple:print-styles-paypal">
            @media print {
                .noPrint,
                #js_transactionDetailsView > *:not(.td-fullpage-container), 
                [class^="vx_globalNav-main"], 
                .vx_globalFooter,
                .ppvx_text--sm.action {
                    display: none;
                }
            
                .vx_mainContent {
                    max-width: unset;
                    margin:unset;
                    padding: 0;
                }
            
                #js_transactionDetailsView {
                    padding: 0 !important;
                }
            }
        </style>
        `
    document.body.insertAdjacentHTML('beforeend', css)
})();
