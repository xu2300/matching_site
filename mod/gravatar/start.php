<?php
/**
 * Gravatar plugin
 */

elgg_register_event_handler('init', 'system', 'gravatar_init');

function gravatar_init() {
	elgg_register_plugin_hook_handler('entity:icon:url', 'user', 'gravatar_avatar_hook', 900);
}

/**
 * This hooks into the getIcon API and returns a gravatar icon
 */
function gravatar_avatar_hook($hook, $type, $url, $params) {

	// check if user already has an icon
	if (!$params['entity']->icontime) {
		$icon_sizes = elgg_get_config('icon_sizes');
		$size = $params['size'];
		if (!in_array($size, array_keys($icon_sizes))) {
			$size = 'small';
		}

		// avatars must be square
        $size = $icon_sizes[$size]['w'];
        $default = elgg_get_site_url() . '_graphics/icons/user/default' . $params['size'] . '.gif';
        $hash = md5($params['entity']->email);
        $grav_url = "http://www.gravatar.com/avatar/" . md5( strtolower( trim( $params['entity']->email ) ) ) . "?d=" . urlencode( $default ) . "&s=" . $size;
        return $grav_url;

	}
}
