import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import LogIn from "./LogIn";
import Chat from "../pages/Chat";
import Policy from "../pages/Policy";
import Help from "../pages/Help";
import FAQ from "../pages/FAQ";
import { getCategoryIcon } from "../utils/getCategoryIcon";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MyTabs = () => {
  let [categories] = useState({
    LogIn: [
      {
        id: 1,
        content: <LogIn />,
      },
    ],
    Chat: [
      {
        id: 2,
        content: <Chat />,
      },
    ],
    Policy: [
      {
        id: 3,
        content: <Policy />,
      },
    ],
    Help: [
      {
        id: 4,
        content: <Help />,
      },
    ],
    FAQ: [
      {
        id: 5,
        content: <FAQ />,
      },
    ],
  });

  return (
    <Tab.Group>
      <div className="w-full max-w-3xl mx-auto md:py-2 sm:px-0">
        <Tab.List className="flex flex-col items-center justify-center md:flex-row space-x-2 rounded-xl bg-gray-700 p-1">
          {Object.keys(categories).map((category) => {
            const Icon = getCategoryIcon(category);
            return (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full items-center h-12 rounded-2xl md:py-2 md:px-2 text-sm font-medium leading-3 text-green-500 bg-gray-600",
                    "focus:outline-none border-r-2 border-b-2 border-red-800",
                    selected
                      ? "bg-green-400 text-white"
                      : "text-green-500 hover:bg-green-400 hover:text-white"
                  )
                }
              >
                <div className="flex items-center justify-center space-x-1">
                  {Icon && <Icon className="w-4 h-4 md:w-6 md:h-6" />}
                  <span>{category}</span>
                </div>
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels>
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white p-1",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2"
              )}
            >
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      <span>{getCategoryIcon(post.category)}</span>
                      {post.content}
                    </h3>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};

export default MyTabs;
