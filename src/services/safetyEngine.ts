/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SAFETY_FAQS, SAFETY_INSTRUCTIONS } from '../data/safetyContent';
import { Language, SafetyCategory } from '../types/safety';

export interface SafetyMatchResult {
  category: SafetyCategory;
  summaryText: string;
  spokenText: string;
  steps: string[];
  criticalWarning?: string;
  confidence: number;
  flaggedTrainingGap: boolean;
  trainingGapReason?: string;
  suggestedQuestions: string[];
}

export function matchSafetyQuery(
  rawQuery: string,
  userLanguage: Language = 'en'
): SafetyMatchResult {
  const query = rawQuery.toLowerCase().trim();

  // Keyword clusters
  const isHelmet =
    query.includes('helmet') ||
    query.includes('strap') ||
    query.includes('chin') ||
    query.includes('head') ||
    query.includes('ppe') ||
    query.includes('goggle') ||
    query.includes('boot') ||
    query.includes('shoes') ||
    query.includes('vest') ||
    query.includes('हेलमेट') ||
    query.includes('पीपीई') ||
    query.includes('चिन') ||
    query.includes('स्ट्रैप') ||
    query.includes('जूते') ||
    query.includes('चश्मा') ||
    query.includes('தலைக்கவசம்') ||
    query.includes('பிபிஇ') ||
    query.includes('காலணி');

  const isFire =
    query.includes('fire') ||
    query.includes('pass') ||
    query.includes('extinguisher') ||
    query.includes('smoke') ||
    query.includes('flame') ||
    query.includes('cylinder') ||
    query.includes('co2') ||
    query.includes('आग') ||
    query.includes('पास') ||
    query.includes('सिलेंडर') ||
    query.includes('धुआं') ||
    query.includes('फायर') ||
    query.includes('अग्नि') ||
    query.includes('தீ') ||
    query.includes('தீயணைப்பான்') ||
    query.includes('புகை');

  const isMachine =
    query.includes('machine') ||
    query.includes('loto') ||
    query.includes('lock') ||
    query.includes('tag') ||
    query.includes('press') ||
    query.includes('jam') ||
    query.includes('roller') ||
    query.includes('guard') ||
    query.includes('interlock') ||
    query.includes('मशीन') ||
    query.includes('लोटो') ||
    query.includes('ताला') ||
    query.includes('टैग') ||
    query.includes('प्रेस') ||
    query.includes('இயந்திரம்') ||
    query.includes('லோட்டோ') ||
    query.includes('பூட்டு');

  const isElectrical =
    query.includes('electric') ||
    query.includes('voltage') ||
    query.includes('shock') ||
    query.includes('wire') ||
    query.includes('glove') ||
    query.includes('meter') ||
    query.includes('breaker') ||
    query.includes('mcb') ||
    query.includes('current') ||
    query.includes('बिजली') ||
    query.includes('करंट') ||
    query.includes('वोल्टेज') ||
    query.includes('तार') ||
    query.includes('दस्ताने') ||
    query.includes('மின்சாரம்') ||
    query.includes('மின்') ||
    query.includes('மின்னழுத்தம்');

  const isEmergency =
    query.includes('emergency') ||
    query.includes('sos') ||
    query.includes('first aid') ||
    query.includes('cpr') ||
    query.includes('eye') ||
    query.includes('acid') ||
    query.includes('chemical') ||
    query.includes('blood') ||
    query.includes('bleeding') ||
    query.includes('hospital') ||
    query.includes('doctor') ||
    query.includes('call') ||
    query.includes('आपात') ||
    query.includes('आंख') ||
    query.includes('केमिकल') ||
    query.includes('खून') ||
    query.includes('डॉक्टर') ||
    query.includes('सीपीआर') ||
    query.includes('அவசரம்') ||
    query.includes('கண்') ||
    query.includes('முதலுதவி') ||
    query.includes('மருத்துவமனை');

  // Determine category
  let matchedCat: SafetyCategory = 'emergency';
  if (isMachine) matchedCat = 'machine';
  else if (isFire) matchedCat = 'fire';
  else if (isElectrical) matchedCat = 'electrical';
  else if (isHelmet) matchedCat = 'helmet';
  else if (isEmergency) matchedCat = 'emergency';
  else {
    // Default smart fallback based on common safety concern
    matchedCat = 'emergency';
  }

  // Look for direct FAQ match first
  const faqMatch = SAFETY_FAQS.find(
    (f) =>
      f.keywords.some((k) => query.includes(k.toLowerCase())) ||
      f.question[userLanguage].toLowerCase().includes(query)
  );

  if (faqMatch) {
    const isGap = matchedCat === 'machine' || matchedCat === 'electrical';
    return {
      category: faqMatch.categoryId,
      summaryText: faqMatch.answer[userLanguage],
      spokenText: faqMatch.audioText[userLanguage],
      steps: [
        userLanguage === 'hi'
          ? 'नियम 1: संबंधित सुरक्षा दिशानिर्देश का तुरंत पालन करें'
          : userLanguage === 'ta'
          ? 'படி 1: பாதுகாப்பு வழிகாட்டுதலை உடனடியாக பின்பற்றவும்'
          : 'Step 1: Follow certified SOP immediately',
        userLanguage === 'hi'
          ? 'नियम 2: संदेह होने पर फ्लोर सुपरवाइजर से संपर्क करें'
          : userLanguage === 'ta'
          ? 'படி 2: சந்தேகம் இருப்பின் மேற்பார்வையாளரிடம் கேட்கவும்'
          : 'Step 2: Consult floor supervisor if unclear',
      ],
      criticalWarning:
        userLanguage === 'hi'
          ? 'खतरा: सुरक्षा नियमों की अनदेखी करने पर सख्त अनुशासनात्मक कार्रवाई होगी।'
          : userLanguage === 'ta'
          ? 'எச்சரிக்கை: பாதுகாப்பு விதிமீறல் கடுமையான விளைவுகளை ஏற்படுத்தும்.'
          : 'Warning: Violation of plant safety rules creates severe hazard.',
      confidence: 0.94,
      flaggedTrainingGap: isGap,
      trainingGapReason: isGap
        ? `Worker queried critical protocol (${faqMatch.categoryId.toUpperCase()}) requiring verification.`
        : undefined,
      suggestedQuestions: getSuggestedQuestions(matchedCat, userLanguage),
    };
  }

  // Generate category protocol response
  const instruction = SAFETY_INSTRUCTIONS[matchedCat];
  const summary = instruction.overview[userLanguage];
  const spoken = instruction.audioSummary[userLanguage];
  const stepsList = instruction.steps.map(
    (s) => `${s.stepNumber}. ${s.title[userLanguage]}: ${s.description[userLanguage]}`
  );
  const warning = instruction.donts[userLanguage][0]
    ? `${userLanguage === 'hi' ? 'प्रतिबंधित:' : userLanguage === 'ta' ? 'தடைசெய்யப்பட்டது:' : 'Prohibited:'} ${instruction.donts[userLanguage][0]}`
    : undefined;

  const isTrainingGap =
    matchedCat === 'machine' || matchedCat === 'electrical';

  return {
    category: matchedCat,
    summaryText: summary,
    spokenText: spoken,
    steps: stepsList,
    criticalWarning: warning,
    confidence: 0.88,
    flaggedTrainingGap: isTrainingGap,
    trainingGapReason: isTrainingGap
      ? `Worker requested operational clearance on ${matchedCat.toUpperCase()} protocol.`
      : undefined,
    suggestedQuestions: getSuggestedQuestions(matchedCat, userLanguage),
  };
}

