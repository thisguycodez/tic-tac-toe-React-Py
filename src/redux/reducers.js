import {NEWUSER,
NEWGAME,
SOMEONEWONGAME,
CHOICE,
PCCHOICE,
ERR} from './actions'
import antman from '../util/imgs/1.png'




const dummy = ['null','null','null','null','null','null','null','null','null']

const initialState = {
	game:window.sessionStorage.currentGame || dummy,
	icon:window.sessionStorage.icon || antman,
	userID:window.sessionStorage.userID || false,
	wins:window.sessionStorage.wins || false,
	losses:window.sessionStorage.losses || false,
	winStreak:window.sessionStorage.winStreak || false,
	isPcTurn:window.sessionStorage.pcTurn?JSON.parse(window.sessionStorage.pcTurn):false,
	err:''
}





const reducer = (state = initialState, action) =>{
		switch(action.type){

		

			case NEWUSER:
				return {
					...state,
			icon:action.payload.img,
			userID:action.payload.userID,
			wins:action.payload.wins,
			losses:action.payload.losses,
			winStreak:action.payload.winStreak,
			game:action.payload.game
	
				}


			case NEWGAME:
			return {
			...state,
			game:action.payload,
			newGameMsg:'',

			}


			case SOMEONEWONGAME:
			return {
				...state,
			game:action.payload.game,
			icon:action.payload.img,
			userID:action.payload.userID,
			wins:action.payload.wins,
			losses:action.payload.losses,
			winStreak:action.payload.winStreak,
			symbol:action.payload.symbol
			}

		
			case CHOICE:
				return {
					...state,
			game:action.payload,
			isPcTurn:true

				}

				case PCCHOICE:
				return {
					...state,
			game:action.payload,	
			isPcTurn:false
				}


				case ERR:
				return {
					...state,
			err:action.payload
				}

			default:
			return state
		}
}



export default reducer