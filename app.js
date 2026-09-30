/* ========================================================================
   JAGAUDARA - MAIN JAVASCRIPT LOGIC (LENGKAP & REVISI TERUPDATE)
   Deskripsi: Logika interaktif untuk Navigasi, Peta, Form, Dashboard, Auth & Hologram.
   ======================================================================== */

// 1. Inisialisasi Ikon Lucide
if (window.lucide) lucide.createIcons();

// 2. Elemen DOM Navigasi Off-Canvas Drawer
const openBtn = document.getElementById('openMenuBtn');
const closeBtn = document.getElementById('closeMenuBtn');
const drawer = document.getElementById('sideDrawer');
const overlay = document.getElementById('menuOverlay');
const drawerLinks = document.querySelectorAll('.drawer-link');

function openDrawer() {
  if (overlay && drawer) {
    overlay.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.remove('opacity-0');
      drawer.classList.remove('translate-x-full');
    }, 10);
  }
}

function closeDrawer() {
  if (overlay && drawer) {
    drawer.classList.add('translate-x-full');
    overlay.classList.add('opacity-0');
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 300);
  }
}

if (openBtn) openBtn.addEventListener('click', openDrawer);
if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
if (overlay) overlay.addEventListener('click', closeDrawer);

// Map warna & style aktif untuk masing-masing menu
const menuStyles = {
  '#beranda': { text: 'text-emerald-400', bg: 'bg-emerald-950/60', border: 'border-emerald-800/50' },
  '#peta': { text: 'text-teal-400', bg: 'bg-teal-950/60', border: 'border-teal-800/50' },
  '#lapor': { text: 'text-red-400', bg: 'bg-red-950/60', border: 'border-red-800/50' },
  '#dashboard': { text: 'text-cyan-400', bg: 'bg-cyan-950/60', border: 'border-cyan-800/50' },
  '#kalkulator': { text: 'text-amber-400', bg: 'bg-amber-950/60', border: 'border-amber-800/50' },
  '#posko': { text: 'text-amber-400', bg: 'bg-amber-950/60', border: 'border-amber-800/50' },
  '#edukasi-ai': { text: 'text-blue-400', bg: 'bg-blue-950/60', border: 'border-blue-800/50' },
  '#donasi': { text: 'text-pink-400', bg: 'bg-pink-950/60', border: 'border-pink-800/50' }
};

drawerLinks.forEach(link => {
  link.addEventListener('click', function () {
    drawerLinks.forEach(item => {
      item.className = 'drawer-link flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-300 hover:bg-slate-800 transition';
    });

    const targetHash = this.getAttribute('href');
    const style = menuStyles[targetHash] || menuStyles['#beranda'];
    
    this.className = `drawer-link flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${style.text} ${style.bg} border ${style.border} transition`;

    closeDrawer();
  });
});

/* ========================================================================
   LOGIKA INTERAKTIF LOGIN AUTH, REGISTRASI, & PERUBAHAN TOMBOL NAVBAR
   ======================================================================== */

window.isUserLoggedIn = false;

function openLoginModal() {
  const authModal = document.getElementById('authModal');
  const profileDropdown = document.getElementById('profileDropdown');
  
  if (window.isUserLoggedIn) {
    if (profileDropdown) profileDropdown.classList.toggle('hidden');
  } else {
    if (authModal) {
      authModal.classList.remove('hidden');
      authModal.classList.add('flex');
      if (window.lucide) lucide.createIcons();
    }
  }
}

function closeLoginModal() {
  const authModal = document.getElementById('authModal');
  if (authModal) {
    authModal.classList.add('hidden');
    authModal.classList.remove('flex');
  }
}

