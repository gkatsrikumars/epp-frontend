<?php
function epp_mvp_automation_percent($automation_risk)
{
  $automation = floatval($automation_risk);
  $automation = round($automation * 100);
  $automation_colour = 'text-success';
  if ($automation > 20 && $automation < 50) {
    $automation_colour = 'text-warning';
  } else if ($automation >= 50) {
    $automation_colour = 'text-danger';
  }
  $automation_array = array(
    'automation_percent' => $automation,
    'automation_colour' => $automation_colour
  );
  return $automation_array;
}

/*--------------------------------------------------------------
* Calculate median salary
--------------------------------------------------------------*/
function epp_mvp_salary_med($salary_min, $salary_max)
{
  if ($salary_min && $salary_max) {
    $salary_min = floatval($salary_min);
    $salary_max = floatval($salary_max);
    $salary_med = round(($salary_min + $salary_max) / 2);
    $formatted_salary = '$' . number_format($salary_med);
  } else if ($salary_min && !$salary_max) {
    $formatted_salary = '$' . number_format($salary_min);
  } else if (!$salary_min && $salary_max) {
    $formatted_salary = '$' . number_format($salary_max);
  } else {
    $formatted_salary = 'no salary data';
  }
  return $formatted_salary;
}

/*--------------------------------------------------------------
* Calculate distance percentage
--------------------------------------------------------------*/
function epp_mvp_percentage_distance($x)
{
  return round((1 - $x) * 100);
}

function epp_mvp_percentage_of_number($num1, $num2)
{
  $percentage = 0;
  $percentage = ($num1 !== 0 && $num2 !== 0 ? ($num1 / $num2) : 0) * 100;

  // $percentage = ($num1 / $num2) * 100;
  return $percentage . "%";
}

/*--------------------------------------------------------------
* Custom sorting function to sort abilities by percent, descending
--------------------------------------------------------------*/
function ability_sort($a, $b)
{
  if ($a["ability_calc"] == $b["ability_calc"]) {
    return 0;
  }
  return ($a["ability_calc"] > $b["ability_calc"]) ? -1 : 1;
}

/*--------------------------------------------------------------
* Custom sorting function to sort skills by percent, descending
--------------------------------------------------------------*/
function skill_sort($a, $b)
{
  if ($a["skill_percent"] == $b["skill_percent"]) {
    return 0;
  }
  return ($a["skill_percent"] > $b["skill_percent"]) ? -1 : 1;
}

/*--------------------------------------------------------------
* Get top skills for each occupation
--------------------------------------------------------------*/
function epp_mvp_get_top_skills($skills)
{

  $skills_obj = array();
  foreach ($skills as $skill) {
    $skill_calc = ($skill->attr_level / 7) * (($skill->attr_importance - 1) / 4);
    $skill_percent = floatval($skill_calc);
    $skill_percent = round($skill_percent * 100);
    $skills_obj[] = array(
      'skill_name' => $skill->attr_name,
      'skill_percent' => $skill_percent
    );
  }

  usort($skills_obj, "skill_sort");// Sort skills in decending order using custom sorter

  $top_six_skills = array_slice($skills_obj, 0, 6);// Grab only the top 5 skills

  return $top_six_skills;
}

/*--------------------------------------------------------------
* Custom sorting function to sort education by percent, descending
--------------------------------------------------------------*/
function education_sort($a, $b)
{
  if ($a->percentage == $b->percentage) {
    return 0;
  }
  return ($a->percentage > $b->percentage) ? -1 : 1;
}

/*--------------------------------------------------------------
* Get top education for each occupation
--------------------------------------------------------------*/
function epp_mvp_get_top_education($education)
{

  usort($education, "education_sort");// Sort education in decending order using custom sorter

  $education_obj = array();

  $counter = 0;

  foreach ($education as $edu) {

    if ($edu->percentage >= 0.5) {
      $education_obj[] = array(
        'description' => $edu->cat_description,
        'percentage' => floatval($edu->percentage)
      );
    }

  }
  $top_five_edu = array_slice($education_obj, 0, 5);// Grab only the top 5 skills

  return $top_five_edu;
}

