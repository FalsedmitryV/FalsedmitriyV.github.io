/* ============================================================
   Справочник: оглавление с подсветкой, ссылки на пункты,
   подсказки на терминах, раскрывающиеся блоки.
   ============================================================ */
(function () {
  'use strict';

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
      toast('Ссылка на пункт скопирована');
      if (btn) {
        btn.classList.add('done');
        setTimeout(function () { btn.classList.remove('done'); }, 1500);
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
    try { document.execCommand('copy'); done(); } catch (e) { toast('Скопировать не удалось'); }
    document.body.removeChild(ta);
  }

  /* транслитерация заголовка в идентификатор */
  var TRANSLIT = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z',
    'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
    'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
  };

  function slug(text) {
    var s = text.toLowerCase().replace(/[а-яё]/g, function (c) { return TRANSLIT[c] || ''; });
    return s.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50);
  }

  /* ---------- оглавление ---------- */

  var tocLinks = [];
  var targets = [];

  function buildToc() {
    var content = $('refContent');
    var list = $('tocList');
    if (!content || !list) return;

    var sections = content.querySelectorAll('section[id]');
    Array.prototype.forEach.call(sections, function (sec) {
      var h2 = sec.querySelector('h2');
      if (!h2) return;

      addLink(list, sec.id, h2.textContent.trim(), false);
      addAnchorButton(h2, sec.id);

      /* подзаголовки внутри раздела */
      var subs = sec.querySelectorAll('h3');
      Array.prototype.forEach.call(subs, function (h3) {
        if (h3.closest('.card') || h3.closest('.step-item') || h3.closest('.liab-card')) return;
        if (!h3.id) h3.id = sec.id + '-' + slug(h3.textContent);
        addLink(list, h3.id, h3.textContent.trim(), true);
        addAnchorButton(h3, h3.id);
      });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  function addLink(list, id, text, isSub) {
    var li = el('li');
    var a = el('a', isSub ? 'sub' : null, text);
    a.href = '#' + id;
    li.appendChild(a);
    list.appendChild(li);
    tocLinks.push(a);
    targets.push(document.getElementById(id));
  }

  function addAnchorButton(heading, id) {
    heading.classList.add('anchorable');
    var b = el('button', 'anchor-btn', '#');
    b.type = 'button';
    b.title = 'Скопировать ссылку на этот пункт';
    b.setAttribute('aria-label', 'Скопировать ссылку на пункт «' + heading.textContent.trim() + '»');
    b.addEventListener('click', function (e) {
      e.preventDefault();
      var url = location.origin === 'null'
        ? location.href.split('#')[0] + '#' + id
        : location.origin + location.pathname + '#' + id;
      copyText(url, b);
      history.replaceState(null, '', '#' + id);
    });
    heading.appendChild(b);
  }

  /* Считаем синхронно: элементов немного, а троттлинг через
     requestAnimationFrame зависает, если вкладка была скрыта. */
  function onScroll() {
    var offset = 140;
    var active = -1;
    for (var i = 0; i < targets.length; i++) {
      if (!targets[i]) continue;
      if (targets[i].getBoundingClientRect().top <= offset) active = i;
    }
    /* у самого низа страницы подсвечивается последний пункт */
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
      active = targets.length - 1;
    }
    tocLinks.forEach(function (a, i) { a.classList.toggle('active', i === active); });

    var current = tocLinks[active];
    if (current && current.offsetParent) {
      var toc = $('toc');
      var top = current.offsetTop;
      if (top < toc.scrollTop || top > toc.scrollTop + toc.clientHeight - 40) {
        toc.scrollTop = top - toc.clientHeight / 2;
      }
    }
  }

  /* ---------- подсказки на терминах ---------- */

  var TERMS = {
    isklyuchitelnoe: {
      title: 'Исключительное право',
      text: 'Право использовать произведение любым не противоречащим закону способом и разрешать или запрещать такое использование другим лицам. Отсутствие запрета согласием не является: если правообладатель молчит, использовать произведение нельзя.',
      src: 'Статья 1270 ГК РФ'
    },
    dostoyanie: {
      title: 'Общественное достояние',
      text: 'Состояние произведения после истечения срока действия исключительного права: использовать его может любой без согласия и без выплаты вознаграждения. Право авторства и право на неприкосновенность произведения при этом охраняются бессрочно.',
      src: 'Статья 1282 ГК РФ'
    },
    pokaz: {
      title: 'Публичный показ',
      text: 'Любая демонстрация произведения — оригинала или экземпляра — непосредственно либо на экране, в месте, открытом для свободного посещения, или там, где присутствуют лица вне обычного круга семьи. Показ слайда в аудитории относится именно к этому способу.',
      src: 'Подпункт 3 пункта 2 статьи 1270 ГК РФ'
    },
    dovedenie: {
      title: 'Доведение до всеобщего сведения',
      text: 'Размещение произведения так, что любой может получить к нему доступ из любого места и в любое время по собственному выбору — то есть публикация в интернете. Это самостоятельный способ использования: разрешение на показ в аудитории его не покрывает.',
      src: 'Подпункт 11 пункта 2 статьи 1270 ГК РФ'
    },
    ispolnenie: {
      title: 'Публичное исполнение',
      text: 'Представление произведения в живом исполнении или с помощью технических средств в месте, открытом для свободного посещения, либо там, где присутствует значительное число посторонних лиц. Концерт, линейка и фоновая музыка в холле подпадают под этот способ.',
      src: 'Подпункт 6 пункта 2 статьи 1270 ГК РФ'
    },
    smezhnye: {
      title: 'Смежные права',
      text: 'Права исполнителей, изготовителей фонограмм и вещательных организаций. Существуют параллельно с авторскими: у одной записи есть автор музыки и текста, исполнитель и изготовитель фонограммы. Разрешение от одного не заменяет разрешения остальных.',
      src: 'Статьи 1303 и 1304 ГК РФ'
    },
    okup: {
      title: 'Организации по коллективному управлению правами',
      text: 'Организации с государственной аккредитацией, которые собирают вознаграждение за использование произведений вместо самих авторов. РАО отвечает за авторские права на музыку и текст, ВОИС — за смежные права исполнителей и изготовителей фонограмм.',
      src: 'Статья 1242 ГК РФ'
    }
  };

  var pop = null;

  function initTooltips() {
    var nodes = document.querySelectorAll('.tt');
    Array.prototype.forEach.call(nodes, function (n) {
      n.setAttribute('type', 'button');
      n.addEventListener('mouseenter', function () { showTip(n); });
      n.addEventListener('mouseleave', hideTip);
      n.addEventListener('focus', function () { showTip(n); });
      n.addEventListener('blur', hideTip);
      n.addEventListener('click', function (e) {
        e.preventDefault();
        if (pop && pop.dataset.owner === n.dataset.term) { hideTip(); } else { showTip(n); }
      });
    });
    document.addEventListener('click', function (e) {
      if (pop && !e.target.classList.contains('tt')) hideTip();
    });
    window.addEventListener('scroll', hideTip, { passive: true });
  }

  function showTip(node) {
    var term = TERMS[node.dataset.term];
    if (!term) return;
    hideTip();

    pop = el('div', 'tt-pop');
    pop.dataset.owner = node.dataset.term;
    pop.appendChild(el('b', null, term.title));
    pop.appendChild(document.createTextNode(term.text));
    pop.appendChild(el('span', 'src', term.src));
    document.body.appendChild(pop);

    var r = node.getBoundingClientRect();
    var width = pop.offsetWidth;
    var left = r.left + window.scrollX + r.width / 2 - width / 2;
    left = Math.max(12, Math.min(left, document.documentElement.clientWidth - width - 12));
    var top = r.bottom + window.scrollY + 10;
    if (r.bottom + pop.offsetHeight + 20 > window.innerHeight) {
      top = r.top + window.scrollY - pop.offsetHeight - 10;
    }
    pop.style.left = left + 'px';
    pop.style.top = Math.max(8, top) + 'px';
  }

  function hideTip() {
    if (pop && pop.parentNode) pop.parentNode.removeChild(pop);
    pop = null;
  }

  /* ---------- раскрывающиеся блоки ---------- */

  function initSteps() {
    var heads = document.querySelectorAll('.step-head');
    Array.prototype.forEach.call(heads, function (head) {
      head.addEventListener('click', function () {
        var item = head.parentElement;
        var wasOpen = item.classList.contains('open');
        Array.prototype.forEach.call(document.querySelectorAll('.step-item'), function (i) {
          i.classList.remove('open');
          i.querySelector('.step-head').setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          item.classList.add('open');
          head.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildToc();
    initTooltips();
    initSteps();
  });
})();
