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
import * as React from "react";
import styles from "./TextEditor.module.scss";
import { MessageBar, MessageBarType } from "office-ui-fabric-react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { TextField, Label, PrimaryButton } from "office-ui-fabric-react";
var TextEditor = (function (_super) {
    __extends(TextEditor, _super);
    /**
     * Constructor method
     * @param props properties interface
     */
    function TextEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.onTitleChange = function (ev, newText) {
            _this.setState({ Title: newText });
        };
        _this.state = {
            Title: "",
            editorState: EditorState.createEmpty(),
            MessageType: MessageBarType.info,
        };
        // Bind control events
        _this.onTitleChange = _this.onTitleChange.bind(_this);
        _this.onEditorStateChange = _this.onEditorStateChange.bind(_this);
        _this.onSave = _this.onSave.bind(_this);
        _this.onRead = _this.onRead.bind(_this);
        _this.onUpdate = _this.onUpdate.bind(_this);
        return _this;
    }
    /**
     * Default React render method
     */
    TextEditor.prototype.render = function () {
        var _a = this.state, Title = _a.Title, editorState = _a.editorState;
        return (React.createElement("div", { className: styles.richTextControl },
            React.createElement("div", { className: styles.container },
                this.state.MessageText && (React.createElement("div", { className: styles.row },
                    React.createElement("div", { className: styles.column },
                        React.createElement(MessageBar, { messageBarType: this.state.MessageType, isMultiline: false }, this.state.MessageText)))),
                React.createElement("div", { className: styles.row },
                    React.createElement("div", { className: styles.column },
                        React.createElement(TextField, { label: "Title", required: true, value: Title }))),
                React.createElement("div", { className: styles.row },
                    React.createElement("div", { className: styles.column },
                        React.createElement(Label, null, "Description"),
                        React.createElement(Editor, { editorState: editorState, onEditorStateChange: this.onEditorStateChange }))),
                React.createElement("div", { className: styles.row },
                    React.createElement("div", { className: styles.column },
                        React.createElement(PrimaryButton, { onClick: this.onSave, style: {
                                marginBottom: "15px",
                                marginRight: "8px",
                                float: "right",
                            } }, "Save"),
                        React.createElement(PrimaryButton, { onClick: this.onRead, style: {
                                marginBottom: "15px",
                                marginRight: "8px",
                                float: "right",
                            } }, "Read"),
                        React.createElement(PrimaryButton, { onClick: this.onUpdate, style: {
                                marginBottom: "15px",
                                marginRight: "8px",
                                float: "right",
                            } }, "Update"))))));
    };
    TextEditor.prototype.onEditorStateChange = function (editorState) {
        this.setState({
            editorState: editorState,
        });
    };
    TextEditor.prototype.onSave = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    console.log(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
                    this.setState({
                        MessageText: "Item added successfully",
                        MessageType: MessageBarType.success,
                    });
                }
                catch (error) {
                    this.setState({
                        MessageText: "Exception adding item",
                        MessageType: MessageBarType.error,
                    });
                    return [2 /*return*/, Promise.reject(error)];
                }
                return [2 /*return*/];
            });
        });
    };
    TextEditor.prototype.onRead = function () {
        return __awaiter(this, void 0, void 0, function () {
            var richTextItem, editorState, html, contentBlock, contentState;
            return __generator(this, function (_a) {
                try {
                    richTextItem = "";
                    editorState = void 0;
                    html = richTextItem;
                    contentBlock = htmlToDraft(html);
                    if (contentBlock) {
                        contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                        editorState = EditorState.createWithContent(contentState);
                    }
                    this.setState({
                        ID: richTextItem,
                        Title: richTextItem,
                        Description: richTextItem,
                        editorState: editorState,
                    });
                }
                catch (error) {
                    this.setState({
                        MessageText: "Exception reading item",
                        MessageType: MessageBarType.error,
                    });
                    return [2 /*return*/, Promise.reject(error)];
                }
                return [2 /*return*/];
            });
        });
    };
    TextEditor.prototype.onUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newItem;
            return __generator(this, function (_a) {
                try {
                    newItem = {
                        Title: this.state.Title,
                        Description: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
                    };
                    this.setState({
                        MessageText: "Item updated successfully",
                        MessageType: MessageBarType.success,
                    });
                }
                catch (error) {
                    this.setState({
                        MessageText: "Exception updating item",
                        MessageType: MessageBarType.error,
                    });
                    return [2 /*return*/, Promise.reject(error)];
                }
                return [2 /*return*/];
            });
        });
    };
    return TextEditor;
}(React.Component));
export { TextEditor };

//# sourceMappingURL=TextEditor.js.map
