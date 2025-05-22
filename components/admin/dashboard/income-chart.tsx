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

export const IncomeChart = () => {
    const data = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
		datasets: [
			{
				label: 'Income',
				data: [300, 500, 400, 700, 500],
				borderColor: 'rgb(0, 201, 81)',
				backgroundColor: 'rgba(0, 201, 81, 0.2)',
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
