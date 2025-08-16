import React from 'react';

interface ProfileSectionProps {
  profileImage: string;
  name: string;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  profileImage,
  name
}) => {
  return (
    <div className="text-center mb-6">
      <img
        src={profileImage}
        alt={`${name} profile`}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />
      <h2 className="text-lg font-semibold">{name}</h2>
    </div>
  );
};