
import {
  DiamondMasterPage, BankingInformation, ContactInformation,
  StatutaoryInformation, TradeInformation, SupplierKYC, CombinationGrid, DiamondAdmin, SupplierReport,
  MasterApproval, DiamondLists, adminIcon, masterApprovalIcon, masterpage, list, entry, report, diamondadmin,
  Error, Admin, kycicon, statutatoryimg, bankingicon, contacticon, businessicon, tradeicon, KycView, KycViewImage, KycApproval, FormToCredit,
  Report, Consolidate, Document, SearchBar, CreditNoteAndDebitNote, SupDebitNoteAndCreditNote, rateacceptImage, debitCreditNoteImage, SupplierIndReport,
   ImageCard, SupImageCard,SupDebitCreditReport,debitcreditViewImage,KycViewAccepted,GoldProductForm,GoldPoCreation,poentry,pocreation,PurchaseReturn,poreturn,
   SupplierPurchaseReturn,GoldPoCreationSupplier ,supplierpo,RatesChart,HallmarkInformation,hallmark,PendingCustomerOrder,DispatchCustomerOrder,
   SupplierDataDisplay,POApproval,PoConsolidateReport,LiveRates,RetailRates

} from "../Components/ComponentRoutes.js"
import { DiamondProvider } from '../Application/Diamond/DiamondGridContext/DiamondGridContext';
import { KycDataProvider, KycContext } from "../Application/KYC/KycContext/KycContex";
import { RateProvider } from "../Application/RateConfirmation/Context/Ratecontext.jsx";
import ContentLoader from "./ContentLoader.jsx";
import { PoProvider } from "../Application/Gold/PoContext/PoContext.jsx";

const sectionComponents = {
  "Rate Master": <DiamondProvider><DiamondMasterPage /></DiamondProvider>,
  "Diamond Data Entry": <DiamondProvider><CombinationGrid /></DiamondProvider>,
  "Diamond View Lists": <DiamondProvider><DiamondLists /></DiamondProvider>,
  "Supplier Report": <DiamondProvider><SupplierReport /></DiamondProvider>,
  "Supplier Credit Note And Debit Note": <SupDebitNoteAndCreditNote />,
  "Kyc View": <KycDataProvider><KycView /></KycDataProvider>,
  "Business Address": <KycDataProvider><SupplierKYC /></KycDataProvider>,
  "Principal Address": <KycDataProvider><StatutaoryInformation /></KycDataProvider>,
  "Banking Information": <KycDataProvider><BankingInformation /></KycDataProvider>,
  "Contact Information": <KycDataProvider><ContactInformation /></KycDataProvider>,
  "Trade Information": <KycDataProvider><TradeInformation /></KycDataProvider>,
  "Rate Data Entry": <FormToCredit />,
  "Report": <RateProvider><Report /></RateProvider>,
  "Consolidate Report": <Consolidate />,
  "PO Entry": <PoProvider><GoldProductForm /></PoProvider>,
  "PO Report": <GoldPoCreation />,
  // "Gold PO Entry": <GoldProductForm />,
  // "Gold PO Creation": <GoldPoCreation />,
  // "Print": <Document />,
  "Credit Note And Debit Note": <CreditNoteAndDebitNote />,
  "View Credit Note And Debit Note": <ImageCard />,
  "Kyc Approval": <KycDataProvider><KycApproval /></KycDataProvider>,
  "Approved KYCs": <KycDataProvider><KycViewAccepted /></KycDataProvider>,
  "Rate Accept": <RateProvider><SearchBar /></RateProvider>,
  "View Report": <RateProvider><SupplierIndReport /></RateProvider>,
  "View Debit Note And Credit Note": <SupImageCard />,
 
  "Master Approval": <MasterApproval />,
  "Diamond Lists Approve": <DiamondAdmin />,
  "Admin Page": <Admin />,
  "Dia Purchase Return":<PurchaseReturn/>,
  "Purchase Return Approval":<SupplierPurchaseReturn/>,
  "Supplier PO":<GoldPoCreationSupplier/>,
  "Selling Rate Chart":<RatesChart/>,
  "Hallmark Information":<KycDataProvider><HallmarkInformation/></KycDataProvider>,
  "Supplier Pending Order": <PendingCustomerOrder />,
  "Supplier Dispatch Order":<DispatchCustomerOrder/>,
  "Customer Order Report":<SupplierDataDisplay/>,
  "PO Approval":<PoProvider><POApproval/></PoProvider>,
  "Consolidate PO Report":<PoProvider><PoConsolidateReport/></PoProvider>,
  "Live Rates":<LiveRates/>,
  "Retail Rates":<RetailRates/>

  
};  
const sectionImages = {
  "Rate Master": masterpage,
  "Diamond Data Entry": entry,
  "Diamond View Lists": list,
  "Supplier Report": report,
  "Supplier Credit Note And Debit Note": debitCreditNoteImage,
  "View Credit Note And Debit Note": debitcreditViewImage,
  "View Debit Note And Credit Note": debitcreditViewImage,
  "Credit Note And Debit Note":debitCreditNoteImage,
  "Kyc View": KycViewImage,
  "Business Address": kycicon,
  "Principal Address": statutatoryimg,
  "Banking Information": bankingicon,
  "Contact Information": contacticon,
  "Trade Information": tradeicon,
  "Rate Data Entry": rateacceptImage,
  "Report": statutatoryimg,
  "Consolidate Report": bankingicon,
  "PO Entry": poentry,
  "PO Report": pocreation,
  // "Gold PO Entry": poentry,
  // "Gold PO Creation": pocreation,
  "Print": contacticon,
  "Kyc Approval": adminIcon,
  "Approved KYCs": debitcreditViewImage,
  "Rate Accept": rateacceptImage,
  "Supplier PO":supplierpo,
  "View Report": bankingicon,
  "Supplier Pending Order": businessicon,
  "Supplier Dispatch Order":bankingicon,
  "Master Approval": masterApprovalIcon,
  "Diamond Lists Approve": diamondadmin,
  "Admin Page": adminIcon,
  "Dia Purchase Return":poreturn,
  "Purchase Return Approval":poreturn,
  "Selling Rate Chart":tradeicon,
  "Hallmark Information":hallmark,
  "Customer Order Report":hallmark,
  "Retail Rates":bankingicon

};
export {sectionComponents,sectionImages}