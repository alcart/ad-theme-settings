(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/wp-content/plugins/ad-theme-settings/includes/js/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/image-selector.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/image-selector.js":
/*!**********************************!*\
  !*** ./src/js/image-selector.js ***!
  \**********************************/
/*! exports provided: addMediaOpener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addMediaOpener", function() { return addMediaOpener; });
var addMediaOpener = function addMediaOpener(imgTarget, callback) {
  var mediaData = [];

  if (metaImageFrame) {
    metaImageFrame.open();
  }

  var metaImageFrame = wp.media.frames.meta_image_frame = wp.media({
    title: "Select Image",
    button: {
      text: "Select"
    },
    multiple: false
  }); // Runs when an image is selected.

  metaImageFrame.on('select', function () {
    // Grabs the attachment selection and creates a JSON representation of the model.
    var media_attachment = metaImageFrame.state().get('selection').toJSON()[0];
    mediaData = {
      url: media_attachment.url,
      id: media_attachment.id
    };
    callback(mediaData);
    metaImageFrame.close();
  }); // Opens the media library frame.

  metaImageFrame.open();
};

/***/ })

/******/ })));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2ltYWdlLXNlbGVjdG9yLmpzIl0sIm5hbWVzIjpbImFkZE1lZGlhT3BlbmVyIiwiaW1nVGFyZ2V0IiwiY2FsbGJhY2siLCJtZWRpYURhdGEiLCJtZXRhSW1hZ2VGcmFtZSIsIm9wZW4iLCJ3cCIsIm1lZGlhIiwiZnJhbWVzIiwibWV0YV9pbWFnZV9mcmFtZSIsInRpdGxlIiwiYnV0dG9uIiwidGV4dCIsIm11bHRpcGxlIiwib24iLCJtZWRpYV9hdHRhY2htZW50Iiwic3RhdGUiLCJnZXQiLCJ0b0pTT04iLCJ1cmwiLCJpZCIsImNsb3NlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBTyxJQUFNQSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUNDLFNBQUQsRUFBWUMsUUFBWixFQUF5QjtBQUNyRCxNQUFJQyxTQUFTLEdBQUcsRUFBaEI7O0FBRUEsTUFBSUMsY0FBSixFQUFvQjtBQUNsQkEsa0JBQWMsQ0FBQ0MsSUFBZjtBQUNEOztBQUVELE1BQUlELGNBQWMsR0FBR0UsRUFBRSxDQUFDQyxLQUFILENBQVNDLE1BQVQsQ0FBZ0JDLGdCQUFoQixHQUFtQ0gsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDL0RHLFNBQUssRUFBRSxjQUR3RDtBQUUvREMsVUFBTSxFQUFFO0FBQ05DLFVBQUksRUFBRTtBQURBLEtBRnVEO0FBSy9EQyxZQUFRLEVBQUU7QUFMcUQsR0FBVCxDQUF4RCxDQVBxRCxDQWVyRDs7QUFDQVQsZ0JBQWMsQ0FBQ1UsRUFBZixDQUFrQixRQUFsQixFQUE0QixZQUFZO0FBQ3RDO0FBQ0EsUUFBSUMsZ0JBQWdCLEdBQUdYLGNBQWMsQ0FBQ1ksS0FBZixHQUF1QkMsR0FBdkIsQ0FBMkIsV0FBM0IsRUFBd0NDLE1BQXhDLEdBQWlELENBQWpELENBQXZCO0FBRUFmLGFBQVMsR0FBRztBQUNWZ0IsU0FBRyxFQUFFSixnQkFBZ0IsQ0FBQ0ksR0FEWjtBQUVWQyxRQUFFLEVBQUVMLGdCQUFnQixDQUFDSztBQUZYLEtBQVo7QUFLQWxCLFlBQVEsQ0FBQ0MsU0FBRCxDQUFSO0FBQ0FDLGtCQUFjLENBQUNpQixLQUFmO0FBQ0QsR0FYRCxFQWhCcUQsQ0E0QnJEOztBQUNBakIsZ0JBQWMsQ0FBQ0MsSUFBZjtBQUVELENBL0JNLEMiLCJmaWxlIjoiaW1hZ2Utc2VsZWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi93cC1jb250ZW50L3BsdWdpbnMvYWQtdGhlbWUtc2V0dGluZ3MvaW5jbHVkZXMvanMvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2ltYWdlLXNlbGVjdG9yLmpzXCIpO1xuIiwiZXhwb3J0IGNvbnN0IGFkZE1lZGlhT3BlbmVyID0gKGltZ1RhcmdldCwgY2FsbGJhY2spID0+IHtcbiAgbGV0IG1lZGlhRGF0YSA9IFtdO1xuXG4gIGlmIChtZXRhSW1hZ2VGcmFtZSkge1xuICAgIG1ldGFJbWFnZUZyYW1lLm9wZW4oKTtcbiAgfVxuXG4gIGxldCBtZXRhSW1hZ2VGcmFtZSA9IHdwLm1lZGlhLmZyYW1lcy5tZXRhX2ltYWdlX2ZyYW1lID0gd3AubWVkaWEoe1xuICAgIHRpdGxlOiBcIlNlbGVjdCBJbWFnZVwiLFxuICAgIGJ1dHRvbjoge1xuICAgICAgdGV4dDogXCJTZWxlY3RcIlxuICAgIH0sXG4gICAgbXVsdGlwbGU6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIFJ1bnMgd2hlbiBhbiBpbWFnZSBpcyBzZWxlY3RlZC5cbiAgbWV0YUltYWdlRnJhbWUub24oJ3NlbGVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBHcmFicyB0aGUgYXR0YWNobWVudCBzZWxlY3Rpb24gYW5kIGNyZWF0ZXMgYSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbC5cbiAgICBsZXQgbWVkaWFfYXR0YWNobWVudCA9IG1ldGFJbWFnZUZyYW1lLnN0YXRlKCkuZ2V0KCdzZWxlY3Rpb24nKS50b0pTT04oKVswXTtcbiAgICBcbiAgICBtZWRpYURhdGEgPSB7XG4gICAgICB1cmw6IG1lZGlhX2F0dGFjaG1lbnQudXJsLFxuICAgICAgaWQ6IG1lZGlhX2F0dGFjaG1lbnQuaWRcbiAgICB9O1xuICAgIFxuICAgIGNhbGxiYWNrKG1lZGlhRGF0YSk7XG4gICAgbWV0YUltYWdlRnJhbWUuY2xvc2UoKTtcbiAgfSk7XG4gIC8vIE9wZW5zIHRoZSBtZWRpYSBsaWJyYXJ5IGZyYW1lLlxuICBtZXRhSW1hZ2VGcmFtZS5vcGVuKCk7XG4gIFxufTsiXSwic291cmNlUm9vdCI6IiJ9