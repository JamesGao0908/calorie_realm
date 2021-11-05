import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import NavBar from '../../commonComponents/NavBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { MainGraphies } from './style';

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

class Graphies extends React.Component {

  constructor(props){
    super(props);
    this.state={ list:[] }
  }

  componentDidMount(){
    try {
      const tmpList = [];
      this.props.data.forEach(each=>{
        tmpList.push({
          date:new Date(parseInt(each.date.$date.$numberLong)).toISOString().substring(0,10),
          weight:each.weight,
          calorieIntake:each.calorieIntake,
        })
      });
      this.setState({list:tmpList})
    }catch(err){
      console.log(err)
    }
  }

  render(){
    const {classes} = this.props;
    // console.log(this.state.list)
    if( !this.props.loginStatus )
    {
      return <Redirect to='/' />
    }else{
      return  <>
        <div className={classes.root}>
          <CssBaseline />
          <NavBar />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {/* onPanelChange={onPanelChange}  monthCellRender={monthCellRender}   */}
            <MainGraphies> 
              <h1>Graphies</h1>
              <ResponsiveContainer width='100%' height={350}>
                <AreaChart data={this.state.list}>
                  <defs>
                    <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='0%' stopColor='#2451B7' stopOpacity={0.4} ></stop>
                      <stop offset='75%' stopColor='#2451B7' stopOpacity={0.05} ></stop>
                    </linearGradient>
                  </defs>
                  <Area dataKey='weight' stroke='#2451B7' fill='url(#color)' />
                  <XAxis dataKey='date' />
                  <YAxis dataKey='weight' axisLine={false} tickLine={false} tickCount={8} tickFormatter={number=>`${number.toFixed(2)} Kg`}/>
                  <Tooltip />
                  <CartesianGrid opacity={0.5} vertical={false} />
                </AreaChart>
              </ResponsiveContainer>
            </MainGraphies>
          </main>
        </div>
      </>
    }
  }
}

const mapState = (state)=>{
  return {
    data: state.get('signIn').get('userInfo').recorders,
    loginStatus: state.get('signIn').get('loginStatus'),
  }
}
const mapDispatch = (dispatch) => {
  return {
  }
}
export default connect( mapState,mapDispatch)(withStyles(styles)(Graphies));