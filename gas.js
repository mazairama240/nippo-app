// Google Apps Script に貼り付けるコード
// スプレッドシートのスクリプトエディタ（拡張機能 > Apps Script）に貼り付けてください

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // ヘッダーがなければ追加
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['日付', '搬出材積(m³)', '給油量(L)', '土場→外 搬出', '今日やったこと', '送信日時']);
  }

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.date,
    data.volume,
    data.fuel,
    data.transport,
    data.memo,
    new Date().toLocaleString('ja-JP'),
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
