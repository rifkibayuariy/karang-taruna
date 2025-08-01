"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  FaInstagram, 
  FaEnvelope, 
  FaGithub, 
  FaLinkedin,
  FaGlobe,
  FaCode,
  FaPalette,
  FaCloud
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiGit
} from "react-icons/si";

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

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Rifki Bayu Ariyan",
      role: "Frontend Developer",
      bio: "Spesialis dalam pengembangan antarmuka pengguna yang responsif dan modern. Menguasai React, Next.js, dan Tailwind CSS untuk menciptakan pengalaman pengguna yang optimal.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "UI/UX"],
      instagram: "https://www.instagram.com/rifkibayuariyan/",
      email: "email.rifkibayu@gmail.com",
      github: "https://github.com/rifkibayuariy",
      linkedin: "#",
      avatar: "/images/profile.png",
      experience: "3+ tahun",
      projects: "15+ proyek"
    },
    {
      name: "Arya Pradana",
      role: "Backend Developer",
      bio: "Ahli dalam pengembangan API yang scalable dan robust. Fokus pada arsitektur sistem, database design, dan implementasi business logic yang efisien.",
      skills: ["Node.js", "Express.js", "MySQL", "REST API", "Authentication"],
      instagram: "https://www.instagram.com/aranpra/",
      email: "arya@example.com",
      github: "https://github.com/Aranpra",
      linkedin: "#",
      avatar: "/images/arya.jpg",
      experience: "2+ tahun",
      projects: "12+ proyek"
    },
    {
      name: "Jati Sri Pamungkas",
      role: "Backend Developer",
      bio: "Spesialis dalam sistem keuangan, manajemen database, dan implementasi fitur-fitur kompleks. Berpengalaman dalam pengembangan sistem yang aman dan reliable.",
      skills: ["Node.js", "MySQL", "Financial Systems", "Security", "Testing"],
      instagram: "https://www.instagram.com/jatisripamungkas/",
      email: "jati@example.com",
      github: "https://github.com/JatiSriPamungkas",
      linkedin: "#",
      avatar: "/images/jati.jpeg",
      experience: "2+ tahun",
      projects: "10+ proyek"
    },
    {
      name: "Brawidya",
      role: "DevOps Engineer",
      bio: "Memimpin infrastruktur cloud, CI/CD pipeline, dan deployment automation. Memastikan sistem berjalan dengan optimal dan scalable untuk pertumbuhan organisasi.",
      skills: ["Microsoft Azure", "CI/CD", "Cloud Infrastructure", "Git", "Monitoring"],
      instagram: "https://www.instagram.com/_enxyest/",
      email: "brawidya12@students.amikom.ac.id",
      github: "https://github.com/brawidya-dev",
      linkedin: "#",
      avatar: "/images/brawidya.jpg",
      experience: "2+ tahun",
      projects: "8+ proyek"
    }
  ];

  const technologies = [
    { name: "Next.js", icon: <SiNextdotjs className="text-2xl" />, category: "Frontend" },
    { name: "TypeScript", icon: <SiTypescript className="text-2xl" />, category: "Language" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-2xl" />, category: "Styling" },
    { name: "Node.js", icon: <SiNodedotjs className="text-2xl" />, category: "Backend" },
    { name: "Express.js", icon: <SiExpress className="text-2xl" />, category: "Backend" },
    { name: "MySQL", icon: <SiMysql className="text-2xl" />, category: "Database" },
    { name: "Git", icon: <SiGit className="text-2xl" />, category: "Version Control" },
    { name: "Microsoft Azure", icon: <div className="text-2xl text-blue-600 font-bold">AZ</div>, category: "Cloud" }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
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
          <span className="block">Tim</span>
          <span className="text-techtona-1">Pengembang</span>
        </motion.h1>
        
        <motion.p 
          variants={fadeIn}
          className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          Tim profesional yang berdedikasi untuk menghadirkan solusi digital terbaik 
          bagi Karang Taruna di seluruh Indonesia.
        </motion.p>
      </motion.section>

      {/* Team Members */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="space-y-12"
      >
        <motion.div variants={fadeIn} className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Anggota Tim</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kenali para pengembang yang bekerja keras untuk menciptakan platform digital Karang Taruna
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all"
            >
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-techtona-2/30 group-hover:border-techtona-2 transition-all">
                  <Image 
                    src={member.avatar} 
                    alt={member.name} 
                    width={96} 
                    height={96} 
                    className="object-cover w-full h-full"
                  />
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-techtona-1 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-techtona-1 font-semibold">{member.role}</p>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <FaCode className="mr-1" />
                      {member.experience}
                    </span>
                    <span className="flex items-center">
                      <FaGlobe className="mr-1" />
                      {member.projects}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-techtona-6 text-techtona-1 text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4 pt-2">
                    <Link 
                      href={member.instagram} 
                      target="_blank"
                      className="text-gray-400 hover:text-pink-600 transition-colors"
                      aria-label={`Instagram ${member.name}`}
                    >
                      <FaInstagram className="text-xl" />
                    </Link>
                    <Link 
                      href={`mailto:${member.email}`}
                      className="text-gray-400 hover:text-techtona-1 transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <FaEnvelope className="text-xl" />
                    </Link>
                    <Link 
                      href={member.github} 
                      target="_blank"
                      className="text-gray-400 hover:text-gray-800 transition-colors"
                      aria-label={`GitHub ${member.name}`}
                    >
                      <FaGithub className="text-xl" />
                    </Link>
                    <Link 
                      href={member.linkedin} 
                      target="_blank"
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      aria-label={`LinkedIn ${member.name}`}
                    >
                      <FaLinkedin className="text-xl" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Technology Stack */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="space-y-12"
      >
        <motion.div variants={fadeIn} className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Teknologi yang Kami Gunakan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stack teknologi modern yang kami pilih untuk memastikan performa, keamanan, dan kemudahan maintenance
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ y: -3 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all"
            >
              <div className="text-techtona-1 mb-3 group-hover:scale-110 transition-transform">
                {tech.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{tech.name}</h3>
              <p className="text-xs text-gray-500">{tech.category}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Development Process */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-gradient-to-br from-techtona-1 to-techtona-4 p-12 rounded-3xl text-white space-y-8"
      >
        <motion.h2 variants={fadeIn} className="text-3xl font-bold text-center">
          Metodologi Pengembangan
        </motion.h2>
        
        <motion.div 
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div variants={fadeIn} className="text-center space-y-4">
            <div className="bg-techtona-6 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <FaCode className="text-2xl text-techtona-1" />
            </div>
            <h3 className="text-xl font-bold">Agile Development</h3>
            <p className="text-techtona-3 text-sm">
              Siklus pengembangan iteratif dengan sprint 2 minggu dan continuous feedback
            </p>
          </motion.div>
          
          <motion.div variants={fadeIn} className="text-center space-y-4">
            <div className="bg-techtona-6 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <FaPalette className="text-2xl text-techtona-1" />
            </div>
            <h3 className="text-xl font-bold">User-Centered Design</h3>
            <p className="text-techtona-3 text-sm">
              Fokus pada pengalaman pengguna dengan testing dan iterasi berkelanjutan
            </p>
          </motion.div>
          
                     <motion.div variants={fadeIn} className="text-center space-y-4">
             <div className="bg-techtona-6 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
               <FaCloud className="text-2xl text-techtona-1" />
             </div>
             <h3 className="text-xl font-bold">Azure Cloud</h3>
             <p className="text-techtona-3 text-sm">
               Arsitektur cloud-native dengan Microsoft Azure untuk skalabilitas dan keandalan tinggi
             </p>
           </motion.div>
        </motion.div>
      </motion.section>

      {/* Contact CTA */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="text-center space-y-8 bg-white p-12 rounded-3xl shadow-xl border border-gray-100"
      >
        <motion.h2 variants={fadeIn} className="text-3xl font-bold text-gray-900">
          Tertarik Bergabung?
        </motion.h2>
        <motion.p variants={fadeIn} className="text-gray-600 max-w-2xl mx-auto">
          Kami selalu terbuka untuk kolaborasi dan diskusi tentang pengembangan platform digital. 
          Mari berkenalan lebih dekat dengan tim kami.
        </motion.p>
        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-techtona-1 text-white font-semibold rounded-lg hover:bg-techtona-4 transition-colors"
          >
            <FaEnvelope className="mr-2" />
            Hubungi Tim
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center px-6 py-3 border-2 border-techtona-1 text-techtona-1 font-semibold rounded-lg hover:bg-techtona-1 hover:text-white transition-colors"
          >
            <FaGlobe className="mr-2" />
            Pelajari Lebih Lanjut
          </Link>
        </motion.div>
      </motion.section>
    </main>
  );
} 