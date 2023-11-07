import axios from "axios";
import { env } from "../env";

const AXIOS = axios.create({
  baseURL: env().BASEURL,
});



export const httpService = {
  getUserBankDetails,
  getMarketWatchData,
  getDistinctUrl,
  getAccessLog,
  getResponseLog,
  getPayoutDetails,
  getFeedbackDetails,
  FeedbackDownload,
  payOutDownload,
  getTopViewedPages,
  getVisitorsPerDay,
  getVersionList,
  getproductlist,
  getNewlyAddedSymbols,
  getDeactivatedSymbols,
  getDuplicateSymbols,
  sendPushNotification,
  sendNewScript,
  getVendors,
  authorizeVendor,
  addMobileVersion,
  deleteMobileVersion,
  updateMobileVersion,
  getMobileVersion,
  getUserDetails,
  updateUserDetails,
  getUserCountDetails,
  addUserKeyCloak,
  ssoLogin,
  getUserCount,
  getContractMasterData,
  updateSettingsAction,
  loadPositionFile,
  submitPositionFile,
  loadHoldingFile,
  submitHoldingFile,
  getUserRecordData,
  getUserLogDetails,
  resetCache,
};

function getContractMasterData(payload: any) {
  return AXIOS.post("adrest/contract/get", payload, headers(false));
}

function getMarketWatchData(payload: any) {
  return AXIOS.post(
    "adrest/report/getMarketWatchdata",
    payload,
    headers(false)
  );
}

function getUserBankDetails(payload: any) {
  return AXIOS.post(
    "adrest/report/getUserBankDetails",
    payload,
    headers(false)
  );
}

function getAccessLog(payload: any) {
  return AXIOS.post(`adrest/log/getaccesslog`, payload, headers(false));
}

function getDistinctUrl() {
  return AXIOS.get("adrest/admin/getDistinctUrl");
}

function getResponseLog(payload: any) {
  return AXIOS.post(`adrest/log/getrestlogs`, payload, headers(false));
}

function getPayoutDetails(payload: any) {
  return AXIOS.post("adrest/payment/getPayoutDetails", payload, headers(false));
}

function getFeedbackDetails(payload: any) {
  return AXIOS.post("fbrest/feedback/getFeedback", payload, headers(false));
}

function payOutDownload(payload: any) {
  return AXIOS.post(
    "adrest/payment/downloadPayoutDetails",
    payload,
    headers(true)
  );
}

function FeedbackDownload(payload: any) {
  return AXIOS.post(
    "adrest/payment/downloadFeedbackDetails",
    payload,
    headers(true)
  );
}



function headers(isDownload: boolean) {
  return {
    headers: isDownload
      ? {
          "Content-Type": "application/json",
          // responseType : 'blob'
        }
      : {
          "Content-Type": "application/json",
        },
  };
}

function getTopViewedPages() {
  return AXIOS.get("adrest/admin/getUrlBasedRecords");
}

function getVisitorsPerDay() {
  return AXIOS.get("adrest/admin/userLogDetails");
}

function getVersionList() {
  return axios.get("mobileVersion.json");
}

function getproductlist() {
  return AXIOS.get("adrest/product/get/mtfpreference");
}

function getNewlyAddedSymbols() {
  return axios.get("adrest/contract/get/newlyadd");
}

function getDeactivatedSymbols() {
  return axios.get("adrest/contract/get/deactivated");
}

function getDuplicateSymbols() {
  return axios.get("adrest/contract/getDuplicateList");
}

function sendPushNotification(payload: any) {
  return AXIOS.post("/adrest/com/msg/send", payload);
}

function sendNewScript(payload: any) {
  return AXIOS.post("/adrest/contract/addContractMaster", payload);
}

function getVendors(payload: any) {
  return AXIOS.post("/adrest/com/getVendors", payload);
}

function authorizeVendor(payload: any) {
  return AXIOS.post("/adrest/com/updateAuthorize", payload);
}

function addMobileVersion(payload: any) {
  return AXIOS.post("/adrest/com/version/add", payload);
}

function deleteMobileVersion(payload: any) {
  return AXIOS.post("/adrest/com/version/delete", payload);
}

function updateMobileVersion(payload: any) {
  return AXIOS.post("/adrest/com/version/update", payload);
}

function getMobileVersion() {
  return AXIOS.get("/adrest/com/version/get");
}
//

function getUserCountDetails() {
  return AXIOS.get("adrest/user/login/details");
}

function getUserDetails(payload: any) {
  return AXIOS.post("adrest/com/getKcUserDetails", payload);
}

function updateUserDetails(payload: any) {
  return AXIOS.post("adrest/com/updateKcUserDetails", payload);
}

function updateSettingsAction(payload: any) {
  return AXIOS.post("adrest/product/update/mtfpreference", payload);
}

function addUserKeyCloak(payload: any) {
  return AXIOS.post("adrest/com/addNewUser", payload);
}

function ssoLogin(payload: any) {
  return AXIOS.post(`authrest/sso/vendor/auth/getUserDetails`, payload);
}

//Get user count
function getUserCount() {
  return AXIOS.get("adrest/user/login/details");
}

// file upload
function loadPositionFile(payload: any) {
  return AXIOS.post("adrest/position/upload", payload);
}

function submitPositionFile() {
  return AXIOS.get("adrest/position/insert");
}

function loadHoldingFile(payload: any) {
  return AXIOS.post("adrest/holdings/upload", payload);
}

function submitHoldingFile() {
  return AXIOS.get("adrest/holdings/insert");
}
function getUserRecordData(payload: any) {
  return AXIOS.get(`adrest/admin/userecord/${payload}`);
}

function getUserLogDetails() {
  return AXIOS.get("adrest/admin/userLogDetails");
}
function resetCache(jsonObj: any) {
  return AXIOS.post(`adrest/contract/reloadcache`, jsonObj, headers(false) );
}

// getAuthHeaders(){
//   // let userId = localStorage.getItem("userId");
//   // let sessionId = localStorage.getItem("sessionId");
//  let userId =  store.state.userID 
//  let sessionId = store.state.userSession
//   let headers = {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + userId + " " + sessionId,
//   };
//   return headers;
// }