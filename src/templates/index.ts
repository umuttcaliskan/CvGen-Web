import corporateTemplate from './corporate';
import atsMinimalTemplate from './ats-minimal';
import ozVeNetTemplate from './oz-ve-net';
import novaTemplate from './nova';
import geceMavisiTemplate from './gece-mavisi';
import baharEsintisiTemplate from './bahar-esintisi';
import toprakTonuTemplate from './toprak-tonu';
import professionalTemplate from './professional';
import modernTemplate from './modern';
import elegantTemplate from './elegant';
import feminineTemplate from './feminine';
import crystalClearTemplate from './crystal';

// Diğer şablonları buraya import edebilirsiniz

// Şablonların haritası
export const templateMapping: { [key: string]: any } = {
  'is-dunyasi': corporateTemplate,
  'dijital-gecis': atsMinimalTemplate,
  'oz-ve-net': ozVeNetTemplate,
  'nova': novaTemplate,
  'gece-mavisi': geceMavisiTemplate,
  'bahar-esintisi': baharEsintisiTemplate,
  'toprak-tonu': toprakTonuTemplate,
  'kariyer-odakli': professionalTemplate,
  'mavi-ufuklar': modernTemplate,
  'ince-detay': elegantTemplate,
  'yalin-zarafet': feminineTemplate,
  'kristal-netlik': crystalClearTemplate,
  // Diğer şablonlar burada listelenir
};

// Bireysel şablonları da export et
export {
  corporateTemplate,
  atsMinimalTemplate,
  ozVeNetTemplate,
  novaTemplate,
  geceMavisiTemplate,
  baharEsintisiTemplate,
  toprakTonuTemplate,
  professionalTemplate,
  modernTemplate,
  elegantTemplate,
  feminineTemplate,
  crystalClearTemplate
  // Diğer şablonlar burada export edilir
};

// Şablonların listesi (UI için)
export const templateList = [
  corporateTemplate,
  atsMinimalTemplate,
  ozVeNetTemplate,
  novaTemplate,
  geceMavisiTemplate,
  baharEsintisiTemplate,
  toprakTonuTemplate,
  professionalTemplate,
  modernTemplate,
  elegantTemplate,
  feminineTemplate,
  crystalClearTemplate
  // Diğer şablonlar
]; 