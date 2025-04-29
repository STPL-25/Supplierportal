import React, { useState } from 'react';

function FourSectionLayout() {
  const [activeSection, setActiveSection] = useState(0);
  
  const sections = [
    { title: "Live Rates", color: "bg-blue-100", hasIframe: true },
    { title: "Section 2", color: "bg-green-100", hasIframe: false },
    { title: "Section 3", color: "bg-yellow-100", hasIframe: false },
    { title: "Section 4", color: "bg-red-100", hasIframe: false }
  ];

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Navigation buttons */}
      <div className="flex justify-center p-4 bg-gray-100">
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => setActiveSection(index)}
            className={`px-4 py-2 mx-2 rounded ${
              activeSection === index 
                ? "bg-blue-500 text-white" 
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>
      
      {/* Main content area - 2x2 grid */}
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2 p-2">
        {sections.map((section, index) => (
          <div 
            key={index}
            className={`${section.color} rounded-lg border border-gray-300 flex items-center justify-center p-4 ${
              index === activeSection ? "ring-4 ring-blue-500" : ""
            }`}
          >
            <div className="text-center w-full h-full">
              <h2 className="text-xl font-bold mb-2">{section.title}</h2>
              
              {/* Section 1 with iframe */}
              {index === 0 && (
                <div className="w-full h-64 bg-white rounded overflow-hidden">
                  {/* Note: This iframe may not work due to cross-origin restrictions */}
                  <div className="relative w-full h-full">
                    {/* <p className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      Iframe content would load here
                      <br />
                      (External website content)
                    </p> */}
{/*                     
                      Actual iframe is commented out as it may not work in this environment
                      Uncomment this in your actual code: */}
                      {/* <iframe 
                        src="https://surabibullion.com/" 
                        sandbox="allow-scripts allow-same-origin"
                        className="w-full h-full border-0"
                        title="Live Rates"
                      /> */}
                   
                  </div>
                </div>
              )}
              
              {/* Other sections */}
              {index !== 0 && (
                <div className="mt-4 p-4 bg-white rounded h-64 flex items-center justify-center">
                  <p>Content for {section.title}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FourSectionLayout;