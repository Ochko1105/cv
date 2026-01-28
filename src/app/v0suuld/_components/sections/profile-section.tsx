"use client";

import { useState } from "react";
import { Camera, Edit2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
}

export function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    firstName: "Alex",
    lastName: "Johnson",
    dateOfBirth: "1995-06-15",
    gender: "Male",
    occupation: "Software Engineer",
  });
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Avatar Section */}
      <div className="flex flex-col items-center pt-4">
        <div className="relative">
          <Avatar className="h-28 w-28 border-4 border-accent/20">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
            <AvatarFallback className="bg-secondary text-2xl font-semibold text-foreground">
              {profile.firstName[0]}{profile.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <button className="absolute bottom-0 right-0 p-2 bg-accent rounded-full text-accent-foreground shadow-lg">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          {profile.firstName} {profile.lastName}
        </h2>
        <p className="text-sm text-muted-foreground">{profile.occupation}</p>
      </div>

      {/* Edit Button */}
      <div className="flex justify-end px-4">
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="gap-2"
          >
            <Edit2 className="h-4 w-4" />
            Edit Profile
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

      {/* Profile Fields */}
      <Card className="mx-4 bg-card border-border">
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                First Name
              </Label>
              {isEditing ? (
                <Input
                  value={editedProfile.firstName}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, firstName: e.target.value })
                  }
                  className="bg-input border-border"
                />
              ) : (
                <p className="text-foreground font-medium">{profile.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                Last Name
              </Label>
              {isEditing ? (
                <Input
                  value={editedProfile.lastName}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, lastName: e.target.value })
                  }
                  className="bg-input border-border"
                />
              ) : (
                <p className="text-foreground font-medium">{profile.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Date of Birth
            </Label>
            {isEditing ? (
              <Input
                type="date"
                value={editedProfile.dateOfBirth}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, dateOfBirth: e.target.value })
                }
                className="bg-input border-border"
              />
            ) : (
              <p className="text-foreground font-medium">
                {new Date(profile.dateOfBirth).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Gender
            </Label>
            {isEditing ? (
              <Input
                value={editedProfile.gender}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, gender: e.target.value })
                }
                className="bg-input border-border"
              />
            ) : (
              <p className="text-foreground font-medium">{profile.gender}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">
              Occupation
            </Label>
            {isEditing ? (
              <Input
                value={editedProfile.occupation}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, occupation: e.target.value })
                }
                className="bg-input border-border"
              />
            ) : (
              <p className="text-foreground font-medium">{profile.occupation}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
