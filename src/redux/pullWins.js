export default function(player){

	return new Promise((good,bad)=>{

//each 'if statement' is a winning spot iteration list group

if(/0/.test(player) &&
/1/.test(player) &&
/2/.test(player)){//WIN
return good({winningSpots:[0,1,2]})
}

if(/0/.test(player) &&
/4/.test(player) &&
/8/.test(player)){//WIN
return good({winningSpots:[0,4,8]})
}	

if(/0/.test(player) &&
/3/.test(player) &&
/6/.test(player)){//WIN
return good({winningSpots:[0,3,6]})
}	


if(/1/.test(player) &&
/4/.test(player) &&
/7/.test(player)){//WIN
return good({winningSpots:[1,4,7]})
}	

if(/2/.test(player) &&
/4/.test(player) &&
/6/.test(player)){//WIN
return good({winningSpots:[2,4,6]})
}	

if(/2/.test(player) &&
/5/.test(player) &&
/8/.test(player)){//WIN
return good({winningSpots:[2,5,8]})
}	


if(/3/.test(player) &&
/4/.test(player) &&
/5/.test(player)){//WIN
return good({winningSpots:[3,4,5]})
}		


if(/6/.test(player) &&
/7/.test(player) &&
/8/.test(player)){//WIN
return good({winningSpots:[6,7,8]})
}	


else{//if there is no winning spots
	return bad(false)
}


})}