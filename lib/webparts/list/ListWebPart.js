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
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart, PropertyPaneTextField, PropertyPaneDropdown } from '@microsoft/sp-webpart-base';
import * as strings from 'ListWebPartStrings';
import List from './components/List';
import SharepointService from '../../sharepoint/SharepointServiceManager';
var ListWebPart = (function (_super) {
    __extends(ListWebPart, _super);
    function ListWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.listOfLists = [];
        return _this;
    }
    ListWebPart.prototype.render = function () {
        var element = React.createElement(List, {
            listID: "ba0142f2-a1aa-43f3-85f4-b6ddb75f449d",
            // listID: this.properties.listID,
            // siteCollection: this.properties.siteCollection,
            siteCollection: "https://support.bna.dz",
            UserID: this.context.pageContext.legacyPageContext["userId"],
            context: this.context.pageContext.legacyPageContext,
        });
        ReactDom.render(element, this.domElement);
    };
    ListWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    ListWebPart.prototype.onInit = function () {
        var _this = this;
        return _super.prototype.onInit.call(this).then(function (_) {
            SharepointService.setup(_this.context);
            _this.properties.siteCollection = _this.context.pageContext.web.absoluteUrl;
            console.log(_this.properties.siteCollection);
            console.log(_this.properties.listID);
            _this.setupLists("https://support.bna.dz");
            // this.setupLists(this.properties.siteCollection)
        });
    };
    ListWebPart.prototype.setupLists = function (siteCollection) {
        var _this = this;
        SharepointService.getLists(siteCollection).then(function (result) {
            _this.listOfLists = result.value;
        }).catch(function (err) {
            _this.listOfLists = [];
        });
    };
    ListWebPart.prototype.onPropertyPaneFieldChanged = function (propertyPath, oldValue, newValue) {
        if (propertyPath === "siteCollection") {
            this.setupLists(newValue);
        }
    };
    ListWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('siteCollection', {
                                    label: "Collection de site"
                                }),
                                PropertyPaneDropdown('listID', {
                                    label: "Séléctionner une liste",
                                    options: this.listOfLists.map(function (list) { return ({ text: list.Title, key: list.Id }); }),
                                    disabled: this.listOfLists.length === 0
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return ListWebPart;
}(BaseClientSideWebPart));
export default ListWebPart;

//# sourceMappingURL=ListWebPart.js.map
