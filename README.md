# Website Paguyuban Kepala Desa & Perangkat Desa - Kab. Purworejo (Polosoro)

Website resmi Paguyuban Kepala Desa & Perangkat Desa Kabupaten Purworejo berbasis HTML5, CSS3, dan JavaScript murni yang dilengkapi dengan **Panel Admin Interaktif** (tanpa perlu setup database rumit).

---

## 🚀 Cara Menjalankan di Browser / Localhost

1. **Cara Langsung (Tanpa Server):**
   - Buka File Explorer ke folder proyek ini.
   - Klik ganda (double-click) file `index.html`.

2. **Cara Localhost via Python (Rekomendasi):**
   - Buka Terminal di folder proyek ini.
   - Ketik:
     ```bash
     python -m http.server 8000
     ```
   - Buka browser dan buka alamat: `http://localhost:8000`

---

## 🔐 Panel Admin Pengelolaan Data (`admin.html`)
Website ini sudah dilengkapi sistem manajemen admin mandiri. Klik menu **"🔐 Login Admin"** di bilah atas (topbar) atau footer website.

- **URL Admin:** `admin.html`
- **Username Default:** `admin`
- **Password Default:** `polosoro123` *(dapat diubah langsung dari menu Pengaturan Admin)*

### Fitur Pengelolaan yang Tersedia di Panel Admin:
1. **Dashboard:** Statistik ringkas jumlah berita, agenda, album, dan desa.
2. **Kelola Berita:** Tambah, edit, dan hapus artikel / berita kegiatan paguyuban.
3. **Kelola Agenda:** Tambah, edit, dan hapus jadwal rapat, bimtek, serta pertemuan.
4. **Kelola Galeri Foto:** Tambah, edit, dan hapus album dokumentasi kegiatan.
5. **Kelola Data Desa:** Tambah, edit, dan hapus profil desa, kepala desa, dan kontak balai desa se-Purworejo.
6. **Struktur Pengurus:** Ubah nama dan jabatan susunan pengurus paguyuban.
7. **Pengaturan Website:** Ubah kontak WhatsApp, telepon, email, alamat kantor sekretariat, jam pelayanan, dan ganti kata sandi admin.
8. **Backup & Restore JSON:** Unduh seluruh data terbaru sebagai file `.json` atau unggah kembali untuk pemulihan.

> **Catatan Sinkronisasi:** Seluruh perubahan yang dibuat admin tersimpan otomatis di `localStorage` peramban Anda, sehingga setiap perubahan data langsung tampil secara live di halaman publik (`index.html`, `berita.html`, `agenda.html`, `album.html`, `organisasi.html`, `profil-desa.html`).

---

## 📁 Struktur File & Folder
- `index.html` — Halaman Beranda (Hero eksekutif bersih, sambutan, berita, agenda, galeri, dan direktori desa terpadu).
- `organisasi.html` — Profil organisasi, sejarah, visi-misi, bagan struktur pimpinan, dan tabel daftar desa anggota.
- `profil-desa.html` — Direktori detail profil desa, kepala desa, perangkat desa, potensi, dan peta lokasi balai desa.
- `berita.html` — Kabar dan pengumuman (daftar berita dan tampilan artikel detail).
- `agenda.html` — Jadwal kegiatan terpadu dengan kalender interaktif dan integrasi Google Calendar.
- `album.html` — Galeri dokumentasi foto dengan fitur popup Lightbox.
- `kontak.html` — Informasi sekretariat, formulir pesan cepat WhatsApp, dan peta Google Maps.
- `admin.html` — Panel Administrasi pengelolaan seluruh konten website.
- `css/variables.css` — Tempat konfigurasi variabel warna utama (dominan ungu & kuning emas), font, dan radius tema.
- `css/base.css`, `components.css`, `pages.css` — Tata letak responsif, kartu rapi berpadding nyaman, dan tabel modern.
- `js/config.js` — Konfigurasi dasar organisasi (nama, kontak, tautan sosial media).
- `js/data.js` — Data utama konten website (berita, agenda, album, desa, pengurus) dengan sinkronisasi penyimpanan lokal.
- `js/components.js` — Generator elemen bersama (topbar, navbar, footer).
- `js/icons.js` — Kumpulan ikon SVG modern.
- `js/main.js` — Logika interaktif dan perenderan data publik.
