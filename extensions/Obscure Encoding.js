// 7thImpacts Obscure Encoding
// Wait, where is my bee movie script?
/*
=================================
Dont get mad at me if it breaks get mad at javascript for being so hard
=================================
I DID use AI to fix bugs and get over some parts. I'm sorry (lie)
=================================
According to all known laws of aviation, there is no way that a bee should be able to fly. 
Its wings are too small to get its fat little body off the ground. 
The bee, of course, flies anyway because bees don't care what humans think is impossible.
=================================
*/
(function (Scratch) {
    'use strict';
    class Extention {
        getInfo() {
            return {
                id: '7thImpObscureEncoding',
                name: 'Obscure Encoding',
                color1: '#8a9f9c',
                color2: '#9cdadd',
                color3: '#5cb1b6',
                blocks: [
                    {opcode: 'EncoderReporter',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Encode [TEXT] in [FORMAT]',
                        arguments: {
                            TEXT: {type: Scratch.ArgumentType.STRING, defaultValue: "Hello World!"},
                            FORMAT: {type: Scratch.ArgumentType.MENU, menu: 'EncodingFormat', defaultValue: 'ShuffleHash'},
                        }
                    },
                    {opcode: 'DecoderReporter',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Decode [TEXT] from [FORMAT]',
                        arguments: {
                            TEXT: {type: Scratch.ArgumentType.STRING, defaultValue: "{!soeMnkleyo lH},{............../........./......../............./... ...../.........../....../......./..../........../../.}"},
                            FORMAT: {type: Scratch.ArgumentType.MENU, menu: 'EncodingFormat', defaultValue: 'ShuffleHash'},
                        }
                    },
                    
                ],
                menus: {
                    EncodingFormat: {
                        acceptReporters: true,
                        items: ['ShuffleHash', 'ShuffleCrypt', 'CryptMoji', 'PressCypher']
                    }
                }
            }
        }
        EncoderReporter(args) {
            if (args.FORMAT === 'ShuffleHash') {
                return this.EncodeShuffleHash(args);
            } else if (args.FORMAT === 'ShuffleCrypt') {
                return this.EncodeShuffleCrypt(args);
            } else if (args.FORMAT === 'CryptMoji') {
                return this.EncodeCryptMoji(args);
            } else if (args.FORMAT === 'PressCypher') {
                return this.EncodePressCypher(args);
    }}
        DecoderReporter(args) {
            if (args.FORMAT === 'ShuffleHash') {
                return this.DecodeShuffleHash(args);
            } else if (args.FORMAT === 'ShuffleCrypt') {
                return this.DecodeShuffleCrypt(args);
            } else if (args.FORMAT === 'CryptMoji') {
                return this.DecodeCryptMoji(args);
            } else if (args.FORMAT === 'PressCypher') {
                return this.DecodePressCypher(args);
    }}

    // EVERYTHING here NEEDS to be OPTIMIZED OPAPELPALDOKJEJHJFNO

    // This is so sad with how much code is here
EncodeShuffleHash(args) {
    const text = args.TEXT;
    const indexedChars = text.split('').map((char, index) => ({
        char: char,
        originalIndex: index
    }));
    const shuffledArray = [...indexedChars];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    const shuffledString = shuffledArray.map(item => item.char).join('');
    let charCounter = 0;
    const words = text.split(' ');
    const encodedWords = words.map(word => {
        const letterDots = word.split('').map(() => {
            const targetIndex = charCounter++;
            const positionInShuffle = shuffledArray.findIndex(item => item.originalIndex === targetIndex);
            return ".".repeat(positionInShuffle + 1);
        }).join('/');
        charCounter++; // Move counter past the space
        return letterDots;
    }).join(' ');
    return `{${shuffledString}},{${encodedWords}}`;
}
DecodeShuffleHash(args) {
    const input = args.TEXT;
    const matches = input.match(/\{(.*?)\},\{(.*?)\}/);
    if (!matches) return "Invalid Format! Boo Hoo you monkey";
    const shuffledString = matches[1];
    const encodedMap = matches[2];
    // 2. Break the map down into words (separated by spaces)
    const decodedWords = encodedMap.split(' ').map(wordBlock => {  
        // 3. Break each word down into letters (separated by slashes)
        return wordBlock.split('/').map(dotSequence => {
            // The number of dots minus 1 gives us the index in the shuffled string
            const indexInShuffle = dotSequence.length - 1;
            // Grab the character at that specific position
            return shuffledString[indexInShuffle] || ''; 
        }).join(''); // Combine letters into a word      
    }).join(' '); // Combine words into the final sentence
    return decodedWords;
}
EncodeShuffleCrypt(args) {
    const text = args.TEXT;

    // Step 1: Extract non-space characters with their original indices
    const indexedChars = [];
    for (let i = 0; i < text.length; i++) {
        if (text[i] !== ' ') {
            indexedChars.push({ char: text[i], originalIndex: i });
        }
    }

    // Step 2: Fisher-Yates shuffle
    const shuffledArray = [...indexedChars];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    // Step 3: Encode each character
    const tokens = [];
    let prevWasSpace = false;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
            prevWasSpace = true;
            continue;
        }

        // Find this character's position in the shuffled array
        const positionInShuffle = shuffledArray.findIndex(
            item => item.originalIndex === i
        );

        // Dots = position + 1
        const dots = '.'.repeat(positionInShuffle + 1);

        // Last 2 hex digits of the unicode value of the shuffled char at that position
        const hexCode = shuffledArray[positionInShuffle].char
            .codePointAt(0)
            .toString(16)
            .toUpperCase()
            .slice(-2);

        const token = `${dots}${hexCode}`;

        if (prevWasSpace && tokens.length > 0) {
            tokens.push(`\\${token}`); // Word boundary
        } else {
            tokens.push(token);
        }

        prevWasSpace = false;
    }

    return `{${tokens.join('/')}}`;
}
DecodeShuffleCrypt(args) {
    const input = args.TEXT;
    // Step 1: Extract content from {}
    const match = input.match(/^\{(.*)\}$/);
    if (!match) return "Invalid Format! Boo Hoo you monkey";

    const content = match[1];

    // Step 2: Split on / to get all tokens, preserving \ word boundaries
    const rawTokens = content.split('/');

    // Step 3: Parse each token into { dots, hex, wordBreak }
    const parsedTokens = rawTokens.map(token => {
        const wordBreak = token.startsWith('\\');
        const clean = wordBreak ? token.slice(1) : token;
        const dotsMatch = clean.match(/^(\.*)([0-9A-Fa-f]{2})$/);
        if (!dotsMatch) return null;
        return {
            dots: dotsMatch[1].length,
            hex: dotsMatch[2],
            wordBreak
        };
    });

    if (parsedTokens.includes(null)) return "Invalid Format! Boo Hoo you monkey";

    // Step 4: Reconstruct shuffled string by placing chars at their shuffle positions
    const shuffledString = new Array(parsedTokens.length);
    for (let i = 0; i < parsedTokens.length; i++) {
    const { dots, hex } = parsedTokens[i];
    shuffledString[dots - 1] = String.fromCodePoint(parseInt(hex, 16));
}

    // Step 5: Use dot counts to index into shuffled string and rebuild text
    let result = '';
    for (let i = 0; i < parsedTokens.length; i++) {
        const { dots, wordBreak } = parsedTokens[i];
        if (wordBreak && i > 0) result += ' ';
        result += shuffledString[dots - 1];
    }

    return result;
}

splitEmojis(str) {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
        return [...segmenter.segment(str)].map(s => s.segment);
    }
    return [...str];
}

