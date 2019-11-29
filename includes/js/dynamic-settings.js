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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/dynamic-settings.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/dynamic-settings.js":
/*!************************************!*\
  !*** ./src/js/dynamic-settings.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mediaSelectorOpener = __webpack_require__(/*! ./image-selector */ "./src/js/image-selector.js").addMediaOpener;

(function ($) {
  $(window).ready(function () {
    var selectors = {
      dynamicForm: '[data-type*="dynamic"]',
      deleteButton: '[data-type*="delete-button"]',
      emptyDelete: '[data-type="empty-setting"]'
    };
    var addButtonTemplate = $("<td class='ad-settings-icon-plus add-button'></td>");
    var addButtons = [];
    var rowTemplate;
    var settingsGroupSlug;
    var dynamicForms = $(selectors.dynamicForm);

    if (dynamicForms.length === 0) {
      return;
    }

    dynamicForms.each(function (index, element) {
      var tbody = $(element).find('tbody');
      settingsGroupSlug = tbody.parent().data().settingsGroupSlug;
      var rows = tbody.find('.setting-group'); // Look for type image inputs

      var imageInputs = rows.find('.forminp-image');
      $(document).on("click", ".forminp-media-selector-opener", function (event) {
        event.preventDefault();
        mediaSelectorOpener(event.currentTarget, function (imageData) {
          $(event.currentTarget).parent().find(".forminp-image-id").val(imageData.id);
          $(event.currentTarget).parent().find(".forminp-image-element").attr("src", imageData.url);
        });
      });
      rowTemplate = $(rows[0]).clone();
      var newAddButton = addButtonTemplate.clone();
      newAddButton.data("number-of-settings", rows.length);
      addButtons.push({
        button: newAddButton,
        rowTemplate: rowTemplate
      });
      rows.parent().find(".setting-group:last-of-type").append(newAddButton);
    });
    addButtons.forEach(function (buttonObj, index) {
      $(buttonObj.button).click(function (event) {
        event.preventDefault();
        var newSetting = buttonObj.rowTemplate.clone();
        var currentNumberOfSettings = $(buttonObj.button).data().numberOfSettings;
        newSetting.children().each(function (index, element) {
          var inputElement = $($(element).children()[0]);

          if (inputElement.prop("tagName").toLowerCase() === 'input' || inputElement.prop("tagName").toLowerCase() === 'textarea') {
            inputElement.val("");
            var id = inputElement.attr("id");
            id = id.replace(/-[0-9]+/, '');
            inputElement.attr("id", "".concat(id, "-").concat(currentNumberOfSettings));
          }

          if ($(element).find("img").length > 0) {
            $(element).find("img").attr("src", "");
          }
        });
        $(buttonObj.button).data("number-of-settings", currentNumberOfSettings + 1);
        newSetting.find("a").attr("href", "");
        newSetting.find("a").attr("data-type", "empty-setting");
        $(buttonObj.button).parent().after(newSetting);
        newSetting.append($(buttonObj.button));
      });
    });
    $("#submit-form").click(function (event) {
      event.preventDefault();
      var formData = {};
      var nonce = $("#nonce").val();
      dynamicForms.each(function (index, element) {
        var settingsGroupSlug = $(element).data().settingsGroupSlug;
        var settingsGroups = $(element).find(".setting-group");
        var groupData = [];
        settingsGroups.each(function (index, group) {
          var inputs = $(group).find(".forminp");
          var inputData = {};
          var allFilled = true;
          var notFilled = [];
          inputs.each(function (index, inputElement) {
            var input = $($(inputElement).children()[0]); // If is empty and at least one is already filled

            if (input.val() === '') {
              allFilled = false;
              notFilled.push(inputElement);
              return true;
            }

            if ($(inputElement).hasClass("error")) {
              $(inputElement).removeClass("error");
            }

            var settingSlug = input.attr("id");
            inputData[settingSlug] = {
              value: input.val()
            };
          });

          if (allFilled) {
            groupData.push(inputData);
          } else if (notFilled.length < inputs.length) {
            $(notFilled).children().addClass("error");
          }
        });

        if (groupData.length > 0) {
          formData[settingsGroupSlug] = $.extend.apply($, [{}].concat(groupData));
        }
      });
      var data = {
        url: ajax_object.ajax_url,
        //admin_url
        data: {
          "form-data": formData,
          action: ajax_object.save_action,
          nonce: nonce
        },
        method: 'post',
        success: function success(data) {
          console.log(data);
          window.location.reload();
        },
        error: function error(data) {
          console.log(data);
        }
      };
      $.ajax(data);
    });
    $(document).on("click", selectors.emptyDelete, function (event) {
      event.preventDefault();
      var target = event.currentTarget;
      var row = $(target).parent().parent();
      var addButton = row.find(".add-button");
      var currentNumberOfSettings = addButton.data().numberOfSettings;
      addButton.data('number-of-settings', currentNumberOfSettings - 1);
      addButton.insertAfter(row.prev().children()[row.prev().children().length - 1]);
      row.remove();
    });
  });
})(jQuery);

