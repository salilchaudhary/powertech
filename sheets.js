document.addEventListener('DOMContentLoaded', function() {
console.log('Sheets script loaded');

async function displayReferrals() {
const sheetId = '1tghfaNRNcr6-eovXRSyqHRjAqwAH2t0P5LaNkQnT4i0'; // Your sheet ID here
const sheetName = 'Referrals Tracking';

try {
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
const response = await fetch(url);
const text = await response.text();
const jsonData = JSON.parse(text.substring(47).slice(0, -2));

const container = document.getElementById('referralsTableContainer');
if (container) {
// Create responsive wrapper
container.innerHTML = `
<div style="width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch;">
<table id="referralsTable" style="width: 100%; min-width: 600px; border-collapse: collapse; margin-bottom: 20px;">
<thead>
<tr>
<th style="padding: 12px 15px; background: #f8f9fa; border-bottom: 2px solid #dee2e6; text-align: left; white-space: nowrap;">Date</th>
<th style="padding: 12px 15px; background: #f8f9fa; border-bottom: 2px solid #dee2e6; text-align: left; white-space: nowrap;">Referral Name</th>
<th style="padding: 12px 15px; background: #f8f9fa; border-bottom: 2px solid #dee2e6; text-align: left; white-space: nowrap;">WhatsApp</th>
<th style="padding: 12px 15px; background: #f8f9fa; border-bottom: 2px solid #dee2e6; text-align: left; white-space: nowrap;">Status</th>
</tr>
</thead>
<tbody id="referralsTableBody">
</tbody>
</table>
</div>
`;

const tableBody = document.getElementById('referralsTableBody');

// Add data rows
jsonData.table.rows.forEach(row => {
const tr = document.createElement('tr');
tr.style.borderBottom = '1px solid #dee2e6';
tr.style.backgroundColor = '#ffffff';

// Hover effect
tr.addEventListener('mouseover', () => tr.style.backgroundColor = '#f8f9fa');
tr.addEventListener('mouseout', () => tr.style.backgroundColor = '#ffffff');

row.c.forEach(cell => {
const td = document.createElement('td');
td.style.padding = '12px 15px';
td.style.verticalAlign = 'middle';
td.textContent = cell ? cell.v : '';
tr.appendChild(td);
});

tableBody.appendChild(tr);
});
}
} catch (error) {
console.error('Error fetching referrals:', error);
const container = document.getElementById('referralsTableContainer');
if (container) {
container.innerHTML = `
<div style="text-align: center; padding: 20px; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px;">
Error loading referrals data. Please try again later.
</div>
`;
}
}
}

displayReferrals();
});