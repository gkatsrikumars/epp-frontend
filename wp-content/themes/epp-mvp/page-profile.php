<?php
/* Template Name: Profile Page */
if (!is_user_logged_in()):
  wp_redirect(home_url());
  exit();
else:
  get_header();
  if (have_posts()) : while (have_posts()) : the_post(); ?>
    <div class="profile__band">
      <?php if (isset($_GET['action']) && $_GET['action'] == 'edit'): ?>
        <a href="#"
           class="button--outlined button--outlined-white button--rectangle profile__action-btn d-md-none">Save</a>
      <?php else: ?>
        <a href="?action=edit"
           class="button--outlined button--outlined-navy button--rectangle profile__action-btn d-md-none">Edit
          Profile</a>
      <?php endif; ?>
    </div>

    <?php
    if (isset($_GET['action']) && $_GET['action'] == 'edit') {
      // If the action parameter is edit then get the edit template part
      get_template_part('template-parts/profile/profile-edit');
    } else {
      // Else get the default view template
      get_template_part('template-parts/profile/profile-view');
    }

  endwhile; endif;

  get_footer();

endif;