'use strict';
let pole = document.getElementById('pole');
let palka = document.getElementById('palka');
let ball = document.getElementById('ball');
let elementToDrag = null;
let rightB =true;
let bottomB = true;
let offX;

let topPole = parseInt(window.getComputedStyle(pole).top);
let rightPole = parseInt(window.getComputedStyle(pole).width);
let bottomPole = parseInt(window.getComputedStyle(pole).height);
let leftPole =  parseInt(window.getComputedStyle(pole).left);

let sideLeft=0;
let sideRight=0;
let half = ball.offsetWidth/2;

let x=0;
let y=0;
let int = setInterval('move()', 7);
function move(){
	if(rightB && bottomB){
		x++;
		y++;
	}
	if(rightB && !bottomB){
		x++;
		y--;
	}
	if(!rightB && !bottomB){
		x--;
		y--;
	}
	if(!rightB && bottomB){
		x--;
		y++;
	}
	if(y<=topPole) bottomB = true;
	if(x<=leftPole) rightB = true;
	if(x>=(rightPole-ball.clientWidth)) rightB = false;
	if(y>=(bottomPole-ball.clientHeight) && (x<(sideLeft-half) || x>(sideRight-half))) {
		clearInterval(int);
		let but = document.createElement('button');
		but.innerHTML = 'Restart';
		but.addEventListener('click',()=>{
			document.location.reload();
		})
		document.querySelector('#restart').innerHTML = '<p style="color:red"><strong>"GAME OVER"</strong></p>';
		document.querySelector('#restart').appendChild(but);
	} 
	else if(y>=(bottomPole-ball.clientHeight-palka.offsetHeight) && (x>(sideLeft-half) && x<(sideRight-half))) bottomB = false;

	ball.style.left = x+'px';
	ball.style.top = y+'px';
}
pole.addEventListener('mousemove', (e)=>{
	e = e||event;
	let position;
	if(elementToDrag){
		position = (e.clientX - pole.getBoundingClientRect().left);
		elementToDrag.style.left = position-offX+'px';
		if(position-offX<=leftPole) elementToDrag.style.left = leftPole+'px';
		if(position-offX>=rightPole-palka.offsetWidth) elementToDrag.style.left = rightPole-palka.offsetWidth+'px';

	}
	sideLeft = parseInt(window.getComputedStyle(palka).left);
	sideRight = sideLeft+palka.offsetWidth;
})
palka.addEventListener('mousedown', (e)=>{
	e = e||event;
	if(!elementToDrag){
		elementToDrag = e.target;
		offX = e.offsetX;
	}
})
pole.addEventListener('mouseup', ()=>{
	elementToDrag = null;
})
