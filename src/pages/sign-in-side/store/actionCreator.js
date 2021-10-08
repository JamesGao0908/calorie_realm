import axios from 'axios';

export const login = (email,pwd,rememberme)=>{
  return (dispatch)=>{
    axios.post(`https://ap-southeast-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/calorie_real_mongodb-rrzuy/service/login/incoming_webhook/login_webhook`, null, { params: {
      email,
      pwd,
    }})
    .then( res=>{
      // console.log(res.data)
      if(res.data !== null && res.data !== []){
        dispatch(loadUserInfo(res.data))
      }else{
        dispatch(loginFailed())
      }
    })
    .catch( err=>console.log(err) )

  }
}

const loadUserInfo = (e)=>({
  type: 'load_user_info',
  data: e
})

const loginFailed = ()=>({
  type: 'login_fail',
})

export const loginErrorReset = ()=>({
  type: 'login_error_reset'
})