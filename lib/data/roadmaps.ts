export type RoadmapLevel = {
  category: string;
  leftBranch?: string[];
  rightBranch?: string[];
  downBranch?: string[];
};

export type RoadmapData = {
  title: string;
  levels: RoadmapLevel[];
};

export const roadmaps: Record<string, RoadmapData> = {
  // RPL
  "Web Developer": {
    title: "Web Developer",
    levels: [
      {
        category: "Pengenalan Dasar",
        leftBranch: ["Dasar Komputer", "Sistem Operasi"],
        rightBranch: ["Dasar Internet", "Cara Kerja Web", "HTTP / HTTPS"],
        downBranch: ["Dasar Pemrograman"]
      },
      {
        category: "Front-End Dasar",
        leftBranch: ["HTML Basic", "Semantic HTML", "Forms & Validation"],
        rightBranch: ["CSS Basic", "Flexbox & Grid", "Animasi CSS"],
        downBranch: ["JavaScript Basic", "DOM Manipulation", "ES6+ Features"]
      },
      {
        category: "Alat & Version Control",
        leftBranch: ["Git Dasar", "Branching & Merging"],
        rightBranch: ["GitHub / GitLab", "Pull Requests"],
        downBranch: ["Command Line (CLI)", "Package Manager (NPM/Yarn)"]
      },
      {
        category: "Front-End Lanjutan",
        leftBranch: ["Desain Responsif", "Mobile-First Approach"],
        rightBranch: ["CSS Framework", "Tailwind CSS", "Bootstrap"],
        downBranch: ["JavaScript Framework", "React.js / Vue.js", "State Management"]
      },
      {
        category: "Pengembangan Back-End",
        leftBranch: ["Bahasa Server", "Node.js / PHP / Python"],
        rightBranch: ["Database Relasional", "MySQL / PostgreSQL"],
        downBranch: ["RESTful API", "JSON", "Postman / Thunder Client"]
      },
      {
        category: "Back-End Lanjutan",
        leftBranch: ["NoSQL Database", "MongoDB"],
        rightBranch: ["Web Security", "CORS & Helmet", "Data Encryption"],
        downBranch: ["Autentikasi (Auth)", "JWT (JSON Web Token)", "OAuth & Session"]
      },
      {
        category: "Deployment & Testing",
        leftBranch: ["Hosting", "Vercel / Netlify", "VPS / Linux"],
        rightBranch: ["Testing", "Unit Testing", "Integration Testing"],
        downBranch: ["CI/CD Pipeline", "GitHub Actions"]
      },
      {
        category: "Persiapan Karir",
        leftBranch: ["Pembuatan Portofolio", "Resume / CV"],
        rightBranch: ["Soft Skills", "Komunikasi Tim", "Problem Solving"],
        downBranch: ["Persiapan Wawancara", "Freelance / Full-Time"]
      }
    ]
  },

  // TKJ
  "Network Engineer": {
    title: "Network Engineer",
    levels: [
      {
        category: "Dasar Jaringan",
        leftBranch: ["Pengenalan Jaringan", "Topologi", "Media Transmisi"],
        rightBranch: ["OSI Model", "TCP/IP Suite", "IP Addressing"],
        downBranch: ["Subnetting & VLSM"]
      },
      {
        category: "Perangkat Jaringan",
        leftBranch: ["Router & Switch", "Access Point"],
        rightBranch: ["Firewall", "Load Balancer"],
        downBranch: ["Instalasi Kabel UTP & Fiber Optic"]
      },
      {
        category: "Routing & Switching",
        leftBranch: ["Static Routing", "Dynamic Routing (OSPF)"],
        rightBranch: ["VLAN", "Spanning Tree Protocol", "Trunking"],
        downBranch: ["Konfigurasi Cisco / MikroTik"]
      },
      {
        category: "Server & OS",
        leftBranch: ["Linux Basic", "Windows Server"],
        rightBranch: ["Web Server (Apache/Nginx)", "DNS Server"],
        downBranch: ["DHCP & FTP Server"]
      },
      {
        category: "Keamanan Jaringan",
        leftBranch: ["Dasar Keamanan", "VPN & IPsec"],
        rightBranch: ["Intrusion Detection", "Access Control List"],
        downBranch: ["Network Monitoring (Wireshark/Zabbix)"]
      },
      {
        category: "Jaringan Skala Besar",
        leftBranch: ["BGP", "WAN Technologies"],
        rightBranch: ["High Availability", "Failover"],
        downBranch: ["Network Automation (Python)"]
      },
      {
        category: "Sertifikasi Industri",
        leftBranch: ["CCNA", "MTCNA", "CompTIA Network+"],
        rightBranch: ["Ujian Simulasi", "Lab Praktik"],
        downBranch: ["Proyek Infrastruktur Jaringan"]
      },
      {
        category: "Kesiapan Karir",
        leftBranch: ["Troubleshooting Lanjut", "Manajemen Proyek"],
        rightBranch: ["Komunikasi Teknis", "Pembuatan Dokumentasi"],
        downBranch: ["Persiapan Interview IT"]
      }
    ]
  },

  // DKV
  "UI/UX Designer": {
    title: "UI/UX Designer",
    levels: [
      {
        category: "Dasar Desain",
        leftBranch: ["Prinsip Desain", "Teori Warna", "Tipografi"],
        rightBranch: ["Grid & Layout", "Visual Hierarchy"],
        downBranch: ["Software Desain (Figma / Adobe XD)"]
      },
      {
        category: "UX Fundamentals",
        leftBranch: ["Design Thinking", "User Empathy"],
        rightBranch: ["User Persona", "User Journey Map"],
        downBranch: ["Wireframing (Low-fidelity)"]
      },
      {
        category: "UI Design",
        leftBranch: ["Komponen UI", "Iconography"],
        rightBranch: ["Design System", "Style Guide"],
        downBranch: ["Prototyping & Micro-interactions"]
      },
      {
        category: "Riset & Analisis",
        leftBranch: ["User Research", "A/B Testing"],
        rightBranch: ["Competitor Analysis", "Information Architecture"],
        downBranch: ["Usability Testing"]
      },
      {
        category: "Desain Responsif",
        leftBranch: ["Mobile First", "Breakpoints"],
        rightBranch: ["Platform Guidelines (iOS/Android)"],
        downBranch: ["Handoff ke Developer (Zeplin/Figma)"]
      },
      {
        category: "Tools Tambahan",
        leftBranch: ["Ilustrasi Dasar", "Adobe Illustrator"],
        rightBranch: ["Animasi UI", "After Effects / Principle"],
        downBranch: ["Notion & Miro untuk Kolaborasi"]
      },
      {
        category: "Proyek & Portofolio",
        leftBranch: ["Studi Kasus 1 (App)", "Redesign Project"],
        rightBranch: ["Presentasi Desain", "Behance / Dribbble"],
        downBranch: ["Membangun Portofolio UX yang Kuat"]
      },
      {
        category: "Kesiapan Profesional",
        leftBranch: ["Komunikasi dengan Tim Tech", "Agile/Scrum"],
        rightBranch: ["Personal Branding", "Networking"],
        downBranch: ["Wawancara & Whiteboard Challenge"]
      }
    ]
  },

  // TKR
  "Teknisi Kendaraan": {
    title: "Teknisi Kendaraan",
    levels: [
      {
        category: "Dasar Otomotif",
        leftBranch: ["Keselamatan Kerja (K3)", "Alat Tangan & Ukur"],
        rightBranch: ["Prinsip Mesin 4 Tak & 2 Tak", "Komponen Utama"],
        downBranch: ["Pembacaan Manual Book"]
      },
      {
        category: "Sistem Mesin",
        leftBranch: ["Sistem Pendingin", "Sistem Pelumasan"],
        rightBranch: ["Sistem Bahan Bakar", "Sistem Injeksi (EFI)"],
        downBranch: ["Overhaul & Tune Up Mesin"]
      },
      {
        category: "Pemindah Tenaga",
        leftBranch: ["Kopling (Clutch)", "Transmisi Manual"],
        rightBranch: ["Transmisi Otomatis", "Poros Penggerak"],
        downBranch: ["Gardan & Diferensial"]
      },
      {
        category: "Sistem Casis & Suspensi",
        leftBranch: ["Sistem Kemudi", "Spooring & Balancing"],
        rightBranch: ["Sistem Suspensi", "Roda & Ban"],
        downBranch: ["Sistem Rem (Cakram & Tromol, ABS)"]
      },
      {
        category: "Kelistrikan Dasar",
        leftBranch: ["Dasar Listrik & Multitester", "Wiring Diagram"],
        rightBranch: ["Sistem Penerangan", "Sistem Starter"],
        downBranch: ["Sistem Pengisian & Baterai"]
      },
      {
        category: "Diagnostik & Elektronika",
        leftBranch: ["Penggunaan Scanner (OBD2)", "Sensor & Aktuator"],
        rightBranch: ["Sistem AC Kendaraan", "Audio & Aksesoris"],
        downBranch: ["Troubleshooting Kelistrikan Lanjut"]
      },
      {
        category: "Sertifikasi & Praktik",
        leftBranch: ["Uji Kompetensi Keahlian", "Sertifikasi Mekanik"],
        rightBranch: ["Magang Industri", "Simulasi Keluhan Pelanggan"],
        downBranch: ["Manajemen Bengkel Dasar"]
      },
      {
        category: "Siap Kerja",
        leftBranch: ["Customer Service", "Estimasi Biaya"],
        rightBranch: ["Kedisiplinan & Etika Kerja", "Pembuatan CV"],
        downBranch: ["Interview di Dealer Resmi"]
      }
    ]
  },

  // TEI
  "Teknisi Otomasi Industri": {
    title: "Teknisi Otomasi Industri",
    levels: [
      {
        category: "Dasar Elektronika",
        leftBranch: ["Komponen Pasif & Aktif", "Hukum Ohm & Kirchhoff"],
        rightBranch: ["Alat Ukur (Multimeter/Osiloskop)", "Soldering"],
        downBranch: ["Membaca Skema Rangkaian"]
      },
      {
        category: "Elektronika Digital",
        leftBranch: ["Gerbang Logika", "Aljabar Boolean"],
        rightBranch: ["Flip-Flop & Counter", "Register"],
        downBranch: ["Mikrokontroler Dasar (Arduino)"]
      },
      {
        category: "Pneumatik & Hidrolik",
        leftBranch: ["Kompresor & Katup Dasar", "Simbol Pneumatik"],
        rightBranch: ["Sistem Hidrolik Dasar", "Rangkaian Elektropneumatik"],
        downBranch: ["Praktik Festo Fluidsim"]
      },
      {
        category: "Kontrol Motor Listrik",
        leftBranch: ["Motor AC & DC", "Kontaktor & Relay"],
        rightBranch: ["Rangkaian DOL & Star-Delta", "Inverter (VFD)"],
        downBranch: ["Troubleshooting Panel Kontrol"]
      },
      {
        category: "Programmable Logic Controller",
        leftBranch: ["Pengenalan PLC", "Ladder Diagram"],
        rightBranch: ["Instruksi Timer/Counter", "Pemrograman PLC (Omron/Siemens)"],
        downBranch: ["Wiring I/O PLC"]
      },
      {
        category: "Sistem SCADA & HMI",
        leftBranch: ["Pengenalan HMI", "Desain Interface Mesin"],
        rightBranch: ["Konsep SCADA", "Data Logging"],
        downBranch: ["Integrasi PLC & HMI"]
      },
      {
        category: "Robotika Industri",
        leftBranch: ["Kinematika Robot", "Pemrograman Robot Arm"],
        rightBranch: ["Sensor Industri", "Machine Vision Dasar"],
        downBranch: ["Proyek Otomasi Terintegrasi"]
      },
      {
        category: "Persiapan Karir",
        leftBranch: ["Standar Keselamatan (K3)", "Membaca P&ID"],
        rightBranch: ["Pembuatan Laporan Perawatan", "Kerja Tim"],
        downBranch: ["Persiapan Wawancara Pabrik/Manufaktur"]
      }
    ]
  },

  // TITL
  "Teknisi Listrik Industri": {
    title: "Teknisi Listrik Industri",
    levels: [
      {
        category: "Dasar Kelistrikan",
        leftBranch: ["Besaran Listrik", "Keselamatan Kerja Listrik"],
        rightBranch: ["Alat Ukur Listrik", "Komponen Instalasi"],
        downBranch: ["Membaca Gambar Teknik Listrik (PUIL)"]
      },
      {
        category: "Instalasi Penerangan",
        leftBranch: ["Instalasi Rumah Tinggal", "Sistem Saklar"],
        rightBranch: ["Instalasi Gedung", "Perhitungan Beban"],
        downBranch: ["Praktik Pemasangan & Pengujian"]
      },
      {
        category: "Instalasi Tenaga",
        leftBranch: ["Sistem 3 Fasa", "Transformator Dasar"],
        rightBranch: ["Kabel Tenaga", "Sistem Pembumian (Grounding)"],
        downBranch: ["Pemasangan Panel Distribusi (MDP/SDP)"]
      },
      {
        category: "Pengendali Motor Listrik",
        leftBranch: ["Motor Induksi", "Komponen Kontrol Listrik"],
        rightBranch: ["Rangkaian Magnetik", "Start-Stop Motor"],
        downBranch: ["Forward-Reverse & Star-Delta"]
      },
      {
        category: "Otomasi & Kontrol",
        leftBranch: ["Pengenalan PLC Dasar", "Smart Relay"],
        rightBranch: ["Variable Speed Drive (VSD)", "Sensor Listrik"],
        downBranch: ["Wiring Sistem Otomasi Terpadu"]
      },
      {
        category: "Pemeliharaan (Maintenance)",
        leftBranch: ["Preventive Maintenance", "Inspeksi Berkala"],
        rightBranch: ["Alat Uji Isolasi (Megger)", "Analisis Termal"],
        downBranch: ["Troubleshooting Gangguan Listrik"]
      },
      {
        category: "Standar & Regulasi",
        leftBranch: ["SNI & PUIL Terbaru", "Manajemen Energi"],
        rightBranch: ["Sistem Proteksi (MCB, ELCB)", "Proteksi Petir"],
        downBranch: ["Sertifikasi Kompetensi Ketenagalistrikan"]
      },
      {
        category: "Siap Kerja Industri",
        leftBranch: ["Komunikasi Teknis", "Pembuatan SOP Pekerjaan"],
        rightBranch: ["Etika Kerja Proyek", "Penyusunan CV"],
        downBranch: ["Simulasi Interview Teknisi"]
      }
    ]
  },

  // TABUS
  "Fashion Designer": {
    title: "Fashion Designer",
    levels: [
      {
        category: "Dasar Desain Busana",
        leftBranch: ["Anatomi Tubuh", "Sketsa Proporsi"],
        rightBranch: ["Pengetahuan Bahan Tekstil", "Teori Warna"],
        downBranch: ["Alat & Mesin Jahit"]
      },
      {
        category: "Pembuatan Pola Dasar",
        leftBranch: ["Pengambilan Ukuran", "Pola Konstruksi Flat"],
        rightBranch: ["Pecah Pola Sederhana", "Pola Draping Dasar"],
        downBranch: ["Pemindahan Pola ke Kain"]
      },
      {
        category: "Teknik Menjahit",
        leftBranch: ["Macam Kampuh & Kelim", "Menjahit Kerah & Lengan"],
        rightBranch: ["Pemasangan Resleting", "Penyelesaian Tangan"],
        downBranch: ["Menjahit Rok & Kemeja"]
      },
      {
        category: "Desain Fashion Lanjut",
        leftBranch: ["Inspirasi & Moodboard", "Fashion Illustration"],
        rightBranch: ["Desain Digital (Corel/AI)", "Teknik Pewarnaan"],
        downBranch: ["Pembuatan Koleksi Kapsul"]
      },
      {
        category: "Busana Khusus",
        leftBranch: ["Busana Pesta (Evening Gown)", "Detailing (Payet/Bordir)"],
        rightBranch: ["Busana Pria / Tailoring", "Busana Anak"],
        downBranch: ["Teknik Jahit Kualitas Butik"]
      },
      {
        category: "Manajemen Produksi",
        leftBranch: ["Hitung Harga Pokok (HPP)", "Kebutuhan Bahan"],
        rightBranch: ["Quality Control (QC)", "Standard Sizing"],
        downBranch: ["Sistem Produksi Massal (Garment)"]
      },
      {
        category: "Branding & Bisnis",
        leftBranch: ["Fashion Marketing", "Membangun Brand Identity"],
        rightBranch: ["Visual Merchandising", "Trend Forecasting"],
        downBranch: ["Fashion Show / Pameran Karya"]
      },
      {
        category: "Karir Profesional",
        leftBranch: ["Portofolio Desain", "Pemotretan Lookbook"],
        rightBranch: ["Negosiasi Klien", "Kerjasama Tim"],
        downBranch: ["Mulai Bisnis Butik / Bekerja di Industri"]
      }
    ]
  },

  // TABOG
  "Chef": {
    title: "Chef",
    levels: [
      {
        category: "Dasar Kuliner",
        leftBranch: ["Hygiene & Sanitasi", "K3 Dapur"],
        rightBranch: ["Pengenalan Alat Dapur", "Bahan Makanan Dasar"],
        downBranch: ["Teknik Potongan Dasar (Knife Skills)"]
      },
      {
        category: "Teknik Memasak",
        leftBranch: ["Moist Heat Cooking", "Boiling, Steaming, Poaching"],
        rightBranch: ["Dry Heat Cooking", "Baking, Roasting, Frying"],
        downBranch: ["Pembuatan Kaldu (Stock) & Saus Dasar"]
      },
      {
        category: "Masakan Kontinental",
        leftBranch: ["Appetizer & Soup", "Salad & Dressing"],
        rightBranch: ["Main Course (Daging/Ikan)", "Pasta & Olahan Kentang"],
        downBranch: ["Plating & Garnish Kontinental"]
      },
      {
        category: "Masakan Nusantara",
        leftBranch: ["Bumbu Dasar Indonesia", "Teknik Olah Rempah"],
        rightBranch: ["Soto, Sate, & Rendang", "Jajanan Pasar"],
        downBranch: ["Penyajian Tradisional (Tumpeng)"]
      },
      {
        category: "Pastry & Bakery Dasar",
        leftBranch: ["Roti Manis & Tawar", "Cake Dasar (Sponge/Butter)"],
        rightBranch: ["Choux Pastry", "Cookies & Pie"],
        downBranch: ["Dekorasi Kue Dasar"]
      },
      {
        category: "Manajemen Dapur",
        leftBranch: ["Food Cost Calculation", "Penyusunan Menu"],
        rightBranch: ["Inventory & Storage", "Purchasing"],
        downBranch: ["Kitchen Organization (Brigade System)"]
      },
      {
        category: "Kuliner Lanjut",
        leftBranch: ["Fusion Food", "Gastronomi Molekuler (Basic)"],
        rightBranch: ["Dietary Food (Vegan/Gluten-Free)", "Fine Dining Plating"],
        downBranch: ["Menu Creation & Food Tasting"]
      },
      {
        category: "Siap Kerja & Usaha",
        leftBranch: ["Etika Profesi Chef", "Komunikasi Tim Dapur"],
        rightBranch: ["Pembuatan CV Kreatif", "Standar Pelayanan"],
        downBranch: ["Simulasi Uji Kompetensi Restoran"]
      }
    ]
  },

  // TGB
  "Drafter Bangunan": {
    title: "Drafter Bangunan",
    levels: [
      {
        category: "Dasar Gambar Teknik",
        leftBranch: ["Pengenalan Alat Gambar", "Standar Garis & Huruf"],
        rightBranch: ["Proyeksi Orthogonal", "Skala & Dimensi"],
        downBranch: ["Gambar Sketsa Manual (Freehand)"]
      },
      {
        category: "Konstruksi Dasar",
        leftBranch: ["Ilmu Bahan Bangunan", "Struktur Tanah Dasar"],
        rightBranch: ["Mekanika Teknik Dasar", "Elemen Struktur (Kolom/Balok)"],
        downBranch: ["Gambar Denah, Tampak, Potongan"]
      },
      {
        category: "Computer Aided Design (CAD)",
        leftBranch: ["Pengenalan AutoCAD", "Perintah Dasar Draw & Modify"],
        rightBranch: ["Layer Management", "Block & Hatch"],
        downBranch: ["Pembuatan Gambar Kerja 2D Lengkap"]
      },
      {
        category: "Detail Konstruksi",
        leftBranch: ["Detail Pondasi & Sloof", "Detail Rangka Atap"],
        rightBranch: ["Detail Kusen & Pintu", "Detail Sanitasi/Plumbing"],
        downBranch: ["Gambar Rencana Instalasi Listrik"]
      },
      {
        category: "Pemodelan 3D",
        leftBranch: ["Pengenalan SketchUp", "Tool & Shortcut 3D"],
        rightBranch: ["Material & Texturing", "Komponen & Group"],
        downBranch: ["Pemodelan Eksterior & Interior Bangunan"]
      },
      {
        category: "Rendering & Visualisasi",
        leftBranch: ["Pengenalan V-Ray / Enscape", "Pencahayaan (Lighting)"],
        rightBranch: ["Setting Kamera & Scene", "Post-Processing (Photoshop)"],
        downBranch: ["Presentasi Visual Arsitektur"]
      },
      {
        category: "Estimasi Biaya (RAB)",
        leftBranch: ["Membaca Spesifikasi Teknis", "Volume Pekerjaan (BQ)"],
        rightBranch: ["Harga Satuan Bahan & Upah", "Ms. Excel untuk RAB"],
        downBranch: ["Penyusunan Rencana Anggaran Biaya"]
      },
      {
        category: "Profesionalisme",
        leftBranch: ["Standar Gambar Proyek", "Sistem Koordinasi Tim"],
        rightBranch: ["Pembuatan Portofolio PDF", "Etika Kerja Konsultan"],
        downBranch: ["Persiapan Kerja di Konsultan / Kontraktor"]
      }
    ]
  },

  // ANIMASI
  "Animator": {
    title: "Animator",
    levels: [
      {
        category: "Dasar Seni & Animasi",
        leftBranch: ["Prinsip Menggambar", "Anatomi Tubuh Dasar"],
        rightBranch: ["12 Prinsip Animasi", "Teori Warna & Cahaya"],
        downBranch: ["Pembuatan Sketsa (Rough Sketch)"]
      },
      {
        category: "Pra-Produksi (Pre-Production)",
        leftBranch: ["Ide Cerita & Naskah", "Desain Karakter"],
        rightBranch: ["Desain Latar (Environment)", "Prop Design"],
        downBranch: ["Pembuatan Storyboard & Animatic"]
      },
      {
        category: "Animasi 2D Dasar",
        leftBranch: ["Pengenalan Tools (Toon Boom / Flash)", "Keyframing"],
        rightBranch: ["Inbetweening", "Timing & Spacing"],
        downBranch: ["Pembuatan Walk Cycle & Ekspresi Wajah"]
      },
      {
        category: "Pemodelan 3D (3D Modeling)",
        leftBranch: ["Pengenalan Blender/Maya", "Polygonal Modeling"],
        rightBranch: ["UV Mapping", "Texturing & Shading"],
        downBranch: ["Rigging Dasar (Pemasangan Tulang)"]
      },
      {
        category: "Animasi 3D Lanjut",
        leftBranch: ["Pose to Pose Animation", "Graph Editor"],
        rightBranch: ["Weight Painting", "Lip Sync 3D"],
        downBranch: ["Animasi Karakter 3D Kompleks"]
      },
      {
        category: "VFX & Compositing",
        leftBranch: ["Particle Systems", "Efek Cahaya & Asap"],
        rightBranch: ["Pengenalan After Effects", "Green Screen / Keying"],
        downBranch: ["Compositing Render Passes"]
      },
      {
        category: "Audio & Rendering",
        leftBranch: ["Pengisian Suara (Dubbing)", "Sound Effects (SFX)"],
        rightBranch: ["Lighting & Camera Setup", "Render Engine (Cycles/Arnold)"],
        downBranch: ["Final Edit & Export Video"]
      },
      {
        category: "Portofolio & Karir",
        leftBranch: ["Pembuatan Showreel", "Manajemen Proyek Kreatif"],
        rightBranch: ["Kerja Tim (Pipeline Produksi)", "Hak Cipta (Copyright)"],
        downBranch: ["Melamar di Studio Animasi / Freelance"]
      }
    ]
  },

  // AKUNTANSI
  "Akuntan": {
    title: "Akuntan",
    levels: [
      {
        category: "Dasar Akuntansi",
        leftBranch: ["Persamaan Dasar", "Analisis Bukti Transaksi"],
        rightBranch: ["Aturan Debit & Kredit", "Siklus Akuntansi"],
        downBranch: ["Jurnal Umum & Buku Besar"]
      },
      {
        category: "Akuntansi Perusahaan Jasa",
        leftBranch: ["Neraca Saldo", "Jurnal Penyesuaian"],
        rightBranch: ["Kertas Kerja (Worksheet)", "Laporan Keuangan Dasar"],
        downBranch: ["Jurnal Penutup & Pembalik"]
      },
      {
        category: "Akuntansi Perusahaan Dagang",
        leftBranch: ["Jurnal Khusus (Beli/Jual/Kas)", "Syarat Pembayaran"],
        rightBranch: ["Metode Persediaan (FIFO/LIFO/Average)", "Buku Besar Pembantu"],
        downBranch: ["Harga Pokok Penjualan (HPP)"]
      },
      {
        category: "Komputer Akuntansi",
        leftBranch: ["Ms. Excel untuk Akuntansi", "Fungsi Logika & Lookup"],
        rightBranch: ["Aplikasi MYOB / Accurate", "Setup Data Awal Perusahaan"],
        downBranch: ["Input Transaksi Digital & Cetak Laporan"]
      },
      {
        category: "Akuntansi Keuangan Lanjut",
        leftBranch: ["Kas Kecil (Petty Cash)", "Rekonsiliasi Bank"],
        rightBranch: ["Piutang Wesel", "Penyusutan Aset Tetap"],
        downBranch: ["Laporan Arus Kas"]
      },
      {
        category: "Perpajakan Dasar",
        leftBranch: ["Ketentuan Umum Pajak (KUP)", "NPWP & NPPKP"],
        rightBranch: ["PPh 21 (Gaji Karyawan)", "PPN & PPnBM"],
        downBranch: ["Pengisian SPT Masa & Tahunan (e-Filing)"]
      },
      {
        category: "Akuntansi Manufaktur & Biaya",
        leftBranch: ["Biaya Bahan Baku & Tenaga Kerja", "Biaya Overhead Pabrik"],
        rightBranch: ["Metode Harga Pokok Pesanan", "Harga Pokok Proses"],
        downBranch: ["Laporan Harga Pokok Produksi"]
      },
      {
        category: "Profesional Akuntan",
        leftBranch: ["Etika Profesi Akuntan", "Prinsip Audit Dasar"],
        rightBranch: ["Pembuatan CV", "Analisis Rasio Keuangan"],
        downBranch: ["Ujian Sertifikasi (Teknisi Akuntansi)"]
      }
    ]
  },

  // PERHOTELAN
  "Hotel Front Office Staff": {
    title: "Hotel Front Office Staff",
    levels: [
      {
        category: "Dasar Perhotelan",
        leftBranch: ["Pengenalan Industri Pariwisata", "Struktur Organisasi Hotel"],
        rightBranch: ["Klasifikasi Bintang Hotel", "Departemen Front Office"],
        downBranch: ["Grooming & Standar Penampilan"]
      },
      {
        category: "Komunikasi & Etika",
        leftBranch: ["Bahasa Inggris Profesi", "Greeting & Telephone Courtesy"],
        rightBranch: ["Komunikasi Non-Verbal", "Etika Melayani Tamu (Hospitality)"],
        downBranch: ["Penanganan Keluhan (Handling Complaint)"]
      },
      {
        category: "Reservasi (Pemesanan)",
        leftBranch: ["Sumber & Jenis Reservasi", "Harga & Tipe Kamar"],
        rightBranch: ["Sistem Reservasi Komputer", "Overbooking Strategy"],
        downBranch: ["Konfirmasi & Pembatalan Pesanan"]
      },
      {
        category: "Penerimaan Tamu (Reception)",
        leftBranch: ["Prosedur Check-in", "Registrasi Tamu (Walk-in/Booking)"],
        rightBranch: ["Pemberian Kunci Kamar", "Upselling & Cross-selling"],
        downBranch: ["Penanganan Tamu VIP & Rombongan"]
      },
      {
        category: "Layanan Selama Menginap",
        leftBranch: ["Pusat Informasi & Concierge", "Penitipan Barang (Luggage)"],
        rightBranch: ["Layanan Pesan & Surat", "Safe Deposit Box"],
        downBranch: ["Penyelesaian Masalah Operasional Harian"]
      },
      {
        category: "Administrasi & Pembayaran",
        leftBranch: ["Prosedur Check-out", "Buku Tamu (Guest Folio)"],
        rightBranch: ["Metode Pembayaran (Cash/Card/Bill)", "Night Audit Dasar"],
        downBranch: ["Laporan Kasir Front Office"]
      },
      {
        category: "Sistem Properti Hotel (PMS)",
        leftBranch: ["Pengenalan Software Hotel", "Input Data Tamu"],
        rightBranch: ["Update Status Kamar", "Pencetakan Tagihan"],
        downBranch: ["Simulasi Operasional Sistem Hotel"]
      },
      {
        category: "Siap Terjun Ke Industri",
        leftBranch: ["Keselamatan & Keadaan Darurat", "Kerjasama dengan Housekeeping"],
        rightBranch: ["Pembuatan CV Bilingual", "Simulasi Wawancara Kerja"],
        downBranch: ["Magang (On The Job Training)"]
      }
    ]
  }
};
