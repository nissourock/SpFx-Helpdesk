import * as React from "react";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
  IDropdownProps,
} from "office-ui-fabric-react/lib/Dropdown";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { FormEventHandler } from "react";
interface IState {}
type NewOptions<IDropdownOption> = IDropdownOption & { filterValue: string };
export class DropdownCustomExample extends React.Component<
  { filter: (param: string) => void },
  { selected: any; empty: any }
> {
  filter: any;
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this.state = {
      empty: "",
      selected: [1],
    };
  }
  public render(): JSX.Element {
    return (
      <div>
        <Dropdown
          //   onChanged={(e)=>this.props.filter("Résolu")}
          onChanged={this._onChange as any}
          placeHolder="Filtrer les tickets"
          label=""
          ariaLabel="Custom dropdown example"
          onRenderPlaceHolder={this._onRenderPlaceholder}
          onRenderTitle={this._onRenderTitle}
          onRenderOption={this._onRenderOption}
          onRenderCaretDown={this._onRenderCaretDown}
          style={{ dropdown: { width: 300 } }}
          options={[
            {
              key: "X",
              text: "Tous mes tickets",
              data: { icon: "Memo" },
              filterValue: "Initial",
            },
            {
              key: "Header",
              text: "Par statut",
              itemType: DropdownMenuItemType.Header,
            },
            {
              key: "A",
              text: "Mes nouveaux tickets",
              data: { icon: "Memo" },
              filterValue: "New",
            },

            {
              key: "D",
              text: "Mes tickets actifs",
              data: { icon: "Train" },
              filterValue: "In progress",
            },
            {
              key: "E",
              text: "Mes tickets résolus",
              data: { icon: "Repair" },
              filterValue: "Solved",
            },
            {
              key: "F",
              text: "Mes tickets gelés",
              data: { icon: "Repair" },
              filterValue: "Gelé",
            },
            {
              key: "G",
              text: "Mes tickets support externe",
              data: { icon: "Repair" },
              filterValue: "Support externe",
            },
            {
              key: "divider_2",
              text: "-",
              itemType: DropdownMenuItemType.Divider,
            },
           
          ]}
        />
      </div>
    );
  }

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

  private _onRenderPlaceholder = (props: IDropdownProps): JSX.Element => {
    return (
      <div className="dropdownExample-placeholder">
        <Icon
          style={{ marginRight: "8px" }}
          iconName={"Filter"}
          aria-hidden="true"
        />
        <span>{props.placeHolder}</span>
      </div>
    );
  };

  private _onRenderCaretDown = (props: IDropdownProps): JSX.Element => {
    return <Icon iconName="CirclePlus" />;
  };
  private _onChange = (event: IDropdownOption): void => {
    if (event.filterValue === "Solved") {
      this.props.filter("Résolu");
    } else if (event.filterValue === "Initial") {
      this.props.filter("Initial");
    } else if (event.filterValue === "New") {
      this.props.filter("Nouveau");
    } else if (event.filterValue === "In progress") {
      this.props.filter("In progress");
    } else if (event.filterValue === "Support externe") {
      this.props.filter("Support externe");
    } else if (event.filterValue === "Gelé") {
      this.props.filter("Gelé");
    }

    console.log(event.filterValue);
  };
}
