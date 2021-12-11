(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
class Source {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
    /**
     * @deprecated use {@link Source.getSearchResults getSearchResults} instead
     */
    searchRequest(query, metadata) {
        return this.getSearchResults(query, metadata);
    }
    /**
     * @deprecated use {@link Source.getSearchTags} instead
     */
    getTags() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return (_a = this.getSearchTags) === null || _a === void 0 ? void 0 : _a.call(this);
        });
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    var _a;
    let time;
    let trimmed = Number(((_a = /\d*/.exec(timeAgo)) !== null && _a !== void 0 ? _a : [])[0]);
    trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
    if (timeAgo.includes('minutes')) {
        time = new Date(Date.now() - trimmed * 60000);
    }
    else if (timeAgo.includes('hours')) {
        time = new Date(Date.now() - trimmed * 3600000);
    }
    else if (timeAgo.includes('days')) {
        time = new Date(Date.now() - trimmed * 86400000);
    }
    else if (timeAgo.includes('year') || timeAgo.includes('years')) {
        time = new Date(Date.now() - trimmed * 31556952000);
    }
    else {
        time = new Date(Date.now());
    }
    return time;
}
exports.convertTime = convertTime;
/**
 * When a function requires a POST body, it always should be defined as a JsonObject
 * and then passed through this function to ensure that it's encoded properly.
 * @param obj
 */
