import "../../styles/calendar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCalendarWeek,
  faFileDownload,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import i18n from "i18next";

// Hooks
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

//Components
import CalendarDay from "./CalendarDay";
import CalendarColumn from "./CalendarColumn";
import TimeMarker from "./TimeMarker";

const Calendar = ({ events, onHourClick, onEventClick }) => {
  // Initializing hooks
  const [width, setWidth] = useState(window.innerWidth);
  const [t] = useTranslation("translation");

  let currentDate = new Date();
  const [changeWeek, setChangeWeek] = useState(
    new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
    )
  );

  const dateLocale = i18n.language === "en" ? "en-US" : "pl-PL";

  const capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  //! This thing is affecting  performance a bit
  // Watching a width of device
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);

      // Changing the date to first day of week
      if (width > 790) {
        setChangeWeek(
          new Date(
            changeWeek.setDate(changeWeek.getDate() - changeWeek.getDay() + 1)
          )
        );
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width, changeWeek]);

  // Changing the layout info
  const columns = width > 790 ? 5 : 1;
  const moveDays = width > 790 ? 7 : 1;
  const slideDays = width > 790 ? 7 : 3;

  // First day of weekend starting at Monday
  let currentWeek = [];
  let tempWeek = new Date(changeWeek);

  for (let i = 0; i < columns; i++) {
    currentWeek.push({
      dayNumber: tempWeek.getDate(),
      name: capitalize(
        tempWeek.toLocaleDateString(dateLocale, { weekday: "long" })
      ),
      month: capitalize(
        tempWeek.toLocaleDateString(dateLocale, { month: "long" })
      ),
      monthNumber: tempWeek.getMonth(),
      fullDate: new Date(tempWeek),
      isToday: tempWeek.toDateString() === new Date().toDateString(),
    });
    tempWeek.setDate(tempWeek.getDate() + 1);
  }

  const getDayEvents = (columnNumber) => {
    // Filtering the events and returning only with the same month and day
    return events.filter((event, i) => {
      const startDate = new Date(event.startDate);
      // If the event start day is equal to current column day add it to array
      if (
        startDate.getDate() === currentWeek[columnNumber].dayNumber &&
        startDate.getMonth() === currentWeek[columnNumber].monthNumber
      ) {
        return event;
      }
      // TODO: Think about reccurring events design
      // else if (event?.onRepeat) {
      //   // If the event has attribute onRepeat add this value to date and check again
      //   startDate.setDate(startDate.getDate() + event.onRepeat);
      //   if (
      //     startDate.getDate() === currentWeek[columnNumber].dayNumber &&
      //     startDate.getMonth() === currentWeek[columnNumber].monthNumber
      //   ) {
      //     // If the event date is equal to current one, change it and add to array
      //     const endDate = new Date(event.endDate);
      //     endDate.setDate(endDate.getDate() + event.onRepeat);
      //     events.push({
      //       ...event,
      //       startDate: startDate,
      //       endDate: endDate,
      //     });
      //     return {
      //       ...event,
      //       startDate: startDate,
      //       endDate: endDate,
      //     };
      //   }
      // }
    });
  };

  return (
    <div className="calendar">
      <div className="calendar-navigation">
        <button
          onClick={() => {
            setChangeWeek(
              new Date(
                currentDate.setDate(
                  currentDate.getDate() - currentDate.getDay() + 1
                )
              )
            );
          }}
        >
          <FontAwesomeIcon icon={faCalendarWeek} size={"xl"} className="icn" />
          <span className="this-week">{t("calendar.thisWeek")}</span>
        </button>
        <button
          onClick={() => {
            /* If the weekday is monday (1) or saturday (0) 
            then button changes the whole week to omit weekend */
            const prevWeek = changeWeek.getDay() <= 1 ? slideDays : moveDays;

            setChangeWeek(
              new Date(changeWeek.setDate(changeWeek.getDate() - prevWeek))
            );
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} size={"xl"} className="icn" />
        </button>
        <button
          onClick={() => {
            /* If the weekday is friday (1) or greater
            then button changes the date by 3 to omit weekend */
            const nextWeek = changeWeek.getDay() >= 5 ? 3 : moveDays;
            setChangeWeek(
              new Date(changeWeek.setDate(changeWeek.getDate() + nextWeek))
            );
          }}
        >
          <FontAwesomeIcon icon={faAngleRight} size={"xl"} className="icn" />
        </button>
        <span className="nav-month">
          {currentWeek[0].month === currentWeek[currentWeek.length - 1].month
            ? currentWeek[0].month
            : `${currentWeek[0].month} - ${
                currentWeek[currentWeek.length - 1].month
              }`}
        </span>
        <button style={{ float: "right" }}>
          {t("calendar.download")}
          <FontAwesomeIcon icon={faFileDownload} size={"xl"} className="icn" />
        </button>
      </div>
      <div className="calendar-header">
        <div className="calendar-corner"></div>
        <div className="calendar-days">
          {currentWeek.map((weekDay) => (
            <CalendarDay key={weekDay.name} {...weekDay} />
          ))}
        </div>
      </div>
      <div className="calendar-content">
        <TimeMarker />
        <div className="calendar-hours">
          {[...Array(15)].map((e, i) => (
            <div className="hour" key={i}>
              {i + 8}:00
            </div>
          ))}
        </div>
        {[...Array(columns)].map((e, i) => (
          <CalendarColumn
            key={i}
            events={events && getDayEvents(i)}
            onHourClick={onHourClick}
            onEventClick={onEventClick}
            columnDay={currentWeek[i].fullDate}
          />
        ))}
      </div>
    </div>
  );
};

Calendar.defaultProps = {
  isEditable: false,
};

export default Calendar;
