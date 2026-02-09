export interface Lead {
  id: string;
  type: "contact" | "calculator";
  name: string;
  email: string;
  phone: string;
  message?: string;
  calculatorData?: CalculatorData;
  createdAt: string;
  status: "new" | "contacted" | "converted" | "rejected";
  notes?: string;
}

export interface CalculatorData {
  projectType: string;
  design: string;
  features: string[];
  timeline: string;
  priceMin: number;
  priceMax: number;
  daysMin: number;
  daysMax: number;
}

export interface CalculatorState {
  step: number;
  projectType: string;
  design: string;
  features: string[];
  timeline: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  result: {
    priceMin: number;
    priceMax: number;
    daysMin: number;
    daysMax: number;
  } | null;
  setStep: (step: number) => void;
  setProjectType: (type: string) => void;
  setDesign: (design: string) => void;
  toggleFeature: (feature: string) => void;
  setTimeline: (timeline: string) => void;
  setContact: (contact: Partial<CalculatorState["contact"]>) => void;
  setResult: (result: CalculatorState["result"]) => void;
  reset: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

export interface LeadStats {
  total: number;
  thisMonth: number;
  new: number;
  contacted: number;
  converted: number;
  rejected: number;
  fromCalculator: number;
  fromContact: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface NavItem {
  name: string;
  href: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  duration: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  avatar: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
