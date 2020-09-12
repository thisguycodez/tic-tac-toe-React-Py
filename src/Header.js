/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
// import antman from './util/imgs/1.png'
import {connect} from 'react-redux'
import {newUser,changeIcon} from './redux/actions'

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
    <DropdownItem header>User Status</DropdownItem>

    <DropdownItem disabled><small>ICON: <code><img className="card__img" width='20' height='20' src={this.props.icon} alt='users icon'/></code></small></DropdownItem>
    <DropdownItem disabled><small>ID: <code>{this.props.userID}</code></small></DropdownItem>
    <DropdownItem disabled><small>WINS: <code>{this.props.wins}</code></small></DropdownItem>
    <DropdownItem disabled><small>LOSSES: <code>{this.props.losses}</code></small></DropdownItem>
    <DropdownItem disabled><small>WINNING STREAK: <code>{this.props.winStreak}</code></small></DropdownItem>
    <DropdownItem divider/>

    <DropdownItem onClick={()=>{window.sessionStorage.clear();return this.props.newUser()}}>Fresh Start</DropdownItem>
    <DropdownItem><a href='https://guytonoriji.site/'>quit/leave</a></DropdownItem>
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
