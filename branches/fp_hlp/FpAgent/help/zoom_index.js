dictwords = ["флиппост 0 16 144 1 16 132 2 16 132 3 8 128 4 16 136 5 16 136",
	"web 0 16 136 1 16 132 2 16 132 3 8 128 4 16 136 5 16 136",
	"помощь 0 16 136 1 16 132 2 16 132 3 8 128 4 16 136 5 16 132 10 10 8",
	"contents 0 10 8 1 10 2 2 10 2 3 10 32 4 10 4 5 10 2",
	"index 0 10 4 1 10 1 2 10 1 3 10 16 4 10 2 5 10 2",
	"search 0 10 4 1 10 1 3 26 25 4 10 2",
	"что 0 10 2 1 10 1 2 10 1 9 18 130 10 18 160",
	"нового 0 10 2 1 10 1 2 10 1 9 18 130 10 18 160",
	"заказы 0 10 2 1 10 1 2 10 1 6 12 2",
	"накладные 0 10 1 1 10 1 2 10 1 8 18 136 11 18 132",
	"манифесты 0 10 1 1 10 1 2 10 1 7 18 136 12 18 132",
	"пользователи 0 10 1 1 10 1 2 10 1 13 18 132 14 18 136",
	"2014 0 10 1",
	"dssoft 0 10 1 1 10 1 2 10 1",
	"hlp_content.html 0 6 64",
	"2013 1 10 1 2 10 1",
	"hlp_content_dyn.html 1 6 64",
	"hlp_content_static.html 2 6 64",
	"enter 3 10 16 11 10 4 12 10 4 13 10 4",
	"one 3 10 16",
	"more 3 10 16",
	"keywords 3 10 8",
	"and 3 10 8",
	"wildcards 3 10 8",
	"are 3 10 8",
	"supported 3 10 4",
	"you 3 10 4",
	"must 3 10 4",
	"have 3 10 2",
	"javascript 3 10 2",
	"enabled 3 10 2",
	"use 3 10 2",
	"this 3 10 2",
	"version 3 10 2",
	"the 3 10 1",
	"engine 3 10 1",
	"hlp_ftsearch.html 3 6 64",
	"hlp_kwindex_dyn.html 4 6 64",
	"hlp_kwindex_static.html 5 6 64",
	"главная 6 8 128",
	"main.html 6 6 64",
	"вверх 7 10 8 8 10 8 10 10 16 14 10 4",
	"назад 7 10 4 8 10 4 14 10 4",
	"вперед 7 10 2 8 10 2 10 10 16",
	"введите 7 10 1 8 10 1 14 10 4",
	"здесь 7 10 1 8 10 1 14 10 4",
	"текст 7 10 1 8 10 1 14 10 4",
	"темы 7 10 1 8 10 1 14 10 4",
	"manif.html 7 6 64",
	"naklad.html 8 6 64",
	"new.html 9 6 64",
	"24.06.2013 10 10 16",
	"флиппост.web 10 26 14",
	"v2.1.0.0 10 26 14",
	"добавлена 10 10 8",
	"интерактивная 10 10 8",
	"работе 10 10 8",
	"интерфейсами 10 10 8",
	"19.06.2013 10 10 8",
	"при 10 10 4",
	"входе 10 10 4",
	"систему 10 10 4",
	"отображаются 10 10 4",
	"последние 10 10 4",
	"внесенные 10 10 4",
	"изменения 10 10 2",
	"07.06.2013 10 10 2",
	"добавлено 10 10 2",
	"администрирование 10 10 2",
	"пользователей 10 10 2",
	"newinfp.html 10 6 64",
	"topic 11 10 4 12 10 4 13 10 4",
	"text 11 10 4 12 10 4 13 10 4",
	"here 11 10 4 12 10 4 13 10 4",
	"topic.html 11 6 64",
	"topic2.html 12 6 64",
	"topic3.html 13 6 64",
	"users.html 14 6 64"];
skipwords = ["and,or,the,it,is,an,on,we,us,to,of,"];
var STR_FORM_SEARCHFOR = "Искать для:";
var STR_FORM_SUBMIT_BUTTON = "Искать";
var STR_FORM_RESULTS_PER_PAGE = "<br>Результатов на странице:";
var STR_FORM_MATCH = "Соответствовать:<br>";
var STR_FORM_ANY_SEARCH_WORDS = " любому из слов поиска <br>";
var STR_FORM_ALL_SEARCH_WORDS = "всем словам <br>";
var STR_NO_QUERY = "Поисковый запрос не поступил.";
var STR_RESULTS_FOR = "Результаты поиска для:";
var STR_NO_RESULTS = "Нет результатов";
var STR_RESULT = "результат";
var STR_RESULTS = "результаты";
var STR_PHRASE_CONTAINS_COMMON_WORDS = "Ваш поисковый запрос содержит слишком много общих слов, чтобы вернуть все доступные результаты.";
var STR_SKIPPED_FOLLOWING_WORDS = "Следующее слово(а) были исключены из поиска:";
var STR_SKIPPED_PHRASE = "Обратите внимание, что вы не можете найти точные фразы, начинающиеся с пропущенного слова";
var STR_SUMMARY_NO_RESULTS_FOUND = "Нет результатов.";
var STR_SUMMARY_FOUND_CONTAINING_ALL_TERMS = "Результаты  содержащий все условия поиска.";
var STR_SUMMARY_FOUND_CONTAINING_SOME_TERMS = "Результаты  содержащие  некоторые условия поиска.";
var STR_SUMMARY_FOUND = "найдено.";
var STR_PAGES_OF_RESULTS = "страниц результатов поиска.";
var STR_POSSIBLY_GET_MORE_RESULTS = "Возможно, вы можете получить больше результатов поиска";
var STR_ANY_OF_TERMS = "любое из условий";
var STR_DIDYOUMEAN = "Вы имели в виду:";
var STR_SORTEDBY_RELEVANCE = "Сортировать по релевантности";
var STR_SORTBY_RELEVANCE = "Отсортировано  по релевантности";
var STR_SORTBY_DATE = "Отсортировано по дате";
var STR_SORTEDBY_DATE = "Сортировать по дате";
var STR_RESULT_TERMS_MATCHED = "Условия совпадений:";
var STR_RESULT_SCORE = "Оценка:";
var STR_RESULT_URL = "URL:";
var STR_RESULT_PAGES = "Страницы:";
var STR_RESULT_PAGES_PREVIOUS = "Предыдущий";
var STR_RESULT_PAGES_NEXT = "Следующий";
var STR_FORM_CATEGORY = "Category:";
var STR_FORM_CATEGORY_ALL = "All";
var STR_RESULTS_IN_ALL_CATEGORIES = "in all categories";
var STR_RESULTS_IN_CATEGORY = "in category";
var STR_POWEREDBY = "Search powered by";
var STR_MORETHAN = "More than";
var STR_ALL_CATS = "all categories";
var STR_CAT_SUMMARY = "Refine your search by category:";
var STR_OR = "or";
var STR_RECOMMENDED = "Recommended links";
var STR_SEARCH_TOOK = "Search took";
var STR_SECONDS = "seconds";
var STR_MAX_RESULTS = "You have requested more results than served per query. Please try again with a more precise query.";
