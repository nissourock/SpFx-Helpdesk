import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
export interface IListWebPartProps {
    siteCollection: string;
    listID: string;
}
export default class ListWebPart extends BaseClientSideWebPart<IListWebPartProps> {
    listOfLists: any[];
    render(): void;
    protected onDispose(): void;
    protected onInit(): Promise<void>;
    setupLists(siteCollection: string): void;
    protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
