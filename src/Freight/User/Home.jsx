import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar';
import Navbar from './Navbar/Navbar';
import Footer from '../../User/components/User/Footer/Footer';

import { FaPlus, FaCircleCheck, FaClock, FaCreditCard, FaFilter, FaCheck, FaGavel } from "react-icons/fa6";
import {
  FaBox, FaWallet, FaMobileAlt, FaArrowUp, FaArrowDown,
  FaMapMarkerAlt, FaFlagCheckered, FaWeightHanging, FaRulerCombined,
  FaSnowflake, FaBiohazard, FaChevronLeft, FaChevronRight,
  FaSyncAlt, FaExclamationTriangle, FaCloudUploadAlt,
  FaTimes
} from "react-icons/fa";

// Token olish funksiyasi
const getAuthToken = async () => {
  try {
    const response = await fetch('https://tokennoty.pythonanywhere.com/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: "123",
        phone_number: "+998993967336"
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Token API javobi:', data); // Debug uchun
      // Token qaytarilgan formatga qarab, token ni olish
      const token = data.token || data.access_token || data.access || data.accessToken || data.access_token || (data.data && data.data.token) || (data.data && data.data.access_token);
      if (token) {
        localStorage.setItem('access_token', token);
        console.log('Token saqlandi:', token.substring(0, 20) + '...'); // Debug uchun
        return token;
      } else {
        console.error('Token topilmadi. API javobi:', data);
      }
    } else {
      const errorText = await response.text();
      console.error('Token olishda xatolik:', response.status, response.statusText, errorText);
    }
  } catch (error) {
    console.error('Token olishda tarmoq xatosi:', error);
  }
  return null;
};

