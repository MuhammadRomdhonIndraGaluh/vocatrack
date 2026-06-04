export interface MaterialContent {
  id: string;
  title: string;
  type: "video" | "pdf";
  url: string;
  duration?: string;
  pages?: number;
}

export interface MaterialTopic {
  id: string;
  topicTitle: string; // The parent topic/label in Roadmap
  iconType: "video" | "network" | "code" | "database" | "design" | "general";
  description: string;
  contents: MaterialContent[];
}

// Data Nyata Materi VocaTrack
export const realMaterials: Record<string, MaterialTopic> = {
  // RPL - Web Developer
  "HTML Dasar": {
    id: "html-dasar",
    topicTitle: "HTML Dasar",
    iconType: "code",
    description: "Mempelajari kerangka dasar penyusun website menggunakan HTML5.",
    contents: [
      { id: "materi-html-1", title: "Pengenalan HTML5", type: "video", url: "https://www.youtube.com/watch?v=NBZ9Ro6UKV8", duration: "25 Menit" },
      { id: "materi-html-2", title: "Struktur Dasar Dokumen HTML", type: "pdf", url: "https://www.w3schools.com/html/html_intro.asp", pages: 12 },
      { id: "materi-html-3", title: "Form, Table, dan Media di HTML", type: "video", url: "https://www.youtube.com/watch?v=1SnPKhCdlsU", duration: "40 Menit" }
    ]
  },
  "CSS Dasar": {
    id: "css-dasar",
    topicTitle: "CSS Dasar",
    iconType: "code",
    description: "Mempercantik dan mengatur layout HTML menggunakan Cascading Style Sheets.",
    contents: [
      { id: "materi-css-1", title: "Pengenalan CSS3 & Selector", type: "video", url: "https://www.youtube.com/watch?v=CleFk3BZB3g", duration: "30 Menit" },
      { id: "materi-css-2", title: "Panduan CSS Box Model", type: "pdf", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model", pages: 15 },
      { id: "materi-css-3", title: "Flexbox & Grid Layout", type: "video", url: "https://www.youtube.com/watch?v=-Wjp-x3aG5o", duration: "45 Menit" }
    ]
  },
  "JavaScript Dasar": {
    id: "javascript-dasar",
    topicTitle: "JavaScript Dasar",
    iconType: "code",
    description: "Membuat website interaktif dengan bahasa pemrograman JavaScript.",
    contents: [
      { id: "materi-js-1", title: "Variabel, Tipe Data & Operator", type: "video", url: "https://www.youtube.com/watch?v=RUTVea1mTCw", duration: "35 Menit" },
      { id: "materi-js-2", title: "Percabangan & Perulangan", type: "video", url: "https://www.youtube.com/watch?v=E-KW2Y4JcUM", duration: "38 Menit" },
      { id: "materi-js-3", title: "JavaScript DOM Manipulation", type: "pdf", url: "https://javascript.info/dom-nodes", pages: 20 }
    ]
  },
  "React JS": {
    id: "react-js",
    topicTitle: "React JS",
    iconType: "code",
    description: "Library JavaScript populer untuk membangun antarmuka pengguna interaktif.",
    contents: [
      { id: "materi-react-1", title: "Pengenalan React & Komponen", type: "video", url: "https://www.youtube.com/watch?v=5kHyviqsq1o", duration: "50 Menit" },
      { id: "materi-react-2", title: "State, Props & Hooks", type: "video", url: "https://www.youtube.com/watch?v=O6P86uwfdR0", duration: "45 Menit" },
      { id: "materi-react-3", title: "React Documentation", type: "pdf", url: "https://react.dev/learn", pages: 30 }
    ]
  },
  "Next.js": {
    id: "next-js",
    topicTitle: "Next.js",
    iconType: "code",
    description: "Framework React untuk produksi yang mendukung SSR dan SSG.",
    contents: [
      { id: "materi-next-1", title: "Next.js App Router Crash Course", type: "video", url: "https://www.youtube.com/watch?v=ZjAqacIC_3c", duration: "60 Menit" },
      { id: "materi-next-2", title: "Routing & Data Fetching di Next.js", type: "pdf", url: "https://nextjs.org/docs/app", pages: 25 }
    ]
  },
  "Git & GitHub": {
    id: "git-github",
    topicTitle: "Git & GitHub",
    iconType: "code",
    description: "Version Control System untuk kolaborasi pengembangan software.",
    contents: [
      { id: "materi-git-1", title: "Git Tutorial untuk Pemula", type: "video", url: "https://www.youtube.com/watch?v=lX9hcwDcQbc", duration: "35 Menit" },
      { id: "materi-git-2", title: "GitHub Collaboration Guide", type: "pdf", url: "https://docs.github.com/en/get-started", pages: 18 }
    ]
  },

  // TKJ - Network Engineer
  "Jaringan Dasar": {
    id: "jaringan-dasar",
    topicTitle: "Jaringan Dasar",
    iconType: "network",
    description: "Konsep dasar komputer, topologi, dan protokol jaringan komunikasi.",
    contents: [
      { id: "materi-net-1", title: "Pengenalan Topologi Jaringan", type: "video", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8", duration: "20 Menit" },
      { id: "materi-net-2", title: "OSI Layer dan TCP/IP Model", type: "pdf", url: "https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13769-5.html", pages: 14 }
    ]
  },
  "Subnetting & IP": {
    id: "subnetting-ip",
    topicTitle: "Subnetting & IP",
    iconType: "network",
    description: "Alokasi dan perhitungan alamat IP pada jaringan komputer.",
    contents: [
      { id: "materi-ip-1", title: "Cara Mudah Menghitung Subnetting IPv4", type: "video", url: "https://www.youtube.com/watch?v=BWZ-MHIhqjM", duration: "40 Menit" },
      { id: "materi-ip-2", title: "IPv4 vs IPv6", type: "pdf", url: "https://www.geeksforgeeks.org/differences-between-ipv4-and-ipv6/", pages: 10 }
    ]
  },
  "Routing Dasar": {
    id: "routing-dasar",
    topicTitle: "Routing Dasar",
    iconType: "network",
    description: "Menghubungkan antar jaringan yang berbeda dengan Router.",
    contents: [
      { id: "materi-rout-1", title: "Static Routing vs Dynamic Routing", type: "video", url: "https://www.youtube.com/watch?v=Qx35y6l5V_U", duration: "32 Menit" },
      { id: "materi-rout-2", title: "Konfigurasi Cisco Router Basic", type: "video", url: "https://www.youtube.com/watch?v=r9CgL-A_XUI", duration: "45 Menit" }
    ]
  }
};
export function getMaterialForTopic(topicName: string): MaterialTopic {
  // Pencarian case-insensitive dan cocok sebagian (includes)
  const normalizedTopic = topicName.toLowerCase().trim();
  
  const foundKey = Object.keys(realMaterials).find(key => 
    normalizedTopic.includes(key.toLowerCase()) || key.toLowerCase().includes(normalizedTopic)
  );
  
  if (foundKey) {
    return realMaterials[foundKey];
  }
  
  // Pemetaan Keyword ke Real Video URL & Real PDF URL
  const keywords = [
    { key: "html", video: "https://www.youtube.com/watch?v=kUMe1FH4CGY", pdf: "https://html.com/wp-content/uploads/html-cheat-sheet.pdf" },
    { key: "css", video: "https://www.youtube.com/watch?v=OXGznpKZ_sA", pdf: "https://html.com/wp-content/uploads/html-cheat-sheet.pdf" },
    { key: "javascript", video: "https://www.youtube.com/watch?v=W6NZfCO5SIk", pdf: "https://html.com/wp-content/uploads/html-cheat-sheet.pdf" },
    { key: "react", video: "https://www.youtube.com/watch?v=bMknfKXIFA8", pdf: "https://html.com/wp-content/uploads/html-cheat-sheet.pdf" },
    { key: "ui", video: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU", pdf: "https://html.com/wp-content/uploads/html-cheat-sheet.pdf" },
    { key: "ux", video: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU", pdf: "https://html.com/wp-content/uploads/html-cheat-sheet.pdf" },
    { key: "sql", video: "https://www.youtube.com/watch?v=HXV3zeQKqGY", pdf: "https://html.com/wp-content/uploads/html-cheat-sheet.pdf" },
    { key: "database", video: "https://www.youtube.com/watch?v=HXV3zeQKqGY", pdf: "https://html.com/wp-content/uploads/html-cheat-sheet.pdf" },
    { key: "network", video: "https://www.youtube.com/watch?v=qiQR5rTSshw", pdf: "https://html.com/wp-content/uploads/html-cheat-sheet.pdf" },
    { key: "cisco", video: "https://www.youtube.com/watch?v=qiQR5rTSshw", pdf: "https://html.com/wp-content/uploads/html-cheat-sheet.pdf" },
    { key: "mikrotik", video: "https://www.youtube.com/watch?v=qiQR5rTSshw", pdf: "https://html.com/wp-content/uploads/html-cheat-sheet.pdf" },
    { key: "linux", video: "https://www.youtube.com/watch?v=v_1aCZIGNCw", pdf: "https://html.com/wp-content/uploads/html-cheat-sheet.pdf" },
    { key: "git", video: "https://www.youtube.com/watch?v=8JJ101D3knE", pdf: "https://html.com/wp-content/uploads/html-cheat-sheet.pdf" }
  ];

  let videoUrl = "https://www.youtube.com/watch?v=zOjov-2OZ0E"; // Fallback: FreeCodeCamp CS50
  let pdfUrl = "https://developer.mozilla.org/en-US/docs/Web"; // Fallback: MDN Docs

  for (const k of keywords) {
    if (normalizedTopic.includes(k.key)) {
      videoUrl = k.video;
      pdfUrl = k.pdf;
      break;
    }
  }

  const safeTopicId = normalizedTopic.replace(/[^a-z0-9]/g, '-');
  
  return {
    id: `materi-${safeTopicId}`,
    topicTitle: topicName,
    iconType: "general",
    description: `Materi komprehensif mengenai ${topicName} untuk meningkatkan keahlian Anda secara praktis.`,
    contents: [
      { 
        id: `materi-${safeTopicId}-1`, 
        title: `Pengenalan Dasar: ${topicName}`, 
        type: "video", 
        url: videoUrl, 
        duration: "15 Menit" 
      },
      { 
        id: `materi-${safeTopicId}-2`, 
        title: `Struktur & Konsep Inti ${topicName}`, 
        type: "video", 
        url: videoUrl, 
        duration: "30 Menit" 
      },
      { 
        id: `materi-${safeTopicId}-3`, 
        title: `Modul PDF: ${topicName} Fundamentals`, 
        type: "pdf", 
        url: pdfUrl, 
        pages: 15 
      },
      { 
        id: `materi-${safeTopicId}-4`, 
        title: `Praktik Lanjutan & Studi Kasus ${topicName}`, 
        type: "video", 
        url: videoUrl, 
        duration: "45 Menit" 
      }
    ]
  };
}
