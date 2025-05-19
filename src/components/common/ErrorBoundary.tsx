"use client";

import type React from "react";
import { Component, type ReactNode } from "react";

import { AlertCircle, Home, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ErrorService } from "@/services/ErrorService";
import type { ErrorContext } from "@/types/errors";


interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: AppError, errorInfo: React.ErrorInfo) => void;
	onReset?: () => void;
	component?: string;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: AppError | null;
	errorInfo: React.ErrorInfo | null;
}

export default class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
		const _context: ErrorContext = {
			timestamp: new Date(),
		};
		const appError = ErrorService.handleError(error, "SERVER_ERROR", _context);
		return {
			hasError: true,
			error: appError,
			errorInfo: null,
		};
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		const _context: ErrorContext = {
			timestamp: new Date(),
		};
		const appError = ErrorService.handleError(error, "SERVER_ERROR", _context);

		this.setState({
			errorInfo,
			error: appError,
		});

		if (this.props.onError) {
			this.props.onError(appError, errorInfo);
		}
	}

	resetErrorBoundary = (): void => {
		const { onReset } = this.props;

		ErrorService.logInfo("Error boundary reset", {
			component: this.constructor.name,
			errorId: this.state.error?.id,
		});

		if (onReset) {
			onReset();
		}

		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
		});
	};

	render(): ReactNode {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<ErrorFallback
					error={this.state.error}
					onReset={this.resetErrorBoundary}
				/>
			);
		}

		return this.props.children;
	}
}

interface ErrorFallbackProps {
	error?: AppError | null;
	onReset?: () => void;
}

function ErrorFallback({ error, onReset }: ErrorFallbackProps): JSX.Element {
	const _router = useRouter();

	return (
		<div className="flex h-full min-h-[300px] w-full items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
			<div className="max-w-md rounded-lg bg-white dark:bg-gray-800 p-8 shadow-lg">
				<div className="flex items-center gap-3 mb-4">
					<AlertCircle className="h-8 w-8 text-red-500 dark:text-red-400" />
					<h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
						Something went wrong
					</h1>
				</div>

				{error && (
					<p className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400 text-sm">
						{error.message}
					</p>
				)}

				<p className="mb-6 text-gray-600 dark:text-gray-300">
					We&apos;re sorry for the inconvenience. Our team has been notified of
					this issue.
				</p>

				<div className="flex flex-col sm:flex-row gap-4">
					<Button
						onClick={onReset || (() => window.location.reload())}
						className="flex items-center gap-2"
						variant="outline"
					>
						<RefreshCw className="h-4 w-4" />
						Try Again
					</Button>

					<Button
						onClick={() => _router.push("/")}
						className="flex items-center gap-2"
					>
						<Home className="h-4 w-4" />
						Go to Homepage
					</Button>
				</div>
			</div>
		</div>
	);
}
