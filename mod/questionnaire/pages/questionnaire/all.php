<?php
/*
$body = elgg_list_entities(array(
    'type' => 'object',
    'subtype' => 'my_blog',
    'owner_guid' => elgg_get_logged_in_user_guid()
));
$body = elgg_view_layout('one_column', array('content' => $body));

echo elgg_view_page("All Site Blogs", $body);
*/


$page = 'newest';
$params = array(
	'options' => array('type' => 'user', 'full_view' => false),
);
$content = elgg_trigger_plugin_hook('members:list', $page, $params, null);
if ($content === null) {
	forward('', '404');
}
$filter = elgg_view('navigation/tabs', array('tabs' => 'Newest'));

$title = elgg_echo("We find some similiar members for you:");

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

//echo ('similiar users are:')
?>