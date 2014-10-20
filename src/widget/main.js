/* global RiseVision, gadgets */

(function (window, document, gadgets) {
  "use strict";

  var prefs = new gadgets.Prefs(),
    id = prefs.getString("id");

  // Disable context menu (right click menu)
  window.oncontextmenu = function () {
    return false;
  };

  function play() {
    RiseVision.Calendar.play();
  }

  function pause() {
    RiseVision.Calendar.pause();
  }

  function stop() {

  }

  if (id) {
    gadgets.rpc.register("rscmd_play_" + id, play);
    gadgets.rpc.register("rscmd_pause_" + id, pause);
    gadgets.rpc.register("rscmd_stop_" + id, stop);
  }
})(window, document, gadgets);

function init() {
  var prefs = new gadgets.Prefs(),
    id = prefs.getString("id");

  gapi.client.setApiKey("AIzaSyBXxVK_IOV7LNQMuVVo_l7ZvN53ejN86zY");

  gapi.client.load("calendar", "v3").then(function() {
    gadgets.rpc.register("rsparam_set_" + id, RiseVision.Calendar.getAdditionalParams);
    gadgets.rpc.call("", "rsparam_get", null, id, "additionalParams");
  });
}