const CargoModal = ({ isOpen, onClose, onRefresh }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // FormData yaratish funksiyasi
  const createFormData = (form) => {
    const formData = new FormData();
    formData.append('title', form.title.value);

    const description = `
      Qayerdan: ${form.from_loc.value}
      Qayerga: ${form.to_loc.value}
      Narx: ${form.price.value} so'm
      Og'irlik: ${form.weight.value} kg
      Hajm: ${form.volume.value} m3
      Qo'shimcha: ${form.content.value}
    `;
    formData.append('content', description);

    if (form.image.files[0]) {
      formData.append('image', form.image.files[0]);
    }
    return formData;
  };

  // API so'rov yuborish funksiyasi
  // const sendRequest = async (token, formData) => {
  //   return await fetch('https://tokennoty.pythonanywhere.com/api/v1/notes/', {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     },
  //     body: formData,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Avval tokenni tekshirish va olish
    let token = localStorage.getItem('access_token');
    console.log('Mavjud token:', token ? token.substring(0, 20) + '...' : 'yo\'q'); // Debug uchun
    
    if (!token) {
      console.log('Token yo\'q, yangi token olinmoqda...');
      token = await getAuthToken();
    }
    
    if (!token) {
      alert("Token olishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
      setLoading(false);
      return;
    }
    
    console.log('Ishlatilayotgan token:', token.substring(0, 20) + '...'); // Debug uchun

    const form = e.target;
    const formData = createFormData(form);

    try {
      const response = await sendRequest(token, formData);

      if (response.ok) {
        alert("Yuk muvaffaqiyatli qo'shildi!");
        onRefresh(); // Ro'yxatni yangilash
        onClose();   // Modalni yopish
        form.reset(); // Formani tozalash
      } else if (response.status === 401) {
        // 401 xatosi bo'lsa, yangi token olish va qayta urinish
        console.log('401 xatosi, yangi token olinmoqda...');
        localStorage.removeItem('access_token'); // Eski tokenni o'chirish
        const newToken = await getAuthToken();
        if (newToken) {
          // FormData ni qayta yaratish (chunki bir marta o'qilgandan keyin bo'sh bo'lib qoladi)
          const retryFormData = createFormData(form);
          // Yangi token bilan qayta urinish
          const retryResponse = await sendRequest(newToken, retryFormData);
          
          if (retryResponse.ok) {
            alert("Yuk muvaffaqiyatli qo'shildi!");
            onRefresh();
            onClose();
            form.reset();
          } else {
            const errData = await retryResponse.json().catch(() => ({}));
            alert("Xatolik: " + (errData.detail || errData.message || `${retryResponse.status} ${retryResponse.statusText}`));
          }
        } else {
          alert("Token olishda xatolik. Iltimos, qayta urinib ko'ring.");
        }
      } else {
        // 404 yoki boshqa xatolik bo'lganda JSON parse qilishga urinmaslik
        let errorMessage = `Xatolik: ${response.status} ${response.statusText}`;
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errData = await response.json();
            errorMessage = "Xatolik: " + (errData.detail || errData.message || `${response.status} ${response.statusText}`);
          } else {
            const text = await response.text();
            console.error("Server javobi (JSON emas):", text);
          }
        } catch (parseErr) {
          console.error("Xatolikni parse qilishda muammo:", parseErr);
        }
        console.error("Server xatosi:", errorMessage);
        alert(errorMessage);
      }
    } catch (err) {
      console.error("Tarmoq xatosi:", err);
      alert("Server bilan aloqa yo'q yoki internet past.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-slate-800">Yangi Yuk Qo'shish</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Yuk nomi *</label>
            <input name="title" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" placeholder="Masalan: Meva" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-bold text-slate-700 mb-1">Qayerdan *</label><input name="from_loc" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-1">Qayerga *</label><input name="to_loc" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-bold text-slate-700 mb-1">Og'irlik (kg)</label><input name="weight" type="number" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-1">Hajm (m³)</label><input name="volume" type="number" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" /></div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Narx (so'm)</label>
            <input name="price" type="number" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Qo'shimcha</label>
            <textarea name="content" className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee] h-20"></textarea>
          </div>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
            <input type="file" name="image" className="hidden" id="fileup" accept="image/*" />
            <label htmlFor="fileup" className="cursor-pointer flex flex-col items-center gap-2 text-gray-500 hover:text-blue-600">
              <FaCloudUploadAlt size={24} /> <span>Rasm yuklash</span>
            </label>
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-[#4361ee] text-white rounded-xl font-bold hover:bg-blue-700 transition-all cursor-pointer">
            {loading ? 'Joylanmoqda...' : 'Yukni Joylash'}
          </button>
        </form>
      </div>
    </div>
  );
};


