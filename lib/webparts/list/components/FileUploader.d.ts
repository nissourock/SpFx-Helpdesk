/// <reference types="react" />
import * as React from 'react';
declare class FileUploader extends React.Component<{
    ticketID: any;
    fileUploaded: () => void;
}, {}> {
    fileInput: any;
    constructor(props: any);
    handleFileUpload(ticketID: any): void;
    _showToastrMessage: (scope: string, textToShow: any) => void;
    render(): JSX.Element;
}
export default FileUploader;
