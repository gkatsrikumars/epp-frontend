<?php
/*--------------------------------------------------------------
* Truncate content
--------------------------------------------------------------*/
function epp_mvp_truncate_content($content, $limit) {
  $excerpt = explode(' ', $content, $limit);
  if (count($excerpt) >= $limit) {
    array_pop($excerpt);
    $excerpt = implode(' ',$excerpt).'...';
  } else {
    $excerpt = implode(' ',$excerpt);
  } 
  $excerpt = preg_replace('`\[[^\]]*\]`','',$excerpt);
  $excerpt = str_replace(',...', '...', $excerpt);
  return $excerpt;
}

/*--------------------------------------------------------------
* Truncate title
--------------------------------------------------------------*/
function epp_mvp_truncate_title($title, $limit) {
  
  if(strlen($title) > $limit) {
    $excerpt = substr($title, 0, $limit).'...';
    return '<span data-toggle="tooltip" data-placement="top" title="' . $title . '">' . $excerpt . '</span>';
  }
  else{
    return $title;
  }

}