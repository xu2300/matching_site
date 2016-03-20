<?php
$site = elgg_get_site_entity();
$site_name = $site->name;
$site_url = elgg_get_site_url();
$logo_url = $site_url . "mod/fortitude_theme/graphics/Logo.jpg";
?>

<h1>
	<a class="elgg-heading-site" href="<?php echo $site_url; ?>">
			<img src="<?php echo $logo_url; ?>" alt="<?php echo $site_name; ?>" width="110"; height="110";  style="margin:0px 0px -50px 0px; float:left; z-index:9999; position: relative;";/>
			<span style ='font:50px "Agency FB Bold Condensed";color:#69d2ff; font-style:italic;'> Project </span>  
			<span style ='font:50px "Bell MT";color:#69d2ff'> CUIRA </span>
	</a>
</h1>
