import * as React from "react";
import { Link, Icon } from "office-ui-fabric-react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Label } from "office-ui-fabric-react/lib/Label";
import { DropdownCustomExample } from "./FilterButton";


import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
} from "office-ui-fabric-react/lib/DetailsList";
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";
import styles from "./List.module.scss";
import SharepointService from "../../../sharepoint/SharepointServiceManager";
import { ActivityItemBasicExample } from "./AcitivityItem";

let _items: IDocument[] = [];

const fileIcons: { name: string }[] = [
  { name: "accdb" },
  { name: "csv" },
  { name: "docx" },
  { name: "dotx" },
  { name: "mpp" },
  { name: "mpt" },
  { name: "odp" },
  { name: "ods" },
  { name: "odt" },
  { name: "one" },
  { name: "onepkg" },
  { name: "onetoc" },
  { name: "potx" },
  { name: "ppsx" },
  { name: "pptx" },
  { name: "pub" },
  { name: "vsdx" },
  { name: "vssx" },
  { name: "vstx" },
  { name: "xls" },
  { name: "xlsx" },
  { name: "xltx" },
  { name: "xsn" },
];

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

export class DetailsListDocumentsExample extends React.Component<
  {
    items: any[];
    listID: string;
    siteCollection: string;
    userId: string;
    context: any;
  },
  IDetailsListDocumentsExampleState