/***/ }),

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2R5bmFtaWMtc2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2ltYWdlLXNlbGVjdG9yLmpzIl0sIm5hbWVzIjpbIm1lZGlhU2VsZWN0b3JPcGVuZXIiLCJyZXF1aXJlIiwiYWRkTWVkaWFPcGVuZXIiLCIkIiwid2luZG93IiwicmVhZHkiLCJzZWxlY3RvcnMiLCJkeW5hbWljRm9ybSIsImRlbGV0ZUJ1dHRvbiIsImVtcHR5RGVsZXRlIiwiYWRkQnV0dG9uVGVtcGxhdGUiLCJhZGRCdXR0b25zIiwicm93VGVtcGxhdGUiLCJzZXR0aW5nc0dyb3VwU2x1ZyIsImR5bmFtaWNGb3JtcyIsImxlbmd0aCIsImVhY2giLCJpbmRleCIsImVsZW1lbnQiLCJ0Ym9keSIsImZpbmQiLCJwYXJlbnQiLCJkYXRhIiwicm93cyIsImltYWdlSW5wdXRzIiwiZG9jdW1lbnQiLCJvbiIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50VGFyZ2V0IiwiaW1hZ2VEYXRhIiwidmFsIiwiaWQiLCJhdHRyIiwidXJsIiwiY2xvbmUiLCJuZXdBZGRCdXR0b24iLCJwdXNoIiwiYnV0dG9uIiwiYXBwZW5kIiwiZm9yRWFjaCIsImJ1dHRvbk9iaiIsImNsaWNrIiwibmV3U2V0dGluZyIsImN1cnJlbnROdW1iZXJPZlNldHRpbmdzIiwibnVtYmVyT2ZTZXR0aW5ncyIsImNoaWxkcmVuIiwiaW5wdXRFbGVtZW50IiwicHJvcCIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsImFmdGVyIiwiZm9ybURhdGEiLCJub25jZSIsInNldHRpbmdzR3JvdXBzIiwiZ3JvdXBEYXRhIiwiZ3JvdXAiLCJpbnB1dHMiLCJpbnB1dERhdGEiLCJhbGxGaWxsZWQiLCJub3RGaWxsZWQiLCJpbnB1dCIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzZXR0aW5nU2x1ZyIsInZhbHVlIiwiYWRkQ2xhc3MiLCJleHRlbmQiLCJhamF4X29iamVjdCIsImFqYXhfdXJsIiwiYWN0aW9uIiwic2F2ZV9hY3Rpb24iLCJtZXRob2QiLCJzdWNjZXNzIiwiY29uc29sZSIsImxvZyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZXJyb3IiLCJhamF4IiwidGFyZ2V0Iiwicm93IiwiYWRkQnV0dG9uIiwiaW5zZXJ0QWZ0ZXIiLCJwcmV2IiwicmVtb3ZlIiwialF1ZXJ5IiwiaW1nVGFyZ2V0IiwiY2FsbGJhY2siLCJtZWRpYURhdGEiLCJtZXRhSW1hZ2VGcmFtZSIsIm9wZW4iLCJ3cCIsIm1lZGlhIiwiZnJhbWVzIiwibWV0YV9pbWFnZV9mcmFtZSIsInRpdGxlIiwidGV4dCIsIm11bHRpcGxlIiwibWVkaWFfYXR0YWNobWVudCIsInN0YXRlIiwiZ2V0IiwidG9KU09OIiwiY2xvc2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxJQUFJQSxtQkFBbUIsR0FBR0MsbUJB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c2V0dGluZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi93cC1jb250ZW50L3BsdWdpbnMvYWQtdGhlbWUtc2V0dGluZ3MvaW5jbHVkZXMvanMvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2R5bmFtaWMtc2V0dGluZ3MuanNcIik7XG4iLCJsZXQgbWVkaWFTZWxlY3Rvck9wZW5lciA9IHJlcXVpcmUoJy4vaW1hZ2Utc2VsZWN0b3InKS5hZGRNZWRpYU9wZW5lcjtcbihmdW5jdGlvbiAoJCkge1xuICBcbiAgJCh3aW5kb3cpLnJlYWR5KCAoKSA9PiB7XG4gICAgbGV0IHNlbGVjdG9ycyA9IHtcbiAgICAgIGR5bmFtaWNGb3JtOiAnW2RhdGEtdHlwZSo9XCJkeW5hbWljXCJdJyxcbiAgICAgIGRlbGV0ZUJ1dHRvbjogJ1tkYXRhLXR5cGUqPVwiZGVsZXRlLWJ1dHRvblwiXScsXG4gICAgICBlbXB0eURlbGV0ZTogJ1tkYXRhLXR5cGU9XCJlbXB0eS1zZXR0aW5nXCJdJ1xuICAgIH07XG4gICAgXG4gICAgbGV0IGFkZEJ1dHRvblRlbXBsYXRlID0gJChcIjx0ZCBjbGFzcz0nYWQtc2V0dGluZ3MtaWNvbi1wbHVzIGFkZC1idXR0b24nPjwvdGQ+XCIpO1xuICAgIGxldCBhZGRCdXR0b25zID0gW107XG4gICAgbGV0IHJvd1RlbXBsYXRlO1xuICAgIGxldCBzZXR0aW5nc0dyb3VwU2x1ZztcbiAgICBcbiAgICBsZXQgZHluYW1pY0Zvcm1zID0gJChzZWxlY3RvcnMuZHluYW1pY0Zvcm0pO1xuICAgIFxuICAgIGlmIChkeW5hbWljRm9ybXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGR5bmFtaWNGb3Jtcy5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgbGV0IHRib2R5ID0gJChlbGVtZW50KS5maW5kKCd0Ym9keScpO1xuICAgICAgc2V0dGluZ3NHcm91cFNsdWcgPSB0Ym9keS5wYXJlbnQoKS5kYXRhKCkuc2V0dGluZ3NHcm91cFNsdWc7XG4gICAgICBsZXQgcm93cyA9IHRib2R5LmZpbmQoJy5zZXR0aW5nLWdyb3VwJyk7XG4gICAgICBcbiAgICAgIC8vIExvb2sgZm9yIHR5cGUgaW1hZ2UgaW5wdXRzXG4gICAgICBsZXQgaW1hZ2VJbnB1dHMgPSByb3dzLmZpbmQoJy5mb3JtaW5wLWltYWdlJyk7XG4gICAgICBcbiAgICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuZm9ybWlucC1tZWRpYS1zZWxlY3Rvci1vcGVuZXJcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG1lZGlhU2VsZWN0b3JPcGVuZXIoZXZlbnQuY3VycmVudFRhcmdldCwgKGltYWdlRGF0YSkgPT4ge1xuICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkucGFyZW50KCkuZmluZChcIi5mb3JtaW5wLWltYWdlLWlkXCIpLnZhbChpbWFnZURhdGEuaWQpO1xuICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkucGFyZW50KCkuZmluZChcIi5mb3JtaW5wLWltYWdlLWVsZW1lbnRcIikuYXR0cihcInNyY1wiLCBpbWFnZURhdGEudXJsKTtcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICByb3dUZW1wbGF0ZSA9ICQocm93c1swXSkuY2xvbmUoKTtcbiAgICAgIFxuICAgICAgbGV0IG5ld0FkZEJ1dHRvbiA9IGFkZEJ1dHRvblRlbXBsYXRlLmNsb25lKCk7XG4gICAgICBuZXdBZGRCdXR0b24uZGF0YShcIm51bWJlci1vZi1zZXR0aW5nc1wiLCByb3dzLmxlbmd0aCk7XG4gICAgICBhZGRCdXR0b25zLnB1c2goe2J1dHRvbjogbmV3QWRkQnV0dG9uLCByb3dUZW1wbGF0ZTogcm93VGVtcGxhdGV9KTtcbiAgICAgIFxuICAgICAgcm93cy5wYXJlbnQoKS5maW5kKFwiLnNldHRpbmctZ3JvdXA6bGFzdC1vZi10eXBlXCIpLmFwcGVuZChuZXdBZGRCdXR0b24pO1xuICAgIH0pO1xuICAgIFxuICAgIGFkZEJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uT2JqLCBpbmRleCkgPT4ge1xuICAgICAgJChidXR0b25PYmouYnV0dG9uKS5jbGljayhldmVudCA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBuZXdTZXR0aW5nID0gYnV0dG9uT2JqLnJvd1RlbXBsYXRlLmNsb25lKCk7XG4gICAgICAgIGxldCBjdXJyZW50TnVtYmVyT2ZTZXR0aW5ncyA9ICQoYnV0dG9uT2JqLmJ1dHRvbikuZGF0YSgpLm51bWJlck9mU2V0dGluZ3M7XG4gICAgICAgIG5ld1NldHRpbmcuY2hpbGRyZW4oKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgIGxldCBpbnB1dEVsZW1lbnQgPSAkKCQoZWxlbWVudCkuY2hpbGRyZW4oKVswXSk7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgaW5wdXRFbGVtZW50LnByb3AoXCJ0YWdOYW1lXCIpLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcgfHxcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC5wcm9wKFwidGFnTmFtZVwiKS50b0xvd2VyQ2FzZSgpID09PSAndGV4dGFyZWEnXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQudmFsKFwiXCIpO1xuICAgICAgICAgICAgbGV0IGlkID0gaW5wdXRFbGVtZW50LmF0dHIoXCJpZFwiKTtcbiAgICAgICAgICAgIGlkID0gaWQucmVwbGFjZSgvLVswLTldKy8sICcnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaW5wdXRFbGVtZW50LmF0dHIoXCJpZFwiLCBgJHtpZH0tJHtjdXJyZW50TnVtYmVyT2ZTZXR0aW5nc31gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCQoZWxlbWVudCkuZmluZChcImltZ1wiKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLmZpbmQoXCJpbWdcIikuYXR0cihcInNyY1wiLCBcIlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkKGJ1dHRvbk9iai5idXR0b24pLmRhdGEoXCJudW1iZXItb2Ytc2V0dGluZ3NcIiwgY3VycmVudE51bWJlck9mU2V0dGluZ3MrMSk7XG4gICAgICAgIG5ld1NldHRpbmcuZmluZChcImFcIikuYXR0cihcImhyZWZcIiwgXCJcIik7XG4gICAgICAgIG5ld1NldHRpbmcuZmluZChcImFcIikuYXR0cihcImRhdGEtdHlwZVwiLCBcImVtcHR5LXNldHRpbmdcIik7XG4gICAgICAgICQoYnV0dG9uT2JqLmJ1dHRvbikucGFyZW50KCkuYWZ0ZXIobmV3U2V0dGluZyk7XG4gICAgICAgIG5ld1NldHRpbmcuYXBwZW5kKCQoYnV0dG9uT2JqLmJ1dHRvbikpXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBcbiAgICAkKFwiI3N1Ym1pdC1mb3JtXCIpLmNsaWNrKGV2ZW50ID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgZm9ybURhdGEgPSB7fTtcbiAgICAgIGxldCBub25jZSA9ICQoXCIjbm9uY2VcIikudmFsKCk7XG4gICAgICBcbiAgICAgIGR5bmFtaWNGb3Jtcy5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICBsZXQgc2V0dGluZ3NHcm91cFNsdWcgPSAkKGVsZW1lbnQpLmRhdGEoKS5zZXR0aW5nc0dyb3VwU2x1ZztcbiAgICAgICAgbGV0IHNldHRpbmdzR3JvdXBzID0gJChlbGVtZW50KS5maW5kKFwiLnNldHRpbmctZ3JvdXBcIik7XG4gICAgICAgIFxuICAgICAgICBsZXQgZ3JvdXBEYXRhID0gW107XG4gICAgICAgIHNldHRpbmdzR3JvdXBzLmVhY2goKGluZGV4LCBncm91cCkgPT4ge1xuICAgICAgICAgIGxldCBpbnB1dHMgPSAkKGdyb3VwKS5maW5kKFwiLmZvcm1pbnBcIik7XG4gICAgICAgICAgbGV0IGlucHV0RGF0YSA9IHt9O1xuICAgICAgICAgIGxldCBhbGxGaWxsZWQgPSB0cnVlO1xuICAgICAgICAgIGxldCBub3RGaWxsZWQgPSBbXTtcbiAgICAgICAgICBcbiAgICAgICAgICBpbnB1dHMuZWFjaCgoaW5kZXgsIGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IGlucHV0ID0gJCgkKGlucHV0RWxlbWVudCkuY2hpbGRyZW4oKVswXSk7XG4gICAgICAgICAgICAvLyBJZiBpcyBlbXB0eSBhbmQgYXQgbGVhc3Qgb25lIGlzIGFscmVhZHkgZmlsbGVkXG4gICAgICAgICAgICBpZiAoaW5wdXQudmFsKCkgPT09ICcnKSB7XG4gICAgICAgICAgICAgIGFsbEZpbGxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICBub3RGaWxsZWQucHVzaChpbnB1dEVsZW1lbnQpO1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkKGlucHV0RWxlbWVudCkuaGFzQ2xhc3MoXCJlcnJvclwiKSkge1xuICAgICAgICAgICAgICAkKGlucHV0RWxlbWVudCkucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBzZXR0aW5nU2x1ZyA9IGlucHV0LmF0dHIoXCJpZFwiKTtcbiAgICAgICAgICAgIGlucHV0RGF0YVtzZXR0aW5nU2x1Z10gPSB7XG4gICAgICAgICAgICAgIHZhbHVlOiBpbnB1dC52YWwoKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoYWxsRmlsbGVkKSB7XG4gICAgICAgICAgICBncm91cERhdGEucHVzaChpbnB1dERhdGEpXG4gICAgICAgICAgfSBlbHNlIGlmIChub3RGaWxsZWQubGVuZ3RoIDwgaW5wdXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgJChub3RGaWxsZWQpLmNoaWxkcmVuKCkuYWRkQ2xhc3MoXCJlcnJvclwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZ3JvdXBEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBmb3JtRGF0YVtzZXR0aW5nc0dyb3VwU2x1Z10gPSAkLmV4dGVuZCh7fSwgLi4uZ3JvdXBEYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICB1cmw6IGFqYXhfb2JqZWN0LmFqYXhfdXJsLCAvL2FkbWluX3VybFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgXCJmb3JtLWRhdGFcIjogZm9ybURhdGEsXG4gICAgICAgICAgYWN0aW9uOiBhamF4X29iamVjdC5zYXZlX2FjdGlvbixcbiAgICAgICAgICBub25jZTogbm9uY2VcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgIHN1Y2Nlc3M6IChkYXRhID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH0pLFxuICAgICAgICBlcnJvcjogKGRhdGEgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgIH0pXG4gICAgICB9O1xuICAgICAgXG4gICAgICAkLmFqYXgoZGF0YSk7XG4gICAgfSk7XG4gICAgXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBzZWxlY3RvcnMuZW1wdHlEZWxldGUsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgbGV0IHJvdyA9ICQodGFyZ2V0KS5wYXJlbnQoKS5wYXJlbnQoKTtcbiAgICAgIGxldCBhZGRCdXR0b24gPSByb3cuZmluZChcIi5hZGQtYnV0dG9uXCIpO1xuICAgICAgbGV0IGN1cnJlbnROdW1iZXJPZlNldHRpbmdzID0gYWRkQnV0dG9uLmRhdGEoKS5udW1iZXJPZlNldHRpbmdzO1xuICAgICAgYWRkQnV0dG9uLmRhdGEoJ251bWJlci1vZi1zZXR0aW5ncycsIGN1cnJlbnROdW1iZXJPZlNldHRpbmdzLTEpO1xuICAgICAgYWRkQnV0dG9uLmluc2VydEFmdGVyKHJvdy5wcmV2KCkuY2hpbGRyZW4oKVtyb3cucHJldigpLmNoaWxkcmVuKCkubGVuZ3RoLTFdKTtcbiAgICAgIHJvdy5yZW1vdmUoKTtcbiAgICB9KVxuICB9KVxufSkoalF1ZXJ5KTsiLCJleHBvcnQgY29uc3QgYWRkTWVkaWFPcGVuZXIgPSAoaW1nVGFyZ2V0LCBjYWxsYmFjaykgPT4ge1xuICBsZXQgbWVkaWFEYXRhID0gW107XG5cbiAgaWYgKG1ldGFJbWFnZUZyYW1lKSB7XG4gICAgbWV0YUltYWdlRnJhbWUub3BlbigpO1xuICB9XG5cbiAgbGV0IG1ldGFJbWFnZUZyYW1lID0gd3AubWVkaWEuZnJhbWVzLm1ldGFfaW1hZ2VfZnJhbWUgPSB3cC5tZWRpYSh7XG4gICAgdGl0bGU6IFwiU2VsZWN0IEltYWdlXCIsXG4gICAgYnV0dG9uOiB7XG4gICAgICB0ZXh0OiBcIlNlbGVjdFwiXG4gICAgfSxcbiAgICBtdWx0aXBsZTogZmFsc2VcbiAgfSk7XG5cbiAgLy8gUnVucyB3aGVuIGFuIGltYWdlIGlzIHNlbGVjdGVkLlxuICBtZXRhSW1hZ2VGcmFtZS5vbignc2VsZWN0JywgZnVuY3Rpb24gKCkge1xuICAgIC8vIEdyYWJzIHRoZSBhdHRhY2htZW50IHNlbGVjdGlvbiBhbmQgY3JlYXRlcyBhIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsLlxuICAgIGxldCBtZWRpYV9hdHRhY2htZW50ID0gbWV0YUltYWdlRnJhbWUuc3RhdGUoKS5nZXQoJ3NlbGVjdGlvbicpLnRvSlNPTigpWzBdO1xuICAgIFxuICAgIG1lZGlhRGF0YSA9IHtcbiAgICAgIHVybDogbWVkaWFfYXR0YWNobWVudC51cmwsXG4gICAgICBpZDogbWVkaWFfYXR0YWNobWVudC5pZFxuICAgIH07XG4gICAgXG4gICAgY2FsbGJhY2sobWVkaWFEYXRhKTtcbiAgICBtZXRhSW1hZ2VGcmFtZS5jbG9zZSgpO1xuICB9KTtcbiAgLy8gT3BlbnMgdGhlIG1lZGlhIGxpYnJhcnkgZnJhbWUuXG4gIG1ldGFJbWFnZUZyYW1lLm9wZW4oKTtcbiAgXG59OyJdLCJzb3VyY2VSb290IjoiIn0=