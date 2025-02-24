export const feminineTemplate = {
  id: 'feminine',
  name: 'Feminine',
  generateHTML: (cv: any, profileImageBase64: string | null) => {
    // Tarih formatlama fonksiyonu
    const formatDate = (date: string) => {
      if (!date) return '';
      if (date === 'Devam Ediyor') return date;
      
      const months = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
      ];
      
      const [year, month] = date.split('-');
      return `${months[parseInt(month) - 1]} ${year}`;
    };

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${cv?.personal?.fullName || 'CV'}</title>
        <style>
          body {
            font-family: 'Helvetica', sans-serif;
            margin: 0;
            padding: 0;
            background: #fff;
            color: #2d3748;
            line-height: 1.4;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .container {
            width: 210mm;
            min-height: 297mm;
            margin: 0;
            display: flex;
            flex-direction: column;
          }

          .header {
            background: linear-gradient(135deg, #ff8fab 0%, #ffc2d1 100%);
            padding: 40px;
            color: white;
            display: flex;
            align-items: center;
            gap: 30px;
          }

          .profile-image {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .profile-initial {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            color: white;
            border: 4px solid rgba(255, 255, 255, 0.8);
          }

          .name-title {
            flex: 1;
          }

          h1 {
            font-size: 32px;
            margin: 0;
            color: white;
            font-weight: 600;
            letter-spacing: 0.5px;
          }

          .position {
            font-size: 18px;
            margin-top: 8px;
            color: rgba(255, 255, 255, 0.9);
          }

          .main-content {
            padding: 30px 40px;
            display: grid;
            gap: 25px;
          }

          .section {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          h2 {
            font-size: 18px;
            color: #ff8fab;
            margin: 0 0 15px 0;
            padding-bottom: 8px;
            border-bottom: 2px solid #ffc2d1;
            letter-spacing: 0.5px;
          }

          .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 12px;
            break-inside: avoid;
          }

          .skill-item {
            background: #fafafa;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 13px;
            color: #4a5568;
            display: flex;
            align-items: center;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          }

          .skill-item .level {
            margin-left: auto;
            color: #ff8fab;
            font-size: 12px;
          }

          .timeline {
            display: grid;
            gap: 15px;
          }

          .timeline-item {
            background: #fafafa;
            padding: 15px;
            border-radius: 6px;
            font-size: 13px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          }

          .timeline-item h3 {
            font-size: 14px;
            color: #2d3748;
            margin: 0 0 4px 0;
          }

          .company-name {
            color: #4a5568;
            font-size: 13px;
            margin-bottom: 2px;
          }

          .date {
            color: #ff8fab;
            font-size: 12px;
            margin-bottom: 8px;
          }

          .description {
            color: #4a5568;
            font-size: 13px;
            line-height: 1.4;
          }

          .contact-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 12px;
          }

          .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            color: #4a5568;
            background: #fafafa;
            padding: 8px 12px;
            border-radius: 6px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          }

          .certificate-item {
            background: #fafafa;
            padding: 12px 15px;
            border-radius: 6px;
            font-size: 13px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            display: grid;
            gap: 4px;
          }

          .certificate-name {
            font-weight: 600;
            color: #2d3748;
          }

          .certificate-institution {
            color: #4a5568;
            font-size: 12px;
          }

          .certificate-date {
            color: #ff8fab;
            font-size: 12px;
          }

          @media print {
            body {
              background: white;
            }
            .container {
              box-shadow: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            ${profileImageBase64 ? 
              `<img src="${profileImageBase64}" class="profile-image" alt="Profile">` : 
              `<div class="profile-initial">
                ${cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}
              </div>`
            }
            <div class="name-title">
              <h1>${cv.personal?.fullName || 'İsimsiz'}</h1>
              ${cv.experience?.[0]?.position ? 
                `<div class="position">${cv.experience[0].position}</div>` : ''
              }
            </div>
          </div>

          <div class="main-content">
            ${cv.about ? `
              <div class="section">
                <h2>HAKKIMDA</h2>
                <div class="description">${cv.about}</div>
              </div>
            ` : ''}

            ${cv.experience?.length > 0 ? `
              <div class="section">
                <h2>DENEYİM</h2>
                <div class="timeline">
                  ${cv.experience.map((exp: any) => `
                    <div class="timeline-item">
                      <h3>${exp.position}</h3>
                      <div class="company-name">${exp.companyName}</div>
                      <div class="date">
                        ${formatDate(exp.startDate)} - ${exp.endDate === 'Devam Ediyor' ? 'Devam Ediyor' : formatDate(exp.endDate)}
                      </div>
                      <div class="description">${exp.description}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            ${cv.skills?.length > 0 ? `
              <div class="section">
                <h2>BECERİLER</h2>
                <div class="skills-grid">
                  ${cv.skills.map((skill: any) => `
                    <div class="skill-item">
                      ${skill.name}
                      ${skill.level ? `<span class="level">${skill.level}</span>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            ${cv.certificates?.length > 0 ? `
              <div class="section">
                <h2>SERTİFİKALAR</h2>
                <div class="timeline">
                  ${cv.certificates.map((cert: any) => `
                    <div class="certificate-item">
                      <div class="certificate-name">${cert.name}</div>
                      <div class="certificate-institution">${cert.institution}</div>
                      <div class="certificate-date">${formatDate(cert.date)}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            ${cv.education?.length > 0 ? `
              <div class="section">
                <h2>EĞİTİM</h2>
                <div class="timeline">
                  ${cv.education.map((edu: any) => `
                    <div class="timeline-item">
                      <h3>${edu.schoolName}</h3>
                      <div class="company-name">${edu.department}</div>
                      <div class="date">
                        ${formatDate(edu.startDate)} - ${edu.endDate === 'Devam Ediyor' ? 'Devam Ediyor' : formatDate(edu.endDate)}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <div class="section">
              <h2>İLETİŞİM</h2>
              <div class="contact-info">
                ${cv.personal?.email ? `
                  <div class="contact-item">
                    📧 ${cv.personal.email}
                  </div>
                ` : ''}
                ${cv.personal?.phone ? `
                  <div class="contact-item">
                    📱 ${cv.personal.phone}
                  </div>
                ` : ''}
                ${cv.personal?.address ? `
                  <div class="contact-item">
                    📍 ${cv.personal.address}
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
  }
}; 