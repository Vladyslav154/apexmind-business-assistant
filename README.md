
# ApexMind

Современный SaaS-проект для управления бизнес-процессами, построенный на Next.js 14 с TypeScript и Prisma.

## 🚀 Возможности

- **Современный UI/UX**: Построен с использованием Radix UI и Tailwind CSS
- **Аутентификация**: NextAuth.js с поддержкой различных провайдеров
- **База данных**: Prisma ORM для работы с базой данных
- **Визуализация данных**: Chart.js, Plotly.js и Recharts для аналитики
- **Адаптивный дизайн**: Полностью адаптивный интерфейс
- **TypeScript**: Полная типизация для надежности кода

## 🛠 Технологический стек

- **Frontend**: Next.js 14, React 18, TypeScript
- **Стилизация**: Tailwind CSS, Radix UI
- **База данных**: Prisma ORM
- **Аутентификация**: NextAuth.js
- **Графики**: Chart.js, Plotly.js, Recharts
- **Состояние**: Zustand, Jotai
- **Формы**: React Hook Form, Formik
- **Анимации**: Framer Motion

## 📋 Требования

- Node.js 18.0 или выше
- npm или yarn
- База данных (PostgreSQL, MySQL, или SQLite)

## 🚀 Быстрый старт

### 1. Клонирование репозитория

```bash
git clone https://github.com/yourusername/nexus-business-assistant.git
cd nexus-business-assistant
```

### 2. Установка зависимостей

```bash
npm install
# или
yarn install
```

### 3. Настройка переменных окружения

Скопируйте `.env.example` в `.env` и заполните необходимые переменные:

```bash
cp .env.example .env
```

### 4. Настройка базы данных

```bash
# Генерация Prisma клиента
npx prisma generate

# Применение миграций
npx prisma db push

# Заполнение тестовыми данными (опционально)
npm run seed
```

### 5. Запуск в режиме разработки

```bash
npm run dev
# или
yarn dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📦 Скрипты

- `npm run dev` - Запуск в режиме разработки
- `npm run build` - Сборка для продакшена
- `npm run start` - Запуск продакшен сборки
- `npm run lint` - Проверка кода линтером
- `npm run seed` - Заполнение базы данных тестовыми данными

## 🌐 Деплой на Vercel с доменом nexussystems.co

### Автоматический деплой

1. **Подключите репозиторий к Vercel**:
   - Зайдите на [vercel.com](https://vercel.com)
   - Нажмите "New Project"
   - Импортируйте ваш GitHub репозиторий

2. **Настройте переменные окружения**:
   - В настройках проекта Vercel добавьте все переменные из `.env.example`
   - Убедитесь, что `DATABASE_URL` указывает на продакшен базу данных

3. **Настройте домен nexussystems.co**:
   - В настройках проекта перейдите в "Domains"
   - Добавьте домен `nexussystems.co`
   - Настройте DNS записи у вашего регистратора:
     ```
     Type: A
     Name: @
     Value: 76.76.19.61
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

4. **Деплой**:
   - Vercel автоматически задеплоит проект при каждом push в main ветку
   - Первый деплой может занять несколько минут

### Ручной деплой

```bash
# Установите Vercel CLI
npm i -g vercel

# Войдите в аккаунт
vercel login

# Деплой
vercel --prod
```

## 🗄 База данных

Проект использует Prisma ORM. Схема базы данных находится в `prisma/schema.prisma`.

### Миграции

```bash
# Создание новой миграции
npx prisma migrate dev --name migration_name

# Применение миграций в продакшене
npx prisma migrate deploy

# Сброс базы данных (только для разработки!)
npx prisma migrate reset
```

## 🔧 Конфигурация

### Переменные окружения

Все необходимые переменные окружения описаны в `.env.example`. Основные:

- `DATABASE_URL` - URL подключения к базе данных
- `NEXTAUTH_SECRET` - Секретный ключ для NextAuth.js
- `NEXTAUTH_URL` - URL вашего приложения

### Next.js конфигурация

Настройки Next.js находятся в `next.config.js`. Включены оптимизации для продакшена.

## 🤝 Участие в разработке

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add some amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📝 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 🆘 Поддержка

Если у вас возникли вопросы или проблемы:

1. Проверьте [Issues](https://github.com/yourusername/nexus-business-assistant/issues)
2. Создайте новый Issue с подробным описанием проблемы
3. Свяжитесь с командой разработки

## 🔗 Полезные ссылки

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [Vercel Deployment](https://vercel.com/docs)

---

**ApexMind** - Ваш надежный помощник в управлении бизнесом 🚀

Доступен по адресу: [nexussystems.co](https://nexussystems.co)
