"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Trash2,
  Eye,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Lead } from "@/types";

const statusOptions = [
  { value: "new", label: "Нова", color: "bg-green-500" },
  { value: "contacted", label: "В роботі", color: "bg-blue-500" },
  { value: "converted", label: "Конверсія", color: "bg-purple-500" },
  { value: "rejected", label: "Відхилено", color: "bg-gray-500" },
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    let result = [...leads];

    if (searchQuery) {
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.phone.includes(searchQuery)
      );
    }

    if (typeFilter !== "all") {
      result = result.filter((lead) => lead.type === typeFilter);
    }

    if (statusFilter !== "all") {
      result = result.filter((lead) => lead.status === statusFilter);
    }

    setFilteredLeads(result);
  }, [leads, searchQuery, typeFilter, statusFilter]);

  const fetchLeads = async () => {
    try {
      const response = await fetch("/api/admin/leads");
      const data = await response.json();
      setLeads(data.leads || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLeadStatus = async (id: string, status: string) => {
    try {
      const response = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        setLeads((prev) =>
          prev.map((lead) =>
            lead.id === id ? { ...lead, status: status as Lead["status"] } : lead
          )
        );
        if (selectedLead?.id === id) {
          setSelectedLead((prev) =>
            prev ? { ...prev, status: status as Lead["status"] } : null
          );
        }
      }
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  const updateLeadNotes = async () => {
    if (!selectedLead) return;

    try {
      const response = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedLead.id, notes }),
      });

      if (response.ok) {
        setLeads((prev) =>
          prev.map((lead) =>
            lead.id === selectedLead.id ? { ...lead, notes } : lead
          )
        );
        setSelectedLead((prev) => (prev ? { ...prev, notes } : null));
      }
    } catch (error) {
      console.error("Error updating notes:", error);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Видалити цю заявку?")) return;

    try {
      const response = await fetch("/api/admin/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setLeads((prev) => prev.filter((lead) => lead.id !== id));
        setSelectedLead(null);
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const openLeadDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setNotes(lead.notes || "");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Заявки</h1>
        <p className="text-muted-foreground">Управління заявками з сайту</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Пошук за ім'ям, email або телефоном..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Тип: {typeFilter === "all" ? "Всі" : typeFilter === "calculator" ? "Калькулятор" : "Контакт"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTypeFilter("all")}>
                  Всі
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("calculator")}>
                  Калькулятор
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("contact")}>
                  Контакт
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Статус: {statusFilter === "all" ? "Всі" : statusOptions.find(s => s.value === statusFilter)?.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  Всі
                </DropdownMenuItem>
                {statusOptions.map((status) => (
                  <DropdownMenuItem
                    key={status.value}
                    onClick={() => setStatusFilter(status.value)}
                  >
                    {status.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Знайдено: {filteredLeads.length} заявок
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredLeads.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Заявки не знайдено
            </p>
          ) : (
            <div className="space-y-3">
              {filteredLeads.map((lead, index) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium truncate">{lead.name}</p>
                        <Badge variant={lead.type === "calculator" ? "default" : "secondary"} className="text-xs">
                          {lead.type === "calculator" ? "Калькулятор" : "Контакт"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(lead.createdAt).toLocaleDateString("uk-UA")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <div
                              className={`w-2 h-2 rounded-full mr-2 ${
                                statusOptions.find((s) => s.value === lead.status)?.color
                              }`}
                            />
                            {statusOptions.find((s) => s.value === lead.status)?.label}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {statusOptions.map((status) => (
                            <DropdownMenuItem
                              key={status.value}
                              onClick={() => updateLeadStatus(lead.id, status.value)}
                            >
                              <div className={`w-2 h-2 rounded-full mr-2 ${status.color}`} />
                              {status.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openLeadDetails(lead)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteLead(lead.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lead Details Modal */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Деталі заявки</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Ім&apos;я</Label>
                  <p className="font-medium">{selectedLead.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Тип</Label>
                  <p className="font-medium">
                    {selectedLead.type === "calculator" ? "Калькулятор" : "Контактна форма"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedLead.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Телефон</Label>
                  <p className="font-medium">{selectedLead.phone}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground">Дата</Label>
                  <p className="font-medium">
                    {new Date(selectedLead.createdAt).toLocaleString("uk-UA")}
                  </p>
                </div>
              </div>

              {selectedLead.message && (
                <div>
                  <Label className="text-muted-foreground">Повідомлення</Label>
                  <p className="p-3 bg-muted rounded-lg mt-1">{selectedLead.message}</p>
                </div>
              )}

              {selectedLead.calculatorData && (
                <div>
                  <Label className="text-muted-foreground">Деталі калькулятора</Label>
                  <div className="p-3 bg-muted rounded-lg mt-1 space-y-1 text-sm">
                    <p><strong>Тип:</strong> {selectedLead.calculatorData.projectType}</p>
                    <p><strong>Дизайн:</strong> {selectedLead.calculatorData.design}</p>
                    <p><strong>Терміни:</strong> {selectedLead.calculatorData.timeline}</p>
                    <p><strong>Функції:</strong> {selectedLead.calculatorData.features.join(", ") || "Базовий"}</p>
                    <p className="text-lg font-bold text-primary mt-2">
                      ${selectedLead.calculatorData.priceMin} — ${selectedLead.calculatorData.priceMax}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="notes">Нотатки</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Додайте нотатки..."
                  rows={3}
                  className="mt-1"
                />
                <Button
                  onClick={updateLeadNotes}
                  size="sm"
                  className="mt-2"
                >
                  Зберегти нотатки
                </Button>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Зателефонувати
                  </Button>
                </a>
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Написати
                  </Button>
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
