/// <reference types="react" />
import * as React from "react";
import { IListProps } from "./IListProps";
export default class List extends React.Component<IListProps, {
    perPage: number;
    offset: number;
    listItems: any[];
    searchQuery: string;
    departement: string | number;
    filter: string;
    selectedPage: number;
    listItemstoShow: any[];
    paginatedItems: any[];
    totalPages: number;
    requesterUserId: number | undefined;
}> {
    constructor(props: IListProps);
    items: any[];
    lastIndex: number;
    firstIndex: number;
    resetFilter(): void;
    filter(filterValue: string): void;
    itemsToShow(nb: number): void;
    setupPages(): void;
    setupListItems(siteCollection: string, listID: string, userId: string): void;
    getRequesterId(siteCollection: string, userId: string): void;
    addTicket(siteCollection: string, listID: string, userId: string): void;
    componentWillMount(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<IListProps>, prevState: Readonly<{
        listItems: any[];
        searchQuery: string;
        departement: string | number;
        filter: string;
        selectedPage: number;
        listItemstoShow: any[];
        perPage: number;
    }>, prevContext: any): void;
    render(): React.ReactElement<IListProps>;
    private _customRenderer(link, defaultRenderer);
}
