'use client';

import { useState } from 'react';

import { Button } from './ui/button';
import { Input } from './ui/input';

interface ProfileData {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export const ProfileContent: React.FC = () => {
    const [profileData, setProfileData] = useState<ProfileData>({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement profile update logic
        setIsEditing(false);
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Profile</h1>
                <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />
                <Input
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />
                <Input
                    label="Address"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />

                {isEditing && (
                    <div className="flex justify-end">
                        <Button type="submit">Save Changes</Button>
                    </div>
                )}
            </form>
        </div>
    );
}; 