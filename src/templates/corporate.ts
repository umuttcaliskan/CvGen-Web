const corporateTemplate = {
  id: 'is-dunyasi',
  name: 'İş Dünyası',
  styles: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    primaryColor: '#0a4275',
    secondaryColor: '#2a6496'
  },
  generateHTML: (cv: any, profileImage: string | null) => {
    console.log('Sosyal Medya:', cv.socialMedia);
    console.log('Projeler:', cv.projects);
    
    return `
      <!DOCTYPE html>
      <html lang="tr">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${cv.personal?.fullName || 'CV'}</title>
          <style>
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  font-family: Arial, sans-serif;
              }
              
              body {
                  line-height: 1.6;
                  color: #333;
                  background-color: #fff;
              }
              
              .container {
                  max-width: 900px;
                  margin: 0 auto;
                  padding: 30px;
                  background-color: white;
              }
              
              .header {
                  border-bottom: 2px solid #0a4275;
                  padding-bottom: 20px;
                  margin-bottom: 25px;
                  display: flex;
                  gap: 20px;
              }
              
              .profile-image {
                  width: 120px;
                  height: 120px;
                  border-radius: 5px;
                  object-fit: cover;
                  border: 2px solid #0a4275;
                  display: block;
              }
              
              .header-content {
                  flex: 1;
              }
              
              .name {
                  font-size: 28px;
                  font-weight: bold;
                  color: #0a4275;
                  margin-bottom: 10px;
                  text-transform: uppercase;
              }
              
              .contact-grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                  gap: 5px 15px;
              }
              
              .contact-item {
                  margin-bottom: 5px;
              }
              
              .contact-label {
                  font-weight: bold;
                  display: inline-block;
                  min-width: 100px;
              }
              
              .section {
                  margin-bottom: 25px;
                  page-break-inside: auto;
                  break-inside: auto;
              }
              
              .section-heading {
                  font-size: 18px;
                  text-transform: uppercase;
                  color: #0a4275;
                  border-bottom: 1px solid #0a4275;
                  padding-bottom: 5px;
                  margin-bottom: 15px;
                  page-break-after: avoid;
                  break-after: avoid;
              }
              
              .item {
                  margin-bottom: 15px;
                  page-break-inside: avoid;
                  break-inside: avoid;
              }
              
              .item-title {
                  font-weight: bold;
                  font-size: 16px;
                  color: #333;
              }
              
              .item-subtitle {
                  font-weight: bold;
                  color: #555;
              }
              
              .item-date {
                  color: #666;
                  font-size: 14px;
                  margin-bottom: 5px;
              }
              
              .item-description {
                  text-align: justify;
                  page-break-inside: avoid;
                  break-inside: avoid;
              }
              
              .skills-grid {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: 10px;
              }
              
              .skill-item {
                  display: flex;
                  justify-content: space-between;
                  border-bottom: 1px dotted #ddd;
                  padding-bottom: 3px;
                  page-break-inside: avoid;
                  break-inside: avoid;
              }
              
              .certificates-grid {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: 15px;
              }
              
              /* İlk öğe ve başlık için özel kural */
              .section-heading + .item {
                  page-break-before: avoid;
                  break-before: avoid;
              }
              
              /* Tüm iş deneyimi, eğitim ve proje öğelerinin bölünmesini önle */
              .item p, .item div {
                  page-break-inside: avoid;
                  break-inside: avoid;
              }
              
              @media print {
                  body {
                      font-size: 12pt;
                  }
                  
                  .container {
                      width: 100%;
                      max-width: none;
                      padding: 20px;
                      box-shadow: none;
                  }
                  
                  /* Modern tarayıcılar için sayfa kesme kuralları */
                  h1, h2, h3, h4, h5, h6 {
                      page-break-after: avoid;
                      break-after: avoid;
                  }
                  
                  /* İçeriğin sayfa kesiminde daha iyi kontrol için */
                  .item, .item-description, .skill-item {
                      page-break-inside: avoid !important;
                      break-inside: avoid !important;
                  }
                  
                  /* Her bölüm başlığının bir sonraki öğeyle bağlantısını korumak için */
                  .section-heading {
                      page-break-after: avoid !important;
                      break-after: avoid !important;
                      margin-top: 10px;
                  }
                  
                  /* Sayfa kenar boşlukları ayarları */
                  @page {
                      margin-top: 40px;
                      margin-bottom: 30px;  /* Sayfa altında 30px boşluk */
                  }
                  
                  /* İlk sayfa için kenar boşlukları */
                  @page:first {
                      margin-top: 10px;
                      margin-bottom: 30px;  /* Sayfa altında 30px boşluk */
                  }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  ${profileImage ? 
                    profileImage.startsWith('http') || profileImage.startsWith('https') || profileImage.startsWith('blob:') || profileImage.startsWith('data:') ?
                      `<img class="profile-image" src="${profileImage}" alt="Profil Resmi" crossorigin="anonymous" onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'120\\' height=\\'120\\' viewBox=\\'0 0 120 120\\'%3E%3Ccircle cx=\\'60\\' cy=\\'40\\' r=\\'35\\' fill=\\'%23ccc\\'/%3E%3Crect x=\\'30\\' y=\\'75\\' width=\\'60\\' height=\\'35\\' rx=\\'15\\' fill=\\'%23ccc\\'/%3E%3C/svg%3E';">` :
                      `<img class="profile-image" src="data:image/jpeg;base64,${profileImage}" alt="Profil Resmi">`
                    : `<img class="profile-image" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='40' r='35' fill='%23ccc'/%3E%3Crect x='30' y='75' width='60' height='35' rx='15' fill='%23ccc'/%3E%3C/svg%3E" alt="Profil Resmi">`}
                  <div class="header-content">
                      <div class="name">${cv.personal?.fullName || 'AD SOYAD'}</div>
                      <div class="contact-grid">
                          ${cv.personal?.address ? `<div class="contact-item"><span class="contact-label">Adres:</span> ${cv.personal.address}</div>` : ''}
                          ${cv.personal?.phone ? `<div class="contact-item"><span class="contact-label">Telefon:</span> ${cv.personal.phone}</div>` : ''}
                          ${cv.personal?.email ? `<div class="contact-item"><span class="contact-label">E-posta:</span> ${cv.personal.email}</div>` : ''}
                          ${cv.personal?.birthDate ? `<div class="contact-item"><span class="contact-label">Doğum Tarihi:</span> ${cv.personal.birthDate}</div>` : ''}
                          ${cv.personal?.drivingLicense ? `<div class="contact-item"><span class="contact-label">Ehliyet:</span> ${cv.personal.drivingLicense}</div>` : ''}
                          ${cv.personal?.maritalStatus ? `<div class="contact-item"><span class="contact-label">Medeni Durum:</span> ${cv.personal.maritalStatus}</div>` : ''}
                          ${cv.personal?.militaryStatus ? `<div class="contact-item"><span class="contact-label">Askerlik:</span> ${cv.personal.militaryStatus}</div>` : ''}
                          ${cv.personal?.website ? `<div class="contact-item"><span class="contact-label">Web Sitesi:</span> ${cv.personal.website}</div>` : ''}
                      </div>
                  </div>
              </div>
              
              ${cv.socialMedia?.length > 0 ? `
              <div class="section">
                  <h2 class="section-heading">Sosyal Medya</h2>
                  <div class="contact-grid">
                      ${cv.socialMedia.map((social: any) => `
                      <div class="contact-item">
                          <span class="contact-label">${social.platform}:</span> 
                          <a href="${social.url || '#'}" target="_blank">${social.username}</a>
                      </div>
                      `).join('')}
                  </div>
              </div>
              ` : ''}
              
              ${cv.about ? `
              <div class="section">
                  <h2 class="section-heading">Hakkımda</h2>
                  <p>${cv.about}</p>
              </div>
              ` : ''}
              
              ${cv.experience?.length > 0 ? `
              <div class="section">
                  <h2 class="section-heading">İş Deneyimi</h2>
                  ${cv.experience.map((exp: any) => `
                  <div class="item">
                      <div class="item-title">${exp.position}</div>
                      <div class="item-subtitle">${exp.companyName}</div>
                      <div class="item-date">${exp.startDate} - ${exp.endDate || 'Devam Ediyor'}</div>
                      ${exp.description ? `<p class="item-description">${exp.description}</p>` : ''}
                  </div>
                  `).join('')}
              </div>
              ` : ''}
              
              ${cv.education?.length > 0 ? `
              <div class="section">
                  <h2 class="section-heading">Eğitim</h2>
                  ${cv.education.map((edu: any) => `
                  <div class="item">
                      <div class="item-title">${edu.department}</div>
                      <div class="item-subtitle">${edu.schoolName}</div>
                      <div class="item-date">${edu.startDate} - ${edu.endDate || 'Devam Ediyor'}</div>
                  </div>
                  `).join('')}
              </div>
              ` : ''}
              
              ${cv.projects?.length > 0 ? `
              <div class="section">
                  <h2 class="section-heading">Projeler</h2>
                  ${cv.projects.map((project: any) => `
                  <div class="item">
                      <div class="item-title">${project.name}</div>
                      <div class="item-date">${project.startDate} - ${project.endDate || 'Devam Ediyor'}</div>
                      ${project.description ? `<p class="item-description">${project.description}</p>` : ''}
                      ${project.technologies ? `<div class="item-technologies"><strong>Teknolojiler:</strong> ${project.technologies}</div>` : ''}
                      ${project.projectUrl ? `<div class="item-url"><strong>Proje URL:</strong> <a href="${project.projectUrl}" target="_blank">${project.projectUrl}</a></div>` : ''}
                  </div>
                  `).join('')}
              </div>
              ` : ''}
              
              ${cv.skills?.length > 0 ? `
              <div class="section">
                  <h2 class="section-heading">Beceriler</h2>
                  <div class="skills-grid">
                      ${cv.skills.map((skill: any) => `
                      <div class="skill-item">
                          <span>${skill.name}</span>
                          <span>${skill.level}</span>
                      </div>
                      `).join('')}
                  </div>
              </div>
              ` : ''}
              
              ${cv.languages?.length > 0 ? `
              <div class="section">
                  <h2 class="section-heading">Yabancı Diller</h2>
                  <div class="skills-grid">
                      ${cv.languages.map((lang: any) => `
                      <div class="skill-item">
                          <span>${lang.name}</span>
                          <span>${lang.level}</span>
                      </div>
                      `).join('')}
                  </div>
              </div>
              ` : ''}
              
              ${cv.certificates?.length > 0 ? `
              <div class="section">
                  <h2 class="section-heading">Sertifikalar</h2>
                  <div class="certificates-grid">
                      ${cv.certificates.map((cert: any) => `
                      <div class="item">
                          <div class="item-title">${cert.name}</div>
                          <div class="item-subtitle">${cert.institution}</div>
                          <div class="item-date">${cert.date}</div>
                      </div>
                      `).join('')}
                  </div>
              </div>
              ` : ''}
              
              ${cv.references?.length > 0 ? `
              <div class="section">
                  <h2 class="section-heading">Referanslar</h2>
                  ${cv.references.map((ref: any) => `
                  <div class="item">
                      <div class="item-title">${ref.fullName}</div>
                      <div class="item-subtitle">${ref.position}, ${ref.company}</div>
                      ${ref.phone ? `<div>Tel: ${ref.phone}</div>` : ''}
                      ${ref.email ? `<div>E-posta: ${ref.email}</div>` : ''}
                  </div>
                  `).join('')}
              </div>
              ` : ''}
          </div>
      </body>
      </html>
    `;
  }
};

export default corporateTemplate; 