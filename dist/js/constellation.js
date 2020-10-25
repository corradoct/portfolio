/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/constellation.js":
/*!*********************************!*\
  !*** ./src/js/constellation.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/////////////////////////////// BACKGROUND  ////////////////////////////

/*!
 * @version 1.2.2
 * @author Acauã Montiel <contato@acauamontiel.com.br>
 * @license http://acaua.mit-license.org/
 */

/*
 * requestAnimationFrame pollyfill
 */
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
    return window.setTimeout(callback, 1000 / 60);
  };
}

(function ($, window) {
  /**
   * Makes a nice constellation on canvas
   * @constructor Constellation
   */
  function Constellation(canvas, options) {
    var $canvas = $(canvas),
        context = canvas.getContext('2d'),
        defaults = {
      star: {
        color: 'rgba(255, 255, 255, .9)',
        width: 1
      },
      line: {
        color: 'rgba(255, 255, 255, .5)',
        width: 0.2
      },
      position: {
        x: 0,
        // This value will be overwritten at startup
        y: 0 // This value will be overwritten at startup

      },
      width: window.innerWidth,
      height: window.innerHeight,
      velocity: 0.1,
      length: 100,
      distance: 120,
      radius: 150,
      stars: []
    },
        config = $.extend(true, {}, defaults, options);

    function Star() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = config.velocity - Math.random() * 0.5;
      this.vy = config.velocity - Math.random() * 0.5;
      this.radius = Math.random() * config.star.width;
    }

    Star.prototype = {
      create: function create() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
      },
      animate: function animate() {
        var i;

        for (i = 0; i < config.length; i++) {
          var star = config.stars[i];

          if (star.y < 0 || star.y > canvas.height) {
            star.vx = star.vx;
            star.vy = -star.vy;
          } else if (star.x < 0 || star.x > canvas.width) {
            star.vx = -star.vx;
            star.vy = star.vy;
          }

          star.x += star.vx;
          star.y += star.vy;
        }
      },
      line: function line() {
        var length = config.length,
            iStar,
            jStar,
            i,
            j;

        for (i = 0; i < length; i++) {
          for (j = 0; j < length; j++) {
            iStar = config.stars[i];
            jStar = config.stars[j];

            if (iStar.x - jStar.x < config.distance && iStar.y - jStar.y < config.distance && iStar.x - jStar.x > -config.distance && iStar.y - jStar.y > -config.distance) {
              if (iStar.x - config.position.x < config.radius && iStar.y - config.position.y < config.radius && iStar.x - config.position.x > -config.radius && iStar.y - config.position.y > -config.radius) {
                context.beginPath();
                context.moveTo(iStar.x, iStar.y);
                context.lineTo(jStar.x, jStar.y);
                context.stroke();
                context.closePath();
              }
            }
          }
        }
      }
    };

    this.createStars = function () {
      var length = config.length,
          star,
          i;
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (i = 0; i < length; i++) {
        config.stars.push(new Star());
        star = config.stars[i];
        star.create();
      }

      star.line();
      star.animate();
    };

    this.setCanvas = function () {
      canvas.width = config.width;
      canvas.height = config.height;
    };

    this.setContext = function () {
      context.fillStyle = config.star.color;
      context.strokeStyle = config.line.color;
      context.lineWidth = config.line.width;
    };

    this.setInitialPosition = function () {
      if (!options || !options.hasOwnProperty('position')) {
        config.position = {
          x: canvas.width * 0.5,
          y: canvas.height * 0.5
        };
      }
    };

    this.loop = function (callback) {
      callback();
      window.requestAnimationFrame(function () {
        // stats.begin(); // Only for Stats
        this.loop(callback); // stats.end(); // Only for Stats
      }.bind(this));
    };

    this.bind = function () {
      $canvas.on('mousemove', function (e) {
        config.position.x = e.pageX - $canvas.offset().left;
        config.position.y = e.pageY - $canvas.offset().top;
      });
    };

    this.init = function () {
      this.setCanvas();
      this.setContext();
      this.setInitialPosition();
      this.loop(this.createStars);
      this.bind();
    };
  }

  $.fn.constellation = function (options) {
    return this.each(function () {
      var c = new Constellation(this, options);
      c.init();
    });
  };
})($, window);

$('#background').constellation({
  star: {
    width: 3
  },
  line: {
    color: 'rgba(255, 0, 0, 0.7)'
  },
  radius: 350
});

/***/ }),

/***/ 1:
/*!***************************************!*\
  !*** multi ./src/js/constellation.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Corra\Desktop\myPortfolio\src\js\constellation.js */"./src/js/constellation.js");


/***/ })

/******/ });