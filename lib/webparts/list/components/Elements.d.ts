/// <reference types="react" />
import * as React from "react";
export declare class Elements extends React.Component<{
    itemsToShow: (param: number) => void;
}, {
    selected: any;
    empty: any;
}> {
    filter: any;
    constructor(props: any);
    render(): JSX.Element;
    private _onRenderOption;
    private _onRenderTitle;
    private _onRenderPlaceholder;
    private _onRenderCaretDown;
    private _onChange;
}
