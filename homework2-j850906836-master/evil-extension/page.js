const MATCH_LIST = {
  'there': 'their',
  'their': 'there',
  'they\'re': 'there',
  'There': 'Their',
  'Their': 'There',
  'They\'re': 'There',
  'THERE': 'THEIR',
  'THEIR': 'THERE',
  'THEY\'RE': 'THERE'
};

function transformTextNodes(node) {
  if(node.nodeType == Node.TEXT_NODE) {           //只找 TEXT 的屬性
    const string = node.textContent.split(" ");   //將Content以空格區別，並存入string陣列中
    for(let i=0; i<string.length; i++) {
      if(MATCH_LIST.hasOwnProperty(string[i].trim())) {     //如果MATCH_LIST有跟keyword一樣的字元，string[i]以替換後的字元替代
        string[i] = string[i].replace(string[i].trim(),MATCH_LIST[string[i].trim()]);
      }
    }
    node.textContent = string.join(" ");          //存回node.textContent，keyword間塞入空格
    //console.log(node.textContent);
  }
  for(const child of node.childNodes) {
    transformTextNodes(child);
  }
};

transformTextNodes(document.body);

// Log statement to test that the extension loaded properly.
console.log('Extension updated');
console.log('Evil extension loaded!');
