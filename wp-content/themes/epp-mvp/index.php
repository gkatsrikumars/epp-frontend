<?php get_header(); ?>

<?php if (have_posts()) : ?>

  <h1><?php the_title(); ?></h1>

  <?php while (have_posts()) : the_post(); ?>

    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
      <h2><a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a></h2>
      <span class="post-date">Posted on <?= get_the_date('F j, Y'); ?></span>
      <?php the_excerpt(); ?>
    </article>

  <?php endwhile; ?>

<?php else : ?>

  <h2>No posts.</h2>

<?php endif; ?>

<?php get_sidebar(); ?>

<?php get_footer(); ?>