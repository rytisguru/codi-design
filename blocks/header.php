<?php
$attributes['logoURL'] = $attributes['logoURL'] ?? get_theme_file_uri('/images/default.jpg');
$attributes['bodyColor'] = $attributes['bodyColor'] ?? "#fff";
?>
<style>
  html, body {
    background-color: <?php echo $attributes['bodyColor']; ?>;
  }
</style>

<header class="header">
  <div class="header-logo">
    <a href="<?php echo site_url(); ?>">
      <img src="<?php echo $attributes['logoURL'] ?>" alt="Codi Design"> 
    </a>
    <i class="fa fa-bars fa-2x" id="burger"></i>
  </div>
  <div class="header-meniu">
    <nav class="site-nav">
      <a href="<?php echo site_url('#'); ?>" id="about-us-id" <?php if(!is_page('gallery')) echo "class='active'"; ?>>Apie mus</a>
      <a href="<?php echo site_url('#projects'); ?>" id="projects-id">Projektai</a>
      <a href="<?php echo site_url('#services'); ?>" id="services-id">Paslaugos</a>
      <a href="<?php echo site_url('#contacts'); ?>" id="contacts-id">Kontaktai</a>
    </nav>
  </div>
</header>
