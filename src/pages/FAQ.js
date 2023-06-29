import React, { useState } from "react";
import { faqs } from "../utils/AccordionData";

const FAQ = () => {
  const [activeTab, setActiveTab] = useState(null);
  const toggleAccordion = (index) => {
    setActiveTab((prevTab) => (prevTab === index ? null : index));
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">
        Frequently Asked Questions
      </h1>
      <div>
        {faqs.map((faq, index) => (
          <div className="mb-4" key={index}>
            <button
              className="flex justify-between w-full p-3 bg-gradient-to-r from-cyan-200 to-green-400 rounded-md focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-semibold text-lg">{faq.question}</span>
              <span>{activeTab === index ? "-" : "+"}</span>
            </button>
            {activeTab === index && (
              <div className="px-4 py-2 bg-gray-100 rounded-md">
                <p className="text-gray-800 leading-snug font-normal">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
