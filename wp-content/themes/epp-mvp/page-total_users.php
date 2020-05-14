<?php

/* Template Name: Total Saved Paths */
get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
  <section class="container container--default-page">
    <div class="row">
      <div class="col">
        <?php
        // Total # of users that saved pathways
        $posts = get_posts(array(
          'numberposts' => -1,
          'post_type' => 'epp_user',
          'meta_query' => array(
            'relation' => 'AND',
            array(
              'key' => 'epp_saved_pathways',
              'value' => '',
              'compare' => '!=',
            )
          ),
        ));

        echo '<h2>Total Number of users who saved pathways: <span class="text-info">' . count($posts) . '</span></h2>';
        echo '<ol>';
        foreach ($posts as $post) {
          echo '<li>' . get_field('epp_user_email', $post->ID) . '</li>';
        }
        echo '</ol>';
        ?>

      </div><!-- End .col -->

      <div class="col">
        <?php
        // Total # of users who bookmarked an occupation
        $posts2 = get_posts(array(
          'numberposts' => -1,
          'post_type' => 'epp_user',
          'meta_query' => array(
            'relation' => 'AND',
            array(
              'key' => 'epp_user_bookmarks',
              'value' => '',
              'compare' => '!=',
            )
          ),
        ));

        echo '<h2>Total Number of users who saved bookmarks: <span class="text-info">' . count($posts2) . '</span></h2>';
        echo '<ol>';
        foreach ($posts2 as $post2) {
          echo '<li>' . get_field('epp_user_email', $post2->ID) . '</li>';
        }
        echo '</ol>';
        ?>
      </div><!-- End .col -->
    </div><!-- End .row -->
  </section>

<?php endwhile; endif; ?>

<?php get_footer(); ?>