# i18-N.js-Lite

## "Internationalization Natively"

A single simple script file for webpage localization (i18n).

"N" stands for "natively" in browser client, with JavaScript enabled.

It's really simple to use this script to do localization, just:
- Define some languages in an textarea with id "i18-N", note that the format is strict. See example below.
- include this script after all the document elements: `<script src="i18-N.js"></script>`.
- If needed, get a localized string in JavaScript with `i18N.get('string')` after it loaded.

It means that you just do like this:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>i18-N.js Lite </title>
</head>
<body>
    <h1>Hello, World!</h1>
    <h2>i18-N.js Lite <span>i18-N-Version</span></h2>
    <textarea id="i18-N" style="display: none;">
[global]
i18-N-Version=0.0.1

[en-US]
Hello, World!=Hello, World!

[zh-CN]
Hello, World!=你好，世界！
    </textarea>
    <script src="i18-N.js"></script>
    <script>document.querySelector('title').innerHTML += i18N.get('i18-N-Version');</script>
</body>
</html>
```

Then it's done!

## How this works?

Just parse data inside that textarea to a language object, and get strings inside with language defined by browser: `window.navigator.language`.
Easy enough, right?

## Hints
- It's different from other heavy i18n tools. It's flexable, easy and the whole script belongs to yourself.
- You can localize even a single webpage with this tool easily. Just include this script content inside a script tag.
- By default attributes like title and src are detected too. This means you can localize images, scripts or other url-related things as well.
