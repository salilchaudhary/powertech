



document.addEventListener('DOMContentLoaded', function() {
console.log('Sheets script loaded');

async function displayReferrals() {
console.log('Starting to fetch referrals');

// Replace with your actual Google Sheet ID
const sheetId = '1tghfaNRNcr6-eovXRSyqHRjAqwAH2t0P5LaNkQnT4i0';
const sheetName = 'Referrals Tracking';

try {
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
console.log('Fetching from URL:', url);

const response = await fetch(url);
console.log('Response received');

const text = await response.text();
console.log('Raw response:', text);

// Parse the JSON data
const jsonData = JSON.parse(text.substring(47).slice(0, -2));
console.log('Parsed data:', jsonData);

const container = document.getElementById('referralsTableContainer');
console.log('Container found:', container);

if (!container) {
console.error('Container element not found');
return;
}

// Create table HTML
let tableHTML = `
<div style="width: 100%; overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr>
<th style="padding: 12px; background: #f8f9fa; border-bottom: 2px solid #dee2e6;">Date</th>
<th style="padding: 12px; background: #f8f9fa; border-bottom: 2px solid #dee2e6;">Referral Name</th>
<th style="padding: 12px; background: #f8f9fa; border-bottom: 2px solid #dee2e6;">Status</th>
</tr>
</thead>
<tbody>
`;

// Add rows
jsonData.table.rows.forEach(row => {
tableHTML += '<tr style="border-bottom: 1px solid #dee2e6;">';
row.c.forEach(cell => {
tableHTML += `<td style="padding: 12px;">${cell ? cell.v : ''}</td>`;
});
tableHTML += '</tr>';
});

tableHTML += `
</tbody>
</table>
</div>
`;

container.innerHTML = tableHTML;
console.log('Table rendered');

} catch (error) {
console.error('Error:', error);
const container = document.getElementById('referralsTableContainer');
if (container) {
container.innerHTML = `
<div style="color: red; padding: 20px; text-align: center;">
Error loading referrals data. Please try again later.
</div>
`;
}
}
}

// Call the function
displayReferrals();
});