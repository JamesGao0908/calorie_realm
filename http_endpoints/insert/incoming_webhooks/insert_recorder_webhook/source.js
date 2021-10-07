
exports = function(payload, response) {
  const db = context.services.get("mongodb-atlas").db("calorie").collection("user");
  db.updateOne( {"email": payload.query.email}, {$addToSet: { "recorders": {"date":new Date(payload.query.date), weight: payload.query.weight, calorieIntake:payload.query.calorieIntake, "updateAt": new Date() } } });
  response.setBody(
    "{'message': 'add successfully'}"
  );
  return response
};