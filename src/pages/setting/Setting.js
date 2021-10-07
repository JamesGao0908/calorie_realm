import React from 'react';
import { connect } from 'react-redux';

class Setting extends React.Component {
  render(){
    return <h1>Setting</h1>

  }
}

const mapState = (state)=>{
  return { 
  }
}
const mapDispatch = (dispatch) => {
  return {
  }
}
export default connect( mapState,mapDispatch)(Setting);