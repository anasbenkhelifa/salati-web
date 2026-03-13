const fs = require('fs');
const path = require('path');

function fixFiles() {
  const dir = './src/locales';
  
  // EN
  let en = JSON.parse(fs.readFileSync(path.join(dir, 'en.json'), 'utf8'));
  en.brandName = "Salati";
  en.stats.mission = "was created to bring tranquility and precision to your daily prayer routine, with no compromises on privacy, design, or reliability.";
  en.stats.cards = {
    focus: {
      title: "Built for Focus",
      desc: "Every detail is designed to keep distractions away and help you stay connected with your prayers throughout the day."
    },
    privacy: {
      title: "Privacy First",
      desc: "No accounts, no tracking, no ads. Your data stays on your device and yours alone, the way it should be."
    },
    offline: {
      title: "Offline by Default",
      desc: "Core features work without internet. Prayer times are calculated locally so you're never left without guidance."
    }
  };
  fs.writeFileSync(path.join(dir, 'en.json'), JSON.stringify(en, null, 2));

  // FR
  let fr = JSON.parse(fs.readFileSync(path.join(dir, 'fr.json'), 'utf8'));
  fr.brandName = "Salati";
  fr.stats.mission = "a été créé pour apporter tranquillité et précision à votre routine de prière quotidienne, sans compromis sur la confidentialité, le design ou la fiabilité.";
  fr.stats.cards = {
    focus: {
      title: "Conçu pour la Concentration",
      desc: "Chaque détail est conçu pour éloigner les distractions et vous aider à rester connecté avec vos prières tout au long de la journée."
    },
    privacy: {
      title: "Confidentialité Avant Tout",
      desc: "Pas de comptes, pas de suivi, pas de pubs. Vos données restent sur votre appareil et uniquement le vôtre, comme il se doit."
    },
    offline: {
      title: "Hors Ligne par Défaut",
      desc: "Les fonctionnalités principales fonctionnent sans internet. Les horaires de prière sont calculés localement, donc vous n'êtes jamais sans guide."
    }
  };
  fs.writeFileSync(path.join(dir, 'fr.json'), JSON.stringify(fr, null, 2));

  // AR
  let ar = JSON.parse(fs.readFileSync(path.join(dir, 'ar.json'), 'utf8'));
  ar.brandName = "صلاتي";
  ar.stats.mission = "صُمم ليجلب السكينة والدقة لروتين صلاتك اليومي، دون مساومات على الخصوصية، التصميم، أو الموثوقية.";
  ar.stats.cards = {
    focus: {
      title: "مصمم للتركيز",
      desc: "تم تصميم كل التفاصيل لإبعاد المشتتات ومساعدتك على البقاء متصلاً بصلواتك طوال اليوم."
    },
    privacy: {
      title: "الخصوصية أولاً",
      desc: "بدون حسابات، بدون تتبع، بدون إعلانات. بياناتك تبقى على جهازك لك وحدك، كما يجب أن تكون."
    },
    offline: {
      title: "بدون إنترنت افتراضياً",
      desc: "تعمل الميزات الأساسية بدون إنترنت. يتم حساب أوقات الصلاة محلياً لتكون دائمًا على دراية."
    }
  };
  fs.writeFileSync(path.join(dir, 'ar.json'), JSON.stringify(ar, null, 2));

  console.log("SUCCESS");
}

fixFiles();