EncodeCryptMoji(args) {
    const CRYPTMOJI_EMOJIS = [
    '♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎',
    '🔯','✡️','☸️','☯️','✝️','☦️','🛐','🕉️',
    '⚡','🔱','⚜️','💠','🔷','🔶','🔹','🔸','▪️','▫️','◾','◽','◼','◻️',
    '🔲','🔳','⬛','⬜','🟥','🟧','🟨','🟩','🟦','🟪','🟫',
    '🔴','🟠','🟡','🟢','🔵','🟣','⚫','⚪','🔺','🔻','🔼','🔽',
    '⏺','⏹','⏸','⏯','⏭','⏮'
    ];
    const CRYPTMOJI_PLACEHOLDER = '🛑';
    const shuffleEncoded = btoa(String.fromCharCode(...new TextEncoder().encode(args.TEXT)));

    // Ref please put me down
    const digitStream = shuffleEncoded.split('').map(c =>
        c.charCodeAt(0).toString().padStart(3, '0')
    ).join('');
    const shuffledEmojis = [...CRYPTMOJI_EMOJIS].sort(() => Math.random() - 0.5);
    const key = shuffledEmojis.slice(0, 10);
    const payload = digitStream.split('').map(d => key[parseInt(d)]);
    while (payload.length % 10 !== 0) {
        payload.push(CRYPTMOJI_PLACEHOLDER);
    }
    const sectionSize = payload.length / 10;
    const result = [];
    for (let i = 0; i < 10; i++) {
        const section = payload.slice(i * sectionSize, (i + 1) * sectionSize);
        result.push(...section);
        result.push(key[i]);
    }
    return result.join('');
}