// Simulasi Submit Form Login
function handleLoginSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('loginEmail') ? document.getElementById('loginEmail').value : 'Relawan';
  const name = emailInput.split('@')[0] || 'Ahmad Subagja';

  window.isUserLoggedIn = true;
  closeLoginModal();

  const openAuthBtn = document.getElementById('openAuthBtn');
  if (openAuthBtn) {
    openAuthBtn.className = "px-3 py-2 bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 rounded-xl text-xs font-bold transition backdrop-blur-md flex items-center gap-2 shadow-lg cursor-pointer";
    openAuthBtn.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      <span>Halo, ${name}</span>
      <i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>
    `;
  }

  const userNameProfile = document.getElementById('userNameProfile');
  const certUserName = document.getElementById('certUserName');
  if (userNameProfile) userNameProfile.textContent = name;
  if (certUserName) certUserName.textContent = name;

  if (window.lucide) lucide.createIcons();
  alert(`Selamat datang kembali, ${name}! Sesi Anda telah aktif sebagai Relawan BPBD.`);
}

// Modal Pendaftaran Relawan Baru (Revisi Poin 2)
function openRegisterModal() {
  closeLoginModal();
  const regModal = document.getElementById('registerModal');
  if (regModal) {
    regModal.classList.remove('hidden');
    regModal.classList.add('flex');
    if (window.lucide) lucide.createIcons();
  }
}

function closeRegisterModal() {
  const regModal = document.getElementById('registerModal');
  if (regModal) {
    regModal.classList.add('hidden');
    regModal.classList.remove('flex');
  }
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById('regName');
  const name = nameInput ? nameInput.value : 'Relawan Baru';
  alert(`🎉 Pendaftaran Berhasil! Selamat bergabung, ${name}. Silakan masuk ke akun Anda.`);
  closeRegisterModal();
  openLoginModal();
}

function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (input) {
    if (input.type === 'password') {
      input.type = 'text';
      if (icon) icon.setAttribute('data-lucide', 'eye-off');
    } else {
      input.type = 'password';
      if (icon) icon.setAttribute('data-lucide', 'eye');
    }
    if (window.lucide) lucide.createIcons();
  }
}

// Fungsi Logout
function handleLogout() {
  window.isUserLoggedIn = false;
  const profileDropdown = document.getElementById('profileDropdown');
  if (profileDropdown) profileDropdown.classList.add('hidden');

  const openAuthBtn = document.getElementById('openAuthBtn');
  if (openAuthBtn) {
    openAuthBtn.className = "px-3.5 py-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-emerald-500/50 rounded-xl text-xs font-semibold transition backdrop-blur-md flex items-center gap-2 shadow-sm active:scale-95 cursor-pointer";
    openAuthBtn.innerHTML = `
      <i data-lucide="user" class="w-4 h-4 text-emerald-400"></i>
      <span class="hidden sm:inline">Masuk / Daftar</span>
    `;
  }

  if (window.lucide) lucide.createIcons();
  alert("Anda telah keluar dari sesi relawan.");
}

// Modal Sertifikat & Profil Control
function openProfileModal() {
  const profileModal = document.getElementById('profileModal');
  if (profileModal) {
    profileModal.classList.remove('hidden');
    profileModal.classList.add('flex');
    if (window.lucide) lucide.createIcons();
  }
}

function closeProfileModal() {
  const profileModal = document.getElementById('profileModal');
  if (profileModal) {
    profileModal.classList.add('hidden');
    profileModal.classList.remove('flex');
  }
}

function openCertModal() {
  const certModal = document.getElementById('certificateModal');
  if (certModal) {
    certModal.classList.remove('hidden');
    certModal.classList.add('flex');
    if (window.lucide) lucide.createIcons();
  }
}

function closeCertModal() {
  const certModal = document.getElementById('certificateModal');
  if (certModal) {
    certModal.classList.add('hidden');
    certModal.classList.remove('flex');
  }
}

/* ========================================================================
   3. LOGIKA WIDGET KARTU PEMANTAUAN ISPU REAL-TIME
   ======================================================================== */

const ispuData = {
  banjarbaru: {
    location: "Banjarbaru, Kalimantan Selatan",
    value: 155,
    status: "TIDAK SEHAT (UNHEALTHY)",
    desc: "Kondisi udara berbahaya bagi kelompok rentan. Kurangi aktivitas luar ruangan dan gunakan masker N95.",
    bgClass: "bg-amber-950/40", borderClass: "border-amber-800/50", textClass: "text-amber-400", statusClass: "text-amber-300"
  },
  palangkaraya: {
    location: "Palangkaraya, Kalimantan Tengah",
    value: 210,
    status: "SANGAT TIDAK SEHAT",
    desc: "Kualitas udara sangat buruk. Hindari seluruh kegiatan di luar ruangan bagi semua kelompok usia.",
    bgClass: "bg-red-950/40", borderClass: "border-red-800/50", textClass: "text-red-400", statusClass: "text-red-300"
  },
  pontianak: {
    location: "Pontianak, Kalimantan Barat",
    value: 85,
    status: "SEDANG (MODERATE)",
    desc: "Kualitas udara masih dapat diterima, namun sensitif bagi kelompok penderita ISPA/Asma.",
    bgClass: "bg-yellow-950/40", borderClass: "border-yellow-800/50", textClass: "text-yellow-400", statusClass: "text-yellow-300"
  },
  samarinda: {
    location: "Samarinda, Kalimantan Timur",
    value: 42,
    status: "BAIK (GOOD)",
    desc: "Tingkat kualitas udara sangat baik, tidak memberikan dampak negatif bagi kesehatan.",
    bgClass: "bg-emerald-950/40", borderClass: "border-emerald-800/50", textClass: "text-emerald-400", statusClass: "text-emerald-300"
  }
};

const selectRegion = document.getElementById('selectRegion');
const ispuLocation = document.getElementById('ispuLocation');
const ispuValue = document.getElementById('ispuValue');
const ispuStatus = document.getElementById('ispuStatus');
const ispuDesc = document.getElementById('ispuDesc');
const ispuBox = document.getElementById('ispuBox');

function updateIspuWidget(key) {
  const data = ispuData[key];
  if (!data) return;

  if (ispuLocation) ispuLocation.textContent = data.location;
  if (ispuValue) ispuValue.textContent = data.value;
  if (ispuStatus) ispuStatus.textContent = data.status;
  if (ispuDesc) ispuDesc.textContent = data.desc;

  if (ispuBox) ispuBox.className = `py-3 text-center my-2 rounded-xl border transition-all duration-300 ${data.bgClass} ${data.borderClass}`;
  if (ispuValue) ispuValue.className = `text-3xl font-black tracking-tight ${data.textClass}`;
  if (ispuStatus) ispuStatus.className = `text-[10px] font-bold uppercase tracking-widest mt-1 ${data.statusClass}`;
}

if (selectRegion) {
  selectRegion.addEventListener('change', (e) => updateIspuWidget(e.target.value));
  updateIspuWidget(selectRegion.value);
}


/* ========================================================================
   INTEGRASI PETA INTERAKTIF GIS (ESRI MAP + FILTER 3 WARNA & PROVINSI KALIMANTAN)
   ======================================================================== */

let globalLeafletMap = null;

document.addEventListener('DOMContentLoaded', () => {
  const mapElement = document.getElementById('map');

  if (mapElement && window.L) {
    // 1. Inisialisasi Peta (Seluruh Pulau Kalimantan)
    globalLeafletMap = L.map('map', {
      zoomControl: true,
      attributionControl: true
    }).setView([-1.50, 114.00], 6);

    // 2. Tile Layer Esri World Street Map (Gratis)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      attribution: '&copy; Esri &mdash; Map data Kalimantan'
    }).addTo(globalLeafletMap);

    // 3. Data Dummy Titik Api / Hotspots (🔴 MERAH)
    const hotspotsData = [
      { name: "Titik Api Banjarbaru Ring I", coords: [-3.4428, 114.8392], confidence: "92%", info: "Lahan gambut Liang Anggang, Banjarbaru." },
      { name: "Titik Api Bati-Bati", coords: [-3.5500, 114.6500], confidence: "85%", info: "Semak belukar Bati-Bati, Tanah Laut." },
      { name: "Titik Api Sebangau", coords: [-2.2100, 113.9200], confidence: "96%", info: "Kawasan Taman Nasional Sebangau, Palangkaraya." },
      { name: "Titik Api Pulang Pisau", coords: [-2.5000, 113.5000], confidence: "88%", info: "Lahan gambut Pulang Pisau." }
    ];

    // 4. Data Dummy ISPU Tidak Sehat (🟡 KUNING)
    const ispuYellowData = [
      { name: "ISPU 155 - Banjarbaru (Kalsel)", coords: [-3.4400, 114.8300], ispu: 155, status: "Tidak Sehat", radius: 18000 },
      { name: "ISPU 210 - Palangkaraya (Kalteng)", coords: [-2.2100, 113.9200], ispu: 210, status: "Sangat Tidak Sehat", radius: 24000 },
      { name: "ISPU 140 - Tanah Laut (Kalsel)", coords: [-3.8000, 114.7700], ispu: 140, status: "Tidak Sehat (Rentan)", radius: 16000 }
    ];

    // 5. Data Dummy ISPU Sehat / Baik (🟢 HIJAU)
    const ispuGreenData = [
      { name: "ISPU 42 - Samarinda (Kaltim)", coords: [-0.5000, 117.1500], ispu: 42, status: "Baik", radius: 16000 },
      { name: "ISPU 38 - Balikpapan (Kaltim)", coords: [-1.2600, 116.8300], ispu: 38, status: "Baik", radius: 15000 },
      { name: "ISPU 65 - Pontianak (Kalbar)", coords: [-0.0200, 109.3400], ispu: 65, status: "Sedang", radius: 16000 },
      { name: "ISPU 25 - Tanjung Selor (Kaltara)", coords: [2.8300, 117.3600], ispu: 25, status: "Sangat Baik", radius: 18000 }
    ];

    // Buat Layer Groups Terpisah
    const hotspotGroup = L.layerGroup();
    const ispuYellowGroup = L.layerGroup();
    const ispuGreenGroup = L.layerGroup();

    // Render Marker Merah (Titik Api)
    hotspotsData.forEach(spot => {
      const marker = L.circleMarker(spot.coords, {
        color: '#ef4444',
        fillColor: '#f87171',
        fillOpacity: 0.9,
        radius: 8
      });
      marker.bindPopup(`
        <div style="font-family: sans-serif; padding: 2px;">
          <h3 style="font-weight: bold; color: #dc2626; margin-bottom: 4px;">🚨 ${spot.name}</h3>
          <p style="font-size: 11px; margin: 0;"><strong>Kepercayaan:</strong> ${spot.confidence}</p>
          <p style="font-size: 11px; margin: 4px 0 0 0; color: #475569;">${spot.info}</p>
        </div>
      `);
      hotspotGroup.addLayer(marker);
    });

    // Render Zona Kuning (ISPU Tidak Sehat)
    ispuYellowData.forEach(zone => {
      const circle = L.circle(zone.coords, {
        color: '#f59e0b',
        fillColor: '#fbbf24',
        fillOpacity: 0.45,
        radius: zone.radius
      });
      circle.bindPopup(`
        <div style="font-family: sans-serif; padding: 2px;">
          <h3 style="font-weight: bold; color: #d97706; margin-bottom: 4px;">🟡 ${zone.name}</h3>
          <p style="font-size: 11px; margin: 0;"><strong>Nilai ISPU:</strong> ${zone.ispu} (${zone.status})</p>
        </div>
      `);
      ispuYellowGroup.addLayer(circle);
    });

    // Render Zona Hijau (ISPU Sehat/Baik)
    ispuGreenData.forEach(zone => {
      const circle = L.circle(zone.coords, {
        color: '#10b981',
        fillColor: '#34d399',
        fillOpacity: 0.45,
        radius: zone.radius
      });
      circle.bindPopup(`
        <div style="font-family: sans-serif; padding: 2px;">
          <h3 style="font-weight: bold; color: #059669; margin-bottom: 4px;">🟢 ${zone.name}</h3>
          <p style="font-size: 11px; margin: 0;"><strong>Nilai ISPU:</strong> ${zone.ispu} (${zone.status})</p>
        </div>
      `);
      ispuGreenGroup.addLayer(circle);
    });

    // Tambahkan Semua Layer ke Peta Saat Awal Dimuat
    hotspotGroup.addTo(globalLeafletMap);
    ispuYellowGroup.addTo(globalLeafletMap);
    ispuGreenGroup.addTo(globalLeafletMap);

    // Event Listener 3 Tombol Filter Layer
    const toggleHotspotsBtn = document.getElementById('toggleHotspots');
    const toggleIspuYellowBtn = document.getElementById('toggleIspuYellow');
    const toggleIspuGreenBtn = document.getElementById('toggleIspuGreen');

    if (toggleHotspotsBtn) {
      toggleHotspotsBtn.addEventListener('click', () => {
        if (globalLeafletMap.hasLayer(hotspotGroup)) {
          globalLeafletMap.removeLayer(hotspotGroup);
          toggleHotspotsBtn.classList.add('opacity-40');
        } else {
          globalLeafletMap.addLayer(hotspotGroup);
          toggleHotspotsBtn.classList.remove('opacity-40');
        }
      });
    }

    if (toggleIspuYellowBtn) {
      toggleIspuYellowBtn.addEventListener('click', () => {
        if (globalLeafletMap.hasLayer(ispuYellowGroup)) {
          globalLeafletMap.removeLayer(ispuYellowGroup);
          toggleIspuYellowBtn.classList.add('opacity-40');
        } else {
          globalLeafletMap.addLayer(ispuYellowGroup);
          toggleIspuYellowBtn.classList.remove('opacity-40');
        }
      });
    }

    if (toggleIspuGreenBtn) {
      toggleIspuGreenBtn.addEventListener('click', () => {
        if (globalLeafletMap.hasLayer(ispuGreenGroup)) {
          globalLeafletMap.removeLayer(ispuGreenGroup);
          toggleIspuGreenBtn.classList.add('opacity-40');
        } else {
          globalLeafletMap.addLayer(ispuGreenGroup);
          toggleIspuGreenBtn.classList.remove('opacity-40');
        }
      });
    }
  }
});

// Fungsi Navigasi Fly To Provinsi Kalimantan
function flyToProvince(province) {
  if (!globalLeafletMap) return;

  const coordsMap = {
    kalsel: { coords: [-3.00, 115.30], zoom: 8 },  // Kalimantan Selatan
    kalteng: { coords: [-1.60, 113.50], zoom: 7 }, // Kalimantan Tengah
    kalbar: { coords: [-0.10, 111.00], zoom: 7 },  // Kalimantan Barat
    kaltim: { coords: [0.50, 116.50], zoom: 7 },   // Kalimantan Timur
    kaltara: { coords: [3.00, 116.00], zoom: 7 }   // Kalimantan Utara
  };

  if (coordsMap[province]) {
    globalLeafletMap.flyTo(coordsMap[province].coords, coordsMap[province].zoom, {
      duration: 1.6,
      easeLinearity: 0.25
    });
  }
}


/* ========================================================================
   5. LOGIKA FORM PELAPORAN KARHUTLA & GPS GEOLOCATION & LIVE PREVIEW FOTO
   ======================================================================== */

const getGpsBtn = document.getElementById('getGpsBtn');
const locationCoordsInput = document.getElementById('locationCoords');
const reportForm = document.getElementById('reportForm');

if (getGpsBtn && locationCoordsInput) {
  getGpsBtn.addEventListener('click', () => {
    if ("geolocation" in navigator) {
      getGpsBtn.disabled = true;
      getGpsBtn.innerHTML = `<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> <span>Mencari GPS...</span>`;
      if (window.lucide) lucide.createIcons();

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);
          locationCoordsInput.value = `${lat}, ${lng}`;
          
          getGpsBtn.disabled = false;
          getGpsBtn.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> <span>Lokasi Terkunci</span>`;
          if (window.lucide) lucide.createIcons();
        },
        (error) => {
          alert("Gagal mengambil lokasi. Pastikan izin GPS aktif di browser Anda.");
          getGpsBtn.disabled = false;
          getGpsBtn.innerHTML = `<i data-lucide="crosshair" class="w-4 h-4"></i> <span>Coba Lagi</span>`;
          if (window.lucide) lucide.createIcons();
        }
      );
    } else {
      alert("Browser Anda tidak mendukung fitur Geolocation.");
    }
  });
}

