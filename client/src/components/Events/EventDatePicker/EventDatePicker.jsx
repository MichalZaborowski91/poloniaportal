import { registerLocale } from "react-datepicker";
import { pl } from "date-fns/locale";

import { EventDateField } from "../EventDateField/EventDateField";

registerLocale("pl", pl);

export const EventDatePicker = ({ formData, setFormData, errors }) => {
  return (
    <>
      <h3>Termin wydarzenia</h3>

      <EventDateField
        label="Rozpoczęcie"
        date={formData.startDate}
        time={formData.startTime}
        minDate={new Date()}
        disableDate={false}
        disableTime={!formData.startDate}
        dateError={errors.startDate}
        timeError={errors.startTime}
        onDateChange={(date) =>
          setFormData((prev) => ({
            ...prev,

            startDate: date,

            //CLEAN END DATE IF START WAS CHANGED
            endDate: null,
            endTime: null,
          }))
        }
        onTimeChange={(time) =>
          setFormData((prev) => {
            if (!time) {
              return prev;
            }

            const isFirstTime =
              !prev.startTime && !prev.endDate && !prev.endTime;

            if (isFirstTime) {
              const endTime = new Date(time);
              endTime.setHours(endTime.getHours() + 1);

              return {
                ...prev,
                startTime: time,
                endDate: prev.startDate,
                endTime,
              };
            }

            return {
              ...prev,
              startTime: time,
              endDate: null,
              endTime: null,
            };
          })
        }
      />

      <EventDateField
        label="Zakończenie"
        date={formData.endDate}
        time={formData.endTime}
        minDate={formData.startDate || new Date()}
        disableDate={!formData.startTime}
        disableTime={!formData.startTime}
        dateError={errors.endDate}
        timeError={errors.endTime}
        onDateChange={(date) =>
          setFormData((prev) => ({
            ...prev,
            endDate: date,
            endTime: null,
          }))
        }
        onTimeChange={(time) =>
          setFormData((prev) => ({
            ...prev,
            endTime: time,
          }))
        }
      />
    </>
  );
};
