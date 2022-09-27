<?php

function load_files() {
	// CSS 
	wp_enqueue_style('font-awesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

	wp_enqueue_style('main-styles', get_stylesheet_uri());
	wp_enqueue_style('main-styles2', get_theme_file_uri('build/style-index.css'));
	wp_enqueue_style('main-styles3', get_theme_file_uri('build/index.css'));

	// JS 
	wp_enqueue_script('main-js', get_theme_file_uri('build/index.js'), array('jquery'), '1.0', true);
	wp_localize_script('main-js', 'JSData', array(
		'root_url' => get_site_url(),
		'nonce' => wp_create_nonce('wp_rest')
	));
}

add_action('wp_enqueue_scripts', 'load_files');

function theme_features() {
	add_image_size('workImgBig', 750, 500, false);
	add_image_size('workImgSmall', 200, 150, false);
	add_image_size('serviceLogo', 75, 75, false);
	add_image_size('galleryLogo', 750, 300, false);
	add_theme_support('editor-styles');
	add_editor_style(array('./build/style-index.css', './build/index.css'));
	add_theme_support( 'editor-color-palette', array() );
}

add_action('after_setup_theme', 'theme_features');

function my_login_logo() { ?> 
	<style type="text/css"> 
	body.login div#login h1 a {
 		background-image: url(<?php echo get_theme_file_uri('./images/codi-design.png') ?>);
		padding-bottom: 30px; 
		background-size: contain;
		min-width: 300px;
		height: auto;
	}	 
	</style>
<?php } 

add_action( 'login_enqueue_scripts', 'my_login_logo' );

function add_favicon() { ?>
    <link rel="icon" type="image/x-icon" href="<?php echo get_stylesheet_directory_uri();?>/images/icon.png"/>
 <?php }

add_action('wp_head','add_favicon');
add_action('admin_head','add_favicon');
add_action('login_init','add_favicon');

function custom_menu_page_removing() {
    remove_menu_page( 'edit.php' );
    remove_menu_page( 'edit-comments.php' );
}

add_action( 'admin_menu', 'custom_menu_page_removing' );

class PlaceHolderBlock {

	function __construct($name) {
		$this->name = $name;
		add_action('init', [$this, 'onInit']);
	}

	function myRenderCallback($attributes, $content) {
		ob_start();
		require get_theme_file_path("/blocks/{$this->name}.php");
		return ob_get_clean();
	}

	function onInit() {
		wp_register_script($this->name, get_stylesheet_directory_uri() . "/blocks/{$this->name}.js", array('wp-blocks', 'wp-editor'));

		register_block_type("codi-design/{$this->name}", array(
			'editor_script' => $this->name,
			'render_callback' => [$this, 'myRenderCallback']
		));
	}
}

// Base Blocks
new PlaceHolderBlock("footer");
new PlaceHolderBlock("page");
new PlaceHolderBlock("contact-form");

//

class JSXBlock {

	function __construct($name, $renderCallback = null, $data = null) {
		$this->name = $name;
		$this->renderCallback = $renderCallback;
		$this->data = $data;
		add_action('init', [$this, 'onInit']);
	}

	function myRenderCallback($attributes, $content) {
		ob_start();
		require get_theme_file_path("/blocks/{$this->name}.php");
		return ob_get_clean();
	}

	function onInit() {
		wp_register_script($this->name, get_stylesheet_directory_uri() . "/build/{$this->name}.js", array('wp-blocks', 'wp-editor'));

		if ($this->data) {
			wp_localize_script($this->name, $this->name, $this->data);
		}

		$args = array('editor_script' => $this->name);
		if ($this->renderCallback) {
			$args['render_callback'] = [$this, 'myRenderCallback'];
		}

		register_block_type("codi-design/{$this->name}", $args);
	}

}

new JSXBlock("header", true);
new JSXBlock('genericheading');

new JSXBlock('work-section', true);
new JSXBlock('work', true, ['fallbackimage' => get_theme_file_uri('/images/default.jpg'), 'themeimagepath' => get_theme_file_uri('/images/')]);

new JSXBlock('scroll-block', true);
new JSXBlock('gallery', true);

new JSXBlock('services-section', true);
new JSXBlock('service', true, ['fallbackimage' => get_theme_file_uri('/images/def-logo.png'), 'themeimagepath' => get_theme_file_uri('/images/')]);

?>