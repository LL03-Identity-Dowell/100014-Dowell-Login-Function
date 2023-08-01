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
        id: 1,
        content: <Chat />,
      },
    ],
    Policy: [
      {
        id: 1,
        content: <Policy />,
      },
    ],
    Help: [
      {
        id: 1,
        content: <Help />,
      },
    ],
    FAQ: [
      {
        id: 1,
        content: <FAQ />,
      },
    ],
  });

  return (
    <Tab.Group>
      <div className="w-full max-w-3xl mx-auto px-2 py-2 sm:px-0">
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-700 p-1">
          {Object.keys(categories).map((category) => {
            const Icon = getCategoryIcon(category);
            return (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2 text-sm font-medium leading-3 text-green-700",
                    "ring-red-300 ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-green-500 text-white shadow"
                      : "text-green-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                <div className="flex items-center justify-center space-x-1">
                  {Icon && <Icon className="w-6 h-6" />}
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
                "rounded-xl bg-white p-2",
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
                      <span className="mr-1">
                        {getCategoryIcon(post.category)}
                      </span>
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
