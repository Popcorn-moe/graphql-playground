"use strict";

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
var graphql_1 = require("graphql");
var stringify = require("json-stable-stringify");
var NoSchemaError_1 = require("./util/NoSchemaError");
var SchemaFetcher = /** @class */function () {
    function SchemaFetcher() {
        this.cache = new Map();
    }
    SchemaFetcher.prototype.fetch = function (endpoint, headers) {
        return __awaiter(this, void 0, void 0, function () {
            var cachedSchema, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cachedSchema = this.cache.get(this.hash(endpoint, headers));
                        _a = cachedSchema;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchSchema(endpoint, headers)];
                    case 1:
                        _a = _b.sent();
                        _b.label = 2;
                    case 2:
                        return [2 /*return*/, _a];
                }
            });
        });
    };
    SchemaFetcher.prototype.refetch = function (endpoint, headers) {
        return this.fetchSchema(endpoint, headers);
    };
    SchemaFetcher.prototype.hash = function (endpoint, headers) {
        return stringify({ endpoint: endpoint, headers: headers });
    };
    SchemaFetcher.prototype.fetchSchema = function (endpoint, headers) {
        if (headers === void 0) {
            headers = {};
        }
        return __awaiter(this, void 0, void 0, function () {
            var response, schemaData, schema, tracingSupported, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, fetch(endpoint, {
                            method: 'post',
                            headers: __assign({ 'Content-Type': 'application/json', 'X-Apollo-Tracing': '1', credentials: 'include' }, headers),
                            body: JSON.stringify({ query: graphql_1.introspectionQuery })
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        schemaData = _a.sent();
                        if (!schemaData || schemaData.error || !schemaData.data) {
                            throw new NoSchemaError_1.NoSchemaError(endpoint);
                        }
                        schema = graphql_1.buildClientSchema(schemaData.data);
                        tracingSupported = schemaData.extensions && Boolean(schemaData.extensions.tracing);
                        result = {
                            schema: schema,
                            tracingSupported: tracingSupported
                        };
                        this.cache.set(this.hash(endpoint, headers), result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return SchemaFetcher;
}();
exports.SchemaFetcher = SchemaFetcher;
//# sourceMappingURL=SchemaFetcher.js.map