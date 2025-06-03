'use client';
import React from 'react'

type CustomCheckboxProps = {
    onCheck?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
}
export default function CustomCheckbox({ onCheck = () => { }, checked = false }: CustomCheckboxProps) {
    return (
        <label className="inline-flex items-center cursor-pointer space-x-2 select-none">
            <div className="relative">
                <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={checked}
                    onChange={onCheck}
                />
                <div className="h-6 w-6 rounded border border-checkBoxBorder  transition-all duration-200 flex items-center justify-center">
                    <svg
                        className={`w-3 h-3 text-blue-500 ${checked ? 'opacity-100' : 'opacity-0'} transition-opacity duration-150`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>
        </label>
    );
}
