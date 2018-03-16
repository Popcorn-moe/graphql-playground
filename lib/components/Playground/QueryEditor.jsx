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
var onHasCompletion_1 = require("./onHasCompletion");
var QueryEditor = /** @class */ (function (_super) {
    __extends(QueryEditor, _super);
    function QueryEditor(props) {
        var _this = _super.call(this) || this;
        _this.setRef = function (ref) {
            _this.node = ref;
        };
        _this.onKeyUp = function (_, event) {
            if (_this.props.useVim) {
                return;
            }
            var code = event.keyCode;
            if ((code >= 65 && code <= 90) || // letters
                (!event.shiftKey && code >= 48 && code <= 57) || // numbers
                (event.shiftKey && code === 189) || // underscore
                (event.shiftKey && code === 50) || // @
                (event.shiftKey && code === 57) // (
            ) {
                _this.editor.execCommand('autocomplete');
            }
        };
        _this.onEdit = function () {
            if (!_this.ignoreChangeEvent) {
                _this.cachedValue = _this.editor.getValue();
                if (_this.props.onEdit) {
                    _this.props.onEdit(_this.cachedValue);
                }
            }
        };
        /**
         * Render a custom UI for CodeMirror's hint which includes additional info
         * about the type and description for the selected context.
         */
        _this.onHasCompletion = function (cm, data) {
            onHasCompletion_1.default(cm, data, _this.props.onHintInformationRender);
        };
        // Keep a cached version of the value, this cache will be updated when the
        // editor is updated, which can later be used to protect the editor from
        // unnecessary updates during the update lifecycle.
        _this.cachedValue = props.value || '';
        return _this;
    }
    QueryEditor.prototype.componentDidMount = function () {
        var _this = this;
        // Lazily require to ensure requiring GraphiQL outside of a Browser context
        // does not produce an error.
        var CodeMirror = require('codemirror');
        require('codemirror/addon/hint/show-hint');
        require('codemirror/addon/comment/comment');
        require('codemirror/addon/edit/matchbrackets');
        require('codemirror/addon/edit/closebrackets');
        require('codemirror/addon/fold/foldgutter');
        require('codemirror/addon/fold/brace-fold');
        require('codemirror/addon/lint/lint');
        require('codemirror/addon/display/placeholder');
        require('codemirror/keymap/sublime');
        require('codemirror/keymap/vim');
        require('codemirror-graphql/hint');
        require('codemirror-graphql/lint');
        require('codemirror-graphql/mode');
        var gutters = [];
        if (!this.props.hideLineNumbers) {
            gutters.push('CodeMirror-linenumbers');
        }
        if (!this.props.hideGutters) {
            gutters.push('CodeMirror-foldgutter');
        }
        var foldGutter = {};
        if (!this.props.hideGutters) {
            foldGutter = {
                minFoldSize: 4,
            };
        }
        this.editor = CodeMirror(this.node, {
            autofocus: !this.props.disableAutofocus,
            placeholder: this.props.placeholder,
            value: this.props.value || '',
            lineNumbers: !this.props.hideLineNumbers,
            tabSize: 2,
            mode: 'graphql',
            theme: 'graphiql',
            keyMap: this.props.useVim ? 'vim' : 'sublime',
            autoCloseBrackets: true,
            matchBrackets: true,
            showCursorWhenSelecting: true,
            readOnly: Boolean(this.props.readOnly),
            foldGutter: foldGutter,
            lint: {
                schema: this.props.schema,
            },
            hintOptions: {
                schema: this.props.schema,
                closeOnUnfocus: true,
                completeSingle: false,
            },
            gutters: gutters,
            extraKeys: {
                'Cmd-Space': function () { return _this.editor.showHint({ completeSingle: true }); },
                'Ctrl-Space': function () { return _this.editor.showHint({ completeSingle: true }); },
                'Alt-Space': function () { return _this.editor.showHint({ completeSingle: true }); },
                'Shift-Space': function () { return _this.editor.showHint({ completeSingle: true }); },
                'Cmd-Enter': function () {
                    if (_this.props.onRunQuery) {
                        _this.props.onRunQuery();
                    }
                },
                'Ctrl-Enter': function () {
                    if (_this.props.onRunQuery) {
                        _this.props.onRunQuery();
                    }
                },
                // Editor improvements
                'Ctrl-Left': 'goSubwordLeft',
                'Ctrl-Right': 'goSubwordRight',
                'Alt-Left': 'goGroupLeft',
                'Alt-Right': 'goGroupRight',
            },
        });
        this.editor.on('change', this.onEdit);
        this.editor.on('keyup', this.onKeyUp);
        this.editor.on('hasCompletion', this.onHasCompletion);
        global.editor = this.editor;
    };
    QueryEditor.prototype.componentDidUpdate = function (prevProps) {
        var CodeMirror = require('codemirror');
        // Ensure the changes caused by this update are not interpretted as
        // user-input changes which could otherwise result in an infinite
        // event loop.
        this.ignoreChangeEvent = true;
        if (this.props.schema !== prevProps.schema) {
            this.editor.options.lint.schema = this.props.schema;
            this.editor.options.hintOptions.schema = this.props.schema;
            if (this.props.schema) {
                this.editor.options.hintOptions.schema.getType = function (type) {
                    return type;
                };
            }
            CodeMirror.signal(this.editor, 'change', this.editor);
        }
        if (this.props.value !== prevProps.value &&
            this.props.value !== this.cachedValue) {
            this.cachedValue = this.props.value;
            this.editor.setValue(this.props.value);
        }
        if (this.props.useVim !== prevProps.useVim) {
            this.editor.options.keyMap = this.props.useVim ? 'vim' : 'sublime';
            CodeMirror.signal(this.editor, 'change', this.editor);
        }
        if (this.props.readOnly !== prevProps.readOnly) {
            this.editor.options.readOnly = this.props.readOnly;
            CodeMirror.signal(this.editor, 'change', this.editor);
        }
        this.ignoreChangeEvent = false;
    };
    QueryEditor.prototype.componentWillUnmount = function () {
        this.editor.off('change', this.onEdit);
        this.editor.off('keyup', this.onKeyUp);
        this.editor.off('hasCompletion', this.onHasCompletion);
        this.editor = null;
    };
    QueryEditor.prototype.render = function () {
        return <div className="query-editor" ref={this.setRef}/>;
    };
    /**
     * Public API for retrieving the CodeMirror instance from this
     * React component.
     */
    QueryEditor.prototype.getCodeMirror = function () {
        return this.editor;
    };
    /**
     * Public API for retrieving the DOM client height for this component.
     */
    QueryEditor.prototype.getClientHeight = function () {
        return this.node && this.node.clientHeight;
    };
    return QueryEditor;
}(React.Component));
exports.QueryEditor = QueryEditor;
//# sourceMappingURL=QueryEditor.jsx.map