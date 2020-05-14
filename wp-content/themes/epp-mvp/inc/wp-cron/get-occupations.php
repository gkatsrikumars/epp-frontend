<?php

if (! wp_next_scheduled ( 'epp_mvp_get_occupations_periodically' )) {
  wp_schedule_event(time(), EPP_WP_CRON, 'epp_mvp_get_occupations_periodically');
}

add_action('epp_mvp_get_occupations_periodically', 'epp_mvp_get_occupations');

function epp_mvp_get_occupations() {
  $timezone = get_option('timezone_string');
  date_default_timezone_set($timezone);

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  // Set the header with the secret key
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'x-api-key: ' . EPP_API_KEY
  ));

  curl_setopt($ch, CURLOPT_URL, EPP_API_URL.'/occupation/');
  $result = curl_exec($ch);
  curl_close($ch);

  $fp = fopen('epp-occupations.json', 'w');
  fwrite($fp, $result);
  fclose($fp);

  // Log a success message to a file
  $today = date("F j, Y, g:i a");
  $txt = $today.' - epp_mvp_get_occupations() executed successfully.'."\r";
  file_put_contents('wp-cron-log.txt', $txt.PHP_EOL , FILE_APPEND | LOCK_EX);
}