"use strict";

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
var GraphQLEditor_1 = require("./GraphQLEditor");
var GraphQLEditorSession = /** @class */function (_super) {
    __extends(GraphQLEditorSession, _super);
    function GraphQLEditorSession() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fetcher = function (graphQLParams, headers) {
            return _this.props.fetcher(_this.props.session, graphQLParams, headers);
        };
        _this.setRef = function (ref) {
            _this.props.onRef(_this.props.index, ref);
        };
        _this.handleOperationNameChange = function (name) {
            _this.props.onEditOperationName(_this.props.session.id, name);
        };
        _this.handleVariableChange = function (variables) {
            _this.props.onEditVariables(_this.props.session.id, variables);
        };
        _this.handleQueryChange = function (query) {
            _this.props.onEditQuery(_this.props.session.id, query);
        };
        _this.handleChangeHeaders = function (headers) {
            _this.props.onChangeHeaders(_this.props.session.id, headers);
        };
        _this.handleClickHistory = function () {
            _this.props.onClickHistory();
        };
        _this.handleChangeEndpoint = function (endpoint) {
            _this.props.onChangeEndpoint(_this.props.session.id, endpoint);
        };
        _this.handleClickShare = function () {
            _this.props.onClickShare(_this.props.session.id);
        };
        _this.shouldHideTracingResponse = function () {
            return _this.props.settings['tracing.hideTracingResponse'];
        };
        return _this;
    }
    GraphQLEditorSession.prototype.render = function () {
        var _a = this.props,
            session = _a.session,
            isGraphcoolUrl = _a.isGraphcoolUrl,
            isEndpoint = _a.isEndpoint,
            storage = _a.storage,
            responses = _a.responses,
            disableQueryHeader = _a.disableQueryHeader,
            isActive = _a.isActive,
            schemaFetcher = _a.schemaFetcher,
            sharing = _a.sharing,
            fixedEndpoint = _a.fixedEndpoint,
            endpoint = _a.endpoint;
        return React.createElement(GraphQLEditor_1.default, { endpoint: endpoint, isActive: isActive, key: session.id, isGraphcoolUrl: isGraphcoolUrl, fetcher: this.fetcher, showQueryTitle: false, showResponseTitle: false, showEndpoints: !isEndpoint, showDownloadJsonButton: true, showCodeGeneration: true, storage: storage, query: session.query, variables: session.variables, operationName: session.operationName, onClickCodeGeneration: this.props.onClickCodeGeneration, onEditOperationName: this.handleOperationNameChange, onEditVariables: this.handleVariableChange, onEditQuery: this.handleQueryChange, onChangeHeaders: this.handleChangeHeaders, responses: responses, disableQueryHeader: disableQueryHeader, disableResize: false, ref: this.setRef, useVim: this.props.useVim, rerenderQuery: false, disableAnimation: true, disableAutofocus: !isActive, session: session, schemaFetcher: schemaFetcher, onClickHistory: this.handleClickHistory, onChangeEndpoint: this.handleChangeEndpoint, onClickShare: this.handleClickShare, sharing: sharing, fixedEndpoint: fixedEndpoint, shouldHideTracingResponse: this.shouldHideTracingResponse() });
    };
    return GraphQLEditorSession;
}(React.PureComponent);
exports.default = GraphQLEditorSession;
//# sourceMappingURL=GraphQLEditorSession.jsx.map