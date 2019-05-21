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
    var addButtonTemplate = $("<td class='icon-plus add-button'></td>");
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
      $(element).areYouSure({
        "message": "You're changes have not been saved!"
      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2R5bmFtaWMtc2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2ltYWdlLXNlbGVjdG9yLmpzIl0sIm5hbWVzIjpbIm1lZGlhU2VsZWN0b3JPcGVuZXIiLCJyZXF1aXJlIiwiYWRkTWVkaWFPcGVuZXIiLCIkIiwid2luZG93IiwicmVhZHkiLCJzZWxlY3RvcnMiLCJkeW5hbWljRm9ybSIsImRlbGV0ZUJ1dHRvbiIsImVtcHR5RGVsZXRlIiwiYWRkQnV0dG9uVGVtcGxhdGUiLCJhZGRCdXR0b25zIiwicm93VGVtcGxhdGUiLCJzZXR0aW5nc0dyb3VwU2x1ZyIsImR5bmFtaWNGb3JtcyIsImxlbmd0aCIsImVhY2giLCJpbmRleCIsImVsZW1lbnQiLCJ0Ym9keSIsImZpbmQiLCJwYXJlbnQiLCJkYXRhIiwicm93cyIsImltYWdlSW5wdXRzIiwiZG9jdW1lbnQiLCJvbiIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50VGFyZ2V0IiwiaW1hZ2VEYXRhIiwidmFsIiwiaWQiLCJhdHRyIiwidXJsIiwiY2xvbmUiLCJuZXdBZGRCdXR0b24iLCJwdXNoIiwiYnV0dG9uIiwiYXBwZW5kIiwiYXJlWW91U3VyZSIsImZvckVhY2giLCJidXR0b25PYmoiLCJjbGljayIsIm5ld1NldHRpbmciLCJjdXJyZW50TnVtYmVyT2ZTZXR0aW5ncyIsIm51bWJlck9mU2V0dGluZ3MiLCJjaGlsZHJlbiIsImlucHV0RWxlbWVudCIsInByb3AiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJhZnRlciIsImZvcm1EYXRhIiwibm9uY2UiLCJzZXR0aW5nc0dyb3VwcyIsImdyb3VwRGF0YSIsImdyb3VwIiwiaW5wdXRzIiwiaW5wdXREYXRhIiwiYWxsRmlsbGVkIiwibm90RmlsbGVkIiwiaW5wdXQiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwic2V0dGluZ1NsdWciLCJ2YWx1ZSIsImFkZENsYXNzIiwiZXh0ZW5kIiwiYWpheF9vYmplY3QiLCJhamF4X3VybCIsImFjdGlvbiIsInNhdmVfYWN0aW9uIiwibWV0aG9kIiwic3VjY2VzcyIsImNvbnNvbGUiLCJsb2ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImVycm9yIiwiYWpheCIsInRhcmdldCIsInJvdyIsImFkZEJ1dHRvbiIsImluc2VydEFmdGVyIiwicHJldiIsInJlbW92ZSIsImpRdWVyeSIsImltZ1RhcmdldCIsImNhbGxiYWNrIiwibWVkaWFEYXRhIiwibWV0YUltYWdlRnJhbWUiLCJvcGVuIiwid3AiLCJtZWRpYSIsImZyYW1lcyIsIm1ldGFfaW1hZ2VfZnJhbWUiLCJ0aXRsZSIsInRleHQiLCJtdWx0aXBsZSIsIm1lZGlhX2F0dGFjaG1lbnQiLCJzdGF0ZSIsImdldCIsInRvSlNPTiIsImNsb3NlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsSUFBSUEsbUJB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Q2EsS0FBZjtBQUNELEdBWEQsRUFoQnFELENBNEJyRDs7QUFDQWIsZ0JBQWMsQ0FBQ0MsSUFBZjtBQUVELENBL0JNLEMiLCJmaWxlIjoiZHluYW1pYy1zZXR0aW5ncy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL3dwLWNvbnRlbnQvcGx1Z2lucy9hZC10aGVtZS1zZXR0aW5ncy9pbmNsdWRlcy9qcy9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvZHluYW1pYy1zZXR0aW5ncy5qc1wiKTtcbiIsImxldCBtZWRpYVNlbGVjdG9yT3BlbmVyID0gcmVxdWlyZSgnLi9pbWFnZS1zZWxlY3RvcicpLmFkZE1lZGlhT3BlbmVyO1xuKGZ1bmN0aW9uICgkKSB7XG4gIFxuICAkKHdpbmRvdykucmVhZHkoICgpID0+IHtcbiAgICBsZXQgc2VsZWN0b3JzID0ge1xuICAgICAgZHluYW1pY0Zvcm06ICdbZGF0YS10eXBlKj1cImR5bmFtaWNcIl0nLFxuICAgICAgZGVsZXRlQnV0dG9uOiAnW2RhdGEtdHlwZSo9XCJkZWxldGUtYnV0dG9uXCJdJyxcbiAgICAgIGVtcHR5RGVsZXRlOiAnW2RhdGEtdHlwZT1cImVtcHR5LXNldHRpbmdcIl0nXG4gICAgfTtcbiAgICBcbiAgICBsZXQgYWRkQnV0dG9uVGVtcGxhdGUgPSAkKFwiPHRkIGNsYXNzPSdpY29uLXBsdXMgYWRkLWJ1dHRvbic+PC90ZD5cIik7XG4gICAgbGV0IGFkZEJ1dHRvbnMgPSBbXTtcbiAgICBsZXQgcm93VGVtcGxhdGU7XG4gICAgbGV0IHNldHRpbmdzR3JvdXBTbHVnO1xuICAgIFxuICAgIGxldCBkeW5hbWljRm9ybXMgPSAkKHNlbGVjdG9ycy5keW5hbWljRm9ybSk7XG4gICAgXG4gICAgaWYgKGR5bmFtaWNGb3Jtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgZHluYW1pY0Zvcm1zLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICBsZXQgdGJvZHkgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rib2R5Jyk7XG4gICAgICBzZXR0aW5nc0dyb3VwU2x1ZyA9IHRib2R5LnBhcmVudCgpLmRhdGEoKS5zZXR0aW5nc0dyb3VwU2x1ZztcbiAgICAgIGxldCByb3dzID0gdGJvZHkuZmluZCgnLnNldHRpbmctZ3JvdXAnKTtcbiAgICAgIFxuICAgICAgLy8gTG9vayBmb3IgdHlwZSBpbWFnZSBpbnB1dHNcbiAgICAgIGxldCBpbWFnZUlucHV0cyA9IHJvd3MuZmluZCgnLmZvcm1pbnAtaW1hZ2UnKTtcbiAgICAgIFxuICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5mb3JtaW5wLW1lZGlhLXNlbGVjdG9yLW9wZW5lclwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbWVkaWFTZWxlY3Rvck9wZW5lcihldmVudC5jdXJyZW50VGFyZ2V0LCAoaW1hZ2VEYXRhKSA9PiB7XG4gICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoKS5maW5kKFwiLmZvcm1pbnAtaW1hZ2UtaWRcIikudmFsKGltYWdlRGF0YS5pZCk7XG4gICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoKS5maW5kKFwiLmZvcm1pbnAtaW1hZ2UtZWxlbWVudFwiKS5hdHRyKFwic3JjXCIsIGltYWdlRGF0YS51cmwpO1xuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIHJvd1RlbXBsYXRlID0gJChyb3dzWzBdKS5jbG9uZSgpO1xuICAgICAgXG4gICAgICBsZXQgbmV3QWRkQnV0dG9uID0gYWRkQnV0dG9uVGVtcGxhdGUuY2xvbmUoKTtcbiAgICAgIG5ld0FkZEJ1dHRvbi5kYXRhKFwibnVtYmVyLW9mLXNldHRpbmdzXCIsIHJvd3MubGVuZ3RoKTtcbiAgICAgIGFkZEJ1dHRvbnMucHVzaCh7YnV0dG9uOiBuZXdBZGRCdXR0b24sIHJvd1RlbXBsYXRlOiByb3dUZW1wbGF0ZX0pO1xuICAgICAgXG4gICAgICByb3dzLnBhcmVudCgpLmZpbmQoXCIuc2V0dGluZy1ncm91cDpsYXN0LW9mLXR5cGVcIikuYXBwZW5kKG5ld0FkZEJ1dHRvbik7XG4gICAgICBcbiAgICAgICQoZWxlbWVudCkuYXJlWW91U3VyZSh7XG4gICAgICAgIFwibWVzc2FnZVwiOiBcIllvdSdyZSBjaGFuZ2VzIGhhdmUgbm90IGJlZW4gc2F2ZWQhXCJcbiAgICAgIH0pXG4gICAgfSk7XG4gICAgXG4gICAgYWRkQnV0dG9ucy5mb3JFYWNoKChidXR0b25PYmosIGluZGV4KSA9PiB7XG4gICAgICAkKGJ1dHRvbk9iai5idXR0b24pLmNsaWNrKGV2ZW50ID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IG5ld1NldHRpbmcgPSBidXR0b25PYmoucm93VGVtcGxhdGUuY2xvbmUoKTtcbiAgICAgICAgbGV0IGN1cnJlbnROdW1iZXJPZlNldHRpbmdzID0gJChidXR0b25PYmouYnV0dG9uKS5kYXRhKCkubnVtYmVyT2ZTZXR0aW5ncztcbiAgICAgICAgbmV3U2V0dGluZy5jaGlsZHJlbigpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgbGV0IGlucHV0RWxlbWVudCA9ICQoJChlbGVtZW50KS5jaGlsZHJlbigpWzBdKTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQucHJvcChcInRhZ05hbWVcIikudG9Mb3dlckNhc2UoKSA9PT0gJ2lucHV0JyB8fFxuICAgICAgICAgICAgaW5wdXRFbGVtZW50LnByb3AoXCJ0YWdOYW1lXCIpLnRvTG93ZXJDYXNlKCkgPT09ICd0ZXh0YXJlYSdcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC52YWwoXCJcIik7XG4gICAgICAgICAgICBsZXQgaWQgPSBpbnB1dEVsZW1lbnQuYXR0cihcImlkXCIpO1xuICAgICAgICAgICAgaWQgPSBpZC5yZXBsYWNlKC8tWzAtOV0rLywgJycpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQuYXR0cihcImlkXCIsIGAke2lkfS0ke2N1cnJlbnROdW1iZXJPZlNldHRpbmdzfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoJChlbGVtZW50KS5maW5kKFwiaW1nXCIpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQoZWxlbWVudCkuZmluZChcImltZ1wiKS5hdHRyKFwic3JjXCIsIFwiXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICQoYnV0dG9uT2JqLmJ1dHRvbikuZGF0YShcIm51bWJlci1vZi1zZXR0aW5nc1wiLCBjdXJyZW50TnVtYmVyT2ZTZXR0aW5ncysxKTtcbiAgICAgICAgbmV3U2V0dGluZy5maW5kKFwiYVwiKS5hdHRyKFwiaHJlZlwiLCBcIlwiKTtcbiAgICAgICAgbmV3U2V0dGluZy5maW5kKFwiYVwiKS5hdHRyKFwiZGF0YS10eXBlXCIsIFwiZW1wdHktc2V0dGluZ1wiKTtcbiAgICAgICAgJChidXR0b25PYmouYnV0dG9uKS5wYXJlbnQoKS5hZnRlcihuZXdTZXR0aW5nKTtcbiAgICAgICAgbmV3U2V0dGluZy5hcHBlbmQoJChidXR0b25PYmouYnV0dG9uKSlcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgICQoXCIjc3VibWl0LWZvcm1cIikuY2xpY2soZXZlbnQgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCBmb3JtRGF0YSA9IHt9O1xuICAgICAgbGV0IG5vbmNlID0gJChcIiNub25jZVwiKS52YWwoKTtcbiAgICAgIFxuICAgICAgZHluYW1pY0Zvcm1zLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgIGxldCBzZXR0aW5nc0dyb3VwU2x1ZyA9ICQoZWxlbWVudCkuZGF0YSgpLnNldHRpbmdzR3JvdXBTbHVnO1xuICAgICAgICBsZXQgc2V0dGluZ3NHcm91cHMgPSAkKGVsZW1lbnQpLmZpbmQoXCIuc2V0dGluZy1ncm91cFwiKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBncm91cERhdGEgPSBbXTtcbiAgICAgICAgc2V0dGluZ3NHcm91cHMuZWFjaCgoaW5kZXgsIGdyb3VwKSA9PiB7XG4gICAgICAgICAgbGV0IGlucHV0cyA9ICQoZ3JvdXApLmZpbmQoXCIuZm9ybWlucFwiKTtcbiAgICAgICAgICBsZXQgaW5wdXREYXRhID0ge307XG4gICAgICAgICAgbGV0IGFsbEZpbGxlZCA9IHRydWU7XG4gICAgICAgICAgbGV0IG5vdEZpbGxlZCA9IFtdO1xuICAgICAgICAgIFxuICAgICAgICAgIGlucHV0cy5lYWNoKChpbmRleCwgaW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5wdXQgPSAkKCQoaW5wdXRFbGVtZW50KS5jaGlsZHJlbigpWzBdKTtcbiAgICAgICAgICAgIC8vIElmIGlzIGVtcHR5IGFuZCBhdCBsZWFzdCBvbmUgaXMgYWxyZWFkeSBmaWxsZWRcbiAgICAgICAgICAgIGlmIChpbnB1dC52YWwoKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgYWxsRmlsbGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIG5vdEZpbGxlZC5wdXNoKGlucHV0RWxlbWVudCk7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCQoaW5wdXRFbGVtZW50KS5oYXNDbGFzcyhcImVycm9yXCIpKSB7XG4gICAgICAgICAgICAgICQoaW5wdXRFbGVtZW50KS5yZW1vdmVDbGFzcyhcImVycm9yXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHNldHRpbmdTbHVnID0gaW5wdXQuYXR0cihcImlkXCIpO1xuICAgICAgICAgICAgaW5wdXREYXRhW3NldHRpbmdTbHVnXSA9IHtcbiAgICAgICAgICAgICAgdmFsdWU6IGlucHV0LnZhbCgpLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChhbGxGaWxsZWQpIHtcbiAgICAgICAgICAgIGdyb3VwRGF0YS5wdXNoKGlucHV0RGF0YSlcbiAgICAgICAgICB9IGVsc2UgaWYgKG5vdEZpbGxlZC5sZW5ndGggPCBpbnB1dHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAkKG5vdEZpbGxlZCkuY2hpbGRyZW4oKS5hZGRDbGFzcyhcImVycm9yXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChncm91cERhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGZvcm1EYXRhW3NldHRpbmdzR3JvdXBTbHVnXSA9ICQuZXh0ZW5kKHt9LCAuLi5ncm91cERhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgIHVybDogYWpheF9vYmplY3QuYWpheF91cmwsIC8vYWRtaW5fdXJsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBcImZvcm0tZGF0YVwiOiBmb3JtRGF0YSxcbiAgICAgICAgICBhY3Rpb246IGFqYXhfb2JqZWN0LnNhdmVfYWN0aW9uLFxuICAgICAgICAgIG5vbmNlOiBub25jZVxuICAgICAgICB9LFxuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgc3VjY2VzczogKGRhdGEgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSksXG4gICAgICAgIGVycm9yOiAoZGF0YSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgfSlcbiAgICAgIH07XG4gICAgICBcbiAgICAgICQuYWpheChkYXRhKTtcbiAgICB9KTtcbiAgICBcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIHNlbGVjdG9ycy5lbXB0eURlbGV0ZSwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICBsZXQgcm93ID0gJCh0YXJnZXQpLnBhcmVudCgpLnBhcmVudCgpO1xuICAgICAgbGV0IGFkZEJ1dHRvbiA9IHJvdy5maW5kKFwiLmFkZC1idXR0b25cIik7XG4gICAgICBsZXQgY3VycmVudE51bWJlck9mU2V0dGluZ3MgPSBhZGRCdXR0b24uZGF0YSgpLm51bWJlck9mU2V0dGluZ3M7XG4gICAgICBhZGRCdXR0b24uZGF0YSgnbnVtYmVyLW9mLXNldHRpbmdzJywgY3VycmVudE51bWJlck9mU2V0dGluZ3MtMSk7XG4gICAgICBhZGRCdXR0b24uaW5zZXJ0QWZ0ZXIocm93LnByZXYoKS5jaGlsZHJlbigpW3Jvdy5wcmV2KCkuY2hpbGRyZW4oKS5sZW5ndGgtMV0pO1xuICAgICAgcm93LnJlbW92ZSgpO1xuICAgIH0pXG4gIH0pXG59KShqUXVlcnkpOyIsImV4cG9ydCBjb25zdCBhZGRNZWRpYU9wZW5lciA9IChpbWdUYXJnZXQsIGNhbGxiYWNrKSA9PiB7XG4gIGxldCBtZWRpYURhdGEgPSBbXTtcblxuICBpZiAobWV0YUltYWdlRnJhbWUpIHtcbiAgICBtZXRhSW1hZ2VGcmFtZS5vcGVuKCk7XG4gIH1cblxuICBsZXQgbWV0YUltYWdlRnJhbWUgPSB3cC5tZWRpYS5mcmFtZXMubWV0YV9pbWFnZV9mcmFtZSA9IHdwLm1lZGlhKHtcbiAgICB0aXRsZTogXCJTZWxlY3QgSW1hZ2VcIixcbiAgICBidXR0b246IHtcbiAgICAgIHRleHQ6IFwiU2VsZWN0XCJcbiAgICB9LFxuICAgIG11bHRpcGxlOiBmYWxzZVxuICB9KTtcblxuICAvLyBSdW5zIHdoZW4gYW4gaW1hZ2UgaXMgc2VsZWN0ZWQuXG4gIG1ldGFJbWFnZUZyYW1lLm9uKCdzZWxlY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gR3JhYnMgdGhlIGF0dGFjaG1lbnQgc2VsZWN0aW9uIGFuZCBjcmVhdGVzIGEgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwuXG4gICAgbGV0IG1lZGlhX2F0dGFjaG1lbnQgPSBtZXRhSW1hZ2VGcmFtZS5zdGF0ZSgpLmdldCgnc2VsZWN0aW9uJykudG9KU09OKClbMF07XG4gICAgXG4gICAgbWVkaWFEYXRhID0ge1xuICAgICAgdXJsOiBtZWRpYV9hdHRhY2htZW50LnVybCxcbiAgICAgIGlkOiBtZWRpYV9hdHRhY2htZW50LmlkXG4gICAgfTtcbiAgICBcbiAgICBjYWxsYmFjayhtZWRpYURhdGEpO1xuICAgIG1ldGFJbWFnZUZyYW1lLmNsb3NlKCk7XG4gIH0pO1xuICAvLyBPcGVucyB0aGUgbWVkaWEgbGlicmFyeSBmcmFtZS5cbiAgbWV0YUltYWdlRnJhbWUub3BlbigpO1xuICBcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==