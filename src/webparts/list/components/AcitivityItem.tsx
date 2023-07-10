import * as React from "react";
import {
  css,
  classNamesFunction,
  Icon,
  IStyle,
  Link,
} from "office-ui-fabric-react";
import { ActivityItem } from "office-ui-fabric-react/lib-es2015/components/ActivityItem";
import styles from "./ActivityItem.module.scss";
import SharepointService from "../../../sharepoint/SharepointServiceManager";

type IActivityItemExampleStyleProps = {};
interface IActivityItemExampleStyles {
  exampleRoot?: IStyle;
  nameText?: IStyle;
}

const exampleStyles: IActivityItemExampleStyles = {
  exampleRoot: {
    marginTop: "20px",
  },
  nameText: {
    fontWeight: "bold",
  },
};

export class ActivityItemBasicExample extends React.Component<
  { comments: any; siteCollection: any, userID: any, deleteComment : any },
  { comments: any; commentsLoading: boolean; userDetails: any }
> {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      commentsLoading: true,
      userDetails: [],
    };
  }
  public comments = [];
  public render(): JSX.Element {
    // tslint:disable:jsx-no-lambda

    const activityItemExamples = [
      {
        key: 1,

        activityDescription: [
          <Link
            key={1}
            className={styles.nameText}
            onClick={() => {
              alert("A name was clicked.");
            }}
          >
            Philippe Lampros
          </Link>,
          <span key={2}> a commenté</span>,
        ],
        activityIcon: <Icon iconName={"Message"} />,
        comments: [
          <span key={1}>Hello! I am making a comment and mentioning </span>,
        ],
        timeStamp: "Just now",
      },
    ];

    const activityExampleList: Array<JSX.Element> = [];
    this.state.comments.forEach((item: any) => {
      const props = item;
      activityExampleList.push(
        <div style={{display:"flex", flexDirection:"row"}}>
          <ActivityItem
            {...props}
            key={item.key}
            className={styles.exampleRoot}
          />
           {(item.CreatorID == this.props.userID)?
            <Icon onClick={
             ()=> this.props.deleteComment(this.props.siteCollection, item.itemID)
              
            } iconName="Delete" style={{marginLeft: "2px"}}></Icon> : ""
              }
         
        </div>
      )
      console.log(this.props.userID)
      if(item.CreatorID == this.props.userID){} ;
      <Icon iconName="Delete" style={{marginLeft: "2px"}}></Icon>
      console.log(item.CreatorID)
    });

    return <div>{activityExampleList}</div>;
  }
  public componentDidMount(): void {
    console.log(this.props.comments);
    this.props.comments.map((item) =>
      this.comments.push({
        key: item.Created,
        CreatorID: item.Author.ID,
        itemID: item.Id,
        activityDescription: [
          <Link key={1} className={styles.nameText} onClick={() => {}}>
            {item.Author.Title}
          </Link>,
          <span key={2}> a commenté</span>,
         
        ],
        activityIcon: <Icon iconName={"Message"} />,
        comments: [
          <span key={1} dangerouslySetInnerHTML={{ __html: item.Body }}></span>,
        ],
        timeStamp: new Date(item.Created).toLocaleDateString("fr-fr", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),

      })
    );
    this.setState({ comments: this.comments }, () =>
      console.log(this.state.comments)
    );
    console.log(this.props.comments);
  }
  public componentDidUpdate(previousProps: any, previousState) {
    if (previousProps.comments !== this.props.comments) {
    }
  }
  
}
