import axios from 'axios';

export const checkExistingEmail = (email)=>{
  return (dispatch)=>{
    axios.post(`https://ap-southeast-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/calorie_real_mongodb-rrzuy/service/user/incoming_webhook/checkuser`, null, { params: {
      email,
    }})
    .then( res=>{
      dispatch(validateExistingEmail(res.data.$numberLong));
    })
    .catch( err=>console.log(err) )
  }
}

const validateExistingEmail = (e)=>({
  type: 'validate_existing_email',
  value: e,
})

export const registerUser = (email, pwd)=>{
  return (dispatch)=>{
    axios.post(`https://ap-southeast-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/calorie_real_mongodb-rrzuy/service/user/incoming_webhook/register`, null, { params: {
      email,
      pwd,
    }})
    .then( res=>{
      // alert(res.data);
      dispatch({ type:'user_created' })
    })
    .catch( err=>console.log(err) )
  }
}