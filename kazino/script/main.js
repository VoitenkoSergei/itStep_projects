(function (){
	'use strict';
	let money = document.getElementById('money');
	let count = money.innerText*1;
	let stavka = document.querySelector('#stavka input[name="number"]');
	let btn = document.getElementById('btn');
	let prize = document.getElementById('prize');
	let result = 0;

	function getNumber(len, min=0, max=6){
		let arrIndex =[];
		let num;
		for(let i=0; i<len; i++){
			num = Math.round(Math.random()*(max-min)+min);
			arrIndex.push(num);
		}
		getImages(arrIndex)
	}
	function getImages(index){
		let arrImg = ['fish','octopus','pearl','shark','shell','star-magenta','star-red'];
		let date = new Date();
		document.getElementById('f1').src='./images/'+arrImg[index[0]]+'.gif';
		document.getElementById('f2').src='./images/'+arrImg[index[1]]+'.gif';
		document.getElementById('f3').src='./images/'+arrImg[index[2]]+'.gif';

		let countImg = 0;
		for(let i=0; i<index.length; i++){
			if(index[i]==arrImg.length-1 || index[i]==arrImg.length-2)
				countImg++;
		}
		switch(countImg){
			case 1: result=stavka.value*2;
			break;
			case 2: result=stavka.value*5;
			break;
			case 3: result=stavka.value*10;
			break;
			default: result=0;
			break;
		}
		if(index[0]==0&&index[1]==0&&index[2]==0)result=stavka.value*40;
		if(index[0]==1&&index[1]==1&&index[2]==1)result=stavka.value*80;
		if(index[0]==2&&index[1]==2&&index[2]==2)result=stavka.value*800;
		if(index[0]==3&&index[1]==3&&index[2]==3)result=stavka.value*200;
		if(index[0]==4&&index[1]==4&&index[2]==4)result=stavka.value*20;
		prize.innerHTML = result;
		(result>0)?money.innerHTML=(count-stavka.value*1)+result:money.innerHTML=count-stavka.value*1;
		count=money.innerText*1;
		stavka.setAttribute('max',count);
		stavka.value = 0;
		if(money.innerHTML==0)prize.innerHTML="<small>Вы проиграли</small>";
		setCookie('Kazino', money.innerHTML, 7);
		setCookie('lastSession', date, 7);
	}
	function setCookie(name, valCook, expDay=0){
		let strCook = name+'='+escape(valCook)+';';
		if(expDay!=0){
			let date = new Date();
			date.setDate(date.getDate()+expDay);
			strCook+='expires='+date.toUTCString()+';'
		}
		document.cookie = strCook;
	}
	function getCookie(name){
		let cookieVal = document.cookie;
		let reg = new RegExp('\\b'+name+'\\b');
		let startPos = cookieVal.search(reg);
		if(startPos==-1) cookieVal=null;
		else{
			let start = cookieVal.indexOf('=',startPos)+1;
			let end = cookieVal.indexOf(';',startPos);
			if(end==-1) end = cookieVal.length;
			cookieVal = unescape(cookieVal.substring(start,end));
		}
		return cookieVal;
	}

	btn.addEventListener('click', ()=>{
		(stavka.value>0)?getNumber(3):prize.innerHTML="<small>Сделайте ставку</small>";
		prize.style.color = 'red';
	});

	stavka.addEventListener('change',()=>{
		if(stavka.value*1>count){
			prize.innerHTML="<small>Мало денег</small>";
			btn.disabled = true;
			btn.style.background = 'gray';
		}
		else {
			prize.innerHTML = 0;
			btn.disabled = false;
			btn.style.background = '';
		}
		if(stavka.value<0) stavka.value=0;
		money.innerHTML = count-stavka.value*1;
	})
	let resultCookie = getCookie('Kazino');
	if(resultCookie!=null){
		money.innerHTML = resultCookie;
		count = money.innerText*1;
		let time = getCookie('lastSession');
		let lastSes = document.getElementById('sessions');
		lastSes.innerHTML = '<p>Last Session: '+time.slice(0,-15)+'</p>'
	}
})();

