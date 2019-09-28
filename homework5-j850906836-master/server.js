const express = require('express');
const bodyParser = require('body-parser');
const googleSheets = require('gsa-sheets');

const key = require('./privateSettings.json');

// TODO(you): Change the value of this string to the spreadsheet id for your
// GSA spreadsheet. See HW5 spec for more information.
const SPREADSHEET_ID = '1_h7WJH7QDXwqM64aOof4R1qbWcbzoxoZBLBgcVRXlNk';

const app = express();
const jsonParser = bodyParser.json();
const sheet = googleSheets(key.client_email, key.private_key, SPREADSHEET_ID);

app.use(express.static('public'));

async function onGet(req, res) {
  const result = await sheet.getRows();
  const rows = result.rows;
  const sheets = [];
  for(let i=1; i<rows.length; i++) {
    const sheet = {};
    for(let j=0; j<rows[0].length; j++) {
      sheet[rows[0][j]] = rows[i][j];
    }
    sheets.push(sheet);
  }
  res.json(sheets);
}
app.get('/api', onGet);

async function onPost(req, res) {
  const result = await sheet.getRows();
  const rows = result.rows;
  const messageBody = req.body;
  const newrow = [];
  var havechange = [];
  const objectKey = Object.keys(messageBody);
  let match = 0;
  var tmp;
  var x;
  let i=0,k=0,flag,n;
  for(x in messageBody) {
    newrow[i] = messageBody[x];
    i++;
  }
  for(let i=0; i<rows[0].length; i++) {
    for(let j=0; j<objectKey.length; j++) {
      if(objectKey[j].toLowerCase() == rows[0][i].toLowerCase()) {
        if( (i != j) ) {
          flag = 0;
          for(n=0; n<k; n++) {
            if(havechange[n]==i) flag++;
            if(havechange[n]==j) flag++;
          }
          if( flag < 2 ){
            tmp = newrow[j];
            newrow[j] = newrow[i];
            newrow[i] = tmp;
            havechange[k++] = i;
            havechange[k++] = j;
          }
        }
        match++;
        break;
      }
    }
  }
  if(match == rows[0].length && objectKey.length == rows[0].length) {
    sheet.appendRow(newrow);
    res.json( { response: 'success'} );
  }
  else res.json( { response: 'error'} );
}
app.post('/api', jsonParser, onPost);

async function onPatch(req, res) {
  const result = await sheet.getRows();
  const rows = result.rows;
  const column  = req.params.column;
  const value  = req.params.value;
  const messageBody = req.body;
  const objectKey = Object.keys(messageBody);
  var newrow = [];
  var item_change;
  let change_col = -1;
  let find_col = -1;
  let find_row = -1;
  var x;
  let i=0;

  for(x in messageBody) {
    newrow[0] = messageBody[x];
    i++;
  }
  item_change = newrow[0];
  for(i=0; i<rows[0].length; i++) {
    if(rows[0][i].toLowerCase() == column.toLowerCase()) {
      find_col = i;
      break;
    }
  }
  for(i=0; i<rows.length; i++) {
    if(rows[i][find_col] == value) {
      find_row = i;
      break;
    }
  }
  if(find_row!= -1 && find_col!=-1){
    for(i=0; i<rows[0].length; i++) {
      newrow[i] = rows[find_row][i];
    }
    for(i=0; i<rows[0].length; i++) {
      if(rows[0][i].toLowerCase() == objectKey[0].toLowerCase()) {
        change_col = i;
        break;
      }
    }
    newrow[change_col] = item_change;
    sheet.setRow(find_row,newrow);
    res.json( { status: 'success'} );
  }
  else res.json( { status: 'API Path error'} );
}
app.patch('/api/:column/:value', jsonParser, onPatch);

async function onDelete(req, res) {
  const result = await sheet.getRows();
  const rows = result.rows;
  const column  = req.params.column;
  const value  = req.params.value;
  let del_column = -1;
  let del_row = -1;
  for(let i=0; i<rows[0].length; i++) {
    if(rows[0][i].toLowerCase() == column.toLowerCase()) {
      del_column = i;
      break;
    }
  }
  for(let i=0; i<rows.length; i++) {
    if(rows[i][del_column] == value) {
      del_row = i;
      break;
    }
  }
  sheet.deleteRow(del_row);
  if(del_column==-1||(del_column!=-1&&del_row==-1)) res.json( { response: 'error'} );
  else if(del_column!=-1 && del_row!=-1) res.json( { response: 'success'} );
}
app.delete('/api/:column/:value',  onDelete);


// Please don't change this; this is needed to deploy on Heroku.
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`4102165 Server listening on port ${port}!`);
});
