/* eslint-disable no-undef */

//datepicker를 설정하고 onSelect 이벤트 핸들러 추가
// eslint-disable-next-line no-undef
$(function(){
  $("#datepicker").datepicker({
    onSelect: function(dateText) {
      $("#selectedDate").text(dateText);
    }
  })
});