
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { generateDate, months } from "./util/calendar";
import cn from "./util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function Main() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState({ title: "", description: "" });

  const handleAddEvent = () => {
    if (newEvent.title.trim() !== "") {
      const formattedDate = selectDate.format("YYYY-MM-DD");

      // Prompt user for event timing and AM/PM
      const userInputTime = window.prompt("Enter event timing (HH:mm):", "");
      const userInputAMPM = window.prompt("Enter AM or PM:", "");
      const userInput = `${userInputTime} ${userInputAMPM}`;

      const updatedEvents = {
        ...events,
        [formattedDate]: [
          ...(events[formattedDate] || []),
          { ...newEvent, time: userInput },
        ],
      };
      setEvents(updatedEvents);
      setNewEvent({ title: "", description: "" });
    }
  };

  const handleDeleteEvent = (date, index) => {
    const updatedEvents = { ...events };
    updatedEvents[date] = events[date].filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  const handleToggleComplete = (date, index) => {
    const updatedEvents = { ...events };
    updatedEvents[date][index].completed = !updatedEvents[date][index].completed;
    setEvents(updatedEvents);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentEvents = events[selectDate.format("YYYY-MM-DD")];
      if (currentEvents) {
        currentEvents.forEach((event) => {
          const eventTime = dayjs(event.time, "HH:mm A");
          const currentTime = dayjs();
          if (currentTime.isSameOrAfter(eventTime, "minute")) {
            alert(`Event time exceeded for ${event.title} at ${event.time}`);
          } else if (currentTime.isSame(eventTime, "minute")) {
            alert(`Event time reached for ${event.title} at ${event.time}`);
          }
        });
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, [selectDate, events]);

  return (
    <div className="flex gap-10 sm:divide-x justify-center sm:w-4/5 mx-auto h-screen items-center sm:flex-row flex-col">
      <div className="w-150 h-150">
        <div className="flex justify-between items-center">
          <h1 className="select-none font-semibold text-3xl mb-4 mt-2">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex gap-10 items-center">
            <GrFormPrevious
              className="w-8 h-8 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className="cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1>
            <GrFormNext
              className="w-8 h-8 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <h1
              key={index}
              className="text-lg text-center h-20 w-20 grid place-content-center text-gray-500 select-none"
            >
              {day}
            </h1>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 text-center h-20 grid place-content-center text-lg border-t",
                  today ? "bg-red-600 text-white shadow-md" : "",
                  selectDate.toDate().toDateString() ===
                    date.toDate().toDateString()
                    ? "bg-black text-white shadow-md"
                    : "",
                  "h-16 w-16 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                )}
                onClick={() => {
                  setSelectDate(date);
                }}
              >
                {date.date()}
              </div>
            )
          )}
        </div>
      </div>
      <div className="h-96 w-96 sm:px-5 mb-20">
        <h1 className="font-semibold text-3xl mb-6 mb-4">
          Schedule for {selectDate.toDate().toDateString()}
        </h1>
        {events[selectDate.format("YYYY-MM-DD")]?.length === 0 ? (
          <p className="text-gray-400">No events for today.</p>
        ) : (
          <ul className="space-y-2">
            {events[selectDate.format("YYYY-MM-DD")]?.map((event, index) => (
              <li key={index} className="mb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={event.completed}
                      onChange={() =>
                        handleToggleComplete(selectDate.format("YYYY-MM-DD"), index)
                      }
                      className="mr-2"
                    />
                    <strong className={`text-xl ${event.completed && 'line-through'}`}>
                      {event.title}
                    </strong>
                  </div>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                    onClick={() =>
                      handleDeleteEvent(selectDate.format("YYYY-MM-DD"), index)
                    }
                  >
                    Delete
                  </button>
                </div>
                <p>{event.description}</p>
                {event.time && <p className="text-gray-500">Timing: {event.time}</p>}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex justify-between">
          <input
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            className="border-green-500 border-2 flex-grow mr-2"
          />
          <input
            type="text"
            placeholder="Event Description"
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
            className="border-green-500 border-2 flex-grow mr-2"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
            onClick={handleAddEvent}
          >
            Add Event
          </button>
          {newEvent.time && (
            <p className="text-gray-500">Timing: {newEvent.time}</p>
          )}
        </div>
      </div>
    </div>
  );
}
