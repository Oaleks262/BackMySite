"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Calculator,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { LeadStats, Lead } from "@/types";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, leadsRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/admin/leads"),
        ]);

        const statsData = await statsRes.json();
        const leadsData = await leadsRes.json();

        setStats(statsData.stats);
        setRecentLeads(leadsData.leads?.slice(0, 5) || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: "Всього заявок",
      value: stats?.total || 0,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Цього місяця",
      value: stats?.thisMonth || 0,
      icon: TrendingUp,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "З калькулятора",
      value: stats?.fromCalculator || 0,
      icon: Calculator,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      title: "Нових",
      value: stats?.new || 0,
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

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
        <h1 className="text-2xl font-bold">Дашборд</h1>
        <p className="text-muted-foreground">Огляд активності</p>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Останні заявки</CardTitle>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/leads">
              Всі заявки
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentLeads.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Поки немає заявок
            </p>
          ) : (
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{lead.name}</p>
                      <Badge variant={lead.type === "calculator" ? "default" : "secondary"}>
                        {lead.type === "calculator" ? "Калькулятор" : "Контакт"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{lead.email}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        lead.status === "new"
                          ? "default"
                          : lead.status === "converted"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {lead.status === "new"
                        ? "Нова"
                        : lead.status === "contacted"
                        ? "В роботі"
                        : lead.status === "converted"
                        ? "Конверсія"
                        : "Відхилено"}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(lead.createdAt).toLocaleDateString("uk-UA")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
