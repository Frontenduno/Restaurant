import { useState } from "react";

function FiltroComanda() {
  const [activeTab, setActiveTab] = useState("pendientes");

  const tabs = [
    { id: "pendientes", label: "Pendientes", count: 3 },
    { id: "cocina", label: "En Cocina", count: 3 },
  ];
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200
            ${
              activeTab === tab.id
                ? "bg-white shadow-md text-black"
                : "bg-transparent text-slate-500 hover:text-slate-700"
            }
          `}
        >
          <span className="font-bold text-xl md:text-base">{tab.label}</span>

          <span
            className={`
            flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold
            ${
              activeTab === tab.id
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-200 text-gray-500"
            }
          `}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}

export default FiltroComanda;
