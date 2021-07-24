Чтобы запустить скрипт, можно скопировать этот файл в https://script.google.com и развернуть его как веб-приложение.

Также можно попробовать перейти по ссылке, где скрипт уже был развернут: https://script.google.com/macros/s/AKfycbwRR5PmDER_K-P2qMnUsEN9J3hRKRrddX7B_-I77Dg4qwClDAfaOqLYtuboyGGs_H3u/exec

Скрипт работает как GET-запрос, поэтому в конце ссылки надо добавить "?access_token={YOUR_TOKEN}&community_name={CHOSEN_COMMUNITY}", где access_token - токен для VK API, community_name - domain выбранного сообщества (указано в url).

Пример работы алгоритма (созданная Google Sheet с картинками) - https://docs.google.com/spreadsheets/d/1LDMzdP_DOsysQUhQb53FnWvh9wgNJRh7yPbXyCRLvNI/edit?usp=sharing

Поскольку скрипт работает относительно долго, то число картинок, которые добавляются в таблицу, ограничено 20.
