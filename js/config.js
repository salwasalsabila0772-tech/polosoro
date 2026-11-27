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
      { label: "Layanan", href: "index.html#layanan" },
      { label: "Berita", href: "berita.html" },
      { label: "Album", href: "album.html" },
      { label: "Agenda", href: "agenda.html" },
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

  // Tambahkan menu layanan dan peta pada konfigurasi lama yang sudah tersimpan.
  [
    { label: "Layanan", href: "index.html#layanan" },
    { label: "Peta", href: "kontak.html#peta" }
  ].forEach(function (item) {
    var exists = defaultConfig.nav.some(function (link) {
      return (link.label || "").toLowerCase() === item.label.toLowerCase();
    });
    if (!exists) defaultConfig.nav.push(item);
  });

  window.SITE = defaultConfig;
})();
