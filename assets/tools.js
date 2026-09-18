/* ============================================================
   Инструменты памятки: мастер проверки, генераторы, каталог,
   совместимость лицензий, чек-лист.
   Данные хранятся в этом файле, а не во внешнем JSON, чтобы
   страница работала и при открытии с диска (file://).
   ============================================================ */
(function () {
  'use strict';

  /* ---------- общие утилиты ---------- */

  function $(id) { return document.getElementById(id); }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  var toastTimer = null;
  function toast(message) {
    var t = $('toast');
    if (!t) return;
    t.textContent = message;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }

  function copyText(text, btn) {
    function done() {
      toast('Скопировано в буфер обмена');
      if (btn) {
        var was = btn.textContent;
        btn.textContent = 'Скопировано';
        btn.classList.add('done');
        setTimeout(function () { btn.textContent = was; btn.classList.remove('done'); }, 1800);
      }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); });
    } else {
      fallback(text, done);
    }
  }

  function fallback(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { toast('Скопировать не удалось, выделите текст вручную'); }
    document.body.removeChild(ta);
  }

  function ruDate(d) {
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    return p(d.getDate()) + '.' + p(d.getMonth() + 1) + '.' + d.getFullYear();
  }

  function isoDate(d) {
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }

  function store(key, value) {
    try {
      if (value === undefined) {
        var raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
      }
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) { /* приватный режим или заблокированное хранилище */ }
    return null;
  }

  /* ---------- нормы, на которые ссылаются выводы ---------- */

  var REF = {
    a1229: { t: 'Статья 1229 ГК РФ — исключительное право', u: 'https://www.zakonrf.info/gk/1229/' },
    a1266: { t: 'Статья 1266 ГК РФ — неприкосновенность произведения', u: 'https://www.zakonrf.info/gk/1266/' },
    a1270: { t: 'Статья 1270 ГК РФ — способы использования', u: 'https://www.zakonrf.info/gk/1270/' },
    a1274: { t: 'Статья 1274 ГК РФ — свободное использование', u: 'https://www.zakonrf.info/gk/1274/' },
    a1276: { t: 'Статья 1276 ГК РФ — произведения в общедоступных местах', u: 'https://www.zakonrf.info/gk/1276/' },
    a1281: { t: 'Статья 1281 ГК РФ — срок охраны', u: 'https://www.zakonrf.info/gk/1281/' },
    a1282: { t: 'Статья 1282 ГК РФ — общественное достояние', u: 'https://www.zakonrf.info/gk/1282/' },
    a1295: { t: 'Статья 1295 ГК РФ — служебное произведение', u: 'https://www.zakonrf.info/gk/1295/' },
    a1303: { t: 'Статья 1303 ГК РФ — смежные права', u: 'https://www.zakonrf.info/gk/1303/' },
    rao: { t: 'РАО — порядок заключения договора', u: 'https://rao.ru/for-users/' },
    vois: { t: 'ВОИС — вознаграждение за фонограммы', u: 'https://rosvois.ru/' },
    cc: { t: 'Условия лицензий Creative Commons', u: 'https://creativecommons.org/share-your-work/cclicenses/' }
  };

  /* ============================================================
     1. МАСТЕР ПРОВЕРКИ
     ============================================================ */

  var STEPS = [
    {
      id: 'material',
      q: 'Что за материал?',
      hint: 'Если материалов несколько, проверьте каждый отдельно: режим использования у них разный.',
      opts: [
        { v: 'image', t: 'Изображение или фотография', s: 'Слайд, стенгазета, обложка, кадр в видео' },
        { v: 'text', t: 'Текст', s: 'Фрагмент книги, статьи, учебного пособия' },
        { v: 'music', t: 'Музыка или звук', s: 'Сопровождение мероприятия, фон в видео' },
        { v: 'video', t: 'Видеоматериал', s: 'Фильм, ролик, фрагмент записи' }
      ]
    },
    {
      id: 'origin',
      q: 'Откуда материал и какой у него статус?',
      hint: 'Статус указан на странице файла. Если его там нет, материал считается охраняемым.',
      opts: function (s) {
        var list = [
          { v: 'own', t: 'Своё произведение', s: 'Создано вами или работниками института' },
          { v: 'cc', t: 'Свободная лицензия Creative Commons', s: 'На странице файла указана лицензия CC' },
          { v: 'pd', t: 'Общественное достояние', s: 'Автор умер более 70 лет назад' },
          { v: 'stock', t: 'Сток или подписка', s: 'Куплено или получено по лицензии сервиса' },
          { v: 'net', t: 'Найдено в интернете', s: 'Статус не указан или неизвестен' }
        ];
        if (s.material === 'image' || s.material === 'video') {
          list.push({ v: 'place', t: 'Снято в общедоступном месте', s: 'Памятник, здание, роспись в открытом для посещения месте' });
        }
        return list;
      }
    },
    {
      id: 'cc',
      q: 'Какая именно лицензия указана?',
      hint: 'Код лицензии приведён рядом с файлом. Версия (3.0, 4.0) на вывод не влияет.',
      when: function (s) { return s.origin === 'cc'; },
      opts: [
        { v: 'cc0', t: 'CC0', s: 'Передано в общественное достояние' },
        { v: 'by', t: 'CC BY', s: 'Указание автора' },
        { v: 'by-sa', t: 'CC BY-SA', s: 'Указание автора, те же условия для производного' },
        { v: 'by-nd', t: 'CC BY-ND', s: 'Без переработки' },
        { v: 'by-nc', t: 'CC BY-NC', s: 'Только некоммерческое использование' },
        { v: 'by-nc-sa', t: 'CC BY-NC-SA', s: 'Некоммерческое, те же условия' },
        { v: 'by-nc-nd', t: 'CC BY-NC-ND', s: 'Некоммерческое, без переработки' }
      ]
    },
    {
      id: 'use',
      q: 'Как материал будет использоваться?',
      hint: 'Это главный вопрос: для показа в аудитории и для публикации в интернете ответ часто разный.',
      opts: [
        { v: 'class', t: 'Показ на занятии', s: 'Аудитория, ограниченный круг: обучающиеся и работники' },
        { v: 'web', t: 'Публикация в интернете', s: 'Сайт института, соцсети, видеохостинг, открытый доступ' },
        { v: 'event', t: 'Мероприятие в зале', s: 'Концерт, линейка, выпускной, конференция' },
        { v: 'print', t: 'Издание или печатный материал', s: 'Методичка, сборник, отчёт, стенд' },
        { v: 'promo', t: 'Продвижение института', s: 'Реклама набора, платные курсы, презентация партнёрам' }
      ]
    },
    {
      id: 'method',
      q: 'Каким образом звучит музыка?',
      hint: 'Живое исполнение и включение записи — разные способы использования с разными правилами.',
      when: function (s) { return s.material === 'music'; },
      opts: [
        { v: 'live', t: 'Живое исполнение', s: 'Играют и поют обучающиеся или работники' },
        { v: 'rec', t: 'Воспроизведение фонограммы', s: 'Запись через аппаратуру, минусовка, трек из сервиса' }
      ]
    },
    {
      id: 'money',
      q: 'Есть ли плата или коммерческая цель?',
      hint: 'Платный вход, продажа издания, спонсорский пакет — всё это отключает льготы для образовательных организаций.',
      when: function (s) { return s.use !== 'promo'; },
      opts: [
        { v: 'free', t: 'Нет, вход свободный', s: 'Прибыль не извлекается, материал не продаётся' },
        { v: 'paid', t: 'Да, плата или коммерческая цель', s: 'Платный вход, продажа, коммерческий заказ' }
      ]
    }
  ];

  var LABEL = {
    material: { image: 'Изображение', text: 'Текст', music: 'Музыка', video: 'Видео' },
    origin: { own: 'Своё', cc: 'Лицензия CC', pd: 'Общественное достояние', stock: 'Сток', net: 'Из интернета', place: 'Общедоступное место' },
    cc: { cc0: 'CC0', by: 'CC BY', 'by-sa': 'CC BY-SA', 'by-nd': 'CC BY-ND', 'by-nc': 'CC BY-NC', 'by-nc-sa': 'CC BY-NC-SA', 'by-nc-nd': 'CC BY-NC-ND' },
    use: { 'class': 'Занятие', web: 'Интернет', event: 'Мероприятие', print: 'Издание', promo: 'Продвижение' },
    method: { live: 'Живое исполнение', rec: 'Фонограмма' },
    money: { free: 'Без платы', paid: 'Плата или коммерция' }
  };

  var STEP_TITLE = {
    material: 'Материал', origin: 'Статус', cc: 'Лицензия',
    use: 'Использование', method: 'Способ', money: 'Оплата'
  };

  var state = {};

  function visibleSteps() {
    return STEPS.filter(function (st) { return !st.when || st.when(state); });
  }

  function currentStep() {
    var vis = visibleSteps();
    for (var i = 0; i < vis.length; i++) {
      if (state[vis[i].id] === undefined) return vis[i];
    }
    return null;
  }

  function commercial() {
    return state.use === 'promo' || state.money === 'paid';
  }

  /* ---------- правила ---------- */

  function evaluate(s) {
    var web = s.use === 'web';
    var comm = commercial();
    var res;

    /* --- своё произведение --- */
    if (s.origin === 'own') {
      res = {
        verdict: 'ok',
        title: 'Согласие не требуется',
        text: 'Произведение создано вами, поэтому разрешение третьих лиц для его использования не нужно.',
        conditions: [
          'Если в кадре есть чужие произведения — картина на стене, плакат, играющая музыка, узнаваемый дизайн — они проверяются отдельно.',
          'Если в кадре узнаваемы люди, требуется их согласие на обнародование изображения (статья 152.1 ГК РФ).',
          'Если материал создан в пределах трудовых обязанностей, исключительное право принадлежит институту — использование за пределами работы согласуется с работодателем.'
        ],
        refs: [REF.a1295]
      };
      return withWeb(res, web, s);
    }

    /* --- свободные лицензии Creative Commons --- */
    if (s.origin === 'cc') {
      var lic = s.cc;
      var isNC = lic === 'by-nc' || lic === 'by-nc-sa' || lic === 'by-nc-nd';
      var isND = lic === 'by-nd' || lic === 'by-nc-nd';
      var isSA = lic === 'by-sa' || lic === 'by-nc-sa';

      if (lic === 'cc0') {
        res = {
          verdict: 'ok',
          title: 'Использование свободно',
          text: 'Правообладатель отказался от исключительного права в максимально допустимых пределах. Лицензия не ограничивает ни коммерческое использование, ни переработку.',
          conditions: [
            'Указание автора не обязательно, но рекомендуется: это требование академической этики, а не лицензии.',
            'Право авторства охраняется бессрочно — выдавать чужое произведение за своё нельзя и под CC0.'
          ],
          refs: [REF.cc]
        };
        return withWeb(res, web, s);
      }

      if (isNC && comm) {
        return {
          verdict: 'no',
          title: 'Лицензия запрещает такое использование',
          text: 'Код NC означает запрет на использование в коммерческих целях, а выбранный сценарий к ним относится: есть плата, продажа или продвижение платных услуг.',
          conditions: [
            'Допустимые варианты: подобрать материал под CC BY, CC BY-SA или CC0, либо получить у автора отдельное разрешение на коммерческое использование.',
            'Отсутствие прямой выручки не всегда снимает коммерческий характер: реклама платных программ тоже относится к нему.'
          ],
          refs: [REF.cc, REF.a1229]
        };
      }

      var conds = ['Указать автора, название, ссылку на источник и лицензию — по формуле TASL, генератор на этой странице.'];
      if (isND) {
        conds.push('Переработка запрещена: кадрирование, обрезка, наложение текста, цветокоррекция, монтаж фрагмента в свой ролик под эту лицензию не подпадают.');
        conds.push('Допускается использование только целиком и в неизменном виде.');
      }
      if (isSA) {
        conds.push('Если материал перерабатывается или включается в составное произведение, результат распространяется на тех же условиях — под той же лицензией.');
      }
      if (isNC) {
        conds.push('Использование должно оставаться некоммерческим на всём сроке: платное мероприятие или реклама позднее потребуют другого основания.');
      }
      conds.push('Сохраните ссылку на страницу файла со сведениями о лицензии: она подтверждает правомерность использования.');
      if (s.material === 'music') {
        conds.push('Убедитесь, что лицензия распространяется и на музыкальное произведение, и на конкретную запись: у записи есть отдельный правообладатель.');
      }

      res = {
        verdict: 'cond',
        title: 'Использование допускается при соблюдении условий лицензии',
        text: 'Свободная лицензия — это заранее данное разрешение правообладателя. Оно действует ровно в тех пределах, которые обозначены кодом лицензии.',
        conditions: conds,
        refs: [REF.cc]
      };
      return withWeb(res, web, s);
    }

    /* --- общественное достояние --- */
    if (s.origin === 'pd') {
      var pdConds = [
        'Проверьте срок: исключительное право действует всю жизнь автора и 70 лет начиная с 1 января года, следующего за годом смерти.',
        'Для авторов, работавших в годы Великой Отечественной войны, срок увеличивается на 4 года; для репрессированных и реабилитированных посмертно он отсчитывается от года реабилитации.',
        'Указывайте автора и не искажайте произведение: право авторства и право на неприкосновенность охраняются бессрочно.'
      ];
      if (s.material === 'music' || s.material === 'video') {
        pdConds.push('Само произведение в общественном достоянии, но конкретная запись — нет: у исполнения и фонограммы есть собственные правообладатели и свой срок охраны. Берите запись, у которой отдельно указан свободный статус.');
      }
      if (s.material === 'text') {
        pdConds.push('Перевод — самостоятельное произведение: оригинал может быть в общественном достоянии, а перевод при этом охраняться.');
      }
      res = {
        verdict: 'cond',
        title: 'Использование свободно, но статус нужно подтвердить',
        text: 'Произведение в общественном достоянии используется без согласия и без выплаты вознаграждения. Ответственность за правильность определения срока лежит на том, кто использует материал.',
        conditions: pdConds,
        refs: [REF.a1281, REF.a1282, REF.a1266]
      };
      return withWeb(res, web, s);
    }

    /* --- сток и подписка --- */
    if (s.origin === 'stock') {
      var stockConds = [
        'Откройте текст лицензии сервиса и проверьте по списку: разрешена ли публикация в интернете, какой допустим тираж, нужна ли подпись, можно ли изменять материал.',
        'Сохраните номер заказа, лицензионный файл или снимок страницы с условиями — это доказательство правомерности.',
        'Лицензия обычно именная: материал нельзя передавать другим подразделениям или использовать в чужих проектах.'
      ];
      if (comm) {
        stockConds.unshift('Для рекламы, платных услуг и любой коммерции стандартной лицензии часто недостаточно — требуется расширенная. Проверьте это прямо в условиях.');
      }
      res = {
        verdict: 'cond',
        title: 'Решают условия конкретной лицензии сервиса',
        text: 'Материал получен законно, но объём разрешения определяется не законом, а договором с сервисом. Универсального ответа здесь нет.',
        conditions: stockConds,
        refs: [REF.a1229]
      };
      return withWeb(res, web, s);
    }

    /* --- объект в общедоступном месте --- */
    if (s.origin === 'place') {
      if (comm) {
        return {
          verdict: 'deal',
          title: 'Требуется разрешение правообладателя',
          text: 'Свободное использование по статье 1276 ГК РФ не распространяется на случаи, когда изображение используется в коммерческих целях.',
          conditions: [
            'Либо получите разрешение автора произведения — архитектора, скульптора, художника.',
            'Либо используйте материал, где охраняемый объект не является основным содержанием кадра.'
          ],
          parties: ['Автор или иной правообладатель объекта'],
          refs: [REF.a1276]
        };
      }
      res = {
        verdict: 'cond',
        title: 'Допускается при соблюдении условий статьи 1276',
        text: 'Изображение произведения, постоянно находящегося в месте, открытом для свободного посещения, можно использовать без согласия правообладателя.',
        conditions: [
          'Объект должен находиться в таком месте постоянно, а не временно: выставка, инсталляция на время фестиваля под норму не подпадают.',
          'Изображение не должно быть основным объектом использования — памятник в кадре допустим, отдельная фотография памятника крупным планом уже спорна.',
          'Использование не должно преследовать извлечение прибыли.'
        ],
        refs: [REF.a1276]
      };
      return withWeb(res, web, s);
    }

    /* --- статус неизвестен: материал охраняемый --- */

    /* музыка */
    if (s.material === 'music') {
      if (s.method === 'live') {
        if (comm) {
          return {
            verdict: 'deal',
            title: 'Требуется лицензионный договор с РАО',
            text: 'Льгота для образовательных организаций действует только при использовании без извлечения прибыли. Платный вход или коммерческая цель её снимают.',
            conditions: [
              'Договор оформляется заранее, до мероприятия: постфактум он не освобождает от ответственности.',
              'Для живого исполнения смежные права исполнителей не возникают у третьих лиц — достаточно авторских прав через РАО.',
              'Альтернатива без договора: программа из произведений в общественном достоянии или под свободными лицензиями.'
            ],
            parties: ['РАО — авторские права на музыку и текст'],
            refs: [REF.a1274, REF.rao]
          };
        }
        if (s.use === 'web') {
          return {
            verdict: 'deal',
            title: 'Запись выступления в интернет выкладывать нельзя без разрешения',
            text: 'Льгота подпункта 6 пункта 1 статьи 1274 покрывает само публичное исполнение в стенах организации, но не доведение записи до всеобщего сведения.',
            conditions: [
              'Разрешение запрашивается у автора музыки и автора текста либо у их издателя.',
              'Запись собственного исполнения содержит два слоя прав: исполнение ваше, а произведение — чужое.',
              'Рабочий вариант: выложить только фрагмент в составе новостного сюжета о мероприятии либо заменить фонограмму на композицию под свободной лицензией.'
            ],
            parties: ['Автор музыки и текста или издатель'],
            refs: [REF.a1270, REF.a1274]
          };
        }
        return {
          verdict: 'ok',
          title: 'Лицензионный договор не требуется',
          text: 'Публичное исполнение правомерно обнародованного произведения силами работников и обучающихся образовательной организации без извлечения прибыли прямо разрешено законом.',
          conditions: [
            'Произведение должно быть обнародованным.',
            'Исполнители — только работники и обучающиеся института.',
            'Вход свободный, прибыль не извлекается, в том числе через спонсорские пакеты.',
            'Слушатели — обучающиеся, работники, а также родители и воспитатели обучающихся.',
            'Запись исполнения и её публикация — отдельный вопрос: на них льгота не распространяется.'
          ],
          refs: [REF.a1274]
        };
      }

      /* фонограмма */
      if (s.use === 'web') {
        return {
          verdict: 'deal',
          title: 'Требуется разрешение правообладателей записи',
          text: 'Размещение фонограммы в интернете — доведение до всеобщего сведения. Договоры с РАО и ВОИС покрывают публичное исполнение офлайн и на этот способ не распространяются.',
          conditions: [
            'Разрешение нужно от автора музыки и текста, а также от изготовителя фонограммы и исполнителя.',
            'Практичный путь для видео: музыка под CC BY или CC BY-SA, библиотеки безопасной музыки видеохостингов, либо собственная запись живого исполнения.',
            'Автоматические системы видеохостингов блокируют ролик по фонограмме даже при некоммерческом использовании.'
          ],
          parties: ['Автор музыки и текста', 'Изготовитель фонограммы', 'Исполнитель'],
          refs: [REF.a1270, REF.a1303]
        };
      }
      return {
        verdict: 'deal',
        title: 'Требуется договор с РАО и ВОИС',
        text: 'Воспроизведение фонограммы через аппаратуру — самостоятельный способ использования. Льгота для образовательных организаций распространяется только на живое исполнение и фонограммы не покрывает.',
        conditions: [
          'РАО — за авторские права на музыку и текст, ВОИС — за смежные права исполнителя и изготовителя фонограммы. Одно другое не заменяет.',
          'Договор заключается до мероприятия; отчёт о прозвучавших произведениях подаётся по его форме.',
          'Без договора остаются два варианта: живое исполнение силами своих либо композиции под свободными лицензиями.'
        ],
        parties: ['РАО — авторские права', 'ВОИС — смежные права'],
        refs: [REF.a1270, REF.a1274, REF.rao, REF.vois]
      };
    }

    /* текст */
    if (s.material === 'text') {
      if (s.use === 'promo') {
        return {
          verdict: 'deal',
          title: 'Требуется разрешение правообладателя',
          text: 'Цитирование допускается в научных, полемических, критических, информационных и учебных целях. Продвижение и реклама в этот перечень не входят.',
          conditions: [
            'Запросите разрешение у автора или издателя — форма запроса есть на этой странице.',
            'Альтернатива: заменить цитату на собственную формулировку либо на материал под свободной лицензией.'
          ],
          parties: ['Автор или издатель'],
          refs: [REF.a1274, REF.a1229]
        };
      }
      if (s.use === 'event') {
        if (comm) {
          return {
            verdict: 'deal',
            title: 'Требуется разрешение правообладателя',
            text: 'Публичное чтение текста — публичное исполнение произведения. При платном входе льгота для образовательных организаций не применяется.',
            conditions: ['Разрешение запрашивается у автора или издателя, либо программа формируется из произведений в общественном достоянии.'],
            parties: ['Автор или издатель'],
            refs: [REF.a1274]
          };
        }
        return {
          verdict: 'ok',
          title: 'Публичное чтение допускается',
          text: 'Чтение обнародованного произведения силами обучающихся и работников без извлечения прибыли охватывается льготой для образовательных организаций.',
          conditions: [
            'Произведение обнародовано, читают работники или обучающиеся, вход свободный.',
            'Объявите автора и название — со сцены или в программе мероприятия.'
          ],
          refs: [REF.a1274]
        };
      }
      res = {
        verdict: 'cond',
        title: 'Допускается в объёме цитирования',
        text: 'Цитирование в учебных и научных целях разрешено законом и не требует согласия автора. Объём и оформление определяют, останется ли это цитированием.',
        conditions: [
          'Фрагмент приводится для подтверждения или разбора собственного тезиса, а не вместо него.',
          'Объём оправдан целью: воспроизведение главы или значительной части текста цитированием не является.',
          'Обязательно указываются имя автора, название произведения и источник заимствования.',
          'Цитата приводится без изменений; сокращения обозначаются многоточием в угловых скобках.',
          'Перевод — переработка произведения: указывается и автор оригинала, и переводчик.'
        ],
        refs: [REF.a1274, REF.a1266]
      };
      return withWeb(res, web, s);
    }

    /* изображение */
    if (s.material === 'image') {
      if (s.use === 'promo' || comm) {
        return {
          verdict: 'deal',
          title: 'Требуется разрешение правообладателя',
          text: 'Свободное использование в учебных целях не покрывает рекламу, продвижение и коммерческие материалы. Для них нужно разрешение или лицензионный материал.',
          conditions: [
            'Наиболее быстрый путь — подобрать изображение под CC BY, CC0 или на стоке с подходящей лицензией.',
            'Если нужно конкретное изображение, запросите разрешение у автора и сохраните ответ.'
          ],
          parties: ['Автор или иной правообладатель'],
          refs: [REF.a1229, REF.a1270]
        };
      }
      if (s.use === 'web') {
        return {
          verdict: 'deal',
          title: 'Для открытой публикации нужно основание',
          text: 'Размещение чужой фотографии в открытом доступе — доведение до всеобщего сведения. Это самостоятельный способ использования, и разрешение на показ в аудитории его не покрывает. Именно на этом чаще всего строятся претензии фотобанков.',
          conditions: [
            'Безопасный путь: заменить изображение на материал под свободной лицензией или снять своё.',
            'Если изображение приводится как объект разбора в информационном или научном материале, возможно цитирование — но объём, цель и указание автора должны быть безупречны, а риск спора остаётся.',
            'Указание автора без правового основания само по себе использование не оправдывает.'
          ],
          parties: ['Автор или иной правообладатель'],
          refs: [REF.a1270, REF.a1274]
        };
      }
      if (s.use === 'event') {
        res = {
          verdict: 'cond',
          title: 'Допустимо с ограничениями',
          text: 'Показ изображения на экране во время мероприятия — публичный показ произведения. Для закрытого мероприятия без платы риск невысок, но специальной льготы для показа изображений закон не содержит.',
          conditions: [
            'Изображение используется как иллюстрация, а не как самостоятельный объект показа и не как оформление афиши.',
            'Вход свободный, прибыль не извлекается.',
            'Укажите автора и источник на слайде или в титрах.',
            'Для афиш, баннеров и оформления сцены берите материал под свободной лицензией: там ограничений нет.'
          ],
          refs: [REF.a1270, REF.a1274]
        };
        return res;
      }
      res = {
        verdict: 'cond',
        title: 'Допускается как иллюстрация в учебных целях',
        text: 'Использование изображений в качестве иллюстраций в изданиях и материалах учебного характера разрешено законом в объёме, оправданном поставленной целью.',
        conditions: [
          'Изображение иллюстрирует учебный материал, а не заменяет его и не служит украшением.',
          'Указываются имя автора и источник заимствования — на слайде, под иллюстрацией или в перечне источников.',
          'Изображение не изменяется: обрезка, наложение текста, применение фильтров затрагивают право на неприкосновенность произведения.',
          'Круг получателей ограничен обучающимися и работниками. Выкладывание того же материала в открытый доступ проверяется заново.'
        ],
        refs: [REF.a1274, REF.a1266]
      };
      return withWeb(res, web, s);
    }

    /* видео */
    if (s.material === 'video') {
      if (s.use === 'class') {
        return {
          verdict: 'cond',
          title: 'Показ фрагмента на занятии допустим',
          text: 'Демонстрация фрагмента в учебных целях ограниченному кругу обучающихся охватывается свободным использованием в учебных целях.',
          conditions: [
            'Показывается фрагмент в объёме, оправданном учебной задачей, а не фильм целиком вместо занятия.',
            'Источник получен законно: официальный сервис, диск, библиотека. Пиратская копия правомерной демонстрацию не делает.',
            'Называются автор и название произведения.',
            'Запись показа и её публикация — отдельный случай, проверяется заново.'
          ],
          refs: [REF.a1274]
        };
      }
      return {
        verdict: 'deal',
        title: 'Требуется разрешение правообладателя',
        text: 'Публикация, публичный показ вне занятия и включение чужого видео в собственный ролик выходят за пределы свободного использования.',
        conditions: [
          'Разрешение запрашивается у правообладателя — студии, продюсерского центра, автора ролика.',
          'Для видеоряда используйте материалы под свободными лицензиями: в каталоге на этой странице они помечены.',
          'Встраивание проигрывателя с официального канала вместо копирования файла — способ показать материал, не воспроизводя его.'
        ],
        parties: ['Правообладатель видеоматериала'],
        refs: [REF.a1270, REF.a1229]
      };
    }

    return {
      verdict: 'deal',
      title: 'Случай требует отдельной оценки',
      text: 'Сочетание условий выходит за пределы типовых. Обратитесь в правовой отдел института.',
      conditions: [],
      refs: [REF.a1229]
    };
  }

  /* предупреждение про интернет добавляется к «мягким» вердиктам */
  function withWeb(res, isWeb, s) {
    if (isWeb && s.origin !== 'own') {
      res.warn = 'Публикация в интернете — самостоятельный способ использования, доведение до всеобщего сведения (подпункт 11 пункта 2 статьи 1270). Проверьте, что выбранное основание покрывает именно его: разрешение на показ в аудитории интернет не охватывает.';
    }
    return res;
  }

  /* ---------- отрисовка мастера ---------- */

  function renderWizard() {
    var stepBox = $('wzStep');
    var resultBox = $('wzResult');
    var actions = $('wzActions');
    if (!stepBox) return;

    renderCrumbs();
    renderProgress();

    var step = currentStep();
    stepBox.innerHTML = '';
    actions.innerHTML = '';

    if (step) {
      resultBox.hidden = true;
      resultBox.innerHTML = '';

      stepBox.appendChild(el('div', 'tool-q', step.q));
      if (step.hint) stepBox.appendChild(el('div', 'tool-hint', step.hint));

      var opts = typeof step.opts === 'function' ? step.opts(state) : step.opts;
      var box = el('div', 'opts');
      opts.forEach(function (o) {
        var b = el('button', 'opt');
        b.type = 'button';
        b.appendChild(el('span', 'opt-radio'));
        var txt = el('span', 'opt-text');
        txt.appendChild(el('b', null, o.t));
        txt.appendChild(el('span', null, o.s));
        b.appendChild(txt);
        b.addEventListener('click', function () {
          state[step.id] = o.v;
          cleanupState();
          renderWizard();
        });
        box.appendChild(b);
      });
      stepBox.appendChild(box);

      if (Object.keys(state).length) {
        var back = el('button', 'btn btn-ghost btn-sm', 'Назад');
        back.type = 'button';
        back.addEventListener('click', stepBack);
        actions.appendChild(back);
        actions.appendChild(resetBtn());
      }
      return;
    }

    renderResult(evaluate(state));
    actions.appendChild(resetBtn());
    var back2 = el('button', 'btn btn-ghost btn-sm', 'Изменить последний ответ');
    back2.type = 'button';
    back2.addEventListener('click', stepBack);
    actions.appendChild(back2);
  }

  function resetBtn() {
    var b = el('button', 'btn btn-secondary btn-sm', 'Начать заново');
    b.type = 'button';
    b.addEventListener('click', function () { state = {}; renderWizard(); });
    return b;
  }

  function stepBack() {
    var vis = visibleSteps();
    for (var i = vis.length - 1; i >= 0; i--) {
      if (state[vis[i].id] !== undefined) { delete state[vis[i].id]; break; }
    }
    cleanupState();
    renderWizard();
  }

  /* убирает ответы на шаги, ставшие неактуальными */
  function cleanupState() {
    STEPS.forEach(function (st) {
      if (st.when && !st.when(state)) delete state[st.id];
    });
  }

  function renderCrumbs() {
    var box = $('wzCrumbs');
    box.innerHTML = '';
    visibleSteps().forEach(function (st) {
      var v = state[st.id];
      if (v === undefined) return;
      var c = el('button', 'crumb');
      c.type = 'button';
      c.title = 'Изменить ответ';
      c.appendChild(el('span', null, STEP_TITLE[st.id] + ':'));
      c.appendChild(document.createTextNode(' ' + (LABEL[st.id][v] || v)));
      c.addEventListener('click', function () {
        var reached = false;
        visibleSteps().forEach(function (s2) {
          if (s2.id === st.id) reached = true;
          if (reached) delete state[s2.id];
        });
        cleanupState();
        renderWizard();
      });
      box.appendChild(c);
    });
  }

  function renderProgress() {
    var vis = visibleSteps();
    var box = $('wzProgress');
    box.innerHTML = '';
    var answered = 0;
    vis.forEach(function (st) {
      var d = el('span', 'wz-dot');
      if (state[st.id] !== undefined) { d.classList.add('done'); answered++; }
      box.appendChild(d);
    });
    $('wzCount').textContent = answered === vis.length
      ? 'Все вопросы пройдены'
      : 'Вопрос ' + (answered + 1) + ' из ' + vis.length;
  }

  function renderResult(r) {
    var box = $('wzResult');
    box.hidden = false;
    box.innerHTML = '';

    var tags = { ok: 'Можно', cond: 'Можно при условиях', deal: 'Нужно разрешение', no: 'Нельзя' };
    var icons = { ok: '✓', cond: '!', deal: '§', no: '×' };

    var v = el('div', 'verdict ' + r.verdict);
    v.appendChild(el('span', 'verdict-icon', icons[r.verdict]));

    var body = el('div', 'verdict-body');
    body.appendChild(el('span', 'vd-tag', tags[r.verdict]));
    body.appendChild(el('h4', null, r.title));
    body.appendChild(el('p', null, r.text));

    if (r.conditions && r.conditions.length) {
      var cb = el('div', 'vd-block');
      cb.appendChild(el('h5', null, r.verdict === 'no' ? 'Что можно сделать вместо этого' : 'Условия и порядок действий'));
      var ul = el('ul', 'vd-list');
      r.conditions.forEach(function (c) { ul.appendChild(el('li', null, c)); });
      cb.appendChild(ul);
      body.appendChild(cb);
    }

    if (r.parties && r.parties.length) {
      var pb = el('div', 'vd-block');
      pb.appendChild(el('h5', null, 'С кем оформляются отношения'));
      var pul = el('ul', 'vd-list');
      r.parties.forEach(function (p) { pul.appendChild(el('li', null, p)); });
      pb.appendChild(pul);
      body.appendChild(pb);
    }

    if (r.warn) {
      var w = el('div', 'vd-warn');
      w.appendChild(el('b', null, 'Обратите внимание. '));
      w.appendChild(document.createTextNode(r.warn));
      body.appendChild(w);
    }

    if (r.refs && r.refs.length) {
      var rb = el('div', 'vd-block');
      rb.appendChild(el('h5', null, 'Основание'));
      var refs = el('div', 'vd-refs');
      r.refs.forEach(function (ref) {
        var a = el('a', 'vd-ref', ref.t);
        a.href = ref.u;
        a.target = '_blank';
        a.rel = 'noopener';
        refs.appendChild(a);
      });
      rb.appendChild(refs);
      body.appendChild(rb);
    }

    var actions = el('div', 'vd-block');
    var copy = el('button', 'copy-btn', 'Скопировать вывод для протокола');
    copy.type = 'button';
    copy.addEventListener('click', function () { copyText(resultAsText(r), copy); });
    actions.appendChild(copy);
    body.appendChild(actions);

    v.appendChild(body);
    box.appendChild(v);
  }

  function resultAsText(r) {
    var vis = visibleSteps();
    var lines = ['Проверка использования материала, ' + ruDate(new Date()), ''];
    vis.forEach(function (st) {
      if (state[st.id] !== undefined) {
        lines.push(STEP_TITLE[st.id] + ': ' + (LABEL[st.id][state[st.id]] || state[st.id]));
      }
    });
    lines.push('', 'Вывод: ' + r.title, r.text);
    if (r.conditions && r.conditions.length) {
      lines.push('', 'Условия:');
      r.conditions.forEach(function (c, i) { lines.push((i + 1) + '. ' + c); });
    }
    if (r.parties && r.parties.length) {
      lines.push('', 'Отношения оформляются с: ' + r.parties.join('; ') + '.');
    }
    if (r.refs && r.refs.length) {
      lines.push('', 'Основание: ' + r.refs.map(function (x) { return x.t; }).join('; ') + '.');
    }
    lines.push('', 'Вывод носит справочный характер и не является юридическим заключением.');
    return lines.join('\n');
  }

  /* ============================================================
     2. ГЕНЕРАТОР УКАЗАНИЯ АВТОРА (TASL)
     ============================================================ */

  var LICENSES = [
    { id: 'by', name: 'CC BY 4.0', url: 'https://creativecommons.org/licenses/by/4.0/deed.ru', nc: false, nd: false, sa: false },
    { id: 'by-sa', name: 'CC BY-SA 4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.ru', nc: false, nd: false, sa: true },
    { id: 'by-nd', name: 'CC BY-ND 4.0', url: 'https://creativecommons.org/licenses/by-nd/4.0/deed.ru', nc: false, nd: true, sa: false },
    { id: 'by-nc', name: 'CC BY-NC 4.0', url: 'https://creativecommons.org/licenses/by-nc/4.0/deed.ru', nc: true, nd: false, sa: false },
    { id: 'by-nc-sa', name: 'CC BY-NC-SA 4.0', url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ru', nc: true, nd: false, sa: true },
    { id: 'by-nc-nd', name: 'CC BY-NC-ND 4.0', url: 'https://creativecommons.org/licenses/by-nc-nd/4.0/deed.ru', nc: true, nd: true, sa: false },
    { id: 'cc0', name: 'CC0 1.0', url: 'https://creativecommons.org/publicdomain/zero/1.0/deed.ru', nc: false, nd: false, sa: false },
    { id: 'pd', name: 'общественное достояние', url: '', nc: false, nd: false, sa: false },
    { id: 'unsplash', name: 'Unsplash License', url: 'https://unsplash.com/license', nc: false, nd: false, sa: false },
    { id: 'pexels', name: 'Pexels License', url: 'https://www.pexels.com/license/', nc: false, nd: false, sa: false },
    { id: 'custom', name: 'другая — указать вручную', url: '', nc: false, nd: false, sa: false }
  ];

  function initAttribution() {
    var sel = $('atLic');
    if (!sel) return;

    LICENSES.forEach(function (l) {
      var o = document.createElement('option');
      o.value = l.id;
      o.textContent = l.name;
      sel.appendChild(o);
    });

    var custom = el('input', 'inp');
    custom.type = 'text';
    custom.placeholder = 'название лицензии, как указано у файла';
    custom.hidden = true;
    custom.id = 'atLicCustom';
    sel.parentNode.appendChild(custom);

    var dateInput = $('atDate');
    dateInput.value = isoDate(new Date());

    var ids = ['atTitle', 'atAuthor', 'atUrl', 'atLic', 'atSite', 'atDate'];
    ids.forEach(function (id) {
      $(id).addEventListener('input', renderAttribution);
      $(id).addEventListener('change', renderAttribution);
    });
    custom.addEventListener('input', renderAttribution);
    sel.addEventListener('change', function () {
      custom.hidden = sel.value !== 'custom';
      renderAttribution();
    });

    renderAttribution();
  }

  function licenseName() {
    var sel = $('atLic');
    if (sel.value === 'custom') {
      var c = $('atLicCustom');
      return c && c.value.trim() ? c.value.trim() : '';
    }
    var found = LICENSES.filter(function (l) { return l.id === sel.value; })[0];
    return found ? found.name : '';
  }

  function renderAttribution() {
    var title = $('atTitle').value.trim();
    var author = $('atAuthor').value.trim();
    var url = $('atUrl').value.trim();
    var site = $('atSite').value.trim();
    var lic = licenseName();
    var dv = $('atDate').value;
    var date = dv ? ruDate(new Date(dv + 'T00:00:00')) : ruDate(new Date());

    var t = title || 'Без названия';
    var a = author || 'автор не указан';
    var s = site || (url ? hostOf(url) : 'источник не указан');

    /* 1. подпись под иллюстрацией */
    var slide = '«' + t + '» — ' + a;
    if (lic) slide += ', ' + lic;

    /* 2. строка перечня источников */
    var list = a + '. ' + t + ' : [сайт ' + s + ']. URL: ' + (url || 'ссылка не указана') +
      ' (дата обращения: ' + date + ').';
    if (lic) list += ' Лицензия: ' + lic + '.';

    /* 3. сноска по ГОСТ Р 7.0.5-2008 */
    var gost = a + '. ' + t + ' [Электронный ресурс] // ' + s + '. URL: ' + (url || 'ссылка не указана') +
      ' (дата обращения: ' + date + ').';
    if (lic) gost += ' — Лицензия: ' + lic + '.';

    var box = $('atOut');
    box.innerHTML = '';
    box.appendChild(outputBlock('Подпись под иллюстрацией', 'слайд презентации, титры, подпись на стенде', slide));
    box.appendChild(outputBlock('Строка в перечне источников', 'список использованных материалов в конце работы', list));
    box.appendChild(outputBlock('Сноска по ГОСТ Р 7.0.5-2008', 'подстрочная ссылка в научной работе', gost));
  }

  function hostOf(url) {
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return url; }
  }

  function outputBlock(title, sub, text) {
    var wrap = el('div', 'out');
    var head = el('div', 'out-head');
    var left = el('div');
    left.appendChild(el('b', null, title));
    left.appendChild(el('span', 'sub', sub));
    head.appendChild(left);
    var btn = el('button', 'copy-btn', 'Копировать');
    btn.type = 'button';
    btn.addEventListener('click', function () { copyText(text, btn); });
    head.appendChild(btn);
    wrap.appendChild(head);
    wrap.appendChild(el('p', 'out-body', text));
    return wrap;
  }

  /* ============================================================
     3. ЗАПРОС ПРАВООБЛАДАТЕЛЮ
     ============================================================ */

  var WAYS = [
    { id: 'repro', t: 'Воспроизведение — изготовление экземпляров, копирование файла' },
    { id: 'show', t: 'Публичный показ — демонстрация на экране' },
    { id: 'perform', t: 'Публичное исполнение — звучание на мероприятии' },
    { id: 'web', t: 'Доведение до всеобщего сведения — размещение в интернете' },
    { id: 'spread', t: 'Распространение экземпляров — раздача печатных материалов' },
    { id: 'derive', t: 'Переработка — кадрирование, монтаж, перевод, аранжировка' }
  ];

  function initLetter() {
    var box = $('lrWays');
    if (!box) return;

    WAYS.forEach(function (w, i) {
      var lab = el('label', 'chk');
      var inp = document.createElement('input');
      inp.type = 'checkbox';
      inp.value = w.t;
      inp.id = 'way-' + w.id;
      if (i === 0) inp.checked = true;
      lab.appendChild(inp);
      lab.appendChild(el('span', null, w.t));
      box.appendChild(lab);
      inp.addEventListener('change', renderLetter);
    });

    ['lrTo', 'lrEmail', 'lrWork', 'lrSource', 'lrPurpose', 'lrPlace', 'lrTerm', 'lrTerr',
      'lrName', 'lrRole', 'lrContacts', 'lrNonComm'].forEach(function (id) {
      var n = $(id);
      if (!n) return;
      n.addEventListener('input', renderLetter);
      n.addEventListener('change', renderLetter);
    });

    $('lrDownload').addEventListener('click', function () {
      var blob = new Blob([letterText()], { type: 'text/plain;charset=utf-8' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'запрос-правообладателю.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    });

    $('lrMail').addEventListener('click', function () {
      var to = $('lrEmail').value.trim();
      if (!to) { toast('Укажите электронную почту адресата'); $('lrEmail').focus(); return; }
      var subject = 'Запрос разрешения на использование произведения';
      window.location.href = 'mailto:' + encodeURIComponent(to) +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(letterText());
    });

    renderLetter();
  }

  function val(id, fallbackText) {
    var n = $(id);
    var v = n ? (n.value || '').trim() : '';
    return v || fallbackText;
  }

  function letterText() {
    var to = val('lrTo', '[имя правообладателя]');
    var work = val('lrWork', '[название произведения]');
    var source = val('lrSource', '[ссылка на страницу размещения]');
    var purpose = val('lrPurpose', '[цель использования]');
    var place = val('lrPlace', '[где будет размещено]');
    var term = val('lrTerm', '[срок]');
    var terr = val('lrTerr', 'Российская Федерация');
    var name = val('lrName', '[ФИО]');
    var role = val('lrRole', '[должность]');
    var contacts = val('lrContacts', '[контакты для ответа]');
    var nonComm = $('lrNonComm') ? $('lrNonComm').checked : true;

    var ways = [];
    WAYS.forEach(function (w) {
      var n = $('way-' + w.id);
      if (n && n.checked) ways.push(w.t);
    });
    if (!ways.length) ways.push('[способы использования не выбраны]');

    var lines = [];
    lines.push('Уважаемый(ая) ' + to + '!');
    lines.push('');
    lines.push('Обращаюсь к Вам как к правообладателю произведения: ' + work + '.');
    lines.push('Произведение размещено по адресу: ' + source + '.');
    lines.push('');
    lines.push('Прошу разрешить его использование. Цель использования: ' + purpose + '.');
    lines.push('Материал планируется разместить: ' + place + '.');
    lines.push('');
    lines.push('Планируемые способы использования:');
    ways.forEach(function (w) { lines.push('— ' + w + ';'); });
    lines.push('');
    lines.push('Срок использования: ' + term + '.');
    lines.push('Территория использования: ' + terr + '.');
    if (nonComm) {
      lines.push('Использование носит некоммерческий характер, извлечение прибыли не предполагается.');
    }
    lines.push('');
    lines.push('При использовании будут указаны Ваше имя, название произведения и ссылка на источник.');
    lines.push('Изменение произведения без Вашего отдельного согласия не планируется.');
    lines.push('');
    lines.push('Прошу сообщить о согласии либо об отказе ответным письмом. Ответ, направленный по электронной почте, будет сохранён в качестве подтверждения полученного разрешения.');
    lines.push('');
    lines.push('С уважением,');
    lines.push(name + ', ' + role);
    lines.push(contacts);
    lines.push(ruDate(new Date()));

    return lines.join('\n');
  }

  function renderLetter() {
    var box = $('lrOut');
    if (!box) return;
    box.innerHTML = '';
    box.appendChild(outputBlock('Текст запроса', 'проверьте перед отправкой и дополните при необходимости', letterText()));
  }

  /* ============================================================
     4. КАТАЛОГ ИСТОЧНИКОВ
     ============================================================ */

  var SOURCES = [
    { n: 'Wikimedia Commons', u: 'https://commons.wikimedia.org/', type: 'image', lic: 'CC0, CC BY, CC BY-SA, общественное достояние', attr: 'dep', comm: 'dep', mod: 'dep', reg: 'no', note: 'Лицензия указана на странице каждого файла — встречается весь диапазон условий.' },
    { n: 'Openverse', u: 'https://openverse.org/', type: 'image', lic: 'поиск по материалам CC', attr: 'dep', comm: 'dep', mod: 'dep', reg: 'no', note: 'Метапоиск по свободным материалам: нужные условия задаются фильтром в самом поиске.' },
    { n: 'Flickr, раздел Creative Commons', u: 'https://www.flickr.com/creativecommons/', type: 'image', lic: 'от CC BY до CC BY-NC-ND', attr: 'yes', comm: 'dep', mod: 'dep', reg: 'no', note: 'Часть материалов под NC: для продвижения и платных мероприятий не подойдут.' },
    { n: 'Unsplash', u: 'https://unsplash.com/', type: 'image', lic: 'Unsplash License', attr: 'no', comm: 'yes', mod: 'yes', reg: 'no', note: 'Указание автора не обязательно, но рекомендуется. Запрещена перепродажа самих фотографий.' },
    { n: 'Pexels', u: 'https://www.pexels.com/', type: 'image', lic: 'Pexels License', attr: 'no', comm: 'yes', mod: 'yes', reg: 'no', note: 'Нельзя выдавать фотографии за собственные и использовать изображения людей в порочащем контексте.' },
    { n: 'Pixabay', u: 'https://pixabay.com/', type: 'image', lic: 'Pixabay Content License', attr: 'no', comm: 'yes', mod: 'yes', reg: 'no', note: 'Товарные знаки и узнаваемые люди в кадре требуют отдельной проверки.' },
    { n: 'The Met Open Access', u: 'https://www.metmuseum.org/art/collection', type: 'image', lic: 'CC0', attr: 'no', comm: 'yes', mod: 'yes', reg: 'no', note: 'Оцифрованные произведения из собрания музея, отмеченные знаком открытого доступа.' },
    { n: 'Smithsonian Open Access', u: 'https://www.si.edu/openaccess', type: 'image', lic: 'CC0', attr: 'no', comm: 'yes', mod: 'yes', reg: 'no', note: 'Более четырёх миллионов изображений и трёхмерных моделей.' },
    { n: 'NASA Image and Video Library', u: 'https://images.nasa.gov/', type: 'image', lic: 'общественное достояние США', attr: 'no', comm: 'yes', mod: 'yes', reg: 'no', note: 'Отдельные материалы содержат охраняемые элементы: эмблемы, изображения людей, чужие снимки.' },
    { n: 'Free Music Archive', u: 'https://freemusicarchive.org/', type: 'audio', lic: 'CC BY, CC BY-SA, CC BY-NC', attr: 'yes', comm: 'dep', mod: 'dep', reg: 'no', note: 'Условия указаны у каждого трека: часть каталога закрыта для коммерческого использования.' },
    { n: 'Jamendo', u: 'https://www.jamendo.com/start', type: 'audio', lic: 'CC, преимущественно NC', attr: 'yes', comm: 'dep', mod: 'dep', reg: 'dep', note: 'Для мероприятий с платным входом сервис предлагает отдельную платную лицензию.' },
    { n: 'Freesound', u: 'https://freesound.org/', type: 'audio', lic: 'CC0, CC BY, CC BY-NC', attr: 'dep', comm: 'dep', mod: 'dep', reg: 'yes', note: 'Звуковые эффекты и шумы. Для скачивания нужна учётная запись.' },
    { n: 'Musopen', u: 'https://musopen.org/', type: 'audio', lic: 'общественное достояние, CC', attr: 'dep', comm: 'dep', mod: 'dep', reg: 'dep', note: 'Классика: произведение в общественном достоянии, но конкретная запись охраняется смежными правами — статус указан у файла.' },
    { n: 'ccMixter', u: 'http://ccmixter.org/', type: 'audio', lic: 'CC BY, CC BY-NC', attr: 'yes', comm: 'dep', mod: 'dep', reg: 'no', note: 'Ремиксы и инструментальные дорожки для видео.' },
    { n: 'Internet Archive', u: 'https://archive.org/', type: 'video', lic: 'разные, включая общественное достояние', attr: 'dep', comm: 'dep', mod: 'dep', reg: 'no', note: 'Архив разнородный: статус проверяется у каждой записи отдельно.' },
    { n: 'Vimeo, раздел Creative Commons', u: 'https://vimeo.com/creativecommons', type: 'video', lic: 'лицензии CC', attr: 'yes', comm: 'dep', mod: 'dep', reg: 'no', note: 'Фильтр по конкретной лицензии задаётся в разделе.' },
    { n: 'Pexels Videos', u: 'https://www.pexels.com/videos/', type: 'video', lic: 'Pexels License', attr: 'no', comm: 'yes', mod: 'yes', reg: 'no', note: 'Короткие ролики для фона и перебивок.' },
    { n: 'Coverr', u: 'https://coverr.co/', type: 'video', lic: 'Coverr License', attr: 'no', comm: 'yes', mod: 'yes', reg: 'no', note: 'Видеофоны для заставок и сайта.' },
    { n: 'DOAJ — каталог журналов открытого доступа', u: 'https://www.doaj.org/', type: 'text', lic: 'открытый доступ, чаще CC BY', attr: 'yes', comm: 'dep', mod: 'dep', reg: 'no', note: 'Лицензия указана в самой статье и может отличаться от журнала к журналу.' },
    { n: 'Викитека', u: 'https://ru.wikisource.org/', type: 'text', lic: 'общественное достояние, CC BY-SA', attr: 'dep', comm: 'dep', mod: 'dep', reg: 'no', note: 'Тексты, перешедшие в общественное достояние, и свободные переводы.' },
    { n: 'Проект «Гутенберг»', u: 'https://www.gutenberg.org/', type: 'text', lic: 'общественное достояние США', attr: 'no', comm: 'dep', mod: 'dep', reg: 'no', note: 'Срок охраны в России может отличаться от американского — проверяйте по статье 1281 ГК РФ.' },
    { n: 'Научная электронная библиотека eLIBRARY', u: 'https://elibrary.ru/', type: 'text', lic: 'по условиям правообладателя', attr: 'yes', comm: 'no', mod: 'no', reg: 'yes', note: 'Материалы охраняются: допускается цитирование, а не перепечатка.' }
  ];

  var TYPE_LABEL = { image: 'Изображения', audio: 'Аудио', video: 'Видео', text: 'Тексты' };

  var catState = { type: 'all', attr: false, comm: false, reg: false, q: '' };

  function initCatalog() {
    var box = $('catFilters');
    if (!box) return;

    var g1 = el('div', 'filter-group');
    g1.appendChild(el('span', 'lbl', 'Тип материала'));
    var chips = el('div', 'chips');
    [['all', 'Все'], ['image', 'Изображения'], ['audio', 'Аудио'], ['video', 'Видео'], ['text', 'Тексты']]
      .forEach(function (pair) {
        var c = el('button', 'chip' + (pair[0] === 'all' ? ' active' : ''), pair[1]);
        c.type = 'button';
        c.dataset.type = pair[0];
        c.addEventListener('click', function () {
          catState.type = pair[0];
          chips.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('active'); });
          c.classList.add('active');
          renderCatalog();
        });
        chips.appendChild(c);
      });
    g1.appendChild(chips);
    box.appendChild(g1);

    var g2 = el('div', 'filter-group');
    g2.appendChild(el('span', 'lbl', 'Условия'));
    var chips2 = el('div', 'chips');
    [['attr', 'Без указания автора'], ['comm', 'Коммерческое использование'], ['reg', 'Без регистрации']]
      .forEach(function (pair) {
        var c = el('button', 'chip', pair[1]);
        c.type = 'button';
        c.addEventListener('click', function () {
          catState[pair[0]] = !catState[pair[0]];
          c.classList.toggle('active', catState[pair[0]]);
          renderCatalog();
        });
        chips2.appendChild(c);
      });
    g2.appendChild(chips2);
    box.appendChild(g2);

    var g3 = el('div', 'filter-group');
    g3.appendChild(el('span', 'lbl', 'Поиск'));
    var inp = el('input', 'inp');
    inp.type = 'search';
    inp.placeholder = 'название ресурса';
    inp.style.minWidth = '200px';
    inp.addEventListener('input', function () { catState.q = inp.value.trim().toLowerCase(); renderCatalog(); });
    g3.appendChild(inp);
    box.appendChild(g3);

    renderCatalog();
  }

  function renderCatalog() {
    var grid = $('catGrid');
    grid.innerHTML = '';

    var list = SOURCES.filter(function (s) {
      if (catState.type !== 'all' && s.type !== catState.type) return false;
      if (catState.attr && s.attr !== 'no') return false;
      if (catState.comm && s.comm !== 'yes') return false;
      if (catState.reg && s.reg !== 'no') return false;
      if (catState.q && s.n.toLowerCase().indexOf(catState.q) === -1) return false;
      return true;
    });

    $('catCount').textContent = list.length
      ? 'Подходит ресурсов: ' + list.length + ' из ' + SOURCES.length
      : '';

    if (!list.length) {
      var empty = el('div', 'cat-empty', 'Под заданные условия ресурсов нет. Снимите часть фильтров: полностью свободных каталогов с гарантированным коммерческим использованием немного.');
      grid.appendChild(empty);
      return;
    }

    list.forEach(function (s) {
      var card = el('div', 'cat-card');
      card.appendChild(el('span', 'cat-type', TYPE_LABEL[s.type]));
      var h = el('h4');
      var a = el('a', null, s.n);
      a.href = s.u;
      a.target = '_blank';
      a.rel = 'noopener';
      h.appendChild(a);
      card.appendChild(h);
      card.appendChild(el('p', 'cat-lic', 'Лицензии: ' + s.lic));
      card.appendChild(el('p', 'cat-note', s.note));

      var props = el('div', 'cat-props');
      props.appendChild(prop('Автор: ' + ({ yes: 'указывать', no: 'не обязательно', dep: 'зависит от файла' })[s.attr],
        s.attr === 'no' ? 'yes' : (s.attr === 'dep' ? 'dep' : '')));
      props.appendChild(prop('Коммерческое: ' + ({ yes: 'да', no: 'нет', dep: 'зависит' })[s.comm],
        s.comm === 'yes' ? 'yes' : (s.comm === 'no' ? 'no' : 'dep')));
      props.appendChild(prop('Изменения: ' + ({ yes: 'да', no: 'нет', dep: 'зависит' })[s.mod],
        s.mod === 'yes' ? 'yes' : (s.mod === 'no' ? 'no' : 'dep')));
      props.appendChild(prop('Регистрация: ' + ({ yes: 'нужна', no: 'не нужна', dep: 'для части файлов' })[s.reg],
        s.reg === 'no' ? 'yes' : 'dep'));
      card.appendChild(props);

      grid.appendChild(card);
    });
  }

  function prop(text, cls) {
    return el('span', 'prop' + (cls ? ' ' + cls : ''), text);
  }

  /* ============================================================
     5. СОВМЕСТИМОСТЬ ЛИЦЕНЗИЙ
     ============================================================ */

  var CC_PICK = LICENSES.filter(function (l) {
    return ['cc0', 'by', 'by-sa', 'by-nd', 'by-nc', 'by-nc-sa', 'by-nc-nd', 'pd'].indexOf(l.id) !== -1;
  });

  function initCC() {
    var a = $('ccA'), b = $('ccB');
    if (!a) return;
    CC_PICK.forEach(function (l) {
      [a, b].forEach(function (sel) {
        var o = document.createElement('option');
        o.value = l.id;
        o.textContent = l.name;
        sel.appendChild(o);
      });
    });
    a.value = 'by';
    b.value = 'by-sa';
    a.addEventListener('change', renderCC);
    b.addEventListener('change', renderCC);
    renderCC();
  }

  function licById(id) {
    return CC_PICK.filter(function (l) { return l.id === id; })[0];
  }

  function combine(a, b) {
    var free = function (l) { return l.id === 'cc0' || l.id === 'pd'; };

    if (a.nd || b.nd) {
      return {
        ok: false,
        title: 'Объединять нельзя',
        text: 'Код ND запрещает создание производных произведений. Включение материала в презентацию с изменениями, в коллаж, в монтаж ролика — это переработка, и лицензия её не допускает.',
        conditions: [
          'Материал под ND можно использовать целиком и без изменений, разместив его отдельно — например, как самостоятельную иллюстрацию с подписью.',
          'Для объединения потребуется отдельное разрешение автора либо замена материала.'
        ]
      };
    }

    if (a.sa && b.sa && a.id !== b.id) {
      return {
        ok: false,
        title: 'Объединять нельзя',
        text: 'Обе лицензии требуют распространять результат на тех же условиях, но условия у них разные. Выполнить оба требования одновременно невозможно.',
        conditions: ['Замените один из материалов на совместимый: к CC BY-SA подходят CC BY, CC0 и сам CC BY-SA.']
      };
    }

    var sa = a.sa ? a : (b.sa ? b : null);
    if (sa) {
      var other = sa === a ? b : a;
      if (other.nc && !sa.nc) {
        return {
          ok: false,
          title: 'Объединять нельзя',
          text: 'CC BY-SA требует распространять результат под той же лицензией, а она разрешает коммерческое использование. Материал под NC этого не допускает — требования противоречат друг другу.',
          conditions: ['Это самая частая ошибка при смешивании лицензий. Замените NC-материал либо возьмите вместо BY-SA материал под CC BY.']
        };
      }
      return {
        ok: true,
        title: 'Объединять можно',
        text: 'Результат распространяется под лицензией ' + sa.name + ': условие «на тех же условиях» переходит на всё производное произведение.',
        conditions: [
          'Укажите авторов обоих исходных материалов и лицензию каждого.',
          'Опубликуйте результат под ' + sa.name + ' и сохраните возможность дальнейшего свободного использования.'
        ]
      };
    }

    if (free(a) && free(b)) {
      return {
        ok: true,
        title: 'Объединять можно',
        text: 'Оба материала свободны от ограничений. Результат можно распространять на любых условиях, включая коммерческие.',
        conditions: ['Указание авторов не обязательно, но остаётся требованием академической этики.']
      };
    }

    var nc = a.nc || b.nc;
    var resultLic = nc ? 'CC BY-NC 4.0' : 'CC BY 4.0';
    return {
      ok: true,
      title: 'Объединять можно',
      text: 'Ограничения складываются: результат публикуется на условиях не мягче самого строгого из исходных материалов — ' + resultLic + ' или строже.',
      conditions: nc
        ? ['Результат нельзя использовать в коммерческих целях, включая рекламу платных программ.',
           'Укажите авторов и лицензии обоих материалов.']
        : ['Укажите авторов и лицензии обоих материалов.']
    };
  }

  function renderCC() {
    var a = licById($('ccA').value);
    var b = licById($('ccB').value);
    var r = combine(a, b);
    var box = $('ccResult');
    box.innerHTML = '';

    var v = el('div', 'verdict ' + (r.ok ? 'ok' : 'no'));
    v.appendChild(el('span', 'verdict-icon', r.ok ? '✓' : '×'));
    var body = el('div', 'verdict-body');
    body.appendChild(el('span', 'vd-tag', a.name + ' + ' + b.name));
    body.appendChild(el('h4', null, r.title));
    body.appendChild(el('p', null, r.text));

    if (r.conditions && r.conditions.length) {
      var cb = el('div', 'vd-block');
      cb.appendChild(el('h5', null, 'Что учесть'));
      var ul = el('ul', 'vd-list');
      r.conditions.forEach(function (c) { ul.appendChild(el('li', null, c)); });
      cb.appendChild(ul);
      body.appendChild(cb);
    }

    var rb = el('div', 'vd-block');
    rb.appendChild(el('h5', null, 'Тексты лицензий'));
    var refs = el('div', 'vd-refs');
    [a, b].forEach(function (l) {
      if (!l.url) return;
      var link = el('a', 'vd-ref', l.name);
      link.href = l.url;
      link.target = '_blank';
      link.rel = 'noopener';
      refs.appendChild(link);
    });
    rb.appendChild(refs);
    body.appendChild(rb);

    v.appendChild(body);
    box.appendChild(v);
  }

  /* ============================================================
     6. ЧЕК-ЛИСТ И ПРОТОКОЛ
     ============================================================ */

  var CHECK_ITEMS = [
    { t: 'Установлен источник материала', s: 'Известно, откуда взят файл, и сохранена ссылка на страницу' },
    { t: 'Определён автор или правообладатель', s: 'Либо зафиксировано, что сведения об авторе отсутствуют' },
    { t: 'Определён правовой статус', s: 'Своё, свободная лицензия, общественное достояние, разрешение или основание для свободного использования' },
    { t: 'Проверено, что основание покрывает нужный способ', s: 'Показ в аудитории, публикация в интернете, печать, звучание на мероприятии — каждый способ отдельно' },
    { t: 'Проверен коммерческий характер', s: 'При плате за вход, продаже издания или продвижении льготы и лицензии NC не действуют' },
    { t: 'Объём заимствования оправдан целью', s: 'Материал подтверждает собственное содержание, а не заменяет его' },
    { t: 'Произведение не изменено', s: 'Либо переработка прямо разрешена лицензией или автором' },
    { t: 'Оформлено указание автора', s: 'Название, автор, ссылка, лицензия — на слайде, в титрах или в перечне источников' },
    { t: 'Для музыки определён способ использования', s: 'Живое исполнение или фонограмма; при фонограмме оформлены отношения с РАО и ВОИС' },
    { t: 'Сохранены подтверждения', s: 'Снимок страницы с лицензией, переписка с правообладателем, лицензионный файл стока' }
  ];

  var CL_KEY = 'pamyatka-checklist-v1';

  function initChecklist() {
    var list = $('clList');
    if (!list) return;

    var saved = store(CL_KEY) || {};

    CHECK_ITEMS.forEach(function (item, i) {
      var lab = el('label', 'check-item');
      var inp = document.createElement('input');
      inp.type = 'checkbox';
      inp.checked = !!saved['i' + i];
      if (inp.checked) lab.classList.add('checked');
      var txt = el('div', 'ci-text');
      txt.appendChild(document.createTextNode(item.t));
      txt.appendChild(el('span', null, item.s));
      lab.appendChild(inp);
      lab.appendChild(txt);
      inp.addEventListener('change', function () {
        lab.classList.toggle('checked', inp.checked);
        saveChecklist();
      });
      list.appendChild(lab);
    });

    if (saved.work) $('clWork').value = saved.work;
    if (saved.author) $('clAuthor').value = saved.author;
    $('clWork').addEventListener('input', saveChecklist);
    $('clAuthor').addEventListener('input', saveChecklist);

    $('clReset').addEventListener('click', function () {
      list.querySelectorAll('input').forEach(function (i) {
        i.checked = false;
        i.closest('.check-item').classList.remove('checked');
      });
      saveChecklist();
      toast('Отметки очищены');
    });

    $('clPrint').addEventListener('click', function () {
      renderProtocol();
      window.print();
    });

    updateChecklistBar();
  }

  function checkboxes() {
    return Array.prototype.slice.call($('clList').querySelectorAll('input'));
  }

  function saveChecklist() {
    var data = { work: $('clWork').value, author: $('clAuthor').value };
    checkboxes().forEach(function (inp, i) { data['i' + i] = inp.checked; });
    store(CL_KEY, data);
    updateChecklistBar();
  }

  function updateChecklistBar() {
    var boxes = checkboxes();
    var done = boxes.filter(function (i) { return i.checked; }).length;
    $('clBar').style.width = Math.round(done / boxes.length * 100) + '%';
    $('clStat').textContent = done === boxes.length
      ? 'Все пункты пройдены — материал можно сдавать'
      : 'Отмечено ' + done + ' из ' + boxes.length;
  }

  function renderProtocol() {
    var box = $('clProtocol');
    box.innerHTML = '';
    box.appendChild(el('h2', null, 'Протокол проверки использования чужих материалов'));

    var meta = el('div', 'pr-meta');
    meta.appendChild(el('div', null, 'Материал: ' + (val('clWork', '—'))));
    meta.appendChild(el('div', null, 'Проверку выполнил: ' + (val('clAuthor', '—'))));
    meta.appendChild(el('div', null, 'Дата проверки: ' + ruDate(new Date())));
    box.appendChild(meta);

    var wrap = el('div', 'table-wrap');
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>№</th><th>Пункт проверки</th><th>Отметка</th></tr>';
    table.appendChild(thead);
    var tb = document.createElement('tbody');
    checkboxes().forEach(function (inp, i) {
      var tr = document.createElement('tr');
      var td1 = el('td', null, String(i + 1));
      var td2 = el('td');
      td2.appendChild(document.createTextNode(CHECK_ITEMS[i].t));
      td2.appendChild(el('div', 'dim', CHECK_ITEMS[i].s));
      var td3 = el('td', null, inp.checked ? 'выполнено' : 'не отмечено');
      tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3);
      tb.appendChild(tr);
    });
    table.appendChild(tb);
    wrap.appendChild(table);
    box.appendChild(wrap);

    var note = el('p', 'pr-meta', 'Протокол подтверждает проведение самопроверки и не является юридическим заключением.');
    note.style.marginTop = '12pt';
    box.appendChild(note);

    var sign = el('div', 'pr-sign');
    sign.appendChild(el('div', null, 'подпись'));
    sign.appendChild(el('div', null, 'расшифровка'));
    sign.appendChild(el('div', null, 'дата'));
    box.appendChild(sign);
  }

  /* ---------- запуск ---------- */

  document.addEventListener('DOMContentLoaded', function () {
    if ($('wizard')) renderWizard();
    initAttribution();
    initLetter();
    initCatalog();
    initCC();
    initChecklist();
  });
})();
