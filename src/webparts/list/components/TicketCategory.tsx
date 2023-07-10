import * as React from "react";
import './TicketCategory.scss';





export class TicketCategory extends React.Component<{ticketType: (type:string)=> void},{isChecked: {agence: boolean, division: boolean, direction: boolean}}> {
  ;
  constructor(props) {
    super(props);
  
    this.state = {
  isChecked: {agence: false, division: false, direction: false}
    };
  }
  public render(): JSX.Element {
    return (
        <div className="checkbox-group">
       
        <div className="checkbox" onClick={()=>{this.setState({isChecked: {agence:true, division:false, direction:false}})
        this.props.ticketType("Agence")}
    }>
            <label className="checkbox-wrapper">
                <div  className={`checkbox-input ${this.state.isChecked.agence ? "checked" : ""}`}  />
                <span className="checkbox-tile">
                    <span className="checkbox-icon">
                       Agence
                    </span>
                    <span className="checkbox-label"></span>
                </span>
            </label>
        </div>
        <div className="checkbox "onClick={()=>{this.setState({isChecked: {agence:false, division:false, direction:true}})
     this.props.ticketType("Direction")}}>
            <label className="checkbox-wrapper">
                <div  className={`checkbox-input ${this.state.isChecked.direction ? "checked" : ""}`}   />
                <span className="checkbox-tile">
                    <span className="checkbox-icon">
                        Direction
                    </span>
                    <span className="checkbox-label"></span>
                </span>
            </label>
        </div>
        <div className="checkbox" onClick={()=>{this.setState({isChecked: {agence:false, division:true, direction:false}})
    this.props.ticketType('Division')}}>
            <label className="checkbox-wrapper">
            <div  className={`checkbox-input ${this.state.isChecked.division ? "checked" : ""}`}   />
                <span className="checkbox-tile">
                    <span className="checkbox-icon">
                        Division
                    </span>
                    <span className="checkbox-label"></span>
                </span>
            </label>
        </div>
   
       
    </div>
    );
  }

}