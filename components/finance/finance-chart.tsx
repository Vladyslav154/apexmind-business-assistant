
'use client'

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts'

const cashflowData = [
  { month: 'Янв', income: 220000, expenses: 165000 },
  { month: 'Фев', income: 245000, expenses: 178000 },
  { month: 'Мар', income: 265000, expenses: 185000 },
  { month: 'Апр', income: 280000, expenses: 192000 },
  { month: 'Май', income: 275000, expenses: 188000 },
  { month: 'Июн', income: 290000, expenses: 195000 },
  { month: 'Июл', income: 310000, expenses: 205000 },
  { month: 'Авг', income: 295000, expenses: 198000 },
  { month: 'Сен', income: 285000, expenses: 186000 },
  { month: 'Окт', income: 300000, expenses: 190000 },
  { month: 'Ноя', income: 315000, expenses: 200000 },
  { month: 'Дек', income: 285000, expenses: 186000 },
]

const expensesData = [
  { name: 'Зарплата', value: 35, color: '#60B5FF' },
  { name: 'Аренда', value: 20, color: '#FF9149' },
  { name: 'Маркетинг', value: 18, color: '#FF9898' },
  { name: 'Оборудование', value: 12, color: '#80D8C3' },
  { name: 'Коммунальные', value: 8, color: '#A19AD3' },
  { name: 'Прочее', value: 7, color: '#72BF78' },
]

export function FinanceChart({ type }: { type: 'cashflow' | 'expenses' }) {
  if (type === 'cashflow') {
    return (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cashflowData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="month" 
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
              formatter={(value: number, name: string) => [
                `${value.toLocaleString()} ₽`,
                name === 'income' ? 'Доходы' : 'Расходы'
              ]}
            />
            <Bar 
              dataKey="income" 
              fill="#1ABC9C" 
              radius={[2, 2, 0, 0]}
              name="income"
            />
            <Bar 
              dataKey="expenses" 
              fill="#FF6B6B" 
              radius={[2, 2, 0, 0]}
              name="expenses"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={expensesData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {expensesData.map((entry, index) => (
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
