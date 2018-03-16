"use strict";
/**
 *  Copyright (c) Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 */

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
var ExecuteButton = /** @class */function (_super) {
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
            } else {
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
            var _onMouseUp = function onMouseUp(upEvent) {
                if (initialPress && upEvent.target === downTarget) {
                    initialPress = false;
                } else {
                    document.removeEventListener('mouseup', _onMouseUp);
                    _onMouseUp = null;
                    var isOptionsMenuClicked =
                    // tslint:disable-next-line
                    downTarget.parentNode.compareDocumentPosition(upEvent.target) & Node.DOCUMENT_POSITION_CONTAINED_BY;
                    if (!isOptionsMenuClicked) {
                        // menu calls setState if it was clicked
                        _this.setState({ optionsOpen: false });
                    }
                    if (firstTime) {
                        _this.onOptionSelected(_this.props.operations.find(function (op) {
                            return op.name.value === upEvent.target.textContent;
                        }));
                        firstTime = false;
                    }
                }
            };
            document.addEventListener('mouseup', _onMouseUp);
        };
        _this.state = {
            optionsOpen: false,
            highlight: null
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
            options = React.createElement(
                "ul",
                { className: "execute-options" },
                operations.map(function (operation) {
                    return React.createElement(ExecuteButtonOperation_1.default, { operation: operation, onMouseOver: _this.handleMouseOver, onMouseOut: _this.handleMouseOut, onMouseUp: _this.handleMouseUp, highlight: highlight_1, key: operation.name ? operation.name.value : '*' });
                })
            );
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
        var pathJSX = this.props.isRunning ? React.createElement("rect", { fill: "#FFFFFF", x: "10", y: "10", width: "13", height: "13", rx: "1" }) : React.createElement("path", { d: "M 11 9 L 24 16 L 11 23 z" });
        return React.createElement(
            "div",
            { className: cn('execute-button-wrap', this.props.localTheme), "data-jsx": 2125178026
            },
            React.createElement(_style2.default, {
                styleId: 2125178026,
                css: ".execute-button-wrap[data-jsx=\"2125178026\"] {position: absolute;left: -63px;z-index: 5;top: 15px;margin: 0 14px 0 28px;}.graphcool-execute-button[data-jsx=\"2125178026\"] {background-color: rgb(185, 191, 196);border: 6px solid rgb(11, 20, 28);width: 60px;height: 60px;}.graphcool-execute-button.light[data-jsx=\"2125178026\"] {background-color: #0f202d;border: 6px solid #eeeff0;}.graphcool-execute-button.light[data-jsx=\"2125178026\"] svg {fill: white;}.br100,\n.graphcool-execute-button[data-jsx=\"2125178026\"] {border-radius: 100%;}.flex,\n.graphcool-execute-button[data-jsx=\"2125178026\"] {display: -ms-flexbox;display: flex;}.itemsCenter,\n.graphcool-execute-button[data-jsx=\"2125178026\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.justifyCenter,\n.graphcool-execute-button[data-jsx=\"2125178026\"] {-ms-flex-pack: center;justify-content: center;}.pointer:hover,\n.graphcool-execute-button[data-jsx=\"2125178026\"]:hover {cursor: pointer;}.bgrRed,\n.graphcool-execute-button.running[data-jsx=\"2125178026\"] {background-color: #f25c54;}"
            }),
            React.createElement(
                "div",
                { className: cx('graphcool-execute-button', this.props.localTheme, {
                        running: this.props.isRunning
                    }), onMouseDown: onMouseDown, onClick: onClick, title: "Execute Query (Ctrl-Enter)", "data-jsx": 2125178026
                },
                React.createElement(
                    "svg",
                    { width: "35", height: "35", viewBox: (this.props.isRunning ? 4 : 3) + ".5,4.5,24,24", "data-jsx": 2125178026
                    },
                    pathJSX
                )
            ),
            options
        );
    };
    return ExecuteButton;
}(React.Component);
exports.default = Theme_1.withTheme(ExecuteButton);
//# sourceMappingURL=ExecuteButton.jsx.map