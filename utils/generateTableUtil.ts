import { ProcessLogList } from '@/types/grpc';
import jsPDF from 'jspdf';
import { formatTime } from './dateUtil';
import { ChartInfo } from './chartOptionsUtil';

export const generateTablePDF = (chartInfo: ChartInfo, data: ProcessLogList) => {
    const doc = new jsPDF();

    // Constants for layout
    const margin = 10;
    const lineHeight = 5;
    const cellPadding = 0;
    const headerFontSize = 8;
    const bodyFontSize = 8;
    const pageWidth = doc.internal.pageSize.getWidth();

    // Set proper font encoding
    doc.setFont('times'); // Standard font that supports special characters

    // Title with proper encoding
    doc.setFontSize(headerFontSize);
    doc.setFont('times', 'normal');
    doc.text(chartInfo?.title || '', margin, margin, { align: 'left' });

    // Subtitle
    doc.setFontSize(headerFontSize);
    doc.setFont('times', 'normal');
    doc.text(chartInfo?.subtitle || '', margin, margin + lineHeight, { align: 'left' });


    // Subtitle
    doc.setFontSize(headerFontSize);
    doc.setFont('times', 'normal');
    doc.text('Sum F', margin, margin + lineHeight + lineHeight, { align: 'left' });


    // Subtitle
    doc.setFontSize(headerFontSize);
    doc.setFont('times', 'normal');
    doc.text('Sum r', margin, margin + lineHeight + lineHeight + lineHeight, { align: 'left' });

    // Safe value formatter
    const formatValue = (value: number | undefined) => {
        if (value === undefined || value === null) return '-';
        return Number(value).toFixed(2);
    };

    // Prepare data with special characters and subscript 5
    const columns = [
        "Vrijeme",
        "Temp. sonde",
        "ΔT",  // Using Δ instead of Delta
        "D₅",  // D with subscript 5
        "F₅",  // F with subscript 5
        "r₅",  // r with subscript 5
        "Hlađenje"  // Fixed đ character
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
            row.state === 6 ? "*Hlađenje*" : row.state === 7 ? "*Hlađenje završeno*" : "-",
        ]) || [];

    // Calculate column widths
    const colCount = columns.length;
    const colWidth = (pageWidth - 2 * margin) / colCount;

    // Table header with special characters
    doc.setFontSize(headerFontSize);
    doc.setFont('helvetica', 'bold');
    let yPos = margin + 5 * lineHeight;

    columns.forEach((col, i) => {
        doc.text(
            col,
            margin + i * colWidth + colWidth / 2,
            yPos,
            { align: 'center' }
        );
    });

    // Draw header underline
    yPos += lineHeight / 2;
    doc.setDrawColor(0);
    doc.setLineWidth(0.2);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += lineHeight;

    // Table rows
    doc.setFontSize(bodyFontSize);
    doc.setFont('helvetica', 'normal');

    rows.forEach((row, rowIndex) => {
        // Check if we need a new page
        if (yPos > doc.internal.pageSize.getHeight() - 20) {
            doc.addPage();
            yPos = margin;
            // Redraw header on new page
            doc.setFontSize(headerFontSize);
            doc.setFont('helvetica', 'bold');
            columns.forEach((col, i) => {
                doc.text(
                    col,
                    margin + i * colWidth + colWidth / 2,
                    yPos,
                    { align: 'center' }
                );
            });
            yPos += lineHeight * 1.5;
            doc.setFontSize(bodyFontSize);
            doc.setFont('helvetica', 'normal');
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