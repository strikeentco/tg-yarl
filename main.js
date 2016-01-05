'use strict';

var fs = require('fs');
var yarl = require('yarl');
var url = 'https://api.telegram.org';

function fileLoad(path) {
  if (typeof path === 'string') {
    try {
      fs.statSync(path);
      return fs.createReadStream(path);
    } catch (e) {
      return path;
    }
  } else if (typeof path === 'object' && path.value && path.filename) {
    return {value: path.value, options: {filename: path.filename}};
  }

  return path;
}

function Api(token) {
  if (!(this instanceof Api)) {
    return new Api(token);
  }

  if (!token) {
    throw new Error('Telegram Bot token not provided!');
  }

  this.token = token;
  this.url = url + '/bot' + this.token + '/';
  this.fileUrl = url + '/file/bot' + this.token + '/';
}

Api.prototype.setKeyboard = function(keyboard, resize, once, selective) {
  if (!Array.isArray(keyboard)) {
    this.keyboard = {
      hide_keyboard: true,
      selective: selective || resize || false
    };
  } else {
    this.keyboard = {
      keyboard: keyboard,
      resize_keyboard: resize || false,
      one_time_keyboard: once || false,
      selective: selective || false
    };
  }

  this.keyboard && (this.keyboard = JSON.stringify(this.keyboard));
  return this;
};

Api.prototype.getUpdates = function(offset, limit, timeout) {
  return yarl.get(this.url + 'getUpdates', {query: {
    offset: offset,
    limit: limit,
    timeout: timeout
  }, json: true});
};

Api.prototype.setWebhook = function(url, cert) {
  var options = {body: {url: url}, json: true};
  if (cert) {
    options.body.certificate = fileLoad(cert);
    options.multipart = true;
  }

  return yarl.post(this.url + 'setWebhook', options);
};

Api.prototype.getMe = function() {
  return yarl.get(this.url + 'getMe', {json: true});
};

Api.prototype.sendMessage = function(chatId, text, options) {
  options || (options = {});
  options.chat_id = chatId;
  options.text = text;

  if (this.keyboard) {
    options.reply_markup = this.keyboard;
    delete this.keyboard;
  }

  return yarl.post(this.url + 'sendMessage', {body: options, json: true});
};

Api.prototype.forwardMessage = function(chatId, fromChatId, messageId) {
  return yarl.post(this.url + 'forwardMessage', {body: {
    chat_id: chatId,
    from_chat_id: fromChatId,
    message_id: messageId
  }, json: true});
};

Api.prototype.sendPhoto = function(chatId, data, options) {
  options || (options = {});
  options.chat_id = chatId;
  options.photo = fileLoad(data);

  if (this.keyboard) {
    options.reply_markup = this.keyboard;
    delete this.keyboard;
  }

  return yarl.post(this.url + 'sendPhoto', {body: options, json: true, multipart: true});
};

Api.prototype.sendAudio = function(chatId, data, options) {
  options || (options = {});
  options.chat_id = chatId;
  options.audio = fileLoad(data);

  if (this.keyboard) {
    options.reply_markup = this.keyboard;
    delete this.keyboard;
  }

  return yarl.post(this.url + 'sendAudio', {body: options, json: true, multipart: true});
};

Api.prototype.sendDocument = function(chatId, data, options) {
  options || (options = {});
  options.chat_id = chatId;
  options.document = fileLoad(data);

  if (this.keyboard) {
    options.reply_markup = this.keyboard;
    delete this.keyboard;
  }

  return yarl.post(this.url + 'sendDocument', {body: options, json: true, multipart: true});
};

Api.prototype.sendSticker = function(chatId, data, options) {
  options || (options = {});
  options.chat_id = chatId;
  options.sticker = fileLoad(data);

  if (this.keyboard) {
    options.reply_markup = this.keyboard;
    delete this.keyboard;
  }

  return yarl.post(this.url + 'sendSticker', {body: options, json: true, multipart: true});
};

Api.prototype.sendVideo = function(chatId, data, options) {
  options || (options = {});
  options.chat_id = chatId;
  options.video = fileLoad(data);

  if (this.keyboard) {
    options.reply_markup = this.keyboard;
    delete this.keyboard;
  }

  return yarl.post(this.url + 'sendVideo', {body: options, json: true, multipart: true});
};

Api.prototype.sendVoice = function(chatId, data, options) {
  options || (options = {});
  options.chat_id = chatId;
  options.voice = fileLoad(data);

  if (this.keyboard) {
    options.reply_markup = this.keyboard;
    delete this.keyboard;
  }

  return yarl.post(this.url + 'sendVoice', {body: options, json: true, multipart: true});
};

Api.prototype.sendLocation = function(chatId, lat, lon, options) {
  options || (options = {});
  options.chat_id = chatId;
  options.latitude = lat;
  options.longitude = lon;

  if (this.keyboard) {
    options.reply_markup = this.keyboard;
    delete this.keyboard;
  }

  return yarl.post(this.url + 'sendLocation', {body: options, json: true});
};

Api.prototype.sendChatAction = function(chatId, action) {
  return yarl.post(this.url + 'sendChatAction', {body: {
    chat_id: chatId,
    action: action
  }, json: true});
};

Api.prototype.getUserProfilePhotos = function(userId, offset, limit) {
  return yarl.get(this.url + 'getUserProfilePhotos', {query: {
    user_id: userId,
    offset: offset,
    limit: limit
  }, json: true});
};

Api.prototype.getFile = function(fileId) {
  return yarl.get(this.url + 'getFile', {query: {file_id: fileId}, json: true});
};

Api.prototype.downloadFile = function(fileId, path) {
  return this.getFile(fileId).then(function(res) {
    return yarl.download(this.fileUrl + res.body.result.file_path, path);
  }.bind(this));
};

Api.prototype.answerInlineQuery = function(queryId, results, options) {
  options || (options = {});
  options.inline_query_id = queryId;
  options.results = results;

  return yarl.post(this.url + 'answerInlineQuery', {body: options, json: true});
};

module.exports = Api;
