import React from 'react';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 10,
  },
  header: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minHeight: 24,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  cell: {
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 4,
    fontSize: 8,
    justifyContent: 'center',
    textAlign: 'center',
  },
  groupHeader: {
    backgroundColor: '#e0e0e0',
    fontWeight: 'bold',
    fontSize: 10,
    padding: 4,
    textAlign: 'center',
  },
  totalsRow: {
    backgroundColor: '#d0d0d0', // Darker shade for bold effect
    fontWeight: 'bold',
    fontSize: 8, // Slightly larger font for totals
    borderBottomWidth: 2, // Bold bottom border
    borderTopWidth: 2, // Bold top border
    borderColor: '#000', // Black borders
    color: '#000', // Black text for better readability
  },
  totalCell: {
    backgroundColor: '#f8f8f8',
    fontWeight: 'bold',
    fontSize: 8,
    padding: 4,
    borderRightWidth: 1,
    borderRightColor: '#000',
    textAlign: 'center',
  },
  basicInfo: { width: '9%', border: 1 }, // Adjusted to accommodate basic details
  metalInfo: { width: '20%', border: 1 }, // Adjusted to fit metal details
  diamondInfo: { width: '24%', border: 1 }, // Adjusted to cover shape to amount
  stoneInfo: { width: '25%', border: 1 }, // Adjusted for type to amount
  chargesInfo: { width: '15.5%', border: 1 }, // For totals with GST
  totalInfo: { width: '7%', border: 1 } // Smaller width for total column
});

const DiamondPDF = ({ data }) => {
  console.log(data)
  const formatNumber = (value) => {
    if (!value) return '0.00';
    return Number(value).toLocaleString(undefined, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    });
  };
  const formatStackedItems = (items, key) => {
    if (!items?.length) return '';
    
    return items.map(item => {
      const value = item[key] || '';
      return key === 'Amount' && typeof value === 'number' 
        ? value.toFixed(3) 
        : value;
    }).join('\n\n');
  };

  const calculateTotals = () => {
    return data.reduce((acc, row) => ({
      diamondPcs: Math.round(acc.diamondPcs + (row.Diamonds?.reduce((sum, d) => sum + (Number(d.NoOfStones) || 0), 0) || 0)),
      diamondCts: Number((acc.diamondCts + (row.Diamonds?.reduce((sum, d) => sum + (Number(d.Carat) || 0), 0) || 0)).toFixed(3)),
      diamondValue: Math.round(acc.diamondValue + (row.Diamonds?.reduce((sum, d) => sum + (Number(d.Value) || 0), 0) || 0)),
      goldGrossWt: Number((acc.goldGrossWt + (Number(row.GoldWt) || 0)).toFixed(3)),
      goldNetWt: Number((acc.goldNetWt + (Number(row.GNetWt) || 0)).toFixed(3)),
      goldValue: Math.round(acc.goldValue + (Number(row.GoldValue) || 0)),
      ptGrossWt: Number((acc.ptGrossWt + (Number(row.PTWt) || 0)).toFixed(3)),
      ptNetWt: Number((acc.ptNetWt + (Number(row.PNetWt) || 0)).toFixed(3)),
      ptValue: Math.round(acc.ptValue + (Number(row.PTValue) || 0)),
      stonePcs: Math.round(acc.stonePcs + (row.ColorStones?.reduce((sum, s) => sum + (Number(s.Pcs) || 0), 0) || 0)),
      stoneCts: Number((acc.stoneCts + (row.ColorStones?.reduce((sum, s) => sum + (Number(s.csCarat) || 0), 0) || 0)).toFixed(3)),
      stoneValue:(acc.stoneValue + (row.ColorStones?.reduce((sum, s) => sum + (parseFloat(s.Amount) || 0), 0) || 0)),
      wastage: Math.round(acc.wastage + (Number(row.WastageAmt) || 0)),
      HMTaxableAmt: Math.round(acc.HMTaxableAmt + (Number(row.HMTaxableAmt) || 0)),
      goldMaking: Math.round(acc.goldMaking + (Number(row.GoMcAmount) || 0)),
      ptMaking: Math.round(acc.ptMaking + (Number(row.PTMcAmount) || 0)),
      CertTaxableAmt: Math.round(acc.CertTaxableAmt + (Number(row.CertTaxableAmt) || 0)),
      grandTotal: Math.round(acc.grandTotal + (Number(row.GrandTotal) || 0)),
      HandleAmount: Math.round(acc.HandleAmount + (Number(row.HandleAmount) || 0)),
    }), {
      diamondPcs: 0, diamondCts: 0, diamondValue: 0,
      goldGrossWt: 0, goldNetWt: 0, goldValue: 0,
      ptGrossWt: 0, ptNetWt: 0, ptValue: 0,
      stonePcs: 0, stoneCts: 0, stoneValue: 0,
      wastage: 0, goldMaking: 0, ptMaking: 0,
      CertTaxableAmt: 0, grandTotal: 0, HMTaxableAmt: 0,HandleAmount:0,
    });
  };

  const SubHeader = ({ width, children }) => (
    <Text style={[styles.cell, { width }, styles.tableHeader]}>{children}</Text>
  );

  const DataCell = ({ width, children }) => (
    <Text style={[styles.cell, { width }]}>{children}</Text>
  );

  const TotalCell = ({ width, children }) => (
    <Text style={[styles.totalCell, { width }]}>{children}</Text>
  );

  const totals = calculateTotals();
