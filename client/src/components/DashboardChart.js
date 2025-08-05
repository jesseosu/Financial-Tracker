import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DashboardChart({ transactions }) {
    const monthlySummary = {};

    transactions.forEach((t) => {
        const month = new Date(t.date).toLocaleString('default', { month: 'short' });
        if (!monthlySummary[month]) monthlySummary[month] = { income: 0, expense: 0 };
        if (t.type === 'income') monthlySummary[month].income += t.amount;
        else monthlySummary[month].expense += t.amount;
    });

    const months = Object.keys(monthlySummary);
    const incomeData = months.map((m) => monthlySummary[m].income);
    const expenseData = months.map((m) => monthlySummary[m].expense);

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Expenses',
                data: expenseData,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        },
    };

    return <Bar data={data} options={options} />;
}
