<div class="modal fade modal--name-your-pathway" id="name-your-pathway" tabindex="-1" role="dialog" aria-labelledby="name-your-pathway" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title" id="">name this path</span>
        <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> -->
      </div>
      <div class="form-group">
      <div class="modal-body">
      <form id="name-your-pathway-form" class="name-your-pathway-form" method="post" action="" novalidate>
          <!-- <label for="pathway-name-input" class="field-label">*Name</label> -->
          <input type="text" class="form-control pathway-name-input" id="pathway-name-input" placeholder="name this path" data-validation="required" required>
          <small class="form-text text-muted pathway-name-msg d-none">You've already used that name.</small>
        </div>
      </div><!-- End .modal-body -->
      <div class="modal-footer">
        <?php if( !is_user_logged_in() ){ ?>
          <a href="<?= get_permalink(97); ?>" class="button save-not-logged-in">Save</a>
        <?php } else { ?>
          <button type="submit" class="button button--submit">Save</button>
        <?php } ?>
        <a href="#" class="button--cancel" data-dismiss="modal">Cancel</a>
      </div>
      </form>
    </div>
  </div>
</div>