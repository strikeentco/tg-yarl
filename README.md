# tg-yarl

[![license](https://img.shields.io/github/license/strikeentco/tg-yarl.svg)](https://github.com/strikeentco/tg-yarl/blob/master/LICENSE) [![node](https://img.shields.io/node/v/tg-yarl.svg)](https://www.npmjs.com/package/tg-yarl) [![npm](https://img.shields.io/npm/v/tg-yarl.svg)](https://www.npmjs.com/package/tg-yarl) [![bitHound Score](https://www.bithound.io/github/strikeentco/tg-yarl/badges/score.svg)](https://www.bithound.io/github/strikeentco/tg-yarl)

A simple `Promise` based wrapper over Telegram Bot API with additional features.

```sh
npm install --save tg-yarl
```

```js
const BotApi = require('tg-yarl');

const api = new BotApi('YOUR_TELEGRAM_BOT_TOKEN');

api.setWebhook('https://example.com/bot', './certificate.pem');

api.getMe()
  .then(res => console.log(res.body));

api.sendPhoto('chatId', './anonim.jpg', {caption: 'Anonymous'})
  .then(res => console.log(res.body));
```

# [Methods](https://core.telegram.org/bots/api)

All methods return a `Promise`.

## [getMe()](https://core.telegram.org/bots/api#getme)

A simple method for testing your bot's auth token. Returns basic information about the bot in form of a User object.

## [setWebHook([url], [certificate])](https://core.telegram.org/bots/api#setwebhook)

Specify an url to receive incoming updates via an outgoing webhook.

To use a self-signed certificate, you need to upload your public key certificate using `certificate` parameter.

### Params:

* **[url]** (*String*) - HTTPS url to send updates to. Use an empty string to remove webhook integration.
* **[certificate]** (*String|Object*) - Object with file path, Stream or Buffer. See [InputFile object](#inputfile-object) for more info.

## [getUpdates([timeout], [limit], [offset])](https://core.telegram.org/bots/api#getupdates)

Use this method to receive incoming updates using long polling.

### Params:

* **timeout** (*Integer*) - Timeout in seconds for long polling.
* **limit** (*Integer*) - Limits the number of updates to be retrieved.
* **offset** (*Integer*) - Identifier of the first update to be returned.

## [sendMessage(chatId, text, [options])](https://core.telegram.org/bots/api#sendmessage)

Send text message.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **text** (*String*) - Text of the message to be sent.
* **[options]** (*Object*) - Message options:
  * **parse_mode** (*String*) - Send `Markdown`, if you want Telegram apps to show [bold, italic and inline URLs](https://core.telegram.org/bots/api#using-markdown) in your bot's message.
  * **disable_web_page_preview** (*Boolean*) - Disables link previews for links in this message.
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.

## [forwardMessage(chatId, fromChatId, messageId)](https://core.telegram.org/bots/api#forwardmessage)

Forward messages of any kind.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **fromChatId** (*Integer|String*) - Unique identifier for the chat where the original message was sent (or channel username in the format `@channelusername`)
* **messageId** (*Integer*) - Unique message identifier.

## [sendPhoto(chatId, photo, [options])](https://core.telegram.org/bots/api#sendphoto)

Send photo.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **photo** (*String|Object*) - Object with file path, Stream, Buffer or `file_id`. See [InputFile object](#inputfile-object) for more info.
* **[options]** (*Object*) - Photo options:
  * **caption** (*String*) - Photo caption.
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.


## [sendAudio(chatId, audio, [options])](https://core.telegram.org/bots/api#sendaudio)

Send audio.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **audio** (*String|Object*) - Object with file path, Stream, Buffer or `file_id`. See [InputFile object](#inputfile-object) for more info.
* **[options]** (*Object*) - Audio options:
  * **duration** (*Integer*) - Duration of sent audio in seconds.
  * **performer** (*String*) - Performer of sent audio.
  * **title** (*String*) - Title of sent audio.
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.


## [sendDocument(chatId, document, [options])](https://core.telegram.org/bots/api#sendDocument)

Send document.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **document** (*String|Object*) - Object with file path, Stream, Buffer or `file_id`. See [InputFile object](#inputfile-object) for more info.
* **[options]** (*Object*) - Document options:
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.


## [sendSticker(chatId, sticker, [options])](https://core.telegram.org/bots/api#sendsticker)

Send .webp stickers.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **sticker** (*String|Object*) - Object with file path, Stream, Buffer or `file_id`. See [InputFile object](#inputfile-object) for more info.
* **[options]** (*Object*) - Sticker options:
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.


## [sendVideo(chatId, video, [options])](https://core.telegram.org/bots/api#sendvideo)

Send video.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **video** (*String|Object*) - Object with file path, Stream, Buffer or `file_id`. See [InputFile object](#inputfile-object) for more info.
* **[options]** (*Object*) - Video options:
  * **duration** (*Integer*) - Duration of sent video in seconds.
  * **caption** (*String*) - Video caption.
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.


## [sendVoice(chatId, voice, [options])](https://core.telegram.org/bots/api#sendvoice)

Send voice.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **voice** (*String|Object*) - Object with file path, Stream, Buffer or `file_id`. See [InputFile object](#inputfile-object) for more info.
* **[options]** (*Object*) - Voice options:
  * **duration** (*Integer*) - Duration of sent video in seconds.
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.

## [sendLocation(chatId, latitude, longitude, [options])](https://core.telegram.org/bots/api#sendlocation)

Send location.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **latitude** (*Float*) - Latitude of location.
* **longitude** (*Float*) - Longitude of location.
* **[options]** (*Object*) - Location options:
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.

## [sendChatAction(chatId, action)](https://core.telegram.org/bots/api#sendchataction)

Send chat action.

`typing` for text messages, `upload_photo` for photos, `record_video` or `upload_video` for videos, `record_audio` or `upload_audio` for audio files, `upload_document` for general files, `find_location` for location data.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **action** (*String*) - Type of action to broadcast.

## [getUserProfilePhotos(userId, [offset], [limit])](https://core.telegram.org/bots/api#getuserprofilephotos)

Use this method to get a list of profile pictures for a user.

### Params:

* **userId** (*Integer*) - Unique identifier of the target user.
* **[offset]** (*Integer*) - Sequential number of the first photo to be returned. By default, all photos are returned.
* **[limit]** (*Integer*) - Limits the number of photos to be retrieved. Values between 1—100 are accepted. Defaults to 100.

## [getFile(file_id)](https://core.telegram.org/bots/api#getfile)

Use this method to get basic info about a file and prepare it for downloading.

### Params:

* **file_id** (*String*) - File identifier to get info about.

# Extra

## downloadFile(file_id, path)

Download file to specified path.

### Params:

* **file_id** (*String*) - File identifier to get info about.
* **path** (*String|WritableStream*) - File will be written to specified `WritableStream` or new `WritableStream` will be created with specified path.

```js
api.downloadFile('AgADAgADjagxGxAR6gbMzfh8LDtkU-9GhCoABOmH973MjLOBq7sAAgI', './file.jpg');
```

## setKeyboard(keyboard, [resize], [once], [selective])

Custom keyboard.

### Params:

* **keyboard** (*Array of Array of Strings*) - Array of button rows, each represented by an Array of Strings.
* **[resize]** (*Boolean*) - Requests clients to resize the keyboard vertically for optimal fit.
* **[once]** (*Boolean*) - Requests clients to hide the keyboard as soon as it's been used.
* **[selective]** (*Boolean*) - Use this parameter if you want to show the keyboard to specific users only.

**Note:** This method is chainable.

## setKeyboard([hide_keyboard], [selective])

If you just want to hide the keyboard, then do this:
```js
api.setKeyboard().sendMessage('chatId', 'Text');
//or
api.setKeyboard(true);
api.sendMessage('chatId', 'Text');
```
If you want to hide the keyboard to specific users only, then do this:
```js
api.setKeyboard(true, true).sendMessage('chatId', 'Text');
//or
api.setKeyboard(true, true);
api.sendMessage('chatId', 'Text');
```

### Params:

* **[hide_keyboard]** (*True*)- Requests clients to hide the custom keyboard.
* **[selective]** (*Boolean*) - Use this parameter if you want to show the keyboard to specific users only.

**Note:** This method is chainable.

## InputFile object

For `path`, `file_id`, `Buffer` and local `Stream` just pass into variable:
```js
const inputFile = './file.png'; //path
//or
const inputFile = 'AgADAgADjagxGxAR6gbMzfh8LDtkU-9GhCoABOmH973MjLOBq7sAAgI'; //file_id
//or
const inputFile = new Buffer(); //Buffer
//or
const inputFile = require('fs').createReadStream('./file.png'); //local Stream

api.sendPhoto('chatId', inputFile);
```

For remote `Stream`:
```js
const inputFile = {
  value: require('https').request('https://avatars1.githubusercontent.com/u/2401029'),
  filename: 'image.jpg'
};

api.sendPhoto('chatId', inputFile);
```

## License

The MIT License (MIT)  
Copyright (c) 2015 Alexey Bystrov
