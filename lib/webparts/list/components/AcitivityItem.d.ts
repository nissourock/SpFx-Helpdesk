/// <reference types="react" />
import * as React from "react";
export declare class ActivityItemBasicExample extends React.Component<{
    comments: any;
    siteCollection: any;
    userID: any;
    deleteComment: any;
}, {
    comments: any;
    commentsLoading: boolean;
    userDetails: any;
}> {
    constructor(props: any);
    comments: any[];
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(previousProps: any, previousState: any): void;
}
