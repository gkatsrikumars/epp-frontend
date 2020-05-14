<?php
/* Template Name: Coming Soon Page */
get_header('comingsoon');

if (have_posts()) : while (have_posts()) : the_post(); ?>

  <div class="container">
    <div class="row">
      <div class="col">
        <p class="text-center"><img src="<?= get_template_directory_uri(); ?>/assets/img/coming-soon/logo_2x.png" width="150" alt="logo" class="logo"></p>

        <h1 class="page-heading">Coming Soon</h1>

        <div id="epp-carousel" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#epp-carousel" data-slide-to="0" class="active"></li>
            <li data-target="#epp-carousel" data-slide-to="1"></li>
            <li data-target="#epp-carousel" data-slide-to="2"></li>
            <li data-target="#epp-carousel" data-slide-to="3"></li>
            <li data-target="#epp-carousel" data-slide-to="4"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active" data-interval="6000">
              <img src="<?= get_template_directory_uri(); ?>/assets/img/coming-soon/1_2x.jpg" class="d-block w-100"
                   alt="...">
            </div>
            <div class="carousel-item" data-interval="6000">
              <img src="<?= get_template_directory_uri(); ?>/assets/img/coming-soon/2_2x.jpg" class="d-block w-100"
                   alt="...">
            </div>
            <div class="carousel-item" data-interval="6000">
              <img src="<?= get_template_directory_uri(); ?>/assets/img/coming-soon/3_2x.jpg" class="d-block w-100"
                   alt="...">
            </div>
            <div class="carousel-item" data-interval="6000">
              <img src="<?= get_template_directory_uri(); ?>/assets/img/coming-soon/4_2x.jpg" class="d-block w-100"
                   alt="...">
            </div>
            <div class="carousel-item" data-interval="6000">
              <img src="<?= get_template_directory_uri(); ?>/assets/img/coming-soon/5_2x.jpg" class="d-block w-100"
                   alt="...">
            </div>
          </div>
          <a class="carousel-control-prev" href="#epp-carousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#epp-carousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>

        <footer class="site-footer">
          <p><a href="https://www.marsdd.com/privacy/" target="_blank">Privacy</a></p>
          <p><a href="https://www.marsdd.com/terms-conditions/" target="_blank">Terms</a></p>
        </footer>
      </div>
    </div>
  </div>

  <?php //get_footer(); ?>

  </body>
  </html>

<?php endwhile; endif; ?>