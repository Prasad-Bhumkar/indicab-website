'use client'
import { useState } from 'react'

export default function TestErrorPage(): JSX.Element {
    const [triggerError, setTriggerError] = useState(false)

    if (triggerError) {
        throw new Error('This is a test error from the error page')
    }

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Error Testing Page</h1>

            <div className="space-y-4">
                <button
                    onClick={() => setTriggerError(true)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Trigger Client Error
                </button>

                <button
                    onClick={async () => {
                        try {
                            await fetch('/api/errors', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    message: 'Test API error report',
                                    stack: 'Test stack trace',
                                    url: window.location.href
                                })
                            })
                            alert('Error reported successfully!')
                        } catch (err) {
                            alert('Error reporting failed')
                        }
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Test Error Reporting API
                </button>
            </div>
        </div>
    )
}
