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
var react_redux_1 = require("react-redux");
var createStore_1 = require("../createStore");
var MiddlewareApp_1 = require("./MiddlewareApp");
require("isomorphic-fetch");
var EndpointPopup_1 = require("./EndpointPopup");
var Loading_1 = require("./Loading");
// import {BrowserRouter} from 'react-router-dom'
var store = createStore_1.default();
function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regexa = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regexa.exec(url);
    if (!results || !results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
var App = /** @class */function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChangeEndpoint = function (endpoint) {
            _this.setState({ endpoint: endpoint });
            localStorage.setItem('last-endpoint', endpoint);
        };
        _this.state = {
            endpoint: props.endpoint,
            subscriptionEndpoint: props.subscriptionEndpoint,
            loading: false
        };
        return _this;
    }
    App.prototype.componentWillMount = function () {
        var _this = this;
        if (this.props.match.params.id) {
            if (this.props.match.params.id === 'new') {
                return;
            }
            this.setState({ loading: true });
            fetch('https://api.graph.cool/simple/v1/cj81hi46q03c30196uxaswrz2', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: "\n        query ($id: String!) {\n          session(id: $id) {\n            session\n            endpoint\n          }\n        }\n      ",
                    variables: { id: this.props.match.params.id }
                })
            }).then(function (res) {
                return res.json();
            }).then(function (res) {
                if (!res.data || res.data.session === null) {
                    return _this.props.history.push('/new');
                }
                _this.setState({
                    session: JSON.parse(res.data.session.session),
                    endpoint: res.data.session.endpoint,
                    loading: false
                });
            });
        }
    };
    App.prototype.render = function () {
        var _a = this.state,
            endpoint = _a.endpoint,
            subscriptionEndpoint = _a.subscriptionEndpoint;
        // If no  endpoint passed tries to get one from url
        if (!endpoint) {
            endpoint = getParameterByName('endpoint');
        }
        if (!subscriptionEndpoint) {
            subscriptionEndpoint = getParameterByName('subscription');
        }
        return React.createElement(
            react_redux_1.Provider,
            { store: store },
            React.createElement(
                "div",
                { className: 'wrapper', "data-jsx": 415500366
                },
                React.createElement(_style2.default, {
                    styleId: 415500366,
                    css: ".w100,\n.wrapper[data-jsx=\"415500366\"],\n.loading[data-jsx=\"415500366\"] {width: 100%\n}.h100,\n.wrapper[data-jsx=\"415500366\"],\n.loading[data-jsx=\"415500366\"] {height: 100%\n}.bgDarkBlue,\n.wrapper[data-jsx=\"415500366\"],\n.loading[data-jsx=\"415500366\"] {background-color: #172a3a\n}.f20,\n.loading[data-jsx=\"415500366\"] {font-size: 20px\n}.white,\n.loading[data-jsx=\"415500366\"] {color: #fff\n}.flex,\n.loading[data-jsx=\"415500366\"] {display: -ms-flexbox;display: flex\n}.w100,\n.wrapper[data-jsx=\"415500366\"],\n.loading[data-jsx=\"415500366\"] {width: 100%\n}.h100,\n.wrapper[data-jsx=\"415500366\"],\n.loading[data-jsx=\"415500366\"] {height: 100%\n}.bgDarkBlue,\n.wrapper[data-jsx=\"415500366\"],\n.loading[data-jsx=\"415500366\"] {background-color: #172a3a\n}.itemsCenter,\n.loading[data-jsx=\"415500366\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center\n}.justifyCenter,\n.loading[data-jsx=\"415500366\"] {-ms-flex-pack: center;justify-content: center\n}"
                }),
                this.state.loading ? React.createElement(Loading_1.default, null) : !this.state.endpoint || this.state.endpoint.length === 0 ? React.createElement(EndpointPopup_1.default, { onRequestClose: this.handleChangeEndpoint, endpoint: this.state.endpoint || localStorage.getItem('last-endpoint') || '' }) : React.createElement(MiddlewareApp_1.default, { endpoint: endpoint, subscriptionEndpoint: subscriptionEndpoint, session: this.state.session })
            )
        );
    };
    return App;
}(React.Component);
exports.default = App;
//# sourceMappingURL=App.jsx.map