'use client';

import { Calendar as CalendarIcon } from 'lucide-react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    placeholderText?: string;
    minDate?: Date;
    maxDate?: Date;
    className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    selected,
    onChange,
    placeholderText = 'Select date',
    minDate,
    maxDate,
    className = '',
}) => {
    return (
        <div className="relative">
            <ReactDatePicker
                selected={selected}
                onChange={onChange}
                dateFormat="yyyy-MM-dd"
                placeholderText={placeholderText}
                minDate={minDate}
                maxDate={maxDate}
                className={`w-full rounded-md border border-gray-300 px-3 py-2 pl-10 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 ${className}`}
            />
            <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
    );
}; 