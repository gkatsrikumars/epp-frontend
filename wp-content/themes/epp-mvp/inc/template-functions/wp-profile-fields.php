<?php
/*--------------------------------------------------------------
* Add custom user profile fields to profile page
--------------------------------------------------------------*/
// @param WP_User $user
function epp_mvp_custom_user_profile_fields($user)
{
  $user_info = get_userdata($user->ID);
  $havemeta = get_user_meta($user->ID, 'epp_acf_user_id', true);
  if ($havemeta):
    ?>
    <table class="form-table">
      <tr>
        <th>
          <?php _e('Associated EPP User'); ?>
        </th>
        <td>
          <a href="<?= home_url(); ?>/wp-admin/post.php?post=<?= $user_info->epp_acf_user_id; ?>&action=edit">Edit</a>
        </td>
      </tr>
    </table>
    <?php
  endif;
}

// Hooks near the bottom of profile page (if current user)
add_action('show_user_profile', 'epp_mvp_custom_user_profile_fields');

// Hooks near the bottom of the profile page (if NOT current user) 
add_action('edit_user_profile', 'epp_mvp_custom_user_profile_fields');