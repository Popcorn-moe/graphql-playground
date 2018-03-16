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
var styled_1 = require("../styled");
var theme = require("styled-theming");
var TopBar_1 = require("./Playground/TopBar/TopBar");
var ConfigEditor_1 = require("./Playground/ConfigEditor");
// TODO: Trigger onSave on CMD+S or CTRL+S
var SettingsEditor = /** @class */ (function (_super) {
    __extends(SettingsEditor, _super);
    function SettingsEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleKeydown = function (e) {
            if (e.key === 's' && e.metaKey) {
                e.preventDefault();
                _this.props.onSave();
            }
        };
        return _this;
    }
    SettingsEditor.prototype.componentDidMount = function () {
        window.addEventListener('keydown', this.handleKeydown, true);
    };
    SettingsEditor.prototype.render = function () {
        var isConfig = this.props.isConfig;
        return (<Wrapper className="graphiql-container">
        <div className="editorWrap">
          <div className="variable-editor">
            <ConfigEditor_1.ConfigEditor value={this.props.value} onEdit={this.props.onChange} onRunQuery={this.props.onSave} isYaml={this.props.isYaml} readOnly={this.props.readOnly}/>
          </div>
        </div>
        {!this.props.readOnly && (<ButtonWrapper>
            <TopBar_1.Button onClick={this.props.onSave}>
              Save {isConfig ? "Config" : "Settings"}
            </TopBar_1.Button>
          </ButtonWrapper>)}
      </Wrapper>);
    };
    return SettingsEditor;
}(React.Component));
exports.default = SettingsEditor;
var backgroundColor = theme('mode', {
    light: function (p) { return p.theme.colours.darkBlue10; },
    dark: function (p) { return p.theme.colours.darkBlue; },
});
var Wrapper = styled_1.styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: ", ";\n  position: relative;\n  .variable-editor {\n    height: 100% !important;\n  }\n  .CodeMirror {\n    background: none !important;\n    .CodeMirror-code {\n      color: rgba(255, 255, 255, 0.7);\n    }\n    .cm-atom {\n      color: rgba(42, 126, 210, 1);\n    }\n  }\n  .CodeMirror-gutters {\n    background: none !important;\n  }\n"], ["\n  background: ", ";\n  position: relative;\n  .variable-editor {\n    height: 100% !important;\n  }\n  .CodeMirror {\n    background: none !important;\n    .CodeMirror-code {\n      color: rgba(255, 255, 255, 0.7);\n    }\n    .cm-atom {\n      color: rgba(42, 126, 210, 1);\n    }\n  }\n  .CodeMirror-gutters {\n    background: none !important;\n  }\n"])), backgroundColor);
var ButtonWrapper = styled_1.styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  z-index: 2;\n"], ["\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  z-index: 2;\n"])));
var templateObject_1, templateObject_2;
//# sourceMappingURL=SettingsEditor.jsx.map