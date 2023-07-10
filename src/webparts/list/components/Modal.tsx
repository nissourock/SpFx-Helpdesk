import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { FormEventHandler } from 'react';
interface IState {

}
export class Modal extends  React.Component<
{},{}>  
{
    filter: any;
    constructor(props) {
        super(props);
    
        this.state = {
          empty:"",
          selected:[1]
        };
      }
  public render(): JSX.Element {
    return (
      <div>
      </div>
    );
  }

}






















