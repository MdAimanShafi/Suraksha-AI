/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CategoryMetadata,
  InteractionLog,
  SafetyCategory,
  SafetyFAQ,
  SafetyInstruction,
  TrainingGapMetric,
} from '../types/safety';

export const SAFETY_CATEGORIES: CategoryMetadata[] = [
  {
    id: 'helmet',
    code: 'SEC-PPE-01',
    names: {
      en: 'Helmet & PPE Safety',
      hi: 'हेलमेट और पीपीई सुरक्षा',
      ta: 'தலைக்கவசம் மற்றும் பிபிஇ பாதுகாப்பு',
    },
    subtitles: {
      en: 'Mandatory head, eye, ear, and foot protection standards',
      hi: 'अनिवार्य सिर, आँख, कान और पैर सुरक्षा नियम',
      ta: 'கட்டாய தலை, கண், காது மற்றும் கால் பாதுகாப்பு நெறிமுறைகள்',
    },
    color: 'border-amber-500 text-amber-400',
    accentBg: 'bg-amber-500/10',
    iconName: 'HardHat',
    standard: 'IS 2925 / EN 397',
  },
  {
    id: 'fire',
    code: 'SEC-FIR-02',
    names: {
      en: 'Fire Safety & PASS Protocol',
      hi: 'अग्नि सुरक्षा और पास (PASS) नियम',
      ta: 'தீ பாதுகாப்பு & பாஸ் (PASS) முறை',
    },
    subtitles: {
      en: 'Extinguisher classes, hot work precautions, and evacuation',
      hi: 'अग्निशामक प्रकार, गर्म कार्य सावधानियां और निकास मार्ग',
      ta: 'தீயணைப்பான் வகைகள், சூடான வேலை முன்னெச்சரிக்கைகள்',
    },
    color: 'border-orange-500 text-orange-400',
    accentBg: 'bg-orange-500/10',
    iconName: 'Flame',
    standard: 'NFPA 10 / IS 2190',
  },
  {
    id: 'machine',
    code: 'SEC-MAC-03',
    names: {
      en: 'Machine Safety & LOTO',
      hi: 'मशीन सुरक्षा और लोटो (LOTO) प्रक्रिया',
      ta: 'இயந்திர பாதுகாப்பு மற்றும் லோட்டோ (LOTO)',
    },
    subtitles: {
      en: 'Lockout/Tagout, machine interlocks, and pinch point safety',
      hi: 'तालाबंदी/टैगिंग, सुरक्षा गार्ड और आपातकालीन स्टॉप',
      ta: 'பூட்டுதல்/டேக் செய்தல், பாதுகாப்பு காவல்கள், அவசர நிறுத்தம்',
    },
    color: 'border-blue-500 text-blue-400',
    accentBg: 'bg-blue-500/10',
    iconName: 'Cog',
    standard: 'OSHA 1910.147 / IS 5216',
  },
  {
    id: 'electrical',
    code: 'SEC-ELE-04',
    names: {
      en: 'Electrical Safety',
      hi: 'विद्युत एवं हाई-वोल्टेज सुरक्षा',
      ta: 'மின் பாதுகாப்பு மற்றும் உயர் மின்னழுத்தம்',
    },
    subtitles: {
      en: 'Arc flash protection, grounding checks, and live circuit rules',
      hi: 'आर्क फ्लैश सुरक्षा, अर्थिंग जांच और लाइव वायर नियम',
      ta: 'ஆர்க் ஃபிளாஷ் பாதுகாப்பு, பூமி தரை இணைப்பு மற்றும் நேரடி கம்பி',
    },
    color: 'border-yellow-500 text-yellow-400',
    accentBg: 'bg-yellow-500/10',
    iconName: 'Zap',
    standard: 'IS 732 / NFPA 70E',
  },
  {
    id: 'emergency',
    code: 'SEC-EMG-05',
    names: {
      en: 'Emergency & First Aid',
      hi: 'आपातकालीन और प्राथमिक उपचार',
      ta: 'அவசர நெறிமுறைகள் மற்றும் முதலுதவி',
    },
    subtitles: {
      en: 'Electric shock response, chemical eye flush, CPR, and plant SOS',
      hi: 'करंट लगने पर बचाव, केमिकल आई वॉश, सीपीआर और इमरजेंसी कॉल',
      ta: 'மின் அதிர்ச்சி மீட்பு, ரசாயன கண் கழுவுதல், சிபிஆர் மற்றும் அவசர உதவி',
    },
    color: 'border-red-500 text-red-400',
    accentBg: 'bg-red-500/10',
    iconName: 'AlertOctagon',
    standard: 'Factories Act 1948 / ISO 45001',
  },
];

