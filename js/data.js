/* ==========================================================
   DATA KONTEN - PKD Polosoro Purworejo
   Mendukung penyimpanan perubahan lokal via Panel Admin.
   ========================================================== */
(function () {
  function photos(base, n, captionBase) {
    var imgs = ["kegiatan.svg", "rapat.svg", "pelatihan.svg", "desa.svg", "upacara.svg", "sawah.svg"], out = [];
    for (var i = 0; i < n; i++) out.push({ src: imgs[(base + i) % imgs.length], caption: captionBase + " (" + (i + 1) + ")" });
    return out;
  }
  var lorem = [
    "Kegiatan ini diikuti oleh kepala desa dan perangkat desa dari berbagai kecamatan. Para peserta membahas langkah bersama untuk memperkuat pelayanan kepada masyarakat.",
    "Ketua paguyuban menyampaikan pentingnya kekompakan antardesa dalam menjalankan program pembangunan, terutama pengelolaan dana desa yang transparan dan tepat sasaran.",
    "Di akhir acara, peserta sepakat menindaklanjuti hasil pertemuan melalui koordinasi rutin dan pertukaran praktik baik antardesa. Informasi lanjutan akan disampaikan lewat kanal resmi paguyuban."
  ];

  var defaultData = {
    stats: [
      { value: "125", label: "Desa anggota" },
      { value: "16", label: "Kecamatan" },
      { value: "2015", label: "Tahun berdiri" },
      { value: "24", label: "Kegiatan per tahun" }
    ],

    sambutan: {
      name: "Bapak Dwinanto, S.E.",
      role: "Ketua Paguyuban Kepala Desa dan Perangkat Desa Polosoro",
      image: "person.svg",
      quote: "Bersama, kita kuatkan desa untuk melayani warga dengan sepenuh hati.",
      text: "Paguyuban ini hadir sebagai wadah silaturahmi, belajar, dan bergotong royong antarpemerintah desa se-Kabupaten Purworejo. Mari kita jaga kekompakan demi kemajuan desa dan kesejahteraan masyarakat."
    },

    programs: [
      { title: "Penguatan Kapasitas", text: "Pelatihan tata kelola pemerintahan dan dana desa bagi kepala desa dan perangkat.", icon: "book" },
      { title: "Silaturahmi dan Koordinasi", text: "Rapat rutin lintas kecamatan untuk menyamakan langkah dan berbagi praktik baik.", icon: "users" },
      { title: "Pembangunan Desa", text: "Pendampingan perencanaan pembangunan dan pemanfaatan potensi lokal.", icon: "building" },
      { title: "Kepedulian Sosial", text: "Aksi bersama untuk warga yang membutuhkan, termasuk tanggap bencana.", icon: "heart" }
    ],

    sejarah: [
      { year: "2015", text: "Paguyuban didirikan oleh para kepala desa se-Kabupaten Purworejo sebagai forum silaturahmi dan advokasi." },
      { year: "2017", text: "AD/ART disahkan dan struktur pengurus dibentuk hingga tingkat kecamatan se-Purworejo." },
      { year: "2021", text: "Perangkat desa resmi bergabung memperkuat soliditas tata kelola pemerintahan desa." },
      { year: "2024", text: "Program bimtek keuangan, digitalisasi pelayanan, dan agenda tahunan terlaksana rutin." }
    ],
    visi: "Mewujudkan pemerintah desa yang kompak, profesional, dan melayani se-Kabupaten Purworejo.",
    misi: [
      "Mempererat silaturahmi dan kebersamaan antarkepala desa dan perangkat desa se-Kabupaten Purworejo.",
      "Meningkatkan kapasitas dan profesionalisme penyelenggara pemerintahan desa dalam pelayanan publik.",
      "Menjadi mitra strategis pemerintah daerah dalam menyukseskan program pembangunan daerah dan nasional.",
      "Memperjuangkan kepentingan, perlindungan hukum, dan kesejahteraan aparatur pemerintah desa."
    ],
    docs: [
      { title: "AD/ART Paguyuban Polosoro", ext: "PDF", size: "1,2 MB", year: "2017", url: "#" },
      { title: "SK Kepengurusan Periode Berjalan", ext: "PDF", size: "0,8 MB", year: "2024", url: "#" },
      { title: "Formulir Pembaruan Data Desa & Perangkat", ext: "DOC", size: "0,3 MB", year: "2025", url: "#" }
    ],

    pengurus: [
      { key: "ketua", name: "Dwinanto, S.E.", role: "Ketua Umum", image: "person.svg" },
      { key: "wakil", name: "Hartono", role: "Wakil Ketua Umum", image: "person.svg" },
      { key: "sekretaris", name: "Slamet Riyadi", role: "Sekretaris Jenderal", image: "person.svg" },
      { key: "bendahara", name: "Sri Wahyuni", role: "Bendahara Umum", image: "person.svg" },
      { key: "koord", name: "Agus Prasetyo", role: "Koordinator Antar Wilayah", image: "person.svg" },
      { key: "b1", name: "Mulyono", role: "Bidang Tata Pemerintahan", image: "person.svg" },
      { key: "b2", name: "Dwi Lestari", role: "Bidang Pembangunan & Infrastruktur", image: "person.svg" },
      { key: "b3", name: "Bambang Riyanto", role: "Bidang Pemberdayaan Masyarakat", image: "person.svg" },
      { key: "b4", name: "Siti Aminah", role: "Bidang Humas & Publikasi", image: "person.svg" }
    ],

    news: [
      {
        id: "rakor-bulanan", title: "Rapat Koordinasi Bulanan Bahas Penyaluran Dana Desa 2026", category: "Kegiatan", date: "2026-11-05", author: "Humas Polosoro", image: "rapat.svg", popular: true,
        excerpt: "Kepala desa se-Kabupaten Purworejo berkumpul membahas percepatan penyaluran dan pelaporan dana desa secara transparan.", body: lorem
      },
      {
        id: "bimtek-keuangan", title: "Bimtek Pengelolaan Keuangan Desa Diikuti Ratusan Peserta", category: "Pelatihan", date: "2026-10-22", author: "Humas Polosoro", image: "pelatihan.svg", popular: true,
        excerpt: "Pelatihan dua hari menghadirkan narasumber dari dinas terkait dan praktisi tata kelola keuangan desa.", body: lorem
      },
      {
        id: "surat-edaran-apbdes", title: "Surat Edaran: Penyusunan APBDes Tahun Anggaran Berikutnya", category: "Pengumuman", date: "2026-10-15", author: "Sekretariat", image: "kegiatan.svg",
        excerpt: "Seluruh desa anggota diminta menyiapkan dokumen perencanaan dan musrenbangdes sesuai jadwal resmi.", body: lorem
      },
      {
        id: "kebijakan-bupati", title: "Penjelasan Kebijakan Baru Pemerintah Daerah untuk Desa", category: "Kebijakan", date: "2026-09-30", author: "Humas Polosoro", image: "upacara.svg", popular: true,
        excerpt: "Ringkasan kebijakan pemda terbaru dan dampaknya bagi tata kelola aparatur desa se-Kabupaten Purworejo.", body: lorem
      },
      {
        id: "desa-wisata", title: "Desa Sukamaju Kembangkan Wisata Sawah Berbasis Pemberdayaan Warga", category: "Profil Desa", date: "2026-09-12", author: "Redaksi Polosoro", image: "sawah.svg",
        excerpt: "Pengelolaan spot wisata keluarga oleh BUMDes membuka lapangan kerja dan meningkatkan PADes.", body: lorem
      },
      {
        id: "peringatan-hut", title: "Peringatan Hari Besar Nasional Digelar Bersama Perangkat Desa", category: "Kegiatan", date: "2026-08-17", author: "Humas Polosoro", image: "upacara.svg",
        excerpt: "Upacara bersama dan bakti sosial melayani warga desa di seluruh perwakilan kecamatan se-Purworejo.", body: lorem
      },
      {
        id: "pengumuman-data", title: "Pembaruan Data Desa Anggota Dibuka Hingga Akhir Bulan", category: "Pengumuman", date: "2026-08-03", author: "Sekretariat", image: "desa.svg",
        excerpt: "Pemerintah desa diminta memperbarui susunan kepala desa, perangkat, dan kontak melalui portal terpadu.", body: lorem
      }
    ],

    albums: [
      { id: "rakor-2026", title: "Rapat Koordinasi Bulanan", category: "Rapat", date: "2026-11-05", place: "Aula Sekretariat Paguyuban", cover: "rapat.svg", photos: photos(1, 9, "Rapat koordinasi") },
      { id: "bimtek-2026", title: "Bimtek Keuangan & Siskeudes", category: "Pelatihan", date: "2026-10-22", place: "Gedung Pertemuan Pemda", cover: "pelatihan.svg", photos: photos(2, 8, "Bimtek Keuangan") },
      { id: "kunjungan-2026", title: "Kunjungan Kerja ke Desa Anggota", category: "Kunjungan", date: "2026-09-12", place: "Desa Sukamaju", cover: "sawah.svg", photos: photos(5, 7, "Kunjungan kerja") },
      { id: "hut-2026", title: "Peringatan Hari Besar Nasional", category: "Acara Resmi", date: "2026-08-17", place: "Alun-alun Purworejo", cover: "upacara.svg", photos: photos(4, 8, "Peringatan HUT") },
      { id: "rakor-2025", title: "Rapat Kerja Tahunan Pengurus", category: "Rapat", date: "2025-12-14", place: "Aula Sekretariat", cover: "kegiatan.svg", photos: photos(0, 6, "Rapat tahunan") },
      { id: "kunjungan-2025", title: "Studi Banding Pengelolaan BUMDes", category: "Kunjungan", date: "2025-06-20", place: "Desa Percontohan Nasional", cover: "desa.svg", photos: photos(3, 7, "Studi banding") }
    ],

    agenda: [
      {
        id: "rakor-desember", title: "Rapat Koordinasi Akhir Tahun", type: "Rapat", date: "2026-12-03", time: "09.00 WIB", place: "Aula Sekretariat Polosoro", image: "rapat.svg", peserta: "Seluruh kepala desa dan pengurus",
        desc: "Pembahasan evaluasi program kerja tahun 2026 serta penyusunan kalender kegiatan paguyuban tahun 2027."
      },
      {
        id: "bimtek-dana", title: "Bimtek Pertanggungjawaban Dana Desa", type: "Pelatihan", date: "2026-12-11", time: "08.30 WIB", place: "Gedung Pertemuan Purworejo", image: "pelatihan.svg", peserta: "Kepala desa dan kaur keuangan desa",
        desc: "Pelatihan teknis penyusunan SPJ dan pelaporan keuangan berbasis aplikasi pengawasan terkini."
      },
      {
        id: "kunjungan-desa", title: "Kunjungan Kerja & Monitoring Potensi", type: "Kunjungan", date: "2026-12-20", time: "10.00 WIB", place: "Desa Sukamaju", image: "sawah.svg", peserta: "Pengurus paguyuban & tim pendamping",
        desc: "Peninjauan langsung pengembangan wisata sawah BUMDes dan forum diskusi warga tani."
      },
      {
        id: "silaturahmi-tahunan", title: "Silaturahmi Akhir Tahun & Refleksi", type: "Acara Resmi", date: "2026-12-28", time: "19.00 WIB", place: "Pendopo Kabupaten Purworejo", image: "kegiatan.svg", peserta: "Seluruh anggota paguyuban dan tamu undangan",
        desc: "Malam kebersamaan, apresiasi aparatur desa teladan, dan ramah tamah bersama jajaran Forkopimda."
      },
      {
        id: "rakor-januari", title: "Rapat Koordinasi Awal Tahun 2027", type: "Rapat", date: "2027-01-07", time: "09.00 WIB", place: "Aula Sekretariat Polosoro", image: "rapat.svg", peserta: "Seluruh kepala desa se-Purworejo",
        desc: "Sosialisasi arah kebijakan daerah tahun anggaran baru dan sinkronisasi program kerja paguyuban."
      },
      {
        id: "pelatihan-digital", title: "Workshop Digitalisasi Layanan Surat Desa", type: "Pelatihan", date: "2027-01-19", time: "08.30 WIB", place: "Lab Komputer Pemda", image: "pelatihan.svg", peserta: "Sekretaris desa & operator layanan",
        desc: "Pelatihan implementasi platform surat online mandiri dan tanda tangan elektronik warga."
      }
    ],

    kecamatan: [
      "Purworejo", "Banyuurip", "Kutoarjo", "Bayur", "Loano", "Bener", "Gebang", "Pituruh",
      "Kemiri", "Bruno", "Bagelen", "Kaligesing", "Purwodadi", "Ngombol", "Grabag", "Butuh"
    ],

    desa: [
      {
        id: "sukamaju", name: "Sukamaju", kecamatan: "Purworejo", kades: "Bapak Widodo", periode: "2022 - 2028", image: "sawah.svg",
        penduduk: "4.250", luas: "8,2 km²", dusun: "5 dusun / 12 RW", jarak: "14 km", alamat: "Jl. Raya Sukamaju No. 10", phone: "0812-1111-0001", wa: "6281211110001",
        deskripsi: "Desa agraris dengan hamparan sawah yang subur dan kelompok tani aktif. Berhasil mengembangkan wisata edukasi sawah berbasis warga desa.",
        perangkat: [["Rudi Hartanto", "Sekretaris Desa"], ["Wati", "Kaur Keuangan"], ["Joko", "Kasi Pemerintahan"], ["Ani", "Kasi Pelayanan"]],
        potensi: [["Pertanian padi organik", "Panen dua kali setahun dengan sistem irigasi teknis.", "sawah.svg"], ["Wisata edukasi sawah", "Jalur trekking dan gazebo keluarga dikelola BUMDes.", "desa.svg"], ["UMKM olahan beras", "Kelompok wanita tani memproduksi aneka snack beras.", "pelatihan.svg"]]
      },
      {
        id: "tirtomulyo", name: "Tirtomulyo", kecamatan: "Banyuurip", kades: "Ibu Sulastri", periode: "2021 - 2027", image: "desa.svg",
        penduduk: "3.180", luas: "6,5 km²", dusun: "4 dusun / 9 RW", jarak: "8 km", alamat: "Jl. Tirta No. 3", phone: "0812-1111-0002", wa: "6281211110002",
        deskripsi: "Desa dengan sumber mata air alami yang melimpah dan sentra kerajinan anyaman bambu dengan kualitas ekspor.",
        perangkat: [["Heru", "Sekretaris Desa"], ["Lina", "Kaur Keuangan"], ["Bagus", "Kasi Pemerintahan"], ["Rina", "Kasi Pelayanan"]],
        potensi: [["Air bersih mandiri", "Penyediaan air minum desa dikelola BUMDes secara profesional.", "desa.svg"], ["Sentra anyaman bambu", "Produk home decor dipasarkan ke berbagai kota besar.", "pelatihan.svg"], ["Budidaya ikan air tawar", "Kolam terpal dan perikanan air tawar kelompok pemuda.", "sawah.svg"]]
      },
      {
        id: "banjarsari", name: "Banjarsari", kecamatan: "Kutoarjo", kades: "Bapak Mulyadi", periode: "2022 - 2028", image: "kegiatan.svg",
        penduduk: "5.020", luas: "9,8 km²", dusun: "6 dusun / 14 RW", jarak: "12 km", alamat: "Jl. Banjar No. 7", phone: "0812-1111-0003", wa: "6281211110003",
        deskripsi: "Kawasan desa penyangga dengan aktivitas perdagangan ramai, fasilitas gelanggang olahraga aktif, dan pasar mingguan desa.",
        perangkat: [["Tono", "Sekretaris Desa"], ["Yuni", "Kaur Keuangan"], ["Edi", "Kasi Pemerintahan"], ["Nita", "Kasi Pelayanan"]],
        potensi: [["Pasar desa mandiri", "Ratusan lapak pedagang lokal menggulirkan roda ekonomi desa.", "kegiatan.svg"], ["Peternakan terpadu", "Kelompok ternak kambing peranakan etawa dan sapi potong.", "sawah.svg"], ["Pusat kegiatan pemuda", "Turnamen voli antardesa rutin dan sanggar seni budaya.", "upacara.svg"]]
      },
      {
        id: "karangsari", name: "Karangsari", kecamatan: "Loano", kades: "Bapak Supardi", periode: "2020 - 2026", image: "upacara.svg",
        penduduk: "2.760", luas: "5,1 km²", dusun: "3 dusun / 8 RW", jarak: "16 km", alamat: "Jl. Karang No. 2", phone: "0812-1111-0004", wa: "6281211110004",
        deskripsi: "Desa asri di lereng bukit dengan adat istiadat dan gotong royong yang sangat kental, serta perkebunan buah tropis melimpah.",
        perangkat: [["Slamet", "Sekretaris Desa"], ["Dewi", "Kaur Keuangan"], ["Anton", "Kasi Pemerintahan"], ["Maya", "Kasi Pelayanan"]],
        potensi: [["Seni karawitan & tari", "Kelompok seni tradisional binaan desa meraih penghargaan.", "upacara.svg"], ["Perkebunan durian & duku", "Sentra buah musiman yang diminati wisatawan kuliner.", "sawah.svg"], ["Keripik buah lokal", "Industri rumahan makanan ringan khas lereng bukit.", "pelatihan.svg"]]
      },
      {
        id: "mekarjaya", name: "Mekarjaya", kecamatan: "Kemiri", kades: "Ibu Rahayu", periode: "2023 - 2029", image: "pelatihan.svg",
        penduduk: "3.900", luas: "7,0 km²", dusun: "5 dusun / 10 RW", jarak: "22 km", alamat: "Jl. Mekar No. 5", phone: "0812-1111-0005", wa: "6281211110005",
        deskripsi: "Desa percontohan digital dengan sistem informasi desa (SID) mandiri, perizinan cepat, dan kebun bibit tanaman buah.",
        perangkat: [["Hadi", "Sekretaris Desa"], ["Sari", "Kaur Keuangan"], ["Dani", "Kasi Pemerintahan"], ["Eka", "Kasi Pelayanan"]],
        potensi: [["Pelayanan digital desa", "Surat pengantar selesai dalam hitungan menit via WhatsApp bot.", "pelatihan.svg"], ["Sentra pembibitan tanaman", "Pusat bibit buah unggul melayani pembeli luar pulau.", "sawah.svg"], ["Koperasi simpan pinjam desa", "Permodalan bergulir bagi pengusaha mikro dan petani.", "rapat.svg"]]
      },
      {
        id: "wonoharjo", name: "Wonoharjo", kecamatan: "Kaligesing", kades: "Bapak Prayitno", periode: "2021 - 2027", image: "rapat.svg",
        penduduk: "4.610", luas: "10,4 km²", dusun: "6 dusun / 13 RW", jarak: "26 km", alamat: "Jl. Wono No. 9", phone: "0812-1111-0006", wa: "6281211110006",
        deskripsi: "Kawasan perbukitan menoreh yang sejuk, terkenal dengan kambing ras Kaligesing, kebun kopi robusta, dan spot panorama alam.",
        perangkat: [["Narto", "Sekretaris Desa"], ["Tini", "Kaur Keuangan"], ["Roni", "Kasi Pemerintahan"], ["Sinta", "Kasi Pelayanan"]],
        potensi: [["Kambing ras unggul", "Pusat penangkaran kambing etawa bersertifikat nasional.", "desa.svg"], ["Kopi robusta & gula aren", "Kopi petik merah khas pegunungan dan gula kelapa organik.", "sawah.svg"], ["Wisata curug & panorama", "Jalur trekking dan gardu pandang menoreh yang memukau.", "kegiatan.svg"]]
      },
      {
        id: "sumberrejo", name: "Sumberrejo", kecamatan: "Purwodadi", kades: "Bapak Subekti", periode: "2022 - 2028", image: "desa.svg",
        penduduk: "3.450", luas: "6,8 km²", dusun: "4 dusun / 10 RW", jarak: "18 km", alamat: "Jl. Pantai Selatan No. 12", phone: "0812-1111-0007", wa: "6281211110007",
        deskripsi: "Desa pesisir di koridor jalur lintas selatan dengan potensi tambak udang vaname dan sentra kelapa sayur.",
        perangkat: [["Anwar", "Sekretaris Desa"], ["Yanti", "Kaur Keuangan"], ["Budi", "Kasi Pemerintahan"], ["Fajar", "Kasi Pelayanan"]],
        potensi: [["Tambak udang vaname", "Budi daya udang modern dengan kemitraan pemuda desa.", "sawah.svg"], ["Kelapa butir & kopra", "Pasokan kelapa segar untuk kebutuhan pasar Jawa Tengah.", "desa.svg"], ["Kuliner seafood pesisir", "Resto apung tepi muara yang ramai saat akhir pekan.", "pelatihan.svg"]]
      },
      {
        id: "candisari", name: "Candisari", kecamatan: "Bener", kades: "Ibu Marwiyah", periode: "2021 - 2027", image: "upacara.svg",
        penduduk: "2.980", luas: "5,4 km²", dusun: "3 dusun / 7 RW", jarak: "15 km", alamat: "Jl. Candi No. 4", phone: "0812-1111-0008", wa: "6281211110008",
        deskripsi: "Desa dengan peninggalan situs cagar budaya bersejarah, kerajinan pahat batu, dan pesawahan terasering indah.",
        perangkat: [["Aris", "Sekretaris Desa"], ["Ratna", "Kaur Keuangan"], ["Triyono", "Kasi Pemerintahan"], ["Kurnia", "Kasi Pelayanan"]],
        potensi: [["Cagar budaya desa", "Kawasan wisata edukasi sejarah ramah keluarga.", "upacara.svg"], ["Pahat batu & ukir", "Produk seni batu candi dipesan hingga luar daerah.", "pelatihan.svg"], ["Terasering sawah organik", "Padi lokal berkualitas tinggi bebas pestisida kimia.", "sawah.svg"]]
      }
    ]
  };

  // Cek apakah ada data tersimpan di localStorage dari panel admin
  try {
    var stored = localStorage.getItem("polosoro_site_data");
    if (stored) {
      var parsed = JSON.parse(stored);
      for (var key in parsed) {
        if (Object.prototype.hasOwnProperty.call(parsed, key)) {
          defaultData[key] = parsed[key];
        }
      }
    }
  } catch (err) {
    console.warn("Gagal membaca data dari localStorage:", err);
  }

  window.DATA = defaultData;

  // Fungsi pembantu untuk admin mengelola data
  window.saveSiteData = function (newData) {
    try {
      localStorage.setItem("polosoro_site_data", JSON.stringify(newData));
      window.DATA = newData;
      return true;
    } catch (e) {
      console.error("Gagal menyimpan data:", e);
      return false;
    }
  };

  window.getSiteData = function () {
    return window.DATA;
  };

  window.resetSiteData = function () {
    try {
      localStorage.removeItem("polosoro_site_data");
      localStorage.removeItem("polosoro_site_config");
      location.reload();
      return true;
    } catch (e) {
      console.error("Gagal mereset data:", e);
      return false;
    }
  };
})();
