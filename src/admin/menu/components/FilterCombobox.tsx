import { useCallback } from "react";
import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
    ComboboxEmpty,
} from "@/components/ui/combobox";

interface FilterComboboxProps {
    label: string;
    options: { id: number | null; detalle: string }[];
    value: number | null;
    onChange: (value: number | null) => void;
    placeholder?: string;
    className?: string;
}

export function FilterCombobox({
    label,
    options,
    value,
    onChange,
    placeholder = "Buscar...",
    className = "w-[130px]",
}: FilterComboboxProps) {
    const allOptions = [{ id: null, detalle: "Todos" }, ...options.filter(o => o.id !== null)];
    const selectedLabel = allOptions.find((o) => o.id === value)?.detalle ?? "Todos";

    const handleValueChange = useCallback((val: string | null) => {
        if (val === null) {
            onChange(null);
            return;
        }
        const found = allOptions.find((o) => o.detalle === val);
        onChange(found?.id ?? null);
    }, [allOptions, onChange]);

    return (
        <div className="flex items-center gap-2">
            {label && <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{label}</span>}
            <Combobox
                value={selectedLabel}
                onValueChange={handleValueChange}
            >
                <ComboboxInput
                    placeholder={placeholder}
                    className={`${className} h-8 text-sm`}
                    showClear={false}
                />
                <ComboboxContent>
                    <ComboboxList>
                        <ComboboxEmpty>Sin resultados</ComboboxEmpty>
                        {allOptions.map((opt) => (
                            <ComboboxItem key={String(opt.id)} value={opt.detalle}>
                                {opt.detalle}
                            </ComboboxItem>
                        ))}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </div>
    );
}
