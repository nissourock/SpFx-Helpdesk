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
import { Dropdown, } from "office-ui-fabric-react/lib/Dropdown";
import { Icon } from "office-ui-fabric-react/lib/Icon";
var Elements = (function (_super) {
    __extends(Elements, _super);
    function Elements(props) {
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
                React.createElement(Icon, { style: { marginRight: "8px" }, iconName: "NumberedLIst", "aria-hidden": "true" }),
                React.createElement("span", null, props.placeHolder)));
        };
        _this._onRenderCaretDown = function (props) {
            return React.createElement(Icon, { iconName: "" });
        };
        _this._onChange = function (event) {
            _this.props.itemsToShow(parseInt(event.key.toString()));
            console.log(event);
        };
        _this._onChange = _this._onChange.bind(_this);
        _this.state = {
            empty: "",
            selected: [1],
        };
        return _this;
    }
    Elements.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Dropdown
            //   onChanged={(e)=>this.props.filter("Résolu")}
            , { 
                //   onChanged={(e)=>this.props.filter("Résolu")}
                onChanged: this._onChange, placeHolder: "Nombre de tickets à afficher", label: "", ariaLabel: "Custom dropdown example", onRenderPlaceHolder: this._onRenderPlaceholder, onRenderTitle: this._onRenderTitle, onRenderOption: this._onRenderOption, onRenderCaretDown: this._onRenderCaretDown, style: { dropdown: { width: 300 } }, options: [
                    { key: "5", text: "5" },
                    { key: "10", text: "10" },
                    { key: "20", text: "20" },
                ] })));
    };
    return Elements;
}(React.Component));
export { Elements };

//# sourceMappingURL=Elements.js.map
