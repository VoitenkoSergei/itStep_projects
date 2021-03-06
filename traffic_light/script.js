'use strict';
let body = document.querySelector('body');
let element = document.getElementsByTagName('div');
let clock = document.createElement('span');
let start = document.createElement('button');
let stop = document.createElement('button');
let color = ['none','linear-gradient(to top, #424242, #000000)'];
let loop, int;
start.innerText='Start';
stop.innerText='Stop';
body.appendChild(start);
body.appendChild(stop);

function started(timeR, timeG){
	clearInterval(int)
	let time = new Date();
	let hour = time.getHours();
	let interval_1 = new Date(time.setSeconds(time.getSeconds()+timeR-2));
	let interval_2 = new Date(time.setSeconds(time.getSeconds()+2));
	let interval_3 = new Date(time.setSeconds(time.getSeconds()+timeG-4));
	let interval_4 = new Date(time.setSeconds(time.getSeconds()+4));
	function startDay(){
		let now = new Date();
		let nowHour = now.getHours();
		let nowMin = now.getMinutes();
		let nowSec = now.getSeconds();
		let msec = now.getMilliseconds();
		if(now<=interval_1){
			element[0].style.background = color[0];
			element[1].style.background = color[color.length-1];
			element[2].style.background = color[color.length-1];
		}
		else if(now>interval_1 && now<=interval_2){
			element[0].style.background = color[0];
			element[1].style.background = color[0];
			element[2].style.background = color[color.length-1];
		}
		else if(now>interval_2 && now<=interval_3){
			element[0].style.background = color[color.length-1];
			element[1].style.background = color[color.length-1];
			element[2].style.background = color[0];
		}
		else if(now>interval_3 && now<=interval_4){
			function blink(){
				element[2].style.background = color[0];
				setTimeout(()=>element[2].style.background = color[color.length-1],500);
			}
			blink();
		}
		else{
			element[0].style.background = color[color.length-1];
			element[1].style.background = color[0];
			element[2].style.background = color[color.length-1];
		}
		clock.innerHTML = check(nowHour)+':'+check(nowMin)+':'+check(nowSec);
		body.appendChild(clock);
		function check(time){
			return(time<10)?'0'+time:time;
		}
	}
	function startNigth(){
		let now = new Date();
		let msec = now.getMilliseconds();
		if(msec<500) element[1].style.background = color[0];
		else element[1].style.background = color[color.length-1];
	}
	if(hour>21 || hour<7){
		startNigth();
		int = setInterval(startNigth,500);
	}
	else{
		startDay();
		int = setInterval(startDay,1000);				
	}
}
function getTime(color){
	let time;
	do{
		time = parseInt(prompt('Enter the '+color+' time, from 15sec to 59sec ', 15));
	}
	while(time==null || isNaN(time) || time.toString().length>2 || time<15 || time>59);
	return time;
}
start.addEventListener('click',()=>{
	let red = getTime('red');
	let green = getTime('green');
	started(red, green);
	loop = setInterval(()=>started(red, green),1000*(red+green+2));
}) 
stop.addEventListener('click',()=>{
	clearInterval(loop);
	clearInterval(int);
	for(let i=0; i<element.length; i++) element[i].style.background=color[color.length-1];
})