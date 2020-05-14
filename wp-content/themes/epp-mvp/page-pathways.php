<?php
/* Template Name: Pathways Page */

if (isset($_GET['soc_code'])) {

  $soc_code = $_GET['soc_code'];
  $api_url = EPP_API_URL . '/occupation/distance/' . $soc_code . '?rows_limit=5&soc_exclude=' . $soc_code;
  $home_url = home_url();
  $occupations_json = file_get_contents($home_url . '/epp-occupation-details.json');
  $occupations = json_decode($occupations_json);
  $occupation = $occupations->$soc_code;
  $automation = epp_mvp_automation_percent($occupation->auto_risk);
  $salary_med = epp_mvp_salary_med($occupation->salary_min, $occupation->salary_max);

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  // Set the header with the secret key
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'x-api-key: ' . EPP_API_KEY
  ));

  curl_setopt($ch, CURLOPT_URL, $api_url);
  $result = curl_exec($ch);
  curl_close($ch);

  $result_object = json_decode($result);
  $matches = $result_object->overlap->data->rows;
}

get_header();
$epp_user_id = epp_mvp_get_epp_user();

if (have_rows('epp_saved_pathways', $epp_user_id)): $counter = 1;
  while (have_rows('epp_saved_pathways', $epp_user_id)): the_row();
    $counter++;
  endwhile;
endif;
?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

  <section class="container-fluid container--pathways">
    <?php include_once('template-parts/pathways/top.php'); ?>
    <div class="row justify-content-md-center pathway__groups">
      <?php include_once('template-parts/pathways/starting-path.php'); ?>
      <?php include_once('template-parts/pathways/next-paths.php'); ?>
    </div><!-- End .row -->

    <div class="row justify-content-md-center mobile-pathway__groups"></div>

    <div class="row current-path-holder justify-content-md-center">
      <div class="col"></div><!-- End .col -->
      <div class="col-12">
        <p class="text-center nothing-saved">You don't have any active paths.</p>
      </div>
    </div>

    <div class="loading loading--mobile">
      <div class="loading__square"></div>
    </div>
  </section>

  <?php include_once('template-parts/pathways/save-modal.php'); ?>

<?php endwhile; endif; ?>

<?php get_footer(); ?>