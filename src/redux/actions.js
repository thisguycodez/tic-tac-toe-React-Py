import axios from 'axios'
import {getSeparateSpots,winnersOrBoardStatus,makeMove,clearBoard} from './board-hooks.js'
import {getSpots,bestSpot,showWinner} from './pc-hooks.js'
export const NEWUSER = 'NEWUSER'
export const NEWGAME = 'NEWGAME'
export const SOMEONEWONGAME = 'SOMEONEWONGAME'
export const CHOICE = 'CHOICE'
export const PCCHOICE = 'PCCHOICE'
export const ICON = 'ICON'
export const ERR = 'ERR'

/////ddddddddddddddddddddddddddddddddddddddddddddddddddddddddd




/*every time the page loads it checks for the status of 
the user. if the storage holds a userID already then continue.
 if they dont have one then create a new temp account for game play
 	by fetching that data from the python api*/
export const newUser = () => dispatch =>{
	if(window.sessionStorage.userID){//there is a user already
	return true
	}else{//there is no user, please set up user temp account
		return axios.get(`${process.env.REACT_APP_game}/newuser`)
		.then(res=>{
			window.sessionStorage.setItem('userID',`${res.data.userID}`)
			window.sessionStorage.setItem('icon',`${res.data.img}`)
			window.sessionStorage.setItem('wins',`${res.data.wins}`)
			window.sessionStorage.setItem('losses',`${res.data.losses}`)
			window.sessionStorage.setItem('winStreak',`${res.data.winStreak}`)
			window.sessionStorage.setItem('symbol',`${res.data.symbol}`)
			window.sessionStorage.setItem('currentGame',`${res.data.currentGame}`)
			window.sessionStorage.setItem('pcTurn','false')
			res.data.game = res.data.currentGame.split(',')

			//send 'new user' to the application state
			return dispatch({type:NEWUSER,payload:res.data})
		})
		.catch(err=>{

// stop
return false
		})
	}
	
}





//change to another random icon if user pleases to.
export const changeIcon = () => dispatch =>{

		if(window.sessionStorage.icon && window.sessionStorage.userID){
				return axios.post(`${process.env.REACT_APP_game}/newIcon/${window.sessionStorage.userID}`)
			.then(res=>{
				window.sessionStorage.setItem('userID',`${res.data.userID}`)
			window.sessionStorage.setItem('icon',`${res.data.img}`)
			window.sessionStorage.setItem('wins',`${res.data.wins}`)
			window.sessionStorage.setItem('losses',`${res.data.losses}`)
			window.sessionStorage.setItem('winStreak',`${res.data.winStreak}`)
			
			res.data.game = res.data.currentGame.split(',')
				return dispatch({type:NEWUSER,payload:res.data})
			})

			.catch(err=>{

// stop
return false
			})
		}else{
			alert('You are not using a rostered account, please refresh your page or click "Fresh Game".')
		}

	
}


//runs everytime a game is won
//triggere by lifecycle 'componentDidUpdate()'
export const saveGame = () => dispatch =>{

const game2save = {
userID :window.sessionStorage.userID,
wins: window.sessionStorage.wins,
losses: window.sessionStorage.losses,
winStreak :window.sessionStorage.winStreak,
symbol :window.sessionStorage.symbol
}


			return axios.post(`${process.env.REACT_APP_game}/save/${game2save.userID}`,game2save)
			.then(res=>{
					window.sessionStorage.setItem('userID',`${res.data.userID}`)
			window.sessionStorage.setItem('icon',`${res.data.img}`)
			window.sessionStorage.setItem('wins',`${res.data.wins}`)
			window.sessionStorage.setItem('losses',`${res.data.losses}`)
			window.sessionStorage.setItem('winStreak',`${res.data.winStreak}`)
			
			
				res.data.game = res.data.currentGame.split(',')
				return dispatch({type:NEWUSER,payload:res.data})
			})


			.catch(err=>{

// stop
return false
			})
}


