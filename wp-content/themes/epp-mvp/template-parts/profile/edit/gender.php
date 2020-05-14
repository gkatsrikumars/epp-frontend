<?php $genders = array('Female', 'Male', 'Prefer not to say'); ?>

<div class="row profile__row profile__row--personal-info">

		<div class="col d-none d-md-block profile__labels profile__labels--personal-info">
			<p>Gender</p>
    </div><!-- End .profile__labels--personal-info -->

		<div class="col profile__content profile__content--personal-info">

      <h3 class="d-sm-block d-md-none">Gender</h3>

      <div class="form-group form-group__gender-f">
        <label class="radio-label" for="gender-f">
          <input id="gender-f" name="gender" type="radio" value="<?= $genders[0]; ?>" <?php if($current_epp_user->gender == $genders[0]){ echo 'checked'; } ?>> Female
          <span></span>
        </label>
      </div>

      <div class="form-group form-group__gender-m">
        <label class="radio-label" for="gender-m">
          <input id="gender-m" name="gender" type="radio" value="<?= $genders[1]; ?>" <?php if($current_epp_user->gender == $genders[1]){ echo 'checked'; } ?>> Male
          <span></span>
        </label>
      </div>

      <div class="form-group form-group__gender-na">
        <label class="radio-label" for="gender-na">
          <input id="gender-na" name="gender" type="radio" value="<?= $genders[2]; ?>" <?php if($current_epp_user->gender == $genders[2]){ echo 'checked'; } ?>> Prefer not to say
          <span></span>
        </label>
      </div>

      <div class="form-group related-group custom-gender-radio">
        <label class="radio-label" for="gender-custom">
          <input id="gender-custom" name="gender" type="radio" value="Custom" <?php if( !in_array($current_epp_user->gender, $genders) ){ echo 'checked'; } ?>>
          <span></span>
        </label>
      </div>

      <div class="form-group custom-gender-field">
        <label for="custom-gender-input" class="field-label <?php if( !in_array($current_epp_user->gender, $genders) ){ echo 'focused'; } ?>">Enter custom</label>
        <input type="text" id="custom-gender-input" class="related-input" name="custom-gender-input" value="<?php if( !in_array($current_epp_user->gender, $genders) ){ echo $current_epp_user->gender; } ?>">
      </div>

      <div class="clearfix"></div>

      <p class="d-none d-md-block profile__only-visible-to">
				<img src="<?= get_template_directory_uri(); ?>/assets/img/eye-icon_2x.png" width="20" alt="eye"> <small>this information is only visible to you</small>
      </p>
      
    </div><!-- End .profile__content--personal-info -->
    
  </div><!-- End .profile__row--personal-info -->