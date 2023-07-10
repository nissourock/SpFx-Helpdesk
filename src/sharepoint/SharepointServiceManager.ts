import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from "@microsoft/sp-http";

export class SharepointServiceManager {
  context: WebPartContext;

  public setup(context: WebPartContext) {
    this.context = context;
  }

  public get(siteCollection: string, relativeURL: string): Promise<any> {
    return this.context.spHttpClient
      .get(siteCollection + relativeURL, SPHttpClient.configurations.v1)
      .then((result) => result.json());
  }

  public getLists(siteCollection: string): Promise<any> {
    return this.get(siteCollection, "/_api/Web/Lists?&$select=Title,ID");
  }

  public getListItems(
    siteCollection: string,
    listID: string,
    userId: string
  ): Promise<any> {
    return this.get(
      siteCollection,
      `/_api/Web/Lists/getbyid('${listID}')/items?$select=*,Status/InternalName,AssignedTo/Name,AssignedTo/Title&$expand=Status,AssignedTo&$filter=RequesterSPUserStringId%20eq%20${userId}`
    );
  }
  public getCategories(siteCollection: string): Promise<any> {
    return this.get(
      siteCollection,
      `/_api/Web/Lists/getbytitle('Tickets')/fields?$filter=EntityPropertyName%20eq%20%27Category%27`
    );
  }
  public getPriorities(siteCollection: string): Promise<any> {
    return this.get(
      siteCollection,
      `/_api/Web/Lists/getbytitle('Tickets')/fields?$filter=EntityPropertyName%20eq%20%27Priority%27`
    );
  }
  public getIncidents(siteCollection: string): Promise<any> {
    return this.get(
      siteCollection,
      `/_api/Web/Lists/getbytitle('Incidents%20récurrents')/items`
    );
  }
  public getAgences(siteCollection: string): Promise<any> {
    return this.get(
      siteCollection,
      `/_api/Web/Lists/getbytitle('Agences')/items?$select=*,DRE_x0020_de_x0020_l_x0027_agenc/Title&$expand=DRE_x0020_de_x0020_l_x0027_agenc&$top=10000&$orderby=Code_x0020_Agence asc`
    );
  }
  public getDirections(siteCollection: string): Promise<any> {
    return this.get(
      siteCollection,
      `/_api/Web/Lists/getbytitle('Directions')/items?$select=*,Code_x0020_de_x0020_la_x0020_div/Title&$expand=Code_x0020_de_x0020_la_x0020_div&$top=10000&$orderby=Code_x0020_de_x0020_la_x0020_dir asc`
    );
  }
  public getDivisions(siteCollection: string): Promise<any> {
    return this.get(
      siteCollection,
      `/_api/Web/Lists/getbytitle('Divisions')/items?$orderby=Code_x0020_Division asc`
    );
  }
  public getComments(siteCollection: string, itemID): Promise<any> {
    return this.get(
      siteCollection,
      `/_api/Web/Lists/getbytitle('Comments')/items?$select=*,Title,Author/ID,Author/Title,Author/LastName,Editor/ID,Editor/Title,Editor/LastName&$&$expand=Author,Editor&$filter=TicketId%20eq%20${itemID}`
    );
  }
  public getUserDetails(siteCollection: string, CommentUserID): Promise<any> {
    return this.get(siteCollection, `/_api/web/getuserbyid(${CommentUserID})`);
  }
  public getUserContactId(siteCollection: string, userId): Promise<any> {
    return this.get(
      siteCollection,
      `/_api/Web/Lists/getbytitle('Contacts')/items?$filter=SPUserId%20eq%20${userId}&$select=Id`
    );
  }

  public post(
    absoluteURL: string,
    relativePath: string,
    body: any
  ): Promise<any> {
    return this.context.spHttpClient
      .post(absoluteURL + relativePath, SPHttpClient.configurations.v1, {
        body: body,
        headers: {
          Accept: "application/json;odata=nometadata",
          "Content-type": "application/json;odata=nometadata",
          "odata-version": "",
          "IF-MATCH": "*",
        },
      })
     
      .catch((error) => Promise.reject(error));
  }

  public AddComment(absoluteURL: string, listID: string, item: any) {
    return this.post(
      absoluteURL,
      `/_api/web/lists/getbyid('${listID}')/items`,
      JSON.stringify(item)
    );
  }
  public AddTicket(absoluteURL: string, listID: string, item: any) {
    return this.post(
      absoluteURL,
      `/_api/web/lists/getbyid('${listID}')/items`,
      JSON.stringify(item)
    ).then(response => {return response});
  }
  public delete(absoluteURL: string, relativePath: string): Promise<any> {
    return this.context.spHttpClient
      .post(absoluteURL + relativePath, SPHttpClient.configurations.v1, {
        headers: {
          Accept: "application/json;odata=nometadata",
          "Content-type": "application/json;odata=nometadata",
          "odata-version": "",
          "IF-MATCH": "*",
          "X-HTTP-Method": "DELETE",
        },
      })
      .then((response) => response.json())
      .catch((error) => Promise.reject(error));
  }
  public DeleteComment(absoluteURL: string, listID: string, item: any) {
    return this.delete(
      absoluteURL,
      `/_api/web/lists/getbyid('${listID}')/items(${item})`
    );
  }
}

const SharepointService = new SharepointServiceManager();

export default SharepointService;
