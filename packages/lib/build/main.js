require('source-map-support/register')
module.exports =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["wiretap"] = wiretap;
/* harmony export (immutable) */ __webpack_exports__["inspect"] = inspect;
/* harmony export (immutable) */ __webpack_exports__["log"] = log;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_isstring__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_isstring___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_isstring__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mobx__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mobx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mobx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__walkieTalkie__ = __webpack_require__(4);



var shortid = __webpack_require__(6);

__WEBPACK_IMPORTED_MODULE_1_mobx__["extras"].shareGlobalState();
var globalTrackingState = {};

function wiretap(appName) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!__WEBPACK_IMPORTED_MODULE_0_lodash_isstring___default()(appName)) {
    throw new Error("First parameter should be the application name.");
  }

  var port = options.port ? options.port : 4000;
  Object(__WEBPACK_IMPORTED_MODULE_2__walkieTalkie__["a" /* default */])(port, {
    onUpdate: function onUpdate(payload) {
      handleUpdate(payload);
    }
  });

  // emits a reset event which clears the dashboard
  Object(__WEBPACK_IMPORTED_MODULE_2__walkieTalkie__["c" /* emitInitialize */])({
    app: appName
  });
}

function inspect(name, thingToTrack) {
  if (!__WEBPACK_IMPORTED_MODULE_0_lodash_isstring___default()(name)) {
    throw new Error("First parameter should be a string.");
  }

  if (Object(__WEBPACK_IMPORTED_MODULE_1_mobx__["isObservableArray"])(thingToTrack)) {
    handleObservableArray(name, thingToTrack);
  } else if (Object(__WEBPACK_IMPORTED_MODULE_1_mobx__["isObservable"])(thingToTrack)) {
    handleObservableObject(name, thingToTrack);
  } else {
    // if the thing provided thing for inspection is not an observable itself, interate the keys
    // and start tracking observable properties recursively. Don't you feel good when you implement a
    // recursion. I do every damn time!
    Object.keys(thingToTrack).forEach(function (key) {
      var nestedThingToTrack = thingToTrack[key];
      inspect(name + "." + key, nestedThingToTrack);
    });
  }
}

function log(name, obj) {
  if (!__WEBPACK_IMPORTED_MODULE_0_lodash_isstring___default()(name)) {
    throw new Error("First parameter should be a string.");
  }

  var id = shortid.generate();
  Object(__WEBPACK_IMPORTED_MODULE_2__walkieTalkie__["b" /* emitChange */])({
    id: id,
    name: name,
    value: obj,
    isObservable: false
  });
}

function handleObservableArray(name, observableArray) {
  var id = shortid.generate();
  globalTrackingState[id] = observableArray;
  Object(__WEBPACK_IMPORTED_MODULE_2__walkieTalkie__["b" /* emitChange */])({
    id: id,
    name: name,
    value: observableArray,
    isObservable: true
  });
}

function handleObservableObject(name, observableObject) {
  var id = shortid.generate();
  globalTrackingState[id] = observableObject;
  // observe the observable for futre updates
  Object(__WEBPACK_IMPORTED_MODULE_1_mobx__["observe"])(observableObject, function () {
    Object(__WEBPACK_IMPORTED_MODULE_2__walkieTalkie__["b" /* emitChange */])({
      id: id,
      name: name,
      value: observableObject,
      isObservable: true
    });
  });

  // but also send the initial values to the dashboard
  Object(__WEBPACK_IMPORTED_MODULE_2__walkieTalkie__["b" /* emitChange */])({
    id: id,
    name: name,
    value: observableObject,
    isObservable: true
  });
}

function handleUpdate(payload) {
  var observableThing = globalTrackingState[payload.trackerId];
  payload.namespace.forEach(function (key) {
    observableThing = observableThing[key];
  });
  observableThing[payload.name] = payload.new_value;
}

// not yet exposed
function startSpying() {
  Object(__WEBPACK_IMPORTED_MODULE_1_mobx__["spy"])(function (event) {
    if (event.type === "action") {
      Object(__WEBPACK_IMPORTED_MODULE_2__walkieTalkie__["d" /* emitSpy */])({
        name: event.type,
        data: event
      });
    }
  });
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("lodash.isstring");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("mobx");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initialize;
/* harmony export (immutable) */ __webpack_exports__["b"] = emitChange;
/* harmony export (immutable) */ __webpack_exports__["c"] = emitInitialize;
/* harmony export (immutable) */ __webpack_exports__["d"] = emitSpy;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_socket_io_client__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_socket_io_client__);

var socket = null;

function initialize(port, handlers) {
  socket = __WEBPACK_IMPORTED_MODULE_0_socket_io_client___default()("http://localhost:" + port);
  socket.on("update", handlers.onUpdate);
}

function emitChange(payload) {
  socket.emit("change", payload);
}

function emitInitialize(payload) {
  socket.emit("initialize", payload);
}

function emitSpy(payload) {
  socket.emit("spy", payload);
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("socket.io-client");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("shortid");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map