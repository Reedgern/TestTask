function createSheet() {
    let ssNew = SpreadsheetApp.create("Community Posts' Pictures");
    Logger.log(ssNew.getUrl());
    ssNew.getActiveSheet().appendRow(['Id поста', 'Дата', 'Текст поста', 'Подпись к картинке', 'Картинка']);
    return ssNew.getUrl();
}

function addRow(sheet, item) {
  if (item['marked_as_ads'] === 1 || item['post_type'] !== 'post' || item['attachments'] === undefined) {
      return;
    }

  const postId = item['id'];
  const date = item['date'];
  const postText = item['text'] !== '' ? item['text'] : '-';

  for (let attachment of item['attachments']) {
    if (attachment['type'] !== 'photo') {
      continue;
    }

    const img = attachment['photo']['sizes'][0];
    const imgUrl = img['url'];
    const height = img['height'];
    const imgText = attachment['photo']['text'] !== '' ? attachment['photo']['text'] : '-';

    sheet.appendRow([postId, date, postText, imgText]);
    sheet.getRange(sheet.getLastRow(), 2).setValue(new Date(date * 1000)).setNumberFormat('dd.MM.yy hh:mm');

    let r = sheet.getRange(sheet.getLastRow(), 5);
    r.setFormula(`=image("${imgUrl}"; 3)`);

    sheet.setRowHeight(sheet.getLastRow(), height);
  }
}

function updateSheet(query, ssUrl=null) {
  if (ssUrl === null) {
    ssUrl = createSheet();
  }

  let ss = SpreadsheetApp.openByUrl(ssUrl);
  let sheet = ss.getActiveSheet();

  sheet.setColumnWidth(5, 200);

  const response = UrlFetchApp.fetch(query);

  const items = JSON.parse(response.getContentText())['response']['items']; 

  for (let item of items) {
    addRow(sheet, item);
  }
  SpreadsheetApp.flush();
  return ssUrl;
}

function doGet(e) {
  const parameters = e.parameter;

  const communityName = parameters['community_name'];
  const accessToken = parameters['access_token'];
  let ssUrl = parameters['ss_url'] === undefined ? null : parameters['ss_url'];

  const query = `https://api.vk.com/method/wall.get?PARAMS&domain=${communityName}&count=15&access_token=${accessToken}&v=${5.131}`;

  ssUrl = updateSheet(query, ssUrl);

  return HtmlService.createHtmlOutput(`<b>Таблицу можно посмотреть <a href=${ssUrl}>здесь</a></b>.`);
}