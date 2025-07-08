"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaInstagram, FaEnvelope, FaGithub, FaTrello, FaDiscord } from "react-icons/fa";
import { SiNextdotjs, SiReact, SiTailwindcss, SiNodedotjs, SiExpress, SiPostgresql } from "react-icons/si";
import { EyeIcon, ListBulletIcon, UserGroupIcon, BuildingOfficeIcon, UserIcon } from '@heroicons/react/24/outline'

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

export default function AboutTeamPage() {
  const teamMembers = [
    {
      name: "Rifki",
      role: "Frontend Developer",
      bio: "Membangun antarmuka pengguna (UI/UX) yang responsif, modern, dan mudah digunakan dengan teknologi terkini.",
      instagram: "https://www.instagram.com/rifkibayuariyan/",
      contact: "email.rifkibayu@gmail.com",
      github: "https://github.com/rifkibayuariy",
      avatar: "/images/profile.png",
    },
    {
      name: "Arya",
      role: "Backend Developer",
      bio: "Spesialis dalam pengembangan REST API yang scalable dan integrasi basis data menggunakan Node.js dan PostgreSQL.",
      instagram: "https://www.instagram.com/aranpra/",
      contact: "mailto:arya@example.com",
      github: "https://github.com/Aranpra",
      avatar: "/images/arya.jpg",
    },
    {
      name: "Jati",
      role: "Backend Developer",
      bio: "Ahli dalam manajemen database, sistem autentikasi yang aman, dan arsitektur sistem keuangan yang robust.",
      instagram: "https://www.instagram.com/jatisripamungkas/",
      contact: "mailto:jati@example.com",
      github: "https://github.com/JatiSriPamungkas",
      avatar: "/images/jati.jpeg",
    },
    {
      name: "Brawidya",
      role: "Backend Developer",
      bio: "Memimpin infrastruktur cloud, CI/CD pipeline, dan dokumentasi teknis untuk pengembangan berkelanjutan.",
      instagram: "https://www.instagram.com/_enxyest/",
      contact: "brawidya12@students.amikom.ac.id",
      github: "https://github.com/brawidya-dev",
      avatar: "/images/brawidya.jpg",
    },
  ];

  const technologies = [
    { name: "Next.js", icon: <SiNextdotjs className="text-2xl" /> },
    { name: "React", icon: <SiReact className="text-2xl" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-2xl" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-2xl" /> },
    { name: "Express.js", icon: <SiExpress className="text-2xl" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-2xl" /> },
    { name: "GitHub", icon: <FaGithub className="text-2xl" /> },
    { name: "Trello", icon: <FaTrello className="text-2xl" /> },
    { name: "Discord", icon: <FaDiscord className="text-2xl" /> },
    { name: "CI/CD", icon: <span className="text-2xl">🚀</span> },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-20">
      {/* Enhanced Hero Section with Techtona Color Scheme */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative space-y-6 md:space-y-8 py-16 md:py-20 lg:py-24 px-4 sm:px-6 mx-auto max-w-3xl lg:max-w-5xl text-center"
      >
        {/* Decorative elements (lightweight SVG) */}
        <div className="absolute -top-10 -left-20 opacity-10 dark:opacity-5">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="text-techtona-1 dark:text-techtona-2">
            <path d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zm0 180c-44.2 0-80-35.8-80-80S55.8 20 100 20s80 35.8 80 80-35.8 80-80 80z" fill="currentColor"/>
          </svg>
        </div>
        
        <motion.div 
          variants={fadeIn}
          className="space-y-5 md:space-y-6"
        >
          <motion.h1 
            variants={fadeIn}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight"
          >
            <span className="block">Transformasi Digital</span>
            <span className="relative inline-block">
              <span className="relative z-10 text-techtona-1 dark:text-techtona-2">Karang Taruna</span>
              <span className="absolute bottom-2 left-0 w-full h-3 md:h-4 bg-techtona-1/20 dark:bg-techtona-2/30 -rotate-1 -z-0"></span>
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeIn}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto"
          >
            Modernisasi pengelolaan organisasi dengan platform digital terintegrasi untuk transparansi dan efisiensi maksimal.
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={fadeIn}
          className="pt-4 md:pt-6 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link 
            href="#visi-misi" 
            className="px-8 py-3.5 bg-techtona-1 hover:bg-techtona-4 dark:bg-techtona-2 dark:hover:bg-techtona-5 text-white dark:text-techtona-1 font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-techtona-1/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            Visi & Misi
          </Link>
          <Link 
            href="#team" 
            className="px-8 py-3.5 border-2 border-techtona-1 dark:border-techtona-2 text-techtona-1 dark:text-techtona-2 font-bold rounded-xl hover:bg-techtona-6 dark:hover:bg-techtona-7 transition-all"
          >
            Tim Pengembang
          </Link>
        </motion.div>
      </motion.section>

      {/* Tech Stack Marquee */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative w-full overflow-hidden bg-gradient-to-r from-techtona-1 to-techtona-4 py-6 shadow-xl rounded-xl"
      >
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
          {[...technologies, ...technologies].map((tech, index) => (
            <div 
              key={index} 
              className="flex items-center text-xl font-semibold text-white"
            >
              <span className="mr-3 text-techtona-3">{tech.icon}</span>
              {tech.name}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Vision & Mission - Techtona Theme */}
      <motion.section 
        id="visi-misi"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.3
            }
          }
        }}
        className="bg-white p-10 rounded-3xl space-y-10 shadow-lg border border-gray-100"
      >
        <motion.h2 
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                type: "spring", 
                stiffness: 120,
                damping: 10
              }
            }
          }}
          className="text-4xl font-bold text-gray-900 text-center"
        >
          Visi & Misi Kami
          <motion.div 
            className="h-1 bg-techtona-1 mt-2 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.h2>
        
        <motion.div className="text-left max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Vision Box */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { 
                opacity: 0, 
                x: -50,
                rotate: -3 
              },
              visible: { 
                opacity: 1, 
                x: 0,
                rotate: 0,
                transition: { 
                  type: "spring", 
                  stiffness: 100,
                  damping: 12,
                  duration: 0.8
                }
              }
            }}
            whileHover={{ 
              y: -8,
              boxShadow: "0 15px 30px -10px rgba(31, 72, 66, 0.15)"
            }}
            className="bg-techtona-6 p-8 rounded-2xl border-2 border-techtona-3 hover:border-techtona-2 relative overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-techtona-1 opacity-0 hover:opacity-5 transition-opacity duration-300"
              whileHover={{ opacity: 0.05 }}
            />
            <h3 className="text-2xl font-bold text-techtona-1 mb-5 flex items-center">
              <motion.span 
                className="inline-block mr-3"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.4 }}
              >
                <EyeIcon className="h-6 w-6 text-techtona-1" />
              </motion.span>
              Visi Kami
            </h3>
            <motion.p 
              className="text-gray-800 text-lg"
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.6 }
                }
              }}
            >
              Mewujudkan Karang Taruna digital yang profesional, transparan, dan berkelanjutan melalui solusi teknologi terkini.
            </motion.p>
            <motion.div 
              className="absolute bottom-0 left-0 h-1.5 bg-techtona-1"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.7 }}
            />
          </motion.div>
          
          {/* Mission Box */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { 
                opacity: 0, 
                x: 50,
                rotate: 3 
              },
              visible: { 
                opacity: 1, 
                x: 0,
                rotate: 0,
                transition: { 
                  type: "spring", 
                  stiffness: 100,
                  damping: 12,
                  duration: 0.8,
                  delay: 0.2
                }
              }
            }}
            whileHover={{ 
              y: -8,
              boxShadow: "0 15px 30px -10px rgba(31, 72, 66, 0.15)"
            }}
            className="bg-techtona-7 p-8 rounded-2xl border-2 border-techtona-3 hover:border-techtona-2 relative overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-techtona-1 opacity-0 hover:opacity-5 transition-opacity duration-300"
              whileHover={{ opacity: 0.05 }}
            />
            <h3 className="text-2xl font-bold text-techtona-1 mb-5 flex items-center">
              <motion.span 
                className="inline-block mr-3"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.6 }}
              >
                <ListBulletIcon className="h-6 w-6 text-techtona-1" />
              </motion.span>
              Misi Kami
            </h3>
            <ul className="space-y-4">
              {[
                "Mengembangkan platform yang intuitif namun powerful",
                "Menyediakan fitur yang relevan dengan kebutuhan organisasi",
                "Menjamin transparansi dan kolaborasi antar anggota",
                "Menumbuhkan budaya digital di organisasi pemuda"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start text-gray-800 text-lg"
                  initial="hidden"
                  whileInView="visible"
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        delay: 0.7 + index * 0.15,
                        type: "spring",
                        stiffness: 200
                      }
                    }
                  }}
                  whileHover={{ x: 5 }}
                >
                  <span className="text-techtona-1 mr-3 mt-1">
                    <motion.span 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.15 }}
                    >
                      ✓
                    </motion.span>
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.div 
              className="absolute bottom-0 left-0 h-1.5 bg-techtona-4"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 1.2 }}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        id="team"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="space-y-12"
      >
        <motion.div variants={fadeIn} className="space-y-2">
          <h2 className="text-3xl font-bold text-techtona-1">Tim Pengembang</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tim profesional yang berdedikasi untuk menghadirkan solusi terbaik bagi Karang Taruna
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center transition-all hover:shadow-2xl border border-gray-100"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden shadow-md mb-4 relative border-2 border-techtona-2/30 group-hover:border-techtona-2 transition-all">
                <Image 
                  src={member.avatar} 
                  alt={member.name} 
                  width={112} 
                  height={112} 
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-techtona-1 transition-colors">
                {member.name}
              </h3>
              <p className="text-techtona-1 mt-1 font-medium">{member.role}</p>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                {member.bio}
              </p>
              <div className="flex space-x-4 mt-6">
                <Link 
                  href={member.instagram} 
                  target="_blank"
                  className="text-gray-500 hover:text-pink-600 transition-colors"
                  aria-label={`Instagram ${member.name}`}
                >
                  <FaInstagram className="text-xl" />
                </Link>
                <Link 
                  href={member.contact}
                  className="text-gray-500 hover:text-techtona-1 transition-colors"
                  aria-label={`Email ${member.name}`}
                >
                  <FaEnvelope className="text-xl" />
                </Link>
                <Link 
                  href={member.github} 
                  target="_blank"
                  className="text-gray-500 hover:text-gray-800 transition-colors"
                  aria-label={`GitHub ${member.name}`}
                >
                  <FaGithub className="text-xl" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Workflow Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-gradient-to-br from-techtona-1 to-techtona-4 p-10 rounded-3xl shadow-2xl space-y-8"
      >
        <motion.h2 variants={fadeIn} className="text-3xl font-bold text-white">
          Metode Pengembangan
        </motion.h2>
        <motion.p 
          variants={fadeIn}
          className="text-techtona-3 max-w-3xl mx-auto"
        >
          Kami mengadopsi pendekatan modern dalam pengembangan perangkat lunak untuk memastikan kualitas dan keandalan sistem.
        </motion.p>
        
        <motion.div 
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 text-left"
        >
          <motion.div 
            variants={fadeIn}
            className="bg-techtona-6 p-6 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-bold text-techtona-1 mb-3">Agile Development</h3>
            <p className="text-gray-700 text-sm">
              Siklus pengembangan iteratif dengan sprint 2 minggu, daily standup, dan continuous feedback.
            </p>
          </motion.div>
          
          <motion.div 
            variants={fadeIn}
            className="bg-techtona-6 p-6 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-bold text-techtona-1 mb-3">Version Control</h3>
            <p className="text-gray-700 text-sm">
              Git workflow dengan code review, branching strategy, dan commit convention yang terstandarisasi.
            </p>
          </motion.div>
          
          <motion.div 
            variants={fadeIn}
            className="bg-techtona-6 p-6 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-bold text-techtona-1 mb-3">CI/CD Pipeline</h3>
            <p className="text-gray-700 text-sm">
              Otomatisasi testing dan deployment dengan GitHub Actions untuk pengiriman kode yang cepat dan aman.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="relative overflow-hidden bg-gradient-to-br from-techtona-1 via-techtona-4 to-techtona-1 p-12 rounded-3xl shadow-2xl space-y-8"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/patterns/grid.svg')]"></div>
        </div>
        
        <motion.h2 
          variants={fadeIn}
          className="text-4xl font-extrabold text-white relative"
        >
          Siap Bertransformasi Digital?
        </motion.h2>
        
        <motion.p 
          variants={fadeIn}
          className="text-techtona-3 max-w-2xl mx-auto relative"
        >
          Kami siap menjadi mitra digitalisasi Karang Taruna Anda. Mari berdiskusi tentang kebutuhan sistem Anda.
        </motion.p>
        
        <motion.div variants={fadeIn} className="relative">
          <Link
            href="mailto:info@example.com"
            className="inline-flex items-center px-8 py-4 bg-techtona-6 text-techtona-1 font-bold rounded-full shadow-lg hover:bg-white transition-all hover:shadow-xl hover:scale-105"
          >
            Hubungi Tim Kami
            <FaEnvelope className="ml-3" />
          </Link>
        </motion.div>
      </motion.section>
    </main>
  );
}