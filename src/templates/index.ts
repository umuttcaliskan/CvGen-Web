import { modernTemplate } from './modern';
import { professionalTemplate } from './professional';

export type TemplateId = 'modern' | 'professional';

export const templates = {
  modern: modernTemplate,
  professional: professionalTemplate,
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
  }
]; 