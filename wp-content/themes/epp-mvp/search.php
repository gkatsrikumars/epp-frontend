<?php get_header(); ?>

<?php if (have_posts()) : ?>

  <h1>Results for "<?php the_search_query(); ?>"</h1>

  <?php while (have_posts()) : the_post(); ?>

    <?php get_template_part('inc/content'); ?>

  <?php endwhile; ?>

<?php else : ?>

  <h2>No posts found. Try searching for something else.</h2>

  <?php get_search_form(); ?>

<?php endif; ?>

<?php get_footer(); ?>