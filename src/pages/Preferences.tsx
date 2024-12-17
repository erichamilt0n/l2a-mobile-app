import React, { useState } from 'react';
import SettingsLayout from '../components/SettingsLayout';

interface PreferenceSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export default function Preferences() {
  const [preferences, setPreferences] = useState<PreferenceSetting[]>([
    {
      id: 'darkMode',
      title: 'Dark Mode',
      description: 'Use dark theme across the application',
      enabled: true,
    },
    {
      id: 'autoBook',
      title: 'Auto Booking',
      description: 'Enable automatic booking for regular sessions',
      enabled: false,
    },
    {
      id: 'reminders',
      title: 'Session Reminders',
      description: 'Get reminders before your scheduled sessions',
      enabled: true,
    },
  ]);

  const togglePreference = (id: string) => {
    setPreferences(preferences.map(preference => 
      preference.id === id 
        ? { ...preference, enabled: !preference.enabled }
        : preference
    ));
  };

  return (
    <SettingsLayout
      title="Preferences"
      description="Customize your application settings"
    >
      <div className="bg-white rounded-xl p-8">
        <div className="space-y-6">
          {preferences.map((preference) => (
            <div key={preference.id} className="flex items-center justify-between py-4">
              <div>
                <h3 className="text-gray-900 font-medium">{preference.title}</h3>
                <p className="text-gray-500 text-sm">{preference.description}</p>
              </div>
              <button
                onClick={() => togglePreference(preference.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preference.enabled ? 'bg-[#333e48]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preference.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </SettingsLayout>
  );
}
