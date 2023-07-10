declare interface IListWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'ListWebPartStrings' {
  const strings: IListWebPartStrings;
  export = strings;
}
