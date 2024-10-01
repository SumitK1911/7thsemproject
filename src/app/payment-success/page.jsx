'use client';
import { useSearchParams } from 'next/navigation';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();

  const amt = searchParams.get('amt');
  const oid = searchParams.get('oid');
  const refId = searchParams.get('refId');

  if (!amt || !oid || !refId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-green-600 mb-4 text-center">
          Payment Successful!
        </h1>
        <div className="space-y-3 text-center">
          <p className="text-lg">
            <span className="font-semibold">Amount:</span> <span className="text-green-500">${amt}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold">Order ID:</span> {oid}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Reference ID:</span> {refId}
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <a
            href="/"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
