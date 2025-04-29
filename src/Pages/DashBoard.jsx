// import React, { useState, useContext, useEffect ,useRef} from "react";
// import { MenuIcon, XIcon } from "@heroicons/react/outline";
// import { DashBoardContext } from "../DashBoardContext/DashBoardContext";
// import { jwtDecode } from "jwt-decode";
// import CryptoJS from "crypto-js";
// import Nav from "./Nav";
// import { Helmet } from "react-helmet";
// import userImg from "../assets/user.png";
// import axios from "axios";
// import { API } from "../config/configData";

// const Dashboard = () => {
//   const {
//     renderContent,
//     activeSection,
//     setActiveSection,
//     roleSections,
//     user,
//     kycUserData,
//     statusUpdate,
//     sectionComponents,
//     sectionImages,
//   } = useContext(DashBoardContext);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [userRole, setUserRole] = useState("");
//   const [currentSections, setCurrentSections] = useState([]);
//   const [sectionMetadata, setSectionMetadata] = useState({});
//   const [rotation, setRotation] = useState(0);
//   const mainRef = useRef(null);

//   const decryptToken = (encryptedToken) => {
//     const secretKey = import.meta.env.VITE_API_SECREAT_KEY;
//     const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
//     const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
//     return decryptedToken;
//   };

//   const getCurrentSectionMetadata = () => {
//     return {
//       title: `${activeSection} - Dashboard`,
//       description: `View and manage ${activeSection?.toLowerCase()} related tasks and information`,
//       keywords: `${activeSection}, dashboard, management, ${userRole}`,
//     };
//   };

//   useEffect(() => {
//     // Update metadata when active section changes
//     const metadata = getCurrentSectionMetadata();
//     setSectionMetadata(metadata);
//   }, [activeSection, userRole]);

//   useEffect(() => {
//     const tokens = localStorage.getItem("token");
//     if (tokens) {
//       const Securedtoken = decryptToken(tokens);
//       const decodedToken = jwtDecode(Securedtoken);
//       const role = decodedToken.role;
//       setUserRole(role);
//     }
//   }, []);
//   useEffect(() => {
//     const tokens = localStorage.getItem("token");
//     let role;
//     let companyName;
//     let name;
//     if (tokens) {
//       const Securedtoken = decryptToken(tokens);
//       const decodedToken = jwtDecode(Securedtoken);
//       role = decodedToken.role;
//       console.log(role);
//       companyName = decodedToken?.companyName ?? "";
//       name = decodedToken.name;
//     }
//     const fetchContentData = async () => {
//       function formatRoles(role) {
//         console.log("9253222", role);
//         const roleMap = {
//           Admin: "Admin",
//           "Diamond-Purchase": "DiamondPurchase",
//           "Diamond-Supplier": "DiamondSupplier",
//           "Gold-Supplier": "GoldSupplier",
//           "Gold-Purchase": "GoldPurchase",
//           "A/C_Manager": "ACManager",
//           "A/C_Executive": "ACExecutive",
//           "Silver-Supplier": "SilverSupplier",
//           "Silver-Purchase": "SilverPurchase",
//           "GoldHallmark-Supplier": "GoldHallmarkSupplier",
//           "SilverHallmark-Supplier": "SilverHallmarkSupplier",
//         };
//         return roleMap[role];
//       }
//       console.log(formatRoles(role));
//       const roleData = formatRoles(role);

//       const response = await axios.get(
//         `${API}/api/menu-items/${roleData}/${companyName ? companyName : name}`
//       );
//       console.log(response.data);
//       setCurrentSections(response.data);
//     };
//     fetchContentData();
//   }, []);

//   // const currentSections = roleSections[userRole] || []; // Moved higher for clarity
//   console.log(currentSections);
//   useEffect(() => {
//     const storedSection = localStorage.getItem("activeSection");

