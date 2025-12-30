import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar'; // Import your existing Navbar component
import {
  FaTruckLoading,
  FaUsers,
  FaWifi,
  FaUserSlash,
  FaCheckCircle,
  FaArrowUp,
  FaArrowDown,
  FaSearch,
  FaPlus,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaMapMarkerAlt,
  FaPhone,
  FaComment,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkedAlt
} from 'react-icons/fa';
import Footer from './Footer/Footer'
// Driver Card Component
const DriverCard = ({ driver, onViewDetails, onCall, onMessage, onAssign }) => {
  const statusColors = {
    online: { bg: 'bg-green-500', text: 'Online' },
    offline: { bg: 'bg-gray-400', text: 'Offline' },
    busy: { bg: 'bg-yellow-500', text: 'Band' }
  };

  const status = statusColors[driver.status] || statusColors.offline;

  const formatEarnings = (earnings) => {
    if (earnings >= 1000000) return (earnings / 1000000).toFixed(1) + 'M';
    if (earnings >= 1000) return (earnings / 1000).toFixed(1) + 'K';
    return earnings.toString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} kun oldin`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} oy oldin`;
    return `${Math.floor(diffDays / 365)} yil oldin`;
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400 w-3 h-3" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 w-3 h-3" />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <FaRegStar key={i} className="text-yellow-400 w-3 h-3" />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden cursor-pointer" onClick={() => onViewDetails(driver)}>
      {driver.featured && (
        <div className="absolute top-4 right-4 bg-linear-to-r from-blue-600 to-purple-700 text-white text-xs font-semibold py-1 px-3 rounded-xl z-10">Featured</div>
      )}
      <div className="p-6 border-b border-gray-100 flex items-start gap-4">
        <div className="relative">
          <div className="w-20 h-20 bg-linear-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-sm">
            {driver.name.charAt(0)}
          </div>
          <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white ${status.bg}`} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-gray-900">{driver.name}</h3>
            {driver.verified && (
              <FaCheckCircle className="text-green-500 w-4 h-4" title="Tasdiqlangan" />
            )}
          </div>
          
          <div className="flex items-center gap-1 mb-2">
            {renderStars(driver.rating)}
            <span className="font-semibold text-gray-900 ml-1">{driver.rating}</span>
            <span className="text-xs text-gray-500">({driver.ratingCount})</span>
          </div>
          
          <div className="font-mono text-sm text-gray-500 mb-2">{driver.id}</div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaMapMarkerAlt className="text-blue-600 w-3 h-3" />
            {driver.location}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Telefon</div>
            <div className="font-semibold text-gray-900 font-mono">{driver.phone}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Transport</div>
            <div className="font-semibold text-gray-900">{driver.vehicle.type}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Roʻyxatdan oʻtgan</div>
            <div className="font-semibold text-gray-900">{formatDate(driver.joined)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Holat</div>
            <div className="font-semibold text-gray-900">{status.text}</div>
          </div>
        </div>
        
        <div className="h-48 bg-linear-to-br from-cyan-50 to-blue-100 rounded-xl mt-4 relative">
          <div
            className="absolute w-6 h-6 bg-blue-600 rounded-full border-3 border-white shadow-md"
            style={{ top: `${driver.coordinates.y}%`, left: `${driver.coordinates.x}%` }}
          >
            <div className="absolute w-2 h-2 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-gray-600">
            <div className="text-center">
              <FaMapMarkedAlt className="text-4xl mb-2 mx-auto" />
              <div>Real vaqtda joylashuv</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 grid grid-cols-3 gap-4 text-center bg-gray-50">
        <div>
          <div className="text-xl font-bold text-blue-600">{driver.stats.completed}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">Yakunlangan</div>
        </div>
        <div>
          <div className="text-xl font-bold text-blue-600">{driver.stats.active}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">Faol</div>
        </div>
        <div>
          <div className="text-xl font-bold text-blue-600">{formatEarnings(driver.stats.earnings)}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">Daromad</div>
        </div>
      </div>
      
      <div className="p-4 flex gap-3">
        <button
          className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold text-sm text-gray-700 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all flex items-center justify-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onCall(driver);
          }}
        >
          <FaPhone className="w-4 h-4" />
          Qo'ng'iroq
        </button>
        <button
          className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold text-sm text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all flex items-center justify-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onMessage(driver);
          }}
        >
          <FaComment className="w-4 h-4" />
          Xabar
        </button>
        <button
          className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold text-sm text-gray-700 hover:bg-purple-700 hover:text-white hover:border-purple-700 transition-all flex items-center justify-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onAssign(driver);
          }}
        >
          <FaTruckLoading className="w-4 h-4" />
          Yuk
        </button>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, trend, trendUp, icon: Icon, gradient }) => (
  <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:-translate-y-1 transition-transform relative overflow-hidden">
    <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${gradient}`} />
    <div className="flex items-center justify-between mb-3">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        gradient.includes('blue') ? 'bg-blue-50 text-blue-600' :
        gradient.includes('cyan') ? 'bg-cyan-50 text-cyan-400' :
        gradient.includes('yellow') ? 'bg-yellow-50 text-yellow-500' :
        'bg-purple-50 text-purple-700'
      }`}>
        <Icon className="text-xl" />
      </div>
      <span className={`${
        trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
      } text-sm font-semibold py-1 px-3 rounded-full flex items-center gap-1`}>
        {trendUp ? <FaArrowUp /> : <FaArrowDown />}
        {trend}
      </span>
    </div>
    <div className="text-4xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm text-gray-500">{title}</div>
  </div>
);

// Tab Component
const Tab = ({ id, label, badge, active, onClick }) => (
  <button
    className={`relative py-4 px-6 font-medium whitespace-nowrap border-b-2 transition-colors ${
      active ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'
    }`}
    onClick={() => onClick(id)}
  >
    {label}
    {badge && (
      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
        {badge}
      </span>
    )}
  </button>
);

// Modal Component
const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
          <button 
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-all"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="p-6">{children}</div>
        
        {footer && <div className="p-6 border-t border-gray-100">{footer}</div>}
      </div>
    </div>
  );
};

// Main Component
const YukUzDrivers = () => {
  const drivers = [
    {
      id: "DRV-001",
      name: "John Doe",
      phone: "+99890 123 45 67",
      email: "john.doe@example.com",
      status: "online",
      verified: true,
      rating: 4.8,
      ratingCount: 124,
      location: "Toshkent, Yunusobod",
      vehicle: { type: "Yuk mashinasi", model: "MAN TGS", number: "01 A 123 AA", capacity: "20 tonna", year: 2022 },
      stats: { completed: 89, active: 1, cancelled: 2, earnings: 12500000 },
      joined: "2023-03-15",
      featured: true,
      coordinates: { x: 30, y: 40 }
    },
    {
      id: "DRV-002",
      name: "Ali Valiyev",
      phone: "+99890 234 56 78",
      email: "ali.valiyev@example.com",
      status: "busy",
      verified: true,
      rating: 4.5,
      ratingCount: 87,
      location: "Samarqand, Registon",
      vehicle: { type: "Refrijerator", model: "Isuzu NPR", number: "30 B 456 BB", capacity: "8 tonna", year: 2021 },
      stats: { completed: 67, active: 1, cancelled: 3, earnings: 9800000 },
      joined: "2023-05-20",
      featured: false,
      coordinates: { x: 60, y: 70 }
    },
    {
      id: "DRV-003",
      name: "Hasan Husanov",
      phone: "+99890 345 67 89",
      email: "hasan.husanov@example.com",
      status: "online",
      verified: true,
      rating: 4.9,
      ratingCount: 156,
      location: "Farg'ona, Markaz",
      vehicle: { type: "Yuk mashinasi", model: "Kamaz 6520", number: "40 C 789 CC", capacity: "15 tonna", year: 2020 },
      stats: { completed: 112, active: 0, cancelled: 1, earnings: 16800000 },
      joined: "2022-11-10",
      featured: true,
      coordinates: { x: 20, y: 80 }
    },
    {
      id: "DRV-004",
      name: "Sherzod Qodirov",
      phone: "+99890 456 78 90",
      email: "sherzod.qodirov@example.com",
      status: "offline",
      verified: true,
      rating: 4.7,
      ratingCount: 92,
      location: "Buxoro, Eski shahar",
      vehicle: { type: "Furgon", model: "Mercedes Sprinter", number: "80 D 012 DD", capacity: "3 tonna", year: 2023 },
      stats: { completed: 45, active: 0, cancelled: 5, earnings: 6700000 },
      joined: "2024-01-05",
      featured: false,
      coordinates: { x: 50, y: 20 }
    },
    {
      id: "DRV-005",
      name: "Akmal Jobirov",
      phone: "+99890 567 89 01",
      email: "akmal.jobirov@example.com",
      status: "online",
      verified: false,
      rating: 4.6,
      ratingCount: 78,
      location: "Andijon, Avtovokzal",
      vehicle: { type: "Pikap", model: "Toyota Hilux", number: "50 E 345 EE", capacity: "1.5 tonna", year: 2021 },
      stats: { completed: 34, active: 1, cancelled: 2, earnings: 5100000 },
      joined: "2024-02-28",
      featured: false,
      coordinates: { x: 70, y: 60 }
    },
    {
      id: "DRV-006",
      name: "Bekzod Nurmatov",
      phone: "+99890 678 90 12",
      email: "bekzod.nurmatov@example.com",
      status: "busy",
      verified: true,
      rating: 4.4,
      ratingCount: 56,
      location: "Namangan, Chust",
      vehicle: { type: "Yuk mashinasi", model: "Volvo FH", number: "60 F 678 FF", capacity: "25 tonna", year: 2022 },
      stats: { completed: 78, active: 1, cancelled: 4, earnings: 11700000 },
      joined: "2023-08-12",
      featured: true,
      coordinates: { x: 40, y: 30 }
    },
    {
      id: "DRV-007",
      name: "Javohir Sattorov",
      phone: "+99890 789 01 23",
      email: "javohir.sattorov@example.com",
      status: "online",
      verified: true,
      rating: 4.3,
      ratingCount: 45,
      location: "Qarshi, Markaz",
      vehicle: { type: "Furgon", model: "Ford Transit", number: "70 G 901 GG", capacity: "2.5 tonna", year: 2020 },
      stats: { completed: 23, active: 0, cancelled: 1, earnings: 3450000 },
      joined: "2024-03-10",
      featured: false,
      coordinates: { x: 80, y: 90 }
    },
    {
      id: "DRV-008",
      name: "Dilshod Rajabov",
      phone: "+99890 890 12 34",
      email: "dilshod.rajabov@example.com",
      status: "offline",
      verified: false,
      rating: 4.8,
      ratingCount: 112,
      location: "Navoiy, Zarafshon",
      vehicle: { type: "Refrijerator", model: "Hyundai HD78", number: "90 H 234 HH", capacity: "5 tonna", year: 2023 },
      stats: { completed: 91, active: 0, cancelled: 3, earnings: 13650000 },
      joined: "2023-12-01",
      featured: false,
      coordinates: { x: 10, y: 50 }
    },
    {
      id: "DRV-009",
      name: "Rustam Karimov",
      phone: "+99890 901 23 45",
      email: "rustam.karimov@example.com",
      status: "online",
      verified: true,
      rating: 4.9,
      ratingCount: 189,
      location: "Termiz, Markaz",
      vehicle: { type: "Yuk mashinasi", model: "Scania R450", number: "01 I 567 II", capacity: "30 tonna", year: 2021 },
      stats: { completed: 134, active: 0, cancelled: 2, earnings: 20100000 },
      joined: "2022-07-15",
      featured: true,
      coordinates: { x: 90, y: 10 }
    }
  ];

  const [filteredDrivers, setFilteredDrivers] = useState(drivers);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'all', vehicle: 'all', rating: 'all' });
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loadSelect, setLoadSelect] = useState('');

  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDrivers = filteredDrivers.slice(startIndex, startIndex + itemsPerPage);

  // Stats calculation
  const stats = {
    total: drivers.length,
    online: drivers.filter(d => d.status === 'online').length,
    offline: drivers.filter(d => d.status === 'offline').length,
    verified: drivers.filter(d => d.verified).length
  };

  // Filter drivers
  useEffect(() => {
    let result = drivers.filter(driver => {
      // Search
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        if (!(
          driver.id.toLowerCase().includes(term) ||
          driver.name.toLowerCase().includes(term) ||
          driver.phone.includes(term) ||
          driver.email.toLowerCase().includes(term) ||
          driver.location.toLowerCase().includes(term)
        )) return false;
      }

      // Status filter
      if (filters.status !== 'all' && driver.status !== filters.status) return false;

      // Vehicle filter
      if (filters.vehicle !== 'all') {
        const vehicleType = driver.vehicle.type.toLowerCase();
        const filterType = filters.vehicle.toLowerCase();
        if (filterType === 'truck' && !vehicleType.includes('yuk')) return false;
        if (filterType === 'van' && !vehicleType.includes('furgon')) return false;
        if (filterType === 'pickup' && !vehicleType.includes('pikap')) return false;
        if (filterType === 'refrigerator' && !vehicleType.includes('refrijerator')) return false;
      }

      // Rating filter
      if (filters.rating !== 'all' && driver.rating < parseInt(filters.rating)) return false;

      // Tab filter
      switch(activeTab) {
        case 'online': return driver.status === 'online';
        case 'verified': return driver.verified;
        case 'available': return driver.status === 'online' && driver.stats.active === 0;
        case 'top': return driver.rating >= 4.7;
        case 'new':
          const diffDays = Math.floor((new Date() - new Date(driver.joined)) / (1000 * 60 * 60 * 24));
          return diffDays <= 30;
        default: return true;
      }
    });

    setFilteredDrivers(result);
    setCurrentPage(1);
  }, [searchTerm, filters, activeTab]);

  // Event handlers
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCall = (driver) => {
    showNotification(`"${driver.name}" ga qo'ng'iroq qilinmoqda: ${driver.phone}`, 'success');
  };

  const handleMessage = (driver) => {
    const message = prompt(`${driver.name} ga xabar yozing:`, "Salom, yuk haqida gaplashamizmi?");
    if (message) {
      showNotification(`"${driver.name}" ga xabar yuborildi: "${message}"`, 'success');
    }
  };

  const handleAddDriver = () => {
    showNotification("Yangi haydovchi qo'shildi!", 'success');
  };

  const handleAssignLoad = () => {
    if (!loadSelect) {
      showNotification('Iltimos, yukni tanlang!', 'warning');
      return;
    }
    showNotification(`"${loadSelect}" yuk "${selectedDriver.name}" ga biriktirildi!`, 'success');
    setActiveModal(null);
    setLoadSelect('');
  };

  // Tabs data
  const tabs = [
    { id: 'all', label: 'Barcha haydovchilar', badge: drivers.length },
    { id: 'online', label: 'Online', badge: stats.online },
    { id: 'verified', label: 'Tasdiqlangan' },
    { id: 'available', label: 'Bo\'sh', badge: drivers.filter(d => d.status === 'online' && d.stats.active === 0).length },
    { id: 'top', label: 'Top reyting' },
    { id: 'new', label: 'Yangi qo\'shilgan', badge: 12 }
  ];

  // Stats cards data
  const statCards = [
    { title: 'Jami Haydovchilar', value: stats.total, trend: '15%', trendUp: true, icon: FaUsers, gradient: 'from-blue-600 to-purple-700' },
    { title: 'Online', value: stats.online, trend: '8%', trendUp: true, icon: FaWifi, gradient: 'from-cyan-400 to-cyan-500' },
    { title: 'Offline', value: stats.offline, trend: '3%', trendUp: false, icon: FaUserSlash, gradient: 'from-yellow-500 to-orange-400' },
    { title: 'Tasdiqlangan', value: stats.verified, trend: '24%', trendUp: true, icon: FaCheckCircle, gradient: 'from-purple-700 to-blue-600' }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50/10 to-purple-50/10 font-sans text-gray-800">
      {/* Use your existing Navbar component */}
      <Navbar />

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-6">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Haydovchilar</h1>
            <p className="text-gray-600 text-lg">
              Barcha haydovchilarni boshqaring, kuzating va yuk biriktiring
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statCards.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

          {/* Controls Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-md mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100"
                  placeholder="Haydovchi ismi, ID yoki telefon raqami bo'yicha qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                className="py-3 px-4 border border-gray-300 rounded-xl text-sm bg-white text-gray-700 cursor-pointer appearance-none pr-10 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236c757d' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '16px'
                }}
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="all">Barcha holatlar</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="busy">Band</option>
              </select>

              <select
                className="py-3 px-4 border border-gray-300 rounded-xl text-sm bg-white text-gray-700 cursor-pointer appearance-none pr-10 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236c757d' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '16px'
                }}
                value={filters.vehicle}
                onChange={(e) => setFilters(prev => ({ ...prev, vehicle: e.target.value }))}
              >
                <option value="all">Barcha transportlar</option>
                <option value="truck">Yuk mashinasi</option>
                <option value="van">Furgon</option>
                <option value="pickup">Pikap</option>
                <option value="refrigerator">Refrijerator</option>
              </select>

              <select
                className="py-3 px-4 border border-gray-300 rounded-xl text-sm bg-white text-gray-700 cursor-pointer appearance-none pr-10 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236c757d' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '16px'
                }}
                value={filters.rating}
                onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
              >
                <option value="all">Barcha reytinglar</option>
                <option value="5">5 ★</option>
                <option value="4">4+ ★</option>
                <option value="3">3+ ★</option>
                <option value="2">2+ ★</option>
              </select>

              <button
                className="bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                onClick={handleAddDriver}
              >
                <FaPlus />
                Haydovchi qo'shish
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            {tabs.map(tab => (
              <Tab
                key={tab.id}
                id={tab.id}
                label={tab.label}
                badge={tab.badge}
                active={activeTab === tab.id}
                onClick={setActiveTab}
              />
            ))}
          </div>

          {/* Drivers Grid */}
          {currentDrivers.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 shadow-md text-center mb-12">
              <div className="text-6xl text-gray-300 mb-6">
                <FaUserSlash />
              </div>
              <h3 className="text-2xl text-gray-700 mb-3">Haydovchilar topilmadi</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6 leading-relaxed">
                Hozircha qidiruv shartlariga mos haydovchilar mavjud emas. Filtrlarni o'zgartirib ko'ring yoki yangi haydovchi qo'shing.
              </p>
              <button
                className="bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 mx-auto hover:shadow-lg hover:-translate-y-0.5 transition-all"
                onClick={handleAddDriver}
              >
                <FaPlus />
                Haydovchi qo'shish
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                {currentDrivers.map(driver => (
                  <DriverCard
                    key={driver.id}
                    driver={driver}
                    onViewDetails={(driver) => {
                      setSelectedDriver(driver);
                      setActiveModal('driver');
                    }}
                    onCall={handleCall}
                    onMessage={handleMessage}
                    onAssign={(driver) => {
                      setSelectedDriver(driver);
                      setActiveModal('assign');
                    }}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredDrivers.length)} of {filteredDrivers.length} haydovchilar
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="w-9 h-9 border border-gray-300 rounded-xl bg-white text-gray-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <FaChevronLeft />
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        className={`w-9 h-9 border rounded-xl flex items-center justify-center ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                        } transition-all`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    className="w-9 h-9 border border-gray-300 rounded-xl bg-white text-gray-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Driver Details Modal */}
      <Modal
        isOpen={activeModal === 'driver' && selectedDriver}
        onClose={() => setActiveModal(null)}
        title={`${selectedDriver?.name} - Ma'lumotlar`}
        footer={
          <div className="flex justify-end gap-3">
            <button
              className="py-3 px-6 border border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all"
              onClick={() => setActiveModal(null)}
            >
              Yopish
            </button>
            <button
              className="bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 hover:shadow-lg transition-all"
              onClick={() => {
                setActiveModal('assign');
              }}
            >
              <FaTruckLoading />
              Yuk biriktirish
            </button>
          </div>
        }
      >
        {selectedDriver && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {selectedDriver.name.charAt(0)}
                </div>
                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                  selectedDriver.status === 'online' ? 'bg-green-500' :
                  selectedDriver.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                }`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedDriver.name}</h3>
                <div className="text-sm text-gray-500">{selectedDriver.id}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Telefon</div>
                <div className="font-semibold">{selectedDriver.phone}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Email</div>
                <div className="font-semibold">{selectedDriver.email}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Joylashuv</div>
                <div className="font-semibold">{selectedDriver.location}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Status</div>
                <div className="font-semibold">
                  {selectedDriver.status === 'online' ? 'Online' :
                   selectedDriver.status === 'busy' ? 'Band' : 'Offline'}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Assign Load Modal */}
      <Modal
        isOpen={activeModal === 'assign' && selectedDriver}
        onClose={() => setActiveModal(null)}
        title={`${selectedDriver?.name} ga yuk biriktirish`}
        footer={
          <div className="flex justify-end gap-3">
            <button
              className="py-3 px-6 border border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all"
              onClick={() => setActiveModal(null)}
            >
              Bekor qilish
            </button>
            <button
              className="bg-green-500 text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 hover:bg-green-600 transition-all"
              onClick={handleAssignLoad}
            >
              <FaCheck />
              Biriktirish
            </button>
          </div>
        }
      >
        {selectedDriver && (
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700 mb-2">Yukni tanlang</label>
              <select
                className="w-full py-3 px-4 border border-gray-300 rounded-xl text-sm bg-white text-gray-700 cursor-pointer appearance-none pr-10 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236c757d' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '16px'
                }}
                value={loadSelect}
                onChange={(e) => setLoadSelect(e.target.value)}
              >
                <option value="">Yukni tanlang...</option>
                <option value="YUK-2024-001">YUK-2024-001 - Toshkent → Samarqand</option>
                <option value="YUK-2024-004">YUK-2024-004 - Buxoro → Navoiy</option>
                <option value="YUK-2024-008">YUK-2024-008 - Toshkent → Nukus</option>
              </select>
            </div>
            
            <div>
              <label className="block font-medium text-gray-700 mb-2">Qo'shimcha ma'lumot</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-xl font-sans resize-none focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                rows="3"
                placeholder="Haydovchiga qo'shimcha ko'rsatmalar..."
              />
            </div>
          </div>
        )}
      </Modal>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-6 right-6 p-4 rounded-xl shadow-lg z-50 flex items-center gap-3 animate-slide-in ${
          notification.type === 'success' ? 'bg-green-500' :
          notification.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
        } text-white`}>
          {notification.type === 'success' ? <FaCheckCircle /> :
           notification.type === 'warning' ? <FaExclamationTriangle /> : <FaTimes />}
          <span>{notification.message}</span>
        </div>
      )}
    <Footer/>
    </div>
  );
};

export default YukUzDrivers;