tg-yarl  [![License](https://img.shields.io/npm/l/tg-yarl.svg)](https://github.com/strikeentco/tg-yarl/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/tg-yarl.svg)](https://www.npmjs.com/package/tg-yarl)
==========
[![Build Status](https://travis-ci.org/strikeentco/tg-yarl.svg)](https://travis-ci.org/strikeentco/tg-yarl) [![node](https://img.shields.io/node/v/tg-yarl.svg)](https://www.npmjs.com/package/tg-yarl) [![Test Coverage](https://codeclimate.com/github/strikeentco/tg-yarl/badges/coverage.svg)](https://codeclimate.com/github/strikeentco/tg-yarl/coverage) [![bitHound Score](https://www.bithound.io/github/strikeentco/tg-yarl/badges/score.svg)](https://www.bithound.io/github/strikeentco/tg-yarl)

A simple `Promise` based wrapper over Telegram Bot API with additional features.

```sh
$ npm install tg-yarl --save
```

```js
const api = require('tg-yarl')('YOUR_TELEGRAM_BOT_TOKEN');

api.setWebhook('https://example.com/bot', './certificate.pem');
api.getMe().then(res => console.log(res.body));

api
  .sendPhoto('chatId', './anonim.jpg', { caption: 'Anonymous' })
  .then(console.log);

api
  .sendDocumentFromUrl('chatId', 'https://24.media.tumblr.com/688ab090ba729bcd31d4e6f6c208f15c/tumblr_mws1kwdCds1r9hliho1_500.gif'})
  .then(console.log);
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

## [getUpdates([offset], [limit], [timeout])](https://core.telegram.org/bots/api#getupdates)

Use this method to receive incoming updates using long polling.

### Params:

* **offset** (*Integer*) - Identifier of the first update to be returned.
* **limit** (*Integer*) - Limits the number of updates to be retrieved.
* **timeout** (*Integer*) - Timeout in seconds for long polling.

## [sendMessage(chatId, text, [options])](https://core.telegram.org/bots/api#sendmessage)

Send text message.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **text** (*String*) - Text of the message to be sent.
* **[options]** (*Object*) - Message options:
  * **parse_mode** (*String*) - Send `Markdown`, if you want Telegram apps to show [bold, italic and inline URLs](https://core.telegram.org/bots/api#using-markdown) in your bot's message.
  * **disable_web_page_preview** (*Boolean*) - Disables link previews for links in this message.
  * **disable_notification** (*Boolean*) - Sends the message silently.
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.

## [forwardMessage(chatId, fromChatId, messageId, [disableNotification])](https://core.telegram.org/bots/api#forwardmessage)

Forward messages of any kind.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **fromChatId** (*Integer|String*) - Unique identifier for the chat where the original message was sent (or channel username in the format `@channelusername`)
* **messageId** (*Integer*) - Unique message identifier.
* **[disableNotification]** (*Boolean*) - Sends the message silently.

## [sendPhoto(chatId, photo, [options])](https://core.telegram.org/bots/api#sendphoto)

Send photo.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **photo** (*String|Object*) - Object with file path, Stream, Buffer or `file_id`. See [InputFile object](#inputfile-object) for more info.
* **[options]** (*Object*) - Photo options:
  * **caption** (*String*) - Photo caption (may also be used when resending photos by file_id), 0-200 characters.
  * **disable_notification** (*Boolean*) - Sends the message silently.
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
  * **disable_notification** (*Boolean*) - Sends the message silently.
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.

## [sendDocument(chatId, document, [options])](https://core.telegram.org/bots/api#sendDocument)

Send document.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **document** (*String|Object*) - Object with file path, Stream, Buffer or `file_id`. See [InputFile object](#inputfile-object) for more info.
* **[options]** (*Object*) - Document options:
  * **caption** (*String*) - Document caption (may also be used when resending documents by file_id), 0-200 characters.
  * **disable_notification** (*Boolean*) - Sends the message silently.
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.

## [sendSticker(chatId, sticker, [options])](https://core.telegram.org/bots/api#sendsticker)

Send .webp stickers.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **sticker** (*String|Object*) - Object with file path, Stream, Buffer or `file_id`. See [InputFile object](#inputfile-object) for more info.
* **[options]** (*Object*) - Sticker options:
  * **disable_notification** (*Boolean*) - Sends the message silently.
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.

## [sendVideo(chatId, video, [options])](https://core.telegram.org/bots/api#sendvideo)

Send video.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **video** (*String|Object*) - Object with file path, Stream, Buffer or `file_id`. See [InputFile object](#inputfile-object) for more info.
* **[options]** (*Object*) - Video options:
  * **duration** (*Integer*) - Duration of sent video in seconds.
  * **width** (*Integer*) - Video width.
  * **height** (*Integer*) - Video height.
  * **caption** (*String*) - Video caption (may also be used when resending videos by file_id), 0-200 characters
  * **disable_notification** (*Boolean*) - Sends the message silently.
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.

## [sendVoice(chatId, voice, [options])](https://core.telegram.org/bots/api#sendvoice)

Send voice.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **voice** (*String|Object*) - Object with file path, Stream, Buffer or `file_id`. See [InputFile object](#inputfile-object) for more info.
* **[options]** (*Object*) - Voice options:
  * **duration** (*Integer*) - Duration of sent audio in seconds.
  * **disable_notification** (*Boolean*) - Sends the message silently.
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.

## [sendLocation(chatId, latitude, longitude, [options])](https://core.telegram.org/bots/api#sendlocation)

Send location.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **latitude** (*Float*) - Latitude of location.
* **longitude** (*Float*) - Longitude of location.
* **[options]** (*Object*) - Location options:
  * **disable_notification** (*Boolean*) - Sends the message silently.
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.

## [sendVenue(chatId, latitude, longitude, title, address, [options])](https://core.telegram.org/bots/api#sendvenue)

Send venue.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **latitude** (*Float*) - Latitude of the venue.
* **longitude** (*Float*) - Longitude of the venue.
* **title** (*String*) - Name of the venue.
* **address** (*String*) - Address of the venue.
* **[options]** (*Object*) - Venue options:
  * **foursquare_id** (*String*) - Foursquare identifier of the venue.
  * **disable_notification** (*Boolean*) - Sends the message silently.
  * **reply_to_message_id** (*Integer*) - If the message is a reply, ID of the original message.
  * **reply_markup** - Additional interface options.

## [sendContact(chatId, phoneNumber, firstName, [options])](https://core.telegram.org/bots/api#sendcontact)

Send contact.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **phoneNumber** (*String*) - Contact's phone number.
* **firstName** (*String*) - Contact's first name.
* **[options]** (*Object*) - Contact options:
  * **last_name** (*String*) - Contact's last name.
  * **disable_notification** (*Boolean*) - Sends the message silently.
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

## [kickChatMember(chatId, userId)](https://core.telegram.org/bots/api#kickchatmember)

Kick chat member.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **userId** (*Integer*) - Unique identifier of the target user.

## [leaveChat(chatId)](https://core.telegram.org/bots/api#leavechat)

Use this method for your bot to leave a group, supergroup or channel.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)

## [unbanChatMember(chatId, userId)](https://core.telegram.org/bots/api#unbanchatmember)

Unban chat member.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **userId** (*Integer*) - Unique identifier of the target user.

## [getChat(chatId)](https://core.telegram.org/bots/api#getchat)

Use this method to get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.).

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)

## [getChatAdministrators(chatId)](https://core.telegram.org/bots/api#getchatadministrators)

Use this method to get a list of administrators in a chat.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)

## [getChatMembersCount(chatId)](https://core.telegram.org/bots/api#getchatmemberscount)

Use this method to get the number of members in a chat.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)

## [getChatMember(chatId, userId)](https://core.telegram.org/bots/api#getchatmember)

Use this method to get information about a member of a chat.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **userId** (*Integer*) - Unique identifier of the target user

## [answerCallbackQuery(callbackQueryId, [options])](https://core.telegram.org/bots/api#answercallbackquery)

Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert.

### Params:

* **callbackQueryId** (*String*) - Unique identifier for the query to be answered
* **[options]** (*Object*) - Callback Query options:
  * **text** (*String*) - Text of the notification. If not specified, nothing will be shown to the user.
  * **show_alert** (*Boolean*) - If `true`, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to `false`.

# [Updating messages](https://core.telegram.org/bots/api#updating-messages)

The following methods allow you to change an existing message in the message history instead of sending a new one with a result of an action. This is most useful for messages with inline keyboards using callback queries, but can also help reduce clutter in conversations with regular chat bots.

Please note, that it is currently only possible to edit messages without `reply_markup` or with inline keyboards.

## [editMessageText(text, options)](https://core.telegram.org/bots/api#editmessagetext)

Use this method to edit text messages sent by the bot or via the bot (for inline bots).

### Params:

* **text** (*String*) - New text of the message.
* **options** (*Object*) - Message options:
  * **chat_id** (*Integer|String*) - Required if `inline_message_id` is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).
  * **message_id** (*Integer*) - Required if `inline_message_id` is not specified. Unique identifier of the sent message.
  * **inline_message_id** (*Integer*) - Required if `chat_id` and `message_id` are not specified. Identifier of the inline message.
  * **[parse_mode]** (*String*) - Send `Markdown`, if you want Telegram apps to show [bold, italic and inline URLs](https://core.telegram.org/bots/api#using-markdown) in your bot's message.
  * **[disable_web_page_preview]** (*Boolean*) - Disables link previews for links in this message.
  * **[reply_markup]** - Additional interface options.

## [editMessageCaption(options)](https://core.telegram.org/bots/api#editmessagecaption)

Use this method to edit captions of messages sent by the bot or via the bot (for inline bots).

### Params:

* **options** (*Object*) - Message options:
  * **chat_id** (*Integer|String*) - Required if `inline_message_id` is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).
  * **message_id** (*Integer*) - Required if `inline_message_id` is not specified. Unique identifier of the sent message.
  * **inline_message_id** (*Integer*) - Required if `chat_id` and `message_id` are not specified. Identifier of the inline message.
  * **[caption]** (*String*) - New caption of the message.
  * **[reply_markup]** - Additional interface options.

## [editMessageReplyMarkup(options)](https://core.telegram.org/bots/api#editmessagereplymarkup)

Use this method to edit only the reply markup of messages sent by the bot or via the bot (for inline bots).

### Params:

* **options** (*Object*) - Message options:
  * **chat_id** (*Integer|String*) - Required if `inline_message_id` is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).
  * **message_id** (*Integer*) - Required if `inline_message_id` is not specified. Unique identifier of the sent message.
  * **inline_message_id** (*Integer*) - Required if `chat_id` and `message_id` are not specified. Identifier of the inline message.
  * **[reply_markup]** - Additional interface options.

# [Inline mode](https://core.telegram.org/bots/api#inline-mode)

The following method allow your bot to work in inline mode.

To enable this option, send the `/setinline` command to [@BotFather](https://telegram.me/botfather) and provide the placeholder text that the user will see in the input field after typing your bot’s name.

## [answerInlineQuery(inline_query_id, results, [options])](https://core.telegram.org/bots/api#answerinlinequery)

Use this method to send answers to an inline query. On success, True is returned.<br>
No more than 50 results per query are allowed.

### Params:

* **inline_query_id** (*String*) - Unique identifier for the answered query.
* **results** (*Array of [InlineQueryResult](https://core.telegram.org/bots/api#inlinequeryresult)*) - A JSON-serialized array of results for the inline query.
* **[options]** (*Object*) - Inline Query options:
  * **cache_time** (*Integer*) - The maximum amount of time in seconds that the result of the inline query may be cached on the server. Defaults to 300.
  * **is_personal** (*Boolean*) - Pass True, if results may be cached on the server side only for the user that sent the query. By default, results may be returned to any user who sends the same query.
  * **next_offset** (*String*) - Pass the offset that a client should send in the next query with the same text to receive more results. Pass an empty string if there are no more results or if you don‘t support pagination. Offset length can’t exceed 64 bytes.
  * **switch_pm_text** (*String*) - If passed, clients will display a button with specified text that switches the user to a private chat with the bot and sends the bot a start message with the parameter `switch_pm_parameter`.
  * **switch_pm_parameter** (*String*) - Parameter for the start message sent to the bot when user presses the switch button.

# Extra

## sendPhotoFromUrl(chatId, url, [options])

Send photo from URL.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **url** (*String*) - String with URL.
* **[options]** (*Object*) - Photo options.

## sendAudioFromUrl(chatId, url, [options])

Send audio from URL.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **url** (*String*) - String with URL.
* **[options]** (*Object*) - Audio options.

## sendDocumentFromUrl(chatId, url, [options])

Send document from URL.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **url** (*String*) - String with URL.
* **[options]** (*Object*) - Document options.

## sendStickerFromUrl(chatId, url, [options])

Send .webp stickers from URL.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **url** (*String*) - String with URL.
* **[options]** (*Object*) - Sticker options.

## sendVideoFromUrl(chatId, url, [options])

Send video from URL.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **url** (*String*) - String with URL.
* **[options]** (*Object*) - Video options.

## sendVoiceFromUrl(chatId, url, [options])

Send voice from URL.

### Params:

* **chatId** (*Integer|String*) - Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
* **url** (*String*) - String with URL.
* **[options]** (*Object*) - Voice options.

## downloadFile(file_id, path)

Download file to specified path.

### Params:

* **file_id** (*String*) - File identifier to download.
* **path** (*String|WritableStream*) - File will be written to specified `WritableStream` or new `WritableStream` will be created with specified path.

```js
api.downloadFile('AgADAgADjagxGxAR6gbMzfh8LDtkU-9GhCoABOmH973MjLOBq7sAAgI', './file.jpg');
```

## setKeyboard(keyboard, [resize], [once], [selective])

Custom keyboard.

### Params:

* **keyboard** (*Array of Array of KeyboardButton*) - Array of button rows, each represented by an Array of [KeyboardButton objects](https://core.telegram.org/bots/api#keyboardbutton).
* **[resize]** (*Boolean*) - Requests clients to resize the keyboard vertically for optimal fit.
* **[once]** (*Boolean*) - Requests clients to hide the keyboard as soon as it's been used.
* **[selective]** (*Boolean*) - Use this parameter if you want to show the keyboard to specific users only.

**Note:** This method is chainable.

## hideKeyboard([selective])

If you just want to hide the keyboard, then do this:
```js
api.hideKeyboard().sendMessage('chatId', 'Text');
//or
api.hideKeyboard();
api.sendMessage('chatId', 'Text');
```
If you want to hide the keyboard to specific users only, then do this:
```js
api.hideKeyboard(true).sendMessage('chatId', 'Text');
//or
api.hideKeyboard(true);
api.sendMessage('chatId', 'Text');
```

### Params:

* **[selective]** (*Boolean*) - Use this parameter if you want to hide keyboard for specific users only.

**Note:** This method is chainable.

## forceReply([selective])

Force reply.

### Params:

* **[selective]** (*Boolean*) - Use this parameter if you want to force reply from specific users only.

```js
api.forceReply().sendMessage('chatId', 'Text');
```

**Note:** This method is chainable.

## setInlineKeyboard(inlineKeyboard)

Inline keyboard.

### Params:

* **inlineKeyboard** (*Array of Array of InlineKeyboardButton*) - Array of button rows, each represented by an Array of [InlineKeyboardButton objects](https://core.telegram.org/bots/api#inlinekeyboardbutton).

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

The MIT License (MIT)<br/>
Copyright (c) 2015-2016 Alexey Bystrov
