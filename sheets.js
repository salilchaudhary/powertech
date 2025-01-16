document.addEventListener('DOMContentLoaded', function() {
console.log('Sheets script loaded');

async function displayReferrals() {
// Replace this with your actual Google Sheet ID
const sheetId = '1tghfaNRNcr6-eovXRSyqHRjAqwAH2t0P5LaNkQnT4i0';
const sheetName = 'Referrals Tracking';

try {
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
console.log('Fetching data from:', url);

const response = await fetch(url);
const text = await response.text();

// Parse the Google Sheets JSON response
const jsonData = JSON.parse(text.substring(47).slice(0, -2));
console.log('Data received:', jsonData);

const container = document.getElementById('referralsTableContainer');
if (container) {
// Create table structure
let html = `
<div style="width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch;">
<table style="width: 100%; min-width: 600px; border-collapse: collapse; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
<thead>
<tr>
<th style="padding: 15px; text-align: left; background: #f8f9fa; border-bottom: 2px solid #dee2e6; font-weight: 600; color: #2C3E50;">Timestamp</th>
<th style="padding: 15px; text-align: left; background: #f8f9fa; border-bottom: 2px solid #dee2e6; font-weight: 600; color: #2C3E50;">Referral Name</th>
<th style="padding: 15px; text-align: left; background: #f8f9fa; border-bottom: 2px solid #dee2e6; font-weight: 600; color: #2C3E50;">Phone</th>
<th style="padding: 15px; text-align: left; background: #f8f9fa; border-bottom: 2px solid #dee2e6; font-weight: 600; color: #2C3E50;">Status</th>
</tr>
</thead>
<tbody>
`;

// Add data rows
if (jsonData.table.rows && jsonData.table.rows.length > 0) {
jsonData.table.rows.forEach(row => {
html += '<tr style="border-bottom: 1px solid #dee2e6;">';
if (row.c) {
row.c.forEach(cell => {
html += `<td style="padding: 15px;">${cell && cell.v ? cell.v : ''}</td>`;
});
}
html += '</tr>';
});
} else {
html += `
<tr>
<td colspan="4" style="padding: 20px; text-align: center; color: #666;">
No referrals found.
</td>
</tr>
`;
}

html += `
</tbody>
</table>
</div>
`;

container.innerHTML = html;
}
} catch (error) {
console.error('Error fetching data:', error);
const container = document.getElementById('referralsTableContainer');
if (container) {
container.innerHTML = `
<div style="padding: 20px; text-align: center; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px;">
Error loading referrals data. Please try again later.
</div>
`;
}
}
}

// Call the function
displayReferrals();
});