(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.i18N = {}));
    }
}(this, function (exports) {
    var _window = window,
        _document = document;

    var data = '',
        dataelem = _document.querySelector('#i18-N');

    if (dataelem != null) data = dataelem.value; else return;

    var lang = {}, langname = '', langplain = '',
        matchedtags = [];

    matchedtags = data.match(/\[(.+)\]/ig);
    matchedtags.forEach(function(tag, index) {
        langname = tag.slice(1, -1);
        lang[langname] = {};
        data.split(tag+'\n')[1].split('\n\n[')[0].split('\n').map(function(value, index) { return value.split('='); }).forEach(function(array, index) {
            lang[langname][array[0]] = array[1];
        });
    });

    for (var i in lang['global']) {
        for (var j in lang) {
            lang[j][i] = lang['global'][i];
        }
    }

    var userlang = navigator.language;
    if (lang[userlang] == undefined) return;

    var parseattr = ['title', 'value', 'href', 'src'],
        parsenodetype = ['TEXT_NODE'];

    _document.querySelectorAll('*').forEach(function(elem, index) {
        parseattr.forEach(function(attr, index) {
            var originaltext = elem[attr];
            if (originaltext == undefined) return;
            var localizedtext = lang[userlang][originaltext];
            if (localizedtext == undefined) return;
            elem[attr] = localizedtext;
        });
        elem.childNodes.forEach(function(node, i){
            parsenodetype.forEach(function(type, index) {
                if (node.nodeType == Node[type]) {
                    var originaltext = node.nodeValue;
                    var localizedtext = lang[userlang][originaltext];
                    if (localizedtext == undefined) return;
                    node.nodeValue = localizedtext;
                }
            });
        });
    });

    exports.lang = lang;
    exports.get = function(originaltext) {
        return lang[userlang][originaltext];
    }
}));
