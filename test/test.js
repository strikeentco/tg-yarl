'use strict';

var should = require('should/as-function');
var token = process.env.TELEGRAM_TOKEN;
var chatId = process.env.TELEGRAM_CHAT_ID;
var fixture = __dirname + '/fixture';
var api = require('../main')(token);

describe('tg-yarl()', function () {
  this.timeout(0);

  it('should throw Error', function () {
    should(require('../main')).throw('Telegram Bot token not provided!');
  });

  describe('.getUpdates()', function () {
    it('should have property ok', function () {
      return api.getUpdates().then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.setWebhook()', function () {
    it('should have property ok', function () {
      return api.setWebhook('https://example.com/').then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });

    it('should have property ok', function () {
      return api.setWebhook('', true).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.getMe()', function () {
    it('should have property ok', function () {
      return api.getMe().then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.sendMessage()', function () {
    it('should have property ok', function () {
      return api.sendMessage(chatId, 'From Travis with Love', { disable_notification: true }).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });

    it('should have property ok', function () {
      return api.setKeyboard([['Celsius', 'Fahrenheit'], ['/cancel']]).sendMessage(chatId, 'From Travis with Love', { disable_notification: true }).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });

    it('should have property ok', function () {
      return api.setKeyboard().sendMessage(chatId, 'From Travis with Love', { disable_notification: true }).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.forwardMessage()', function () {
    it('should have property ok', function () {
      return api.forwardMessage(chatId, chatId, 5400, true).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.sendPhoto()', function () {
    it('should have property ok', function () {
      return api.sendPhoto(chatId, fixture + '/fixture.jpg', { disable_notification: true }).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });

    it('should have property ok', function () {
      return api.sendPhoto(chatId, 'AgADAgADjagxGxAR6gbMzfh8LDtkU-9GhCoABOmH973MjLOBq7sAAgI', { disable_notification: true }).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });

    it('should have property ok', function () {
      var inputFile = {
        value: require('https').request('https://avatars1.githubusercontent.com/u/2401029'),
        filename: 'image.jpg'
      };

      return api.sendPhoto(chatId, inputFile, { disable_notification: true }).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });

    it('should throw HTTPError', function () {
      return api.sendPhoto(chatId, './fixture.jpg').catch(function (e) {
        should(e.message).be.eql('Response code 400 (Bad Request)');
      });
    });
  });

  describe('.sendPhotoFromUrl()', function () {
    it('should have property ok', function () {
      return api.sendPhotoFromUrl(chatId, 'https://avatars1.githubusercontent.com/u/2401029?v=3&s=250', { disable_notification: true }).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.sendAudio()', function () {
    it('should have property ok', function () {
      return api.sendAudio(chatId, fixture + '/fixture.mp3', { disable_notification: true }).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.sendAudioFromUrl()', function () {
    it('should have property ok', function () {
      return api.sendAudioFromUrl(chatId, 'https://raw.githubusercontent.com/sindresorhus/file-type/master/fixture/fixture.mp3', { disable_notification: true }).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.sendDocument()', function () {
    it('should have property ok', function () {
      return api.sendDocument(chatId, fixture + '/taytay.gif', { disable_notification: true }).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.sendDocumentFromUrl()', function () {
    it('should have property ok', function () {
      return api.sendDocumentFromUrl(chatId, 'https://24.media.tumblr.com/688ab090ba729bcd31d4e6f6c208f15c/tumblr_mws1kwdCds1r9hliho1_500.gif', { disable_notification: true }).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.sendSticker()', function () {
    it('should have property ok', function () {
      return api.sendSticker(chatId, fixture + '/fixture.webp', { disable_notification: true }).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.sendStickerFromUrl()', function () {
    it('should have property ok', function () {
      return api.sendStickerFromUrl(chatId, 'http://www.kiwikidsnews.co.nz/wp-content/uploads/2015/11/300x336xtaylor-swift.png.pagespeed.ic.i1qN83MOeh.webp', { disable_notification: true }).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.sendVideo()', function () {
    it('should have property ok', function () {
      return api.sendVideo(chatId, fixture + '/fixture.mp4', { disable_notification: true }).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.sendVideoFromUrl()', function () {
    it('should have property ok', function () {
      return api.sendVideoFromUrl(chatId, 'https://raw.githubusercontent.com/sindresorhus/file-type/master/fixture/fixture.mp4', { disable_notification: true }).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.sendVoice()', function () {
    it('should have property ok', function () {
      return api.sendVoice(chatId, fixture + '/fixture.opus', { disable_notification: true }).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.sendVoiceFromUrl()', function () {
    it('should have property ok', function () {
      return api.sendVoiceFromUrl(chatId, 'https://raw.githubusercontent.com/sindresorhus/file-type/master/fixture/fixture.opus', { disable_notification: true }).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.sendLocation()', function () {
    it('should have property ok', function () {
      return api.sendLocation(chatId, 64.54, 40.53, { disable_notification: true }).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.sendChatAction()', function () {
    it('should have property ok', function () {
      return api.sendChatAction(chatId, 'upload_photo').then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.getUserProfilePhotos()', function () {
    it('should have property ok', function () {
      return api.getUserProfilePhotos(chatId).then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.getFile()', function () {
    it('should have property ok', function () {
      return api.getFile('AgADAgADjagxGxAR6gbMzfh8LDtkU-9GhCoABOmH973MjLOBq7sAAgI').then(function (res) {
        should(res.body).have.property('ok', true);
      });
    });
  });

  describe('.downloadFile()', function () {
    it('should be ok', function () {
      return api.downloadFile('AgADAgADjagxGxAR6gbMzfh8LDtkU-9GhCoABOmH973MjLOBq7sAAgI', fixture + '/anonim.jpg').then(function (res) {
        should(res.body).be.eql('The data successfully written to file.');
      });
    });
  });

  describe('.answerInlineQuery()', function () {
    it('should throw HTTPError', function () {
      return api.answerInlineQuery(1, []).catch(function (e) {
        should(e.message).be.eql('Response code 400 (Bad Request)');
      });
    });
  });
});
