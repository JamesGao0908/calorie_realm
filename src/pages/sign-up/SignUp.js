import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";
import * as actionCreator from "./store/actionCreator";
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import { makeStyles } from '@material-ui/core/styles';

const styles = theme=>({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends React.Component{

  constructor(props){
    super(props);
    this.state={
      email:'',
      pwd:'',
      emailError:false,
      emailHelperText:'',
      pwdError:false,
      pwdHelperText:'',
    }
    this.handleEmailInputBlur = this.handleEmailInputBlur.bind(this);
    this.handleEmailValidate = this.handleEmailValidate.bind(this);
    this.handleEmailOnChange = this.handleEmailOnChange.bind(this);
    this.handlePasswordChecking = this.handlePasswordChecking.bind(this);
    this.handlePasswordOnBlur = this.handlePasswordOnBlur.bind(this);
    this.handlePasswordOnChange = this.handlePasswordOnChange.bind(this);
    this.handleRegisterFormSubmit = this.handleRegisterFormSubmit.bind(this);
    
  }

  handleEmailInputBlur(email){
    if( this.handleEmailValidate(email) ){
      this.props.handleCheckExistingEmail(email);
    }else{
      this.setState({ emailError:true, emailHelperText:'invalid email format' })
    }
    
  }
  handleEmailValidate(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  handleEmailOnChange(e){
    this.setState({ email: e});
    if(this.handleEmailValidate(this.state.email)){
      this.setState({ emailError: false,  emailHelperText:''})
    }
  }
  handlePasswordChecking(pwd){
    if(pwd.length>=3 && pwd.length<=30){
      return true;
    }else{
      return false
    }
  }
  handlePasswordOnBlur(){
    if(this.handlePasswordChecking(this.state.pwd) === false){
      this.setState({ pwdError: true, pwdHelperText:'password should contain at least 3 characters and no longer than 30 characters'});
    }else{
      this.setState({ pwdError: false, pwdHelperText:''});
    }
  }
  handlePasswordOnChange(e){
    this.setState({pwd:e.target.value}); 
    if( this.handlePasswordChecking(this.state.pwd) === true){ 
      this.setState({ pwdError: false, pwdHelperText:'' }) 
    }
  }
  handleRegisterFormSubmit(e,email,pwd){
    e.preventDefault();
    if(this.handlePasswordChecking && this.handleEmailValidate){
      try{
        this.props.handleCheckExistingEmail(email);
        if(this.state.emailError === false){
          this.props.handleRegisterUser(email,pwd);
        }
      }catch{
        console.log('register error')
      }
      
    } 
    
  }

  componentDidMount(){
  }

  componentDidUpdate(previousProps) {
    if (previousProps.data !== this.props.data) {
      if(this.props.existingEmail){
        this.setState({ emailError:true, emailHelperText:'This email has been registered'})
      }else{
        this.setState({ emailError:false, emailHelperText:''})
      }
    }
  }

  render(){
    const {classes} = this.props;
    if(this.props.userCreated){
      alert('User Created');
      return <Redirect to="/" />
    }
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={(e)=>this.handleRegisterFormSubmit(e,this.state.email,this.state.pwd)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={e=>this.handleEmailOnChange(e.target.value)}
                  onBlur={()=>this.handleEmailInputBlur(this.state.email)}
                  error={this.state.emailError}
                  helperText={this.state.emailHelperText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={e=>this.handlePasswordOnChange(e)}
                  onBlur={()=>this.handlePasswordOnBlur()}
                  error={this.state.pwdError}
                  helperText={this.state.pwdHelperText}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          {/* <Copyright /> */}
        </Box>
      </Container>
    );
  }
}

const mapState = (state)=>{
  return { 
    login : state.get('signIn').get('loginStatus'),
    existingEmail : state.get('register').get('emailExisting'),
    userCreated: state.get('register').get('userCreated'),
    data: state,
  }
}
const mapDispatch = (dispatch) => {
  return {
    handleCheckExistingEmail(email){
      dispatch(actionCreator.checkExistingEmail(email));
    },
    handleRegisterUser(email,pwd){
      dispatch(actionCreator.registerUser(email,pwd));
    }
  }
} 
export default connect( mapState,mapDispatch) (withStyles(styles)(SignUp));