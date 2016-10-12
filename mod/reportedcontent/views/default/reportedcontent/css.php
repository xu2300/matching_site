<?php
  $site_url = elgg_get_site_url();
  $logo_url = $site_url . "/mod/reportedcontent/graphics/reportit.gif";
?>
/* Reported Content */
.elgg-icon-report-this {
        width: 80px;
        height: 20px;
        background-image: url("<?php echo $logo_url; ?>");
        background-repeat: no-repeat;

}
