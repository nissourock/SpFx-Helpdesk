import * as React from "react";
import {
  Dropdown,
  IDropdown,
  DropdownMenuItemType,
  IDropdownOption,
} from "office-ui-fabric-react/lib/Dropdown";
import styles from "./List.module.scss";
import { IListProps } from "./IListProps";
import { escape } from "@microsoft/sp-lodash-subset";
import SharepointService from "../../../sharepoint/SharepointServiceManager";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { DetailsListDocumentsExample } from "./List2";
import { Label } from "office-ui-fabric-react/lib/Label";
import { Icon } from "office-ui-fabric-react/lib/Icon";
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
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import {Link} from "office-ui-fabric-react"
import { DetailsListDocumentsExamplePaginated } from "./List3";
import Form from "./Form";

export default class List extends React.Component<
  IListProps,
  {
    perPage: number;
    offset: number;
    listItems: any[];
    searchQuery: string;
    departement: string | number;
    filter: string;
    selectedPage: number;
    listItemstoShow: any[];
    paginatedItems: any[];
    totalPages: number;
    requesterUserId: number | undefined
  }
> {
  constructor(props: IListProps) {
    super(props);
    this.filter = this.filter.bind(this);
    this.itemsToShow = this.itemsToShow.bind(this);
    this.state = {
      listItems: [],
      listItemstoShow: [],
      searchQuery: "",
      departement: "",
      filter: "initial",
      selectedPage: 1,
      paginatedItems: [],
      totalPages: 1,
      perPage: 10,
      offset: 0,
      requesterUserId: undefined
    };
  }
  public items = [];

  public lastIndex = 3;
  public firstIndex = 0;

  public resetFilter() {
    this.setupListItems(
      this.props.siteCollection,
      this.props.listID,
      this.props.UserID
    );
  }
  public filter(filterValue: string) {
    if (filterValue === "Résolu") {
      this.setState({
        listItems: this.items.filter((item) => item.status === "Solved"),
      });
      this.setState({filter: "Résolu"})
    }
    if (filterValue === "Initial") {
      this.setState({ listItems: this.items });
      this.setState({ filter: "initial" });

    }

    if (filterValue === "Nouveau") {
      this.setState({
        listItems: this.items.filter((item) => item.status === "New"),
      });
      this.setState({filter: "Nouveau"})
    }
    if (filterValue === "In progress") {
      this.setState({
        listItems: this.items.filter((item) => item.status === "In progress"),
      });
      this.setState({filter: "In progress"})
    }

    if (filterValue === "Gelé") {
      this.setState({
        listItems: this.items.filter((item) => item.status === "Gelé"),
      });
      this.setState({filter: "Gelé"})
    }
    if (filterValue === "Support externe") {
      this.setState({
        listItems: this.items.filter(
          (item) => item.status === "Support externe"
        ),
      });
      this.setState({filter: "Support externe"})
    }
  }
  public itemsToShow(nb: number) {
    this.setState({ perPage: nb }, () => console.log(this.state.perPage));
  }
  setupPages() {
    this.setState(
      { offset: this.state.selectedPage * this.state.perPage },
      () => console.log("offset", this.state.offset)
    );
    // this.firstIndex = this.lastIndex - this.state.totalPages;
  }

  setupListItems(siteCollection: string, listID: string, userId: string) {
    this.items = [];
    SharepointService.getListItems(siteCollection, listID, userId)
      .then((result) => {
        console.log(result.value);
        if (result.value) {
          result.value.map((item) => {
            if (item.AssignedTo) {
              this.items.push({
                id: item.Id,
                name: item.Title,
                category: item.Category,
                status: item.Status.InternalName,
                priority: item.Priority,
                created: item.Created,
                modified: item.Modified,
                dateModifiedValue: new Date(item.Created.valueOf()),
                assignedTo: item.AssignedTo,
              });
            } else if (!item.AssignedTo) {
              this.items.push({
                id: item.Id,
                name: item.Title,
                category: item.Category,
                status: item.Status.InternalName,
                priority: item.Priority,
                created: item.Created,
                modified: item.Modified,
                dateModifiedValue: new Date(item.Created.valueOf()),
              });
            }
          });
        }

        console.log(this.items);
        this.setState({ listItems: this.items }, () =>
          console.log(this.state.listItems)
        );
        
      })
      .catch((err) => this.setState({ listItems: [] }));
  }
  getRequesterId(siteCollection: string, userId: string){
    SharepointService.getUserContactId(siteCollection, userId).then(
      // result => this.setState({requesterUserId : result.value.Id}), ()=> console.log("requester id " + this.state.requesterUserId)
     
      result=> { if(result.value[0]){
        this.setState({requesterUserId:result.value[0].Id }, ()=> console.log(this.state.requesterUserId))
      }}
      )
  }
  addTicket(siteCollection: string, listID: string, userId: string){
    SharepointService.AddTicket(siteCollection, listID, {
      Title: "New Added Ticket",
      StatusId: 1,
      Cat_x00e9_gorie_x0020__x00e9_met: "Agence",
      RequesterId:1,
      Priority: "Critique"
      
      

      
    })
  }
  componentWillMount(): void {
    if (this.props.listID && this.props.siteCollection) {
    }
  }
  componentDidMount(): void {

    if (this.props.listID && this.props.siteCollection) {
      this.getRequesterId(this.props.siteCollection, this.props.UserID)
      console.log(this.props.listID);
      this.setState({filter: "initial"}, ()=> console.log(this.state.filter))
      this.setupListItems(
        this.props.siteCollection,
        this.props.listID,
        this.props.UserID
      );
      // this.setState({listItemstoShow: this.items})
      // this.setState(
      //   {
      //     paginatedItems: this.state.listItems.slice(
      //       0,
      //        this.state.perPage - 1
      //     ),
      //   },
      //   () => console.log(this.state.paginatedItems)
      // );
      // this.setupPages()
    }
    console.log(this.props.context);
  }

  componentDidUpdate(
    prevProps: Readonly<IListProps>,
    prevState: Readonly<{
      listItems: any[];
      searchQuery: string;
      departement: string | number;
      filter: string;
      selectedPage: number;
      listItemstoShow: any[];
      perPage: number;
    }>,
    prevContext: any
  ): void {
    if (prevState.listItems !== this.state.listItems) {
      if(this.state.filter === "initial"){
      this.setState({ selectedPage: 1 });
      this.setState({ offset: 0 });}

      if (this.state.listItems.length > 0) {
        this.setState(
          {
            totalPages: Math.ceil(
              this.state.listItems.length / this.state.perPage
            ),
          },
          () => console.log("total pages", this.state.totalPages)
        );
      } else {
        this.setState({ totalPages: 1 }, () =>
          console.log("total pages", this.state.totalPages)
        );
      }

      
      const newArr = this.state.listItems.slice(
        0
        , this.state.perPage
      );
      // this.state.listItems.map((item,index)=> { if((index >= this.state.offset )&&(index <= this.state.offset + this.state.perPage)){newArr.push(item)}})
      const filteredArray = this.state.listItems.filter(function (x) {
        return newArr.indexOf(x) < 0;
      });

      this.setState({ paginatedItems: [...this.state.listItems.slice(
        0
        , this.state.perPage
      )] }, () =>
        console.log(this.state.paginatedItems)
      );
   
     
    }
    if (prevState.selectedPage !== this.state.selectedPage) {
      console.log(this.state.selectedPage)
      this.setState(
        { offset: (this.state.selectedPage - 1) * this.state.perPage },
        () => console.log("offset", this.state.offset)
      );
      console.log(this.state.perPage);
      // this.setState({totalPages: Math.ceil(this.state.listItems.length / 3)},()=> console.log(this.state.paginatedItems))
      
   
      const newArr = this.state.listItems.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      // this.state.listItems.map((item,index)=> { if((index >= this.state.offset )&&(index <= this.state.offset + this.state.perPage)){newArr.push(item)}})
      const filteredArray = this.state.listItems.filter(function (x) {
        return newArr.indexOf(x) < 0;
      });

      this.setState({ paginatedItems: this.items.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      ) }, () =>
        console.log(this.state.paginatedItems)
      );
    }
   
  }

  public render(): React.ReactElement<IListProps> {
    const { listID } = this.props;
    const ddProps = {
      filter: this.filter,
    };
    return (
      <div className={styles.list}>
        
     {this.state.requesterUserId ?  "" :  <MessageBar messageBarType={MessageBarType.warning} isMultiline={false}  dismissButtonAriaLabel="Close">
       Afin de pouvoir créer un ticket, contactez votre administrateur pour vous donner l'accès à l'application.
        
      </MessageBar>}
        {/* <button onClick={()=>this.addTicket(this.props.siteCollection, this.props.listID, this.props.UserID)}>  Add item </button> */}
        <Pivot linkSize={PivotLinkSize.large}>
          <PivotItem
            linkText="Mes tickets"
            itemCount={this.state.listItems.length}
            itemIcon="Home"
            
            
          >
           
            <div
              style={{
                margin: "20px",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <div style={{ width: "100%" }}>
                <DropdownCustomExample filter={this.filter} />
              </div>
              {/* <div style={{ width: "35%" }}>
                <Elements itemsToShow={this.itemsToShow} />
              </div> */}
            </div>
                {(this.state.filter === "initial")? <div> <DetailsListDocumentsExamplePaginated
              
              listID={this.props.listID}
              siteCollection={this.props.siteCollection}
              userId={this.props.UserID}
              context={this.props.context}
                        />
                        {/* <Pagination
              currentPage={this.state.selectedPage}
              totalPages={this.state.totalPages}
              onChange={(page) => {
                this.setState({ selectedPage: page }, ()=>console.log(this.state.selectedPage));
              }}
                        /> */}
            </div>:  <DetailsListDocumentsExample
              key={this.state.listItems as any}
              items={this.state.listItems}
              listID={this.props.listID}
              siteCollection={this.props.siteCollection}
              userId={this.props.UserID}
              context={this.props.context}
            />  
             }
           
          </PivotItem>
          {this.state.requesterUserId? (<PivotItem linkText="Créer un ticket" itemIcon="Ticket">
            <Label><Form listID={this.props.listID} siteCollection={this.props.siteCollection} UserID={this.props.UserID} context={this.props.context} /></Label>
          </PivotItem>) : ""}
          <PivotItem linkText="Reporting"
            itemIcon="CRMReport"
            onClick={()=>   window.open("https://support.bna.dz/sites/reporting/SitePages/Helpdesk%20Reporting.aspx", '_blank', 'noopener,noreferrer')}
            >
              
              <div dangerouslySetInnerHTML={ {__html :`​​​​​​​​​<iframe width="1920" height="1080" src="https://scpbir/Reports/powerbi/BNA_BI_Incidents/BNA_BI_V0.1/BNA_BI?rs:embed=true" frameborder="0" allowfullscreen="true"></iframe>​`}} />
            </PivotItem>
        </Pivot>
        {/* <SearchBox 
          placeholder="Search"
          onEscape={(ev) => {
            console.log("Custom onEscape Called");
          }}
          onClear={(ev) => {
            console.log("Custom onClear Called");
          }}
          onChange={(newValue) => this.setState({ searchQuery: newValue })}
          onSearch={(newValue) => this.setState({ searchQuery: newValue })}
        />
        <Dropdown
          placeHolder="Select an Option"
          label="Basic uncontrolled example:"
          id="Basicdrop1"
          ariaLabel="Basic dropdown example"
          options={[
            {
              key: "Header",
              text: "Filter by Departement",
              itemType: DropdownMenuItemType.Header,
            },
            { key: "RH", text: "RH" },
            { key: "RND", text: "Recherche et développement" },
            { key: "INF", text: "informatique" },
          ]}
          onChanged={(item) => {
            this.setState({ departement: item.key });
          }}
        />
        <h1>{listID}</h1>
        <ul>
          {this.state.listItems.length &&
            this.state.listItems
              .filter((item) => {
                if (this.state.searchQuery.toLowerCase() === "") return item;
                else if (
                  item.Title.toLowerCase().indexOf(
                    this.state.searchQuery.toLowerCase()
                  ) > -1 ||
                  item.Created.toLowerCase().indexOf(
                    this.state.searchQuery.toLowerCase()
                  ) > -1
                )
                  return item;
              })
              .filter((item) => {
                if (!this.state.departement) return item;
                else if (
                  item.Departement.toLowerCase().indexOf(
                    this.state.departement.toString().toLowerCase()
                  ) > -1
                )
                  return item;
              })
              .map((item, index) => (
                <li key={index}>
                  <h3>{item.Title}</h3>
                  <p>{new Date(item.Created).toDateString()}</p>
                  <p>{item.Departement}</p>
                </li>
              ))}
        </ul> */}
      </div>
    );
  }
  private _customRenderer(
    link: IPivotItemProps,
    defaultRenderer: (link: IPivotItemProps) => JSX.Element
  ): JSX.Element {
    return (
      <span>
        {defaultRenderer(link)}
        <Icon iconName="Airplane" style={{ color: "red" }} />
      </span>
    );
  }
}
