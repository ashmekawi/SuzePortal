export interface NewsItem {
  id: string;
  title: string;
  date: string;
  image?: string;
  summary: string;
  link: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  longDescription?: string;
  forms?: { title: string; link: string }[];
  contactInfo?: { phone: string; email: string; location: string };
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface EventItem {
  id: string;
  title: string;
  date: string; // ISO 8601 format
  category: 'workshop' | 'meeting' | 'event' | 'deadline';
  description: string;
  location: string;
}

export interface CompetencyItem {
  title: string;
  icon: string;
  items: string[];
}

export interface BoardMember {
  name: string;
  role: string;
  isExecutive?: boolean;
}

export interface StatuteSection {
  title: string;
  articles: {
    number: string;
    title?: string;
    content: string | string[];
  }[];
}

export interface StrategyGoal {
  title: string;
  items?: string[];
}

export interface StrategyData {
  intro: string[];
  goals: StrategyGoal[];
  outro: string;
}
