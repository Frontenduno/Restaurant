import { useCallback, useState, useMemo, useEffect } from "react";
import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
} from "@/components/ui/combobox";

interface FilterComboboxProps {
    label: string;
    options: { id: number | null; detalle: string }[];
    value: number | null;
    onChange: (value: number | null) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

export function FilterCombobox({
    label,
    options,
    value,
    onChange,
    placeholder = "Buscar...",
    className = "w-32.5",
    disabled = false,
}: FilterComboboxProps) {
    const allOptions = useMemo(() => {
        return [{ id: null, detalle: "Todos" }, ...options.filter(o => o.id !== null)];
    }, [options]);

    const selectedLabel = useMemo(() => {
        return allOptions.find((o) => o.id === value)?.detalle ?? "Todos";
    }, [allOptions, value]);

    const [inputValue, setInputValue] = useState(selectedLabel);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) setInputValue(selectedLabel);
    }, [selectedLabel, open]);

    const handleValueChange = useCallback((val: string | null) => {
        if (val === null) { onChange(null); return; }
        const found = allOptions.find((o) => o.detalle === val);
        onChange(found?.id ?? null);
    }, [allOptions, onChange]);

    const handleOpenChange = useCallback((newOpen: boolean) => {
        if (disabled) return;
        setOpen(newOpen);
        setInputValue(newOpen ? "" : selectedLabel);
    }, [selectedLabel, disabled]);

    const itemsToRender = useMemo(() => {
        if (!inputValue || inputValue === selectedLabel) return allOptions;
        const lowerSearch = inputValue.toLowerCase();
        return allOptions.filter((opt) => opt.detalle.toLowerCase().includes(lowerSearch));
    }, [allOptions, inputValue, selectedLabel]);

    return (
        <div className="flex items-center gap-2">
            {label && <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{label}</span>}
            <Combobox
                value={selectedLabel}
                onValueChange={handleValueChange}
                inputValue={inputValue}
                onInputValueChange={setInputValue}
                open={open}
                onOpenChange={handleOpenChange}
                disabled={disabled}
            >
                <ComboboxInput
                    placeholder={placeholder}
                    className={`${className} h-8 text-sm`}
                    showClear={false}
                    disabled={disabled}
                />
                <ComboboxContent>
                    <ComboboxList>
                        {itemsToRender.length > 0 ? (
                            itemsToRender.map((opt) => (
                                <ComboboxItem key={String(opt.id) + opt.detalle} value={opt.detalle}>
                                    {opt.detalle}
                                </ComboboxItem>
                            ))
                        ) : (
                            <div className="py-2 text-center text-sm text-muted-foreground w-full flex justify-center">
                                Sin resultados
                            </div>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </div>
    );
}