function urlEncodeObject(obj) {
    let ret = {};
    for (const entry of Object.entries(obj)) {
        ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
    }
    return ret;
}
exports.urlEncodeObject = urlEncodeObject;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
}
exports.Tracker = Tracker;

},{}],4:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./Tracker"), exports);

},{"./Source":2,"./Tracker":3}],5:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./base"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./APIWrapper"), exports);

},{"./APIWrapper":1,"./base":4,"./models":47}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],7:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],8:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],9:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],10:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],11:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],12:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],13:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],14:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],15:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],16:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],17:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],18:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],19:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],20:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],21:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],22:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],23:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],24:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Button"), exports);
__exportStar(require("./Form"), exports);
__exportStar(require("./Header"), exports);
__exportStar(require("./InputField"), exports);
__exportStar(require("./Label"), exports);
__exportStar(require("./Link"), exports);
__exportStar(require("./MultilineLabel"), exports);
__exportStar(require("./NavigationButton"), exports);
__exportStar(require("./OAuthButton"), exports);
__exportStar(require("./Section"), exports);
__exportStar(require("./Select"), exports);
__exportStar(require("./Switch"), exports);
__exportStar(require("./WebViewButton"), exports);
__exportStar(require("./FormRow"), exports);
__exportStar(require("./Stepper"), exports);

},{"./Button":9,"./Form":10,"./FormRow":11,"./Header":12,"./InputField":13,"./Label":14,"./Link":15,"./MultilineLabel":16,"./NavigationButton":17,"./OAuthButton":18,"./Section":19,"./Select":20,"./Stepper":21,"./Switch":22,"./WebViewButton":23}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSectionType = void 0;
var HomeSectionType;
(function (HomeSectionType) {
    HomeSectionType["singleRowNormal"] = "singleRowNormal";
    HomeSectionType["singleRowLarge"] = "singleRowLarge";
    HomeSectionType["doubleRow"] = "doubleRow";
    HomeSectionType["featured"] = "featured";
})(HomeSectionType = exports.HomeSectionType || (exports.HomeSectionType = {}));

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCode = void 0;
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["UNKNOWN"] = "_unknown";
    LanguageCode["BENGALI"] = "bd";
    LanguageCode["BULGARIAN"] = "bg";
    LanguageCode["BRAZILIAN"] = "br";
    LanguageCode["CHINEESE"] = "cn";
    LanguageCode["CZECH"] = "cz";
    LanguageCode["GERMAN"] = "de";
    LanguageCode["DANISH"] = "dk";
    LanguageCode["ENGLISH"] = "gb";
    LanguageCode["SPANISH"] = "es";
    LanguageCode["FINNISH"] = "fi";
    LanguageCode["FRENCH"] = "fr";
    LanguageCode["WELSH"] = "gb";
    LanguageCode["GREEK"] = "gr";
    LanguageCode["CHINEESE_HONGKONG"] = "hk";
    LanguageCode["HUNGARIAN"] = "hu";
    LanguageCode["INDONESIAN"] = "id";
    LanguageCode["ISRELI"] = "il";
    LanguageCode["INDIAN"] = "in";
    LanguageCode["IRAN"] = "ir";
    LanguageCode["ITALIAN"] = "it";
    LanguageCode["JAPANESE"] = "jp";
    LanguageCode["KOREAN"] = "kr";
    LanguageCode["LITHUANIAN"] = "lt";
    LanguageCode["MONGOLIAN"] = "mn";
    LanguageCode["MEXIAN"] = "mx";
    LanguageCode["MALAY"] = "my";
    LanguageCode["DUTCH"] = "nl";
    LanguageCode["NORWEGIAN"] = "no";
    LanguageCode["PHILIPPINE"] = "ph";
    LanguageCode["POLISH"] = "pl";
    LanguageCode["PORTUGUESE"] = "pt";
    LanguageCode["ROMANIAN"] = "ro";
    LanguageCode["RUSSIAN"] = "ru";
    LanguageCode["SANSKRIT"] = "sa";
    LanguageCode["SAMI"] = "si";
    LanguageCode["THAI"] = "th";
    LanguageCode["TURKISH"] = "tr";
    LanguageCode["UKRAINIAN"] = "ua";
    LanguageCode["VIETNAMESE"] = "vn";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = void 0;
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["ONGOING"] = 1] = "ONGOING";
    MangaStatus[MangaStatus["COMPLETED"] = 0] = "COMPLETED";
    MangaStatus[MangaStatus["UNKNOWN"] = 2] = "UNKNOWN";
    MangaStatus[MangaStatus["ABANDONED"] = 3] = "ABANDONED";
    MangaStatus[MangaStatus["HIATUS"] = 4] = "HIATUS";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));

},{}],28:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],29:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],30:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],31:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],32:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],33:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],34:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],35:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],36:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],37:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOperator = void 0;
var SearchOperator;
(function (SearchOperator) {
    SearchOperator["AND"] = "AND";
    SearchOperator["OR"] = "OR";
})(SearchOperator = exports.SearchOperator || (exports.SearchOperator = {}));

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = void 0;
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],40:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],41:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagType = void 0;
/**
 * An enumerator which {@link SourceTags} uses to define the color of the tag rendered on the website.
 * Five types are available: blue, green, grey, yellow and red, the default one is blue.
 * Common colors are red for (Broken), yellow for (+18), grey for (Country-Proof)
 */
