// Google Apps Script に貼り付けるコード
// スプレッドシートのスクリプトエディタ（拡張機能 > Apps Script）に貼り付けてください

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // ヘッダーがなければ追加
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      '日付', '現場名', '記述者名',
      '搬出林車数(車)', '給油（重機・量）',
      '土場→外 搬出', '今日やったこと（午前）', '今日やったこと（午後）',
      '送信日時'
    ]);
  }

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.date,
    data.siteName,
    data.authorName,
    data.volume,
    data.fuel,
    data.transport,
    data.memoAm,
    data.memoPm,
    new Date().toLocaleString('ja-JP'),
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
