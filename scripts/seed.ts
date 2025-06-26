
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Создание демо данных...')

  // Создание демо пользователя
  const hashedPassword = await bcrypt.hash('demo123', 12)
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@nexus.ai' },
    update: {},
    create: {
      email: 'demo@nexus.ai',
      name: 'Демо Пользователь',
      password: hashedPassword,
      company: 'ApexMind Demo Corp',
      industry: 'Технологии',
      role: 'BUSINESS_OWNER',
      timezone: 'Europe/Moscow',
    },
  })

  // Создание подписки для демо пользователя
  await prisma.subscription.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: {
      userId: demoUser.id,
      status: 'ACTIVE',
      plan: 'BUSINESS_PRO',
      price: 39.00,
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })

  // Создание демо документов
  const documents = [
    {
      title: 'Договор поставки с ООО Альфа',
      filename: 'contract-alpha-2024.pdf',
      fileUrl: '/demo/contract-alpha.pdf',
      fileSize: 2048000,
      mimeType: 'application/pdf',
      category: 'CONTRACT' as const,
      tags: ['договор', 'поставка', 'альфа'],
      summary: 'Договор на поставку оборудования сроком на 12 месяцев с ежемесячными платежами.',
    },
    {
      title: 'Финансовый отчет Q4 2024',
      filename: 'financial-report-q4-2024.xlsx',
      fileUrl: '/demo/financial-report-q4.xlsx',
      fileSize: 1536000,
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      category: 'REPORT' as const,
      tags: ['отчет', 'финансы', 'квартал'],
      summary: 'Квартальный финансовый отчет с анализом доходов, расходов и прибыли.',
    },
    {
      title: 'Счет-фактура №1245 от ИП Петров',
      filename: 'invoice-1245-petrov.pdf',
      fileUrl: '/demo/invoice-1245.pdf',
      fileSize: 512000,
      mimeType: 'application/pdf',
      category: 'INVOICE' as const,
      tags: ['счет', 'петров', 'оплата'],
      summary: 'Счет на консультационные услуги по маркетингу на сумму 45,000 рублей.',
    },
  ]

  for (const doc of documents) {
    await prisma.document.create({
      data: {
        ...doc,
        userId: demoUser.id,
      },
    })
  }

  // Создание демо транзакций
  const transactions = [
    {
      amount: 85000,
      type: 'INCOME' as const,
      category: 'Продажи',
      description: 'Оплата за консультационные услуги',
      vendor: 'ООО Альфа Консалтинг',
      date: new Date('2024-12-25'),
      status: 'COMPLETED' as const,
      reference: 'INV-2024-001',
    },
    {
      amount: 25000,
      type: 'EXPENSE' as const,
      category: 'Маркетинг',
      description: 'Реклама в Google Ads',
      vendor: 'Google LLC',
      date: new Date('2024-12-24'),
      status: 'COMPLETED' as const,
      reference: 'ADV-001245',
    },
    {
      amount: 45000,
      type: 'EXPENSE' as const,
      category: 'Зарплата',
      description: 'Заработная плата сотрудников',
      vendor: 'Штатные сотрудники',
      date: new Date('2024-12-23'),
      status: 'COMPLETED' as const,
    },
  ]

  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: {
        ...transaction,
        userId: demoUser.id,
      },
    })
  }

  // Создание демо задач
  const tasks = [
    {
      title: 'Презентация для инвесторов',
      description: 'Подготовить финальную версию питч-дека для раунда Series A',
      startDate: new Date('2024-12-25T14:00:00Z'),
      endDate: new Date('2024-12-25T16:00:00Z'),
      isAllDay: false,
      priority: 'HIGH' as const,
      status: 'TODO' as const,
      category: 'Встречи',
    },
    {
      title: 'Звонок с клиентом ООО Альфа',
      description: 'Обсуждение продления договора на следующий год',
      startDate: new Date('2024-12-25T11:00:00Z'),
      endDate: new Date('2024-12-25T11:30:00Z'),
      isAllDay: false,
      priority: 'MEDIUM' as const,
      status: 'IN_PROGRESS' as const,
      category: 'Продажи',
      aiGenerated: true,
    },
    {
      title: 'Анализ конкурентов',
      description: 'Исследование рынка и анализ конкурентных преимуществ',
      startDate: new Date('2024-12-26T09:00:00Z'),
      isAllDay: true,
      priority: 'MEDIUM' as const,
      status: 'TODO' as const,
      category: 'Исследования',
      aiGenerated: true,
    },
  ]

  for (const task of tasks) {
    await prisma.task.create({
      data: {
        ...task,
        userId: demoUser.id,
      },
    })
  }

  // Создание бизнес-метрик
  const metrics = [
    { name: 'revenue', category: 'financial', value: 285000, unit: 'RUB', date: new Date() },
    { name: 'customers', category: 'business', value: 1247, unit: 'count', date: new Date() },
    { name: 'conversion_rate', category: 'marketing', value: 3.8, unit: 'percent', date: new Date() },
    { name: 'monthly_growth', category: 'business', value: 8.5, unit: 'percent', date: new Date() },
  ]

  for (const metric of metrics) {
    await prisma.businessMetric.create({
      data: {
        ...metric,
        userId: demoUser.id,
      },
    })
  }

  // Создание интеграций
  const integrations = [
    {
      service: 'GOOGLE_DRIVE' as const,
      name: 'Google Drive',
      status: 'ACTIVE' as const,
      lastSync: new Date(),
    },
    {
      service: 'GOOGLE_ANALYTICS' as const,
      name: 'Google Analytics',
      status: 'ACTIVE' as const,
      lastSync: new Date(),
    },
    {
      service: 'SLACK' as const,
      name: 'Slack',
      status: 'INACTIVE' as const,
    },
  ]

  for (const integration of integrations) {
    await prisma.integration.create({
      data: {
        ...integration,
        userId: demoUser.id,
      },
    })
  }

  console.log('Демо данные созданы успешно!')
  console.log('Демо аккаунт: demo@nexus.ai / demo123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
