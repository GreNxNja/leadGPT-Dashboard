"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
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

  const renderMenuItem = (item: { icon: string; label: string }) => {
    const isActive = activeItem === item.label;

    return (
      <Button
        key={item.label}
        variant="ghost"
        onClick={() => setActiveItem(item.label)}
        className={`w-full justify-start h-9 px-3 text-[13px] font-normal flex items-center 
          ${isActive ? "bg-violet-600 text-white" : "text-gray-700 hover:bg-gray-50"}
        `}
      >
        <img
          src={`/${item.icon}`}
          alt={item.label}
          className="mr-3 h-[18px] w-[18px] object-contain"
          style={{
            filter: isActive
              ? "brightness(0) saturate(100%) invert(1)"
              : "none",
            pointerEvents: "none",
          }}
        />
        {item.label}
      </Button>
    );
  };

  return (
    <aside className="w-[280px] bg-white p-5 flex flex-col h-screen fixed left-0 top-0 border-r border-gray-200">
      <div className="flex items-center gap-2.5 mb-8 pb-4">
        <img src="/leadgptlogo.png" alt="LeadGPT Logo" className="w-10 h-10 object-contain" />
        <img
          src="/leadgpt-text.png"
          alt="LeadGPT Text"
          style={{ width: "80.43px", height: "10px" }}
        />
      </div>

      <nav className="flex-1 space-y-6">
        <div>
          <h3 className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider mb-2 px-3">
            Campaign & Outreach
          </h3>
          <div className="space-y-0.5">
            {menuItems.campaign.map(renderMenuItem)}
          </div>
        </div>

        <div>
          <h3 className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider mb-2 px-3">
            Insights & Management
          </h3>
          <div className="space-y-0.5">
            {menuItems.insights.map(renderMenuItem)}
          </div>
        </div>
      </nav>

      <div className="mt-auto pt-4 space-y-3 border-t border-gray-100">
        <div className="bg-gray-50 p-3 rounded-lg flex items-center">
          <img src="/amankaya.png" alt="Aman Kaya" className="h-9 w-9 rounded-full object-cover mr-3" />
          <div className="min-w-0">
            <p className="text-[10px] text-gray-500">Your LeadGPT expert is</p>
            <p className="text-[13px] font-semibold text-gray-900 truncate">Aman Kaya</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
            Email
          </Button>
          <Button className="flex-1 h-8 text-xs bg-violet-600 hover:bg-violet-700 text-white">
            Meet
          </Button>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start h-9 px-3 text-[13px] text-gray-700 hover:bg-gray-50"
        >
          <img
            src="/helplogo.png"
            alt="Help"
            className="mr-3 h-[18px] w-[18px] object-contain"
            style={{ filter: "brightness(0) saturate(100%) invert(1)", pointerEvents: "none" }}
          />
          Help and Support
        </Button>
      </div>
    </aside>
  );
}
