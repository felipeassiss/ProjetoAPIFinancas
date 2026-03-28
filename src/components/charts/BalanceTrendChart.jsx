import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BalanceTrendChart = ({ transactions }) => {
  // Gera dados de saldo ao longo do tempo
  const generateTrendData = () => {
    if (transactions.length === 0) return [];

    const sorted = [...transactions].sort((a, b) => new Date(a.data) - new Date(b.data));
    let runningBalance = 0;
    const data = [];

    sorted.forEach(t => {
      const amount = parseFloat(t.valor);
      runningBalance += t.tipo === 'income' ? amount : -amount;
      data.push({
        date: new Date(t.data).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }),
        balance: runningBalance,
      });
    });

    return data.slice(-30); // Últimos 30 registros
  };

  const data = generateTrendData();

  if (data.length === 0) {
    return (
      <div className="text-center text-white/30 text-sm py-8">
        Sem dados de transações
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="date" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
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
        <Line
          type="monotone"
          dataKey="balance"
          stroke="#00C853"
          strokeWidth={2}
          dot={{ fill: '#00C853', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BalanceTrendChart;
