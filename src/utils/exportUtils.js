// Reusable Export Utilities for Excel (.xls / .xlsx) and Print-Ready Corporate PDF Reports

const escapeHtml = (val) => {
  if (val === null || val === undefined) return '';
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Exports any tabular dataset as a styled Excel (.xls) workbook that opens cleanly in Microsoft Excel & LibreOffice.
 */
export const exportTableToExcel = (filename, sheetName, columns, rows) => {
  const headerCells = columns
    .map(
      (col) =>
        `<th style="background:#0F172A;color:#FFFFFF;font-weight:700;padding:8px 12px;border:1px solid #CBD5E1;text-align:left;">${escapeHtml(
          col.label
        )}</th>`
    )
    .join('');

  const bodyRows = rows
    .map((row, idx) => {
      const bg = idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
      const cells = columns
        .map((col) => {
          const val = typeof col.accessor === 'function' ? col.accessor(row) : row[col.key];
          return `<td style="padding:7px 12px;border:1px solid #E2E8F0;background:${bg};vertical-align:top;">${escapeHtml(
            val
          )}</td>`;
        })
        .join('');
      return `<tr>${cells}</tr>`;
    })
    .join('');

  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="UTF-8" />
        <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${escapeHtml(
          sheetName || 'Report'
        )}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      </head>
      <body>
        <table border="1" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-family:Segoe UI,Arial,sans-serif;font-size:12px;">
          <thead><tr>${headerCells}</tr></thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.xls') || filename.endsWith('.xlsx') ? filename : `${filename}.xls`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Downloads a binary file (e.g. .xlsx) from an authenticated backend export endpoint.
 */
export const downloadAuthorizedFile = async (url, token, fallbackFilename) => {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    throw new Error('Export failed. Please try again.');
  }
  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = objectUrl;
  a.download = fallbackFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(objectUrl);
};

/**
 * Opens a clean, vector-sharp corporate PDF report view and triggers Print / Save as PDF.
 */
export const exportTableToPdf = ({ title, subtitle = '', columns, rows, summary = [] }) => {
  const printWindow = window.open('', '_blank', 'width=1080,height=760');
  if (!printWindow) {
    alert('Please allow pop-ups in your browser to generate the PDF report.');
    return;
  }

  const summaryHtml =
    summary.length > 0
      ? `<div class="summary-grid">${summary
          .map(
            (s) =>
              `<div class="summary-card"><div class="summary-label">${escapeHtml(
                s.label
              )}</div><div class="summary-val">${escapeHtml(s.value)}</div></div>`
          )
          .join('')}</div>`
      : '';

  const headerHtml = columns.map((c) => `<th>${escapeHtml(c.label)}</th>`).join('');
  const rowsHtml =
    rows.length === 0
      ? `<tr><td colspan="${columns.length}" style="text-align:center;padding:24px;color:#64748B;">No records found.</td></tr>`
      : rows
          .map((row) => {
            const tds = columns
              .map((col) => {
                const val = typeof col.accessor === 'function' ? col.accessor(row) : row[col.key];
                return `<td>${escapeHtml(val)}</td>`;
              })
              .join('');
            return `<tr>${tds}</tr>`;
          })
          .join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(title)} - Ashirwad Plastics</title>
        <style>
          * { box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; color: #0F172A; margin: 0; padding: 28px 32px; background: #FFFFFF; }
          .report-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0F172A; padding-bottom: 14px; margin-bottom: 18px; }
          .brand { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #2563EB; margin-bottom: 4px; }
          h1 { margin: 0; font-size: 20px; font-weight: 700; color: #0F172A; }
          .subtitle { margin: 4px 0 0 0; font-size: 12.5px; color: #64748B; }
          .meta { text-align: right; font-size: 11.5px; color: #64748B; }
          .summary-grid { display: flex; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; }
          .summary-card { flex: 1; min-width: 130px; border: 1px solid #E2E8F0; border-radius: 6px; padding: 10px 14px; background: #F8FAFC; }
          .summary-label { font-size: 11px; color: #64748B; font-weight: 600; text-transform: uppercase; }
          .summary-val { font-size: 18px; font-weight: 700; color: #0F172A; margin-top: 2px; }
          table { width: 100%; border-collapse: collapse; font-size: 11.5px; }
          th { background: #F1F5F9; color: #334155; font-weight: 700; text-align: left; padding: 8px 10px; border-bottom: 1.5px solid #CBD5E1; }
          td { padding: 8px 10px; border-bottom: 1px solid #E2E8F0; vertical-align: top; word-break: break-word; }
          tr:nth-child(even) td { background: #FAFAFA; }
          .footer { margin-top: 20px; font-size: 10.5px; color: #94A3B8; text-align: right; border-top: 1px solid #E2E8F0; padding-top: 10px; }
          @media print {
            body { padding: 12px; }
            @page { margin: 12mm; size: landscape; }
          }
        </style>
      </head>
      <body>
        <div class="report-header">
          <div>
            <div class="brand">Ashirwad Plastics • Admin Report</div>
            <h1>${escapeHtml(title)}</h1>
            ${subtitle ? `<p class="subtitle">${escapeHtml(subtitle)}</p>` : ''}
          </div>
          <div class="meta">
            <div>Generated: ${new Date().toLocaleString()}</div>
            <div>Total Records: ${rows.length}</div>
          </div>
        </div>
        ${summaryHtml}
        <table>
          <thead><tr>${headerHtml}</tr></thead>
          <tbody>${rowsHtml}</tbody>
        </table>
        <div class="footer">Ashirwad Plastics Management Console • Confidential Internal Report</div>
        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 250);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};

/**
 * Opens a print-ready exact email preview window and triggers browser Print / Save as PDF.
 */
export const exportEmailPreviewToPdf = ({ subject = '', html = '', attachments = [] }) => {
  const printWindow = window.open('', '_blank', 'width=820,height=900');
  if (!printWindow) {
    alert('Please allow pop-ups in your browser to export the email preview as PDF.');
    return;
  }

  const origin = window.location.origin;
  const renderedBody = String(html || '')
    .replace(/{{name}}/gi, 'Valued Partner')
    .replace(/{{company}}/gi, 'your organization')
    .replace(/{{email}}/gi, 'partner@company.com');

  const attachmentsHtml = attachments.length > 0
    ? `<div style="margin-top: 20px; padding-top: 12px; border-top: 1px dashed #e2e8f0; font-size: 12px; color: #64748b;">
        <strong>Attachments (${attachments.length}):</strong>
        <ul style="margin: 6px 0 0; padding-left: 18px;">
          ${attachments.map((a) => `<li>${escapeHtml(a.filename)}</li>`).join('')}
        </ul>
      </div>`
    : '';

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(subject || 'Email Campaign Preview')}</title>
        <style>
          @page { size: A4; margin: 14mm; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f8fafc;
            margin: 0;
            padding: 24px;
            color: #1e293b;
            line-height: 1.6;
          }
          .subject-bar {
            max-width: 620px;
            margin: 0 auto 12px;
            padding: 10px 16px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            font-size: 13px;
            color: #475569;
          }
          .subject-bar strong { color: #0f172a; }
          .container {
            max-width: 620px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
          }
          .header {
            background-color: #ffffff;
            padding: 20px 32px;
            text-align: left;
            border-bottom: 3px solid #2563EB;
          }
          .content {
            padding: 32px;
            font-size: 15px;
            line-height: 1.6;
            color: #1e293b;
          }
          .content ul { list-style-type: disc; padding-left: 28px; margin: 8px 0; list-style-position: outside; }
          .content ol { list-style-type: decimal; padding-left: 28px; margin: 8px 0; list-style-position: outside; }
          .content li { margin: 4px 0; }
          .content p { margin: 0 0 10px; }
          .content img { max-width: 100%; height: auto; }
          .footer {
            background: #f1f5f9;
            padding: 18px 32px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
          }
          .footer a { color: #2563eb; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="subject-bar">
          <strong>Subject:</strong> ${escapeHtml(subject || '(No Subject)')}
        </div>
        <div class="container">
          <div class="header">
            <img src="${origin}/logo-horizontal.png" alt="Ashirwad Plastics" style="height: 36px; width: auto; display: block; border: 0;" />
          </div>
          <div class="content">
            ${renderedBody}
            ${attachmentsHtml}
          </div>
          <div class="footer">
            <p style="margin: 0 0 6px 0;">&copy; ${new Date().getFullYear()} Ashirwad Plastics. All rights reserved.</p>
            <p style="margin: 0; font-size: 11px; color: #94a3b8;">Don't want to receive these emails? <a href="#unsubscribe">Unsubscribe</a></p>
          </div>
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 350);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};

