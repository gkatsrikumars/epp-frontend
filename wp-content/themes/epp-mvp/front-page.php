<?php get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

  <?php include_once('template-parts/home/slider.php'); ?>

  <?php include_once('template-parts/home/about.php'); ?>

  <?php include_once('template-parts/home/how-it-works.php'); ?>

  <?php include_once('template-parts/home/articles.php'); ?>

  <div class="home__cta">
    <div class="home__callout second">Get started on planning your future-proof career</div>

    <p class="text-center"><a href="<?= epp_mvp_get_page_template_url('page-pathways.php'); ?>"
                              class="button--gradient2 button--large home__start-path-btn">Start new path</a></p>
  </div>

  <?php include_once('template-parts/home/partners.php'); ?>

  <?php //get_template_part('template-parts/content', 'occupation-results'); ?>

<?php endwhile; endif; ?>

<?php get_footer(); ?>