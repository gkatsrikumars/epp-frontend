<div class="row profile__row profile__row--photo">

	<div class="col-md-6 profile__photo">

		<form id="photo-upload-form" class="form--photo-upload" action="<?= get_template_directory_uri(); ?>/inc/template-functions/photo-upload.php" method="post" enctype="multipart/form-data">
		
      <div>
      	<input type="file" class="form-control-file input--photo" id="photofile" name="photofile" required>
				<div class="profile__photo--thumb">
					<?php
					if( has_post_thumbnail( $epp_user_id ) ){
						echo get_the_post_thumbnail( $epp_user_id, 'profile-photo', array('class' => '') );
					}
					else{
						echo epp_mvp_get_custom_avatar(210, '');
					}
					?>
					<!-- <span class="camera-icon"></span> -->
				</div><!-- End .profile__photo--thumb -->
				<div class="loading loading--mobile">
					<div class="loading__square"></div>
				</div>
			</div>
			
			<a href="#" class="profile__photo--delete" title="Remove photo">Remove</a>

			<button type="submit" id="upload-submit" name="upload-submit" class="button d-none">Upload Photo</button>
			
		</form>
		
	</div><!-- End .col -->

	<div class="col d-none d-md-block">&nbsp;</div>

</div><!-- End .row -->