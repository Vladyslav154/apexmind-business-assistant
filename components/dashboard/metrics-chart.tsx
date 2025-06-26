
'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts'

const revenueData = [
  { name: '1 дек', revenue: 32000, orders: 45 },
  { name: '5 дек', revenue: 38000, orders: 52 },
  { name: '10 дек', revenue: 35000, orders: 48 },
  { name: '15 дек', revenue: 42000, orders: 58 },
  { name: '20 дек', revenue: 39000, orders: 54 },
  { name: '25 дек', revenue: 45000, orders: 62 },
  { name: '30 дек', revenue: 48000, orders: 67 },
]

const trafficData = [
  { name: 'Прямые заходы', value: 35, color: '#60B5FF' },
  { name: 'Поисковые системы', value: 28, color: '#FF9149' },
  { name: 'Социальные сети', value: 20, color: '#FF9898' },
  { name: 'Email кампании', value: 12, color: '#80D8C3' },
  { name: 'Реклама', value: 5, color: '#A19AD3' },
]

export function MetricsChart({ type }: { type: 'revenue' | 'traffic' }) {
  if (type === 'revenue') {
    return (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              tickLine={false}
              tick={{ fontSize: 10 }}
              stroke="#64748b"
            />
            <YAxis 
              tickLine={false}
              tick={{ fontSize: 10 }}
              stroke="#64748b"
              tickFormatter={(value) => `${value / 1000}к`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '11px'
              }}
              formatter={(value, name) => [
                name === 'revenue' ? `${value.toLocaleString()} ₽` : value,
                name === 'revenue' ? 'Выручка' : 'Заказы'
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#1ABC9C" 
              strokeWidth={3}
              dot={{ fill: '#1ABC9C', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#1ABC9C', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={trafficData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {trafficData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '11px'
            }}
            formatter={(value) => [`${value}%`, 'Доля']}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
