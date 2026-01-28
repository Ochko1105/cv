"use client";

import { useState } from "react";
import { Mail, Phone, Globe, Edit2, Check, X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContactItem {
  id: string;
  type: "email" | "phone" | "website";
  label: string;
  value: string;
}

export function ContactSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [contacts, setContacts] = useState<ContactItem[]>([
    { id: "1", type: "email", label: "Personal", value: "alex.johnson@email.com" },
    { id: "2", type: "email", label: "Work", value: "ajohnson@company.com" },
    { id: "3", type: "phone", label: "Mobile", value: "+1 (555) 123-4567" },
    { id: "4", type: "phone", label: "Work", value: "+1 (555) 987-6543" },
    { id: "5", type: "website", label: "Portfolio", value: "alexjohnson.dev" },
  ]);
  const [editedContacts, setEditedContacts] = useState(contacts);

  const handleSave = () => {
    setContacts(editedContacts);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContacts(contacts);
    setIsEditing(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4 text-accent" />;
      case "phone":
        return <Phone className="h-4 w-4 text-accent" />;
      case "website":
        return <Globe className="h-4 w-4 text-accent" />;
      default:
        return null;
    }
  };

  const addContact = (type: "email" | "phone" | "website") => {
    const newContact: ContactItem = {
      id: Date.now().toString(),
      type,
      label: "",
      value: "",
    };
    setEditedContacts([...editedContacts, newContact]);
  };

  const deleteContact = (id: string) => {
    setEditedContacts(editedContacts.filter((c) => c.id !== id));
  };

  const updateContact = (id: string, field: "label" | "value", value: string) => {
    setEditedContacts(
      editedContacts.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const groupedContacts = editedContacts.reduce((acc, contact) => {
    if (!acc[contact.type]) acc[contact.type] = [];
    acc[contact.type].push(contact);
    return acc;
  }, {} as Record<string, ContactItem[]>);

  return (
    <div className="space-y-4 pb-24 px-4 pt-4">
      {/* Edit Button */}
      <div className="flex justify-end">
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="gap-2"
          >
            <Edit2 className="h-4 w-4" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleSave} className="gap-2">
              <Check className="h-4 w-4" />
              Save
            </Button>
          </div>
        )}
      </div>

      {/* Email Section */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Addresses
            </CardTitle>
            {isEditing && (
              <Button variant="ghost" size="sm" onClick={() => addContact("email")}>
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {groupedContacts.email?.map((contact) => (
            <div key={contact.id} className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                {getIcon(contact.type)}
              </div>
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={contact.label}
                      onChange={(e) => updateContact(contact.id, "label", e.target.value)}
                      placeholder="Label"
                      className="bg-input border-border h-8 text-sm"
                    />
                    <Input
                      value={contact.value}
                      onChange={(e) => updateContact(contact.id, "value", e.target.value)}
                      placeholder="Email address"
                      className="bg-input border-border"
                    />
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-muted-foreground">{contact.label}</p>
                    <p className="text-foreground font-medium truncate">{contact.value}</p>
                  </>
                )}
              </div>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteContact(contact.id)}
                  className="text-destructive shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Phone Section */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Numbers
            </CardTitle>
            {isEditing && (
              <Button variant="ghost" size="sm" onClick={() => addContact("phone")}>
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {groupedContacts.phone?.map((contact) => (
            <div key={contact.id} className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                {getIcon(contact.type)}
              </div>
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={contact.label}
                      onChange={(e) => updateContact(contact.id, "label", e.target.value)}
                      placeholder="Label"
                      className="bg-input border-border h-8 text-sm"
                    />
                    <Input
                      value={contact.value}
                      onChange={(e) => updateContact(contact.id, "value", e.target.value)}
                      placeholder="Phone number"
                      className="bg-input border-border"
                    />
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-muted-foreground">{contact.label}</p>
                    <p className="text-foreground font-medium">{contact.value}</p>
                  </>
                )}
              </div>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteContact(contact.id)}
                  className="text-destructive shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Website Section */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Websites
            </CardTitle>
            {isEditing && (
              <Button variant="ghost" size="sm" onClick={() => addContact("website")}>
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {groupedContacts.website?.map((contact) => (
            <div key={contact.id} className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                {getIcon(contact.type)}
              </div>
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={contact.label}
                      onChange={(e) => updateContact(contact.id, "label", e.target.value)}
                      placeholder="Label"
                      className="bg-input border-border h-8 text-sm"
                    />
                    <Input
                      value={contact.value}
                      onChange={(e) => updateContact(contact.id, "value", e.target.value)}
                      placeholder="Website URL"
                      className="bg-input border-border"
                    />
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-muted-foreground">{contact.label}</p>
                    <p className="text-foreground font-medium truncate">{contact.value}</p>
                  </>
                )}
              </div>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteContact(contact.id)}
                  className="text-destructive shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
