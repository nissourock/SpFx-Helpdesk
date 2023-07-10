import * as React from "react";
import styles from "./TextEditor.module.scss";

import { escape } from "@microsoft/sp-lodash-subset";

import { MessageBar, MessageBarType } from "office-ui-fabric-react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { TextField, Label, PrimaryButton } from "office-ui-fabric-react";

export class TextEditor extends React.Component<any, any> {
  /**
   * Constructor method
   * @param props properties interface
   */
  public constructor(props) {
    super(props);

    this.state = {
      Title: "",
      editorState: EditorState.createEmpty(),
      MessageType: MessageBarType.info,
    };

    // Bind control events
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onRead = this.onRead.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<any> {
    const { Title, editorState } = this.state;

    return (
      <div className={styles.richTextControl}>
        <div className={styles.container}>
          {this.state.MessageText && (
            <div className={styles.row}>
              <div className={styles.column}>
                <MessageBar
                  messageBarType={this.state.MessageType}
                  isMultiline={false}
                >
                  {this.state.MessageText}
                </MessageBar>
              </div>
            </div>
          )}
          <div className={styles.row}>
            <div className={styles.column}>
              <TextField
                label="Title"
                required
                value={Title}
                // onChange={this.onTitleChange}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.column}>
              <Label>Description</Label>
              <Editor
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.column}>
              <PrimaryButton
                onClick={this.onSave}
                style={{
                  marginBottom: "15px",
                  marginRight: "8px",
                  float: "right",
                }}
              >
                Save
              </PrimaryButton>

              <PrimaryButton
                onClick={this.onRead}
                style={{
                  marginBottom: "15px",
                  marginRight: "8px",
                  float: "right",
                }}
              >
                Read
              </PrimaryButton>

              <PrimaryButton
                onClick={this.onUpdate}
                style={{
                  marginBottom: "15px",
                  marginRight: "8px",
                  float: "right",
                }}
              >
                Update
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private onTitleChange = (ev: any, newText: string): void => {
    this.setState({ Title: newText });
  };

  private onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }

  private async onSave() {
    try {
      console.log(
        draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
      );

      this.setState({
        MessageText: "Item added successfully",
        MessageType: MessageBarType.success,
      });
    } catch (error) {
      this.setState({
        MessageText: "Exception adding item",
        MessageType: MessageBarType.error,
      });

      return Promise.reject(error);
    }
  }

  private async onRead() {
    try {
      const richTextItem = "";

      let editorState: EditorState;

      // Get Description and covert to RichText Control
      const html = richTextItem;
      const contentBlock = htmlToDraft(html);

      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        editorState = EditorState.createWithContent(contentState);
      }

      this.setState({
        ID: richTextItem,
        Title: richTextItem,
        Description: richTextItem,
        editorState: editorState,
      });
    } catch (error) {
      this.setState({
        MessageText: "Exception reading item",
        MessageType: MessageBarType.error,
      });

      return Promise.reject(error);
    }
  }

  private async onUpdate() {
    try {
      let newItem: any = {
        Title: this.state.Title,
        Description: draftToHtml(
          convertToRaw(this.state.editorState.getCurrentContent())
        ),
      };

      this.setState({
        MessageText: "Item updated successfully",
        MessageType: MessageBarType.success,
      });
    } catch (error) {
      this.setState({
        MessageText: "Exception updating item",
        MessageType: MessageBarType.error,
      });

      return Promise.reject(error);
    }
  }
}
