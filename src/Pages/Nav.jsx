// // import React, { useContext, useState } from 'react';
// // import logo from "../assets/space1.png";
// // import userImg from "../assets/user.png";
// // import { DashBoardContext } from '../DashBoardContext/DashBoardContext';
// //  import signoutImg from "../assets/signout.png"
// // import "../App.css";
// // const Nav = () => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const { token, setToken, user, setUser,handleLogOut } = useContext(DashBoardContext);

// //   const toggleMenu = () => {
// //     setIsOpen(!isOpen);
// //   };

// //   return (
// //     <nav className="navbar w-full  border-blue-700 bg-blue-700 bg-opacity-75">
// //       <div className="nav-container  px-5 py-6 items-center">
         
// //              <div className="logo ">
// //              <div className="logo ">
// //   <img src={logo} alt="SPACE TEXTILES" className="opacity-100" />
// // </div>
              
       
// //         </div>
      
        
// //            <div className="log-out">
            
// //               <button onClick={handleLogOut}>
// //               <img src={signoutImg} alt="log Out" className="w-8 h-8 rounded-full" />
// //               <strong>Log Out</strong>
// //               </button>
// //           </div>
// //         <button 
// //           onClick={toggleMenu} 
// //           className="md:hidden p-5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
// //         >
// //           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
// //           </svg>
// //         </button>
// //          </div>

// //       <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}  bg-blue-600 text-white py-4`}>
// //         <ul className="space-y-4 px-4">
// //           <li className="flex items-center space-x-2">
// //             <img src={userImg} alt="User" className="w-8 h-8 rounded-full" />
// //             <strong className='text-white'>{user}</strong>
// //           </li>
       
// //         </ul>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Nav;
// // // import React, { useContext, useState } from 'react';
// // // import { Menu, X, LogOut, User } from 'lucide-react';
// // // import { DashBoardContext } from '../DashBoardContext/DashBoardContext';
// // // import logo from "../assets/space1.png";
// // // import userImg from "../assets/user.png";

// // // const Nav = () => {
// // //     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// // //     const { user, handleLogOut } = useContext(DashBoardContext);

// // //     const toggleMobileMenu = () => {
// // //         setIsMobileMenuOpen(!isMobileMenuOpen);
// // //     };

// // //     return (
// // //         <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
// // //             {/* Main Navigation Container */}
// // //             <div className="container mx-auto px-4 py-3 flex justify-between items-center">
// // //                 {/* Logo */}
// // //                 <div className="flex-shrink-0">
// // //                     <img 
// // //                         src={logo} 
// // //                         alt="SPACE TEXTILES" 
// // //                         className="h-10 w-auto object-contain" 
// // //                     />
// // //                 </div>

// // //                 {/* Desktop Navigation */}
// // //                 <div className="hidden md:flex items-center space-x-4">
// // //                     {/* User Info */}
// // //                     <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
// // //                         <img 
// // //                             src={userImg} 
// // //                             alt="User" 
// // //                             className="w-8 h-8 rounded-full" 
// // //                         />
// // //                         <span className="text-blue-800 font-medium">
// // //                             {user?.length > 20 ? `${user.slice(0, 20)}...` : user}
// // //                         </span>
// // //                     </div>

// // //                     {/* Logout Button */}
// // //                     <button 
// // //                         onClick={handleLogOut}
// // //                         className="flex items-center space-x-2 
// // //                         bg-red-50 text-red-600 px-4 py-2 rounded-lg 
// // //                         hover:bg-red-100 transition-colors"
// // //                     >
// // //                         <LogOut size={20} />
// // //                         <span>Log Out</span>
// // //                     </button>
// // //                 </div>

// // //                 {/* Mobile Menu Toggle */}
// // //                 <div className="md:hidden">
// // //                     <button 
// // //                         onClick={toggleMobileMenu}
// // //                         className="text-blue-600 hover:text-blue-700"
// // //                     >
// // //                         {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
// // //                     </button>
// // //                 </div>
// // //             </div>

// // //             {/* Mobile Menu Overlay */}
// // //             {isMobileMenuOpen && (
// // //                 <div className="md:hidden fixed inset-0 bg-white z-50 pt-16">
// // //                     <div className="container mx-auto px-4 py-6">
// // //                         {/* Mobile User Info */}
// // //                         <div className="flex items-center space-x-4 mb-6 
// // //                         bg-blue-50 p-4 rounded-lg">
// // //                             <img 
// // //                                 src={userImg} 
// // //                                 alt="User" 
// // //                                 className="w-12 h-12 rounded-full" 
// // //                             />
// // //                             <div>
// // //                                 <h2 className="text-xl font-semibold text-blue-800">
// // //                                     {user?.length > 25 ? `${user.slice(0, 25)}...` : user}
// // //                                 </h2>
// // //                             </div>
// // //                         </div>

