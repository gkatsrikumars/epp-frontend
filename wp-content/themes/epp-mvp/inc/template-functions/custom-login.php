<?php
/*--------------------------------------------------------------
* Hide admin bar after login
--------------------------------------------------------------*/
if( !current_user_can('manage_options') ) {
  add_filter('show_admin_bar', '__return_false');
}