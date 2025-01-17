function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const params = JSON.parse(e.postData.contents);

    // Extract URL from the request
    const url = params.url.trim().toLowerCase(); // Normalize URL

    // Get all URLs in the sheet
    const data = sheet.getDataRange().getValues();
    const existingUrls = data.map(row => row[1]?.trim().toLowerCase()); // Normalize sheet URLs

    // Check if the URL already exists
    if (existingUrls.includes(url)) {
        return ContentService.createTextOutput(
            JSON.stringify({ status: 'duplicate', message: 'URL already saved' })
        )
        .setMimeType(ContentService.MimeType.JSON)
        .setHeader("Access-Control-Allow-Origin", "*");
    }

    // If not, add it to the sheet
    sheet.appendRow([params.datetime, params.url]);

    return ContentService.createTextOutput(
        JSON.stringify({ status: 'success', message: 'URL saved successfully' })
    )
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
}
