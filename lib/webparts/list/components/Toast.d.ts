/// <reference types="react" />
import * as React from 'react';
export default class ToastrSample extends React.Component<{
    description: string;
    type: "success" | "warning";
}, {}> {
    constructor(props: any);
    _showToastrMessage: (scope: string, textToShow: any) => void;
    componentDidMount(): void;
    render(): React.ReactElement<{}>;
}
