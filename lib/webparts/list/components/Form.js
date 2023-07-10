var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from "react";
import { Dropdown, } from "office-ui-fabric-react/lib/Dropdown";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { SPComponentLoader } from "@microsoft/sp-loader";
import styles from "./List.module.scss";
import SharepointService from "../../../sharepoint/SharepointServiceManager";
import { Label } from "office-ui-fabric-react/lib/Label";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import * as toastr from "toastr";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { TicketCategory } from "./TicketCategory";
import FileUploader from "./FileUploader";
initializeIcons();
var Form = (function (_super) {
    __extends(Form, _super);
    function Form(props) {
        var _this = _super.call(this, props) || this;
        _this._onChange1 = function (newValue) {
            _this.setState({ description: newValue });
        };
        _this._onChange2 = function (newValue) {
            _this.setState({ title: newValue });
        };
        _this._onRenderOption = function (option) {
            return (React.createElement("div", null,
                option.data && option.data.icon && (React.createElement(Icon, { style: { marginRight: "8px" }, iconName: option.data.icon, "aria-hidden": "true", title: option.data.icon })),
                React.createElement("span", null, option.text)));
        };
        _this._onRenderOption2 = function (option) {
            return (React.createElement("div", null,
                option.data && option.data.icon && (React.createElement(Icon, { style: { marginRight: "8px" }, iconName: option.data.icon, "aria-hidden": "true", title: option.data.icon })),
                React.createElement("span", null, option.text)));
        };
        _this._onRenderOption3 = function (option) {
            return (React.createElement("div", null,
                option.data && option.data.icon && (React.createElement(Icon, { style: { marginRight: "8px" }, iconName: option.data.icon, "aria-hidden": "true", title: option.data.icon })),
                React.createElement("span", null, option.text)));
        };
        _this._onRenderOption4 = function (option) {
            return (React.createElement("div", null,
                option.data && option.data.icon && (React.createElement(Icon, { style: { marginRight: "8px" }, iconName: option.data.icon, "aria-hidden": "true", title: option.data.icon })),
                React.createElement("span", null, option.Code_Agence + " - " + option.text)));
        };
        _this._onRenderOption5 = function (option) {
            return (React.createElement("div", null,
                option.data && option.data.icon && (React.createElement(Icon, { style: { marginRight: "8px" }, iconName: option.data.icon, "aria-hidden": "true", title: option.data.icon })),
                React.createElement("span", null, option.Code_Division + " - " + option.text)));
        };
        _this._onRenderOption6 = function (option) {
            return (React.createElement("div", null,
                option.data && option.data.icon && (React.createElement(Icon, { style: { marginRight: "8px" }, iconName: option.data.icon, "aria-hidden": "true", title: option.data.icon })),
                React.createElement("span", null, option.Code_Direction + " - " + option.text)));
        };
        _this._onRenderTitle = function (options) {
            var option = options[0];
            // this.props.filter("Résolu")
            return (React.createElement("div", null,
                option.data && option.data.icon && (React.createElement(Icon, { style: { marginRight: "8px" }, iconName: option.data.icon, "aria-hidden": "true", title: option.data.icon })),
                React.createElement("span", null, option.text)));
        };
        _this._onRenderTitle2 = function (options) {
            var option = options[0];
            // this.props.filter("Résolu")
            return (React.createElement("div", null,
                option.data && option.data.icon && (React.createElement(Icon, { style: { marginRight: "8px" }, iconName: option.data.icon, "aria-hidden": "true", title: option.data.icon })),
                React.createElement("span", null, option.text)));
        };
        _this._onRenderTitle3 = function (options) {
            var option = options[0];
            // this.props.filter("Résolu")
            return (React.createElement("div", null,
                React.createElement("span", null, option.text)));
        };
        _this._onRenderTitle4 = function (options) {
            var option = options[0];
            // this.props.filter("Résolu")
            return (React.createElement("div", null,
                React.createElement("span", null, option.text)));
        };
        _this._onRenderTitle5 = function (options) {
            var option = options[0];
            // this.props.filter("Résolu")
            return (React.createElement("div", null,
                React.createElement("span", null, option.text)));
        };
        _this._onRenderTitle6 = function (options) {
            var option = options[0];
            // this.props.filter("Résolu")
            return (React.createElement("div", null,
                React.createElement("span", null, option.text)));
        };
        _this._onRenderPlaceholder = function (props) {
            return (React.createElement("div", { className: "dropdownExample-placeholder" },
                React.createElement("span", null, props.placeHolder)));
        };
        _this._onRenderPlaceholder2 = function (props) {
            return (React.createElement("div", { className: "dropdownExample-placeholder" },
                React.createElement("span", null, props.placeHolder)));
        };
        _this._onRenderPlaceholder3 = function (props) {
            return (React.createElement("div", { className: "dropdownExample-placeholder" },
                React.createElement("span", null, props.placeHolder)));
        };
        _this._onRenderPlaceholder4 = function (props) {
            return (React.createElement("div", { className: "dropdownExample-placeholder" },
                React.createElement("span", null, props.placeHolder)));
        };
        _this._onRenderPlaceholder5 = function (props) {
            return (React.createElement("div", { className: "dropdownExample-placeholder" },
                React.createElement("span", null, props.placeHolder)));
        };
        _this._onRenderPlaceholder6 = function (props) {
            return (React.createElement("div", { className: "dropdownExample-placeholder" },
                React.createElement("span", null, props.placeHolder)));
        };
        _this._onRenderCaretDown = function (props) {
            return React.createElement(Icon, { iconName: "DuplicateRow" });
        };
        _this._onRenderCaretDown2 = function (props) {
            return React.createElement(Icon, { iconName: "DuplicateRow" });
        };
        _this._onRenderCaretDown3 = function (props) {
            return React.createElement(Icon, { iconName: "DuplicateRow" });
        };
        _this._onRenderCaretDown4 = function (props) {
            return React.createElement(Icon, { iconName: "DuplicateRow" });
        };
        _this._onRenderCaretDown5 = function (props) {
            return React.createElement(Icon, { iconName: "DuplicateRow" });
        };
        _this._onRenderCaretDown6 = function (props) {
            return React.createElement(Icon, { iconName: "DuplicateRow" });
        };
        _this._onChange_Category = function (event) {
            _this.setState({ selectedCategory: event.text });
            console.log(event);
        };
        _this._onChange_Incident = function (event) {
            _this.setState({ selectedIncident: event });
            console.log(event);
        };
        _this._onChange_Priority = function (event) {
            _this.setState({ selectedPriority: event });
            console.log(event);
        };
        _this._onChange_Agence = function (event) {
            console.log(event);
            _this.setState({ selectedAgence: event }, function () {
                return console.log(_this.state.selectedAgence);
            });
            _this.setState({ selectedDivisions: "" });
            _this.setState({ selectedDirections: "" });
        };
        _this._onChange_Division = function (event) {
            console.log(event);
            _this.setState({ selectedDivisions: event }, function () {
                return console.log(_this.state.selectedDivisions);
            });
            _this.setState({ selectedAgence: "" });
            _this.setState({ selectedDirections: "" });
        };
        _this._onChange_Direction = function (event) {
            console.log(event);
            _this.setState({ selectedDirections: event }, function () {
                return console.log(_this.state.selectedDirections);
            });
            _this.setState({ selectedAgence: "" });
            _this.setState({ selectedDivisions: "" });
        };
        _this.addComment = function (siteCollection, commentValue, selectedItemId, UserID) {
            _this.createComment(siteCollection, commentValue, selectedItemId, UserID);
        };
        _this._showToastrMessage = function (scope, textToShow) {
            toastr.options.hideDuration = 5000;
            switch (scope) {
                case "success":
                    toastr.success(textToShow);
                    break;
            }
        };
        _this.fileUploaded = _this.fileUploaded.bind(_this);
        SPComponentLoader.loadCss("https://support.bna.dz/SiteAssets/cdnjs.cloudflare.com_ajax_libs_toastr.js_latest_css_toastr.min.css");
        _this.selectTicketType = _this.selectTicketType.bind(_this);
        _this.state = {
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
        return _this;
    }
    Form.prototype.componentWillMount = function () { };
    Form.prototype.componentDidMount = function () {
        if (this.props.listID && this.props.siteCollection) {
            this.getCategories(this.props.siteCollection);
            this.getIncidents(this.props.siteCollection);
            this.getPriorities(this.props.siteCollection);
            this.getAgences(this.props.siteCollection);
            this.getDivisions(this.props.siteCollection);
            this.getDirections(this.props.siteCollection);
            this.getRequesterId(this.props.siteCollection, this.props.UserID);
        }
    };
    Form.prototype.componentDidUpdate = function (prevProps, prevState, prevContext) {
        var _this = this;
        if (this.state.selectedCategory != prevState.selectedCategory) {
            console.log(this.state.categories);
            this.setState({
                incidentsToDisplay: this.state.incidents.filter(function (item) { return item.category === _this.state.selectedCategory; }),
            });
        }
    };
    Form.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: styles.list },
            React.createElement("div", { style: { width: "50%" } },
                React.createElement(TextField, { label: "Intitulé du ticket*", value: this.state.title, onChanged: this._onChange2, errorMessage: this.state.isSubmitClicked && this.state.title === ""
                        ? "Champ obligatoire"
                        : null }),
                React.createElement("p", { style: { color: "red" } }),
                React.createElement("div", { style: { marginBottom: "10px", marginTop: "10px" } }),
                React.createElement(TextField, { label: "Description du ticket", value: this.state.description, onChanged: this._onChange1 }),
                React.createElement("div", { style: { marginBottom: "10px", marginTop: "10px" } }),
                React.createElement("div", null,
                    React.createElement("div", { style: { marginTop: "0px" } },
                        React.createElement(Dropdown, { onChanged: this._onChange_Category, placeHolder: "Choisir la catégorie ", label: "Catégorie du ticket*", ariaLabel: "Custom dropdown example", onRenderPlaceHolder: this._onRenderPlaceholder, onRenderTitle: this._onRenderTitle, onRenderOption: this._onRenderOption, onRenderCaretDown: this._onRenderCaretDown, style: { dropdown: { width: 300 } }, options: this.state.categories, errorMessage: this.state.isSubmitClicked &&
                                this.state.selectedCategory === ""
                                ? "Champ obligatoire"
                                : null }),
                        React.createElement("div", { style: { marginBottom: "10px", marginTop: "10px" } }),
                        React.createElement(Dropdown, { onChanged: this._onChange_Incident, placeHolder: "Sélectionnez un incident récurrent", label: "Incidents récurrents par catégorie ", ariaLabel: "Custom dropdown example", onRenderPlaceHolder: this._onRenderPlaceholder3, onRenderTitle: this._onRenderTitle3, onRenderOption: this._onRenderOption3, onRenderCaretDown: this._onRenderCaretDown3, style: { dropdown: { width: 300 } }, options: this.state.incidentsToDisplay }),
                        React.createElement("div", { style: { marginBottom: "10px", marginTop: "10px" } }),
                        React.createElement(Dropdown
                        //   onChanged={(e)=>this.props.filter("Résolu")}
                        , { 
                            //   onChanged={(e)=>this.props.filter("Résolu")}
                            onChanged: this._onChange_Priority, placeHolder: "Choisir la sévérité ", label: "Priorité du ticket*", ariaLabel: "Custom dropdown example", onRenderPlaceHolder: this._onRenderPlaceholder2, onRenderTitle: this._onRenderTitle2, onRenderOption: this._onRenderOption2, onRenderCaretDown: this._onRenderCaretDown2, style: { dropdown: { width: 300 } }, options: this.state.priorities, errorMessage: this.state.isSubmitClicked &&
                                this.state.selectedPriority === ""
                                ? "Champ obligatoire"
                                : null }),
                        React.createElement("div", { style: { marginBottom: "10px", marginTop: "10px" } })))),
            React.createElement("div", { style: { display: "flex", gap: "1em" } },
                React.createElement("div", { style: { width: "49%" } },
                    " ",
                    React.createElement(Label, null, "Cat\u00E9gorie \u00E9metteur*"),
                    React.createElement(TicketCategory, { ticketType: this.selectTicketType }),
                    this.state.isSubmitClicked &&
                        this.state.selectedAgence === "" &&
                        this.state.selectedDirections === "" &&
                        this.state.selectedDivisions === "" ? (React.createElement("span", { style: { color: "#a80000" } }, "*Veuillez s\u00E9lectionner une agence, une direction ou une division")) : null),
                React.createElement("div", { style: { width: "49%" } },
                    React.createElement("div", { style: {
                            display: "" + (this.state.ticketType === "Agence" ? "" : "none"),
                        } },
                        React.createElement(Dropdown, { onChanged: this._onChange_Agence, placeHolder: "Sélectionnez une agence", label: "Agence ", ariaLabel: "Custom dropdown example", onRenderPlaceHolder: this._onRenderPlaceholder4, onRenderTitle: this._onRenderTitle4, onRenderOption: this._onRenderOption4, onRenderCaretDown: this._onRenderCaretDown4, style: { dropdown: { width: 300 } }, options: this.state.agences })),
                    React.createElement("div", { style: {
                            display: "" + (this.state.ticketType === "Division" ? "" : "none"),
                        } },
                        React.createElement(Dropdown, { onChanged: this._onChange_Division, placeHolder: "Sélectionnez une division", label: "Division ", ariaLabel: "Custom dropdown example", onRenderPlaceHolder: this._onRenderPlaceholder5, onRenderTitle: this._onRenderTitle5, onRenderOption: this._onRenderOption5, onRenderCaretDown: this._onRenderCaretDown5, style: { dropdown: { width: 300 } }, options: this.state.divisions })),
                    React.createElement("div", { style: {
                            display: "" + (this.state.ticketType === "Direction" ? "" : "none"),
                        } },
                        React.createElement(Dropdown, { onChanged: this._onChange_Direction, placeHolder: "Sélectionnez une direction", label: "Direction ", ariaLabel: "Custom dropdown example", onRenderPlaceHolder: this._onRenderPlaceholder6, onRenderTitle: this._onRenderTitle6, onRenderOption: this._onRenderOption6, onRenderCaretDown: this._onRenderCaretDown6, style: { dropdown: { width: 300 } }, options: this.state.directions })))),
            React.createElement("div", { style: { marginBottom: "10px", marginTop: "10px" } }),
            React.createElement(DefaultButton, { text: "Soumettre le ticket", onClick: function () {
                    _this.setState({ isSubmitClicked: true });
                    if (_this.state.selectedCategory != "" &&
                        _this.state.selectedPriority != "" &&
                        _this.state.title != "") {
                        _this.setState({ isModal: true });
                    }
                }, 
                // disabled={
                //   (this.state.selectedAgence === "" &&
                //     this.state.selectedDirections === "" &&
                //     this.state.selectedDivisions === "") ||
                //   this.state.selectedCategory ||
                //   this.state.selectedPriority ||
                //   this.state.title
                // }
                primary: true }),
            React.createElement(Modal, { titleAriaId: "Test", subtitleAriaId: "Test", isOpen: this.state.isModal, 
                // onDismiss={() => this.setState({ isModal: false })}
                isBlocking: false, containerClassName: styles.modalContainer },
                React.createElement("div", { style: {
                        display: "flex",
                        flexDirection: "column",
                    } },
                    React.createElement("div", { style: { display: "grid", padding: "20px" } },
                        React.createElement(Label, { style: { fontSize: "large" } }, "Informations du ticket"),
                        React.createElement(Label, null,
                            "Intitul\u00E9 du ticket : ",
                            this.state.title,
                            " "),
                        React.createElement(Label, null,
                            "Description du ticket: ",
                            this.state.description,
                            " "),
                        React.createElement(Label, null,
                            "Cat\u00E9gorie du ticket: ",
                            this.state.selectedCategory),
                        React.createElement(Label, null,
                            "Priorit\u00E9 : ",
                            this.state.selectedPriority.text,
                            " "),
                        console.log(this.state.selectedAgence),
                        console.log(this.state.selectedDirections),
                        console.log(this.state.selectedDivisions),
                        this.state.selectedAgence != "" ? (React.createElement("div", null,
                            React.createElement(Label, null,
                                "Code de l'agence: ",
                                this.state.selectedAgence.Code_Agence),
                            React.createElement(Label, null,
                                "D\u00E9signation de l'agence:",
                                " ",
                                this.toTitleCase(this.state.selectedAgence.text)),
                            React.createElement(Label, null,
                                "Ticket trait\u00E9 par: ",
                                this.state.selectedAgence.TITLE_DRE))) : (""),
                        this.state.selectedDivisions != "" ? (React.createElement("div", null,
                            React.createElement(Label, null,
                                "Code de la division:",
                                " ",
                                this.state.selectedDivisions.Code_Division),
                            React.createElement(Label, null,
                                "D\u00E9signation de la division:",
                                " ",
                                this.toTitleCase(this.state.selectedDivisions.text)))) : (""),
                        this.state.selectedDirections != "" ? (React.createElement("div", null,
                            React.createElement(Label, null,
                                "Code de la direction:",
                                " ",
                                this.state.selectedDirections.Code_Direction),
                            React.createElement(Label, null,
                                "D\u00E9signation de la direction:",
                                " ",
                                this.toTitleCase(this.state.selectedDirections.text.trim())))) : (""),
                        React.createElement("div", { style: { display: "grid", padding: "20px" } },
                            this.state.submitted === false ? (React.createElement("div", null,
                                React.createElement(DefaultButton, { onClick: function () {
                                        _this.addTicket(_this.props.siteCollection, _this.props.listID, _this.props.UserID);
                                        _this.setState({ isModal: true });
                                    }, text: "Confirmer", primary: true }),
                                React.createElement(DefaultButton, { onClick: function () { return _this.setState({ isModal: false }); }, text: "Annuler" }))) : null,
                            (this.state.submitted &&
                                this.state.attachementUploaded === false) && (React.createElement(FileUploader, { ticketID: this.state.lastCreatedTicketId, fileUploaded: this.fileUploaded })),
                            (this.state.submitted &&
                                this.state.attachementUploaded === true) &&
                                React.createElement(DefaultButton, { onClick: function () {
                                        _this.setState({ isModal: false });
                                        _this.setState({ submitted: false });
                                        _this.setState({ attachementUploaded: false });
                                    }, text: "Terminer" })),
                        React.createElement("div", { style: { display: "flex", flexDirection: "column" } }))))));
    };
    Form.prototype.getCategories = function (siteCollection) {
        var _this = this;
        SharepointService.getCategories(siteCollection).then(function (result) {
            var array = [];
            result.value[0].Choices.map(function (item) {
                return array.push({ key: item, description: item, text: item });
            });
            _this.setState({ categories: array }, function () {
                return console.log(_this.state.categories);
            });
        });
    };
    Form.prototype.getPriorities = function (siteCollection) {
        var _this = this;
        SharepointService.getPriorities(siteCollection).then(function (result) {
            var array = [];
            result.value[0].Choices.map(function (item) {
                return array.push({ key: item, description: item, text: item });
            });
            _this.setState({ priorities: array }, function () {
                return console.log(_this.state.priorities);
            });
        });
    };
    Form.prototype.getIncidents = function (siteCollection) {
        var _this = this;
        SharepointService.getIncidents(siteCollection).then(function (result) {
            console.log(result.value);
            var array = [];
            result.value.map(function (item) {
                return array.push({
                    key: item.Id,
                    description: item.Title,
                    category: item.Cat_x00e9_gorie_x0020_incident,
                    text: item.Title,
                    incidentId: item.ID,
                });
            });
            _this.setState({ incidents: array }), console.log(_this.state.incidents);
            _this.setState({ incidentsToDisplay: _this.state.incidents });
        });
    };
    Form.prototype.getAgences = function (siteCollection) {
        var _this = this;
        SharepointService.getAgences(siteCollection).then(function (result) {
            console.log(result);
            var array = [];
            result.value.map(function (item) {
                return array.push({
                    key: item.Id,
                    description: item.Title,
                    ID_DRE: item.DRE_x0020_de_x0020_l_x0027_agencId,
                    TITLE_DRE: item.DRE_x0020_de_x0020_l_x0027_agenc.Title,
                    text: item.Title,
                    Code_Agence: item.Code_x0020_Agence,
                });
            });
            _this.setState({ agences: array }, function () { return console.log(_this.state.agences); });
        });
    };
    Form.prototype.getDivisions = function (siteCollection) {
        var _this = this;
        SharepointService.getDivisions(siteCollection).then(function (result) {
            console.log(result);
            var array = [];
            result.value.map(function (item) {
                return array.push({
                    key: item.Id,
                    description: item.Title,
                    ID_DRE: item.DRE_x0020_de_x0020_l_x0027_agencId,
                    TITLE_Division: item.Title,
                    text: item.Title,
                    Code_Division: item.Code_x0020_Division,
                });
            });
            _this.setState({ divisions: array }, function () {
                return console.log(_this.state.agences);
            });
        });
    };
    Form.prototype.getDirections = function (siteCollection) {
        var _this = this;
        SharepointService.getDirections(siteCollection).then(function (result) {
            var array = [];
            console.log(result);
            result.value.map(function (item) {
                return array.push({
                    key: item.Id,
                    description: item.Title,
                    Code_Division: item.Code_x0020_de_x0020_la_x0020_divId,
                    TITLE_Division: item.Code_x0020_de_x0020_la_x0020_div.Title,
                    text: item.Title,
                    Code_Direction: item.Code_x0020_de_x0020_la_x0020_dir,
                });
            });
            _this.setState({ directions: array }, function () {
                return console.log(_this.state.directions);
            });
        });
    };
    Form.prototype.selectTicketType = function (type) {
        var _this = this;
        console.log(type);
        this.setState({ ticketType: type }, function () {
            return console.log(_this.state.ticketType);
        });
    };
    Form.prototype.toTitleCase = function (str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
    Form.prototype.addTicket = function (siteCollection, listID, userId) {
        var _this = this;
        SharepointService.AddTicket(siteCollection, listID, {
            Title: this.state.title,
            StatusId: 1,
            Cat_x00e9_gorie_x0020__x00e9_met: this.state.ticketType,
            RequesterId: this.state.requesterUserId,
            Priority: this.state.selectedPriority.text,
            Category: this.state.selectedCategory.text,
            D_x00e9_signation_x0020_DREId: this.state.selectedAgence != ""
                ? this.state.selectedAgence.ID_DRE
                : null,
            Code_x0020_AgenceId: this.state.selectedAgence != ""
                ? this.state.selectedAgence.Code_Agence
                : null,
            Code_x0020_directionId: this.state.selectedDirections != ""
                ? this.state.selectedDirections.Code_Direction
                : null,
            Code_x0020_divisionId: this.state.selectedDivisions != ""
                ? this.state.selectedDivisions.Code_Division
                : null,
            Incident_x0020_r_x00e9_curents_xId: this.state.selectedIncident
                ? this.state.selectedIncident.incidentId
                : null,
        })
            .then(function (response) { return response.json(); })
            .then(function (response) {
            _this.addComment(_this.props.siteCollection, _this.state.description, response.ID, _this.props.requesterUserId);
            _this.setState({ lastCreatedTicketId: response.ID });
        })
            .then(function () { return _this._showToastrMessage("success", "Ticket crée avec succès"); })
            .then(function () { return _this.setState({ submitted: true }); });
    };
    Form.prototype.createComment = function (siteCollection, commentBody, ticketId, userID) {
        SharepointService.AddComment(siteCollection, "1fabe50c-f6ab-48df-9337-a9dbe261cd0e", {
            Title: null,
            Body: commentBody,
            TicketId: parseInt(ticketId),
            CommentType: "Reply",
            FromId: parseInt(userID),
        });
    };
    Form.prototype.getRequesterId = function (siteCollection, userId) {
        var _this = this;
        SharepointService.getUserContactId(siteCollection, userId).then(
        // result => this.setState({requesterUserId : result.value.Id}), ()=> console.log("requester id " + this.state.requesterUserId)
        function (result) {
            if (result.value[0]) {
                _this.setState({ requesterUserId: result.value[0].Id }, function () {
                    return console.log(_this.state.requesterUserId);
                });
            }
        });
    };
    Form.prototype.fileUploaded = function () {
        this.setState({ attachementUploaded: true });
    };
    return Form;
}(React.Component));
export default Form;

//# sourceMappingURL=Form.js.map
