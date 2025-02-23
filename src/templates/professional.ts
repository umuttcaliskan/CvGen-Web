export const professionalTemplate = {
  id: 'professional',
  name: 'Profesyonel',
  generateHTML: (cv: any, profileImageBase64: string | null) => {
    const safeCV = cv || {};
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${safeCV?.personal?.fullName || 'CV'}</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background: #fff;
              color: #333;
              line-height: 1.4;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .container {
              display: flex;
              width: 210mm;
              min-height: 297mm;
              margin: 0;
              box-sizing: border-box;
            }
            .sidebar {
              width: 30%;
              background: #2c3e50;
              color: white;
              padding: 20px;
              box-sizing: border-box;
            }
            .profile-section {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 1px solid rgba(255,255,255,0.1);
            }
            .profile-image {
              width: 120px;
              height: 120px;
              border-radius: 60px;
              margin: 0 auto 15px;
              object-fit: cover;
              border: 3px solid #fff;
            }
            .profile-initial {
              width: 120px;
              height: 120px;
              border-radius: 60px;
              background: #34495e;
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 48px;
              margin: 0 auto 15px;
              border: 3px solid #fff;
            }
            .sidebar-section {
              margin-bottom: 25px;
            }
            .sidebar-title {
              font-size: 16px;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 15px;
              color: #3498db;
            }
            .sidebar-content {
              font-size: 14px;
              margin-bottom: 8px;
            }
            .main-content {
              width: 70%;
              padding: 30px;
              box-sizing: border-box;
            }
            .section {
              margin-bottom: 25px;
              break-inside: avoid;
              page-break-inside: avoid;
            }
            .section-title {
              font-size: 20px;
              color: #2c3e50;
              border-bottom: 2px solid #3498db;
              padding-bottom: 8px;
              margin-bottom: 15px;
            }
            .experience-item {
              margin-bottom: 20px;
              break-inside: avoid;
              page-break-inside: avoid;
            }
            .item-title {
              font-weight: bold;
              color: #2c3e50;
              font-size: 16px;
              margin-bottom: 5px;
            }
            .item-subtitle {
              color: #7f8c8d;
              font-size: 14px;
              margin-bottom: 5px;
            }
            .item-date {
              color: #95a5a6;
              font-size: 13px;
              margin-bottom: 8px;
            }
            .item-description {
              color: #34495e;
              font-size: 14px;
              line-height: 1.5;
            }
            .skill-bar {
              background: rgba(255,255,255,0.1);
              height: 6px;
              border-radius: 3px;
              margin: 8px 0;
            }
            .skill-level {
              background: #3498db;
              height: 100%;
              border-radius: 3px;
            }
            .contact-info {
              display: flex;
              align-items: center;
              margin-bottom: 8px;
              gap: 8px;
              color: #ecf0f1;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="sidebar">
              <div class="profile-section">
                ${profileImageBase64 
                  ? `<img src="${profileImageBase64}" class="profile-image" alt="Profile" onerror="this.parentElement.innerHTML='<div class=\'profile-initial\'>${safeCV?.personal?.fullName?.charAt(0)?.toUpperCase() || 'U'}</div>';">`
                  : `<div class="profile-initial">${safeCV?.personal?.fullName?.charAt(0)?.toUpperCase() || 'U'}</div>`
                }
                <h1 style="color: white; font-size: 20px; margin: 0;">${safeCV?.personal?.fullName || 'İsimsiz'}</h1>
              </div>

              ${safeCV?.personal ? `
                <div class="sidebar-section">
                  <h2 class="sidebar-title">İletişim</h2>
                  ${safeCV.personal.email ? `<div class="contact-info">📧 ${safeCV.personal.email}</div>` : ''}
                  ${safeCV.personal.phone ? `<div class="contact-info">📱 ${safeCV.personal.phone}</div>` : ''}
                  ${safeCV.personal.address ? `<div class="contact-info">📍 ${safeCV.personal.address}</div>` : ''}
                </div>
              ` : ''}

              ${safeCV?.skills?.length > 0 ? `
                <div class="sidebar-section">
                  <h2 class="sidebar-title">Beceriler</h2>
                  ${safeCV.skills.map((skill: any) => `
                    <div class="sidebar-content">
                      ${skill.name}
                      <div class="skill-bar">
                        <div class="skill-level" style="width: ${
                          skill.level === 'Başlangıç' ? '25%' :
                          skill.level === 'Orta' ? '50%' :
                          skill.level === 'İleri' ? '75%' :
                          '100%'
                        };"></div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              ${safeCV?.languages?.length > 0 ? `
                <div class="sidebar-section">
                  <h2 class="sidebar-title">Diller</h2>
                  ${safeCV.languages.map((lang: any) => `
                    <div class="sidebar-content">
                      ${lang.name}
                      <div class="skill-bar">
                        <div class="skill-level" style="width: ${
                          lang.level === 'Başlangıç' ? '25%' :
                          lang.level === 'Orta' ? '50%' :
                          lang.level === 'İleri' ? '75%' :
                          '100%'
                        };"></div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>

            <div class="main-content">
              ${safeCV?.about ? `
                <div class="section">
                  <h2 class="section-title">Hakkımda</h2>
                  <p class="item-description">${safeCV.about}</p>
                </div>
              ` : ''}

              ${safeCV?.experience?.length > 0 ? `
                <div class="section">
                  <h2 class="section-title">İş Deneyimi</h2>
                  ${safeCV.experience.map((exp: any) => `
                    <div class="experience-item">
                      <div class="item-title">${exp.position}</div>
                      <div class="item-subtitle">${exp.companyName}</div>
                      <div class="item-date">${exp.startDate} - ${exp.endDate}</div>
                      <div class="item-description">${exp.description}</div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              ${safeCV?.education?.length > 0 ? `
                <div class="section">
                  <h2 class="section-title">Eğitim</h2>
                  ${safeCV.education.map((edu: any) => `
                    <div class="experience-item">
                      <div class="item-title">${edu.schoolName}</div>
                      <div class="item-subtitle">${edu.department}</div>
                      <div class="item-date">${edu.startDate} - ${edu.endDate}</div>
                      ${edu.gpa ? `<div class="item-description">Not Ortalaması: ${edu.gpa}</div>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              ${safeCV?.references?.length > 0 ? `
                <div class="section">
                  <h2 class="section-title">Referanslar</h2>
                  ${safeCV.references.map((ref: any) => `
                    <div class="experience-item">
                      <div class="item-title">${ref.fullName}</div>
                      <div class="item-subtitle">${ref.position} - ${ref.company}</div>
                      <div class="contact-info" style="color: #34495e">
                        ${ref.email ? `📧 ${ref.email}` : ''}
                        ${ref.phone ? `📱 ${ref.phone}` : ''}
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          </div>
        </body>
      </html>
    `;
  }
}; 