export const SAFETY_INSTRUCTIONS: Record<SafetyCategory, SafetyInstruction> = {
  helmet: {
    id: 'inst-ppe-01',
    categoryId: 'helmet',
    standardCode: 'IS 2925 : 1984 & EN 397',
    title: {
      en: 'Industrial Safety Helmet & PPE Protocol',
      hi: 'औद्योगिक सुरक्षा हेलमेट और पीपीई प्रोटोकॉल',
      ta: 'தொழில்துறை பாதுகாப்பு தலைக்கவசம் மற்றும் பிபிஇ நடைமுறை',
    },
    subtitle: {
      en: 'Pre-shift inspection and certified fitting procedure',
      hi: 'काम शुरू करने से पहले हेलमेट और पीपीई की जांच विधि',
      ta: 'பணிக்கு முன் தலைக்கவசம் மற்றும் பிபிஇ ஆய்வு நடைமுறை',
    },
    overview: {
      en: 'A cracked or ill-fitting helmet cannot absorb ballistic or falling object energy. You must inspect shell integrity, harness suspension, and chin strap tension prior to every shift.',
      hi: 'टूटा हुआ या ढीला हेलमेट गिरने वाली वस्तु से आपकी जान नहीं बचा सकता। हर शिफ्ट से पहले हेलमेट की शेल, हार्नेस सस्पेंशन और चिन-स्ट्रैप की जांच अनिवार्य है।',
      ta: 'விரிசல் விழுந்த அல்லது தளர்வான தலைக்கவசம் விழும் பொருட்களிலிருந்து உங்களைப் பாதுகாக்க முடியாது. ஒவ்வொரு ஷிப்டுக்கு முன்பும் ஆய்வு செய்வது கட்டாயம்.',
    },
    audioSummary: {
      en: 'Attention worker: Before entering the plant floor, put on your IS 2925 certified helmet. Fasten the chin strap tightly until only one finger fits underneath. Wear steel-toe safety shoes, high visibility vest, and protective eyewear. Do not paint or put metal stickers on your helmet shell.',
      hi: 'सावधान कार्यकर्ता: प्लांट में प्रवेश करने से पहले प्रमाणित सुरक्षा हेलमेट पहनें। चिन स्ट्रैप को इतना कसें कि नीचे केवल एक उंगली जा सके। स्टील-टो जूते और हाई-विजिबिलिटी जैकेट जरूर पहनें। हेलमेट पर पेंट या धातु के स्टिकर न लगाएं।',
      ta: 'கவனிக்கவும்: தொழிற்சாலைக்குள் நுழைவதற்கு முன் சான்றளிக்கப்பட்ட தலைக்கவசத்தை அணியவும். கன்னப் பட்டையை இறுக்கமாக கட்டவும். பாதுகாப்பு காலணிகள் மற்றும் பாதுகாப்பு கண்ணாடிகளை அணியவும்.',
    },
    severity: 'critical',
    steps: [
      {
        stepNumber: 1,
        title: {
          en: 'Shell & Suspension Crack Inspection',
          hi: 'शेल और सस्पेंशन की दरार जांच',
          ta: 'வெளிப்புற ஓடு மற்றும் உள் பட்டைகளின் விரிசல் ஆய்வு',
        },
        description: {
          en: 'Squeeze the helmet shell gently. Inspect for hairline fractures, UV chalking, discoloration, or chemical erosion. Ensure suspension cradle is locked into all 4 or 6 anchor slots.',
          hi: 'हेलमेट शेल को हल्का दबाकर देखें। कोई दरार, रंग उड़ना या केमिकल का दाग न हो। 4 या 6 प्वाइंट सस्पेंशन खांचे में सही बैठा होना चाहिए।',
          ta: 'தலைக்கவசத்தை மெதுவாக அழுத்தி விரிசல்கள் அல்லது இரசாயன பாதிப்புகள் உள்ளதா என பார்க்கவும்.',
        },
        audioPrompt: {
          en: 'Step one: Inspect helmet shell and internal suspension clips for cracks or loose anchors.',
          hi: 'कदम एक: हेलमेट की ऊपरी परत और अंदरूनी क्लिप में कोई दरार या खराबी की जांच करें।',
          ta: 'படி ஒன்று: தலைக்கவசத்தில் விரிசல்கள் அல்லது சேதங்களை பரிசோதிக்கவும்.',
        },
        isMandatory: true,
      },
      {
        stepNumber: 2,
        title: {
          en: 'Chin Strap Fitment & 1-Finger Tension Rule',
          hi: 'चिन स्ट्रैप फिटिंग और एक उंगली का नियम',
          ta: 'கன்னப் பட்டை பொருத்தம் மற்றும் ஒரு விரல் இடைவெளி விதி',
        },
        description: {
          en: 'Fasten the chin strap buckle securely. Adjust the slider until snug: you should be able to slide exactly one finger between your chin and the webbing. Head nod test: shake head downwards, helmet must not wobble.',
          hi: 'चिन स्ट्रैप का बकल बंद करें। पट्टा इतना कसा होना चाहिए कि आपकी ठुड्डी और पट्टे के बीच केवल एक उंगली का अंतर रहे। सिर हिलाकर देखें कि हेलमेट हिल तो नहीं रहा।',
          ta: 'கன்னப் பட்டையை பூட்டவும். தாடைக்கும் பட்டைக்கும் இடையில் ஒரு விரல் மட்டுமே நுழையும் அளவுக்கு இறுக்கமாக வைக்கவும்.',
        },
        audioPrompt: {
          en: 'Step two: Buckle the chin strap tightly. Ensure only one finger fits between your chin and the strap.',
          hi: 'कदम दो: चिन स्ट्रैप बांधें। ठुड्डी और फीते के बीच केवल एक उंगली की जगह होनी चाहिए।',
          ta: 'படி இரண்டு: கன்னப் பட்டையை உறுதியாக கட்டவும். ஒரு விரல் இடைவெளி மட்டுமே இருக்க வேண்டும்.',
        },
        isMandatory: true,
      },
      {
        stepNumber: 3,
        title: {
          en: 'Eye & Ear Protection Integration',
          hi: 'आंख और कान सुरक्षा (गॉगल्स व ईयरप्लग)',
          ta: 'கண் மற்றும் காது பாதுகாப்பு உபகரணங்கள்',
        },
        description: {
          en: 'For grinding, metal chipping or CNC zones, slip on ANSI Z87.1 safety glasses with side shields over the helmet brow. Wear 25+ dB noise reduction earplugs in high decibel zones.',
          hi: 'ग्राइंडिंग या कटिंग एरिया में हेलमेट के साथ सेफ्टी गॉगल्स और शोर वाले क्षेत्रों में ईयर प्लग पहनें।',
          ta: 'உராய்வு அல்லது கட்டிங் பகுதிகளில் பாதுகாப்பு கண்ணாடி மற்றும் சத்தம் அதிகம் உள்ள இடங்களில் இயர்பிளக் அணியவும்.',
        },
        audioPrompt: {
          en: 'Step three: Wear approved eye goggles and earplugs in cutting and noisy plant sectors.',
          hi: 'कदम तीन: कटिंग और शोर वाले क्षेत्रों में सेफ्टी गॉगल और ईयरप्लग जरूर पहनें।',
          ta: 'படி மூன்று: அதிக சத்தம் உள்ள இடங்களில் கண் கண்ணாடி மற்றும் இயர்பிளக் அணியவும்.',
        },
        isMandatory: true,
      },
      {
        stepNumber: 4,
        title: {
          en: 'Footwear & High-Vis Vest Verification',
          hi: 'सेफ्टी जूते और रिफ्लेक्टिव जैकेट जांच',
          ta: 'பாதுகாப்பு காலணி மற்றும் ஒளிரும் அங்கி சரிபார்த்தல்',
        },
        description: {
          en: 'Ensure steel toe cap shoes (IS 15298) are properly tied with anti-puncture sole. Put on Class 2 fluorescent orange or yellow reflective vest.',
          hi: 'स्टील टो वाले सुरक्षा जूते पहनें और फीता बांधें। फ्लोरोसेंट रिफ्लेक्टिव जैकेट पहनना अनिवार्य है।',
          ta: 'எஃகு முனை கொண்ட பாதுகாப்பு காலணிகளை அணிந்து, ஒளிரும் பாதுகாப்பு அங்கியை அணியுங்கள்.',
        },
        audioPrompt: {
          en: 'Step four: Confirm steel toe shoes are laced and reflective vest is zipped.',
          hi: 'कदम चार: पुष्टि करें कि स्टील टो जूते बंधे हैं और रिफ्लेक्टिव जैकेट पहनी है।',
          ta: 'படி நான்கு: எஃகு முனை காலணிகள் மற்றும் பாதுகாப்பு அங்கி அணிந்துள்ளதை உறுதிப்படுத்தவும்.',
        },
        isMandatory: true,
      },
    ],
    dos: {
      en: [
        'Replace helmet immediately if it suffered any impact, even if cracks are not visible',
        'Store in cool, dry locker away from direct sunlight and solvents',
        'Wash shell and sweatband with mild soap and lukewarm water only',
      ],
      hi: [
        'यदि हेलमेट पर कोई भारी वस्तु गिरी हो, तो बिना दरार दिखे भी उसे तुरंत बदलें',
        'हेलमेट को तेज धूप और केमिकल से दूर साफ सूखी अलमारी में रखें',
        'हेलमेट को केवल हल्के साबुन और सादे पानी से साफ करें',
      ],
      ta: [
        'ஏதேனும் பலமான அடி விழுந்தால், வெளிப்புற சேதம் தெரியாவிட்டாலும் தலைக்கவசத்தை மாற்றவும்',
        'நேரடி சூரிய ஒளி மற்றும் ரசாயனங்கள் படாதவாறு பாதுகாப்பாக வைக்கவும்',
        'லேசான சோப்பு மற்றும் நீரினால் மட்டுமே சுத்தம் செய்யவும்',
      ],
    },
    donts: {
      en: [
        'Never drill holes in the helmet shell for ventilation',
        'Do not apply paint, solvent markers, or metal stickers (they degrade polymers)',
        'Never carry small parts, tools, or mobile phones inside helmet crown',
      ],
      hi: [
        'हवा के लिए हेलमेट में कभी छेद न करें',
        'हेलमेट पर कभी पेंट, मार्कर या मेटल स्टिकर न लगाएं (प्लास्टिक कमजोर होता है)',
        'हेलमेट के अंदर कभी मोबाइल फोन, नट-बोल्ट या सिगरेट न रखें',
      ],
      ta: [
        'காற்றோட்டத்திற்காக தலைக்கவசத்தில் ஒருபோதும் துளையிட வேண்டாம்',
        'தலைக்கவசத்தின் மீது பெயிண்ட் அல்லது திரவங்களை பூச வேண்டாம்',
        'தலைக்கவசத்திற்குள் செல்போன் அல்லது பொருட்களை வைக்க வேண்டாம்',
      ],
    },
    requiredPpe: {
      en: ['IS 2925 Hard Hat', 'ANSI Z87 Safety Goggles', 'IS 15298 Steel Toe Boots', 'Class 2 High-Vis Vest'],
      hi: ['IS 2925 सुरक्षा हेलमेट', 'ANSI Z87 सुरक्षा चश्मा', 'स्टील-टो बूट्स', 'हाई-विज वेस्ट'],
      ta: ['IS 2925 தலைக்கவசம்', 'பாதுகாப்பு கண்ணாடி', 'எஃகு முனை காலணிகள்', 'ஒளிரும் அங்கி'],
    },
  },

  fire: {
    id: 'inst-fire-02',
    categoryId: 'fire',
    standardCode: 'NFPA 10 & IS 2190',
    title: {
      en: 'Factory Fire Safety & The PASS Method',
      hi: 'फैक्ट्री अग्नि सुरक्षा और पास (PASS) तरीका',
      ta: 'தொழிற்சாலை தீ பாதுகாப்பு மற்றும் பாஸ் (PASS) முறை',
    },
    subtitle: {
      en: 'Extinguisher classification and four-step fire suppression',
      hi: 'अग्निशामक के प्रकार और आग बुझाने की चार चरण विधि',
      ta: 'தீயணைப்பான் வகைகள் மற்றும் நான்கு படி தீயணைப்பு முறை',
    },
    overview: {
      en: 'Industrial fires spread in seconds. Remember PASS: Pull the pin, Aim low at the base of fire, Squeeze the lever, Sweep side to side. Never use water on electrical or oil fires.',
      hi: 'फैक्ट्री की आग कुछ ही सेकंड में फैलती है। पास (PASS) याद रखें: पिन खींचें, आग की जड़ में निशाना लगाएं, लीवर दबाएं, और बाएं से दाएं छिड़कें। बिजली या तेल की आग पर कभी पानी न डालें।',
      ta: 'தீ விபத்து சில நொடிகளில் பரவும். பாஸ் (PASS) முறையை நினைவில் வையுங்கள்: பின்னை இழுக்கவும், தீயின் அடிப்பகுதியில் குறிவைக்கவும், நெம்புகோலை அழுத்தவும், பக்கவாட்டில் வீசவும்.',
    },
    audioSummary: {
      en: 'Fire emergency alert: If fire breaks out, sound the nearest manual call point. Remember the PASS method: P - Pull the safety pin. A - Aim low at the base of the fire, not the flames. S - Squeeze the discharge lever steadily. S - Sweep side to side 6 to 8 feet away. For electrical fires, use only CO2 or Dry Chemical Powder. Never use water.',
      hi: 'आग आपातकालीन निर्देश: आग दिखने पर तुरंत लाल अलार्म बटन दबाएं। पास (PASS) नियम अपनाएं: P - सेफ्टी पिन खींचें। A - लपटों पर नहीं, आग की जड़ पर निशाना लगाएं। S - हैंडल को दबाएं। S - 6 से 8 फीट दूर रहकर बाएं से दाएं छिड़कें। बिजली की आग पर केवल CO2 या पाउडर वाला सिलेंडर इस्तेमाल करें। पानी कभी न डालें।',
      ta: 'தீ அவசர எச்சரிக்கை: தீ கண்டால் உடனே அலாரத்தை அழுத்தவும். பாஸ் (PASS) முறையை பின்பற்றவும்: பின்னை இழுக்கவும், தீயின் அடிப்பகுதியில் குறிவைக்கவும், பிடியை அழுத்தவும், பக்கவாட்டில் தெளிக்கவும். மின் தீக்கு ஒருபோதும் தண்ணீர் பயன்படுத்த வேண்டாம்.',
    },
    severity: 'critical',
    steps: [
      {
        stepNumber: 1,
        title: {
          en: 'P – Pull the Safety Pin',
          hi: 'P – सुरक्षा पिन खींचें',
          ta: 'P – பாதுகாப்பு பின்னை இழுக்கவும்',
        },
        description: {
          en: 'Break the plastic tamper seal by twisting the safety pull-ring and pulling it straight out. This unblocks the discharge lever mechanism.',
          hi: 'प्लास्टिक सील को घुमाकर तोड़ें और मेटल पिन को सीधा बाहर खींचें। इससे हैंडल अनलॉक हो जाएगा।',
          ta: 'பாதுகாப்பு முத்திரையை உடைத்து பின்னை வெளியே இழுக்கவும். இது நெம்புகோலை இயக்கும்.',
        },
        audioPrompt: {
          en: 'Step one: Pull the safety pin to break the tamper seal.',
          hi: 'कदम एक: सेफ्टी पिन को खींचकर सील तोड़ें।',
          ta: 'படி ஒன்று: முத்திரையை உடைக்க பாதுகாப்பு பின்னை இழுக்கவும்.',
        },
        isMandatory: true,
      },
      {
        stepNumber: 2,
        title: {
          en: 'A – Aim Low at the Base of the Flames',
          hi: 'A – लपटों पर नहीं, आग की जड़ पर निशाना लगाएं',
          ta: 'A – தீயின் அடிப்பகுதியில் குறிவைக்கவும்',
        },
        description: {
          en: 'Hold nozzle firmly with your leading hand. Stand 2 to 3 meters (6-8 ft) back. Aim directly at the burning fuel source at ground level, not up into the smoke or flying flames.',
          hi: 'नोजल को आगे वाले हाथ से मजबूती से पकड़ें। 2 से 3 मीटर दूर खड़े होकर धुएं पर नहीं, नीचे जलने वाले सामान पर निशाना लगाएं।',
          ta: 'தீயணைப்பானின் குழாயை பிடித்து 2-3 மீட்டர் தூரத்திலிருந்து தீயின் அடிப்பகுதியில் குறிவைக்கவும்.',
        },
        audioPrompt: {
          en: 'Step two: Aim the nozzle low at the base of the burning material.',
          hi: 'कदम दो: नोजल को आग की लपटों पर नहीं, नीचे जलती हुई वस्तु पर टिकाएं।',
          ta: 'படி இரண்டு: எரியும் பொருளின் அடிப்பகுதியில் குறிவைக்கவும்.',
        },
        isMandatory: true,
      },
      {
        stepNumber: 3,
        title: {
          en: 'S – Squeeze the Operating Lever',
          hi: 'S – ऑपरेटिंग लीवर को दबाएं',
          ta: 'S – நெம்புகோலை அழுத்தவும்',
        },
        description: {
          en: 'Press the upper discharge handle down smoothly and continuously. Keep a firm grip to control the discharge recoil.',
          hi: 'ऊपर वाले हैंडल को मजबूती से दबाएं ताकि पाउडर या गैस बाहर निकल सके।',
          ta: 'தீயணைப்பு வாயு வெளியேற நெம்புகோலை சீராக அழுத்தவும்.',
        },
        audioPrompt: {
          en: 'Step three: Squeeze the lever smoothly to discharge the fire extinguishing agent.',
          hi: 'कदम तीन: केमिकल छिड़कने के लिए हैंडल को पूरा दबाएं।',
          ta: 'படி மூன்று: நெம்புகோலை அழுத்தி தீயணைப்பு மருந்தை செலுத்தவும்.',
        },
        isMandatory: true,
      },
      {
        stepNumber: 4,
        title: {
          en: 'S – Sweep from Side to Side',
          hi: 'S – बाएं से दाएं लगातार घुमाएं',
          ta: 'S – பக்கவாட்டில் அசைத்து தெளிக்கவும்',
        },
        description: {
          en: 'Move the nozzle back and forth across the entire base of the fire until all glowing embers are blanketed. Back away slowly while watching for re-ignition.',
          hi: 'नोजल को झाड़ू की तरह बाएं से दाएं घुमाते रहें जब तक कि आग पूरी तरह बुझ न जाए। पीछे हटते समय भी आग पर नजर रखें।',
          ta: 'தீ முழுமையாக அணையும் வரை குழாயை இருபுறமும் அசைத்து தெளிக்கவும்.',
        },
        audioPrompt: {
          en: 'Step four: Sweep side to side until fire is fully extinguished. Never turn your back on the fire.',
          hi: 'कदम चार: आग पूरी बुझने तक दोनों तरफ घुमाएं। कभी भी आग की तरफ पीठ न करें।',
          ta: 'படி நான்கு: தீ அணையும் வரை பக்கவாட்டில் தெளிக்கவும். தீயை விட்டு உடனே திரும்ப வேண்டாம்.',
        },
        isMandatory: true,
      },
    ],
    dos: {
      en: [
        'Always keep an unblocked escape exit at your back before fighting any fire',
        'Sound the building fire alarm before attempting to use an extinguisher',
        'Use CO2 or Dry Chemical (ABC Powder) for electrical panels and motor rooms',
      ],
      hi: [
        'आग बुझाते समय हमेशा सुनिश्चित करें कि आपके पीछे भागने का रास्ता खुला हो',
        'सिलेंडर उठाने से पहले नजदीकी लाल फायर अलार्म का बटन दबाएं',
        'बिजली के पैनल और मोटर के लिए केवल CO2 या ABC पाउडर सिलेंडर का उपयोग करें',
      ],
      ta: [
        'தீயை அணைக்கும் முன் உங்களுக்கு பின்னால் வெளியேறும் வழி தெளிவாக இருப்பதை உறுதி செய்யவும்',
        'தீயணைப்பானை எடுக்கும் முன் தீ அலாரத்தை இயக்கவும்',
        'மின் சாதனங்களுக்கு CO2 அல்லது உலர் வேதியியல் பொடியை மட்டுமே பயன்படுத்தவும்',
      ],
    },
    donts: {
      en: [
        'Never use Water on live electrical boards, grease fryers, or solvent drums',
        'Never fight a fire that is taller than you or spreading rapidly—evacuate immediately',
        'Never block fire doors or emergency extinguisher cabinets with pallets',
      ],
      hi: [
        'बिजली के तार, ट्रांसफार्मर या तेल की आग पर कभी पानी न डालें (करंट लग सकता है)',
        'यदि आग आपके कद से बड़ी हो या तेजी से फैल रही हो, तो बुझाने की कोशिश न करें, तुरंत बाहर भागें',
        'फायर सिलेंडर या इमरजेंसी गेट के आगे कभी सामान या कार्टन न रखें',
      ],
      ta: [
        'மின் சாதனங்கள் அல்லது எண்ணெய் தீ மீது ஒருபோதும் தண்ணீர் ஊற்ற வேண்டாம்',
        'தீ பெரிதாக பரவினால் அணைக்க முயற்சிக்காமல் உடனடியாக வெளியேறவும்',
        'தீயணைப்பு உபகரணங்களின் முன் பொருட்களை அடுக்கி வைக்க வேண்டாம்',
      ],
    },
    requiredPpe: {
      en: ['Heat Resistant Gloves', 'Face Shield', 'Emergency Smoke Hood', 'Fire Suit (Emergency Team)'],
      hi: ['हीट रेजिस्टेंट दस्ताने', 'फेस शील्ड', 'इमरजेंसी स्मोक हुड'],
      ta: ['வெப்ப பாதுகாப்பு கையுறைகள்', 'முகக் கவசம்', 'புகை பாதுகாப்பு உறை'],
    },
  },

  machine: {
    id: 'inst-mac-03',
    categoryId: 'machine',
    standardCode: 'OSHA 1910.147 & IS 5216',
    title: {
      en: 'Machine Safety & 6-Step LOTO (Lockout/Tagout)',
      hi: 'मशीन सुरक्षा और 6-चरण लोटो (LOTO) प्रक्रिया',
      ta: 'இயந்திர பாதுகாப்பு மற்றும் 6 படி லோட்டோ முறை',
    },
    subtitle: {
      en: 'Zero mechanical, hydraulic, pneumatic, and electrical energy isolation',
      hi: 'शून्य ऊर्जा स्थिति: ताला लगाना, टैग लगाना और ऊर्जा मुक्त करना',
      ta: 'பூஜ்ஜிய ஆற்றல் உறுதிப்படுத்தல் மற்றும் பாதுகாப்பு பராமரிப்பு',
    },
    overview: {
      en: 'Never insert hands into machine operating zones without verified LOTO. Follow 6 steps: Notify operators, Shut down machine, Isolate power, Apply personal padlock and danger tag, Dissipate stored hydraulic/spring pressure, Verify zero energy.',
      hi: 'बिना लोटो (LOTO) किए कभी भी मशीन के अंदर हाथ न डालें। 6 चरण याद रखें: ऑपरेटर को सूचना दें, मशीन बंद करें, मुख्य बिजली काटें, अपना निजी ताला और लाल टैग लगाएं, बची हुई ऊर्जा निकालें, और टेस्ट बटन दबाकर शून्य ऊर्जा जांचें।',
      ta: 'லோட்டோ செய்யாமல் இயங்கும் இயந்திரத்திற்குள் கைகளை வைக்க வேண்டாம். 6 படிகளை கண்டிப்பாக பின்பற்றவும்: தகவல் தெரிவித்தல், நிறுத்துதல், பிரித்தல், பூட்டு மற்றும் டேக் போடுதல், எஞ்சிய அழுத்தத்தை நீக்குதல், உறுதி செய்தல்.',
    },
    audioSummary: {
      en: 'Machine maintenance rule: Before clearing jams or doing maintenance, perform Lockout Tagout. Cut the main isolator switch. Put on your red personal padlock and danger tag. Bleed hydraulic and air pressure. Press start button to confirm zero energy. Never bypass machine interlocks or safety light curtains.',
      hi: 'मशीन रखरखाव नियम: मशीन की सफाई या खराबी ठीक करने से पहले लोटो अवश्य करें। मुख्य पावर स्विच बंद करें। अपना निजी लाल ताला और खतरे का टैग लगाएं। एयर और हाइड्रोलिक प्रेशर को रिलीज करें। स्टार्ट बटन दबाकर चेक करें कि मशीन चालू नहीं हो रही। कभी भी सेफ्टी सेंसर या गार्ड को बायपास न करें।',
      ta: 'இயந்திர பராமரிப்பு விதி: இயந்திரத்தை பழுதுபார்க்கும் முன் லோட்டோ நடைமுறையை முடிக்கவும். முக்கிய சுவிட்சை ஆஃப் செய்து தனிப்பட்ட பூட்டு மற்றும் சிவப்பு டேக் போடவும். காற்று மற்றும் ஹைட்ராலிக் அழுத்தத்தை வெளியேற்றி பூஜ்ஜிய ஆற்றலை சரிபார்க்கவும்.',
    },
    severity: 'critical',
    steps: [
      {
        stepNumber: 1,
        title: {
          en: 'Notify Affected Plant Operators',
          hi: 'संबंधित ऑपरेटरों और सुपरवाइजर को सूचित करें',
          ta: 'இயந்திர இயக்குனர்கள் மற்றும் மேற்பார்வையாளருக்கு தகவல் தெரிவிக்கவும்',
        },
        description: {
          en: 'Inform all machine crew, upstream feeder operators, and floor supervisor that equipment is going into maintenance shutdown.',
          hi: 'मशीन पर काम करने वाले सभी साथियों और सुपरवाइजर को बताएं कि मशीन बंद की जा रही है।',
          ta: 'பராமரிப்பு பணிக்காக இயந்திரம் நிறுத்தப்படுவதை அனைத்து பணியாளர்களுக்கும் தெரிவிக்கவும்.',
        },
        audioPrompt: {
          en: 'Step one: Notify all workers and line supervisor of impending equipment lockout.',
          hi: 'कदम एक: सभी साथी कर्मियों और सुपरवाइजर को लोटो शटडाउन की सूचना दें।',
          ta: 'படி ஒன்று: லோட்டோ பணி குறித்து அருகிலுள்ள பணியாளர்களுக்கு தெரிவிக்கவும்.',
        },
        isMandatory: true,
      },
      {
        stepNumber: 2,
        title: {
          en: 'Normal Machine Shutdown',
          hi: 'सामान्य तरीके से मशीन बंद करें',
          ta: 'சாதாரண முறையில் இயந்திரத்தை நிறுத்தவும்',
        },
        description: {
          en: 'Use standard operator interface stop button. Wait for all spindles, flywheel, rollers, and conveyors to come to a dead halt.',
          hi: 'कंट्रोल पैनल के स्टॉप बटन से मशीन बंद करें। सभी रोलर, कटर और पहियों के पूरी तरह रुकने का इंतजार करें।',
          ta: 'கட்டுப்பாட்டு பலகையின் ஸ்டாப் பட்டனை அழுத்தி அனைத்து சுழலும் பாகங்களும் நிற்கும் வரை காத்திருக்கவும்.',
        },
        audioPrompt: {
          en: 'Step two: Shut down the machine properly and wait for all moving parts to stop.',
          hi: 'कदम दो: मशीन को सामान्य तरीके से बंद करें और सभी गतिमान पुर्जों के रुकने तक रुकें।',
          ta: 'படி இரண்டு: இயந்திரத்தை முறையாக நிறுத்தி சுழற்சி நின்றதை உறுதி செய்யவும்.',
        },
        isMandatory: true,
      },
      {
        stepNumber: 3,
        title: {
          en: 'Isolate All Energy Sources',
          hi: 'सभी ऊर्जा स्रोतों (इलेक्ट्रिक, एयर, हाइड्रोलिक) को डिस्कनेक्ट करें',
          ta: 'மின்சாரம், காற்று மற்றும் ஹைட்ராலிக் இணைப்புகளை துண்டிக்கவும்',
        },
        description: {
          en: 'Pull down the heavy duty electrical disconnect switch to OFF position. Close pneumatic main air ball valve and hydraulic pressure supply lines.',
          hi: 'मुख्य इलेक्ट्रिक आइसोलेटर हैंडल को नीचे गिराकर OFF करें। एयर वॉल्व और हाइड्रोलिक वॉल्व बंद करें।',
          ta: 'மின்சார சுவிட்சை ஆஃப் செய்து காற்று மற்றும் ஹைட்ராலிக் வால்வுகளை மூடவும்.',
        },
        audioPrompt: {
          en: 'Step three: Disconnect electric breaker and close pneumatic and hydraulic valves.',
          hi: 'कदम तीन: मुख्य बिजली का स्विच काटें और एयर तथा ऑयल के वॉल्व बंद करें।',
          ta: 'படி மூன்று: மின்சார சுவிட்ச் மற்றும் காற்று வால்வுகளை துண்டிக்கவும்.',
        },
        isMandatory: true,
      },
      {
        stepNumber: 4,
        title: {
          en: 'Apply Personal Padlock & Danger Tag',
          hi: 'अपना निजी ताला और खतरे का लाल टैग लगाएं',
          ta: 'தனிப்பட்ட பூட்டு மற்றும் எச்சரிக்கை டேக் பொருத்தவும்',
        },
        description: {
          en: 'Fit your designated red safety padlock through the lockout hasp. Keep the key in your pocket. Fasten a completed Danger Tag with your name, date, department, and contact phone.',
          hi: 'आइसोलेटर पर अपना लाल ताला लगाएं और चाबी अपनी जेब में रखें। अपना नाम, तारीख और फोन नंबर वाला लाल "खतरा" टैग बांधें।',
          ta: 'ஆபத்து முனையத்தில் உங்கள் பூட்டை பூட்டி சாவியை பத்திரமாக வைக்கவும். பெயர் மற்றும் தேதியுடன் எச்சரிக்கை அட்டை கட்டவும்.',
        },
        audioPrompt: {
          en: 'Step four: Place your personal safety padlock and filled Danger Tag on the lockout hasp.',
          hi: 'कदम चार: आइसोलेटर पर अपना निजी ताला लगाएं और डेंजर टैग पर अपना नाम लिखकर टांगें।',
          ta: 'படி நான்கு: உங்கள் பூட்டை பூட்டி எச்சரிக்கை அட்டையை தொங்கவிடவும்.',
        },
        isMandatory: true,
      },
      {
        stepNumber: 5,
        title: {
          en: 'Release Residual & Stored Energy',
          hi: 'बची हुई हवा, तेल का दबाव और स्प्रिंग टेंशन रिलीज करें',
          ta: 'எஞ்சிய காற்று மற்றும் ஹைட்ராலிக் அழுத்தத்தை வெளியேற்றவும்',
        },
        description: {
          en: 'Open bleed valves to release trapped pneumatic pressure. Lower mechanical counterweights. Chock or pin ram press dies to block gravity fall.',
          hi: 'प्रेशर रिलीज वॉल्व खोलकर पाइप में फंसी हवा और तेल का दबाव निकालें। प्रेस डाई के नीचे सेफ्टी ब्लॉक लगाएं।',
          ta: 'குழாய்களில் தேங்கியுள்ள காற்றை திறந்து விடவும். நகரும் பாகங்களுக்கு பாதுகாப்பு தடுப்பு வைக்கவும்.',
        },
        audioPrompt: {
          en: 'Step five: Bleed all stored pneumatic and hydraulic pressure and block mechanical gravity hazards.',
          hi: 'कदम पांच: पाइपों में जमा एयर और ऑयल प्रेशर को पूरी तरह बाहर निकालें।',
          ta: 'படி ஐந்து: எஞ்சிய அழுத்தத்தை முழுமையாக வெளியேற்றவும்.',
        },
        isMandatory: true,
      },
      {
        stepNumber: 6,
        title: {
          en: 'Zero Energy Verification (Try Step)',
          hi: 'शून्य ऊर्जा की जांच (ट्राई स्टेप)',
          ta: 'பூஜ்ஜிய ஆற்றல் உறுதிப்படுத்தல் சோதனை',
        },
        description: {
          en: 'Ensure all personnel are clear. Press the machine START button on control panel. The machine must NOT start. Return button to OFF state before starting work.',
          hi: 'सबको दूर रहने को कहें। मशीन का स्टार्ट बटन दबाकर देखें। मशीन चालू नहीं होनी चाहिए। इसके बाद ही सुरक्षित काम शुरू करें।',
          ta: 'இயந்திரத்தின் தொடக்க பட்டனை அழுத்தி இயங்கவில்லை என்பதை உறுதி செய்த பின்னரே பணியை தொடங்கவும்.',
        },
        audioPrompt: {
          en: 'Step six: Press the machine start button to verify zero energy. Machine must stay dead.',
          hi: 'कदम छह: मशीन का स्टार्ट बटन दबाकर जांचें कि मशीन में कोई करंट या हलचल नहीं है।',
          ta: 'படி ஆறு: ஸ்டார்ட் பட்டனை அழுத்தி இயந்திரம் இயங்கவில்லை என்பதை உறுதிப்படுத்தவும்.',
        },
        isMandatory: true,
      },
    ],
    dos: {
      en: [
        'One Worker, One Lock: Never allow anyone else to remove your personal padlock',
        'Verify emergency stop (E-Stop) push buttons are tested every Monday morning shift',
        'Keep long hair tied, tuck shirts in, and remove rings/watches around rotating shafts',
      ],
      hi: [
        'एक कर्मचारी, एक ताला: आपके ताले की चाबी सिर्फ आपके पास होनी चाहिए, कोई दूसरा इसे नहीं हटाएगा',
        'हर सोमवार शिफ्ट शुरू होने पर इमरजेंसी स्टॉप (E-Stop) बटन की जांच करें',
        'घूमने वाले रोलर के पास ढीले कपड़े, अंगूठी, कड़ा या खुली टाई कभी न पहनें',
      ],
      ta: [
        'ஒரு தொழிலாளிக்கு ஒரு பூட்டு: உங்கள் பூட்டை நீங்கள் மட்டுமே திறக்க வேண்டும்',
        'சுழலும் பாகங்களின் அருகில் தளர்வான உடைகள், மோதிரம் அல்லது சங்கிலி அணிய வேண்டாம்',
        'ஒவ்வொரு வாரமும் அவசர நிறுத்த பட்டன் சரியாக வேலை செய்கிறதா என்று சோதிக்கவும்',
      ],
    },
    donts: {
      en: [
        'Never defeat, tape down, or wire-tie optical safety light curtains or interlock switches',
        'Never reach into running machinery to clear stuck workpieces or scrap strips',
        'Never use gloves when working directly on high-speed lathe chucks or spindle drills',
      ],
      hi: [
        'सुरक्षा सेंसर या लाइट कर्टेन पर कभी टेप न लगाएं और न ही उन्हें बायपास करें',
        'चलती मशीन से फंसा हुआ सामान या लोहे की छीलन निकालने के लिए कभी हाथ न लगाएं',
        'लेथ मशीन या तेज घूमने वाले ड्रिल पर काम करते समय दस्ताने न पहनें (हाथ खिंच सकता है)',
      ],
      ta: [
        'பாதுகாப்பு சென்சார்களை ஒருபோதும் முடக்கவோ அல்லது டேப் ஒட்டவோ கூடாது',
        'இயங்கும் இயந்திரத்திற்குள் கைவிட்டு சிக்கிய பொருட்களை எடுக்க வேண்டாம்',
        'சுழலும் ட்ரில் அல்லது லேத் இயந்திரங்களில் வேலை செய்யும் போது கையுறை அணியக்கூடாது',
      ],
    },
    requiredPpe: {
      en: ['Cut Level 5 Gloves', 'Impact Safety Glasses', 'Steel Toe Metatarsal Boots', 'LOTO Padlock Kit'],
      hi: ['कट लेवल 5 दस्ताने', 'इम्पैक्ट सेफ्टी गॉगल', 'लोटो किट व लाल ताला'],
      ta: ['கட் லெவல் 5 கையுறைகள்', 'பாதுகாப்பு கண்ணாடி', 'லோட்டோ பூட்டு கிட்'],
    },
  },

  electrical: {
    id: 'inst-ele-04',
    categoryId: 'electrical',
    standardCode: 'IS 732 & NFPA 70E',
    title: {
      en: 'Electrical Safety & Arc Flash Prevention',
      hi: 'विद्युत सुरक्षा और आर्क फ्लैश बचाव',
      ta: 'மின் பாதுகாப்பு மற்றும் ஆர்க் ஃபிளாஷ் தடுப்பு',
    },
    subtitle: {
      en: 'High voltage live testing, earthing continuity, and dielectric PPE',
      hi: 'हाई वोल्टेज टेस्टिंग, अर्थिंग जांच और इंसुलेटेड उपकरण नियम',
      ta: 'உயர் மின்னழுத்த பரிசோதனை மற்றும் காப்பிடப்பட்ட பாதுகாப்பு',
    },
    overview: {
      en: 'Electricity kills silently. Always assume every electrical busbar and wire is energized until tested with a calibrated contact voltmeter. Check rubber insulated gloves for pinholes before touching 415V or higher.',
      hi: 'बिजली बिना आवाज किए जान ले सकती है। जब तक मीटर से वोल्टेज 0 नाप न लें, तब तक हर तार को चालू समझें। 415 वोल्ट या उससे ऊपर छूने से पहले रबर के दस्तानों में हवा भरकर छेद जांचें।',
      ta: 'மின்சாரம் சத்தமின்றி உயிரைப் பறிக்கும். வோல்ட்மீட்டர் மூலம் பூஜ்ஜிய மின்னழுத்தம் உறுதி செய்யப்படும் வரை அனைத்து கம்பிகளும் நேரடி மின்சாரம் கொண்டதாகவே கருதப்பட வேண்டும்.',
    },
    audioSummary: {
      en: 'Electrical danger protocol: De-energize and lock before working on panels. Air-test class zero or class one dielectric gloves before touch. Use insulated tools rated up to 1000 Volts. Stand on rubber insulating mat. Never touch a person suffering an electric shock with bare hands—trip the main breaker immediately.',
      hi: 'विद्युत सुरक्षा नियम: पैनल पर काम करने से पहले बिजली बंद करें। 1000 वोल्ट प्रमाणित इंसुलेटेड औजारों का ही उपयोग करें। रबर की मैट पर खड़े होकर काम करें। यदि किसी को करंट लग जाए, तो उसे सीधे न छुएं—तुरंत मुख्य एमसीबी गिराएं या सूखी लकड़ी का इस्तेमाल करें।',
      ta: 'மின் பாதுகாப்பு நடைமுறை: பேனல்களில் வேலை செய்யும் முன் மெயின் சுவிட்சை ஆஃப் செய்யவும். 1000 வோல்ட் காப்பிடப்பட்ட கருவிகளை மட்டுமே பயன்படுத்தவும். மின் அதிர்ச்சி ஏற்பட்டவரை வெறும் கைகளால் தொடக்கூடாது, உடனே மெயின் சுவிட்சை அணைக்கவும்.',
    },
    severity: 'critical',
    steps: [
      {
        stepNumber: 1,
        title: {
          en: 'Rubber Dielectric Glove Air Leak Test',
          hi: 'इंसुलेटेड रबर दस्ताने की एयर-लीक जांच',
          ta: 'மின் காப்பு கையுறைகளின் காற்று கசிவு சோதனை',
        },
        description: {
          en: 'Roll the cuff of the rubber glove down towards the fingers to trap air. Submerge or hold close to ear. If glove deflates or hisses, discard immediately. Never use punctured gloves.',
          hi: 'दस्ताने के किनारे को मोड़कर अंदर हवा भरें और कान के पास सुनें। यदि हवा निकल रही हो, तो दस्ताना तुरंत फेंकें। छेद वाला दस्ताना जानलेवा हो सकता है।',
          ta: 'கையுறையை சுருட்டி காற்று அடைத்து கசிவு உள்ளதா என காதில் வைத்து கேட்கவும். கசிவு இருந்தால் உடனே மாற்றவும்.',
        },
        audioPrompt: {
          en: 'Step one: Air test rubber insulating gloves for punctures before entering live panel enclosure.',
          hi: 'कदम एक: रबर के दस्तानों में हवा भरकर चेक करें कि कोई बारीक छेद तो नहीं है।',
          ta: 'படி ஒன்று: மின் கையுறைகளில் துளைகள் இல்லை என்பதை காற்று சோதனை செய்து உறுதிப்படுத்தவும்.',
        },
        isMandatory: true,
      },
      {
        stepNumber: 2,
        title: {
          en: 'Live-Dead-Live Voltage Proving Method',
          hi: 'लाइव-डेड-लाइव (Live-Dead-Live) वोल्टेज मीटर जांच',
          ta: 'லைவ்-டெட்-லைவ் மின்னழுத்த சோதனை முறை',
        },
        description: {
          en: 'Test your digital multimeter on a known live power outlet (Live). Test the target circuit you locked out (must be Dead). Retest on the live outlet to verify meter did not fail (Live).',
          hi: 'मीटर को पहले चालू बिजली पर जांचें (Live)। फिर जिस तार पर काम करना है उसे नापें (Dead)। अंत में फिर चालू बिजली पर नापें ताकि पता चले मीटर खराब नहीं हुआ।',
          ta: 'மல்டிமீட்டரை முதலில் நேரடி மின்சாரத்தில் சோதிக்கவும், பின் இலக்கு சுற்றில் சோதிக்கவும், மீண்டும் நேரடி சுற்றில் சோதிக்கவும்.',
        },
        audioPrompt: {
          en: 'Step two: Follow Live-Dead-Live protocol with your multimeter to prove zero voltage.',
          hi: 'कदम दो: लाइव-डेड-लाइव नियम से मीटर की जांच करें और शून्य वोल्टेज की पुष्टि करें।',
          ta: 'படி இரண்டு: வோல்ட்மீட்டர் மூலம் மின்னழுத்தம் இல்லை என்பதை உறுதிப்படுத்தவும்.',
        },
        isMandatory: true,
      },
      {
        stepNumber: 3,
        title: {
          en: 'Grounding & Earth Bonding Attachment',
          hi: 'ग्राउंडिंग और अर्थिंग क्लैंप लगाना',
          ta: 'தரை இணைப்பு (எர்த்திங்) உறுதி செய்தல்',
        },
        description: {
          en: 'Attach temporary grounding clamps to all three phase busbars using insulated hot-stick to safely discharge induced voltages or accidental back-feed.',
          hi: 'अचानक करंट आने से बचने के लिए इंसुलेटेड स्टिक की मदद से तीनों फेज पर अर्थिंग क्लैंप लगाएं।',
          ta: 'எதிர்பாராத மின்சாரத்தை வெளியேற்ற காப்பிடப்பட்ட கம்பி மூலம் தரை இணைப்பை இணைக்கவும்.',
        },
        audioPrompt: {
          en: 'Step three: Clamp temporary safety ground leads to de-energized busbars.',
          hi: 'कदम तीन: बसबार पर सेफ्टी अर्थिंग क्लैंप लगाएं।',
          ta: 'படி மூன்று: தரை இணைப்பு கிளம்பை இணைக்கவும்.',
        },
        isMandatory: true,
      },
      {
        stepNumber: 4,
        title: {
          en: 'Maintain Arc Flash Flash Boundary & Matting',
          hi: 'आर्क फ्लैश सुरक्षा दूरी और इंसुलेटेड रबर मैट',
          ta: 'ஆர்க் ஃபிளாஷ் பாதுகாப்பு எல்லை மற்றும் ரப்பர் பாய்',
        },
        description: {
          en: 'Stand on certified 11kV dielectric floor matting (IS 15652). Keep uncertified personnel outside the 1.2 meter arc boundary. Wear 8+ cal/cm² arc face shield when opening doors.',
          hi: '11kV प्रमाणित रबर मैट पर खड़े हों। पैनल का दरवाजा खोलते समय आर्क फेस शील्ड पहनें और दूसरों को दूर रखें।',
          ta: 'சான்றளிக்கப்பட்ட ரப்பர் பாயின் மீது நிற்கவும். பேனலை திறக்கும் போது முகக் கவசம் அணியவும்.',
        },
        audioPrompt: {
          en: 'Step four: Stand on dielectric rubber matting and wear arc flash protective face shield.',
          hi: 'कदम चार: रबर मैट पर खड़े हों और आर्क शील्ड पहनकर ही पैनल खोलें।',
          ta: 'படி நான்கு: ரப்பர் பாயில் நின்று ஆர்க் ஃபிளாஷ் முகக் கவசம் அணியவும்.',
        },
        isMandatory: true,
      },
    ],
    dos: {
      en: [
        'Use only tools marked with official 1000V double-triangle IEC 60900 insulation symbol',
        'Keep water, wet rags, and open beverage bottles away from switchboards',
        'Verify panel door interlocks and earth pit resistance (< 1 Ohm) every quarter',
      ],
      hi: [
        'केवल वही औजार इस्तेमाल करें जिन पर 1000V का इंसुलेशन मार्का छपा हो',
        'इलेक्ट्रिक पैनल के पास पानी, गीला कपड़ा या चाय की कप कभी न रखें',
        'हर तीन महीने में अर्थिंग पिट का रेजिस्टेंस (1 ओम से कम) चेक करें',
      ],
      ta: [
        '1000V சான்றளிக்கப்பட்ட காப்பிடப்பட்ட கருவிகளை மட்டுமே பயன்படுத்தவும்',
        'மின்சார பலகைகளின் அருகில் தண்ணீர் மற்றும் திரவங்களை வைக்க வேண்டாம்',
        'பூமி தரை இணைப்பை தவறாமல் ஆய்வு செய்யவும்',
      ],
    },
    donts: {
      en: [
        'Never replace blown industrial fuses with bare copper wire strands',
        'Never use metal ladders or tape measures inside electrical substations (use fiberglass)',
        'Never use broken extension cords or tape up cracked 3-phase industrial plugs',
      ],
      hi: [
        'उड़े हुए फ्यूज में कभी तांबे का खुला तार न बांधें (आग लग सकती है)',
        'सबस्टेशन में लोहे की सीढ़ी या मेटल टेप का इस्तेमाल न करें (फाइबरग्लास सीढ़ी का उपयोग करें)',
        'कटे हुए तार या टूटे हुए प्लग पर टेप लगाकर कभी मशीन न चलाएं',
      ],
      ta: [
        'ஃபியூஸ் கம்பிகளுக்கு பதிலாக தாமிர கம்பிகளை பயன்படுத்த வேண்டாம்',
        'மின் நிலையங்களில் இரும்பு ஏணிகளை பயன்படுத்த வேண்டாம்',
        'சேதமடைந்த மின் கம்பிகளை டேப் போட்டு பயன்படுத்த வேண்டாம்',
      ],
    },
    requiredPpe: {
      en: ['1000V Class 0 Insulated Gloves', 'Arc Flash Face Shield 8 cal', 'IS 15652 Insulating Mat', 'Leather Outer Protectors'],
      hi: ['1000V इंसुलेटेड रबर दस्ताने', 'आर्क शील्ड', 'इंसुलेटिंग मैट', 'चमड़े के कवर दस्ताने'],
      ta: ['மின் காப்பு கையுறைகள்', 'ஆர்க் ஃபிளாஷ் முகக் கவசம்', 'ரப்பர் பாய்', 'தோல் மேல் உறை'],
    },
  },

  emergency: {
    id: 'inst-emg-05',
    categoryId: 'emergency',
    standardCode: 'Factories Act 1948 Sec 45',
    title: {
      en: 'Factory Emergency Procedures & First Aid',
      hi: 'फैक्ट्री आपातकालीन प्रक्रियाएं और प्राथमिक चिकित्सा',
      ta: 'தொழிற்சாலை அவசர நெறிமுறைகள் & முதலுதவி',
    },
    subtitle: {
      en: 'Electric shock rescue, chemical eye wash, CPR, and plant evacuation',
      hi: 'बिजली का झटका बचाव, केमिकल आई वॉश, सीपीआर और निकासी',
      ta: 'மின் அதிர்ச்சி மீட்பு, ரசாயன கண் கழுவுதல் மற்றும் வெளியேற்றம்',
    },
    overview: {
      en: 'Seconds count in industrial trauma. For electric shock: do NOT touch victim; isolate power. For chemical splash: flush eye station for full 15 minutes. For bleeding: direct pressure with clean pad. For fire: evacuate to Assembly Point B.',
      hi: 'दुर्घटना में हर सेकंड कीमती है। करंट लगने पर पीड़ित को सीधे न छुएं, पहले मुख्य स्विच बंद करें। आंख में केमिकल जाने पर आई-वॉश स्टेशन पर पूरे 15 मिनट आंखें धोएं। आग लगने पर असेंबली पॉइंट बी की ओर जाएं।',
      ta: 'விபத்தின் போது ஒவ்வொரு வினாடியும் முக்கியம். மின் அதிர்ச்சி ஏற்பட்டவரை நேரடியாக தொடாமல் மெயின் சுவிட்சை ஆஃப் செய்யவும். ரசாயனம் பட்டால் 15 நிமிடங்கள் கண்களை கழுவவும்.',
    },
    audioSummary: {
      en: 'Emergency instructions: If an electric shock occurs, do not touch the victim directly. Cut the main circuit breaker immediately or use a dry wooden stick to push the wire away. Check breathing. For chemical eye splash, hold eyelids open under the emergency eyewash fountain for 15 full minutes. Call plant dispensary extension 222 immediately.',
      hi: 'आपातकालीन निर्देश: बिजली का झटका लगने पर पीड़ित को सीधे न छुएं। तुरंत मुख्य बिजली बंद करें या सूखी लकड़ी से तार हटाएं। सांस चेक करें। आंख में केमिकल जाने पर आई-वॉश फव्वारे के नीचे 15 मिनट लगातार पानी डालें। तुरंत डिस्पेंसरी नंबर 222 पर कॉल करें।',
      ta: 'அவசர உதவி நெறிமுறை: மின் அதிர்ச்சி ஏற்பட்டவரை உடனடியாக வெறும் கையால் தொட வேண்டாம். மெயின் சுவிட்சை ஆஃப் செய்யவும் அல்லது உலர்ந்த மரக்கட்டையால் கம்பியை தள்ளவும். ரசாயனம் கண்களில் பட்டால் 15 நிமிடங்கள் கழுவவும். மருத்துவமனை எண் 222க்கு அழைக்கவும்.',
    },
    severity: 'critical',
    steps: [
      {
        stepNumber: 1,
        title: {
          en: 'Electric Shock Victim Rescue (Zero-Contact Rule)',
          hi: 'करंट लगे व्यक्ति का बचाव (बिना छुए)',
          ta: 'மின் அதிர்ச்சி மீட்பு (நேரடி தொடுதல் இன்றி)',
        },
        description: {
          en: 'DO NOT touch the victim while in contact with circuit. Slap the emergency main trip switch. If switch is unreachable, use a dry wooden broom, fiberglass pole, or dry PVC pipe to push victim clear.',
          hi: 'पीड़ित को सीधे न छुएं, वरना आपको भी करंट लग जाएगा। मुख्य एमसीबी गिराएं। स्विच दूर हो तो सूखी लकड़ी या प्लास्टिक पाइप से तार को अलग करें।',
          ta: 'பாதிக்கப்பட்டவரை நேரடியாக தொடாதீர்கள். மெயின் சுவிட்சை உடனே ஆஃப் செய்யவும். உலர்ந்த மரக்கட்டை அல்லது பிவிசி பைப் மூலம் கம்பியை அகற்றவும்.',
        },
        audioPrompt: {
          en: 'Step one: Cut power breaker immediately. Do not touch victim with bare hands.',
          hi: 'कदम एक: तुरंत मुख्य बिजली काटें। पीड़ित को कभी खाली हाथ से न छुएं।',
          ta: 'படி ஒன்று: உடனடியாக மின் இணைப்பை துண்டிக்கவும். வெற்று கைகளால் தொடக்கூடாது.',
        },
        isMandatory: true,
      },
      {
        stepNumber: 2,
        title: {
          en: 'Chemical Eye & Skin Flush (15-Minute Rule)',
          hi: 'केमिकल छिटकने पर 15 मिनट तक लगातार धोना',
          ta: 'ரசாயன பாதிப்புக்கு 15 நிமிட கண் கழுவுதல்',
        },
        description: {
          en: 'Run immediately to nearest green Eyewash / Deluge Shower station. Push lever. Hold eyelids wide open with clean fingers. Flush eyes continuously for a minimum of 15 full minutes. Remove contaminated overalls.',
          hi: 'तुरंत नजदीकी आई-वॉश स्टेशन पर जाएं। हैंडल दबाएं और दोनों हाथों से पलकें खोलकर 15 मिनट तक लगातार बहते पानी से आंखें धोएं।',
          ta: 'உடனடியாக கண் கழுவும் நிலையத்திற்கு சென்று 15 நிமிடங்கள் தொடர்ந்து கண்களை கழுவவும்.',
        },
        audioPrompt: {
          en: 'Step two: Flush eyes under eyewash stream for fifteen minutes without rubbing.',
          hi: 'कदम दो: आई-वॉश स्टेशन पर 15 मिनट तक लगातार आंखें धोएं, आंखें रगड़ें नहीं।',
          ta: 'படி இரண்டு: கண்களை கசக்காமல் 15 நிமிடங்கள் தொடர்ந்து கழுவவும்.',
        },
        isMandatory: true,
      },
      {
        stepNumber: 3,
        title: {
          en: 'Cardiopulmonary Resuscitation (CPR) & Recovery Position',
          hi: 'सीपीआर (CPR) और रिकवरी पोजीशन',
          ta: 'சிபிஆர் (CPR) மற்றும் முதலுதவி நிலை',
        },
        description: {
          en: 'If victim is unconscious and not breathing normally: place heel of hand in center of chest. Push hard and fast at 100-120 beats per minute (to the rhythm of Staying Alive). Dispatch coworker to fetch plant AED defibrillator.',
          hi: 'यदि पीड़ित सांस नहीं ले रहा: छाती के बीच में दोनों हाथ रखकर 1 मिनट में 100-120 बार तेजी से दबाएं (2 इंच गहरा)। तुरंत डिस्पेंसरी से AED मशीन मंगवाएं।',
          ta: 'சுவாசம் இல்லையெனில் நெஞ்சின் நடுவில் வைத்து நிமிடத்திற்கு 100-120 முறை வேகமாகவும் அழுத்தமாகவும் அழுத்தவும்.',
        },
        audioPrompt: {
          en: 'Step three: Begin chest compressions at 100 beats per minute if breathing has stopped.',
          hi: 'कदम तीन: सांस बंद होने पर छाती को तेजी से दबाकर सीपीआर शुरू करें।',
          ta: 'படி மூன்று: சுவாசம் நின்றால் உடனடியாக நெஞ்சு அழுத்தத்தை தொடங்கவும்.',
        },
        isMandatory: true,
      },
      {
        stepNumber: 4,
        title: {
          en: 'Plant Evacuation & Assembly Point B Roll-Call',
          hi: 'फैक्ट्री खाली करना और असेंबली पॉइंट बी पर एकत्र होना',
          ta: 'தொழிற்சாலையிலிருந்து வெளியேறி குறிப்பிட்ட இடத்தில் கூடுதல்',
        },
        description: {
          en: 'Follow green illuminated running man exit signs. Walk briskly, do not run or use elevators. Gather at designated Assembly Point B (North Lawn). Supervisor conducts head count.',
          hi: 'हरे एग्जिट बोर्ड का पालन करें। दौड़ें नहीं, लिफ्ट का उपयोग न करें। सीधे असेंबली पॉइंट बी पर पहुंचे और हाजिरी दें।',
          ta: 'பச்சை வழிகாட்டி பலகையை பின்பற்றி வெளியேறி அசெம்பிளி பாயிண்ட் பி பகுதிக்கு செல்லவும்.',
        },
        audioPrompt: {
          en: 'Step four: Evacuate through designated emergency fire stairs to Assembly Point B.',
          hi: 'कदम चार: फायर सीढ़ियों से होते हुए असेंबली पॉइंट बी पर पहुंचे।',
          ta: 'படி நான்கு: அவசர வழி வழியாக அசெம்பிளி பாயிண்டிற்கு செல்லவும்.',
        },
        isMandatory: true,
      },
    ],
    dos: {
      en: [
        'Dial internal dispensary hotline (Ext: 222 or +91-98765-43210) immediately',
        'Keep accident victim warm with an emergency shock blanket',
        'Apply direct, steady pressure to severe arterial bleeding using sterile gauze',
      ],
      hi: [
        'फैक्ट्री डिस्पेंसरी नंबर (एक्सटेंशन 222 या +91-98765-43210) पर तुरंत कॉल करें',
        'घायल व्यक्ति को गर्म कंबल से ढक कर रखें',
        'तेज खून बहने पर साफ कपड़े से घाव को कसकर दबाकर रखें',
      ],
      ta: [
        'தொழிற்சாலை அவசர மருத்துவ எண் 222க்கு உடனடியாக அழைக்கவும்',
        'பாதிக்கப்பட்டவரை கம்பளியால் போர்த்தி கதகதப்பாக வைக்கவும்',
        'காயம் ஏற்பட்ட இடத்தில் சுத்தமான துணியால் அழுத்தவும்',
      ],
    },
    donts: {
      en: [
        'Never give liquids, tea, or water to an unconscious or drowsy patient',
        'Never remove an impaled object or metal shard from a wound (stabilize it in place)',
        'Never re-enter an evacuated building until cleared by Fire Marshal',
      ],
      hi: [
        'बेहोश व्यक्ति के मुंह में कभी पानी या चाय न डालें',
        'घाव में घुसा हुआ लोहे का टुकड़ा खुद निकालने की कोशिश न करें',
        'फायर ब्रिगेड की अनुमति के बिना बिल्डिंग में दोबारा कभी न जाएं',
      ],
      ta: [
        'மயக்கமடைந்தவருக்கு தண்ணீர் அல்லது திரவங்களை கொடுக்க வேண்டாம்',
        'உடலில் பாய்ந்த இரும்பு கம்பிகளை அகற்ற முயற்சிக்காதீர்கள்',
        'அனுமதி இன்றி மீண்டும் கட்டிடத்திற்குள் செல்லக்கூடாது',
      ],
    },
    requiredPpe: {
      en: ['Nitrile First Aid Gloves', 'Pocket CPR Mask', 'Emergency Sterile Trauma Dressing', 'Chemical Burn Eyewash'],
      hi: ['फर्स्ट एड नाइट्राइल दस्ताने', 'सीपीआर पॉकेट मास्क', 'स्टेराइल बैंडेज'],
      ta: ['முதலுதவி கையுறைகள்', 'சிபிஆர் முகமூடி', 'கட்டு துணி'],
    },
  },
};

