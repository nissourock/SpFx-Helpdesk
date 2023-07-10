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
import * as React from "react";
import { Link, Icon } from "office-ui-fabric-react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Label } from "office-ui-fabric-react/lib/Label";
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, } from "office-ui-fabric-react/lib/DetailsList";
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";
import styles from "./List.module.scss";
import SharepointService from "../../../sharepoint/SharepointServiceManager";
import { ActivityItemBasicExample } from "./AcitivityItem";
var _items = [];
var fileIcons = [
    { name: "accdb" },
    { name: "csv" },
    { name: "docx" },
    { name: "dotx" },
    { name: "mpp" },
    { name: "mpt" },
    { name: "odp" },
    { name: "ods" },
    { name: "odt" },
    { name: "one" },
    { name: "onepkg" },
    { name: "onetoc" },
    { name: "potx" },
    { name: "ppsx" },
    { name: "pptx" },
    { name: "pub" },
    { name: "vsdx" },
    { name: "vssx" },
    { name: "vstx" },
    { name: "xls" },
    { name: "xlsx" },
    { name: "xltx" },
    { name: "xsn" },
];
var DetailsListDocumentsExample = (function (_super) {
    __extends(DetailsListDocumentsExample, _super);
    function DetailsListDocumentsExample(props) {
        var _this = _super.call(this, props) || this;
        _this._onActiveItemChanged = function (item) {
            console.log(item);
            _this.setState({ selectedItem: item }, function () {
                return _this.setState({ isLoading: false }, function () {
                    return console.log(_this.state.selectedItem);
                });
            });
            _this.setState({ showModal: true });
        };
        _this.addComment = function (siteCollection, commentValue, selectedItemId, UserID) {
            _this.createComment(siteCollection, commentValue, selectedItemId, UserID);
            console.log(siteCollection, commentValue, selectedItemId, UserID);
            _this.setState({
                comments: _this.state.comments.concat([
                    {
                        Id: 25,
                        Author: { Title: _this.props.context.userDisplayName },
                        Body: _this.state.newCommentValue,
                        Created: new Date(),
                    },
                ]),
            }, function () { return _this.setState({ newCommentValue: "" }); });
        };
        _this._onChangeCompactMode = function (checked) {
            _this.setState({ isCompactMode: checked });
        };
        _this._onChangeModalSelection = function (checked) {
            console.log(checked);
            _this.setState({ isModalSelection: checked });
        };
        _this._onChangeText = function (ev, text) {
            _this.setState({
                items: text
                    ? _items.filter(function (i) { return i.name.toLowerCase().indexOf(text) > -1; })
                    : _items,
            });
        };
        _this._showModal = function () {
            _this.setState({ showModal: true });
        };
        _this._closeModal = function () {
            _this.setState({ showModal: false });
        };
        _this._onChange1 = function (newValue) {
            _this.setState({ newCommentValue: newValue });
        };
        _this._onColumnClick = function (ev, column) {
            var _a = _this.state, columns = _a.columns, items = _a.items;
            var newItems = items.slice();
            var newColumns = columns.slice();
            var currColumn = newColumns.filter(function (currCol, idx) {
                return column.key === currCol.key;
            })[0];
            newColumns.forEach(function (newCol) {
                if (newCol === currColumn) {
                    currColumn.isSortedDescending = !currColumn.isSortedDescending;
                    currColumn.isSorted = true;
                }
                else {
                    newCol.isSorted = false;
                    newCol.isSortedDescending = true;
                }
            });
            newItems = _this._sortItems(newItems, currColumn.fieldName || "", currColumn.isSortedDescending);
            _this.setState({
                columns: newColumns,
                items: newItems,
            });
        };
        _this._sortItems = function (items, sortBy, descending) {
            if (descending === void 0) { descending = false; }
            if (descending) {
                return items.sort(function (a, b) {
                    if (a[sortBy] < b[sortBy]) {
                        return 1;
                    }
                    if (a[sortBy] > b[sortBy]) {
                        return -1;
                    }
                    return 0;
                });
            }
            else {
                return items.sort(function (a, b) {
                    if (a[sortBy] < b[sortBy]) {
                        return -1;
                    }
                    if (a[sortBy] > b[sortBy]) {
                        return 1;
                    }
                    return 0;
                });
            }
        };
        _this.deleteComment = _this.deleteComment.bind(_this);
        //  Populate with items for demos.
        _items = [
            {
                dateModified: "03/03/2020",
                dateModifiedValue: 1583244924892,
                fileSize: "56 KB",
                fileSizeRaw: 56,
                iconName: "https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/mpp_16x1.svg",
                name: "Création de session",
                value: "Ttttt.mpp",
                priority: "Importante",
                status: "New",
                category: "Technologie",
            },
            {
                dateModified: "06/03/2020",
                dateModifiedValue: 1583244924892,
                fileSize: "56 KB",
                fileSizeRaw: 56,
                iconName: "https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/mpp_16x1.svg",
                name: "test",
                value: "Ttttt.mpp",
                priority: "Importante",
                status: "New",
                category: "Technologie",
            },
        ];
        var _columns = [
            {
                key: "column1",
                name: "ID",
                fieldName: "id",
                minWidth: 30,
                maxWidth: 30,
                isResizable: false,
                isCollapsable: false,
                data: "number",
                onColumnClick: _this._onColumnClick,
                onRender: function (item) {
                    return React.createElement("span", null, parseInt(item.id));
                },
            },
            {
                key: "column2",
                name: "File Type",
                headerClassName: "DetailsListExample-header--FileIcon",
                className: "DetailsListExample-cell--FileIcon",
                iconClassName: "DetailsListExample-Header-FileTypeIcon",
                ariaLabel: "Column operations for File type",
                iconName: "Home",
                isIconOnly: true,
                fieldName: "name",
                minWidth: 16,
                maxWidth: 16,
                onColumnClick: _this._onColumnClick,
                onRender: function (item) {
                    return (React.createElement("img", { src: item.iconName, className: "DetailsListExample-documentIconImage" }));
                },
            },
            {
                key: "column3",
                name: "Intitulé du ticket",
                fieldName: "name",
                minWidth: 210,
                maxWidth: 350,
                isRowHeader: true,
                isResizable: true,
                isSorted: true,
                isSortedDescending: false,
                onColumnClick: _this._onColumnClick,
                data: "string",
                isPadded: true,
            },
            {
                key: "column4",
                name: "Catégorie",
                fieldName: "category",
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsable: false,
                data: "string",
                onColumnClick: _this._onColumnClick,
                onRender: function (item) {
                    return React.createElement("span", null, item.category);
                },
            },
            {
                key: "column5",
                name: "Priorité",
                fieldName: "priority",
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsable: false,
                data: "string",
                onColumnClick: _this._onColumnClick,
                onRender: function (item) {
                    return React.createElement("span", null, item.priority);
                },
            },
            {
                key: "column6",
                name: "Statut",
                fieldName: "status",
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsable: false,
                data: "string",
                onColumnClick: _this._onColumnClick,
                onRender: function (item) {
                    if (item.status === "New") {
                        return (React.createElement("div", null,
                            React.createElement("span", { style: {
                                    backgroundColor: "beige",
                                    padding: "5px",
                                    backgroundSize: "300px 100px",
                                    borderRadius: "10px",
                                } }, item.status)));
                    }
                    else if (item.status === "In progress") {
                        return (React.createElement("div", null,
                            React.createElement("span", { style: {
                                    backgroundColor: "beige",
                                    padding: "5px",
                                    backgroundSize: "300px 100px",
                                    borderRadius: "10px",
                                } }, item.status)));
                    }
                    else if (item.status === "Gelé") {
                        return (React.createElement("div", null,
                            React.createElement("span", { style: {
                                    backgroundColor: "beige",
                                    padding: "5px",
                                    backgroundSize: "300px 100px",
                                    borderRadius: "10px",
                                } }, item.status)));
                    }
                    else if (item.status === "Pending") {
                        return (React.createElement("div", null,
                            React.createElement("span", { style: {
                                    backgroundColor: "beige",
                                    padding: "5px",
                                    backgroundSize: "300px 100px",
                                    borderRadius: "10px",
                                } }, item.status)));
                    }
                    else if (item.status === "Support externe") {
                        return (React.createElement("div", null,
                            React.createElement("span", { style: {
                                    backgroundColor: "green",
                                    padding: "5px",
                                    backgroundSize: "300px 100px",
                                    borderRadius: "10px",
                                } }, item.status)));
                    }
                    else if (item.status === "Solved") {
                        return (React.createElement("div", null,
                            React.createElement("span", { style: {
                                    backgroundColor: "yellow",
                                    padding: "5px",
                                    backgroundSize: "300px 100px",
                                    borderRadius: "10px",
                                } }, item.status)));
                    }
                },
            },
            {
                key: "column7",
                name: "Date de création",
                fieldName: "dateModifiedValue",
                minWidth: 120,
                maxWidth: 150,
                isResizable: true,
                onColumnClick: _this._onColumnClick,
                data: "date",
                onRender: function (item) {
                    return (React.createElement("span", null, new Date(item.created).toLocaleDateString("fr-fr", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })));
                },
                isPadded: true,
            },
        ];
        _this._selection = new Selection({
            onSelectionChanged: function () {
                _this.setState({
                    selectionDetails: _this._getSelectionDetails(),
                    isModalSelection: _this._selection.isModal(),
                });
            },
        });
        _this.state = {
            items: _this.props.items,
            columns: _columns,
            selectionDetails: _this._getSelectionDetails(),
            isModalSelection: _this._selection.isModal(),
            isCompactMode: false,
            showModal: false,
            selectedItem: null,
            isLoading: true,
            comments: [],
            commentsLoading: true,
            newCommentValue: "",
        };
        return _this;
    }
    DetailsListDocumentsExample.getDerivedStateFromProps = function (nextProps, prevState) {
        if (prevState.items !== nextProps.items) {
            return { items: nextProps.items };
        }
        return null;
    };
    DetailsListDocumentsExample.prototype.createComment = function (siteCollection, commentBody, ticketId, userID) {
        SharepointService.AddComment(siteCollection, "1fabe50c-f6ab-48df-9337-a9dbe261cd0e", {
            Title: null,
            Body: commentBody,
            TicketId: parseInt(ticketId),
            CommentType: "Reply",
            FromId: parseInt(userID),
        });
    };
    DetailsListDocumentsExample.prototype.deleteComment = function (siteCollection, commentId) {
        var _this = this;
        SharepointService.DeleteComment(siteCollection, "1fabe50c-f6ab-48df-9337-a9dbe261cd0e", commentId);
        this.setState({
            comments: this.state.comments.filter(function (item) { return item.Id != commentId; }).slice(),
        }, function () { return _this.setState({ newCommentValue: "" }); });
        console.log(this.state.comments, siteCollection, commentId);
    };
    DetailsListDocumentsExample.prototype.render = function () {
        var _this = this;
        var _a = this.state, columns = _a.columns, isCompactMode = _a.isCompactMode, items = _a.items, selectionDetails = _a.selectionDetails;
        return (React.createElement("div", null,
            React.createElement("div", { style: { margin: "20px" } }, this.state.isLoading ? (React.createElement("div", null)) : (React.createElement(Modal, { titleAriaId: "Test", subtitleAriaId: "Test", isOpen: this.state.showModal, onDismiss: this._closeModal, isBlocking: false, containerClassName: styles.modalContainer },
                React.createElement(DefaultButton, { onClick: this._closeModal, text: "Fermer" }),
                React.createElement("div", { style: { padding: "20px" } },
                    React.createElement("div", { style: { display: "grid" } },
                        React.createElement(Label, { style: { fontSize: "large" } }, "Informations du ticket"),
                        React.createElement(Label, null,
                            "Assign\u00E9 \u00E0 :",
                            " ",
                            this.state.selectedItem.assignedTo ? (React.createElement(Link, { href: "mailto: " + (this.state.selectedItem.assignedTo.Name.substr(this.state.selectedItem.assignedTo.Name.length -
                                    this.state.selectedItem.assignedTo.Name.indexOf("\\") +
                                    3, this.state.selectedItem.assignedTo.Name.length) + "@bna.dz") },
                                this.state.selectedItem.assignedTo.Title
                                    ? this.state.selectedItem.assignedTo.Title
                                    : "",
                                React.createElement(Icon, { iconName: "Mail" }))) : ("Non assigné")),
                        React.createElement(Label, null,
                            "Derni\u00E8re modification :",
                            " ",
                            new Date(this.state.selectedItem.modified).toLocaleDateString("fr-fr", {
                                weekday: "long",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })),
                        React.createElement("div", { style: { display: "flex", flexDirection: "column" } }),
                        React.createElement(Label, { style: { fontSize: "large", marginTop: "10px" } },
                            "Commentaires (",
                            this.state.comments.length,
                            ")")),
                    this.state.commentsLoading ? (React.createElement("div", null, "Loading")) : (React.createElement(ActivityItemBasicExample, { key: this.state.comments, comments: this.state.comments, siteCollection: this.props.siteCollection, userID: this.props.userId, deleteComment: this.deleteComment })),
                    React.createElement("div", { style: { width: "50%" } },
                        React.createElement(TextField, { label: "Entrez votre commentaire", value: this.state.newCommentValue, onChanged: this._onChange1 }),
                        React.createElement(DefaultButton, { primary: true, onClick: function () {
                                return _this.addComment(_this.props.siteCollection, _this.state.newCommentValue, _this.state.selectedItem.id, _this.props.userId);
                            }, style: { marginTop: "10px" } }, "Ajouter un commentaire")))))),
            React.createElement(MarqueeSelection, { selection: this._selection },
                React.createElement("div", { style: { marginTop: "30px" } }),
                (this.state.items.length > 0) ? React.createElement(DetailsList, { items: this.state.items, compact: isCompactMode, columns: columns, selectionMode: this.state.isModalSelection
                        ? SelectionMode.multiple
                        : SelectionMode.none, setKey: this.state.items, layoutMode: DetailsListLayoutMode.justified, isHeaderVisible: true, selection: this._selection, selectionPreservedOnEmptyClick: true, onItemInvoked: this._onItemInvoked, enterModalSelectionOnTouch: true, onActiveItemChanged: this._onActiveItemChanged }) : React.createElement("div", { style: { margin: "10px", fontSize: "large" } }, "Aucun \u00E9l\u00E9ment \u00E0 afficher")),
            React.createElement("div", null)));
    };
    DetailsListDocumentsExample.prototype.componentDidUpdate = function (previousProps, previousState) {
        var _this = this;
        if (previousState.isModalSelection !== this.state.isModalSelection) {
            this._selection.setModal(this.state.isModalSelection);
            console.log(this.state.items);
        }
        if (previousState.selectedItem != this.state.selectedItem) {
            SharepointService.getComments(this.props.siteCollection, this.state.selectedItem.id).then(function (res) {
                return _this.setState({ comments: res.value }, function () {
                    return console.log(_this.state.comments);
                });
            });
            this.setState({ commentsLoading: false });
        }
    };
    DetailsListDocumentsExample.prototype.componentDidMount = function () {
        console.log("test", this.props.items);
    };
    DetailsListDocumentsExample.prototype._onItemInvoked = function (item) {
        console.log("Item invoked: " + item.name);
    };
    DetailsListDocumentsExample.prototype._randomDate = function (start, end) {
        var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        var dateData = {
            value: date.valueOf(),
            dateFormatted: date.toLocaleDateString(),
        };
        return dateData;
    };
    DetailsListDocumentsExample.prototype._randomFileIcon = function () {
        var docType = fileIcons[Math.floor(Math.random() * fileIcons.length) + 0].name;
        return {
            docType: docType,
            url: "https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/" + docType + "_16x1.svg",
        };
    };
    DetailsListDocumentsExample.prototype._randomFileSize = function () {
        var fileSize = Math.floor(Math.random() * 100) + 30;
        return {
            value: fileSize + " KB",
            rawSize: fileSize,
        };
    };
    DetailsListDocumentsExample.prototype._getSelectionDetails = function () {
        var selectionCount = this._selection.getSelectedCount();
        switch (selectionCount) {
            case 0:
                return "No items selected";
            case 1:
                return ("1 item selected: " + this._selection.getSelection()[0].name);
            default:
                return selectionCount + " items selected";
        }
    };
    return DetailsListDocumentsExample;
}(React.Component));
export { DetailsListDocumentsExample };

//# sourceMappingURL=List2.js.map
