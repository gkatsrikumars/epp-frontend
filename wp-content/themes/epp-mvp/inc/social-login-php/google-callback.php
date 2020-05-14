<?php
// STEP 1: -----------------------------------------
$auth_code = $_GET['code'];// Get the authorization code that Google provides
$state = $_GET['state'];
$access_token_url = 'https://www.googleapis.com/oauth2/v4/token';
$redirect_uri = esc_url( home_url('/google-login/') );
$client_secret = "";
    
// Request the access token using the authorization code
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $access_token_url );
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
curl_setopt($ch, CURLOPT_POST, 1 );
curl_setopt($ch, CURLOPT_POSTFIELDS, "{'code': '$auth_code', 'client_id': '905376269956-qodol0b4aff9b40arcbil5ps4ou8b92c.apps.googleusercontent.com', 'client_secret': '$client_secret', 'redirect_uri': '$redirect_uri', 'grant_type': 'authorization_code', 'state': '$state'}" );
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  'Content-Type: application/json')
);

$result = curl_exec($ch);
curl_close($ch);
$json_obj = json_decode($result);
$access_token = $json_obj->access_token;// Extract the access token from the returned object

// STEP 2: -----------------------------------------
$ch2 = curl_init();
curl_setopt($ch2, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1); 
$curlheader[0] = "Authorization: Bearer " . $access_token;// Set the header with the retrieved access token
curl_setopt($ch2, CURLOPT_HTTPHEADER, $curlheader);
curl_setopt($ch2, CURLOPT_URL, 'https://www.googleapis.com/oauth2/v2/userinfo?fields=email%2Cfamily_name%2Cgender%2Cgiven_name%2Cid%2Cname%2Cpicture%2Cverified_email&alt=json&access_token='.$access_token);
$json_response = curl_exec($ch2);
curl_close($ch2);

$responseObj = json_decode($json_response);
$responseObj->oauth_provider = 'google';// set the OAuth provider
    
//  ** NEW RETURNED DATA 2019 **
$responseObj->firstName = $responseObj->given_name;// set the first name
$responseObj->lastName = $responseObj->family_name;// set the last name
$responseObj->pictureUrl = $responseObj->picture;// set the picture URL

epp_mvp_social_auth_php($responseObj);// create / authorize / log in user