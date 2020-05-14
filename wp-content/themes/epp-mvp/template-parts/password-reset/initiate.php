<?php

global $wpdb;
        
$error = '';
$success = '';
$html = '';

$pass_reset_url = epp_mvp_get_page_template_url( 'page-pass_reset.php' );

// If password reset form is submitted
if( isset($_POST['submit']) ) {
  $email = trim($_POST['recovery-email']);
    
  if( empty( $email ) ) {
    $error = 'Please enter an email address.';
  } else if( !is_email( $email ) ) {
    // $error = 'Invalid username or email address.';
    $error = 'Please enter a valid email.';
  } else if( !email_exists( $email ) ) {
    // $error = 'There is no user registered with that email address.';
    $success = 'If the email exists then you should receive instructions via the email you&nbsp;provided.';
  } else {

    if ( email_exists( $email ) ) {
        
      $user = get_user_by( 'email', $email );

      $activation_key = get_password_reset_key( $user );

      $to = $email;
      $subject = 'Your Password Reset Request';
      $sender = get_bloginfo('name');
      // $admin_email = get_option('admin_email');
      $admin_email = 'noreply@myplanext.com';
      
      /* $message = '<h1>Your Password Reset Request</h1>';
      $message .= '<p>Hey '.$user->first_name.',</p>';
      $message .= '<p>To reset your password, click on the button below.</p>';
      $message .= '<p><a style="display: inline-block; background: #536DFE; color: #fff; text-align: center; font-size: 12px; text-transform: uppercase; padding: 10px 20px; text-decoration: none; border-radius: 30px;" href="'.$pass_reset_url.'?key='.$activation_key.'&user='.$user->user_login.'">Reset password</a></p>';
      $message .= '<p style="font-size:9pt;">If clicking the button above does not automatically open the page, please copy and paste the link below into a browser:</p>';
      $message .= '<p style="font-size:8pt;">'.$pass_reset_url.'?key='.$activation_key.'&user='.$user->user_login.'</p>';
      $message .= '<p>If this was a msitake just ignore this email and your password will not be changed.</p>';
      $message .= '<hr style="height: 1px; border: none; border-top: 1px solid #D8D8D8;" />';
      $message .= '<p style="font-size:8pt;">'.$sender.'</p>'; */

      $message = '<table width="600" align="center" cellspacing="0" cellpadding="0" style="border: 1px solid #d8d8d8; border-bottom: none; padding: 10px 30px;">';
      $message .= '<tr>';
      $message .= '<td height="80">';
      $message .= '<img border="0" width="120" style="display:block; border:0;" src="cid:planext-logo" alt="planext">';
      $message .= '</td>';
      $message .= '</tr>';
      $message .= '<tr>';
      $message .= '<td>';
      $message .= '<h1 style="font-family: sans-serif; font-size: 18pt; color: #536DFE; font-weight: normal; text-align: center;">Your Password Reset Request</h1>';
      $message .= '<p style="font-family: sans-serif; font-size: 14px; line-height: 1.5; color: #777d97; text-align: center;">Hey '.$user->first_name.',</p>';
      $message .= '<p style="font-family: sans-serif; font-size: 14px; line-height: 1.5; color: #777d97; text-align: center;">To reset your password, click on the button below.</p>';
      $message .= '</td>';
      $message .= '</tr>';
      $message .= '<tr>';
      $message .= '<td align="center">';
      // $message .= '<p style="font-family: sans-serif;"><a href="'.$pass_reset_url.'?key='.$activation_key.'&user='.$user->user_login.'" style="display: inline-block; background: #536DFE; color: #fff; text-align: center; font-size: 12px; text-transform: uppercase; padding: 10px 20px; text-decoration: none; border-radius: 30px;">Reset Password</a></p>';
      $message .= '<p style="font-family: sans-serif;"><a href="'.$pass_reset_url.'?key='.$activation_key.'&user='.$user->user_login.'"><img border="0" width="176" style="display:block; border:0;" src="cid:reset-btn" alt="Reset Password"></a></p>';
      $message .= '</td>';
      $message .= '</tr>';
      $message .= '<tr>';
      $message .= '<td>';
      $message .= '<p style="font-family: sans-serif; font-size:11pt; line-height: 1.5; color: #777d97; text-align: center;">If clicking the button above does not automatically open the page, please copy and paste the link below into a browser:</p>';
      $message .= '<p style="font-family: sans-serif; font-size:10pt; line-height: 1.5; color: #777d97; text-align: center;">'.$pass_reset_url.'?key='.$activation_key.'&user='.$user->user_login.'</p>';
      $message .= '<p style="font-family: sans-serif; font-size: 14px; line-height: 1.5; color: #777d97;">If this was a mistake just ignore this email and your password will not be changed.</p>';
      $message .= '</td>';
      $message .= '</tr>';
      $message .= '</table>';
      $message .= '<table width="600" align="center" bgcolor="#F9F9F9" cellspacing="0" cellpadding="0" style="border: 1px solid #d8d8d8; border-top: none; padding: 10px 30px;">';
      $message .= '<tr>';
      $message .= '<td height="100">';
      $message .= '<p style="font-family: sans-serif; font-size:10pt; text-align: center; color: #89949B; line-height: 1.4;">'.$sender.' and the '.$sender.' logo are trademarks of MaRS Discovery District. <br>Copyright &copy; '.date('Y').' '.$sender.'. All rights reserved.</p>';
      $message .= '</td>';
      $message .= '</tr>';
      $message .= '</table>';

      $headers[] = 'MIME-Version: 1.0' . "\r\n";
      $headers[] = 'Content-type: text/html; charset=UTF-8' . "\r\n";
      $headers[] = "X-Mailer: PHP \r\n";
      $headers[] = 'From: '.$sender.' <'.$admin_email.'>' . "\r\n";

      $file = epp_mvp_custom_logo_url(); // phpmailer will load this file
      $file_array = parse_url($file);
      if ($_SERVER['HTTP_HOST']=="localhost") {
        $file_path = str_replace('/epp-mvp/', '', $file_array['path']);
        $file_abs_path = ABSPATH . '/' . $file_path;
      }
      else {
        $file_abs_path = ABSPATH . '/' . $file_array['path'];
      }

      $uid = 'planext-logo'; // will map it to this UID
      $name = 'planext-logo.png'; // this will be the file name for the attachment

      $btn_abs_path = ABSPATH . '/wp-content/themes/epp-mvp/assets/img/reset-password-btn_2x.png';
      $btn_uid = 'reset-btn'; // will map it to this UID
      $btn_name = 'reset-btn.png'; // this will be the file name for the attachment

      global $phpmailer;
      add_action( 'phpmailer_init', function(&$phpmailer)use($file_abs_path,$uid,$name,$btn_abs_path,$btn_uid,$btn_name){
          $phpmailer->SMTPKeepAlive = true;
          $phpmailer->AddEmbeddedImage($file_abs_path, $uid, $name);
          $phpmailer->AddEmbeddedImage($btn_abs_path, $btn_uid, $btn_name);
      });

      $mail = wp_mail( $to, $subject, $message, $headers );
      
      if( $mail ) {
        $success = 'If the email exists then you should receive instructions via the email you&nbsp;provided.';
      }

    }// if email exists

    else {// email does NOT exist
      $success = 'If the email exists then you should receive instructions via the email you&nbsp;provided.';
    }
        
  }
    
  if( !empty( $error ) )
    $html = '<div class="alert alert-danger"><span> '. $error .'</span></div>';
    
  if( !empty( $success ) )
    $html = '<div class="alert alert-success"><span> '. $success .'</span></div>';
}

?>

<form id="form--initiate-password-reset" class="form--initiate-password-reset" method="post" novalidate>

  <strong class="large-body">Enter your email address below and <br>we'll get you back on track.</strong>

  <?php if( $html == '' ): ?>

  <div class="form-label-group">
    <label for="recovery-email" class="field-label <?= isset($_GET['reset_email']) ? 'focused' : ''; ?>">enter email to reset password</label>
    <input type="email" name="recovery-email" id="recovery-email" class="form-control" value="<?= isset($_GET['reset_email']) ? $_GET['reset_email'] : ''; ?>" data-validation="email" required>
    <div class="invalid-feedback">
      Please enter your email to continue
    </div>
  </div>
  <div class="form-label-group">
    <input type="hidden" name="action" value="reset">
    <input type="submit" name="submit" value="Request Reset Link" class="button password-reset__btn" id="submit">
  </div>

  <?php else: echo $html; ?>

  <?php endif; ?>
  
</form>