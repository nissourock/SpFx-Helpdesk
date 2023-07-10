import { WebPartContext } from "@microsoft/sp-webpart-base";
export declare class SharepointServiceManager {
    context: WebPartContext;
    setup(context: WebPartContext): void;
    get(siteCollection: string, relativeURL: string): Promise<any>;
    getLists(siteCollection: string): Promise<any>;
    getListItems(siteCollection: string, listID: string, userId: string): Promise<any>;
    getCategories(siteCollection: string): Promise<any>;
    getPriorities(siteCollection: string): Promise<any>;
    getIncidents(siteCollection: string): Promise<any>;
    getAgences(siteCollection: string): Promise<any>;
    getDirections(siteCollection: string): Promise<any>;
    getDivisions(siteCollection: string): Promise<any>;
    getComments(siteCollection: string, itemID: any): Promise<any>;
    getUserDetails(siteCollection: string, CommentUserID: any): Promise<any>;
    getUserContactId(siteCollection: string, userId: any): Promise<any>;
    post(absoluteURL: string, relativePath: string, body: any): Promise<any>;
    AddComment(absoluteURL: string, listID: string, item: any): Promise<any>;
    AddTicket(absoluteURL: string, listID: string, item: any): Promise<any>;
    delete(absoluteURL: string, relativePath: string): Promise<any>;
    DeleteComment(absoluteURL: string, listID: string, item: any): Promise<any>;
}
declare const SharepointService: SharepointServiceManager;
export default SharepointService;
