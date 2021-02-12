(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Source = void 0;
class Source {
    constructor(cheerio) {
        // <-----------        OPTIONAL METHODS        -----------> //
        /**
         * Manages the ratelimits and the number of requests that can be done per second
         * This is also used to fetch pages when a chapter is downloading
         */
        this.requestManager = createRequestManager({
            requestsPerSecond: 2.5,
            requestTimeout: 5000
        });
        this.cheerio = cheerio;
    }
    /**
     * (OPTIONAL METHOD) This function is called when ANY request is made by the Paperback Application out to the internet.
     * By modifying the parameter and returning it, the user can inject any additional headers, cookies, or anything else
     * a source may need to load correctly.
     * The most common use of this function is to add headers to image requests, since you cannot directly access these requests through
     * the source implementation itself.
     *
     * NOTE: This does **NOT** influence any requests defined in the source implementation. This function will only influence requests
     * which happen behind the scenes and are not defined in your source.
     */
    globalRequestHeaders() { return {}; }
    globalRequestCookies() { return []; }
    /**
     * (OPTIONAL METHOD) Given a manga ID, return a URL which Safari can open in a browser to display.
     * @param mangaId
     */
    getMangaShareUrl(mangaId) { return null; }
    /**
     * If a source is secured by Cloudflare, this method should be filled out.
     * By returning a request to the website, this source will attempt to create a session
     * so that the source can load correctly.
     * Usually the {@link Request} url can simply be the base URL to the source.
     */
    getCloudflareBypassRequest() { return null; }
    /**
     * (OPTIONAL METHOD) A function which communicates with a given source, and returns a list of all possible tags which the source supports.
     * These tags are generic and depend on the source. They could be genres such as 'Isekai, Action, Drama', or they can be
     * listings such as 'Completed, Ongoing'
     * These tags must be tags which can be used in the {@link searchRequest} function to augment the searching capability of the application
     */
    getTags() { return Promise.resolve(null); }
    /**
     * (OPTIONAL METHOD) A function which should scan through the latest updates section of a website, and report back with a list of IDs which have been
     * updated BEFORE the supplied timeframe.
     * This function may have to scan through multiple pages in order to discover the full list of updated manga.
     * Because of this, each batch of IDs should be returned with the mangaUpdatesFoundCallback. The IDs which have been reported for
     * one page, should not be reported again on another page, unless the relevent ID has been detected again. You do not want to persist
     * this internal list between {@link Request} calls
     * @param mangaUpdatesFoundCallback A callback which is used to report a list of manga IDs back to the API
     * @param time This function should find all manga which has been updated between the current time, and this parameter's reported time.
     *             After this time has been passed, the system should stop parsing and return
     */
    filterUpdatedManga(mangaUpdatesFoundCallback, time, ids) { return Promise.resolve(); }
    /**
     * (OPTIONAL METHOD) A function which should readonly allf the available homepage sections for a given source, and return a {@link HomeSection} object.
     * The sectionCallback is to be used for each given section on the website. This may include a 'Latest Updates' section, or a 'Hot Manga' section.
     * It is recommended that before anything else in your source, you first use this sectionCallback and send it {@link HomeSection} objects
     * which are blank, and have not had any requests done on them just yet. This way, you provide the App with the sections to render on screen,
     * which then will be populated with each additional sectionCallback method called. This is optional, but recommended.
     * @param sectionCallback A callback which is run for each independant HomeSection.
     */
    getHomePageSections(sectionCallback) { return Promise.resolve(); }
    /**
     * (OPTIONAL METHOD) This function will take a given homepageSectionId and metadata value, and with this information, should return
     * all of the manga tiles supplied for the given state of parameters. Most commonly, the metadata value will contain some sort of page information,
     * and this request will target the given page. (Incrementing the page in the response so that the next call will return relevent data)
     * @param homepageSectionId The given ID to the homepage defined in {@link getHomePageSections} which this method is to readonly moreata about
     * @param metadata This is a metadata parameter which is filled our in the {@link getHomePageSections}'s return
     * function. Afterwards, if the metadata value returned in the {@link PagedResults} has been modified, the modified version
     * will be supplied to this function instead of the origional {@link getHomePageSections}'s version.
     * This is useful for keeping track of which page a user is on, pagnating to other pages as ViewMore is called multiple times.
     */
    getViewMoreItems(homepageSectionId, metadata) { return Promise.resolve(null); }
    /**
     * (OPTIONAL METHOD) This function is to return the entire library of a manga website, page by page.
     * If there is an additional page which needs to be called, the {@link PagedResults} value should have it's metadata filled out
     * with information needed to continue pulling information from this website.
     * Note that if the metadata value of {@link PagedResults} is undefined, this method will not continue to run when the user
     * attempts to readonly morenformation
     * @param metadata Identifying information as to what the source needs to call in order to readonly theext batch of data
     * of the directory. Usually this is a page counter.
     */
    getWebsiteMangaDirectory(metadata) { return Promise.resolve(null); }
    // <-----------        PROTECTED METHODS        -----------> //
    // Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
    convertTime(timeAgo) {
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
}
exports.Source = Source;

},{}],3:[function(require,module,exports){
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

},{"./Source":2}],4:[function(require,module,exports){
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

},{"./APIWrapper":1,"./base":3,"./models":22}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],6:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],7:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],8:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],11:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = void 0;
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["ONGOING"] = 1] = "ONGOING";
    MangaStatus[MangaStatus["COMPLETED"] = 0] = "COMPLETED";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));

},{}],13:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],14:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],15:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],16:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],17:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],18:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],19:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],22:[function(require,module,exports){
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

},{"./Chapter":6,"./ChapterDetails":5,"./Constants":7,"./HomeSection":8,"./Languages":9,"./Manga":12,"./MangaTile":10,"./MangaUpdate":11,"./PagedResults":13,"./RequestHeaders":14,"./RequestManager":15,"./RequestObject":16,"./ResponseObject":17,"./SearchRequest":18,"./SourceInfo":19,"./SourceTag":20,"./TagSection":21}],23:[function(require,module,exports){
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
exports.MangaMint = exports.MangaMintInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const MANGAMINT_API_BASE = "https://mangamint.kaedenoki.net/api";
exports.MangaMintInfo = {
    version: "1.0.1",
    name: "MangaMint",
    icon: "icon.png",
    author: "nar1n",
    authorWebsite: "https://github.com/nar1n",
    description: "Extension that pulls manga from mangamint.kaedenoki.net",
    language: paperback_extensions_common_1.LanguageCode.INDONESIAN,
    hentaiSource: false,
    websiteBaseURL: MANGAMINT_API_BASE,
    sourceTags: [
        {
            text: 'Buggy',
            type: paperback_extensions_common_1.TagType.RED
        },
        {
            text: 'Slow',
            type: paperback_extensions_common_1.TagType.RED
        }
    ]
};
class MangaMint extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.requestManager = createRequestManager({
            requestsPerSecond: 2,
            requestTimeout: 25000,
        });
    }
    getMangaDetails(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestTry = 1;
            let request = createRequestObject({
                url: `${MANGAMINT_API_BASE}/manga/detail/`,
                method: "GET",
                param: encodeURIComponent(mangaId)
            });
            let response = yield this.requestManager.schedule(request, 1);
            let mangaDetails = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
            while (requestTry <= 3 && mangaDetails["title"] == "") {
                response = yield this.requestManager.schedule(request, 1);
                mangaDetails = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
                requestTry++;
            }
            let mangaStatus = paperback_extensions_common_1.MangaStatus.COMPLETED;
            if (mangaDetails["status"] == "Ongoing") {
                mangaStatus = paperback_extensions_common_1.MangaStatus.ONGOING;
            }
            let manga = createManga({
                id: mangaDetails["manga_endpoint"],
                titles: [mangaDetails["title"]],
                image: mangaDetails["thumb"],
                rating: 5,
                status: mangaStatus,
                author: mangaDetails["author"],
                desc: mangaDetails["synopsis"]
            });
            return manga;
        });
    }
    getChapters(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestTry = 1;
            let request = createRequestObject({
                url: `${MANGAMINT_API_BASE}/manga/detail/`,
                method: "GET",
                param: encodeURIComponent(mangaId)
            });
            let response = yield this.requestManager.schedule(request, 1);
            let mangaDetails = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
            while (requestTry <= 3 && mangaDetails["title"] == "") {
                response = yield this.requestManager.schedule(request, 1);
                mangaDetails = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
                requestTry++;
            }
            let chapters = [];
            for (const chapter of mangaDetails["chapter"]) {
                let chapterNumber = chapter["chapter_title"].match(/\d/g);
                chapterNumber = chapterNumber.join("");
                chapters.push(createChapter({
                    id: chapter["chapter_endpoint"],
                    mangaId: mangaId,
                    chapNum: Number(chapter["chapter_title"].replace(/^\D+/, '')),
                    langCode: paperback_extensions_common_1.LanguageCode.INDONESIAN,
                    name: chapter["chapter_title"],
                    time: new Date()
                }));
            }
            return chapters;
        });
    }
    getChapterDetails(mangaId, chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestTry = 1;
            let request = createRequestObject({
                url: `${MANGAMINT_API_BASE}/chapter/`,
                method: "GET",
                param: encodeURIComponent(chapterId)
            });
            let response = yield this.requestManager.schedule(request, 1);
            let chapterDetails = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
            while (requestTry <= 3 && chapterDetails["chapter_pages"] == 0) {
                response = yield this.requestManager.schedule(request, 1);
                chapterDetails = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
                requestTry++;
            }
            let chapterPages = [];
            for (const pageInfo of chapterDetails["chapter_image"]) {
                chapterPages.push(pageInfo["chapter_image_link"]);
            }
            return createChapterDetails({
                id: chapterId,
                longStrip: false,
                mangaId: mangaId,
                pages: chapterPages,
            });
        });
    }
    searchRequest(searchQuery, metadata) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let searchTitle = (_a = searchQuery.title) !== null && _a !== void 0 ? _a : '';
            let request = createRequestObject({
                url: `${MANGAMINT_API_BASE}/search/`,
                method: "GET",
                param: searchTitle.replace(' ', '%20')
            });
            const response = yield this.requestManager.schedule(request, 3);
            let searchResults = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
            let mangas = [];
            for (const mangaDetails of searchResults["manga_list"]) {
                mangas.push(createMangaTile({
                    id: mangaDetails["endpoint"],
                    image: mangaDetails["thumb"],
                    title: createIconText({ text: mangaDetails["title"] }),
                }));
            }
            return createPagedResults({
                results: mangas
            });
        });
    }
    getHomePageSections(sectionCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            // Send the empty homesection back so the app can preload the section
            var recommendedSection = createHomeSection({ id: "recommended", title: "RECOMMENDED MANGAS" });
            sectionCallback(recommendedSection);
            var popularSection = createHomeSection({ id: "popular", title: "POPULAR MANGAS" });
            sectionCallback(popularSection);
            const requestRecommended = createRequestObject({
                url: `${MANGAMINT_API_BASE}/recommended`,
                method: "GET"
            });
            const responseRecommended = yield this.requestManager.schedule(requestRecommended, 3);
            let resultRecommended = typeof responseRecommended.data === "string" ? JSON.parse(responseRecommended.data) : responseRecommended.data;
            let recommendedMangas = [];
            for (const mangaDetails of resultRecommended["manga_list"]) {
                recommendedMangas.push(createMangaTile({
                    id: mangaDetails["endpoint"],
                    image: mangaDetails["thumb"],
                    title: createIconText({ text: mangaDetails["title"] }),
                }));
            }
            recommendedSection.items = recommendedMangas;
            sectionCallback(recommendedSection);
            const requestPopular = createRequestObject({
                url: `${MANGAMINT_API_BASE}/manga/popular/1`,
                method: "GET"
            });
            const responsePopular = yield this.requestManager.schedule(requestPopular, 3);
            let resultPopular = typeof responsePopular.data === "string" ? JSON.parse(responsePopular.data) : responsePopular.data;
            let popularMangas = [];
            for (const mangaDetails of resultPopular["manga_list"]) {
                popularMangas.push(createMangaTile({
                    id: mangaDetails["endpoint"],
                    image: mangaDetails["thumb"],
                    title: createIconText({ text: mangaDetails["title"] }),
                }));
            }
            popularSection.items = popularMangas;
            sectionCallback(popularSection);
        });
    }
    getMangaShareUrl(mangaId) {
        return `${MANGAMINT_API_BASE}/manga/detail/${mangaId}`;
    }
}
exports.MangaMint = MangaMint;

},{"paperback-extensions-common":4}]},{},[23])(23)
});