// Upload Foto & Live Preview
const photoInput = document.getElementById('reportPhotoInput');
const uploadPlaceholder = document.getElementById('uploadPlaceholder');
const previewContainer = document.getElementById('imagePreviewContainer');
const imagePreview = document.getElementById('imagePreview');
const fileName = document.getElementById('fileName');
const removePhotoBtn = document.getElementById('removePhotoBtn');

if (photoInput) {
  photoInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        if (imagePreview) imagePreview.src = event.target.result;
        if (fileName) fileName.textContent = file.name;
        if (uploadPlaceholder) uploadPlaceholder.classList.add('hidden');
        if (previewContainer) previewContainer.classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
      };
      reader.readAsDataURL(file);
    }
  });
}

if (removePhotoBtn) {
  removePhotoBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (photoInput) photoInput.value = '';
    if (imagePreview) imagePreview.src = '#';
    if (fileName) fileName.textContent = '';
    if (previewContainer) previewContainer.classList.add('hidden');
    if (uploadPlaceholder) uploadPlaceholder.classList.remove('hidden');
  });
}

if (reportForm) {
  reportForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("🚨 TERIMA KASIH! Laporan Karhutla Anda berhasil terkirim. Tim Reaksi Cepat Manggala Agni / BPBD terdekat sedang memverifikasi koordinat lokasi Anda.");
    reportForm.reset();
    if (getGpsBtn) {
      getGpsBtn.innerHTML = `<i data-lucide="crosshair" class="w-4 h-4"></i> <span>Ambil GPS Saya</span>`;
      if (window.lucide) lucide.createIcons();
    }
    if (previewContainer) previewContainer.classList.add('hidden');
    if (uploadPlaceholder) uploadPlaceholder.classList.remove('hidden');
  });
}

