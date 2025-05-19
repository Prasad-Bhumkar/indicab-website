'use client';

import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Driver Performance',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

const data = {
    labels,
    datasets: [
        {
            label: 'Completed Rides',
            data: [65, 59, 80, 81, 56, 55],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
            label: 'Customer Rating',
            data: [4.5, 4.8, 4.2, 4.9, 4.7, 4.6],
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
        },
    ],
};

export default function DriverPerformance() {
    return (
        <div className="w-full h-full p-4 bg-white rounded-lg shadow">
            <Bar options={options} data={data} />
        </div>
    );
} 