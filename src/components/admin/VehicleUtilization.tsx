'use client';

import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    Tooltip
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
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
            text: 'Vehicle Utilization',
        },
    },
};

const data = {
    labels: ['Sedan', 'SUV', 'Luxury', 'Electric'],
    datasets: [
        {
            label: 'Utilization',
            data: [65, 45, 30, 25],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)',
            ],
            borderWidth: 1,
        },
    ],
};

export default function VehicleUtilization() {
    return (
        <div className="w-full h-full p-4 bg-white rounded-lg shadow">
            <Doughnut options={options} data={data} />
        </div>
    );
} 