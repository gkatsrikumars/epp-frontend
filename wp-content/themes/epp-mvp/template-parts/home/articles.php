<section id="home-section--future-of-work" class="home-section home-section--future-of-work">
	<img src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/goo-3.svg" width="355" alt="" class="goo-3">

	<div class="row">
		<div class="col-12 col--no-lp">
			<h2 class="home-section home-section__heading">future of work</h2>
		</div>
	</div>

<?php
$args = array(
	'post_type' => 'epp_article',
	'post_status' => 'publish',
	'posts_per_page' => 2,
	'orderby' => 'post_date',
	'order' => 'DESC'
);
// the query
$the_query = new WP_Query( $args ); ?>

<?php if ( $the_query->have_posts() ) : $i = 0; ?>

<?php while ( $the_query->have_posts() ) : $the_query->the_post(); ?>

	<?php
	if( get_field('epp_article_url_or_file') == 'file' ) {
		$url = get_field('epp_article_file');
	}
	elseif( get_field('epp_article_url_or_file') == 'url' ) {
		$url = get_field('epp_article_link');
	}
	else{
		$url = get_permalink();
	}
	?>

	<?php if( $i%2 == 0 ): ?>

		<div class="row report">
			<div class="col-md-6 col--has-img">
				<a href="<?= $url; ?>" class="report__img-link" target="<?php the_field('epp_article_link_type'); ?>">
				<?php
				if( has_post_thumbnail() ){
					the_post_thumbnail('article-thumb');
				}
				else {
					echo '<img src="https://via.placeholder.com/570x383" alt="placeholder image" class="report__img">';
				}
				?>
				</a>
			</div>
			<div class="col-md-6 col--has-copy">
				<strong class="report__title"><?php the_title(); ?></strong>
				<p class="report__snippet"><?= wp_strip_all_tags( get_the_excerpt(), true ); ?></p>
				<a href="<?= $url; ?>" class="button report__read-more-btn" target="<?php the_field('epp_article_link_type'); ?>">Read Full Report</a>
			</div>
		</div><!-- End .row.report -->

	<?php else: ?>

		<div class="row report">
			<div class="col-md-6 col--has-copy">
				<?php
				if( has_post_thumbnail() ){
					the_post_thumbnail( 'article-thumb', array('class' => 'attachment-article-thumb size-article-thumb d-md-none') );
				}
				else {
					echo '<img src="https://via.placeholder.com/570x383" alt="placeholder image" class="report__img d-md-none">';
				}
				?>
				<strong class="report__title"><?php the_title(); ?></strong>
				<p class="report__snippet"><?= wp_strip_all_tags( get_the_excerpt(), true ); ?></p>
				<a href="<?php if( get_field('epp_article_link') == '' ){ the_permalink(); } else { the_field('epp_article_link'); } ?>" class="button report__read-more-btn" target="<?php the_field('epp_article_link_type'); ?>">Read Full Report</a>
			</div>
			<div class="col-md-6 col--has-img">
				<a href="<?= $url; ?>" class="report__img-link" target="<?php the_field('epp_article_link_type'); ?>">
				<?php
				if( has_post_thumbnail() ){
					the_post_thumbnail( 'article-thumb', array('class' => 'attachment-article-thumb size-article-thumb d-none d-md-inline-block') );
				}
				else {
					echo '<img src="https://via.placeholder.com/570x383" alt="placeholder image" class="report__img d-none d-md-inline-block">';
				}
				?>
				</a>
			</div>
		</div><!-- End .row.report -->

	<?php endif; ?>

<?php $i++; endwhile; ?>

<?php endif; ?>

<?php wp_reset_postdata(); ?>

</section>