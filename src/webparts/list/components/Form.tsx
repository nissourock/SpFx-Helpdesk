import * as React from "react";
import {
  Dropdown,
  IDropdown,
  DropdownMenuItemType,
  IDropdownOption,
  IDropdownProps,
} from "office-ui-fabric-react/lib/Dropdown";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { SPComponentLoader } from "@microsoft/sp-loader";
import styles from "./List.module.scss";
import { IListProps } from "./IListProps";
import { escape } from "@microsoft/sp-lodash-subset";
import SharepointService from "../../../sharepoint/SharepointServiceManager";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { DetailsListDocumentsExample } from "./List2";
import { Label } from "office-ui-fabric-react/lib/Label";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import styles2 from "./ToastrSample.module.scss";
import * as toastr from "toastr";
import {
  PivotItem,
  IPivotItemProps,
  Pivot,
  PivotLinkSize,
} from "office-ui-fabric-react/lib/Pivot";
import {
  AnimationStyles,
  AnimationClassNames,
  AnimationVariables,
} from "office-ui-fabric-react/lib/Styling";
import { DropdownCustomExample } from "./FilterButton";
import Pagination from "office-ui-fabric-react-pagination";
import { Elements } from "./Elements";
import { TextEditor } from "./TextEditor";
import { DetailsListDocumentsExamplePaginated } from "./List3";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { TicketCategory } from "./TicketCategory";
import ToastrSample from "./Toast";
import FileUploader from "./FileUploader";

initializeIcons();

type NewOptions<IDropdownOption> = IDropdownOption & {
  filterValue: string;
  Code_Agence: string;
  Code_Division: string;
  Code_Direction: string;
};

export default class Form extends React.Component<
  IListProps,
  {
    description: string;
    title: string;
    categories: any[];
    incidents: any[];
    incidentsToDisplay: any;
    priorities: any[];
    selectedPriority: any;
    agences: any;
    selectedAgence: any;
    divisions: any;
    selectedDivisions: any;
    directions: any;
    selectedDirections: any;
    selectedIncident: any;
    selectedCategory: any;
    ticketType: any;
    isSubmitClicked: boolean;
    isModal: boolean;
    requesterUserId: any;
    submitted: boolean;
    lastCreatedTicketId: string | number;
    attachementUploaded: boolean;
  }
