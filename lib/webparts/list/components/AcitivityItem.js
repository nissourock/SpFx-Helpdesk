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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from "react";
import { Icon, Link, } from "office-ui-fabric-react";
import { ActivityItem } from "office-ui-fabric-react/lib-es2015/components/ActivityItem";
import styles from "./ActivityItem.module.scss";
var exampleStyles = {
    exampleRoot: {
        marginTop: "20px",
    },
    nameText: {
        fontWeight: "bold",
    },
};
var ActivityItemBasicExample = (function (_super) {
    __extends(ActivityItemBasicExample, _super);
    function ActivityItemBasicExample(props) {
        var _this = _super.call(this, props) || this;
        _this.comments = [];
        _this.state = {
            comments: [],
            commentsLoading: true,
            userDetails: [],
        };
        return _this;
    }
    ActivityItemBasicExample.prototype.render = function () {
        // tslint:disable:jsx-no-lambda
        var _this = this;
        var activityItemExamples = [
            {
                key: 1,
                activityDescription: [
                    React.createElement(Link, { key: 1, className: styles.nameText, onClick: function () {
                            alert("A name was clicked.");
                        } }, "Philippe Lampros"),
                    React.createElement("span", { key: 2 }, " a comment\u00E9"),
                ],
                activityIcon: React.createElement(Icon, { iconName: "Message" }),
                comments: [
                    React.createElement("span", { key: 1 }, "Hello! I am making a comment and mentioning "),
                ],
                timeStamp: "Just now",
            },
        ];
        var activityExampleList = [];
        this.state.comments.forEach(function (item) {
            var props = item;
            activityExampleList.push(React.createElement("div", { style: { display: "flex", flexDirection: "row" } },
                React.createElement(ActivityItem, __assign({}, props, { key: item.key, className: styles.exampleRoot })),
                (item.CreatorID == _this.props.userID) ?
                    React.createElement(Icon, { onClick: function () { return _this.props.deleteComment(_this.props.siteCollection, item.itemID); }, iconName: "Delete", style: { marginLeft: "2px" } }) : ""));
            console.log(_this.props.userID);
            if (item.CreatorID == _this.props.userID) { }
            ;
            React.createElement(Icon, { iconName: "Delete", style: { marginLeft: "2px" } });
            console.log(item.CreatorID);
        });
        return React.createElement("div", null, activityExampleList);
    };
    ActivityItemBasicExample.prototype.componentDidMount = function () {
        var _this = this;
        console.log(this.props.comments);
        this.props.comments.map(function (item) {
            return _this.comments.push({
                key: item.Created,
                CreatorID: item.Author.ID,
                itemID: item.Id,
                activityDescription: [
                    React.createElement(Link, { key: 1, className: styles.nameText, onClick: function () { } }, item.Author.Title),
                    React.createElement("span", { key: 2 }, " a comment\u00E9"),
                ],
                activityIcon: React.createElement(Icon, { iconName: "Message" }),
                comments: [
                    React.createElement("span", { key: 1, dangerouslySetInnerHTML: { __html: item.Body } }),
                ],
                timeStamp: new Date(item.Created).toLocaleDateString("fr-fr", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            });
        });
        this.setState({ comments: this.comments }, function () {
            return console.log(_this.state.comments);
        });
        console.log(this.props.comments);
    };
    ActivityItemBasicExample.prototype.componentDidUpdate = function (previousProps, previousState) {
        if (previousProps.comments !== this.props.comments) {
        }
    };
    return ActivityItemBasicExample;
}(React.Component));
export { ActivityItemBasicExample };

//# sourceMappingURL=AcitivityItem.js.map
