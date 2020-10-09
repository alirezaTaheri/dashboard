$(document).ready(function(){
	var restricted_keys = ['Control', 'Alt', 'Shift'];
	$("#inputFocus").on("keyup", function(e) {
		$(".dd-content").css({"width":$(this).css('width'),"display":"block"});
		var value = $(this).val().toLowerCase();
		if(!restricted_keys.includes(e.key) && value.length > 1){
			$(".dd-content").empty();
			$.ajax({
				url: 'https://en.wikipedia.org/w/api.php?',
				data: 'action=query&list=prefixsearch&pssearch='+value+'&format=json&callback=?',
				// url: '',
				// type: 'post',
				// data: {search:value},
				dataType: 'json',
				success:function(response){
					console.log(response.query.prefixsearch);
					response = response.query.prefixsearch;
					response.forEach(function (item, index) {
						console.log(item, index);
						var type = 'Panel-Page'
						$(".dd-content").append("<li type='"+type+" id='"+item.title+" '>"+name+"</li>");
						$("#search-result li").bind("click",function(){
							click_on_search_result(this);
						});
					});
				}
			});
		}
	});
});
function click_on_search_result(element){
	console.log("clicked on this one: " + element);
}