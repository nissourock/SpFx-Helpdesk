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
import { Dropdown, DropdownMenuItemType, } from "office-ui-fabric-react/lib/Dropdown";
import { Icon } from "office-ui-fabric-react/lib/Icon";
var DropdownCustomExample = (function (_super) {
    __extends(DropdownCustomExample, _super);
    function DropdownCustomExample(props) {
        var _this = _super.call(this, props) || this;
        _this._onRenderOption = function (option) {
            return (React.createElement("div", null,
                option.data && option.data.icon && (React.createElement(Icon, { style: { marginRight: "8px" }, iconName: option.data.icon, "aria-hidden": "true", title: option.data.icon })),
                React.createElement("span", null, option.text)));
        };
        _this._onRenderTitle = function (options) {
            var option = options[0];
            // this.props.filter("Résolu")
            return (React.createElement("div", null,
                option.data && option.data.icon && (React.createElement(Icon, { style: { marginRight: "8px" }, iconName: option.data.icon, "aria-hidden": "true", title: option.data.icon })),
                React.createElement("span", null, option.text)));
        };
        _this._onRenderPlaceholder = function (props) {
            return (React.createElement("div", { className: "dropdownExample-placeholder" },
                React.createElement(Icon, { style: { marginRight: "8px" }, iconName: "Filter", "aria-hidden": "true" }),
                React.createElement("span", null, props.placeHolder)));
        };
        _this._onRenderCaretDown = function (props) {
            return React.createElement(Icon, { iconName: "CirclePlus" });
        };
        _this._onChange = function (event) {
            if (event.filterValue === "Solved") {
                _this.props.filter("Résolu");
            }
            else if (event.filterValue === "Initial") {
                _this.props.filter("Initial");
            }
            else if (event.filterValue === "New") {
                _this.props.filter("Nouveau");
            }
            else if (event.filterValue === "In progress") {
                _this.props.filter("In progress");
            }
            else if (event.filterValue === "Support externe") {
                _this.props.filter("Support externe");
            }
            else if (event.filterValue === "Gelé") {
                _this.props.filter("Gelé");
            }
            console.log(event.filterValue);
        };
        _this._onChange = _this._onChange.bind(_this);
        _this.state = {
            empty: "",
            selected: [1],
        };
        return _this;
    }
    DropdownCustomExample.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Dropdown
            //   onChanged={(e)=>this.props.filter("Résolu")}
            , { 
                //   onChanged={(e)=>this.props.filter("Résolu")}
                onChanged: this._onChange, placeHolder: "Filtrer les tickets", label: "", ariaLabel: "Custom dropdown example", onRenderPlaceHolder: this._onRenderPlaceholder, onRenderTitle: this._onRenderTitle, onRenderOption: this._onRenderOption, onRenderCaretDown: this._onRenderCaretDown, style: { dropdown: { width: 300 } }, options: [
                    {
                        key: "X",
                        text: "Tous mes tickets",
                        data: { icon: "Memo" },
                        filterValue: "Initial",
                    },
                    {
                        key: "Header",
                        text: "Par statut",
                        itemType: DropdownMenuItemType.Header,
                    },
                    {
                        key: "A",
                        text: "Mes nouveaux tickets",
                        data: { icon: "Memo" },
                        filterValue: "New",
                    },
                    {
                        key: "D",
                        text: "Mes tickets actifs",
                        data: { icon: "Train" },
                        filterValue: "In progress",
                    },
                    {
                        key: "E",
                        text: "Mes tickets résolus",
                        data: { icon: "Repair" },
                        filterValue: "Solved",
                    },
                    {
                        key: "F",
                        text: "Mes tickets gelés",
                        data: { icon: "Repair" },
                        filterValue: "Gelé",
                    },
                    {
                        key: "G",
                        text: "Mes tickets support externe",
                        data: { icon: "Repair" },
                        filterValue: "Support externe",
                    },
                    {
                        key: "divider_2",
                        text: "-",
                        itemType: DropdownMenuItemType.Divider,
                    },
                ] })));
    };
    return DropdownCustomExample;
}(React.Component));
export { DropdownCustomExample };

//# sourceMappingURL=FilterButton.js.map
