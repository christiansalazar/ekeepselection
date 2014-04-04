//
// EKeepSelection
//
//  Keep the selection in a CGridView (Yii Framework) component.
//	
//	Author:  Christian Salazar  @salazarchris74  christiansalazarh@gmail.com
//	
//  usage:
//
//		$('#the_gridview_id').keepSelection();  // make the stuff
//
//		var items_selected = $('#the_gridview_id').keepSelectionData();
//		$.each(items_selected, function(index,value){ ...  });
//
$.fn.keepSelection = function() {
	var gridview = $(this);
	var id = $(this).attr('id');
	$settings = gridview.yiiGridView.settings[id];
	var orig_afterAjaxUpdate = $settings.afterAjaxUpdate;
	var orig_selectionChanged = $settings.selectionChanged;

	var _get_selected_page = function() {
		gridview = $('#'+id);
		var pages = gridview.find('.pager .page');
		var page = 0;
		$.each(pages, function(k, p){
			if($(p).hasClass('selected'))
				page = k;
		});
		return page;
	}

	var _getdata = function(){
		return $('#'+id).parent().data('ekeepselection');
	}

	var _setdata = function(d){
		$('#'+id).parent().data('ekeepselection',d);
	}

	var _get_selected_items = function() {
		gridview = $('#'+id);
		var selection = _getdata();
		if(selection == undefined)
			return [];
		var items = [];
		$.each(selection, function(cur_page,items_selected){
			var tmp = new String(items_selected);
			$.each(tmp.split(','),function(index,item){
				items.push(item);
			});
		});	
		return items;
	}

	var _afterAjaxUpdate = function(id,data){
		gridview = $('#'+id);
		if(orig_afterAjaxUpdate) orig_afterAjaxUpdate(id,data);
		// recover the selection from buffer into the selected page
		var current_page = _get_selected_page();
		var selection = _getdata();
		if(selection != undefined)
			if(selection[current_page]){
				var saved_selection = new String(selection[current_page]);
				$.each(saved_selection.split(','),function(k,item_selected){
					var checkbox = gridview.find('.checkbox-column input[value='
						+item_selected+']');
					checkbox.attr('checked',true);
				});
			}
	}

	var _selectionChanged = function(id){
		gridview = $('#'+id);
		// read selection and push into a data array
		var current_selection= gridview.yiiGridView('getSelection');
		var current_page = _get_selected_page();
		var selection = _getdata();
		if((!selection) || (selection==undefined)) { selection = []; }
		selection[current_page] = current_selection;
		_setdata(selection);
		if(orig_selectionChanged) orig_selectionChanged(id);
	}

	$settings.afterAjaxUpdate = _afterAjaxUpdate;
	$settings.selectionChanged = _selectionChanged;
};

/**
 * retrieve the selected ID in a form of array instead of string 
 */
$.fn.keepSelectionData = function(){
	var id = $(this).attr('id');
	var selection = $('#'+id).parent().data('ekeepselection');
	if(selection == undefined)
		return false;
	var items = [];
	var n=0;
	$.each(selection, function(cur_page,items_selected){
		var tmp = new String(items_selected);
		$.each(tmp.split(','),function(index,item){
			items.push(item);
			n++;
		});
	});	
	if(n==0) return false;
	return items;
}
