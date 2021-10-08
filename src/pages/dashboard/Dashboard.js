import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import NavBar from '../../commonComponents/NavBar';
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import 'antd/dist/antd.css';
import { Calendar, Badge } from 'antd';
// import * as actionCreator from './store/actionCreator';

import * as signIn_actionCreator from '../sign-in-side/store/actionCreator';

const styles = theme=>({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
});
class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state={
      data: '',
      recorders : '',
    }
  }

  componentWillUnmount(){
    this.props.handleTestLogin();
  }

  componentDidMount(){
  }

  render(){
    const {classes} = this.props;
    if( !this.props.loginStatus )
    {
      return <Redirect to='/' />
    }
    else{
      return (
        <div className={classes.root}>
          <CssBaseline />
          <NavBar />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {/* onPanelChange={onPanelChange}  monthCellRender={monthCellRender}   */}
            <div> <Calendar style={{'margin': '20px 30px'}} dateCellRender={this.dateCellRender} /> </div>
          </main>
        </div>
      );
    }
  }

  getListData = (value)=> {
    let listData;
    try{
      this.props.userData.recorders.map( (item)=>{
        const a = new Date(parseInt(item.date.$date.$numberLong));
        const newDate = a.toISOString().split('T')[0];
        if( value.format("YYYY-MM-DD") === newDate ){
          listData = [{type: "success", content : `intake ${item.calorieIntake} cal`}, { type: "success", content: `${item.weight} kg`} ];
        }
        return listData
      });
    }
    catch{
      
    }
    return listData || [];
  }
  dateCellRender = (value)=> {
    const listData = this.getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }
}

const mapState = (state)=>{
  return {
    userData: state.get('signIn').get('userInfo'),
    loginStatus: state.get('signIn').get('loginStatus'),

    data: state.toJS(),
    recorders : state.toJS().dashboard.recorders,
    limitationRecord: state.toJS().dashboard.dailyLimitation,
    limitationDash: state.toJS().dashboard.dailyLimitation,
  }
}
const mapDispatch = (dispatch) => {
  return {
    handleLoadDashboardInfo(e){
      // dispatch( actionCreator.loadRecorder(e) ) 
    },
    handleLoadDailyLimitation(e){
      // dispatch( actionCreator.loadDailyLimitation(e) )
    },
    // 测试用
    handleTestLogin(){
      dispatch( signIn_actionCreator.login('jamesgao0908@gmail.com','1q2w3e') )
    }
  }
}

export default connect( mapState,mapDispatch)(withStyles(styles)(Dashboard));