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
import styles from "./List.module.scss";
import SharepointService from "../../../sharepoint/SharepointServiceManager";
import { DetailsListDocumentsExample } from "./List2";
import { Label } from "office-ui-fabric-react/lib/Label";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { PivotItem, Pivot, PivotLinkSize, } from "office-ui-fabric-react/lib/Pivot";
import { DropdownCustomExample } from "./FilterButton";
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { DetailsListDocumentsExamplePaginated } from "./List3";
import Form from "./Form";
var List = (function (_super) {
    __extends(List, _super);
    function List(props) {
        var _this = _super.call(this, props) || this;
        _this.items = [];
        _this.lastIndex = 3;
        _this.firstIndex = 0;
        _this.filter = _this.filter.bind(_this);
        _this.itemsToShow = _this.itemsToShow.bind(_this);
        _this.state = {
            listItems: [],
            listItemstoShow: [],
            searchQuery: "",
            departement: "",
            filter: "initial",
            selectedPage: 1,
            paginatedItems: [],
            totalPages: 1,
            perPage: 10,
            offset: 0,
            requesterUserId: undefined
        };
        return _this;
    }
    List.prototype.resetFilter = function () {
        this.setupListItems(this.props.siteCollection, this.props.listID, this.props.UserID);
    };
    List.prototype.filter = function (filterValue) {
        if (filterValue === "Résolu") {
            this.setState({
                listItems: this.items.filter(function (item) { return item.status === "Solved"; }),
            });
            this.setState({ filter: "Résolu" });
        }
        if (filterValue === "Initial") {
            this.setState({ listItems: this.items });
            this.setState({ filter: "initial" });
        }
        if (filterValue === "Nouveau") {
            this.setState({
                listItems: this.items.filter(function (item) { return item.status === "New"; }),
            });
            this.setState({ filter: "Nouveau" });
        }
        if (filterValue === "In progress") {
            this.setState({
                listItems: this.items.filter(function (item) { return item.status === "In progress"; }),
            });
            this.setState({ filter: "In progress" });
        }
        if (filterValue === "Gelé") {
            this.setState({
                listItems: this.items.filter(function (item) { return item.status === "Gelé"; }),
            });
            this.setState({ filter: "Gelé" });
        }
        if (filterValue === "Support externe") {
            this.setState({
                listItems: this.items.filter(function (item) { return item.status === "Support externe"; }),
            });
            this.setState({ filter: "Support externe" });
        }
    };
    List.prototype.itemsToShow = function (nb) {
        var _this = this;
        this.setState({ perPage: nb }, function () { return console.log(_this.state.perPage); });
    };
    List.prototype.setupPages = function () {
        var _this = this;
        this.setState({ offset: this.state.selectedPage * this.state.perPage }, function () { return console.log("offset", _this.state.offset); });
        // this.firstIndex = this.lastIndex - this.state.totalPages;
    };
    List.prototype.setupListItems = function (siteCollection, listID, userId) {
        var _this = this;
        this.items = [];
        SharepointService.getListItems(siteCollection, listID, userId)
            .then(function (result) {
            console.log(result.value);
            if (result.value) {
                result.value.map(function (item) {
                    if (item.AssignedTo) {
                        _this.items.push({
                            id: item.Id,
                            name: item.Title,
                            category: item.Category,
                            status: item.Status.InternalName,
                            priority: item.Priority,
                            created: item.Created,
                            modified: item.Modified,
                            dateModifiedValue: new Date(item.Created.valueOf()),
                            assignedTo: item.AssignedTo,
                        });
                    }
                    else if (!item.AssignedTo) {
                        _this.items.push({
                            id: item.Id,
                            name: item.Title,
                            category: item.Category,
                            status: item.Status.InternalName,
                            priority: item.Priority,
                            created: item.Created,
                            modified: item.Modified,
                            dateModifiedValue: new Date(item.Created.valueOf()),
                        });
                    }
                });
            }
            console.log(_this.items);
            _this.setState({ listItems: _this.items }, function () {
                return console.log(_this.state.listItems);
            });
        })
            .catch(function (err) { return _this.setState({ listItems: [] }); });
    };
    List.prototype.getRequesterId = function (siteCollection, userId) {
        var _this = this;
        SharepointService.getUserContactId(siteCollection, userId).then(
        // result => this.setState({requesterUserId : result.value.Id}), ()=> console.log("requester id " + this.state.requesterUserId)
        function (result) {
            if (result.value[0]) {
                _this.setState({ requesterUserId: result.value[0].Id }, function () { return console.log(_this.state.requesterUserId); });
            }
        });
    };
    List.prototype.addTicket = function (siteCollection, listID, userId) {
        SharepointService.AddTicket(siteCollection, listID, {
            Title: "New Added Ticket",
            StatusId: 1,
            Cat_x00e9_gorie_x0020__x00e9_met: "Agence",
            RequesterId: 1,
            Priority: "Critique"
        });
    };
    List.prototype.componentWillMount = function () {
        if (this.props.listID && this.props.siteCollection) {
        }
    };
    List.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.listID && this.props.siteCollection) {
            this.getRequesterId(this.props.siteCollection, this.props.UserID);
            console.log(this.props.listID);
            this.setState({ filter: "initial" }, function () { return console.log(_this.state.filter); });
            this.setupListItems(this.props.siteCollection, this.props.listID, this.props.UserID);
            // this.setState({listItemstoShow: this.items})
            // this.setState(
            //   {
            //     paginatedItems: this.state.listItems.slice(
            //       0,
            //        this.state.perPage - 1
            //     ),
            //   },
            //   () => console.log(this.state.paginatedItems)
            // );
            // this.setupPages()
        }
        console.log(this.props.context);
    };
    List.prototype.componentDidUpdate = function (prevProps, prevState, prevContext) {
        var _this = this;
        if (prevState.listItems !== this.state.listItems) {
            if (this.state.filter === "initial") {
                this.setState({ selectedPage: 1 });
                this.setState({ offset: 0 });
            }
            if (this.state.listItems.length > 0) {
                this.setState({
                    totalPages: Math.ceil(this.state.listItems.length / this.state.perPage),
                }, function () { return console.log("total pages", _this.state.totalPages); });
            }
            else {
                this.setState({ totalPages: 1 }, function () {
                    return console.log("total pages", _this.state.totalPages);
                });
            }
            var newArr_1 = this.state.listItems.slice(0, this.state.perPage);
            // this.state.listItems.map((item,index)=> { if((index >= this.state.offset )&&(index <= this.state.offset + this.state.perPage)){newArr.push(item)}})
            var filteredArray = this.state.listItems.filter(function (x) {
                return newArr_1.indexOf(x) < 0;
            });
            this.setState({ paginatedItems: this.state.listItems.slice(0, this.state.perPage).slice() }, function () {
                return console.log(_this.state.paginatedItems);
            });
        }
        if (prevState.selectedPage !== this.state.selectedPage) {
            console.log(this.state.selectedPage);
            this.setState({ offset: (this.state.selectedPage - 1) * this.state.perPage }, function () { return console.log("offset", _this.state.offset); });
            console.log(this.state.perPage);
            // this.setState({totalPages: Math.ceil(this.state.listItems.length / 3)},()=> console.log(this.state.paginatedItems))
            var newArr_2 = this.state.listItems.slice(this.state.offset, this.state.offset + this.state.perPage);
            // this.state.listItems.map((item,index)=> { if((index >= this.state.offset )&&(index <= this.state.offset + this.state.perPage)){newArr.push(item)}})
            var filteredArray = this.state.listItems.filter(function (x) {
                return newArr_2.indexOf(x) < 0;
            });
            this.setState({ paginatedItems: this.items.slice(this.state.offset, this.state.offset + this.state.perPage) }, function () {
                return console.log(_this.state.paginatedItems);
            });
        }
    };
    List.prototype.render = function () {
        var listID = this.props.listID;
        var ddProps = {
            filter: this.filter,
        };
        return (React.createElement("div", { className: styles.list },
            this.state.requesterUserId ? "" : React.createElement(MessageBar, { messageBarType: MessageBarType.warning, isMultiline: false, dismissButtonAriaLabel: "Close" }, "Afin de pouvoir cr\u00E9er un ticket, contactez votre administrateur pour vous donner l'acc\u00E8s \u00E0 l'application."),
            React.createElement(Pivot, { linkSize: PivotLinkSize.large },
                React.createElement(PivotItem, { linkText: "Mes tickets", itemCount: this.state.listItems.length, itemIcon: "Home" },
                    React.createElement("div", { style: {
                            margin: "20px",
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                        } },
                        React.createElement("div", { style: { width: "100%" } },
                            React.createElement(DropdownCustomExample, { filter: this.filter }))),
                    (this.state.filter === "initial") ? React.createElement("div", null,
                        " ",
                        React.createElement(DetailsListDocumentsExamplePaginated, { listID: this.props.listID, siteCollection: this.props.siteCollection, userId: this.props.UserID, context: this.props.context })) : React.createElement(DetailsListDocumentsExample, { key: this.state.listItems, items: this.state.listItems, listID: this.props.listID, siteCollection: this.props.siteCollection, userId: this.props.UserID, context: this.props.context })),
                this.state.requesterUserId ? (React.createElement(PivotItem, { linkText: "Créer un ticket", itemIcon: "Ticket" },
                    React.createElement(Label, null,
                        React.createElement(Form, { listID: this.props.listID, siteCollection: this.props.siteCollection, UserID: this.props.UserID, context: this.props.context })))) : "",
                React.createElement(PivotItem, { linkText: "Reporting", itemIcon: "CRMReport", onClick: function () { return window.open("https://support.bna.dz/sites/reporting/SitePages/Helpdesk%20Reporting.aspx", '_blank', 'noopener,noreferrer'); } },
                    React.createElement("div", { dangerouslySetInnerHTML: { __html: "\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B<iframe width=\"1920\" height=\"1080\" src=\"https://scpbir/Reports/powerbi/BNA_BI_Incidents/BNA_BI_V0.1/BNA_BI?rs:embed=true\" frameborder=\"0\" allowfullscreen=\"true\"></iframe>\u200B" } })))));
    };
    List.prototype._customRenderer = function (link, defaultRenderer) {
        return (React.createElement("span", null,
            defaultRenderer(link),
            React.createElement(Icon, { iconName: "Airplane", style: { color: "red" } })));
    };
    return List;
}(React.Component));
export default List;

//# sourceMappingURL=List.js.map
