"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { 
  FaSearch, 
  FaFilter, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaHeart,
  FaEye,
  FaDownload
} from "react-icons/fa";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const categories = [
    { id: "all", name: "Semua", count: 12 },
    { id: "kegiatan", name: "Kegiatan", count: 5 },
    { id: "pelatihan", name: "Pelatihan", count: 3 },
    { id: "rapat", name: "Rapat", count: 2 },
    { id: "sosialisasi", name: "Sosialisasi", count: 2 }
  ];

  const galleryItems = [
    {
      id: 1,
      title: "Pelatihan Digital Marketing",
      category: "pelatihan",
      image: "/images/profile.png",
      date: "15 Januari 2024",
      location: "Balai Desa Karang Taruna",
      participants: 25,
      likes: 12,
      views: 156,
      description: "Pelatihan digital marketing untuk anggota Karang Taruna dalam mengembangkan bisnis online."
    },
    {
      id: 2,
      title: "Rapat Koordinasi Bulanan",
      category: "rapat",
      image: "/images/profile.png",
      date: "10 Januari 2024",
      location: "Kantor Karang Taruna",
      participants: 15,
      likes: 8,
      views: 89,
      description: "Rapat koordinasi bulanan untuk membahas program dan kegiatan Karang Taruna."
    },
    {
      id: 3,
      title: "Sosialisasi Program Digital",
      category: "sosialisasi",
      image: "/images/profile.png",
      date: "5 Januari 2024",
      location: "Aula Desa",
      participants: 40,
      likes: 23,
      views: 234,
      description: "Sosialisasi program digitalisasi Karang Taruna kepada masyarakat."
    },
    {
      id: 4,
      title: "Kegiatan Bakti Sosial",
      category: "kegiatan",
      image: "/images/profile.png",
      date: "20 Desember 2023",
      location: "Panti Asuhan",
      participants: 30,
      likes: 45,
      views: 312,
      description: "Kegiatan bakti sosial memberikan bantuan kepada panti asuhan."
    },
    {
      id: 5,
      title: "Pelatihan Kepemimpinan",
      category: "pelatihan",
      image: "/images/profile.png",
      date: "12 Desember 2023",
      location: "Hotel Grand Palace",
      participants: 20,
      likes: 18,
      views: 178,
      description: "Pelatihan kepemimpinan untuk pengurus Karang Taruna."
    },
    {
      id: 6,
      title: "Rapat Evaluasi Tahun 2023",
      category: "rapat",
      image: "/images/profile.png",
      date: "28 Desember 2023",
      location: "Kantor Karang Taruna",
      participants: 12,
      likes: 6,
      views: 67,
      description: "Rapat evaluasi kegiatan Karang Taruna tahun 2023."
    },
    {
      id: 7,
      title: "Kegiatan Pemberdayaan UMKM",
      category: "kegiatan",
      image: "/images/profile.png",
      date: "15 Desember 2023",
      location: "Pasar Tradisional",
      participants: 35,
      likes: 32,
      views: 245,
      description: "Kegiatan pemberdayaan UMKM melalui program digitalisasi."
    },
    {
      id: 8,
      title: "Sosialisasi Platform Digital",
      category: "sosialisasi",
      image: "/images/profile.png",
      date: "8 Desember 2023",
      location: "Balai Desa",
      participants: 50,
      likes: 28,
      views: 189,
      description: "Sosialisasi platform digital Karang Taruna kepada anggota."
    },
    {
      id: 9,
      title: "Kegiatan Olahraga Bersama",
      category: "kegiatan",
      image: "/images/profile.png",
      date: "25 November 2023",
      location: "Lapangan Desa",
      participants: 45,
      likes: 38,
      views: 267,
      description: "Kegiatan olahraga bersama untuk mempererat silaturahmi."
    },
    {
      id: 10,
      title: "Pelatihan Kewirausahaan",
      category: "pelatihan",
      image: "/images/profile.png",
      date: "18 November 2023",
      location: "Balai Desa",
      participants: 28,
      likes: 22,
      views: 198,
      description: "Pelatihan kewirausahaan untuk mengembangkan bisnis lokal."
    },
    {
      id: 11,
      title: "Kegiatan Penanaman Pohon",
      category: "kegiatan",
      image: "/images/profile.png",
      date: "10 November 2023",
      location: "Hutan Desa",
      participants: 40,
      likes: 35,
      views: 223,
      description: "Kegiatan penanaman pohon untuk menjaga kelestarian lingkungan."
    },
    {
      id: 12,
      title: "Kegiatan Literasi Digital",
      category: "kegiatan",
      image: "/images/profile.png",
      date: "5 November 2023",
      location: "Perpustakaan Desa",
      participants: 25,
      likes: 19,
      views: 145,
      description: "Kegiatan literasi digital untuk meningkatkan kemampuan teknologi."
    }
  ];

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center space-y-8 py-16"
      >
        <motion.h1 
          variants={fadeIn}
          className="text-5xl md:text-6xl font-bold text-gray-900"
        >
          <span className="block">Galeri</span>
          <span className="text-techtona-1">Kegiatan</span>
        </motion.h1>
        
        <motion.p 
          variants={fadeIn}
          className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          Dokumentasi berbagai kegiatan dan program Karang Taruna dalam mendorong 
          transformasi digital dan pemberdayaan masyarakat.
        </motion.p>
      </motion.section>

      {/* Search and Filter */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="space-y-6"
      >
        <motion.div variants={fadeIn} className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari kegiatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-techtona-1 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? "bg-techtona-1 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div variants={fadeIn} className="text-gray-600">
          Menampilkan {filteredItems.length} dari {galleryItems.length} kegiatan
        </motion.div>
      </motion.section>

      {/* Gallery Grid */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="space-y-8"
      >
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeIn}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
              onClick={() => handleItemClick(item)}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <div className="absolute top-3 right-3 z-20">
                  <span className="px-2 py-1 bg-techtona-1 text-white text-xs font-medium rounded">
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 z-20 text-white">
                  <div className="flex items-center space-x-2 text-sm">
                    <FaCalendarAlt />
                    <span>{item.date}</span>
                  </div>
                </div>
                <Image 
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-techtona-1 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 text-sm line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <FaMapMarkerAlt className="mr-1" />
                      {item.location}
                    </span>
                    <span className="flex items-center">
                      <FaUsers className="mr-1" />
                      {item.participants}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <FaHeart className="mr-1 text-red-500" />
                      {item.likes}
                    </span>
                    <span className="flex items-center">
                      <FaEye className="mr-1" />
                      {item.views}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Statistics */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-gradient-to-br from-techtona-1 to-techtona-4 p-8 rounded-3xl text-white"
      >
        <motion.div variants={fadeIn} className="text-center space-y-8">
          <h2 className="text-3xl font-bold">Statistik Kegiatan</h2>
          
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <motion.div variants={fadeIn} className="text-center">
              <div className="text-3xl font-bold mb-2">{galleryItems.length}</div>
              <div className="text-techtona-3">Total Kegiatan</div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="text-center">
              <div className="text-3xl font-bold mb-2">
                {galleryItems.reduce((sum, item) => sum + item.participants, 0)}
              </div>
              <div className="text-techtona-3">Total Peserta</div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="text-center">
              <div className="text-3xl font-bold mb-2">
                {galleryItems.reduce((sum, item) => sum + item.likes, 0)}
              </div>
              <div className="text-techtona-3">Total Suka</div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="text-center">
              <div className="text-3xl font-bold mb-2">
                {galleryItems.reduce((sum, item) => sum + item.views, 0)}
              </div>
              <div className="text-techtona-3">Total Dilihat</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={closeModal}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="absolute bottom-4 left-4 z-20 text-white">
                <span className="px-3 py-1 bg-techtona-1 text-white text-sm font-medium rounded">
                  {selectedItem.category.charAt(0).toUpperCase() + selectedItem.category.slice(1)}
                </span>
              </div>
              <Image 
                src={selectedItem.image}
                alt={selectedItem.title}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">{selectedItem.title}</h2>
              
              <p className="text-gray-600">{selectedItem.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-techtona-1" />
                  <span>{selectedItem.date}</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-techtona-1" />
                  <span>{selectedItem.location}</span>
                </div>
                <div className="flex items-center">
                  <FaUsers className="mr-2 text-techtona-1" />
                  <span>{selectedItem.participants} Peserta</span>
                </div>
                <div className="flex items-center">
                  <FaHeart className="mr-2 text-red-500" />
                  <span>{selectedItem.likes} Suka</span>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-techtona-1 text-white py-2 px-4 rounded-lg font-medium hover:bg-techtona-4 transition-colors">
                  <FaDownload className="inline mr-2" />
                  Download
                </button>
                <button className="flex-1 border border-techtona-1 text-techtona-1 py-2 px-4 rounded-lg font-medium hover:bg-techtona-1 hover:text-white transition-colors">
                  Share
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
} 