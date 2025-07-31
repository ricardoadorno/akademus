import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxWithTextProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    label: string;
    description?: string;
    disabled?: boolean;
}

export const CheckboxWithText = ({
    checked,
    onCheckedChange,
    label,
    description,
    disabled = false,
}: CheckboxWithTextProps) => {
    return (
        <div className="flex items-start space-x-3">
            <Checkbox
                checked={checked}
                onCheckedChange={onCheckedChange}
                disabled={disabled}
                id={`checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`}
            />
            <div className="grid gap-1.5 leading-none">
                <label
                    htmlFor={`checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {label}
                </label>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </div>
        </div>
    );
};
