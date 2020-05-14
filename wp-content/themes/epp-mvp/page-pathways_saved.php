<?php
/* Template Name: Saved Paths */
if (!is_user_logged_in()):
  wp_redirect(home_url());
  exit();
else:
  get_header();
  $epp_user_id = epp_mvp_get_epp_user();
  ?>

  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

  <section class="container container--saved-pathways">
    <div class="row">
      <div class="col"><h1 class="page-heading"><?php the_title(); ?></h1></div>
    </div>

    <?php
    // check for rows (parent repeater)
    if (have_rows('epp_saved_pathways', $epp_user_id)): $counter = 1;
      // loop through rows (parent repeater)
      while (have_rows('epp_saved_pathways', $epp_user_id)): the_row(); ?>
        <div class="row row-flushed saved-pathway__actions">
          <div class="col">
            <p class="saved-pathway__name">
              <a class="saved-pathway__delete-btn" href="#" data-row-index="<?= get_row_index(); ?>">x</a>
              <span><?php the_sub_field('epp_saved_pathway_name', $epp_user_id); ?></span>
              <input type="text" class="input--edit-path-name" data-row-index="<?= get_row_index(); ?>"
                     data-initial-value="<?php the_sub_field('epp_saved_pathway_name', $epp_user_id); ?>"
                     value="<?php the_sub_field('epp_saved_pathway_name', $epp_user_id); ?>">
              <a href="#" class="saved-pathway__name--edit-btn">Edit name</a>
              <a href="#" class="button saved-pathway__open-btn d-none d-md-block" data-start-occ="">Open Path</a>
            </p>
          </div>
        </div>
        <?php
        // check for rows (sub repeater)
        if (have_rows('epp_pathways', $epp_user_id)): ?>
          <div class="row saved-pathway">
            <?php
            // loop through rows (sub repeater)
            while (have_rows('epp_pathways', $epp_user_id)): the_row(); ?>
              <div class="col-md-3 saved-pathway__occupation"
                   data-soc-code="<?php the_sub_field('epp_pathway_occupation_id', $epp_user_id); ?>">
                <?php
                $automation = get_sub_field('epp_pathway_occupation_automation', $epp_user_id) / 100;
                $automation = epp_mvp_automation_percent($automation);
                ?>
                <div class="saved-pathway__risk--mobile d-md-none">
                  <em class="<?= $automation['automation_colour']; ?>"><?= $automation['automation_percent']; ?>%</em>
                  <span>Risk of automation</span>
                </div>

                <p class="saved-pathway__occupation-title"
                   data-full-title="<?php the_sub_field('epp_pathway_occupation_title', $epp_user_id); ?>">
                  <a
                    href="<?= home_url() . '/occupation/?soc_code=' . get_sub_field('epp_pathway_occupation_id', $epp_user_id); ?>">
                    <?php
                    $title = get_sub_field('epp_pathway_occupation_title', $epp_user_id);
                    $title = epp_mvp_truncate_title($title, 30);
                    echo $title;
                    ?>
                  </a>
                </p>
                <p class="saved-pathway__automation d-none d-md-block">
                  <em
                    class="saved-pathway__risk-percent <?= $automation['automation_colour']; ?>"><?= $automation['automation_percent']; ?>
                    %</em>
                  <span>Risk of automation</span>
                </p>
              </div>
            <?php endwhile; ?>
          </div>
          <div class="clearfix"></div>

          <p class="saved-pathway__open-btn--mobile d-md-none">
            <a href="#" class="button" data-start-occ="">Open Path</a>
          </p>
          <div class="clearfix d-md-none"></div>

        <?php endif; ?>
        <?php $counter++; endwhile; ?>

    <?php else: ?>
      <div class="row">
        <div class="col mb-5">
          <p class="text-center nothing-saved">You don't have any saved pathways.</p>
        </div>
      </div>
    <?php endif; ?>
  </section>

  <div class="modal fade" id="delete-saved-modal" tabindex="-1" role="dialog" aria-labelledby="delete-saved-modal"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="">Delete Path</h5>
        </div>
        <div class="modal-body">
          Are you sure you want to delete this path?
        </div>
        <div class="modal-footer">
          <button type="button" class="button button--delete-saved" data-row-index="">Delete</button>
          <a href="#" class="button--cancel" data-dismiss="modal">Cancel</a>
        </div>
      </div>
    </div>
  </div>

<?php endwhile; endif; ?>

  <?php get_footer(); ?>

<?php endif; ?>