import React from 'react';
import './util/styles/css/App.css';
import './util/styles/sass/tttBlock.scss';
import Header from './Header'
import {Container} from 'reactstrap';
import Board from './Board'
import {connect} from 'react-redux'
import {newUser,saveGame} from './redux/actions'
import pcp from './util/imgs/pc.png'


class App extends React.Component{
  constructor(props){
    super(props)
    this.state={

    }  
  }



  componentDidMount(){
    this.props.newUser()
    const cards = document.querySelector(".cards");
const images = document.querySelectorAll(".card__img");
const backgrounds = document.querySelectorAll(".card__bg");
const range = 40;

// const calcValue = (a, b) => (((a * 100) / b) * (range / 100) -(range / 2)).toFixed(1);
const calcValue = (a, b) => (a / b * range - range / 2).toFixed(1);

let timeout;
document.addEventListener('mousemove', ({ x, y }) => {
  if (timeout) {
    window.cancelAnimationFrame(timeout);
  }

  timeout = window.requestAnimationFrame(() => {
    const yValue = calcValue(y, window.innerHeight);
    const xValue = calcValue(x, window.innerWidth);

    cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;

    [].forEach.call(images, image => {
      image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
    });

    [].forEach.call(backgrounds, background => {
      background.style.backgroundPosition = `${xValue * .45}px ${-yValue * .45}px`;
    });
  });
}, false);
  }


componentDidUpdate(){
  if(/won/.test(this.props.game.toString()) || /lost/.test(this.props.game.toString())){
    return this.props.saveGame()
  }
}

  render(){
  return (
    <div className="App">
    <Header/>
    <Container className='game container-fluid'>
     <div className="cards">
     <small className='pcMsg'>PC is {this.props.isPcTurn?'thinking':'waiting'}<br/>
     <div className="container dots">
     <img src={pcp} width='20' height='20' alt='pc player'/>
     {!this.props.isPcTurn?'':(<div>
       <div className="yellow"></div>
       <div className="red"></div>
       <div className="blue"></div>
       <div className="violet"></div>
       </div>)}
</div></small>
  <h3>User-ID : <small>{this.props.userID}</small></h3>
  <nav className=' score'>
  <small><code>wins: {this.props.wins}</code></small><br/>
  <small><code>losses: {this.props.losses}</code></small>
  </nav>
  <div className="card card__one">
    <div className="card__bg"></div>
    <img className="card__img" src={this.props.icon} alt='Users icon'/>
    <div className="card__content">
      <Board/>
    </div>
  </div>
</div>
    </Container>
      </div>
  );
  }
}

const mapStateToProps = state =>{
  return {
    icon:state.icon,
    userID:state.userID,
    wins:state.wins,
    losses:state.losses,
    game:state.game,
    isPcTurn:state.isPcTurn
  }
}

export default connect(
  mapStateToProps,
  {newUser,saveGame}
  )(App);
