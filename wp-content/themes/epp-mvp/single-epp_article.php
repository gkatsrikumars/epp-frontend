<?php get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

  <section class="container container--default-page">
    <div class="row">
      <div class="col">
        <?php
        if (has_post_thumbnail()) {
          the_post_thumbnail('large');
        } else {
          echo '<img src="https://via.placeholder.com/1024x640" alt="placeholder image" class="report__img">';
        }
        ?>

        <h1 class="page-heading"><?php the_title(); ?></h1>
        <?php the_content(); ?>
      </div><!-- End .row -->
    </div><!-- End .col -->
  </section>

<?php endwhile; endif; ?>

<?php get_footer(); ?>