> {
  private _selection: Selection;

  constructor(props: any) {
    super(props);
    this.deleteComment = this.deleteComment.bind(this);
    //  Populate with items for demos.
    _items = [
      {
        dateModified: "03/03/2020",
        dateModifiedValue: 1583244924892,
        fileSize: "56 KB",
        fileSizeRaw: 56,
        iconName:
          "https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/mpp_16x1.svg",

        name: "Création de session",
        value: "Ttttt.mpp",
        priority: "Importante",
        status: "New",
        category: "Technologie",
      },
      {
        dateModified: "06/03/2020",
        dateModifiedValue: 1583244924892,
        fileSize: "56 KB",
        fileSizeRaw: 56,
        iconName:
          "https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/mpp_16x1.svg",

        name: "test",
        value: "Ttttt.mpp",
        priority: "Importante",
        status: "New",
        category: "Technologie",
      },
    ];

    const _columns: IColumn[] = [
      {
        key: "column1",
        name: "ID",
        fieldName: "id",
        minWidth: 30,
        maxWidth: 30,
        isResizable: false,
        isCollapsable: false,
        data: "number",
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{parseInt(item.id)}</span>;
        },
      },
      {
        key: "column2",
        name: "File Type",
        headerClassName: "DetailsListExample-header--FileIcon",
        className: "DetailsListExample-cell--FileIcon",
        iconClassName: "DetailsListExample-Header-FileTypeIcon",
        ariaLabel: "Column operations for File type",
        iconName: "Home",
        isIconOnly: true,
        fieldName: "name",
        minWidth: 16,
        maxWidth: 16,
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return (
            <img
              src={item.iconName}
              className={"DetailsListExample-documentIconImage"}
            />
          );
        },
      },
      {
        key: "column3",
        name: "Intitulé du ticket",
        fieldName: "name",
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,

        onColumnClick: this._onColumnClick,
        data: "string",
        isPadded: true,
      },
      {
        key: "column4",
        name: "Catégorie",
        fieldName: "category",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsable: false,
        data: "string",
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.category}</span>;
        },
      },
      {
        key: "column5",
        name: "Priorité",
        fieldName: "priority",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsable: false,
        data: "string",
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.priority}</span>;
        },
      },
      {
        key: "column6",
        name: "Statut",
        fieldName: "status",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsable: false,
        data: "string",
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          if (item.status === "New") {
            return (
              <div>
                <span
                  style={{
                    backgroundColor: "beige",
                    padding: "5px",
                    backgroundSize: "300px 100px",
                    borderRadius: "10px",
                  }}
                >
                  {item.status}
                </span>
              </div>
            );
          } else if (item.status === "In progress") {
            return (
              <div>
                <span
                  style={{
                    backgroundColor: "beige",
                    padding: "5px",
                    backgroundSize: "300px 100px",
                    borderRadius: "10px",
                  }}
                >
                  {item.status}
                </span>
              </div>
            );
          } else if (item.status === "Gelé") {
            return (
              <div>
                <span
                  style={{
                    backgroundColor: "beige",
                    padding: "5px",
                    backgroundSize: "300px 100px",
                    borderRadius: "10px",
                  }}
                >
                  {item.status}
                </span>
              </div>
            );
          } else if (item.status === "Pending") {
            return (
              <div>
                <span
                  style={{
                    backgroundColor: "beige",
                    padding: "5px",
                    backgroundSize: "300px 100px",
                    borderRadius: "10px",
                  }}
                >
                  {item.status}
                </span>
              </div>
            );
          } else if (item.status === "Support externe") {
            return (
              <div>
                <span
                  style={{
                    backgroundColor: "green",
                    padding: "5px",
                    backgroundSize: "300px 100px",
                    borderRadius: "10px",
                  }}
                >
                  {item.status}
                </span>
              </div>
            );
          } else if (item.status === "Solved") {
            return (
              <div>
                <span
                  style={{
                    backgroundColor: "yellow",
                    padding: "5px",
                    backgroundSize: "300px 100px",
                    borderRadius: "10px",
                  }}
                >
                  {item.status}
                </span>
              </div>
            );
          }
        },
      },
      {
        key: "column7",
        name: "Date de création",
        fieldName: "dateModifiedValue",
        minWidth: 120,
        maxWidth: 150,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: "date",
        onRender: (item: IDocument) => {
          return (
            <span>
              {new Date(item.created).toLocaleDateString("fr-fr", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          );
        },
        isPadded: true,
      },
    ];

    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectionDetails: this._getSelectionDetails(),
          isModalSelection: this._selection.isModal(),
        });
      },
    });

    this.state = {
      items: this.props.items,
      columns: _columns,
      selectionDetails: this._getSelectionDetails(),
      isModalSelection: this._selection.isModal(),
      isCompactMode: false,
      showModal: false,
      selectedItem: null,
      isLoading: true,
      comments: [],
      commentsLoading: true,
      newCommentValue: "",
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.items !== nextProps.items) {
      return { items: nextProps.items };
    }

    return null;
  }
  public createComment(siteCollection, commentBody, ticketId, userID) {
    SharepointService.AddComment(
      siteCollection,
      "1fabe50c-f6ab-48df-9337-a9dbe261cd0e",
      {
        Title: null,
        Body: commentBody,
        TicketId: parseInt(ticketId),
        CommentType: "Reply",

        FromId: parseInt(userID),
      }
    );
  }
  private deleteComment(siteCollection, commentId) {
    SharepointService.DeleteComment(
      siteCollection,
      "1fabe50c-f6ab-48df-9337-a9dbe261cd0e",
      commentId
    );
    this.setState(
      {
        comments: [
          ...this.state.comments.filter((item) => item.Id != commentId),
        ],
      },
      () => this.setState({ newCommentValue: "" })
    );
    console.log(this.state.comments, siteCollection, commentId);
  }

  public render() {
    const { columns, isCompactMode, items, selectionDetails } = this.state;

    return (
      <div>
        <div style={{ margin: "20px" }}>
          {this.state.isLoading ? (
            <div></div>
          ) : (
            <Modal
              titleAriaId="Test"
              subtitleAriaId="Test"
              isOpen={this.state.showModal}
              onDismiss={this._closeModal}
              isBlocking={false}
              containerClassName={styles.modalContainer}
            >
              <DefaultButton onClick={this._closeModal} text="Fermer" />
              <div style={{ padding: "20px" }}>
                <div style={{ display: "grid" }}>
                  <Label style={{ fontSize: "large" }}>
                    Informations du ticket
                  </Label>
                  <Label>
                    Assigné à :{" "}
                    {this.state.selectedItem.assignedTo ? (
                      <Link
                        href={`mailto: ${
                          this.state.selectedItem.assignedTo.Name.substr(
                            this.state.selectedItem.assignedTo.Name.length -
                              this.state.selectedItem.assignedTo.Name.indexOf(
                                "\\"
                              ) +
                              3,
                            this.state.selectedItem.assignedTo.Name.length
                          ) + "@bna.dz"
                        }`}
                      >
                        {this.state.selectedItem.assignedTo.Title
                          ? this.state.selectedItem.assignedTo.Title
                          : ""}
                        <Icon iconName="Mail"></Icon>
                      </Link>
                    ) : (
                      "Non assigné"
                    )}
                  </Label>
                  <Label>
                    Dernière modification :{" "}
                    {new Date(
                      this.state.selectedItem.modified
                    ).toLocaleDateString("fr-fr", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Label>
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                  ></div>
                  <Label style={{ fontSize: "large", marginTop: "10px" }}>
                    Commentaires ({this.state.comments.length})
                  </Label>
                </div>

                {this.state.commentsLoading! ? (
                  <div>Loading</div>
                ) : (
                  <ActivityItemBasicExample
                    key={this.state.comments}
                    comments={this.state.comments}
                    siteCollection={this.props.siteCollection}
                    userID={this.props.userId}
                    deleteComment={this.deleteComment}
                  />
                )}

                <div style={{ width: "50%" }}>
                  <TextField
                    label="Entrez votre commentaire"
                    value={this.state.newCommentValue}
                    onChanged={this._onChange1}
                  />
                  <DefaultButton
                    primary={true}
                    onClick={() =>
                      this.addComment(
                        this.props.siteCollection,
                        this.state.newCommentValue,
                        this.state.selectedItem.id,
                        this.props.userId
                      )
                    }
                    style={{ marginTop: "10px" }}
                  >
                    Ajouter un commentaire
                  </DefaultButton>
                </div>
              </div>
            </Modal>
          )}
        </div>

        <MarqueeSelection selection={this._selection}>
          <div style={{ marginTop: "30px" }}></div>
          {(this.state.items.length>0) ? <DetailsList
            items={this.state.items}
            compact={isCompactMode}
            columns={columns}
            selectionMode={
              this.state.isModalSelection
                ? SelectionMode.multiple
                : SelectionMode.none
            }
            setKey={this.state.items}
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={this._onItemInvoked}
            enterModalSelectionOnTouch={true}
            onActiveItemChanged={this._onActiveItemChanged}
          /> : <div style={{margin: "10px", fontSize: "large"}}>Aucun élément à afficher</div>}
          
        </MarqueeSelection>
        <div></div>
      </div>
    );
  }

  public componentDidUpdate(
    previousProps: any,
    previousState: IDetailsListDocumentsExampleState
  ) {
    if (previousState.isModalSelection !== this.state.isModalSelection) {
      this._selection.setModal(this.state.isModalSelection);
      console.log(this.state.items);
    }
    if (previousState.selectedItem != this.state.selectedItem) {
      SharepointService.getComments(
        this.props.siteCollection,
        this.state.selectedItem.id
      ).then((res) =>
        this.setState({ comments: res.value }, () =>
          console.log(this.state.comments)
        )
      );
      this.setState({ commentsLoading: false });
    }
  }
  public componentDidMount(): void {
    console.log("test", this.props.items);
  }

  private _onActiveItemChanged = (item): void => {
    console.log(item);
    this.setState({ selectedItem: item }, () =>
      this.setState({ isLoading: false }, () =>
        console.log(this.state.selectedItem)
      )
    );
    this.setState({ showModal: true });
  };

  private addComment = (
    siteCollection,
    commentValue,
    selectedItemId,
    UserID
  ) => {
    this.createComment(siteCollection, commentValue, selectedItemId, UserID);
    console.log(siteCollection, commentValue, selectedItemId, UserID);
    this.setState(
      {
        comments: [
          ...this.state.comments,
          {
            Id: 25,
            Author: { Title: this.props.context.userDisplayName },
            Body: this.state.newCommentValue,
            Created: new Date(),
          },
        ],
      },
      () => this.setState({ newCommentValue: "" })
    );
  };

  private _onChangeCompactMode = (checked: boolean): void => {
    this.setState({ isCompactMode: checked });
  };

  private _onChangeModalSelection = (checked: boolean): void => {
    console.log(checked);
    this.setState({ isModalSelection: checked });
  };

  private _onChangeText = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string
  ): void => {
    this.setState({
      items: text
        ? _items.filter((i) => i.name.toLowerCase().indexOf(text) > -1)
        : _items,
    });
  };

  private _onItemInvoked(item: any): void {
    console.log(`Item invoked: ${item.name}`);
  }
  private _showModal = (): void => {
    this.setState({ showModal: true });
  };

  private _closeModal = (): void => {
    this.setState({ showModal: false });
  };
  private _randomDate(
    start: Date,
    end: Date
  ): { value: number; dateFormatted: string } {
    const date: Date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    const dateData = {
      value: date.valueOf(),
      dateFormatted: date.toLocaleDateString(),
    };
    return dateData;
  }

  private _randomFileIcon(): { docType: string; url: string } {
    const docType: string =
      fileIcons[Math.floor(Math.random() * fileIcons.length) + 0].name;
    return {
      docType,
      url: `https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/${docType}_16x1.svg`,
    };
  }

  private _randomFileSize(): { value: string; rawSize: number } {
    const fileSize: number = Math.floor(Math.random() * 100) + 30;
    return {
      value: `${fileSize} KB`,
      rawSize: fileSize,
    };
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return "No items selected";
      case 1:
        return (
          "1 item selected: " + (this._selection.getSelection()[0] as any).name
        );
      default:
        return `${selectionCount} items selected`;
    }
  }

  private _onChange1 = (newValue?: string) => {
    this.setState({ newCommentValue: newValue });
  };
  private _onColumnClick = (
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ): void => {
    const { columns, items } = this.state;
    let newItems: IDocument[] = items.slice();
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter(
      (currCol: IColumn, idx: number) => {
        return column.key === currCol.key;
      }
    )[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    newItems = this._sortItems(
      newItems,
      currColumn.fieldName || "",
      currColumn.isSortedDescending
    );
    this.setState({
      columns: newColumns,
      items: newItems,
    });
  };

  private _sortItems = (
    items: IDocument[],
    sortBy: string,
    descending = false
  ): IDocument[] => {
    if (descending) {
      return items.sort((a: IDocument, b: IDocument) => {
        if (a[sortBy] < b[sortBy]) {
          return 1;
        }
        if (a[sortBy] > b[sortBy]) {
          return -1;
        }
        return 0;
      });
    } else {
      return items.sort((a: IDocument, b: IDocument) => {
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        return 0;
      });
    }
  };
}
