"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input, InputProps } from "@/components/ui/input";

type DebounceInputType = "text" | "number" | "email" | "password" | "tel" | "url";

type DebounceInputValue<T extends DebounceInputType> = T extends "number" ? number : string;

interface DebounceInputProps<T extends DebounceInputType> extends Omit<InputProps, "onChange" | "value" | "type"> {
  type: T;
  value: DebounceInputValue<T>;
  onChange: (value: DebounceInputValue<T>) => void;
  debounceTimeout?: number;
}

export default function DebounceInput<T extends DebounceInputType>({
  value: initialValue,
  onChange,
  debounceTimeout = 500,
  type,
  ...props
}: DebounceInputProps<T>) {
  const [value, setValue] = useState<DebounceInputValue<T>>(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value !== initialValue) {
      timeoutRef.current = setTimeout(() => {
        onChange(value);
      }, debounceTimeout);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, onChange, debounceTimeout, initialValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue =
      type === "number"
        ? ((e.target.value === "" ? "" : Number(e.target.value)) as DebounceInputValue<T>)
        : (e.target.value as DebounceInputValue<T>);
    setValue(newValue);
  };

  return <Input {...props} type={type} value={value.toString()} onChange={handleChange} />;
}
