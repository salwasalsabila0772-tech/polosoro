/* ==========================================================
   INTERAKSI & PENAMPILAN DATA - PKD Polosoro Purworejo
   Halaman dikenali dari <body data-page="...">.
   Data dimuat secara dinamis dari window.DATA (bisa diubah lewat Panel Admin).
   ========================================================== */
(function () {
  var S = window.SITE, D = window.DATA;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  var MON3 = ["JAN", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGU", "SEP", "OKT", "NOV", "DES"];
  var DOW = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  var page = document.body.getAttribute("data-page");

  function parse(iso) { var p = (iso || "").split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmt(iso) { var d = parse(iso); return isNaN(d.getTime()) ? iso : (d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear()); }
  function qs(k) { return new URLSearchParams(location.search).get(k); }
  function img(n) {
    if (!n) return "assets/img/desa.svg";
    if (n.indexOf("data:") === 0 || n.indexOf("http://") === 0 || n.indexOf("https://") === 0 || n.indexOf("/") > -1) {
      return n;
    }
    return "assets/img/" + n;
  }
  function wa(text, num) { return "https://wa.me/" + (num || S.whatsapp) + "?text=" + encodeURIComponent(text); }
  function find(list, id, key) { return list.filter(function (x) { return String(x[key || "id"]) === String(id); })[0]; }
  function byDateDesc(a, b) { return a.date < b.date ? 1 : -1; }
  function byDateAsc(a, b) { return a.date > b.date ? 1 : -1; }
  function setHTML(sel, html) { var el = $(sel); if (el) el.innerHTML = html; return el; }

  /* ---------- UMUM ---------- */
  $$("[data-site]").forEach(function (el) { var v = S[el.getAttribute("data-site")]; if (v !== undefined) el.textContent = v; });
  $$("[data-icon]").forEach(function (el) { el.outerHTML = window.icon(el.getAttribute("data-icon"), el.className); });

  var toggle = $(".nav-toggle"), nav = $("#nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
      toggle.classList.toggle("is-open", open);
    });
    $$("a", nav).forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.classList.remove("is-open");
      });
    });
  }
  var header = $(".site-header"), topBtn = $(".fab--top");
  function onScroll() {
    var y = window.scrollY || 0;
    if (header) header.classList.toggle("is-stuck", y > 10);
    if (topBtn) topBtn.classList.toggle("is-show", y > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (topBtn) topBtn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  function observe() {
    var els = $$(".reveal:not(.is-visible)");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  /* ---------- KOMPONEN KARTU ---------- */
  function newsCard(n) {
    return '<a class="card news-card reveal" href="berita.html?id=' + n.id + '">' +
      '<div class="card__img"><img src="' + img(n.image) + '" alt="" loading="lazy"></div>' +
      '<div class="card__body"><span class="chip">' + n.category + '</span><h3>' + n.title + '</h3><p>' + n.excerpt + '</p><span class="meta">' + fmt(n.date) + '</span></div></a>';
  }
  function newsRow(n) {
    return '<a class="card news-row reveal" href="berita.html?id=' + n.id + '">' +
      '<div class="thumb"><img src="' + img(n.image) + '" alt="" loading="lazy"></div>' +
      '<div><span class="chip">' + n.category + '</span><h3>' + n.title + '</h3><span class="meta">' + fmt(n.date) + '</span></div></a>';
  }
  function eventRow(e) {
    var d = parse(e.date);
    return '<a class="card event reveal" href="agenda.html?id=' + e.id + '">' +
      '<div class="date-box"><strong>' + (isNaN(d.getDate()) ? '?' : d.getDate()) + '</strong><span>' + (isNaN(d.getMonth()) ? 'EVT' : MON3[d.getMonth()]) + '</span></div>' +
      '<div><h3>' + e.title + '</h3><span class="meta">' + e.time + ' · ' + e.place + '</span></div><span class="chip">' + e.type + '</span></a>';
  }
  function personCard(p) {
    return '<div class="card person reveal">' +
      '<div class="person__img"><img src="' + img(p.image) + '" alt="Foto ' + p.name + '" loading="lazy"></div>' +
      '<div class="person__body"><h3>' + p.name + '</h3><span>' + p.role + '</span></div></div>';
  }
  function albumCard(a) {
    var len = (a.photos && a.photos.length) || 0;
    return '<a class="card album-card reveal" href="album.html?id=' + a.id + '">' +
      '<div class="card__img"><img src="' + img(a.cover) + '" alt="" loading="lazy"><span class="count">' + len + ' foto</span></div>' +
      '<div class="card__body"><span class="chip">' + a.category + '</span><h3>' + a.title + '</h3><span class="meta">' + fmt(a.date) + ' · ' + a.place + '</span></div></a>';
  }
  function paginate(box, total, per, cur, go) {
    var pages = Math.ceil(total / per);
    if (!box) return;
    if (pages <= 1) { box.innerHTML = ""; return; }
    var h = '<button type="button" data-p="' + (cur - 1) + '" aria-label="Sebelumnya"' + (cur === 1 ? ' disabled' : '') + '>‹</button>';
    for (var i = 1; i <= pages; i++) {
      h += '<button type="button" data-p="' + i + '"' + (i === cur ? ' aria-current="true"' : '') + '>' + i + '</button>';
    }
    h += '<button type="button" data-p="' + (cur + 1) + '" aria-label="Berikutnya"' + (cur === pages ? ' disabled' : '') + '>›</button>';
    box.innerHTML = h;
    $$("button", box).forEach(function (b) {
      b.addEventListener("click", function () { go(+b.getAttribute("data-p")); });
    });
  }
  function pills(box, items, current, pick) {
    box.innerHTML = items.map(function (c) {
      return '<button class="pill" type="button" data-v="' + c + '" aria-pressed="' + (c === current) + '">' + c + '</button>';
    }).join("");
    $$("button", box).forEach(function (b) {
      b.addEventListener("click", function () { pick(b.getAttribute("data-v")); });
    });
  }
  function shareBar(title) {
    var url = location.href;
    return '<div class="share"><strong>Bagikan:</strong>' +
      '<a class="btn btn--outline btn--sm" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(title + ' ' + url) + '">WhatsApp</a>' +
      '<a class="btn btn--outline btn--sm" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '">Facebook</a>' +
      '<button class="btn btn--outline btn--sm" type="button" data-copy>Salin tautan</button></div>';
  }
  function bindCopy() {
    $$("[data-copy]").forEach(function (b) {
      b.addEventListener("click", function () {
        try {
          navigator.clipboard.writeText(location.href);
          b.textContent = "Tautan disalin ✓";
        } catch (e) {
          b.textContent = "Salin manual";
        }
      });
    });
  }
  function lightbox(photos, i) {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Pratinjau foto");
    box.innerHTML = '<button class="lb-close" type="button" aria-label="Tutup">✕</button>' +
      '<button class="lb-prev" type="button" aria-label="Sebelumnya">‹</button>' +
      '<div class="lightbox__img"><img alt=""></div>' +
      '<button class="lb-next" type="button" aria-label="Berikutnya">›</button>' +
      '<div class="lightbox__cap"></div>';
    document.body.appendChild(box);
    function show() {
      $("img", box).src = img(photos[i].src);
      $("img", box).alt = photos[i].caption || "";
      $(".lightbox__cap", box).textContent = (i + 1) + " / " + photos.length + " · " + (photos[i].caption || "");
    }
    function close() { document.removeEventListener("keydown", key); box.remove(); }
    function step(d) { i = (i + d + photos.length) % photos.length; show(); }
    function key(e) { if (e.key === "Escape") close(); if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1); }
    $(".lb-close", box).addEventListener("click", close);
    $(".lb-prev", box).addEventListener("click", function () { step(-1); });
    $(".lb-next", box).addEventListener("click", function () { step(1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", key);
    show();
  }

  var P = {};

  /* ---------- BERANDA ---------- */
  P.home = function () {
    // Foto Hero jika diupload admin
    if (S.heroImage && $("#hero-img-box")) {
      $("#hero-img-box").innerHTML = '<img src="' + img(S.heroImage) + '" alt="Foto Dokumentasi Utama Paguyuban" style="width:100%;height:100%;object-fit:cover">';
    }

    setHTML("#stats", D.stats.map(function (s) {
      return '<div class="stat reveal"><strong>' + s.value + '</strong><span>' + s.label + '</span></div>';
    }).join(""));

    var news = D.news.slice().sort(byDateDesc);
    if (news.length) {
      setHTML("#home-news", '<div>' + newsCard(news[0]) + '</div><div class="news-home__side">' + news.slice(1, 4).map(newsRow).join("") + '</div>');
    }

    var ev = D.agenda.slice().sort(byDateAsc);
    if (ev.length) {
      setHTML("#home-agenda", ev.slice(0, 3).map(function (e) {
        var d = parse(e.date);
        return '<a class="card agenda-item reveal" href="agenda.html?id=' + e.id + '">' +
          '<div class="date-box"><strong>' + (isNaN(d.getDate()) ? '?' : d.getDate()) + '</strong><span>' + (isNaN(d.getMonth()) ? 'EVT' : MON3[d.getMonth()]) + '</span></div>' +
          '<div><h3>' + e.title + '</h3><span class="meta">' + e.time + ' · ' + e.place + '</span></div></a>';
      }).join(""));
      var nx = ev[0];
      setHTML("#home-agenda-next", '<a class="card reveal" href="agenda.html?id=' + nx.id + '">' +
        '<div class="card__img"><img src="' + img(nx.image) + '" alt="" loading="lazy"></div>' +
        '<div class="card__body"><span class="chip">' + nx.type + '</span><h3>' + nx.title + '</h3><span class="meta">' + fmt(nx.date) + ' · ' + nx.time + ' · ' + nx.place + '</span></div></a>');
    }

    var s = D.sambutan;
    if (s) {
      setHTML("#sambutan", '<div class="sambutan__img reveal"><img src="' + img(s.image) + '" alt="Foto ' + s.name + '" loading="lazy"></div>' +
        '<div class="reveal"><span class="eyebrow">Sambutan Ketua Umum</span><blockquote>“' + s.quote + '”</blockquote><p>' + s.text + '</p>' +
        '<strong>' + s.name + '</strong><div class="meta">' + s.role + '</div><p style="margin-top:24px"><a class="btn btn--outline" href="organisasi.html">Profil Organisasi</a></p></div>');
    }

    setHTML("#home-pengurus", D.pengurus.slice(0, 4).map(personCard).join(""));
    setHTML("#home-albums", D.albums.slice(0, 5).map(function (a) {
      return '<a href="album.html?id=' + a.id + '"><img src="' + img(a.cover) + '" alt="" loading="lazy"><span>' + a.title + '</span></a>';
    }).join(""));
    setHTML("#home-programs", D.programs.map(function (p) {
      return '<div class="card program reveal"><div class="icon-wrap">' + window.icon(p.icon) + '</div><h3>' + p.title + '</h3><p>' + p.text + '</p></div>';
    }).join(""));

    // DAFTAR WILAYAH KECAMATAN & DESA DI BERANDA
    var kecFilter = $("#home-kec-filter");
    if (kecFilter) {
      kecFilter.innerHTML = '<option value="">Semua Kecamatan</option>' + D.kecamatan.map(function (k) {
        return '<option value="' + k + '">Kecamatan ' + k + '</option>';
      }).join("");
    }

    function renderKecGrid(filterKec) {
      var listKec = filterKec ? [filterKec] : D.kecamatan;
      setHTML("#home-kec-grid", listKec.map(function (k) {
        var count = D.desa.filter(function (d) { return d.kecamatan === k; }).length;
        return '<div class="kec-card reveal">' +
          '<div class="kec-card__top">' +
            '<div><h3>' + k + '</h3><p>Kecamatan</p></div>' +
            '<div class="kec-card__icon">' + window.icon("building") + '</div>' +
          '</div>' +
          '<div class="meta" style="color:var(--color-primary);font-weight:600">' + (count > 0 ? count + ' Desa terdaftar' : 'Belum ada data') + '</div>' +
          '<a class="kec-card__btn" href="organisasi.html?kec=' + encodeURIComponent(k) + '#desa"><span>Lihat Daftar Desa</span><span>→</span></a>' +
        '</div>';
      }).join(""));
      observe();
    }
    renderKecGrid("");

    if (kecFilter) {
      kecFilter.addEventListener("change", function () {
        renderKecGrid(kecFilter.value);
      });
    }

    var searchInput = $("#home-desa-q"), searchBtn = $("#home-desa-search-btn"), resBox = $("#home-desa-results");
    function doSearch() {
      var q = (searchInput.value || "").trim().toLowerCase();
      var k = (kecFilter && kecFilter.value) || "";
      if (!q && !k) {
        if (resBox) resBox.hidden = true;
        renderKecGrid("");
        return;
      }
      var matches = D.desa.filter(function (d) {
        var matchQ = !q || (d.name + " " + d.kades + " " + d.kecamatan).toLowerCase().indexOf(q) > -1;
        var matchK = !k || d.kecamatan === k;
        return matchQ && matchK;
      });
      if (resBox) {
        resBox.hidden = false;
        if (!matches.length) {
          resBox.innerHTML = '<div class="empty" style="padding:20px 0">Tidak ada desa yang cocok dengan pencarian "<strong>' + q + '</strong>".</div>';
        } else {
          resBox.innerHTML = '<h3 style="font-size:1.1rem;margin-bottom:12px;color:var(--color-primary-dark)">Hasil Pencarian (' + matches.length + ' Desa Ditemukan):</h3>' +
            '<div class="grid grid--3">' + matches.map(function (d) {
              return '<div class="card" style="padding:18px">' +
                '<span class="chip" style="margin-bottom:8px">' + d.kecamatan + '</span>' +
                '<h4 style="margin:0 0 4px">Desa ' + d.name + '</h4>' +
                '<p class="meta" style="margin:0 0 4px">Kepala Desa: <strong>' + d.kades + '</strong> (' + (d.periode || '-') + ')</p>' +
                '<p style="font-size:.84rem;margin:0 0 12px;color:var(--color-muted)">' + (d.alamat || '-') + '</p>' +
                '<a class="btn btn--wa btn--xs" target="_blank" rel="noopener" href="' + wa('Halo ' + d.kades + ', saya menghubungi dari website paguyuban.', d.wa) + '">Hubungi WhatsApp</a>' +
              '</div>';
            }).join("") + '</div>';
        }
      }
    }
    if (searchInput) searchInput.addEventListener("input", doSearch);
    if (searchBtn) searchBtn.addEventListener("click", doSearch);
  };

  /* ---------- ORGANISASI ---------- */
  P.organisasi = function () {
    setHTML("#sejarah", D.sejarah.map(function (s) {
      return '<div class="card card--pad reveal"><strong>' + s.year + '</strong><p>' + s.text + '</p></div>';
    }).join(""));
    setHTML("#visi", D.visi);
    setHTML("#misi", D.misi.map(function (m, i) {
      return '<li><b>' + (i + 1) + '</b><span>' + m + '</span></li>';
    }).join(""));

    var K = {}; D.pengurus.forEach(function (p) { K[p.key] = p; });
    function initials(name) {
      return (name || "").replace(/[.,]/g, " ").split(/\s+/).filter(function (part) { return part.length > 1; }).slice(0, 2).map(function (part) {
        return part.charAt(0);
      }).join("").toUpperCase();
    }
    function node(p, sm) {
      if (!p) return "";
      var hasPhoto = p.image && p.image !== "person.svg";
      var avatar = hasPhoto
        ? '<img src="' + img(p.image) + '" alt="Foto ' + p.name + '" loading="lazy">'
        : '<span class="node__initials" aria-hidden="true">' + initials(p.name) + '</span>';
      return '<div class="node' + (sm ? ' node--sm' : '') + (p.key === "ketua" ? ' node--leader' : '') + '">' +
        '<div class="node__avatar">' + avatar + '</div>' +
        '<div class="node__copy"><h3>' + p.name + '</h3><span>' + p.role + '</span></div></div>';
    }
    var L = '<div class="tree__line"></div>';
    setHTML("#tree", '<div class="tree__row tree__row--1">' + node(K.ketua) + '</div>' + L +
      '<div class="tree__row tree__row--1">' + node(K.wakil) + '</div>' + L +
      '<div class="tree__row tree__row--3">' + node(K.sekretaris) + node(K.bendahara) + node(K.koord) + '</div>' + L +
      '<div class="tree__row tree__row--4">' + [K.b1, K.b2, K.b3, K.b4].map(function (p) { return node(p, true); }).join("") + '</div>');

    setHTML("#org-programs", D.programs.map(function (p) {
      return '<div class="card program reveal"><div class="icon-wrap">' + window.icon(p.icon) + '</div><h3>' + p.title + '</h3><p>' + p.text + '</p></div>';
    }).join(""));

    setHTML("#docs", D.docs.map(function (d) {
      return '<div class="card doc"><div class="ext">' + d.ext + '</div><div><h3>' + d.title + '</h3><span class="meta">' + d.size + ' · ' + d.year + '</span></div><a class="btn btn--outline btn--sm" href="' + d.url + '">Unduh</a></div>';
    }).join(""));

    // TABEL DAFTAR DESA ORGANISASI
    var preKec = qs("kec") || "Semua";
    var st = { q: "", kec: preKec, page: 1 }, per = 6;
    var sel = $("#desa-kec");
    if (sel) {
      sel.innerHTML = '<option value="Semua">Semua Kecamatan</option>' + D.kecamatan.map(function (k) {
        return '<option value="' + k + '"' + (k === preKec ? ' selected' : '') + '>Kecamatan ' + k + '</option>';
      }).join("");
    }

    function drawDesa() {
      var list = D.desa.filter(function (d) {
        return (st.kec === "Semua" || d.kecamatan === st.kec) &&
          (!st.q || (d.name + " " + d.kades + " " + d.kecamatan).toLowerCase().indexOf(st.q) > -1);
      });
      var counterEl = $("#desa-counter");
      if (counterEl) {
        counterEl.textContent = "Menampilkan " + list.length + " Desa";
      }
      var from = (st.page - 1) * per;
      setHTML("#desa-rows", list.slice(from, from + per).map(function (d) {
        return '<tr>' +
          '<td><strong>Desa ' + d.name + '</strong></td>' +
          '<td><div style="font-weight:600">' + d.kades + '</div><div class="meta">Periode ' + (d.periode || '-') + '</div></td>' +
          '<td><span class="chip">' + d.kecamatan + '</span></td>' +
          '<td>' + (d.penduduk || '-') + ' jiwa</td>' +
          '<td>' + (d.alamat || '-') + '</td>' +
          '<td style="text-align:right"><a class="btn btn--wa btn--xs" target="_blank" rel="noopener" href="' + wa('Halo ' + d.kades + ', saya menghubungi dari website paguyuban.', d.wa) + '">WhatsApp</a></td>' +
        '</tr>';
      }).join(""));
      $("#desa-empty").hidden = list.length > 0;
      paginate($("#desa-pager"), list.length, per, st.page, function (p) {
        st.page = p;
        drawDesa();
      });
    }

    if ($("#desa-q")) {
      $("#desa-q").addEventListener("input", function (e) {
        st.q = e.target.value.trim().toLowerCase();
        st.page = 1;
        drawDesa();
      });
    }
    if (sel) {
      sel.addEventListener("change", function () {
        st.kec = sel.value;
        st.page = 1;
        drawDesa();
      });
    }
    drawDesa();
  };

  /* ---------- BERITA ---------- */
  P.berita = function () {
    var lv = $("#news-list-view"), dv = $("#news-detail-view"), id = qs("id"), n = id && find(D.news, id);
    if (n) {
      lv.hidden = true; dv.hidden = false; document.title = n.title + " - " + S.shortName;
      var rel = D.news.filter(function (x) { return x.id !== n.id; }).sort(function (a, b) {
        return (b.category === n.category) - (a.category === n.category) || byDateDesc(a, b);
      }).slice(0, 3);
      setHTML("#crumb-title", n.title);
      setHTML("#news-article", '<span class="chip">' + n.category + '</span><h1 style="margin-top:14px;font-size:2.2rem">' + n.title + '</h1>' +
        '<div class="meta" style="margin-bottom:18px">' + fmt(n.date) + ' · Penulis: ' + (n.author || 'Redaksi') + '</div>' +
        '<div class="article__cover"><img src="' + img(n.image) + '" alt="' + n.title + '"></div>' +
        '<div class="article__body">' + (n.body || []).map(function (p) { return '<p>' + p + '</p>'; }).join("") + '</div>' +
        shareBar(n.title) +
        '<h2 style="font-size:1.45rem;margin:40px 0 20px">Berita &amp; Informasi Terkait</h2><div class="grid grid--3">' + rel.map(newsCard).join("") + '</div>');
      bindCopy(); observe(); return;
    }

    var st = { cat: "Semua", q: "", month: "", page: 1 }, per = 6;
    var cats = ["Semua"].concat(D.news.map(function (x) { return x.category; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
    function months() {
      var m = {}; D.news.forEach(function (x) { if (x.date) m[x.date.slice(0, 7)] = 1; });
      return Object.keys(m).sort().reverse();
    }

    function drawNews() {
      pills($("#news-cats"), cats, st.cat, function (c) { st.cat = c; st.page = 1; drawNews(); });
      var list = D.news.filter(function (x) {
        return (st.cat === "Semua" || x.category === st.cat) &&
          (!st.month || (x.date && x.date.slice(0, 7) === st.month)) &&
          (!st.q || (x.title + " " + x.excerpt).toLowerCase().indexOf(st.q) > -1);
      }).sort(byDateDesc);

      var from = (st.page - 1) * per;
      setHTML("#news-grid", list.slice(from, from + per).map(newsCard).join(""));
      $("#news-empty").hidden = list.length > 0;
      paginate($("#news-pager"), list.length, per, st.page, function (p) {
        st.page = p; drawNews(); window.scrollTo({ top: 200, behavior: "smooth" });
      });
      observe();
    }

    setHTML("#side-cats", cats.slice(1).map(function (c) {
      var k = D.news.filter(function (x) { return x.category === c; }).length;
      return '<li><a href="#" data-cat="' + c + '">' + c + '</a><span class="meta">' + k + '</span></li>';
    }).join(""));
    setHTML("#side-popular", D.news.filter(function (x) { return x.popular; }).map(function (x) {
      return '<li><a href="berita.html?id=' + x.id + '">' + x.title + '</a></li>';
    }).join(""));
    setHTML("#side-archive", months().map(function (m) {
      var p = m.split("-");
      return '<li><a href="#" data-month="' + m + '">' + MONTHS[+p[1] - 1] + ' ' + p[0] + '</a></li>';
    }).join(""));

    $$("#side-cats a").forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); st.cat = a.getAttribute("data-cat"); st.page = 1; drawNews(); });
    });
    $$("#side-archive a").forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); st.month = a.getAttribute("data-month"); st.page = 1; drawNews(); });
    });
    $("#news-q").addEventListener("input", function (e) { st.q = e.target.value.trim().toLowerCase(); st.page = 1; drawNews(); });
    $("#news-reset").addEventListener("click", function () { st = { cat: "Semua", q: "", month: "", page: 1 }; $("#news-q").value = ""; drawNews(); });
    drawNews();
  };

  /* ---------- ALBUM FOTO ---------- */
  P.album = function () {
    var lv = $("#album-list-view"), dv = $("#album-detail-view"), id = qs("id"), a = id && find(D.albums, id);
    if (a) {
      lv.hidden = true; dv.hidden = false; document.title = a.title + " - " + S.shortName;
      setHTML("#crumb-title", a.title);
      setHTML("#album-head", '<span class="chip">' + a.category + '</span><h1 style="margin-top:14px;font-size:2.2rem">' + a.title + '</h1>' +
        '<div class="meta">' + fmt(a.date) + ' · Tempat: ' + a.place + ' · ' + (a.photos ? a.photos.length : 0) + ' dokumentasi foto</div>' + shareBar(a.title));
      setHTML("#album-photos", (a.photos || []).map(function (p, i) {
        return '<button type="button" data-i="' + i + '" aria-label="Buka foto ' + (i + 1) + '">' +
          '<img src="' + img(p.src) + '" alt="' + (p.caption || '') + '" loading="lazy"></button>';
      }).join(""));
      $$("#album-photos button").forEach(function (b) {
        b.addEventListener("click", function () { lightbox(a.photos, +b.getAttribute("data-i")); });
      });
      bindCopy(); return;
    }

    var st = { cat: "Semua", year: "Semua", q: "" };
    var cats = ["Semua"].concat(D.albums.map(function (x) { return x.category; }).filter(function (c, i, arr) { return arr.indexOf(c) === i; }));
    var years = D.albums.map(function (x) { return x.date ? x.date.slice(0, 4) : ""; }).filter(function (c, i, arr) { return c && arr.indexOf(c) === i; }).sort().reverse();
    var ys = $("#album-year");
    if (ys) {
      ys.innerHTML = '<option value="Semua">Semua Tahun</option>' + years.map(function (y) { return '<option value="' + y + '">' + y + '</option>'; }).join("");
      ys.addEventListener("change", function () { st.year = ys.value; drawAlbum(); });
    }

    function drawAlbum() {
      pills($("#album-cats"), cats, st.cat, function (c) { st.cat = c; drawAlbum(); });
      var list = D.albums.filter(function (x) {
        return (st.cat === "Semua" || x.category === st.cat) &&
          (st.year === "Semua" || (x.date && x.date.slice(0, 4) === st.year)) &&
          (!st.q || x.title.toLowerCase().indexOf(st.q) > -1);
      }).sort(byDateDesc);
      setHTML("#album-grid", list.map(albumCard).join(""));
      $("#album-empty").hidden = list.length > 0;
      observe();
    }
    if ($("#album-q")) $("#album-q").addEventListener("input", function (e) { st.q = e.target.value.trim().toLowerCase(); drawAlbum(); });
    drawAlbum();
  };

  /* ---------- AGENDA ---------- */
  P.agenda = function () {
    var lv = $("#agenda-list-view"), dv = $("#agenda-detail-view"), id = qs("id"), e = id && find(D.agenda, id);
    if (e) {
      lv.hidden = true; dv.hidden = false; document.title = e.title + " - " + S.shortName;
      setHTML("#crumb-title", e.title);
      var d = e.date ? e.date.replace(/-/g, "") : "", end = new Date(parse(e.date).getTime() + 86400000),
          de = end.getFullYear() + ("0" + (end.getMonth() + 1)).slice(-2) + ("0" + end.getDate()).slice(-2);
      var gcal = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(e.title) + "&dates=" + d + "/" + de + "&location=" + encodeURIComponent(e.place) + "&details=" + encodeURIComponent(e.desc || "");
      setHTML("#agenda-detail", '<div class="detail__img"><img src="' + img(e.image) + '" alt=""></div><div>' +
        '<span class="chip">' + e.type + '</span><h1 style="margin-top:14px;font-size:2.2rem">' + e.title + '</h1>' +
        '<ul class="info-list"><li>' + window.icon("calendar") + '<span>' + fmt(e.date) + ' · ' + e.time + '</span></li>' +
        '<li>' + window.icon("pin") + '<span>' + e.place + '</span></li>' +
        '<li>' + window.icon("users") + '<span>Peserta: ' + (e.peserta || 'Seluruh anggota') + '</span></li></ul>' +
        '<p style="font-size:1.05rem;line-height:1.7;margin-top:18px">' + (e.desc || '') + '</p>' +
        '<div class="hero__actions" style="justify-content:flex-start;margin-top:24px"><a class="btn btn--primary" target="_blank" rel="noopener" href="' + gcal + '">Tambah ke Google Calendar</a><a class="btn btn--outline" href="agenda.html">‹ Semua Agenda</a></div>' +
        shareBar(e.title) + '</div>');
      bindCopy(); return;
    }

    var sorted = D.agenda.slice().sort(byDateAsc);
    var firstDate = sorted.length ? parse(sorted[0].date) : new Date();
    var st = { y: firstDate.getFullYear(), m: firstDate.getMonth(), type: "Semua", q: "", day: 0 };
    var types = ["Semua", "Rapat", "Pelatihan", "Kunjungan", "Acara Resmi"], today = new Date();

    function inMonth(x) { var d = parse(x.date); return d.getFullYear() === st.y && d.getMonth() === st.m; }
    function drawAgenda() {
      pills($("#agenda-types"), types, st.type, function (t) { st.type = t; st.day = 0; drawAgenda(); });
      var evDays = {}; D.agenda.filter(inMonth).forEach(function (x) { evDays[parse(x.date).getDate()] = 1; });
      var first = new Date(st.y, st.m, 1), blanks = (first.getDay() + 6) % 7, days = new Date(st.y, st.m + 1, 0).getDate();
      var h = '<div class="cal__head"><strong>' + MONTHS[st.m] + ' ' + st.y + '</strong><div class="cal__nav">' +
        '<button type="button" data-d="-1" aria-label="Bulan sebelumnya">‹</button>' +
        '<button type="button" data-d="1" aria-label="Bulan berikutnya">›</button></div></div><div class="cal__grid">';
      DOW.forEach(function (w) { h += '<div class="cal__dow">' + w + '</div>'; });
      for (var i = 0; i < blanks; i++) h += '<span class="cal__day is-empty"></span>';
      for (var dd = 1; dd <= days; dd++) {
        var isT = today.getFullYear() === st.y && today.getMonth() === st.m && today.getDate() === dd;
        h += evDays[dd] ? '<button type="button" class="cal__day has-ev' + (isT ? ' is-today' : '') + '" data-day="' + dd + '" aria-label="Agenda tanggal ' + dd + '">' + dd + '</button>' :
          '<span class="cal__day' + (isT ? ' is-today' : '') + '">' + dd + '</span>';
      }
      setHTML("#cal", h + '</div><p class="meta" style="margin:14px 0 0">💡 Tanggal ungu menandakan adanya agenda paguyuban. Klik untuk memfilter.</p>');

      $$("#cal [data-d]").forEach(function (b) {
        b.addEventListener("click", function () {
          st.m += +b.getAttribute("data-d");
          if (st.m < 0) { st.m = 11; st.y--; }
          if (st.m > 11) { st.m = 0; st.y++; }
          st.day = 0; drawAgenda();
        });
      });
      $$("#cal [data-day]").forEach(function (b) {
        b.addEventListener("click", function () { st.day = +b.getAttribute("data-day"); drawAgenda(); });
      });

      var list = sorted.filter(function (x) {
        return inMonth(x) && (!st.day || parse(x.date).getDate() === st.day) &&
          (st.type === "Semua" || x.type === st.type) &&
          (!st.q || x.title.toLowerCase().indexOf(st.q) > -1);
      });
      setHTML("#agenda-list", list.map(eventRow).join(""));
      $("#agenda-empty").hidden = list.length > 0;
      $("#agenda-clear").hidden = !st.day;
      observe();
    }

    if ($("#agenda-q")) $("#agenda-q").addEventListener("input", function (ev) { st.q = ev.target.value.trim().toLowerCase(); drawAgenda(); });
    if ($("#agenda-clear")) $("#agenda-clear").addEventListener("click", function () { st.day = 0; drawAgenda(); });
    drawAgenda();
  };

  /* ---------- PROFIL DESA (DIRANCANG ULANG TOTAL: LEBIH LENGKAP & RAPI) ---------- */
  P.desa = function () {
    var kecSel = $("#desa-kec-select"), desaSel = $("#desa-select"), box = $("#desa-profile");
    var cur = find(D.desa, qs("id")) || null;
    var reqKec = qs("kec");
    var kec = reqKec || (cur ? cur.kecamatan : D.kecamatan[0]);

    kecSel.innerHTML = D.kecamatan.map(function (k) {
      return '<option value="' + k + '"' + (k === kec ? ' selected' : '') + '>Kecamatan ' + k + '</option>';
    }).join("");

    function fillDesa() {
      var list = D.desa.filter(function (d) { return d.kecamatan === kecSel.value; });
      if (list.length) {
        desaSel.innerHTML = list.map(function (d) {
          return '<option value="' + d.id + '"' + (cur && cur.id === d.id ? ' selected' : '') + '>Desa ' + d.name + '</option>';
        }).join("");
        if (!cur || cur.kecamatan !== kecSel.value) cur = list[0];
      } else {
        desaSel.innerHTML = '<option value="">Belum ada desa di kecamatan ini</option>';
        cur = null;
      }
      show();
    }

    function show() {
      if (!cur) {
        box.innerHTML = '<div class="card card--pad empty"><h3>Belum Ada Data Desa</h3><p>Data desa untuk kecamatan yang dipilih belum ditambahkan.</p></div>';
        return;
      }
      var d = cur;
      document.title = "Profil Desa " + d.name + " - " + S.shortName;
      if (window.history && history.replaceState) {
        history.replaceState(null, "", "profil-desa.html?id=" + d.id);
      }

      var perangkatHtml = (d.perangkat || []).map(function (p) {
        return '<div class="card" style="padding:18px 16px;text-align:center">' +
          '<div style="width:52px;height:52px;border-radius:50%;background:var(--color-soft);color:var(--color-primary);margin:0 auto 10px;display:grid;place-items:center">' +
            window.icon("users") +
          '</div>' +
          '<h4 style="margin:0 0 4px;font-size:.98rem">' + p[0] + '</h4>' +
          '<span class="meta">' + p[1] + '</span>' +
        '</div>';
      }).join("");

      var potensiHtml = (d.potensi || []).map(function (p) {
        return '<div class="card">' +
          '<div class="card__img"><img src="' + img(p[2]) + '" alt="" loading="lazy"></div>' +
          '<div class="card__body"><h3>' + p[0] + '</h3><p>' + p[1] + '</p></div></div>';
      }).join("");

      box.innerHTML =
        '<div class="profile">' +
          '<div>' +
            '<div class="profile__cover"><img src="' + img(d.image) + '" alt="Dokumentasi Desa ' + d.name + '"></div>' +
            '<span class="chip chip--accent" style="margin-bottom:8px">Kecamatan ' + d.kecamatan + '</span>' +
            '<h1 style="font-size:2.4rem;margin-bottom:8px">Pemerintah Desa ' + d.name + '</h1>' +
            '<div class="meta" style="font-size:.95rem;margin-bottom:18px">' + d.kecamatan + ' · Kabupaten Purworejo, Jawa Tengah</div>' +
            '<p style="font-size:1.06rem;line-height:1.75;color:var(--color-ink)">' + d.deskripsi + '</p>' +
          '</div>' +

          '<div class="side">' +
            '<div class="card kades">' +
              '<img src="' + img("person.svg") + '" alt="Foto ' + d.kades + '">' +
              '<h3>' + d.kades + '</h3>' +
              '<span class="meta">Kepala Desa · Masa Bakti ' + (d.periode || '2022-2028') + '</span>' +
              '<div class="kades__actions">' +
                '<a class="btn btn--wa btn--sm" target="_blank" rel="noopener" href="' + wa('Halo ' + d.kades + ', saya menghubungi dari website paguyuban desa.', d.wa) + '">Hubungi WhatsApp</a>' +
                '<a class="btn btn--outline btn--sm" href="tel:' + (d.phone || '').replace(/[^0-9+]/g, "") + '">Telepon</a>' +
              '</div>' +
            '</div>' +

            '<div class="card" style="padding:24px">' +
              '<h3 style="margin-bottom:12px;font-size:1.1rem">Kantor Balai Desa</h3>' +
              '<p style="margin:0 0 6px">' + (d.alamat || 'Kantor Balai Desa ' + d.name) + '</p>' +
              '<p class="meta" style="margin:0">Kontak: ' + (d.phone || '-') + '</p>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="grid grid--4" style="margin:48px 0">' +
          [[d.penduduk || '-', "Jumlah Penduduk (jiwa)"], [d.luas || '-', "Luas Wilayah"], [d.dusun || '-', "Pembagian Dusun / RW"], [d.jarak || '-', "Jarak ke Ibukota Kab."]].map(function (s) {
            return '<div class="stat"><strong style="font-size:1.7rem">' + s[0] + '</strong><span>' + s[1] + '</span></div>';
          }).join("") +
        '</div>' +

        '<div style="margin-bottom:48px">' +
          '<div class="section-head" style="margin-bottom:20px"><div><span class="eyebrow">Aparatur Pemerintahan</span><h2 style="font-size:1.6rem">Perangkat Desa ' + d.name + '</h2></div></div>' +
          '<div class="grid grid--4">' + perangkatHtml + '</div>' +
        '</div>' +

        '<div style="margin-bottom:48px">' +
          '<div class="section-head" style="margin-bottom:20px"><div><span class="eyebrow">Pemberdayaan Warga</span><h2 style="font-size:1.6rem">Potensi &amp; Produk Unggulan</h2></div></div>' +
          '<div class="grid grid--3">' + potensiHtml + '</div>' +
        '</div>' +

        '<div style="margin-bottom:48px">' +
          '<div class="section-head" style="margin-bottom:20px"><div><span class="eyebrow">Peta &amp; Aksesibilitas</span><h2 style="font-size:1.6rem">Lokasi Desa ' + d.name + '</h2></div></div>' +
          '<div class="map"><iframe title="Peta Lokasi Desa ' + d.name + '" loading="lazy" src="https://maps.google.com/maps?q=' + encodeURIComponent('Desa ' + d.name + ' ' + d.kecamatan + ' Purworejo') + '&output=embed"></iframe></div>' +
        '</div>' +

        '<div style="padding-top:20px;border-top:1px solid var(--color-line);display:flex;gap:14px;flex-wrap:wrap">' +
          '<a class="btn btn--outline" href="organisasi.html#desa">‹ Kembali ke Direktori Desa</a>' +
          '<a class="btn btn--primary" href="kontak.html">Hubungi Paguyuban</a>' +
        '</div>';
    }

    kecSel.addEventListener("change", function () { cur = null; fillDesa(); });
    desaSel.addEventListener("change", function () { cur = find(D.desa, desaSel.value); show(); });
    fillDesa();
  };

  /* ---------- KONTAK ---------- */
  P.kontak = function () {
    $$("[data-wa-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.reportValidity()) return;
        var lines = [form.getAttribute("data-wa-title") || "Pesan dari website", ""];
        $$("input, select, textarea", form).forEach(function (f) {
          if (f.name && f.value) lines.push((f.getAttribute("data-label") || f.name) + ": " + f.value);
        });
        window.open(wa(lines.join("\n")), "_blank", "noopener");
      });
    });
    $$("[data-map]").forEach(function (b) {
      b.innerHTML = '<iframe title="Peta lokasi sekretariat" loading="lazy" src="https://maps.google.com/maps?q=' + encodeURIComponent(S.mapQuery) + '&output=embed"></iframe>';
    });
  };

  if (P[page]) P[page]();
  observe();
})();
