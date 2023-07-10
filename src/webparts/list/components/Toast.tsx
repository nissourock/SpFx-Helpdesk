import * as React from 'react';
import styles from './ToastrSample.module.scss';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as toastr from 'toastr';
 
export default class ToastrSample extends React.Component<{description: string, type: "success" | "warning" }, {}> {
 
    constructor(props) {
        super(props);
        SPComponentLoader.loadCss('https://support.bna.dz/SiteAssets/cdnjs.cloudflare.com_ajax_libs_toastr.js_latest_css_toastr.min.css');
    }
 
    public _showToastrMessage = (scope: string, textToShow) => {
        toastr.options.hideDuration = 5000;
        switch (scope) {
            case "success":
                toastr.success(textToShow);
                break;
           
              
        }
    }
    componentDidMount(): void {
        this._showToastrMessage(this.props.type, this.props.description)
    }
 
    public render(): React.ReactElement<{}> {
        return (
            <div className={styles.toastrSample}>
               
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            
                     
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}