function getSuggestedQuestions(cat: SafetyCategory, lang: Language): string[] {
  const suggestions: Record<SafetyCategory, Record<Language, string[]>> = {
    helmet: {
      en: [
        'How tight should the chin strap be?',
        'When must a safety helmet be replaced?',
        'Can I wear a cap under my helmet?',
      ],
      hi: [
        'हेलमेट का चिन स्ट्रैप कितना टाइट होना चाहिए?',
        'हेलमेट कितने साल में बदलना जरूरी है?',
        'क्या हेलमेट के नीचे गमछा या टोपी पहन सकते हैं?',
      ],
      ta: [
        'கன்னப் பட்டை எவ்வளவு இறுக்கமாக இருக்க வேண்டும்?',
        'தலைக்கவசத்தை எப்போது மாற்ற வேண்டும்?',
        'தலைக்கவசத்திற்குள் தொப்பி அணியலாமா?',
      ],
    },
    fire: {
      en: [
        'What does PASS stand for?',
        'Which extinguisher is used for electrical fires?',
        'Where is Plant Assembly Point B?',
      ],
      hi: [
        'पास (PASS) का क्या मतलब है?',
        'बिजली की आग पर कौन सा सिलेंडर इस्तेमाल करें?',
        'असेंबली पॉइंट बी कहां स्थित है?',
      ],
      ta: [
        'பாஸ் (PASS) என்பதன் விளக்கம் என்ன?',
        'மின் தீ விபத்திற்கு எந்த தீயணைப்பான் சிறந்தது?',
        'அசெம்பிளி பாயிண்ட் எங்கு உள்ளது?',
      ],
    },
    machine: {
      en: [
        'Who can remove my personal red LOTO padlock?',
        'How to verify zero energy on hydraulic press?',
        'What to do if a machine guard sensor fails?',
      ],
      hi: [
        'मशीन पर लगा हुआ लाल ताला कौन खोल सकता है?',
        'हाइड्रोलिक प्रेस का प्रेशर कैसे रिलीज करें?',
        'सेफ्टी सेंसर खराब होने पर क्या करें?',
      ],
      ta: [
        'சிவப்பு லோட்டோ பூட்டை யார் திறக்கலாம்?',
        'பூஜ்ஜிய அழுத்தத்தை எவ்வாறு சோதிப்பது?',
        'பாதுகாப்பு சென்சார் செயலிழந்தால் என்ன செய்வது?',
      ],
    },
    electrical: {
      en: [
        'How to air-test rubber electrical gloves?',
        'What is the Live-Dead-Live voltmeter rule?',
        'What to do if someone touches a live wire?',
      ],
      hi: [
        'रबर के दस्तानों की एयर टेस्ट कैसे करें?',
        'लाइव-डेड-लाइव वोल्टेज मीटर जांच क्या है?',
        'अगर कोई चालू तार छू ले तो क्या करें?',
      ],
      ta: [
        'மின் கையுறைகளை எப்படி பரிசோதிப்பது?',
        'லைவ்-டெட்-லைவ் முறை என்றால் என்ன?',
        'மின் கம்பி அதிர்ச்சி ஏற்பட்டால் என்ன செய்வது?',
      ],
    },
    emergency: {
      en: [
        'How long to flush eyes at the eyewash station?',
        'What is the internal dispensary phone extension?',
        'How many chest compressions per minute in CPR?',
      ],
      hi: [
        'आंख में केमिकल जाने पर कितनी देर पानी से धोएं?',
        'डिस्पेंसरी का इमरजेंसी फोन नंबर क्या है?',
        'सीपीआर में 1 मिनट में कितनी बार छाती दबानी चाहिए?',
      ],
      ta: [
        'கண்களை எவ்வளவு நேரம் கழுவ வேண்டும்?',
        'தொழிற்சாலை மருத்துவமனை எண் என்ன?',
        'சிபிஆர் முறையில் எத்தனை முறை அழுத்த வேண்டும்?',
      ],
    },
  };

  return suggestions[cat]?.[lang] || suggestions.emergency[lang];
}
