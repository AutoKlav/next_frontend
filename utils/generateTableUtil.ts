import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateTablePDF = () => {
    const doc = new jsPDF();

    // Sample data
    const data = Array.from({ length: 10 }, (_, i) => ({
        tempK: 300 + i * 10,
        dTemp: 5 + i,
        D5: 10 + i,
        F5: 15 + i,
        R5: 20 + i,
    }));

    // Define columns and rows
    const columns = ["Temperatura konzerve", "Delta T", "D5", "F5", "r5"];
    const rows = data.map(row => [row.tempK, row.dTemp, row.D5, row.F5, row.R5]);

    // Add a title row spanning all columns
    autoTable(doc, {
        theme: "grid",
        head: [["Ime: Testni podaci | Kolicina: sint aliqua do laborum | Pocetak: 17:28:53, 28/11/2024 | Trajanje: 15656h:33m | Kraj: 03:02:47, 12/0912026"]], // Single title spanning all columns
        styles: { halign: "center", fontSize: 14, fontStyle: "bold", textColor: [0, 0, 0] },
        headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'normal', fontSize: 11 }, // White background, black text, center align title        
    });

    // Add a title row spanning all columns
    autoTable(doc, {
        theme: "grid",
        head: [["Bakterija: clostridium botulinum | Opis: G pozitivna, anaerobna bakterija | Broj sarze: LT0324325345 | do: 0.2 | z0: 10"]],
        styles: { halign: "center", fontSize: 14, fontStyle: "bold", textColor: [0, 0, 0] },
        headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'normal', fontSize: 9 }, // White background, black text, center align title
        bodyStyles: { }, // Center align body, normal text font
    });

    // Add table data below the title
    autoTable(doc, {
        theme: "grid",
        head: [columns],
        body: rows,
        styles: { textColor: [0, 0, 0], fontSize: 7 }, // Black text, reduced font size table data
        headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], halign: 'center', fontSize: 8 }, // White background, black text, center align headers, reduced font size
        columnStyles: {
            0: { halign: 'center' }, // Center align Temperature
            1: { halign: 'center' }, // Center align Delta T
            2: { halign: 'center' }, // Center align D5
            3: { halign: 'center' }, // Center align F5
            4: { halign: 'center' }, // Center align R5
        },
    });

    // Save the PDF
    doc.save("table.pdf");
};