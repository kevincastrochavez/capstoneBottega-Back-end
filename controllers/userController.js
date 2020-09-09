const multer = require("multer");

const User = require("../models/userModel");
const catchAsync = require("../catchAsync");
const factory = require("./handleFactory");
const AppError = require("../utils/appError");

const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../public/images/users");
  },
  filename: (req, file, callback) => {
    const extension = file.mimetype.split("/")[1];
    callback(null, `user-${req.user.id}-${Date.now()}.${extension}`);
  },
});

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new AppError("Please upload only images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

const filterObj = (object, ...allowedFields) => {
  const newObject = {};
  Object.keys(object).forEach((el) => {
    if (allowedFields.includes(el)) newObject[el] = object[el];
  });

  return newObject;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) filteredBody.photo = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

// ADMIN
exports.getAllUsers = factory.getAll(User);
exports.createUser = factory.createOne(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
