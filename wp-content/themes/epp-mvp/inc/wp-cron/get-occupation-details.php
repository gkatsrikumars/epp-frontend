<?php

if (!wp_next_scheduled('epp_mvp_get_occupation_details_periodically')) {
  wp_schedule_event(time(), EPP_WP_CRON, 'epp_mvp_get_occupation_details_periodically');
}

add_action('epp_mvp_get_occupation_details_periodically', 'epp_mvp_get_occupation_details');

function epp_mvp_get_occupation_details()
{
  $timezone = get_option('timezone_string');
  date_default_timezone_set($timezone);

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  curl_setopt($ch, CURLOPT_URL, home_url() . '/epp-occupations.json');
  $result = curl_exec($ch);
  curl_close($ch);

  $occupations_object = json_decode($result);

  $occupation_details = array();

  foreach ($occupations_object->rows as $occupation) {

    $ch2 = curl_init();
    curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
    // Set the header with the secret key
    curl_setopt($ch2, CURLOPT_HTTPHEADER, array(
      'x-api-key: ' . EPP_API_KEY
    ));

    curl_setopt($ch2, CURLOPT_URL, EPP_API_URL . '/occupation/' . $occupation->soc_code);
    $result2 = curl_exec($ch2);
    curl_close($ch2);

    $occupation_array = json_decode($result2);
    $occupation_rows = $occupation_array->rows;

    // ===== GET EDUCATION AND SKILLS: =====

    $ch3 = curl_init();
    curl_setopt($ch3, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
    // Set the header with the secret key
    curl_setopt($ch3, CURLOPT_HTTPHEADER, array(
      'x-api-key: ' . EPP_API_KEY
    ));

    curl_setopt($ch3, CURLOPT_URL, EPP_API_URL . '/occupation/attribute/' . $occupation->soc_code);
    $result3 = curl_exec($ch3);
    curl_close($ch3);

    $result_obj = json_decode($result3);

    $top_skills = epp_mvp_get_top_skills($result_obj->skill->data->rows);
    $top_education = epp_mvp_get_top_education($result_obj->education->data->rows);

    // =======================================


    $occupation_details[$occupation_rows[0]->soc_code] = array(
      'soc_code' => $occupation_rows[0]->soc_code,
      'title' => $occupation_rows[0]->title,
      'auto_risk' => $occupation_rows[0]->auto_risk,
      'salary_min' => $occupation_rows[0]->salary_min,
      'salary_max' => $occupation_rows[0]->salary_max,
      'description' => $occupation_rows[0]->description,
      'education' => $top_education,
      'top_skills' => $top_skills,
      'training' => $result_obj->training->data->rows
    );

  }

  $fp = fopen('epp-occupation-details.json', 'w');
  fwrite($fp, json_encode($occupation_details));
  fclose($fp);

  // Log a success message to a file
  $today = date("F j, Y, g:i a");
  $txt = $today . ' - epp_mvp_get_occupation_details() executed successfully.' . "\r";
  file_put_contents('wp-cron-log.txt', $txt . PHP_EOL, FILE_APPEND | LOCK_EX);
}