"use client";

import { format, setHours, setMinutes } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateTimePickerProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  label: string;
  minDate?: Date;
}

export function DateTimePicker<T extends FieldValues>({ field, label, minDate }: DateTimePickerProps<T>) {
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const currentDate = field.value || new Date();
      const newDate = setMinutes(setHours(date, currentDate.getHours()), currentDate.getMinutes());
      field.onChange(newDate);
    }
  };

  const handleHourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hours = parseInt(event.target.value, 10);
    if (!isNaN(hours) && hours >= 0 && hours < 24) {
      const newDate = setHours(field.value || new Date(), hours);
      field.onChange(newDate);
    }
  };

  const handleMinuteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minutes = parseInt(event.target.value, 10);
    if (!isNaN(minutes) && minutes >= 0 && minutes < 60) {
      const newDate = setMinutes(field.value || new Date(), minutes);
      field.onChange(newDate);
    }
  };

  return (
    <FormItem className="flex flex-col">
      <FormLabel>{label}</FormLabel>
      <div className="flex space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Choisir une date</span>}
                <CalendarIcon className="ml-auto size-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={handleDateChange}
              disabled={(date) => (minDate ? date < minDate : false)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <FormControl>
          <Input
            type="number"
            value={field.value ? field.value.getHours().toString().padStart(2, "0") : ""}
            onChange={handleHourChange}
            min={0}
            max={23}
            className="w-[60px]"
            placeholder="HH"
          />
        </FormControl>
        <span className="flex items-center">:</span>
        <FormControl>
          <Input
            type="number"
            value={field.value ? field.value.getMinutes().toString().padStart(2, "0") : ""}
            onChange={handleMinuteChange}
            min={0}
            max={59}
            className="w-[60px]"
            placeholder="MM"
          />
        </FormControl>
      </div>
      <FormMessage />
    </FormItem>
  );
}
