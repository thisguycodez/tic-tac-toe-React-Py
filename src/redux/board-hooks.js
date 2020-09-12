import pullWins from './pullWins'



//separating the spots from whomever place them there and spots taken is documented period
export const getSeparateSpots = async () =>{
	let board = window.sessionStorage.currentGame.split(',')
	let symbol = window.sessionStorage.symbol
	let pcSym = JSON.parse(symbol)?'false':'true'
	return new Promise(async (good,bad)=>{
		//seperating the players spots chosen and keeping track of spots taken also
		let playerClient = []
		let playerPC = []
		let spotsTaken = []

		//checking each spot to check its status (taking by player Client or PC or empty)
		board.forEach((spot,i)=>{
			if(spot===symbol){//clients spot
				playerClient.push(i)
			}
			if(spot===pcSym){//pc's spot
				playerPC.push(i)
			}
			if(spot!=='null'){//spots taken
				spotsTaken.push(i)
			}

		})//end of loop


//end it of by sending these values back as an obj
return good({
playerClient:playerClient,
playerPC:playerPC,
spotsTaken:spotsTaken
})

	})//end of Promise
}//end of checkBoard



export const clearBoard = () =>{
	return new Promise((good,bad)=>{
window.sessionStorage.setItem('currentGame',"null,null,null,null,null,null,null,null,null")
return good(true)
	})
} 




//checking the game board for winnings or reasons to clear board
export const winnersOrBoardStatus = async (obj) =>{
	const {playerClient,playerPC} = obj
		return new Promise(async (good,bad)=>{
			if(!JSON.parse(window.sessionStorage.pcTurn)){//clients turn so check he/she first
				return pullWins(playerClient.toString()).then(res=>{
				setTimeout(()=>{
				clearBoard()
				},2000)
				return good(res)
			})
			.catch(err=>{//if there is no winning rows taken continue
				//no issue here this just returns false as error when there are no wins
				return good(err)
			})	
			}else if(JSON.parse(window.sessionStorage.pcTurn)){//pc's turn so we will check wins for it first
				return pullWins(playerPC.toString()).then(res=>{
				setTimeout(()=>{
				clearBoard()
				},2000)
				return good(res)
			})
			.catch(err=>{//if there is no winning rows taken continue
				//no issue here this just returns false as error when there are no wins
				return good(err)
			})
			}//no won has won yet, see if board needs to be cleared anyway
				if(!/null/.test(window.sessionStorage.currentGame))
				clearBoard()
				//nothing is wrong there is just no wins right now so return true (no panic)
				return good(true)
		})
	
}







export const makeMove=(i,symbol)=>{//making the move
///get board and users symbol(X or O) from storage
	let newBoard = window.sessionStorage.currentGame.split(',')
return new Promise((good,bad)=>{

//if spot is open then its ok to claim it
if(newBoard[i]==='null'){

newBoard[i] = symbol


//save new board
window.sessionStorage.setItem('currentGame',`${newBoard}`)

	return good({bool:true})

}else{
	//if board is full send error to clear it
	if(!/null/.test(window.sessionStorage.currentGame)){
	return bad({bool:false,msg:'clear board'})

	}else{
	return bad({bool:true})
	}
}

})


}