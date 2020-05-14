<?php
// STEP 1: -----------------------------------------
$auth_code = $_GET['code'];// Get the authorization code that LinkedIn provides
$state = $_GET['state'];
$client_id ="";
$redirect_uri = esc_url( home_url('/linkedin-login/') );
$access_token_url = 'https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code='.$auth_code.'&state='.$state.'&redirect_uri='.$redirect_uri.'&client_id=' . $client_id;

$curl = curl_init();
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_URL, $access_token_url);
$result = curl_exec($curl);
curl_close($curl);
$json_obj = json_decode($result);
$access_token = $json_obj->access_token;// Extract the access token from the returned object

// STEP 2: -----------------------------------------
$profile_api_url = 'https://api.linkedin.com/v2/me';
$email_api_url = 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))';
$picture_api_url = 'https://api.linkedin.com/v2/me?projection=(profilePicture(displayImage~:playableStreams))';

// PROFILE: ---------
$curl2 = curl_init();
curl_setopt($curl2, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl2, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl2, CURLOPT_HTTPHEADER, array(
  'Authorization: Bearer '.$access_token
));

curl_setopt($curl2, CURLOPT_URL, $profile_api_url);
$result2 = curl_exec($curl2);
curl_close($curl2);

// EMAIL: ---------
$curl3 = curl_init();
curl_setopt($curl3, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl3, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl3, CURLOPT_HTTPHEADER, array(
  'Authorization: Bearer '.$access_token
));

curl_setopt($curl3, CURLOPT_URL, $email_api_url);
$result3 = curl_exec($curl3);
curl_close($curl3);

// PROFILE PICTURE: ---------
$curl4 = curl_init();
curl_setopt($curl4, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl4, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl4, CURLOPT_HTTPHEADER, array(
  'Authorization: Bearer '.$access_token
));

curl_setopt($curl4, CURLOPT_URL, $picture_api_url);
$result4 = curl_exec($curl4);
curl_close($curl4);

// Merge the arrays
$result5 = json_encode( array_merge( json_decode($result2, true),json_decode($result3, true),json_decode($result4, true) ) );
$json_obj2 = json_decode($result5);
$json_obj2->oauth_provider = 'linkedin';// set the OAuth provider
$json_obj2->email = $json_obj2->elements[0]->{'handle~'}->emailAddress;// set the email address
$json_obj2->firstName = $json_obj2->localizedFirstName;// set the first name
$json_obj2->lastName = $json_obj2->localizedLastName;// set the last name
$json_obj2->pictureUrl = $json_obj2->profilePicture->{'displayImage~'}->elements[2]->identifiers[0]->identifier;// set the picture URL

unset($json_obj2->localizedLastName);
unset($json_obj2->localizedFirstName);
unset($json_obj2->profilePicture);
unset($json_obj2->elements);

epp_mvp_social_auth_php($json_obj2);// create / authorize / log in user