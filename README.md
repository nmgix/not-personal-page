.env

```
   NEXT_PUBLIC_NAME=brudiz
   NEXT_PUBLIC_TIMEZONE="Europe/Moscow"
   NEXT_PUBLIC_CODING_SINCE=1578825717000 (milliseconds)
```

1. [ ] Pages
   1. [ ] Home
      1. [ ] Different Hero components
         1. [ ] 3D render
         2. [ ] Recent articles or sorted by popularity? (idk which content to load to them)
         3. [ ] Articles list preview
         4. [ ] Projects grid
   2. [ ] Tech articles
      1. [ ] Selected article page
         1. [ ] Same page article render (nextjs feature) (article widget)
   3. [ ] Blog
      1. [ ] Selected blog article page
         1. [ ] Same blog article render (nextjs feature) (article widget)
   4. [ ] Selected project article page
      1. [ ] Same page project article render (nextjs feature) (article widget)
2. [ ] Components
   1. [x] Generic
      1. [x] Box (class)
      2. [x] Buttons
         - проверить TODO в button.scss
         1. [x] Default button
      3. [x] Input
      4. [x] Modal
      5. [~] Icon
         - ~ потому что там кривая обовка внутри самого svg и на некоторые объекты обводка не ставится. fill вообще не имплементирован
      6. [x] Image
      <!-- 7. [ ] Popup
      - под вопросом -->
   2. [ ] Specialized
      1. [x] ArticleListElement (list item)
      2. [x] CookiePrompt
         - длина пока 100% width доступного, в модалке (с ref для самоудаления, модалка пока Widgets/CookiePopup не написан) должна быть длина до 500px
      3. [ ] Model viewer (orbit controls with one light source)
      4. [ ] ImageView
      <!-- 5. [ ] ArticlesPreview, что за компонент?? -->
      5. [x] BoxesScrollbar
         - мб есть смысл просто класс fade добавить, но scroll логика мне тоже нужна, может её тоже потом в generic component выделю для реюзабилити
         - fade дёрагнный (js'ом имплементирован)
         - не убран скроллбар на пк, на мобилки он должен оставаться
         - не в виджетах потому что реюз в других Specialized
      6. [ ] ImageList (articles i.e.)
         - не в виджетах потому что реюз в других Specialized
      7. [ ] мб обернуть в Suspense, вроде там перед загрузкой белый фон просто
      8. [ ] нет обработки если ошибка загрузки изображения
3. [ ] Widgets
   1. [x] CookiePopup
      - проблема в Popup, его фукнционал пока это просто обёртка в виде div.box, нужно взять popup логику из nmgix-components
   2. [x] Bottom clever bar
      - не закончен дизайн, так что элемент без функционала активного помощника на текущей страницы (должен брать функции и данные из стейта страницы + пресеты для каждой страницы где он есть, инфа где он есть по наличию пресета для данной страницы)
   3. [x] Header
   4. [x] Footer
      - проблема в том, что в самом дизайне footer ещё не прототипирован/создан
   5. [ ] ArticlesGlobalSearch
   6. [ ] ArticleList
      - обернуть в Suspense
      - юзать ArticleListElement из Specialized
   7. [ ] Article (как same page render поверх предыдущего роута без перехода)
4. [ ] Storybook
   1. [ ] Components
      1. [x] Generic
      2. [ ] Specialized
   2. [ ]Widgets
5. [ ] Testing
   1. [ ] Playwright
      1. [ ] Home page
      2. [ ] Articles list
      3. [ ] Blog
      4. [ ] Articles (blog/tech/projects) pages or same page renders
