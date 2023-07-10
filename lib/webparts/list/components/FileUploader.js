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
import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import SharepointService from '../../../sharepoint/SharepointServiceManager';
import { ActivityItem } from "office-ui-fabric-react/lib-es2015/components/ActivityItem";
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as toastr from 'toastr';
import { classNamesFunction, Icon } from 'office-ui-fabric-react';
import { Label } from "office-ui-fabric-react/lib/Label";
var exampleStyles = {
    exampleRoot: {
        marginTop: '20px'
    },
    nameText: {
        fontWeight: 'bold'
    }
};
var getClassNames = classNamesFunction();
initializeIcons();
var FileUploader = (function (_super) {
    __extends(FileUploader, _super);
    function FileUploader(props) {
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
        _this.handleFileUpload = _this.handleFileUpload.bind(_this);
        return _this;
    }
    FileUploader.prototype.handleFileUpload = function (ticketID) {
        var _this = this;
        var file = this.fileInput.files[0];
        // Perform additional actions with the uploaded file
        SharepointService.post("https://support.bna.dz", "/_api/web/lists/getByTitle('Tickets')/items(" + ticketID + ")/AttachmentFiles/add(FileName='" + file.name + "')", file).then(function () { return _this._showToastrMessage("success", "Pièce jointe ajoutée au ticket"); }).then(function () { return _this.props.fileUploaded(); });
        console.log(file);
    };
    FileUploader.prototype.render = function () {
        var _this = this;
        var activityItemExamples = [
            {
                key: 3,
                activityDescription: [
                    React.createElement("span", { key: 1 }, "Sabrina De Luca"),
                    React.createElement("span", { key: 2 }, " added this file")
                ],
                activityIcon: React.createElement(Icon, { iconName: 'Add' }),
                isCompact: true
            },
            {
                key: 4,
                activityDescription: [
                    React.createElement("span", { key: 1 }, "Chuan Rojumanong"),
                    React.createElement("span", { key: 2 }, " shared this file")
                ],
                activityIcon: React.createElement(Icon, { iconName: 'Share' }),
                isCompact: true
            }
        ];
        var activityExampleList = [];
        activityItemExamples.forEach(function (item) {
            var props = item;
            activityExampleList.push(React.createElement(ActivityItem, __assign({}, props, { key: item.key })));
        });
        return (React.createElement("div", null,
            React.createElement("input", { type: "file", ref: function (input) { _this.fileInput = input; }, style: { display: 'none' }, onChange: function () { return _this.handleFileUpload(_this.props.ticketID); } }),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "10px" } },
                React.createElement(Label, null, "Pi\u00E8ces jointes"),
                "Vous pouvez ajouter des pi\u00E8ces jointes (captures d'\u00E9cran, fichier pdf...etc)",
                React.createElement(PrimaryButton, { text: "Téléverser un fichier ", onClick: function () { return _this.fileInput.click(); }, style: { width: "25%" } }))));
    };
    return FileUploader;
}(React.Component));
export default FileUploader;

//# sourceMappingURL=FileUploader.js.map
