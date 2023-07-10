import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';

import * as strings from 'ListWebPartStrings';
import List from './components/List';
import { IListProps } from './components/IListProps';
import SharepointService from '../../sharepoint/SharepointServiceManager';

export interface IListWebPartProps {
  siteCollection: string;
  listID: string;

}

export default class ListWebPart extends BaseClientSideWebPart<IListWebPartProps> {

  listOfLists = []

  public render(): void {
    const element: React.ReactElement<IListProps> = React.createElement(
      List,
      {
        listID: "ba0142f2-a1aa-43f3-85f4-b6ddb75f449d",
        // listID: this.properties.listID,
        // siteCollection: this.properties.siteCollection,
        siteCollection: "https://support.bna.dz",
        UserID: this.context.pageContext.legacyPageContext["userId"],
        context: this.context.pageContext.legacyPageContext,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
      SharepointService.setup(this.context)
      this.properties.siteCollection = this.context.pageContext.web.absoluteUrl
console.log(this.properties.siteCollection)
console.log(this.properties.listID)
      this.setupLists("https://support.bna.dz")
      // this.setupLists(this.properties.siteCollection)
    })
  }

  setupLists(siteCollection: string) {
    SharepointService.getLists(siteCollection).then(result => {
      this.listOfLists = result.value
    }).catch(err => {
      this.listOfLists = []
    })
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === "siteCollection") {
      this.setupLists(newValue)
    }

  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
                  options: this.listOfLists.map(list => ({ text: list.Title, key: list.Id })),
                  disabled: this.listOfLists.length === 0
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
