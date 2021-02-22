import React from 'react';
import {Spinner} from 'reactstrap';


class Bspin extends React.Component{
  constructor(props){
    super(props)
    this.state={
      dropdownOpen:false,
    }
  }


render(){
  return <Spinner size='sm' color='info'/>
}
}


export default Bspin
