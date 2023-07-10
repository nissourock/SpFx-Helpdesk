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
import './TicketCategory.scss';
var TicketCategory = (function (_super) {
    __extends(TicketCategory, _super);
    function TicketCategory(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isChecked: { agence: false, division: false, direction: false }
        };
        return _this;
    }
    ;
    TicketCategory.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "checkbox-group" },
            React.createElement("div", { className: "checkbox", onClick: function () {
                    _this.setState({ isChecked: { agence: true, division: false, direction: false } });
                    _this.props.ticketType("Agence");
                } },
                React.createElement("label", { className: "checkbox-wrapper" },
                    React.createElement("div", { className: "checkbox-input " + (this.state.isChecked.agence ? "checked" : "") }),
                    React.createElement("span", { className: "checkbox-tile" },
                        React.createElement("span", { className: "checkbox-icon" }, "Agence"),
                        React.createElement("span", { className: "checkbox-label" })))),
            React.createElement("div", { className: "checkbox ", onClick: function () {
                    _this.setState({ isChecked: { agence: false, division: false, direction: true } });
                    _this.props.ticketType("Direction");
                } },
                React.createElement("label", { className: "checkbox-wrapper" },
                    React.createElement("div", { className: "checkbox-input " + (this.state.isChecked.direction ? "checked" : "") }),
                    React.createElement("span", { className: "checkbox-tile" },
                        React.createElement("span", { className: "checkbox-icon" }, "Direction"),
                        React.createElement("span", { className: "checkbox-label" })))),
            React.createElement("div", { className: "checkbox", onClick: function () {
                    _this.setState({ isChecked: { agence: false, division: true, direction: false } });
                    _this.props.ticketType('Division');
                } },
                React.createElement("label", { className: "checkbox-wrapper" },
                    React.createElement("div", { className: "checkbox-input " + (this.state.isChecked.division ? "checked" : "") }),
                    React.createElement("span", { className: "checkbox-tile" },
                        React.createElement("span", { className: "checkbox-icon" }, "Division"),
                        React.createElement("span", { className: "checkbox-label" }))))));
    };
    return TicketCategory;
}(React.Component));
export { TicketCategory };

//# sourceMappingURL=TicketCategory.js.map
