<?php get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

  <section class="container container--default-page">
    <img src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/goo-11.svg" width="314" alt="" class="goo-11">
    <img src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/goo-12.svg" width="384" alt="" class="goo-12">
    <img src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/goo-2.svg" width="524" alt="" class="goo-2">

    <div class="row">
      <div class="col">
        <?php
        $privacy_policy_page_id = get_option('wp_page_for_privacy_policy');
        if (get_the_ID() == $privacy_policy_page_id) {
          echo '<p class="privacy-policy__last-modified">last modified: ' . epp_mvp_last_modified_date(get_the_content()) . '</p>';
        }
        ?>
        <h1 class="page-heading"><?php the_title(); ?></h1>
        <?php the_content(); ?>
      </div><!-- End .col -->
    </div><!-- End .row -->
  </section>

  <?php //get_template_part('template-parts/content', 'occupation-results'); ?>
<?php endwhile; endif; ?>

<?php get_footer(); ?>