export const SAFETY_FAQS: SafetyFAQ[] = [
  {
    id: 'faq-01',
    categoryId: 'helmet',
    question: {
      en: 'How often should a factory safety helmet be replaced?',
      hi: 'फैक्ट्री का सुरक्षा हेलमेट कितने समय में बदलना चाहिए?',
      ta: 'பாதுகாப்பு தலைக்கவசத்தை எத்தனை வருடங்களுக்கு ஒருமுறை மாற்ற வேண்டும்?',
    },
    answer: {
      en: 'Factory safety helmets must be replaced every 3 years from date of manufacture, or immediately following any significant impact or visible cracking, regardless of age.',
      hi: 'सुरक्षा हेलमेट को निर्माण तिथि से हर 3 साल में बदला जाना चाहिए। यदि हेलमेट पर कोई भारी चीज गिर जाए तो बिना दरार दिखे भी उसे तुरंत बदलें।',
      ta: 'தயாரித்த நாளிலிருந்து 3 ஆண்டுகளுக்கு ஒருமுறை மாற்ற வேண்டும். அல்லது ஏதேனும் பலத்த அடி விழுந்தால் உடனடியாக மாற்ற வேண்டும்.',
    },
    audioText: {
      en: 'Safety helmets must be replaced every three years, or immediately after any direct impact.',
      hi: 'हेलमेट को हर तीन साल में या चोट लगने के तुरंत बाद बदलना अनिवार्य है।',
      ta: 'தலைக்கவசத்தை மூன்று ஆண்டுகளுக்கு ஒருமுறை அல்லது பலத்த அடி விழுந்தவுடன் மாற்ற வேண்டும்.',
    },
    keywords: ['helmet', 'replace', 'life', 'duration', 'expiry', 'हेलमेट', 'बदलना', 'उम्र', 'தலைக்கவசம்'],
  },
  {
    id: 'faq-02',
    categoryId: 'fire',
    question: {
      en: 'What type of extinguisher should be used for electrical control panel fires?',
      hi: 'बिजली के कंट्रोल पैनल की आग के लिए किस अग्निशामक का उपयोग करें?',
      ta: 'மின் கட்டுப்பாட்டு பலகை தீ விபத்துக்கு எந்த தீயணைப்பானை பயன்படுத்த வேண்டும்?',
    },
    answer: {
      en: 'Use Carbon Dioxide (CO2) or ABC Dry Chemical Powder extinguishers only. NEVER use Water or Foam extinguishers on electrical fires as water conducts electricity and will cause fatal electrocution.',
      hi: 'बिजली की आग के लिए केवल CO2 या ABC ड्राई केमिकल पाउडर सिलेंडर का इस्तेमाल करें। पानी या फोम का इस्तेमाल कभी न करें क्योंकि इससे जानलेवा करंट लग सकता है।',
      ta: 'CO2 அல்லது ஏபிசி உலர் ரசாயன தீயணைப்பானை மட்டுமே பயன்படுத்த வேண்டும். தண்ணீர் பயன்படுத்தினால் மின் அதிர்ச்சி ஏற்படும்.',
    },
    audioText: {
      en: 'Use only CO2 or ABC dry powder extinguishers for electrical fires. Never use water.',
      hi: 'बिजली की आग के लिए सिर्फ CO2 या पाउडर सिलेंडर इस्तेमाल करें। पानी कभी न डालें।',
      ta: 'மின் தீ விபத்திற்கு CO2 மட்டுமே பயன்படுத்தவும். தண்ணீர் பயன்படுத்தக் கூடாது.',
    },
    keywords: ['fire', 'electrical', 'extinguisher', 'panel', 'water', 'आग', 'बिजली', 'सिलेंडर', 'தீ'],
  },
  {
    id: 'faq-03',
    categoryId: 'machine',
    question: {
      en: 'Who is authorized to remove a red LOTO safety padlock?',
      hi: 'मशीन पर लगा हुआ लाल लोटो (LOTO) ताला कौन खोल सकता है?',
      ta: 'சிவப்பு லோட்டோ பூட்டை திறக்க யாருக்கு அதிகாரம் உள்ளது?',
    },
    answer: {
      en: 'Strictly the individual worker who applied the lock! No manager, supervisor, or coworker is permitted to cut or remove another person\'s lock unless emergency authorized procedure with written sign-off is completed.',
      hi: 'सिर्फ वही कर्मचारी जिसने ताला लगाया था! कोई भी सुपरवाइजर या दूसरा साथी आपका ताला नहीं खोल सकता। यदि कर्मचारी अनुपस्थित है, तो लिखित अनुमति के बाद ही विशेष प्रक्रिया अपनाई जा सकती है।',
      ta: 'பூட்டை பூட்டிய தொழிலாளி மட்டுமே அதை திறக்க வேண்டும்! மேற்பார்வையாளரோ அல்லது சக பணியாளரோ அதை திறக்க அனுமதி இல்லை.',
    },
    audioText: {
      en: 'Only the worker who installed the lock is authorized to remove it. Never remove another person\'s lock.',
      hi: 'ताला सिर्फ वही खोल सकता है जिसने उसे लगाया था। किसी दूसरे का ताला कभी न हटाएं।',
      ta: 'பூட்டிய நபர் மட்டுமே பூட்டை திறக்க முடியும்.',
    },
    keywords: ['loto', 'lock', 'padlock', 'remove', 'who', 'key', 'ताला', 'चाबी', 'लोटो', 'பூட்டு'],
  },
  {
    id: 'faq-04',
    categoryId: 'electrical',
    question: {
      en: 'What should you do first if a coworker gets an electric shock and is stuck to a wire?',
      hi: 'यदि किसी साथी को करंट लग जाए और वह तार से चिपका हो, तो सबसे पहले क्या करें?',
      ta: 'ஒருவருக்கு மின் அதிர்ச்சி ஏற்பட்டால் முதலில் என்ன செய்ய வேண்டும்?',
    },
    answer: {
      en: '1. Do NOT touch the victim with bare hands. 2. Immediately trip the main circuit breaker / isolator. 3. If breaker is far, use dry non-conductive wood or PVC pipe to pry the wire or victim away. 4. Check breathing and begin CPR.',
      hi: '1. पीड़ित को खाली हाथ से न छुएं। 2. तुरंत मेन स्विच या एमसीबी बंद करें। 3. स्विच दूर हो तो सूखी लकड़ी या पीवीसी पाइप से तार को अलग करें। 4. सांस चेक कर सीपीआर दें।',
      ta: '1. பாதிக்கப்பட்டவரை வெறும் கையால் தொட வேண்டாம். 2. உடனடியாக மெயின் சுவிட்சை ஆஃப் செய்யவும். 3. உலர்ந்த மரக்கட்டையால் கம்பியை அகற்றவும். 4. உடனடியாக சிபிஆர் செய்யவும்.',
    },
    audioText: {
      en: 'Cut the main power switch immediately. Do not touch the victim with bare hands. Use a dry wooden stick if needed.',
      hi: 'तुरंत मुख्य बिजली बंद करें। पीड़ित को खाली हाथ से न छुएं। सूखी लकड़ी का इस्तेमाल करें।',
      ta: 'மெயின் சுவிட்சை உடனே ஆஃப் செய்யவும். வெற்று கைகளால் தொடாதீர்கள்.',
    },
    keywords: ['electric', 'shock', 'victim', 'first', 'touch', 'करंट', 'झटका', 'बचाव', 'மின் அதிர்ச்சி'],
  },
  {
    id: 'faq-05',
    categoryId: 'emergency',
    question: {
      en: 'How long must eyes be flushed if battery acid or coolant splashes in them?',
      hi: 'आंख में बैटरी एसिड या केमिकल छिटक जाने पर कितनी देर आंखें धोनी चाहिए?',
      ta: 'கண்களில் ரசாயனம் அல்லது அமிலம் பட்டால் எவ்வளவு நேரம் கழுவ வேண்டும்?',
    },
    answer: {
      en: 'Flush eyes continuously at the emergency eyewash station for a minimum of 15 FULL MINUTES with eyelids held wide open. Seek immediate emergency medical attention at plant dispensary.',
      hi: 'इमरजेंसी आई-वॉश फव्वारे पर पलकें खोलकर पूरे 15 मिनट तक लगातार धोएं। इसके बाद तुरंत प्लांट डिस्पेंसरी में डॉक्टर को दिखाएं।',
      ta: 'கண் கழுவும் நிலையத்திற்கு சென்று 15 நிமிடங்கள் இடைவிடாமல் கண்களை கழுவ வேண்டும். பின் மருத்துவமனைக்கு செல்லவும்.',
    },
    audioText: {
      en: 'Flush eyes continuously for fifteen full minutes under running water at the eyewash station.',
      hi: 'आई-वॉश स्टेशन पर पूरे पंद्रह मिनट तक लगातार बहते पानी से आंखें धोएं।',
      ta: 'கண்களை 15 நிமிடங்கள் தொடர்ந்து தண்ணீரால் கழுவ வேண்டும்.',
    },
    keywords: ['eye', 'chemical', 'acid', 'flush', 'wash', 'time', 'minutes', 'आंख', 'केमिकल', 'धोना', 'கண்'],
  },
];

