import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DateTimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  label?: string;
  minDate?: Date;
  value?: Date | string;
  onChange?: (date: Date) => void;
}

const DateTimePicker = React.forwardRef<HTMLInputElement, DateTimePickerProps>(({ className, label, minDate, onChange, value, ...props }, ref) => {
  const [date, setDate] = React.useState<Date | undefined>(() => {
    if (value instanceof Date) return value;
    if (typeof value === "string") return parseISO(value);
    return undefined;
  });
  const [hours, setHours] = React.useState(date ? date.getHours().toString().padStart(2, "0") : "");
  const [minutes, setMinutes] = React.useState(date ? date.getMinutes().toString().padStart(2, "0") : "");

  React.useEffect(() => {
    if (value instanceof Date) setDate(value);
    else if (typeof value === "string") setDate(parseISO(value));
  }, [value]);

  const updateValue = (newDate: Date) => {
    setDate(newDate);
    setHours(newDate.getHours().toString().padStart(2, "0"));
    setMinutes(newDate.getMinutes().toString().padStart(2, "0"));
    onChange && onChange(newDate);
  };

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      const updatedDate = new Date(newDate);
      updatedDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      updateValue(updatedDate);
    }
  };

  const handleHourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHours = event.target.value.padStart(2, "0");
    setHours(newHours);
    if (date && parseInt(newHours, 10) >= 0 && parseInt(newHours, 10) < 24) {
      const newDate = new Date(date);
      newDate.setHours(parseInt(newHours, 10));
      updateValue(newDate);
    }
  };

  const handleMinuteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = event.target.value.padStart(2, "0");
    setMinutes(newMinutes);
    if (date && parseInt(newMinutes, 10) >= 0 && parseInt(newMinutes, 10) < 60) {
      const newDate = new Date(date);
      newDate.setMinutes(parseInt(newMinutes, 10));
      updateValue(newDate);
    }
  };

  return (
    <FormItem className={cn("flex flex-col", className)}>
      {label && <FormLabel>{label}</FormLabel>}
      <div className="flex space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !date && "text-muted-foreground")}>
                {date ? format(date, "PPP", { locale: fr }) : <span>Choisir une date</span>}
                <CalendarIcon className="ml-auto size-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              disabled={(date) => (minDate ? date < minDate : false)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <FormControl>
          <Input type="number" value={hours} onChange={handleHourChange} min={0} max={23} className="w-[60px]" placeholder="HH" />
        </FormControl>
        <span className="flex items-center">:</span>
        <FormControl>
          <Input type="number" value={minutes} onChange={handleMinuteChange} min={0} max={59} className="w-[60px]" placeholder="MM" />
        </FormControl>
      </div>
      <input type="hidden" ref={ref} {...props} value={date ? date.toISOString() : ""} />
      <FormMessage />
    </FormItem>
  );
});

DateTimePicker.displayName = "DateTimePicker";

export { DateTimePicker };
