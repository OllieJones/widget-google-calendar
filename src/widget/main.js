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
    RiseVision.Calendar.stop();
  }

  if (id) {
    gadgets.rpc.register("rscmd_play_" + id, play);
    gadgets.rpc.register("rscmd_pause_" + id, pause);
    gadgets.rpc.register("rscmd_stop_" + id, stop);
  }
})(window, document, gadgets);
