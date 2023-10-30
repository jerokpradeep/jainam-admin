import axios from "axios";
import { env } from "../env";

const AXIOS = axios.create({
  baseURL: env().BASEURL,
});

const UATAXIOS = axios.create({
  baseURL: env().UATBASEURL,
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
  getMailLogData,
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

function getMailLogData(payload: any) {
  return UATAXIOS.post("adminrest/smsEmailLog/getLog", payload, headers(true));
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
  return axios.get("newlyAddedSymbols.json");
}

function getDeactivatedSymbols() {
  return axios.get("deactivatedSymbols.json");
}

function getDuplicateSymbols() {
  return axios.get("duplicateSymbols.json");
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
  return AXIOS.post(`auth/sso/vendor/auth/getUserDetails`, payload);
}

//Get user count
function getUserCount() {
  return AXIOS.get("adrest/user/login/details");
}
