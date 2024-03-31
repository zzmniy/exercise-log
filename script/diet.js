// ================================
// 캘린더
// ================================
const init = {
  monList: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayList: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  today: new Date(),
  monForChange: new Date().getMonth(),
  activeDate: new Date(),
  getFirstDay: (yy, mm) => new Date(yy, mm, 1),
  getLastDay: (yy, mm) => new Date(yy, mm + 1, 0),
  nextMonth: function () {
    let d = new Date();
    d.setDate(1);
    d.setMonth(++this.monForChange);
    this.activeDate = d;
    return d;
  },
  prevMonth: function () {
    let d = new Date();
    d.setDate(1);
    d.setMonth(--this.monForChange);
    this.activeDate = d;
    return d;
  },
  addZero: (num) => (num < 10) ? '0' + num : num,
  activeDTag: null,
  getIndex: function (node) {
    let index = 0;
    while (node = node.previousElementSibling) {
      index++;
    }
    return index;
  },
  event: []
};

const $calBody = document.querySelector('.cal-body');
const $btnNext = document.querySelector('.btn-cal.next');
const $btnPrev = document.querySelector('.btn-cal.prev');

/**
 * @param {number} date
 * @param {number} dayIn
*/
function loadDate (date, dayIn) {
  document.querySelector('.cal-date').textContent = [];
  document.querySelector('.cal-day').textContent = [];
}

/**
 * @param {date} fullDate
 */
function loadYYMM (fullDate) {
  let yy = fullDate.getFullYear();
  let mm = fullDate.getMonth();
  let firstDay = init.getFirstDay(yy, mm);
  let lastDay = init.getLastDay(yy, mm);
  let markToday;  // for marking today date

  // 새로운 요소 생성 및 설정
  var newElement = document.createElement('div');
  newElement.className = 'cal-month';
  newElement.textContent = yy + '년 ' + init.monList[mm];

  // 'calendar' 요소에 새로운 요소 추가
  document.getElementById('calendar').appendChild(newElement);
  if (mm === init.today.getMonth() && yy === init.today.getFullYear()) {
    markToday = init.today.getDate();
  }

  

  document.querySelector('.cal-month').textContent = yy + '년 ' + init.monList[mm]; // 수정된 부분

  let trtd = '';
  let countDay = 1;
  for (let i = 0; i < 6; i++) {
    trtd += '<tr>';
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDay.getDay()) || countDay > lastDay.getDate()) {
        trtd += '<td></td>'; // 첫 번째 주의 시작일 이전이거나 마지막 날짜 이후면 공백 셀 생성
      } else {
        let fullDate = yy + '.' + init.addZero(mm + 1) + '.' + init.addZero(countDay);
        trtd += '<td class="day';
        trtd += (markToday && markToday === countDay) ? ' today" ' : '"';
        trtd += ` data-date="${countDay}" data-fdate="${fullDate}">`;
        if (j === 0) {
          trtd += '<span style="color: red;">' + countDay + '</span>';
        } else {
          trtd += countDay;
        }
        countDay++;
      }
      trtd += '</td>';
    }
    trtd += '</tr>';
  }
  $calBody.innerHTML = trtd;
}

/**
 * @param {string} val
 */
function createNewList (val) {
  let id = new Date().getTime() + '';
  let yy = init.activeDate.getFullYear();
  let mm = init.activeDate.getMonth() + 1;
  let dd = init.activeDate.getDate();
  const $target = $calBody.querySelector(`.day[data-date="${dd}"]`);

  let date = yy + '.' + init.addZero(mm) + '.' + init.addZero(dd);

  let eventData = {};
  eventData['date'] = date;
  eventData['memo'] = val;
  eventData['complete'] = false;
  eventData['id'] = id;
  init.event.push(eventData);
  $todoList.appendChild(createLi(id, val, date));
}

loadYYMM(init.today);
loadDate(init.today.getDate(), init.today.getDay());

$btnNext.addEventListener('click', () => loadYYMM(init.nextMonth()));
$btnPrev.addEventListener('click', () => loadYYMM(init.prevMonth()));

$calBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('day')) {
    if (init.activeDTag) {
      init.activeDTag.classList.remove('day-active');
    }
    let day = Number(e.target.textContent);
    loadDate(day, e.target.cellIndex);
    e.target.classList.add('day-active');
    init.activeDTag = e.target;
    init.activeDate.setDate(day);
    reloadTodo();
  }
});

// ================================
// 모달
// ================================

//모달 열기
function openModal(meal) {
  document.getElementById('modal').style.display = 'block';
  document.getElementById('meal-type').innerText = meal;
}

// 모달 확인 버튼에 대한 이벤트 핸들러
document.getElementById('meal-form').addEventListener('submit', function(event) {
  event.preventDefault(); // 폼 제출 기본 동작 막기

  // 입력한 음식과 칼로리 가져오기
  var foodName = document.getElementById('foodName').value;
  var calories = parseInt(document.getElementById('calories').value);
  var mealType = document.getElementById('meal-type').textContent.toLowerCase(); // 식사 타입 가져오기

  // 입력한 내용을 화면에 표시할 요소에 삽입
  displayMealItem(foodName, calories);

  
  // 입력 폼 초기화
  document.getElementById('foodName').value = '';
  document.getElementById('calories').value = '';

  // 모달 닫기
  closeModal();

});

// 모달 닫기 함수
function closeModal() {
  var modal = document.getElementById('modal');
  modal.style.display = 'none';

}

