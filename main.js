(function() {
  "use strict";

  navigator.getBattery().then(
    function(battery) {
      console.log(battery);
    }
  );

})();
