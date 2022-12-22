/*!
 * 
 * ------
 * Note: customizing files reduces the store's ability to auto-update the theme.
 *
 * Disclaimer:
 * This is a non minified version of a core js file, you can swap out the liquid / HTML link from the minified file if you choose to utilize this one. Any usage of these files is at the merchant/app/expert/agency's own risk, we take no responsibility for custom code changes. Support offerings from We Are Eight will be limited to rolling back to the latest theme version if these are utilized.
 *
 * License and acceptance of usage:
 *
 * Copyright (C) We Are Eight LTD  - All Rights Reserved
 * This file is part of Influence theme provided for usage on Shopify online stores only.
 * Unauthorized usage and or modification of this file outside of this Influence utilized on a Shopify store without a valid license, is strictly prohibited.
 * Unauthorized copying or distribution of this file, via any medium is strictly prohibited.
 * Proprietary and confidential
 *
 * More information and official contact details: weareeight.com
 * ------
 *
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 845:
/***/ ((module) => {

!function(e,d){ true?module.exports=d():0}(self,(function(){return(()=>{"use strict";var e={};return((e,d)=>{Object.defineProperty(d,"__esModule",{value:!0}),d.isArmadaLoaded=void 0,d.isArmadaLoaded=e=>{var d,o;const a=!0===(null===(o=null===(d=window.eight)||void 0===d?void 0:d.armada)||void 0===o?void 0:o.loaded);if(!e)return a;a?e():document.addEventListener("ARMADA:LOADED",e)},d.default=d.isArmadaLoaded})(0,e),e})()}));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _weareeight_armada_dist_utils_isArmadaLoaded__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(845);
/* harmony import */ var _weareeight_armada_dist_utils_isArmadaLoaded__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_weareeight_armada_dist_utils_isArmadaLoaded__WEBPACK_IMPORTED_MODULE_0__);

class Video extends HTMLElement {
  constructor() {
    super();

    if (!this.button) return;
    if (!this.poster && !this.isHero) return;

    this.player = false;

    this.ytPlayerReady = this.ytPlayerReady.bind(this);
    this.ytStateChange = this.ytStateChange.bind(this);
    this.revealOverlay = this.revealOverlay.bind(this);
  }

  connectedCallback() {
    (0,_weareeight_armada_dist_utils_isArmadaLoaded__WEBPACK_IMPORTED_MODULE_0__.isArmadaLoaded)(this.init.bind(this));
  }

  init() {
    if (!this.isHero) {
      this.button.addEventListener('click', this.loadVideo.bind(this));
    }
    else {
      // iFrame observer options
      const iframeObserverOptions = {
        threshold: 0,
        rootMargin: '0px'
      };

      // iFrame observer callback
      const iframeObserverCallback = (iframe, iframeObserver) => {
        if (iframe[0].isIntersecting) {
          this.loadVideo();
          iframeObserver.unobserve(this);
        }
      }

      const iframeObserver = new IntersectionObserver(iframeObserverCallback ,iframeObserverOptions);
      iframeObserver.observe(this);
    }
    window.eight.armada.elementRegistry.register({key: 'component-video', assetPath: '/assets/component-video.min.js'});
  }

  get button() {
    return this.querySelector('button[data-action="play"]');
  }

  get poster() {
    return this.getAttribute('poster') ? this.getAttribute('poster') : false;
  }

  get isHero() {
    return this.getAttribute('data-is-hero') ? this.getAttribute('data-is-hero') : false;
  }

  get type() {
    if (this.isYouTubeUrl(this.url)) return 'youtube';
    if (this.isVimeoUrl(this.url)) return 'vimeo';
    if (this.isMp4Url(this.url)) return 'mp4';
    return 'invalid';
  }

  get url() {
    return this.getAttribute('url') ? this.getAttribute('url') : false;
  }

  get autoplay() {
    return this.getAttribute('autoplay') ? this.getAttribute('autoplay') : false;
  }

  loadVideo() {
    // If dragging within a slider, do nothing
    const slider = this.closest('slider-engine');
    if (slider && slider.getAttribute('dragging') == 'true') return;

    if (!this.isHero) {
      this.pauseAll();
    }

    if (!this.getAttribute('loaded')) {
      const content = document.createElement('div');
      content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));

      const newContent = content.querySelector('video, iframe');
      this.appendChild(newContent).focus();

      if (this.type === 'invalid') {
        this.handleFallbackImage(newContent);
      }

      this.setAttribute('loaded', true);

      if (this.isHero && this.type === 'youtube') {
        this.handleYTHero(newContent);
      }

      if((this.type === 'youtube' || this.type === 'vimeo') && !this.isHero) {
        newContent.onload = () => {
          const i = newContent.getBoundingClientRect();
          const aspect = i.width / i.height;
          this.setPadding(aspect);
        }

        if(this.type === 'youtube') {
          const videoId = newContent.getAttribute('data-video-id');
          this.loadYouTubeAPI(videoId);

        }
        else if (this.type === 'vimeo') {
          this.loadVimeoAPI();
        }
      }
      else {
        if (this.isHero && this.type == 'mp4') {
          this.handleMP4Hero(newContent);
        }

        newContent.addEventListener('loadeddata', (e) => {
          const aspect = e.target.videoWidth / e.target.videoHeight;
          if (!this.isHero) {
            this.setPadding(aspect);
          }
        });
      }
    }
  }

  setPadding(aspectRatio) {
    const padding = ((1 / aspectRatio) * 100) + '%';
    this.style.paddingTop = padding;
  }

  pauseAll() {
    document.querySelectorAll('.js-youtube').forEach((video) => {
      video.contentWindow.postMessage(
        '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
        '*'
      );
    });
    document.querySelectorAll('.js-vimeo').forEach((video) => {
      video.contentWindow.postMessage('{"method":"pause"}', '*');
    });
    document.querySelectorAll('video').forEach((video) => video.pause());
  }

  isYouTubeUrl(url) {
    if (!url) return false;
    const regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(regExp)) return true;
  }

  isVimeoUrl(url) {
    if (!url) return false;
    const regExp = /vimeo.*(?:\/|clip_id=)([0-9a-z]*)/i;
    if (url.match(regExp)) return true;
  }

  isMp4Url(url) {
    if (!url) return false;
    if (url.includes('.mp4')) return true;
  }

  disconnectedCallback() {
    if (!this.isHero) {
      this.button.removeEventListener('click', this.loadVideo);
    }
  }

  loadVimeoAPI() {
    if(document.querySelector('#vimeo_api')) return;

    // The iframe API is required for mobile autoplay.
    const tag = document.createElement('script');
    tag.id = 'vimeo_api';
    tag.src = 'https://player.vimeo.com/api/player.js';
    const [ firstScriptTag ] = document.getElementsByTagName('script');
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    const self = this;

    tag.onload = function () {
      const iframe = self.querySelector('iframe');
      self.player = new Vimeo.Player(iframe);
      self.player.on('pause', self.revealOverlay);
      self.player.on('ended', self.revealOverlay);
    };
  }

  loadYouTubeAPI(videoId) {
    if(document.querySelector('#youtube_api')) return;

    // The iframe API is required for mobile autoplay.
    const tag = document.createElement('script');
    tag.id = 'youtube_api';
    tag.src = 'https://www.youtube.com/iframe_api';
    const [ firstScriptTag ] = document.getElementsByTagName('script');
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      this.player = new window.YT.Player('player', {
        videoId: `${videoId}`,
        events: {
          onReady: this.ytPlayerReady,
          onStateChange: this.ytStateChange
        }
      });
    };
  }

  ytPlayerReady(e) {
    if(this.isHero || this.autoplay) {
      e.target.playVideo();
    }
  }

  ytStateChange(e) {
    if(e.data === 2 || e.data === 0) {
      this.revealOverlay();
    }
  }

  revealOverlay() {
    this.overlay = this.querySelector('[data-name="video-overlay"]');

    if(!this.overlay) {
      this.appendChild(
        this.querySelector('template')
          .content.querySelector('[data-name="video-overlay"]')
          .cloneNode(true)
      );

      this.overlay = this.querySelector('[data-name="video-overlay"]');
      this.overlay.classList.remove('hidden');
    }

    this.overlay.addEventListener('click', this.handleOverlayClick.bind(this));
  }

  handleOverlayClick() {
    this.overlay.parentNode.removeChild(this.overlay);

    if(this.player) {
      if(this.type === 'youtube') this.player.playVideo();
      if(this.type === 'vimeo') this.player.play();
    }
  }

  handleYTHero(newContent) {
    const getSrc = newContent.getAttribute('src');
    const strToAdd = '&autoplay=1&mute=1&loop=1&controls=0';
    const newSrc = getSrc.concat(strToAdd);
    newContent.setAttribute('src', newSrc);

    const isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/));
    if(!isMobile) return;

    const videoId = newContent.getAttribute('data-video-id');

    if (videoId) {
      this.loadYouTubeAPI(videoId);
    }
  }

  handleMP4Hero(newContent) {
    //Set the attributes required for background video behavior
    newContent.muted = true;
    newContent.loop = true;
    newContent.playsinline = true;
    newContent.removeAttribute('controls');
    newContent.play();

    const newContentSource = newContent.querySelector('source');
    newContentSource.addEventListener('error', () => this.handleFallbackImage(newContent));
  }

  handleFallbackImage(newContent) {
    newContent.style.zIndex = 0;
    this.button.style.display = 'grid';
    this.button.firstElementChild.style.visibility = 'hidden';
    this.button.firstElementChild.nextElementSibling.style.zIndex = 30;
    this.button.style.cursor = 'auto';
  }
}

window.customElements.define('video-element', Video);

})();

/******/ })()
;