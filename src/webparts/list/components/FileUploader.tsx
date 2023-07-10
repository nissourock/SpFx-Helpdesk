import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import SharepointService from '../../../sharepoint/SharepointServiceManager';
import { ActivityItem,IActivityItemProps } from "office-ui-fabric-react/lib-es2015/components/ActivityItem";

import styles from './ToastrSample.module.scss';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as toastr from 'toastr';
import {  css, classNamesFunction, Icon, IStyle } from 'office-ui-fabric-react';

import { Label } from "office-ui-fabric-react/lib/Label";
type IActivityItemExampleStyleProps = {};

interface IActivityItemExampleStyles {
  exampleRoot?: IStyle;
  nameText?: IStyle;
}

const exampleStyles: IActivityItemExampleStyles = {
  exampleRoot: {
    marginTop: '20px'
  },
  nameText: {
    fontWeight: 'bold'
  }
};

const getClassNames = classNamesFunction<IActivityItemExampleStyleProps, IActivityItemExampleStyles>();

initializeIcons();

class FileUploader extends React.Component<{ticketID: any, fileUploaded: ()=> void},{}> {
  fileInput: any;
  
  constructor(props) {
    super(props);
    SPComponentLoader.loadCss('https://support.bna.dz/SiteAssets/cdnjs.cloudflare.com_ajax_libs_toastr.js_latest_css_toastr.min.css');
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload(ticketID) {
    const file = this.fileInput.files[0];
    // Perform additional actions with the uploaded file
    SharepointService.post("https://support.bna.dz",`/_api/web/lists/getByTitle('Tickets')/items(${ticketID})/AttachmentFiles/add(FileName='${file.name}')`, file ).then(()=> this._showToastrMessage("success", "Pièce jointe ajoutée au ticket")).then(()=> this.props.fileUploaded())
    console.log(file);
  }
  public _showToastrMessage = (scope: string, textToShow) => {
    toastr.options.hideDuration = 5000;
    switch (scope) {
        case "success":
            toastr.success(textToShow);
            break;
       
          
    }
}

  render() {
    const activityItemExamples: Partial<IActivityItemProps & React.ClassAttributes<{}>>[] = [
        
       
        
         
        {
          key: 3,
          activityDescription: [
            <span key={1} >
              Sabrina De Luca
            </span>,
            <span key={2}> added this file</span>
          ],
          activityIcon: <Icon iconName={'Add'} />,
          isCompact: true
        },
        {
          key: 4,
          activityDescription: [
            <span key={1} >
              Chuan Rojumanong
            </span>,
            <span key={2}> shared this file</span>
          ],
          activityIcon: <Icon iconName={'Share'} />,
          isCompact: true
        }
      ];
  
      const activityExampleList: Array<JSX.Element> = [];
      activityItemExamples.forEach((item: { key: string | number }) => {
        const props = item;
        activityExampleList.push(<ActivityItem {...props as IActivityItemProps} key={item.key}  />);
      });
    return (
      <div>
        <input
          type="file"
          ref={(input) => { this.fileInput = input; }}
          style={{ display: 'none' }}
            onChange={()=>this.handleFileUpload(this.props.ticketID)}
        />
        <div style={{display: "flex", flexDirection:"column", gap:"10px"}}>
            <Label>Pièces jointes</Label>
            Vous pouvez ajouter des pièces jointes (captures d'écran, fichier pdf...etc)
            <PrimaryButton
              text="Téléverser un fichier "
              onClick={() => this.fileInput.click()}
              style={{width: "25%"}}
            />
        </div>
      </div>
    );
  }
}

export default FileUploader;