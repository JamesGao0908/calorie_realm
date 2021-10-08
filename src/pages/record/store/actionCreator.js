import axios from 'axios';

export const insertRecorder = (email,date,weight,calorieIntake)=>{
  // console.log(email,date,weight,calorieIntake)
  return (dispatch)=>{
    axios.post(`https://ap-southeast-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/calorie_real_mongodb-rrzuy/service/insert/incoming_webhook/insert_recorder_webhook`, null, { params: {
      email,
      date,
      weight,
      calorieIntake,
    }})
    .then( res=>{
      // console.log(res)
    })
    .catch( err=>console.log(err) )

  }
}