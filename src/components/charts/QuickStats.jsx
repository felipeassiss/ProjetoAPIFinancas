import React from 'react';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color = 'cashGreen', trend = null }) => (
  <div
    className="p-4 rounded-2xl flex items-center gap-3"
    style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      backdropFilter: 'blur(20px)',
    }}
  >
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{
        background: color === 'red' ? 'rgba(239,68,68,0.1)' : color === 'yellow' ? 'rgba(251,146,60,0.1)' : 'rgba(0,200,83,0.1)',
        border: color === 'red' ? '1px solid rgba(239,68,68,0.2)' : color === 'yellow' ? '1px solid rgba(251,146,60,0.2)' : '1px solid rgba(0,200,83,0.2)',
        color: color === 'red' ? '#ef4444' : color === 'yellow' ? '#f59e0b' : '#00C853',
      }}
    >
      <Icon size={18} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-white/40 text-xs font-medium uppercase tracking-wider">{label}</p>
      <p
        className="text-white font-semibold text-sm mt-0.5 truncate"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {value}
      </p>
    </div>
  </div>
);

const QuickStats = ({ transactions }) => {
  const income = transactions.filter(t => t.tipo === 'income').reduce((a, c) => a + parseFloat(c.valor), 0);
  const expense = transactions.filter(t => t.tipo === 'expense').reduce((a, c) => a + parseFloat(c.valor), 0);
  
  const totalTransactions = transactions.length;
  const avgExpense = transactions.length > 0 ? expense / transactions.length : 0;
  const avgIncome = transactions.filter(t => t.tipo === 'income').length > 0 
    ? income / transactions.filter(t => t.tipo === 'income').length 
    : 0;

  const expenses = transactions.filter(t => t.tipo === 'expense').sort((a, b) => parseFloat(b.valor) - parseFloat(a.valor));
  const largestExpense = expenses.length > 0 ? parseFloat(expenses[0].valor) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <StatCard
        icon={TrendingUp}
        label="Total Entradas"
        value={income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
        color="cashGreen"
      />
      <StatCard
        icon={TrendingDown}
        label="Total Saídas"
        value={expense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
        color="red"
      />
      <StatCard
        icon={Target}
        label="Ticket Médio"
        value={avgExpense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
        color="yellow"
      />
      <StatCard
        icon={TrendingDown}
        label="Maior Despesa"
        value={largestExpense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
        color="red"
      />
    </div>
  );
};

export default QuickStats;
