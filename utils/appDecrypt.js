const Buffer = require('buffer').Buffer;

exports.decrypt = data => {
  const buf = Buffer.from(data, 'base64').toString();
  const iv = JSON.parse(buf);
  const appKey = trim(process.env.APP_KEY, 'base64');
  //   return newData;
};
