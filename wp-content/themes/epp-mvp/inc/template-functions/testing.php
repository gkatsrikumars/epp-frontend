<?php
function test_attributes()
{
  $ch3 = curl_init();
  curl_setopt($ch3, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
  // Set the header with the secret key
  curl_setopt($ch3, CURLOPT_HTTPHEADER, array(
    'x-api-key: ' . EPP_API_KEY
  ));

  curl_setopt($ch3, CURLOPT_URL, EPP_API_URL . '/occupation/');
  $result3 = curl_exec($ch3);
  curl_close($ch3);

  print_r($result3);
  exit;
}

function test_attributes_prod()
{
  $ch3 = curl_init();
  curl_setopt($ch3, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
  // Set the header with the secret key
  curl_setopt($ch3, CURLOPT_HTTPHEADER, array(
    'x-api-key: INSERT KEY HERE'
  ));

  curl_setopt($ch3, CURLOPT_URL, 'Enter API Path for occupations');
  $result3 = curl_exec($ch3);
  curl_close($ch3);
  print_r($result3);
  exit;
}

function test_get_jobs($title)
{
  $search = str_replace(' ', '+', $title);
  $ch2 = curl_init();
  curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

  curl_setopt($ch2, CURLOPT_URL, 'Enter ZipRecruiter Link');
  $result2 = curl_exec($ch2);
  curl_close($ch2);

  $result_object2 = json_decode($result2);

  return $result_object2;
}

function test_pathways()
{
  $ch3 = curl_init();
  curl_setopt($ch3, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
  // Set the header with the secret key
  curl_setopt($ch3, CURLOPT_HTTPHEADER, array(
    'x-api-key: ' . EPP_API_KEY
  ));

  curl_setopt($ch3, CURLOPT_URL, 'Enter AWS API Link');
  $result3 = curl_exec($ch3);
  curl_close($ch3);

  print_r($result3);
  exit;
}