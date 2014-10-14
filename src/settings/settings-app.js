angular.module("risevision.widget.googleCalendar.settings",
  ["risevision.widget.common",
    "risevision.widget.common.translate",
    "risevision.widget.common.tooltip",
    "risevision.widget.common.widget-button-toolbar",
    "risevision.widget.common.scroll-setting",
    "risevision.widget.common.font-setting"]);

angular.module("risevision.widget.common.translate", ["pascalprecht.translate"])
  .config(["$translateProvider", function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: "locales/",
      suffix: "/translation.json"
    });
    $translateProvider.determinePreferredLanguage();
    if($translateProvider.preferredLanguage().indexOf("en_") === 0){
      //default to "en" on any of the English variants
      $translateProvider.preferredLanguage("en");
    }
  }]);
