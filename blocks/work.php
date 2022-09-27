<?php
	$attributes['small_imgURL'] = $attributes['small_imgURL'] ?? get_theme_file_uri('/images/default.jpg');
    $attributes['big_imgURL'] = $attributes['big_imgURL'] ?? get_theme_file_uri('/images/default.jpg');

    if (!isset($attributes['work_style'])) $attributes['work_style'] = "first";

    $onScrollClass = "";
    switch ($attributes['work_style']) {
        case 'first':
            $onScrollClass = "reveal fade-right";
            break;
        case 'second':
            $onScrollClass = "reveal fade-left";
            break;
        case 'third':
            $onScrollClass = "reveal fade-right";
            break;
        case 'forth':
            $onScrollClass = "reveal fade-left";
            break;
        default:
            $onScrollClass = "reveal fade-right";
            break;
    }
?>
<div class="work-content reveal">
    <div class="work-content-text-<?php echo $attributes['work_style'] . ' ' . $onScrollClass; ?>">
    	<?php echo $content; ?>
    </div>
    <div class="work-content-image-big-<?php echo $attributes['work_style']; ?>">
        <img src="<?php echo $attributes['big_imgURL']; ?>" alt="">
    </div>
    <div class="work-content-image-small-<?php echo $attributes['work_style']; ?>">
        <img src="<?php echo $attributes['small_imgURL']; ?>" alt="">
    </div>
</div>
