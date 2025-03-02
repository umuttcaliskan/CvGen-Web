export interface BaseSection {
  id: string;
  [key: string]: any;
}

export interface PersonalInfo extends BaseSection {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
}

export interface Education extends BaseSection {
  schoolName: string;
  department: string;
  startDate: string;
  endDate: string;
}

export interface Certificate extends BaseSection {
  name: string;
  institution: string;
  date: string;
}

export interface Experience extends BaseSection {
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill extends BaseSection {
  name: string;
  level: string;
}

export interface Language extends BaseSection {
  name: string;
  level: string;
}

export interface Reference extends BaseSection {
  fullName: string;
  company: string;
  position: string;
  phone: string;
  email: string;
}

export interface CVData {
  title: string;
  personal: PersonalInfo | null;
  about: string | null;
  education: Education[] | null;
  certificates: Certificate[] | null;
  experience: Experience[] | null;
  skills: Skill[] | null;
  languages: Language[] | null;
  references: Reference[] | null;
}

export type CVSectionData = any; 