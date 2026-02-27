// 7thImpact's Charachter Editing Extention
/*
=================================
Dont get mad at me if it breaks get mad at javascript for being so hard
=================================
According to all known laws of aviation, there is no way that a bee should be able to fly. 
Its wings are too small to get its fat little body off the ground. 
The bee, of course, flies anyway because bees don't care what humans think is impossible.
=================================
*/
(function(Scratch) {
  'use strict';
  class Extension {
    getInfo() {
        return {
            id: "7thImpTextEditor",
            name: "Text Editor",
            color1: "#d89be5", 
            color2: "#b635c5",
            color3: "#d8d5de",
            docsURI: "https://discord.gg/cNK3kzmz3T",
            blocks: [
                {opcode: 'shoutReporter',
                    text: 'Shout [TEXT]',
                    blockType: Scratch.BlockType.REPORTER,
                    arguments: {
                        TEXT: {type: Scratch.ArgumentType.STRING, defaultValue: "I... I cant believe it man.."}
                    }
                },
                {opcode: 'whisperReporter',
                 text: 'Whisper [TEXT]',
                 blockType: Scratch.BlockType.REPORTER,
                 arguments: {
                    TEXT: {type: Scratch.ArgumentType.STRING, defaultValue: "MY GAMECUBE!"}
                 }},
                {opcode: 'CountInReporter',
                 text: 'Count [OBJECT] in [TEXT]',
                 blockType: Scratch.BlockType.REPORTER,
                 arguments: {
                    OBJECT: {type: Scratch.ArgumentType.STRING, defaultValue: " "},
                    TEXT: {type: Scratch.ArgumentType.STRING, defaultValue: "She... she took the kids and my gamecube."}
                 }},
                {opcode: 'Count_Scramble_Boolean',
                blockType: Scratch.BlockType.REPORTER,
                text: '[ACTION] [TYPE] in [TEXT]',
                arguments: {
                    TEXT: {type: Scratch.ArgumentType.STRING, defaultValue: "I'm... I'm so sorry to hear that"},
                    TYPE: {type: Scratch.ArgumentType.MENU, menu: 'CountScrambleShoutType', defaultValue: 'Letters'},
                    ACTION: {type: Scratch.ArgumentType.MENU, menu: 'CountScrambleShoutAction', defaultValue: 'Count'},
                } // RAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
                }, // I AM KRATOS, SON OF THAT ONE GUY
                {opcode: 'SortingBoolean',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Strip Special Chars? [STRIP] | Sort [SORTING] in [SORTSTYLE] with [TYPE] in [TEXT]',
                    arguments: {
                        SORTING: {type: Scratch.ArgumentType.MENU, menu: 'SortingMenu', defaultValue: 'Ascending'},
                        SORTSTYLE: {type: Scratch.ArgumentType.MENU, menu: 'SortStyleMenu', defaultValue: 'ASCII order'},
                        TYPE: {type: Scratch.ArgumentType.MENU, menu: 'CountScrambleShoutType', defaultValue: 'Letters'},
                        TEXT: {type: Scratch.ArgumentType.STRING, defaultValue: "I HAD SMASH BROS MELEE ON THERE"},
                        STRIP: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: false},
                    }
                },
                {opcode: 'caseBoolean',
                    text: '[TEXT] [CHOICE] a [CHOICE2] [WORD]?',
                    blockType: Scratch.BlockType.BOOLEAN,
                    arguments: {
                        TEXT: {type: Scratch.ArgumentType.STRING, defaultValue: "Do you KNOW how rare it is now?"},
                         WORD: {type: Scratch.ArgumentType.STRING, defaultValue: "Melee?"},
                         CHOICE: {type: Scratch.ArgumentType.MENU, menu: 'booleanChoices', defaultValue: 'Includes'},
                         CHOICE2: {type: Scratch.ArgumentType.MENU, menu: 'booleanChoices2', defaultValue: 'Case Sensitive'}
                        }
                   },
                {opcode: 'EncodeAndDecodeBoolean',
                blockType: Scratch.BlockType.REPORTER,
                text: '[CHOICE] text [TEXT]',
                arguments: {
                    TEXT: {type: Scratch.ArgumentType.STRING, defaultValue: "You seem more hurt over the gamecube than ya know..."},
                    CHOICE: {type: Scratch.ArgumentType.MENU, menu: 'ToEncodeOrNotToEncode', defaultValue: 'Encode'},
                }
            },
            {blockType: Scratch.BlockType.LABEL, 
                text: 'The encoder is kinda obvious.'},
                {blockType: Scratch.BlockType.LABEL,
                    text: ' If you wanna save with it,'},
                    {blockType: Scratch.BlockType.LABEL,
                        text: 'compress it to raw or Base64.'},
            ], menus: {
                booleanChoices: {
                    items: ['Includes', 'Equals']
                },
                ToEncodeOrNotToEncode: {
                    items: ['Encode', 'Decode']
                },
                CountScrambleShoutType: {
                    items: ['Letters', 'Words']
                },
                CountScrambleShoutAction: {
                    items: ['Count', 'Scramble',]
                },
                SortingMenu: {
                    items: ['Ascending', 'Descending']
                },
                SortStyleMenu: { // There is so much going on im deaduzz starting to forget what I'm doing
                    items: ['ASCII order', 'Pure Alphabet']
            }, 
                booleanChoices2: {
                    items: ['Case Sensitive', 'Case Insensitive']
                }
            
        }
    }
}
    shoutReporter(args) {
        return args.TEXT.toUpperCase();
    }
    CountInReporter(args) {
        const text = args.TEXT;
        const object = args.OBJECT;
        const regex = new RegExp(object, 'g');
        const matches = text.match(regex);
        return matches ? matches.length : 0;
    }
    whisperReporter(args) {
        return args.TEXT.toLowerCase();
    }
    SortLettersReporter(args) {
        return args.TEXT.split('').sort().join('');
    }
    SortWordsReporter(args) {
        return args.TEXT.split(' ').sort().join(' ');
    }
    ScrambleLettersReporter(args) {
        return args.TEXT.split('').sort(() => Math.random() - 0.5).join('');
    }
    ScrambleWordsReporter(args) {
        return args.TEXT.split(' ').sort(() => Math.random() - 0.5).join(' ');
} // REF DO SOMETHING. REFFFF
    caseBoolean(args) {
        const text = args.TEXT;
        const word = args.WORD;
        const choice = args.CHOICE;
        const caseSensitive = args.CHOICE2 === 'Case Sensitive';
        if (choice === 'Includes') {
            if (caseSensitive) {
                return text.includes(word);
            } else {
                return text.toLowerCase().includes(word.toLowerCase());
            }
        } else if (choice === 'Equals') {
            if (caseSensitive) {
                return text === word;
            } else {
                return text.toLowerCase() === word.toLowerCase();
            }
        }
    }
    CountLettersToArraysReporter(args) {
        // This block should count the amount of each letter and return all of them as an array. (Highkey had autofill make the code)
        // Formated like [{a: 3}, {b: 5}, {c: 0}]
        const text = args.TEXT.toLowerCase();
        const letterCounts = {};
        for (const char of text) {
            if (char >= 'a' && char <= 'z') {
                letterCounts[char] = (letterCounts[char] || 0) + 1;
            }
        }
        const result = Object.keys(letterCounts).map(k => ({ [k]: letterCounts[k] }));
        return JSON.stringify(result);
    }
    CountWordsToArraysReporter(args) {
            const text = args.TEXT.toLowerCase();
            const words = text.split(/\s+/);
            const wordCounts = {};
            for (const w of words) {
                const word = w.replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, '');
                if (!word) continue;
                wordCounts[word] = (wordCounts[word] || 0) + 1;
            }
            const result = Object.keys(wordCounts).map(k => ({ [k]: wordCounts[k] }));
            return JSON.stringify(result);
}
encodeTextReporter(args) {
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
    decodeTextReporter(args) {
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
    EncodeAndDecodeBoolean(args) {
        if (args.CHOICE === 'Encode') {
            return this.encodeTextReporter(args);
        } else if (args.CHOICE === 'Decode') {
            return this.decodeTextReporter(args);
        }
    }
    Count_Scramble_Boolean(args) {
        if (args.ACTION === 'Count') {
            if (args.TYPE === 'Letters') {
                return this.CountLettersToArraysReporter(args);
            } else if (args.TYPE === 'Words') {
                return this.CountWordsToArraysReporter(args);
            }
        } else if (args.ACTION === 'Scramble') {
            if (args.TYPE === 'Letters') {
                return this.ScrambleLettersReporter(args);
            } else if (args.TYPE === 'Words') {
                return this.ScrambleWordsReporter(args);
            }
    }
}
    SortingBoolean(args) {
        let text = args.TEXT;
        if (args.STRIP) {
            text = text.replace(/[^a-zA-Z0-9\s]/g, '');
        }
        if (args.TYPE === 'Letters') {
            if (args.SORTSTYLE === 'ASCII order') {
                text = text.split('').sort().join('');
            }
                else if (args.SORTSTYLE === 'Pure Alphabet') {
                    text = text.split('').sort((a, b) => a.localeCompare(b)).join('');
        }
    }
        else if (args.TYPE === 'Words') {
            if (args.SORTSTYLE === 'ASCII order') {
                text = text.split(' ').sort().join(' ');
            }
                else if (args.SORTSTYLE === 'Pure Alphabet') {
                    text = text.split(' ').sort((a, b) => a.localeCompare(b)).join(' ');
        }}
        if (args.SORTING === 'Ascending') {
            return text;
        } else if (args.SORTING === 'Descending') {
            return text.split('').reverse().join('');
        }
    }
}    
    Scratch.extensions.register(new Extension());
})(Scratch);

/*
Yo, why did I code this
and a good 55-70% was just autofill
like dude
anyway

If I could, begin to be
half of what you think of me
I could do about anything,
I could even learn how to love (duh do duh duh do)
when i see, the way you act
wondering when im coming back
I could do about anything
I could even learn how to love
like you.
love, like you
love me like you

i alawys thought i might be bad now i'm sure that it's true cause
i think you'reso good, and i'm nothing like you
look at you go, i just adore you, i wish that i knew
what makes you think im so special

if i could begin to do, half of what does right by you
i could do about anything, i could even learn how to love

when i see the way you act wondering when im coming back
i could do about anything, i could even learn how to love like you

NO AUTOFILL SUCKAS, PURE MEMORY

Steven Universe "Love Like You" Reprise Extended
*/