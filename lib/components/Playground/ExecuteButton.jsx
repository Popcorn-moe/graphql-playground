"use strict";
/**
 *  Copyright (c) Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 */
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
var cx = require("classnames");
var Theme_1 = require("../Theme");
var cn = require("classnames");
var ExecuteButtonOperation_1 = require("./ExecuteButtonOperation");
var firstTime = true;
/**
 * ExecuteButton
 *
 * What a nice round shiny button. Shows a drop-down when there are multiple
 * queries to run.
 */
var ExecuteButton = /** @class */ (function (_super) {
    __extends(ExecuteButton, _super);
    function ExecuteButton(props) {
        var _this = _super.call(this, props) || this;
        _this.handleMouseOver = function (operation) {
            _this.setState({ highlight: operation });
        };
        _this.handleMouseOut = function () {
            _this.setState({ highlight: null });
        };
        _this.handleMouseUp = function (operation) {
            _this.onOptionSelected(operation);
        };
        _this.onClick = function () {
            if (_this.props.isRunning) {
                _this.props.onStop();
            }
            else {
                _this.props.onRun();
            }
        };
        _this.onOptionSelected = function (operation) {
            _this.setState({ optionsOpen: false });
            _this.props.onRun(operation.name && operation.name.value);
        };
        _this.onOptionsOpen = function (downEvent) {
            var initialPress = true;
            var downTarget = downEvent.target;
            _this.setState({ highlight: null, optionsOpen: true });
            var onMouseUp = function (upEvent) {
                if (initialPress && upEvent.target === downTarget) {
                    initialPress = false;
                }
                else {
                    document.removeEventListener('mouseup', onMouseUp);
                    onMouseUp = null;
                    var isOptionsMenuClicked = 
                    // tslint:disable-next-line
                    downTarget.parentNode.compareDocumentPosition(upEvent.target) &
                        Node.DOCUMENT_POSITION_CONTAINED_BY;
                    if (!isOptionsMenuClicked) {
                        // menu calls setState if it was clicked
                        _this.setState({ optionsOpen: false });
                    }
                    if (firstTime) {
                        _this.onOptionSelected(_this.props.operations.find(function (op) { return op.name.value === upEvent.target.textContent; }));
                        firstTime = false;
                    }
                }
            };
            document.addEventListener('mouseup', onMouseUp);
        };
        _this.state = {
            optionsOpen: false,
            highlight: null,
        };
        return _this;
    }
    ExecuteButton.prototype.render = function () {
        var _this = this;
        var operations = this.props.operations;
        var optionsOpen = this.state.optionsOpen;
        var hasOptions = operations && operations.length > 1;
        var options = null;
        if (hasOptions && optionsOpen) {
            var highlight_1 = this.state.highlight;
            options = (<ul className="execute-options">
          {operations.map(function (operation) { return (<ExecuteButtonOperation_1.default operation={operation} onMouseOver={_this.handleMouseOver} onMouseOut={_this.handleMouseOut} onMouseUp={_this.handleMouseUp} highlight={highlight_1} key={operation.name ? operation.name.value : '*'}/>); })}
        </ul>);
        }
        // Allow click event if there is a running query or if there are not options
        // for which operation to run.
        var onClick;
        if (this.props.isRunning || !hasOptions) {
            onClick = this.onClick;
        }
        // Allow mouse down if there is no running query, there are options for
        // which operation to run, and the dropdown is currently closed.
        var onMouseDown;
        if (!this.props.isRunning && hasOptions && !optionsOpen) {
            onMouseDown = this.onOptionsOpen;
        }
        var pathJSX = this.props.isRunning ? (<rect fill="#FFFFFF" x="10" y="10" width="13" height="13" rx="1"/>) : (<path d="M 11 9 L 24 16 L 11 23 z"/>);
        return (<div className={cn('execute-button-wrap', this.props.localTheme)}>
        <style jsx={true}>{"\n          .execute-button-wrap {\n            position: absolute;\n            left: -63px;\n            z-index: 5;\n            top: 15px;\n            margin: 0 14px 0 28px;\n          }\n\n          .graphcool-execute-button {\n            @p: .br100, .flex, .itemsCenter, .justifyCenter, .pointer;\n            background-color: rgb(185, 191, 196);\n            border: 6px solid rgb(11, 20, 28);\n            width: 60px;\n            height: 60px;\n          }\n\n          .graphcool-execute-button.light {\n            background-color: #0f202d;\n            border: 6px solid #eeeff0;\n          }\n\n          .graphcool-execute-button.light :global(svg) {\n            fill: white;\n          }\n\n          .graphcool-execute-button.running {\n            @p: .bgrRed;\n          }\n        "}</style>
        <div className={cx('graphcool-execute-button', this.props.localTheme, {
            running: this.props.isRunning,
        })} onMouseDown={onMouseDown} onClick={onClick} title="Execute Query (Ctrl-Enter)">
          <svg width="35" height="35" viewBox={(this.props.isRunning ? 4 : 3) + ".5,4.5,24,24"}>
            {pathJSX}
          </svg>
        </div>
        {options}
      </div>);
    };
    return ExecuteButton;
}(React.Component));
exports.default = Theme_1.withTheme(ExecuteButton);
//# sourceMappingURL=ExecuteButton.jsx.map