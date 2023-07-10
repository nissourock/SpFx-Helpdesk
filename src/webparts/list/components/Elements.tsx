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
export class Elements extends React.Component<
  { itemsToShow: (param: number) => void },
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
          placeHolder="Nombre de tickets à afficher"
          label=""
          ariaLabel="Custom dropdown example"
          onRenderPlaceHolder={this._onRenderPlaceholder}
          onRenderTitle={this._onRenderTitle}
          onRenderOption={this._onRenderOption}
          onRenderCaretDown={this._onRenderCaretDown}
          style={{ dropdown: { width: 300 } }}
          options={[
            { key: "5", text: "5" },
            { key: "10", text: "10" },
            { key: "20", text: "20" },
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
          iconName={"NumberedLIst"}
          aria-hidden="true"
        />
        <span>{props.placeHolder}</span>
      </div>
    );
  };

  private _onRenderCaretDown = (props: IDropdownProps): JSX.Element => {
    return <Icon iconName="" />;
  };
  private _onChange = (event: IDropdownOption): void => {
    this.props.itemsToShow(parseInt(event.key.toString()));

    console.log(event);
  };
}