var TagType;
(function (TagType) {
    TagType["BLUE"] = "default";
    TagType["GREEN"] = "success";
    TagType["GREY"] = "info";
    TagType["YELLOW"] = "warning";
    TagType["RED"] = "danger";
})(TagType = exports.TagType || (exports.TagType = {}));

},{}],43:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],44:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],45:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],46:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],47:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Chapter"), exports);
__exportStar(require("./ChapterDetails"), exports);
__exportStar(require("./HomeSection"), exports);
__exportStar(require("./Manga"), exports);
__exportStar(require("./MangaTile"), exports);
__exportStar(require("./RequestObject"), exports);
__exportStar(require("./SearchRequest"), exports);
__exportStar(require("./TagSection"), exports);
__exportStar(require("./SourceTag"), exports);
__exportStar(require("./Languages"), exports);
__exportStar(require("./Constants"), exports);
__exportStar(require("./MangaUpdate"), exports);
__exportStar(require("./PagedResults"), exports);
__exportStar(require("./ResponseObject"), exports);
__exportStar(require("./RequestManager"), exports);
__exportStar(require("./RequestHeaders"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./SourceStateManager"), exports);
__exportStar(require("./RequestInterceptor"), exports);
__exportStar(require("./DynamicUI"), exports);
__exportStar(require("./TrackedManga"), exports);
__exportStar(require("./SourceManga"), exports);
__exportStar(require("./TrackedMangaChapterReadAction"), exports);
__exportStar(require("./TrackerActionQueue"), exports);
__exportStar(require("./SearchField"), exports);
__exportStar(require("./RawData"), exports);

},{"./Chapter":6,"./ChapterDetails":7,"./Constants":8,"./DynamicUI":24,"./HomeSection":25,"./Languages":26,"./Manga":27,"./MangaTile":28,"./MangaUpdate":29,"./PagedResults":30,"./RawData":31,"./RequestHeaders":32,"./RequestInterceptor":33,"./RequestManager":34,"./RequestObject":35,"./ResponseObject":36,"./SearchField":37,"./SearchRequest":38,"./SourceInfo":39,"./SourceManga":40,"./SourceStateManager":41,"./SourceTag":42,"./TagSection":43,"./TrackedManga":44,"./TrackedMangaChapterReadAction":45,"./TrackerActionQueue":46}],48:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReaperScans = exports.ReaperScansInfo = void 0;
/* eslint-disable semi */
const paperback_extensions_common_1 = require("paperback-extensions-common");
const rsParser_1 = require("./rsParser");
const RS_BASE = 'https://reaperscans.com/';
exports.ReaperScansInfo = {
    version: '2.0.1',
    name: 'ReaperScans',
    icon: 'logo.png',
    author: 'NmN',
    authorWebsite: 'https://github.com/bdashore3',
    description: 'Extension that pulls manga from Reaper Scans.',
    contentRating: paperback_extensions_common_1.ContentRating.MATURE,
    websiteBaseURL: RS_BASE,
    sourceTags: [
        {
            text: 'Notifications',
            type: paperback_extensions_common_1.TagType.GREEN,
        },
        {
            text: 'Experimental',
            type: paperback_extensions_common_1.TagType.RED,
        },
    ],
};
class ReaperScans extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.requestManager = createRequestManager({
            requestsPerSecond: 5,
            requestTimeout: 20000,
        });
    }
    getMangaShareUrl(mangaId) {
        return `${RS_BASE}/series/${mangaId}`;
    }
    getMangaDetails(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = createRequestObject({
                url: `${RS_BASE}/series/`,
                method: 'GET',
                param: mangaId,
            });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            return rsParser_1.parseMangaDetails($, mangaId);
        });
    }
    getChapters(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = createRequestObject({
                url: `${RS_BASE}/series/`,
                method: 'GET',
                param: mangaId,
            });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            return rsParser_1.parseChapters($, mangaId);
        });
    }
    getChapterDetails(mangaId, chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = createRequestObject({
                url: `${RS_BASE}/series/${mangaId}/${chapterId}`,
                method: 'GET',
            });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            return rsParser_1.parseChapterDetails($, mangaId, chapterId);
        });
    }
    filterUpdatedManga(mangaUpdatesFoundCallback, time, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = createRequestObject({
                url: RS_BASE,
                method: 'GET',
            });
            const data = yield this.requestManager.schedule(request, 1);
            const result = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
            const foundIds = [];
            for (const series in result) {
                const seriesDetails = result[series];
                const seriesUpdated = new Date(seriesDetails['last_updated'] * 1000);
                const id = seriesDetails['slug'];
                if (seriesUpdated >= time && ids.includes(id)) {
                    foundIds.push(id);
                }
            }
            mangaUpdatesFoundCallback(createMangaUpdates({ ids: foundIds }));
        });
    }
    getHomePageSections(sectionCallback) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const request = createRequestObject({
                url: `${RS_BASE}`,
                method: 'GET',
            });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            const request2 = createRequestObject({
                url: 'https://pandeynmn.github.io/rs.html',
                method: 'GET',
            });
            const response2 = yield this.requestManager.schedule(request2, 1);
            const ch2 = this.cheerio.load(response2.data);
            const data = ch2('.data').text();
            const githubJson = typeof data === 'string' ? JSON.parse(data) : response.data;
            const section0 = createHomeSection({
                id: 'recently_updated',
                title: 'Recent Updates',
                type: paperback_extensions_common_1.HomeSectionType.singleRowNormal,
            });
            const section1 = createHomeSection({
                id: 'coming_soon',
                title: 'Coming Soon',
                type: paperback_extensions_common_1.HomeSectionType.featured,
            });
            const section2 = createHomeSection({
                id: 'popular_titles',
                title: 'Popular Titles',
                type: paperback_extensions_common_1.HomeSectionType.singleRowNormal,
            });
            const section3 = createHomeSection({
                id: 'dev_titles',
                title: (_a = githubJson.heading) !== null && _a !== void 0 ? _a : 'Featured Manga',
                type: paperback_extensions_common_1.HomeSectionType.singleRowLarge,
            });
            const sections = [section0, section1, section2, section3];
            rsParser_1.parseHomeSections($, sections, this, sectionCallback);
        });
    }
    getSearchResults(query, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = 1;
            if (metadata != null) {
                page = metadata;
            }
            if (page > 1) {
                const temp = [];
                return createPagedResults({
                    results: temp,
                    metadata: {
                        page,
                    },
                });
            }
            page++;
            const title = encodeURI((query === null || query === void 0 ? void 0 : query.title) || '');
            const request = createRequestObject({
                url: `${RS_BASE}`,
                method: 'GET',
                param: `/?s=${title}&post_type=wp-manga`,
            });
            const response = yield this.requestManager.schedule(request, 2);
            const $ = this.cheerio.load(response.data);
            const results = yield rsParser_1.parseSearchPage($);
            return createPagedResults({
                results,
                metadata: page,
            });
        });
    }
}
exports.ReaperScans = ReaperScans;

},{"./rsParser":49,"paperback-extensions-common":5}],49:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSearchPage = exports.parseHomeSections = exports.parseChapterDetails = exports.parseChapters = exports.parseMangaDetails = void 0;
/* eslint-disable semi */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
const paperback_extensions_common_1 = require("paperback-extensions-common");
const parseMangaDetails = ($, mangaId) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const titles = [];
    const title = $('div.post-title > h1').text().trim();
    titles.push(title);
    const image_html = $('.summary_image').html();
    const ind = (_b = (_a = $('.summary_image').html()) === null || _a === void 0 ? void 0 : _a.indexOf('data-src=')) !== null && _b !== void 0 ? _b : 0;
    const ext = (_d = (_c = $('.summary_image').html()) === null || _c === void 0 ? void 0 : _c.indexOf('data-srcset=')) !== null && _d !== void 0 ? _d : 2;
    const image = (_e = image_html === null || image_html === void 0 ? void 0 : image_html.substring(ind + 10, ext - 2)) !== null && _e !== void 0 ? _e : '';
    const rating = (_f = $('.score.font-meta.total_votes').first().text().trim()) !== null && _f !== void 0 ? _f : '0';
    const tagSections = [
        // createTagSection({ id: '0', label: 'genres', tags: [createTag({ id: 'test', label: 'test' }), createTag({ id: 'test', label: 'test' })] }),
        createTagSection({ id: '0', label: 'genres', tags: [] }),
    ];
    const genres = $('a', '.genres-content').toArray();
    for (const gen of genres) {
        const tagVal = $(gen).text();
        (_g = tagSections[0]) === null || _g === void 0 ? void 0 : _g.tags.push(createTag({
            id: tagVal,
            label: tagVal,
        }));
    }
    (_h = tagSections[0]) === null || _h === void 0 ? void 0 : _h.tags.push(createTag({
        id: 'ponzi',
        label: 'ponzi',
    }));
    const rsStatus = $('.post-status > .post-content_item:nth-child(2) > .summary-content').text().replace('\n', '').toLowerCase();
    let status;
    switch (rsStatus) {
        case 'ongoing':
            status = paperback_extensions_common_1.MangaStatus.ONGOING;
            break;
        case 'completed':
            status = paperback_extensions_common_1.MangaStatus.COMPLETED;
            break;
        default:
            status = paperback_extensions_common_1.MangaStatus.ONGOING;
            break;
    }
    const desc = $('.summary__content > p').text().trim();
    const author = $('.author-content > a').text();
    const artist = $('.artist-content > a').text();
    return createManga({
        id: mangaId,
        titles,
        image,
        rating: Number(rating),
        status,
        artist,
        author,
        tags: tagSections,
        relatedIds: ['return-of-the-legendary-spear-knigh'],
        // views,
        desc,
        //hentai
        hentai: false,
    });
};
exports.parseMangaDetails = parseMangaDetails;
const parseChapters = ($, mangaId) => {
    var _a, _b, _c, _d;
    const chapters = [];
    const chaptersArr = $('li.wp-manga-chapter').toArray().reverse();
    let chapNum = 0;
    for (const chap of chaptersArr) {
        const id = (_b = (_a = $('.chapter-link > a', $(chap)).attr('href')) === null || _a === void 0 ? void 0 : _a.split('/')[5]) !== null && _b !== void 0 ? _b : '';
        const chapName = (_c = $('.chapter-manhwa-title', $(chap)).text().trim()) !== null && _c !== void 0 ? _c : '';
        const num = (_d = Number(chapName.split(' ')[1])) !== null && _d !== void 0 ? _d : chapNum;
        const timeStr = $('.chapter-release-date > i', $(chap)).text().trim();
        chapters.push(createChapter({
            id,
            mangaId,
            name: `${chapName} (${timeStr})`,
            chapNum: num,
            time: parseDate(timeStr),
            langCode: paperback_extensions_common_1.LanguageCode.ENGLISH,
        }));
        chapNum++;
    }
    return chapters;
};
exports.parseChapters = parseChapters;
const parseChapterDetails = ($, mangaId, id) => {
    const pages = [];
    for (const page of $('.page-break.no-gaps').children('img').toArray()) {
        const imageUrl = page.attribs['data-src'];
        if (!imageUrl)
            continue;
        pages.push(imageUrl.trim());
    }
    return createChapterDetails({
        id,
        mangaId,
        pages,
        longStrip: true,
    });
};
exports.parseChapterDetails = parseChapterDetails;
function parseHomeSections($, sections, object, sectionCallback) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return __awaiter(this, void 0, void 0, function* () {
        for (const section of sections)
            sectionCallback(section);
        const devManga = [];
        const trendingManga = [];
        const latestManga = [];
        const comingSoon = [];
        const trending = $('.get-lost-fucker').toArray();
        const latest = $('.col-6.col-sm-6.col-md-6.col-xl-3').toArray();
        const jsonData = yield getJsonData(object, 'https://pandeynmn.github.io/rs.html');
        for (const obj of jsonData.seriesList) {
            devManga.push(createMangaTile({
                id: (_a = obj.id) !== null && _a !== void 0 ? _a : 'error',
                image: (_b = obj.image) !== null && _b !== void 0 ? _b : '',
                title: createIconText({ text: (_c = obj.title) !== null && _c !== void 0 ? _c : 'error' }),
                subtitleText: createIconText({ text: (_d = obj.subtitleText) !== null && _d !== void 0 ? _d : 'error' }),
            }));
        }
        const jsonData2 = yield getJsonData(object, 'https://pandeynmn.github.io/rs-image.html');
        let count = 0;
        for (const obj of trending) {
            if (count == 9)
                break;
            const title = (_e = $('.title-and-infos > a > h2', $(obj)).first().text()) !== null && _e !== void 0 ? _e : 'Error';
            const url = (_g = (_f = $('.title-and-infos > a', $(obj)).attr('href')) === null || _f === void 0 ? void 0 : _f.trim()) !== null && _g !== void 0 ? _g : '';
            const urlArr = url === null || url === void 0 ? void 0 : url.split('/');
            const id = (_h = urlArr[4]) !== null && _h !== void 0 ? _h : '';
            let image = $('img', $(obj)).attr('src');
            if (image === null || image === void 0 ? void 0 : image.includes('data:image')) {
                image = $('img', $(obj)).attr('data-src-img');
            }
            for (const i of jsonData2.series) {
                if (i.mangaId == id) {
                    image = i.image;
                }
            }
            trendingManga.push(createMangaTile({
                id,
                image: image !== null && image !== void 0 ? image : 'https://uploads.mangadex.org/covers/6e4805a6-75ab-462d-883c-4ddedb8e4df6/ae4cc0de-db06-4cbc-94c4-7b61653a33a3.jpg',
                title: createIconText({ text: title }),
            }));
            count++;
        }
        for (const obj of latest) {
            const title = (_j = $('.series-content > a', $(obj)).text()) !== null && _j !== void 0 ? _j : 'Error';
            const url = (_l = (_k = $('.series-content > a', $(obj)).attr('href')) === null || _k === void 0 ? void 0 : _k.trim()) !== null && _l !== void 0 ? _l : '';
            const urlArr = url === null || url === void 0 ? void 0 : url.split('/');
            const id = (_m = urlArr[4]) !== null && _m !== void 0 ? _m : '';
            let image = $('img', $(obj)).attr('src');
            if (image === null || image === void 0 ? void 0 : image.includes('data:image')) {
                image = $('img', $(obj)).attr('data-src-img');
            }
            latestManga.push(createMangaTile({
                id,
                image: image !== null && image !== void 0 ? image : '',
                title: createIconText({ text: title }),
            }));
            count++;
        }
        comingSoon.push(createMangaTile({
            id: 'the-return-of-the-disaster-class-hero',
            image: 'https://reaperscans.com/wp-content/uploads/2021/10/Cover-1.jpg.webp',
            title: createIconText({ text: 'The Return of The Disaster-Class Hero' }),
        }));
        sections[0].items = latestManga;
        sections[1].items = comingSoon;
        sections[2].items = trendingManga;
        sections[3].items = devManga;
        for (const section of sections)
            sectionCallback(section);
    });
}
exports.parseHomeSections = parseHomeSections;
const parseSearchPage = ($) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const tiles = [];
    for (const item of $('.row.c-tabs-item__content').toArray()) {
        const imageUrl = (_a = $('.tab-thumb.c-image-hover > a > img', $(item)).attr('data-src')) !== null && _a !== void 0 ? _a : '';
        const mangaTitle = (_b = $('.tab-thumb.c-image-hover > a', $(item)).attr('title')) !== null && _b !== void 0 ? _b : '';
        const mangaId = (_d = (_c = $('.tab-thumb.c-image-hover > a', $(item)).attr('href')) === null || _c === void 0 ? void 0 : _c.split('/')[4]) !== null && _d !== void 0 ? _d : '';
        tiles.push(createMangaTile({
            id: mangaId,
            image: imageUrl,
            title: createIconText({ text: mangaTitle }),
        }));
    }
    return tiles;
});
exports.parseSearchPage = parseSearchPage;
function getJsonData(object, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = createRequestObject({
            url,
            method: 'GET',
        });
        const response = yield object.requestManager.schedule(request, 1);
        const loaded = object.cheerio.load(response.data);
        const data = loaded('.data').text();
        const jsonData = typeof data === 'string' ? JSON.parse(data) : data;
        return jsonData;
    });
}
// HELPER FUNCTION
const parseDate = (date) => {
    var _a;
    date = date.toUpperCase();
    let time;
    const number = Number(((_a = /\d*/.exec(date)) !== null && _a !== void 0 ? _a : [])[0]);
    if (date.includes('DAY') || date.includes('DAYS')) {
        time = new Date(Date.now() - number * 86400000);
    }
    else if (date.includes('HOUR') || date.includes('HOURS')) {
        time = new Date(Date.now() - number * 3600000);
    }
    else if (date.includes('MINUTE') || date.includes('MINUTES')) {
        time = new Date(Date.now() - number * 60000);
    }
    else if (date.includes('SECOND') || date.includes('SECONDS')) {
        time = new Date(Date.now() - number * 1000);
    }
    else {
        time = new Date(Date.parse(date));
    }
    return time;
};

},{"paperback-extensions-common":5}]},{},[48])(48)
});
