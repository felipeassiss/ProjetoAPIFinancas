import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IncomeExpenseChart = ({ transactions }) => {
  // Agrupa transações por semana e calcula totais
  const generateChartData = () => {
    if (transactions.length === 0) return [];

    const weeks = {};
    transactions.forEach(t => {
      const date = new Date(t.data);
      const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
      const weekKey = weekStart.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' });

      if (!weeks[weekKey]) {
        weeks[weekKey] = { week: weekKey, income: 0, expense: 0 };
      }

      const amount = parseFloat(t.valor);
      if (t.tipo === 'income') {
        weeks[weekKey].income += amount;
      } else {
        weeks[weekKey].expense += amount;
      }
    });

    return Object.values(weeks).slice(-8); // Últimas 8 semanas
  };

  const data = generateChartData();

  if (data.length === 0) {
    return (
      <div className="text-center text-white/30 text-sm py-8">
        Sem dados de transações
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="week" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
        <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            background: 'rgba(0,0,0,0.8)',
            border: '1px solid rgba(0,200,83,0.3)',
            borderRadius: '12px',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
          formatter={(value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        />
        <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.6)' }} />
        <Bar dataKey="income" fill="#00C853" name="Entradas" radius={[8, 8, 0, 0]} />
        <Bar dataKey="expense" fill="#ef4444" name="Saídas" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeExpenseChart;
