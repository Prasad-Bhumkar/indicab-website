'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import * as Sentry from '@sentry/nextjs';
import { useState } from 'react';

export default function SentryExamplePage() {
    const [error, setError] = useState<string | null>(null);

    const throwError = () => {
        try {
            throw new Error('This is a test error');
        } catch (e) {
            Sentry.captureException(e);
            setError('Error captured by Sentry!');
        }
    };

    const logMessage = () => {
        Sentry.captureMessage('This is a test message', 'info');
        setError('Message captured by Sentry!');
    };

    const simulateAsyncError = async () => {
        try {
            await new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error('Async error after 2 seconds'));
                }, 2000);
            });
        } catch (e) {
            Sentry.captureException(e);
            setError('Async error captured by Sentry!');
        }
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Sentry Error Tracking Examples</h1>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Throw Error</CardTitle>
                        <CardDescription>Capture a synchronous error</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={throwError} variant="destructive">
                            Throw Error
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Log Message</CardTitle>
                        <CardDescription>Send an info message to Sentry</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={logMessage} variant="secondary">
                            Log Message
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Async Error</CardTitle>
                        <CardDescription>Simulate an asynchronous error</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={simulateAsyncError} variant="outline">
                            Simulate Async Error
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {error && (
                <div className="mt-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    {error}
                </div>
            )}

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">How to Check Sentry</h2>
                <ol className="list-decimal list-inside space-y-2">
                    <li>Go to your Sentry dashboard</li>
                    <li>Look for the "Issues" section</li>
                    <li>You should see the errors and messages you triggered</li>
                    <li>Click on an issue to see detailed information</li>
                </ol>
            </div>
        </main>
    );
} 