<?php
/**
 * CSS Page Layout
 *
 * @package Elgg.Core
 * @subpackage UI
 */
?>
/* <style> /**/
/**
 * Page Layout
 *
 * Contains CSS for the page shell and page layout
 *
 * Default layout: 990px wide, centered. Used in default page shell
 */

/* ***************************************
	PAGE LAYOUT
*************************************** */
/***** DEFAULT LAYOUT ******/
/* the width is on the page rather than topbar to handle small viewports */
body {
    background-color: #C0C0C0;
}
.elgg-page-default {
	min-height: 100%;
	height: 100%;
	min-width: 800px;
}
.elgg-page-default .elgg-page-header > .elgg-inner {
	max-width: 990px;
	margin: 0 auto;
	min-height: 65px;
}
.elgg-page-default .elgg-page-navbar > .elgg-inner {
	max-width: 990px;
	margin: 0 auto;
	height: auto;
}
.elgg-page-default .elgg-page-body > .elgg-inner {
	max-width: 990px;
	margin: 0 auto;
}
.elgg-page-default .elgg-page-footer > .elgg-inner {
	max-width: 990px;
	/*margin: 0 auto;
	padding: 5px 0;
	/*border-top: 1px solid #DEDEDE;*/
}

/***** TOPBAR ******/
.elgg-page-topbar {
	background: #FFFFFF;
	border-top: 1px solid #424242;
	border-bottom: 1px solid #FFFFFF;
	padding: 0 20px;
	position: relative;
	height: 32px;
	z-index: 9000;
}

/***** PAGE MESSAGES ******/
.elgg-system-messages {
	position: fixed;
	top: 32px;
	right: 20px;
	max-width: 500px;
	z-index: 2000;
}
.elgg-system-messages li {
	margin-top: 10px;
}
.elgg-system-messages li p {
	margin: 0;
}

/***** PAGE HEADER ******/
.elgg-page-header {
	max-width: 1020px;
	margin: 0 auto;
	padding: 5px 20px 10px;
	position: relative;
	background: #000000;
}
.elgg-page-header > .elgg-inner {
	position: relative;
}
/***** PAGE NAVBAR ******/
.elgg-page-navbar {
	max-width: 1060px;
	margin: 0 auto;
	padding: 0 0;
	border-bottom: 2px solid #000000;
	position: relative;
	background: #000000;
	z-index: 1000;
}
.elgg-page-navbar > .elgg-inner {
	max-width: 1060px;
	position: relative;
	margin: 0 auto;
	padding: 0 0;
	border-bottom: 4px solid #69D2FF;
}


/***** PAGE BODY LAYOUT ******/
.elgg-page-body {
	min-height: 100%;
	max-width: 1030px;
	margin: 0 auto;
	position: relative;
	background: #FFFFFF;
	border-top: 10px solid #69D2FF;
	border-bottom: 10px solid #69D2FF;
	border-left: 10px solid #69D2FF;
	border-right: 10px solid #69D2FF;
}
.elgg-page-body:before {
  content: '';
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  background: #000000;
  z-index: -1;
}

.elgg-layout {
	min-height: 100%;
}
.elgg-layout-widgets > .elgg-widgets {
	float: right;
}
.elgg-sidebar {
	position: relative;
	padding: 32px 0 20px 30px;
	float: right;
	width: 21.212121%;
	margin: 0;
	border-left: 1px solid #EBEBEB;
}
.elgg-sidebar-alt {
	position: relative;
	padding: 32px 30px 20px 0;
	float: left;
	width: 16.161616%;
	margin: 0 30px 0 0;
	border-right: 1px solid #EBEBEB;
}
.elgg-main {
	position: relative;
	min-height: 360px;
	padding: 12px 0 10px 0;
}
.elgg-main > .elgg-head {
	padding-bottom: 5px;
	border-bottom: 1px solid #EBEBEB;
	margin-bottom: 10px;
}
.elgg-layout-one-sidebar .elgg-main {
	float: left;
	width: 72.525252%;
}
.elgg-layout-two-sidebar .elgg-main {
	float: left;
	width: 50.101010%;
}

/***** PAGE FOOTER ******/
.elgg-page-footer {
	max-width: 1040px;
	margin: 0 auto;
	background: #000000;
	height: 50px;
	color: #FFFFFF;
	padding: 0 10px;
	position: relative;
}

.elgg-page-footer a:hover {
	color: #666;
}
