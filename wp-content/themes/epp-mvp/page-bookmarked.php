<?php
/* Template Name: Bookmarks */

if (!is_user_logged_in()):
  wp_redirect(home_url());
  exit();
else:
  get_header();
  $epp_user_id = epp_mvp_get_epp_user();
  $current_epp_user = new EPP_User($epp_user_id);
  $bookmarks = $current_epp_user->get_bookmarks();
  ?>

  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

  <section class="container container--bookmarks">
    <div class="row">
      <div class="col">
        <h1 class="page-heading"><?php the_title(); ?></h1>
      </div><!-- End .col -->
    </div><!-- End .row -->

    <?php if (count($bookmarks) > 0): foreach ($bookmarks as $bookmark) : ?>

      <div class="row bookmarked-occupation">
        <div class="col-md-6 bookmarked-occupation__info">
          <a class="bookmarked-occupation__delete-btn" href="#" data-job-id="<?= $bookmark['soc_code']; ?>"
             data-job-title="<?= $bookmark['title']; ?>">x</a>
          <div class="bookmarked-occupation__risk--mobile d-md-none">
            <em
              class="<?= $bookmark['automation']['automation_colour']; ?>"><?= $bookmark['automation']['automation_percent']; ?>
              %</em>
            <span>Risk of automation</span>
          </div>
          <h2 class="bookmarked-occupation__title"><?= $bookmark['title']; ?></h2>
          <p><?= $bookmark['description']; ?></p>
        </div><!-- End .bookmarked-occupation__info -->

        <div class="col-md-6 bookmarked-occupation__risk">
          <p class="bookmarked-occupation__start-path d-none d-md-block">
            <a href="<?= home_url() . '/pathways/?soc_code=' . $bookmark['soc_code']; ?>"
               class="button bookmarked-occupation__start-path-btn">Start Path Here</a>
          </p>
          <p class="bookmarked-occupation__automation d-none d-md-block">
            <em
              class="bookmarked-occupation__risk-percent <?= $bookmark['automation']['automation_colour']; ?>"><?= $bookmark['automation']['automation_percent']; ?>
              %</em>
            <span>Risk of automation</span>
          </p>
        </div><!-- End .bookmarked-occupation__risk -->

        <div class="col bookmarked-occupation__read-more">
          <p class="d-none d-md-block">
            <a class="bookmarked-occupation__read-more-link"
               href="<?= home_url() . '/occupation/?soc_code=' . $bookmark['soc_code']; ?>">Read more</a>
          </p>
          <p class="d-md-none">
            <a class="bookmarked-occupation__read-more-link"
               href="<?= home_url() . '/occupation/?soc_code=' . $bookmark['soc_code']; ?>">Read more</a>
            <a href="<?= home_url() . '/pathways/?soc_code=' . $bookmark['soc_code']; ?>"
               class="button bookmarked-occupation__start-path-btn">Start Path Here</a>
          </p>
        </div><!-- End .bookmarked-occupation__read-more -->

      </div><!-- End .row -->

    <?php endforeach; ?>

    <?php else: // ELSE count($bookmarks) == 0 ?>

      <div class="row">
        <div class="col mb-5">
          <p class="text-center nothing-saved">You don't have any bookmarked occupations.</p>
        </div>
      </div>

    <?php endif; // IF count($bookmarks) > 0 ?>

  </section>

  <div class="modal fade" id="delete-bookmark-modal" tabindex="-1" role="dialog" aria-labelledby="delete-bookmark-modal"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="">Delete Bookmark</h5>
          <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button> -->
        </div>
        <div class="modal-body">
          Are you sure you want to delete this bookmark?
        </div>
        <div class="modal-footer">
          <button type="button" class="button button--delete-bookmark" data-job-id="" data-job-title="">Delete</button>
          <a href="#" class="button--cancel" data-dismiss="modal">Cancel</a>
        </div>
      </div>
    </div>
  </div>

<?php endwhile; endif; ?>

  <?php get_footer(); ?>

<?php endif; ?>