"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _jsBase = require("js-base64");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ContactService =
/*#__PURE__*/
function () {
  function ContactService() {
    _classCallCheck(this, ContactService);
  }

  _createClass(ContactService, [{
    key: "sendMail",
    value: function sendMail(from, subject, text) {
      console.log(from);
      console.log(subject);
      console.log(_jsBase.Base64.encode(text));
      return _axios["default"].put("http://185.146.87.75:8080/airquality/contact/sendMail/".concat(from, "/").concat(subject, "/").concat(_jsBase.Base64.encode(text))); //    return axios.put(`http://localhost:8080/contact/sendMail/${from}/${subject}/${Base64.encode(text)}`)
    }
  }, {
    key: "verifyEmail",
    value: function verifyEmail(from) {
      return _axios["default"].put("http://185.146.87.75:8080/airquality/contact/emailVerification/".concat(from)); // return axios.put(`http://localhost:8080/contact/emailVerification/${from}`)
    }
  }]);

  return ContactService;
}();

var _default = new ContactService();

exports["default"] = _default;