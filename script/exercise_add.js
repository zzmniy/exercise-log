document.addEventListener("DOMContentLoaded", function() {
  var exerciseButton = document.getElementById("exerciseButton");

  exerciseButton.addEventListener("click", function() {
      // 오늘의 날짜를 얻어옵니다.
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
      var day = today.getDate();

      // 새 페이지에 오늘의 날짜를 전달하거나 표시하는 로직을 추가합니다.
      // 여기서는 새 페이지에 GET 매개변수로 전달하는 방식을 사용합니다.
      window.location.href = "exercise.html?year=" + year + "&month=" + month + "&day=" + day;
  });
});
