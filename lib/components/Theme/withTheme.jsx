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
var PropTypes = require("prop-types");
function withTheme(Component) {
    return _a = /** @class */ (function (_super) {
            __extends(WithTheme, _super);
            function WithTheme() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.rerender = function () {
                    if (_this.mounted) {
                        _this.forceUpdate();
                    }
                };
                return _this;
            }
            WithTheme.prototype.componentDidMount = function () {
                // subscribe to future theme changes
                this.mounted = true;
                this.context.localTheme.subscribe(this.rerender);
            };
            WithTheme.prototype.componentWillUnmount = function () {
                this.mounted = false;
                this.context.localTheme.unsubscribe(this.rerender);
            };
            WithTheme.prototype.render = function () {
                return (<Component localTheme={this.context.localTheme.theme} {...this.props}/>);
            };
            return WithTheme;
        }(React.Component)),
        _a.contextTypes = {
            localTheme: PropTypes.object,
        },
        _a;
    var _a;
}
exports.default = withTheme;
//# sourceMappingURL=withTheme.jsx.map