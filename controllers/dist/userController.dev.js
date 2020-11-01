"use strict";

var User = require('../models/userModel');

var multer = require('multer');

var sharp = require('sharp');

var AppError = require('../utilities/appError');

var catchError = require('../utilities/catchError');

var path = require('path');

var MetalRates = require('../models/metalsModel');

var _require = require('../models/userModel'),
    find = _require.find; // for Image upload


var multerStorage = multer.memoryStorage();

var fileFilter = function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('This is not an image file!', 400), false);
  }
};

var upload = multer({
  storage: multerStorage,
  fileFilter: fileFilter
});
exports.uploadProfile = upload.fields([{
  name: 'panCard',
  maxCount: 1
}, {
  name: 'adhaar',
  maxCount: 1
}]); // Image Resize

exports.resizesImage = catchError(function _callee(req, res, next) {
  var fields, adhaar, name;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          fields = Object.keys(req.files);

          if (req.files) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", next());

        case 3:
          if (!(fields[1] === 'adhaar' || fields[0] !== 'panCard')) {
            _context.next = 8;
            break;
          }

          // For adhaar card 
          adhaar = req.files.adhaar[0].originalname.toLowerCase().split(' ').join('-');
          req.files.adhaar[0].adhaar = "adhaar-".concat(Date.now(), "-").concat(adhaar);
          _context.next = 8;
          return regeneratorRuntime.awrap(sharp(req.files.adhaar[0].buffer).rotate().resize(800, 1000).toFormat('jpeg').jpeg({
            quality: 90
          }).toFile("assets/adhaar/".concat(req.files.adhaar[0].adhaar)));

        case 8:
          if (!(fields[0] !== 'adhaar' || fields[0] === 'panCard')) {
            _context.next = 13;
            break;
          }

          name = req.files.panCard[0].originalname.toLowerCase().split(' ').join('-');
          req.files.panCard[0].panCard = "panCard-".concat(Date.now(), "-").concat(name);
          _context.next = 13;
          return regeneratorRuntime.awrap(sharp(req.files.panCard[0].buffer).resize(800, 1000).toFormat('jpeg').jpeg({
            quality: 90
          }).toFile("assets/panCard/".concat(req.files.panCard[0].panCard)));

        case 13:
          next();

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getUsers = catchError(function _callee2(req, res, next) {
  var users;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.find());

        case 2:
          users = _context2.sent;

          if (users) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", next(new AppError('Users Not Found', 404)));

        case 5:
          res.status(200).json({
            status: 'success',
            users: users
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.getUser = catchError(function _callee3(req, res, next) {
  var id, user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findById(id, {
            __v: 0
          }));

        case 3:
          user = _context3.sent;

          if (user) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", next(new AppError('No User is found with this ID', 404)));

        case 6:
          res.status(200).json({
            status: 'success',
            user: user
          });

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
});

var filterFieldsForUpdate = function filterFieldsForUpdate(obj) {
  for (var _len = arguments.length, allowedFields = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    allowedFields[_key - 1] = arguments[_key];
  }

  var newObj = {};
  Object.keys(obj).forEach(function (el) {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateUser = catchError(function _callee4(req, res, next) {
  var url, filteredObj, updatedUser;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          url = req.protocol + '://' + req.get('host');
          _context4.next = 3;
          return regeneratorRuntime.awrap(filterFieldsForUpdate(req.body, 'name', 'email', 'mobile', 'address', 'panCard', 'adhaar', 'plans'));

        case 3:
          filteredObj = _context4.sent;

          if (req.files) {
            if (req.body.panCard === undefined) filteredObj.panCard = url + '/panCard/' + req.files.panCard[0].panCard;
            if (req.body.adhaar === undefined) filteredObj.adhaar = url + '/adhaar/' + req.files.adhaar[0].adhaar;
          }

          _context4.next = 7;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.params.id, filteredObj, {
            "new": true,
            runValidators: true
          }));

        case 7:
          updatedUser = _context4.sent;

          if (updatedUser) {
            _context4.next = 10;
            break;
          }

          return _context4.abrupt("return", next(new AppError('User not updated ', 400)));

        case 10:
          res.status(201).json({
            status: 'success',
            user: updatedUser
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.getMetalRates = catchError(function _callee5(req, res, next) {
  var rates;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(MetalRates.find());

        case 2:
          rates = _context5.sent;

          if (rates) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", next(new AppError('Metal rates are not found ! ', 400)));

        case 5:
          res.status(200).json({
            status: 'success',
            rates: rates
          });

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.updateMetalRates = catchError(function _callee6(req, res, next) {
  var rates;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (req.body.diamond === null) delete req.body.diamond;
          if (req.body.diamondvvsVS === null) delete req.body.diamondvvsVS;
          if (req.body.diamondvsSI === null) delete req.body.diamondvsSI;
          if (req.body.diamondSI === null) delete req.body.diamondSI;
          _context6.next = 6;
          return regeneratorRuntime.awrap(MetalRates.findByIdAndUpdate(req.params.id, req.body, {
            "new": true
          }));

        case 6:
          rates = _context6.sent;

          if (rates) {
            _context6.next = 9;
            break;
          }

          return _context6.abrupt("return", next(new AppError('Metal rates are not found ! ', 400)));

        case 9:
          res.status(200).json({
            status: 'success',
            rates: rates
          });

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.deleteUser = catchError(function _callee7(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(req.params.id));

        case 2:
          user = _context7.sent;

          if (user) {
            _context7.next = 5;
            break;
          }

          return _context7.abrupt("return", next(new AppError('No user is found with this ID', 404)));

        case 5:
          res.json({
            status: 'success',
            message: 'User successfully deleted !'
          });

        case 6:
        case "end":
          return _context7.stop();
      }
    }
  });
});
exports.updateNewPlan = catchError(function _callee8(req, res, next) {
  var plan;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.params.id, req.body, {
            "new": true,
            runValidators: true
          }));

        case 2:
          plan = _context8.sent;

          if (plan) {
            _context8.next = 5;
            break;
          }

          return _context8.abrupt("return", next(new AppError('User not updated ', 400)));

        case 5:
          res.status(201).json({
            status: 'success',
            user: plan
          });

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  });
});