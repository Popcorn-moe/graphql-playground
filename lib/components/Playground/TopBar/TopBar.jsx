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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var index_1 = require("../../../styled/index");
var theme = require("styled-theming");
var polished_1 = require("polished");
var CopyToClipboard = require("react-copy-to-clipboard");
var Share_1 = require("../../Share");
var graphcool_styles_1 = require("graphcool-styles");
var cx = require("classnames");
var TopBar = /** @class */ (function (_super) {
    __extends(TopBar, _super);
    function TopBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (e) {
            if (typeof _this.props.onChangeEndpoint === 'function') {
                _this.props.onChangeEndpoint(e.target.value);
            }
        };
        _this.onKeyDown = function (e) {
            if (e.keyCode === 13 && typeof _this.props.onReloadSchema === 'function') {
                _this.props.onReloadSchema();
            }
        };
        return _this;
    }
    TopBar.prototype.render = function () {
        return (<TopBarWrapper>
        <exports.Button onClick={this.props.onClickPrettify}>Prettify</exports.Button>
        <exports.Button onClick={this.props.onClickHistory}>History</exports.Button>
        <UrlBarWrapper>
          <UrlBar value={this.props.endpoint} onChange={this.onChange} onKeyDown={this.onKeyDown} onBlur={this.props.onReloadSchema} disabled={this.props.fixedEndpoint} className={cx({ active: !this.props.fixedEndpoint })}/>
          <ReloadIcon src={require('graphcool-styles/icons/fill/reload.svg')} width={20} height={20} onClick={this.props.onReloadSchema}/>
        </UrlBarWrapper>
        <CopyToClipboard text={this.props.curl}>
          <exports.Button>Copy CURL</exports.Button>
        </CopyToClipboard>
        {this.props.sharing && (<Share_1.default {...this.props.sharing}>
            <exports.Button>Share Playground</exports.Button>
          </Share_1.default>)}
      </TopBarWrapper>);
    };
    return TopBar;
}(React.Component));
exports.default = TopBar;
var buttonColor = theme('mode', {
    light: function (p) { return p.theme.colours.darkBlue10; },
    dark: function (p) { return p.theme.colours.darkerBlue; },
});
var buttonHoverColor = theme('mode', {
    light: function (p) { return polished_1.darken(0.02, p.theme.colours.darkBlue20); },
    dark: function (p) { return polished_1.lighten(0.02, p.theme.colours.darkerBlue); },
});
var backgroundColor = theme('mode', {
    light: function (p) { return '#eeeff0'; },
    dark: function (p) { return p.theme.colours.darkBlue; },
});
var inactiveFontColor = theme('mode', {
    light: function (p) { return p.theme.colours.darkBlue30; },
    dark: function (p) { return p.theme.colours.white30; },
});
var fontColor = theme('mode', {
    light: function (p) { return p.theme.colours.darkBlue60; },
    dark: function (p) { return p.theme.colours.white60; },
});
var iconColor = theme('mode', {
    light: function (p) { return p.theme.colours.darkBlue20; },
    dark: function (p) { return p.theme.colours.white20; },
});
var iconColorHover = theme('mode', {
    light: function (p) { return p.theme.colours.darkBlue60; },
    dark: function (p) { return p.theme.colours.white60; },
});
var barBorder = theme('mode', {
    light: function (p) { return p.theme.colours.darkBlue20; },
    dark: function (p) { return '#09141c'; },
});
exports.Button = index_1.styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  text-transform: uppercase;\n  font-weight: 600;\n  color: ", ";\n  background: ", ";\n  border-radius: 2px;\n  flex: 0 0 auto;\n  letter-spacing: 0.53px;\n  font-size: 14px;\n  padding: 6px 9px 7px 10px;\n  * + & {\n    margin-left: 6px;\n  }\n  cursor: pointer;\n  transition: 0.1s linear background-color;\n  &:hover {\n    background-color: ", ";\n  }\n"], ["\n  text-transform: uppercase;\n  font-weight: 600;\n  color: ", ";\n  background: ", ";\n  border-radius: 2px;\n  flex: 0 0 auto;\n  letter-spacing: 0.53px;\n  font-size: 14px;\n  padding: 6px 9px 7px 10px;\n  * + & {\n    margin-left: 6px;\n  }\n  cursor: pointer;\n  transition: 0.1s linear background-color;\n  &:hover {\n    background-color: ", ";\n  }\n"])), fontColor, buttonColor, buttonHoverColor);
var TopBarWrapper = index_1.styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  background: ", ";\n  padding: 10px;\n  padding-bottom: 4px;\n  align-items: center;\n"], ["\n  display: flex;\n  background: ", ";\n  padding: 10px;\n  padding-bottom: 4px;\n  align-items: center;\n"])), backgroundColor);
var UrlBar = index_1.styled.input(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background: ", ";\n  border-radius: 4px;\n  color: ", ";\n  border: 1px solid ", ";\n  padding: 6px 12px;\n  font-size: 13px;\n  flex: 1;\n  &.active {\n    color: ", ";\n  }\n"], ["\n  background: ", ";\n  border-radius: 4px;\n  color: ", ";\n  border: 1px solid ", ";\n  padding: 6px 12px;\n  font-size: 13px;\n  flex: 1;\n  &.active {\n    color: ", ";\n  }\n"])), buttonColor, inactiveFontColor, barBorder, fontColor);
var UrlBarWrapper = index_1.styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  flex: 1;\n  margin-left: 6px;\n  position: relative;\n  display: flex;\n  align-items: center;\n"], ["\n  flex: 1;\n  margin-left: 6px;\n  position: relative;\n  display: flex;\n  align-items: center;\n"])));
var ReloadIcon = index_1.styled(graphcool_styles_1.Icon)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  position: absolute;\n  right: 5px;\n  cursor: pointer;\n  svg {\n    fill: ", ";\n    transition: 0.1s linear all;\n    &:hover {\n      fill: ", ";\n    }\n  }\n"], ["\n  position: absolute;\n  right: 5px;\n  cursor: pointer;\n  svg {\n    fill: ", ";\n    transition: 0.1s linear all;\n    &:hover {\n      fill: ", ";\n    }\n  }\n"])), iconColor, iconColorHover);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=TopBar.jsx.map