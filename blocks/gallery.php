<?php
$attributes['logoURL'] = $attributes['logoURL'] ?? get_theme_file_uri('/images/default.jpg');
?>

<div class="gallery group">
  <div class="gallery-logo">
    <img src="<?php echo $attributes['logoURL']; ?>" alt="">
  </div>
   <?php
    $allWorks = new WP_Query(array(
      'post_type' => 'work',
      'posts_per_page' => -1
    ));  

    $i = 0;
    while($allWorks->have_posts()) {
      $allWorks->the_post(); 
      
      if ($i == 0) {
        $title_pos = "left";
        $tile_pos = "right";
        $i++; 
      } else {
        $title_pos = "right";
        $tile_pos = "left";
        $i--; 
      }

      $title = get_field('work_title');
      $desc = get_field('work_description');
      $imgSmall = get_field('small_image');
      $imgBig = get_field('big_image'); ?>
      
      <div class="gallery-section">
        <div class="middle">
            <img src="<?php echo $imgBig['url']; ?>">
         </div>
         <div class="<?php echo $title_pos; ?> title">
            <div class="content">
               <h2><?php echo $title; ?></h2>
               <p><?php echo $desc; ?></p>
            </div>
         </div>
         <div class="<?php echo $tile_pos; ?> tiles">
            <img src="<?php echo $imgSmall['url']; ?>">
         </div>
      </div>
    <?php } ?>
</div>