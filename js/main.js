(function () {
  "use strict";

  var verticalOrientation = false;
  var ID = {
    isCharge: undefined,
    remainTime: undefined,
    level: undefined,
    batt: undefined,
    battWrap: undefined,
    battInn: undefined
  };
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
      ID.isCharge.textContent = BS.data.charging ?
        "Charging" : "Discharging";
      ID.remainTime.textContent = BS.data.charging ?
        hms(BS.data.chargingTime) : hms(BS.data.dischargingTime);
      ID.level.textContent = BS.data.level + "%";
      if (verticalOrientation) {
        ID.battWrap.style.width = "";
        ID.battWrap.style.height = BS.data.level + "%";
      } else {
        ID.battWrap.style.height = "";
        ID.battWrap.style.width = BS.data.level + "%";
      }
      resizeBattery();
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

  function hms(sec) {
    var formatted = "";
    if (!sec) {
      // Invalid data
      formatted = "";
    } else if (sec < 60) {
      // Less than 60 seconds
      formatted = sec + "s";
    } else if (sec >= 60 && sec < 3600) {
      if (sec % 60 === 0) {
        // Round minutes
        var mmin = sec / 60;
        formatted = mmin + "m";
      } else {
        // Minutes, seconds
        var msec = sec % 60,
          min = (sec - msec) / 60;
        formatted = min + "m " + msec + "s";
      }
    } else if (sec >= 3600) {
      if (sec % 3600) {
        // Round hours
        var hhr = sec / 3600;
        formatted = hhr + "h";
      } else {
        // TODO: Hours, minutes, seconds
        var hr = sec / 3600;
        formatted = hr + "h";
      }
    }
    return formatted;
  }

  function checkOrientation() {
    verticalOrientation =
      document.documentElement.clientHeight >
      document.documentElement.clientWidth &&
      document.documentElement.clientWidth <= 800;
  }

  function resizeBattery() {
    if (verticalOrientation) {
      ID.batt.style.width = (ID.batt.clientHeight / 21 * 9) + "px";
      ID.battInn.style.height = ID.batt.clientHeight + "px";
    } else {
      ID.batt.style.width = "";
      ID.battInn.style.height = "";
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    ID = {
      isCharge: document.getElementById("js-isCharging"),
      remainTime: document.getElementById("js-remainingTime"),
      level: document.getElementById("js-level"),
      batt: document.getElementById("js-battery"),
      battWrap: document.getElementById("js-battery-wrapper"),
      battInn: document.getElementById("js-battery-inner")
    };
    checkOrientation();
    if (BS.apiSupported()) {
      BS.init();
      window.addEventListener("resize", function () {
        checkOrientation();
        BS.display();
      });
    } else {
      // TODO: Battery Status API is not supported
    }
  });

})();