const Home = () => {
  // --- STATES ---
  const [apiLoads, setApiLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("Barchasi");
  const [currentPage, setCurrentPage] = useState(1);

  // const fetchNotes = async () => {
  //   setLoading(true);
  //   const token = localStorage.getItem('access_token');
  //   try {
  //     const response = await fetch('https://tokennoty.pythonanywhere.com/api/v1/notes/', {
  //       headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       setApiLoads(data.reverse());
  //     } else {
  //       console.log("API dan 404 yoki boshqa xato keldi. API bo'sh bo'lishi mumkin.");
  //     }
  //   } catch (err) {
  //     console.error("Internet yoki Server xatosi:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Component mount bo'lganda token olish
  useEffect(() => {
    const initializeToken = async () => {
      const existingToken = localStorage.getItem('access_token');
      if (!existingToken) {
        await getAuthToken();
      }
    };
    initializeToken();
    // fetchNotes();
  }, []);

  const totalCount = apiLoads.length;
  const totalMoney = 0;
  const formattedMoney = totalMoney.toLocaleString();

  const results = [
    { id: 1, icon: FaBox, icon_color: '#4361ee', icon_bg: '#eceffd', benefit: true, percent: 12, total: totalCount, title: "Umumiy yuklar" },
    { id: 2, icon: FaCircleCheck, icon_color: '#4cc9f0', icon_bg: '#edf9fd', benefit: true, percent: 8, total: Math.floor(totalCount * 0.7), title: "Yetkazilgan" },
    { id: 3, icon: FaClock, icon_color: '#ffcc02', icon_bg: '#fff9e6', benefit: false, percent: 3, total: Math.floor(totalCount * 0.3), title: "Jarayonda" },
    { id: 4, icon: FaWallet, icon_color: '#f72585', icon_bg: '#fee9f3', benefit: true, percent: 24, total: formattedMoney, title: "So'm daromad" }
  ]

  const actins = [
    { id: 1, icon: FaPlus, icon_color: '#4361ee', title: 'Yuk qo\'shish', action: () => setIsModalOpen(true) },
    { id: 2, icon: FaBox, icon_color: '#4cc9f0', title: 'Yuklarim', action: () => { } },
    { id: 3, icon: FaMapMarkerAlt, icon_color: '#f72585', title: 'Kuzatish', action: () => { } },
    { id: 4, icon: FaCreditCard, icon_color: '#7209b7', title: 'To\'lov', action: () => { } },
  ]

  const mappedLoads = apiLoads.map((item, index) => {
    return {
      id: item.id,
      l_num: `#YUK-${item.id}`,
      situation: index === 0 ? "Featured" : "FAOL",
      situation_bg: index === 0 ? 'bg-gradient-to-br from-[#4361ee] to-[#7209b7]' : 'bg-[#edf9fd]',
      situation_color: index === 0 ? 'text-white' : 'text-[#5acdf1]',
      from_province: "Toshkent", // API da bu yo'q bo'lsa standart
      from_loc: "Yuklash nuqtasi",
      to_province: "Viloyat",
      to_loc: "Tushirish nuqtasi",
      ton: 0,
      m: 0,
      product: item.title || "Yuk",
      type: 'Tent',
      date: item.created_at ? item.created_at.slice(0, 10) : "Bugun",
      price: "Kelishilgan"
    }
  });

  const itemsPerPage = 6;
  const filteredLoads = mappedLoads; // Hozircha filtrsiz

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLoads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLoads.length / itemsPerPage);

  const getProductIcon = (product) => {
    return <FaBox className="text-[#4361ee]" />;
  };

  const recentActivity = apiLoads.slice(0, 3).map((item, i) => ({
    id: item.id,
    icon: i === 0 ? FaCheck : i === 1 ? FaGavel : FaExclamationTriangle,
    icon_color: i === 0 ? "text-[#4cc9f0]" : i === 1 ? "text-[#4361ee]" : "text-[#f72585]",
    title: "Yangi yuk qo'shildi",
    desc: item.title,
    time: "Hozirgina"
  }));

  return (
    <div className='bg-[#f8f9fe] min-h-screen'>
      <Navbar />
      <div className="flex-1">

        <div className="mx-auto px-3 sm:px-4 md:px-5 lg:px-6 py-4 sm:py-5 md:py-6 lg:py-8 xl:py-10 flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-8">

          <div className="lg:w-72 shrink-0">
            <Sidebar onAddCargoClick={() => { setIsModalOpen(true) }} />
          </div>


          <div className="w-full flex gap-3 sm:gap-4 md:gap-5 flex-col">

            <div className="w-full bg-white shadow-lg border border-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 items-center justify-between hover:border-blue-500 hover:shadow-xl transform hover:-translate-y-1 sm:hover:-translate-y-2 duration-300">
              <div className='w-full sm:w-3/6 text-center sm:text-left'>
                <h2 className='text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2'>Xush kelibsiz, Ali!</h2>
                <p className='text-sm sm:text-base md:text-lg text-gray-600'>Bugun nima qilmoqchisiz? Yuk qo'shing yoki mavjud yuklarni ko'rib chiqing.</p>
              </div>
              <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto'>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className='relative text-sm sm:text-base text-white font-semibold bg-[#415fe9] border-2 border-blue-500 rounded-lg sm:rounded-xl flex gap-1 sm:gap-2 items-center justify-center py-2 px-3 sm:py-2 sm:px-6 hover:shadow-xl transform hover:-translate-y-1 duration-300 cursor-pointer overflow-hidden group'>
                  <FaPlus className='text-sm sm:text-base' />
                  Yuk qo'shish
                  <div className="absolute w-0 h-0 rounded-full bg-white/40 group-hover:w-40 group-hover:h-40 duration-500"></div>
                </button>
                <button className='relative text-sm sm:text-base text-[#415fe9] font-semibold bg-white border-2 border-blue-500 rounded-lg sm:rounded-xl flex gap-1 sm:gap-2 items-center justify-center py-2 px-3 sm:py-2 sm:px-6 hover:bg-[#415fe9] hover:text-white duration-300 cursor-pointer overflow-hidden group'>
                  <FaMobileAlt className='text-sm sm:text-base' />
                  Ilovani ko'rish
                  <div className="absolute w-0 h-0 rounded-full bg-white/40 group-hover:w-40 group-hover:h-40 duration-500"></div>
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-3 sm:py-4 md:py-5 lg:py-6">
              {results.map((item, index) => {
                return (
                  <div key={index} className="bg-linear-to-br from-[#4361ee] to-[#7209b7] shadow-lg rounded-xl sm:rounded-2xl pt-1 transform hover:-translate-y-0.5 duration-300 overflow-hidden">
                    <div className="w-full h-full bg-white p-4 sm:p-5 md:p-6 lg:p-8">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center" style={{ background: item.icon_bg }}>
                          <item.icon className="text-lg sm:text-xl md:text-2xl" style={{ color: item.icon_color }} />
                        </div>
                        <p className='flex gap-1 items-center rounded-lg py-1 px-2 text-xs sm:text-sm md:text-base' style={{ background: item.benefit === true ? '#edf9fd' : '#fee9f3', color: item.benefit === true ? '#67d1f3' : '#f72585' }}>
                          {item.benefit === true ? <FaArrowUp className='text-xs sm:text-sm' /> : <FaArrowDown className='text-xs sm:text-sm' />}
                          <span>{item.percent}%</span>
                        </p>
                      </div>
                      <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mt-3 sm:mt-4 md:mt-5'>{item.total}</h1>
                      <h3 className='text-xs sm:text-sm md:text-base text-[#6c757d] uppercase mt-1 sm:mt-2'>{item.title}</h3>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="w-full bg-white shadow-lg border border-white rounded-2xl sm:rounded-3xl hover:border-blue-500 hover:shadow-xl transform hover:-translate-y-1 sm:hover:-translate-y-2 duration-300">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold border-b border-gray-300 p-4 sm:p-5 md:p-6 lg:p-8">
                Tezkor Amallar
              </h1>
              <div className="grid gap-2 sm:gap-3 md:gap-4 lg:gap-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-2 sm:py-3 md:py-4 lg:py-5 px-2 sm:px-3 md:px-4 lg:px-6">
                {actins.map((item, index) => {
                  return (
                    <div key={index} onClick={item.action} className="bg-white shadow-md border border-white rounded-lg flex gap-1 sm:gap-2 items-center flex-col p-2 sm:p-3 md:p-4 hover:border-blue-500 hover:shadow-lg transform hover:-translate-y-0.5 duration-300 cursor-pointer py-3 sm:py-4 md:py-5 lg:py-6">
                      <item.icon style={{ color: item.icon_color }} className='text-base sm:text-lg md:text-xl' />
                      <span className='text-xs sm:text-sm md:text-base text-center px-1'>{item.title}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="w-full bg-white shadow-lg border border-white rounded-2xl sm:rounded-3xl hover:border-blue-500 hover:shadow-xl transform hover:-translate-y-1 sm:hover:-translate-y-2 duration-300 my-5 sm:my-6 md:my-8 lg:my-10 py-5 sm:py-6 md:py-8 lg:py-10 px-3 sm:px-4 md:px-5 lg:px-8">
              <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-3 sm:mb-4 md:mb-5'>Faol yuklar</h1>
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-5 sm:mb-6 md:mb-8 lg:mb-10 justify-center">
                {["Barchasi", "Faol", "Kutilmoqda", "Yakunlangan"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setFilter(tab); setCurrentPage(1); }}
                    className={`px-3 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-1.5 md:py-2 rounded-full font-medium sm:font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 cursor-pointer ${filter === tab ? 'bg-[#4361ee] text-white shadow-lg scale-105' : 'bg-white text-gray-500 hover:bg-gray-100'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {loading ? <div className="text-center py-10">Yuklanmoqda...</div> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                  {currentItems.length === 0 ? <p className="text-center w-full col-span-3 text-gray-500">Hozircha yuklar yo'q</p> : currentItems.map((item) => (
                    <div key={item.id} className="flex flex-col bg-white border border-gray-100 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg duration-300 hover:border-[#4361ee] transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-2xl overflow-hidden">

                      <div className="flex items-center justify-between px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4 pt-4 sm:pt-5 md:pt-6 lg:pt-8">
                        <span className='text-xs sm:text-sm text-gray-400 font-bold tracking-wider'>{item.l_num}</span>
                        <span className={`text-[8px] sm:text-[9px] md:text-[10px] uppercase font-bold py-0.5 sm:py-1 px-2 sm:px-3 rounded-lg ${item.situation_bg} ${item.situation_color}`}>
                          {item.situation}
                        </span>
                      </div>

                      <div className="border-t border-b border-gray-100 px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4 md:py-5 lg:py-6 space-y-3 sm:space-y-4 md:space-y-5">
                        <div className="flex gap-2 sm:gap-3 md:gap-4 items-start">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                            <FaMapMarkerAlt className='text-sm sm:text-base md:text-lg text-[#4361ee]' />
                          </div>
                          <div>
                            <h4 className='text-sm sm:text-base md:text-lg lg:text-xl font-bold text-slate-800 leading-tight'>{item.from_province}</h4>
                            <p className='text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1'>{item.from_loc}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 sm:gap-3 md:gap-4 items-start">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                            <FaFlagCheckered className='text-sm sm:text-base md:text-lg text-[#4361ee]' />
                          </div>
                          <div>
                            <h4 className='text-sm sm:text-base md:text-lg lg:text-xl font-bold text-slate-800 leading-tight'>{item.to_province}</h4>
                            <p className='text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1'>{item.to_loc}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-y-2 sm:gap-y-3 gap-x-1 sm:gap-x-2 px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4 md:py-5 lg:py-6 bg-slate-50/50">
                        <div className='flex gap-1 sm:gap-2 items-center text-xs sm:text-sm text-slate-600 font-medium'>
                          <FaWeightHanging className='text-[#4361ee] text-xs sm:text-sm' />
                          <span>{item.ton} t</span>
                        </div>
                        <div className='flex gap-1 sm:gap-2 items-center text-xs sm:text-sm text-slate-600 font-medium'>
                          <FaRulerCombined className='text-[#4361ee] text-xs sm:text-sm' />
                          <span>{item.m} m³</span>
                        </div>
                        <div className='flex gap-1 sm:gap-2 items-center text-xs sm:text-sm text-slate-600 font-medium'>
                          {getProductIcon(item.product)}
                          <span className="truncate">{item.product}</span>
                        </div>
                        <div className='flex gap-1 sm:gap-2 items-center text-xs sm:text-sm text-slate-600 font-medium'>
                          <FaClock className='text-[#4361ee] text-xs sm:text-sm' />
                          <span className='truncate'>{item.date}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4 md:py-5 lg:py-6 mt-auto gap-2 sm:gap-3">
                        <h2 className='text-base sm:text-lg md:text-xl lg:text-2xl font-black text-[#4361ee] text-center sm:text-left'>{item.price}</h2>
                        <button className='bg-[#4361ee] text-white text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg sm:rounded-xl py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-5 hover:bg-[#324fdb] transition-all cursor-pointer active:scale-95 w-full sm:w-auto'>
                          Taklif berish
                        </button>
                      </div>
                    </div>
                  ))}
                </div>)}

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 mt-8 sm:mt-10 md:mt-12 lg:mt-16">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:text-[#4361ee] hover:border-[#4361ee] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <FaChevronLeft className='text-sm sm:text-base' />
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full font-bold transition-all text-xs sm:text-sm md:text-base ${currentPage === i + 1 ? 'bg-[#4361ee] text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100 hover:border-[#4361ee]'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:text-[#4361ee] hover:border-[#4361ee] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <FaChevronRight className='text-sm sm:text-base' />
                  </button>
                </div>
              )}
            </div>

            <div className="w-full bg-white shadow-lg border border-white rounded-2xl sm:rounded-3xl hover:border-blue-500 hover:shadow-xl transform hover:-translate-y-1 sm:hover:-translate-y-2 duration-300">
              <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-300 p-4 sm:p-5 md:p-6 lg:p-8 gap-3 sm:gap-0">
                <h3 className='text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-center sm:text-left'>Real vaqtda xarita</h3>
                <div className='flex gap-2 sm:gap-3'>
                  <button className='relative text-xs sm:text-sm md:text-base text-white font-semibold bg-[#415fe9] border-2 border-blue-500 rounded-lg sm:rounded-xl flex gap-1 sm:gap-2 items-center justify-center py-1.5 sm:py-2 px-2 sm:px-4 md:px-6 hover:shadow-xl transform hover:-translate-y-0.5 sm:hover:-translate-y-1 duration-300 cursor-pointer overflow-hidden group'>
                    <FaSyncAlt className='text-sm sm:text-base' />
                    <span className='hidden sm:inline'>Yangilash</span>
                    <span className='sm:hidden'>Yangi</span>
                    <div className="absolute w-0 h-0 rounded-full bg-white/40 group-hover:w-40 group-hover:h-40 duration-500"></div>
                  </button>
                  <button className='relative text-xs sm:text-sm md:text-base text-[#415fe9] font-semibold bg-white border-2 border-blue-500 rounded-lg sm:rounded-xl flex gap-1 sm:gap-2 items-center justify-center py-1.5 sm:py-2 px-2 sm:px-4 md:px-6 hover:bg-[#415fe9] hover:text-white duration-300 cursor-pointer overflow-hidden group'>
                    <FaFilter className='text-sm sm:text-base' />
                    <span className='hidden sm:inline'>Filtr</span>
                    <div className="absolute w-0 h-0 rounded-full bg-white/40 group-hover:w-40 group-hover:h-40 duration-500"></div>
                  </button>
                </div>
              </div>

              <div className="p-3 sm:p-4 md:p-5 lg:p-8 w-full h-64 sm:h-80 md:h-96 lg:h-122.5 overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.5026388484!2d69.139281!3d41.2825125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a997129525f41!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Yuk.uz xaritasi"
                ></iframe>
              </div>
            </div>

            <div className="w-full bg-white shadow-lg border border-white rounded-2xl sm:rounded-3xl hover:border-blue-500 hover:shadow-xl transform hover:-translate-y-1 sm:hover:-translate-y-2 duration-300">
              <div className="border-b border-gray-300 p-4 sm:p-5 md:p-6 lg:p-8">
                <h3 className='text-base sm:text-lg md:text-xl lg:text-2xl font-bold'>So'nggi Faoliyat</h3>
              </div>

              <div className="p-3 sm:p-4 md:p-5 lg:p-8 space-y-4 sm:space-y-5">
                {recentActivity.length === 0 ? <p className="text-gray-400">Hozircha faollik yo'q</p> : recentActivity.map((item, index) => {
                  return (
                    <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5 items-start sm:items-center">
                      <item.icon className={`${item.icon_color} text-lg sm:text-xl mt-1 sm:mt-0`} />
                      <div className="flex-1">
                        <p className='text-sm sm:text-base md:text-lg font-medium'>{item.title}</p>
                        <span className='text-xs sm:text-sm md:text-base text-[#6c757d]'>{item.desc}</span>
                      </div>
                      <p className='text-xs sm:text-sm md:text-base text-[#6c757d] text-right sm:text-left'>{item.time}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
      <Footer />

      <CargoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // onRefresh={fetchNotes}
      />
    </div>
  )
}

export default Home
