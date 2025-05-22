// components/LineChart.tsx
'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const ExpenseChart = () => {
    const data = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
		datasets: [
			{
				label: 'Expense',
				data: [300, 200, 400, 500, 100],
				borderColor: 'rgb(251, 44, 54)',
				backgroundColor: 'rgba(251, 44, 54, 0.2)',
				tension: 0.2,
			}
		]
    };

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const
			}
		}
	};

	return <Line data={data} options={options} />;
};
