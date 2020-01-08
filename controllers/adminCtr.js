const User = require('../models/User');
const Msg = require('../models/Msg');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
const io = require('../socket');

exports.create = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    admin: true
  });

  res.status(201).json({
    status: 'success'
  });
});

exports.upgrade = catchAsync(async (req, res, next) => {
  const userId = req.body.id;
  const user = await User.findById(userId);

  user.admin = true;
  await user.save();

  io.getIO().emit('system', {
    action: 'upgradeUser'
  });

  res.status(201).json({
    status: 'success'
  });
});

exports.removeUser = catchAsync(async (req, res, next) => {
  const userId = req.body.id;

  await Msg.deleteMany({ user: userId });

  await User.findByIdAndDelete(userId);

  io.getIO().emit('system', {
    action: 'removeUser',
    data: { userId }
  });

  res.status(201).json({
    status: 'success'
  });
});
