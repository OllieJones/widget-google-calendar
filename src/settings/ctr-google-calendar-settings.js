angular.module("risevision.widget.googleCalendar.settings")
  .controller("calendarSettingsController", ["$scope",
    function ($scope) {
      $scope.showDateFormat = false;
      $scope.dateFormatValue = "dd/MM/yyyy";

      $scope.currentDate = new Date();

      $scope.$watch("settings.additionalParams.dateFormat", function (format) {
        if (typeof format !== "undefined" && format) {
          $scope.dateFormatValue = format;
        }
      });

      $scope.$watch("settings.additionalParams.dateRange", function (range) {
        if (range && range !== "day" && range !== "week") {
          if (!$scope.getAdditionalParam("dateFormat", null)) {
            // set a default selection
            $scope.setAdditionalParam("dateFormat", $scope.dateFormatValue);
          }
          $scope.showDateFormat = true;
        } else {
          $scope.showDateFormat = false;

          if ($scope.settings.additionalParams.hasOwnProperty("dateFormat")) {
            delete $scope.settings.additionalParams.dateFormat;
          }
        }
      });

    }])
  .value("defaultSettings", {
    params: {},
    additionalParams: {
      calendar: "",
      scroll: {},
      dateRange: "day",
      dateFont: {
        bold: true
      },
      timeFont: {
        bold: true
      },
      timeFormat: "12hour",
      titleFont: {
        bold: true
      },
      locationFont: {
        bold: true
      },
      descriptionFont: {
        size: "18"
      }
    }
  });
