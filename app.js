// ? Task:


// Solution 1
//init speech

const synth = window.speechSynthesis;

//dom elements

const textSpeech = document.querySelector('#textSpeech');
const textStop = document.querySelector('#textStop');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
// const language = "ru-RU";
// const language = "en-GB";
//init voices array
let voices = [];

const getVoices = () => {

    voices = synth.getVoices();
   

//     const voicesList = () => voices
//         .map((voice, index) => {
//             return
//             voice.lang === LANG &&
//                 `<option value=${index}>${voice.name} (${voice.lang})<option>`
//         .join('')
// }
//     )
    // voiceSelect.innerHTML = voicesList
    
    voices.map((voice, index) => {
        // if ( voice.lang === language) {
          const option = document.createElement("option");
       
          option.textContent = `${voice.name}  ( ${voice.lang} ) `;
          option.setAttribute("data-lang", voice.lang);
          option.setAttribute("data-name", voice.name);
          voiceSelect.appendChild(option);
        })
    // });

};

getVoices();
if(synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = getVoices;

    }

    //speak
    const speak = () => {
        if(synth.speaking) {
            console.error('Already speaking...');
            return;
        }

        if(textInput.value !== '') {
            const speakText = new SpeechSynthesisUtterance(textInput.value);
            speakText.onend = e => {
                console.log('Done speaking...');
            }
            //speak error
            speakText.onerror = e => {
                console.log('something went wrong');
            }

            // selected voice
            const selectedVoice = voiceSelect.selectedOptions[0]
            .getAttribute('data-name');

            // loop through voices 
            voices.forEach(voice => {
                if(voice.name === selectedVoice) {
                    speakText.voice = voice;
                }
            });

           
            speakText.rate = rate.value;
            speakText.pitch = pitch.value;
            synth.speak(speakText);
        }

    };
     

    //text start speech
    textSpeech.addEventListener('click', e => {
        e.preventDefault();
        speak();
        textInput.blur();
    });
     //text stopspeech
        textStop.addEventListener('click', e => {
        e.preventDefault();
        synth.cancel();
        
        });

    //rate value change
    rate.addEventListener('change', e => (rateValue.textContent =
    rate.value))
    
    //pitch value change
    pitch.addEventListener('change', e => (pitchValue.textContent =
    pitch.value))

    //voice select change
    voiceSelect.addEventListener('change', e => speak ());


// ! Explanation: 