// // //                         {/* Mobile Logout Button */}
// // //                         <button 
// // //                             onClick={handleLogOut}
// // //                             className="w-full flex items-center justify-center space-x-3 
// // //                             bg-red-50 text-red-600 py-3 rounded-lg 
// // //                             hover:bg-red-100 transition-colors"
// // //                         >
// // //                             <LogOut size={24} />
// // //                             <span className="text-lg font-medium">Log Out</span>
// // //                         </button>
// // //                     </div>
// // //                 </div>
// // //             )}
// // //         </nav>
// // //     );
// // // };

// // // export default Nav;
// // import React, { useContext, useState } from 'react';
// // import logo from "../assets/space1.png";
// // import userImg from "../assets/user.png";
// // import { DashBoardContext } from '../DashBoardContext/DashBoardContext';
// // import signoutImg from "../assets/signout.png"
// // import "../App.css";

// // const Nav = () => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const { token, setToken, user, setUser, handleLogOut } = useContext(DashBoardContext);

// //   const toggleMenu = () => {
// //     setIsOpen(!isOpen);
// //   };

// //   return (
// // <nav className="navbar w-full bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 text-white z-20 bg-opacity-75">     
// //    <div className="nav-container px-5 py-6 items-center">
// //         <div className="logo">
// //           <img src={logo} alt="SPACE TEXTILES" className="opacity-100" />
// //         </div>
        
// //         <div className="log-out">
// //           <button onClick={handleLogOut}>
// //             <img src={signoutImg} alt="log Out" className="w-8 h-8 rounded-full" />
// //             <strong>Log Out</strong>
// //           </button>
// //         </div>
        
// //         <button 
// //           onClick={toggleMenu} 
// //           className="md:hidden p-5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
// //         >
// //           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
// //           </svg>
// //         </button>
// //       </div>

// //       <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-indigo-600 text-white py-4`}>
// //         <ul className="space-y-4 px-4">
// //           <li className="flex items-center space-x-2">
// //             <img src={userImg} alt="User" className="w-8 h-8 rounded-full" />
// //             <strong className='text-white'>{user}</strong>
// //           </li>
// //         </ul>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Nav;

// import React, { useContext, useState } from 'react';
// import logo from "../assets/space1.png";
// import userImg from "../assets/user.png";
// import { DashBoardContext } from '../DashBoardContext/DashBoardContext';
// import signoutImg from "../assets/signout.png";
// import "../App.css";

// const Nav = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { token, setToken, user, setUser, handleLogOut } = useContext(DashBoardContext);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="navbar w-full bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 text-white z-20 bg-opacity-75">     
//      <div className="nav-container px-5 sm:py-0 py-3 flex items-center">

//         <div className="logo">
//           <img src={logo} alt="SPACE TEXTILES" className="opacity-100" />
//         </div>
        
//         <div className="log-out">
//           <button onClick={handleLogOut}>
//             <img src={signoutImg} alt="log Out" className="w-8 h-8 rounded-full" />
//             <strong>Log Out</strong>
//           </button>
//         </div>
        
//         <button 
//           onClick={toggleMenu} 
//           className="md:hidden p-5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//           </svg>
//         </button>
//       </div>

//       <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-indigo-600 text-white py-4`}>
//         <ul className="space-y-4 px-4">
//           <li className="flex items-center space-x-2">
//             <img src={userImg} alt="User" className="w-8 h-8 rounded-full" />
//             <strong className='text-white'>{user}</strong>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Nav;

import React, { useContext, useState } from 'react';
import logo from "../assets/space1.png";
import userImg from "../assets/user.png";
import { DashBoardContext } from '../DashBoardContext/DashBoardContext';
import signoutImg from "../assets/signout.png";
import "../App.css";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, setToken, user, setUser, handleLogOut } = useContext(DashBoardContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar w-full bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 text-white z-20 bg-opacity-75">
      <div className="nav-container px-5  py-4  flex flex-wrap items-center justify-between">
        {/* Logo - Always visible */}
        <div className="logo flex-shrink-0 m-auto">
          <img src={logo} alt="SPACE TEXTILES" className="h-10 w-auto opacity-100" />
        </div>
        
        {/* Logout Button - Visible on larger screens, hidden on mobile */}
       <div className="log-out hidden md:flex items-center text-white">
  <button onClick={handleLogOut} className="flex items-center">
    <img src={signoutImg} alt="log Out" className="w-8 h-8 rounded-full mr-2" />
    <strong>Log Out</strong>
  </button>
</div>
        
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg  text-white hover:bg-indigo-700 transition-colors"
        >
         <img src={userImg} alt="User" className="w-8 h-8 rounded-full" />
          {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg> */}
        </button>
      </div>
      
      {/* Mobile Dropdown Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-indigo-600 text-white py-4`}>
        <ul className="space-y-4 px-4">
          {/* User Info */}
          <li className="flex items-center space-x-2 mb-4">
            
            <strong className='text-white'>{user}</strong>
          </li>
          
          {/* Mobile Logout Option */}
          <li>
            <button 
              onClick={handleLogOut} 
              className="flex items-center w-full text-left hover:bg-indigo-700 px-3 py-2 rounded"
            >
              <img src={signoutImg} alt="log Out" className="w-6 h-6 rounded-full mr-2" />
              <strong>Log Out</strong>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;