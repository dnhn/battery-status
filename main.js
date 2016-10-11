(function() {
  "use strict";

  navigator.getBattery().then(
    function(battery) {

      batteryInfo();

      function batteryInfo() {
        isCharging();
        chargingTime();
        dischargingTime();
        level();
      }

      function isCharging() {
        console.log("battery.charging", battery.charging);
        var batteryCharging = (battery.charging) ? "Yes" : "No";
        document.getElementById("js-isCharging").textContent = batteryCharging;
      }
      function chargingTime() {
        console.log("battery.chargingTime", battery.chargingTime);
        var chargingTime = battery.chargingTime, returnStr = "";
        if(chargingTime == 0) {
          returnStr = "Full";
        } else if (chargingTime == Infinity) {
          returnStr = "0";
        } else {
          returnStr = chargingTime + " seconds";
        }
        document.getElementById("js-chargingTime").textContent = returnStr;
      }
      function dischargingTime() {
        console.log("battery.dischargingTime", battery.dischargingTime);
        var dischargingTime = battery.dischargingTime, returnStr = "";
        if(dischargingTime == Infinity) {
          returnStr = "Charging";
        } else {
          returnStr = dischargingTime + " seconds";
        }
        document.getElementById("js-dischargingTime").textContent = returnStr;
      }
      function level() {
        console.log("battery.level", battery.level);
        var level = (battery.level * 100) + "%";
        document.getElementById("js-level").textContent = level;
      }

      battery.addEventListener("chargingchange", function() {
        batteryInfo();
      });
      battery.addEventListener("chargingtimechange", function() {
        batteryInfo();
      });
      battery.addEventListener("dischargingtimechange", function() {
        batteryInfo();
      });
      battery.addEventListener("levelchange", function() {
        batteryInfo();
      });

    }
  );

})();
