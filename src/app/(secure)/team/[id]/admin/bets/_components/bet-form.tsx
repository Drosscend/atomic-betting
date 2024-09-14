"use client";

import { betSchema } from "@/app/(secure)/team/[id]/admin/bets/bet.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import { PlusCircle, Trash2 } from "lucide-react";
import { z } from "zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { DateTimePicker } from "@/components/forms/date-time-picker";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface CreateBetFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultData?: z.infer<typeof betSchema>;
  onSubmit: (data: z.infer<typeof betSchema>) => void;
}

export function BetForm({ open, onOpenChange, defaultData, onSubmit }: CreateBetFormProps) {
  const form = useForm<z.infer<typeof betSchema>>({
    resolver: zodResolver(betSchema),
    defaultValues: defaultData || {
      question: "",
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      minPoints: 10,
      maxPoints: 250000,
      responses: [{ response: "" }],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "responses",
    control: form.control,
  });

  useEffect(() => {
    if (defaultData) {
      form.reset(defaultData);
    }
  }, [defaultData, form]);

  const handleSubmit = async (data: z.infer<typeof betSchema>) => {
    onSubmit(data);
    if (!defaultData) {
      form.reset();
    }
    onOpenChange(false);
  };

  const isEditMode = !!defaultData;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex h-full flex-col">
        <SheetHeader className="shrink-0">
          <SheetTitle>{isEditMode ? "Modifier le pari" : "Créer un nouveau pari"}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex h-full flex-col">
            <div className="-mr-4 grow space-y-4 overflow-y-auto pb-4 pr-4">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez la question du pari" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => <DateTimePicker field={field} label="Date de début" minDate={new Date()} />}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => <DateTimePicker field={field} label="Date de fin" minDate={form.getValues().startDate} />}
              />
              <FormField
                control={form.control}
                name="minPoints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points minimum</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxPoints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points maximum</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel>Réponses</FormLabel>
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`responses.${index}.response`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="mt-2 flex items-center space-x-2">
                          <FormControl>
                            <Input {...field} placeholder={`Réponse ${index + 1}`} />
                          </FormControl>
                          <Button type="button" variant="outline" size="icon" onClick={() => remove(index)} disabled={fields.length === 1}>
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ response: "" })}>
                  <PlusCircle className="mr-2 size-4" />
                  Ajouter une réponse
                </Button>
              </div>
            </div>
            <div className="shrink-0 border-t pt-4">
              <Button type="submit" className="w-full">
                {isEditMode ? "Modifier le pari" : "Créer le pari"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
