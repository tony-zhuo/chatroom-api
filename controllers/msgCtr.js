const Msg = require('../models/Msg');
const catchAsync = require('../utils/catchAsync');
const io = require('../socket');
const AppError = require('../utils/appError');

exports.sendMsg = catchAsync(async (req, res, next) => {
  if (!req.body.text) return next(new AppError('Please text some word!', 400));

  const newMsg = await Msg.create({
    user: req.user,
    text: req.body.text
  });
  io.getIO().emit('sendMsg', {
    Msg: newMsg
  });
  res.status(201).json({
    status: 'success',
    data: {
      Msg: newMsg
    }
  });
});

exports.getAllMsg = catchAsync(async (req, res, next) => {
  const Msgs = await Msg.find()
    .populate('user')
    .sort('createdAt');

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: Msgs.length,
    data: {
      Msgs
    }
  });
});
