const geceMavisiTemplate = {
  id: 'gece-mavisi',
  name: 'Gece Mavisi',
  styles: {
    fontFamily: 'Montserrat, sans-serif',
    backgroundColor: '#f4f4f4',
    primaryColor: '#2c3e50',
    secondaryColor: '#f8f9fa'
  },
  generateHTML: (cv: any, profileImageBase64: string | null) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${cv.personal?.fullName || 'CV'}</title>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap" rel="stylesheet">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Montserrat', sans-serif;
        }
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f4f4f4;
        }
        .cv-container {
          display: flex;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .left-section {
          width: 35%;
          background: #f8f9fa;
          padding: 30px;
          text-align: center;
        }
        .profile-image {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          margin-bottom: 20px;
          object-fit: cover;
        }
        .profile-initial {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          margin: 0 auto 20px;
          background: #2c3e50;
          color: white;
          font-size: 56px;
          line-height: 150px;
          text-align: center;
        }
        .left-section h2 {
          font-size: 24px;
          margin-bottom: 5px;
        }
        .left-section p {
          font-size: 15px;
          color: #777;
          margin-bottom: 15px;
        }
        .section-title {
          margin-top: 25px;
          font-weight: bold;
          border-bottom: 1px solid #ccc;
          padding-bottom: 8px;
          text-align: left;
        }
        .contact-info {
          text-align: left;
        }
        .contact-info p {
          display: flex;
          align-items: center;
          font-size: 14px;
          margin: 10px 0;
        }
        .right-section {
          width: 65%;
          background: #2c3e50;
          color: white;
          padding: 30px;
        }
        .right-section h3 {
          border-bottom: 1px solid white;
          padding-bottom: 8px;
          margin: 25px 0 15px;
          font-size: 20px;
        }
        .right-section h3:first-child {
          margin-top: 0;
        }
        .experience-item, .education-item {
          margin-bottom: 20px;
        }
        .item-title {
          font-weight: bold;
          margin-bottom: 5px;
          font-size: 16px;
        }
        .item-subtitle {
          color: #ecf0f1;
          font-size: 15px;
          margin-bottom: 5px;
        }
        .item-date {
          color: #bdc3c7;
          font-size: 13px;
          margin-bottom: 8px;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 15px;
        }
        .skill-item {
          font-size: 15px;
          padding: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        /* Referanslar için grid yapısı */
        .references-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-top: 15px;
        }
        .reference-item {
          margin-bottom: 15px;
          page-break-inside: avoid;
          break-inside: avoid;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 5px;
          padding: 12px;
        }
        
        /* Sayfa geçişlerinde bölünmeyi önleme */
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          
          .cv-container {
            width: 100%;
            max-width: 100%;
            margin: 0;
            box-shadow: none;
            min-height: 100vh;
          }
          
          .left-section, .right-section {
            padding: 20px 25px;
          }
          
          .experience-item, .education-item, .reference-item {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          @page {
            size: A4;
            margin: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="cv-container">
        <div class="left-section">
          ${profileImageBase64 ? 
            `<img src="${profileImageBase64}" class="profile-image" alt="Profile">` :
            `<div class="profile-initial">${cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}</div>`
          }
          <h2>${cv.personal?.fullName || 'İsimsiz'}</h2>
          ${cv.experience?.[0]?.position ? 
            `<p>${cv.experience[0].position}</p>` : ''
          }
          
          <div class="section-title">Hakkımda</div>
          <p>${cv.about || ''}</p>

          <div class="section-title">İletişim</div>
          <div class="contact-info">
            ${cv.personal?.phone ? `<p>📞 ${cv.personal.phone}</p>` : ''}
            ${cv.personal?.email ? `<p>📧 ${cv.personal.email}</p>` : ''}
            ${cv.personal?.address ? `<p>📍 ${cv.personal.address}</p>` : ''}
          </div>

          ${cv.personal?.birthDate || cv.personal?.maritalStatus || cv.personal?.militaryStatus || cv.personal?.drivingLicense || cv.personal?.nationality ? `
            <div class="section-title">Kişisel Bilgiler</div>
            <div class="contact-info">
              ${cv.personal?.birthDate ? `<p>🎂 ${cv.personal.birthDate}</p>` : ''}
              ${cv.personal?.maritalStatus ? `<p>💍 ${cv.personal.maritalStatus}</p>` : ''}
              ${cv.personal?.militaryStatus ? `<p>🛡️ ${cv.personal.militaryStatus}</p>` : ''}
              ${cv.personal?.drivingLicense ? `<p>🚗 ${cv.personal.drivingLicense}</p>` : ''}
              ${cv.personal?.nationality ? `<p>🌍 ${cv.personal.nationality}</p>` : ''}
            </div>
          ` : ''}

          ${cv.socialMedia?.length > 0 ? `
            <div class="section-title">Sosyal Medya</div>
            <div class="contact-info">
              ${cv.socialMedia.map((social: any) => `
                <p>🔗 ${getPlatformName(social.platform)}: ${social.username}</p>
              `).join('')}
            </div>
          ` : ''}

          ${cv.languages?.length > 0 ? `
            <div class="section-title">Diller</div>
            <div class="contact-info">
              ${cv.languages.map((lang: any) => `
                <p>${lang.name} - ${lang.level}</p>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <div class="right-section">
          ${cv.education?.length > 0 ? `
            <h3>Eğitim</h3>
            ${cv.education.map((edu: any) => `
              <div class="education-item">
                <div class="item-title">${edu.schoolName}</div>
                <div class="item-subtitle">${edu.department}</div>
                <div class="item-date">${edu.startDate} - ${edu.endDate}</div>
              </div>
            `).join('')}
          ` : ''}

          ${cv.experience?.length > 0 ? `
            <h3>İş Deneyimi</h3>
            ${cv.experience.map((exp: any) => `
              <div class="experience-item">
                <div class="item-title">${exp.position}</div>
                <div class="item-subtitle">${exp.companyName}</div>
                <div class="item-date">${exp.startDate} - ${exp.endDate}</div>
                <p>${exp.description}</p>
              </div>
            `).join('')}
          ` : ''}

          ${cv.projects?.length > 0 ? `
            <h3>Projeler</h3>
            ${cv.projects.map((project: any) => `
              <div class="experience-item">
                <div class="item-title">${project.name}</div>
                <div class="item-date">${project.startDate} - ${project.endDate}</div>
                <p>${project.description}</p>
                ${project.technologies ? `<div class="item-subtitle">Teknolojiler: ${project.technologies}</div>` : ''}
                ${project.projectUrl ? `<div class="item-subtitle">URL: ${project.projectUrl}</div>` : ''}
              </div>
            `).join('')}
          ` : ''}

          ${cv.certificates?.length > 0 ? `
            <h3>Sertifikalar</h3>
            <div class="skills-grid">
              ${cv.certificates.map((cert: any) => `
                <div class="experience-item">
                  <div class="item-title">${cert.name}</div>
                  <div class="item-subtitle">${cert.institution}</div>
                  <div class="item-date">${cert.date}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${cv.skills?.length > 0 ? `
            <h3>Beceriler</h3>
            <div class="skills-grid">
              ${cv.skills.map((skill: any) => `
                <div class="skill-item">${skill.name}</div>
              `).join('')}
            </div>
          ` : ''}

          ${cv.references?.length > 0 ? `
            <h3>Referanslar</h3>
            <div class="references-grid">
              ${cv.references.map((ref: any) => `
                <div class="reference-item">
                  <div class="item-title">${ref.fullName}</div>
                  <div class="item-subtitle">${ref.position} - ${ref.company}</div>
                  ${ref.email ? `<div class="item-date">📧 ${ref.email}</div>` : ''}
                  ${ref.phone ? `<div class="item-date">📞 ${ref.phone}</div>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `
};

// Sosyal medya platformu adını düzgün formatta almak için yardımcı fonksiyon
function getPlatformName(platform: string): string {
  const platform_lc = platform.toLowerCase();
  if (platform_lc.includes('linkedin')) return 'LinkedIn';
  if (platform_lc.includes('github')) return 'GitHub';
  if (platform_lc.includes('twitter')) return 'Twitter';
  if (platform_lc.includes('x')) return 'X';
  if (platform_lc.includes('facebook')) return 'Facebook';
  if (platform_lc.includes('instagram')) return 'Instagram';
  if (platform_lc.includes('youtube')) return 'YouTube';
  if (platform_lc.includes('medium')) return 'Medium';
  if (platform_lc.includes('stackoverflow')) return 'Stack Overflow';
  if (platform_lc.includes('behance')) return 'Behance';
  if (platform_lc.includes('dribbble')) return 'Dribbble';
  if (platform_lc.includes('pinterest')) return 'Pinterest';
  if (platform_lc.includes('website')) return 'Web Sitesi';
  
  // Platform adı bulunamadıysa, girilenin ilk harfini büyük yaparak göster
  return platform.charAt(0).toUpperCase() + platform.slice(1);
}

export default geceMavisiTemplate; 