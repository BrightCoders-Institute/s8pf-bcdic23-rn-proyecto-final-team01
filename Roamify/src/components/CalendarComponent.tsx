import React, {useEffect, useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Entypo';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'January ',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan ',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: 'Today',
};

LocaleConfig.defaultLocale = 'fr';

const currentDate = new Date();

interface DateProps {
  onSelectDate?: (date: string) => void;
}

const CalendarComponent = (props: DateProps) => {
  const {onSelectDate} = props;
  const [selected, setSelected] = useState('');

  /*  useEffect(() => {
    onSelectDate(selected);
  }, [selected, onSelectDate]);
 */
  return (
    <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {
          selected: true,
          disableTouchEvent: true,
          selectedColor: '#47C6E6',
        },
      }}
      style={{
        height: 350,
        borderRadius: 10,
        backgroundColor: 'transparent',
      }}
      theme={{
        calendarBackground: 'transparent',
        monthTextColor: '#000',
        textSectionTitleColor: '#000',
        selectedDayBackgroundColor: '#000',
        selectedDayTextColor: '#000',
        todayTextColor: '#000',
        dayTextColor: '#000',
        textDisabledColor: '#B6B7BA',

        textMonthFontWeight: 'bold',
        textMonthFontSize: 20,
      }}
      minDate={currentDate.toString()}
      renderArrow={directions => (
        <Icon name={`chevron-${directions}`} size={30} color="#47C6E6" />
      )}
    />
  );
};

export default CalendarComponent;
