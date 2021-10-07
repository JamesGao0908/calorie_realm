import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import NavBar from '../../commonComponents/NavBar';
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import 'antd/dist/antd.css';
import { Calendar, Badge } from 'antd';
// import * as actionCreator from './store/actionCreator';

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
  componentDidMount(){
  }

  render(){
    const {classes} = this.props;
    if( !this.props.data.signIn.loginStatus )
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
    const dataInfo = value.format("YYYY-MM-DD");
    // console.log( value.format("YYYY-MM-DD") );
    // console.log( `${value.month()}/${value.day()}/${value.year()}` );
    let listData;
    this.props.recorders.map( (item)=>{
      // console.log( ` 比较 ${this.formatchanger(item.date)}  ${dataInfo} `  )
      if( this.formatchanger(item.date) === dataInfo ){
        // console.log( ` boya ${this.formatchanger(item.date)}  ${dataInfo} `  )
        //计算每天输入卡路里
        const totalIntake = item.calorie_A + item.calorie_B + item.calorie_C;
        const dailyWeight = item.weight;
        const tmplimitation = (this.props.limitationRecord ==='') ? (this.props.limitationDash):(this.props.limitationRecord)
        if( totalIntake > tmplimitation){
          // console.log(this.props.limitation);
          if( totalIntake <= (tmplimitation+ 500))
              listData = [{type: "warning", content : `摄入${totalIntake}卡`}, { type: "success", content: `体重 ${dailyWeight}`} ];
            else
              listData = [{type: "error", content : `摄入${totalIntake}卡`}, { type: "success", content: `体重 ${dailyWeight}`} ];
        }else{
          listData = [{type: "success", content : `摄入${totalIntake}卡`}, { type: "success", content: `体重 ${dailyWeight}`} ];
        }
        
      }
      return listData;
    })

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
  formatchanger = (e)=>{
    const a = e.substring(0,4);
    const b = e.substring(5,7);
    const c = e.substring(8,10);
    const d = a+'-'+b+'-'+c;
    return d;
  }
}

const mapState = (state)=>{
  return {
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
    }
  }
}

export default connect( mapState,mapDispatch) (withStyles(styles)(Dashboard));