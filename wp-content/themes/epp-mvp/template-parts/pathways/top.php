<?php $saved_paths_url = epp_mvp_get_page_template_url( 'page-pathways_saved.php' ); ?>

<div class="row justify-content-md-center">
  <div class="col-12">
    <h1 class="page-heading page-heading--pathways">Path builder</h1>
  </div>
  <div class="col-md-6 pathways__actions" style="<?= !is_user_logged_in() ? 'text-align: center;' : ''; ?>">
    <div>
      <div class="pathways__name-current-path <?php if( !isset($_GET['soc_code']) ){ echo 'initial-state'; } ?>">
        <?php if( is_user_logged_in() ) { ?>
          <span>Name this path</span>
          <input type="text" class="input--save-path-name" data-initial-value="name this path" value="">
          <a href="#" class="pathways__name--edit-btn">Edit name</a>
        <?php } ?>
      </div>
      <div class="pathways__actions-btns <?php if( !isset($_GET['soc_code']) ){ echo 'empty-occ'; } ?>" style="<?= !is_user_logged_in() ? 'float: none;' : ''; ?>">
        <a href="#" class="button button--rectangle pathways__action-btn view-active-pathway">Collapse Path</a>
        <!-- <a href="#" class="button--outlined button--rectangle pathways__action-btn save-pathway-popup" data-toggle="modal" data-target="#name-your-pathway">Save</a> -->
        <a href="#" class="button--outlined button--rectangle pathways__action-btn save-pathway-popup">Save</a>
      </div><!-- End .pathways__actions-btns -->
    </div>
  </div>
</div>

<div class="row">
  <div class="col-12">
    <div class="alert alert-success mt-5 d-none text-center pathway__saved-pathway-msg" role="alert">
      Your pathway has been saved! View it <a class="alert-link" href="<?= $saved_paths_url; ?>">here</a>.
    </div>
    <div class="alert alert-danger mt-5 d-none text-center pathway__saved-pathway-msg" role="alert">
      Your pathway could not be saved. Please try again.
    </div>
  </div>

  <div class="col-12 pathway__progress-wrap">
    <ul class="pathway__progress">
      <li class="step1 active"></li>
      <li class="step2 <?= isset($_GET['soc_code']) ? 'selected' : '' ?>"></li>
      <li class="step3"></li>
      <li class="step4"></li>
    </ul>
  </div>
</div>