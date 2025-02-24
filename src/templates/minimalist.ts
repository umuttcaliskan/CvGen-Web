export const minimalistTemplate = {
  id: 'minimalist',
  name: 'Minimalist',
  styles: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    primaryColor: '#8B7355',
    secondaryColor: '#4A4A4A'
  },
  generateHTML: (cv: any, profileImageBase64: string | null) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${cv?.personal?.fullName || 'CV'}</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: #ffffff;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .container {
            width: 210mm;
            min-height: 297mm;
            display: flex;
            margin: 0;
            padding: 0;
            background: #ffffff;
          }
          
          .left-column {
            width: 35%;
            background-color: #4A4A4A !important;
            color: white;
            padding: 30px;
            min-height: 297mm;
          }
          
          .right-column {
            width: 65%;
            background-color: #ffffff;
            padding: 30px;
            min-height: 297mm;
          }

          .page {
            width: 210mm;
            min-height: 297mm;
            padding: 0;
            margin: 0 auto;
            background: white;
            position: relative;
            page-break-after: always;
            overflow: hidden;
          }
          .page-content {
            height: 100%;
            overflow: hidden;
          }
          .section {
            margin-bottom: 25px;
          }
          .item {
            margin-bottom: 15px;
          }
          p {
            max-width: 100%;
            overflow-wrap: break-word;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.6;
            margin: 5px 0;
          }
          .profile-image {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            margin: 0 auto 20px;
            display: block;
          }
          .profile-placeholder {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background-color: #8B7355;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 48px;
            color: white;
          }
          .personal-info i {
            width: 20px;
            margin-right: 10px;
            text-align: center;
          }
          h1, h2, h3, h4 {
            margin-top: 0;
            break-after: avoid;
            page-break-after: avoid;
          }
          @media print {
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .left-column {
              background-color: #4A4A4A !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Sol Kolon -->
          <div class="left-column">
            ${profileImageBase64 ? `
              <div style="text-align: center;">
                <img src="${profileImageBase64}" alt="Profil" class="profile-image">
              </div>
            ` : `
              <div style="text-align: center;">
                <div class="profile-placeholder">
                  ${cv.personal?.fullName?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
            `}
            
            <div class="section personal-info">
              <h2 style="color: #fff; margin-bottom: 15px; font-size: 20px;">KİŞİSEL BİLGİLER</h2>
              <p style="margin: 5px 0;">
                <i class="fas fa-map-marker-alt"></i> ${cv.personal?.address || 'Adres'}
              </p>
              <p style="margin: 5px 0;">
                <i class="fas fa-globe"></i> ${cv.personal?.email || 'E-posta'}
              </p>
              <p style="margin: 5px 0;">
                <i class="fas fa-phone"></i> ${cv.personal?.phone || 'Telefon'}
              </p>
              ${cv.personal?.birthDate ? `
                <p style="margin: 5px 0;">
                  <i class="fas fa-calendar"></i> ${cv.personal.birthDate}
                </p>
              ` : ''}
              ${cv.personal?.gender ? `
                <p style="margin: 5px 0;">
                  <i class="fas fa-user"></i> ${cv.personal.gender}
                </p>
              ` : ''}
              ${cv.personal?.maritalStatus ? `
                <p style="margin: 5px 0;">
                  <i class="fas fa-heart"></i> ${cv.personal.maritalStatus}
                </p>
              ` : ''}
              ${cv.personal?.militaryStatus ? `
                <p style="margin: 5px 0;">
                  <i class="fas fa-shield-alt"></i> ${cv.personal.militaryStatus}
                </p>
              ` : ''}
              ${cv.personal?.drivingLicense ? `
                <p style="margin: 5px 0;">
                  <i class="fas fa-car"></i> ${cv.personal.drivingLicense}
                </p>
              ` : ''}
            </div>

            ${cv.languages?.length > 0 ? `
              <div class="section">
                <h2 style="color: #fff; margin-bottom: 15px; font-size: 20px;">YABANCI DİL</h2>
                ${cv.languages.map((lang: any) => `
                  <div class="item">
                    <h3 style="margin: 0; font-size: 16px; display: flex; justify-content: space-between; align-items: center;">
                      <span>${lang.name}</span>
                      <span style="color: #8B7355; font-size: 14px;">${lang.level}</span>
                    </h3>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${cv.skills?.length > 0 ? `
              <div class="section">
                <h2 style="color: #fff; margin-bottom: 15px; font-size: 20px;">BECERİLER</h2>
                ${cv.skills.map((skill: any) => `
                  <div class="item">
                    <h3 style="margin: 0; font-size: 16px; display: flex; justify-content: space-between; align-items: center;">
                      <span>${skill.name}</span>
                      <span style="color: #8B7355; font-size: 14px;">${skill.level}</span>
                    </h3>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${cv.references?.length > 0 ? `
              <div class="section">
                <h2 style="color: #fff; margin-bottom: 15px; font-size: 20px;">REFERANSLAR</h2>
                ${cv.references.map((ref: any) => `
                  <div class="item">
                    <h3 style="margin: 0; font-size: 16px;">${ref.fullName}</h3>
                    <p style="margin: 2px 0; font-size: 14px;">${ref.position} - ${ref.company}</p>
                    <p style="margin: 2px 0; font-size: 14px;">${ref.phone}</p>
                    <p style="margin: 2px 0; font-size: 14px;">${ref.email}</p>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
          
          <!-- Sağ Kolon -->
          <div class="right-column">
            <div class="section">
              <h1 style="color: #8B7355; margin: 0; font-size: 32px;">${cv.personal?.fullName || 'Ad Soyad'}</h1>
              ${cv.experience?.[0] ? `
                <h2 style="color: #8B7355; margin: 5px 0 20px; font-size: 20px;">${cv.experience[0].position || 'Pozisyon'}</h2>
              ` : ''}
            </div>

            ${cv.about ? `
              <div class="section">
                <h2 style="color: #8B7355; margin-bottom: 15px; font-size: 20px;">HAKKIMDA</h2>
                <p style="margin: 0; line-height: 1.5;">${cv.about}</p>
              </div>
            ` : ''}

            ${cv.experience?.length > 0 ? `
              <div class="section">
                <h2 style="color: #8B7355; margin-bottom: 15px; font-size: 20px;">İŞ GEÇMİŞİ</h2>
                ${cv.experience.map((exp: any) => `
                  <div class="item" style="margin-bottom: 20px;">
                    <h3 style="color: #8B7355; margin: 0; font-size: 18px;">${exp.position}</h3>
                    <h4 style="color: #4A4A4A; margin: 5px 0; font-size: 16px;">${exp.companyName}</h4>
                    <p style="color: #666; margin: 2px 0; font-size: 14px;">${exp.startDate} - ${exp.endDate}</p>
                    <p style="margin: 5px 0; line-height: 1.5;">${exp.description}</p>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${cv.education?.length > 0 ? `
              <div class="section">
                <h2 style="color: #8B7355; margin-bottom: 15px; font-size: 20px;">EĞİTİM</h2>
                ${cv.education.map((edu: any) => `
                  <div class="item" style="margin-bottom: 15px;">
                    <h3 style="color: #8B7355; margin: 0; font-size: 18px;">${edu.schoolName}</h3>
                    <h4 style="color: #4A4A4A; margin: 5px 0; font-size: 16px;">${edu.department}</h4>
                    <p style="color: #666; margin: 2px 0; font-size: 14px;">${edu.startDate} - ${edu.endDate}</p>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${cv.certificates?.length > 0 ? `
              <div class="section">
                <h2 style="color: #8B7355; margin-bottom: 15px; font-size: 20px;">SERTİFİKALAR</h2>
                ${cv.certificates.map((cert: any) => `
                  <div class="item" style="margin-bottom: 15px;">
                    <h3 style="color: #8B7355; margin: 0; font-size: 18px;">${cert.name}</h3>
                    <h4 style="color: #4A4A4A; margin: 5px 0; font-size: 16px;">${cert.institution}</h4>
                    <p style="color: #666; margin: 2px 0; font-size: 14px;">${cert.date}</p>
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