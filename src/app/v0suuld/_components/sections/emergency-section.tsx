"use client";

import { useState } from "react";
import { Heart, Phone, Edit2, Check, X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

export function EmergencySection() {
  const [isEditing, setIsEditing] = useState(false);
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      relationship: "Spouse",
      phone: "+1 (555) 234-5678",
      isPrimary: true,
    },
    {
      id: "2",
      name: "Michael Johnson",
      relationship: "Brother",
      phone: "+1 (555) 345-6789",
      isPrimary: false,
    },
    {
      id: "3",
      name: "Dr. Emily Chen",
      relationship: "Primary Physician",
      phone: "+1 (555) 456-7890",
      isPrimary: false,
    },
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

  const addContact = () => {
    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      name: "",
      relationship: "",
      phone: "",
      isPrimary: false,
    };
    setEditedContacts([...editedContacts, newContact]);
  };

  const deleteContact = (id: string) => {
    setEditedContacts(editedContacts.filter((c) => c.id !== id));
  };

  const updateContact = (id: string, field: keyof EmergencyContact, value: string | boolean) => {
    setEditedContacts(
      editedContacts.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const setPrimary = (id: string) => {
    setEditedContacts(
      editedContacts.map((c) => ({ ...c, isPrimary: c.id === id }))
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-4 pb-24 px-4 pt-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Emergency Contacts</h2>
          <p className="text-sm text-muted-foreground">
            People to contact in case of emergency
          </p>
        </div>
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

      {/* Contact Cards */}
      {editedContacts.map((contact) => (
        <Card
          key={contact.id}
          className={`bg-card border-border ${
            contact.isPrimary ? "ring-2 ring-accent" : ""
          }`}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 bg-secondary">
                  <AvatarFallback className="bg-secondary text-foreground font-medium">
                    {contact.name ? getInitials(contact.name) : "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  {isEditing ? (
                    <Input
                      value={contact.name}
                      onChange={(e) => updateContact(contact.id, "name", e.target.value)}
                      placeholder="Contact name"
                      className="bg-input border-border h-9 mb-1"
                    />
                  ) : (
                    <CardTitle className="text-base font-medium text-foreground">
                      {contact.name}
                    </CardTitle>
                  )}
                  {isEditing ? (
                    <Input
                      value={contact.relationship}
                      onChange={(e) =>
                        updateContact(contact.id, "relationship", e.target.value)
                      }
                      placeholder="Relationship"
                      className="bg-input border-border h-8 text-sm"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {contact.relationship}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {contact.isPrimary && (
                  <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                    Primary
                  </span>
                )}
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteContact(contact.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <Phone className="h-4 w-4 text-accent" />
              </div>
              {isEditing ? (
                <Input
                  value={contact.phone}
                  onChange={(e) => updateContact(contact.id, "phone", e.target.value)}
                  placeholder="Phone number"
                  className="bg-input border-border flex-1"
                />
              ) : (
                <span className="text-foreground font-medium">{contact.phone}</span>
              )}
            </div>
            {isEditing && !contact.isPrimary && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPrimary(contact.id)}
                className="w-full"
              >
                <Heart className="h-4 w-4 mr-2" />
                Set as Primary Contact
              </Button>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Add Contact Button */}
      {isEditing && (
        <Button
          variant="outline"
          className="w-full gap-2 border-dashed bg-transparent"
          onClick={addContact}
        >
          <Plus className="h-4 w-4" />
          Add Emergency Contact
        </Button>
      )}

      {/* Emergency Info Card */}
      <Card className="bg-destructive/10 border-destructive/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Heart className="h-5 w-5 text-destructive mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Emergency Services</p>
              <p className="text-sm text-muted-foreground">
                In case of emergency, always dial 911 first
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
