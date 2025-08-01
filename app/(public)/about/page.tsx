"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  FaUsers, 
  FaLightbulb, 
  FaHeart, 
  FaHandshake,
  FaArrowRight,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone
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

export default function AboutPage() {
  const values = [
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Kolaborasi",
      description: "Bersama-sama membangun masa depan yang lebih baik melalui kerjasama dan sinergi antar anggota."
    },
    {
      icon: <FaLightbulb className="text-3xl" />,
      title: "Inovasi",
      description: "Terus berinovasi dalam mengembangkan solusi digital untuk kemajuan organisasi."
    },
    {
      icon: <FaHeart className="text-3xl" />,
      title: "Dedikasi",
      description: "Berdedikasi penuh dalam memberikan kontribusi terbaik untuk masyarakat."
    },
    {
      icon: <FaHandshake className="text-3xl" />,
      title: "Integritas",
      description: "Menjunjung tinggi kejujuran, transparansi, dan tanggung jawab dalam setiap tindakan."
    }
  ];

  const milestones = [
    {
      year: "2024",
      title: "Peluncuran Platform Digital",
      description: "Platform manajemen Karang Taruna pertama yang terintegrasi"
    },
    {
      year: "2023",
      title: "Formasi Tim Pengembang",
      description: "Tim profesional dibentuk untuk mengembangkan solusi digital"
    },
    {
      year: "2022",
      title: "Identifikasi Kebutuhan",
      description: "Analisis mendalam terhadap kebutuhan digitalisasi organisasi"
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative text-center space-y-8 py-16"
      >
        <motion.h1 
          variants={fadeIn}
          className="text-5xl md:text-6xl font-bold text-gray-900"
        >
          <span className="block">Tentang</span>
          <span className="text-techtona-1">Karang Taruna</span>
        </motion.h1>
        
        <motion.p 
          variants={fadeIn}
          className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          Kami adalah organisasi pemuda yang berkomitmen untuk mendorong transformasi digital 
          dalam pengelolaan organisasi Karang Taruna di seluruh Indonesia.
        </motion.p>
      </motion.section>

      {/* Story Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <motion.div variants={fadeIn} className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Cerita Kami</h2>
          <p className="text-gray-600 leading-relaxed">
            Berawal dari observasi terhadap tantangan yang dihadapi Karang Taruna dalam 
            mengelola organisasi secara manual, tim kami tergerak untuk menciptakan 
            solusi digital yang dapat memudahkan proses administrasi dan meningkatkan 
            transparansi organisasi.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Dengan pengalaman dan keahlian di bidang teknologi, kami mengembangkan 
            platform yang tidak hanya modern tetapi juga mudah digunakan oleh semua 
            kalangan, termasuk mereka yang baru mengenal teknologi digital.
          </p>
          <Link 
            href="/team"
            className="inline-flex items-center text-techtona-1 font-semibold hover:text-techtona-4 transition-colors"
          >
            Pelajari Tim Kami
            <FaArrowRight className="ml-2" />
          </Link>
        </motion.div>
        
        <motion.div variants={fadeIn} className="relative">
          <div className="bg-gradient-to-br from-techtona-1 to-techtona-4 p-8 rounded-2xl">
            <Image 
              src="/images/about-hero.jpg" 
              alt="Karang Taruna Digital"
              width={500}
              height={300}
              className="rounded-xl w-full h-64 object-cover"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="space-y-12"
      >
        <motion.div variants={fadeIn} className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Nilai-Nilai Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Prinsip-prinsip yang menjadi fondasi dalam setiap langkah pengembangan kami
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all"
            >
              <div className="text-techtona-1 mb-4 group-hover:scale-110 transition-transform">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid md:grid-cols-2 gap-8"
      >
        <motion.div 
          variants={fadeIn}
          className="bg-gradient-to-br from-techtona-1 to-techtona-4 p-8 rounded-2xl text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Visi</h3>
          <p className="text-techtona-3 leading-relaxed">
            Menjadi pelopor transformasi digital dalam pengelolaan organisasi pemuda 
            di Indonesia, menciptakan ekosistem yang transparan, efisien, dan berkelanjutan.
          </p>
        </motion.div>
        
        <motion.div 
          variants={fadeIn}
          className="bg-gradient-to-br from-techtona-6 to-techtona-7 p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-bold mb-4 text-techtona-1">Misi</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-techtona-1 mr-2">•</span>
              Mengembangkan platform digital yang user-friendly
            </li>
            <li className="flex items-start">
              <span className="text-techtona-1 mr-2">•</span>
              Meningkatkan transparansi dan akuntabilitas organisasi
            </li>
            <li className="flex items-start">
              <span className="text-techtona-1 mr-2">•</span>
              Memfasilitasi kolaborasi antar Karang Taruna
            </li>
            <li className="flex items-start">
              <span className="text-techtona-1 mr-2">•</span>
              Mendorong inovasi dalam pengelolaan organisasi
            </li>
          </ul>
        </motion.div>
      </motion.section>

      {/* Milestones */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="space-y-12"
      >
        <motion.div variants={fadeIn} className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Perjalanan Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Langkah-langkah penting dalam pengembangan platform digital Karang Taruna
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          className="space-y-8"
        >
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="flex items-center space-x-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="bg-techtona-1 text-white px-4 py-2 rounded-full font-bold">
                {milestone.year}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                <p className="text-gray-600">{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Contact CTA */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-gradient-to-br from-techtona-1 to-techtona-4 p-12 rounded-3xl text-center text-white space-y-8"
      >
        <motion.h2 variants={fadeIn} className="text-3xl font-bold">
          Mari Berkolaborasi
        </motion.h2>
        <motion.p variants={fadeIn} className="text-techtona-3 max-w-2xl mx-auto">
          Siap untuk memulai transformasi digital Karang Taruna Anda? 
          Hubungi kami untuk diskusi lebih lanjut.
        </motion.p>
        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="mailto:info@karangtaruna.digital"
            className="inline-flex items-center px-6 py-3 bg-white text-techtona-1 font-semibold rounded-lg hover:bg-techtona-6 transition-colors"
          >
            <FaPhone className="mr-2" />
            Hubungi Kami
          </Link>
          <Link
            href="/team"
            className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-techtona-1 transition-colors"
          >
            <FaUsers className="mr-2" />
            Kenali Tim Kami
          </Link>
        </motion.div>
      </motion.section>
    </main>
  );
} 