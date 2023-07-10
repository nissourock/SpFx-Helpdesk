/// <reference types="react" />
import * as React from "react";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
export interface IDetailsListDocumentsExampleState {
    columns: IColumn[];
    items: any;
    selectionDetails: string;
    isModalSelection: boolean;
    isCompactMode: boolean;
    showModal: boolean;
    selectedItem: any;
    isLoading: boolean;
    comments: any;
    commentsLoading: boolean;
    newCommentValue: string;
    selectedPage: any;
    paginatedItems: any;
    totalPages: any;
    perPage: any;
    offset: any;
    listItems: any;
}
export interface IDocument {
    [key: string]: any;
    name: string;
    value: string;
    iconName: string;
    dateModified: string;
    dateModifiedValue: number;
    fileSize: string;
    fileSizeRaw: number;
    status: string;
    priority: string;
}
export declare class DetailsListDocumentsExamplePaginated extends React.Component<{
    listID: string;
    siteCollection: string;
    userId: string;
    context: any;
}, IDetailsListDocumentsExampleState> {
    private _selection;
    items: any[];
    constructor(props: any);
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        items: any;
    };
    createComment(siteCollection: any, commentBody: any, ticketId: any, userID: any): void;
    private deleteComment(siteCollection, commentId);
    render(): JSX.Element;
    private _getPage(page);
    componentDidUpdate(previousProps: any, previousState: IDetailsListDocumentsExampleState): void;
    componentDidMount(): void;
    private _onActiveItemChanged;
    private addComment;
    private _onChangeCompactMode;
    private _onChangeModalSelection;
    setupListItems(siteCollection: string, listID: string, userId: string): void;
    private _onChangeText;
    private _onItemInvoked(item);
    private _showModal;
    private _closeModal;
    private _randomDate(start, end);
    private _randomFileIcon();
    private _randomFileSize();
    private _getSelectionDetails();
    private _onChange1;
    private _onColumnClick;
    private _sortItems;
}
