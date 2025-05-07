
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFDownloadLink,
  Link,
  Svg,
  Path,
} from "@react-pdf/renderer";
import { DashBoardContext } from "../../../DashBoardContext/DashBoardContext";
import QRCode from "qrcode";
import { useEffect, useState, useContext } from "react";
// Import your images (adjust paths as needed)
import sktmImage from "../../../assets/Skt.png";
import tct from "../../../assets/tct.png";
import sktmgarsons from "../../../assets/grasons.png";
import sktmspace from "../../../assets/stpl.png";
import moment from "moment";
import RenderSummary from "../PdfStyledComponent/RenderSummary";
import styles from "../PdfStyledComponent/PdfStyled";
import QRCodeComponent from "../PdfStyledComponent/QrCodeComp";
import { getColumns } from "../PdfStyledComponent/GetCoulmns";



// Calculate totals based on data properties
const calculateTotals = (data) => {
  // Initialize all possible total values
  const totals = {
    totalPieces: 0,
    totalGrossWeight: 0,
    totalNetWeight: 0,
    totalAmount: 0,
    totalDiamondWeight: 0,
    totalStoneWeight: 0,
    totalGoldWeight: 0,
    totalPlatinumWeight: 0,
  };

  // Check if we need to calculate pure weight (only for non-Pcs items)
  const calcPureWeight = data.some((item) => item.productWeightage !== "Pcs");
  if (calcPureWeight) {
    totals.totalPureWeight = 0;
  }
  // Add this function to calculate the weights
  const calculateWeights = (item) => {
    const netWeight = parseFloat(item.net_weight) || 0;
    const meltingPercentage = parseFloat(item.melting) || 0;
    const wastagePercentage = parseFloat(item.wastage) || 0;

    item.meltingWeight = ((netWeight * meltingPercentage) / 100).toFixed(3);
    item.wastageWeight = ((netWeight * wastagePercentage) / 100).toFixed(3);

    return item;
  };
  // Calculate totals based on available data
  return data.reduce((acc, item) => {
    // Always calculate these totals
    acc.totalPieces += parseFloat(item.pieces) || 0;
    acc.totalGrossWeight += parseFloat(item.gross_weight) || 0;
    acc.totalNetWeight += parseFloat(item.net_weight) || 0;
    acc.totalAmount += parseFloat(item.amount) || 0;

    // Calculate diamond and stone weights if available
    if (item.diamondwt) {
      acc.totalDiamondWeight += parseFloat(item.diamondwt) || 0;
    }

    if (item.stone_weight) {
      acc.totalStoneWeight += parseFloat(item.stone_weight) || 0;
    }

    // Calculate gold and platinum weights for specific metal types
    if (item.metal_type === "Gold_Diamond_Platinum") {
      if (item.goldwt) {
        acc.totalGoldWeight += parseFloat(item.goldwt) || 0;
      }
      if (item.platinumWt) {
        acc.totalPlatinumWeight += parseFloat(item.platinumWt) || 0;
      }
    }

    // Calculate pure weight only for non-Pcs items
    if (calcPureWeight && item.productWeightage !== "Pcs" && item.pure_wt) {
      acc.totalPureWeight += parseFloat(item.pure_wt) || 0;
    }

    return acc;
  }, totals);
};




// Helper Functions
const formatAddress = (parts) => {
  return parts.filter((part) => part && part.trim()).join(", ");
};

// Watermark Component
const Watermark = () => (
  <View style={styles.watermark}>
    <Text style={styles.watermarkText}>DRAFT</Text>
  </View>
);

