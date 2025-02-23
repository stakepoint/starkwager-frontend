import React from 'react';
import { X, Check, Camera, Wallet } from 'lucide-react';
import Image from 'next/image';

interface Notification {
    id: number;
    type: string;
    message: string;
    status: 'read' | 'unread';
    timestamp: string;
  }

const notifications: Notification[] = [
  {
    id: 1,
    type: "Man U vs Arsenal",
    message: "You lost this wager",
    status: "read",
    timestamp: "2025-02-19T10:30:00Z"
  },
  {
    id: 2,
    type: "Will Bitcoin Hit $100k Before January 31, 2025?",
    message: "You won this wager",
    status: "unread",
    timestamp: "2025-02-16T10:30:00Z"
  },
  {
    id: 3,
    type: "Will Bitcoin Hit $100k Before January 31, 2025?",
    message: "@noyi24_7 sent proof",
    status: "unread",
    timestamp: "2025-02-16T10:30:00Z"
  },
  {
    id: 4,
    type: "Will Bitcoin Hit $100k Before January 31, 2025?",
    message: "@babykoem disagreed and requested for proof",
    status: "unread",
    timestamp: "2025-02-16T10:30:00Z"
  },
  {
    id: 5,
    type: "Will Bitcoin Hit $100k Before January 31, 2025?",
    message: "@babykoem accepted your wager",
    status: "read",
    timestamp: "2025-02-16T10:30:00Z"
  },
  {
    id: 6,
    type: "Will Bitcoin Hit $100k Before January 31, 2025?",
    message: "Waiting for your opponent...",
    status: "unread",
    timestamp: "2025-02-19T05:30:00Z"
  },
  {
    id: 7,
    type: "Deposit Successful",
    message: "10 Strk has been added to your wallet",
    status: "read",
    timestamp: "2025-02-16T10:30:00Z"
  }
];

const getIcon = (message: string) => {
  if (message.includes("won")) {
    return (
      <div className="bg-[#F9FAFB] p-3 rounded-full">
        <Image 
          src="/images/check.png"
          alt="win notification"
          width={20}
          height={20}
          className="h-5 w-5"
        />
      </div>
    );
  }

  if (message.includes("lost")) {
    return (
      <div className="bg-[#F9FAFB] p-3 rounded-full">
        <Image 
          src="/images/x.png"
          alt="loss notification"
          width={20}
          height={20}
          className="h-5 w-5"
        />
      </div>
    );
  }

  if (message.includes("proof") || message.includes("disagreed")) {
    return (
      <div className="bg-[#F9FAFB] p-3 rounded-full">
        <Image 
          src="/images/camera.png"
          alt="proof notification"
          width={20}
          height={20}
          className="h-5 w-5"
        />
      </div>
    );
  }

  if (message.includes("Deposit") || message.includes("wallet")) {
    return (
      <div className="bg-[#F9FAFB] p-3 rounded-full">
        <Image 
          src="/images/coins.png"
          alt="wallet notification"
          width={20}
          height={20}
          className="h-5 w-5"
        />
      </div>
    );
  }

  if (message.includes("accepted") || message.includes("Waiting")) {
    return (
      <div className="bg-[#F9FAFB] p-3 rounded-full">
        <Image 
          src="/images/hands.png"
          alt="wager notification"
          width={20}
          height={20}
          className="h-5 w-5"
        />
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] p-3 rounded-full">
      <Image 
        src="/images/check.png"
        alt="default notification"
        width={20}
        height={20}
        className="h-5 w-5"
      />
    </div>
  );
};

const getRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    return `${diffInHours}h`;
  }
  return `${diffInDays}d`;
};

const NotificationPanel: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      ref={panelRef} 
      className="absolute right-4 top-16 w-[95%] md:w-[400px] bg-[#EFF1F5] rounded-lg shadow-lg p-4 mx-auto left-[50%] md:left-auto transform translate-x-[-50%] md:translate-x-0"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base md:text-lg font-bold text-blue-950">NOTIFICATIONS</h2>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <ul className="space-y-4 max-h-[450px] md:max-h-[550px] overflow-y-auto">
        {notifications.map((notification) => (
          <li 
            key={notification.id} 
            className={`bg-white rounded-lg p-3 md:p-4 flex items-start gap-3 md:gap-4 relative ${
              notification.status === 'unread' ? 'border-l-4 border-secondary' : ''
            }`}
          >
            {getIcon(notification.message)}
            <div className="flex-1">
              <div className="text-xs md:text-sm font-semibold text-[#101828]">{notification.type}</div>
              <div className="text-xs md:text-sm text-[#475467] mt-1">
                <span className="font-medium">You</span> {notification.message.toLowerCase()}
              </div>
              <div className="text-xs md:text-sm text-[#667085] mt-1">{getRelativeTime(notification.timestamp)}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;