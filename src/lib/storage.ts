import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface Lead {
  id: string;
  type: "contact" | "calculator";
  name: string;
  email: string;
  phone: string;
  message?: string;
  calculatorData?: {
    projectType: string;
    design: string;
    features: string[];
    timeline: string;
    priceMin: number;
    priceMax: number;
    daysMin: number;
    daysMax: number;
  };
  createdAt: string;
  status: "new" | "contacted" | "converted" | "rejected";
  notes?: string;
}

function getFilePath(filename: string): string {
  return path.join(DATA_DIR, filename);
}

function readJSON<T>(filename: string, defaultValue: T): T {
  const filePath = getFilePath(filename);
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    }
    return defaultValue;
  } catch {
    return defaultValue;
  }
}

function writeJSON<T>(filename: string, data: T): void {
  const filePath = getFilePath(filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// Leads operations
export function getLeads(): Lead[] {
  return readJSON<Lead[]>("leads.json", []);
}

export function getLeadById(id: string): Lead | null {
  const leads = getLeads();
  return leads.find((l) => l.id === id) || null;
}

export function addLead(lead: Omit<Lead, "id" | "createdAt" | "status">): Lead {
  const leads = getLeads();
  const newLead: Lead = {
    ...lead,
    id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    status: "new",
  };
  leads.unshift(newLead);
  writeJSON("leads.json", leads);
  return newLead;
}

export function updateLead(id: string, updates: Partial<Lead>): Lead | null {
  const leads = getLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return null;
  leads[index] = { ...leads[index], ...updates };
  writeJSON("leads.json", leads);
  return leads[index];
}

export function deleteLead(id: string): boolean {
  const leads = getLeads();
  const filtered = leads.filter((l) => l.id !== id);
  if (filtered.length === leads.length) return false;
  writeJSON("leads.json", filtered);
  return true;
}

export function getLeadStats() {
  const leads = getLeads();
  const now = new Date();
  const thisMonth = leads.filter((l) => {
    const d = new Date(l.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  return {
    total: leads.length,
    thisMonth: thisMonth.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    converted: leads.filter((l) => l.status === "converted").length,
    rejected: leads.filter((l) => l.status === "rejected").length,
    fromCalculator: leads.filter((l) => l.type === "calculator").length,
    fromContact: leads.filter((l) => l.type === "contact").length,
  };
}

// Settings operations
export interface Settings {
  telegramEnabled: boolean;
  emailEnabled: boolean;
}

export function getSettings(): Settings {
  return readJSON<Settings>("settings.json", {
    telegramEnabled: true,
    emailEnabled: true,
  });
}

export function updateSettings(updates: Partial<Settings>): Settings {
  const settings = getSettings();
  const newSettings = { ...settings, ...updates };
  writeJSON("settings.json", newSettings);
  return newSettings;
}
