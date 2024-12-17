import React, { useState } from 'react';
import SettingsLayout from '../components/SettingsLayout';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'email',
      title: 'Email Notifications',
      description: 'Receive notifications about email updates',
      enabled: true,
    },
    {
      id: 'sms',
      title: 'SMS Notifications',
      description: 'Receive notifications about sms updates',
      enabled: false,
    },
    {
      id: 'marketing',
      title: 'Marketing Notifications',
      description: 'Receive notifications about marketing updates',
      enabled: true,
    },
    {
      id: 'reservations',
      title: 'Reservations Notifications',
      description: 'Receive notifications about reservations updates',
      enabled: true,
    },
  ]);

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, enabled: !notification.enabled }
        : notification
    ));
  };

  return (
    <SettingsLayout
      title="Notification Preferences"
      description="Manage your notification settings"
    >
      <div className="bg-white rounded-xl p-8">
        <div className="space-y-6">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-center justify-between py-4">
              <div>
                <h3 className="text-gray-900 font-medium">{notification.title}</h3>
                <p className="text-gray-500 text-sm">{notification.description}</p>
              </div>
              <button
                onClick={() => toggleNotification(notification.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notification.enabled ? 'bg-[#333e48]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notification.enabled ? 'translate-x-6' : 'translate-x-1'
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
