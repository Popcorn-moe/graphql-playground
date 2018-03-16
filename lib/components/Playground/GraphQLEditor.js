"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var graphql_1 = require("graphql");
var cn = require("classnames");
var ExecuteButton_1 = require("./ExecuteButton");
var QueryEditor_1 = require("./QueryEditor");
var VariableEditor_1 = require("graphiql/dist/components/VariableEditor");
var CodeMirrorSizer_1 = require("graphiql/dist/utility/CodeMirrorSizer");
var getQueryFacts_1 = require("graphiql/dist/utility/getQueryFacts");
var getSelectedOperationName_1 = require("graphiql/dist/utility/getSelectedOperationName");
var debounce_1 = require("graphiql/dist/utility/debounce");
var find_1 = require("graphiql/dist/utility/find");
var fillLeafs_1 = require("graphiql/dist/utility/fillLeafs");
var elementPosition_1 = require("graphiql/dist/utility/elementPosition");
var react_redux_1 = require("react-redux");
var constants_1 = require("../../constants");
var Spinner_1 = require("../Spinner");
var Results_1 = require("./Results");
var ResponseTracing_1 = require("./ResponseTracing");
var withTheme_1 = require("../Theme/withTheme");
var GraphDocs_1 = require("./DocExplorer/GraphDocs");
var graphiql_docs_1 = require("../../actions/graphiql-docs");
var stack_1 = require("./util/stack");
var sessionDocs_1 = require("../../selectors/sessionDocs");
var index_1 = require("../../styled/index");
var TopBar_1 = require("./TopBar/TopBar");
var GraphQLEditor = /** @class */function (_super) {
    __extends(GraphQLEditor, _super);
    function GraphQLEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.resultID = 0;
        _this.updateQueryFacts = debounce_1.default(150, function (query) {
            var queryFacts = getQueryFacts_1.default(_this.state.schema, query);
            if (queryFacts) {
                // Update operation name should any query names change.
                var operationName = getSelectedOperationName_1.default(_this.state.operations, _this.state.operationName, queryFacts.operations);
                // Report changing of operationName if it changed.
                var onEditOperationName = _this.props.onEditOperationName;
                if (onEditOperationName && operationName !== _this.state.operationName) {
                    onEditOperationName(operationName);
                }
                _this.setState(__assign({ operationName: operationName }, queryFacts));
            }
        });
        _this.getCurl = function () {
            var data = JSON.stringify({
                query: _this.state.query,
                variables: _this.state.variables,
                operationName: _this.state.operationName
            });
            return "curl '" + _this.props.session.endpoint + "' -H 'Origin: " + (location.origin || _this.props.session.endpoint) + "' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: */*' -H 'Connection: keep-alive' -H 'DNT: 1' --data-binary '" + data + "' --compressed";
        };
        _this.setQueryVariablesRef = function (ref) {
            _this.queryVariablesRef = ref;
        };
        _this.setHttpHeadersRef = function (ref) {
            _this.httpHeadersRef = ref;
        };
        _this.setQueryResizer = function (ref) {
            _this.queryResizer = ReactDOM.findDOMNode(ref);
        };
        _this.setResponseResizer = function (ref) {
            _this.responseResizer = ReactDOM.findDOMNode(ref);
        };
        _this.setEditorBarComponent = function (ref) {
            _this.editorBarComponent = ref;
        };
        _this.setQueryEditorComponent = function (ref) {
            _this.queryEditorComponent = ref;
        };
        _this.setVariableEditorComponent = function (ref) {
            _this.variableEditorComponent = ref;
        };
        _this.setResultComponent = function (ref) {
            _this.resultComponent = ref;
        };
        // Private methods
        _this.reloadSchema = function () {
            return __awaiter(_this, void 0, void 0, function () {
                var result, schema;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.props.schemaFetcher.refetch(this.props.session.endpoint || this.props.endpoint, this.convertHeaders(this.props.session.headers))];
                        case 1:
                            result = _a.sent();
                            if (result) {
                                schema = result.schema;
                                this.setState({ schema: schema });
                                this.renewStacks(schema);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.storageGet = function (name) {
            if (_this.storage) {
                var value = _this.storage.getItem('graphiql:' + name);
                // Clean up any inadvertently saved null/undefined values.
                if (value === 'null' || value === 'undefined') {
                    _this.storage.removeItem('graphiql:' + name);
                } else {
                    return value;
                }
            }
        };
        _this.storageSet = function (name, value) {
            if (_this.storage) {
                if (value !== undefined) {
                    _this.storage.setItem('graphiql:' + name, value);
                } else {
                    _this.storage.removeItem('graphiql:' + name);
                }
            }
        };
        _this.handleRunQuery = function (selectedOperationName) {
            _this.editorQueryID++;
            var queryID = _this.editorQueryID;
            // Use the edited query after autoCompleteLeafs() runs or,
            // in case autoCompletion fails (the function returns undefined),
            // the current query from the editor.
            var editedQuery = _this.autoCompleteLeafs() || _this.state.query;
            var variables = _this.state.variables;
            var operationName = _this.state.operationName;
            // If an operation was explicitly provided, different from the current
            // operation name, then report that it changed.
            if (selectedOperationName && selectedOperationName !== operationName) {
                operationName = selectedOperationName;
                var onEditOperationName = _this.props.onEditOperationName;
                if (onEditOperationName) {
                    onEditOperationName(operationName);
                }
            }
            try {
                _this.setState({
                    isWaitingForResponse: true,
                    responses: [{ date: null, time: new Date() }],
                    operationName: operationName,
                    nextQueryStartTime: new Date()
                });
                // _fetchQuery may return a subscription.
                var subscription = _this.fetchQuery(editedQuery, variables, operationName, function (result) {
                    if (queryID === _this.editorQueryID) {
                        var extensions_1;
                        if (result.extensions) {
                            extensions_1 = result.extensions;
                            if (_this.props.shouldHideTracingResponse) {
                                delete result.extensions.tracing;
                            }
                        }
                        var isSubscription = false;
                        if (result.isSubscription) {
                            isSubscription = true;
                            delete result.isSubscription;
                        }
                        var responses_1;
                        var response = JSON.stringify(result, null, 2);
                        if (isSubscription) {
                            responses_1 = _this.state.responses.filter(function (res) {
                                return res && res.date;
                            }).slice(0, 100).concat({
                                date: response,
                                time: new Date(),
                                resultID: _this.resultID++
                            });
                        } else {
                            responses_1 = [{ date: response, time: new Date(), resultID: _this.resultID++ }];
                        }
                        _this.setState(function (state) {
                            return {
                                isWaitingForResponse: false,
                                responses: responses_1,
                                responseExtensions: extensions_1,
                                currentQueryStartTime: state.nextQueryStartTime,
                                nextQueryStartTime: undefined,
                                currentQueryEndTime: new Date()
                            };
                        });
                    }
                });
                _this.setState({ subscription: subscription });
            } catch (error) {
                _this.setState({
                    isWaitingForResponse: false,
                    responses: [{ date: error.message, time: new Date() }]
                });
            }
        };
        _this.handleStopQuery = function () {
            var subscription = _this.state.subscription;
            _this.setState({
                isWaitingForResponse: false,
                subscription: null
            });
            if (subscription) {
                subscription.unsubscribe();
            }
        };
        _this.handlePrettifyQuery = function () {
            var query = graphql_1.print(graphql_1.parse(_this.state.query));
            var editor = _this.queryEditorComponent.getCodeMirror();
            editor.setValue(query);
        };
        _this.handleEditQuery = function (value) {
            if (_this.state.schema) {
                _this.updateQueryFacts(value);
            }
            _this.setState({ query: value });
            if (_this.props.onEditQuery) {
                return _this.props.onEditQuery(value);
            }
            return null;
        };
        _this.handleEditVariables = function (value) {
            _this.setState({ variables: value });
            if (_this.props.onEditVariables) {
                _this.props.onEditVariables(value);
            }
        };
        _this.handleHintInformationRender = function (elem) {
            elem.addEventListener('click', _this.onClickHintInformation);
            var _onRemoveFn;
            elem.addEventListener('DOMNodeRemoved', _onRemoveFn = function onRemoveFn() {
                elem.removeEventListener('DOMNodeRemoved', _onRemoveFn);
                elem.removeEventListener('click', _this.onClickHintInformation);
            });
        };
        _this.handleEditorRunQuery = function () {
            _this.runQueryAtCursor();
        };
        _this.handleResizeStart = function (downEvent) {
            if (_this.props.disableResize) {
                return;
            }
            if (!_this.didClickDragBar(downEvent)) {
                return;
            }
            downEvent.preventDefault();
            var offset = downEvent.clientX - elementPosition_1.getLeft(downEvent.target);
            var onMouseMove = function onMouseMove(moveEvent) {
                if (moveEvent.buttons === 0) {
                    return _onMouseUp();
                }
                var editorBar = ReactDOM.findDOMNode(_this.editorBarComponent);
                var leftSize = moveEvent.clientX - elementPosition_1.getLeft(editorBar) - offset;
                var rightSize = editorBar.clientWidth - leftSize;
                _this.setState({ editorFlex: leftSize / rightSize });
            };
            var _onMouseUp = function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', _onMouseUp);
                onMouseMove = null;
                _onMouseUp = null;
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', _onMouseUp);
        };
        _this.handleTracingResizeStart = function (downEvent) {
            downEvent.preventDefault();
            var didMove = false;
            var wasOpen = _this.state.responseTracingOpen;
            var hadHeight = _this.state.responseTracingHeight;
            var offset = downEvent.clientY - elementPosition_1.getTop(downEvent.target);
            var onMouseMove = function onMouseMove(moveEvent) {
                if (moveEvent.buttons === 0) {
                    return _onMouseUp2();
                }
                didMove = true;
                var editorBar = ReactDOM.findDOMNode(_this.editorBarComponent);
                var topSize = moveEvent.clientY - elementPosition_1.getTop(editorBar) - offset;
                var bottomSize = editorBar.clientHeight - topSize;
                if (bottomSize < 60) {
                    _this.setState({
                        responseTracingOpen: false,
                        responseTracingHeight: hadHeight
                    });
                } else {
                    _this.setState({
                        responseTracingOpen: true,
                        responseTracingHeight: bottomSize
                    });
                }
            };
            var _onMouseUp2 = function onMouseUp() {
                if (!didMove) {
                    _this.setState({ responseTracingOpen: !wasOpen });
                }
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', _onMouseUp2);
                onMouseMove = null;
                _onMouseUp2 = null;
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', _onMouseUp2);
        };
        _this.selectQueryVariables = function () {
            _this.setState({ queryVariablesActive: true });
            _this.storageSet('queryVariablesActive', 'true');
        };
        _this.selectHttpHeaders = function () {
            _this.setState({ queryVariablesActive: false });
            _this.storageSet('queryVariablesActive', 'false');
        };
        _this.handleVariableResizeStart = function (downEvent) {
            downEvent.preventDefault();
            var didMove = false;
            var wasOpen = _this.state.variableEditorOpen;
            var hadHeight = _this.state.variableEditorHeight;
            var offset = downEvent.clientY - elementPosition_1.getTop(downEvent.target);
            if (wasOpen && (downEvent.target === _this.queryVariablesRef || downEvent.target === _this.httpHeadersRef)) {
                return;
            }
            var onMouseMove = function onMouseMove(moveEvent) {
                if (moveEvent.buttons === 0) {
                    return _onMouseUp3();
                }
                didMove = true;
                var editorBar = ReactDOM.findDOMNode(_this.editorBarComponent);
                var topSize = moveEvent.clientY - elementPosition_1.getTop(editorBar) - offset;
                var bottomSize = editorBar.clientHeight - topSize;
                if (bottomSize < 60) {
                    _this.setState({
                        variableEditorOpen: false,
                        variableEditorHeight: hadHeight
                    });
                } else {
                    _this.setState({
                        variableEditorOpen: true,
                        variableEditorHeight: bottomSize
                    });
                }
            };
            var _onMouseUp3 = function onMouseUp() {
                if (!didMove) {
                    _this.setState({ variableEditorOpen: !wasOpen });
                }
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', _onMouseUp3);
                onMouseMove = null;
                _onMouseUp3 = null;
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', _onMouseUp3);
        };
        _this.onClickHintInformation = function (event) {
            if (event.target.className === 'typeName') {
                var typeName = event.target.innerHTML;
                var schema = _this.state.schema;
                if (schema) {
                    var type_1 = schema.getType(typeName);
                    if (type_1) {
                        _this.setState({ docExplorerOpen: true }, function () {
                            _this.docExplorerComponent.showDoc(type_1);
                        });
                    }
                }
            }
        };
        // Cache the storage instance
        _this.storage = props.storage || typeof window !== 'undefined' ? window.localStorage : {
            setItem: function setItem() {
                return null;
            },
            removeItem: function removeItem() {
                return null;
            },
            getItem: function getItem() {
                return null;
            }
        };
        // Determine the initial query to display.
        var query = props.query !== undefined ? props.query : _this.storageGet('query') !== null ? _this.storageGet('query') : props.defaultQuery !== undefined ? props.defaultQuery : constants_1.defaultQuery;
        // Get the initial query facts.
        var queryFacts = getQueryFacts_1.default(null, query);
        // Determine the initial variables to display.
        var variables = props.variables !== undefined ? props.variables : _this.storageGet('variables');
        // Determine the initial operationName to use.
        var operationName = props.operationName !== undefined ? props.operationName : getSelectedOperationName_1.default(null, _this.storageGet('operationName'), queryFacts && queryFacts.operations);
        var queryVariablesActive = _this.storageGet('queryVariablesActive');
        queryVariablesActive = queryVariablesActive === 'true' ? true : queryVariablesActive === 'false' ? false : true;
        // Initialize state
        _this.state = __assign({ query: query,
            variables: variables,
            operationName: operationName, responses: props.responses || [], editorFlex: Number(_this.storageGet('editorFlex')) || 1, variableEditorOpen: queryVariablesActive ? Boolean(variables) : props.session.headers && props.session.headers.length > 0, variableEditorHeight: Number(_this.storageGet('variableEditorHeight')) || 200, responseTracingOpen: false, responseTracingHeight: Number(_this.storageGet('responseTracingHeight')) || 300, docExplorerOpen: false, docExplorerWidth: Number(_this.storageGet('docExplorerWidth')) || 350, schemaExplorerOpen: false, schemaExplorerWidth: Number(_this.storageGet('schemaExplorerWidth')) || 350, isWaitingForResponse: false, subscription: null, selectedVariableNames: [], queryVariablesActive: queryVariablesActive }, queryFacts);
        // Ensure only the last executed editor query is rendered.
        _this.editorQueryID = 0;
        // Subscribe to the browser window closing, treating it as an unmount.
        if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
            window.addEventListener('beforeunload', function () {
                return _this.componentWillUnmount();
            });
        }
        return _this;
    }
    GraphQLEditor.prototype.componentDidMount = function () {
        // Ensure a form of a schema exists (including `null`) and
        // if not, fetch one using an introspection query.
        this.ensureOfSchema();
        // Utility for keeping CodeMirror correctly sized.
        this.codeMirrorSizer = new CodeMirrorSizer_1.default();
        global.g = this;
    };
    GraphQLEditor.prototype.componentWillReceiveProps = function (nextProps) {
        var nextSchema = this.state.schema;
        var nextQuery = this.state.query;
        var nextVariables = this.state.variables;
        var nextOperationName = this.state.operationName;
        var nextResponses = this.state.responses;
        if (nextProps.schema !== undefined) {
            nextSchema = nextProps.schema;
        }
        if (nextProps.query !== undefined && (this.props.rerenderQuery || nextProps.rerenderQuery)) {
            nextQuery = nextProps.query;
        }
        if (nextProps.variables !== undefined) {
            nextVariables = nextProps.variables;
        }
        if (nextProps.operationName !== undefined) {
            nextOperationName = nextProps.operationName;
        }
        if (nextProps.responses !== undefined) {
            nextResponses = nextProps.responses;
        }
        if (nextSchema !== this.state.schema || nextQuery !== this.state.query || nextOperationName !== this.state.operationName) {
            this.updateQueryFacts(nextQuery);
        }
        this.setState({
            schema: nextSchema,
            query: nextQuery,
            variables: nextVariables,
            operationName: nextOperationName,
            responses: nextResponses
        });
    };
    GraphQLEditor.prototype.componentDidUpdate = function () {
        // If this update caused DOM nodes to have changed sizes, update the
        // corresponding CodeMirror instance sizes to match.
        var components = [this.queryEditorComponent, this.variableEditorComponent];
        this.codeMirrorSizer.updateSizes(components);
        if (this.resultComponent && Boolean(this.state.subscription)) {
            this.resultComponent.scrollTop = this.resultComponent.scrollHeight;
        }
    };
    // When the component is about to unmount, store any persistable state, such
    // that when the component is remounted, it will use the last used values.
    GraphQLEditor.prototype.componentWillUnmount = function () {
        this.storageSet('query', this.state.query);
        this.storageSet('variables', this.state.variables);
        this.storageSet('operationName', this.state.operationName);
        this.storageSet('editorFlex', this.state.editorFlex);
        this.storageSet('variableEditorHeight', this.state.variableEditorHeight);
    };
    GraphQLEditor.prototype.getHeaderCount = function () {
        try {
            var headers = JSON.parse(this.props.session.headers);
            return "(" + Object.keys(headers).length + ")";
        } catch (e) {
            //
        }
        return '';
    };
    GraphQLEditor.prototype.render = function () {
        var children = React.Children.toArray(this.props.children);
        var footer = find_1.default(children, function (child) {
            return child.type === GraphQLEditor.Footer;
        });
        var queryWrapStyle = {
            WebkitFlex: this.state.editorFlex,
            flex: this.state.editorFlex
        };
        var variableOpen = this.state.variableEditorOpen;
        var variableStyle = {
            height: variableOpen ? this.state.variableEditorHeight : null
        };
        var tracingOpen = this.state.responseTracingOpen;
        var tracingStyle = {
            height: tracingOpen ? this.state.responseTracingHeight : null
        };
        return React.createElement(
            "div",
            { className: cn('graphiql-container', { isActive: this.props.isActive }), "data-jsx": 1118272408
            },
            React.createElement(_style2.default, {
                styleId: 2096267437,
                css: ".graphiql-container[data-jsx=\"1118272408\"] {font-family: Open Sans, sans-serif;}.docs-button[data-jsx=\"1118272408\"],.schema-button[data-jsx=\"1118272408\"] {padding-bottom: 8px;-webkit-transform: rotate(-90deg);transform: rotate(-90deg);left: -44px;top: 195px;}div.schema-button[data-jsx=\"1118272408\"] {left: -53px;top: 120px;}.queryWrap[data-jsx=\"1118272408\"] {border-top: 8px solid rgba(23, 42, 58, 1);}.queryWrap.light[data-jsx=\"1118272408\"] {border-top: 8px solid #eeeff0;}.graphiql-button[data-jsx=\"1118272408\"] {padding: 5px 9px 6px 9px;letter-spacing: 0.53px;}.graphiql-button.prettify[data-jsx=\"1118272408\"] {top: -57px;right: 38px;z-index: 2;}.download-button[data-jsx=\"1118272408\"] {right: 25px;padding: 5px 9px 6px 9px;letter-spacing: 0.53px;z-index: 2;background-color: rgba(15, 32, 46, 1) !important;top: auto !important;top: initial !important;bottom: 21px !important;}.intro[data-jsx=\"1118272408\"] {font-family: 'Source Code Pro', 'Consolas', 'Inconsolata',              'Droid Sans Mono', 'Monaco', monospace;letter-spacing: 0.6px;width: 235px;}.listening[data-jsx=\"1118272408\"] {font-family: 'Source Code Pro', 'Consolas', 'Inconsolata',              'Droid Sans Mono', 'Monaco', monospace;letter-spacing: 0.6px;padding-left: 24px;padding-bottom: 30px;}.onboarding-hint.step1[data-jsx=\"1118272408\"] {top: 207px;left: 90px;}.onboarding-hint.step2[data-jsx=\"1118272408\"] {top: 207px;left: 90px;}.absolute,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"],\n.graphiql-button.prettify[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"],\n.intro[data-jsx=\"1118272408\"],\n.listening[data-jsx=\"1118272408\"],\n.onboarding-hint[data-jsx=\"1118272408\"] {position: absolute;}.white,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"] {color: #fff;}.bgGreen,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"] {background-color: #27ae60;}.pa6,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"] {padding: 6px;}.br2,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"],\n.graphiql-button[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"],\n.onboarding-hint[data-jsx=\"1118272408\"] {border-radius: 2px;}.z2,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"] {z-index: 2;}.ttu,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"],\n.graphiql-button[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"] {text-transform: uppercase;}.fw6,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"],\n.graphiql-button[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"] {font-weight: 600;}.f14,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"],\n.graphiql-button[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"] {font-size: 14px;}.ph10,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"] {padding-left: 10px;padding-right: 10px;}.pointer:hover,\n.docs-button[data-jsx=\"1118272408\"]:hover,\n.schema-button[data-jsx=\"1118272408\"]:hover,\n.graphiql-button[data-jsx=\"1118272408\"]:hover,\n.download-button[data-jsx=\"1118272408\"]:hover {cursor: pointer;}.bgLightOrange,\ndiv.schema-button[data-jsx=\"1118272408\"] {background-color: #f18f01;}.relative,\n.queryWrap[data-jsx=\"1118272408\"] {position: relative;}.white50,\n.graphiql-button[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"] {color: hsla(0,0%,100%,.5);}.bgDarkBlue,\n.graphiql-button[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"] {background-color: #172a3a;}.ttu,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"],\n.graphiql-button[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"] {text-transform: uppercase;}.f14,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"],\n.graphiql-button[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"] {font-size: 14px;}.fw6,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"],\n.graphiql-button[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"] {font-weight: 600;}.br2,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"],\n.graphiql-button[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"],\n.onboarding-hint[data-jsx=\"1118272408\"] {border-radius: 2px;}.pointer:hover,\n.docs-button[data-jsx=\"1118272408\"]:hover,\n.schema-button[data-jsx=\"1118272408\"]:hover,\n.graphiql-button[data-jsx=\"1118272408\"]:hover,\n.download-button[data-jsx=\"1118272408\"]:hover {cursor: pointer;}.absolute,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"],\n.graphiql-button.prettify[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"],\n.intro[data-jsx=\"1118272408\"],\n.listening[data-jsx=\"1118272408\"],\n.onboarding-hint[data-jsx=\"1118272408\"] {position: absolute;}.white50,\n.graphiql-button[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"] {color: hsla(0,0%,100%,.5);}.bgDarkBlue,\n.graphiql-button[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"] {background-color: #172a3a;}.ttu,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"],\n.graphiql-button[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"] {text-transform: uppercase;}.f14,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"],\n.graphiql-button[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"] {font-size: 14px;}.fw6,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"],\n.graphiql-button[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"] {font-weight: 600;}.br2,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"],\n.graphiql-button[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"],\n.onboarding-hint[data-jsx=\"1118272408\"] {border-radius: 2px;}.pointer:hover,\n.docs-button[data-jsx=\"1118272408\"]:hover,\n.schema-button[data-jsx=\"1118272408\"]:hover,\n.graphiql-button[data-jsx=\"1118272408\"]:hover,\n.download-button[data-jsx=\"1118272408\"]:hover {cursor: pointer;}.absolute,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"],\n.graphiql-button.prettify[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"],\n.intro[data-jsx=\"1118272408\"],\n.listening[data-jsx=\"1118272408\"],\n.onboarding-hint[data-jsx=\"1118272408\"] {position: absolute;}.absolute,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"],\n.graphiql-button.prettify[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"],\n.intro[data-jsx=\"1118272408\"],\n.listening[data-jsx=\"1118272408\"],\n.onboarding-hint[data-jsx=\"1118272408\"] {position: absolute;}.tlCenter,\n.intro[data-jsx=\"1118272408\"] {transform: translate(-50%,-50%);}.top50,\n.intro[data-jsx=\"1118272408\"] {top: 50%;}.left50,\n.intro[data-jsx=\"1118272408\"] {left: 50%;}.white20,\n.intro[data-jsx=\"1118272408\"] {color: hsla(0,0%,100%,.2);}.f16,\n.intro[data-jsx=\"1118272408\"],\n.listening[data-jsx=\"1118272408\"] {font-size: 16px;}.tc,\n.intro[data-jsx=\"1118272408\"] {text-align: center;}.f16,\n.intro[data-jsx=\"1118272408\"],\n.listening[data-jsx=\"1118272408\"] {font-size: 16px;}.white40,\n.listening[data-jsx=\"1118272408\"] {color: hsla(0,0%,100%,.4);}.absolute,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"],\n.graphiql-button.prettify[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"],\n.intro[data-jsx=\"1118272408\"],\n.listening[data-jsx=\"1118272408\"],\n.onboarding-hint[data-jsx=\"1118272408\"] {position: absolute;}.bottom0,\n.listening[data-jsx=\"1118272408\"] {bottom: 0;}.absolute,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"],\n.graphiql-button.prettify[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"],\n.intro[data-jsx=\"1118272408\"],\n.listening[data-jsx=\"1118272408\"],\n.onboarding-hint[data-jsx=\"1118272408\"] {position: absolute;}.br2,\n.docs-button[data-jsx=\"1118272408\"],\n.schema-button[data-jsx=\"1118272408\"],\n.graphiql-button[data-jsx=\"1118272408\"],\n.download-button[data-jsx=\"1118272408\"],\n.onboarding-hint[data-jsx=\"1118272408\"] {border-radius: 2px;}.z999,\n.onboarding-hint[data-jsx=\"1118272408\"] {z-index: 999;}"
            }),
            React.createElement(_style2.default, {
                styleId: 1032694800,
                css: "\n          .query-header-enter {\n            opacity: 0.01;\n          }\n\n          .query-header-enter.query-header-enter-active {\n            opacity: 1;\n            transition: opacity 500ms ease-in;\n          }\n\n          .query-header-leave {\n            opacity: 1;\n          }\n\n          .query-header-leave.query-header-leave-active {\n            opacity: 0.01;\n            transition: opacity 300ms ease-in;\n          }\n        "
            }),
            React.createElement(
                "div",
                { className: "editorWrap", "data-jsx": 1118272408
                },
                React.createElement(TopBar_1.default, { endpoint: this.props.session.endpoint || this.props.endpoint, endpointDisabled: false, onChangeEndpoint: this.props.onChangeEndpoint, onClickHistory: this.props.onClickHistory, curl: this.getCurl(), onClickPrettify: this.handlePrettifyQuery, onClickShare: this.props.onClickShare, sharing: this.props.sharing, onReloadSchema: this.reloadSchema, fixedEndpoint: this.props.fixedEndpoint }),
                React.createElement(
                    "div",
                    { ref: this.setEditorBarComponent, className: "editorBar", onMouseDown: this.handleResizeStart, "data-jsx": 1118272408
                    },
                    React.createElement(
                        "div",
                        { className: cn('queryWrap', this.props.localTheme), style: queryWrapStyle, "data-jsx": 1118272408
                        },
                        React.createElement(QueryEditor_1.QueryEditor, { ref: this.setQueryEditorComponent, schema: this.state.schema, value: this.state.query, onEdit: this.handleEditQuery, onHintInformationRender: this.handleHintInformationRender, onRunQuery: this.handleEditorRunQuery, disableAutofocus: this.props.disableAutofocus, hideLineNumbers: this.props.hideLineNumbers, hideGutters: this.props.hideGutters, readOnly: this.props.readonly, useVim: this.props.useVim }),
                        React.createElement(
                            "div",
                            { className: "variable-editor", style: variableStyle, "data-jsx": 1118272408
                            },
                            React.createElement(
                                "div",
                                { className: "variable-editor-title", style: { cursor: variableOpen ? 'row-resize' : 'n-resize' }, onMouseDown: this.handleVariableResizeStart, "data-jsx": 1118272408
                                },
                                React.createElement(
                                    "span",
                                    { className: cn('subtitle', {
                                            active: this.state.queryVariablesActive
                                        }), ref: this.setQueryVariablesRef, onClick: this.selectQueryVariables, "data-jsx": 1118272408
                                    },
                                    'Query Variables'
                                ),
                                React.createElement(
                                    "span",
                                    { className: cn('subtitle', {
                                            active: !this.state.queryVariablesActive
                                        }), ref: this.setHttpHeadersRef, onClick: this.selectHttpHeaders, "data-jsx": 1118272408
                                    },
                                    'HTTP Headers ' + this.getHeaderCount()
                                )
                            ),
                            this.state.queryVariablesActive ? React.createElement(VariableEditor_1.VariableEditor, { ref: this.setVariableEditorComponent, value: this.state.variables, variableToType: this.state.variableToType, onEdit: this.handleEditVariables, onHintInformationRender: this.handleHintInformationRender, onRunQuery: this.handleEditorRunQuery }) : React.createElement(VariableEditor_1.VariableEditor, { ref: this.setVariableEditorComponent, value: this.props.session.headers, onEdit: this.props.onChangeHeaders, onRunQuery: this.handleEditorRunQuery })
                        ),
                        React.createElement(QueryDragBar, { ref: this.setQueryResizer })
                    ),
                    !this.props.queryOnly && React.createElement(
                        "div",
                        { className: "resultWrap", "data-jsx": 1118272408
                        },
                        React.createElement(ResultDragBar, { ref: this.setResponseResizer }),
                        React.createElement(ExecuteButton_1.default, { isRunning: Boolean(this.state.subscription), onRun: this.handleRunQuery, onStop: this.handleStopQuery, operations: this.state.operations }),
                        this.state.isWaitingForResponse && React.createElement(Spinner_1.default, null),
                        React.createElement(Results_1.default, { setRef: this.setResultComponent, disableResize: this.props.disableResize, responses: this.state.responses, hideGutters: this.props.hideGutters }),
                        footer,
                        !this.state.responses || this.state.responses.length === 0 && React.createElement(
                            "div",
                            { className: "intro", "data-jsx": 1118272408
                            },
                            "Hit the Play Button to get a response here"
                        ),
                        Boolean(this.state.subscription) && React.createElement(
                            "div",
                            { className: "listening", "data-jsx": 1118272408
                            },
                            "Listening \u2026"
                        ),
                        React.createElement(
                            "div",
                            { className: "response-tracing", style: tracingStyle, "data-jsx": 1118272408
                            },
                            React.createElement(
                                "div",
                                { className: "response-tracing-title", style: { cursor: tracingOpen ? 'row-resize' : 'n-resize' }, onMouseDown: this.handleTracingResizeStart, "data-jsx": 1118272408
                                },
                                "Tracing"
                            ),
                            React.createElement(ResponseTracing_1.default, { tracing: this.state.responseExtensions && this.state.responseExtensions.tracing, startTime: this.state.currentQueryStartTime, endTime: this.state.currentQueryEndTime, tracingSupported: this.state.tracingSupported })
                        )
                    )
                )
            ),
            React.createElement(GraphDocs_1.default, { schema: this.state.schema, sessionId: this.props.session.id })
        );
    };
    /**
     * Inspect the query, automatically filling in selection sets for non-leaf
     * fields which do not yet have them.
     *
     * @public
     */
    GraphQLEditor.prototype.autoCompleteLeafs = function () {
        var _a = fillLeafs_1.fillLeafs(this.state.schema, this.state.query, this.props.getDefaultFieldNames),
            insertions = _a.insertions,
            result = _a.result;
        if (insertions && insertions.length > 0) {
            var editor_1 = this.queryEditorComponent.getCodeMirror();
            editor_1.operation(function () {
                var cursor = editor_1.getCursor();
                var cursorIndex = editor_1.indexFromPos(cursor);
                editor_1.setValue(result);
                var added = 0;
                try {
                    var markers_1 = insertions.map(function (_a) {
                        var index = _a.index,
                            str = _a.str;
                        return editor_1.markText(editor_1.posFromIndex(index + added), editor_1.posFromIndex(index + (added += str.length)), {
                            className: 'autoInsertedLeaf',
                            clearOnEnter: true,
                            title: 'Automatically added leaf fields'
                        });
                    });
                    setTimeout(function () {
                        return markers_1.forEach(function (marker) {
                            return marker.clear();
                        });
                    }, 7000);
                } catch (e) {
                    //
                }
                var newCursorIndex = cursorIndex;
                insertions.forEach(function (_a) {
                    var index = _a.index,
                        str = _a.str;
                    if (index < cursorIndex && str) {
                        newCursorIndex += str.length;
                    }
                });
                editor_1.setCursor(editor_1.posFromIndex(newCursorIndex));
            });
        }
        return result;
    };
    GraphQLEditor.prototype.renewStacks = function (schema) {
        var rootMap = stack_1.getRootMap(schema);
        var stacks = this.props.navStack.map(function (stack) {
            return stack_1.getNewStack(rootMap, schema, stack);
        }).filter(function (s) {
            return s;
        });
        this.props.setStacks(this.props.session.id, stacks);
    };
    GraphQLEditor.prototype.convertHeaders = function (headers) {
        if (headers) {
            try {
                return JSON.parse(headers);
            } catch (e) {
                /* tslint:disable-next-line */
                console.error(e);
            }
        }
        return undefined;
    };
    GraphQLEditor.prototype.ensureOfSchema = function () {
        var _this = this;
        // Only perform introspection if a schema is not provided (undefined)
        if (this.state.schema !== undefined) {
            return;
        }
        this.props.schemaFetcher.fetch(this.props.session.endpoint || this.props.endpoint, this.convertHeaders(this.props.session.headers)).then(function (result) {
            if (result) {
                var schema = result.schema,
                    tracingSupported = result.tracingSupported;
                _this.renewStacks(schema);
                _this.setState({
                    schema: schema,
                    tracingSupported: tracingSupported
                });
            }
        }).catch(function (error) {
            _this.setState({
                schema: null,
                responses: [{ date: error.message, time: new Date() }]
            });
        });
    };
    GraphQLEditor.prototype.fetchQuery = function (query, variables, operationName, cb) {
        var _this = this;
        var fetcher = this.props.fetcher;
        var jsonVariables = null;
        try {
            jsonVariables = variables && variables.trim() !== '' ? JSON.parse(variables) : null;
        } catch (error) {
            throw new Error("Variables are invalid JSON: " + error.message + ".");
        }
        if ((typeof jsonVariables === "undefined" ? "undefined" : _typeof(jsonVariables)) !== 'object') {
            throw new Error('Variables are not a JSON object.');
        }
        var headers = {};
        if (this.state.responseTracingOpen) {
            headers['X-Apollo-Tracing'] = '1';
        }
        var fetch = fetcher({
            query: query,
            variables: jsonVariables,
            operationName: operationName
        }, headers);
        if (isPromise(fetch)) {
            // If fetcher returned a Promise, then call the callback when the promise
            // resolves, otherwise handle the error.
            fetch.then(cb).catch(function (error) {
                _this.setState({
                    isWaitingForResponse: false,
                    responses: [{ date: error && String(error.stack || error), time: new Date() }]
                });
            });
        } else if (isObservable(fetch)) {
            // If the fetcher returned an Observable, then subscribe to it, calling
            // the callback on each next value, and handling both errors and the
            // completion of the Observable. Returns a Subscription object.
            var subscription = fetch.subscribe({
                // next: cb,
                next: cb,
                error: function error(_error) {
                    _this.setState({
                        isWaitingForResponse: false,
                        responses: [{
                            date: _error && String(_error.stack || _error),
                            time: new Date()
                        }],
                        subscription: null
                    });
                },
                complete: function complete() {
                    _this.setState({
                        isWaitingForResponse: false,
                        subscription: null
                    });
                }
            });
            return subscription;
        } else {
            throw new Error('Fetcher did not return Promise or Observable.');
        }
    };
    GraphQLEditor.prototype.runQueryAtCursor = function () {
        if (this.state.subscription) {
            this.handleStopQuery();
            return;
        }
        var operationName;
        var operations = this.state.operations;
        if (operations) {
            var editor = this.queryEditorComponent.getCodeMirror();
            if (editor.hasFocus()) {
                var cursor = editor.getCursor();
                var cursorIndex = editor.indexFromPos(cursor);
                // Loop through all operations to see if one contains the cursor.
                for (var _i = 0, operations_1 = operations; _i < operations_1.length; _i++) {
                    var operation = operations_1[_i];
                    if (operation.loc.start <= cursorIndex && operation.loc.end >= cursorIndex) {
                        operationName = operation.name && operation.name.value;
                        break;
                    }
                }
            }
        }
        this.handleRunQuery(operationName);
    };
    GraphQLEditor.prototype.didClickDragBar = function (event) {
        // Only for primary unmodified clicks
        return event.target === this.queryResizer || event.target === this.responseResizer;
    };
    return GraphQLEditor;
}(React.PureComponent);
exports.GraphQLEditor = GraphQLEditor;
exports.default = withTheme_1.default(react_redux_1.connect(sessionDocs_1.getSessionDocs, { setStacks: graphiql_docs_1.setStacks })(GraphQLEditor));
// Duck-type promise detection.
function isPromise(value) {
    return (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object' && typeof value.then === 'function';
}
// Duck-type observable detection.
function isObservable(value) {
    return (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object' && typeof value.subscribe === 'function';
}
var DragBar = index_1.styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 15px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  cursor: col-resize;\n"], ["\n  width: 15px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  cursor: col-resize;\n"])));
var QueryDragBar = index_1.styled(DragBar)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  right: 0px;\n"], ["\n  right: 0px;\n"])));
var ResultDragBar = index_1.styled(DragBar)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  left: 0px;\n  z-index: 1;\n"], ["\n  left: 0px;\n  z-index: 1;\n"])));
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=GraphQLEditor.jsx.map