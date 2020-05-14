<?php
/* Template Name: FAQ */

get_header();
?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

  <section class="container container--faq">
    <div class="row">
      <div class="col">
        <h1 class="page-heading page-heading--faq"><?php the_title(); ?></h1>
      </div><!-- End .col -->
    </div><!-- End .row -->

    <div class="row faq">
      <div class="col-md-3 faq__nav d-none d-md-block">
        <ul>
          <li class="faq__nav-item faq__nav-item--general active">
            <a class="faq__nav-link faq__nav-link--general" href="#general">General</a>
          </li>
          <li class="faq__nav-item faq__nav-item--occupation">
            <a class="faq__nav-link faq__nav-link--occupation" href="#occupation">Occupations</a>
          </li>
          <!-- <li class="faq__nav-item faq__nav-item--pathway">
            <a class="faq__nav-link faq__nav-link--pathway" href="#pathway">Pathway</a>
          </li> -->
          <li class="faq__nav-item faq__nav-item--education">
            <a class="faq__nav-link faq__nav-link--education" href="#education">Training</a>
          </li>
          <li class="faq__nav-item faq__nav-item--jobs">
            <a class="faq__nav-link faq__nav-link--jobs" href="#jobs">Jobs</a>
          </li>
        </ul>
      </div>

      <div class="col-md-9">
        <?php include_once('template-parts/faq/general.php'); ?>
        <?php include_once('template-parts/faq/occupation.php'); ?>
        <?php include_once('template-parts/faq/education.php'); ?>
        <?php include_once('template-parts/faq/jobs.php'); ?>
        <?php include_once('template-parts/faq/footnotes.php'); ?>
      </div><!-- End .col-md-9 -->
    </div><!-- End .row.faq -->
  </section>

<?php endwhile; endif; ?>

<?php get_footer(); ?>