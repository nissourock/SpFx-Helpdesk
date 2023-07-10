/// <reference types="react" />
import * as React from "react";
export declare class DropdownCustomExample extends React.Component<{
    filter: (param: string) => void;
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
