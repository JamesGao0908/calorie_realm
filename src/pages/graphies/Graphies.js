import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import NavBar from '../../commonComponents/NavBar';
import CssBaseline from '@material-ui/core/CssBaseline';

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
  render(){
    const {classes} = this.props;
    return  <>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {/* onPanelChange={onPanelChange}  monthCellRender={monthCellRender}   */}
          <div> 
            <h1>Graphies</h1>
          </div>
        </main>
      </div>
    </> 

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
export default connect( mapState,mapDispatch)(withStyles(styles)(Graphies));