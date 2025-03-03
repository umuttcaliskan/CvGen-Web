const atsMinimalTemplate = {
    id: 'dijital-gecis',
    name: 'Dijital Geciş',
  styles: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    primaryColor: '#333333',
    secondaryColor: '#555555'
  },
  generateHTML: (cv: any, profileImage: string | null) => `
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
            
            .header-info {
                margin-top: 10px;
                display: flex;
                flex-wrap: wrap;
                gap: 8px 20px;
            }
            
            .main-content {
                display: flex;
                gap: 30px;
            }
            
            .left-column {
                flex: 3;
            }
            
            .right-column {
                flex: 1;
            }
            
            .contact-item {
                flex-basis: calc(50% - 10px);
                margin-bottom: 5px;
                font-size: 14px;
            }
            
            .profile-image {
                width: 180px;
                height: 180px;
                object-fit: cover;
                float: right;
            }
            
            .name {
                font-size: 28px;
                font-weight: bold;
                color: #333;
                margin-bottom: 5px;
            }
            
            .title {
                font-size: 18px;
                color: #555;
                margin-bottom: 20px;
            }
            
            .section {
                margin-bottom: 25px;
                page-break-inside: avoid !important;
                break-inside: avoid !important;
            }
            
            .section-heading {
                font-size: 18px;
                text-transform: uppercase;
                color: #333;
                border-bottom: 1px solid #ccc;
                padding-bottom: 5px;
                margin-bottom: 15px;
                page-break-after: avoid;
                break-after: avoid;
            }
            
            .experience-item, .education-item, .project-item, .reference-item {
                margin-bottom: 15px;
                page-break-inside: avoid !important;
                break-inside: avoid !important;
                padding-bottom: 5px;
            }
            
            .item-title {
                font-weight: bold;
                font-size: 16px;
                color: #333;
                page-break-after: avoid;
                break-after: avoid;
            }
            
            .item-subtitle {
                font-weight: bold;
                color: #555;
                page-break-after: avoid;
                break-after: avoid;
            }
            
            .item-date {
                color: #666;
                font-size: 14px;
                margin-bottom: 5px;
                page-break-after: avoid;
                break-after: avoid;
            }
            
            .item-description {
                text-align: justify;
                margin-bottom: 5px;
            }
            
            .item-bullet {
                margin-left: 20px;
                margin-bottom: 3px;
            }
            
            .skills-list, .languages-list {
                list-style-type: none;
            }
            
            .skills-list li, .languages-list li {
                margin-bottom: 5px;
                padding-bottom: 5px;
                border-bottom: 1px dotted #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
                page-break-inside: avoid;
                break-inside: avoid;
            }
            
            .projects-section {
                page-break-inside: auto;
                break-inside: auto;
            }
            
            .projects-section .section-heading,
            .projects-section .first-project {
                page-break-inside: avoid;
                break-inside: avoid;
            }
            
            /* Eğer başlık ve ilk proje birlikte sığmazsa, ikisi birlikte yeni sayfaya geçer */
            .projects-section .section-heading {
                page-break-after: avoid;
                break-after: avoid;
            }
            
            /* Deneyim bölümü için sayfa geçiş kuralları */
            .section h2.section-heading + .experience-item,
            .section h2.section-heading + .education-item {
                page-break-before: avoid;
                break-before: avoid;
            }
            
            /* Her bölümün başlığının ilgili içeriklerin ilk öğesiyle bölünmemesi */
            .section h2.section-heading {
                page-break-after: avoid;
                break-after: avoid;
            }
            
            .references-section {
                page-break-before: always !important;
                break-before: always !important;
                page-break-inside: avoid !important;
                break-inside: avoid !important;
                page-break-after: avoid !important;
                break-after: avoid !important;
                margin-top: 30px;
            }
            
            .references-section .section-heading {
                page-break-after: avoid !important;
                break-after: avoid !important;
            }
            
            .references-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
                page-break-inside: avoid !important;
                break-inside: avoid !important;
            }
            
            .reference-item {
                margin-bottom: 15px;
                page-break-inside: avoid;
                break-inside: avoid;
                padding: 12px;
                border: 1px solid #eee;
                border-radius: 4px;
                display: flex;
                flex-direction: column;
                height: 100%;
                background-color: #fcfcfc;
                box-sizing: border-box;
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
                
                .profile-image {
                    width: 150px;
                    height: 150px;
                }
                
                /* İlk sayfa için kenar boşlukları */
                @page:first {
                    margin-top: 10px;
                }
                
                /* İkinci ve sonraki sayfalar için kenar boşlukları */
                @page {
                    margin-top: 40px;
                }
                
                /* Sayfa geçişlerini iyileştirmek için ek ayarlar */
                p, h1, h2, h3, li {
                    orphans: 4;
                    widows: 4;
                }
                
                /* Bölüm başlıklarının içerikten ayrılmamasını sağla - daha kuvvetli kural */
                h2, h3 {
                    break-after: avoid-page !important;
                    page-break-after: avoid !important;
                }
                
                /* Anahtar içerik bölümlerinin bölünmemesini sağla */
                .section, .experience-item, .education-item, .project-item {
                    break-inside: avoid !important;
                    page-break-inside: avoid !important;
                }
                
                /* Bir öğenin sayfa sonuna yakınsa tamamen bir sonraki sayfada başlamasını sağla */
                .section {
                    orphans: 4;
                    widows: 4;
                }
                
                /* Bir önceki elementin son 4 satırı ve bir sonraki elementin ilk 4 satırı birlikte kalır */
                p, li, div {
                    orphans: 4;
                    widows: 4;
                }
                
                /* Main header hiçbir zaman bölünmesin */
                .name, .title, .header-info {
                    break-inside: avoid;
                    page-break-inside: avoid;
                }
                
                .references-section {
                    position: relative;
                    page-break-before: always !important;
                    break-before: always !important;
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                }
                
                .references-section .section-heading,
                .references-section .references-grid {
                    page-break-before: avoid !important;
                    break-before: avoid !important;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
                <div style="flex: 1;">
                    <h1 class="name">${cv.personal?.fullName || 'AD SOYAD'}</h1>
                    <div class="title" style="margin-bottom: 10px;">${cv.experience?.[0]?.position || cv.title || 'Pozisyon'}</div>
                    
                    <div class="header-info">
                        ${cv.personal?.phone ? `<div class="contact-item"><strong>Telefon:</strong> ${cv.personal.phone}</div>` : ''}
                        ${cv.personal?.email ? `<div class="contact-item"><strong>E-posta:</strong> ${cv.personal.email}</div>` : ''}
                        ${cv.personal?.website ? `<div class="contact-item"><strong>Web:</strong> ${cv.personal.website}</div>` : ''}
                        ${cv.personal?.address ? `<div class="contact-item"><strong>Adres:</strong> ${cv.personal.address}</div>` : ''}
                        ${cv.personal?.birthDate ? `<div class="contact-item"><strong>D. Tarihi:</strong> ${cv.personal.birthDate}</div>` : ''}
                        ${cv.personal?.drivingLicense ? `<div class="contact-item"><strong>Ehliyet:</strong> ${cv.personal.drivingLicense}</div>` : ''}
                        ${cv.personal?.maritalStatus ? `<div class="contact-item"><strong>M. Durum:</strong> ${cv.personal.maritalStatus}</div>` : ''}
                        ${cv.personal?.militaryStatus ? `<div class="contact-item"><strong>Askerlik:</strong> ${cv.personal.militaryStatus}</div>` : ''}
                    </div>
                </div>
                
                <div>
                  ${profileImage ? 
                    profileImage.startsWith('http') || profileImage.startsWith('https') || profileImage.startsWith('blob:') || profileImage.startsWith('data:') ?
                      `<img class="profile-image" src="${profileImage}" alt="Profil Resmi" crossorigin="anonymous" onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'180\\' height=\\'180\\' viewBox=\\'0 0 180 180\\'%3E%3Ccircle cx=\\'90\\' cy=\\'60\\' r=\\'50\\' fill=\\'%23ccc\\'/%3E%3Crect x=\\'40\\' y=\\'110\\' width=\\'100\\' height=\\'50\\' rx=\\'25\\' fill=\\'%23ccc\\'/%3E%3C/svg%3E';">` :
                      `<img class="profile-image" src="data:image/jpeg;base64,${profileImage}" alt="Profil Resmi">`
                    : `<img class="profile-image" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Ccircle cx='90' cy='60' r='50' fill='%23ccc'/%3E%3Crect x='40' y='110' width='100' height='50' rx='25' fill='%23ccc'/%3E%3C/svg%3E" alt="Profil Resmi">`}
                </div>
            </div>
            
            ${cv.about ? `
            <div class="section">
                <h2 class="section-heading">Hakkımda</h2>
                <p>${cv.about}</p>
            </div>
            ` : ''}
            
            <div class="main-content">
                <div class="left-column">
                    ${cv.education?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-heading">Eğitim</h2>
                        ${cv.education.map((edu: any) => `
                        <div class="education-item">
                            <div class="item-title">${edu.school || edu.schoolName}</div>
                            <div class="item-subtitle">${edu.field || edu.department || ''}</div>
                            <div class="item-date">${edu.startDate} - ${edu.endDate || 'Devam Ediyor'}</div>
                            ${edu.description ? `<div class="item-description">${edu.description}</div>` : ''}
                            ${edu.highlights && edu.highlights.length > 0 ? 
                                edu.highlights.map((highlight: string) => `
                                <div class="item-bullet">• ${highlight}</div>`).join('') : ''
                            }
                        </div>
                        `).join('')}
                    </div>
                    ` : ''}
                    
                    ${cv.experience?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-heading">Deneyim</h2>
                        ${cv.experience.map((exp: any, index: number) => `
                        <div class="experience-item ${index === 0 ? 'first-experience' : ''}">
                            <div class="item-title">${exp.position}</div>
                            <div class="item-subtitle">${exp.company || exp.companyName}</div>
                            <div class="item-date">${exp.startDate} - ${exp.endDate || 'Devam Ediyor'}</div>
                            ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
                            ${exp.highlights && exp.highlights.length > 0 ? 
                                exp.highlights.map((highlight: string) => `
                                <div class="item-bullet">• ${highlight}</div>`).join('') : ''
                            }
                        </div>
                        `).join('')}
                    </div>
                    ` : ''}
                    
                    ${cv.projects?.length > 0 ? `
                    <div class="section projects-section">
                        <h2 class="section-heading">Projeler</h2>
                        ${cv.projects.map((project: any, index: number) => `
                        <div class="project-item ${index === 0 ? 'first-project' : ''}">
                            <div class="item-title">${project.name}</div>
                            <div class="item-date">${project.startDate} - ${project.endDate}</div>
                            <div class="item-description">${project.description}</div>
                            ${project.technologies ? `<div><strong>Teknolojiler:</strong> ${project.technologies}</div>` : ''}
                            ${project.projectUrl && project.projectUrl.trim() !== '' ? 
                                `<div><strong>URL:</strong> ${project.projectUrl}</div>` : ''}
                        </div>
                        `).join('')}
                    </div>
                    ` : ''}
                    
                    ${cv.references?.length > 0 ? `
                    <div class="section references-section">
                        <h2 class="section-heading">Referanslar</h2>
                        <div class="references-grid">
                            ${cv.references.map((ref: any) => `
                            <div class="reference-item">
                                <div class="item-title">${ref.fullName}</div>
                                <div class="item-subtitle">${ref.position}, ${ref.company}</div>
                                <div>Tel: ${ref.phone}</div>
                                <div>E-posta: ${ref.email}</div>
                            </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>
                
                <div class="right-column">
                    ${cv.skills?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-heading">Yetkinlikler</h2>
                        <ul class="skills-list">
                            ${cv.skills.map((skill: any) => `
                            <li>
                                <div>${skill.name}</div>
                                <div>${skill.level}</div>
                            </li>
                            `).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    ${cv.languages?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-heading">Dil</h2>
                        <ul class="languages-list">
                            ${cv.languages.map((lang: any) => `
                            <li>
                                <div>${lang.name}</div>
                                <div>${lang.level}</div>
                            </li>
                            `).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    ${cv.certificates?.length > 0 ? `
                    <div class="section">
                        <h2 class="section-heading">Sertifikalar</h2>
                        ${cv.certificates.map((cert: any) => `
                        <div class="item">
                            <div class="item-title">${cert.name}</div>
                            <div class="item-subtitle">${cert.institution}</div>
                            <div class="item-date">${cert.date}</div>
                        </div>
                        `).join('')}
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
    </body>
    </html>
  `
};

export default atsMinimalTemplate; 