"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DateInputProps {
  defaultValue?: string; // formato YYYY-MM-DD
  onChange?: (date: string | null) => void;
}

const DateInput: React.FC<DateInputProps> = ({ defaultValue, onChange }) => {
  const today = new Date();
  const maxYear = today.getFullYear() - 18;

  const [day, setDay] = useState<string>(defaultValue?.split("-")[2] || "");
  const [month, setMonth] = useState<string>(defaultValue?.split("-")[1] || "");
  const [year, setYear] = useState<string>(defaultValue?.split("-")[0] || "");

  const handleChange = (newDay: string, newMonth: string, newYear: string) => {
    setDay(newDay);
    setMonth(newMonth);
    setYear(newYear);

    const isComplete =
      newDay.length === 2 && newMonth.length === 2 && newYear.length === 4;
    if (isComplete) {
      const formattedDate = `${newYear}-${newMonth}-${newDay}`;
      const parsedDate = new Date(formattedDate);
      if (!isNaN(parsedDate.getTime()) && parsedDate.getFullYear() <= maxYear) {
        onChange?.(formattedDate);
      } else {
        onChange?.(null);
      }
    } else {
      onChange?.(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>Fecha (mayores de 18 años)</Label>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="DD"
          maxLength={2}
          value={day}
          onChange={(e) => handleChange(e.target.value, month, year)}
          className="w-16 text-center"
        />
        <Input
          type="text"
          placeholder="MM"
          maxLength={2}
          value={month}
          onChange={(e) => handleChange(day, e.target.value, year)}
          className="w-16 text-center"
        />
        <Input
          type="text"
          placeholder="YYYY"
          maxLength={4}
          value={year}
          onChange={(e) => handleChange(day, month, e.target.value)}
          className="w-24 text-center"
        />
      </div>
    </div>
  );
};

export default DateInput;
