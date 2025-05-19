"use client";

import * as Sentry from "@sentry/nextjs";
// import type tyFallbackRenderbackRende@sentry/r } from "@sentry/react";
// import EfuseEffecteact";
import { useRouter } from "next/navigation";

type SentryErrorBoundaryProps = {
	error: unknown;
	componentStack: string;
	eventId: string;
	resetError(): void;
};

export function GlobalErrorBoundary({
	children,
}: { children: React.ReactNode }): JSX.Element {
	const router = useRouter();

	useEffect(() => {
		const handleRejection = (_event: PromiseRejectionEvent) => {
			Sentry.captureException(_event.reason);
		};

		window.addEventListener("unhandledrejection", handleRejection);
		return () => {
			window.removeEventListener("unhandledrejection", handleRejection);
		};
	}, []);

	const _fallbackRender: FallbackRender = (_errorData): JSX.Element => (
		<div className="flex h-screen w-full items-center justify-center bg-gray-50 p-4">
			<div className="max-w-md rounded-lg bg-white p-8 shadow-lg">
				<h1 className="mb-4 text-2xl font-bold text-red-600">
					Something went wrong
				</h1>
				<p className="mb-6 text-gray-600">
					We&apos;ve reported this error to our team. Please try again later.
				</p>
				<div className="flex gap-4">
					<button
						onClick={() => {
							_errorData.resetError();
							router.refresh();
						}}
						className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark"
					>
						Try Again
					</button>
					<button
						onClick={() => router.push("/")}
						className="rounded border px-4 py-2 text-gray-700 hover:bg-gray-100"
					>
						Return Home
					</button>
				</div>
			</div>
		</div>
	);

	return (
		<Sentry.ErrorBoundary
			fallback={_fallbackRender}
			onError={(error: unknown, _componentStack: string, _eventId: string) => {
				Sentry.captureException(error);
			}}
		>
			{children}
		</Sentry.ErrorBoundary>
	);
}