console.log(totals);
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Text style={styles.header}>Diamond Dealer Receipt-{data[0]?.SupplierName}</Text>
        <Text style={styles.header}>{data[0]?.invoiceNumber ? `Inv No-${data[0].invoiceNumber}` : `Est No -${data[0]?.EstNo}`}</Text>

        <View style={styles.table}>
          {/* Group Headers */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.groupHeader, styles.basicInfo]}>Basic Details</Text>
            <Text style={[styles.groupHeader, styles.metalInfo]}>Metal Details</Text>
            <Text style={[styles.groupHeader, styles.diamondInfo]}>Diamond Details</Text>
            <Text style={[styles.groupHeader, styles.stoneInfo]}>ColorStone Details</Text>
            <Text style={[styles.groupHeader, styles.chargesInfo]}>Charges</Text>
            <Text style={[styles.groupHeader, styles.totalInfo]}>Total</Text>
          </View>

          {/* Column Headers */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <SubHeader width="2.5%">Sno</SubHeader>
            <SubHeader width="6.5%">Des</SubHeader>
            <SubHeader width="5%">Purity</SubHeader>
            <SubHeader width="5%">Gross Wt</SubHeader>
            <SubHeader width="5%">Net Wt</SubHeader>
            <SubHeader width="5%">Value</SubHeader>
            <SubHeader width="6%">Shape</SubHeader>
            <SubHeader width="3%">Pcs</SubHeader>
            <SubHeader width="5%">Cts</SubHeader>
            <SubHeader width="5%">Rate</SubHeader>
            <SubHeader width="5%">Amount</SubHeader>
            <SubHeader width="8.5%">Type</SubHeader>
            <SubHeader width="2.5%">Pcs</SubHeader>
            <SubHeader width="4%">Cts</SubHeader>
            <SubHeader width="5%">Rate</SubHeader>
            <SubHeader width="5%">Amount</SubHeader>
            <SubHeader width="4%">Wst</SubHeader>
            <SubHeader width="6.5%">Making</SubHeader>
            <SubHeader width="5%">Cert&HM</SubHeader>
            <SubHeader width="7%" style={{ whiteSpace: 'pre-line' }}>
  {'Value\nwith GST'}
</SubHeader>
          </View>

          {/* Data Rows */}
          {data.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <DataCell width="2.5%">{index + 1}</DataCell>
              <DataCell width="6.5%">{`${row.ProductName || ''}\n\n${row.DesignNo || ''}\n\n${row.HUID || ''}`}</DataCell>
              <DataCell width="5%">{`G- ${row.GoldPurity || ''}\n\nP-${row.PTPurity || ''}`}</DataCell>
              <DataCell width="5%">{`${formatNumber(row.GoldWt)}\n\n${formatNumber(row.PTWt)}`}</DataCell>
              <DataCell width="5%">{`${formatNumber(row.GNetWt)}\n\n${formatNumber(row.PNetWt)}`}</DataCell>
              <DataCell width="5%">{`${Math.round(row.GoldValue)}\n\n${Math.round(row.PTValue)}`}</DataCell>
              {/* <DataCell width="6.5%">{formatStackedItems(row.Diamonds, 'Shape')}</DataCell> */}
              <DataCell width="6%">{formatStackedItems(row.Diamonds, 'ShapeShortName')}</DataCell>
              <DataCell width="3%">{formatStackedItems(row.Diamonds, 'NoOfStones')}</DataCell>
              <DataCell width="5%">{formatStackedItems(row.Diamonds, 'Carat')}</DataCell>
              <DataCell width="5%">{formatStackedItems(row.Diamonds, 'Rate')}</DataCell>
              <DataCell width="5%">{formatStackedItems(row.Diamonds, 'Value')}</DataCell>
              {/* <DataCell width="8.5%">{formatStackedItems(row.ColorStones, 'Type')}</DataCell> */}
              <DataCell width="8.5%">{formatStackedItems(row.ColorStones, 'ShapeShortName')}</DataCell>
              <DataCell width="2.5%">{formatStackedItems(row.ColorStones, 'Pcs')}</DataCell>
              <DataCell width="4%">{formatStackedItems(row.ColorStones, 'csCarat')}</DataCell>
              <DataCell width="5%">{formatStackedItems(row.ColorStones, 'csRate')}</DataCell>
              <DataCell width="5%">{(formatStackedItems(row.ColorStones, 'Amount'))}</DataCell>
              {/* {console.log(formatStackedItems(row.ColorStones, 'Amount'))} */}

              <DataCell width="4%">{Math.round(row.WastageAmt)}</DataCell>
              <DataCell width="6.5%">{`G-${Math.round(row.GoMcAmount)}\n\nP-${Math.round(row.PTMcAmount)}\n\nHC-${Math.round(row.HandleAmount)}`}</DataCell>
              <DataCell width="5%">{`HM: ${Math.round(row.HMTaxableAmt)}\n\nCert: ${Math.round(row.CertTaxableAmt)}`}</DataCell>
              <DataCell width="7%">{Math.round(row.GrandTotal)}</DataCell>
            </View>
          ))}

          {/* Totals Row */}
          <View style={[styles.tableRow, styles.totalsRow]}>
            <TotalCell width="9%">TOTAL</TotalCell>
            <TotalCell width="5%"></TotalCell>
            <TotalCell width="5%">{`G: ${formatNumber(totals.goldGrossWt)}\n\nPt: ${formatNumber(totals.ptGrossWt)}`}</TotalCell>
            <TotalCell width="5%">{`G: ${formatNumber(totals.goldNetWt)}\n\nPt: ${formatNumber(totals.ptNetWt)}`}</TotalCell>
            <TotalCell width="5%">{`G: ${Math.round(totals.goldValue)}\n\nPt: ${Math.round(totals.ptValue)}`}</TotalCell>
            <TotalCell width="6%"></TotalCell>
            <TotalCell width="3%">{Math.round(totals.diamondPcs)}</TotalCell>
            <TotalCell width="5%">{formatNumber(totals.diamondCts)}</TotalCell>
            <TotalCell width="5%"></TotalCell>
            <TotalCell width="5%">{Math.round(totals.diamondValue)}</TotalCell>
            <TotalCell width="8.5%"></TotalCell>
            <TotalCell width="2.5%">{Math.round(totals.stonePcs)}</TotalCell>
            <TotalCell width="4%">{formatNumber(totals.stoneCts)}</TotalCell>
            <TotalCell width="5%"></TotalCell>
            <TotalCell width="5%">{(totals.stoneValue).toFixed(3)}</TotalCell>
            <TotalCell width="4%">{Math.round(totals.wastage)}</TotalCell>
            <TotalCell width="6.5%">{`G: ${Math.round(totals.goldMaking)}\n\nP: ${Math.round(totals.ptMaking)}\n\nHC: ${Math.round(totals.HandleAmount)}`}</TotalCell>
            <TotalCell width="5%">{`HM: ${Math.round(totals.HMTaxableAmt)}\n\nCert: ${Math.round(totals.CertTaxableAmt)}`}</TotalCell>
            <TotalCell width="7%">{Math.round(totals.grandTotal)}</TotalCell>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const PDFExportButton = ({ data }) => (
  <PDFDownloadLink
    document={<DiamondPDF data={data} />}
    fileName="diamond-dealer-receipt.pdf"
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2"
  >
    {({ loading }) => loading ? 'Preparing PDF...' : 'Export to PDF'}
  </PDFDownloadLink>
);

export default PDFExportButton;