"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaPaperPlane,
  FaUser,
  FaBuilding,
  FaComments
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [selectedSubject, setSelectedSubject] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSelectedSubject("");
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Telepon",
      value: "+62 812-3456-7890",
      link: "tel:+6281234567890"
    },
    {
      icon: <FaWhatsapp className="text-2xl" />,
      title: "WhatsApp",
      value: "+62 812-3456-7890",
      link: "https://wa.me/6281234567890"
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email",
      value: "info@karangtaruna.digital",
      link: "mailto:info@karangtaruna.digital"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Alamat",
      value: "Jl. Karang Taruna No. 123, Yogyakarta",
      link: "#"
    }
  ];

  const officeHours = [
    { day: "Senin - Jumat", time: "08:00 - 17:00" },
    { day: "Sabtu", time: "08:00 - 12:00" },
    { day: "Minggu", time: "Tutup" }
  ];

  const socialMedia = [
    {
      name: "Instagram",
      icon: <FaInstagram className="text-xl" />,
      link: "https://instagram.com/karangtaruna.digital",
      color: "hover:text-pink-600"
    },
    {
      name: "Facebook",
      icon: <FaFacebook className="text-xl" />,
      link: "https://facebook.com/karangtaruna.digital",
      color: "hover:text-blue-600"
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="text-xl" />,
      link: "https://twitter.com/karangtaruna.digital",
      color: "hover:text-blue-400"
    }
  ];

  const faqs = [
    {
      question: "Apa itu Karang Taruna Digital?",
      answer: "Karang Taruna Digital adalah platform manajemen organisasi yang dirancang khusus untuk Karang Taruna di seluruh Indonesia. Platform ini membantu mengelola administrasi, keuangan, dan kegiatan organisasi secara digital."
    },
    {
      question: "Bagaimana cara bergabung dengan platform ini?",
      answer: "Untuk bergabung, Anda dapat menghubungi tim kami melalui email atau WhatsApp. Tim kami akan membantu proses onboarding dan pelatihan penggunaan platform."
    },
    {
      question: "Apakah platform ini gratis?",
      answer: "Platform ini tersedia dalam beberapa paket sesuai kebutuhan organisasi. Silakan hubungi kami untuk informasi lebih detail mengenai paket yang tersedia."
    },
    {
      question: "Apakah ada pelatihan penggunaan platform?",
      answer: "Ya, kami menyediakan pelatihan lengkap untuk semua pengguna platform. Pelatihan mencakup cara penggunaan fitur-fitur utama dan troubleshooting."
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20 mt-16">
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
          <span className="block">Hubungi</span>
          <span className="text-techtona-1">Kami</span>
        </motion.h1>
        
        <motion.p 
          variants={fadeIn}
          className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          Kami siap membantu Anda dalam transformasi digital Karang Taruna. 
          Jangan ragu untuk menghubungi tim kami untuk informasi lebih lanjut.
        </motion.p>
      </motion.section>

      {/* Contact Information */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="space-y-12"
      >
        <motion.div variants={fadeIn} className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Informasi Kontak</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Berbagai cara untuk menghubungi tim kami
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all"
            >
              <div className="text-techtona-1 mb-4 group-hover:scale-110 transition-transform">
                {info.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
              <a 
                href={info.link}
                className="text-gray-600 hover:text-techtona-1 transition-colors"
              >
                {info.value}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Contact Form & Office Hours */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid lg:grid-cols-2 gap-12"
      >
        {/* Contact Form */}
        <motion.div variants={fadeIn} className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kirim Pesan</h2>
            <p className="text-gray-600">
              Isi formulir di bawah ini dan kami akan segera menghubungi Anda
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-techtona-1 focus:border-transparent"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-techtona-1 focus:border-transparent"
                    placeholder="Masukkan email"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subjek
              </label>
              <div className="relative">
                <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  id="subject"
                  name="subject"
                  value={selectedSubject}
                  onChange={(e) => {
                    setSelectedSubject(e.target.value);
                    handleInputChange(e);
                  }}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-techtona-1 focus:border-transparent"
                >
                  <option value="">Pilih subjek</option>
                  <option value="Informasi Platform">Informasi Platform</option>
                  <option value="Demo Platform">Demo Platform</option>
                  <option value="Pelatihan">Pelatihan</option>
                  <option value="Support Teknis">Support Teknis</option>
                  <option value="Kerjasama">Kerjasama</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Pesan
              </label>
              <div className="relative">
                <FaComments className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-techtona-1 focus:border-transparent"
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-techtona-1 text-white py-3 px-6 rounded-lg font-semibold hover:bg-techtona-4 transition-colors flex items-center justify-center"
            >
              <FaPaperPlane className="mr-2" />
              Kirim Pesan
            </button>
          </form>
        </motion.div>

        {/* Office Hours & Social Media */}
        <motion.div variants={fadeIn} className="space-y-8">
          {/* Office Hours */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
              <FaClock className="text-2xl text-techtona-1 mr-3" />
              <h3 className="text-xl font-bold text-gray-900">Jam Operasional</h3>
            </div>
            <div className="space-y-3">
              {officeHours.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="font-medium text-gray-900">{schedule.day}</span>
                  <span className="text-gray-600">{schedule.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Ikuti Kami</h3>
            <div className="space-y-4">
              {socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-techtona-1 transition-colors ${social.color}`}
                >
                  {social.icon}
                  <span className="font-medium">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Lokasi Kami</h3>
            <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Peta lokasi akan ditampilkan di sini</p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="space-y-12"
      >
        <motion.div variants={fadeIn} className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Pertanyaan Umum</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan yang sering diajukan
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          className="space-y-6"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-gradient-to-br from-techtona-1 to-techtona-4 p-12 rounded-3xl text-center text-white space-y-8"
      >
        <motion.h2 variants={fadeIn} className="text-3xl font-bold">
          Siap Memulai Transformasi Digital?
        </motion.h2>
        <motion.p variants={fadeIn} className="text-techtona-3 max-w-2xl mx-auto">
          Bergabunglah dengan ratusan Karang Taruna yang telah menggunakan platform digital kami. 
          Mari wujudkan organisasi yang lebih efisien dan transparan.
        </motion.p>
        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white text-techtona-1 font-semibold rounded-lg hover:bg-techtona-6 transition-colors"
          >
            <FaWhatsapp className="mr-2" />
            Chat WhatsApp
          </a>
          <a
            href="mailto:info@karangtaruna.digital"
            className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-techtona-1 transition-colors"
          >
            <FaEnvelope className="mr-2" />
            Kirim Email
          </a>
        </motion.div>
      </motion.section>
    </main>
  );
} 