"use client";

import { useState } from 'react';

import { CreditCard, Smartphone, Wallet } from 'lucide-react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/button';


type PaymentMethod = 'upi' | 'card' | 'wallet';

const _PaymentModal = ({
    amount,
    onSuccess,
    onClose
}: {
    amount: string;
    onSuccess: () => void;
    onClose: () => void;
}): JSX.Element => {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const _handlePayment = () => {
        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            onSuccess();
        }, 2000);
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Complete Payment</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium mb-3">Select Payment Method</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                className={`p-4 border rounded-lg flex flex-col items-center ${selectedMethod === 'upi' ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'
                                    }`}
                                onClick={() => setSelectedMethod('upi')}
                            >
                                <Smartphone className="h-6 w-6 text-primary mb-2" />
                                <span className="text-sm">UPI</span>
                            </button>
                            <button
                                className={`p-4 border rounded-lg flex flex-col items-center ${selectedMethod === 'card' ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'
                                    }`}
                                onClick={() => setSelectedMethod('card')}
                            >
                                <CreditCard className="h-6 w-6 text-primary mb-2" />
                                <span className="text-sm">Card</span>
                            </button>
                            <button
                                className={`p-4 border rounded-lg flex flex-col items-center ${selectedMethod === 'wallet' ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'
                                    }`}
                                onClick={() => setSelectedMethod('wallet')}
                            >
                                <Wallet className="h-6 w-6 text-primary mb-2" />
                                <span className="text-sm">Wallet</span>
                            </button>
                        </div>
                    </div>

                    {selectedMethod && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium">Amount to pay:</span>
                                <span className="text-lg font-bold">{amount}</span>
                            </div>

                            <Button
                                className="w-full"
                                onClick={_handlePayment}
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing...' : 'Pay Now'}
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default _PaymentModal;
