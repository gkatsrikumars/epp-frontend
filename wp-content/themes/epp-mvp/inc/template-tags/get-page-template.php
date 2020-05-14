<?php
/** @desc Get the url for a specific page template,
 * if multiple pages use this template then it will return the first instance
 * @param str $page_template - required
 * @return url $page_template_url
 */
function epp_mvp_get_page_template_url($page_template)
{
  $page_templates = get_pages(array(
    'meta_key' => '_wp_page_template',
    'meta_value' => $page_template
  ));

  if ($page_templates) {
    $page_template_id = $page_templates[0]->ID;
    $page_template_url = get_permalink($page_template_id);
  } else {
    $page_template_url = '#';
  }
  return $page_template_url;
}