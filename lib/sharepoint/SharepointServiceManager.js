import { SPHttpClient } from "@microsoft/sp-http";
var SharepointServiceManager = (function () {
    function SharepointServiceManager() {
    }
    SharepointServiceManager.prototype.setup = function (context) {
        this.context = context;
    };
    SharepointServiceManager.prototype.get = function (siteCollection, relativeURL) {
        return this.context.spHttpClient
            .get(siteCollection + relativeURL, SPHttpClient.configurations.v1)
            .then(function (result) { return result.json(); });
    };
    SharepointServiceManager.prototype.getLists = function (siteCollection) {
        return this.get(siteCollection, "/_api/Web/Lists?&$select=Title,ID");
    };
    SharepointServiceManager.prototype.getListItems = function (siteCollection, listID, userId) {
        return this.get(siteCollection, "/_api/Web/Lists/getbyid('" + listID + "')/items?$select=*,Status/InternalName,AssignedTo/Name,AssignedTo/Title&$expand=Status,AssignedTo&$filter=RequesterSPUserStringId%20eq%20" + userId);
    };
    SharepointServiceManager.prototype.getCategories = function (siteCollection) {
        return this.get(siteCollection, "/_api/Web/Lists/getbytitle('Tickets')/fields?$filter=EntityPropertyName%20eq%20%27Category%27");
    };
    SharepointServiceManager.prototype.getPriorities = function (siteCollection) {
        return this.get(siteCollection, "/_api/Web/Lists/getbytitle('Tickets')/fields?$filter=EntityPropertyName%20eq%20%27Priority%27");
    };
    SharepointServiceManager.prototype.getIncidents = function (siteCollection) {
        return this.get(siteCollection, "/_api/Web/Lists/getbytitle('Incidents%20r\u00E9currents')/items");
    };
    SharepointServiceManager.prototype.getAgences = function (siteCollection) {
        return this.get(siteCollection, "/_api/Web/Lists/getbytitle('Agences')/items?$select=*,DRE_x0020_de_x0020_l_x0027_agenc/Title&$expand=DRE_x0020_de_x0020_l_x0027_agenc&$top=10000&$orderby=Code_x0020_Agence asc");
    };
    SharepointServiceManager.prototype.getDirections = function (siteCollection) {
        return this.get(siteCollection, "/_api/Web/Lists/getbytitle('Directions')/items?$select=*,Code_x0020_de_x0020_la_x0020_div/Title&$expand=Code_x0020_de_x0020_la_x0020_div&$top=10000&$orderby=Code_x0020_de_x0020_la_x0020_dir asc");
    };
    SharepointServiceManager.prototype.getDivisions = function (siteCollection) {
        return this.get(siteCollection, "/_api/Web/Lists/getbytitle('Divisions')/items?$orderby=Code_x0020_Division asc");
    };
    SharepointServiceManager.prototype.getComments = function (siteCollection, itemID) {
        return this.get(siteCollection, "/_api/Web/Lists/getbytitle('Comments')/items?$select=*,Title,Author/ID,Author/Title,Author/LastName,Editor/ID,Editor/Title,Editor/LastName&$&$expand=Author,Editor&$filter=TicketId%20eq%20" + itemID);
    };
    SharepointServiceManager.prototype.getUserDetails = function (siteCollection, CommentUserID) {
        return this.get(siteCollection, "/_api/web/getuserbyid(" + CommentUserID + ")");
    };
    SharepointServiceManager.prototype.getUserContactId = function (siteCollection, userId) {
        return this.get(siteCollection, "/_api/Web/Lists/getbytitle('Contacts')/items?$filter=SPUserId%20eq%20" + userId + "&$select=Id");
    };
    SharepointServiceManager.prototype.post = function (absoluteURL, relativePath, body) {
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
            .catch(function (error) { return Promise.reject(error); });
    };
    SharepointServiceManager.prototype.AddComment = function (absoluteURL, listID, item) {
        return this.post(absoluteURL, "/_api/web/lists/getbyid('" + listID + "')/items", JSON.stringify(item));
    };
    SharepointServiceManager.prototype.AddTicket = function (absoluteURL, listID, item) {
        return this.post(absoluteURL, "/_api/web/lists/getbyid('" + listID + "')/items", JSON.stringify(item)).then(function (response) { return response; });
    };
    SharepointServiceManager.prototype.delete = function (absoluteURL, relativePath) {
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
            .then(function (response) { return response.json(); })
            .catch(function (error) { return Promise.reject(error); });
    };
    SharepointServiceManager.prototype.DeleteComment = function (absoluteURL, listID, item) {
        return this.delete(absoluteURL, "/_api/web/lists/getbyid('" + listID + "')/items(" + item + ")");
    };
    return SharepointServiceManager;
}());
export { SharepointServiceManager };
var SharepointService = new SharepointServiceManager();
export default SharepointService;

//# sourceMappingURL=SharepointServiceManager.js.map
