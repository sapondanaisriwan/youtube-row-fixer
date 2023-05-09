// ==UserScript==
// @name        YouTube Videos Per Row Fix
// @version     1.0.0
// @author      sapondanaisriwan
// @description Increase the videos per row on all page.
// @match       https://www.youtube.com/*
// @grant       none
// @license     MIT
// @run-at      document-start
// @icon        https://i.imgur.com/I9uDrsq.png
// @namespace   https://greasyfork.org/en/users/1021085-sapondanaisriwan
// @homepageURL https://github.com/sapondanaisriwan/youtube-videos-per-row-fix
// @supportURL  https://github.com/sapondanaisriwan/youtube-videos-per-row-fix/issues
// @require     https://greasyfork.org/scripts/465819-api-for-customelements-in-youtube/code/API%20for%20CustomElements%20in%20YouTube.js?version=1187694
// ==/UserScript==

/*
If you want to submit a bug or request a feature please report via github issue. Since I receive so many emails, I can't reply to them all.
Contact: sapondanaisriwan@gmail.com
Support me: https://ko-fi.com/sapondanaisriwan 
Support me: https://ko-fi.com/sapondanaisriwan
Support me: https://ko-fi.com/sapondanaisriwan
Support me: https://ko-fi.com/sapondanaisriwan
Support me: https://ko-fi.com/sapondanaisriwan
*/

'use strict';

// Thanks so much to CY Fung (https://greasyfork.org/en/users/371179-cy-fung) for helping me.
const videosPerRow = 5
const target = 'ytd-rich-grid-renderer'
customYtElements.whenRegistered(target, (proto) => { proto.calcElementsPerRow = () => videosPerRow; });