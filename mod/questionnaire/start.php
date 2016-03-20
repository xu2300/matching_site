<?php

elgg_register_action("questionnaire/save", elgg_get_plugins_path() . "questionnaire/actions/questionnaire/save.php");
elgg_register_page_handler('questionnaire', 'questionnaire_page_handler');
function questionnaire_page_handler($segments) {
    switch ($segments[0]) {
        case 'add':
           include elgg_get_plugins_path() . 'questionnaire/pages/questionnaire/add.php';
           break;

        case 'all':
        default:
           include elgg_get_plugins_path() . 'questionnaire/pages/questionnaire/all.php';
           break;
    }

    return true;
}