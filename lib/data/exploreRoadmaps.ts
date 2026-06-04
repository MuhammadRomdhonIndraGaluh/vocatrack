export interface ExploreSkill {
  label: string;
  tag: string; // Digunakan untuk menghitung poin minat ke profesi tertentu
}

export interface ExploreLevel {
  category: string;
  leftBranch?: ExploreSkill[];
  rightBranch?: ExploreSkill[];
  downBranch?: ExploreSkill[];
}

export interface ExploreRoadmap {
  title: string;
  recommendations: Record<string, string>; // Mapping tag ke nama profesi
  levels: ExploreLevel[];
}

export const exploreRoadmaps: Record<string, ExploreRoadmap> = {
  // 1. REKAYASA PERANGKAT LUNAK
  rpl: {
    title: "Eksplorasi Rekayasa Perangkat Lunak",
    recommendations: {
      web: "Web Developer",
      mobile: "Mobile Developer",
      db: "Database Administrator / Backend Developer",
      ui: "UI/UX Designer",
      qa: "Software Tester (QA)",
      cloud: "Cloud Engineer / DevOps"
    },
    levels: [
      {
        category: "Dasar Ilmu Komputer",
        leftBranch: [
          { label: "Logika Pemrograman", tag: "web" },
          { label: "Algoritma & Flowchart", tag: "mobile" }
        ],
        rightBranch: [
          { label: "Struktur Data Dasar", tag: "db" },
          { label: "Sistem Operasi", tag: "cloud" }
        ],
        downBranch: [
          { label: "Version Control (Git)", tag: "web" }
        ]
      },
      {
        category: "Pengembangan Website",
        leftBranch: [
          { label: "HTML & CSS", tag: "web" },
          { label: "Responsive Design", tag: "ui" }
        ],
        rightBranch: [
          { label: "JavaScript DOM", tag: "web" },
          { label: "Front-End Framework", tag: "web" }
        ],
        downBranch: [
          { label: "Web Accessibility", tag: "ui" }
        ]
      },
      {
        category: "Basis Data (Database)",
        leftBranch: [
          { label: "Konsep Relasional", tag: "db" },
          { label: "SQL Query Dasar", tag: "db" }
        ],
        rightBranch: [
          { label: "NoSQL Database", tag: "db" },
          { label: "Database Design", tag: "db" }
        ],
        downBranch: [
          { label: "Integrasi API", tag: "web" }
        ]
      },
      {
        category: "Pengembangan Mobile",
        leftBranch: [
          { label: "Mobile UI Design", tag: "ui" },
          { label: "Android Native", tag: "mobile" }
        ],
        rightBranch: [
          { label: "Flutter Dasar", tag: "mobile" },
          { label: "React Native", tag: "mobile" }
        ],
        downBranch: [
          { label: "Publish ke PlayStore", tag: "mobile" }
        ]
      },
      {
        category: "Software Quality & Testing",
        leftBranch: [
          { label: "Unit Testing", tag: "qa" },
          { label: "Integration Testing", tag: "qa" }
        ],
        rightBranch: [
          { label: "Debugging Tools", tag: "qa" },
          { label: "Test Automation", tag: "qa" }
        ],
        downBranch: [
          { label: "Security Testing", tag: "cloud" }
        ]
      },
      {
        category: "Cloud & Deployment",
        leftBranch: [
          { label: "Linux Server", tag: "cloud" },
          { label: "Docker Dasar", tag: "cloud" }
        ],
        rightBranch: [
          { label: "CI/CD Pipeline", tag: "cloud" },
          { label: "AWS / GCP / Azure", tag: "cloud" }
        ]
      }
    ]
  },

  // 2. TEKNIK KOMPUTER DAN JARINGAN
  tkj: {
    title: "Eksplorasi Teknik Komputer & Jaringan",
    recommendations: {
      net: "Network Engineer",
      sys: "System Administrator",
      sec: "Cyber Security Specialist",
      hw: "IT Support / Hardware Technician",
      cloud: "Cloud / DevOps Engineer"
    },
    levels: [
      {
        category: "Dasar Hardware PC",
        leftBranch: [
          { label: "Pengenalan Komponen", tag: "hw" },
          { label: "Perakitan PC", tag: "hw" }
        ],
        rightBranch: [
          { label: "Troubleshooting PC", tag: "hw" },
          { label: "Instalasi OS", tag: "sys" }
        ],
        downBranch: [
          { label: "Kesehatan K3LH", tag: "hw" }
        ]
      },
      {
        category: "Infrastruktur Jaringan",
        leftBranch: [
          { label: "Topologi Jaringan", tag: "net" },
          { label: "Kabel UTP & Fiber", tag: "net" }
        ],
        rightBranch: [
          { label: "IP Addressing & Subnetting", tag: "net" },
          { label: "OSI Layer", tag: "net" }
        ],
        downBranch: [
          { label: "Switching & VLAN", tag: "net" }
        ]
      },
      {
        category: "Administrasi Sistem",
        leftBranch: [
          { label: "Linux Command Line", tag: "sys" },
          { label: "Windows Server", tag: "sys" }
        ],
        rightBranch: [
          { label: "Active Directory", tag: "sys" },
          { label: "Web & DNS Server", tag: "sys" }
        ],
        downBranch: [
          { label: "Virtualisasi", tag: "cloud" }
        ]
      },
      {
        category: "Routing & Konfigurasi Lanjut",
        leftBranch: [
          { label: "Static Routing", tag: "net" },
          { label: "Dynamic Routing (OSPF)", tag: "net" }
        ],
        rightBranch: [
          { label: "MikroTik Dasar", tag: "net" },
          { label: "Cisco IOS", tag: "net" }
        ],
        downBranch: [
          { label: "Wireless Networking", tag: "net" }
        ]
      },
      {
        category: "Keamanan Sistem (Security)",
        leftBranch: [
          { label: "Konsep Firewall", tag: "sec" },
          { label: "VPN Configuration", tag: "sec" }
        ],
        rightBranch: [
          { label: "Deteksi Intrusi", tag: "sec" },
          { label: "Kriptografi Dasar", tag: "sec" }
        ]
      }
    ]
  },

  // 3. DESAIN KOMUNIKASI VISUAL (DKV)
  dkv: {
    title: "Eksplorasi Desain Komunikasi Visual",
    recommendations: {
      graph: "Graphic Designer",
      ui: "UI/UX Designer",
      vid: "Video Editor",
      anim: "Motion Grapher / Animator",
      illust: "Illustrator / Concept Artist"
    },
    levels: [
      {
        category: "Nirmana & Dasar Seni",
        leftBranch: [
          { label: "Unsur Visual", tag: "illust" },
          { label: "Prinsip Desain", tag: "graph" }
        ],
        rightBranch: [
          { label: "Teori Warna", tag: "graph" },
          { label: "Tipografi Dasar", tag: "graph" }
        ],
        downBranch: [
          { label: "Sketsa Manual", tag: "illust" }
        ]
      },
      {
        category: "Desain Grafis Komersial",
        leftBranch: [
          { label: "Desain Logo & Identitas", tag: "graph" },
          { label: "Desain Kemasan (Packaging)", tag: "graph" }
        ],
        rightBranch: [
          { label: "Desain Layout (Majalah)", tag: "graph" },
          { label: "Vector & Bitmap", tag: "illust" }
        ],
        downBranch: [
          { label: "Software Design (Ai/Ps)", tag: "graph" }
        ]
      },
      {
        category: "UI / UX Design",
        leftBranch: [
          { label: "Wireframing", tag: "ui" },
          { label: "Prototyping", tag: "ui" }
        ],
        rightBranch: [
          { label: "User Research", tag: "ui" },
          { label: "Figma Mastery", tag: "ui" }
        ],
        downBranch: [
          { label: "Design System", tag: "ui" }
        ]
      },
      {
        category: "Fotografi & Videografi",
        leftBranch: [
          { label: "Teknik Kamera DSLR", tag: "vid" },
          { label: "Lighting Studio", tag: "vid" }
        ],
        rightBranch: [
          { label: "Sinematografi Dasar", tag: "vid" },
          { label: "Color Grading", tag: "vid" }
        ],
        downBranch: [
          { label: "Software Editing (Pr)", tag: "vid" }
        ]
      },
      {
        category: "Ilustrasi & Motion",
        leftBranch: [
          { label: "Digital Painting", tag: "illust" },
          { label: "Character Design", tag: "illust" }
        ],
        rightBranch: [
          { label: "Keyframing Dasar", tag: "anim" },
          { label: "After Effects (Ae)", tag: "anim" }
        ]
      }
    ]
  },

  // 4. TEKNIK OTOMASI INDUSTRI (TEI)
  tei: {
    title: "Eksplorasi Teknik Otomasi Industri",
    recommendations: {
      plc: "Programmer PLC",
      iot: "IoT Engineer",
      robot: "Robotics Technician",
      maint: "Maintenance Engineer"
    },
    levels: [
      {
        category: "Dasar Elektronika",
        leftBranch: [
          { label: "Komponen Pasif & Aktif", tag: "maint" },
          { label: "Hukum Ohm & Rangkaian", tag: "maint" }
        ],
        rightBranch: [
          { label: "Alat Ukur Elektronik", tag: "maint" },
          { label: "Penyolderan", tag: "maint" }
        ],
        downBranch: [
          { label: "Elektronika Digital", tag: "robot" }
        ]
      },
      {
        category: "Kendali Motor & Relay",
        leftBranch: [
          { label: "Sistem Relay & Kontaktor", tag: "maint" },
          { label: "Wiring Diagram", tag: "plc" }
        ],
        rightBranch: [
          { label: "Motor Listrik AC/DC", tag: "maint" },
          { label: "Inverter (VSD)", tag: "plc" }
        ],
        downBranch: [
          { label: "Pneumatik & Hidrolik", tag: "robot" }
        ]
      },
      {
        category: "Pemrograman PLC",
        leftBranch: [
          { label: "Ladder Logic Dasar", tag: "plc" },
          { label: "Timer & Counter", tag: "plc" }
        ],
        rightBranch: [
          { label: "Instruksi Lanjutan PLC", tag: "plc" },
          { label: "HMI Design", tag: "plc" }
        ],
        downBranch: [
          { label: "Integrasi Sensor Industri", tag: "plc" }
        ]
      },
      {
        category: "Mikrokontroler & IoT",
        leftBranch: [
          { label: "Arduino / ESP32", tag: "iot" },
          { label: "Protokol Komunikasi (I2C, SPI)", tag: "iot" }
        ],
        rightBranch: [
          { label: "Pemrograman C++", tag: "iot" },
          { label: "Cloud MQTT", tag: "iot" }
        ]
      }
    ]
  },

  // 5. TEKNIK INSTALASI TENAGA LISTRIK (TITL)
  titl: {
    title: "Eksplorasi Teknik Instalasi Tenaga Listrik",
    recommendations: {
      inst: "Instalatur Listrik Gedung",
      ind: "Teknisi Listrik Industri",
      maint: "Maintenance Supervisor",
      panel: "Panel Builder"
    },
    levels: [
      {
        category: "Dasar Ketenagalistrikan",
        leftBranch: [
          { label: "Teori Listrik Arus Kuat", tag: "inst" },
          { label: "Simbol Kelistrikan", tag: "inst" }
        ],
        rightBranch: [
          { label: "K3 Kelistrikan (PUIL)", tag: "inst" },
          { label: "Pengukuran Arus & Tegangan", tag: "inst" }
        ],
        downBranch: [
          { label: "Keselamatan Kerja Listrik", tag: "maint" }
        ]
      },
      {
        category: "Instalasi Penerangan",
        leftBranch: [
          { label: "Wiring 1 Fasa", tag: "inst" },
          { label: "Pemasangan Saklar & Stop Kontak", tag: "inst" }
        ],
        rightBranch: [
          { label: "Desain Layout Instalasi", tag: "inst" },
          { label: "Sistem Grounding", tag: "inst" }
        ],
        downBranch: [
          { label: "Perbaikan Hubung Singkat", tag: "maint" }
        ]
      },
      {
        category: "Instalasi Tenaga (Motor Listrik)",
        leftBranch: [
          { label: "Listrik 3 Fasa", tag: "ind" },
          { label: "Rangkaian Direct On Line (DOL)", tag: "ind" }
        ],
        rightBranch: [
          { label: "Rangkaian Star-Delta", tag: "ind" },
          { label: "Penggulungan Ulang Motor", tag: "maint" }
        ],
        downBranch: [
          { label: "Proteksi Motor Listrik", tag: "ind" }
        ]
      },
      {
        category: "Sistem Kontrol & Panel",
        leftBranch: [
          { label: "Desain Panel Distribusi", tag: "panel" },
          { label: "Perakitan Komponen Panel", tag: "panel" }
        ],
        rightBranch: [
          { label: "Programmable Logic Relay", tag: "ind" },
          { label: "Pengujian Panel Listrik", tag: "panel" }
        ]
      }
    ]
  },

  // 6. TEKNIK KENDARAAN RINGAN (TKR)
  tkr: {
    title: "Eksplorasi Teknik Kendaraan Ringan",
    recommendations: {
      mesin: "Mekanik Mesin Mobil",
      elek: "Mekanik Elektrikal Otomotif",
      sasis: "Teknisi Sasis & Suspensi",
      sa: "Service Advisor"
    },
    levels: [
      {
        category: "Peralatan & Dasar Otomotif",
        leftBranch: [
          { label: "Hand Tools & Power Tools", tag: "mesin" },
          { label: "SST (Special Service Tools)", tag: "mesin" }
        ],
        rightBranch: [
          { label: "Alat Ukur Mekanik & Presisi", tag: "mesin" },
          { label: "K3 Otomotif", tag: "sa" }
        ],
        downBranch: [
          { label: "Prosedur Servis Berkala", tag: "sa" }
        ]
      },
      {
        category: "Engine Management",
        leftBranch: [
          { label: "Cara Kerja Mesin 4 Tak", tag: "mesin" },
          { label: "Overhaul Mesin", tag: "mesin" }
        ],
        rightBranch: [
          { label: "Sistem Pendingin & Pelumasan", tag: "mesin" },
          { label: "Sistem Bahan Bakar Injeksi (EFI)", tag: "elek" }
        ],
        downBranch: [
          { label: "Scanner & Diagnostik ECU", tag: "elek" }
        ]
      },
      {
        category: "Kelistrikan Otomotif",
        leftBranch: [
          { label: "Sistem Pengapian", tag: "elek" },
          { label: "Sistem Pengisian & Starter", tag: "elek" }
        ],
        rightBranch: [
          { label: "Wiring Diagram Mobil", tag: "elek" },
          { label: "Sistem AC (Air Conditioner)", tag: "elek" }
        ],
        downBranch: [
          { label: "Troubleshooting Kelistrikan", tag: "elek" }
        ]
      },
      {
        category: "Sasis & Pemindah Tenaga",
        leftBranch: [
          { label: "Sistem Rem (ABS/Non-ABS)", tag: "sasis" },
          { label: "Sistem Suspensi", tag: "sasis" }
        ],
        rightBranch: [
          { label: "Transmisi Manual & Otomatis", tag: "mesin" },
          { label: "Wheel Alignment & Balancing", tag: "sasis" }
        ]
      }
    ]
  },

  // 7. TATA BUSANA (TABUS)
  tabus: {
    title: "Eksplorasi Tata Busana",
    recommendations: {
      design: "Fashion Designer",
      pattern: "Pattern Maker (Pembuat Pola)",
      sew: "Penjahit Profesional (Tailor)",
      style: "Fashion Stylist / Boutique Owner"
    },
    levels: [
      {
        category: "Dasar Desain Busana",
        leftBranch: [
          { label: "Proporsi Tubuh Manusia", tag: "design" },
          { label: "Prinsip Desain Pakaian", tag: "design" }
        ],
        rightBranch: [
          { label: "Sketsa Mode (Fashion Illustration)", tag: "design" },
          { label: "Pengetahuan Tekstil", tag: "style" }
        ],
        downBranch: [
          { label: "Kombinasi Warna & Motif", tag: "style" }
        ]
      },
      {
        category: "Pembuatan Pola (Pattern Making)",
        leftBranch: [
          { label: "Pengambilan Ukuran Tubuh", tag: "pattern" },
          { label: "Pembuatan Pola Dasar", tag: "pattern" }
        ],
        rightBranch: [
          { label: "Pecah Pola Pakaian Wanita", tag: "pattern" },
          { label: "Pola Grading", tag: "pattern" }
        ],
        downBranch: [
          { label: "Software CAD Pola (Optitex)", tag: "pattern" }
        ]
      },
      {
        category: "Teknik Menjahit",
        leftBranch: [
          { label: "Penggunaan Mesin Jahit Industri", tag: "sew" },
          { label: "Teknik Jahit Dasar", tag: "sew" }
        ],
        rightBranch: [
          { label: "Penyelesaian Kelim & Kampuh", tag: "sew" },
          { label: "Pemasangan Ritsleting & Kancing", tag: "sew" }
        ],
        downBranch: [
          { label: "Menjahit Pakaian Butik", tag: "sew" }
        ]
      },
      {
        category: "Fashion Bisnis & Styling",
        leftBranch: [
          { label: "Fashion Forecasting", tag: "style" },
          { label: "Visual Merchandising", tag: "style" }
        ],
        rightBranch: [
          { label: "Perhitungan Harga Pokok Produksi", tag: "style" },
          { label: "Manajemen Butik", tag: "style" }
        ]
      }
    ]
  },

  // 8. TATA BOGA (TABOG)
  tabog: {
    title: "Eksplorasi Tata Boga",
    recommendations: {
      hot: "Chef de Partie / Hot Kitchen",
      pastry: "Pastry Chef / Baker",
      fnb: "F&B Manager / Entrepreneur",
      bar: "Barista / Bartender"
    },
    levels: [
      {
        category: "Sanitasi & Dasar Dapur",
        leftBranch: [
          { label: "Food Safety (HACCP)", tag: "fnb" },
          { label: "Personal Hygiene", tag: "fnb" }
        ],
        rightBranch: [
          { label: "Pengenalan Alat Dapur Industri", tag: "hot" },
          { label: "Pengetahuan Bahan Makanan", tag: "hot" }
        ],
        downBranch: [
          { label: "Pemotongan Pisau (Knife Skills)", tag: "hot" }
        ]
      },
      {
        category: "Pengolahan Makanan Panas",
        leftBranch: [
          { label: "Pembuatan Kaldu (Stock) & Saus", tag: "hot" },
          { label: "Teknik Merebus & Mengukus", tag: "hot" }
        ],
        rightBranch: [
          { label: "Teknik Menumis & Menggoreng", tag: "hot" },
          { label: "Memanggang (Roasting & Grilling)", tag: "hot" }
        ],
        downBranch: [
          { label: "Masakan Nusantara & Kontinental", tag: "hot" }
        ]
      },
      {
        category: "Pastry & Bakery",
        leftBranch: [
          { label: "Bahan Dasar Roti & Kue", tag: "pastry" },
          { label: "Teknik Pembuatan Adonan Roti", tag: "pastry" }
        ],
        rightBranch: [
          { label: "Pembuatan Cake & Sponge", tag: "pastry" },
          { label: "Dekorasi Kue & Cokelat", tag: "pastry" }
        ],
        downBranch: [
          { label: "Dessert Plating", tag: "pastry" }
        ]
      },
      {
        category: "Minuman & Manajemen F&B",
        leftBranch: [
          { label: "Teknik Meracik Kopi (Espresso)", tag: "bar" },
          { label: "Mocktail & Minuman Dingin", tag: "bar" }
        ],
        rightBranch: [
          { label: "Menu Planning", tag: "fnb" },
          { label: "Food Costing & Perhitungan Laba", tag: "fnb" }
        ]
      }
    ]
  },

  // 9. ANIMASI
  animasi: {
    title: "Eksplorasi Animasi & Multimedia",
    recommendations: {
      anim2d: "2D Animator",
      anim3d: "3D Modeler / Animator",
      story: "Storyboard Artist",
      vfx: "VFX Artist / Compositor"
    },
    levels: [
      {
        category: "Pra-Produksi & Konsep",
        leftBranch: [
          { label: "12 Prinsip Animasi", tag: "anim2d" },
          { label: "Penulisan Naskah (Scriptwriting)", tag: "story" }
        ],
        rightBranch: [
          { label: "Character & Environment Design", tag: "story" },
          { label: "Storyboard & Animatic", tag: "story" }
        ],
        downBranch: [
          { label: "Voice Acting & Audio Sync", tag: "vfx" }
        ]
      },
      {
        category: "Animasi 2 Dimensi",
        leftBranch: [
          { label: "Drawing & Inbetweening", tag: "anim2d" },
          { label: "Rigging Karakter 2D", tag: "anim2d" }
        ],
        rightBranch: [
          { label: "Keyframe Animation", tag: "anim2d" },
          { label: "Lip Sync 2D", tag: "anim2d" }
        ],
        downBranch: [
          { label: "Software (ToonBoom/Moho/Ae)", tag: "anim2d" }
        ]
      },
      {
        category: "Animasi 3 Dimensi",
        leftBranch: [
          { label: "3D Modeling Dasar", tag: "anim3d" },
          { label: "UV Mapping & Texturing", tag: "anim3d" }
        ],
        rightBranch: [
          { label: "3D Rigging & Skinning", tag: "anim3d" },
          { label: "3D Animation Blockout", tag: "anim3d" }
        ],
        downBranch: [
          { label: "Software (Blender/Maya)", tag: "anim3d" }
        ]
      },
      {
        category: "Pencahayaan & Visual Effects",
        leftBranch: [
          { label: "Lighting & Rendering", tag: "vfx" },
          { label: "Simulasi Partikel (Api/Air)", tag: "vfx" }
        ],
        rightBranch: [
          { label: "Compositing", tag: "vfx" },
          { label: "Color Correction", tag: "vfx" }
        ]
      }
    ]
  },

  // 10. AKUNTANSI DAN KEUANGAN LEMBAGA
  akuntansi: {
    title: "Eksplorasi Akuntansi & Keuangan",
    recommendations: {
      staff: "Staff Akuntansi",
      pajak: "Konsultan / Staff Pajak",
      audit: "Auditor Junior",
      admin: "Admin Keuangan / Kasir"
    },
    levels: [
      {
        category: "Dasar Akuntansi & Jasa",
        leftBranch: [
          { label: "Persamaan Dasar Akuntansi", tag: "staff" },
          { label: "Bukti Transaksi", tag: "admin" }
        ],
        rightBranch: [
          { label: "Jurnal Umum & Buku Besar", tag: "staff" },
          { label: "Neraca Saldo", tag: "staff" }
        ],
        downBranch: [
          { label: "Siklus Perusahaan Jasa", tag: "staff" }
        ]
      },
      {
        category: "Akuntansi Perusahaan Dagang",
        leftBranch: [
          { label: "Jurnal Khusus", tag: "staff" },
          { label: "Metode Persediaan (FIFO/LIFO)", tag: "audit" }
        ],
        rightBranch: [
          { label: "Rekonsiliasi Bank", tag: "audit" },
          { label: "Laporan Keuangan Laba/Rugi", tag: "staff" }
        ],
        downBranch: [
          { label: "Jurnal Penutup & Pembalik", tag: "staff" }
        ]
      },
      {
        category: "Perpajakan Dasar",
        leftBranch: [
          { label: "Ketentuan Umum Perpajakan", tag: "pajak" },
          { label: "PPh Pasal 21", tag: "pajak" }
        ],
        rightBranch: [
          { label: "PPN & PPnBM", tag: "pajak" },
          { label: "Pengisian e-SPT & e-Faktur", tag: "pajak" }
        ],
        downBranch: [
          { label: "Perhitungan Pajak Badan", tag: "pajak" }
        ]
      },
      {
        category: "Komputer Akuntansi",
        leftBranch: [
          { label: "Microsoft Excel for Accounting", tag: "admin" },
          { label: "Input Data Master MYOB / Accurate", tag: "staff" }
        ],
        rightBranch: [
          { label: "Pencatatan Transaksi MYOB", tag: "staff" },
          { label: "Cetak Laporan Keuangan Digital", tag: "audit" }
        ]
      }
    ]
  },

  // 11. PERHOTELAN
  perhotelan: {
    title: "Eksplorasi Industri Perhotelan",
    recommendations: {
      fo: "Front Desk Agent / Resepsionis",
      hk: "Room Attendant / Housekeeping",
      fnb: "Food & Beverage Service",
      sales: "Hotel Sales / Reservation"
    },
    levels: [
      {
        category: "Komunikasi & Pelayanan",
        leftBranch: [
          { label: "Grooming & Standar Penampilan", tag: "fo" },
          { label: "Hospitality English", tag: "fo" }
        ],
        rightBranch: [
          { label: "Handling Guest Complaints", tag: "fo" },
          { label: "Etiket Berkomunikasi", tag: "fo" }
        ],
        downBranch: [
          { label: "Kerja Sama Tim Antar Departemen", tag: "sales" }
        ]
      },
      {
        category: "Front Office Operations",
        leftBranch: [
          { label: "Prosedur Reservasi", tag: "sales" },
          { label: "Check-in & Check-out Process", tag: "fo" }
        ],
        rightBranch: [
          { label: "Penanganan Barang Bawaan (Bellboy)", tag: "fo" },
          { label: "Sistem Informasi Hotel (VHP)", tag: "fo" }
        ],
        downBranch: [
          { label: "Menyediakan Informasi Lokal", tag: "fo" }
        ]
      },
      {
        category: "Housekeeping",
        leftBranch: [
          { label: "Public Area Cleaning", tag: "hk" },
          { label: "Make Up Room Procedure", tag: "hk" }
        ],
        rightBranch: [
          { label: "Penataan Tempat Tidur (Bed Making)", tag: "hk" },
          { label: "Laundry & Linen Management", tag: "hk" }
        ],
        downBranch: [
          { label: "K3 Penggunaan Bahan Kimia", tag: "hk" }
        ]
      },
      {
        category: "F&B Service",
        leftBranch: [
          { label: "Pengenalan Peralatan Restoran", tag: "fnb" },
          { label: "Table Set-up", tag: "fnb" }
        ],
        rightBranch: [
          { label: "Prosedur Taking Order", tag: "fnb" },
          { label: "Membawa Tray & Menyajikan Makanan", tag: "fnb" }
        ]
      }
    ]
  },

  // 12. TEKNIK GAMBAR BANGUNAN (TGB) / DESAIN PEMODELAN
  tgb: {
    title: "Eksplorasi Desain Pemodelan & Informasi Bangunan",
    recommendations: {
      drafter: "Drafter Arsitektur",
      estimator: "Estimator Biaya (RAB)",
      struktur: "Drafter Struktur",
      interior: "3D Visualizer / Interior Drafter"
    },
    levels: [
      {
        category: "Dasar Gambar Teknik",
        leftBranch: [
          { label: "Penggunaan Alat Gambar Manual", tag: "drafter" },
          { label: "Proyeksi Ortogonal", tag: "drafter" }
        ],
        rightBranch: [
          { label: "Standar Garis & Skala", tag: "drafter" },
          { label: "Pemahaman Konstruksi Bangunan Dasar", tag: "struktur" }
        ],
        downBranch: [
          { label: "Gambar Denah Sederhana", tag: "drafter" }
        ]
      },
      {
        category: "Desain Arsitektur AutoCAD",
        leftBranch: [
          { label: "Perintah Dasar CAD", tag: "drafter" },
          { label: "Gambar Denah, Tampak & Potongan", tag: "drafter" }
        ],
        rightBranch: [
          { label: "Gambar Rencana Atap", tag: "drafter" },
          { label: "Pembuatan Block & Layering", tag: "drafter" }
        ],
        downBranch: [
          { label: "Cetak (Plotting) Skala Tepat", tag: "drafter" }
        ]
      },
      {
        category: "Pemodelan 3D (Sketchup / Revit)",
        leftBranch: [
          { label: "Modelling Eksterior", tag: "interior" },
          { label: "Modelling Interior", tag: "interior" }
        ],
        rightBranch: [
          { label: "Pemberian Material (Texturing)", tag: "interior" },
          { label: "Rendering (Enscape / V-Ray)", tag: "interior" }
        ],
        downBranch: [
          { label: "Konsep Building Information Modeling (BIM)", tag: "struktur" }
        ]
      },
      {
        category: "Struktur & Estimasi Biaya",
        leftBranch: [
          { label: "Gambar Detail Pondasi & Pembesian", tag: "struktur" },
          { label: "Gambar Utilitas (Mekanikal & Plumbing)", tag: "struktur" }
        ],
        rightBranch: [
          { label: "Perhitungan Volume Pekerjaan", tag: "estimator" },
          { label: "Penyusunan RAB (Rencana Anggaran Biaya)", tag: "estimator" }
        ]
      }
    ]
  }
};
