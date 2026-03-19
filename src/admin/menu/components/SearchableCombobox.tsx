import { useCallback, useState, useMemo, useEffect } from "react";
import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
} from "@/components/ui/combobox";

interface SearchableComboboxProps {
    options: { label: string; value: string }[];
    value: string;
    onValueChange: (val: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

export function SearchableCombobox({
    options,
    value,
    onValueChange,
    placeholder = "Seleccione...",
    className = "w-full",
    disabled = false,
}: SearchableComboboxProps) {
    const [inputValue, setInputValue] = useState(value);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) setInputValue(value);
    }, [value, open]);

    const handleValueChange = useCallback((val: string | null) => {
        onValueChange(val ?? "");
    }, [onValueChange]);

    const handleOpenChange = useCallback((newOpen: boolean) => {
        if (disabled) return;
        setOpen(newOpen);
        setInputValue(newOpen ? "" : value);
    }, [value, disabled]);

    const itemsToRender = useMemo(() => {
        if (!inputValue || inputValue === value) return options;
        const lower = inputValue.toLowerCase();
        return options.filter((o) => o.label.toLowerCase().includes(lower));
    }, [options, inputValue, value]);

    return (
        <Combobox
            value={value}
            onValueChange={handleValueChange}
            inputValue={inputValue}
            onInputValueChange={setInputValue}
            open={open}
            onOpenChange={handleOpenChange}
            disabled={disabled}
        >
            <ComboboxInput
                placeholder={placeholder}
                className={`${className} h-8 px-3 py-1 text-sm border-input rounded-md max-w-full relative`}
                showClear={false}
                disabled={disabled}
            />
            <ComboboxContent>
                <ComboboxList>
                    {itemsToRender.length > 0 ? (
                        itemsToRender.map((o) => (
                            <ComboboxItem key={o.value} value={o.value}>
                                {o.label}
                            </ComboboxItem>
                        ))
                    ) : (
                        <div className="py-2 text-center text-sm text-muted-foreground w-full">
                            Sin resultados
                        </div>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}
