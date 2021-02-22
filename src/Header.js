/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle,Spinner } from 'reactstrap';
// import antman from './util/imgs/1.png'
import {connect} from 'react-redux'
import {newUser,changeIcon} from './redux/actions'
import BabySpin from './b-spin.js'


class Header extends React.Component{
  constructor(props){
    super(props)
    this.state={
      dropdownOpen:false,
    }
    this.toggle=this.toggle.bind(this)
  }

  toggle(){ this.setState({dropdownOpen:!this.state.dropdownOpen})}

render(){
  return (
    <div className='header-btn'>
    
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
  <DropdownToggle style={{backgroundColor:'rgba(0,0,0,1)'}} caret>
        {this.state.dropdownOpen?<i className="far fa-folder-open"></i>:<i className="far fa-folder"></i>}
  </DropdownToggle>
  <DropdownMenu  style={{backgroundColor:'rgba(0,0,0,1)'}} right>
    <DropdownItem header>{this.props.userID?'User Account':'Creating Temporary Account '}</DropdownItem>

    <DropdownItem disabled><small>ICON: <code>{this.props.userID?<img className="card__img" width='20' height='20' src={this.props.icon} alt='users icon'/>:<BabySpin/>}</code></small></DropdownItem>
    <DropdownItem disabled><small>ID: <code>{this.props.userID?this.props.userID:<Spinner size='sm' color='info'/>}</code></small></DropdownItem>
    <DropdownItem disabled><small>WINS: <code>{this.props.userID?this.props.wins:<Spinner size='sm' color='info'/>}</code></small></DropdownItem>
    <DropdownItem disabled><small>LOSSES: <code>{this.props.userID?this.props.losses:<Spinner size='sm' color='info'/>}</code></small></DropdownItem>
    <DropdownItem disabled><small>WINNING STREAK: <code>{this.props.userID?this.props.winStreak:<Spinner size='sm' color='info'/>}</code></small></DropdownItem>
    <DropdownItem divider/>

    <DropdownItem style={{background:'#000'}} onClick={()=>{window.sessionStorage.clear();return this.props.newUser()}}>Fresh Start</DropdownItem>
    <DropdownItem style={{background:'#000'}}><a href='thisguycodez.com'>quit/leave</a></DropdownItem>
  </DropdownMenu>
</Dropdown>

    
    </div>
  );}
}


const mapStateToProps = state =>{
  return {
    ...state,
  }
}

export default connect(
  mapStateToProps,
  {newUser,changeIcon}
  )(Header);
