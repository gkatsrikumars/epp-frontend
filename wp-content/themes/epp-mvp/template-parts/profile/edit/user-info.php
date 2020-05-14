<div class="row profile__row profile__row--user-info">

  <div class="col d-none d-md-block">&nbsp;</div>

  <div class="col profile__content profile__content--user-info">

    <div class="form-feedback d-none"></div>
    
    <div class="form-group form-group__user-fullname">
      <label for="user-fullname" class="field-label <?php if( $current_epp_user->full_name != '' ){ echo 'focused'; } ?>">Enter Full Name</label>
      <input type="text" class="form-control" id="user-fullname" name="user-fullname" value="<?= $current_epp_user->full_name; ?>" data-validation="required" required>
    </div>

    <p class="profile__email"><?= $current_epp_user->email; ?></p>
      
    <input type="submit" value="Save" class="button--outlined button--rectangle profile__action-btn profile__save-btn d-none d-md-inline-block">

  </div><!-- End .profile__content--user-info -->
    
</div><!-- End .profile__row--user-info -->