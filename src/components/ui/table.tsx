'use client';

import { forwardRef } from 'react';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

export const Table = forwardRef<HTMLTableElement, TableProps>(
    ({ className = '', ...props }, ref) => (
        <div className="relative w-full overflow-auto">
            <table
                ref={ref}
                className={`w-full caption-bottom text-sm ${className}`}
                {...props}
            />
        </div>
    )
);

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
    ({ className = '', ...props }, ref) => (
        <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
    )
);

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
    ({ className = '', ...props }, ref) => (
        <tbody
            ref={ref}
            className={`[&_tr:last-child]:border-0 ${className}`}
            {...props}
        />
    )
);

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
    ({ className = '', ...props }, ref) => (
        <tr
            ref={ref}
            className={`border-b transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-50 ${className}`}
            {...props}
        />
    )
);

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
    ({ className = '', ...props }, ref) => (
        <th
            ref={ref}
            className={`h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 ${className}`}
            {...props}
        />
    )
);

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
    ({ className = '', ...props }, ref) => (
        <td
            ref={ref}
            className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
            {...props}
        />
    )
); 