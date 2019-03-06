$( document ).ready(function() {
	console.log("ready");
	$('button.ajax').on("click", function(){
	    $.ajax({
	    	url: $(this).attr("id"), 
	    	data: {msg: $('[name="msgText"]').val()},
	    	success:function(res){
	    		console.log("success")
	        	console.log('server response is', res);
	        	$('.jumbotron .container .name').html(res.name);
	        	$('.jumbotron .container .text').html(res.text);
	    	},
	    	done: function(res){
	    		console.log("done")
	    	}
	   	});
	});

});