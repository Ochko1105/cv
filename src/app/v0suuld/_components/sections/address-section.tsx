"use client";

import { useState } from "react";
import { MapPin, Home, Building, Edit2, Check, X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Address {
  id: string;
  type: "home" | "work" | "other";
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export function AddressSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      type: "home",
      label: "Home",
      street: "123 Oak Street, Apt 4B",
      city: "San Francisco",
      state: "California",
      zipCode: "94102",
      country: "United States",
    },
    {
      id: "2",
      type: "work",
      label: "Office",
      street: "456 Tech Park Drive, Suite 200",
      city: "San Francisco",
      state: "California",
      zipCode: "94105",
      country: "United States",
    },
  ]);
  const [editedAddresses, setEditedAddresses] = useState(addresses);

  const handleSave = () => {
    setAddresses(editedAddresses);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedAddresses(addresses);
    setIsEditing(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="h-4 w-4 text-accent" />;
      case "work":
        return <Building className="h-4 w-4 text-accent" />;
      default:
        return <MapPin className="h-4 w-4 text-accent" />;
    }
  };

  const addAddress = () => {
    const newAddress: Address = {
      id: Date.now().toString(),
      type: "other",
      label: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    };
    setEditedAddresses([...editedAddresses, newAddress]);
  };

  const deleteAddress = (id: string) => {
    setEditedAddresses(editedAddresses.filter((a) => a.id !== id));
  };

  const updateAddress = (id: string, field: keyof Address, value: string) => {
    setEditedAddresses(
      editedAddresses.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  return (
    <div className="space-y-4 pb-24 px-4 pt-4">
      {/* Edit Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-foreground">My Addresses</h2>
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

      {/* Address Cards */}
      {editedAddresses.map((address) => (
        <Card key={address.id} className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-secondary">
                  {getIcon(address.type)}
                </div>
                {isEditing ? (
                  <Input
                    value={address.label}
                    onChange={(e) => updateAddress(address.id, "label", e.target.value)}
                    placeholder="Address label"
                    className="bg-input border-border h-8 w-32"
                  />
                ) : (
                  <CardTitle className="text-base font-medium text-foreground">
                    {address.label}
                  </CardTitle>
                )}
              </div>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteAddress(address.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Street Address</Label>
                  <Input
                    value={address.street}
                    onChange={(e) => updateAddress(address.id, "street", e.target.value)}
                    className="bg-input border-border"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">City</Label>
                    <Input
                      value={address.city}
                      onChange={(e) => updateAddress(address.id, "city", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">State</Label>
                    <Input
                      value={address.state}
                      onChange={(e) => updateAddress(address.id, "state", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">ZIP Code</Label>
                    <Input
                      value={address.zipCode}
                      onChange={(e) => updateAddress(address.id, "zipCode", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Country</Label>
                    <Input
                      value={address.country}
                      onChange={(e) => updateAddress(address.id, "country", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-foreground">
                <p className="font-medium">{address.street}</p>
                <p className="text-muted-foreground text-sm">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-muted-foreground text-sm">{address.country}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Add Address Button */}
      {isEditing && (
        <Button
          variant="outline"
          className="w-full gap-2 border-dashed bg-transparent"
          onClick={addAddress}
        >
          <Plus className="h-4 w-4" />
          Add New Address
        </Button>
      )}
    </div>
  );
}
