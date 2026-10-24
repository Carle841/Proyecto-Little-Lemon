(function () {
  var timeSlots = ['5:00 PM', '5:30 PM', '6:00 PM', '7:00 PM', '8:00 PM', '8:30 PM'];

  window.fetchAPI = function (date) {
    var day = new Date(date).getDate();
    return day % 2 === 0 ? timeSlots.slice(0, 4) : timeSlots.slice();
  };

  window.submitAPI = function (formData) {
    return Boolean(formData && formData.date && formData.time && formData.guests);
  };
}());
