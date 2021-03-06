// ==UserScript==
// @name         Print Styles: {{siteName}}
// @version      0.1
// @description  A userscript that sets up better print styles for {{siteName}}.
// @license      MIT
// @author       Lauren George <https://atomicpurple.com>
// @namespace    https://github.com/lmgeorge/tampermonkey-scripts
// @updateURL    https://raw.githubusercontent.com/lmgeorge/tampermonkey-scripts/main/print-styles-{{siteName}}.user.js
// @downloadURL  https://raw.githubusercontent.com/lmgeorge/tampermonkey-scripts/main/print-styles-{{siteName}}.user.js
// @match        {{match}}
// @grant        none
// @run-at       document-body
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    const css = `
        <style title="atomicpurple:print-styles-{{siteName}}">
            @media print {
                
            }
        </style>
        `
    document.body.insertAdjacentHTML('beforeend', css)

})();
