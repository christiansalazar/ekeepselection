ekeepselection
==============

Keep the selection between page changes in a CGridView component (Yii Framework)

author:

  Christian Salazar H.  @salazarchris74  christiansalazarh@gmail.com

#Installation

Please copy this extension into your protected/extensions directory or simply clone it via github.

1) In your protected/config/main.php , edit your imports adding the following:
~~~
  	'import'=>array(
		  'application.models.*',
		  'application.components.*',
		  ...
		  ...
		  'application.extensions.ekeepselection.*',
	  ),
~~~
2) Add a CCheckBoxColumn in the CGridView and take care about the 'id' argument
~~~
  $this->widget('zii.widgets.grid.CGridView', array(
		'id'=>'my-gridview',                  // IMPORTANT
		'selectableRows'=>2,                  // 2 = allow multiple selection 
		'dataProvider'=> $anyDataProvider,
		'columns'=>array(
			array('class'=>'CCheckBoxColumn'),  // ADD A CCheckBoxColumn
			'firstname',
			'lastname',
		),
	));
~~~
3) In the same file (in were the CGridView is located) add this line:
~~~  
  $dummy = new EKeepSelection('#my-gridview');   // take care about the '#' and the ID
~~~

#Reading the CGridView selection

Suppose you have a button and you want to read the whole selected items in all pages.

~~~
   $('#somebutton').click(function(){
   
      // the keepSelectionData() will return an array of string items
      var selected_items = $('#my-gridview').keepSelectionData();
      
      // example iteration:
      $.each(selected_items, function(index, value){ alert(value);  });
      
      // sending the selection to an ajax action:
      $.ajax({ url: 'some' , type: 'post', data: { items: selected_items } });
      
   });
~~~

In the sample action called you may want to have this code to read the post:

~~~
   public function actionSomeDeleteObjects(){
       if(isset($_POST['items']))
         foreach($_POST['items'] as $id){
              $some = SomeClass::model()->findByPk($id);
              $some->delete();
         }
   }
~~~


