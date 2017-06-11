(function () {
  "use strict";

  var verticalOrientation = false;
  var BS = {
    data: {},
    apiSupported: function () {
      return (navigator.getBattery ||
        navigator.battery ||
        navigator.mozBattery ||
        navigator.webkitBattery ||
        navigator.msBattery);
    },
    init: function () {
      navigator.getBattery().then(
        function (b) {
          BS.updateData(b);
          BS.display();

          b.addEventListener("chargingchange", function () {
            navigator.vibrate(200);
            BS.updateData(b);
            BS.display();
          });

          b.addEventListener("chargingtimechange", function () {
            BS.updateData(b);
            BS.display();
          });

          b.addEventListener("dischargingtimechange", function () {
            BS.updateData(b);
            BS.display();
          });

          b.addEventListener("levelchange", function () {
            navigator.vibrate(200);
            BS.updateData(b);
            BS.display();
          });
        }
      );
    },
    display: function () {
      document.getElementById("js-isCharging").textContent = BS.data.charging ?
        "Charging" : "Discharging";
      document.getElementById("js-remainingTime").textContent = BS.data.charging ?
        minSec(BS.data.chargingTime) : minSec(BS.data.dischargingTime);
      document.getElementById("js-level").textContent = BS.data.level + "%";
    },
    updateData: function (b) {
      BS.data.charging = b.charging;
      BS.data.chargingTime =
        b.chargingTime !== Infinity ? b.chargingTime : 0;
      BS.data.dischargingTime =
        b.dischargingTime !== Infinity ? b.dischargingTime : 0;
      BS.data.level = Math.round(b.level * 100);
    }
  };

  function minSec(sec) {
    var formatted = "";
    if (!sec) {
      // Invalid data
      formatted = "";
    } else if (sec < 60) {
      // Less than 60 seconds
      formatted = sec + "s";
    } else if (sec % 60 === 0) {
      // Round minutes
      var mmin = sec / 60;
      formatted = mmin + "m";
    } else {
      // Minutes and remain seconds
      var msec = sec % 60,
        min = (sec - msec) / 60;
      formatted = min + "m " + msec + "s";
    }
    return formatted;
  }

  function checkOrientation() {
    verticalOrientation = window.innerWidth <= 800;
  }

  function resizeBattery() {
  }

  document.addEventListener("DOMContentLoaded", function () {
    checkOrientation();
    if (BS.apiSupported()) {
      BS.init();
    }
    resizeBattery();
    window.addEventListener("resize", function () {
      checkOrientation();
      resizeBattery();
    });
  });

})();
