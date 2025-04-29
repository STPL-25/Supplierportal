import { useContext, useState } from 'react'
import './App.css'
import Dashboard from './Pages/DashBoard'
import DiamondMasterPage from "./Application/Diamond/Pages/DiamondMasterPage"
import Combine from "./Application/Diamond/Pages/Combine"
import DiamondAdmin from "./Application/Diamond/Pages/DiamondAdmin"
import SupplierReport from "./Application/Diamond/Pages/SupplierReport"
import MasterApproval from "./Application/Diamond/Pages/MasterApproval"
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import LoggIn from './Pages/LoggIn'
import SignUp from './Pages/SignUp'
// import ProtectedRoute from './Components/ProtectedRoute'
import { DashBoardContext } from './DashBoardContext/DashBoardContext'
import { DiamondProvider } from './Application/Diamond/DiamondGridContext/DiamondGridContext'
// import CombinationGrid from "./Application/Diamond/Pages/CombinationGrid"
import Error from './Pages/Error'
import moment from 'moment/moment'
// import {BusinessInformation} from "./Components/ComponentRoutes"
import { KycDataProvider } from './Application/KYC/KycContext/KycContex'
import SupplierReport1 from "./Application/Diamond/Pages/report"
function App() {
 
const {user, setUser}=useContext(DashBoardContext)
// console.log(user)
// console.log(Error)
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <AdminPage/> */}

          {/* Public routes */}
          
          {/* <Route path='/supplierreport'element={<DiamondProvider><SupplierReport1 /></DiamondProvider>}/> */}
          <Route path="/" element={user?<Dashboard />:<KycDataProvider><LoggIn /></KycDataProvider>} />
          <Route path="/signup" element={user?<Dashboard />:<SignUp />} />
          <Route path="*" element={<Error />} />
          <Route path='/Dashboard' element={user?<Dashboard />:<KycDataProvider><LoggIn /></KycDataProvider>} />
          {/* <Route path='/admin' element={<KycDataProvider><BusinessInformation/></KycDataProvider>}/> */}

          {/* Protected routes */}
          {/* <Route
            path="/master"
            element={
              <ProtectedRoute user={user} allowedRoles={['dia-supplier', 'dia-staff']}>
                <DiamondMasterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/diamondField"
            element={
              <ProtectedRoute user={user} allowedRoles={['dia-supplier', 'dia-staff']}>
                <CombinationGrid/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/diamndAdmin"
            element={
              <ProtectedRoute user={user} allowedRoles={['dia-staff']}>
                <DiamondAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplierReport"
            element={
              <ProtectedRoute user={user} allowedRoles={['dia-supplier']}>
                <SupplierReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/masterapproval"
            element={
              <ProtectedRoute user={user} allowedRoles={['dia-staff']}>
                <MasterApproval />
              </ProtectedRoute>
            }
          /> */}
          
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
