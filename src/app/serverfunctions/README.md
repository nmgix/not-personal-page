C meta должно возвращаться -> Omit<TArticleDefault, 'imagesSrc'|"href"|"categoryImg">
Для каждого article ещё в backend надо:
    1. получать список всех ссылок в заметке и назначать в imagesSrc: ImageElement[] (fullPath c meta в помощь для получения реальной ссылки с "CDN")
    2. назначать href: current host + category(blog/article/project + ,без s на конце) + имя (не файла, все файлы теперь это папки, внутри text.md  у всех)
    3. назначать categoryImg в зависимости от category файла (categoryImg это typeof AvailableIcons -> "blog" | "tech-article" | "video")