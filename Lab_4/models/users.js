const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  DataOfBirth: { type: Date },
});
usersSchema.pre("save", async function preSave() {
  this.password = await bcrypt.hash(this.password, 10);
});

usersSchema.methods.verifyPassword = async function verifyPassword(password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
