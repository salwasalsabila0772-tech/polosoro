/* ==========================================================
   KONFIGURASI ORGANISASI - PKD Polosoro Purworejo
   Mendukung penyimpanan perubahan lokal via Panel Admin.
   ========================================================== */
(function () {
  var defaultConfig = {
    name: "Paguyuban Kepala Desa dan Perangkat Desa",
    shortName: "PKD Polosoro",
    subtitle: "Kabupaten Purworejo",
    logo: "assets/img/logo.jpg",

    whatsapp: "6281234567890",              // format internasional, tanpa + atau 0 di depan
    phone: "0812-3456-7890",
    email: "sekretariat@polosoro.example",
    address: "Jl. Contoh No. 1, Purworejo, Jawa Tengah",
    hours: "Senin - Jumat, 08.00 - 15.00 WIB",
    mapQuery: "Purworejo, Jawa Tengah",     // kata kunci lokasi untuk peta

    year: new Date().getFullYear(),
    social: { facebook: "#", instagram: "#", youtube: "#" },
    adminUrl: "admin.html",                 // tautan Login Admin (aktif)
    heroImage: "",                          // foto utama hero beranda (jika diupload admin)

    nav: [
      { label: "Beranda", href: "index.html" },
      { label: "Organisasi", href: "organisasi.html" },
      {
        label: "Layanan & Agenda",
        items: [
          { label: "Layanan", href: "index.html#layanan" },
          { label: "Agenda", href: "agenda.html" }
        ]
      },
      { label: "Berita", href: "berita.html" },
      { label: "Album", href: "album.html" },
      { label: "Peta", href: "kontak.html#peta" }
    ]
  };

  try {
    var stored = localStorage.getItem("polosoro_site_config");
    if (stored) {
      var parsed = JSON.parse(stored);
      for (var k in parsed) {
        if (Object.prototype.hasOwnProperty.call(parsed, k)) {
          defaultConfig[k] = parsed[k];
        }
      }
    }
  } catch (e) {
    console.warn("Gagal memuat konfigurasi dari localStorage:", e);
  }

  // Satukan menu Layanan dan Agenda pada konfigurasi lama yang tersimpan.
  var layananAgenda = {
    label: "Layanan & Agenda",
    items: [
      { label: "Layanan", href: "index.html#layanan" },
      { label: "Agenda", href: "agenda.html" }
    ]
  };
  defaultConfig.nav = (defaultConfig.nav || []).filter(function (link) {
    var label = (link.label || "").toLowerCase();
    return label !== "layanan" && label !== "agenda" && label !== "layanan & agenda";
  });
  var orgIndex = defaultConfig.nav.findIndex(function (link) { return link.href === "organisasi.html"; });
  defaultConfig.nav.splice(orgIndex < 0 ? defaultConfig.nav.length : orgIndex + 1, 0, layananAgenda);
  if (!defaultConfig.nav.some(function (link) { return (link.label || "").toLowerCase() === "peta"; })) {
    defaultConfig.nav.push({ label: "Peta", href: "kontak.html#peta" });
  }

  window.SITE = defaultConfig;
})();
