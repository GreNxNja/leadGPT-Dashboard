"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("Statistics");

  const menuItems = {
    campaign: [
      { icon: "dashboardlogo.png", label: "Dashboard" },
      { icon: "campaignlogo.png", label: "Campaigns" },
      { icon: "inboxlogo.png", label: "Inbox" },
      { icon: "senderslogo.png", label: "Senders" },
      { icon: "playbooklogo.png", label: "Playbook / Resources" },
    ],
    insights: [
      { icon: "statisticslogo.png", label: "Statistics" },
      { icon: "analyticslogo.png", label: "Analytics" },
      { icon: "integrationslogo.png", label: "Integrations" },
      { icon: "knowledgelogo.png", label: "Knowledge base" },
    ],
  };

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const sidebarWidth = isCollapsed ? 'w-20' : 'w-[280px]';

  return (
    <aside className={`${sidebarWidth} bg-white p-5 flex flex-col h-screen fixed left-0 top-0 border-r border-gray-200 transition-all duration-300`}>
      
      <div className={`flex items-center gap-2.5 mb-8 pb-4 border-b border-gray-100 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <div className={`flex items-center gap-2.5 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'} transition-opacity duration-300 overflow-hidden`}>
          <img src="/leadgptlogo.png" alt="LeadGPT Logo" className="w-8 h-8 object-contain" />
          <img 
            src="/leadgpt-text.png" 
            alt="LEADGPT" 
            style={{
              width: "80.43389129638672px",
              height: "9.999446868896484px",
              transform: "rotate(0deg)",
              opacity: 1,
            }}
          />
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleSidebar}
          className="h-7 w-7 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-300"
        >
          {isCollapsed ? (
            <img src="/sidebarLogoRight.png" alt="Expand Sidebar" className="h-4 w-4 object-contain" />
          ) : (
            <img src="/sidebarLogoLeft.png" alt="Collapse Sidebar" className="h-4 w-4 object-contain" />
          )}
        </Button>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto overflow-x-hidden">

        {!isCollapsed && (
          <h3 className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider mb-2 px-3">
            Campaign & Outreach
          </h3>
        )}
        <div className="space-y-0.5">
          {menuItems.campaign.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => setActiveItem(item.label)}
                className={`w-full justify-start h-9 ${isCollapsed ? 'justify-center px-0' : 'px-3'} text-[13px] font-normal transition-all duration-200 ${
                  isActive
                    ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <img
                  src={`/${item.icon}`}
                  alt={item.label}
                  className={`h-[18px] w-[18px] object-contain ${!isCollapsed ? 'mr-3' : 'mr-0'}`}
                  style={{ filter: isActive ? "brightness(0) saturate(100%) invert(100%)" : "none" }}
                />
                {!isCollapsed && item.label}
              </Button>
            );
          })}
        </div>

        {!isCollapsed && (
          <h3 className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider mb-2 px-3">
            Insights & Management
          </h3>
        )}
        <div className="space-y-0.5">
          {menuItems.insights.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => setActiveItem(item.label)}
                className={`w-full justify-start h-9 ${isCollapsed ? 'justify-center px-0' : 'px-3'} text-[13px] font-normal transition-all duration-200 ${
                  isActive
                    ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <img
                  src={`/${item.icon}`}
                  alt={item.label}
                  className={`h-[18px] w-[18px] object-contain ${!isCollapsed ? 'mr-3' : 'mr-0'}`}
                  style={{ filter: isActive ? "brightness(0) saturate(100%) invert(100%)" : "none" }}
                />
                {!isCollapsed && item.label}
              </Button>
            );
          })}
        </div>
      </nav>

      <div className="mt-auto pt-4 space-y-3 border-t border-gray-100">
        {!isCollapsed && (
          <div className="bg-gray-50 p-3 rounded-lg flex items-center">
            <img src="/amankaya.png" alt="Aman Kaya" className="h-9 w-9 rounded-full object-cover mr-3" />
            <div className="min-w-0">
              <p className="text-[10px] text-gray-500">Your LeadGPT expert is</p>
              <p className="text-[13px] font-semibold text-gray-900 truncate">Aman Kaya</p>
            </div>
          </div>
        )}
        <div className="flex gap-2">
          {!isCollapsed ? (
            <>
              <Button variant="outline" className="flex-1 h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                Email
              </Button>
              <Button className="flex-1 h-8 text-xs bg-violet-600 hover:bg-violet-700 text-white">
                Meet
              </Button>
            </>
          ) : (
            <Button size="icon" className="w-full h-8 bg-violet-600 hover:bg-violet-700">
              <img src="/amankaya.png" alt="Aman Kaya" className="h-4 w-4 rounded-full object-cover" />
            </Button>
          )}
        </div>
        <Button 
          variant="ghost" 
          className={`w-full justify-start h-9 ${isCollapsed ? 'justify-center px-0' : 'px-3'} text-[13px] text-gray-700 hover:bg-gray-50`}
        >
          <img 
            src="/helplogo.png" 
            alt="Help" 
            className={`h-[18px] w-[18px] object-contain ${!isCollapsed ? 'mr-3' : 'mr-0'}`} 
          />
          {!isCollapsed && "Help and Support"}
        </Button>
      </div>
    </aside>
  );
}
