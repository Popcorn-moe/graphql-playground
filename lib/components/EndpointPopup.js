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
var fetch = require("isomorphic-fetch");
var Popup_1 = require("./Popup");
var lodash_1 = require("lodash");
var cn = require("classnames");
var Button_1 = require("./Button");
var EndpointPopup = /** @class */function (_super) {
    __extends(EndpointPopup, _super);
    function EndpointPopup(props) {
        var _this = _super.call(this) || this;
        _this.checkEndpoint = lodash_1.throttle(function () {
            if (_this.state.endpoint.match(/^https?:\/\/\w+(\.\w+)*(:[0-9]+)?\/?.*$/)) {
                fetch(_this.state.endpoint, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query: "{\n        __schema {\n          queryType {\n            kind\n          }\n        }\n      }"
                    })
                }).then(function (res) {
                    _this.setState({ valid: res.status < 400 });
                }).catch(function (err) {
                    _this.setState({ valid: false });
                });
            }
        }, 500);
        _this.onChangeEndpoint = function (e) {
            _this.setState({ endpoint: e.target.value }, _this.checkEndpoint);
        };
        _this.submit = function (e) {
            e.preventDefault();
            _this.close();
        };
        _this.close = function () {
            if (_this.state.valid) {
                _this.props.onRequestClose(_this.state.endpoint);
            }
        };
        _this.state = {
            endpoint: props.endpoint
        };
        return _this;
    }
    EndpointPopup.prototype.componentDidMount = function () {
        this.checkEndpoint();
    };
    EndpointPopup.prototype.render = function () {
        var valid = this.state.valid;
        return React.createElement(
            Popup_1.default,
            { onRequestClose: this.close, darkBg: true },
            React.createElement(
                "div",
                { className: "content", "data-jsx": 3276715716
                },
                React.createElement(_style2.default, {
                    styleId: 3276715716,
                    css: "input[data-jsx=\"3276715716\"] {transition: 0.25s color;}.content[data-jsx=\"3276715716\"] .button {background: #da1b7f;}.logo[data-jsx=\"3276715716\"] img[data-jsx=\"3276715716\"] {width: 78px;height: 78px;}.bbox,\n.content[data-jsx=\"3276715716\"] {box-sizing: border-box;}.flex,\nform[data-jsx=\"3276715716\"],\ninput[data-jsx=\"3276715716\"],\n.logo-wrapper[data-jsx=\"3276715716\"],\n.logo[data-jsx=\"3276715716\"] {display: -ms-flexbox;display: flex;}.flex1,\n.flexAuto,\nform[data-jsx=\"3276715716\"],\ninput[data-jsx=\"3276715716\"] {min-width: 0;min-height: 0;}.flexAuto,\nform[data-jsx=\"3276715716\"],\ninput[data-jsx=\"3276715716\"] {-ms-flex: 1 1 auto;flex: 1 1 auto;}.w100,\nform[data-jsx=\"3276715716\"],\ninput[data-jsx=\"3276715716\"] {width: 100%;}.bgWhite10,\ninput[data-jsx=\"3276715716\"] {background-color: hsla(0,0%,100%,.1);}.br2,\ninput[data-jsx=\"3276715716\"] {border-radius: 2px;}.pv16,\ninput[data-jsx=\"3276715716\"] {padding-top: 16px;padding-bottom: 16px;}.ph25,\ninput[data-jsx=\"3276715716\"] {padding-left: 25px;padding-right: 25px;}.fw6,\ninput[data-jsx=\"3276715716\"] {font-weight: 600;}.white,\ninput[data-jsx=\"3276715716\"] {color: #fff;}.f16,\ninput[data-jsx=\"3276715716\"] {font-size: 16px;}.db,\ninput[data-jsx=\"3276715716\"] {display: block;}.w100,\nform[data-jsx=\"3276715716\"],\ninput[data-jsx=\"3276715716\"] {width: 100%;}.tc,\ninput[data-jsx=\"3276715716\"] {text-align: center;}.flex1,\n.flexAuto,\nform[data-jsx=\"3276715716\"],\ninput[data-jsx=\"3276715716\"] {min-width: 0;min-height: 0;}.flexAuto,\nform[data-jsx=\"3276715716\"],\ninput[data-jsx=\"3276715716\"] {-ms-flex: 1 1 auto;flex: 1 1 auto;}.flex,\nform[data-jsx=\"3276715716\"],\ninput[data-jsx=\"3276715716\"],\n.logo-wrapper[data-jsx=\"3276715716\"],\n.logo[data-jsx=\"3276715716\"] {display: -ms-flexbox;display: flex;}.green,\ninput.valid[data-jsx=\"3276715716\"] {color: #27ae60;}.red,\ninput.invalid[data-jsx=\"3276715716\"] {color: #f25c54;}.ph16,\n.content[data-jsx=\"3276715716\"] .button,\n.content[data-jsx=\"3276715716\"] .button:hover {padding-left: 16px;padding-right: 16px;}.ph16,\n.content[data-jsx=\"3276715716\"] .button,\n.content[data-jsx=\"3276715716\"] .button:hover {padding-left: 16px;padding-right: 16px;}.bgPurple,\n.content[data-jsx=\"3276715716\"] .button:hover {background-color: #a4036f;}.white80,\nh1[data-jsx=\"3276715716\"] {color: hsla(0,0%,100%,.8);}.fw4,\nh1[data-jsx=\"3276715716\"] {font-weight: 400;}.ml38,\nh1[data-jsx=\"3276715716\"] {margin-left: 38px;}.flex,\nform[data-jsx=\"3276715716\"],\ninput[data-jsx=\"3276715716\"],\n.logo-wrapper[data-jsx=\"3276715716\"],\n.logo[data-jsx=\"3276715716\"] {display: -ms-flexbox;display: flex;}.justifyCenter,\n.logo-wrapper[data-jsx=\"3276715716\"] {-ms-flex-pack: center;justify-content: center;}.itemsCenter,\n.logo-wrapper[data-jsx=\"3276715716\"],\n.logo[data-jsx=\"3276715716\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.flex,\nform[data-jsx=\"3276715716\"],\ninput[data-jsx=\"3276715716\"],\n.logo-wrapper[data-jsx=\"3276715716\"],\n.logo[data-jsx=\"3276715716\"] {display: -ms-flexbox;display: flex;}.itemsCenter,\n.logo-wrapper[data-jsx=\"3276715716\"],\n.logo[data-jsx=\"3276715716\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.mb60,\n.logo[data-jsx=\"3276715716\"] {margin-bottom: 60px;}.justifyBetween,\n.logo[data-jsx=\"3276715716\"] {-ms-flex-pack: justify;justify-content: space-between;}"
                }),
                React.createElement(
                    "div",
                    { className: "logo-wrapper", "data-jsx": 3276715716
                    },
                    React.createElement(
                        "div",
                        { className: "logo", "data-jsx": 3276715716
                        },
                        React.createElement("img", { src: require('../assets/logo.png'), alt: "", "data-jsx": 3276715716
                        }),
                        React.createElement(
                            "h1",
                            {
                                "data-jsx": 3276715716
                            },
                            "GraphQL Playground"
                        )
                    )
                ),
                React.createElement(
                    "form",
                    { action: "", onSubmit: this.submit, "data-jsx": 3276715716
                    },
                    React.createElement("input", { type: "text", placeholder: "Enter an endpoint url...", value: this.state.endpoint, onChange: this.onChangeEndpoint, className: cn({
                            valid: typeof valid === 'boolean' && valid,
                            invalid: typeof valid === 'boolean' && !valid
                        }), autoFocus: true, "data-jsx": 3276715716
                    }),
                    valid && React.createElement(
                        Button_1.Button,
                        { onClick: this.close },
                        "Use Endpoint"
                    )
                )
            )
        );
    };
    return EndpointPopup;
}(React.Component);
exports.default = EndpointPopup;
//# sourceMappingURL=EndpointPopup.jsx.map