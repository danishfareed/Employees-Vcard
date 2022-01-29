/**
 * This vcard function is from https://gist.github.com/dun4n/9353031
 * you can visit the github link to understand it's uses
 */
(function(context) {
    var version = {
        "TWO": "2.1",
        "THREE": "3.0",
        "FOUR": "4.0"
    }

    var vCard = {
        Version: version,
        Entry: {
            "ADDRESS": { "version": [version.TWO, version.THREE, version.FOUR], "key": "ADR", "format": ";;{0};{2};{4};{1};{3}", "@comment": "usage: addAdr(street, code, city, country, state)" },
            "AGENT": { "version": [version.TWO, version.THREE], "key": "AGENT" },
            "ANNIVERSARY": { "version": [version.FOUR], "key": "ANNIVERSARY" },
            "BIRTHDAY": { "version": [version.TWO, version.THREE, version.FOUR], "key": "BDAY" },
            "CALENDARADDURI": { "version": [version.FOUR], "key": "CALADRURI" },
            "CALENDARURI": { "version": [version.FOUR], "key": "CALURI" },
            "CATEGORIES": { "version": [version.TWO, version.THREE, version.FOUR], "key": "CATEGORIES" },
            "CLASS": { "version": [version.THREE], "key": "CLASS" },
            "CLIENTPIDMAP": { "version": [version.FOUR], "key": "CLIENTPIDMAP" },
            "EMAIL": { "version": [version.TWO, version.THREE, version.FOUR], "key": "EMAIL" },
            "FBURL": { "version": [version.FOUR], "key": "FBURL" },
            "FORMATTEDNAME": { "version": [version.TWO, version.THREE, version.FOUR], "key": "FN" },
            "GENDER": { "version": [version.FOUR], "key": "GENDER" },
            "GEO": { "version": [version.TWO, version.THREE, version.FOUR], "key": "GEO" }, // FIXME two differents formats
            "IMPP": { "version": [version.THREE, version.FOUR], "key": "IMPP" },
            // TODO: KEY
            "KIND": { "version": [version.FOUR], "key": "KIND" },
            "LABEL": { "version": [version.TWO, version.THREE], "key": "LABEL" },
            // TODO: LOGO
            "MAILER": { "version": [version.TWO, version.THREE], "key": "MAILER" },
            "MEMBER": { "version": [version.FOUR], "key": "MEMBER" },
            "NAME": { "version": [version.TWO, version.THREE, version.FOUR], "key": "N", "format": "{1};{0};;{2}", "@comment": "usage: addName(firstname, lastname, title)" },
            "NICKNAME": { "version": [version.THREE, version.FOUR], "key": "NICKNAME" },
            "NOTE": { "version": [version.TWO, version.THREE, version.FOUR], "key": "NOTE" },
            "ORGANIZATION": { "version": [version.TWO, version.THREE, version.FOUR], "key": "ORG" },
            // TODO: PHOTO
            "PRODID": { "version": [version.THREE, version.FOUR], "key": "PRODID" },
            "PROFILE": { "version": [version.TWO, version.THREE], "key": "PROFILE" },
            "RELATED": { "version": [version.FOUR], "key": "RELATED" },
            "REVISION": { "version": [version.TWO, version.THREE, version.FOUR], "key": "REV" },
            "ROLE": { "version": [version.TWO, version.THREE, version.FOUR], "key": "ROLE" },
            "SORTSTRING": { "version": [version.TWO, version.THREE, version.FOUR], "key": "SORT-STRING" },
            // TODO: SOUND
            "SOURCE": { "version": [version.TWO, version.THREE, version.FOUR], "key": "SOURCE" },
            "PHONE": { "version": [version.TWO, version.THREE, version.FOUR], "key": "TEL" },
            "TITLE": { "version": [version.TWO, version.THREE, version.FOUR], "key": "TITLE" },
            "TIMEZONE": { "version": [version.TWO, version.THREE, version.FOUR], "key": "TZ" }, // FIXME: two differents formats
            "UID": { "version": [version.TWO, version.THREE, version.FOUR], "key": "UID" },
            "URL": { "version": [version.TWO, version.THREE, version.FOUR], "key": "URL" },
            "XML": { "version": [version.FOUR], "key": "XML" }
        },
        Type: {
            "HOME": "HOME",
            "WORK": "WORK",
            "CELL": "CELL",
            "MAIN": "MAIN",
            "OTHER": "OTHER"
        },
        create: function(version) {
            for (var key in this.Version) {
                if (this.Version[key] === version)
                    return new Card(version)
            }
            throw new Error("Unknown vCard version")
        },
        dump: function(card) {
            var str = "BEGIN:VCARD\n"

            for (var key in card) {
                var entry = card[key]

                if (typeof entry === "function")
                    continue

                if (Object.prototype.toString.call(entry) === "[object Array]") {
                    for (var i = 0, l = entry.length; i < l; i++) {
                        var e = entry[i]
                        str += key.toUpperCase() + (e.type ? ";TYPE=" + e.type.toUpperCase() + ":" : ":") + e.value + "\n"
                    }
                } else if (typeof entry === "object") {
                    str += key.toUpperCase() + (entry.type ? ";TYPE=" + entry.type.toUpperCase() + ":" : ":") + entry.value + "\n"
                } else {
                    str += key.toUpperCase() + ":" + entry + "\n"
                }
            }

            str += "END:VCARD"

            return str
        },
        export: function(card, name, filename, force) {
            var a = document.createElement('a')
            a.download = filename + ".vcf"
            a.textContent = name

            if (Blob) {
                var blob = new Blob([this.dump(card)], { "type": "text/vcard" })
                a.href = URL.createObjectURL(blob)
            } else {
                a.href = "data:text/vcard;base64," + this.btoa(this.dump(card))
            }

            force && a.click()

            return a
        },
        btoa: function(str) {
            str = unescape(encodeURIComponent(str))

            if (!btoa) {
                var b64c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

                var i, res = "",
                    length = str.length;
                for (i = 0; i < length - 2; i += 3) {
                    res += b64c[str.charCodeAt(i) >>> 2];
                    res += b64c[((str.charCodeAt(i) & 3) << 4) | (str.charCodeAt(i + 1) >>> 4)];
                    res += b64c[((str.charCodeAt(i + 1) & 15) << 2) | (str.charCodeAt(i + 2) >>> 6)];
                    res += b64c[str.charCodeAt(i + 2) & 63];
                }

                if (length % 3 === 2) {
                    res += b64c[str.charCodeAt(i) >>> 2];
                    res += b64c[((str.charCodeAt(i) & 3) << 4) | (str.charCodeAt(i + 1) >>> 4)];
                    res += b64c[((str.charCodeAt(i + 1) & 15) << 2)];
                    res += "=";
                } else if (length % 3 === 1) {
                    res += b64c[str.charCodeAt(i) >>> 2];
                    res += b64c[((str.charCodeAt(i) & 3) << 4)];
                    res += "==";
                }

                return res;
            } else {
                return btoa(str)
            }
        }
    }

    var Card = function(version) {
        this.version = version

        for (var key in vCard.Entry) {
            var property = vCard.Entry[key]

            if (!property.version || property.version.indexOf(version) < 0)
                continue

            var fn = "add" + key[0].toUpperCase() + key.slice(1).toLowerCase()

            Card.prototype[fn] = (function(key, format) {
                return (function() {
                    var args = Array.prototype.slice.call(arguments)
                    var lastArg = args.length > 0 ? args[args.length - 1] : undefined

                    var model = vCard.Type.hasOwnProperty(lastArg) ? args.slice(0, args.length - 1) : args
                    var value = format && format.replace(/\{([0-9]*)\}/g, function(match, parameter) {
                        return model[parseInt(parameter)] || ''
                    }) || model[0]

                    this.add(key, value, vCard.Type.hasOwnProperty(lastArg) && lastArg)
                })
            })(property.key, property.format)
        }

        this.add = function(entry, value, type) {
            var key = (typeof entry === "object" && entry.key) ? entry.key : entry

                !this[key] && (this[key] = [])
            var e = { "value": value }
            type && (e.type = type)

            this[key].push(e)
        }
    }

    context.vCard = vCard
})(this)