/*--------------------------------------------------------------
* Replace the education description strings
* with shortened versions
--------------------------------------------------------------*/
function epp_mvp_shorten_education_desc($description)
{

  switch ($description) {
    case 'College, CEGEP or other non-university certificate or diploma':
      $description = 'College certificate or diploma';
      break;
    case 'Secondary (high) school diploma or equivalency certificate':
      $description = 'High school diploma';
      break;
    case 'University certificate or diploma below bachelor level':
      $description = 'University certificate or diploma';
      break;
    case 'Trades certificate or diploma other than Certificate of Apprenticeship or Certificate of Qualification':
      $description = 'Trades certificate or diploma';
      break;
    case 'Certificate of Apprenticeship or Certificate of Qualification':
      $description = 'Certificate of Apprenticeship';
      break;
    case 'Degree in medicine, dentistry, veterinary medicine or optometry':
      $description = 'Degree in medicine';
      break;
  }

  return $description;
}

/*--------------------------------------------------------------
* Replace the training duration strings
* with shortened versions
--------------------------------------------------------------*/
function epp_mvp_shorten_duration($duration)
{

  switch ($duration) {
    case 'More than 6 months but less than 12 months':
      $duration = '6-12 months';
      break;
    case 'More than 1 year but less than 2 years':
      $duration = '1-2 years';
      break;
    case 'More than 2 years but less than 4':
      $duration = '2-4 years';
      break;
    case '4 or more years':
      $duration = '4+ years';
      break;
  }

  return $duration;
}

/*--------------------------------------------------------------
* PHP Classes
--------------------------------------------------------------*/

class EPP_Occupation
{

  var $soc_code;
  var $title;
  var $description;
  var $automation;
  var $salary_median;
  var $education;
  var $top_skills;
  var $training;

  function __construct($soc_code)
  {

    // SOC CODE:
    $this->soc_code = $soc_code;

    $home_url = home_url();
    $occupations_json = file_get_contents($home_url . '/epp-occupation-details.json');
    $occupations = json_decode($occupations_json);
    $occupation = $occupations->$soc_code;

    // TITLE:
    $this->title = $occupation->title;

    // DESCRIPTION:
    $this->description = $occupation->description;

    // AUTOMATION RISK:
    $this->automation = epp_mvp_automation_percent($occupation->auto_risk);

    // MEDIAN SALARY:
    $this->salary_median = epp_mvp_salary_med($occupation->salary_min, $occupation->salary_max);


    // EDUCATION:
    if ($occupation->education) {
      $this->education = $occupation->education;
    }

    // SKILLS:
    $this->top_skills = $occupation->top_skills;

    // TRAINING:
    $this->training = $occupation->training;

  }

  function get_jobs()
  {
    $search = str_replace(' ', '+', $this->title);

    $ch2 = curl_init();
    curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

    curl_setopt($ch2, CURLOPT_URL, 'https://api.ziprecruiter.com/jobs/v1?search=' . $search . '&location=Toronto,ON&radius_miles=16&jobs_per_page=50&api_key=INSERT-ZIPRECRUITER-KEY'); //Note: INSERT-ZIPRECRUITER-KEY
    $result2 = curl_exec($ch2);
    curl_close($ch2);

    $result_object2 = json_decode($result2);

    return $result_object2;
  }

  function get_recent_jobs()
  {
    $search = str_replace(' ', '+', $this->title);

    $ch2 = curl_init();
    curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

    curl_setopt($ch2, CURLOPT_URL, 'https://api.ziprecruiter.com/jobs/v1?search=' . $search . '&location=Toronto,ON&radius_miles=16&jobs_per_page=50&days_ago=8&api_key=INSERT-ZIPRECRUITER-KEY'); //Note: INSERT-ZIPRECRUITER-KEY
    $result2 = curl_exec($ch2);
    curl_close($ch2);

    $result_object2 = json_decode($result2);

    return $result_object2;
  }

}