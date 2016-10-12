<?php
/**
 * Page shell for all HTML pages
 *
 * @uses $vars['head']        Parameters for the <head> element
 * @uses $vars['body_attrs']  Attributes of the <body> tag
 * @uses $vars['body']        The main content of the page
 */
// Set the content type
header("Content-type: text/html; charset=UTF-8");

$lang = get_current_language();

$attrs = "";
if (isset($vars['body_attrs'])) {
	$attrs = elgg_format_attributes($vars['body_attrs']);
	if ($attrs) {
		$attrs = " $attrs";
	}
}
?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $lang; ?>" lang="<?php echo $lang; ?>">
	<head>
        <style>
        @font-face{
	     font-family: "Agency FB Bold Condensed";
             font-style: normal;
             font-weight: 700;
             src: local("Agency FB Bold Condensed"),
                  url('<?php echo elgg_get_site_url(); ?>mod/fortitude_theme/graphics/AgencyFBBold.woff') format('woff'),
                  url('<?php echo elgg_get_site_url(); ?>mod/fortitude_theme/graphics/AgencyFBBold.eot') format('embedded-opentype'),
                  url('<?php echo elgg_get_site_url(); ?>mod/fortitude_theme/graphics/AgencyFBBold.ttf') format('truetype'),
                  url('<?php echo elgg_get_site_url(); ?>mod/fortitude_theme/graphics/AgencyFBBold.svg') format('svg');
             
        }
        </style>
		<?php echo $vars["head"]; ?>
	</head>
	<body<?php echo $attrs ?>>
		<?php echo $vars["body"]; ?>
	</body>
</html>
