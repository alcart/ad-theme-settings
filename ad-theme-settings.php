<?php
/**
 * Plugin Name: AD Creative Marketing Theme Settings
 * Plugin URI: adcreativemarketing.com
 * Description: Plugin to dynamically or statically add screen settings to wordpress by A&D Creative Marketing, LLC
 * Version: 0.1
 * Author: A&D Creative Marketing, LLC
 * Author URI: adcreativemarketing.com
 * License: MIT
 * Text Domain: ad-theme-settings/
 */

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

if (!class_exists('AD_Theme_Settings')) {


  /**
   * Class ThemeScreen
   * Creates a screen for personalized settings of the theme
   * Uses filter: 'theme_settings_register_tab' for registering new tabs
   * tabs array should be as follows:
   * array(
   *     title     => string,
   *     slug      => string (required),
   *     settings  => array of ThemeScreenSettingsGroup,
   * )
   */
  class AD_Theme_Settings {
    public static $MENU_SLUG = 'ad-theme-settings';
    public $tabs_count;
    public $tabs;

    function __construct() {
      $this->tabs_count = 0;
      $this->tabs = array();
      //tab = array(title => string, options => array(opts))
      add_action("admin_init", array($this, "delete_options_on_init"));

    }

    public function initialize() {
      if (!isset($_GET['page']) || !($_GET['page'] == AD_Theme_Settings::$MENU_SLUG)) {
        return;
      }

      add_menu_page(
        'A&D Options',
        'A&D Theme',
        'manage_options',
        AD_Theme_Settings::$MENU_SLUG,
        array($this, 'output_screen')
      );
      $this->tabs = apply_filters('ad_theme_settings_register_tab', array());
//      var_dump($this->tabs);
//      exit;
      $this->enqueue_theme_screen_scripts();
    }

    public function output_screen() {
      if (empty($this->tabs)) {
        echo "<h1>There are no registered settings</h1>";
        echo "<p>Use filter <code>ad_theme_settings_register_tab</code> to add settings</p>";
        return;
      }
      $tabs = $this->tabs;
      $selected_tab = isset($_GET['tab']) ? $_GET['tab'] : $this->tabs[0]['slug'];

      ob_start();
      ?>
      <div class="wrap">
        <nav class="nav-tab-wrapper">
          <?php foreach ($tabs as $tab): ?>
            <a href="<?php menu_page_url(AD_Theme_Settings::$MENU_SLUG)?>&tab=<?= $tab['slug'] ?>" class="nav-tab
          <?= ($selected_tab == $tab['slug']) ? 'nav-tab-active' : ''?>">
              <?= $tab['title']?>
            </a>
          <?php endforeach; ?>
        </nav>
        <form method='post' id='main-form' action enctype='multipart/form-data'>
          <input id="nonce" type="hidden" value="<?= wp_create_nonce(__FILE__) ?>">
          <?php if ($selected_tab): ?>
            <?php $this->render_settings($this->find_tab_object($selected_tab)) ?>
          <?php else: ?>
            <?php $this->render_settings($this->tabs[0]) ?>
          <?php endif; ?>
          <button id="submit-form" class="button button-primary" type="submit">Save</button>
        </form>
      </div>
      <?php
      $output = ob_get_contents();
      ob_clean();
      echo $output;
    }

    public function get_tab_data($tab) {
      $tab_data = [];
      if (!isset($tab['title']) || !isset($tab['type']) || !isset($tab['slug'])) {
        return $tab_data;
      }

      $title = $tab['title'];
      $type = $tab['type'];

      $tab_data['title'] = $title;
      $tab_data['slug'] = $tab['slug'];
      $tab_data['type'] = $type;

      if (!isset($tab['settings'])) {
        return $tab_data; // default input label pair
      }

      return $tab_data;
    }

    public function render_settings($tab) {
      foreach ($tab['settings'] as $setting){
        echo "<div class='settings-group-wrapper'>";
        echo $setting->get_settings_group_html();
        echo "</div>";
      }
    }

    public function enqueue_theme_screen_scripts() {
      wp_enqueue_media();
      wp_enqueue_script('theme-settings-admin-screen', plugin_dir_url(__FILE__) . 'includes/js/dynamic-settings.js', array('jquery'));
      wp_localize_script('theme-settings-admin-screen', 'ajax_object',array(
        'ajax_url' => admin_url( 'admin-ajax.php' ),
        'save_action' => 'save_settings_data'
      ));

      wp_enqueue_style('theme-settings-admin-screen', plugin_dir_url(__FILE__) . 'includes/css/admin.css');
    }

    public function save_settings_data() {
      $data = $_POST['form-data'];
      $nonce = $_POST['nonce'];

      if (!wp_verify_nonce($nonce, __FILE__)) {
        $json_data = ['error' => true];
        wp_send_json($json_data);
        die();
      }

      foreach ($data as $slug => $setting_group) {
        $group_reference = $this->find_group_setting($slug);
        $updated_values = $group_reference->update_options($setting_group, $slug);
        $json_data["updated"] = $updated_values;
      }
      $json_data['original'] = $_POST['form-data'];
      $json_data['success'] = true;
      add_action('admin_notices', array('AD_Theme_Settings', 'success_notice'));
      wp_send_json($json_data);
      die();
    }

    public function delete_options_data($option_slugs, $option_group) {
      $group_reference = $this->find_group_setting($option_group);
      $group_reference->delete_options($option_slugs);
    }

    public function register_ajax_action() {
      add_action('wp_ajax_save_settings_data', array($this, 'save_settings_data'));
      add_action('wp_ajax_nopriv_save_settings_data', array($this, 'save_settings_data'));

      add_action('wp_ajax_save_settings_data', array($this, 'delete_settings_data'));
      add_action('wp_ajax_nopriv_save_settings_data', array($this, 'delete_settings_data'));
    }

    public function delete_options_on_init() {
      if (!isset($_GET['page']) || !($_GET['page'] == AD_Theme_Settings::$MENU_SLUG)) {
        return;
      }
      $selected_tab = isset($_GET['tab']) ? $_GET['tab'] : null;
      $delete_options = isset($_GET['deleteOptions']) ? $_GET['deleteOptions'] : null;
      $delete_options_group = isset($_GET['deleteOptionsGroup']) ? $_GET['deleteOptionsGroup'] : null;

      if (!empty($delete_options) && $delete_options_group) {
        $this->delete_options_data($delete_options, $delete_options_group);
        $tab_slug = '';
        if ($selected_tab) {
          $tab_slug = "&tab=$this->find_tab_object($selected_tab)['slug']";
        }
        wp_redirect(menu_page_url(AD_Theme_Settings::$MENU_SLUG) . "$tab_slug");
      }
    }

    public static function success_notice() {
      ?>
      <div class="notice notice-success is-dismissible">
        <p><?php _e( 'Settings updated successfully', 'chuchys' ); ?></p>
      </div>
      <?php
    }

    private function find_tab_object($tab_slug) {
      foreach ($this->tabs as $tab) {
        if ($tab['slug'] == $tab_slug){
          return $tab;
        }
      }
      return [];
    }

    private function find_group_setting($group_slug) {
      $this->tabs = apply_filters('theme_settings_register_tab', array());
      foreach ($this->tabs as $tab) {
        foreach ($tab['settings'] as $group_setting) {
          if ($group_setting->slug == $group_slug){
            return $group_setting;
          }
        }
      }
      return null;
    }
  }

  require_once plugin_dir_path(__FILE__) . '/includes/theme-screen-settings-group.php';
  require_once plugin_dir_path(__FILE__) . '/includes/theme-screen-setting.php';
}

if (!function_exists('ad_theme_settings_init')) {

  function ad_theme_settings_init() {
    global $ad_theme_settings;
    $ad_theme_settings = new AD_Theme_Settings();

    add_action('admin_init', array($ad_theme_settings, "register_ajax_action"));
    add_action( 'admin_menu', array($ad_theme_settings, 'initialize' ));
  }

}

if (!function_exists('ad_theme_settings_activate')) {

  function ad_theme_settings_activate() {
    add_action('init', 'ad_theme_settings_init');
  }
}

ad_theme_settings_init();