//     if (storedSection && currentSections.length) {
//       const foundSection = currentSections.find(
//         (section) => section.name === storedSection
//       );
//       setActiveSection(foundSection ? storedSection : currentSections[0].name);
//     } else if (currentSections.length) {
//       setActiveSection(currentSections[0].name);
//     }
//   }, [currentSections]);
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       console.log(event.target);
//       console.log(mainRef.current);
//       if (!mainRef.current.contains(event.target)) {
//         setIsSidebarOpen(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (currentSections.length && !activeSection) {
//       setActiveSection(currentSections[0].name);
//     }
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };
//   console.log(user);
//   return (
//     <>
//       <Helmet>
//         <title>{sectionMetadata.title}</title>
//         <meta name="description" content={sectionMetadata.description} />
//         <meta name="keywords" content={sectionMetadata.keywords} />
//       </Helmet>
//       <div className="">
//         {/* Sidebar */}
//         <aside
//           className={`sidebar fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-sky-600 to-blue-700 text-white z-20 transition-transform duration-300 ease-in-out transform ${
//             isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } md:translate-x-0`}
//         >
//           <div className="user text-white space-x-2 fixed mt-20 md:mt-5">
//             <img
//               src={userImg}
//               alt="User"
//               className="w-8 h-8 rounded-full ml-10 mb-3 border-2 border-blue-300"
//             />
//             <strong className="truncate max-w-[150px] text-blue-100">
//               {user?.length > 12 ? `${user.slice(0, 12)}...` : user}
//             </strong>
//             <p className="text-sm text-blue-100">{userRole}</p>
//           </div>
//           <div className="main p-4 mt-40 md:mt-30">
//             <ul className="space-y-2">
//               {currentSections.map((section) => (
//                 <li
//                   key={section.name}
//                   className={`main-button cursor-pointer px-4 rounded-lg transition-all duration-300 hover:bg-sky-500 ${
//                     activeSection === section.name
//                       ? "bg-blue-200 text-blue-900 shadow-lg"
//                       : ""
//                   }`}
//                   onClick={() => setActiveSection(section.name)}
//                 >
//                   <div className="zoom flex items-center my-2 p-0">
//                     <img
//                       src={sectionImages[section.name]}
//                       alt="Admin Icon"
//                       className="h-6 w-6 mr-2 opacity-80 group-hover:opacity-100"
//                     />
//                     <span>{section.name}</span>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </aside>
//         {/* {console.log(activeSection)} */}
//         {/* Mobile Sidebar Toggle */}
//         <div className="md:hidden bg-gradient-to-r from-sky-600 to-blue-700 text-white fixed top-0 w-full z-50">
//           <button
//             onClick={toggleSidebar}
//             className="p-2 hover:bg-blue-500 transition-colors"
//           >
//             {isSidebarOpen ? (
//               <XIcon className="h-6 w-6" />
//             ) : (
//               <MenuIcon className="h-6 w-6" />
//             )}
//           </button>
//         </div>

//         {/* Main Content */}
//         <div className={`flex-1 ml-0 md:ml-64 mt-20 md:mt-20`}>
//           <div className="hidden md:block">
//             <Nav />
//           </div>
//           <div className="min-h-screen bg-blue-50">
//             <header className="bg-white shadow-md p-4">
//               {/* Navigation or header content */}
//             </header>
//             <main className="flex-1 shadow-2xl rounded-lg  border-t-4 border-sky-600"onClick={() => isSidebarOpen && setIsSidebarOpen(false)}>
//               {sectionComponents[activeSection]}
//               {/* {isSidebarOpen&&setIsSidebarOpen(!isSidebarOpen)} */}

//             </main>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

