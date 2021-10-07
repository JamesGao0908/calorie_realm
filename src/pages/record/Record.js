import React from 'react';
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Form, DatePicker, InputNumber, Button } from 'antd';
import * as actionCreator from './store/actionCreator';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from '../../commonComponents/NavBar';
import { withStyles } from "@material-ui/core/styles";

const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
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
    console.log( this.state.date )
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
    return <>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {/* onPanelChange={onPanelChange}  monthCellRender={monthCellRender}   */}
          <div> 
            <h1>recorder</h1>
            <Form labelCol={{ span: 4, }}  wrapperCol={{ span: 8, }} layout="horizontal">
              <Form.Item name="date-picker" label="Date" {...config}  >
                <DatePicker onChange={this.handleDateChange} />
              </Form.Item>
              <Form.Item label="Weight">
                <InputNumber style={{width: '80%'}} min="10" max="200" step="0.1" onChange={e=>this.setState({'weight':e})} value={this.state.weight}/>&nbsp;Kg
              </Form.Item>
              <Form.Item label="Calorie Intake">
                <InputNumber style={{width: '80%'}} min="0" max="5000" step="1" onChange={e=>this.setState({'calorieIntake':e})} value={this.state.calorieIntake} />&nbsp; cal
              </Form.Item>
            </Form>
            <Button type="primary" html="submit"  onClick={()=>this.props.handleSubmitRecorder(this.props.email, this.state.date,this.state.weight,this.state.calorieIntake)}>submit</Button>
          </div>
        </main>
      </div>
    </>   
  }
}

const mapState = (state)=>{
  return { 
    email: state.get('signIn').get('userInfo').email,
  }
}
const mapDispatch = (dispatch) => {
  return {
    handleSubmitRecorder(e,d,w,i){
      console.log(e,d,w,i)
      dispatch( actionCreator.insertRecorder(d,w,i) )
    },
  }
}
export default connect( mapState,mapDispatch)(withStyles(styles)(Record));