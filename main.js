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
    return { value: path.value, options: { filename: path.filename } };
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

Api.prototype._setOptions = function (to, from) {
  from || (from = {});

  for (var key in from) {
    to[key] = from[key];
  }

  if (this.keyboard) {
    to.reply_markup = this.keyboard;
    delete this.keyboard;
  }

  return to;
};

Api.prototype.hideKeyboard = function (selective) {
  this.keyboard = JSON.stringify({
    hide_keyboard: true,
    selective: selective || false
  });

  return this;
};

Api.prototype.setKeyboard = function (keyboard, resize, once, selective) {
  if (!Array.isArray(keyboard)) {
    return this.hideKeyboard(selective || resize || false);
  } else {
    this.keyboard = JSON.stringify({
      keyboard: keyboard,
      resize_keyboard: resize || false,
      one_time_keyboard: once || false,
      selective: selective || false
    });
  }

  return this;
};

Api.prototype.getUpdates = function (offset, limit, timeout) {
  return yarl.get(this.url + 'getUpdates', { query: {
    offset: offset,
    limit: limit,
    timeout: timeout
  }, json: true });
};

Api.prototype.setWebhook = function (url, cert) {
  var options = { body: { url: url }, json: true };
  if (cert) {
    options.body.certificate = fileLoad(cert);
    options.multipart = true;
  }

  return yarl.post(this.url + 'setWebhook', options);
};

Api.prototype.getMe = function () {
  return yarl.get(this.url + 'getMe', { json: true });
};

Api.prototype.sendMessage = function (chatId, text, options) {
  options = this._setOptions({
    chat_id: chatId,
    text: text
  }, options);

  return yarl.post(this.url + 'sendMessage', { body: options, json: true });
};

Api.prototype.forwardMessage = function (chatId, fromChatId, messageId, disableNotification) {
  return yarl.post(this.url + 'forwardMessage', { body: {
    chat_id: chatId,
    from_chat_id: fromChatId,
    message_id: messageId,
    disable_notification: disableNotification
  }, json: true });
};

Api.prototype.sendPhoto = function (chatId, data, options) {
  options = this._setOptions({
    chat_id: chatId,
    photo: fileLoad(data)
  }, options);

  return yarl.post(this.url + 'sendPhoto', { body: options, json: true, multipart: true });
};

Api.prototype.sendPhotoFromUrl = function (chatId, url, options) {
  return yarl.get(url, { buffer: true }).then(function (res) {
    return this.sendPhoto(chatId, res.body, options);
  }.bind(this));
};

Api.prototype.sendAudio = function (chatId, data, options) {
  options = this._setOptions({
    chat_id: chatId,
    audio: fileLoad(data)
  }, options);

  return yarl.post(this.url + 'sendAudio', { body: options, json: true, multipart: true });
};

Api.prototype.sendAudioFromUrl = function (chatId, url, options) {
  return yarl.get(url, { buffer: true }).then(function (res) {
    return this.sendAudio(chatId, res.body, options);
  }.bind(this));
};

Api.prototype.sendDocument = function (chatId, data, options) {
  options = this._setOptions({
    chat_id: chatId,
    document: fileLoad(data)
  }, options);

  return yarl.post(this.url + 'sendDocument', { body: options, json: true, multipart: true });
};

Api.prototype.sendDocumentFromUrl = function (chatId, url, options) {
  return yarl.get(url, { buffer: true }).then(function (res) {
    return this.sendDocument(chatId, res.body, options);
  }.bind(this));
};

Api.prototype.sendSticker = function (chatId, data, options) {
  options = this._setOptions({
    chat_id: chatId,
    sticker: fileLoad(data)
  }, options);

  return yarl.post(this.url + 'sendSticker', { body: options, json: true, multipart: true });
};

Api.prototype.sendStickerFromUrl = function (chatId, url, options) {
  return yarl.get(url, { buffer: true }).then(function (res) {
    return this.sendSticker(chatId, res.body, options);
  }.bind(this));
};

Api.prototype.sendVideo = function (chatId, data, options) {
  options = this._setOptions({
    chat_id: chatId,
    video: fileLoad(data)
  }, options);

  return yarl.post(this.url + 'sendVideo', { body: options, json: true, multipart: true });
};

Api.prototype.sendVideoFromUrl = function (chatId, url, options) {
  return yarl.get(url, { buffer: true }).then(function (res) {
    return this.sendVideo(chatId, res.body, options);
  }.bind(this));
};

Api.prototype.sendVoice = function (chatId, data, options) {
  options = this._setOptions({
    chat_id: chatId,
    voice: fileLoad(data)
  }, options);

  return yarl.post(this.url + 'sendVoice', { body: options, json: true, multipart: true });
};

Api.prototype.sendVoiceFromUrl = function (chatId, url, options) {
  return yarl.get(url, { buffer: true }).then(function (res) {
    return this.sendVoice(chatId, res.body, options);
  }.bind(this));
};

Api.prototype.sendLocation = function (chatId, lat, lon, options) {
  options = this._setOptions({
    chat_id: chatId,
    latitude: lat,
    longitude: lon
  }, options);

  return yarl.post(this.url + 'sendLocation', { body: options, json: true });
};

Api.prototype.sendChatAction = function (chatId, action) {
  return yarl.post(this.url + 'sendChatAction', { body: {
    chat_id: chatId,
    action: action
  }, json: true });
};

Api.prototype.getUserProfilePhotos = function (userId, offset, limit) {
  return yarl.get(this.url + 'getUserProfilePhotos', { query: {
    user_id: userId,
    offset: offset,
    limit: limit
  }, json: true });
};

Api.prototype.getFile = function (fileId) {
  return yarl.get(this.url + 'getFile', { query: { file_id: fileId }, json: true });
};

Api.prototype.downloadFile = function (fileId, path) {
  return this.getFile(fileId).then(function (res) {
    return yarl.download(this.fileUrl + res.body.result.file_path, path);
  }.bind(this));
};

Api.prototype.answerInlineQuery = function (queryId, results, options) {
  options = this._setOptions({
    inline_query_id: queryId,
    results: JSON.stringify(results)
  }, options);

  return yarl.post(this.url + 'answerInlineQuery', { body: options, json: true });
};

module.exports = Api;
