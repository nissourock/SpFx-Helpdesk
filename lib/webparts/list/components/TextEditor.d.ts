/// <reference types="react" />
import * as React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export declare class TextEditor extends React.Component<any, any> {
    /**
     * Constructor method
     * @param props properties interface
     */
    constructor(props: any);
    /**
     * Default React render method
     */
    render(): React.ReactElement<any>;
    private onTitleChange;
    private onEditorStateChange(editorState);
    private onSave();
    private onRead();
    private onUpdate();
}
