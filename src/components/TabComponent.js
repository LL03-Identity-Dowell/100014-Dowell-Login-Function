import { useState } from "react";
import LogIn from "./LogIn";
import Chat from "../pages/Chat";
import Policy from "../pages/Policy";
import Help from "../pages/Help";
import FAQ from "../pages/FAQ";

export default function TabsComponent() {
  const tabs = [
    { name: "Login", link: "#", content: <LogIn /> },
    { name: "Chat", link: "/chat", content: <Chat /> },
    { name: "Policy", link: "/policy", content: "Policy" },
    { name: "Help", link: "/help", content: "Help" },
    { name: "FAQ", link: "/faq", content: "FAQ" },
  ];
  const [openTab, setOpenTab] = useState("Home");

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center max-w-7xl">
          <ul className="flex space-x-2">
            {tabs.map((tab) => (
              <li key={tab.name}>
                <a
                  href={tab.link}
                  onClick={() => setOpenTab(tab.name)}
                  className="inline-block px-4 py-2 text-gray-600 bg-white rounded shadow"
                >
                  {tab.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="p-3 mt-6 bg-white border">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                className={tab.name === openTab ? "block" : "hidden"}
              >
                {tab.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
