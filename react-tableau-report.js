module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _tableauApi = __webpack_require__(2);

var _tableauApi2 = _interopRequireDefault(_tableauApi);

var _url = __webpack_require__(3);

var _url2 = _interopRequireDefault(_url);

var _utils = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  filters: _react.PropTypes.object,
  url: _react.PropTypes.string,
  parameters: _react.PropTypes.object,
  options: _react.PropTypes.object,
  token: _react.PropTypes.string
};

var defaultProps = {
  loading: false,
  parameters: {},
  filters: {},
  options: {}
};

/**
 * React Component to render reports created in Tableau.
 *  
 * @class TableauReport
 * @extends {Component}
 */

var TableauReport = function (_Component) {
  _inherits(TableauReport, _Component);

  function TableauReport(props) {
    _classCallCheck(this, TableauReport);

    var _this = _possibleConstructorReturn(this, (TableauReport.__proto__ || Object.getPrototypeOf(TableauReport)).call(this, props));

    _this.state = {
      filters: props.filters,
      parameters: props.parameters,
      currentUrl: props.url
    };
    return _this;
  }

  _createClass(TableauReport, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initTableau();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var isReportChanged = nextProps.url !== this.state.currentUrl;
      var isFiltersChanged = !(0, _utils.shallowequal)(this.props.filters, nextProps.filters);
      var isParametersChanged = !(0, _utils.shallowequal)(this.props.parameters, nextProps.parameters);
      var isLoading = this.state.loading;

      if (isReportChanged) {
        this.state.currentUrl = nextProps.url;
        this.forceUpdate();
        this.initTableau();
      }

      if (!isReportChanged && isFiltersChanged && !isLoading) {
        this.applyFilters(nextProps.filters);
      }

      if (!isReportChanged && isParametersChanged && !isLoading) {
        this.applyParameters(nextProps.parameters);
      }
    }

    /**
     * Gets the url for the tableau report.
     * 
     * @returns {String} A constructed url. 
     * @memberOf TableauReport
     */

  }, {
    key: 'getUrl',
    value: function getUrl() {
      var parsed = _url2.default.parse(this.props.url, true);

      var result = parsed.protocol + '//' + parsed.host;
      if (this.props.token) result += '/trusted/' + this.props.token;
      result += parsed.pathname + '?:embed=yes&:comments=no&:toolbar=yes&:refresh=yes';

      return result;
    }

    /**
     * Asynchronously applies filters to the worksheet, excluding those that have
     * already been applied, which is determined by checking against state.
     * @param  {Object} filters
     * @return {void}
     * @memberOf TableauReport
     */

  }, {
    key: 'applyFilters',
    value: function applyFilters(filters) {
      var _this2 = this;

      var REPLACE = _tableauApi2.default.FilterUpdateType.REPLACE;
      var promises = [];

      this.setState({ loading: true });

      for (var key in filters) {
        if (!this.state.filters.hasOwnProperty(key) || !(0, _utils.shallowequal)(this.state.filters[key], filters[key])) {
          promises.push(this.sheet.applyFilterAsync(key, filters[key], REPLACE));
        }
      }

      Promise.all(promises).then(function () {
        _this2.setState({ loading: false, filters: filters });
      });
    }

    /**
     * Asynchronously applies parameters to the worksheet, excluding those that have
     * already been applied, which is determined by checking against state.
     * @param  {Object} parameters
     * @return {void}
     * @memberOf TableauReport
     */

  }, {
    key: 'applyParameters',
    value: function applyParameters(parameters) {
      var _this3 = this;

      var promises = [];

      for (var key in parameters) {
        if (!this.state.parameters.hasOwnProperty(key) || this.state.parameters[key] !== parameters[key]) {
          var val = parameters[key];
          promises.push(this.workbook.changeParameterValueAsync(key, val));
        }
      }

      Promise.all(promises).then(function () {
        return _this3.setState({ loading: false, parameters: parameters });
      });
    }

    /**
     * Initialize the viz via the Tableau JS API.
     * @return {void}
     * @memberOf TableauReport
     */

  }, {
    key: 'initTableau',
    value: function initTableau() {
      var _this4 = this;

      var vizUrl = this.getUrl();

      var options = _extends({}, this.props.filters, this.props.parameters, this.props.options, {
        onFirstInteractive: function onFirstInteractive() {
          _this4.workbook = _this4.viz.getWorkbook();
          _this4.sheets = _this4.workbook.getActiveSheet().getWorksheets();
          _this4.sheet = _this4.sheets[0];
        }
      });

      if (this.viz) {
        this.viz.dispose();
        this.viz = null;
      }

      this.viz = new _tableauApi2.default.Viz(this.container, vizUrl, options);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      return _react2.default.createElement('div', { ref: function ref(c) {
          return _this5.container = c;
        } });
    }
  }]);

  return TableauReport;
}(_react.Component);

TableauReport.propTypes = propTypes;
TableauReport.defaultProps = defaultProps;

exports.default = TableauReport;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("tableau-api");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Provides a shallow equality check on two arrays or objects.
 * 
 * @param {Array|Object} a : The value to compare.
 * @param {Array|Object} b : The other value to compare.
 * @returns {bool}
 */
exports.shallowequal = function (a, b) {
    if (a === b) return true;
    if (Array.isArray(a) && Array.isArray(b)) return seArray(a, b);
    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') return seObject(a, b);
    return false;
};

/**
 * Shallow equality check for arrays.
 * 
 * @param {Array} a : The value to compare.
 * @param {Array} b : The other value to compare.
 * @returns {bool}
 */
function seArray(a, b) {
    var l = a.length;

    if (l !== b.length) return false;

    for (var i = 0; i < l; i++) {
        if (a[i] !== b[i]) return false;
    }return true;
};

/**
 * Shallow equality check for objects.
 * 
 * @param {Object} a : The value to compare.
 * @param {Object} b : The other value to compare.
 * @returns {bool}
 */
function seObject(a, b) {
    var ka = Object.keys(a),
        l = ka.length;

    if (l !== Object.keys(b).length.length) return false;

    for (var i = 0; i < l; i++) {
        if (a[ka[i]] !== b[ka[i]]) return false;
    }return true;
};

/***/ })
/******/ ]);