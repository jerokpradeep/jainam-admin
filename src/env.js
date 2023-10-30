const envType = "UAT";

export function env() {
  return {
    BASEURL:
      envType == "Live"
        ? "https://protrade.jainam.in/"
        : "https://protrade.jainam.in/",
    UATBASEURL:
      envType == "Live"
        ? "https://protrade.jainam.in/"
        : "https://protrade.jainam.in/",
    SSOREDIRECTURL:
      envType == "Live"
        ? "https://protrade.jainam.in/"
        : "https://protrade.jainam.in/",
    APPCODE: envType == "Live" ? "QYPdhBfGbfsSOFb" : "QYPdhBfGbfsSOFb",
  };
}
