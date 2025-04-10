export const validateImageUrl = (url: string, isAvatar = false) => {
    // 1. Проверка на пустое значение
    if (!url) return isAvatar ? true : 'This field is required';

    try {
        // 2. Парсинг URL
        const urlObj = new URL(url);

        // 3. Проверка, что URL выглядит как изображение (без проверки расширения)
        // Можно добавить дополнительные проверки, например:
        // - Проверка домена (если нужно ограничить источники)
        // - Проверка по заголовкам Content-Type (требует запроса на сервер)

        // 4. Базовая проверка, что это HTTP/HTTPS ссылка
        if (!['http:', 'https:'].includes(urlObj.protocol)) {
            return 'URL must start with http:// or https://';
        }

        // 5. Успешная валидация
        return true;
    } catch {
        // 6. Обработка ошибок парсинга URL
        return 'Please enter a valid URL';
    }
};