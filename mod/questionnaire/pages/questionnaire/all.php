<?php

$user = elgg_get_logged_in_user_entity();
$cur_user_guid = $user->getGUID();
//echo($cur_user_guid);
$options = array(
			'type' => 'object',
			'subtype' => 'questionnaire',
			'owner_guid' => $cur_user_guid
		);
$cur_user_ques = elgg_get_entities($options);


$cur_q = $cur_user_ques[0];


$options1 = array(
			'type' => 'object',
			'subtype' => 'questionnaire'
		);

$qs = elgg_get_entities($options1);
//var_dump($qs);

// key: user guid value: similarity value
$points = array();
foreach ($qs as $q) {
			$r = compareTwoQue($q, $cur_q);
			$q_user_guid = $q->owner_guid;
			//echo("---".$r);
			$points[$q_user_guid]=$r;
}

//var_dump($points);
// sort the array by key desc
arsort($points);
//var_dump($points);


$users = elgg_get_entities(array(
    'type' => 'user',
    'guids' => array_keys($points)
 ));
/*
	foreach($users as $u){
	//$l = $u->getIconURL('small');
	$l = elgg_view_entity_icon($u,'tiny');
	echo($l);

}

$b = elgg_list_entities(array(
    'type' => 'user',
    'guids' => array_keys($points)
 ));

$b = "----".$b."----";

echo($b);
*/

$str = <<<EOD
<h3>number.   imageurl   <a href="http://projectcuria.com/profile/test">test</a> percentage%</h3>
<br>
EOD;

$a="";
$i =1;

foreach ($points as $id => $val) {
	if($id != $cur_user_guid){
		foreach($users as $u){
			if($u->guid == $id){
				$name = str_replace(" ", "-", $u->name);
				$t = str_replace("test", $name, $str);
				$t = str_replace("number", $i, $t);
				$i ++;
				$j = $points[$u->guid];
				if($j > 100){
					$j=100;
				}
				$t = str_replace("percentage", $j, $t);

				//$l = $u->getIconURL('tiny');
				$l = elgg_view_entity_icon($u,'tiny');
				$t = str_replace("imageurl", $l, $t);


				$a = $a . $t;	
			}
	}
}
};


$body = $a;

//$body = $b;


$filter = elgg_view('navigation/tabs', array('tabs' => 'all'));
$title = elgg_echo("We find some similar members for you:");

$params = array(
	'content' => $body,
	//'sidebar' => elgg_view('members/sidebar'),
	'title' => $title,
	'filter' => $filter,
);

$body = elgg_view_layout('content', $params);

echo elgg_view_page($title, $body);

