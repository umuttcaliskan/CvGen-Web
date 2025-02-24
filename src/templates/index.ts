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
  // Diğer şablonlar buraya eklenebilir
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