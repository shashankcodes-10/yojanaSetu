const states = [
  ['Andhra Pradesh','आंध्र प्रदेश'],['Arunachal Pradesh','अरुणाचल प्रदेश'],['Assam','असम'],['Bihar','बिहार'],['Chhattisgarh','छत्तीसगढ़'],['Goa','गोवा'],['Gujarat','गुजरात'],['Haryana','हरियाणा'],['Himachal Pradesh','हिमाचल प्रदेश'],['Jharkhand','झारखंड'],['Karnataka','कर्नाटक'],['Kerala','केरल'],['Madhya Pradesh','मध्य प्रदेश'],['Maharashtra','महाराष्ट्र'],['Manipur','मणिपुर'],['Meghalaya','मेघालय'],['Mizoram','मिज़ोरम'],['Nagaland','नागालैंड'],['Odisha','ओडिशा'],['Punjab','पंजाब'],['Rajasthan','राजस्थान'],['Sikkim','सिक्किम'],['Tamil Nadu','तमिलनाडु'],['Telangana','तेलंगाना'],['Tripura','त्रिपुरा'],['Uttar Pradesh','उत्तर प्रदेश'],['Uttarakhand','उत्तराखंड'],['West Bengal','पश्चिम बंगाल'],['Delhi','दिल्ली'],['Jammu and Kashmir','जम्मू और कश्मीर'],['Ladakh','लद्दाख'],['Puducherry','पुडुचेरी'],['Chandigarh','चंडीगढ़'],['Andaman and Nicobar Islands','अंडमान और निकोबार द्वीपसमूह']
];
const options = {
  occupation: [['Farmer','किसान'],['Student','विद्यार्थी'],['Street vendor','स्ट्रीट वेंडर'],['Self-employed','स्वरोज़गार'],['Private employee','निजी कर्मचारी'],['Government employee','सरकारी कर्मचारी'],['Unemployed','बेरोज़गार'],['Informal / daily-wage worker','अनौपचारिक / दिहाड़ी मज़दूर'],['Homemaker','गृहिणी']],
  gender: [['Female','महिला'],['Male','पुरुष'],['Other','अन्य']],
};
const copy = {
  en: {
    status:'Free eligibility finder', eyebrow:'Government scheme discovery', heroTitle:'Benefits you may be eligible for.', heroAccent:'Without the paperwork maze.', howLabel:'HOW IT WORKS', how1:'Tell us about yourself', how2:'We check scheme rules', how3:'Get your next steps', heroText:'Answer simple questions. YojanaSetu matches your profile against a curated set of government schemes and explains what to do next.',
    trust1:'✓ Rule-based matching', trust2:'✓ No Aadhaar number requested', trust3:'✓ Official links', eyebrowForm:'STEP 1 OF 2', formTitle:"Let's find your schemes", progress:'5 questions · ~1 min',
    age:'Age', state:'State / UT', occupation:'Occupation', income:'Annual household income (₹)', gender:'Gender', category:'Social category', selectState:'Select state', selectOccupation:'Select occupation', selectGender:'Select gender', selectCategory:'Select category', poorHousehold:"Does your household have a BPL or Antyodaya (AAY) ration card, or belong to an SC/ST or PMAY beneficiary family?", noExistingLpg:'Does your household already have an LPG gas connection?', educationLevel:'Which class or course are you studying in?', selectEducation:'Select education level', selectAnswer:'Select answer', yes:'Yes', no:'No',
    privacy:'We do not ask for Aadhaar numbers or bank details. Results are indicative. Please verify eligibility on the official portal.', find:'Find my schemes', resultsEyebrow:'Your results', matches:'potential matches', reset:'Start over', howMatch:'How we match', matchNote:'Eligibility is checked using the answers you provide. Some schemes require additional verification that this finder cannot perform.', footerText:'Helping citizens discover public benefits.', benefit:'Benefit:', checking:'Checking…', official:'Official website ↗', documents:'Documents:', noMatch:'No potential matches found', noMatchText:'We could not find a potential match in our current dataset. This does not mean you are ineligible for other government benefits.', potential:'Potential match', moreChecks:'Additional checks', stateSpecific:'State-specific scheme', error:'We could not check schemes. Please try again.',
    taxPayer:"Do you pay income tax?", socialSecurity:"Are you a member of EPF, ESIC or NPS?", smallFarmer:"Does your family own cultivable land of up to 2 hectares?", traditionalTrade:"Do you work with your hands and tools in a traditional trade, such as carpenter, blacksmith, potter, tailor, barber or mason?", firstJob:"Did you start your first-ever job registered with EPF on or after 1 August 2025?", bplHousehold:"Is your household listed as BPL (Below Poverty Line) in your state?", ownsRoof:"Does your household own a house with a roof suitable for solar panels and an electricity connection?",
    step1Eyebrow:"STEP 1 OF 2", step2Eyebrow:"STEP 2 OF 2", step2Title:"A few more questions", step2Progress:"Optional · about 30 seconds", step2Intro:"These help us check more schemes for you. Skip any you are not sure about.", cont:"Continue", back:"Back", skip:"Skip and see results",
    incomeUnder15k:"Is your own monthly income ₹15,000 or less?", skippedNote:"You skipped {n} question(s), so some schemes may be missing.", answerSkipped:"Answer them"
  },
  hi: {
    status:'मुफ़्त पात्रता खोजक', eyebrow:'सरकारी योजनाओं की खोज', heroTitle:'वे लाभ जिनके लिए आप पात्र हो सकते हैं।', heroAccent:'बिना कागज़ी झंझट के।', howLabel:'यह कैसे काम करता है', how1:'अपने बारे में बताएं', how2:'हम योजना के नियम जांचते हैं', how3:'अगले कदम पाएं', heroText:'आसान सवालों के जवाब दें। YojanaSetu आपके प्रोफ़ाइल को सरकारी योजनाओं के नियमों से मिलाकर अगले कदम बताता है।',
    trust1:'✓ नियम-आधारित मिलान', trust2:'✓ आधार नंबर नहीं मांगते', trust3:'✓ आधिकारिक लिंक', eyebrowForm:'चरण 1 / 2', formTitle:'अपनी योजनाएं खोजें', progress:'5 सवाल · लगभग 1 मिनट',
    age:'उम्र', state:'राज्य / केंद्र शासित प्रदेश', occupation:'पेशा', income:'वार्षिक पारिवारिक आय (₹)', gender:'लिंग', category:'सामाजिक श्रेणी', selectState:'राज्य चुनें', selectOccupation:'पेशा चुनें', selectGender:'लिंग चुनें', selectCategory:'श्रेणी चुनें', poorHousehold:'क्या आपके परिवार के पास BPL या अंत्योदय (AAY) राशन कार्ड है, या आप SC/ST या PMAY लाभार्थी परिवार से हैं?', noExistingLpg:'क्या आपके परिवार के पास पहले से LPG गैस कनेक्शन है?', educationLevel:'आप किस कक्षा या कोर्स में पढ़ रहे हैं?', selectEducation:'शिक्षा का स्तर चुनें', selectAnswer:'उत्तर चुनें', yes:'हाँ', no:'नहीं',
    privacy:'हम आधार नंबर या बैंक विवरण नहीं मांगते। परिणाम संकेतात्मक हैं—आधिकारिक पोर्टल पर पात्रता की पुष्टि करें।', find:'मेरी योजनाएं खोजें', resultsEyebrow:'आपके परिणाम', matches:'संभावित योजनाएं', reset:'फिर से शुरू करें', howMatch:'हम कैसे मिलान करते हैं', matchNote:'पात्रता आपके उत्तरों के आधार पर जांची जाती है। कुछ योजनाओं में अतिरिक्त सत्यापन आवश्यक है जो यह खोजक नहीं कर सकता।', footerText:'नागरिकों को सरकारी लाभ खोजने में मदद।', benefit:'लाभ:', checking:'जांच हो रही है…', official:'आधिकारिक वेबसाइट ↗', documents:'दस्तावेज़:', noMatch:'कोई संभावित योजना नहीं मिली', noMatchText:'हमारे मौजूदा डेटा में संभावित योजना नहीं मिली। इसका अर्थ यह नहीं कि आप अन्य सरकारी लाभों के लिए पात्र नहीं हैं।', potential:'संभावित पात्रता', moreChecks:'अतिरिक्त जांच', stateSpecific:'राज्य-विशिष्ट योजना', error:'योजनाओं की जांच नहीं हो सकी। कृपया दोबारा प्रयास करें।',
    taxPayer:"क्या आप आयकर (इनकम टैक्स) देते हैं?", socialSecurity:"क्या आप EPF, ESIC या NPS के सदस्य हैं?", smallFarmer:"क्या आपके परिवार के पास 2 हेक्टेयर तक खेती योग्य भूमि है?", traditionalTrade:"क्या आप बढ़ई, लोहार, कुम्हार, दर्ज़ी, नाई या राजमिस्त्री जैसे किसी पारंपरिक काम में हाथ और औज़ारों से काम करते हैं?", firstJob:"क्या आपने अपनी पहली नौकरी (EPF में पंजीकृत) 1 अगस्त 2025 या उसके बाद शुरू की?", bplHousehold:"क्या आपका परिवार आपके राज्य में BPL (गरीबी रेखा से नीचे) सूची में है?", ownsRoof:"क्या आपके परिवार का अपना मकान है जिसकी छत पर सोलर पैनल लग सकते हैं और बिजली कनेक्शन है?",
    step1Eyebrow:"चरण 1 / 2", step2Eyebrow:"चरण 2 / 2", step2Title:"कुछ और सवाल", step2Progress:"वैकल्पिक · लगभग 30 सेकंड", step2Intro:"इनसे हम आपके लिए और योजनाएँ जाँच सकते हैं। जिनके बारे में पक्का न हो, उन्हें छोड़ दें।", cont:"आगे बढ़ें", back:"वापस", skip:"छोड़ें और परिणाम देखें",
    incomeUnder15k:"क्या आपकी अपनी मासिक आय ₹15,000 या उससे कम है?", skippedNote:"आपने {n} सवाल छोड़े, इसलिए कुछ योजनाएँ यहाँ नहीं दिख रही होंगी।", answerSkipped:"जवाब दें"
  }
};
const $ = id => document.getElementById(id);
const form = $('finder-form'), results = $('results'), cards = $('cards'), finder = $('finder'), errorBox = $('form-error');
let lang = localStorage.getItem('lang') || 'en';