export const INITIAL_TRAINING_GAPS: TrainingGapMetric[] = [
  {
    id: 'gap-01',
    category: 'machine',
    title: 'Residual Hydraulic Energy Release Confusion',
    queryCount: 38,
    affectedZone: 'Zone A – Hydraulic Press Shop',
    urgency: 'high',
    summary: 'Workers repeatedly asking how to bleed accumulator pressure before die changeover.',
    recommendedAction: 'Schedule mandatory 15-minute Toolbox Talk on Step 5 (Pressure Bleeding) for Shift B.',
  },
  {
    id: 'gap-02',
    category: 'fire',
    title: 'Extinguisher Type Selection in Switchgear Room',
    queryCount: 24,
    affectedZone: 'Zone E – 11kV Substation',
    urgency: 'high',
    summary: 'Workers querying whether foam extinguishers can be deployed on transformer oil leaks.',
    recommendedAction: 'Replace faded class labels and conduct live CO2 deployment drill at Substation.',
  },
  {
    id: 'gap-03',
    category: 'helmet',
    title: 'Improper Chin Strap Tension & Fastening',
    queryCount: 19,
    affectedZone: 'Zone D – Overhead Gantry Crane Bay',
    urgency: 'medium',
    summary: 'Floor audits show 35% of workers wearing helmets unbuckled or without 1-finger tension rule.',
    recommendedAction: 'Implement gate-keeper badge check and supervisor spot inspections at morning muster.',
  },
  {
    id: 'gap-04',
    category: 'electrical',
    title: 'Multimeter Live-Dead-Live Proving Sequence',
    queryCount: 15,
    affectedZone: 'Zone B – Robotic Welding Line',
    urgency: 'medium',
    summary: 'Junior technicians skipping the third step (re-proving meter on live source).',
    recommendedAction: 'Provide calibrated voltage proving units at all major distribution panels.',
  },
];