import React, { useState, useContext, useEffect, useRef } from "react";
import {
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { DashBoardContext } from "../DashBoardContext/DashBoardContext";
import { jwtDecode } from "jwt-decode";
import CryptoJS from "crypto-js";
import Nav from "./Nav";
import { Helmet } from "react-helmet";
import userImg from "../assets/user.png";
import axios from "axios";
import { API } from "../config/configData";
import signoutImg from "../assets/signout.png";
import ContentLoader from "../DashBoardContext/ContentLoader";
const Dashboard = () => {
  const {
    renderContent,
    activeSection,
    setActiveSection,
    roleSections,
    user,
    kycUserData,
    statusUpdate,
    sectionComponents,
    sectionImages,
    activeComponent,
    setActiveComponent,
    handleLogOut,
  } = useContext(DashBoardContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [sectionMetadata, setSectionMetadata] = useState({});
  const [expandedMenus, setExpandedMenus] = useState({});
  const mainRef = useRef(null);
  const sidebarRef = useRef(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const decryptToken = (encryptedToken) => {
    const secretKey = import.meta.env.VITE_API_SECREAT_KEY;
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedToken;
  };

  const getCurrentSectionMetadata = () => {
    return {
      title: `${activeComponent || activeSection} - Dashboard`,
      description: `View and manage ${(
        activeComponent || activeSection
      )?.toLowerCase()} related tasks and information`,
      keywords: `${
        activeComponent || activeSection
      }, dashboard, management, ${userRole}`,
    };
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    // Update metadata when active section changes
    const metadata = getCurrentSectionMetadata();
    setSectionMetadata(metadata);
  }, [activeSection, activeComponent, userRole]);

  useEffect(() => {
    const tokens = localStorage.getItem("token");
    if (tokens) {
      const Securedtoken = decryptToken(tokens);
      const decodedToken = jwtDecode(Securedtoken);
      const role = decodedToken.role;
      const roleData=decodedToken.role_data;
      console.log(roleData);
      setUserRole(role);
    }
  }, []);

  useEffect(() => {
    const tokens = localStorage.getItem("token");
    let role;
    let companyName;
    let name;
    let roleData;
    if (tokens) {
      const Securedtoken = decryptToken(tokens);
      const decodedToken = jwtDecode(Securedtoken);
      role = decodedToken.role;
      companyName = decodedToken?.companyName ?? "";
      name = decodedToken.name;
      roleData=decodedToken.role_data;
     
    }

    const fetchContentData = async () => {
      function formatRoles(role) {
        const roleMap = {
          Admin: "Admin",
          "Diamond-Purchase": "DiamondPurchase",
          "Diamond-Supplier": "DiamondSupplier",
          "Platinum-Supplier": "PlatinumSupplier",

          "Gold-Supplier": "GoldSupplier",
          "Gold-Purchase": "GoldPurchase",
          "A/C_Manager": "ACManager",
          "A/C_Executive": "ACExecutive",
          "Silver-Supplier": "SilverSupplier",
          "Silver-Purchase": "SilverPurchase",
          "GoldHallmark-Supplier": "GoldHallmarkSupplier",
          "SilverHallmark-Supplier": "SilverHallmarkSupplier",
        };
        return roleMap[role];
      }

      const roleData = formatRoles(role);

      try {
        const response = await axios.get(
          `${API}/api/menu-items/${roleData}/${
            companyName ? companyName : name
          }`
        );

        // Process the menu items to create a nested structure
        // const processedItems = processMenuItems(response.data);
        // setMenuItems(processedItems);
        setMenuItems(response.data)
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchContentData();
  }, []);

  // Process menu items to create a nested structure
  // const processMenuItems = (items) => {
  //   // Implementation remains unchanged
  //   // (Keeping the original implementation as is)

  //   // Assuming your API response includes some indication of parent-child relationships
  //   // This could be a parentId field, a type field, or a specific naming convention

  //   // Create a map to group related items
  //   const groupedItems = {};

  //   // First pass: identify parent categories based on a naming pattern or metadata
  //   items.forEach((item) => {
  //     // Example approach 1: Items with similar prefixes can be grouped
  //     // E.g., "KYC View", "KYC Approval" would be grouped under a "KYC" parent
  //     const nameParts = item.name.split(" ");

  //     // For items like "Business Address", "Banking Information" - group under "Information"
  //     if (
  //       item.name.includes("Information") ||
  //       item.name.includes("Address") ||
  //       item.name === "Business Address" ||
  //       item.name === "Principal Address" ||
  //       item.name === "Banking Information" ||
  //       item.name === "Contact Information" ||
  //       item.name === "Trade Information" ||
  //       item.name === "Hallmark Information"
  //     ) {
  //       const parentName = "KYC Information";

  //       if (!groupedItems[parentName]) {
  //         groupedItems[parentName] = {
  //           name: parentName,
  //           children: [],
  //           isParent: true,
  //         };
  //       }

  //       groupedItems[parentName].children.push({
  //         ...item,
  //         isChild: true,
  //       });
  //     }
  //     // For items related to reports
  //     else if (
  //       item.name.includes("Report") ||
  //       item.name === "Kyc View" ||
  //       item.name === "Consolidate Report" ||
  //       item.name === "Supplier Report" ||
  //       item.name === "View Report"
  //     ) {
  //       const parentName = "Reports";

  //       if (!groupedItems[parentName]) {
  //         groupedItems[parentName] = {
  //           name: parentName,
  //           children: [],
  //           isParent: true,
  //         };
  //       }

  //       groupedItems[parentName].children.push({
  //         ...item,
  //         isChild: true,
  //       });
  //     }
  //     // For items related to PO
  //     else if (
  //       item.name.includes("PO") ||
  //       item.name.includes("Purchase") ||
  //       item.name === "Supplier PO" ||
  //       item.name === "Gold PO Entry" ||
  //       item.name === "Gold PO Creation"
  //     ) {
  //       const parentName = "Purchase Orders";

  //       if (!groupedItems[parentName]) {
  //         groupedItems[parentName] = {
  //           name: parentName,
  //           children: [],
  //           isParent: true,
  //         };
  //       }

  //       groupedItems[parentName].children.push({
  //         ...item,
  //         isChild: true,
  //       });
  //     }
  //     // For items related to Credit/Debit notes
  //     else if (
  //       item.name.includes("Credit Note") ||
  //       item.name.includes("Debit Note")
  //     ) {
  //       const parentName = "Credit & Debit Notes";

  //       if (!groupedItems[parentName]) {
  //         groupedItems[parentName] = {
  //           name: parentName,
  //           children: [],
  //           isParent: true,
  //         };
  //       }

  //       groupedItems[parentName].children.push({
  //         ...item,
  //         isChild: true,
  //       });
  //     }
  //     // For items related to Diamond
  //     else if (
  //       item.name.includes("Diamond") ||
  //       item.name === "Diamond View Lists"
  //     ) {
  //       const parentName = "Diamond";

  //       if (!groupedItems[parentName]) {
  //         groupedItems[parentName] = {
  //           name: parentName,
  //           children: [],
  //           isParent: true,
  //         };
  //       }

  //       groupedItems[parentName].children.push({
  //         ...item,
  //         isChild: true,
  //       });
  //     }
  //     // For items related to Kyc
  //     else if (item.name.includes("Kyc")) {
  //       const parentName = "KYC";

  //       if (!groupedItems[parentName]) {
  //         groupedItems[parentName] = {
  //           name: parentName,
  //           children: [],
  //           isParent: true,
  //         };
  //       }

  //       groupedItems[parentName].children.push({
  //         ...item,
  //         isChild: true,
  //       });
  //     }
  //     // For order-related items
  //     else if (item.name.includes("Order")) {
  //       const parentName = "Orders";

  //       if (!groupedItems[parentName]) {
  //         groupedItems[parentName] = {
  //           name: parentName,
  //           children: [],
  //           isParent: true,
  //         };
  //       }

  //       groupedItems[parentName].children.push({
  //         ...item,
  //         isChild: true,
  //       });
  //     }
  //     // For items related to rates
  //     else if (item.name.includes("Rate")) {
  //       const parentName = "Rates";

  //       if (!groupedItems[parentName]) {
  //         groupedItems[parentName] = {
  //           name: parentName,
  //           children: [],
  //           isParent: true,
  //         };
  //       }

  //       groupedItems[parentName].children.push({
  //         ...item,
  //         isChild: true,
  //       });
  //     }
  //     // For admin/approval items
  //     else if (
  //       item.name.includes("Admin") ||
  //       item.name.includes("Approval") ||
  //       item.name === "Master Approval" ||
  //       item.name === "Diamond Lists Approve"
  //     ) {
  //       const parentName = "Admin";

  //       if (!groupedItems[parentName]) {
  //         groupedItems[parentName] = {
  //           name: parentName,
  //           children: [],
  //           isParent: true,
  //         };
  //       }

  //       groupedItems[parentName].children.push({
  //         ...item,
  //         isChild: true,
  //       });
  //     }
  //     // All other items that don't fit in a group
  //     else {
  //       // Keep them as standalone items
  //       groupedItems[item.name] = {
  //         ...item,
  //         children: [],
  //         isParent: false,
  //       };
  //     }
  //   });

  //   // Convert the grouped map to an array
  //   return Object.values(groupedItems);
  // };

  useEffect(() => {
    if (menuItems.length > 0) {
      // Try to restore from localStorage first
      const storedSection = localStorage.getItem("activeSection");
      const storedComponent = localStorage.getItem("activeComponent");

      if (storedSection) {
        // Check if the stored section exists in our current menu
        const sectionExists = menuItems.some(
          (item) =>
            item.name === storedSection ||
            item.children.some((child) => child.name === storedSection)
        );

        if (sectionExists) {
          setActiveSection(storedSection);

          if (storedComponent && sectionComponents[storedComponent]) {
            setActiveComponent(storedComponent);
          }
        } else {
          // If stored section doesn't exist, set first available menu item
          const firstItem = menuItems[0];
          setActiveSection(firstItem.name);

          if (firstItem.children && firstItem.children.length > 0) {
            setActiveComponent(firstItem.children[0].name);
            setExpandedMenus((prev) => ({ ...prev, [firstItem.name]: true }));
          } else {
            setActiveComponent(firstItem.name);
          }
        }
      } else {
        // No stored section, set first available menu item
        const firstItem = menuItems[0];
        setActiveSection(firstItem.name);

        if (firstItem.children && firstItem.children.length > 0) {
          setActiveComponent(firstItem.children[0].name);
          setExpandedMenus((prev) => ({ ...prev, [firstItem.name]: true }));
        } else {
          setActiveComponent(firstItem.name);
        }
      }
    }
  }, [menuItems]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isSidebarOpen &&
        window.innerWidth < 768
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMenu = (sectionName, event) => {
    event.stopPropagation();
    setExpandedMenus((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const handleSectionClick = (section) => {
    setActiveSection(section.name);
    localStorage.setItem("activeSection", section.name);

    // If this section has children, expand it and select the first child
    if (section.children && section.children.length > 0) {
      setExpandedMenus((prev) => ({
        ...prev,
        [section.name]: true,
      }));

      const firstChild = section.children[0];
      setActiveComponent(firstChild.name);
      localStorage.setItem("activeComponent", firstChild.name);
    } else {
      // If no children, use the section itself as the component
      setActiveComponent(section.name);
      localStorage.setItem("activeComponent", section.name);
    }

    // Close mobile sidebar after selection
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleComponentClick = (componentName, event) => {
    event.stopPropagation();
    setActiveComponent(componentName);
    localStorage.setItem("activeComponent", componentName);

    // Close mobile sidebar after selection
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  // Get a suitable icon for the menu item
  const getMenuIcon = (menuItem) => {
    if (menuItem.isParent) {
      // For parent items, try to get an icon from one of its children
      if (menuItem.children.length > 0) {
        const firstChildWithIcon = menuItem.children.find(
          (child) => sectionImages[child.name]
        );
        if (firstChildWithIcon) {
          return sectionImages[firstChildWithIcon.name];
        }
      }
    }

    // For individual items or fallback
    return sectionImages[menuItem.name] || "adminIcon"; // Use a default icon as fallback
  };

  return (
    <>
    <Helmet>
      <title>{sectionMetadata.title}</title>
      <meta name="description" content={sectionMetadata.description} />
      <meta name="keywords" content={sectionMetadata.keywords} />
    </Helmet>
    <div className="flex h-screen bg-gray-100 overflow-hidden" ref={mainRef}>
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 text-white shadow-xl z-20 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 overflow-y-auto flex flex-col`}
      >
        {/* User profile section */}
        <div className="relative">
          <div
            className="flex items-center justify-between p-4 border-b border-blue-500 border-opacity-30"
          >
            <div className="flex items-center">
              {/* <img
                src={userImg}
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-blue-300"
              /> */}
                <div className="w-8 h-8 rounded-full border-2 border-blue-300 flex items-center justify-center bg-blue-500 text-white">
                {user?.charAt(0)?.toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="font-medium text-white">
                  {user?.length > 30 ? `${user.slice(0, 30)}...` : user}
                </p>
                <p className="text-xs text-blue-200">{userRole}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation - Takes up most of the space */}
        <nav className="mt-5 px-2 flex-grow">
          <ul className="space-y-1">
            {menuItems.map((section) => (
              <li
                key={section.name}
                className="mb-1"
              >
                {/* Parent menu item */}
                <div className="relative">
                  <button
                    onClick={() => handleSectionClick(section)}
                    className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeSection === section.name
                        ? "bg-blue-900 text-white"
                        : "text-blue-100 hover:bg-blue-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <img
                        src={getMenuIcon(section)}
                        alt={`${section.name} icon`}
                        className="h-5 w-5 mr-3 opacity-80"
                      />
                      <span>{section.name}</span>
                    </div>
                    {section.children?.length > 0 && (
                      <button
                        onClick={(e) => toggleMenu(section.name, e)}
                        className="p-1 rounded-full hover:bg-blue-900"
                      >
                        {expandedMenus[section.name] ? (
                          <ChevronDownIcon className="h-4 w-4" />
                        ) : (
                          <ChevronRightIcon className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </button>
                </div>

                {/* Child components */}
                {section.children?.length > 0 &&
                  expandedMenus[section.name] && (
                    <ul className="mt-1 space-y-1 pl-5 pr-2 py-1">
                      {section.children.map((item) => (
                        <li key={item.name}>
                          <button
                            onClick={(e) =>
                              handleComponentClick(item.name, e)
                            }
                            className={`flex items-center w-full px-3 py-2 text-xs font-large rounded-md transition-colors ${
                              activeComponent === item.name
                                ? "bg-blue-900 text-white shadow-sm"
                                : "text-blue-200 hover:bg-blue-900 hover:bg-opacity-50"
                            }`}
                          >
                            <div className="w-2 h-2 bg-blue-300 rounded-full mr-2"></div>
                            <span className="truncate">{item.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Logout button - Always at the bottom of sidebar */}
        <div className="mt-auto border-t border-blue-500 border-opacity-30">
          <button
            onClick={handleLogOut}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-blue-100 hover:bg-blue-700 transition-colors"
          >
            <img
              src={signoutImg}
              alt="Log Out"
              className="h-5 w-5 mr-3 opacity-80"
            />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-0 left-0 z-30 p-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSidebarOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64  min-h-screen overflow-hidden">
        <Nav />

        {/* Breadcrumb navigation */}
        <div className="bg-gray shadow-sm border-b px-6 py-3">
          <div className="flex items-center text-sm text-gray-600">
            {activeSection !== activeComponent && (
              <>
                <span className="font-medium text-blue-600">
                  {activeSection}
                </span>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="font-medium text-blue-800 mt-5">
              {activeComponent}
            </span>
          </div>
        </div>

        {/* Main content area - Improved overflow handling */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="bg-gray rounded-lg shadow-md border border-gray-200 min-h-full mt-8 overflow-x-auto">
            {sectionComponents[activeComponent] || (
              <div className="p-8 text-center text-gray-500">
                <p><ContentLoader variant = "skeleton"/></p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  </>
  );
};

export default Dashboard;
