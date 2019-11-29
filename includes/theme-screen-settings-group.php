<?php



/**
 * Class ThemeScreenSettingsGroup
 * Constructs an options group for a ThemeScreen tab
 */
abstract class ThemeScreenSettingsGroup {
  protected $type;

  /**
   * ThemeScreenSettingsGroup constructor.
   * @param $slug string: option group name
   * @param $title string: title for the option group
   */
  function __construct($slug, $title){
    $this->slug = $slug;
    $this->title = $title;
  }

  /**
   * Returns html of the settings group
   * @return string
   */
  function get_settings_group_html() {
    $output = "<h3>$this->title</h3>
               <table data-type='$this->type' data-settings-group-slug='$this->slug' class='form-table'>
                  <tbody>";

    $output .= $this->get_html();

    $output .=  "</tbody></table>";
    return $output;
  }

  abstract function get_html();
}

class ThemeScreenDynamicSettingsGroup extends ThemeScreenSettingsGroup {
  public $settings_opts;

  function __construct($slug, $title, $settings_opts) {
    parent::__construct($slug, $title);
    $this->settings_opts = $settings_opts;
    $this->type = 'dynamic';
    foreach ($this->settings_opts as $key => $opt) {
      $this->settings_opts[$key]["setting_count"] = 0;
    }
  }

  function get_html() {
    $stored_values = $this->get_dynamic_settings_stored_values();
    $output = "";
    if (empty($stored_values)) {
      $output .= $this->generate_new_setting();
    }
    else {
      foreach ($stored_values as $index => $setting_group) {
        $slugs = array();
        $output .= "<tr valign='top' class='setting-group' data-group-slug='$this->slug'>";
        foreach ($setting_group as $slug => $setting_value) {
          $setting = new ThemeScreenSetting(
            "$slug-$index",
            $this->settings_opts[$slug]["setting_type"],
            $this->settings_opts[$slug]["setting_title"],
            '',
            '',
            true
          );
          $slugs[] = "$slug-$index";
          $this->settings_opts[$slug]["setting_count"]++;
          $output .= $setting->get_setting_html($this->slug, $setting_value);
        }
        $delete_url_params = array(
          "deleteOptionsGroup" => $this->slug,
          "deleteOptions" => $slugs
        );
        $nav_param = '';
        if (isset($_GET['tab'])) {
          $nav_param = "tab={$_GET['tab']}&";
        }
        global $ad_theme_settings;
        $delete_url = menu_page_url($ad_theme_settings->menu_slug, false) . "&" . $nav_param . http_build_query($delete_url_params);
        $output .= "<td class='remove-icon'><a href='$delete_url'><span class='icon-cross'></span></a></td>";
        $output .= "</tr>";
      }
      $output .= $this->generate_new_setting();
    }
    return $output;
  }

  /**
   * Returns stored values related to one of the options_group slug
   * @return array of stored values in wordpress
   */
  function get_dynamic_settings_stored_values() {
    return get_option($this->slug);
  }

  function update_options($options, $option_group_raw_slug = '') {
    $parsed_options = $this->parse_options($options, $this->slug);
    update_option($this->slug, $parsed_options);
    return $parsed_options;
  }

  function delete_options($options) {

    $option_value_array = get_option($this->slug, array());
    if (empty($option_value_array)) {
      return;
    }
    $index = array();
    preg_match("/-[0-9]/", $options[0], $index);
    $index = str_replace('-', '', $index[0]);
    array_splice($option_value_array, $index[0], 1);
    update_option($this->slug, $option_value_array);
  }

  function generate_new_setting() {
    $output = "<tr class='setting-group' valign='top'>";
    foreach ($this->settings_opts as $slug => $opt) {
      $setting_count = $opt['setting_count'];
      $new_setting_slug = "$slug-$setting_count";
      $new_setting = new ThemeScreenSetting($new_setting_slug, $opt['setting_type'], $opt['setting_title'],'', '', true);
      $new_setting->register_setting($this->slug);
      $output .= $new_setting->get_setting_html($this->slug);
      $opt['setting_count']++;
    }
    $output .= "<td class='remove-icon'><a href='' data-type='empty-setting'><span class='ad-settings-icon-cross'></span></a></td>";
    $output .= "</tr>";
    return $output;
  }

  function validate_option($option_slug) {
    $real_slug = array();
    $index_count = array();
    preg_match("/.*(?=-[0-9])/", $option_slug, $real_slug);
    preg_match("/-[0-9]/", $option_slug, $index_count);

    if (array_key_exists($real_slug[0], $this->settings_opts)) {
      return [
        "real-slug" => $real_slug[0],
        "index"     => str_replace('-', '', $index_count[0]),
      ];
    }
    return false;
  }

  protected function parse_options($options, $option_group_raw_slug = "") {
    $parsed_options = array();
    $option_value_array = get_option($this->slug, array());
    $indexes = array();
    foreach ($options as $setting_slug => $setting_obj) {
      $real_setting = $this->validate_option($setting_slug);
      if ($real_setting) {
        $parsed_options[$real_setting["index"]][$real_setting["real-slug"]] = stripslashes($setting_obj["value"]);
        $indexes[] = $real_setting["index"];
      }
    }
    return $parsed_options + $option_value_array;
  }
}

/**
 * Class ThemeScreenStaticSettingsGroup
 */
class ThemeScreenStaticSettingsGroup extends ThemeScreenSettingsGroup {

  /**
   * ThemeScreenStaticSettingsGroup constructor.
   * @param string $slug
   * @param string $title
   * @param ThemeScreenSetting $settings
   */
  function __construct($slug, $title, $settings_opts) {
    parent::__construct($slug, $title);
    $this->settings_opts = $settings_opts;

    foreach ($settings_opts as $setting) {
      $setting->register_setting($slug);
    }
  }

  function get_html() {
    $output = "<tr valign='top' class='setting-group' data-group-slug='$this->slug'>";

    foreach ($this->settings as $setting) {
      $output .= $setting->get_html();
    }

    $output .= "</tr>";
    return $output;

  }
}