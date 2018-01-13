(function(){
	var block = document.querySelector('.head-two');
	var el = document.querySelector('h1');
	block.onmouseover=function(){
		el.classList.add('rubberBand');
	}
	block.onmouseout=function(){
		el.classList.remove('rubberBand');
	}
	window.onscroll = function() {
		var li = document.querySelectorAll('nav>ul>li')
		var scrolled = window.pageYOffset || document.documentElement.scrollTop;
		for(var i=0; i<li.length; i++){
			li[i].classList.remove('active');
			if (scrolled <= 360){
				li[0].classList.add('active');
			}
			else if(scrolled > 360 && scrolled <= 700){
				li[1].classList.add('active');
			}
			else if(scrolled > 700 && scrolled <= 1100){
				li[2].classList.add('active');
			}
			else if(scrolled > 1100 && scrolled <= 1700){
				li[3].classList.add('active');
			}
			else if(scrolled > 1700 && scrolled <= 2200){
				li[4].classList.add('active');
			}
			else if(scrolled > 2200 && scrolled <= 2800){
				li[5].classList.add('active');
			}
			else{
				li[6].classList.add('active');
			}
		}
	}
})();