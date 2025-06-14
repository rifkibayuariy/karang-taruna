"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type InputHTMLAttributes,
} from "react";

interface CurrencyInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: number;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RupiahCurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, disabled = false, value = 0, onChange, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => internalRef.current as HTMLInputElement);

    const formatRupiah = (nominal: number | string) => {
      const number =
        typeof nominal === "number"
          ? nominal
          : Number(nominal.replace(/\D/g, ""));
      const formatted = new Intl.NumberFormat("id-ID").format(number);
      return `Rp. ${formatted}`;
    };

    const displayValue = formatRupiah(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;

      if (!input.startsWith("Rp. ")) return;

      if (onChange) {
        onChange(input);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const cursorPos = (e.target as HTMLInputElement).selectionStart;

      if (
        e.key === "Backspace" &&
        cursorPos !== null &&
        cursorPos <= 4 // "Rp. "
      ) {
        e.preventDefault();
      }
    };

    return (
      <input
        ref={internalRef}
        type="text"
        value={displayValue}
        inputMode="numeric"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={className}
        disabled={disabled}
        {...props}
      />
    );
  }
);

RupiahCurrencyInput.displayName = "RupiahCurrencyInput";

export { RupiahCurrencyInput };