const themeButton = $('theme-toggle');
const themeIcon = $('theme-icon');
let theme = localStorage.getItem('theme') || 'light';

function applyTheme() {
  document.documentElement.dataset.theme = theme;
  const dark = theme === 'dark';
  themeIcon.textContent = dark ? '☀' : '☾';
  themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  themeButton.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
}

themeButton.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
  applyTheme();
});
applyTheme();

function esc(v) { return String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function addOptions(select, pairs, placeholder) {
  const oldValue = select.value;
  select.innerHTML = `<option value="">${esc(placeholder)}</option>` + pairs.map(([value, hi]) => `<option value="${esc(value)}">${esc(lang === 'hi' ? hi : value)}</option>`).join('');
  if (pairs.some(([v]) => v === oldValue)) select.value = oldValue;
}
let step = 1;
const BOOLS = ['poor_household','no_existing_lpg','tax_payer','social_security_member','small_farmer','traditional_trade','first_formal_job','bpl_household','owns_roof_house','income_under_15k'];

function updateOptionLabels() {
  const education = document.querySelector('[name="education_level"]');
  const oldEducation = education.value;
  const educationOptions = [['Not a student','विद्यार्थी नहीं'],['Class 9','कक्षा 9'],['Class 10','कक्षा 10'],['Class 11–12','कक्षा 11–12'],['College / University','कॉलेज / विश्वविद्यालय'],['Other','अन्य']];
  education.innerHTML = `<option value="">${esc(copy[lang].selectEducation)}</option>` + educationOptions.map(([value, hi]) => `<option value="${esc(value)}">${esc(lang === 'hi' ? hi : value)}</option>`).join('');
  education.value = oldEducation;
  addOptions(document.querySelector('[name="state"]'), states, copy[lang].selectState);
  Object.entries(options).forEach(([key, pairs]) => addOptions(document.querySelector(`[name="${key}"]`), pairs, copy[lang][`select${key[0].toUpperCase()+key.slice(1)}`]));
  document.querySelectorAll('[data-i18n]').forEach(el => { const key = el.dataset.i18n; if (copy[lang][key]) el.textContent = copy[lang][key]; });
  for (const name of BOOLS) {
    const select = document.querySelector(`[name="${name}"]`), value = select.value;
    // "We already have LPG" = Yes, which must be sent as no_existing_lpg=false.
    const [yes, no] = name === 'no_existing_lpg' ? ['false', 'true'] : ['true', 'false'];
    select.innerHTML = `<option value="">${esc(copy[lang].selectAnswer)}</option><option value="${yes}">${esc(copy[lang].yes)}</option><option value="${no}">${esc(copy[lang].no)}</option>`;
    select.value = value;
  }
  document.documentElement.lang = lang;
  paintStep();
  $('lang-toggle').textContent = lang === 'en' ? 'हिंदी' : 'English';
}
function skipBanner() {
  const n = window.skippedCount || 0, t = copy[lang];
  return n ? `<div class="skipnote"><span>${esc(t.skippedNote.replace('{n}', n))}</span><button type="button" class="link" id="answer-skipped">${esc(t.answerSkipped)}</button></div>` : '';
}

function render(schemes) {
  cards.innerHTML = schemes.length ? schemes.map(s => {
    const name = lang === 'hi' && s.name_hi ? s.name_hi : s.name;
    const benefit = lang === 'hi' && s.benefit_hi ? s.benefit_hi : s.benefit;
    const ministry = lang === 'hi' && s.ministry_hi ? s.ministry_hi : s.ministry;
    const tags = lang === 'hi' && s.tags_hi ? s.tags_hi : (s.tags || []);
    const docs = lang === 'hi' && s.documents_hi ? s.documents_hi : (s.documents || []);
    const checkList = lang === 'hi' && s.additional_checks_hi ? s.additional_checks_hi : (s.additional_checks || []);
    const checks = checkList.map(x => `<li>${esc(x)}</li>`).join('');
    return `<article class="scheme-card"><div class="scheme-top"><div><h3>${esc(name)}</h3><div class="ministry">${esc(ministry)}</div></div><span class="chip">${esc(copy[lang].potential)}</span></div><div class="benefit"><strong>${esc(copy[lang].benefit)}</strong> ${esc(benefit)}</div><div class="chips">${tags.map(x=>`<span class="chip">${esc(x)}</span>`).join('')}</div><div class="scheme-actions"><span class="docs"><strong>${esc(copy[lang].documents)}</strong> ${docs.map(esc).join(', ')}</span><a href="${esc(s.official_url)}" target="_blank" rel="noopener noreferrer">${esc(copy[lang].official)}</a></div>${checks ? `<div class="additional-checks"><strong>${esc(copy[lang].moreChecks)}</strong><ul>${checks}</ul></div>` : ''}</article>`;
  }).join('') : `<div class="scheme-card"><h3>${esc(copy[lang].noMatch)}</h3><p class="benefit">${esc(copy[lang].noMatchText)}</p></div>`;
  cards.insertAdjacentHTML('afterbegin', skipBanner());
}
$('lang-toggle').addEventListener('click', () => {
  lang = lang === 'en' ? 'hi' : 'en'; localStorage.setItem('lang', lang); updateOptionLabels();
  if (!results.hidden) render(window.lastSchemes || []);
});
// Ask follow-ups only when they matter: LPG/poverty questions for adult women, class for students.
function applicable() {
  const v = n => form.elements[n].value, age = Number(v('age')), occ = v('occupation');
  const adult = age >= 18, working = age >= 18 && age <= 40;
  // Only ask about income tax if the person earns; students, the unemployed and zero-income users are treated as non-taxpayers.
  const earning = Number(v('income')) > 0 && !['Student', 'Unemployed'].includes(occ);
  const adultWoman = ['Female', 'Other'].includes(v('gender')) && adult;
  const worker = ['Farmer', 'Street vendor', 'Self-employed', 'Informal / daily-wage worker'].includes(occ);
  return {
    poor_household: adultWoman, no_existing_lpg: adultWoman, education_level: occ === 'Student',
    tax_payer: working && earning, social_security_member: working && worker, small_farmer: working && occ === 'Farmer',
    traditional_trade: ['Self-employed', 'Informal / daily-wage worker'].includes(occ),
    first_formal_job: occ === 'Private employee', bpl_household: age >= 60, owns_roof_house: adult && occ !== 'Student',
    income_under_15k: working && ['Informal / daily-wage worker', 'Street vendor', 'Self-employed'].includes(occ)
  };
}

// Step 1 shows the 6 core questions; step 2 shows only the follow-ups that apply.
function syncConditional() {
  Object.entries(applicable()).forEach(([name, on]) => {
    const el = form.elements[name]; el.disabled = !on; if (!on) el.value = '';
    el.closest('label').hidden = !(on && step === 2);
  });
  form.querySelectorAll('.form-grid label:not(.followup)').forEach(l => { l.hidden = step === 2; });
  paintStep();
}

function paintStep() {
  const t = copy[lang], two = step === 2, more = Object.values(applicable()).some(Boolean);
  const q = s => document.querySelector(s);
  q('[data-i18n="eyebrowForm"]').textContent = two ? t.step2Eyebrow : (more ? t.step1Eyebrow : t.eyebrowForm);
  q('[data-i18n="formTitle"]').textContent = two ? t.step2Title : t.formTitle;
  q('[data-i18n="progress"]').textContent = two ? t.step2Progress : t.progress;
  $('step2-intro').hidden = !two; $('step2-intro').textContent = t.step2Intro;
  $('back').hidden = !two; $('skip').hidden = !two;
  form.querySelector('button[type="submit"]').innerHTML = `${esc(!two && more ? t.cont : t.find)} <span>→</span>`;
}
['age', 'gender', 'occupation', 'income'].forEach(n => form.elements[n].addEventListener('input', syncConditional));
syncConditional();
form.addEventListener('submit', async e => {
  e.preventDefault(); errorBox.hidden = true;
  if (!form.checkValidity()) { form.reportValidity(); return; }
  if (step === 1 && Object.values(applicable()).some(Boolean)) { step = 2; syncConditional(); finder.scrollIntoView({behavior:'smooth', block:'start'}); return; }
  // Shown-but-skipped questions are sent as null (unknown), never silently as "No".
  window.skippedCount = [...form.querySelectorAll('.followup select')].filter(s => !s.disabled && !s.value).length;
  const data = Object.fromEntries(new FormData(form));
  BOOLS.forEach(k => { if (k in data) data[k] = data[k] === '' ? null : data[k] === 'true'; });
  if ('education_level' in data && !data.education_level) delete data.education_level;
  const btn = form.querySelector('button[type="submit"]'); btn.disabled = true; btn.textContent = copy[lang].checking;
  try {
    const response = await fetch('/api/match', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)});
    const out = await response.json();
    if (!response.ok) throw new Error(out.error || copy[lang].error);
    window.lastSchemes = out.schemes; render(out.schemes); $('count').textContent = out.count;
    finder.hidden = true; results.hidden = false; results.scrollIntoView({behavior:'smooth', block:'start'});
  } catch (err) { errorBox.textContent = err.message || copy[lang].error; errorBox.hidden = false; }
  finally { btn.disabled = false; paintStep(); }
});
$('reset').addEventListener('click', () => { form.reset(); step = 1; syncConditional(); errorBox.hidden = true; results.hidden = true; finder.hidden = false; updateOptionLabels(); finder.scrollIntoView({behavior:'smooth'}); });
updateOptionLabels();
$('back').addEventListener('click', () => { step = 1; syncConditional(); finder.scrollIntoView({behavior:'smooth', block:'start'}); });
$('skip').addEventListener('click', () => { form.querySelectorAll('.followup select').forEach(s => { s.value = ''; }); form.requestSubmit(); });
cards.addEventListener('click', e => { if (e.target.id === 'answer-skipped') { results.hidden = true; finder.hidden = false; step = 2; syncConditional(); finder.scrollIntoView({behavior:'smooth', block:'start'}); } });
