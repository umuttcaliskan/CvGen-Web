export const modernTemplate = {
  id: 'modern',
  name: 'Modern',
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
              font-family: 'Helvetica', sans-serif;
              margin: 0;
              padding: 0;
              background: #fff;
              color: #333;
              line-height: 1.4;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .container {
              width: 210mm;
              min-height: 297mm;
              margin: 0;
              padding: 10mm;
              box-sizing: border-box;
            }
            .header {
              position: relative;
              margin-bottom: 10mm;
              display: flex;
              align-items: flex-start;
              background: #f8f9fa;
              padding: 15px;
              border-radius: 8px;
              box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            }
            .profile-image {
              width: 100px;
              height: 100px;
              border-radius: 50px;
              object-fit: cover;
              border: 3px solid #fff;
              box-shadow: 0 2px 5px rgba(0,0,0,0.1);
              flex-shrink: 0;
            }
            .profile-initial {
              width: 100px;
              height: 100px;
              border-radius: 50px;
              background: #1e40af;
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 36px;
              font-weight: bold;
              flex-shrink: 0;
            }
            .personal-info {
              margin-left: 15px;
              flex-grow: 1;
              overflow: hidden;
            }
            h1 {
              margin: 0 0 5px 0;
              color: #1a1a1a;
              font-size: 24px;
              line-height: 1.2;
              word-wrap: break-word;
            }
            .section {
              break-inside: avoid;
              page-break-inside: avoid;
              margin-bottom: 8mm;
              background: #fff;
              padding: 12px;
              border-radius: 6px;
              box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            }
            .section-title {
              color: #1e40af;
              font-size: 18px;
              margin-bottom: 10px;
              padding-bottom: 5px;
              border-bottom: 1px solid #e5e7eb;
            }
            .item {
              break-inside: avoid;
              page-break-inside: avoid;
              margin-bottom: 3mm;
              padding: 10px;
              background: #f8f9fa;
              border-radius: 6px;
            }
            .item:last-child {
              margin-bottom: 0;
            }
            .item-title {
              font-weight: bold;
              color: #2d3748;
              margin-bottom: 3px;
              font-size: 14px;
            }
            .item-subtitle {
              color: #4a5568;
              margin-bottom: 3px;
              font-size: 13px;
            }
            .item-date {
              color: #718096;
              font-size: 12px;
              margin-bottom: 5px;
            }
            .item-description {
              color: #4a5568;
              font-size: 13px;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .contact-info {
              color: #4a5568;
              margin-top: 5px;
              font-size: 13px;
            }
            .contact-info div {
              margin: 2px 0;
              display: flex;
              align-items: center;
              gap: 5px;
            }
            .skills-bar {
              background: #e5e7eb;
              height: 6px;
              border-radius: 3px;
              margin-top: 5px;
              overflow: hidden;
            }
            .skills-bar .fill {
              background: #1e40af;
              height: 100%;
              border-radius: 3px;
            }
            .personal-details {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
              gap: 8px;
              margin-top: 8px;
            }
            .personal-detail-item {
              background: #f8f9fa;
              padding: 8px;
              border-radius: 4px;
              font-size: 12px;
            }
            .personal-detail-item .item-title {
              font-size: 12px;
              margin-bottom: 2px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              ${profileImageBase64 
                ? `<img src="${profileImageBase64}" class="profile-image" alt="Profile" onerror="this.parentElement.innerHTML='<div class=\'profile-initial\'>${safeCV?.personal?.fullName?.charAt(0)?.toUpperCase() || 'U'}</div>';">`
                : `<div class="profile-initial">${safeCV?.personal?.fullName?.charAt(0)?.toUpperCase() || 'U'}</div>`
              }
              <div class="personal-info">
                <h1>${safeCV?.personal?.fullName || 'İsimsiz'}</h1>
                <div class="contact-info">
                  ${safeCV?.personal?.email ? `<div>📧 ${safeCV.personal.email}</div>` : ''}
                  ${safeCV?.personal?.phone ? `<div>📱 ${safeCV.personal.phone}</div>` : ''}
                  ${safeCV?.personal?.address ? `<div>📍 ${safeCV.personal.address}</div>` : ''}
                </div>
                <div class="personal-details">
                  ${safeCV?.personal?.birthDate ? `
                    <div class="personal-detail-item">
                      <div class="item-title">Doğum Tarihi</div>
                      <div>${safeCV.personal.birthDate}</div>
                    </div>
                  ` : ''}
                  ${safeCV?.personal?.maritalStatus ? `
                    <div class="personal-detail-item">
                      <div class="item-title">Medeni Durum</div>
                      <div>${safeCV.personal.maritalStatus}</div>
                    </div>
                  ` : ''}
                  ${safeCV?.personal?.militaryStatus ? `
                    <div class="personal-detail-item">
                      <div class="item-title">Askerlik Durumu</div>
                      <div>${safeCV.personal.militaryStatus}</div>
                    </div>
                  ` : ''}
                  ${safeCV?.personal?.drivingLicense ? `
                    <div class="personal-detail-item">
                      <div class="item-title">Ehliyet</div>
                      <div>${safeCV.personal.drivingLicense}</div>
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>
            
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
                  <div class="item">
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
                  <div class="item">
                    <div class="item-title">${edu.schoolName}</div>
                    <div class="item-subtitle">${edu.department}</div>
                    <div class="item-date">${edu.startDate} - ${edu.endDate}</div>
                    ${edu.gpa ? `<div class="item-description">Not Ortalaması: ${edu.gpa}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${safeCV?.certificates?.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Sertifikalar</h2>
                ${safeCV.certificates.map((cert: any) => `
                  <div class="item">
                    <div class="item-title">${cert.name}</div>
                    <div class="item-subtitle">${cert.institution}</div>
                    <div class="item-date">${cert.date}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${safeCV?.skills?.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Beceriler</h2>
                ${safeCV.skills.map((skill: any) => `
                  <div class="item">
                    <div class="item-title">${skill.name}</div>
                    <div class="skills-bar">
                      <div class="fill" style="width: ${
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
              <div class="section">
                <h2 class="section-title">Yabancı Diller</h2>
                ${safeCV.languages.map((lang: any) => `
                  <div class="item">
                    <div class="item-title">${lang.name}</div>
                    <div class="skills-bar">
                      <div class="fill" style="width: ${
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

            ${safeCV?.references?.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Referanslar</h2>
                ${safeCV.references.map((ref: any) => `
                  <div class="item">
                    <div class="item-title">${ref.fullName}</div>
                    <div class="item-subtitle">${ref.position} - ${ref.company}</div>
                    <div class="contact-info">
                      ${ref.email ? `<div>📧 ${ref.email}</div>` : ''}
                      ${ref.phone ? `<div>📱 ${ref.phone}</div>` : ''}
                    </div>
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