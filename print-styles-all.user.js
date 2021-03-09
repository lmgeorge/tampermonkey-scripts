// ==UserScript==
// @name         Print Styles: all
// @version      0.1
// @description  A userscript that sets up better print styles for all sites.
// @license      MIT
// @author       Lauren George <https://atomicpurple.com>
// @namespace    https://github.com/lmgeorge/tampermonkey-scripts
// @updateURL    https://raw.githubusercontent.com/lmgeorge/tampermonkey-scripts/main/print-styles-all.user.js
// @downloadURL  https://raw.githubusercontent.com/lmgeorge/tampermonkey-scripts/main/print-styles-all.user.js
// @match        *
// @grant        none
// @run-at       document-body
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    const safeRemove = (node) => {
        if(node){
            let nodes = [node]
            if (typeof node === 'string') {
                nodes = document.querySelectorAll(node)
            }
            if (nodes.length > 0){
                nodes.forEach(n => n.remove())
            }
        }
    }

    const safeInsert = ({target = document.body, markupSelector, markup, position = 'beforeend'}) => {
        safeRemove(markupSelector)

        if (typeof target === 'string') {
            target = document.querySelector(target)
        }
       
        target.insertAdjacentHTML(position, markup)
    }

    const cssId = "atomicpurple:print-styles-all"
    const css = `
        <style id="${cssId}">
            .atomicpurple {
                display: none;
            }

            @media print {
                @page {
                    margin: 0.5in;
                }
               
                body {
                    counter-reset: refs;
                }

                span, em, b, i, strong, code, li {
                    break-inside: avoid !important;
                }

                h2, h3, h4, h5 {
                    break-after: avoid !important;
                }

                p {
                    orphans: 3;
                    widows: 4;
                }
                
                a[href]{
                    text-decoration: underline !important;
                }

                a[href]:not(.reference-src)::after {
                    counter-increment: refs;
                    content: "[" counter(refs, decimal-leading-zero) "]";
                    font-size: xx-small;
                    vertical-align: top;
                }

                .atomicpurple {
                    display: block;
                }

                [id="atomicpurple:references"] {
                    break-before: page;
                }
                
                .atomicpurple ol.references {
                    counter-reset: refids;
                    padding-left: 3em;
                }

                .atomicpurple li.reference {
                    display: block;
                    padding: 0 !important;
                    margin: 0 !important;
                    counter-increment: refids;
                    text-indent: -3em;
                    font-family: monospace;
                }

                .atomicpurple .reference::before {
                    content: "[" counter(refids, decimal-leading-zero) "]:";
                    font-family: monospace;
                }
            }
        </style>
        `
    safeInsert({ markupSelector: `[id="${cssId}"]`, markup: css })

    const refsId = "atomicpurple:references"
    const refsSelector =  `[id="${refsId}"]`
    safeInsert({
        markupSelector: refsSelector, 
        markup: `
        <section id="${refsId}" class="atomicpurple">
            <h2>References</h2>
            <ol class="references"></ol>
        </section>
        `
    })

    Array
        .from(document.querySelectorAll('a[href]'))
        .filter(a => a.offsetParent !== null)
        .forEach((a,i) => {
            const position = i+1;
            const link = a.href
            const title = a.textContent
            safeInsert({
                target: `${refsSelector} > .references`, 
                markup: `
                <li class="reference" data-ref="${position}">
                    <a class="reference-src" href="${link}" title="${title}">${link}<a>
                </li>
                `
            })
        })
})();
