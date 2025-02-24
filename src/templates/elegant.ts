export const elegantTemplate = {
  id: 'elegant',
  name: 'Elegant',
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
            font-family: 'Helvetica', 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            color: #334155;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .container {
            width: 210mm;
            min-height: 297mm;
            display: flex;
            margin: 0;
          }
          .sidebar {
            width: 32%;
            background: #1e3a8a;
            color: white;
            padding: 40px 25px;
            min-height: 297mm;
          }
          .profile-section {
            text-align: center;
            margin-bottom: 40px;
          }
          .profile-image {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            border: 3px solid rgba(255, 255, 255, 0.3);
            margin: 0 auto 20px;
            object-fit: cover;
          }
          .profile-initial {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            border: 3px solid rgba(255, 255, 255, 0.3);
            margin: 0 auto 20px;
            background: #2563eb;
            color: white;
            font-size: 64px;
            line-height: 140px;
            text-align: center;
          }
          .section-title {
            font-size: 18px;
            font-weight: 600;
            margin: 30px 0 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .content {
            width: 68%;
            padding: 40px;
            background: white;
          }
          .content-section {
            margin-bottom: 30px;
            break-inside: avoid;
          }
          .content-title {
            font-size: 22px;
            color: #1e3a8a;
            margin-bottom: 20px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e2e8f0;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .experience-item, .education-item {
            margin-bottom: 25px;
            break-inside: avoid-page;
            page-break-inside: avoid;
            padding-left: 15px;
            border-left: 2px solid #e2e8f0;
          }
          .item-title {
            font-size: 17px;
            font-weight: 600;
            color: #1e3a8a;
            margin-bottom: 4px;
          }
          .item-subtitle {
            font-size: 15px;
            color: #64748b;
            margin-bottom: 4px;
          }
          .item-date {
            font-size: 14px;
            color: #94a3b8;
            margin-bottom: 8px;
          }
          .contact-info {
            margin-top: 15px;
          }
          .contact-item {
            margin: 10px 0;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.9);
          }
          .skill-item {
            margin-bottom: 12px;
          }
          .skill-name {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;
            font-size: 14px;
          }
          .skill-bar {
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
          }
          .skill-level {
            height: 100%;
            background: white;
            border-radius: 2px;
          }
          .certificates-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            break-inside: avoid-page;
          }
          .certificate-item {
            background: #f8fafc;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
          }
          .references-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }
          .reference-item {
            background: #f8fafc;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
          }
          @media print {
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .sidebar {
              background-color: #1e3a8a !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="sidebar">
            <div class="profile-section">
              ${profileImageBase64 ? 
                `<img src="${profileImageBase64}" class="profile-image" alt="Profile">` : 
                `<div class="profile-initial">${safeCV?.personal?.fullName?.charAt(0)?.toUpperCase() || 'U'}</div>`
              }
              <h1 style="font-size: 24px; margin: 0; font-weight: 600;">${safeCV?.personal?.fullName || 'İsimsiz'}</h1>
              ${safeCV?.experience?.[0]?.position ? 
                `<p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0; font-size: 16px;">${safeCV.experience[0].position}</p>` : ''
              }
            </div>

            <div class="section">
              <h2 class="section-title">İletişim</h2>
              <div class="contact-info">
                ${safeCV?.personal?.email ? `<div class="contact-item">📧 ${safeCV.personal.email}</div>` : ''}
                ${safeCV?.personal?.phone ? `<div class="contact-item">📱 ${safeCV.personal.phone}</div>` : ''}
                ${safeCV?.personal?.address ? `<div class="contact-item">📍 ${safeCV.personal.address}</div>` : ''}
              </div>
            </div>

            ${safeCV?.skills?.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Beceriler</h2>
                ${safeCV.skills.map((skill: any) => `
                  <div class="skill-item">
                    <div class="skill-name">
                      <span>${skill.name}</span>
                      <span>${skill.level}</span>
                    </div>
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
              <div class="section">
                <h2 class="section-title">Yabancı Diller</h2>
                ${safeCV.languages.map((lang: any) => `
                  <div class="skill-item">
                    <div class="skill-name">
                      <span>${lang.name}</span>
                      <span>${lang.level}</span>
                    </div>
                    <div class="skill-bar">
                      <div class="skill-level" style="width: ${
                        lang.level === 'A1' ? '16.66%' :
                        lang.level === 'A2' ? '33.33%' :
                        lang.level === 'B1' ? '50%' :
                        lang.level === 'B2' ? '66.66%' :
                        lang.level === 'C1' ? '83.33%' :
                        '100%'
                      };"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <div class="content">
            ${safeCV?.about ? `
              <div class="content-section">
                <h2 class="content-title">Hakkımda</h2>
                <p style="font-size: 15px; line-height: 1.6;">${safeCV.about}</p>
              </div>
            ` : ''}

            ${safeCV?.experience?.length > 0 ? `
              <div class="content-section">
                <h2 class="content-title">İş Deneyimi</h2>
                ${safeCV.experience.map((exp: any) => `
                  <div class="experience-item">
                    <div class="item-title">${exp.position}</div>
                    <div class="item-subtitle">${exp.companyName}</div>
                    <div class="item-date">${exp.startDate} - ${exp.endDate}</div>
                    <p style="margin-top: 8px; color: #475569; font-size: 14px;">${exp.description}</p>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${safeCV?.education?.length > 0 ? `
              <div class="content-section">
                <h2 class="content-title">Eğitim</h2>
                ${safeCV.education.map((edu: any) => `
                  <div class="education-item">
                    <div class="item-title">${edu.schoolName}</div>
                    <div class="item-subtitle">${edu.department}</div>
                    <div class="item-date">${edu.startDate} - ${edu.endDate}</div>
                    ${edu.gpa ? `<p style="margin-top: 4px; color: #475569; font-size: 14px;">Not Ortalaması: ${edu.gpa}</p>` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${safeCV?.certificates?.length > 0 ? `
              <div class="content-section">
                <h2 class="content-title">Sertifikalar</h2>
                <div class="certificates-grid">
                  ${safeCV.certificates.map((cert: any) => `
                    <div class="certificate-item">
                      <div class="item-title" style="font-size: 15px;">${cert.name}</div>
                      <div class="item-subtitle" style="font-size: 14px;">${cert.institution}</div>
                      <div class="item-date">${cert.date}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            ${safeCV?.references?.length > 0 ? `
              <div class="content-section">
                <h2 class="content-title">Referanslar</h2>
                <div class="references-grid">
                  ${safeCV.references.map((ref: any) => `
                    <div class="reference-item">
                      <div class="item-title" style="font-size: 15px;">${ref.fullName}</div>
                      <div class="item-subtitle" style="font-size: 14px;">${ref.position} - ${ref.company}</div>
                      <div style="margin-top: 8px; font-size: 13px; color: #64748b;">
                        ${ref.email ? `<div>📧 ${ref.email}</div>` : ''}
                        ${ref.phone ? `<div>📱 ${ref.phone}</div>` : ''}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </body>
    </html>
    `;
  }
}; 