/* ========================================================================
   6. INTEGRASI DASHBOARD ANALITIK GRAPH (CHART.JS)
   ======================================================================== */

const trendCanvas = document.getElementById('trendChart');
const regionCanvas = document.getElementById('regionChart');
const calendarFilter1 = document.getElementById('calendarFilter1');
const calendarFilter2 = document.getElementById('calendarFilter2');

if (trendCanvas && regionCanvas && typeof Chart !== 'undefined') {
  Chart.defaults.color = '#cbd5e1';
  Chart.defaults.font.family = 'sans-serif';

  const monthLineDataMap = {
    '2026-09': { labels: ['Minggu 1 (Sep)', 'Minggu 2 (Sep)', 'Minggu 3 (Sep)', 'Minggu 4 (Sep)'], values: [38, 35, 36, 33] },
    '2026-08': { labels: ['Minggu 1 (Agu)', 'Minggu 2 (Agu)', 'Minggu 3 (Agu)', 'Minggu 4 (Agu)'], values: [48, 46, 45, 46] },
    '2026-07': { labels: ['Minggu 1 (Jul)', 'Minggu 2 (Jul)', 'Minggu 3 (Jul)', 'Minggu 4 (Jul)'], values: [50, 52, 58, 50] },
    'default': { labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'], values: [25, 30, 28, 22] }
  };

  const trendChart = new Chart(trendCanvas, {
    type: 'line',
    data: {
      labels: monthLineDataMap['2026-09'].labels,
      datasets: [{
        label: 'Jumlah Titik Api (Hotspot)',
        data: monthLineDataMap['2026-09'].values,
        borderColor: '#22c55e', 
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderWidth: 3, 
        fill: true, 
        tension: 0.4,
        pointBackgroundColor: '#4ade80', 
        pointBorderColor: '#15803d',
        pointRadius: 6, 
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true, 
      maintainAspectRatio: false,
      animation: { duration: 1200, easing: 'easeInOutQuart' },
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(255, 255, 255, 0.1)' } },
        y: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, beginAtZero: true }
      }
    }
  });

  if (calendarFilter1) {
    calendarFilter1.addEventListener('change', (e) => {
      const selectedMonth = e.target.value;
      const dataSet = monthLineDataMap[selectedMonth] || monthLineDataMap['default'];
      trendChart.data.labels = dataSet.labels;
      trendChart.data.datasets[0].data = dataSet.values;
      trendChart.update();
    });
  }

  const monthRegionDataMap = {
    '2026-09': [38, 28, 18, 11, 5],
    '2026-08': [45, 20, 22, 8, 5],
    '2026-07': [50, 25, 15, 7, 3]
  };

  function getRegionDataForMonth(monthStr) {
    if (monthRegionDataMap[monthStr]) return monthRegionDataMap[monthStr];
    let charCodeSum = 0;
    for (let i = 0; i < monthStr.length; i++) charCodeSum += monthStr.charCodeAt(i);
    const val1 = (charCodeSum % 35) + 15;
    const val2 = ((charCodeSum * 2) % 30) + 10;
    const val3 = ((charCodeSum * 3) % 25) + 10;
    const val4 = ((charCodeSum * 4) % 15) + 5;
    const val5 = Math.max(10, 3);
    return [val1, val2, val3, val4, val5];
  }

  const defaultRegionData = getRegionDataForMonth(calendarFilter2 ? calendarFilter2.value : '2026-09');

  const regionChart = new Chart(regionCanvas, {
    type: 'doughnut',
    data: {
      labels: ['Kalteng', 'Kalsel', 'Kalbar', 'Kaltim', 'Kaltara'],
      datasets: [{
        data: defaultRegionData,
        backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'],
        borderWidth: 2, 
        borderColor: '#0f172a'
      }]
    },
    options: {
      responsive: true, 
      maintainAspectRatio: false,
      animation: { duration: 1200, animateRotate: true, animateScale: true },
      plugins: {
        legend: { position: 'bottom', labels: { padding: 12, font: { size: 11 }, color: '#f1f5f9' } }
      }
    }
  });

  if (calendarFilter2) {
    calendarFilter2.addEventListener('change', (e) => {
      const selectedMonth = e.target.value;
      regionChart.data.datasets[0].data = getRegionDataForMonth(selectedMonth);
      regionChart.update();
    });
  }
}

/* ========================================================================
   LOGIKA KALKULATOR RISIKO & ROTASI FLIP INDIVIDUAL CARD EDUKASI
   ======================================================================== */

const btnCalculateRisk = document.getElementById('btnCalculateRisk');
const calcAge = document.getElementById('calcAge');
const calcDisease = document.getElementById('calcDisease');
const calcDuration = document.getElementById('calcDuration');
const riskTitle = document.getElementById('riskTitle');
const riskDesc = document.getElementById('riskDesc');

if (btnCalculateRisk) {
  btnCalculateRisk.addEventListener('click', () => {
    const age = calcAge.value;
    const disease = calcDisease.value;
    const duration = parseInt(calcDuration.value) || 1;

    let score = 0;
    if (age === 'balita' || age === 'lansia') score += 3;
    if (age === 'remaja') score += 1;
    if (disease === 'asma' || disease === 'jantung') score += 4;
    if (disease === 'ispa') score += 2;
    if (duration >= 5) score += 3;
    else if (duration >= 3) score += 2;

    if (score >= 6) {
      riskTitle.textContent = "Status Risiko: SANGAT TINGGI (BAHAYA KRITIS)";
      riskTitle.className = "text-xs font-bold text-red-400 mb-0.5";
      riskDesc.textContent = "Sangat disarankan untuk TIDAK beraktivitas di luar ruangan. Gunakan Air Purifier dan siapkan masker respirator N95.";
    } else if (score >= 3) {
      riskTitle.textContent = "Status Risiko: SEDANG - TINGGI (WASPADA ISPA)";
      riskTitle.className = "text-xs font-bold text-amber-400 mb-0.5";
      riskDesc.textContent = "Gunakan masker standar N95 saat beraktivitas dan kurangi olahraga di luar rumah.";
    } else {
      riskTitle.textContent = "Status Risiko: RENDAH - SEDANG";
      riskTitle.className = "text-xs font-bold text-emerald-400 mb-0.5";
      riskDesc.textContent = "Kondisi relatif aman, tetap siapkan masker pelindung asap untuk antisipasi.";
    }
  });
}

// Bank Data 30 Edukasi
const eduDatabase = [
  { title: "Gunakan Masker Standar N95 / KN95", desc: "Masker kain biasa tidak dapat menyaring partikel PM2.5. Pilih masker standar respirator N95." },
  { title: "Tutup Ventilasi & Gunakan Air Purifier", desc: "Tutup jendela dan gunakan pemurni udara berfilter HEPA saat indeks ISPU di atas 150." },
  { title: "Perbanyak Konsumsi Air Putih & Vitamin", desc: "Air putih menjaga kelembapan saluran napas untuk melarutkan debu halus yang masuk." },
  { title: "Hindari Olahraga Luar Ruangan saat Kabut", desc: "Aktivitas fisik berat meningkatkan laju pernapasan dan pasokan partikel asap terhirup." },
  { title: "Cuci Wajah & Bilas Mata Pasca Beraktivitas", desc: "Bilas mata dengan air bersih cair untuk menghilangkan partikel asam volatil sisa Karhutla." },
  { title: "Pasang Kain Basah pada Lubang Ventilasi", desc: "Jaluzies/lubang angin yang ditutup kain basah dapat menangkap jelaga asap masuk rumah." },
  { title: "Kenali Gejala Dini ISPA pada Anak", desc: "Waspadai batuk berdahak, napas cepat, dan demam. Segera konsultasikan ke fasilitas kesehatan." },
  { title: "Jangan Menambah Polusi Dalam Rumah", desc: "Hindari menyalakan lilin, obat nyamuk bakar, atau merokok di dalam ruangan tertutup." },
  { title: "Periksa Rutin Kondisi Filter AC Mobil", desc: "Gunakan mode sirkulasi dalam ruangan mobil (recirculation) agar asap luar tak masuk kabin." },
  { title: "Konsumsi Buah Antioksidan Tinggi", desc: "Jeruk, apel, dan beri membantu menetralkan radikal bebas akibat pajanan debu sisa pembakaran." },
  { title: "Gunakan Kacamata Pelindung (Goggles)", desc: "Lindungi konjungtiva mata dari iritasi asap gambut yang mengandung senyawa asam volatil." },
  { title: "Lindungi Makanan dari Paparan Abu", desc: "Tutup rapat sajian makanan dan minuman agar tidak terkontaminasi abu pembakaran lahan." },
  { title: "Rutin Memeriksa Nilai ISPU di JagaUdara", desc: "Pantau tren kualitas udara harian sebelum merencanakan aktivitas keluarga di luar rumah." },
  { title: "Sediakan Tabung Oksigen Portabel", desc: "Sangat dianjurkan bagi penderita asma kronis atau lansia untuk kondisi darurat kabut asap." },
  { title: "Tingkatkan Imunitas dengan Istirahat Cukup", desc: "Tidur 7-8 jam per hari membantu pembentukan sistem kekebalan tubuh melawan mikroba." },
  { title: "Simpan Nomor Posko Darurat BPBD/Manggala", desc: "Simpan nomor penting di daftar kontak cepat ponsel untuk merespons titik api secara presisi." },
  { title: "Hindari Penggunaan Lensa Kontak", desc: "Debu asap dapat tersangkut di bawah lensa kontak dan memicu kornea mata tergores." },
  { title: "Mandikan Hewan Peliharaan Secara Rutin", desc: "Bulu hewan peliharaan dapat menampung debu asap berbahaya yang terbawa masuk rumah." },
  { title: "Lakukan Pembilasan Hidung (Nasal Saline)", desc: "Gunakan cairan steril NaCl 0.9% untuk membersihkan kotoran asap dari rongga hidung." },
  { title: "Matikan Mesin Kendaraan Saat Berhenti", desc: "Mengurangi emisi gas buang tambahan yang memperburuk konsentrasi emisi lokal." },
  { title: "Pahami Perbedaan Masker Bedah & N95", desc: "Masker bedah melindungi percikan, sementara N95 menyaring hingga 95% partikel 0.3 mikron." },
  { title: "Siapkan Ruang Aman Asap di Rumah", desc: "Tentukan satu kamar khusus dengan ventilasi minimal dan air purifier sebagai tempat evakuasi." },
  { title: "Edukasi Anak Mengenai Bahaya Api", desc: "Ajar anak untuk tidak bermain korek api dan melapor jika melihat asap mengepul di semak." },
  { title: "Waspada Dehidrasi Akibat Udara Panas", desc: "Cuaca Karhutla memicu evaporasi cepat tubuh, minumlah air tanpa menunggu rasa haus." },
  { title: "Bantu Warga Lansia di Sekitar Anda", desc: "Pastikan tetangga lansia mendapatkan pasokan masker dan bantuan medis jika udara memburuk." },
  { title: "Gunakan Pakaian Lengan Panjang", desc: "Melindungi kulit dari kontak langsung dengan abu sisa pembakaran yang bersifat korosif." },
  { title: "Jangan Membakar Sampah Rumah Tangga", desc: "Pembakaran sampah mandiri memperparah indeks polusi lingkungan di tengah musibah asap." },
  { title: "Gunakan Nebulizer Sesuai Petunjuk Dokter", desc: "Penderita asma harus selalu menyiapkan inhaler/nebulizer aktif di dekat tempat tidur." },
  { title: "Dukung Gerakan Penanaman Pohon", desc: "Partisipasi dalam reboisasi membantu mengembalikan kelembapan alami ekosistem gambut." },
  { title: "Gunakan Fitur Pelaporan GPS JagaUdara", desc: "Kirim laporan presisi agar tim Manggala Agni dapat memadamkan api sebelum meluas." }
];

const flipCards = document.querySelectorAll('.flip-card');
const eduPointers = [0, 1, 2];
const isFlippedState = [false, false, false];

flipCards.forEach((card, slotIndex) => {
  card.addEventListener('click', () => {
    eduPointers[slotIndex] = (eduPointers[slotIndex] + 3) % eduDatabase.length;
    const newItem = eduDatabase[eduPointers[slotIndex]];
    const isFlipped = isFlippedState[slotIndex];

    if (!isFlipped) {
      const titleBack = document.getElementById(`eduTitleBack${slotIndex}`);
      const descBack = document.getElementById(`eduDescBack${slotIndex}`);
      if (titleBack) titleBack.textContent = newItem.title;
      if (descBack) descBack.textContent = newItem.desc;

      card.classList.add('is-flipped');
      isFlippedState[slotIndex] = true;
    } else {
      const titleFront = document.getElementById(`eduTitleFront${slotIndex}`);
      const descFront = document.getElementById(`eduDescFront${slotIndex}`);
      if (titleFront) titleFront.textContent = newItem.title;
      if (descFront) descFront.textContent = newItem.desc;

      card.classList.remove('is-flipped');
      isFlippedState[slotIndex] = false;
    }

    const eduCounterText = document.getElementById('eduCounterText');
    if (eduCounterText) {
      eduCounterText.textContent = `Edukasi ${eduPointers[slotIndex] + 1} dari 30`;
    }

    if (window.lucide) lucide.createIcons();
  });
});

/* ========================================================================
   LOGIKA INTERAKTIF TANYA AI KARHUTLA & MODAL DONASI
   ======================================================================== */

// Chatbot AI
const aiChatForm = document.getElementById('aiChatForm');
const aiInputMessage = document.getElementById('aiInputMessage');
const aiChatBox = document.getElementById('aiChatBox');
const aiPromptBtns = document.querySelectorAll('.ai-prompt-btn');

function getAiResponse(userMsg) {
  const msg = userMsg.toLowerCase();
  
  if (msg.includes('masker')) {
    return "Untuk paparan asap Karhutla, masker yang paling direkomendasikan adalah standar N95 atau KN95 karena mampu menyaring partikel PM2.5 hingga 95%. Masker kain biasa kurang efektif menyaring partikel asap mikroskopis.";
  } else if (msg.includes('ispa') || msg.includes('gejala') || msg.includes('balita')) {
    return "Gejala awal ISPA meliputi batuk, sesak napas, mata perih, dan demam. Pada balita, perhatikan jika laju napas menjadi cepat atau anak tampak lemas. Segera bawa ke posko kesehatan terdekat jika gejala memburuk.";
  } else if (msg.includes('bpbd') || msg.includes('kontak') || msg.includes('telepon')) {
    return "Kontak darurat bencana: Posko BPBD Kalsel di 0811-5000-911 dan Pemadam Manggala Agni di 113 / 1131. Anda juga dapat menggunakan fitur 'Laporkan Karhutla' di menu atas untuk mengirimkan koordinat lokasi api secara otomatis.";
  } else {
    return "Terima kasih atas pertanyaannya! Untuk perlindungan mandiri dari Karhutla, pastikan memakai masker N95 di luar rumah, kurangi aktivitas fisik berat, dan pantau terus nilai ISPU di platform JagaUdara.";
  }
}

function sendUserMessage(msgText) {
  if (!msgText.trim() || !aiChatBox) return;

  const userBubble = document.createElement('div');
  userBubble.className = 'flex gap-3 justify-end items-start';
  userBubble.innerHTML = `
    <div class="bg-blue-600 p-3.5 rounded-2xl rounded-tr-none text-xs text-white leading-relaxed max-w-[85%] shadow-md">
      ${msgText}
    </div>
  `;
  aiChatBox.appendChild(userBubble);

  if (aiInputMessage) aiInputMessage.value = '';
  aiChatBox.scrollTop = aiChatBox.scrollHeight;

  setTimeout(() => {
    const aiReply = getAiResponse(msgText);
    const aiBubble = document.createElement('div');
    aiBubble.className = 'flex gap-3 items-start';
    aiBubble.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white shadow-md">
        <i data-lucide="bot" class="w-4 h-4"></i>
      </div>
      <div class="bg-slate-800/80 p-3.5 rounded-2xl rounded-tl-none border border-slate-700/50 text-xs text-slate-200 leading-relaxed max-w-[85%]">
        ${aiReply}
      </div>
    `;
    aiChatBox.appendChild(aiBubble);
    aiChatBox.scrollTop = aiChatBox.scrollHeight;
    if (window.lucide) lucide.createIcons();
  }, 600);
}

if (aiChatForm) {
  aiChatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (aiInputMessage) sendUserMessage(aiInputMessage.value);
  });
}

aiPromptBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    sendUserMessage(btn.textContent.trim());
  });
});

// Modal Donasi
function openDonateModal(programName) {
  const modal = document.getElementById('donateModal');
  const modalTitle = document.getElementById('modalProgramTitle');
  if (modalTitle) modalTitle.textContent = `Donasi: ${programName}`;
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeDonateModal() {
  const modal = document.getElementById('donateModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function selectNominal(amount) {
  const customInput = document.getElementById('customNominal');
  if (customInput) customInput.value = amount;
}

function submitDonation() {
  const customInput = document.getElementById('customNominal');
  const amount = customInput ? customInput.value : 0;
  if (!amount || amount <= 0) {
    alert('Silakan pilih atau masukkan nominal donasi.');
    return;
  }
  alert(`💚 TERIMA KASIH! Donasi sebesar Rp ${parseInt(amount).toLocaleString('id-ID')} berhasil diproses. Dukungan Anda sangat berarti untuk pemulihan Kalimantan.`);
  closeDonateModal();
}

/* ========================================================================
   LOGIKA MODAL POP-UP PANDUAN PENGGUNA (ONBOARDING GUIDE)
   ======================================================================== */

const guideModal = document.getElementById('guideModal');
const openGuideBtn = document.getElementById('openGuideBtn');
const closeGuideBtn = document.getElementById('closeGuideBtn');
const startExploreBtn = document.getElementById('startExploreBtn');

function showGuideModal() {
  if (guideModal) {
    guideModal.classList.remove('hidden');
    guideModal.classList.add('flex');
    if (window.lucide) lucide.createIcons();
  }
}

function hideGuideModal() {
  if (guideModal) {
    guideModal.classList.add('hidden');
    guideModal.classList.remove('flex');
  }
}

if (openGuideBtn) openGuideBtn.addEventListener('click', showGuideModal);
if (closeGuideBtn) closeGuideBtn.addEventListener('click', hideGuideModal);
if (startExploreBtn) startExploreBtn.addEventListener('click', hideGuideModal);

if (guideModal) {
  guideModal.addEventListener('click', (e) => {
    if (e.target === guideModal) hideGuideModal();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const hasSeenGuide = localStorage.getItem('hasSeenJagaUdaraGuide');
  if (!hasSeenGuide) {
    setTimeout(showGuideModal, 800);
    localStorage.setItem('hasSeenJagaUdaraGuide', 'true');
  }
});

/* ========================================================================
   LOGIKA INTERAKTIF HOLOGRAM 3D ORBIT CAROUSEL & BUKA BERITA
   ======================================================================== */

const holoNewsItems = [
  {
    tag: "Banjarbaru, Kalsel",
    title: "Manggala Agni Padamkan 15 Ha Karhutla Ring I Bandara",
    date: "24 Sep 2026 • BPBD Kalsel",
    detail: "Tim gabungan Manggala Agni Daops Kalimantan bersama BPBD berhasil melokalisir kebakaran lahan seluas 15 hektar di kawasan Ring I Bandara Syamsudin Noor. Pemadaman dilakukan menggunakan helikopter water bombing dan sarana darat.",
    img: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=200&q=80"
  },
  {
    tag: "Palangkaraya, Kalteng",
    title: "ISPU Palangkaraya Membaik ke Status Sedang Hari Ini",
    date: "23 Sep 2026 • BMKG Kalteng",
    detail: "Indeks Standar Pencemar Udara (ISPU) di Palangkaraya menunjukkan penurunan signifikan dari angka 210 (Sangat Tidak Sehat) menjadi 85 (Sedang) setelah guyuran hujan buatan (TMC) selama dua hari berturut-turut.",
    img: "https://images.unsplash.com/photo-1511497584788-876761c119ee?auto=format&fit=crop&w=200&q=80"
  },
  {
    tag: "Tanah Laut, Kalsel",
    title: "Aksi Reboisasi 1.000 Bibit Pohon Endemik Pasca Kebakaran",
    date: "22 Sep 2026 • Komunitas Hijau",
    detail: "Ratusan relawan pemuda bersama Dinas Kehutanan melakukan aksi penanaman 1.000 bibit pohon ulin dan belangeran di lahan bekas terbakar untuk mengembalikan fungsi resapan air gambut.",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=200&q=80"
  }
];

let slotClasses = ['slot-front', 'slot-right', 'slot-left'];

const holoSlot0 = document.getElementById('holoSlot0');
const holoSlot1 = document.getElementById('holoSlot1');
const holoSlot2 = document.getElementById('holoSlot2');
const holoPrevBtn = document.getElementById('holoPrevBtn');
const holoNextBtn = document.getElementById('holoNextBtn');

function updateOrbitPositions() {
  if (holoSlot0) holoSlot0.className = `holo-card-slot ${slotClasses[0]} absolute w-full max-w-[290px] bg-slate-900/90 border border-teal-400/80 rounded-xl p-3 cursor-pointer backdrop-blur-md flex items-center gap-3`;
  if (holoSlot1) holoSlot1.className = `holo-card-slot ${slotClasses[1]} absolute w-full max-w-[290px] bg-slate-900/90 border border-teal-400/80 rounded-xl p-3 cursor-pointer backdrop-blur-md flex items-center gap-3`;
  if (holoSlot2) holoSlot2.className = `holo-card-slot ${slotClasses[2]} absolute w-full max-w-[290px] bg-slate-900/90 border border-teal-400/80 rounded-xl p-3 cursor-pointer backdrop-blur-md flex items-center gap-3`;
}

function rotateNext() {
  slotClasses.unshift(slotClasses.pop());
  updateOrbitPositions();
}

function rotatePrev() {
  slotClasses.push(slotClasses.shift());
  updateOrbitPositions();
}

if (holoNextBtn) holoNextBtn.addEventListener('click', rotateNext);
if (holoPrevBtn) holoPrevBtn.addEventListener('click', rotatePrev);

[holoSlot0, holoSlot1, holoSlot2].forEach((slot, index) => {
  if (slot) {
    slot.addEventListener('click', () => {
      if (slotClasses[index] === 'slot-front') {
        const item = holoNewsItems[index];
        alert(`📰 ${item.title.toUpperCase()}\n\n${item.detail}\n\nSumber: ${item.date}`);
      } else {
        rotateNext();
      }
    });
  }
});

/* ========================================================================
   LOGIKA JAM REAL-TIME HEADER HERO (WITA)
   ======================================================================== */
function updateClock() {
  const clockEl = document.getElementById('liveClock');
  if (clockEl) {
    const now = new Date();
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    clockEl.textContent = `${now.toLocaleDateString('id-ID', options)} WITA`;
  }
}

updateClock();
setInterval(updateClock, 1000);

/* ========================================================================
   ANIMASI TYPEWRITER (MENGETIK & MENGHAPUS) INFO BOX PELAPORAN
   ======================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Daftar Variasi Pesan Edukasi / Imbauan
  const messages = [
    {
      title: "Mari Bersama Menjaga Habitat Kalimantan",
      desc: "Kebakaran hutan tidak hanya merugikan manusia, tetapi juga menghancurkan kehidupan satwa endemik. Mari saling menjaga demi kelestarian oksigen dan masa depan bumi kita."
    },
    {
      title: "Lindungi Satwa Endemik dari Ancaman Kepunahan",
      desc: "Orangutan, Bekantan, dan Burung Enggang kehilangan tempat tinggal akibat asap dan api. Laporkan titik api sekecil apa pun untuk menyelamatkan mereka."
    },
    {
      title: "Satu Laporan Anda, Menyelamatkan Ratusan Hektar Hutan",
      desc: "Partisipasi aktif masyarakat adalah kunci utama percepatan respons tim pemadam BPBD & Manggala Agni di lapangan."
    },
    {
      title: "Stop Pembakaran Lahan Secara Sembarangan",
      desc: "Mari ciptakan kualitas udara (ISPU) yang sehat dan bebas dari bahaya ISPA bagi anak-anak serta generasi masa depan Kalimantan."
    }
  ];

  const titleEl = document.getElementById('typedTitle');
  const descEl = document.getElementById('typedDesc');

  if (titleEl && descEl) {
    let msgIndex = 0;
    let charIndexTitle = messages[0].title.length;
    let charIndexDesc = messages[0].desc.length;
    let isDeleting = false;

    function typeEffect() {
      const currentMsg = messages[msgIndex];

      if (isDeleting) {
        // Efek Menghapus (Lebih Cepat)
        if (charIndexDesc > 0) {
          charIndexDesc--;
          descEl.textContent = currentMsg.desc.substring(0, charIndexDesc);
        } else if (charIndexTitle > 0) {
          charIndexTitle--;
          titleEl.textContent = currentMsg.title.substring(0, charIndexTitle);
        }

        // Jika Sudah Terhapus Semua, Pindah ke Pesan Berikutnya
        if (charIndexTitle === 0 && charIndexDesc === 0) {
          isDeleting = false;
          msgIndex = (msgIndex + 1) % messages.length;
          setTimeout(typeEffect, 500); // Tahan sebentar sebelum mengetik lagi
          return;
        }
      } else {
        // Efek Mengetik
        if (charIndexTitle < currentMsg.title.length) {
          charIndexTitle++;
          titleEl.textContent = currentMsg.title.substring(0, charIndexTitle);
        } else if (charIndexDesc < currentMsg.desc.length) {
          charIndexDesc++;
          descEl.textContent = currentMsg.desc.substring(0, charIndexDesc);
        }

        // Jika Selesai Mengetik Seluruh Teks, Tunggu 60 Detik (1 Menit)
        if (charIndexTitle === currentMsg.title.length && charIndexDesc === currentMsg.desc.length) {
          isDeleting = true;
          setTimeout(typeEffect, 60000); // 60.000 ms = 1 Menit
          return;
        }
      }

      // Kecepatan Mengetik vs Menghapus
      const speed = isDeleting ? 15 : 30; 
      setTimeout(typeEffect, speed);
    }

    // Jalankan Timer
    setTimeout(typeEffect, 60000);
  }
});

/* ========================================================================
   LOGIC INTERAKTIF TYPEWRITER RELAWAN (BERUBAH SAAT CARD DIKLIK)
   ======================================================================== */

// Data Konten Program Relawan
const volunteerPrograms = [
  {
    tag: "TIM LAPANGAN BPBD & MANGGALA AGNI",
    title: "Pemadaman Gambut & Posko Siaga Karhutla",
    desc: "Bergabunglah langsung bersama tim gabungan dalam pemadaman titik api di kawasan lahan gambut serta membantu distribusi air dan logistik posko siaga bencana.",
    req: "• Usia minimal 18 tahun & sehat jasmani.\n• Bersedia ditempatkan di posko lapangan Kalimantan (Kalsel/Kalteng).\n• Fasilitas: Perlengkapan APD Safety, Konsumsi Lapangan, & Sertifikat Digital.",
    status: "Pendaftaran Dibuka (Sisa 15 Kuota)"
  },
  {
    tag: "KESEHATAN WARGA & BANTUAN ISPA",
    title: "Pembagian Masker N95 & Edukasi Kualitas Udara",
    desc: "Turut serta membagikan paket kesehatan dan masker N95 kepada kelompok rentan (anak-anak & lansia) serta mengedukasi warga terkait pencegahan penyakit ISPA.",
    req: "• Terbuka untuk umum / mahasiswa medis & non-medis.\n• Komunikatif & ramah dalam berinteraksi dengan masyarakat.\n• Fasilitas: Seragam Relawan, Masker Kit, & Sertifikat Kontribusi 12 Jam.",
    status: "Pendaftaran Dibuka (Sisa 8 Kuota)"
  },
  {
    tag: "KONSERVASI ALAM & HABITAT SATWA",
    title: "Penanaman 1.000 Pohon Ulin & Gambut",
    desc: "Aksi hijau reboisasi lahan bekas terbakar untuk memulihkan habitat satwa endemik Kalimantan seperti Orangutan dan Bekantan.",
    req: "• Pecinta alam & peduli kelestarian lingkungan.\n• Pelaksanaan setiap akhir pekan di area konservasi.\n• Fasilitas: Bibit Pohon, Alat Tanam, Transportasi Lokal, & Sertifikat Digital.",
    status: "Pendaftaran Dibuka (Sisa 25 Kuota)"
  }
];

let currentVolIndex = 0;
let isVolAnimating = false;

function selectVolProgram(index) {
  if (isVolAnimating || currentVolIndex === index) return;
  isVolAnimating = true;

  // 1. Highlight Card yang Aktif di Sisi Kiri
  const cards = document.querySelectorAll('.vol-holo-card');
  cards.forEach((card, i) => {
    if (i === index) {
      card.className = "vol-holo-card cursor-pointer p-3.5 rounded-2xl bg-slate-900/90 border-2 border-teal-400 text-white transition-all duration-300 shadow-[0_0_20px_rgba(45,212,191,0.25)] flex items-center gap-3.5";
    } else {
      card.className = "vol-holo-card cursor-pointer p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-teal-500/50 text-slate-300 transition-all duration-300 flex items-center gap-3.5";
    }
  });

  const titleEl = document.getElementById('volDetailTitle');
  const descEl = document.getElementById('volDetailDesc');
  const reqEl = document.getElementById('volDetailReq');
  const tagEl = document.getElementById('volDetailTag');
  const statusEl = document.getElementById('volDetailStatus');

  const newProg = volunteerPrograms[index];

  // 2. Animasi Menghapus (Backspacing)
  let currentTitle = titleEl.textContent;
  let currentDesc = descEl.textContent;

  function eraseText(callback) {
    let titleLen = currentTitle.length;
    let descLen = currentDesc.length;

    const eraseInterval = setInterval(() => {
      let doneDesc = false;
      let doneTitle = false;

      if (descLen > 0) {
        descLen -= 3;
        if (descLen < 0) descLen = 0;
        descEl.textContent = currentDesc.substring(0, descLen);
      } else {
        doneDesc = true;
      }

      if (doneDesc && titleLen > 0) {
        titleLen -= 2;
        if (titleLen < 0) titleLen = 0;
        titleEl.textContent = currentTitle.substring(0, titleLen);
      } else if (doneDesc) {
        doneTitle = true;
      }

      if (doneDesc && doneTitle) {
        clearInterval(eraseInterval);
        callback();
      }
    }, 15);
  }

  // 3. Animasi Mengetik Teks Baru
  function typeNewText() {
    tagEl.textContent = newProg.tag;
    statusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> ${newProg.status}`;
    reqEl.innerText = newProg.req;

    let targetTitle = newProg.title;
    let targetDesc = newProg.desc;
    let titleI = 0;
    let descI = 0;

    const typeInterval = setInterval(() => {
      if (titleI < targetTitle.length) {
        titleI++;
        titleEl.textContent = targetTitle.substring(0, titleI);
      } else if (descI < targetDesc.length) {
        descI += 2;
        if (descI > targetDesc.length) descI = targetDesc.length;
        descEl.textContent = targetDesc.substring(0, descI);
      } else {
        clearInterval(typeInterval);
        currentVolIndex = index;
        isVolAnimating = false;
      }
    }, 20);
  }

  // Jalankan Rangkaian Animasi
  eraseText(typeNewText);
} 

// Fungsi Buka Modal Pendaftaran Relawan
function openVolunteerModal() {
  const volModal = document.getElementById('volunteerRegisterModal');
  if (volModal) {
    volModal.classList.remove('hidden');
  }
}

// Fungsi Tutup Modal Pendaftaran
function closeVolunteerModal() {
  const volModal = document.getElementById('volunteerRegisterModal');
  if (volModal) {
    volModal.classList.add('hidden');
  }
}

// Data default jika dibuka sebagai Founder/Admin (Mikola)
const defaultUser = {
  name: "Mikola",
  role: "Founder & Lead Developer JagaUdara",
  regID: "JU-2026/FND-001",
  region: "Kalimantan",
  initials: "MK"
};

// Fungsi memperbarui isi modal profil secara dinamis
function renderProfileModal(data) {
  const nameEl = document.getElementById('modalProfName');
  const roleEl = document.getElementById('modalProfRole');
  const regEl = document.getElementById('modalProfReg');
  const initialsEl = document.getElementById('modalProfInitials');

  if (nameEl) nameEl.textContent = data.name;
  if (roleEl) roleEl.textContent = data.role;
  if (regEl) regEl.textContent = `ID Reg: ${data.regID} • Wilayah ${data.region}`;
  if (initialsEl) initialsEl.textContent = data.initials;
}

// Fungsi Buka Modal Profil
function openProfileModal() {
  const profileModal = document.getElementById('profileModal');
  if (profileModal) {
    // Cek apakah ada data relawan yang baru saja mendaftar
    const savedUser = localStorage.getItem('jagaUdaraActiveUser');
    if (savedUser) {
      renderProfileModal(JSON.parse(savedUser));
    } else {
      renderProfileModal(defaultUser); // Tampilkan Mikola jika belum ada pendaftar baru
    }
    
    profileModal.classList.remove('hidden');
    profileModal.classList.add('flex');
  }
}

// Fungsi Tutup Modal Profil
function closeProfileModal() {
  const profileModal = document.getElementById('profileModal');
  if (profileModal) {
    profileModal.classList.add('hidden');
    profileModal.classList.remove('flex');
  }
}
