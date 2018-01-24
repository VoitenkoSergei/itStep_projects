(function(){
	var elemImg = document.querySelectorAll('main > img');
	var pageElemImg = document.querySelectorAll('main > div > img');
	for(var i=0; i<elemImg.length; i++){
		elemImg[i].onclick = function(e){
			var target = e.target;
			target.classList.toggle('large');
		}
		elemImg[i].onmouseout = function(e){
			var target = e.target;
			target.classList.remove('large');
		}
	}
	for(var i=0; i<pageElemImg.length; i++){
		pageElemImg[i].onclick = function(e){
			var target = e.target;
			target.classList.toggle('sub');
		}
		pageElemImg[i].onmouseout = function(e){
			var target = e.target;
			target.classList.remove('sub');
		}
	}
})();