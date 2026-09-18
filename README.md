<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Правомерное использование чужих произведений в учебной деятельности — памятка</title>
<meta name="description" content="Порядок правомерного использования изображений, музыки, видео и текстов в учебной и внеучебной деятельности института. На основании части четвёртой Гражданского кодекса Российской Федерации.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  :root{
    --blue:#0D4CD3;
    --blue-dark:#0A3CA8;
    --blue-light:#E4EDFB;
    --bg:#F5F7FA;
    --white:#FFFFFF;
    --text:#0B1F33;
    --text-2:#5A6B7B;
    --border:#E4E7EE;
    --green:#0B8A28;
    --green-bg:#E7F6EA;
    --red:#D93A3A;
    --red-bg:#FBEAEA;
    --amber:#C77700;
    --amber-bg:#FFF4E0;
    --radius:12px;
    --radius-lg:24px;
    --font-base:16px;
  }
  *{box-sizing:border-box;}
  html{scroll-behavior:smooth;font-size:var(--font-base);}
  body{
    margin:0;
    background:var(--bg);
    color:var(--text);
    font-family:'Roboto', -apple-system, 'Segoe UI', Arial, sans-serif;
    line-height:1.55;
    -webkit-font-smoothing:antialiased;
  }
  h1,h2,h3,h4{margin:0 0 .5em;font-weight:700;line-height:1.2;}
  p{margin:0 0 1em;}
  p:last-child{margin-bottom:0;}
  a{color:var(--blue);text-decoration:none;}
  a:hover{text-decoration:underline;}
  a:focus-visible,button:focus-visible{outline:2px solid var(--blue);outline-offset:2px;border-radius:4px;}
  img{display:block;max-width:100%;}
  .wrap{max-width:1120px;margin:0 auto;padding:0 20px;}

  /* ---------- ВЕРХНЯЯ ПАНЕЛЬ ---------- */
  .topline{background:var(--white);border-bottom:1px solid var(--border);font-size:.82rem;color:var(--text-2);}
  .topline .wrap{display:flex;align-items:center;gap:16px;height:38px;}
  .topline a{color:var(--text-2);}

  /* ---------- ШАПКА ---------- */
  header.site{background:var(--white);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:60;}
  header.site .wrap{display:flex;align-items:center;justify-content:space-between;gap:24px;min-height:72px;}
  .logo{display:flex;align-items:center;gap:12px;color:var(--text);}
  .logo:hover{text-decoration:none;}
  .logo-mark{
    width:40px;height:40px;border-radius:8px;background:var(--blue);color:#fff;
    display:flex;align-items:center;justify-content:center;font-weight:700;font-size:20px;flex-shrink:0;
  }
  .logo-text b{display:block;font-size:.95rem;line-height:1.2;}
  .logo-text span{display:block;font-size:.78rem;color:var(--text-2);}
  .mainnav{display:flex;gap:24px;font-size:.9rem;}
  .mainnav a{color:var(--text);}
  .mainnav a:hover{color:var(--blue);text-decoration:none;}
  @media(max-width:900px){.mainnav{display:none;}}

  /* ---------- ГЕРОЙ ---------- */
  .hero{padding:28px 0 8px;}
  .hero-card{
    background:var(--white);border-radius:var(--radius-lg);overflow:hidden;
    display:grid;grid-template-columns:1.15fr .85fr;
    border:1px solid var(--border);
  }
  @media(max-width:900px){.hero-card{grid-template-columns:1fr;}}
  .hero-body{padding:44px 40px;}
  @media(max-width:600px){.hero-body{padding:28px 20px;}}
  .badge{
    display:inline-block;background:var(--blue-light);color:var(--blue);
    font-size:.78rem;font-weight:500;padding:5px 12px;border-radius:20px;margin-bottom:18px;
  }
  .hero h1{font-size:clamp(1.7rem,3.2vw,2.5rem);max-width:620px;}
  .hero .lede{color:var(--text-2);font-size:1.02rem;max-width:600px;}
  .hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px;}
  .btn{
    display:inline-flex;align-items:center;justify-content:center;gap:8px;
    padding:13px 24px;border-radius:8px;font-size:.95rem;font-weight:500;
    border:1px solid transparent;cursor:pointer;font-family:inherit;
  }
  .btn-primary{background:var(--blue);color:#fff;}
  .btn-primary:hover{background:var(--blue-dark);text-decoration:none;}
  .btn-secondary{background:var(--blue-light);color:var(--blue);}
  .btn-secondary:hover{background:#D5E3FA;text-decoration:none;}
  .hero-media{position:relative;min-height:300px;background:var(--blue-light);}
  .hero-media img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;}

  /* ---------- СЕКЦИИ ---------- */
  section{padding:44px 0;}
  .sec-head{margin-bottom:24px;}
  .sec-num{
    display:inline-block;font-size:.78rem;font-weight:500;color:var(--blue);
    letter-spacing:.04em;text-transform:uppercase;margin-bottom:8px;
  }
  .sec-head h2{font-size:clamp(1.4rem,2.4vw,1.9rem);}
  .sec-head p{color:var(--text-2);max-width:760px;margin:0;}

  .card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:24px;}
  .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
  .grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;}
  @media(max-width:860px){.grid-3{grid-template-columns:1fr;}.grid-2{grid-template-columns:1fr;}}

  /* карточка нормы */
  .law-card h3{font-size:1rem;margin-bottom:6px;}
  .law-card .art{font-size:.8rem;color:var(--blue);font-weight:500;display:block;margin-bottom:10px;}
  .law-card p{font-size:.92rem;color:var(--text-2);}
  .law-card .more{font-size:.86rem;display:inline-block;margin-top:12px;}

  /* блок с иллюстрацией */
  .media-row{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:center;}
  @media(max-width:860px){.media-row{grid-template-columns:1fr;}}
  .media-row figure{margin:0;}
  .media-row img{width:100%;height:320px;object-fit:cover;border-radius:var(--radius);}
  .media-row figcaption{font-size:.75rem;color:#8A98A6;margin-top:8px;}

  /* уведомления */
  .notice{border-radius:var(--radius);padding:20px 22px;margin:20px 0;font-size:.93rem;border:1px solid transparent;}
  .notice h4{font-size:.95rem;margin-bottom:8px;}
  .notice.info{background:var(--blue-light);border-color:#CBDDF8;}
  .notice.warn{background:var(--amber-bg);border-color:#F3DCB0;}
  .notice.warn h4{color:var(--amber);}
  .notice.alert{background:var(--red-bg);border-color:#F1CFCF;}
  .notice.alert h4{color:var(--red);}
  .notice p{color:var(--text);}

  /* ---------- СЕРВИС ПРОВЕРКИ ---------- */
  .service{background:var(--white);border:1px solid var(--border);border-radius:var(--radius-lg);padding:32px;}
  @media(max-width:600px){.service{padding:22px 18px;}}
  .service-q{font-weight:700;font-size:1.05rem;margin-bottom:16px;}
  .opts{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}
  @media(max-width:700px){.opts{grid-template-columns:1fr;}}
  .opt{
    display:flex;align-items:flex-start;gap:12px;padding:16px 18px;
    border:1px solid var(--border);border-radius:var(--radius);background:var(--white);
    cursor:pointer;text-align:left;font:inherit;color:var(--text);
  }
  .opt:hover{border-color:var(--blue);}
  .opt.active{border-color:var(--blue);background:#F4F8FF;box-shadow:inset 0 0 0 1px var(--blue);}
  .opt-radio{
    width:20px;height:20px;border:2px solid #B9C4D0;border-radius:50%;flex-shrink:0;margin-top:2px;
    position:relative;
  }
  .opt.active .opt-radio{border-color:var(--blue);}
  .opt.active .opt-radio::after{
    content:"";position:absolute;inset:3px;border-radius:50%;background:var(--blue);
  }
  .opt-text b{display:block;font-weight:500;font-size:.95rem;}
  .opt-text span{font-size:.82rem;color:var(--text-2);}
  .result{margin-top:24px;padding-top:24px;border-top:1px solid var(--border);min-height:120px;}
  .result-empty{color:var(--text-2);font-size:.92rem;}
  .verdict{display:flex;gap:14px;align-items:flex-start;}
  .verdict-icon{
    width:36px;height:36px;border-radius:50%;flex-shrink:0;
    display:flex;align-items:center;justify-content:center;font-size:18px;color:#fff;font-weight:700;
  }
  .verdict.ok .verdict-icon{background:var(--green);}
  .verdict.no .verdict-icon{background:var(--red);}
  .verdict h4{font-size:1.05rem;margin-bottom:6px;}
  .verdict.ok h4{color:var(--green);}
  .verdict.no h4{color:var(--red);}
  .verdict p{font-size:.93rem;color:var(--text-2);max-width:640px;}
  .verdict .ref{font-size:.85rem;margin-top:8px;display:block;}

  /* ---------- ТАБЛИЦЫ ---------- */
  .table-wrap{overflow-x:auto;background:var(--white);border:1px solid var(--border);border-radius:var(--radius);}
  table{width:100%;border-collapse:collapse;min-width:620px;}
  th{
    text-align:left;font-size:.8rem;font-weight:500;color:var(--text-2);text-transform:uppercase;
    letter-spacing:.03em;padding:14px 20px;background:#FAFBFD;border-bottom:1px solid var(--border);
  }
  td{padding:16px 20px;border-bottom:1px solid var(--border);font-size:.92rem;vertical-align:top;}
  tr:last-child td{border-bottom:none;}
  td.dim{color:var(--text-2);}
  td.term{font-weight:500;width:210px;}
  .lic{font-weight:500;white-space:nowrap;}

  /* ---------- TASL ---------- */
  .tasl{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:20px;}
  @media(max-width:760px){.tasl{grid-template-columns:1fr 1fr;}}
  .tasl-item{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:20px;}
  .tasl-letter{
    width:36px;height:36px;border-radius:8px;background:var(--blue-light);color:var(--blue);
    display:flex;align-items:center;justify-content:center;font-weight:700;margin-bottom:12px;
  }
  .tasl-item h4{font-size:.95rem;margin-bottom:4px;}
  .tasl-item p{font-size:.85rem;color:var(--text-2);}
  .sample{
    margin-top:16px;background:var(--white);border:1px dashed #C3CEDA;border-radius:var(--radius);
    padding:18px 20px;font-size:.92rem;
  }
  .sample .lbl{font-size:.78rem;color:var(--text-2);display:block;margin-bottom:6px;}

  /* ---------- РЕСУРСЫ ---------- */
  .res-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
  @media(max-width:900px){.res-grid{grid-template-columns:repeat(2,1fr);}}
  @media(max-width:560px){.res-grid{grid-template-columns:1fr;}}
  .res-col h4{font-size:.95rem;margin-bottom:12px;}
  .res-col ul{list-style:none;margin:0;padding:0;}
  .res-col li{padding:9px 0;border-bottom:1px solid var(--border);font-size:.9rem;}
  .res-col li:last-child{border-bottom:none;}
  .res-col li a{display:flex;justify-content:space-between;gap:10px;align-items:center;}
  .res-col li a::after{content:"→";color:#9AA7B4;font-size:.85rem;}
  .res-col li a:hover::after{color:var(--blue);}
  .res-note{font-size:.78rem;color:var(--text-2);margin-top:10px;}

  /* ---------- ПОРЯДОК ДЕЙСТВИЙ ---------- */
  .steps{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;}
  .step-item + .step-item{border-top:1px solid var(--border);}
  .step-head{
    display:flex;align-items:center;justify-content:space-between;gap:16px;
    padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;font:inherit;
    color:var(--text);text-align:left;
  }
  .step-head:hover{background:#FAFBFD;}
  .step-head h3{font-size:1rem;margin:0;display:flex;align-items:center;gap:14px;}
  .step-badge{
    width:28px;height:28px;border-radius:6px;background:var(--blue-light);color:var(--blue);
    display:inline-flex;align-items:center;justify-content:center;font-size:.85rem;flex-shrink:0;
  }
  .chevron{color:var(--blue);font-size:.9rem;transition:transform .25s;flex-shrink:0;}
  .step-item.open .chevron{transform:rotate(180deg);}
  .step-body{max-height:0;overflow:hidden;transition:max-height .3s ease;}
  .step-item.open .step-body{max-height:800px;}
  .step-body-in{padding:0 24px 24px 66px;color:var(--text-2);font-size:.93rem;}
  @media(max-width:600px){.step-body-in{padding-left:24px;}}
  .step-body-in ol{margin:0;padding-left:20px;}
  .step-body-in li{margin-bottom:10px;}
  .step-body-in li:last-child{margin-bottom:0;}

  /* ---------- ОТВЕТСТВЕННОСТЬ ---------- */
  .liab{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  @media(max-width:760px){.liab{grid-template-columns:1fr;}}
  .liab-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:26px;}
  .liab-num{font-size:1.7rem;font-weight:700;color:var(--text);margin-bottom:8px;}
  .liab-card p{font-size:.92rem;color:var(--text-2);}

  /* ---------- НОРМАТИВНЫЕ ДОКУМЕНТЫ ---------- */
  .docs{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);}
  .doc-row{display:flex;gap:16px;align-items:flex-start;padding:18px 24px;border-bottom:1px solid var(--border);}
  .doc-row:last-child{border-bottom:none;}
  .doc-ico{
    width:34px;height:34px;border-radius:6px;background:var(--blue-light);color:var(--blue);
    display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;
  }
  .doc-row b{display:block;font-weight:500;font-size:.95rem;}
  .doc-row span{font-size:.85rem;color:var(--text-2);}

  /* ---------- КУДА ОБРАТИТЬСЯ ---------- */
  .contact{
    background:var(--blue);color:#fff;border-radius:var(--radius-lg);padding:36px 40px;
    display:grid;grid-template-columns:1.4fr 1fr;gap:28px;align-items:center;
  }
  @media(max-width:760px){.contact{grid-template-columns:1fr;padding:28px 22px;}}
  .contact h2{color:#fff;font-size:1.5rem;}
  .contact p{color:rgba(255,255,255,.85);font-size:.95rem;margin:0;}
  .contact .btn-white{background:#fff;color:var(--blue);}
  .contact .btn-white:hover{background:#EAF0FE;}

  /* ---------- ПОДВАЛ ---------- */
  footer{background:var(--white);border-top:1px solid var(--border);padding:36px 0 44px;margin-top:44px;}
  .foot-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:28px;}
  @media(max-width:760px){.foot-grid{grid-template-columns:1fr;}}
  footer h4{font-size:.85rem;color:var(--text-2);text-transform:uppercase;letter-spacing:.03em;margin-bottom:12px;}
  footer ul{list-style:none;margin:0;padding:0;font-size:.9rem;}
  footer li{margin-bottom:8px;}
  .disclaimer{font-size:.82rem;color:var(--text-2);border-top:1px solid var(--border);margin-top:28px;padding-top:20px;}
</style>
</head>
<body>

<div class="topline">
  <div class="wrap">
    <span>Информационный раздел института</span>
  </div>
</div>

<header class="site">
  <div class="wrap">
    <a class="logo" href="#top">
      <span class="logo-mark">§</span>
      <span class="logo-text">
        <b>Авторское право в учебном процессе</b>
        <span>Памятка для обучающихся и работников</span>
      </span>
    </a>
    <nav class="mainnav">
      <a href="#primer">Пример разбора</a>
      <a href="#ponyatiya">Общие положения</a>
      <a href="#osnovy">Право России</a>
      <a href="#cc">Лицензии</a>
      <a href="#muzyka">Музыка</a>
      <a href="#poryadok">Порядок действий</a>
      <a href="#dokumenty">Документы</a>
    </nav>
  </div>
</header>

<div class="hero" id="top">
  <div class="wrap">
    <div class="hero-card">
      <div class="hero-body">
        <span class="badge">Памятка</span>
        <h1>Использование чужих изображений, музыки и текстов в учебной деятельности</h1>
        <p class="lede">Порядок правомерного использования чужих произведений при подготовке презентаций, учебных фильмов, отчётов и мероприятий института. Подготовлено на основании части четвёртой Гражданского кодекса Российской Федерации.</p>
        <div class="hero-actions">
          <a href="#ponyatiya" class="btn btn-primary">Перейти к материалу</a>
          <a href="#dokumenty" class="btn btn-secondary">Нормативные документы</a>
        </div>
      </div>
      <div class="hero-media">
        <img src="images/campus-building.jpg" width="1200" height="786" loading="lazy" alt="Здание учебного корпуса">
      </div>
    </div>
  </div>
</div>

<section id="primer">
  <div class="wrap">
    <div class="sec-head">
      <span class="sec-num">Наглядный пример</span>
      <h2>Как различается режим использования разных материалов</h2>
      <p>Разбор четырёх типовых случаев. Выберите вид материала, чтобы увидеть применимое основание и условия использования. Пример носит иллюстративный характер, перед использованием материала выполняется проверка по разделу 6.</p>
    </div>

    <div class="service">
      <div class="service-q">Какой материал требуется использовать?</div>
      <div class="opts" id="opts">
        <button class="opt" type="button" data-type="image">
          <span class="opt-radio"></span>
          <span class="opt-text"><b>Изображение или фотография</b><span>Слайд презентации, стенгазета, кадр в видео</span></span>
        </button>
        <button class="opt" type="button" data-type="text">
          <span class="opt-radio"></span>
          <span class="opt-text"><b>Фрагмент текста</b><span>Цитата из книги, статьи, учебного пособия</span></span>
        </button>
        <button class="opt" type="button" data-type="music-live">
          <span class="opt-radio"></span>
          <span class="opt-text"><b>Живое исполнение произведения</b><span>Выступление студента или работника на сцене</span></span>
        </button>
        <button class="opt" type="button" data-type="music-rec">
          <span class="opt-radio"></span>
          <span class="opt-text"><b>Воспроизведение фонограммы</b><span>Включение записи через звуковую аппаратуру</span></span>
        </button>
      </div>
      <div class="result" id="result">
        <p class="result-empty">Результат отображается после выбора вида материала.</p>
      </div>
    </div>
  </div>
</section>

<section id="ponyatiya">
  <div class="wrap">
    <div class="sec-head">
      <span class="sec-num">Раздел 1</span>
      <h2>Общие положения авторского права</h2>
      <p>Авторское право построено на системе международных договоров, к которым присоединилось большинство государств. Российское законодательство воспроизводит эти принципы, поэтому изложенные ниже положения применяются независимо от страны происхождения произведения.</p>
    </div>

    <div class="grid-3">
      <div class="card law-card">
        <span class="art">Принцип 1</span>
        <h3>Автоматическая охрана</h3>
        <p>Права на произведение возникают в момент его создания в объективной форме. Регистрация, депонирование, знак охраны © и иные формальности для возникновения охраны не требуются (пункт 2 статьи 5 Бернской конвенции).</p>
      </div>
      <div class="card law-card">
        <span class="art">Принцип 2</span>
        <h3>Национальный режим</h3>
        <p>Произведениям авторов из других государств-участников предоставляется такая же охрана, как произведениям собственных граждан. Иностранное происхождение материала не означает отсутствия охраны.</p>
      </div>
      <div class="card law-card">
        <span class="art">Принцип 3</span>
        <h3>Территориальность</h3>
        <p>Объём охраны и способы защиты определяются законодательством государства, в котором испрашивается защита. Использование материала на территории России оценивается по нормам российского права.</p>
      </div>
      <div class="card law-card">
        <span class="art">Принцип 4</span>
        <h3>Разделение прав</h3>
        <p>Личные неимущественные права (авторство, имя, неприкосновенность произведения) неотчуждаемы и охраняются бессрочно. Имущественное исключительное право передаётся по договору и ограничено сроком действия.</p>
      </div>
      <div class="card law-card">
        <span class="art">Принцип 5</span>
        <h3>Срок охраны</h3>
        <p>Бернская конвенция устанавливает минимальный срок: жизнь автора и 50 лет после его смерти. Государства вправе устанавливать больший срок. В России, странах Европейского союза и США применяется срок 70 лет.</p>
      </div>
      <div class="card law-card">
        <span class="art">Принцип 6</span>
        <h3>Ограничения и исключения</h3>
        <p>Свободное использование допускается по трёхступенчатому тесту: в особых случаях, без нанесения ущерба нормальному использованию произведения и без ущемления законных интересов автора (пункт 2 статьи 9 Бернской конвенции, статья 13 Соглашения ТРИПС).</p>
      </div>
    </div>

    <div class="media-row" style="margin-top:32px">
      <div>
        <h3>Свободное использование и доктрина fair use</h3>
        <p style="color:var(--text-2);font-size:.95rem">В странах общего права применяется доктрина добросовестного использования (fair use, fair dealing). Она носит открытый характер: суд оценивает цель использования, характер произведения, объём заимствования и влияние на рынок оригинала. Универсального перечня разрешённых случаев эта доктрина не содержит.</p>
        <p style="color:var(--text-2);font-size:.95rem">В России и других странах континентальной системы права действует закрытый перечень случаев свободного использования, установленный законом. Ссылка на fair use, заимствованная из англоязычных источников или условий зарубежного сайта, основанием для использования произведения на территории России не является.</p>
        <p style="color:var(--text-2);font-size:.95rem"><a href="https://www.copyright.gov/fair-use/" target="_blank" rel="noopener">Разъяснение Бюро авторского права США о fair use</a></p>
      </div>
      <figure>
        <img src="images/library-shelves.jpg" width="1000" height="924" loading="lazy" alt="Книжные стеллажи библиотеки">
        <figcaption>Фотография: Unsplash</figcaption>
      </figure>
    </div>

    <h3 style="margin-top:36px">Международные договоры</h3>
    <p style="color:var(--text-2);max-width:760px">Россия участвует во всех перечисленных договорах, их положения имеют приоритет перед нормами национального законодательства.</p>
    <div class="docs" style="margin-top:16px">
      <div class="doc-row">
        <span class="doc-ico">⚖</span>
        <div>
          <b><a href="https://www.wipo.int/treaties/ru/ip/berne/" target="_blank" rel="noopener">Бернская конвенция по охране литературных и художественных произведений, 1886</a></b>
          <span>Базовый договор: автоматическая охрана, национальный режим, минимальные сроки. <a href="https://www.consultant.ru/document/cons_doc_LAW_5112/" target="_blank" rel="noopener">Текст на русском языке</a></span>
        </div>
      </div>
      <div class="doc-row">
        <span class="doc-ico">⚖</span>
        <div>
          <b><a href="https://www.wipo.int/treaties/ru/ip/rome/" target="_blank" rel="noopener">Римская конвенция об охране прав исполнителей и производителей фонограмм, 1961</a></b>
          <span>Смежные права исполнителей, производителей фонограмм и вещательных организаций</span>
        </div>
      </div>
      <div class="doc-row">
        <span class="doc-ico">⚖</span>
        <div>
          <b><a href="https://www.wipo.int/treaties/ru/ip/wct/" target="_blank" rel="noopener">Договор ВОИС по авторскому праву, 1996</a></b>
          <span>Охрана произведений в цифровой среде, право на доведение до всеобщего сведения</span>
        </div>
      </div>
      <div class="doc-row">
        <span class="doc-ico">⚖</span>
        <div>
          <b><a href="https://www.wipo.int/treaties/ru/ip/wppt/" target="_blank" rel="noopener">Договор ВОИС по исполнениям и фонограммам, 1996</a></b>
          <span>Права исполнителей и производителей фонограмм при использовании в сети</span>
        </div>
      </div>
      <div class="doc-row">
        <span class="doc-ico">⚖</span>
        <div>
          <b><a href="https://www.wto.org/english/tratop_e/trips_e/trips_e.htm" target="_blank" rel="noopener">Соглашение ТРИПС, 1994</a></b>
          <span>Минимальные стандарты охраны и требования к мерам защиты прав</span>
        </div>
      </div>
      <div class="doc-row">
        <span class="doc-ico">⌂</span>
        <div>
          <b><a href="https://www.wipo.int/ru/web/copyright" target="_blank" rel="noopener">Всемирная организация интеллектуальной собственности</a></b>
          <span>Материалы и разъяснения по авторскому праву на русском языке</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="osnovy">
  <div class="wrap">
    <div class="sec-head">
      <span class="sec-num">Раздел 2</span>
      <h2>Правовая основа в Российской Федерации</h2>
      <p>Отношения по использованию произведений регулируются частью четвёртой Гражданского кодекса Российской Федерации. В учебной деятельности применяются следующие нормы.</p>
    </div>

    <div class="grid-3">
      <div class="card law-card">
        <span class="art">Статья 1274 ГК РФ</span>
        <h3>Свободное использование произведения</h3>
        <p>Допускает цитирование в научных, полемических, критических, информационных и учебных целях в объёме, оправданном целью цитирования, с обязательным указанием имени автора и источника заимствования.</p>
        <a class="more" href="https://www.zakonrf.info/gk/1274/" target="_blank" rel="noopener">Текст статьи →</a>
      </div>
      <div class="card law-card">
        <span class="art">Статья 1276 ГК РФ</span>
        <h3>Произведения в общедоступных местах</h3>
        <p>Допускает использование изображений произведений архитектуры, изобразительного искусства и фотографии, постоянно находящихся в месте, открытом для свободного посещения, если такое изображение не является основным объектом использования.</p>
        <a class="more" href="https://www.zakonrf.info/gk/1276/" target="_blank" rel="noopener">Текст статьи →</a>
      </div>
      <div class="card law-card">
        <span class="art">Статья 1281 ГК РФ</span>
        <h3>Срок охраны произведения</h3>
        <p>Исключительное право действует в течение всей жизни автора и семидесяти лет, считая с 1 января года, следующего за годом смерти автора. По истечении срока произведение переходит в общественное достояние.</p>
        <a class="more" href="https://www.zakonrf.info/gk/1281/" target="_blank" rel="noopener">Текст статьи →</a>
      </div>
    </div>

    <div class="notice info">
      <h4>Условия правомерного цитирования</h4>
      <p>Заимствованный материал не должен подменять собой собственное содержание работы, объём заимствования ограничивается целью цитирования, использование не преследует извлечение прибыли. Изменение произведения без согласия автора, в том числе обрезка, наложение текста и изменение цвета, нарушает право на неприкосновенность произведения (<a href="https://www.zakonrf.info/gk/1266/" target="_blank" rel="noopener">статья 1266 ГК РФ</a>).</p>
    </div>

    <div class="media-row" style="margin-top:32px">
      <figure>
        <img src="images/themis-statue.jpg" width="1000" height="667" loading="lazy" alt="Скульптура Фемиды с весами">
        <figcaption>Фотография: Unsplash</figcaption>
      </figure>
      <div>
        <h3>Что относится к объектам авторского права</h3>
        <p style="color:var(--text-2);font-size:.95rem">Охраняются произведения науки, литературы и искусства независимо от их достоинств и назначения: тексты, фотографии, иллюстрации, музыкальные и аудиовизуальные произведения, программы для ЭВМ (<a href="https://www.zakonrf.info/gk/1259/" target="_blank" rel="noopener">статья 1259 ГК РФ</a>). Права возникают с момента создания произведения, регистрация не требуется, отсутствие знака охраны не означает отсутствия прав.</p>
        <p style="color:var(--text-2);font-size:.95rem">Не охраняются идеи, методы, факты, официальные документы, государственные символы и произведения народного творчества, не имеющие конкретных авторов.</p>
      </div>
    </div>

    <h3 style="margin-top:36px">Основные понятия</h3>
    <p style="color:var(--text-2);max-width:760px">Термины приведены в значении, установленном частью четвёртой Гражданского кодекса Российской Федерации.</p>
    <div class="table-wrap" style="margin-top:16px">
      <table>
        <thead>
          <tr><th>Понятие</th><th>Содержание</th><th>Норма</th></tr>
        </thead>
        <tbody>
          <tr>
            <td class="term">Произведение</td>
            <td>Результат творческого труда, выраженный в объективной форме. Охраняется независимо от достоинств, назначения и способа выражения</td>
            <td class="dim"><a href="https://www.zakonrf.info/gk/1259/" target="_blank" rel="noopener">ст. 1259</a></td>
          </tr>
          <tr>
            <td class="term">Автор</td>
            <td>Гражданин, творческим трудом которого создано произведение. Лицо, указанное на экземпляре, считается автором, пока не доказано иное</td>
            <td class="dim"><a href="https://www.zakonrf.info/gk/1257/" target="_blank" rel="noopener">ст. 1257</a></td>
          </tr>
          <tr>
            <td class="term">Правообладатель</td>
            <td>Лицо, обладающее исключительным правом. Может не совпадать с автором: право переходит по договору, в порядке наследования, по трудовым отношениям</td>
            <td class="dim"><a href="https://www.zakonrf.info/gk/1229/" target="_blank" rel="noopener">ст. 1229</a></td>
          </tr>
          <tr>
            <td class="term">Исключительное право</td>
            <td>Право использовать произведение любым не противоречащим закону способом, разрешать и запрещать использование другим лицам. Отсутствие запрета согласием не является</td>
            <td class="dim"><a href="https://www.zakonrf.info/gk/1270/" target="_blank" rel="noopener">ст. 1270</a></td>
          </tr>
          <tr>
            <td class="term">Личные неимущественные права</td>
            <td>Право авторства, право на имя, право на неприкосновенность произведения, право на обнародование. Неотчуждаемы и непередаваемы</td>
            <td class="dim"><a href="https://www.zakonrf.info/gk/1255/" target="_blank" rel="noopener">ст. 1255</a>, <a href="https://www.zakonrf.info/gk/1266/" target="_blank" rel="noopener">1266</a></td>
          </tr>
          <tr>
            <td class="term">Обнародование</td>
            <td>Действие, впервые делающее произведение доступным для всеобщего сведения. Свободное использование допускается только в отношении обнародованных произведений</td>
            <td class="dim"><a href="https://www.zakonrf.info/gk/1268/" target="_blank" rel="noopener">ст. 1268</a></td>
          </tr>
          <tr>
            <td class="term">Способы использования</td>
            <td>Воспроизведение, публичное исполнение, публичный показ, доведение до всеобщего сведения, переработка и другие. Каждый способ оценивается отдельно</td>
            <td class="dim"><a href="https://www.zakonrf.info/gk/1270/" target="_blank" rel="noopener">ст. 1270</a></td>
          </tr>
          <tr>
            <td class="term">Производное произведение</td>
            <td>Перевод, обработка, аранжировка, иная переработка. Права на него возникают при условии соблюдения прав автора оригинала</td>
            <td class="dim"><a href="https://www.zakonrf.info/gk/1260/" target="_blank" rel="noopener">ст. 1260</a></td>
          </tr>
          <tr>
            <td class="term">Служебное произведение</td>
            <td>Произведение, созданное в пределах трудовых обязанностей. Исключительное право принадлежит работодателю, если договором не предусмотрено иное</td>
            <td class="dim"><a href="https://www.zakonrf.info/gk/1295/" target="_blank" rel="noopener">ст. 1295</a></td>
          </tr>
          <tr>
            <td class="term">Свободное использование</td>
            <td>Использование без согласия правообладателя и без выплаты вознаграждения в случаях, прямо перечисленных в законе. Перечень является закрытым</td>
            <td class="dim"><a href="https://www.zakonrf.info/gk/1273/" target="_blank" rel="noopener">ст. 1273</a>—<a href="https://www.zakonrf.info/gk/1280/" target="_blank" rel="noopener">1280</a></td>
          </tr>
          <tr>
            <td class="term">Общественное достояние</td>
            <td>Состояние произведения после истечения срока действия исключительного права. Использование свободно, авторство и неприкосновенность охраняются</td>
            <td class="dim"><a href="https://www.zakonrf.info/gk/1282/" target="_blank" rel="noopener">ст. 1282</a></td>
          </tr>
          <tr>
            <td class="term">Лицензионный договор</td>
            <td>Предоставление права использования в установленных пределах. Простая лицензия сохраняет за правообладателем право выдавать лицензии другим лицам, исключительная — нет</td>
            <td class="dim"><a href="https://www.zakonrf.info/gk/1236/" target="_blank" rel="noopener">ст. 1236</a>, <a href="https://www.zakonrf.info/gk/1286/" target="_blank" rel="noopener">1286</a></td>
          </tr>
          <tr>
            <td class="term">Смежные права</td>
            <td>Права исполнителей, изготовителей фонограмм, вещательных организаций. Существуют параллельно с авторскими и учитываются отдельно</td>
            <td class="dim"><a href="https://www.zakonrf.info/gk/1303/" target="_blank" rel="noopener">ст. 1303</a>, <a href="https://www.zakonrf.info/gk/1304/" target="_blank" rel="noopener">1304</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="notice info">
      <h4>Практическое следствие</h4>
      <p>У одной записи музыкального произведения может быть несколько групп правообладателей: автор музыки и текста, исполнитель, изготовитель фонограммы. Разрешение, полученное от одного из них, не заменяет разрешения остальных.</p>
    </div>
  </div>
</section>

<section id="cc">
  <div class="wrap">
    <div class="sec-head">
      <span class="sec-num">Раздел 3</span>
      <h2>Свободные лицензии Creative Commons</h2>
      <p>Свободная лицензия представляет собой предварительное разрешение правообладателя на использование произведения на заранее объявленных условиях. Условия обозначаются буквенным кодом. Все лицензии, кроме CC0, требуют указания автора.</p>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Лицензия</th><th>Что разрешает</th><th>Условия использования</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><a class="lic" href="https://creativecommons.org/publicdomain/zero/1.0/deed.ru" target="_blank" rel="noopener">CC0</a></td>
            <td>Любое использование, включая переработку и коммерческое</td>
            <td class="dim">Передача в общественное достояние, указание автора не обязательно</td>
          </tr>
          <tr>
            <td><a class="lic" href="https://creativecommons.org/licenses/by/4.0/deed.ru" target="_blank" rel="noopener">CC BY</a></td>
            <td>Любое использование и переработку</td>
            <td class="dim">Указание автора</td>
          </tr>
          <tr>
            <td><a class="lic" href="https://creativecommons.org/licenses/by-sa/4.0/deed.ru" target="_blank" rel="noopener">CC BY-SA</a></td>
            <td>Использование и переработку</td>
            <td class="dim">Указание автора, распространение производного произведения на тех же условиях</td>
          </tr>
          <tr>
            <td><a class="lic" href="https://creativecommons.org/licenses/by-nd/4.0/deed.ru" target="_blank" rel="noopener">CC BY-ND</a></td>
            <td>Использование в неизменённом виде</td>
            <td class="dim">Указание автора, переработка не допускается</td>
          </tr>
          <tr>
            <td><a class="lic" href="https://creativecommons.org/licenses/by-nc/4.0/deed.ru" target="_blank" rel="noopener">CC BY-NC</a></td>
            <td>Использование и переработку в некоммерческих целях</td>
            <td class="dim">Указание автора, извлечение прибыли не допускается</td>
          </tr>
          <tr>
            <td><a class="lic" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ru" target="_blank" rel="noopener">CC BY-NC-SA</a></td>
            <td>Некоммерческое использование и переработку</td>
            <td class="dim">Указание автора, те же условия для производного произведения</td>
          </tr>
          <tr>
            <td><a class="lic" href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.ru" target="_blank" rel="noopener">CC BY-NC-ND</a></td>
            <td>Некоммерческий показ в неизменённом виде</td>
            <td class="dim">Указание автора, переработка и коммерческое использование не допускаются</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 style="margin-top:36px">Порядок указания автора: формула TASL</h3>
    <p style="color:var(--text-2);max-width:760px">Указание источника оформляется на слайде, в титрах или в перечне источников. Рекомендованный состав сведений приведён <a href="https://wiki.creativecommons.org/wiki/Best_practices_for_attribution" target="_blank" rel="noopener">в рекомендациях Creative Commons</a>.</p>
    <div class="tasl">
      <div class="tasl-item"><div class="tasl-letter">T</div><h4>Title</h4><p>Название произведения</p></div>
      <div class="tasl-item"><div class="tasl-letter">A</div><h4>Author</h4><p>Имя автора или псевдоним</p></div>
      <div class="tasl-item"><div class="tasl-letter">S</div><h4>Source</h4><p>Ссылка на источник</p></div>
      <div class="tasl-item"><div class="tasl-letter">L</div><h4>License</h4><p>Наименование и версия лицензии</p></div>
    </div>
    <div class="sample">
      <span class="lbl">Пример оформления</span>
      «Северное сияние», автор Иван Петров, источник: <a href="https://www.flickr.com/creativecommons/" target="_blank" rel="noopener">flickr.com</a>, лицензия <a href="https://creativecommons.org/licenses/by/4.0/deed.ru" target="_blank" rel="noopener">CC BY 4.0</a>.
    </div>
  </div>
</section>

<section id="muzyka">
  <div class="wrap">
    <div class="sec-head">
      <span class="sec-num">Раздел 4</span>
      <h2>Музыка на мероприятиях института</h2>
      <p>Режим использования музыкального произведения определяется способом его воспроизведения, а не видом мероприятия. Живое исполнение и воспроизведение фонограммы регулируются по-разному.</p>
    </div>

    <div class="media-row">
      <div>
        <div class="notice warn" style="margin-top:0">
          <h4>Различие двух способов использования</h4>
          <p>Льгота, установленная подпунктом 6 пункта 1 <a href="https://www.zakonrf.info/gk/1274/" target="_blank" rel="noopener">статьи 1274 ГК РФ</a>, распространяется на публичное исполнение обнародованного произведения силами работников и обучающихся образовательной организации без извлечения прибыли.</p>
          <p>Воспроизведение фонограммы через звуковую аппаратуру является самостоятельным способом использования и указанной льготой не охватывается. Для него требуется лицензионный договор либо использование произведения под свободной лицензией.</p>
        </div>
      </div>
      <figure>
        <img src="images/stage-performance.jpg" width="1000" height="667" loading="lazy" alt="Выступление на сцене">
        <figcaption>Фотография: Unsplash</figcaption>
      </figure>
    </div>

    <div class="grid-3" style="margin-top:28px">
      <div class="card law-card">
        <span class="art">Способ 1</span>
        <h3>Живое исполнение</h3>
        <p>Исполнение обнародованного произведения работниками или обучающимися без коммерческой цели. Лицензионный договор не требуется, применяется льгота статьи 1274 ГК РФ.</p>
      </div>
      <div class="card law-card">
        <span class="art">Способ 2</span>
        <h3>Воспроизведение фонограммы</h3>
        <p>Публичное исполнение фонограммы. Требуется договор с Российским авторским обществом за авторские права и с Всероссийской организацией интеллектуальной собственности за смежные права.</p>
        <a class="more" href="https://rao.ru/for-users/" target="_blank" rel="noopener">Порядок заключения договора с РАО →</a>
      </div>
      <div class="card law-card">
        <span class="art">Способ 3</span>
        <h3>Произведения под свободной лицензией</h3>
        <p>Композиции из каталогов CC BY и CC BY-SA допускается воспроизводить при условии указания автора. Такой вариант применим для фоновой и танцевальной музыки на мероприятиях.</p>
        <a class="more" href="https://freemusicarchive.org/" target="_blank" rel="noopener">Каталог Free Music Archive →</a>
      </div>
    </div>

    <div class="notice info">
      <h4>Рекомендуемый порядок</h4>
      <p>Фоновое и танцевальное сопровождение подбирается из каталогов со свободными лицензиями. Использование популярных композиций планируется заранее: либо в форме живого исполнения, либо на основании договора с <a href="https://rao.ru/" target="_blank" rel="noopener">РАО</a> и <a href="https://rosvois.ru/" target="_blank" rel="noopener">ВОИС</a>.</p>
    </div>
  </div>
</section>

<section id="istochniki">
  <div class="wrap">
    <div class="sec-head">
      <span class="sec-num">Раздел 5</span>
      <h2>Источники материалов со свободными лицензиями</h2>
      <p>Перечень ресурсов, на которых материалы размещены под свободными лицензиями либо находятся в общественном достоянии. Условия использования проверяются на странице конкретного файла.</p>
    </div>

    <div class="res-grid">
      <div class="card res-col">
        <h4>Изображения</h4>
        <ul>
          <li><a href="https://commons.wikimedia.org/" target="_blank" rel="noopener">Wikimedia Commons</a></li>
          <li><a href="https://www.flickr.com/creativecommons/" target="_blank" rel="noopener">Flickr, раздел CC</a></li>
          <li><a href="https://unsplash.com/" target="_blank" rel="noopener">Unsplash</a></li>
          <li><a href="https://www.pexels.com/" target="_blank" rel="noopener">Pexels</a></li>
          <li><a href="https://openverse.org/" target="_blank" rel="noopener">Openverse</a></li>
        </ul>
      </div>
      <div class="card res-col">
        <h4>Музыка и звук</h4>
        <ul>
          <li><a href="https://freemusicarchive.org/" target="_blank" rel="noopener">Free Music Archive</a></li>
          <li><a href="https://www.jamendo.com/start" target="_blank" rel="noopener">Jamendo</a></li>
          <li><a href="https://freesound.org/" target="_blank" rel="noopener">Freesound</a></li>
        </ul>
      </div>
      <div class="card res-col">
        <h4>Видео</h4>
        <ul>
          <li><a href="https://archive.org/" target="_blank" rel="noopener">Internet Archive</a></li>
          <li><a href="https://vimeo.com/creativecommons" target="_blank" rel="noopener">Vimeo, раздел CC</a></li>
          <li><a href="https://www.pexels.com/videos/" target="_blank" rel="noopener">Pexels Videos</a></li>
        </ul>
      </div>
      <div class="card res-col">
        <h4>Тексты и публикации</h4>
        <ul>
          <li><a href="https://www.doaj.org/" target="_blank" rel="noopener">DOAJ, открытый доступ</a></li>
          <li><a href="https://elibrary.ru/" target="_blank" rel="noopener">Научная электронная библиотека</a></li>
          <li><a href="https://commons.wikimedia.org/wiki/Category:Public_domain" target="_blank" rel="noopener">Материалы общественного достояния</a></li>
        </ul>
      </div>
    </div>
    <p class="res-note">Размещение материала на общедоступном ресурсе не означает разрешения на его использование. Условия определяются лицензией, указанной на странице файла.</p>
  </div>
</section>

<section id="poryadok">
  <div class="wrap">
    <div class="sec-head">
      <span class="sec-num">Раздел 6</span>
      <h2>Порядок действий перед использованием материала</h2>
      <p>Последовательность проверки для трёх основных видов материалов.</p>
    </div>

    <div class="steps" id="steps">
      <div class="step-item open">
        <button class="step-head" type="button" aria-expanded="true">
          <h3><span class="step-badge">А</span> Изображения и видеоматериалы</h3>
          <span class="chevron">▾</span>
        </button>
        <div class="step-body"><div class="step-body-in"><ol>
          <li>Установите источник материала и наличие сведений об авторе и условиях использования.</li>
          <li>Определите правовой статус: общественное достояние по статье 1281 ГК РФ либо свободная лицензия.</li>
          <li>Оцените цель и объём использования. Материал применяется для решения учебной задачи и не заменяет собственное содержание работы.</li>
          <li>Для охраняемого материала проверьте соответствие условиям цитирования по статье 1274 ГК РФ.</li>
          <li>Оформите указание автора по формуле TASL на отдельном слайде или в титрах.</li>
          <li>При отсутствии сведений о правообладателе направьте запрос на использование и сохраните переписку.</li>
        </ol></div></div>
      </div>
      <div class="step-item">
        <button class="step-head" type="button" aria-expanded="false">
          <h3><span class="step-badge">Б</span> Музыкальное сопровождение мероприятия</h3>
          <span class="chevron">▾</span>
        </button>
        <div class="step-body"><div class="step-body-in"><ol>
          <li>Установите автора произведения и дату его смерти. Возможен переход произведения в общественное достояние.</li>
          <li>Проверьте наличие композиции в каталогах со свободными лицензиями и допустимость публичного исполнения.</li>
          <li>Определите способ использования: живое исполнение или воспроизведение фонограммы.</li>
          <li>Проверьте характер мероприятия. При продаже билетов и ином извлечении прибыли льготы для образовательных организаций не применяются.</li>
          <li>Для охраняемых композиций заблаговременно оформите договор с РАО и ВОИС.</li>
        </ol></div></div>
      </div>
      <div class="step-item">
        <button class="step-head" type="button" aria-expanded="false">
          <h3><span class="step-badge">В</span> Текстовые материалы</h3>
          <span class="chevron">▾</span>
        </button>
        <div class="step-body"><div class="step-body-in"><ol>
          <li>Определите объём заимствования. Отдельные фрагменты для иллюстрации собственного тезиса относятся к цитированию, воспроизведение главы или значительной части текста цитированием не является.</li>
          <li>Укажите автора, название произведения, издание и год в соответствии с требованиями к оформлению списка источников.</li>
          <li>Учтите, что перевод является переработкой произведения. Для учебных целей допускается при указании автора оригинала.</li>
          <li>Проверьте работу на корректность заимствований до сдачи.</li>
        </ol></div></div>
      </div>
    </div>

    <div class="media-row" style="margin-top:32px">
      <figure>
        <img src="images/documents.jpg" width="1000" height="667" loading="lazy" alt="Оформление документов">
        <figcaption>Фотография: Unsplash</figcaption>
      </figure>
      <div>
        <h3>Оформление разрешения от правообладателя</h3>
        <p style="color:var(--text-2);font-size:.95rem">Если материал не относится к общественному достоянию и не размещён под свободной лицензией, разрешение запрашивается у правообладателя. В запросе указываются: используемое произведение, цель и способ использования, срок и территория, а также некоммерческий характер использования.</p>
        <p style="color:var(--text-2);font-size:.95rem">Полученный ответ сохраняется до окончания использования материала. Переписка по электронной почте признаётся подтверждением согласия правообладателя.</p>
      </div>
    </div>
  </div>
</section>

<section id="otvetstvennost">
  <div class="wrap">
    <div class="sec-head">
      <span class="sec-num">Раздел 7</span>
      <h2>Ответственность за нарушение</h2>
    </div>
    <div class="liab">
      <div class="liab-card">
        <div class="liab-num">от 10 000 до 5 000 000 ₽</div>
        <p>Компенсация за нарушение исключительного права на произведение. Взыскивается по выбору правообладателя вместо возмещения убытков, размер определяется судом (подпункт 1 пункта 1 <a href="https://www.zakonrf.info/gk/1301/" target="_blank" rel="noopener">статьи 1301 ГК РФ</a>).</p>
      </div>
      <div class="liab-card">
        <div class="liab-num">Статья 7.12 КоАП РФ</div>
        <p>Административный штраф за нарушение авторских и смежных прав в целях извлечения дохода. Применяется независимо от гражданско-правовой ответственности (<a href="https://www.zakonrf.info/koap/7.12/" target="_blank" rel="noopener">текст статьи</a>).</p>
      </div>
    </div>
    <div class="notice alert">
      <h4>Академическая ответственность</h4>
      <p>Использование чужих материалов без указания источника квалифицируется как нарушение норм академической этики и локальных актов института независимо от применения мер гражданско-правовой и административной ответственности.</p>
    </div>
  </div>
</section>

<section id="dokumenty">
  <div class="wrap">
    <div class="sec-head">
      <span class="sec-num">Раздел 8</span>
      <h2>Нормативные документы и справочные ресурсы</h2>
    </div>
    <div class="docs">
      <div class="doc-row">
        <span class="doc-ico">⚖</span>
        <div>
          <b><a href="https://www.consultant.ru/document/cons_doc_LAW_5112/" target="_blank" rel="noopener">Бернская конвенция по охране литературных и художественных произведений</a></b>
          <span>Международный договор, определяющий основные принципы охраны произведений</span>
        </div>
      </div>
      <div class="doc-row">
        <span class="doc-ico">§</span>
        <div>
          <b><a href="https://www.consultant.ru/document/cons_doc_LAW_64629/" target="_blank" rel="noopener">Гражданский кодекс Российской Федерации, часть четвёртая</a></b>
          <span>Права на результаты интеллектуальной деятельности и средства индивидуализации</span>
        </div>
      </div>
      <div class="doc-row">
        <span class="doc-ico">§</span>
        <div>
          <b><a href="https://www.zakonrf.info/gk/1259/" target="_blank" rel="noopener">Статья 1259 ГК РФ</a></b>
          <span>Объекты авторских прав</span>
        </div>
      </div>
      <div class="doc-row">
        <span class="doc-ico">§</span>
        <div>
          <b><a href="https://www.zakonrf.info/gk/1270/" target="_blank" rel="noopener">Статья 1270 ГК РФ</a></b>
          <span>Исключительное право на произведение и способы его использования</span>
        </div>
      </div>
      <div class="doc-row">
        <span class="doc-ico">§</span>
        <div>
          <b><a href="https://www.zakonrf.info/gk/1274/" target="_blank" rel="noopener">Статья 1274 ГК РФ</a></b>
          <span>Свободное использование произведения в информационных, научных, учебных или культурных целях</span>
        </div>
      </div>
      <div class="doc-row">
        <span class="doc-ico">§</span>
        <div>
          <b><a href="https://www.zakonrf.info/gk/1276/" target="_blank" rel="noopener">Статья 1276 ГК РФ</a></b>
          <span>Свободное использование произведения, постоянно находящегося в месте, открытом для свободного посещения</span>
        </div>
      </div>
      <div class="doc-row">
        <span class="doc-ico">§</span>
        <div>
          <b><a href="https://www.zakonrf.info/gk/1301/" target="_blank" rel="noopener">Статья 1301 ГК РФ</a></b>
          <span>Ответственность за нарушение исключительного права на произведение</span>
        </div>
      </div>
      <div class="doc-row">
        <span class="doc-ico">§</span>
        <div>
          <b><a href="https://www.zakonrf.info/koap/7.12/" target="_blank" rel="noopener">Статья 7.12 КоАП РФ</a></b>
          <span>Нарушение авторских и смежных, изобретательских и патентных прав</span>
        </div>
      </div>
      <div class="doc-row">
        <span class="doc-ico">⌂</span>
        <div>
          <b><a href="http://pravo.gov.ru/" target="_blank" rel="noopener">Официальный интернет-портал правовой информации</a></b>
          <span>Официальные тексты нормативных правовых актов</span>
        </div>
      </div>
      <div class="doc-row">
        <span class="doc-ico">♪</span>
        <div>
          <b><a href="https://rao.ru/for-users/" target="_blank" rel="noopener">Российское авторское общество, раздел для пользователей</a></b>
          <span>Порядок заключения лицензионного договора на публичное исполнение</span>
        </div>
      </div>
      <div class="doc-row">
        <span class="doc-ico">♪</span>
        <div>
          <b><a href="https://rosvois.ru/" target="_blank" rel="noopener">Всероссийская организация интеллектуальной собственности</a></b>
          <span>Выплата вознаграждения за использование фонограмм</span>
        </div>
      </div>
      <div class="doc-row">
        <span class="doc-ico">CC</span>
        <div>
          <b><a href="https://creativecommons.org/share-your-work/cclicenses/" target="_blank" rel="noopener">Описание лицензий Creative Commons</a></b>
          <span>Условия каждой лицензии и порядок их применения</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="contact">
      <div>
        <h2>Остались вопросы по использованию материалов?</h2>
        <p>Консультации по оформлению цитирования и заключению лицензионных договоров предоставляют правовой отдел и научная библиотека института.</p>
      </div>
      <div>
        <a href="#poryadok" class="btn btn-white">Порядок действий</a>
      </div>
    </div>
  </div>
</section>

<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <h4>О материале</h4>
        <p style="font-size:.9rem;color:var(--text-2);max-width:420px">Памятка о правомерном использовании чужих произведений в учебной и внеучебной деятельности. Подготовлена на основании части четвёртой Гражданского кодекса Российской Федерации.</p>
      </div>
      <div>
        <h4>Разделы</h4>
        <ul>
          <li><a href="#ponyatiya">Общие положения</a></li>
          <li><a href="#osnovy">Правовая основа России</a></li>
          <li><a href="#cc">Свободные лицензии</a></li>
          <li><a href="#muzyka">Музыка на мероприятиях</a></li>
          <li><a href="#poryadok">Порядок действий</a></li>
        </ul>
      </div>
      <div>
        <h4>Ресурсы</h4>
        <ul>
          <li><a href="https://www.consultant.ru/document/cons_doc_LAW_64629/" target="_blank" rel="noopener">ГК РФ, часть четвёртая</a></li>
          <li><a href="http://pravo.gov.ru/" target="_blank" rel="noopener">pravo.gov.ru</a></li>
          <li><a href="https://rao.ru/" target="_blank" rel="noopener">РАО</a></li>
          <li><a href="https://creativecommons.org/" target="_blank" rel="noopener">Creative Commons</a></li>
        </ul>
      </div>
    </div>
    <div class="disclaimer">
      <p>Материал носит информационно-справочный характер и не заменяет юридическую консультацию. При подготовке конкретных материалов применяются локальные акты института.</p>
      <p>Фотографии: <a href="https://unsplash.com/" target="_blank" rel="noopener">Unsplash</a>, <a href="https://unsplash.com/license" target="_blank" rel="noopener">Unsplash License</a>. Институт, 2026.</p>
    </div>
  </div>
</footer>

<script>
  // Сервис определения режима использования
  var data = {
    "image": {
      ok: true,
      title: "Использование допускается при соблюдении условий",
      text: "Материал используется как цитата с указанием автора и источника, либо на основании свободной лицензии, либо в случае перехода произведения в общественное достояние. Изменение произведения без согласия автора не допускается.",
      link: "https://www.zakonrf.info/gk/1274/",
      linkText: "Статья 1274 ГК РФ"
    },
    "text": {
      ok: true,
      title: "Допускается в объёме цитирования",
      text: "Фрагмент приводится для иллюстрации собственного тезиса с указанием автора, названия произведения и года издания. Воспроизведение значительной части текста без анализа цитированием не является.",
      link: "https://www.zakonrf.info/gk/1274/",
      linkText: "Статья 1274 ГК РФ"
    },
    "music-live": {
      ok: true,
      title: "Лицензионный договор не требуется",
      text: "Живое исполнение обнародованного произведения силами работников и обучающихся без извлечения прибыли охватывается льготой подпункта 6 пункта 1 статьи 1274 ГК РФ.",
      link: "https://www.zakonrf.info/gk/1274/",
      linkText: "Статья 1274 ГК РФ"
    },
    "music-rec": {
      ok: false,
      title: "Требуется лицензионный договор",
      text: "Воспроизведение фонограммы на мероприятии относится к публичному исполнению. Необходим договор с РАО за авторские права и с ВОИС за смежные права, либо использование композиции под свободной лицензией CC BY или CC BY-SA.",
      link: "https://rao.ru/for-users/",
      linkText: "Порядок заключения договора с РАО"
    }
  };

  var result = document.getElementById('result');
  Array.prototype.forEach.call(document.querySelectorAll('.opt'), function(btn){
    btn.addEventListener('click', function(){
      Array.prototype.forEach.call(document.querySelectorAll('.opt'), function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var d = data[btn.dataset.type];
      result.innerHTML =
        '<div class="verdict ' + (d.ok ? 'ok' : 'no') + '">' +
          '<span class="verdict-icon">' + (d.ok ? '✓' : '!') + '</span>' +
          '<div><h4>' + d.title + '</h4><p>' + d.text + '</p>' +
          '<a class="ref" href="' + d.link + '" target="_blank" rel="noopener">' + d.linkText + ' →</a></div>' +
        '</div>';
    });
  });

  // Раскрывающиеся блоки порядка действий
  Array.prototype.forEach.call(document.querySelectorAll('.step-head'), function(head){
    head.addEventListener('click', function(){
      var item = head.parentElement;
      var wasOpen = item.classList.contains('open');
      Array.prototype.forEach.call(document.querySelectorAll('.step-item'), function(i){
        i.classList.remove('open');
        i.querySelector('.step-head').setAttribute('aria-expanded', 'false');
      });
      if(!wasOpen){
        item.classList.add('open');
        head.setAttribute('aria-expanded', 'true');
      }
    });
  });
</script>

</body>
</html>
