"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var fetch = require("isomorphic-fetch");
var Popup_1 = require("./Popup");
var lodash_1 = require("lodash");
var cn = require("classnames");
var Button_1 = require("./Button");
var EndpointPopup = /** @class */ (function (_super) {
    __extends(EndpointPopup, _super);
    function EndpointPopup(props) {
        var _this = _super.call(this) || this;
        _this.checkEndpoint = lodash_1.throttle(function () {
            if (_this.state.endpoint.match(/^https?:\/\/\w+(\.\w+)*(:[0-9]+)?\/?.*$/)) {
                fetch(_this.state.endpoint, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: "{\n        __schema {\n          queryType {\n            kind\n          }\n        }\n      }",
                    }),
                })
                    .then(function (res) {
                    _this.setState({ valid: res.status < 400 });
                })
                    .catch(function (err) {
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
            endpoint: props.endpoint,
        };
        return _this;
    }
    EndpointPopup.prototype.componentDidMount = function () {
        this.checkEndpoint();
    };
    EndpointPopup.prototype.render = function () {
        var valid = this.state.valid;
        return (<Popup_1.default onRequestClose={this.close} darkBg={true}>
        <div className="content">
          <style jsx={true}>{"\n            .content {\n              @p: .bbox;\n            }\n            form {\n              @p: .flex, .flexAuto, .w100;\n            }\n            input {\n              @p: .bgWhite10, .br2, .pv16, .ph25, .fw6, .white, .f16, .db, .w100,\n                .tc, .flexAuto, .flex;\n              transition: 0.25s color;\n            }\n            input.valid {\n              @p: .green;\n            }\n            input.invalid {\n              @p: .red;\n            }\n            .content :global(.button) {\n              @p: .ph16;\n              background: #da1b7f;\n            }\n            .content :global(.button:hover) {\n              @p: .ph16, .bgPurple;\n            }\n            h1 {\n              @p: .white80, .fw4, .ml38;\n            }\n            .logo-wrapper {\n              @p: .flex, .justifyCenter, .itemsCenter;\n            }\n            .logo {\n              @p: .flex, .itemsCenter, .mb60, .justifyBetween;\n            }\n            .logo img {\n              width: 78px;\n              height: 78px;\n            }\n          "}</style>
          <div className="logo-wrapper">
            <div className="logo">
              <img src={require('../assets/logo.png')} alt=""/>
              <h1>GraphQL Playground</h1>
            </div>
          </div>
          <form action="" onSubmit={this.submit}>
            <input type="text" placeholder="Enter an endpoint url..." value={this.state.endpoint} onChange={this.onChangeEndpoint} className={cn({
            valid: typeof valid === 'boolean' && valid,
            invalid: typeof valid === 'boolean' && !valid,
        })} autoFocus={true}/>
            {valid && <Button_1.Button onClick={this.close}>Use Endpoint</Button_1.Button>}
          </form>
        </div>
      </Popup_1.default>);
    };
    return EndpointPopup;
}(React.Component));
exports.default = EndpointPopup;
//# sourceMappingURL=EndpointPopup.jsx.map