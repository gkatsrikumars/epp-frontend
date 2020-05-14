<?php
/*--------------------------------------------------------------
* Get the current EPP user's ID
--------------------------------------------------------------*/
function epp_mvp_get_epp_user()
{
  if (is_user_logged_in()) {
    $user_id = get_current_user_id();// Get the current logged in user ID
    $user_info = get_userdata($user_id);// Get the user data for current logged in user
    $epp_user_id = get_user_meta($user_id, 'epp_acf_user_id', true);// Get the associated EPP User ID
    if ($epp_user_id == '') {
      // $epp_user_id = $user_id;
      $epp_user_id = 0;
    }
  } else {
    $epp_user_id = 0;
  }
  return $epp_user_id;

}

/*--------------------------------------------------------------
* Get the current EPP user's gender
--------------------------------------------------------------*/
function epp_mvp_get_user_gender($epp_user_id)
{
  $gender = 'Prefer not to say';

  if (get_field('epp_user_gender', $epp_user_id) != '') {
    $gender = get_field('epp_user_gender', $epp_user_id);
    if ($gender == 'Custom') {
      $gender = get_field('epp_user_custom_gender', $epp_user_id);
    }
  }
  return $gender;
}

/*--------------------------------------------------------------
* Get the current EPP user's notifications status
--------------------------------------------------------------*/
function epp_mvp_get_notifications_msg($epp_user_id)
{
  $notifications = get_field('epp_user_notifications', $epp_user_id);
  if ($notifications == 'n' || $notifications == '') {
    $notifications_msg = 'you are <strong>not</strong> receiving notifications';
  } else {
    $notifications_msg = 'you are receiving notifications at <strong>' . get_field('epp_user_email', $epp_user_id) . '</strong>';
  }
  return $notifications_msg;
}

/*--------------------------------------------------------------
* Get the current EPP user's age
--------------------------------------------------------------*/
function epp_mvp_get_user_age($epp_user_id)
{
  $birth_month = '01';
  $birth_day = '01';
  $dob = get_field('epp_user_dob_separated', $epp_user_id);
  if ($dob['epp_user_birth_month'] != '') {
    $birth_month = $dob['epp_user_birth_month'];
  }
  if ($dob['epp_user_birth_day'] != '') {
    $birth_day = $dob['epp_user_birth_day'];
  }
  $birth_year = $dob['epp_user_birth_year'];

  if ($birth_year != '') {
    //date in mm/dd/yyyy format; or it can be in other formats as well
    $birth_date = "$birth_month/$birth_day/$birth_year";
    //explode the date to get month, day and year
    $birth_date = explode("/", $birth_date);
    //get age from date or birthdate
    $age = (date("md", date("U", mktime(0, 0, 0, $birth_date[0], $birth_date[1], $birth_date[2]))) > date("md")
      ? ((date("Y") - $birth_date[2]) - 1)
      : (date("Y") - $birth_date[2]));
  } else {
    $age = 'You like to keep an air of mystery.';
  }
  return $age;
}

/*--------------------------------------------------------------
* Get the current EPP user's bookmarks
--------------------------------------------------------------*/
function epp_mvp_get_bookmarks($epp_user_id)
{
  $soc_codes = array();
  $bookmarks = array();
  if (have_rows('epp_user_bookmarks', $epp_user_id)):
    while (have_rows('epp_user_bookmarks', $epp_user_id)) : the_row();
      $soc_codes[] = get_sub_field('epp_user_bookmarked_occupation_id', $epp_user_id);
    endwhile;
  endif;

  foreach ($soc_codes as $soc_code) {
    $home_url = home_url();
    $occupations_json = file_get_contents($home_url . '/epp-occupation-details.json');
    $occupations = json_decode($occupations_json);
    $occupation = $occupations->$soc_code;
    $automation = epp_mvp_automation_percent($occupation->auto_risk);
    $bookmarks[] = array(
      'title' => $occupation->title,
      'description' => epp_mvp_truncate_content($occupation->description, 15),
      'automation' => $automation,
      'soc_code' => $soc_code
    );
  }
  return $bookmarks;
}

/*--------------------------------------------------------------
* Get the current EPP user's saved pathways
--------------------------------------------------------------*/
function epp_mvp_get_saved_pathways($epp_user_id)
{
  $saved_pathways = array();
  if (have_rows('epp_saved_pathways', $epp_user_id)):
    while (have_rows('epp_saved_pathways', $epp_user_id)) : the_row();
      $pathway = array();
      $pathway['name'] = get_sub_field('epp_saved_pathway_name', $epp_user_id);

      if (have_rows('epp_pathways', $epp_user_id)):
        while (have_rows('epp_pathways', $epp_user_id)): the_row();
          $automation = get_sub_field('epp_pathway_occupation_automation', $epp_user_id);
          $title = get_sub_field('epp_pathway_occupation_title', $epp_user_id);
          $soc_code = get_sub_field('epp_pathway_occupation_id', $epp_user_id);
          $automation_array = epp_mvp_automation_percent($automation / 100);// Divide by 100 because the function expects a decimal
          $pathway['occupations'][] = array(
            'soc_code' => $soc_code,
            'title' => $title,
            'title_truncated' => epp_mvp_truncate_title($title, 35),
            'automation' => $automation_array['automation_percent'],
            'automation_colour' => $automation_array['automation_colour'],
          );
        endwhile;
      endif;
      $saved_pathways[] = $pathway;
    endwhile;
  endif;
  return $saved_pathways;
}

/*--------------------------------------------------------------
* PHP Classes
--------------------------------------------------------------*/

class EPP_User
{
  var $ID;
  var $full_name;
  var $first_name;
  var $last_name;
  var $email;
  var $birth_month;
  var $birth_day;
  var $birth_year;
  var $age;
  var $gender;
  var $notifications_value;
  var $notifications_msg;

  function __construct($epp_user_id)
  {
    $this->ID = $epp_user_id;

    // NAME:
    $this->full_name = esc_html(get_field('epp_user_first_name', $epp_user_id) . ' ' . get_field('epp_user_last_name', $epp_user_id));
    $this->first_name = esc_html(get_field('epp_user_first_name', $epp_user_id));
    $this->last_name = esc_html(get_field('epp_user_last_name', $epp_user_id));
    $this->email = get_field('epp_user_email', $epp_user_id);

    // NOTIFICATIONS:
    $this->notifications_value = get_field('epp_user_notifications', $epp_user_id);
    $this->notifications_msg = epp_mvp_get_notifications_msg($epp_user_id);

    // AGE:
    $dob = get_field('epp_user_dob_separated', $epp_user_id);
    /* $this->date_of_birth['month'] = $dob['epp_user_birth_month'];
    $this->date_of_birth['day'] = $dob['epp_user_birth_day'];
    $this->date_of_birth['year'] = $dob['epp_user_birth_year']; */
    $this->birth_month = $dob['epp_user_birth_month'];
    $this->birth_day = $dob['epp_user_birth_day'];
    $this->birth_year = $dob['epp_user_birth_year'];
    $this->age = epp_mvp_get_user_age($epp_user_id);

    // GENDER:
    $this->gender = epp_mvp_get_user_gender($epp_user_id);
  }

  function get_bookmarks()
  {
    $bookmarks = epp_mvp_get_bookmarks($this->ID);
    return $bookmarks;
  }

  function get_saved_pathways()
  {
    $saved_pathways = epp_mvp_get_saved_pathways($this->ID);
    return $saved_pathways;
  }
}