// compare tow questionarie object and return the simliarity value
function compareTwoQue($q1, $q2){
	$a = 22;
	if($q1->frequency == $q2->frequency)
		$a = $a + 16;

	if((!empty($q1->mon1)) && ($q1->mon1 == $q2->mon1))
		$a = $a + 15;
	if((!empty($q1->tue1)) && ($q1->tue1 == $q2->tue1))
		$a = $a + 15;
	if((!empty($q1->wen1)) && ($q1->wen1 == $q2->wen1))
		$a = $a + 15;
	if((!empty($q1->thu1)) && ($q1->thu1 == $q2->thu1))
		$a = $a + 15;
	if((!empty($q1->fri1)) && ($q1->fri1 == $q2->fri1))
		$a = $a + 15;
	if((!empty($q1->sat1)) && ($q1->sat1 == $q2->sat1))
		$a = $a + 15;
	if((!empty($q1->sun1)) && ($q1->sun1 == $q2->sun1))
		$a = $a + 15;

	if((!empty($q1->mon2)) && ($q1->mon2 == $q2->mon2))
		$a = $a + 15;
	if((!empty($q1->tue2)) && ($q1->tue2 == $q2->tue2))
		$a = $a + 15;
	if((!empty($q1->wen2)) && ($q1->wen2 == $q2->wen2))
		$a = $a + 15;
	if((!empty($q1->thu2)) && ($q1->thu2 == $q2->thu2))
		$a = $a + 15;
	if((!empty($q1->fri2)) && ($q1->fri2 == $q2->fri2))
		$a = $a + 15;
	if((!empty($q1->sat2)) && ($q1->sat2 == $q2->sat2))
		$a = $a + 15;
	if((!empty($q1->sun2)) && ($q1->sun2 == $q2->sun2))
		$a = $a + 15;

	if((!empty($q1->mon3)) && ($q1->mon3 == $q2->mon3))
		$a = $a + 15;
	if((!empty($q1->tue3)) && ($q1->tue3 == $q2->tue3))
		$a = $a + 15;
	if((!empty($q1->wen3)) && ($q1->wen3 == $q2->wen3))
		$a = $a + 15;
	if((!empty($q1->thu3)) && ($q1->thu3 == $q2->thu3))
		$a = $a + 15;
	if((!empty($q1->fri3)) && ($q1->fri3 == $q2->fri3))
		$a = $a + 15;
	if((!empty($q1->sat3)) && ($q1->sat3 == $q2->sat3))
		$a = $a + 15;
	if((!empty($q1->sun3)) && ($q1->sun2 == $q2->sun3))
		$a = $a + 15;

	if((!empty($q1->mon4)) && ($q1->mon4 == $q2->mon4))
		$a = $a + 15;
	if((!empty($q1->tue4)) && ($q1->tue4 == $q2->tue4))
		$a = $a + 15;
	if((!empty($q1->wen4)) && ($q1->wen4 == $q2->wen4))
		$a = $a + 15;
	if((!empty($q1->thu4)) && ($q1->thu4 == $q2->thu4))
		$a = $a + 15;
	if((!empty($q1->fri4)) && ($q1->fri4 == $q2->fri4))
		$a = $a + 15;
	if((!empty($q1->sat4)) && ($q1->sat4 == $q2->sat4))
		$a = $a + 15;
	if((!empty($q1->sun4)) && ($q1->sun2 == $q2->sun4))
		$a = $a + 15;

	if((!empty($q1->mon5)) && ($q1->mon5 == $q2->mon5))
		$a = $a + 15;
	if((!empty($q1->tue5)) && ($q1->tue5 == $q2->tue5))
		$a = $a + 15;
	if((!empty($q1->wen5)) && ($q1->wen5 == $q2->wen5))
		$a = $a + 15;
	if((!empty($q1->thu5)) && ($q1->thu5 == $q2->thu5))
		$a = $a + 15;
	if((!empty($q1->fri5)) && ($q1->fri5 == $q2->fri5))
		$a = $a + 15;
	if((!empty($q1->sat5)) && ($q1->sat5 == $q2->sat5))
		$a = $a + 15;
	if((!empty($q1->sun5)) && ($q1->sun2 == $q2->sun5))
		$a = $a + 15;

	if((!empty($q1->mon6)) && ($q1->mon6 == $q2->mon6))
		$a = $a + 15;
	if((!empty($q1->tue6)) && ($q1->tue6 == $q2->tue6))
		$a = $a + 15;
	if((!empty($q1->wen6)) && ($q1->wen6 == $q2->wen6))
		$a = $a + 15;
	if((!empty($q1->thu6)) && ($q1->thu6 == $q2->thu6))
		$a = $a + 15;
	if((!empty($q1->fri6)) && ($q1->fri6 == $q2->fri6))
		$a = $a + 15;
	if((!empty($q1->sat6)) && ($q1->sat6 == $q2->sat6))
		$a = $a + 15;
	if((!empty($q1->sun6)) && ($q1->sun2 == $q2->sun6))
		$a = $a + 15;

$commonconsoles = array_intersect($q1->consoles, $q2->consoles);
		$a = $a + 16* count($commonconsoles);

if((!empty($q1->otherconsoles)) && ($q1->otherconsoles == $q2->otherconsoles))
		$a = $a + 5;

if((!empty($q1->mic)) && ($q1->mic == $q2->mic))
		$a = $a + 12;

	$commonplaywith = array_intersect($q1->playwith, $q2->playwith);
		$a = $a + 12* count($commonplaywith);
$commongames = array_intersect($q1->games, $q2->games);
		$a = $a + 12* count($commongames);

	return $a;
}


/*
$page = 'newest';
$params = array(
	'options' => array('type' => 'user', 'full_view' => false),
);
$content = elgg_trigger_plugin_hook('members:list', $page, $params, null);
if ($content === null) {
	forward('', '404');
}
$filter = elgg_view('navigation/tabs', array('tabs' => 'Newest'));

$title = elgg_echo("We find some similar members for you:");

$params = array(
	'content' => $content,
	'sidebar' => elgg_view('members/sidebar'),
	'title' => $title,
	'filter' => $filter,
);

$body = elgg_view_layout('content', $params);

echo elgg_view_page($title, $body);

$options = array(
			'type' => 'object',
			'subtype' => 'questionnaire'
		);

$entities = elgg_get_entities($options);

foreach ($entities as $entity) {
			echo($entity->frequency);
			echo(' ');
		}

?> */