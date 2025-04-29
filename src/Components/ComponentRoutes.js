
// Diamond Imports
import DiamondMasterPage from "../Application/Diamond/Pages/DiamondMasterPage";
import CombinationGrid from "../Application/Diamond/Pages/CombinationGrid";
import DiamondAdmin from "../Application/Diamond/Pages/DiamondAdmin";
import SupplierReport from "../Application/Diamond/Pages/SupplierReport";
import MasterApproval from "../Application/Diamond/Pages/MasterApproval";
import DiamondLists from "../Application/Diamond/Pages/DiamondLists";

// Icon Imports
import adminIcon from "../assets/admin.png";
import masterApprovalIcon from "../assets/approval.png";
import masterpage from "../assets/masterpage.png";
import list from "../assets/list.png";
import entry from "../assets/entry.png";
import report from "../assets/report.png";
import diamondadmin from "../assets/diamond.png";
import kycicon from "../Application/KYC/imageAssets/kyc.png"
import statutatoryimg from "../Application/KYC/imageAssets/statutatory.png"
import bankingicon from "../Application/KYC/imageAssets/banking.png"
import contacticon from "../Application/KYC/imageAssets/contact.png"
import businessicon from "../Application/KYC/imageAssets/business.png"
import tradeicon from "../Application/KYC/imageAssets/trade.png"
import KycViewImage from "../Application/KYC/imageAssets/viewkyc.png";
import rateacceptImage from "../assets/rateaccept.png";
import debitCreditNoteImage from "../assets/debitcredit.png";
import debitcreditViewImage from "../assets/debitcreditImg.png"
import poentry from '../assets/poentry.png'
import pocreation from '../assets/pocreation.png'
import supplierpo from "../assets/supplierpo.png"
import hallmark from "../assets/hallmark.png"
// Other Page Imports
import Error from '../Pages/Error';
import Admin from "../Pages/Admin";
import RatesChart from "../Application/Gold/Charts/RatesChart";
// KYC Imports
import BankingInformation from "../Application/KYC/components/BankingInformation";
// import BusinessInformation from "../Application/KYC/components/BusinessInformation";
import ContactInformation from "../Application/KYC/components/ContactInformation";
import SupplierKYC from "../Application/KYC/components/SupplierKYC";
import StatutaoryInformation from "../Application/KYC/components/StatutaoryInformation";
import TradeInformation from "../Application/KYC/components/TradeInformation";
//KYC pages
import KycView from "../Application/KYC/pages/KycView";
import KycApproval from "../Application/KYC/pages/KycApproval"
// Export all components and assets
//Rate Confirmation 
import FormToCredit from "../Application/RateConfirmation/FormToCredit"
import Report from "../Application/RateConfirmation/Report"
import Consolidate from "../Application/RateConfirmation/Consolidate"
import Document from "../Application/RateConfirmation/Document"
import SearchBar from "../Application/RateConfirmation/SearchBar"
import CreditNoteAndDebitNote from "../Application/DebitAndCreditNote/CreditNoteAndDebitNote";
import SupDebitNoteAndCreditNote from "../Application/DebitAndCreditNote/SupDebitNoteAndCreditNote";
import SupplierIndReport from "../Application/RateConfirmation/SupplierIndReport";
import ImageCard from "../Application/DebitAndCreditNote/ImageCard";
import SupImageCard from "../Application/DebitAndCreditNote/SupImageCard";
import SupDebitCreditReport from "../Application/DebitAndCreditNote/SupDebitCreditReport";
import KycViewAccepted from "../Application/KYC/pages/KycViewAccepted";
import GoldProductForm from "../Application/Gold/pages/GoldProductForm";
import GoldPoCreation from "../Application/Gold/pages/GoldPoCreation";
import PurchaseReturn from '../Application/Diamond/Pages/PurchaseReturn';
import GoldPoCreationSupplier from "../Application/Gold/pages/GoldPoCreationSupplier"
import PendingCustomerOrder from "../Application/SupplierOrder/PendingCustomerOrder";
import poreturn from "../assets/poreturn.png"
import SupplierPurchaseReturn from "../Application/Diamond/Pages/SupplierPurchaseReturn"
import HallmarkInformation from "../Application/KYC/components/HallmarkInformation";
import DispatchCustomerOrder from "../Application/SupplierOrder/DispatchCustomerOrder";
import SupplierDataDisplay from "../Application/SupplierOrder/SupplierDataDisplay";
import POApproval from "../Application/Gold/pages/POApproval"
import PoConsolidateReport from "../Application/Gold/pages/PoConsolidateReport";
import LiveRates from "../Application/RateConfirmation/LiveRates";
import RetailRates from "../Application/RetailRates/RetailRates";
export {
  DiamondMasterPage,
  CombinationGrid,
  DiamondAdmin,
  SupplierReport,
  MasterApproval,
  DiamondLists,
  adminIcon,
  masterApprovalIcon,
  masterpage,
  list,
  entry,
  report,
  diamondadmin,
  kycicon,
  statutatoryimg,
  bankingicon,
  contacticon,
  businessicon,
  tradeicon,
  rateacceptImage,
  debitCreditNoteImage,
  Error,
  Admin,
  BankingInformation,
  // BusinessInformation,
  ContactInformation,
  SupplierKYC,
  StatutaoryInformation,
  TradeInformation,
  KycView,
  KycApproval,
  FormToCredit,
  Report,
  Consolidate,
  Document,
  SearchBar,
  CreditNoteAndDebitNote,
  SupDebitNoteAndCreditNote,
  KycViewImage,
  debitcreditViewImage,
  SupplierIndReport,
  ImageCard,
  SupImageCard,
  SupDebitCreditReport,
  KycViewAccepted,
  GoldProductForm,
  GoldPoCreation,
  poentry,
  pocreation,
  PurchaseReturn,
  poreturn,
  SupplierPurchaseReturn,
  GoldPoCreationSupplier,
  supplierpo,
  RatesChart,
  HallmarkInformation,
  hallmark,
  PendingCustomerOrder,
  DispatchCustomerOrder,
  SupplierDataDisplay,
  POApproval,
  PoConsolidateReport,
  LiveRates,
  RetailRates
  // SupplierOrder
};
