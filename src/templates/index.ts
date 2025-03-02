import { modernTemplate } from './modern';
import { professionalTemplate } from './professional';
import { minimalistTemplate } from './minimalist';
import { feminineTemplate } from './feminine';
import { elegantTemplate } from './elegant';

export type TemplateId = keyof typeof templates;

export const templates = {
  modern: modernTemplate,
  professional: professionalTemplate,
  minimalist: minimalistTemplate,
  feminine: feminineTemplate,
  elegant: elegantTemplate,
};

export const templateList = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Temiz ve modern tasarımlı CV şablonu',
    image: '/templates/modern.png'
  },
  {
    id: 'professional',
    name: 'Profesyonel',
    description: 'İki sütunlu profesyonel CV şablonu',
    image: '/templates/professional.png'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Sade ve minimalist tasarımlı CV şablonu',
    image: '/templates/minimalist.png'
  },
  {
    id: 'feminine',
    name: 'Feminine',
    description: 'Zarif ve modern feminine CV şablonu',
    image: '/templates/feminine.png'
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Şık ve profesyonel görünümlü CV şablonu',
    image: '/templates/elegant.png'
  }
];

interface CVSection {
  title: string;
  items: Array<{
    id: string;
    [key: string]: unknown;
  }>;
}

interface CVData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    // diğer alanlar...
  };
  education?: CVSection;
  experience?: CVSection;
  skills?: CVSection;
  // diğer bölümler...
}

// Her template dosyasında bu interface'i kullan
export function generateHTML(cv: CVData, profileImage: string | null, templateId: TemplateId = 'modern'): string {
  const selectedTemplate = templates[templateId];
  if (!selectedTemplate || typeof selectedTemplate.generateHTML !== 'function') {
    throw new Error(`Template '${templateId}' bulunamadı veya geçerli değil`);
  }
  
  return selectedTemplate.generateHTML(cv, profileImage);
} 