> {
  constructor(props: IListProps) {
    super(props);
    this.fileUploaded = this.fileUploaded.bind(this);

    SPComponentLoader.loadCss(
      "https://support.bna.dz/SiteAssets/cdnjs.cloudflare.com_ajax_libs_toastr.js_latest_css_toastr.min.css"
    );
    this.selectTicketType = this.selectTicketType.bind(this);
    this.state = {
      description: "",
      title: "",
      categories: [],
      incidents: [],
      incidentsToDisplay: [],
      selectedIncident: "",
      priorities: [],
      selectedPriority: "",
      selectedCategory: "",
      agences: [],
      selectedAgence: "",
      divisions: [],
      selectedDivisions: "",
      directions: [],
      selectedDirections: "",
      ticketType: "",
      isSubmitClicked: false,
      isModal: false,
      requesterUserId: null,
      submitted: false,
      lastCreatedTicketId: null,
      attachementUploaded: false,
    };
  }

  componentWillMount(): void {}
  componentDidMount(): void {
    if (this.props.listID && this.props.siteCollection) {
      this.getCategories(this.props.siteCollection);
      this.getIncidents(this.props.siteCollection);
      this.getPriorities(this.props.siteCollection);
      this.getAgences(this.props.siteCollection);
      this.getDivisions(this.props.siteCollection);
      this.getDirections(this.props.siteCollection);
      this.getRequesterId(this.props.siteCollection, this.props.UserID);
    }
  }

  componentDidUpdate(
    prevProps: Readonly<IListProps>,
    prevState: Readonly<any>,
    prevContext: any
  ): void {
    if (this.state.selectedCategory != prevState.selectedCategory) {
      console.log(this.state.categories);
      this.setState({
        incidentsToDisplay: this.state.incidents.filter(
          (item) => item.category === this.state.selectedCategory
        ),
      });
    }
  }

  public render(): React.ReactElement<IListProps> {
    return (
      <div className={styles.list}>
        {/* <button onClick={() => this.getAgences(this.props.siteCollection)}>
          Agences
        </button>
        <button onClick={() => this.getDirections(this.props.siteCollection)}>
          Directions
        </button>
        <button onClick={() => this.getDivisions(this.props.siteCollection)}>
          Divisions
        </button> */}
        {/* <button
          onClick={() =>
            this.addTicket(
              this.props.siteCollection,
              this.props.listID,
              this.props.UserID
            )
          }
        >
          {" "}
          Add item{" "}
        </button> */}
        <div style={{ width: "50%" }}>
          <TextField
            label="Intitulé du ticket*"
            value={this.state.title}
            onChanged={this._onChange2}
            errorMessage={
              this.state.isSubmitClicked && this.state.title === ""
                ? "Champ obligatoire"
                : null
            }
          />
          <p style={{ color: "red" }}></p>
          <div style={{ marginBottom: "10px", marginTop: "10px" }}></div>
          <TextField
            label="Description du ticket"
            value={this.state.description}
            onChanged={this._onChange1}
          />
          <div style={{ marginBottom: "10px", marginTop: "10px" }}></div>
          <div>
            <div style={{ marginTop: "0px" }}>
              <Dropdown
                onChanged={this._onChange_Category as any}
                placeHolder="Choisir la catégorie "
                label="Catégorie du ticket*"
                ariaLabel="Custom dropdown example"
                onRenderPlaceHolder={this._onRenderPlaceholder}
                onRenderTitle={this._onRenderTitle}
                onRenderOption={this._onRenderOption}
                onRenderCaretDown={this._onRenderCaretDown}
                style={{ dropdown: { width: 300 } }}
                options={this.state.categories}
                errorMessage={
                  this.state.isSubmitClicked &&
                  this.state.selectedCategory === ""
                    ? "Champ obligatoire"
                    : null
                }
              />

              <div style={{ marginBottom: "10px", marginTop: "10px" }}></div>

              <Dropdown
                onChanged={this._onChange_Incident as any}
                placeHolder="Sélectionnez un incident récurrent"
                label="Incidents récurrents par catégorie "
                ariaLabel="Custom dropdown example"
                onRenderPlaceHolder={this._onRenderPlaceholder3}
                onRenderTitle={this._onRenderTitle3}
                onRenderOption={this._onRenderOption3}
                onRenderCaretDown={this._onRenderCaretDown3}
                style={{ dropdown: { width: 300 } }}
                options={this.state.incidentsToDisplay}
              />

              <div style={{ marginBottom: "10px", marginTop: "10px" }}></div>

              <Dropdown
                //   onChanged={(e)=>this.props.filter("Résolu")}
                onChanged={this._onChange_Priority as any}
                placeHolder="Choisir la sévérité "
                label="Priorité du ticket*"
                ariaLabel="Custom dropdown example"
                onRenderPlaceHolder={this._onRenderPlaceholder2}
                onRenderTitle={this._onRenderTitle2}
                onRenderOption={this._onRenderOption2}
                onRenderCaretDown={this._onRenderCaretDown2}
                style={{ dropdown: { width: 300 } }}
                options={this.state.priorities}
                errorMessage={
                  this.state.isSubmitClicked &&
                  this.state.selectedPriority === ""
                    ? "Champ obligatoire"
                    : null
                }
              />
              <div style={{ marginBottom: "10px", marginTop: "10px" }}></div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1em" }}>
          <div style={{ width: "49%" }}>
            {" "}
            <Label>Catégorie émetteur*</Label>
            <TicketCategory ticketType={this.selectTicketType} />
            {this.state.isSubmitClicked &&
            this.state.selectedAgence === "" &&
            this.state.selectedDirections === "" &&
            this.state.selectedDivisions === "" ? (
              <span style={{ color: "#a80000" }}>
                *Veuillez sélectionner une agence, une direction ou une division
              </span>
            ) : null}
          </div>
          <div style={{ width: "49%" }}>
            <div
              style={{
                display: `${this.state.ticketType === "Agence" ? "" : "none"}`,
              }}
            >
              <Dropdown
                onChanged={this._onChange_Agence as any}
                placeHolder="Sélectionnez une agence"
                label="Agence "
                ariaLabel="Custom dropdown example"
                onRenderPlaceHolder={this._onRenderPlaceholder4}
                onRenderTitle={this._onRenderTitle4}
                onRenderOption={this._onRenderOption4}
                onRenderCaretDown={this._onRenderCaretDown4}
                style={{ dropdown: { width: 300 } }}
                options={this.state.agences}
              />
            </div>
            <div
              style={{
                display: `${
                  this.state.ticketType === "Division" ? "" : "none"
                }`,
              }}
            >
              <Dropdown
                onChanged={this._onChange_Division as any}
                placeHolder="Sélectionnez une division"
                label="Division "
                ariaLabel="Custom dropdown example"
                onRenderPlaceHolder={this._onRenderPlaceholder5}
                onRenderTitle={this._onRenderTitle5}
                onRenderOption={this._onRenderOption5}
                onRenderCaretDown={this._onRenderCaretDown5}
                style={{ dropdown: { width: 300 } }}
                options={this.state.divisions}
              />
            </div>
            <div
              style={{
                display: `${
                  this.state.ticketType === "Direction" ? "" : "none"
                }`,
              }}
            >
              <Dropdown
                onChanged={this._onChange_Direction as any}
                placeHolder="Sélectionnez une direction"
                label="Direction "
                ariaLabel="Custom dropdown example"
                onRenderPlaceHolder={this._onRenderPlaceholder6}
                onRenderTitle={this._onRenderTitle6}
                onRenderOption={this._onRenderOption6}
                onRenderCaretDown={this._onRenderCaretDown6}
                style={{ dropdown: { width: 300 } }}
                options={this.state.directions}
              />
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "10px", marginTop: "10px" }}></div>

        <DefaultButton
          text="Soumettre le ticket"
          onClick={() => {
            this.setState({ isSubmitClicked: true });
            if (
              this.state.selectedCategory != "" &&
              this.state.selectedPriority != "" &&
              this.state.title != ""
            ) {
              this.setState({ isModal: true });
            }
          }}
          // disabled={
          //   (this.state.selectedAgence === "" &&
          //     this.state.selectedDirections === "" &&
          //     this.state.selectedDivisions === "") ||
          //   this.state.selectedCategory ||
          //   this.state.selectedPriority ||
          //   this.state.title
          // }
          primary
        ></DefaultButton>
        <Modal
          titleAriaId="Test"
          subtitleAriaId="Test"
          isOpen={this.state.isModal}
          // onDismiss={() => this.setState({ isModal: false })}
          isBlocking={false}
          containerClassName={styles.modalContainer}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "grid", padding: "20px" }}>
              <Label style={{ fontSize: "large" }}>
                Informations du ticket
              </Label>
              <Label>Intitulé du ticket : {this.state.title} </Label>
              <Label>Description du ticket: {this.state.description} </Label>
              <Label>Catégorie du ticket: {this.state.selectedCategory}</Label>
              <Label>Priorité : {this.state.selectedPriority.text} </Label>
              {console.log(this.state.selectedAgence)}
              {console.log(this.state.selectedDirections)}
              {console.log(this.state.selectedDivisions)}
              {this.state.selectedAgence != "" ? (
                <div>
                  <Label>
                    Code de l'agence: {this.state.selectedAgence.Code_Agence}
                  </Label>
                  <Label>
                    Désignation de l'agence:{" "}
                    {this.toTitleCase(this.state.selectedAgence.text)}
                  </Label>
                  <Label>
                    Ticket traité par: {this.state.selectedAgence.TITLE_DRE}
                  </Label>
                </div>
              ) : (
                ""
              )}
              {this.state.selectedDivisions != "" ? (
                <div>
                  <Label>
                    Code de la division:{" "}
                    {this.state.selectedDivisions.Code_Division}
                  </Label>
                  <Label>
                    Désignation de la division:{" "}
                    {this.toTitleCase(this.state.selectedDivisions.text)}
                  </Label>
                </div>
              ) : (
                ""
              )}
              {this.state.selectedDirections != "" ? (
                <div>
                  <Label>
                    Code de la direction:{" "}
                    {this.state.selectedDirections.Code_Direction}
                  </Label>
                  <Label>
                    Désignation de la direction:{" "}
                    {this.toTitleCase(
                      this.state.selectedDirections.text.trim()
                    )}
                  </Label>
                </div>
              ) : (
                ""
              )}
              <div style={{ display: "grid", padding: "20px" }}>
                {this.state.submitted === false ? (
                  <div>
                    <DefaultButton
                      onClick={() => {
                        this.addTicket(
                          this.props.siteCollection,
                          this.props.listID,
                          this.props.UserID
                        );
                        this.setState({ isModal: true });
                      }}
                      text="Confirmer"
                      primary
                    />
                    <DefaultButton
                      onClick={() => this.setState({ isModal: false })}
                      text="Annuler"
                    />
                  </div>
                ) : null}
                {(this.state.submitted &&
                  this.state.attachementUploaded === false) && (
                    <FileUploader ticketID={this.state.lastCreatedTicketId} fileUploaded={this.fileUploaded} />
                  )}
                  {(this.state.submitted &&
                  this.state.attachementUploaded === true) &&
                <DefaultButton
                  onClick={() => {
                    this.setState({ isModal: false });
                    this.setState({ submitted: false });
                    this.setState({ attachementUploaded: false });
                  }}
                  text="Terminer"
                /> }
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}></div>
            </div>
          </div>
        </Modal>
        {/* <ToastrSample description="Ticket crée" type="success" /> */}
      </div>
    );
  }

  private _onChange1 = (newValue?: string) => {
    this.setState({ description: newValue });
  };
  private _onChange2 = (newValue?: string) => {
    this.setState({ title: newValue });
  };
  private _onRenderOption = (
    option: NewOptions<IDropdownOption>
  ): JSX.Element => {
    return (
      <div>
        {option.data && option.data.icon && (
          <Icon
            style={{ marginRight: "8px" }}
            iconName={option.data.icon}
            aria-hidden="true"
            title={option.data.icon}
          />
        )}
        <span>{option.text}</span>
      </div>
    );
  };
  private _onRenderOption2 = (
    option: NewOptions<IDropdownOption>
  ): JSX.Element => {
    return (
      <div>
        {option.data && option.data.icon && (
          <Icon
            style={{ marginRight: "8px" }}
            iconName={option.data.icon}
            aria-hidden="true"
            title={option.data.icon}
          />
        )}
        <span>{option.text}</span>
      </div>
    );
  };
  private _onRenderOption3 = (
    option: NewOptions<IDropdownOption>
  ): JSX.Element => {
    return (
      <div>
        {option.data && option.data.icon && (
          <Icon
            style={{ marginRight: "8px" }}
            iconName={option.data.icon}
            aria-hidden="true"
            title={option.data.icon}
          />
        )}
        <span>{option.text}</span>
      </div>
    );
  };
  private _onRenderOption4 = (
    option: NewOptions<IDropdownOption>
  ): JSX.Element => {
    return (
      <div>
        {option.data && option.data.icon && (
          <Icon
            style={{ marginRight: "8px" }}
            iconName={option.data.icon}
            aria-hidden="true"
            title={option.data.icon}
          />
        )}
        <span>{`${option.Code_Agence} - ${option.text}`}</span>
      </div>
    );
  };
  private _onRenderOption5 = (
    option: NewOptions<IDropdownOption>
  ): JSX.Element => {
    return (
      <div>
        {option.data && option.data.icon && (
          <Icon
            style={{ marginRight: "8px" }}
            iconName={option.data.icon}
            aria-hidden="true"
            title={option.data.icon}
          />
        )}
        <span>{`${option.Code_Division} - ${option.text}`}</span>
      </div>
    );
  };
  private _onRenderOption6 = (
    option: NewOptions<IDropdownOption>
  ): JSX.Element => {
    return (
      <div>
        {option.data && option.data.icon && (
          <Icon
            style={{ marginRight: "8px" }}
            iconName={option.data.icon}
            aria-hidden="true"
            title={option.data.icon}
          />
        )}
        <span>{`${option.Code_Direction} - ${option.text}`}</span>
      </div>
    );
  };

  private _onRenderTitle = (options: IDropdownOption[]): JSX.Element => {
    const option = options[0];

    // this.props.filter("Résolu")

    return (
      <div>
        {option.data && option.data.icon && (
          <Icon
            style={{ marginRight: "8px" }}
            iconName={option.data.icon}
            aria-hidden="true"
            title={option.data.icon}
          />
        )}
        <span>{option.text}</span>
      </div>
    );
  };
  private _onRenderTitle2 = (options: IDropdownOption[]): JSX.Element => {
    const option = options[0];

    // this.props.filter("Résolu")

    return (
      <div>
        {option.data && option.data.icon && (
          <Icon
            style={{ marginRight: "8px" }}
            iconName={option.data.icon}
            aria-hidden="true"
            title={option.data.icon}
          />
        )}
        <span>{option.text}</span>
      </div>
    );
  };
  private _onRenderTitle3 = (options: IDropdownOption[]): JSX.Element => {
    const option = options[0];

    // this.props.filter("Résolu")

    return (
      <div>
        <span>{option.text}</span>
      </div>
    );
  };
  private _onRenderTitle4 = (options: IDropdownOption[]): JSX.Element => {
    const option = options[0];

    // this.props.filter("Résolu")

    return (
      <div>
        <span>{option.text}</span>
      </div>
    );
  };
  private _onRenderTitle5 = (options: IDropdownOption[]): JSX.Element => {
    const option = options[0];

    // this.props.filter("Résolu")

    return (
      <div>
        <span>{option.text}</span>
      </div>
    );
  };
  private _onRenderTitle6 = (options: IDropdownOption[]): JSX.Element => {
    const option = options[0];

    // this.props.filter("Résolu")

    return (
      <div>
        <span>{option.text}</span>
      </div>
    );
  };

  private _onRenderPlaceholder = (props: IDropdownProps): JSX.Element => {
    return (
      <div className="dropdownExample-placeholder">
        <span>{props.placeHolder}</span>
      </div>
    );
  };
  private _onRenderPlaceholder2 = (props: IDropdownProps): JSX.Element => {
    return (
      <div className="dropdownExample-placeholder">
        <span>{props.placeHolder}</span>
      </div>
    );
  };
  private _onRenderPlaceholder3 = (props: IDropdownProps): JSX.Element => {
    return (
      <div className="dropdownExample-placeholder">
        <span>{props.placeHolder}</span>
      </div>
    );
  };
  private _onRenderPlaceholder4 = (props: IDropdownProps): JSX.Element => {
    return (
      <div className="dropdownExample-placeholder">
        <span>{props.placeHolder}</span>
      </div>
    );
  };
  private _onRenderPlaceholder5 = (props: IDropdownProps): JSX.Element => {
    return (
      <div className="dropdownExample-placeholder">
        <span>{props.placeHolder}</span>
      </div>
    );
  };
  private _onRenderPlaceholder6 = (props: IDropdownProps): JSX.Element => {
    return (
      <div className="dropdownExample-placeholder">
        <span>{props.placeHolder}</span>
      </div>
    );
  };

  private _onRenderCaretDown = (props: IDropdownProps): JSX.Element => {
    return <Icon iconName="DuplicateRow" />;
  };
  private _onRenderCaretDown2 = (props: IDropdownProps): JSX.Element => {
    return <Icon iconName="DuplicateRow" />;
  };
  private _onRenderCaretDown3 = (props: IDropdownProps): JSX.Element => {
    return <Icon iconName="DuplicateRow" />;
  };
  private _onRenderCaretDown4 = (props: IDropdownProps): JSX.Element => {
    return <Icon iconName="DuplicateRow" />;
  };
  private _onRenderCaretDown5 = (props: IDropdownProps): JSX.Element => {
    return <Icon iconName="DuplicateRow" />;
  };
  private _onRenderCaretDown6 = (props: IDropdownProps): JSX.Element => {
    return <Icon iconName="DuplicateRow" />;
  };
  private _onChange_Category = (event: IDropdownOption): void => {
    this.setState({ selectedCategory: event.text });
    console.log(event);
  };
  private _onChange_Incident = (event: IDropdownOption): void => {
    this.setState({ selectedIncident: event });
    console.log(event);
  };
  private _onChange_Priority = (event: IDropdownOption): void => {
    this.setState({ selectedPriority: event });
    console.log(event);
  };
  private _onChange_Agence = (event: IDropdownOption): void => {
    console.log(event);
    this.setState({ selectedAgence: event }, () =>
      console.log(this.state.selectedAgence)
    );
    this.setState({ selectedDivisions: "" });
    this.setState({ selectedDirections: "" });
  };
  private _onChange_Division = (event: IDropdownOption): void => {
    console.log(event);
    this.setState({ selectedDivisions: event }, () =>
      console.log(this.state.selectedDivisions)
    );
    this.setState({ selectedAgence: "" });
    this.setState({ selectedDirections: "" });
  };
  private _onChange_Direction = (event: IDropdownOption): void => {
    console.log(event);
    this.setState({ selectedDirections: event }, () =>
      console.log(this.state.selectedDirections)
    );
    this.setState({ selectedAgence: "" });
    this.setState({ selectedDivisions: "" });
  };

  private getCategories(siteCollection) {
    SharepointService.getCategories(siteCollection).then((result) => {
      const array = [];
      result.value[0].Choices.map((item) =>
        array.push({ key: item, description: item, text: item })
      );
      this.setState({ categories: array }, () =>
        console.log(this.state.categories)
      );
    });
  }
  private getPriorities(siteCollection) {
    SharepointService.getPriorities(siteCollection).then((result) => {
      const array = [];
      result.value[0].Choices.map((item) =>
        array.push({ key: item, description: item, text: item })
      );
      this.setState({ priorities: array }, () =>
        console.log(this.state.priorities)
      );
    });
  }
  private getIncidents(siteCollection) {
    SharepointService.getIncidents(siteCollection).then((result) => {
      console.log(result.value);
      const array = [];
      result.value.map((item) =>
        array.push({
          key: item.Id,
          description: item.Title,
          category: item.Cat_x00e9_gorie_x0020_incident,
          text: item.Title,
          incidentId: item.ID,
        })
      );
      this.setState({ incidents: array }), console.log(this.state.incidents);
      this.setState({ incidentsToDisplay: this.state.incidents });
    });
  }
  private getAgences(siteCollection) {
    SharepointService.getAgences(siteCollection).then((result) => {
      console.log(result);
      const array = [];
      result.value.map((item) =>
        array.push({
          key: item.Id,
          description: item.Title,
          ID_DRE: item.DRE_x0020_de_x0020_l_x0027_agencId,
          TITLE_DRE: item.DRE_x0020_de_x0020_l_x0027_agenc.Title,
          text: item.Title,
          Code_Agence: item.Code_x0020_Agence,
        })
      );
      this.setState({ agences: array }, () => console.log(this.state.agences));
    });
  }
  private getDivisions(siteCollection) {
    SharepointService.getDivisions(siteCollection).then((result) => {
      console.log(result);
      const array = [];
      result.value.map((item) =>
        array.push({
          key: item.Id,
          description: item.Title,
          ID_DRE: item.DRE_x0020_de_x0020_l_x0027_agencId,
          TITLE_Division: item.Title,
          text: item.Title,
          Code_Division: item.Code_x0020_Division,
        })
      );
      this.setState({ divisions: array }, () =>
        console.log(this.state.agences)
      );
    });
  }
  private getDirections(siteCollection) {
    SharepointService.getDirections(siteCollection).then((result) => {
      const array = [];
      console.log(result);
      result.value.map((item) =>
        array.push({
          key: item.Id,
          description: item.Title,
          Code_Division: item.Code_x0020_de_x0020_la_x0020_divId,
          TITLE_Division: item.Code_x0020_de_x0020_la_x0020_div.Title,
          text: item.Title,
          Code_Direction: item.Code_x0020_de_x0020_la_x0020_dir,
        })
      );
      this.setState({ directions: array }, () =>
        console.log(this.state.directions)
      );
    });
  }
  public selectTicketType(type) {
    console.log(type);
    this.setState({ ticketType: type }, () =>
      console.log(this.state.ticketType)
    );
  }
  public toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  addTicket(siteCollection: string, listID: string, userId: string) {
    SharepointService.AddTicket(siteCollection, listID, {
      Title: this.state.title,
      StatusId: 1,
      Cat_x00e9_gorie_x0020__x00e9_met: this.state.ticketType,
      RequesterId: this.state.requesterUserId,
      Priority: this.state.selectedPriority.text,
      Category: this.state.selectedCategory.text,
      D_x00e9_signation_x0020_DREId:
        this.state.selectedAgence != ""
          ? this.state.selectedAgence.ID_DRE
          : null,
      Code_x0020_AgenceId:
        this.state.selectedAgence != ""
          ? this.state.selectedAgence.Code_Agence
          : null,
      Code_x0020_directionId:
        this.state.selectedDirections != ""
          ? this.state.selectedDirections.Code_Direction
          : null,
      Code_x0020_divisionId:
        this.state.selectedDivisions != ""
          ? this.state.selectedDivisions.Code_Division
          : null,
      Incident_x0020_r_x00e9_curents_xId: this.state.selectedIncident
        ? this.state.selectedIncident.incidentId
        : null,
    })
      .then((response) => response.json())
      .then((response) => {
        this.addComment(
          this.props.siteCollection,
          this.state.description,
          response.ID,
          this.props.requesterUserId
        );
        this.setState({ lastCreatedTicketId: response.ID });
      })
      .then(() => this._showToastrMessage("success", "Ticket crée avec succès"))
      .then(() => this.setState({ submitted: true }));
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
  private addComment = (
    siteCollection,
    commentValue,
    selectedItemId,
    UserID
  ) => {
    this.createComment(siteCollection, commentValue, selectedItemId, UserID);
  };
  getRequesterId(siteCollection: string, userId: string) {
    SharepointService.getUserContactId(siteCollection, userId).then(
      // result => this.setState({requesterUserId : result.value.Id}), ()=> console.log("requester id " + this.state.requesterUserId)

      (result) => {
        if (result.value[0]) {
          this.setState({ requesterUserId: result.value[0].Id }, () =>
            console.log(this.state.requesterUserId)
          );
        }
      }
    );
  }
  public _showToastrMessage = (scope: string, textToShow) => {
    toastr.options.hideDuration = 5000;
    switch (scope) {
      case "success":
        toastr.success(textToShow);
        break;
    }
  };
  public fileUploaded() {
    this.setState({ attachementUploaded: true });
  }
}
