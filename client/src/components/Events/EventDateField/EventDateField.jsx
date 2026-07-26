import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./EventDateField.module.scss";

export const EventDateField = ({
  label,
  date,
  time,
  onDateChange,
  onTimeChange,
  minDate,
  disableDate = false,
  disableTime = false,
  dateError,
  timeError,
}) => {
  return (
    <div className={styles.wrapper}>
      <h4>{label}</h4>

      <div className={styles.row}>
        <DatePicker
          selected={date}
          onChange={onDateChange}
          dateFormat="dd.MM.yyyy"
          placeholderText="Data"
          locale="pl"
          minDate={minDate}
          disabled={disableDate}
        />
        {dateError && <p className={styles.error}>{dateError}</p>}

        <DatePicker
          selected={time}
          onChange={onTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Godzina"
          dateFormat="HH:mm"
          placeholderText="Godzina"
          locale="pl"
          disabled={disableTime}
        />
        {timeError && <p className={styles.error}>{timeError}</p>}
      </div>
    </div>
  );
};