DecodeCryptMoji(args) {
    const CRYPTMOJI_EMOJIS = [
    '♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎',
    '🔯','✡️','☸️','☯️','✝️','☦️','🛐','🕉️',
    '⚡','🔱','⚜️','💠','🔷','🔶','🔹','🔸','▪️','▫️','◾','◽','◼','◻️',
    '🔲','🔳','⬛','⬜','🟥','🟧','🟨','🟩','🟦','🟪','🟫',
    '🔴','🟠','🟡','🟢','🔵','🟣','⚫','⚪','🔺','🔻','🔼','🔽',
    '⏺','⏹','⏸','⏯','⏭','⏮'
    ];
const CRYPTMOJI_PLACEHOLDER = '🛑';
    const emojiArray = this.splitEmojis(args.TEXT);
    const totalLength = emojiArray.length;

    // Probably should optimize this
    const paddedPayloadLength = totalLength - 10;
    const placeholderCount = emojiArray.filter(e => e === CRYPTMOJI_PLACEHOLDER).length;
    const realPayloadLength = paddedPayloadLength - placeholderCount;
    const sectionSize = Math.ceil(realPayloadLength / 10);
    const keyPositions = new Set();
    for (let k = 0; k < 10; k++) {
        keyPositions.add((k + 1) * sectionSize + k);
    }
    const keyEmojis = [];
    const payloadEmojis = [];
    for (let i = 0; i < emojiArray.length; i++) {
        if (keyPositions.has(i)) {
            keyEmojis.push(emojiArray[i]);
        } else if (emojiArray[i] !== CRYPTMOJI_PLACEHOLDER) {
            payloadEmojis.push(emojiArray[i]);
        }
    }
    const emojiToDigit = {};
    keyEmojis.forEach((emoji, digit) => {
        emojiToDigit[emoji] = digit.toString();
    });
    const digitStream = payloadEmojis.map(e =>
        emojiToDigit[e] !== undefined ? emojiToDigit[e] : '0'
    ).join('');
    const chars = [];
    for (let i = 0; i < digitStream.length; i += 3) {
        const code = parseInt(digitStream.slice(i, i + 3));
        chars.push(String.fromCharCode(code));
    }
   // What am I doing man
        return new TextDecoder().decode(new Uint8Array(atob(chars.join('')).split('').map(c => c.charCodeAt(0))));
}
lzCompress(input) {
    if (input == null) return '';
    let output = '', i, value, context_dictionary = {}, context_dictionaryToCreate = {},
        context_c = '', context_wc = '', context_w = '', context_enlargeIn = 2,
        context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0,
        context_data_position = 0, ii;
    for (ii = 0; ii < input.length; ii++) {
        context_c = input[ii];
        if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
            context_dictionary[context_c] = context_dictSize++;
            context_dictionaryToCreate[context_c] = true;
        }
        context_wc = context_w + context_c;
        if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
            context_w = context_wc;
        } else {
            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                if (context_w.charCodeAt(0) < 256) {
                    for (i = 0; i < context_numBits; i++) { context_data_val = (context_data_val << 1); if (context_data_position == 15) { context_data_position = 0; context_data.push(String.fromCharCode(context_data_val)); context_data_val = 0; } else { context_data_position++; } }
                    value = context_w.charCodeAt(0);
                    for (i = 0; i < 8; i++) { context_data_val = (context_data_val << 1) | (value & 1); if (context_data_position == 15) { context_data_position = 0; context_data.push(String.fromCharCode(context_data_val)); context_data_val = 0; } else { context_data_position++; } value = value >> 1; }
                } else {
                    value = 1;
                    for (i = 0; i < context_numBits; i++) { context_data_val = (context_data_val << 1) | value; if (context_data_position == 15) { context_data_position = 0; context_data.push(String.fromCharCode(context_data_val)); context_data_val = 0; } else { context_data_position++; } value = 0; }
                    value = context_w.charCodeAt(0);
                    for (i = 0; i < 16; i++) { context_data_val = (context_data_val << 1) | (value & 1); if (context_data_position == 15) { context_data_position = 0; context_data.push(String.fromCharCode(context_data_val)); context_data_val = 0; } else { context_data_position++; } value = value >> 1; }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) { context_enlargeIn = Math.pow(2, context_numBits); context_numBits++; }
                delete context_dictionaryToCreate[context_w];
            } else {
                value = context_dictionary[context_w];
                for (i = 0; i < context_numBits; i++) { context_data_val = (context_data_val << 1) | (value & 1); if (context_data_position == 15) { context_data_position = 0; context_data.push(String.fromCharCode(context_data_val)); context_data_val = 0; } else { context_data_position++; } value = value >> 1; }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) { context_enlargeIn = Math.pow(2, context_numBits); context_numBits++; }
            context_dictionary[context_wc] = context_dictSize++;
            context_w = String(context_c);
        }
    }
    if (context_w !== '') {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
            if (context_w.charCodeAt(0) < 256) {
                for (i = 0; i < context_numBits; i++) { context_data_val = (context_data_val << 1); if (context_data_position == 15) { context_data_position = 0; context_data.push(String.fromCharCode(context_data_val)); context_data_val = 0; } else { context_data_position++; } }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 8; i++) { context_data_val = (context_data_val << 1) | (value & 1); if (context_data_position == 15) { context_data_position = 0; context_data.push(String.fromCharCode(context_data_val)); context_data_val = 0; } else { context_data_position++; } value = value >> 1; }
            } else {
                value = 1;
                for (i = 0; i < context_numBits; i++) { context_data_val = (context_data_val << 1) | value; if (context_data_position == 15) { context_data_position = 0; context_data.push(String.fromCharCode(context_data_val)); context_data_val = 0; } else { context_data_position++; } value = 0; }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 16; i++) { context_data_val = (context_data_val << 1) | (value & 1); if (context_data_position == 15) { context_data_position = 0; context_data.push(String.fromCharCode(context_data_val)); context_data_val = 0; } else { context_data_position++; } value = value >> 1; }
            }
            delete context_dictionaryToCreate[context_w];
        } else {
            value = context_dictionary[context_w];
            for (i = 0; i < context_numBits; i++) { context_data_val = (context_data_val << 1) | (value & 1); if (context_data_position == 15) { context_data_position = 0; context_data.push(String.fromCharCode(context_data_val)); context_data_val = 0; } else { context_data_position++; } value = value >> 1; }
        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) { context_enlargeIn = Math.pow(2, context_numBits); context_numBits++; }
    }
    value = 2;
    for (i = 0; i < context_numBits; i++) { context_data_val = (context_data_val << 1) | (value & 1); if (context_data_position == 15) { context_data_position = 0; context_data.push(String.fromCharCode(context_data_val)); context_data_val = 0; } else { context_data_position++; } value = value >> 1; }
    while (true) { context_data_val = (context_data_val << 1); if (context_data_position == 15) { context_data.push(String.fromCharCode(context_data_val)); break; } else context_data_position++; }
    return context_data.join('');
}

