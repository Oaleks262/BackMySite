"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SettingsStatus {
  telegramConfigured: boolean;
  emailConfigured: boolean;
}

export default function AdminSettingsPage() {
  const [status, setStatus] = useState<SettingsStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [testingTelegram, setTestingTelegram] = useState(false);
  const [testingEmail, setTestingEmail] = useState(false);
  const [testResult, setTestResult] = useState<{
    type: string;
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings");
      const data = await response.json();
      setStatus(data.status);
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const testTelegram = async () => {
    setTestingTelegram(true);
    setTestResult(null);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "test-telegram" }),
      });

      const data = await response.json();
      setTestResult({
        type: "telegram",
        success: data.success,
        message: data.message,
      });
    } catch {
      setTestResult({
        type: "telegram",
        success: false,
        message: "Помилка з'єднання",
      });
    } finally {
      setTestingTelegram(false);
    }
  };

  const testEmail = async () => {
    setTestingEmail(true);
    setTestResult(null);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "test-email" }),
      });

      const data = await response.json();
      setTestResult({
        type: "email",
        success: data.success,
        message: data.message,
      });
    } catch {
      setTestResult({
        type: "email",
        success: false,
        message: "Помилка з'єднання",
      });
    } finally {
      setTestingEmail(false);
    }
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
        <h1 className="text-2xl font-bold">Налаштування</h1>
        <p className="text-muted-foreground">Керування сповіщеннями</p>
      </div>

      {/* Test Result Alert */}
      {testResult && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className={testResult.success ? "border-green-500" : "border-destructive"}>
            <CardContent className="flex items-center gap-3 p-4">
              {testResult.success ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive" />
              )}
              <span>{testResult.message}</span>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Telegram Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Telegram
                </CardTitle>
                <Badge variant={status?.telegramConfigured ? "default" : "secondary"}>
                  {status?.telegramConfigured ? "Налаштовано" : "Не налаштовано"}
                </Badge>
              </div>
              <CardDescription>
                Сповіщення про нові заявки в Telegram
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Для налаштування потрібно вказати в <code>.env.local</code>:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><code>TELEGRAM_BOT_TOKEN</code> - токен бота</li>
                  <li><code>TELEGRAM_CHAT_ID</code> - ID чату</li>
                </ul>
              </div>
              <Button
                onClick={testTelegram}
                disabled={!status?.telegramConfigured || testingTelegram}
                className="w-full"
              >
                {testingTelegram ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Відправка...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Надіслати тестове повідомлення
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Email Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email
                </CardTitle>
                <Badge variant={status?.emailConfigured ? "default" : "secondary"}>
                  {status?.emailConfigured ? "Налаштовано" : "Не налаштовано"}
                </Badge>
              </div>
              <CardDescription>
                Сповіщення про нові заявки на email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Для налаштування потрібно вказати в <code>.env.local</code>:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><code>SMTP_HOST</code>, <code>SMTP_PORT</code></li>
                  <li><code>SMTP_USER</code>, <code>SMTP_PASS</code></li>
                  <li><code>EMAIL_FROM</code>, <code>EMAIL_TO</code></li>
                </ul>
              </div>
              <Button
                onClick={testEmail}
                disabled={!status?.emailConfigured || testingEmail}
                className="w-full"
              >
                {testingEmail ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Відправка...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Надіслати тестовий лист
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Environment Info */}
      <Card>
        <CardHeader>
          <CardTitle>Інформація про оточення</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-muted-foreground">Node Environment</p>
              <p className="font-mono">{process.env.NODE_ENV || "development"}</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-muted-foreground">Site URL</p>
              <p className="font-mono">{process.env.NEXT_PUBLIC_SITE_URL || "localhost"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