// POPage Component
const POPage = ({
  data,
  pageNumber,
  totalPages,
  isLastPage,
  totals,
  // columns = DEFAULT_COLUMNS,
  poAddressData,
  pdfType,
}) => {
  // Get dynamic columns based on data
  const columns = getColumns(data);
  const phoneNumber =
    data[0].metal_type === "Gold"
      ? "+91 9629570888, +91 9789680888"
      : data[0].metal_type === "Silver"
      ? "+91 8220576888, +91 9629221888"
      : data[0].metal_type === "Diamond" ||
        data[0].metal_type === "Gold_Diamond" ||
        data[0].metal_type === "Gold_Diamond_Platinum" ||
        data[0].metal_type === "Platinum"
      ? "9790527888"
      : "";
  const isTct = data[0].poNumber.includes("TCT");
  const approvedBy = data[0].poApprovedBy;
  const approvedTime = data[0].poApprovedDate;
  const parsedMoment = moment(approvedTime);
  console.warn(data);
  // Extract date and time separately
  const dateOnly = parsedMoment.format("YYYY-MM-DD"); // e.g., "2025-03-31"
  const timeOnly = parsedMoment.format("HH:mm:ss"); // e.g., "17:15:44"

  return (
    <Page size="A4" style={styles.page}>
      {/* Watermark for trial version */}
      {pdfType === "trial" && <Watermark />}
      {pageNumber === 1 && (
        <>
          {" "}
          <View
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              zIndex: 100,
            }}
          >
            <QRCodeComponent
              value={poAddressData?.poDetails?.poNumber || "Unknown PO"}
            />
          </View>
          {/* Logo */}
          <Image
            source={
              poAddressData?.poDetails?.poNumber.includes("STPL")
                ? sktmspace
                : poAddressData?.poDetails?.poNumber.includes("GPL")
                ? sktmgarsons
                : poAddressData?.poDetails?.poNumber.includes("TCT")
                ? tct
                : sktmImage
            }
            style={
              poAddressData?.poDetails?.poNumber.includes("TCT")
                ? styles.headerLogoTct
                : styles.headerLogo
            }
          />
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>
                {isTct ? "Job Order" : "Purchase Order"}
              </Text>
            </View>
          </View>
        </>
      )}
      {/* From and To Section */}
      {pageNumber === 1 && (
        <View style={styles.infoGrid}>
          {/* From Section */}
          <View style={styles.infoColumn}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>From</Text>
            </View>
            <View style={styles.sectionContent}>
              <Text style={styles.value}>
                {poAddressData?.our_company_details?.name}
              </Text>
              <Text style={styles.value}>
                {poAddressData?.our_company_details?.subTitle}
              </Text>
              <Text style={styles.label}>
                Address{" "}
                <Text style={styles.value}>
                  {formatAddress([
                    poAddressData?.our_company_details?.doorNo,
                    poAddressData?.our_company_details?.streetName,
                    poAddressData?.our_company_details?.city,
                    poAddressData?.our_company_details?.pincode,
                  ])}
                </Text>
              </Text>
              <Text style={styles.label}>
                Phone{" "}
                <Text style={styles.value}>
                  {poAddressData?.our_company_details?.phone}
                </Text>
              </Text>
              <Text style={styles.label}>
                GST{" "}
                <Text style={styles.value}>
                  {poAddressData?.our_company_details?.gstNo}
                </Text>
              </Text>
            </View>
          </View>

          {/* To Section */}
          <View style={styles.infoColumn}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>To</Text>
            </View>
            <View style={styles.sectionContent}>
              <Text style={styles.label}>
                Supplier Name{" "}
                <Text style={styles.value}>
                  {poAddressData?.supplier?.name}
                </Text>
              </Text>
              <Text style={styles.label}>
                Address{" "}
                <Text style={styles.value}>
                  {formatAddress([
                    poAddressData?.supplier?.doorNo,
                    poAddressData?.supplier?.streetName,
                    poAddressData?.supplier?.city,
                    poAddressData?.supplier?.pincode,
                  ])}
                </Text>
              </Text>
              <Text style={styles.label}>
                Phone{" "}
                <Text style={styles.value}>
                  {poAddressData?.supplier?.phone}
                </Text>
              </Text>
              <Text style={styles.label}>
                GST{" "}
                <Text style={styles.value}>
                  {poAddressData?.supplier?.gstNo}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Three Cards Section */}
      <View style={styles.cardContainer}>
        {/* PO Details Card */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{isTct?"Job Order":"PO"} Details</Text>
          </View>
          <View style={styles.sectionContent}>
            <Text style={styles.label}>
              {/* PO Number:{" "} */}
              {isTct ? "Job No" : "PO Number"}
              <Text style={styles.value}>
                {poAddressData?.poDetails?.poNumber}
              </Text>{" "}
              {isTct ? "Issue Date" : "PO Date"} :{" "}
              <Text style={styles.value}>
                {poAddressData?.poDetails?.poDate}
              </Text>
            </Text>
            <Text style={styles.label}>
              Due Date:{" "}
              <Text style={styles.value}>
                {poAddressData?.poDetails?.dueDate}
              </Text>{" "}
              Mode:{" "}
              <Text style={styles.value}>{poAddressData?.poDetails?.mode}</Text>
            </Text>
            <Text style={styles.label}>
              Pur Managers:{" "}
              <Text style={styles.value}>
                {poAddressData?.counterDetails?.purchaseManager ?? "-"}
              </Text>{" "}
              Pur Incharge:{" "}
              <Text style={styles.value}>
                {poAddressData?.counterDetails?.purchaseIncharge ?? "-"}
              </Text>
            </Text>
          </View>
        </View>

        {/* Delivery Location Card */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Delivery Location</Text>
          </View>
              {console.log(poAddressData?.delivery)}
          <View style={styles.sectionContent}>
            {(() => {
              let deliveryData = null;
              function safeJsonParse(value, fallback) {
                try {
                  return typeof value === 'string' ? JSON.parse(value) : value;
                } catch {
                  return fallback;
                }
              }
              try {
                // deliveryData = poAddressData?.delivery
                //   ? JSON.parse(poAddressData?.delivery)
                //   : null;
                deliveryData = safeJsonParse(poAddressData?.delivery)
                  ? safeJsonParse(poAddressData?.delivery)
                  : {address:"A.Ku Towers, Crosscut Road,Coimbatore,Tamil Nadu,641012,0422-2490888",paymentType:'',locationType:'Direct'}  ;
              } catch (error) {
                console.error("Error parsing delivery data:", error);
              }

              return (
                <>
                  <Text style={styles.label}>
                    Address{" "}
                    <Text style={styles.value}>
                      {deliveryData?.address ?? "No Address Found"}
                    </Text>
                  </Text>

                  <Text style={styles.label}>
                    Payment Type{" "}
                    <Text style={styles.value}>
                      {deliveryData?.paymentType ?? "-"}
                    </Text>
                  </Text>
                  <Text style={styles.label}>
                    Location Type{" "}
                    <Text style={styles.value}>
                      {deliveryData?.locationType ?? "-"}
                    </Text>
                  </Text>
                </>
              );
            })()}
          </View>
        </View>
      </View>

      {/* Table Section */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          {columns.map((col, index) => (
            <View key={index} style={[styles.tableCell, { width: col.width }]}>
              <Text style={styles.tableHeaderCell}>{col.header}</Text>
            </View>
          ))}
        </View>

        {data.map((item, index) => (
  <View
    key={index}
    style={[styles.tableRow, index % 2 === 1 && styles.alternateRow]}
  >
    {columns.map((col, colIndex) => {
      // Skip product_name column for items with orderType === 'office'
      if (col.field === "product_name" && item.orderType === "office") {
        return (
          <View
            key={colIndex}
            style={[styles.tableCell, { width: col.width }]}
          >
            <Text style={styles.tableCellContent}>-</Text>
          </View>
        );
      }

      // Skip stone cost, fine wt, melting, wastage, making charges for Pcs weightage
      if (
        (col.field === "stone_cost" ||
          col.field === "pure_wt" ||
          col.field === "melting" ||
          col.field === "wastage" ||
          col.field === "makingCharges") &&
        item.productWeightage === "Pcs"
      ) {
        return (
          <View
            key={colIndex}
            style={[styles.tableCell, { width: col.width }]}
          >
            <Text style={styles.tableCellContent}>0</Text>
          </View>
        );
      }

      // Handle special case for meltingWt and wastageWt - using the body function
      if ((col.field === "meltingWt" || col.field === "wastageWt") && col.body) {
        // Skip calculated fields for Pcs weightage
        if (item.productWeightage === "Pcs") {
          return (
            <View
              key={colIndex}
              style={[styles.tableCell, { width: col.width }]}
            >
              <Text style={styles.tableCellContent}>0</Text>
            </View>
          );
        }
        
        // Calculate the value using the body function
        const calculatedValue = col.body(item);
        
        return (
          <View
            key={colIndex}
            style={[styles.tableCell, { width: col.width }]}
          >
            <Text style={styles.tableCellContent}>
              {calculatedValue !== undefined ? calculatedValue.toFixed(2) : "-"}
            </Text>
          </View>
        );
      }

      // Handle normal fields
      //https://apphub.spacetextiles.net/tradephoto/api/images/902559596I1.jpg
      return (
        <View
        key={colIndex}
        style={[styles.tableCell, { width: col.width }]}
      >
        {col.field === "product_image" ? (
          item.product_image ? (
            item.product_image.includes("adv.back.spacetextiles.net") ? (
              // Show image directly if URL contains adv.back.spacetextiles.net
              <Image src={item.product_image} style={styles.productImage} />
            ) : (
              // Show as link for other URLs
              <Link src={item.product_image}>
                <Text style={styles.imageLink}>View Image</Text>
              </Link>
            )
          ) : (
            // Handle case with no image URL
            <Text style={styles.tableCellContent}>No Image</Text>
          )
        ) : (
          <Text style={styles.tableCellContent}>
            {col.field === "sno"
              ? (pageNumber - 1) * 10 + index + 1
              : item[col.field] || "-"}
          </Text>
        )}
      </View>
      );
    })}
  </View>
))}
      </View>
    {console.log(isLastPage)}
    {console.log(totals)}

    {console.log(data)}

      {/* {RenderSummary(isLastPage, totals, data)} */}

      <RenderSummary isLastPage={isLastPage} totals={totals} datas={data}/>

      {/* Footer - Only on last page */}
      {isLastPage && (
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            {isTct ? "JOB" : "PURCHASE"} ORDER TERMS AND CONDITIONS
          </Text>
          {isTct
            ? // Job order conditions
              [
                "Goods should be delivered within 15 days from the receipt of the Job order.",
                "Goods should be delivered in a completely finished manner.",
                "If any of the products in this Job order fail the hallmark test, the entire quantity in the Job order may be returned at no cost to us.",
                "The invoice should contain the Job order number.",
                `For any queries regarding this Job order, please contact: ${phoneNumber}.`,
              ].map((condition, index) => (
                <View key={index}>
                  <Text style={styles.footerText}>
                    {index + 1}. {condition}
                  </Text>
                </View>
              ))
            : // Purchase order conditions
              [
                "Goods should be delivered within 15 days from the receipt of the purchase order.",
                "Goods should be delivered in a completely finished manner.",
                "If any of the products in this purchase order fail the hallmark test, the entire quantity in the purchase order may be returned at no cost to us.",
                "The invoice should contain the purchase order number.",
                "The bill set should include the following:",
                `For any queries regarding this purchase order, please contact: ${phoneNumber}.`,
              ].map((condition, index) => (
                <View key={index}>
                  <Text style={styles.footerText}>
                    {index + 1}. {condition}
                  </Text>
                  {condition.includes("bill set") && (
                    <View style={{ marginLeft: 10 }}>
                      {[
                        "Courier receipt (if applicable) or the authorized person's name and phone number.",
                        "Original invoice along with three copies.",
                        "Packing list.",
                        "Calculation workings.",
                      ].map((item, subIndex) => (
                        <Text key={subIndex} style={styles.footerText}>
                          {String.fromCharCode(97 + subIndex)}) {item}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
          {approvedBy && (
            <View style={styles.approvalInfo}>
              <Text>Digitally Approved By: {approvedBy} (PM)</Text>
              <Text>Date: {dateOnly}</Text>
              <Text>Time: {timeOnly}</Text>
            </View>
          )}
        </View>
      )}

      {/* Approval information - added as a separate component above page number */}

      {/* Page Number */}
      <Text style={styles.pageNumber}>
        Page {pageNumber} of {totalPages}
      </Text>
    </Page>
  );
};

// PODocument Component
const PODocument = ({
  submittedData = [],
  // columns = DEFAULT_COLUMNS,
  poAddressData,
  pdfType,
}) => {
  // Group data by PO number
  const groupByPoNumber = (data) => {
    return data.reduce((acc, item) => {
      const poNumber = item.poNumber || "default";
      if (!acc[poNumber]) {
        acc[poNumber] = [];
      }
      acc[poNumber].push(item);
      return acc;
    }, {});
  };

  // Chunk data into pages (if needed)
  const chunkData = (data) => {
    const chunks = [];
    chunks.push(data);
    return chunks;
  };
  const groupedData = groupByPoNumber(submittedData);
  return (
    <Document>
      {Object.entries(groupedData).map(([poNumber, poData]) => {
        const dataChunks = chunkData(poData);
        const totalPages = dataChunks.length;
        const totals = calculateTotals(poData);

        return dataChunks.map((chunk, index) => (
          <POPage
            key={`${poNumber}-${index}`}
            data={chunk}
            pageNumber={index + 1}
            totalPages={totalPages}
            isLastPage={index === dataChunks.length - 1}
            totals={totals}
            poAddressData={{
              ...poAddressData,
              poDetails: {
                ...poAddressData?.poDetails,
              },
            }}
            pdfType={pdfType}
          />
        ));
      })}
    </Document>
  );
};

// Main PurchaseOrderGenerator Component
const PurchaseOrderGenerator = ({
  submittedData = [],
  poAddressData,
  selectedPoNumber,
  pdfType = "final", // Add pdfType prop with default value "final"
}) => {
  // If selectedPoNumber is not available, return null to hide the button
  if (!selectedPoNumber) {
    return null;
  }
  const { roleData } = useContext(DashBoardContext);

  // Generate unique filename based on PO number and date
  const generateFilename = () => {
    const poNumber = poAddressData?.poDetails?.poNumber || "PO";
    const date = new Date().toISOString().split("T")[0];
    const suffix = pdfType === "trial" ? "_TRIAL" : "";
    return `${poNumber}${suffix}_${date}.pdf`;
  };

  return (
    <div className="w-full flex justify-center">
      <PDFDownloadLink
        document={
          <PODocument
            submittedData={submittedData}
            poAddressData={poAddressData}
            pdfType={pdfType}
          />
        }
        fileName={generateFilename()}
      >
        {({ loading, error }) => (
          <button
            className={`px-4 py-2 sm:px-6 sm:py-3 ${
              pdfType === "trial"
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white rounded-lg transition-colors duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={loading || !poAddressData || error}
          >
            {console.log(error)}
            {loading || !poAddressData
              ? "Generating PDF..."
              : error
              ? "Error generating PDF"
              : pdfType === "trial"
              ? "Download Trial Purchase Order PDF"
              : "Download Purchase Order PDF"}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default PurchaseOrderGenerator;
