"use client";

import { useState } from "react";
import {
  FileText,
  CreditCard,
  Shield,
  Heart,
  Car,
  Briefcase,
  Plus,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Document {
  id: string;
  type: string;
  name: string;
  number: string;
  expiryDate: string;
  icon: typeof FileText;
}

export function DocumentsSection() {
  const [visibleIds, setVisibleIds] = useState<string[]>([]);

  const documents: Document[] = [
    {
      id: "1",
      type: "ID",
      name: "Driver's License",
      number: "D1234567",
      expiryDate: "2027-06-15",
      icon: CreditCard,
    },
    {
      id: "2",
      type: "ID",
      name: "Passport",
      number: "123456789",
      expiryDate: "2030-03-22",
      icon: FileText,
    },
    {
      id: "3",
      type: "Insurance",
      name: "Health Insurance",
      number: "HI-9876543",
      expiryDate: "2026-12-31",
      icon: Heart,
    },
    {
      id: "4",
      type: "Insurance",
      name: "Auto Insurance",
      number: "AI-5432109",
      expiryDate: "2026-08-15",
      icon: Car,
    },
    {
      id: "5",
      type: "Work",
      name: "Employee ID",
      number: "EMP-2024-1234",
      expiryDate: "2026-01-01",
      icon: Briefcase,
    },
    {
      id: "6",
      type: "Other",
      name: "Social Security",
      number: "***-**-1234",
      expiryDate: "-",
      icon: Shield,
    },
  ];

  const toggleVisibility = (id: string) => {
    setVisibleIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const maskNumber = (number: string, isVisible: boolean) => {
    if (isVisible) return number;
    if (number.includes("*")) return number;
    return number.slice(0, 2) + "****" + number.slice(-2);
  };

  const formatDate = (dateStr: string) => {
    if (dateStr === "-") return "No expiry";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isExpiringSoon = (dateStr: string) => {
    if (dateStr === "-") return false;
    const date = new Date(dateStr);
    const threeMonths = new Date();
    threeMonths.setMonth(threeMonths.getMonth() + 3);
    return date < threeMonths;
  };

  const groupedDocs = documents.reduce((acc, doc) => {
    if (!acc[doc.type]) acc[doc.type] = [];
    acc[doc.type].push(doc);
    return acc;
  }, {} as Record<string, Document[]>);

  return (
    <div className="space-y-4 pb-24 px-4 pt-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-foreground">My Documents</h2>
          <p className="text-sm text-muted-foreground">
            Important IDs and documents
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      {/* Document Groups */}
      {Object.entries(groupedDocs).map(([type, docs]) => (
        <div key={type} className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground px-1">
            {type}
          </h3>
          {docs.map((doc) => {
            const Icon = doc.icon;
            const isVisible = visibleIds.includes(doc.id);
            const expiring = isExpiringSoon(doc.expiryDate);

            return (
              <Card
                key={doc.id}
                className={`bg-card border-border ${
                  expiring ? "border-destructive/50" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-xl ${
                        expiring ? "bg-destructive/20" : "bg-secondary"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          expiring ? "text-destructive" : "text-accent"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{doc.name}</p>
                        {expiring && (
                          <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded-full">
                            Expiring soon
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-muted-foreground font-mono">
                          {maskNumber(doc.number, isVisible)}
                        </p>
                        <button
                          onClick={() => toggleVisibility(doc.id)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          {isVisible ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Expires: {formatDate(doc.expiryDate)}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ))}

      {/* Security Note */}
      <Card className="bg-secondary border-border">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Your data is secure</p>
              <p className="text-sm text-muted-foreground">
                All document information is encrypted and stored locally on your
                device
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
