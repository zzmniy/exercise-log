// ================================
// START YOUR APP HERE
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
  }
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


/// Function to open the modal
function openModal(meal) {
  document.getElementById('modal').style.display = 'block';
  document.getElementById('meal-type').innerText = meal;
}

// Function to close the modal
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Form submit event handler
document.getElementById('meal-form').addEventListener('submit', function(event) {
  event.preventDefault(); // 폼 제출 막기

  var mealType = document.getElementById('meal-type').innerText;
  var foodName = document.getElementById('foodName').value;
  var calories = parseInt(document.getElementById('calories').value);

  // 해당 식사 시간의 총 칼로리 업데이트 등 추가 작업 수행

  addMealItem(foodName, calories, mealType); // 추가된 항목을 텍스트로 표시하는 함수 호출
  closeModal(); // 모달 닫기
});

// Function to add meal item to the modal content
function addMealItem(foodName, calories, mealType) {
  var mealItemsDiv = document.getElementById('meal-items'); // 입력된 음식을 나타낼 영역
  var listItem = document.createElement('p'); // 새로운 <p> 요소 생성
  listItem.textContent = foodName + ' (' + calories + ' cal)'; // 텍스트 설정
  mealItemsDiv.appendChild(listItem); // 입력된 음식을 나타내는 요소를 영역에 추가
}
// 식사별 칼로리를 저장할 객체
var mealCalories = {
  breakfast: 0,
  lunch: 0,
  dinner: 0,
  snack: 0
};

/// Form submit event handler
document.getElementById('meal-form').addEventListener('submit', function(event) {
  event.preventDefault(); // 폼 제출 막기

  var mealType = document.getElementById('meal-type').innerText;
  var foodName = document.getElementById('foodName').value;
  var calories = parseInt(document.getElementById('calories').value);

  // 해당 식사 시간의 총 칼로리 업데이트 등 추가 작업 수행

  addMealItem(foodName, calories, mealType); // 추가된 항목을 텍스트로 표시하는 함수 호출
  closeModal(); // 모달 닫기

  // 추가된 음식을 식사별로 나타내는 함수 호출
  displayMealItem(foodName, calories, mealType);
});

// Function to add meal item to the modal content
function addMealItem(foodName, calories, mealType) {
  var mealItemsDiv = document.getElementById('meal-items'); // 입력된 음식을 나타낼 영역
  var listItem = document.createElement('p'); // 새로운 <p> 요소 생성
  listItem.textContent = foodName + ' (' + calories + ' cal)'; // 텍스트 설정
  mealItemsDiv.appendChild(listItem); // 입력된 음식을 나타내는 요소를 영역에 추가
}

// Function to display meal item outside the modal content
function displayMealItem(foodName, calories, mealType) {
  var mealCaloriesDiv = document.getElementById(mealType.toLowerCase() + 'Calories'); // 해당 식사 시간의 칼로리를 나타낼 영역
  var totalCalories = parseInt(mealCaloriesDiv.innerText.split(':')[1].trim()); // 기존 칼로리 가져오기
  totalCalories += calories; // 새로운 음식의 칼로리 추가
  mealCaloriesDiv.innerText = 'Total: ' + totalCalories; // 칼로리 업데이트
}
