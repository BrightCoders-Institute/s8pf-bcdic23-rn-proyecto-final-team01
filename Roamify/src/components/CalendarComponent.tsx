import React, {useEffect, useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Entypo';
import {getDate} from '../hooks/getDate';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Enero ',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
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
  dayNames: ['D', 'M', 'T', 'W', 'T', 'F', 'S'],
  dayNamesShort: ['D', 'L', 'M', 'W', 'J', 'V', 'S'],
  today: 'Today',
};

interface Props {
  onDateSelect: (dateString: string) => void;
}

LocaleConfig.defaultLocale = 'fr';

const currentDate = new Date();

const formattedDate = getDate();

const CalendarComponent = (props: Props) => {
  const [selected, setSelected] = useState<string>(formattedDate);

  const {onDateSelect} = props;

  return (
    <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
        console.log('Calendar component: ' + day.dateString);
        onDateSelect(day.dateString);
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