lzDecompress(compressed) {
    if (compressed == null || compressed === '') return '';
    const dictionary = [], enlargeIn = [4], dictSize = [4], numBits = [3], entry = '';
    let result = '', w, c, next, bits, resb, maxpower, power,
        data = { val: compressed.charCodeAt(0), position: 32768, index: 1 };
    const getNextBits = (n) => {
        let bits = 0;
        maxpower = Math.pow(2, n);
        power = 1;
        while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) { data.position = 32768; data.val = compressed.charCodeAt(data.index++); }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
        }
        return bits;
    };
    for (let i = 0; i < 3; i++) dictionary[i] = i;
    bits = getNextBits(2);
    switch (next = bits) {
        case 0: c = String.fromCharCode(getNextBits(8)); break;
        case 1: c = String.fromCharCode(getNextBits(16)); break;
        case 2: return '';
    }
    dictionary[3] = c; w = c; result = c;
    while (true) {
        if (data.index > compressed.length) return '';
        bits = getNextBits(numBits[0]);
        switch (next = bits) {
            case 0:
                dictionary[dictSize[0]++] = String.fromCharCode(getNextBits(8));
                next = dictSize[0] - 1;
                enlargeIn[0]--;
                break;
            case 1:
                dictionary[dictSize[0]++] = String.fromCharCode(getNextBits(16));
                next = dictSize[0] - 1;
                enlargeIn[0]--;
                break;
            case 2: return result;
        }
        if (enlargeIn[0] == 0) { enlargeIn[0] = Math.pow(2, numBits[0]); numBits[0]++; }
        let entry;
        if (dictionary[next] !== undefined) { entry = dictionary[next]; }
        else if (next === dictSize[0]) { entry = w + w[0]; }
        else return '';
        result += entry;
        dictionary[dictSize[0]++] = w + entry[0];
        enlargeIn[0]--;
        if (enlargeIn[0] == 0) { enlargeIn[0] = Math.pow(2, numBits[0]); numBits[0]++; }
        w = entry;
    }
}

