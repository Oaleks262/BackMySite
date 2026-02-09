import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Мінімум 2 символи")
    .max(100, "Максимум 100 символів"),
  email: z
    .string()
    .email("Невірний формат email"),
  phone: z
    .string()
    .min(10, "Невірний номер телефону")
    .max(20, "Невірний номер телефону"),
  message: z
    .string()
    .max(1000, "Максимум 1000 символів")
    .optional(),
});

export const calculatorFormSchema = z.object({
  projectType: z.string().min(1, "Оберіть тип проєкту"),
  design: z.string().min(1, "Оберіть тип дизайну"),
  features: z.array(z.string()),
  timeline: z.string().min(1, "Оберіть терміни"),
  contact: z.object({
    name: z
      .string()
      .min(2, "Мінімум 2 символи")
      .max(100, "Максимум 100 символів"),
    email: z
      .string()
      .email("Невірний формат email"),
    phone: z
      .string()
      .min(10, "Невірний номер телефону")
      .max(20, "Невірний номер телефону"),
    message: z
      .string()
      .max(1000, "Максимум 1000 символів")
      .optional(),
  }),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Введіть логін"),
  password: z.string().min(1, "Введіть пароль"),
});

export const leadUpdateSchema = z.object({
  id: z.string(),
  status: z.enum(["new", "contacted", "converted", "rejected"]).optional(),
  notes: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type CalculatorFormData = z.infer<typeof calculatorFormSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type LeadUpdateData = z.infer<typeof leadUpdateSchema>;
