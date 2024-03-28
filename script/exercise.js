import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const MyComponent = () => {
  return (
    <DayPicker
      showPreviousButton={false} // 이전 달 버튼 숨김
      showNextButton={false} // 다음 달 버튼 숨김
></DayPicker>
  );
};

export default MyComponent;