/*major actions block below for client and pc's actions on the game. every move made it will follow the steps....

1.)check to see if the spot is open or not. place symbol if so or inform user
			{if it === null or not}

2.)check all spaces and separate the iteration(symbol iteration values) of each space based on who put the symbol there.
		{checking between true or false then compare to users 'symbol'}

3.)if there are no spaces left then clear board and no one wins, else ignore
			{no nulls at all}

3.5) if it is the pc making this move then run throuh the 'bestSpot' algorithim to find winning spots if any.


4.) if step 3 is ignored then continue
			{return clearBoard() or nothing allowing next functions 2 run}

5.)if any of the separate symbol iteration values hold a group winning numbers
clear board,check who the winner is, and update users status(api)
	{who's symbol matches?, clear board, update status with api call}

*/



/*
################################################################################################################################
################################################################################################################################
################################################################################################################################
########################################################PC'S ACTIONS##########################################################
################################################################################################################################
################################################################################################################################
*/
// SAVING EVERYTHING IN SESSION STORAGE
export const pcTurn = () => dispatch =>{
	//get board and the pc symbol
 let board = window.sessionStorage.currentGame.split(',')
 let symbol = JSON.parse(window.sessionStorage.symbol)?'false':'true'
return getSpots(board,symbol).then(async res=>{//grabbing spots that are open and taken from pc



		return bestSpot(res).then(async res_=>{//the next best spot to choose for pc
			let numberSpot = res_;
			if(window.sessionStorage.winningShot){
				numberSpot = Number(window.sessionStorage.winningShot)
			}

	return makeMove(numberSpot,symbol).then(async res__=>{//making the move was a success
		window.sessionStorage.removeItem('winningShot')
		if(res__.bool){
				//separate the spots on the board
return getSeparateSpots().then(res=>{

const obj = res
//checking for winners by passing in each
// users spots taken or if board is full
//then clear it
return winnersOrBoardStatus(obj).then(async res_=>{
		
		return showWinner(res_).then(async done=>{
		if(done.bool){//if the pc won then display this
		 done.img = window.sessionStorage.icon
		 dispatch({type:SOMEONEWONGAME,payload:done})
			//the entire pc move is done so its the clients turn and not the pc's turn
			window.sessionStorage.setItem('pcTurn','false')
		setTimeout(async ()=>{
			return clearBoard().then(async cleared=>{
				 dispatch({type:NEWGAME,payload:window.sessionStorage.currentGame.split(',')})
			})
		},2000)
		}
		else{
			//the entire pc move is done so its the clients turn and not the pc's turn
			//also caused from stale mates
			window.sessionStorage.setItem('pcTurn','false')
			if(!/null/.test(window.sessionStorage.currentGame)){
					return clearBoard().then(async cleared=>{
				 dispatch({type:PCCHOICE,payload:window.sessionStorage.currentGame.split(',')})
			})
				}
				return dispatch({type:PCCHOICE,payload:window.sessionStorage.currentGame.split(',')})
		}



	//the entire pc move is done so its the clients turn and not the pc's turn
			window.sessionStorage.setItem('pcTurn','false')


		})

})
.catch(err=>{
// stop
return false
})
})
		}else{
			 return clearBoard().then(async cleared=>{
		window.sessionStorage.setItem('pcTurn','false')
			})
		}
				

	})
	.catch(err=>{//error on choosing a spot(either its taken or board is full)
		if(err.bool){
		//separate the spots on the board
return getSeparateSpots().then(res=>{

const obj = res
//checking for winners by passing in each
// users spots taken or if board is full
//then clear it
return winnersOrBoardStatus(obj).then(res_=>{
return showWinner(res_).then(done=>{
		 done.img = window.sessionStorage.icon
		if(done.bool){
		 dispatch({type:SOMEONEWONGAME,payload:done})
		setTimeout(async ()=>{
			return clearBoard().then(cleared=>{
			window.sessionStorage.setItem('pcTurn','false')
				 dispatch({type:NEWGAME,payload:window.sessionStorage.currentGame.split(',')})
			})
		},2000)
		}
		else{
			window.sessionStorage.setItem('pcTurn','false')
				if(!/null/.test(window.sessionStorage.currentGame)){
					return clearBoard().then(cleared=>{
			window.sessionStorage.setItem('pcTurn','false')
				 dispatch({type:PCCHOICE,payload:window.sessionStorage.currentGame.split(',')})
			})
				}
				return dispatch({type:PCCHOICE,payload:window.sessionStorage.currentGame.split(',')})
		}
		})
})
.catch(err=>{
// stop
return false
})
})
		}else{
			 return clearBoard().then(cleared=>{
			window.sessionStorage.setItem('pcTurn','false')
				 dispatch({type:PCCHOICE,payload:window.sessionStorage.currentGame.split(',')})
})
		}
	})
			

		})








})

} 


























