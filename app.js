var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function (req, res) {

  url = 'http://www.hsk.academy/en/hsk_6';

  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);

      var chinese, english, hanzi, pinyin;
      var json = { english: "", hanzi: "", pinyin: "" };
      var words = [];

      $table = $('#flat_list');
      $rows = $table.find('tr');

      $rows.each(function (row) {
        var chinese = $($($rows[row]).find('td')[0]).text().split('\n');
        var hanzi = chinese[1].replace(/ /g, '');
        var pinyin = chinese[2].replace(/ /g, '');
        var english = $($($rows[row]).find('td')[1]).text();
        words.push({
          'hanzi': hanzi,
          'pinyin': pinyin,
          'english': english
        });
      });
    }

    // fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
    fs.writeFile('hsk_6.json', JSON.stringify(words, null, 4), function (err) {

      console.log('File successfully written! - Check your project directory for the output.json file');

    })

    res.send('Check your console!')

  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
