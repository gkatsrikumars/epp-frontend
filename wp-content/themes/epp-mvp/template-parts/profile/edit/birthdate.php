<div class="row profile__row profile__row--birthdate">

		<div class="col d-none d-md-block profile__labels profile__labels--birthdate">
			<p>Birthdate</p>
    </div>
    
		<div class="col profile__content profile__content--birthdate">

      <h3 class="d-sm-block d-md-none">Age:</h3>

      <div class="row justify-content-center justify-content-md-start">

        <div class="col col__birth-month">
          <div class="form-group form-group__birth-month">
            <select name="birth-month" id="birth-month" class="<?php if($current_epp_user->birth_month != '') { echo 'selected'; } ?>">
              <option value="">month</option>
              <option value="01"<?php if( $current_epp_user->birth_month == '01' ){ echo ' selected'; } ?>>January</option>
              <option value="02"<?php if( $current_epp_user->birth_month == '02' ){ echo ' selected'; } ?>>February</option>
              <option value="03"<?php if( $current_epp_user->birth_month == '03' ){ echo ' selected'; } ?>>March</option>
              <option value="04"<?php if( $current_epp_user->birth_month == '04' ){ echo ' selected'; } ?>>April</option>
              <option value="05"<?php if( $current_epp_user->birth_month == '05' ){ echo ' selected'; } ?>>May</option>
              <option value="06"<?php if( $current_epp_user->birth_month == '06' ){ echo ' selected'; } ?>>June</option>
              <option value="07"<?php if( $current_epp_user->birth_month == '07' ){ echo ' selected'; } ?>>July</option>
              <option value="08"<?php if( $current_epp_user->birth_month == '08' ){ echo ' selected'; } ?>>August</option>
              <option value="09"<?php if( $current_epp_user->birth_month == '09' ){ echo ' selected'; } ?>>September</option>
              <option value="10"<?php if( $current_epp_user->birth_month == '10' ){ echo ' selected'; } ?>>October</option>
              <option value="11"<?php if( $current_epp_user->birth_month == '11' ){ echo ' selected'; } ?>>November</option>
              <option value="12"<?php if( $current_epp_user->birth_month == '12' ){ echo ' selected'; } ?>>December</option>
            </select>
          </div>
        </div><!-- End .col -->

        <div class="col col__birth-day">
          <div class="form-group form-group__birth-day">
            <label for="birth-day" class="field-label <?php if($current_epp_user->birth_day != '') { echo 'focused'; } ?>">Date</label>
            <input type="number" class="form-control" id="birth-day" name="birth-day" min="1" max="31" value="<?= $current_epp_user->birth_day; ?>">
          </div>
        </div><!-- End .col -->

        <div class="col col__birth-year">
          <div class="form-group form-group__birth-year">
            <label for="birth-year" class="field-label <?php if($current_epp_user->birth_year != '') { echo 'focused'; } ?>">Year</label>
            <input type="number" class="form-control" id="birth-year" name="birth-year" min="1919" max="<?= date('Y'); ?>" value="<?= $current_epp_user->birth_year; ?>">
          </div>
        </div><!-- End .col -->

        <div class="col-12">
          <img class="d-md-none" src="<?= get_template_directory_uri(); ?>/assets/img/eye-icon_2x.png" width="20" alt="eye"> <small class="d-md-none">this information is only visible to you</small>
        </div>

      </div><!-- End .row -->

    </div><!-- End .profile__content--birthdate -->
    
	</div><!-- End .row -->