/*
################################################################################################################################
################################################################################################################################
################################################################################################################################
########################################################CLIENT ACTIONS##########################################################
################################################################################################################################
################################################################################################################################
*/
export const spotChoice = (i) => dispatch =>{

	//spot chosen from user is 'i' in this case
	//clients symbol
 let symbol = window.sessionStorage.symbol


//checking who's turn is it anyway
if(window.sessionStorage.pcTurn){//on going game
if(JSON.parse(window.sessionStorage.pcTurn)){//is it pc's turn to go?
	//we return false because at the end of the clients 
	//move we will be allowing pc to go its self 
	return false
	}//pc's turn
	else{//clients turn
			return makeMove(i,symbol).then(async res__=>{
		dispatch({type:CHOICE,payload:window.sessionStorage.currentGame.split(',')})
			
//separate the spots on the board
return getSeparateSpots().then(res=>{

const obj = res
//checking for winners by passing in each
// users spots taken or if board is full
//then clear it
return winnersOrBoardStatus(obj).then(async res_=>{
	return showWinner(res_).then(done=>{
		if(done.bool){
		 done.img = window.sessionStorage.icon
		 dispatch({type:SOMEONEWONGAME,payload:done})
		setTimeout(async ()=>{
			return clearBoard().then(async cleared=>{
	window.sessionStorage.setItem('pcTurn','true')
				 dispatch({type:NEWGAME,payload:window.sessionStorage.currentGame.split(',')})
			})
		},2000)
		}
		else{
			window.sessionStorage.setItem('pcTurn','true')
				if(!/null/.test(window.sessionStorage.currentGame)){
					return clearBoard().then(async cleared=>{
	window.sessionStorage.setItem('pcTurn','true')
				 dispatch({type:CHOICE,payload:window.sessionStorage.currentGame.split(',')})
			})
				}
				return dispatch({type:CHOICE,payload:window.sessionStorage.currentGame.split(',')})
		}
				 })

})
.catch(err=>{
// stop
return false
})
})
			})

			.catch(err=>{
				if(!/null/.test(window.sessionStorage.currentGame)){
					return clearBoard().then(cleared=>{
	window.sessionStorage.setItem('pcTurn','true')
				 dispatch({type:CHOICE,payload:window.sessionStorage.currentGame.split(',')})
			})
				}
				
			})
	}
}
	else{//game is fresh and just started
			return makeMove(i,symbol).then(async res__=>{
		dispatch({type:CHOICE,payload:window.sessionStorage.currentGame.split(',')})
		//separate the spots on the board
return getSeparateSpots().then(res=>{

const obj = res
//checking for winners by passing in each
// users spots taken or if board is full
//then clear it
return winnersOrBoardStatus(obj).then(async res_=>{
return showWinner(res_).then(done=>{
		if(done.bool){
		 done.img = window.sessionStorage.icon
		 dispatch({type:SOMEONEWONGAME,payload:done})
		setTimeout(async ()=>{
			return clearBoard().then(cleared=>{
	window.sessionStorage.setItem('pcTurn','true')
				 dispatch({type:NEWGAME,payload:window.sessionStorage.currentGame.split(',')})
			})
		},2000)
		}
		else{
			window.sessionStorage.setItem('pcTurn','true')
				if(!/null/.test(window.sessionStorage.currentGame)){
					return clearBoard().then(cleared=>{
	window.sessionStorage.setItem('pcTurn','true')
				 dispatch({type:CHOICE,payload:window.sessionStorage.currentGame.split(',')})
			})
				}
				return dispatch({type:CHOICE,payload:window.sessionStorage.currentGame.split(',')})
		}
				 })

})
.catch(err=>{
// stop
return false
})
})	

			})
			.catch(err=>{
				 return clearBoard().then(cleared=>{
	window.sessionStorage.setItem('pcTurn','true')
				 dispatch({type:CHOICE,payload:window.sessionStorage.currentGame.split(',')})
			})
			})
	}




}





