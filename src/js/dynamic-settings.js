let mediaSelectorOpener = require('./image-selector').addMediaOpener;
(function ($) {
  
  $(window).ready( () => {
    let selectors = {
      dynamicForm: '[data-type*="dynamic"]',
      deleteButton: '[data-type*="delete-button"]',
      emptyDelete: '[data-type="empty-setting"]'
    };
    
    let addButtonTemplate = $("<td class='icon-plus add-button'></td>");
    let addButtons = [];
    let rowTemplate;
    let settingsGroupSlug;
    
    let dynamicForms = $(selectors.dynamicForm);
    
    if (dynamicForms.length === 0) {
      return;
    }
    
    dynamicForms.each((index, element) => {
      let tbody = $(element).find('tbody');
      settingsGroupSlug = tbody.parent().data().settingsGroupSlug;
      let rows = tbody.find('.setting-group');
      
      // Look for type image inputs
      let imageInputs = rows.find('.forminp-image');
      
      $(document).on("click", ".forminp-media-selector-opener", (event) => {
        event.preventDefault();
        mediaSelectorOpener(event.currentTarget, (imageData) => {
          $(event.currentTarget).parent().find(".forminp-image-id").val(imageData.id);
          $(event.currentTarget).parent().find(".forminp-image-element").attr("src", imageData.url);
        })
      });
      
      rowTemplate = $(rows[0]).clone();
      
      let newAddButton = addButtonTemplate.clone();
      newAddButton.data("number-of-settings", rows.length);
      addButtons.push({button: newAddButton, rowTemplate: rowTemplate});
      
      rows.parent().find(".setting-group:last-of-type").append(newAddButton);
      
      $(element).areYouSure({
        "message": "You're changes have not been saved!"
      })
    });
    
    addButtons.forEach((buttonObj, index) => {
      $(buttonObj.button).click(event => {
        event.preventDefault();
        let newSetting = buttonObj.rowTemplate.clone();
        let currentNumberOfSettings = $(buttonObj.button).data().numberOfSettings;
        newSetting.children().each((index, element) => {
          let inputElement = $($(element).children()[0]);
          if (
            inputElement.prop("tagName").toLowerCase() === 'input' ||
            inputElement.prop("tagName").toLowerCase() === 'textarea'
          ) {
            inputElement.val("");
            let id = inputElement.attr("id");
            id = id.replace(/-[0-9]+/, '');
            
            inputElement.attr("id", `${id}-${currentNumberOfSettings}`);
          }
          if ($(element).find("img").length > 0) {
            $(element).find("img").attr("src", "");
          }
        });
        $(buttonObj.button).data("number-of-settings", currentNumberOfSettings+1);
        newSetting.find("a").attr("href", "");
        newSetting.find("a").attr("data-type", "empty-setting");
        $(buttonObj.button).parent().after(newSetting);
        newSetting.append($(buttonObj.button))
      });
    });
    
    $("#submit-form").click(event => {
      event.preventDefault();
      let formData = {};
      let nonce = $("#nonce").val();
      
      dynamicForms.each((index, element) => {
        let settingsGroupSlug = $(element).data().settingsGroupSlug;
        let settingsGroups = $(element).find(".setting-group");
        
        let groupData = [];
        settingsGroups.each((index, group) => {
          let inputs = $(group).find(".forminp");
          let inputData = {};
          let allFilled = true;
          let notFilled = [];
          
          inputs.each((index, inputElement) => {
            let input = $($(inputElement).children()[0]);
            // If is empty and at least one is already filled
            if (input.val() === '') {
              allFilled = false;
              notFilled.push(inputElement);
              return true;
            }
            if ($(inputElement).hasClass("error")) {
              $(inputElement).removeClass("error");
            }
            let settingSlug = input.attr("id");
            inputData[settingSlug] = {
              value: input.val(),
            }
          });
          if (allFilled) {
            groupData.push(inputData)
          } else if (notFilled.length < inputs.length) {
            $(notFilled).children().addClass("error");
          }
        });
        if (groupData.length > 0) {
          formData[settingsGroupSlug] = $.extend({}, ...groupData);
        }
      });
      
      let data = {
        url: ajax_object.ajax_url, //admin_url
        data: {
          "form-data": formData,
          action: ajax_object.save_action,
          nonce: nonce
        },
        method: 'post',
        success: (data => {
          console.log(data);
          window.location.reload();
        }),
        error: (data => {
          console.log(data)
        })
      };
      
      $.ajax(data);
    });
    
    $(document).on("click", selectors.emptyDelete, (event) => {
      event.preventDefault();
      let target = event.currentTarget;
      let row = $(target).parent().parent();
      let addButton = row.find(".add-button");
      let currentNumberOfSettings = addButton.data().numberOfSettings;
      addButton.data('number-of-settings', currentNumberOfSettings-1);
      addButton.insertAfter(row.prev().children()[row.prev().children().length-1]);
      row.remove();
    })
  })
})(jQuery);