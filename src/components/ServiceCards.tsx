import React from "react";

// 单个服务卡片组件
export const ServiceCard = ({ 
  title, 
  icon 
}: { 
  title: string; 
  icon: React.ReactNode; 
}): JSX.Element => {
  return (
    <div className="w-[338px] h-[250px] bg-white flex flex-col items-center justify-center p-6 flex-shrink-0">
      <div className="w-[45px] h-[45px] mb-6 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="w-[186px] h-[46px] font-medium text-black text-xl tracking-[0] leading-[normal] text-center">
        {title}
      </h3>
    </div>
  );
};

// 12个服务卡片组件
export const ServiceCards = (): JSX.Element => {
  // 定义12个服务项目
  const services = [
    {
      title: "Daily Translation Assistance",
      icon: (
        <div className="w-[45px] h-[45px] flex items-center justify-center">
          <svg className="w-[45px] h-[45px]" viewBox="0 0 45 45" fill="none">
            <rect width="45" height="45" rx="22.5" fill="#7da84c"/>
            <path d="M12 22.5C12 16.701 16.701 12 22.5 12C28.299 12 33 16.701 33 22.5C33 28.299 28.299 33 22.5 33C16.701 33 12 28.299 12 22.5Z" fill="white"/>
            <path d="M18 22.5L21 25.5L27 19.5" stroke="#7da84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )
    },
    {
      title: "SIM Card Registration",
      icon: (
        <div className="w-[45px] h-[45px] flex items-center justify-center">
          <svg className="w-[45px] h-[45px]" viewBox="0 0 45 45" fill="none">
            <rect width="45" height="45" rx="22.5" fill="#7da84c"/>
            <rect x="12" y="16" width="21" height="13" rx="2" fill="white"/>
            <rect x="14" y="18" width="17" height="9" rx="1" fill="#7da84c"/>
            <circle cx="22.5" cy="22.5" r="1.5" fill="white"/>
          </svg>
        </div>
      )
    },
    {
      title: "Power Adapter Conversion",
      icon: (
        <div className="w-[45px] h-[45px] flex items-center justify-center">
          <svg className="w-[45px] h-[45px]" viewBox="0 0 45 45" fill="none">
            <rect width="45" height="45" rx="22.5" fill="#7da84c"/>
            <path d="M22.5 12L25.5 15L22.5 18L19.5 15L22.5 12Z" fill="white"/>
            <path d="M22.5 27L25.5 30L22.5 33L19.5 30L22.5 27Z" fill="white"/>
            <path d="M12 22.5L15 19.5L18 22.5L15 25.5L12 22.5Z" fill="white"/>
            <path d="M27 22.5L30 19.5L33 22.5L30 25.5L27 22.5Z" fill="white"/>
            <circle cx="22.5" cy="22.5" r="3" fill="white"/>
          </svg>
        </div>
      )
    },
    {
      title: "Travel and Commute Guide",
      icon: (
        <div className="w-[45px] h-[45px] flex items-center justify-center">
          <svg className="w-[45px] h-[45px]" viewBox="0 0 45 45" fill="none">
            <rect width="45" height="45" rx="22.5" fill="#7da84c"/>
            <path d="M22.5 12C27.194 12 31 15.806 31 20.5C31 25.194 27.194 29 22.5 29C17.806 29 14 25.194 14 20.5C14 15.806 17.806 12 22.5 12Z" fill="white"/>
            <path d="M22.5 16C19.462 16 17 18.462 17 21.5C17 24.538 19.462 27 22.5 27C25.538 27 28 24.538 28 21.5C28 18.462 25.538 16 22.5 16Z" fill="#7da84c"/>
            <circle cx="22.5" cy="21.5" r="2" fill="white"/>
          </svg>
        </div>
      )
    },
    {
      title: "Bank Account Setup",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      )
    },
    {
      title: "Medical Insurance",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      title: "Internet Setup",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
        </svg>
      )
    },
    {
      title: "Apartment Viewing",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      )
    },
    {
      title: "Legal Documentation",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        </svg>
      )
    },
    {
      title: "Cultural Orientation",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      title: "Emergency Support",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      title: "Community Events",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="w-full py-16 bg-[#f4f4f4]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <h2 className="font-bold text-[#7da84c] text-[32px] md:text-[40px] text-left leading-[1.3] tracking-[0] mb-6">
            Complete Support Services
          </h2>
          <p className="text-gray-600 text-[16px] md:text-[18px] text-left leading-[1.6]">
            We provide comprehensive support to help you settle in Shanghai smoothly. From essential services to community activities, we've got you covered.
          </p>
        </div>
        
        <div className="flex overflow-x-auto pb-4">
          {services.slice(0, 4).map((service, index) => (
            <div key={index} className={index < 3 ? "mr-8" : ""}>
              <ServiceCard
                title={service.title}
                icon={service.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCards;
