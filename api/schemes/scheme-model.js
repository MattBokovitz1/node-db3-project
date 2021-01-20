const db = require("../../data/db-config");

module.exports = {
  find() {
    return db("schemes");
  },

  findById(id) {
    return db("schemes").where("id", id).first();
  },

  findSteps(id) {
    return db("steps")
      .join("schemes", "steps.scheme_id", "schemes.id")
      .select(
        "steps.id",
        "schemes.scheme_name",
        "steps.step_number",
        "steps.instructions"
      )
      .where("schemes.id", id)
      .orderBy("steps.step_number");
  },

  add(scheme) {
    return db("schemes")
      .insert(scheme)
      .then(([id]) => {
        return db("schemes").where("id", id).first();
      });
  },

  update(changes, id) {
    return db("schemes").where("id", id).update(changes);
  },

  remove(id) {
    return db("schemes").where("id", id).del();
  },
};
