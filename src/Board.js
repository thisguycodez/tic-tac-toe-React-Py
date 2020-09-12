import React from 'react';
// import {Container} from 'reactstrap';
import x from './util/imgs/x.png'
import o from './util/imgs/o.png'
import won from './util/imgs/won.png'
import lost from './util/imgs/lost.png'
import {connect} from 'react-redux'
import {spotChoice,pcTurn} from './redux/actions'


class Board extends React.Component{
  constructor(props){
    super(props)
    this.state={

    }  
  }
componentDidUpdate(){
  if(window.sessionStorage.pcTurn){
  if(JSON.parse(window.sessionStorage.pcTurn)){
        return setTimeout(()=>{return this.props.pcTurn()},2000)
    }
  }
}


  render(){
  return (
    <div className="tic-tac-toe-board">

    {
      typeof this.props.game === 'string'?
      this.props.game.split(',').map((bool,i)=>{
          return (

      <div className={`block spot${i}`} key={i} onClick={()=>{this.props.spotChoice(i);}}>
      {bool==='true'?(
        <img src={o} width='30' height='30' alt='x or o spot'/>
        ):bool==='null'?'':bool==='won'?
      (
<img src={won} width='30' height='30' alt='x or o spot'/>
        ):
      bool==='lost'?
       (
<img src={lost} width='30' height='30' alt='x or o spot'/>
        ):(
<img src={x} width='30' height='30' alt='x or o spot'/>
        )}


      </div>

            )
      }):

      this.props.game.map((bool,i)=>{
          return (

      <div className={`block spot${i}`} key={i} onClick={()=>{this.props.spotChoice(i);}}>
      {bool==='true'?(
        <img src={o} width='30' height='30' alt='x or o spot'/>
        ):bool==='null'?'':bool==='won'?
      (
<img src={won} width='30' height='30' alt='x or o spot'/>
        ):
      bool==='lost'?
       (
<img src={lost} width='30' height='30' alt='x or o spot'/>
        ):(
<img src={x} width='30' height='30' alt='x or o spot'/>
        )}


      </div>

            )
      })
    }

      </div>
  );
  }
}

const mapStateToProps = state =>{
  return {
    game:state.game,
    icon:state.icon
  }
}

export default connect(
  mapStateToProps,
  {spotChoice,pcTurn}
    )(Board)
  
