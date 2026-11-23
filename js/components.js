/* =============================================
   KOMPONEN BERSAMA - bar atas, header, footer 
   ============================================= */
(function () {
  var S = window.SITE;
  var page = location.pathname.split("/").pop() || "index.html";
  var parent = page;

  var links = S.nav.map(function (i) {
    return '<li><a href="' + i.href + '"' + (i.href === parent ? ' aria-current="page"' : "") + ">" + i.label + "</a></li>";
  }).join("");

  var topbar =
    '<div class="topbar"><div class="container topbar__in">' +
      '<span class="topbar__addr">' + S.email + " &nbsp;·&nbsp; " + S.phone + " &nbsp;·&nbsp; " + S.address + "</span>" +
      '<span class="topbar__links"><a href="' + S.social.facebook + '">Facebook</a><a href="' + S.social.instagram + '">Instagram</a><a href="' + S.social.youtube + '">YouTube</a><a class="topbar__admin-pill" href="' + S.adminUrl + '">🔐 Login Admin</a></span>' +
    "</div></div>";

  var header =
    '<header class="site-header"><div class="container header__in">' +
      '<a class="brand" href="index.html"><img src="' + S.logo + '" alt="Logo ' + S.shortName + '" width="50" height="50"><span class="brand__text"><strong>' + S.name.toUpperCase() + "</strong><span>" + S.subtitle + "</span></span></a>" +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav" aria-label="Buka menu navigasi"><span></span><span></span><span></span></button>' +
      '<nav class="nav" id="nav" aria-label="Menu utama"><ul>' + links +
        '<li class="nav__cta"><a class="btn btn--primary btn--sm btn--block" href="kontak.html">Kontak Kami</a></li></ul></nav>' +
      '<a class="btn btn--primary btn--sm header__cta" href="kontak.html">Kontak Kami</a>' +
    "</div></header>";

  var footer =
    '<footer class="site-footer"><div class="container">' +
      '<div class="footer__grid">' +
        '<div><a class="brand brand--light" href="index.html"><img src="' + S.logo + '" alt="" width="50" height="50"><span class="brand__text"><strong>' + S.shortName.toUpperCase() + "</strong><span>" + S.subtitle + "</span></span></a>" +
          '<p class="footer__about">Wadah silaturahmi, belajar, dan gotong royong kepala desa dan perangkat desa se-' + S.subtitle + " untuk mewujudkan desa mandiri dan sejahtera.</p>" +
          '<div class="footer__social"><a href="' + S.social.facebook + '" aria-label="Facebook">' + window.icon("facebook") + "</a><a href=\"" + S.social.instagram + '" aria-label="Instagram">' + window.icon("instagram") + "</a><a href=\"" + S.social.youtube + '" aria-label="YouTube">' + window.icon("youtube") + "</a></div></div>" +
        "<div><h4>Menu Utama</h4><ul>" + S.nav.map(function (i) { return '<li><a href="' + i.href + '">' + i.label + "</a></li>"; }).join("") + "</ul></div>" +
        '<div><h4>Akses Cepat</h4><ul><li><a href="organisasi.html#desa">Daftar Desa</a></li><li><a href="organisasi.html#struktur">Struktur Pengurus</a></li><li><a href="kontak.html">Kontak Kami</a></li><li><a href="' + S.adminUrl + '" style="font-weight:700;color:var(--color-accent)">🔐 Portal Admin</a></li></ul></div>' +
        '<div><h4>Sekretariat</h4><ul class="footer__contact">' +
          "<li>" + window.icon("pin") + "<span>" + S.address + "</span></li>" +
          "<li>" + window.icon("clock") + "<span>" + S.hours + "</span></li>" +
          "<li>" + window.icon("phone") + "<span>" + S.phone + "</span></li>" +
          "<li>" + window.icon("mail") + "<span>" + S.email + "</span></li></ul></div>" +
      "</div>" +
      '<div class="footer__bottom"><span>&copy; ' + S.year + " " + S.name + " (" + S.shortName + ") " + S.subtitle + ". Hak Cipta Dilindungi.</span><span><a href=\"admin.html\" style=\"color:#e2d9f1\">Kelola Website</a></span></div>" +
    "</div></footer>" +
    '<a class="fab fab--wa" href="https://wa.me/' + S.whatsapp + '" aria-label="Chat WhatsApp Sekretariat" target="_blank" rel="noopener">' + window.icon("chat") + "</a>" +
    '<button class="fab fab--top" type="button" aria-label="Kembali ke atas">' + window.icon("up") + "</button>";

  var t = document.getElementById("site-topbar"), h = document.getElementById("site-header"), f = document.getElementById("site-footer");
  if (t) t.innerHTML = topbar;
  if (h) h.innerHTML = header;
  if (f) f.innerHTML = footer;
})();
