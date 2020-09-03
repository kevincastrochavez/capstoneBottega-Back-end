const User = require("../models/userModel");
const factory = require("./handleFactory");

exports.getAllUsers = factory.getAll(User);
exports.createUser = factory.createOne(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
