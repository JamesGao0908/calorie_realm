import axios from 'axios';

export const login = (email,pwd,rememberme)=>{
  return (dispatch)=>{
    axios.post(`https://ap-southeast-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/calorie_real_mongodb-rrzuy/service/login/incoming_webhook/login_webhook`, null, { params: {
      email,
      pwd,
    }})
    .then( res=>{
      console.log(res)
      // 成功获取，res=>[] 则账号密码错误
      if(res === []){

      }else{
        dispatch(loadUserInfo(res.data))
      }
    })
    .catch( err=>console.log(err) )

  }
}

const loadUserInfo = (e)=>({
  type: 'load_user_info',
  data: e
})