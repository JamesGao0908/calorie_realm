import React from 'react';
import { connect } from 'react-redux';
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

class Graphies extends React.Component {
  constructor(props){
    super(props);
    this.state={ list:[] }
  }

  componentDidMount(){
    const tmpList = [];
    this.props.data.forEach(each=>{
      tmpList.push({
        date:new Date(parseInt(each.date.$date.$numberLong)).toISOString().substring(0,10),
        weight:each.weight,
        calorieIntake:each.calorieIntake,
      })
    });
    this.setState({list:tmpList})
  }

  render(){
    const {classes} = this.props;
    console.log(this.state.list)
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

const mapState = (state)=>{
  return {
    data: state.get('signIn').get('userInfo').recorders,
  }
}
const mapDispatch = (dispatch) => {
  return {
    // 测试用
    handleTestLogin(){
      dispatch( signIn_actionCreator.login('jamesgao0908@gmail.com','1q2w3e') )
    },
  }
}
export default connect( mapState,mapDispatch)(withStyles(styles)(Graphies));