mulberry32(key) {
    return function () {
        key |= 0; key = key + 0x6D2B79F5 | 0;
        let t = Math.imul(key ^ key >>> 15, 1 | key);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

hashlemmonlime(lemmonlime) {
    let hash = 0;
    for (let i = 0; i < lemmonlime.length; i++) {
        hash = (Math.imul(31, hash) + lemmonlime.charCodeAt(i)) | 0;
    }
    return hash;
}

lemonmylimebaby(text, lemmonlime) {
    const rand = this.mulberry32(this.hashlemmonlime(lemmonlime));
    const arr = text.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

lemmonlimeedUnshuffle(text, lemmonlime) {
    const rand = this.mulberry32(this.hashlemmonlime(lemmonlime));
    const arr = text.split('');
    const swaps = [];
    for (let i = arr.length - 1; i > 0; i--) {
        swaps.push({ i, j: Math.floor(rand() * (i + 1)) });
    }
    for (let k = swaps.length - 1; k >= 0; k--) {
        const { i, j } = swaps[k];
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

EncodePressCypher(args) {
    const text = args.TEXT;
    const PRESS_FACTOR_TOKEN = { 32: 'A', 16: 'B', 8: 'C', 4: 'D', 2: 'E' };
        const PRESS_FACTOR_PARSE = { 'A': 32, 'B': 16, 'C': 8, 'D': 4, 'E': 2 };
    const PRESS_PLACEHOLDER = '\x01';
    // Hamburger helper
    let lemmonlime = '';
    for (let i = 0; i < 32; i++) lemmonlime += Math.floor(Math.random() * 10).toString();
    const shuffled = this.lemonmylimebaby(text, lemmonlime);
    const sectionOptions = [32, 16, 8, 4, 2];
    let bestSections = 32;
    let bestRemainder = Infinity;
    for (const n of sectionOptions) {
        const rem = shuffled.length % n;
        if (rem < bestRemainder) {
            bestRemainder = rem;
            bestSections = n;
        }
    }
    const factorToken = PRESS_FACTOR_TOKEN[bestSections];
    const lemmonlimeHamburgaHelper = 32 / bestSections;
    const textArr = shuffled.split('');
    while (textArr.length % bestSections !== 0) textArr.push(PRESS_PLACEHOLDER);
    const sectionSize = textArr.length / bestSections;

    let interleaved = '';
    for (let i = 0; i < bestSections; i++) {
        interleaved += textArr.slice(i * sectionSize, (i + 1) * sectionSize).join('');
        interleaved += lemmonlime.slice(i * lemmonlimeHamburgaHelper, (i + 1) * lemmonlimeHamburgaHelper);
    }
    return this.lzCompress(factorToken + interleaved);
}

DecodePressCypher(args) {
    const PRESS_FACTOR_TOKEN = { 32: 'A', 16: 'B', 8: 'C', 4: 'D', 2: 'E' };
    const PRESS_FACTOR_PARSE = { 'A': 32, 'B': 16, 'C': 8, 'D': 4, 'E': 2 };
    const PRESS_PLACEHOLDER = '\x01';
    const decompressed = this.lzDecompress(args.TEXT);
    if (!decompressed) return "Invalid Format! Boo Hoo you monkey";
    const factorToken = decompressed[0];
    const numSections = PRESS_FACTOR_PARSE[factorToken];
    if (!numSections) return "Invalid Format! Boo Hoo you monkey";
    const lemmonlimeHamburgaHelper = 32 / numSections;
    const body = decompressed.slice(1);
    const blockSize = body.length / numSections;
    const sectionSize = blockSize - lemmonlimeHamburgaHelper;
    let extractedlemmonlime = '';
    let extractedText = '';
    for (let i = 0; i < numSections; i++) {
        const block = body.slice(i * blockSize, (i + 1) * blockSize);
        extractedText += block.slice(0, sectionSize);
        extractedlemmonlime += block.slice(sectionSize);
    }
    const cleanText = extractedText.split('').filter(c => c !== PRESS_PLACEHOLDER).join('');
    // Unshuffle plEASSEEELPLPELPELPELP PLEWASAEW
    return this.lemmonlimeedUnshuffle(cleanText, extractedlemmonlime);
}
    }
    Scratch.extensions.register(new Extention());
}(Scratch));    