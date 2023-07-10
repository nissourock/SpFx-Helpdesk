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
import * as React from 'react';
import styles from './ToastrSample.module.scss';
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as toastr from 'toastr';
var ToastrSample = (function (_super) {
    __extends(ToastrSample, _super);
    function ToastrSample(props) {
        var _this = _super.call(this, props) || this;
        _this._showToastrMessage = function (scope, textToShow) {
            toastr.options.hideDuration = 5000;
            switch (scope) {
                case "success":
                    toastr.success(textToShow);
                    break;
            }
        };
        SPComponentLoader.loadCss('https://support.bna.dz/SiteAssets/cdnjs.cloudflare.com_ajax_libs_toastr.js_latest_css_toastr.min.css');
        return _this;
    }
    ToastrSample.prototype.componentDidMount = function () {
        this._showToastrMessage(this.props.type, this.props.description);
    };
    ToastrSample.prototype.render = function () {
        return (React.createElement("div", { className: styles.toastrSample },
            React.createElement("div", { className: styles.container },
                React.createElement("div", { className: styles.row },
                    React.createElement("div", { className: styles.column })))));
    };
    return ToastrSample;
}(React.Component));
export default ToastrSample;

//# sourceMappingURL=Toast.js.map
