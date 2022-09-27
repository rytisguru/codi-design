<?php
	$attributes['logoURL'] = $attributes['logoURL'] ?? get_theme_file_uri('/images/def-logo.jpg');

    if (!isset($attributes['bgColor'])) $attributes['bgColor'] = "";
?>
<div class="box" style="background-color: <?php echo $attributes['bgColor']; ?>;">
    <div class="box-image">
        <img src="<?php echo $attributes['logoURL']; ?>" alt="">
    </div>
    <div class="box-text">
        <?php echo $content; ?>
    </div>
</div>
