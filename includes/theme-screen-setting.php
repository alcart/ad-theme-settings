<?php

/**
 * Class ThemeScreenSetting
 * Constructs an option for the ThemeScreenSettingsGroup
 */
class ThemeScreenSetting {

  /**
   * ThemeScreenSetting constructor.
   * @param string $slug : name for the option
   * @param string $type : input | select | email | number | textbox
   * @param string $title : title for the option
   * @param string $description : description for the option
   * @param string $default : default value of the option
   * @param bool $dynamic
   * @throws Exception
   */
  function __construct($slug , $type, $title, $description = '', $default = '', $dynamic = false) {

    if (!$slug) {
      throw new Exception('$slug and $title are required');
    }

    if (!$dynamic && (!$type || !$title)) {
      throw new Exception('For non-dynamic settings the options $slug, $type and $title are required');
    }
    $this->option_name = $slug;
    $this->dynamic = $dynamic;
    $this->title = $title;
    $this->type = $type;

    if (!$dynamic) {
      $this->settings = array(
        'type'        => $this->get_setting_store_type($type),
        'title'       => $title,
        'description' => $description,
        'default'     => $default,
      );
    } else {
      $this->settings = array(
        'type'        => 'string',
        'title'       => $this->title,
        'description' => $description,
        'default'     => $default,
      );
    }
  }

  /**
   * Registers setting with wordpress
   * @param string $options_group: option_group slug
   */
  function register_setting($options_group) {
    register_setting($options_group, $this->option_name, $this->settings);
  }

  /**
   * Returns the html for the option
   * @param $options_group
   * @param string $value
   * @return string
   */
  function get_setting_html($options_group, $value = '') {
    $output = "";
    if (!$this->dynamic) {
      $output .= "<th scope='row' class='titledesc'><label for='$this->option_name'>${$this->settings['title']}</label></th>";
      $option_value = get_option($this->option_name);
      $output .= $this->get_type_html($option_value);
    } else {
      $output .= $this->get_type_html($value);
    }
    return $output;
  }

  function render_setting() {
    echo $this->get_setting_html();
  }

  function get_type_html($option_value) {
    $output = "";
    switch ($this->type) {
      case "text":case "select":case "email":case "number":
      $output .= "<td class='forminp forminp-text'>
                    <input id='$this->option_name' type='$this->type' value='$option_value' placeholder='$this->title'/>
                  </td>";
      break;
      case "textarea":
        $output .= "<td class='forminp forminp-text'><textarea id='$this->option_name' placeholder='$this->title'>$option_value</textarea></td>";
        break;
      case "image":
        $image_url = wp_get_attachment_url($option_value);
        $output .= "
          <td class='forminp forminp-image'>
            <input class='forminp-image-id' value='$option_value' type='hidden' style='display: none;' id='$this->option_name'>
            <img src='$image_url' class='admin-image forminp-image-element' />
            <button type='submit' class='button image-upload forminp-media-selector-opener' data-type='browse-image'>Browse</button>
          </td>";
        break;
    }
    return $output;
  }

  /**
   * Returns store type for wordpress register_setting function
   * @param $type
   * @return string
   */
  private function get_setting_store_type($type) {

    switch ($type){
      case "text":case "select":case "textarea":case "email":
      return 'string';
      case "checkbox":
        return 'boolean';
      case "number":
        return 'number';
      default:
        return 'string';
    }
  }
}
