const axios = require('axios');
const express = require('express');

const app = express();
const port = 80;

const OPENAI_API_KEY = 'sk-xxx';
const OPENAI_ENDPOINT = 'https://api.openai.com/v1/completions';

app.options('*', (req, res) => {
  // 设置允许的跨域请求头
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Max-Age', '86400'); // 预检请求结果的缓存时间，单位秒

  // 发送空白响应
  res.status(204).end();
});

app.get('/', (req, res) => {
  console.log('\n----- Start ----\n');
  console.log('Enter Propmt Text: ' + req.query.m + '\n');
  res.header('Access-Control-Allow-Origin', '*');
  axios.post(OPENAI_ENDPOINT, {
      prompt: req.query.m,
      max_tokens: 1000,
      model: "gpt-3.5-turbo-instruct"
  }, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
      }
  })
  .then(response => {
      const generatedText = response.data.choices[0].text;
      res.header('Access-Control-Allow-Origin', '*');
      res.writeHead(200, {
	    'Content-Type': 'text/x-markdown;charset=UTF-8',
      	'Access-Control-Allow-Origin': '*'
      });
      console.log('Generated Text: \n' + generatedText + '\n');
      console.log('\n----- End -----\n');
      res.end(generatedText);
  })
  .catch(error => {
      console.error('Error:', error.response.data.error.message);
  });
});

// 启动 Express 服务器
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});