## Предметная область

Бронирование помещений для проведения банкетов

## Таблицы БД

| Таблица | Назначение |
|---------|------------|
| `users` | Пользователи (регистрация, админ) |
| `bookings` | Заявка |
| `reviews` | Отзывы к записям |

### Поля `bookings`

| Столбец | Тип | Подпись |
|---------|-----|---------|
| id, user_id, created_at | системные | — |
| `room_type` | enum | Тип помещения |
| `start_date` | date | Дата начала банкета |
| `payment_method` | enum | Способ оплаты |
| status | string | Статус |

## Запуск

```bash
cd backend && go mod tidy && go run .
cd frontend && npm install && npm run dev
```

Админ: **Admin26** / **Demo20**