export const SAMPLE_ACTIVITY_LOGS: InteractionLog[] = [
  {
    id: 'log-101',
    timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    language: 'hi',
    category: 'machine',
    query: 'प्रेस मशीन में डाई बदलने से पहले लोटो कैसे लगाएं?',
    response: 'मशीन का पावर स्विच काटें, अपना लाल ताला और डेंजर टैग लगाएं, हाइड्रोलिक प्रेशर रिलीज वॉल्व खोलें और स्टार्ट बटन दबाकर शून्य ऊर्जा चेक करें।',
    source: 'voice',
    resolved: true,
    flaggedTrainingGap: true,
    trainingGapReason: 'Frequent LOTO query in high-risk stamping press area.',
    zone: 'Zone A – Press Shop',
  },
  {
    id: 'log-102',
    timestamp: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
    language: 'en',
    category: 'fire',
    query: 'What does PASS stand for in fire safety?',
    response: 'P - Pull pin, A - Aim low at base of fire, S - Squeeze lever, S - Sweep side to side.',
    source: 'faq',
    resolved: true,
    flaggedTrainingGap: false,
    zone: 'Zone C – Paint Shop',
  },
  {
    id: 'log-103',
    timestamp: new Date(Date.now() - 41 * 60 * 1000).toISOString(),
    language: 'ta',
    category: 'emergency',
    query: 'மின் அதிர்ச்சி ஏற்பட்டால் யாரை அழைக்க வேண்டும்?',
    response: 'தொழிற்சாலை மருத்துவமனை எண் 222ஐ உடனடியாக அழைக்கவும். மெயின் சுவிட்சை ஆஃப் செய்துவிட்டு பாதிக்கப்பட்டவரை தொடவும்.',
    source: 'voice',
    resolved: true,
    flaggedTrainingGap: false,
    zone: 'Zone E – Substation',
  },
  {
    id: 'log-104',
    timestamp: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    language: 'hi',
    category: 'helmet',
    query: 'हेलमेट का चिन स्ट्रैप कितना टाइट होना चाहिए?',
    response: 'चिन स्ट्रैप को इतना कसें कि आपकी ठुड्डी और पट्टे के बीच केवल 1 उंगली का अंतर रहे। सिर हिलाने पर हेलमेट हिलना नहीं चाहिए।',
    source: 'checklist',
    resolved: true,
    flaggedTrainingGap: true,
    trainingGapReason: 'PPE fitment protocol violation detected during morning pre-shift check.',
    zone: 'Zone D – Assembly',
  },
  {
    id: 'log-105',
    timestamp: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
    language: 'en',
    category: 'electrical',
    query: 'How to check rubber safety gloves for leakage?',
    response: 'Roll the cuff down to trap air inside the glove and submerge in water or listen near ear for hissing pinholes. Discard immediately if punctured.',
    source: 'voice',
    resolved: true,
    flaggedTrainingGap: false,
    zone: 'Zone B – Welding Bay',
  },
  {
    id: 'log-106',
    timestamp: new Date(Date.now() - 160 * 60 * 1000).toISOString(),
    language: 'hi',
    category: 'emergency',
    query: 'आंख में केमिकल जाने पर क्या करें?',
    response: 'तुरंत आई-वॉश फव्वारे पर जाएं और पलकें खुली रखकर पूरे 15 मिनट लगातार पानी से धोएं। आंखें न मलें। डिस्पेंसरी एक्सटेंशन 222 पर बताएं।',
    source: 'text',
    resolved: true,
    flaggedTrainingGap: false,
    zone: 'Zone C – Paint Shop',
  },
];
