exports = function(payload, response) {
  const result = context.services.get("mongodb-atlas").db("calorie").collection("user").findOne({ "email": payload.query.email, "pwd":payload.query.pwd });
  return result
};