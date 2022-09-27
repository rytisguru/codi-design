<?php
if (!isset($attributes['id'])) $attributes['id'] = "";
?>

<section class="reveal" id="<?php echo $attributes['id']; ?>">
  <div class="reveal scroll-block group">
    <?php echo $content; ?>
  </div>
</section>