import Input from "@/components/ui/input/input";
import { FieldComponents, FieldSectionProps } from "../interfaces/interfaces";
import { cloneElement } from "react";


const fieldComponents: FieldComponents = {
    text: <Input type="text" />,
    date: <Input type="date" />,
};

export const FieldSection = ({ title, fields, onChange }: FieldSectionProps) => {
    return (
        <>
            <h2 className="font-bold text-gray-900 sm:truncate sm:text-1xl sm:tracking-tight">{title}</h2>
            <div className={`grid grid-cols-1 gap-2 pb-2 ${!title ? "md:grid-cols-3" : "md:grid-cols-5"}`}>
                {fields.map((field) => (
                    <div key={field.name}>
                        <label className="text-sm font-normal">{field.label}</label>
                        {fieldComponents[field.type] && (
                            cloneElement(fieldComponents[field.type], {
                                name: field.name,
                                value: field.value,
                                onChange: onChange,
                            })
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};