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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var createStore_1 = require("../createStore");
var Playground_1 = require("./Playground");
var react_helmet_1 = require("react-helmet");
var fetch = require("isomorphic-fetch");
var yaml = require("js-yaml");
var ProjectsSideNav_1 = require("./ProjectsSideNav");
var styled_1 = require("../styled");
var ThemeProvider_1 = require("./Theme/ThemeProvider");
var util_1 = require("./util");
var PlaygroundStorage_1 = require("./PlaygroundStorage");
var lodash_1 = require("lodash");
var store = createStore_1.default();
function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regexa = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regexa.exec(url);
    if (!results || !results[2]) {
        return null;
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
var defaultSettings = "{\n  \"editor.theme\": \"dark\",\n  \"editor.reuseHeaders\": true,\n  \"tracing.hideTracingResponse\": true\n}";
var MiddlewareApp = /** @class */ (function (_super) {
    __extends(MiddlewareApp, _super);
    function MiddlewareApp(props) {
        var _this = _super.call(this, props) || this;
        _this.handleUpdateSessionCount = function () {
            _this.forceUpdate();
        };
        _this.getSessionCount = function (endpoint) {
            if (_this.state.endpoint === endpoint && _this.playground) {
                return _this.playground.state.sessions.length;
            }
            return PlaygroundStorage_1.default.getSessionCount(endpoint);
        };
        _this.getPlaygroundRef = function (ref) {
            _this.playground = ref;
            if (typeof _this.props.getRef === 'function') {
                _this.props.getRef(ref);
            }
        };
        _this.handleStartEditConfig = function () {
            _this.playground.openConfigTab();
        };
        _this.handleChangeConfig = function (configString) {
            _this.setState({ configString: configString });
        };
        _this.handleSaveConfig = function () {
            /* tslint:disable-next-line */
            console.log('handleSaveConfig called');
            if (typeof _this.props.onSaveConfig === 'function') {
                /* tslint:disable-next-line */
                console.log('calling this.props.onSaveConfig', _this.state.configString);
                _this.props.onSaveConfig(_this.state.configString);
            }
        };
        _this.handleSelectEnv = function (env, projectName) {
            var _a = util_1.getActiveEndpoints(_this.props.config, env, projectName), endpoint = _a.endpoint, subscriptionEndpoint = _a.subscriptionEndpoint, headers = _a.headers;
            _this.setState({
                activeEnv: env,
                endpoint: endpoint,
                headers: headers,
                subscriptionEndpoint: subscriptionEndpoint,
                activeProjectName: projectName,
            });
        };
        _this.handleChangeSettings = function (settingsString) {
            _this.setState({ settingsString: settingsString });
        };
        _this.handleSaveSettings = function () {
            try {
                var settings = JSON.parse(_this.state.settingsString);
                _this.setState({ settings: settings });
                localStorage.setItem('settings', _this.state.settingsString);
            }
            catch (e) {
                /* tslint:disable-next-line */
                console.error(e);
            }
        };
        _this.share = function (session) {
            fetch('https://api.graph.cool/simple/v1/cj81hi46q03c30196uxaswrz2', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: "\n        mutation ($session: String! $endpoint: String!) {\n          addSession(session: $session endpoint: $endpoint) {\n            id\n          }\n        }\n      ",
                    variables: {
                        session: JSON.stringify(session),
                        endpoint: _this.normalizeEndpoint(_this.state.endpoint),
                    },
                }),
            })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                var shareUrl = "https://graphqlbin.com/" + res.data.addSession.id;
                // const shareUrl = `${location.origin}/${res.data.addSession.id}`
                _this.setState({ shareUrl: shareUrl });
            });
        };
        _this.handleChangeEndpoint = function (endpoint) {
            _this.setState({ endpoint: endpoint });
        };
        _this.handleChangeSubscriptionsEndpoint = function (subscriptionEndpoint) {
            _this.setState({ subscriptionEndpoint: subscriptionEndpoint });
        };
        global.m = _this;
        var settings = localStorage.getItem('settings') || defaultSettings;
        settings = _this.migrateSettingsString(settings);
        var configIsYaml = props.configString
            ? _this.isConfigYaml(props.configString)
            : false;
        var _a = _this.getInitialActiveEnv(props.config), activeEnv = _a.activeEnv, projectName = _a.projectName;
        var headers;
        var endpoint = props.endpoint ||
            props.endpointUrl ||
            getParameterByName('endpoint') ||
            location.href;
        var subscriptionEndpoint = props.subscriptionEndpoint || getParameterByName('subscriptionEndpoint');
        if (props.configString && props.config && activeEnv) {
            var endpoints = util_1.getActiveEndpoints(props.config, activeEnv, projectName);
            endpoint = endpoints.endpoint;
            subscriptionEndpoint = endpoints.subscriptionEndpoint;
            headers = endpoints.headers;
        }
        else if (!subscriptionEndpoint) {
            subscriptionEndpoint = _this.getGraphcoolSubscriptionEndpoint(endpoint);
        }
        _this.state = {
            endpoint: _this.absolutizeUrl(endpoint),
            platformToken: props.platformToken ||
                localStorage.getItem('platform-token') ||
                undefined,
            subscriptionEndpoint: subscriptionEndpoint
                ? _this.normalizeSubscriptionUrl(endpoint, subscriptionEndpoint)
                : '',
            settingsString: settings,
            settings: _this.getSettings(settings),
            configIsYaml: configIsYaml,
            configString: props.configString,
            activeEnv: activeEnv,
            activeProjectName: projectName,
            headers: headers,
        };
        return _this;
    }
    MiddlewareApp.prototype.getGraphcoolSubscriptionEndpoint = function (endpoint) {
        if (endpoint.includes('api.graph.cool')) {
            return "wss://subscriptions.graph.cool/v1/" + endpoint.split('/').slice(-1)[0];
        }
        return endpoint;
    };
    MiddlewareApp.prototype.migrateSettingsString = function (settingsString) {
        var defaultSettingsObject = JSON.parse(defaultSettings);
        var replacementMap = {
            theme: 'editor.theme',
            reuseHeaders: 'editor.reuseHeaders',
        };
        try {
            var settings = JSON.parse(settingsString);
            return JSON.stringify(__assign({}, defaultSettingsObject, lodash_1.mapKeys(settings, function (value, key) {
                return replacementMap[key] || key;
            })), null, 2);
        }
        catch (e) {
            //
        }
        return settingsString;
    };
    MiddlewareApp.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.configString !== this.props.configString &&
            nextProps.configString) {
            var configIsYaml = this.isConfigYaml(nextProps.configString);
            this.setState({ configIsYaml: configIsYaml });
        }
    };
    MiddlewareApp.prototype.getInitialActiveEnv = function (config) {
        if (config) {
            if (config.extensions && config.extensions.endpoints) {
                return {
                    activeEnv: Object.keys(config.extensions.endpoints)[0],
                };
            }
            if (config.projects) {
                var projectName = Object.keys(config.projects)[0];
                var project = config.projects[projectName];
                if (project.extensions && project.extensions.endpoints) {
                    return {
                        activeEnv: Object.keys(project.extensions.endpoints)[0],
                        projectName: projectName,
                    };
                }
            }
        }
        return {};
    };
    MiddlewareApp.prototype.isConfigYaml = function (configString) {
        try {
            yaml.safeLoad(configString);
            return true;
        }
        catch (e) {
            //
        }
        return false;
    };
    MiddlewareApp.prototype.absolutizeUrl = function (url) {
        if (url.startsWith('/')) {
            return location.origin + url;
        }
        return url;
    };
    MiddlewareApp.prototype.normalizeSubscriptionUrl = function (endpoint, subscriptionEndpoint) {
        if (subscriptionEndpoint.startsWith('/')) {
            var secure = endpoint.includes('https') || location.href.includes('https') ? 's' : '';
            return "ws" + secure + "://" + location.host + subscriptionEndpoint;
        }
        return subscriptionEndpoint;
    };
    MiddlewareApp.prototype.componentWillMount = function () {
        var platformToken = getParameterByName('platform-token');
        if (platformToken && platformToken.length > 0) {
            localStorage.setItem('platform-token', platformToken);
            window.location.replace(window.location.origin + window.location.pathname);
        }
    };
    MiddlewareApp.prototype.componentDidMount = function () {
        if (this.state.subscriptionEndpoint === '') {
            this.updateSubscriptionsUrl();
        }
    };
    MiddlewareApp.prototype.render = function () {
        var title = this.props.setTitle ? (<react_helmet_1.Helmet>
        <title>{this.getTitle()}</title>
      </react_helmet_1.Helmet>) : null;
        var theme = this.state.settings['editor.theme'];
        return (<div>
        {title}
        <react_redux_1.Provider store={store}>
          <styled_1.ThemeProvider theme={__assign({}, styled_1.theme, { mode: theme })}>
            <ThemeProvider_1.default theme={theme}>
              <App>
                {this.props.config &&
            this.state.activeEnv && (<ProjectsSideNav_1.default config={this.props.config} folderName={this.props.folderName || 'GraphQL App'} theme={theme} activeEnv={this.state.activeEnv} onSelectEnv={this.handleSelectEnv} onNewWorkspace={this.props.onNewWorkspace} showNewWorkspace={Boolean(this.props.showNewWorkspace)} isElectron={Boolean(this.props.isElectron)} onEditConfig={this.handleStartEditConfig} getSessionCount={this.getSessionCount} activeProjectName={this.state.activeProjectName}/>)}
                <Playground_1.default endpoint={this.state.endpoint} subscriptionsEndpoint={this.state.subscriptionEndpoint} share={this.share} shareUrl={this.state.shareUrl} onChangeEndpoint={this.handleChangeEndpoint} onChangeSubscriptionsEndpoint={this.handleChangeSubscriptionsEndpoint} adminAuthToken={this.state.platformToken} settings={this.normalizeSettings(this.state.settings)} settingsString={this.state.settingsString} onSaveSettings={this.handleSaveSettings} onChangeSettings={this.handleChangeSettings} getRef={this.getPlaygroundRef} config={this.props.config} configString={this.state.configString} configIsYaml={this.state.configIsYaml} canSaveConfig={Boolean(this.props.canSaveConfig)} onChangeConfig={this.handleChangeConfig} onSaveConfig={this.handleSaveConfig} onUpdateSessionCount={this.handleUpdateSessionCount} fixedEndpoints={Boolean(this.state.configString)} session={this.props.session} headers={this.state.headers}/>
              </App>
            </ThemeProvider_1.default>
          </styled_1.ThemeProvider>
        </react_redux_1.Provider>
      </div>);
    };
    MiddlewareApp.prototype.getSettings = function (settingsString) {
        if (settingsString === void 0) { settingsString = this.state.settingsString; }
        try {
            var settings = JSON.parse(settingsString);
            return this.normalizeSettings(settings);
        }
        catch (e) {
            // ignore
        }
        return JSON.parse(defaultSettings);
    };
    MiddlewareApp.prototype.normalizeSettings = function (settings) {
        var theme = settings['editor.theme'];
        if (theme !== 'dark' && theme !== 'light') {
            settings['editor.theme'] = 'dark';
        }
        return settings;
    };
    MiddlewareApp.prototype.normalizeEndpoint = function (endpoint) {
        if (!endpoint.match(/https?:\/\/(.*?)\//)) {
            return location.origin + endpoint;
        }
        else {
            return endpoint;
        }
    };
    MiddlewareApp.prototype.getTitle = function () {
        if (this.state.platformToken ||
            this.state.endpoint.includes('api.graph.cool')) {
            var projectId = this.getProjectId(this.state.endpoint);
            var cluster = this.state.endpoint.includes('api.graph.cool')
                ? 'shared'
                : 'local';
            return cluster + "/" + projectId + " - Playground";
        }
        return "Playground - " + this.state.endpoint;
    };
    MiddlewareApp.prototype.updateSubscriptionsUrl = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var candidates, validCandidate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        candidates = this.getSubscriptionsUrlCandidated(this.state.endpoint);
                        return [4 /*yield*/, find(candidates, function (candidate) {
                                return _this.wsEndpointValid(candidate);
                            })];
                    case 1:
                        validCandidate = _a.sent();
                        if (validCandidate) {
                            this.setState({ subscriptionEndpoint: validCandidate });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MiddlewareApp.prototype.getSubscriptionsUrlCandidated = function (endpoint) {
        var candidates = [];
        candidates.push(endpoint.replace('https', 'wss').replace('http', 'ws'));
        if (endpoint.includes('graph.cool')) {
            candidates.push("wss://subscriptions.graph.cool/v1/" + this.getProjectId(endpoint));
        }
        if (endpoint.includes('/simple/v1/')) {
            // it's a graphcool local endpoint
            var host = endpoint.match(/https?:\/\/(.*?)\//);
            candidates.push("ws://" + host[1] + "/subscriptions/v1/" + this.getProjectId(endpoint));
        }
        return candidates;
    };
    MiddlewareApp.prototype.wsEndpointValid = function (url) {
        return new Promise(function (resolve) {
            var socket = new WebSocket('wss://subscriptions.graph.cool/v1/cirs1ufsg02b101619ru0bx5r', 'graphql-ws');
            socket.addEventListener('open', function (event) {
                socket.send(JSON.stringify({ type: 'connection_init' }));
            });
            socket.addEventListener('message', function (event) {
                var data = JSON.parse(event.data);
                if (data.type === 'connection_ack') {
                    resolve(true);
                }
            });
            socket.addEventListener('error', function (event) {
                resolve(false);
            });
            setTimeout(function () {
                resolve(false);
            }, 1000);
        });
    };
    MiddlewareApp.prototype.getProjectId = function (endpoint) {
        return endpoint.split('/').slice(-1)[0];
    };
    return MiddlewareApp;
}(React.Component));
function find(iterable, predicate) {
    return __awaiter(this, void 0, void 0, function () {
        var i, element, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < iterable.length)) return [3 /*break*/, 4];
                    element = iterable[i];
                    return [4 /*yield*/, predicate(element, i)];
                case 2:
                    result = _a.sent();
                    if (result) {
                        return [2 /*return*/, element];
                    }
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, null];
            }
        });
    });
}
exports.default = MiddlewareApp;
var App = styled_1.styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  width: 100%;\n"], ["\n  display: flex;\n  width: 100%;\n"])));
var templateObject_1;
//# sourceMappingURL=MiddlewareApp.jsx.map