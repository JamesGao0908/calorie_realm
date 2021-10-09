import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
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
    this.handlePasswordChecking = this.handlePasswordChecking.bind(this);
  }

  handleEmailInputBlur(email){
    this.props.handleCheckExistingEmail(email);
  }
  handlePasswordChecking(pwd){
    if(pwd.length>=3 && pwd.length<=30){
      return true;
    }else{
      this.setState({ pwdError: true, pwdHelperText:'password should contain at least 3 characters and no longer than 30 characters'})
      return false
    }
  }


  componentDidMount(){
    // setInterval(()=>{
    //   try{
    //     if(this.handlePasswordChecking(this.state.pwd)){
    //       this.setState({pwdError:true, pwdHelperText:''})
    //     }
    //   }catch{

    //   }
    // },2000)
  }


  render(){
    const {classes} = this.props;
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
          <form className={classes.form} noValidate>
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
                  onChange={e=>this.setState({email:e.target.value})}
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
                  onChange={e=>this.setState({pwd:e.target.value})}
                  onBlur={()=>{ this.handlePasswordChecking(this.state.pwd)}}
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
                <Link to='/'>
                  Already have an account? Sign in
                </Link>
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
  }
}
const mapDispatch = (dispatch) => {
  return {
    handleCheckExistingEmail(email){
    },
  }
} 
export default connect( mapState,mapDispatch) (withStyles(styles)(SignUp));