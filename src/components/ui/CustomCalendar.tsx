"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomCalendarProps {
  value: string;
  onChange: (val: string) => void;
}

export default function CustomCalendar({ value, onChange }: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = value ? new Date(value) : new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    if (prev >= thisMonthStart) {
      setCurrentMonth(prev);
    }
  };

  const startDay = currentMonth.getDay();
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  const isSelected = (d: Date) => value && d.toISOString().split("T")[0] === value;
  const isDisabled = (d: Date) => d < today;

  const getDayBtnClass = (d: Date | null) => {
    if (!d) return "p-2";
    const selected = isSelected(d);
    const disabled = isDisabled(d);

    let base = "w-10 h-10 flex items-center justify-center text-sm transition-all mx-auto rounded-full ";

    if (selected)
      base +=
        "bg-gradient-to-br from-primary to-purple-500 text-white shadow-md shadow-primary/40 font-bold scale-110";
    else if (disabled) base += "text-gray-400 opacity-50 cursor-not-allowed";
    else base += "text-gray-700 hover:bg-white/80 hover:shadow-sm";

    return base;
  };

  const formatMonth = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="p-4 bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-4 px-2">
        <button
          type="button"
          onClick={prevMonth}
          className="p-1 rounded-full text-gray-500 hover:bg-black/5"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold text-gray-800">{formatMonth}</span>
        <button
          type="button"
          onClick={nextMonth}
          className="p-1 rounded-full text-gray-500 hover:bg-black/5"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-y-2 gap-x-1">
        {weekDays.map((day) => (
          <div key={day} className="text-xs font-semibold text-gray-400 mb-2 text-center">
            {day}
          </div>
        ))}
        {days.map((d, i) => (
          <div key={i} className="flex justify-center">
            {d ? (
              <button
                type="button"
                disabled={isDisabled(d)}
                onClick={() => {
                  const localDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
                  onChange(localDate.toISOString().split("T")[0]);
                }}
                className={getDayBtnClass(d)}
              >
                {d.getDate()}
              </button>
            ) : (
              <div className="w-10 h-10" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
