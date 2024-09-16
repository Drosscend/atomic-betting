import { format, setHours, setMinutes } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Control, ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateTimePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  minDate?: Date;
}

export function DateTimePicker<T extends FieldValues>({ control, name, label, minDate }: DateTimePickerProps<T>) {
  const handleDateChange = (date: Date | undefined, field: ControllerRenderProps<T, Path<T>>) => {
    if (date) {
      const currentDate = field.value || new Date();
      const newDate = setMinutes(setHours(date, currentDate.getHours()), currentDate.getMinutes());
      field.onChange(newDate);
    }
  };

  const handleHourChange = (event: React.ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<T, Path<T>>) => {
    const hours = parseInt(event.target.value, 10);
    if (!isNaN(hours) && hours >= 0 && hours < 24) {
      const newDate = setHours(field.value || new Date(), hours);
      field.onChange(newDate);
    }
  };

  const handleMinuteChange = (event: React.ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<T, Path<T>>) => {
    const minutes = parseInt(event.target.value, 10);
    if (!isNaN(minutes) && minutes >= 0 && minutes < 60) {
      const newDate = setMinutes(field.value || new Date(), minutes);
      field.onChange(newDate);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col">
          <FormLabel>{label}</FormLabel>
          <div className="flex w-full flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn("w-full pl-3 text-left font-normal sm:w-[240px]", !field.value && "text-muted-foreground")}
                  >
                    {field.value ? format(field.value, "PPP", { locale: fr }) : <span>{`Choisir une date`}</span>}
                    <CalendarIcon className="ml-auto size-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => handleDateChange(date, field)}
                  disabled={(date) => (minDate ? date < minDate : false)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <div className="flex w-full space-x-2 sm:w-auto">
              <FormControl>
                <Input
                  type="number"
                  value={field.value ? field.value.getHours().toString().padStart(2, "0") : ""}
                  onChange={(e) => handleHourChange(e, field)}
                  min={0}
                  max={23}
                  className="w-full sm:w-[60px]"
                  placeholder="HH"
                />
              </FormControl>
              <span className="flex items-center">:</span>
              <FormControl>
                <Input
                  type="number"
                  value={field.value ? field.value.getMinutes().toString().padStart(2, "0") : ""}
                  onChange={(e) => handleMinuteChange(e, field)}
                  min={0}
                  max={59}
                  className="w-full sm:w-[60px]"
                  placeholder="MM"
                />
              </FormControl>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
