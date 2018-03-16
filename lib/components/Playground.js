"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var GraphQLEditor_1 = require("./Playground/GraphQLEditor");
exports.GraphQLEditor = GraphQLEditor_1.GraphQLEditor;
var fetch = require("isomorphic-fetch");
var TabBar_1 = require("./Playground/TabBar");
var constants_1 = require("../constants");
var cuid = require("cuid");
var Immutable = require("seamless-immutable");
var PlaygroundStorage_1 = require("./PlaygroundStorage");
var getQueryTypes_1 = require("./Playground/util/getQueryTypes");
var debounce_1 = require("graphiql/dist/utility/debounce");
var Observable_1 = require("rxjs/Observable");
var subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
var subscriptions_transport_sse_1 = require("subscriptions-transport-sse");
var isQuerySubscription_1 = require("./Playground/util/isQuerySubscription");
var HistoryPopup_1 = require("./HistoryPopup");
var cx = require("classnames");
var CodeGenerationPopup_1 = require("./CodeGenerationPopup/CodeGenerationPopup");
var react_redux_1 = require("react-redux");
var GraphQLEditorSession_1 = require("./Playground/GraphQLEditorSession");
var graphiql_docs_1 = require("../actions/graphiql-docs");
var lodash_1 = require("lodash");
var styled_1 = require("../styled");
var session_1 = require("./Playground/util/session");
var SchemaFetcher_1 = require("./Playground/SchemaFetcher");
var Settings_1 = require("./Settings");
var SettingsEditor_1 = require("./SettingsEditor");
var FileEditor_1 = require("./FileEditor");
var Playground = /** @class */function (_super) {
    __extends(Playground, _super);
    function Playground(props) {
        var _this = _super.call(this, props) || this;
        _this.connections = {};
        _this.observers = {};
        _this.graphiqlComponents = [];
        _this.initialIndex = -1;
        _this.updateQueryTypes = debounce_1.default(150, function (sessionId, query) {
            var queryTypes = getQueryTypes_1.getQueryTypes(query);
            _this.setValueInSession(sessionId, 'queryTypes', queryTypes);
        });
        _this.handleQueryChange = debounce_1.default(300, function (sessionId, query) {
            _this.setValueInSession(sessionId, 'query', query);
            _this.setValueInSession(sessionId, 'hasChanged', true);
            _this.updateQueryTypes(sessionId, query);
        });
        _this.setConnection = function (session) {
            var connectionParams = {};
            if (session.headers) {
                connectionParams = __assign({}, _this.parseHeaders(session.headers));
            }
            if (_this.connections[session.id]) {
                _this.connections[session.id].unsubscribeAll();
            }
            var endpoint = _this.getSubscriptionEndpoint();
            if (endpoint) {
                try {
                    var SubscriptionClient = endpoint.startsWith('http') ? subscriptions_transport_sse_1.SubscriptionClient : subscriptions_transport_ws_1.SubscriptionClient;
                    _this.connections[session.id] = new SubscriptionClient(endpoint, {
                        timeout: 20000,
                        connectionParams: connectionParams
                    });
                } catch (e) {
                    /* tslint:disable-next-line */
                    console.error(e);
                }
            }
        };
        _this.setRef = function (index, ref) {
            _this.graphiqlComponents[index] = ref;
        };
        _this.toggleSchemaReload = function () {
            _this.setState(function (state) {
                return __assign({}, state, { autoReloadSchema: !state.autoReloadSchema });
            });
        };
        _this.handleChangeSettings = function (settings) {
            var settingsSession = _this.state.sessions.find(function (session) {
                return Boolean(session.isSettingsTab);
            });
            if (settingsSession) {
                _this.setValueInSession(settingsSession.id, 'hasChanged', true);
            }
            _this.props.onChangeSettings(settings);
        };
        _this.handleSaveSettings = function () {
            var settingsSession = _this.state.sessions.find(function (session) {
                return Boolean(session.isSettingsTab);
            });
            if (settingsSession) {
                _this.setValueInSession(settingsSession.id, 'hasChanged', false);
            }
            _this.props.onSaveSettings();
        };
        _this.handleChangeConfig = function (config) {
            var configSession = _this.state.sessions.find(function (session) {
                return Boolean(session.isConfigTab);
            });
            if (configSession) {
                _this.setValueInSession(configSession.id, 'hasChanged', true);
            }
            _this.props.onChangeConfig(config);
        };
        _this.handleSaveConfig = function () {
            var configSession = _this.state.sessions.find(function (session) {
                return Boolean(session.isConfigTab);
            });
            if (configSession) {
                _this.setValueInSession(configSession.id, 'hasChanged', false);
            }
            _this.props.onSaveConfig();
        };
        _this.handleFileChange = function (file) {
            var session = _this.state.sessions[_this.state.selectedSessionIndex];
            _this.setValueInSession(session.id, 'file', file);
            _this.setValueInSession(session.id, 'hasChanged', true);
        };
        _this.handleSaveFile = function (file) {
            var session = _this.state.sessions[_this.state.selectedSessionIndex];
            _this.setValueInSession(session.id, 'hasChanged', false);
        };
        _this.openSettingsTab = function () {
            var sessionIndex = _this.state.sessions.findIndex(function (s) {
                return Boolean(s.isSettingsTab);
            });
            if (sessionIndex === -1) {
                var session_2 = _this.createSession();
                session_2 = Immutable.set(session_2, 'isSettingsTab', true);
                session_2 = Immutable.set(session_2, 'isFile', true);
                session_2 = Immutable.set(session_2, 'name', 'Settings');
                _this.setState(function (state) {
                    return __assign({}, state, { sessions: state.sessions.concat(session_2), selectedSessionIndex: state.sessions.length, changed: false });
                });
            } else {
                _this.setState({ selectedSessionIndex: sessionIndex });
            }
        };
        _this.openConfigTab = function () {
            var sessionIndex = _this.state.sessions.findIndex(function (s) {
                return Boolean(s.isConfigTab);
            });
            if (sessionIndex === -1) {
                var session_3 = _this.createSession();
                session_3 = Immutable.set(session_3, 'isConfigTab', true);
                session_3 = Immutable.set(session_3, 'isFile', true);
                session_3 = Immutable.set(session_3, 'name', 'GraphQL Config');
                _this.setState(function (state) {
                    return __assign({}, state, { sessions: state.sessions.concat(session_3), selectedSessionIndex: state.sessions.length, changed: false });
                });
            } else {
                _this.setState({ selectedSessionIndex: sessionIndex });
            }
        };
        _this.newSession = function (name) {
            var session = _this.createSession();
            if (name) {
                session = Immutable.set(session, 'name', name);
            }
            _this.setState(function (state) {
                return __assign({}, state, { sessions: state.sessions.concat(session), selectedSessionIndex: state.sessions.length, changed: true });
            });
        };
        _this.newFileTab = function (fileName, filePath, file) {
            var sessionIndex = _this.state.sessions.findIndex(function (s) {
                return s.name === fileName;
            });
            if (sessionIndex === -1) {
                var session_4 = _this.createSession();
                session_4 = Immutable.set(session_4, 'isFile', true);
                session_4 = Immutable.set(session_4, 'name', fileName);
                session_4 = Immutable.set(session_4, 'filePath', filePath);
                session_4 = Immutable.set(session_4, 'file', file);
                _this.setState(function (state) {
                    return __assign({}, state, { sessions: state.sessions.concat(session_4), selectedSessionIndex: state.sessions.length, changed: false });
                });
            } else {
                _this.setState({ selectedSessionIndex: sessionIndex });
            }
        };
        _this.closeTab = function () {
            var _a = _this.state,
                sessions = _a.sessions,
                selectedSessionIndex = _a.selectedSessionIndex;
            if (sessions.length > 1) {
                _this.handleCloseSession(sessions[selectedSessionIndex]);
                return true;
            }
            return false;
        };
        _this.nextTab = function () {
            var _a = _this.state,
                sessions = _a.sessions,
                selectedSessionIndex = _a.selectedSessionIndex;
            var numberOfSessions = sessions.length;
            if (numberOfSessions > 1) {
                _this.setState(function (state) {
                    return __assign({}, state, { selectedSessionIndex: selectedSessionIndex < numberOfSessions - 1 ? selectedSessionIndex + 1 : 0 });
                });
            }
        };
        _this.prevTab = function () {
            var _a = _this.state,
                sessions = _a.sessions,
                selectedSessionIndex = _a.selectedSessionIndex;
            var numberOfSessions = sessions.length;
            if (numberOfSessions > 1) {
                _this.setState(function (state) {
                    return __assign({}, state, { selectedSessionIndex: selectedSessionIndex > 0 ? selectedSessionIndex - 1 : numberOfSessions - 1 });
                });
            }
        };
        _this.handleNewSession = function (newIndexZero) {
            if (newIndexZero === void 0) {
                newIndexZero = false;
            }
            var session = _this.createSession();
            if (session.query === constants_1.defaultQuery) {
                setTimeout(function () {
                    _this.setCursor({
                        line: 1,
                        ch: 0
                    });
                }, 5);
            }
            _this.setState(function (state) {
                return __assign({}, state, { sessions: state.sessions.concat(session), selectedSessionIndex: newIndexZero ? 0 : state.sessions.length, changed: true });
            });
        };
        // private toggleTheme = () => {
        //   this.setState(state => {
        //     const theme = state.theme === 'dark' ? 'light' : 'dark'
        //     localStorage.setItem('theme', theme)
        //     return { ...state, theme }
        //   })
        // }
        _this.handleClickCodeGeneration = function () {
            _this.setState({
                codeGenerationPopupOpen: true
            });
        };
        _this.handleCloseCodeGeneration = function () {
            _this.setState({ codeGenerationPopupOpen: false });
        };
        _this.handleCreateSession = function (session) {
            var newSession = _this.createSession(session);
            _this.setState(function (state) {
                return __assign({}, state, { sessions: state.sessions.concat(newSession), selectedSessionIndex: state.sessions.length });
            });
        };
        _this.handleItemStarToggled = function (item) {
            _this.setValueInHistory(item.id, 'starred', !item.starred);
        };
        _this.handleCloseSession = function (session) {
            if (_this.state.sessions.length === 1) {
                _this.handleNewSession(true);
            }
            _this.setState(function (state) {
                var i = state.sessions.findIndex(function (s) {
                    return s.id === session.id;
                });
                var nextSelectedSession = state.selectedSessionIndex;
                if (nextSelectedSession > state.sessions.length - 2) {
                    // if it's not the last session
                    if (state.sessions.length > 1) {
                        nextSelectedSession--;
                    }
                }
                return __assign({}, state, { sessions: state.sessions.slice(0, i).concat(state.sessions.slice(i + 1, state.sessions.length)), selectedSessionIndex: nextSelectedSession, changed: true });
            });
            _this.storage.removeSession(session);
        };
        _this.handleOpenHistory = function () {
            _this.setState({ historyOpen: true });
        };
        _this.handleCloseHistory = function () {
            _this.setState({ historyOpen: false });
        };
        _this.handleSelectSession = function (session) {
            _this.setState(function (state) {
                var i = state.sessions.findIndex(function (s) {
                    return s.id === session.id;
                });
                if (_this.props.onboardingStep === 'STEP3_SELECT_QUERY_TAB' && i === 0 && typeof _this.props.nextStep === 'function') {
                    _this.props.nextStep();
                }
                return __assign({}, state, { selectedSessionIndex: i });
            });
        };
        _this.handleChangeEndpoint = function (sessionId, endpoint) {
            _this.setValueInSession(sessionId, 'endpoint', endpoint);
        };
        _this.initSessions = function (props) {
            if (props === void 0) {
                props = _this.props;
            }
            // defaulting to admin for deserialized sessions
            var sessions = _this.storage.getSessions(); // .map(session => Immutable.set(session, 'selectedViewer', 'ADMIN'))
            var urlSession = _this.getUrlSession(sessions);
            if (urlSession) {
                if (sessions.length === 1 && sessions[0].query === constants_1.defaultQuery) {
                    return [urlSession];
                }
                return sessions.concat(urlSession);
            }
            if (sessions.length > 0) {
                if (sessions.length === 1 && sessions[0].query === constants_1.defaultQuery) {
                    setTimeout(function () {
                        _this.setCursor({
                            line: 1,
                            ch: 0
                        });
                    }, 5);
                }
                return sessions;
            }
            return [_this.createSession(undefined, props)];
        };
        _this.saveSessions = function () {
            _this.state.sessions.forEach(function (session) {
                return _this.storage.saveSession(Immutable.set(session, 'subscriptionActive', false), false);
            });
        };
        _this.saveHistory = function () {
            _this.storage.syncHistory(_this.state.history);
        };
        _this.handleNewSessionWithoutNewIndexZero = function () {
            return _this.handleNewSession(false);
        };
        _this.createSession = function (session, props) {
            if (props === void 0) {
                props = _this.props;
            }
            var newSession;
            var currentActiveSession = _this.state && _this.state.sessions[_this.state.selectedSessionIndex];
            var headers;
            if (props.headers && _typeof(props.headers) === 'object') {
                headers = JSON.stringify(props.headers, null, 2);
            } else {
                headers = _this.props.settings['editor.reuseHeaders'] && currentActiveSession ? currentActiveSession.headers : '';
            }
            if (session) {
                newSession = Immutable.set(session, 'id', cuid());
            } else {
                var query = _this.storage.hasExecutedQuery() || _this.state && _this.state.sessions && _this.state.sessions.length > 0 ? '' : constants_1.defaultQuery;
                newSession = Immutable(__assign({}, constants_1.getDefaultSession(props.endpoint), { query: query,
                    headers: headers }));
            }
            _this.storage.saveSession(newSession);
            return newSession;
        };
        _this.createSessionFromQuery = function (query) {
            return Immutable(constants_1.getDefaultSession(_this.props.endpoint));
        };
        _this.handleChangeHeaders = function (sessionId, headers) {
            _this.setValueInSession(sessionId, 'headers', headers);
        };
        _this.handleVariableChange = function (sessionId, variables) {
            _this.setValueInSession(sessionId, 'variables', variables);
        };
        _this.handleOperationNameChange = function (sessionId, operationName) {
            _this.setValueInSession(sessionId, 'operationName', operationName);
        };
        _this.cancelSubscription = function (session) {
            _this.setValueInSession(session.id, 'subscriptionActive', false);
            if (session.subscriptionId) {
                if (_this.connections[session.id]) {
                    _this.connections[session.id].unsubscribe(session.subscriptionId);
                }
                _this.setValueInSession(session.id, 'subscriptionId', null);
            }
        };
        _this.fetcher = function (session, graphQLParams, requestHeaders) {
            var query = graphQLParams.query,
                operationName = graphQLParams.operationName;
            if (!query.includes('IntrospectionQuery')) {
                if (!_this.historyIncludes(session)) {
                    setImmediate(function () {
                        _this.addToHistory(session);
                    });
                }
                if (isQuerySubscription_1.default(query, operationName)) {
                    /* tslint:disable-next-line */
                    return Observable_1.Observable.create(function (observer) {
                        _this.observers[session.id] = observer;
                        if (!session.subscriptionActive) {
                            _this.setValueInSession(session.id, 'subscriptionActive', true);
                        }
                        var connection = _this.connections[session.id];
                        var id = connection.subscribe(graphQLParams, function (err, res) {
                            var data = { data: res, isSubscription: true };
                            if (err) {
                                data.error = err;
                            }
                            observer.next(data);
                        });
                        _this.setValueInSession(session.id, 'subscriptionId', id);
                        return function () {
                            _this.cancelSubscription(session);
                        };
                    });
                }
            }
            var headers = {
                'Content-Type': 'application/json'
            };
            if (session.headers) {
                headers = __assign({}, headers, _this.parseHeaders(session.headers));
            }
            if (requestHeaders) {
                headers = __assign({}, headers, requestHeaders);
            }
            return fetch(session.endpoint || _this.getEndpoint(), {
                // tslint:disable-lin
                method: 'post',
                headers: headers,
                // TODO enable
                credentials: 'include',
                body: JSON.stringify(graphQLParams)
            }).then(function (response) {
                if (typeof _this.props.onSuccess === 'function') {
                    _this.props.onSuccess(graphQLParams, response);
                }
                if (_this.props.isEndpoint) {
                    history.pushState({}, 'Graphcool Playground', "?query=" + encodeURIComponent(query));
                }
                _this.storage.executedQuery();
                return response.json();
            });
        };
        _this.isSharingAuthorization = function () {
            var _a = _this.state,
                sessions = _a.sessions,
                shareHttpHeaders = _a.shareHttpHeaders,
                shareAllTabs = _a.shareAllTabs,
                selectedSessionIndex = _a.selectedSessionIndex;
            // if we're not sharing *any* headers, then just return false
            if (!shareHttpHeaders) {
                return false;
            }
            var sharableSessions;
            if (!shareAllTabs) {
                var currentSession = sessions[selectedSessionIndex];
                sharableSessions = [currentSession];
            } else {
                // all sessions
                sharableSessions = sessions;
            }
            return session_1.isSharingAuthorization(sharableSessions);
        };
        // private toggleUseVim = () => {
        //   this.setState(
        //     state => ({ ...state, useVim: !state.useVim }),
        //     () => {
        //       localStorage.setItem('useVim', String(this.state.useVim))
        //     },
        //   )
        // }
        _this.toggleShareAllTabs = function () {
            _this.setState(function (state) {
                return __assign({}, state, { shareAllTabs: !state.shareAllTabs });
            });
        };
        _this.toggleShareHTTPHeaders = function () {
            _this.setState(function (state) {
                return __assign({}, state, { shareHttpHeaders: !state.shareHttpHeaders });
            });
        };
        _this.toggleShareHistory = function () {
            _this.setState(function (state) {
                return __assign({}, state, { shareHistory: !state.shareHistory });
            });
        };
        _this.share = function () {
            _this.saveSessions();
            _this.saveHistory();
            _this.storage.saveProject();
            var sharingProject = _this.storage.project;
            if (!_this.state.shareHttpHeaders) {
                sharingProject = __assign({}, sharingProject, { sessions: lodash_1.mapValues(sharingProject.sessions, function (session) {
                        session.headers = '';
                        return session;
                    }) });
            }
            if (!_this.state.shareAllTabs) {
                var currentSession = _this.state.sessions[_this.state.selectedSessionIndex];
                sharingProject = __assign({}, sharingProject, { sessions: (_a = {}, _a[currentSession.id] = currentSession, _a) });
            }
            if (!_this.state.shareHistory) {
                sharingProject = __assign({}, sharingProject, { history: [] });
            }
            _this.props.share(sharingProject);
            _this.setState({ changed: false });
            var _a;
        };
        _this.storage = new PlaygroundStorage_1.default(_this.getStorageKey(props));
        if (props.session) {
            _this.storage.setState(props.session, props.endpoint);
        }
        var sessions = _this.initSessions(props);
        _this.schemaFetcher = new SchemaFetcher_1.SchemaFetcher();
        var selectedSessionIndex = parseInt(_this.storage.getItem('selectedSessionIndex'), 10) || 0;
        _this.state = {
            schema: null,
            schemaCache: null,
            sessions: sessions,
            selectedSessionIndex: selectedSessionIndex < sessions.length && selectedSessionIndex > -1 ? selectedSessionIndex : 0,
            historyOpen: false,
            history: _this.storage.getHistory(),
            adminAuthToken: props.adminAuthToken && props.adminAuthToken.length > 0 && props.adminAuthToken || localStorage.getItem('token'),
            selectUserSessionId: undefined,
            codeGenerationPopupOpen: false,
            disableQueryHeader: false,
            autoReloadSchema: false,
            useVim: localStorage.getItem('useVim') === 'true' || false,
            shareAllTabs: true,
            shareHttpHeaders: true,
            shareHistory: true,
            changed: false,
            response: undefined,
            userModelName: 'User',
            tracingSupported: false
        };
        if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
            window.addEventListener('beforeunload', function () {
                _this.componentWillUnmount();
            });
        }
        ;
        global.p = _this;
        _this.fetcher = _this.fetcher.bind(_this);
        if (typeof _this.props.getRef === 'function') {
            _this.props.getRef(_this);
        }
        return _this;
    }
    Playground.prototype.getStorageKey = function (props) {
        if (props === void 0) {
            props = this.props;
        }
        return props.endpoint;
        // const multi = !props.fixedEndpoints
        // return multi ? 'multi' : props.endpoint
    };
    Playground.prototype.componentWillMount = function () {
        // look, if there is a session. if not, initiate one.
        this.initSessions();
    };
    Playground.prototype.componentDidMount = function () {
        if (this.initialIndex > -1) {
            this.setState({
                selectedSessionIndex: this.initialIndex
            });
        }
        if (['STEP3_UNCOMMENT_DESCRIPTION', 'STEP3_OPEN_PLAYGROUND'].indexOf(this.props.onboardingStep || '') > -1) {
            this.setCursor({ line: 3, ch: 6 });
        }
        this.initSubscriptions();
    };
    Playground.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _this = this;
        if (prevProps.endpoint !== this.props.endpoint || prevProps.adminAuthToken !== this.props.adminAuthToken || prevProps.subscriptionsEndpoint !== this.props.subscriptionsEndpoint) {
            this.saveSessions();
            this.saveHistory();
            this.storage.saveProject();
            this.storage = new PlaygroundStorage_1.default(this.getStorageKey());
            var sessions = this.initSessions();
            this.setState({
                sessions: sessions,
                history: this.storage.getHistory(),
                selectedSessionIndex: 0
            }, function () {
                _this.resetSubscriptions();
            });
        }
        if (prevState.sessions.length !== this.state.sessions.length && typeof this.props.onUpdateSessionCount === 'function') {
            this.props.onUpdateSessionCount();
        }
    };
    Playground.prototype.componentWillUnmount = function () {
        // this.storage.setItem(
        //   'selectedSessionIndex',
        //   String(this.state.selectedSessionIndex),
        // )
        // this.saveSessions()
        // this.saveHistory()
        // this.storage.saveProject()
    };
    Playground.prototype.initSubscriptions = function () {
        var _this = this;
        this.state.sessions.forEach(function (session) {
            return _this.setConnection(session);
        });
    };
    Playground.prototype.setCursor = function (position) {
        if (this.graphiqlComponents) {
            var editor = this.graphiqlComponents[this.state.selectedSessionIndex];
            if (editor && editor.queryEditorComponent) {
                editor.queryEditorComponent.editor.setCursor(position);
            }
        }
    };
    Playground.prototype.render = function () {
        var _this = this;
        var _a = this.state,
            sessions = _a.sessions,
            selectedSessionIndex = _a.selectedSessionIndex;
        var isEndpoint = this.props.isEndpoint;
        var theme = this.props.settings['editor.theme'];
        var selectedEndpointUrl = isEndpoint ? location.href : this.getEndpoint();
        var isGraphcoolUrl = this.isGraphcoolUrl(selectedEndpointUrl);
        return React.createElement(
            PlaygroundWrapper,
            { className: "playground" },
            React.createElement(TabBar_1.TabBar, { sessions: sessions, selectedSessionIndex: selectedSessionIndex, onNewSession: this.handleNewSessionWithoutNewIndexZero, onCloseSession: this.handleCloseSession, onSelectSession: this.handleSelectSession, isApp: this.props.isApp }),
            React.createElement(
                GraphiqlsContainer,
                { className: cx('graphiqls-container', {
                        'docs-graphiql': theme === 'light'
                    }) },
                sessions.map(function (session, index) {
                    return React.createElement(
                        GraphiqlWrapper,
                        { key: session.id, className: cx('graphiql-wrapper', {
                                active: index === selectedSessionIndex
                            }), style: {
                                top: "-" + 100 * selectedSessionIndex + "%"
                            } },
                        session.isConfigTab ? React.createElement(SettingsEditor_1.default, { value: _this.props.configString, onChange: _this.handleChangeConfig, onSave: _this.handleSaveConfig, isYaml: _this.props.configIsYaml, isConfig: true, readOnly: !_this.props.canSaveConfig }) : session.isSettingsTab ? React.createElement(SettingsEditor_1.default, { value: _this.props.settingsString, onChange: _this.handleChangeSettings, onSave: _this.handleSaveSettings }) : session.isFile && session.file ? React.createElement(FileEditor_1.default, { value: session.file, onChange: _this.handleFileChange }) : React.createElement(GraphQLEditorSession_1.default, { key: session.id, session: session, index: index, isGraphcoolUrl: isGraphcoolUrl, fetcher: _this.fetcher, isEndpoint: Boolean(isEndpoint), endpoint: _this.props.endpoint, storage: _this.storage.getSessionStorage(session.id), onClickCodeGeneration: _this.handleClickCodeGeneration, onEditOperationName: _this.handleOperationNameChange, onEditVariables: _this.handleVariableChange, onEditQuery: _this.handleQueryChange, onChangeHeaders: _this.handleChangeHeaders, onClickHistory: _this.handleOpenHistory, onChangeEndpoint: _this.handleChangeEndpoint, onClickShare: _this.share, responses: _this.state.response ? [_this.state.response] : undefined, disableQueryHeader: _this.state.disableQueryHeader, onRef: _this.setRef, useVim: _this.state.useVim && index === selectedSessionIndex, isActive: index === selectedSessionIndex, schemaFetcher: _this.schemaFetcher, fixedEndpoint: _this.props.fixedEndpoints, sharing: {
                                localTheme: _this.props.settings['editor.theme'],
                                onShare: _this.share,
                                onToggleHistory: _this.toggleShareHistory,
                                onToggleAllTabs: _this.toggleShareAllTabs,
                                onToggleHttpHeaders: _this.toggleShareHTTPHeaders,
                                history: _this.state.shareHistory,
                                allTabs: _this.state.shareAllTabs,
                                httpHeaders: _this.state.shareHttpHeaders,
                                shareUrl: _this.props.shareUrl,
                                reshare: _this.state.changed,
                                isSharingAuthorization: _this.isSharingAuthorization()
                            }, settings: _this.props.settings })
                    );
                })
            ),
            React.createElement(Settings_1.default, { onClick: this.openSettingsTab }),
            this.state.historyOpen && this.renderHistoryPopup(),
            this.state.codeGenerationPopupOpen && this.renderCodeGenerationPopup()
        );
    };
    Playground.prototype.renderHistoryPopup = function () {
        var _a = this.state,
            sessions = _a.sessions,
            selectedSessionIndex = _a.selectedSessionIndex;
        var selectedSession = sessions[selectedSessionIndex];
        var historyItems = this.state.history.filter(function (s) {
            return s.endpoint === selectedSession.endpoint;
        });
        return React.createElement(HistoryPopup_1.default, { isOpen: this.state.historyOpen, onRequestClose: this.handleCloseHistory, historyItems: historyItems, onItemStarToggled: this.handleItemStarToggled, fetcherCreater: this.fetcher, onCreateSession: this.handleCreateSession, schemaFetcher: this.schemaFetcher });
    };
    Playground.prototype.renderCodeGenerationPopup = function () {
        var _a = this.state,
            sessions = _a.sessions,
            selectedSessionIndex = _a.selectedSessionIndex;
        var isEndpoint = this.props.isEndpoint;
        var selectedSession = sessions[selectedSessionIndex];
        var selectedEndpointUrl = isEndpoint ? location.href : this.getEndpoint();
        return React.createElement(CodeGenerationPopup_1.default, { endpointUrl: selectedEndpointUrl, isOpen: this.state.codeGenerationPopupOpen, onRequestClose: this.handleCloseCodeGeneration, query: selectedSession.query });
    };
    Playground.prototype.setValueInSession = function (sessionId, key, value, cb) {
        this.setState(function (state) {
            // TODO optimize the lookup with a lookup table
            var i = state.sessions.findIndex(function (s) {
                return s.id === sessionId;
            });
            return __assign({}, state, { sessions: Immutable.setIn(state.sessions, [i, key], value), changed: true });
        });
        // hack to support older react versions
        setTimeout(function () {
            if (typeof cb === 'function') {
                cb();
            }
        }, 100);
    };
    Playground.prototype.resetSubscriptions = function () {
        var _this = this;
        this.state.sessions.forEach(function (session) {
            return _this.resetSubscription(session);
        });
    };
    Playground.prototype.resetSubscription = function (session) {
        if (this.observers[session.id]) {
            this.observers[session.id].complete();
            delete this.observers[session.id];
        }
        this.cancelSubscription(session);
        this.setConnection(session);
    };
    Playground.prototype.getUrlSession = function (sessions) {
        var prefix = '?query=';
        if (location.search.includes(prefix)) {
            var uri = location.search.slice(prefix.length, location.search.length);
            var query_1 = decodeURIComponent(uri);
            var equivalent = sessions.findIndex(function (session) {
                return session.query.trim() === query_1.trim();
            });
            if (equivalent > -1) {
                this.initialIndex = equivalent;
            } else {
                return this.createSessionFromQuery(query_1);
            }
        }
        return null;
    };
    Playground.prototype.setValueInHistory = function (sessionId, key, value) {
        this.setState(function (state) {
            // TODO optimize the lookup with a lookup table
            var i = state.history.findIndex(function (s) {
                return s.id === sessionId;
            });
            return __assign({}, state, { history: Immutable.setIn(state.history, [i, key], value) });
        });
    };
    Playground.prototype.isGraphcoolUrl = function (endpoint) {
        return endpoint.includes('api.graph.cool');
    };
    Playground.prototype.getEndpoint = function () {
        if (this.props.isEndpoint) {
            return location.pathname;
        }
        return this.props.endpoint;
    };
    Object.defineProperty(Playground.prototype, "httpApiPrefix", {
        get: function get() {
            return this.props.endpoint.match(/(https?:\/\/.*?)\/?/)[1];
        },
        enumerable: true,
        configurable: true
    });
    Playground.prototype.getSubscriptionEndpoint = function () {
        if (this.props.subscriptionsEndpoint) {
            return this.props.subscriptionsEndpoint;
        }
        return null;
    };
    Playground.prototype.addToHistory = function (session) {
        var id = cuid();
        var historySession = Immutable.merge(session, {
            id: id,
            date: new Date()
        });
        this.setState(function (state) {
            return __assign({}, state, { history: [historySession].concat(state.history) });
        });
        this.storage.addToHistory(historySession);
    };
    Playground.prototype.historyIncludes = function (session) {
        var duplicate = this.state.history.find(function (item) {
            return session.query === item.query && session.variables === item.variables && session.operationName === item.operationName;
        });
        return Boolean(duplicate);
    };
    Playground.prototype.parseHeaders = function (headers) {
        if (Array.isArray(headers)) {
            return headers.reduce(function (acc, header) {
                return __assign({}, acc, (_a = {}, _a[header.name] = header.value, _a));
                var _a;
            }, {});
        } else if ((typeof headers === "undefined" ? "undefined" : _typeof(headers)) === 'object') {
            return headers;
        }
        var jsonVariables;
        try {
            jsonVariables = headers && headers.trim() !== '' ? JSON.parse(headers) : undefined;
        } catch (error) {
            /* tslint:disable-next-line */
            console.error("Headers are invalid JSON: " + error.message + ".");
        }
        if ((typeof jsonVariables === "undefined" ? "undefined" : _typeof(jsonVariables)) !== 'object') {
            /* tslint:disable-next-line */
            console.error('Headers are not a JSON object.');
        }
        return jsonVariables;
    };
    return Playground;
}(React.PureComponent);
exports.Playground = Playground;
exports.default = react_redux_1.connect(function (state) {
    return state.graphiqlDocs;
}, {
    setStacks: graphiql_docs_1.setStacks
})(Playground);
var PlaygroundWrapper = styled_1.styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n  margin-right: -1px !important;\n\n  line-height: 1.5;\n  font-family: 'Open Sans', sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  letter-spacing: 0.53px;\n  color: rgba(0, 0, 0, 0.8);\n\n  a:active,\n  a:focus,\n  button:focus,\n  input:focus {\n    outline: none;\n  }\n"], ["\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n  margin-right: -1px !important;\n\n  line-height: 1.5;\n  font-family: 'Open Sans', sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  letter-spacing: 0.53px;\n  color: rgba(0, 0, 0, 0.8);\n\n  a:active,\n  a:focus,\n  button:focus,\n  input:focus {\n    outline: none;\n  }\n"])));
var GraphiqlsContainer = styled_1.styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: calc(100vh - 57px);\n  position: relative;\n  overflow: hidden;\n"], ["\n  height: calc(100vh - 57px);\n  position: relative;\n  overflow: hidden;\n"])));
var GraphiqlWrapper = styled_1.styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n  visibility: hidden;\n  &.active {\n    visibility: visible;\n  }\n"], ["\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n  visibility: hidden;\n  &.active {\n    visibility: visible;\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Playground.jsx.map