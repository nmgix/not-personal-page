# Шаги чтобы закончить компонент (/blog, /article, /projects)

1. [x] MD (не mdx) рендер текста в ArticleDefault
   - смотреть как в nmgix/portfolio сделано
   - удалить mdx библиотеки из package.json
2. [x] generateMetadata (title/description/authors/openGraph)
   1. [x] заменить моковые данные реальными
   2. [x] в generateMetadata получать только header/metadata md файла (title, автор из .env, short dsecription, ttr и пр.), а в export default page получать полноценную заметку (header/metadata и часть текста)
3. [ ] Parallel Routing (same page render)
4. [ ] Fetching data
   1. [?] Server outputting requested MD partially? Like header and some parts of md, not whole.
      - пока content возвращает полностью статью
5. [x] Smart panel hovering
   - в layout посмотреть есть ли metadata по страничке.
     если есть, то сверять с шаблонами внутри smart panel и рендерить smart panel если найден шаблон, но сама v-dom нода будет всегда (client component)
