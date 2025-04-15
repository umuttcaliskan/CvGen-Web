import React from 'react';
import { FaFileAlt, FaUser, FaGraduationCap, FaBriefcase, FaLanguage, FaAward, FaUserCheck, FaGlobe, FaProjectDiagram, FaEnvelope, FaPhone, FaExternalLinkAlt, FaPlus, FaTools } from 'react-icons/fa';

interface ViewCVModalProps {
  isOpen: boolean;
  onClose: () => void;
  viewCvData: any;
}

const ViewCVModal: React.FC<ViewCVModalProps> = ({ isOpen, onClose, viewCvData }) => {
  if (!isOpen || !viewCvData) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl mx-auto my-8 max-h-[85vh] overflow-hidden shadow-2xl animate-fadeIn">
        <div className="sticky top-0 bg-white z-10 border-b border-gray-100 backdrop-blur-lg bg-white/90">
          <div className="p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary p-2 rounded-lg">
                <FaFileAlt size={22} />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
                {viewCvData.title || 'CV Detayları'}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
              aria-label="Kapat"
            >
              <FaPlus className="transform rotate-45" size={20} />
            </button>
          </div>
          
          <div className="px-6 pb-3 flex gap-2 overflow-x-auto scrollbar-thin">
            {viewCvData.personal && (
              <button onClick={() => document.getElementById('section-personal')?.scrollIntoView({ behavior: 'smooth' })} 
                className="text-sm px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 whitespace-nowrap">
                Kişisel
              </button>
            )}
            {viewCvData.about && (
              <button onClick={() => document.getElementById('section-about')?.scrollIntoView({ behavior: 'smooth' })} 
                className="text-sm px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 whitespace-nowrap">
                Hakkımda
              </button>
            )}
            {viewCvData.education && viewCvData.education.length > 0 && (
              <button onClick={() => document.getElementById('section-education')?.scrollIntoView({ behavior: 'smooth' })} 
                className="text-sm px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 whitespace-nowrap">
                Eğitim
              </button>
            )}
            {viewCvData.experience && viewCvData.experience.length > 0 && (
              <button onClick={() => document.getElementById('section-experience')?.scrollIntoView({ behavior: 'smooth' })} 
                className="text-sm px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 whitespace-nowrap">
                İş Deneyimi
              </button>
            )}
            {viewCvData.skills && viewCvData.skills.length > 0 && (
              <button onClick={() => document.getElementById('section-skills')?.scrollIntoView({ behavior: 'smooth' })} 
                className="text-sm px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 whitespace-nowrap">
                Beceriler
              </button>
            )}
            {viewCvData.languages && viewCvData.languages.length > 0 && (
              <button onClick={() => document.getElementById('section-languages')?.scrollIntoView({ behavior: 'smooth' })} 
                className="text-sm px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 whitespace-nowrap">
                Diller
              </button>
            )}
            {viewCvData.certificates && viewCvData.certificates.length > 0 && (
              <button onClick={() => document.getElementById('section-certificates')?.scrollIntoView({ behavior: 'smooth' })} 
                className="text-sm px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 whitespace-nowrap">
                Sertifikalar
              </button>
            )}
            {viewCvData.references && viewCvData.references.length > 0 && (
              <button onClick={() => document.getElementById('section-references')?.scrollIntoView({ behavior: 'smooth' })} 
                className="text-sm px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 whitespace-nowrap">
                Referanslar
              </button>
            )}
            {viewCvData.socialMedia && viewCvData.socialMedia.length > 0 && (
              <button onClick={() => document.getElementById('section-social')?.scrollIntoView({ behavior: 'smooth' })} 
                className="text-sm px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 whitespace-nowrap">
                Sosyal Medya
              </button>
            )}
            {viewCvData.projects && viewCvData.projects.length > 0 && (
              <button onClick={() => document.getElementById('section-projects')?.scrollIntoView({ behavior: 'smooth' })} 
                className="text-sm px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 whitespace-nowrap">
                Projeler
              </button>
            )}
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(85vh-120px)] p-6 space-y-10 custom-scrollbar bg-white">
          {/* 1. Kişisel Bilgiler */}
          {viewCvData.personal && (
            <div id="section-personal" className="rounded-xl bg-gradient-to-tr from-white to-gray-50 p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-500/10 text-blue-500 p-2 rounded-lg">
                  <FaUser size={18} />
                </div>
                <h3 className="text-lg font-semibold">Kişisel Bilgiler</h3>
              </div>
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Ad Soyad</div>
                    <div className="font-medium">{viewCvData.personal.fullName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">E-posta</div>
                    <div className="font-medium">{viewCvData.personal.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Telefon</div>
                    <div className="font-medium">{viewCvData.personal.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Doğum Tarihi</div>
                    <div className="font-medium">{viewCvData.personal.birthDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Adres</div>
                    <div className="font-medium">{viewCvData.personal.address}</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {viewCvData.personal.gender && (
                    <div className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <span>Cinsiyet:</span>
                      <span className="font-semibold">{viewCvData.personal.gender}</span>
                    </div>
                  )}
                  {viewCvData.personal.maritalStatus && (
                    <div className="px-3 py-1.5 bg-pink-50 text-pink-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <span>Medeni Hal:</span>
                      <span className="font-semibold">{viewCvData.personal.maritalStatus}</span>
                    </div>
                  )}
                  {viewCvData.personal.drivingLicense && (
                    <div className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <span>Ehliyet:</span>
                      <span className="font-semibold">{viewCvData.personal.drivingLicense}</span>
                    </div>
                  )}
                  {viewCvData.personal.militaryStatus && (
                    <div className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <span>Askerlik:</span>
                      <span className="font-semibold">{viewCvData.personal.militaryStatus}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* 2. Hakkımda */}
          {viewCvData.about && (
            <div id="section-about" className="rounded-xl bg-gradient-to-tr from-white to-gray-50 p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-500/10 text-green-500 p-2 rounded-lg">
                  <FaFileAlt size={18} />
                </div>
                <h3 className="text-lg font-semibold">Hakkımda</h3>
              </div>
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <p className="whitespace-pre-line leading-relaxed">{viewCvData.about}</p>
              </div>
            </div>
          )}
          
          {/* 3. Eğitim */}
          {viewCvData.education && viewCvData.education.length > 0 && (
            <div id="section-education" className="rounded-xl bg-gradient-to-tr from-white to-gray-50 p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-yellow-500/10 text-yellow-500 p-2 rounded-lg">
                  <FaGraduationCap size={18} />
                </div>
                <h3 className="text-lg font-semibold">Eğitim Bilgileri</h3>
              </div>
              <div className="space-y-4">
                {viewCvData.education.map((edu: any, index: number) => (
                  <div key={edu.id || index} className="rounded-lg bg-white p-5 shadow-sm transition-all hover:shadow-md">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-semibold text-lg">{edu.schoolName}</div>
                        <div className="text-gray-700">{edu.department}</div>
                      </div>
                      <div className="bg-yellow-50 text-yellow-700 px-3 h-fit py-1 rounded-full text-xs font-medium">
                        {edu.startDate} - {edu.endDate || 'Devam Ediyor'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 4. İş Deneyimi */}
          {viewCvData.experience && viewCvData.experience.length > 0 && (
            <div id="section-experience" className="rounded-xl bg-gradient-to-tr from-white to-gray-50 p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-500/10 text-red-500 p-2 rounded-lg">
                  <FaBriefcase size={18} />
                </div>
                <h3 className="text-lg font-semibold">İş Deneyimleri</h3>
              </div>
              <div className="space-y-4">
                {viewCvData.experience.map((exp: any, index: number) => (
                  <div key={exp.id || index} className="rounded-lg bg-white p-5 shadow-sm transition-all hover:shadow-md">
                    <div className="flex justify-between mb-2">
                      <div>
                        <div className="font-semibold text-lg">{exp.position}</div>
                        <div className="text-gray-700">{exp.companyName}</div>
                      </div>
                      <div className="bg-red-50 text-red-700 px-3 h-fit py-1 rounded-full text-xs font-medium">
                        {exp.startDate} - {exp.endDate || 'Devam Ediyor'}
                      </div>
                    </div>
                    {exp.description && (
                      <div className="mt-3 text-gray-600 border-t border-gray-100 pt-3">
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 5. Beceriler */}
          {viewCvData.skills && viewCvData.skills.length > 0 && (
            <div id="section-skills" className="rounded-xl bg-gradient-to-tr from-white to-gray-50 p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-500/10 text-orange-500 p-2 rounded-lg">
                  <FaTools size={18} />
                </div>
                <h3 className="text-lg font-semibold">Beceriler</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {viewCvData.skills.map((skill: any, index: number) => (
                  <div key={skill.id || index} className="rounded-lg bg-white p-4 shadow-sm flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <div className="flex items-center">
                      <div className="px-2.5 py-1 rounded-full text-xs font-medium"
                           style={{
                             backgroundColor: 
                               skill.level === 'Başlangıç' ? 'rgba(239, 68, 68, 0.1)' :
                               skill.level === 'Orta' ? 'rgba(245, 158, 11, 0.1)' :
                               skill.level === 'İyi' ? 'rgba(16, 185, 129, 0.1)' :
                               skill.level === 'Çok İyi' ? 'rgba(59, 130, 246, 0.1)' :
                               'rgba(124, 58, 237, 0.1)',
                             color:
                               skill.level === 'Başlangıç' ? 'rgb(239, 68, 68)' :
                               skill.level === 'Orta' ? 'rgb(245, 158, 11)' :
                               skill.level === 'İyi' ? 'rgb(16, 185, 129)' : 
                               skill.level === 'Çok İyi' ? 'rgb(59, 130, 246)' :
                               'rgb(124, 58, 237)'
                           }}>
                        {skill.level}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 6. Diller */}
          {viewCvData.languages && viewCvData.languages.length > 0 && (
            <div id="section-languages" className="rounded-xl bg-gradient-to-tr from-white to-gray-50 p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-500/10 text-purple-500 p-2 rounded-lg">
                  <FaLanguage size={18} />
                </div>
                <h3 className="text-lg font-semibold">Diller</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {viewCvData.languages.map((lang: any, index: number) => (
                  <div key={lang.id || index} className="rounded-lg bg-white p-4 shadow-sm flex justify-between items-center">
                    <span className="font-medium">{lang.name}</span>
                    <div className="flex items-center">
                      <div className="px-2.5 py-1 rounded-full text-xs font-medium"
                           style={{
                             backgroundColor: 
                               lang.level === 'A1' || lang.level === 'A2' ? 'rgba(239, 68, 68, 0.1)' :
                               lang.level === 'B1' || lang.level === 'B2' ? 'rgba(245, 158, 11, 0.1)' :
                               lang.level === 'C1' || lang.level === 'C2' ? 'rgba(16, 185, 129, 0.1)' :
                               'rgba(124, 58, 237, 0.1)',
                             color:
                               lang.level === 'A1' || lang.level === 'A2' ? 'rgb(239, 68, 68)' :
                               lang.level === 'B1' || lang.level === 'B2' ? 'rgb(245, 158, 11)' :
                               lang.level === 'C1' || lang.level === 'C2' ? 'rgb(16, 185, 129)' : 
                               'rgb(124, 58, 237)'
                           }}>
                          {lang.level}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 7. Sertifikalar */}
          {viewCvData.certificates && viewCvData.certificates.length > 0 && (
            <div id="section-certificates" className="rounded-xl bg-gradient-to-tr from-white to-gray-50 p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-amber-500/10 text-amber-500 p-2 rounded-lg">
                  <FaAward size={18} />
                </div>
                <h3 className="text-lg font-semibold">Sertifikalar</h3>
              </div>
              <div className="space-y-4">
                {viewCvData.certificates.map((cert: any, index: number) => (
                  <div key={cert.id || index} className="rounded-lg bg-white p-5 shadow-sm flex justify-between items-start transition-all hover:shadow-md">
                    <div>
                      <div className="font-semibold text-lg">{cert.name}</div>
                      <div className="text-gray-700">{cert.institution}</div>
                    </div>
                    <div className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
                      {cert.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 8. Referanslar */}
          {viewCvData.references && viewCvData.references.length > 0 && (
            <div id="section-references" className="rounded-xl bg-gradient-to-tr from-white to-gray-50 p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-teal-500/10 text-teal-500 p-2 rounded-lg">
                  <FaUserCheck size={18} />
                </div>
                <h3 className="text-lg font-semibold">Referanslar</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {viewCvData.references.map((ref: any, index: number) => (
                  <div key={ref.id || index} className="rounded-lg bg-white p-5 shadow-sm transition-all hover:shadow-md">
                    <div className="font-semibold text-lg">{ref.fullName}</div>
                    <div className="text-gray-700 mb-2">{ref.position}, {ref.company}</div>
                    <div className="space-y-1 mt-3 text-sm">
                      {ref.email && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaEnvelope className="text-teal-500" size={14} />
                          <span>{ref.email}</span>
                        </div>
                      )}
                      {ref.phone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaPhone className="text-teal-500" size={14} />
                          <span>{ref.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 9. Sosyal Medya */}
          {viewCvData.socialMedia && viewCvData.socialMedia.length > 0 && (
            <div id="section-social" className="rounded-xl bg-gradient-to-tr from-white to-gray-50 p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-500/10 text-blue-500 p-2 rounded-lg">
                  <FaGlobe size={18} />
                </div>
                <h3 className="text-lg font-semibold">Sosyal Medya</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {viewCvData.socialMedia.map((social: any, index: number) => (
                  <div key={social.id || index} className="rounded-lg bg-white p-5 shadow-sm flex justify-between items-center transition-all hover:shadow-md">
                    <div>
                      <div className="font-semibold">{social.platform}</div>
                      <div className="text-gray-600">{social.username}</div>
                    </div>
                    {social.url && (
                      <a 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
                      >
                        Görüntüle
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 10. Projeler */}
          {viewCvData.projects && viewCvData.projects.length > 0 && (
            <div id="section-projects" className="rounded-xl bg-gradient-to-tr from-white to-gray-50 p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-500/10 text-green-500 p-2 rounded-lg">
                  <FaProjectDiagram size={18} />
                </div>
                <h3 className="text-lg font-semibold">Projeler</h3>
              </div>
              <div className="space-y-5">
                {viewCvData.projects.map((project: any, index: number) => (
                  <div key={project.id || index} className="rounded-lg bg-white p-5 shadow-sm transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-3">
                      <div className="font-semibold text-lg">{project.name}</div>
                      <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                        {project.startDate} - {project.endDate || 'Devam Ediyor'}
                      </div>
                    </div>
                    
                    {project.description && (
                      <div className="mb-3 text-gray-700">{project.description}</div>
                    )}
                    
                    {project.technologies && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.technologies.split(',').map((tech: string, i: number) => (
                          <span key={i} className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {project.projectUrl && (
                      <div className="mt-4">
                        <a 
                          href={project.projectUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-medium"
                        >
                          <FaExternalLinkAlt size={12} />
                          Proje Bağlantısı
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCVModal; 