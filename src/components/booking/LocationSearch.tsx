"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import * as Sentry from "@sentry/nextjs";
import { useTranslation } from "next-i18next";
import type { Control, FieldError} from "react-hook-form";
import { useController } from "react-hook-form";

import { useDebounce } from "@/hooks/useDebounce";
import { usePlacesAutocomplete } from "@/hooks/usePlacesAutocomplete";

export interface LocationSearchProps {
	name: string;
	control: Control<any>;
	label: string;
	placeholder: string;
	error?: FieldError;
	disabled?: boolean;
	"aria-required"?: "true" | "false";
	"aria-invalid"?: "true" | "false";
	"aria-describedby"?: string;
}

export default function LocationSearch({
	name,
	control,
	label,
	placeholder,
	error,
	disabled = false,
	"aria-required": ariaRequired,
	"aria-invalid": ariaInvalid,
	"aria-describedby": ariaDescribedby,
}: LocationSearchProps): JSX.Element {
	const { t } = useTranslation();
	const [query, setQuery] = useState("");
	const debouncedQuery = useDebounce(query, 300);
	const inputRef = useRef<HTMLInputElement>(null);

	const {
		field: { value, onChange },
		fieldState: { error: fieldError },
	} = useController({
		name,
		control,
	});

	const { suggestions, loading, error: placesError } = usePlacesAutocomplete(
		debouncedQuery
	);

	useEffect(() => {
		if (placesError) {
			Sentry.captureException(placesError, {
				tags: { component: "LocationSearch" },
				extra: { query: debouncedQuery },
			});
		}
	}, [placesError, debouncedQuery]);

	const handleSelect = useCallback(
		(selectedValue: string) => {
			onChange(selectedValue);
			setQuery(selectedValue);
		},
		[onChange]
	);

	const handleInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setQuery(event.target.value);
			onChange(event.target.value);
		},
		[onChange]
	);

	return (
		<div className="relative">
			<Combobox
				value={value}
				onChange={handleSelect}
				disabled={disabled}
				as="div"
				className="relative"
			>
				<Combobox.Label
					className="block text-sm font-medium text-gray-700 mb-1"
					id={`${name}-label`}
				>
					{label}
				</Combobox.Label>
				<div className="relative">
					<Combobox.Input
						ref={inputRef}
						className={`w-full px-3 py-2 border rounded-md ${
							error || fieldError ? "border-red-500" : "border-gray-300"
						} ${disabled ? "bg-gray-100" : ""} ${
							loading ? "pr-10" : "pr-8"
						} focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200`}
						onChange={handleInputChange}
						displayValue={(value: string) => value}
						placeholder={placeholder}
						disabled={disabled}
						aria-required={ariaRequired}
						aria-invalid={ariaInvalid}
						aria-describedby={ariaDescribedby}
						aria-labelledby={`${name}-label`}
					/>
					<Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2">
						<ChevronUpDownIcon
							className="h-5 w-5 text-gray-400"
							aria-hidden="true"
						/>
					</Combobox.Button>
					{loading && (
						<div className="absolute inset-y-0 right-8 flex items-center px-2">
							<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
						</div>
					)}
				</div>

				{(error || fieldError) && (
					<p
						className="text-red-500 text-sm mt-1"
						role="alert"
						id={`${name}-error`}
					>
						{error?.message || fieldError?.message}
					</p>
				)}

				{suggestions.length > 0 && (
					<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{suggestions.map((suggestion) => (
							<Combobox.Option
								key={suggestion.place_id}
								value={suggestion.description}
								className={({ active }) =>
									`relative cursor-default select-none py-2 pl-10 pr-4 ${
										active ? "bg-primary text-white" : "text-gray-900"
									}`
								}
							>
								{({ selected, active }) => (
									<>
										<span
											className={`block truncate ${
												selected ? "font-medium" : "font-normal"
											}`}
										>
											{suggestion.description}
										</span>
										{selected && (
											<span
												className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
													active ? "text-white" : "text-primary"
												}`}
											>
												<CheckIcon className="h-5 w-5" aria-hidden="true" />
											</span>
										)}
									</>
								)}
							</Combobox.Option>
						))}
					</Combobox.Options>
				)}

				{placesError && (
					<p className="text-red-500 text-sm mt-1" role="alert">
						{t("Failed to load location suggestions")}
					</p>
				)}
			</Combobox>
		</div>
	);
}
