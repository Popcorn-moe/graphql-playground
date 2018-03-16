"use strict";

var _style = require("styled-jsx/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var debounce_1 = require("graphiql/dist/utility/debounce");
var graphcool_styles_1 = require("graphcool-styles");
var cx = require("classnames");
var SearchBox = /** @class */function (_super) {
    __extends(SearchBox, _super);
    function SearchBox(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = function (event) {
            _this.setState({ value: event.target.value });
            _this.debouncedOnSearch();
        };
        _this.state = { value: '' };
        _this.debouncedOnSearch = debounce_1.default(200, function () {
            _this.props.onSearch(_this.state.value);
        });
        return _this;
    }
    SearchBox.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return nextProps.isShown !== this.props.isShown || nextState.value !== this.state.value;
    };
    SearchBox.prototype.render = function () {
        return React.createElement(
            "div",
            { className: cx(!this.props.clean && 'search-box'), "data-jsx": 3649120817
            },
            React.createElement(_style2.default, {
                styleId: 3649120817,
                css: ".search-box[data-jsx=\"3649120817\"] {z-index: 1;margin-left: 6px;}.label[data-jsx=\"3649120817\"] {padding: 12px 14px 13px 15px;box-shadow: 0 1px 3px rgba(0, 0, 0, .1);}.input[data-jsx=\"3649120817\"]::-webkit-input-placeholder {color: rgba(0, 0, 0, .3);}.input[data-jsx=\"3649120817\"]::-moz-placeholder {color: rgba(0, 0, 0, .3);}.input[data-jsx=\"3649120817\"]:-ms-input-placeholder {color: rgba(0, 0, 0, .3);}.input[data-jsx=\"3649120817\"]::placeholder {color: rgba(0, 0, 0, .3);}.pa25,\n.search-box[data-jsx=\"3649120817\"] {padding: 25px;}.bgBlack02,\n.search-box[data-jsx=\"3649120817\"] {background-color: rgba(0,0,0,.02);}.bb,\n.search-box[data-jsx=\"3649120817\"] {border-bottom-style: solid;border-bottom-width: 1px;}.bBlack10,\n.search-box[data-jsx=\"3649120817\"] {border-color: rgba(0,0,0,.1);}.relative,\n.search-box[data-jsx=\"3649120817\"] {position: relative;}.flexFixed,\n.search-box[data-jsx=\"3649120817\"] {-ms-flex: 0 0 auto;flex: 0 0 auto;}.bgWhite,\n.label[data-jsx=\"3649120817\"] {background-color: #fff;}.bbox,\n.label[data-jsx=\"3649120817\"] {box-sizing: border-box;}.w100,\n.label[data-jsx=\"3649120817\"] {width: 100%;}.flex,\n.label[data-jsx=\"3649120817\"] {display: -ms-flexbox;display: flex;}.itemsCenter,\n.label[data-jsx=\"3649120817\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.bgWhite,\n.label[data-jsx=\"3649120817\"] {background-color: #fff;}.f16,\n.input[data-jsx=\"3649120817\"] {font-size: 16px;}.ml10,\n.input[data-jsx=\"3649120817\"] {margin-left: 10px;}"
            }),
            this.props.isShown && React.createElement(
                "label",
                { className: "label", "data-jsx": 3649120817
                },
                React.createElement(graphcool_styles_1.Icon, { src: require('graphcool-styles/icons/stroke/search.svg'), stroke: true, strokeWidth: 3, color: 'rgba(0, 0, 0, 0.3)' }),
                React.createElement("input", { className: "input", onChange: this.handleChange, type: "text", value: this.state.value, placeholder: this.props.placeholder || 'Search the schema ...', "data-jsx": 3649120817
                })
            )
        );
    };
    return SearchBox;
}(React.Component);
exports.default = SearchBox;
//# sourceMappingURL=SearchBox.jsx.map