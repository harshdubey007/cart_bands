$("ul").on("click","span",function(event){
 $(this).parent().fadeOut(500,function(){
 	$(this).remove();
 });
event.stopPropagation();
});

$("ul").on("click","li",function(){
$(this).toggleClass("container");
});

$("input[type='text'").keypress(function(event){
	
	if(event.which===13){
		var value=$(this).val();
		$(this).val("");
	$("ul").append("<li><span><i class='fa fa-trash'></i></span> "+value+"</li>");
  }
})

$(".fa-plus").on("click",function(){
	$("input").fadeToggle();
})

