<?php
// STEP 1: -----------------------------------------
$auth_code = $_GET['code'];// Get the authorization code that Facebook provides
$redirect_uri = esc_url(home_url('/facebook-login/'));
$clientID = "";
$clientSecret = "";
$access_token_url = 'https://graph.facebook.com/v3.2/oauth/access_token?client_id=' . $clientID . '&redirect_uri=' . $redirect_uri . '&client_secret=' . $clientSecret . '&code=' . $auth_code;

// Request the access token using the authorization code
$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $access_token_url);
$result = curl_exec($ch);
curl_close($ch);
$json_obj = json_decode($result);
$access_token = $json_obj->access_token;// Extract the access token from the returned object

// STEP 2: -----------------------------------------
$ch2 = curl_init();
curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
// Set the header with the retrieved access token
curl_setopt($ch2, CURLOPT_HTTPHEADER, array(
  'Authorization: Bearer ' . $access_token
));

curl_setopt($ch2, CURLOPT_URL, 'https://graph.facebook.com/v3.2/me?fields=id,name,email,picture.type(large)&access_token=' . $access_token);
$result2 = curl_exec($ch2);
curl_close($ch2);
$json_obj2 = json_decode($result2);
$user_fullname = explode(' ', $json_obj2->name, 2);

$json_obj2->oauth_provider = 'facebook';// set the OAuth provider
$json_obj2->pictureUrl = $json_obj2->picture->data->url;// set the picture URL
$json_obj2->firstName = $user_fullname[0];// set the first name
$json_obj2->lastName = $user_fullname[1];// set the last name

epp_mvp_social_auth_php($json_obj2);// create / authorize / log in user