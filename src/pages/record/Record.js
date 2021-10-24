import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Form, DatePicker, InputNumber, Button } from 'antd';
import * as actionCreator from './store/actionCreator';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from '../../commonComponents/NavBar';
import { withStyles } from "@material-ui/core/styles";
import { InsertDailyDocument } from './style.js';

const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};

const layout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

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

class Record extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      weight:'',
      calorieIntake:'',
      date: ''
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    // this.handleSubmitRecorder = this.handleSubmitRecorder.bind(this);
  }

  componentDidMount(){

  }

  handleDateChange(e){
    try{
      this.setState( {'date': e.format("YYYY-MM-DD") } )
    }
    catch{
      this.setState( {'date': '' } )
    }
  }

  render(){
    const {classes} = this.props;
    if( !this.props.loginStatus )
    {
      return <Redirect to='/' />
    }else{
    return <>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {/* onPanelChange={onPanelChange}  monthCellRender={monthCellRender}   */}
          <div> 
            <InsertDailyDocument>
              <Form layout="horizontal" {...layout} >
                <Form.Item name="date-picker" label="Date" {...config} labelAlign="left" >
                  <DatePicker onChange={this.handleDateChange} style={{ }}/>
                </Form.Item>
                <Form.Item label="Weight_(Kg)" required labelAlign="left">
                  <InputNumber style={{width: '80%'}} min="10" max="200" step="0.1" onChange={e=>this.setState({'weight':e})} value={this.state.weight}/>
                </Form.Item>
                <Form.Item label="Calorie Intake_(Cal)" required labelAlign="left">
                  <InputNumber style={{width: '80%'}} min="0" max="5000" step="1" onChange={e=>this.setState({'calorieIntake':e})} value={this.state.calorieIntake} />
                </Form.Item>
                <Form.Item labelAlign="left" wrapperCol={{ ...layout.wrapperCol, offset: 8 }} >
                  <Button type="primary" html="submit"  onClick={()=>this.props.handleSubmitRecorder(this.props.email, this.state.date,this.state.weight,this.state.calorieIntake)}>Submit</Button>
                </Form.Item>
              </Form>
            </InsertDailyDocument>
          </div>
        </main>
      </div>
    </> 
    } 
  }
}

const mapState = (state)=>{
  return { 
    email: state.get('signIn').get('userInfo').email,
    loginStatus: state.get('signIn').get('loginStatus'),
  }
}
const mapDispatch = (dispatch) => {
  return {
    handleSubmitRecorder(e,d,w,i){
      // console.log(e,d,w,i)
      dispatch( actionCreator.insertRecorder(e,d,w,i) )
    },
  }
}
export default connect( mapState,mapDispatch)(withStyles(styles)(Record));