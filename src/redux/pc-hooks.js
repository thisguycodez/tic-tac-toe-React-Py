import pullWins from './pullWins'

export const getSpots = (board,sym) =>{
	return new Promise(async (good,bad)=>{

		//array of empty open spots on the board
		let empty = []
		//array of pc's chosen spots on the board
		let pcSpots = []
		//loop through the board to gather these values
	board.forEach((spot,i)=>{
		
		//if spot is empty
		if(spot==='null'){empty.push(i)}
		
		//if pc has chosen this spot this game already
		if(spot===sym){pcSpots.push(i)}
	})

	return good({empty,pcSpots})

		
	})	
}




export const bestSpot = async (obj) =>{
	const {empty,pcSpots} = obj

		return new Promise(async (good,bad)=>{

		let pcFinalChoice = empty[Math.floor(Math.random() * empty.length)];

	if(pcSpots.length<1){//if pc has not chosen anythin then pick a random spot
		return good(pcFinalChoice)
	}

/*CREATE AN ALGORITHIM TO CHOSE THE BEST CHOICE 
FOR A SPOT SO THE PC IS NOT TOO LAME*/
		
		//scheme to see if theres a wining spot open
	
		//pc spot choice is a random pick for 
		//now incase we can find a winning spot

			console.log('start ',pcFinalChoice)


		empty.forEach(async (x)=>{//check if each number will be a winning choice
					 pullWins([...pcSpots,x].toString()).then(async res=>{//will pc win with this choice??
					pcFinalChoice = await x
					window.sessionStorage.setItem('winningShot',`${x}`)
					})
		
					.catch(err=>{//there is no winning spot with the # we tried
					//no issue there is just no wins in the player chosen list
					return true
					//continue
					})
		
		
		
				})
			console.log('done ',pcFinalChoice)
			if(window.sessionStorage.winningShot){
			return good(Number(window.sessionStorage.winningShot))
			}else{
			return good(Number(pcFinalChoice))				
			}

		})
}



//sets up the board to show who the winner is 
//if there is a winner. if not then return false in a resolved method
//because its not a error that there are no winning spots taken
//just means its a tough game lol
export const showWinner = async ({winningSpots}) =>{
	return new Promise(async (good,bad)=>{
		let cliSymbol = window.sessionStorage.symbol
		let pcSymbol = window.sessionStorage.symbol
		let game = await window.sessionStorage.currentGame.split(',')
		let winner=false;	
				if(!winningSpots){
					return good({bool:false})
				}else{
					winningSpots.forEach(spot=>{//set each winning spot to 'won' or 'lost'
		if(game[spot]===cliSymbol){
			game[spot] ='won'
			winner = true
		}else{
			game[spot] ='lost'
		}
			})


					//save current updated state due to the status of the ending game and send the update to the app state
			window.sessionStorage.setItem('currentGame',game.join(','))
			window.sessionStorage.setItem('wins',`${winner?(Number(window.sessionStorage.wins)+ 1):window.sessionStorage.wins}`)
			window.sessionStorage.setItem('losses',`${!winner?(Number(window.sessionStorage.losses)+ 1):window.sessionStorage.losses}`)
			window.sessionStorage.setItem('winStreak',`${winner?(Number(window.sessionStorage.winStreak)+ 1):0}`)
			window.sessionStorage.setItem('symbol',winner?cliSymbol:pcSymbol)
			
		return good({
			bool:true,
			game:window.sessionStorage.currentGame.split(','),
			icon:window.sessionStorage.icon,
			userID:window.sessionStorage.userID,
			wins:window.sessionStorage.wins,
			losses:window.sessionStorage.losses,
			winStreak:window.sessionStorage.winStreak,
			symbol:window.sessionStorage.symbol
		})
				}
		})
	}
