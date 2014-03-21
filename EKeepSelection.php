<?php
/**
 * EKeepSelection
 *
 *	allows a CGridView component to keep the selection between page changes.
 *
 *	usage:
 *
 *		$_dummyInst = new EKeepSelection('#my_grid_view_selector_id');
 *
 *	when used by hand in a javascript:
 *	
 *		$('#my_grid_view_selector_id').keepSelection();
 * 
 * @author Cristian Salazar H. <christiansalazarh@gmail.com> @salazarchris74 
 * @license FreeBSD {@link http://www.freebsd.org/copyright/freebsd-license.html}
 */
class EKeepSelection {
	public function __construct($gridview_selector){
		$cs = Yii::app()->getClientScript();
		$assets_url = Yii::app()->getAssetManager()->publish(
			rtrim(dirname(__FILE__),"/")."/assets")."/";
		$cs->registerScriptFile($assets_url."ekeepselection.js");
		$cs->registerScript(
		"ekeepselection_core_script",
		"$('".$gridview_selector."').keepSelection();",CClientScript::POS_LOAD);
	}
}
