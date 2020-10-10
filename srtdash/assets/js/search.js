$(document).ready(function(){
	$("#inputFocus").on("keyup", function(e) {
		var value = $(this).val().toLowerCase();
		console.log(checkInputChanged(value));
		if(checkInput(e.key,value)){
			console.log("SENDING REQUEST");
			$.ajax({
				url: 'https://en.wikipedia.org/w/api.php?',
				data: 'action=query&list=prefixsearch&pssearch='+value+'&format=json&callback=?',
				// url: '',
				// type: 'post',
				// data: {search:value},
				dataType: 'json',
				success:function(response) {
					response = response.query.prefixsearch;
					if (response.length > 0) {
						$("#search-results").empty();
						$("#search-results-package").css({"width": $("#inputFocus").css('width'), "display": "block"});
						$("#search-results").css({"height": parseInt($("#search-results-package").css('height'))-parseInt($(".search-category-box").css('height'))-10});
						$(".slimScrollDiv").css({"height": parseInt($("#search-results-package").css('height'))-parseInt($(".search-category-box").css('height'))-10});
						response.forEach(function (item, index) {
							console.log(item, index);
							var type = 'Panel-Page'
							$("#search-results").append("<li type='" + type + " id='" + item.title + " '>" + item.title + "</li>");
							$("#search-result li").bind("click", function () {
								click_on_search_result(this);
							});
						});
					}else{
						$("#search-results-package").css({"display": "none"});
					}
				}
			});
		}else {
		}
		last_input_length = value.length;
	});
});

// ======================== Search Utils ==============================

$(".search-input-field .clear").on('click', function () {
	$("#inputFocus").val("");
	$("#search-results-package").empty();
	$("#search-results-package").css({"display": "none"});
	$(".search-input-field .clear").css({"display": "none"});
	last_input_length = 0;
});
$("#inputFocus").on("blur", function(){
	$("#search-results-package").css({"display": "none"});
});
$("#inputFocus").on("focus", function(){
	if (!$("#search-results-package").is(':empty'))
		$("#search-results-package").css({"width": $("#inputFocus").css('width'), "display": "block"});
});
function checkInput(char,str){
	if (checkInputChanged(str)) {
		str.length > 0 ? $(".search-input-field .clear").css({"display": "flex"}) : $(".search-input-field .clear").css({"display": "none"});
		if (str.length < 1) {
			$("#search-results-package").css({"display": "none"});
		}
	}
	var restricted_keys = ['Control', 'Alt', 'Shift'];
	if(!restricted_keys.includes(char) && str.trim().length > 1 && (checkInputChanged(str)|| char=="Enter"))
		return true;
	return false;
}
var last_input_length = 0;
function checkInputChanged(input) {
	return last_input_length != input.length;
}

// ======================== End Search Utils ==============================
// ======================== OnClick Search Items ==============================

function click_on_search_result(element){
	console.log("clicked on this one: " + element);
}

// ======================== End OnClick Search Items ==============================
// ======================== Search Category ==============================

$(".search-category").on("click", function(){
		$(".search-category.active").toggleClass("active");
		$(this).addClass("active");
});

// ======================== End Search Category ==============================
