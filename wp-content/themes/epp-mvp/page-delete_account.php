<?php
/* Template Name: Delete Account  */

if (!is_user_logged_in()):
  wp_redirect(home_url());
  exit();
else:
  $epp_user_id = epp_mvp_get_epp_user();
  get_header();
  ?>

  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

  <section class="container container--delete-account">
    <img src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/goo-6.svg" width="1116" alt=""
         class="goo-6">
    <img src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/goo-7.svg" width="1343" alt=""
         class="goo-7">
    <div class="row justify-content-center">
      <div class="col align-self-center">
        <strong class="large-body">Sorry to see you go, <?php the_field('epp_user_first_name', $epp_user_id); ?>
          !</strong>

        <div class="alert alert-danger d-none deletion-warning">
          <strong>Be Aware!</strong> <span>All your info will be permanently deleted. You won't be able to retrieve anything after it is gone. If you decide to login again then you'll have to sign up for a new account.</span>
        </div>

        <p class="text-center"><strong>Can you tell us why you're deleting your account?</strong></p>

        <form id="delete-account-form" class="form--delete-account" action="" method="post" novalidate>
          <p class="text-danger d-none reason-for-leaving-error-msg">Please choose at least one option.</p>
          <div class="form-group">
            <label class="radio-label" for="too-many-emails">
              <input id="too-many-emails" name="reason-for-leaving" type="radio" value="I'm getting too many emails">
              I'm getting too many emails
              <span></span>
            </label>
          </div>

          <div class="form-group">
            <label class="radio-label" for="privacy-issue">
              <input id="privacy-issue" name="reason-for-leaving" type="radio" value="I have a privacy issue"> I have a
              privacy issue
              <span></span>
            </label>
          </div>

          <div class="form-group">
            <label class="radio-label" for="duplicate-account">
              <input id="duplicate-account" name="reason-for-leaving" type="radio" value="I have a duplicate account"> I
              have a duplicate account
              <span></span>
            </label>
          </div>

          <div class="form-group">
            <label class="radio-label" for="receiving-spam">
              <input id="receiving-spam" name="reason-for-leaving" type="radio"
                     value="I'm receiving spam or other unwanted interactions"> I'm receiving spam
              <span></span>
            </label>
          </div>

          <div class="form-group">
            <label class="radio-label" for="not-getting-value">
              <input id="not-getting-value" name="reason-for-leaving" type="radio"
                     value="I'm not getting value out of my <?php bloginfo('name'); ?> account"> <span></span>
              I'm not getting value
            </label>
          </div>

          <div class="form-group related-group">
            <label class="radio-label" for="other-reason">
              <input id="other-reason" name="reason-for-leaving" type="radio" value="Other">
              <span></span>
            </label>
          </div>

          <div class="form-group">
            <label for="other-reason-input" class="field-label">enter other</label>
            <input type="text" id="other-reason-input" class="related-input other-reason-input" name="" value="">
          </div>
          <div class="clearfix"></div>

          <div class="form-group go-back-group">
            <a href="<?= $_SERVER['HTTP_REFERER']; ?>">Back</a>
            <input type="submit" name="delete-account__btn" class="button delete-account__btn" value="Continue">
          </div>

        </form>
      </div><!-- End .col -->
    </div><!-- End .justify-content-md-center -->
  </section>

  <div class="modal fade" id="delete-account-modal" tabindex="-1" role="dialog" aria-labelledby="delete-account-modal"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <span class="modal-title" id="">Is this goodbye?</span>
        </div>
        <div class="modal-body">
          <strong>We are sorry to see you go!</strong> Account deletion is final there is no way to restore&nbsp;your&nbsp;account.
          <br>All your information will be permanently deleted.
        </div>
        <div class="modal-footer">
          <button type="button" class="button button--confirm-delete" data-job-id="" data-job-title="">Delete Account
          </button>
          <a href="#" class="keep-account-btn" data-dismiss="modal">Keep My Account</a>
        </div>
      </div>
    </div>
  </div>

<?php endwhile; endif; ?>

  <?php get_footer(); ?>

<?php endif; ?>