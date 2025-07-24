import { ProcessLogList } from '@/types/grpc';
import jsPDF from 'jspdf';
import { formatTime } from './dateUtil';
import { ChartInfo } from './chartOptionsUtil';
import '../public/fonts/DejaVuSans-normal';

export const generateTablePDF = (chartInfo: ChartInfo, data: ProcessLogList) => {
    const doc = new jsPDF();

    // Constants for layout
    const margin = 10;
    const lineHeight = 5;
    const cellPadding = 0;
    const bodyFontSize = 7;
    const pageWidth = doc.internal.pageSize.getWidth();
    const fontName = 'DejaVuSans';

    // Set initial font
    doc.setFont(fontName, 'normal');

    // Calculate sums
    const sumF = data?.processlogsList.reduce((acc, row) => acc + (row.fr || 0), 0) || 0;
    const sumR = data?.processlogsList.reduce((acc, row) => acc + (row.r || 0), 0) || 0;

    // Title with proper encoding
    doc.setFontSize(bodyFontSize);
    doc.text(chartInfo?.title || '', margin, margin, { align: 'left' });

    // Subtitle
    doc.setFontSize(bodyFontSize);
    doc.text(chartInfo?.subtitle || '', margin, margin + lineHeight, { align: 'left' });

    // Display sums
    doc.setFontSize(bodyFontSize);
    doc.text(`Krivulja uginuća je k=5`, margin, margin + 2 * lineHeight, { align: 'left' });
    doc.text(`Sum F: ${sumF.toFixed(2)}`, margin, margin + 3 * lineHeight, { align: 'left' });
    doc.text(`Sum r: ${sumR.toFixed(2)}`, margin, margin + 4 * lineHeight, { align: 'left' });

    // Safe value formatter
    const formatValue = (value: number | undefined) => {
        if (value === undefined || value === null) return '-';
        return Number(value).toFixed(2);
    };

    // Prepare data with special characters and subscript 5
    const columns = [
        "Vrijeme",
        "Temp. sonde",
        "\u0394T",  // Δ
        "D\u2085",  // ₅
        "F\u2085",
        "r\u2085",
        "Stanje",
    ];

    const rows = data?.processlogsList
        .filter(row => row.sensorvalues?.tempk >= 90)
        .map((row, index) => [
            index === 0 ? formatTime(row.timestamp) : `+${index}`,
            formatValue(row.sensorvalues?.tempk),
            formatValue(row.dTemp),
            formatValue(row.dr),
            formatValue(row.fr),
            formatValue(row.r),
            row.state === 6 ? "Hlađenje" : "-",
        ]) || [];

    // Calculate column widths
    const colCount = columns.length;
    const colWidth = (pageWidth - 2 * margin) / colCount;

    // Function to draw table header
    const drawTableHeader = (y: number) => {
        doc.setFontSize(bodyFontSize);
        doc.setFont(fontName, 'normal');

        columns.forEach((col, i) => {
            doc.text(
                col,
                margin + i * colWidth + colWidth / 2,
                y,
                { align: 'center' }
            );
        });

        // Draw header underline
        const underlineY = y + lineHeight / 2;
        doc.setDrawColor(0);
        doc.setLineWidth(0.2);
        doc.line(margin, underlineY, pageWidth - margin, underlineY);

        return underlineY + lineHeight;
    };

    // Initial table header
    let yPos = drawTableHeader(margin + 6 * lineHeight);

    // Table rows
    doc.setFontSize(bodyFontSize);
    doc.setFont(fontName, 'normal');

    rows.forEach((row, rowIndex) => {
        // Check if we need a new page
        if (yPos > doc.internal.pageSize.getHeight() - 20) {
            doc.addPage();
            // Reset font settings for new page
            doc.setFont(fontName, 'normal');
            yPos = drawTableHeader(margin); // Draw header at top of new page
            doc.setFontSize(bodyFontSize);
        }

        // Draw centered row cells
        row.forEach((cell, colIndex) => {
            doc.text(
                cell.toString(),
                margin + colIndex * colWidth + colWidth / 2,
                yPos + lineHeight / 2,
                { align: 'center' }
            );
        });

        yPos += lineHeight + cellPadding * 2;
    });

    // Save the PDF
    doc.save("process_report.pdf");
};