export type LangKey = "en" | "hi" | "hing";

export const content: Record<
  LangKey,
  {
    nav: {
      impact: string;
      programs: string;
      founder: string;
      journey: string;
      contact: string;
      connect: string;
    };
    lang: {
      label: string;
      auto: string;
      en: string;
      hi: string;
      hing: string;
    };
    hero: {
      badge: string;
      title: string;
      highlight: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
      quote: string;
      quoteFrom: string;
    };
    stats: Array<{ label: string; value: string }>;
    impact: {
      title: string;
      paragraph: string;
      cards: Array<{ title: string; body: string }>;
      readMore: string;
    };
    programs: {
      title: string;
      ageTag: string;
      items: Array<{ title: string; description: string }>;
    };
    founder: {
      label: string;
      quote: string;
      p1: string;
      p2: string;
      p3: string;
      signature: string;
    };
    contact: {
      title: string;
      paragraph: string;
      lookingForTitle: string;
      lookingFor: string[];
      locationLabel: string;
      basedIn: string;
      rights: string;
    };
  }
> = {
  en: {
    nav: {
      impact: "Impact",
      programs: "Programs",
      founder: "Founder",
      journey: "Our Journey",
      contact: "Contact",
      connect: "Connect with us",
    },
    lang: { label: "Language", auto: "Auto", en: "EN", hi: "हिंदी", hing: "Hinglish" },
    hero: {
      badge: "Himachal Pradesh · Preschool & Primary · NEP 2020",
      title: "Reimagining rural education through",
      highlight: "creativity, care and culture.",
      description:
        "DurlabhCLAP Foundation (DCF) works with preschool and primary children in rural Himachal Pradesh to strengthen their early learning foundation through arts-based, joyful and culturally rooted education.",
      primaryCta: "Explore our journey",
      secondaryCta: "See what we do",
      quote:
        "“Hamare gaon mein pehli baar aisa khel-khel mein padhne wala jagah bana.”",
      quoteFrom: "Parent from Shahpur, Kangra",
    },
    stats: [
      { label: "Children reached", value: "50+" },
      { label: "Centre duration", value: "1.5 years" },
      { label: "Learning spaces", value: "1 pilot centre" },
    ],
    impact: {
      title: "Starting strong, staying curious.",
      paragraph:
        "Our work focuses on children who are just beginning their academic journey. We want their first experience of “school” to be full of curiosity, safety and joy — not fear or pressure. At our Dhanotu centre in Shahpur (Kangra), we worked with children from different family backgrounds, dialects and mother tongues, and saw how arts and play helped them open up to learning.",
      cards: [
        {
          title: "Joyful first classrooms",
          body: "For many children, DCF was their first learning space. We focused on warmth, interaction and trust before textbooks.",
        },
        {
          title: "Languages & dialects respected",
          body: "Children came with different dialects and mother tongues. We treated this as a strength, not a barrier.",
        },
        {
          title: "Aligned with NEP 2020",
          body: "Our approach reflects the spirit of NEP 2020 – experiential, creative and rooted in the child’s context.",
        },
      ],
      readMore: "Read the full story of our pilot in Himachal →",
    },
    programs: {
      title: "What we focus on with children.",
      ageTag: "Early years · Ages 4–10",
      items: [
        {
          title: "Early English Exposure",
          description:
            "Introducing spoken English and basic literacy through stories, songs, role play and everyday conversation.",
        },
        {
          title: "Foundational Mathematics",
          description:
            "Building number sense, patterns and basic operations using play, objects, games and age-appropriate activities.",
        },
        {
          title: "Art, Expression & Computers",
          description:
            "Drawing, colouring, local art, basic computer exposure and expressive activities that keep children curious.",
        },
      ],
    },
    founder: {
      label: "Message from the Founder",
      quote: "Education should not silence children. It should give them a voice.",
      p1:
        "Sahil Dogra, Founder of DurlabhCLAP Foundation, grew up in Delhi and has spent a significant part of his journey working closely in rural villages across India. Through his on-ground experiences, he observed how creativity and emotional expression were slowly disappearing from children’s lives – especially in rural education systems dominated by rigid structures.",
      p2:
        "Instead of beginning from a big city, he chose to pilot DurlabhCLAP Foundation from his grassroots in Shahpur, Kangra, Himachal Pradesh, where his family roots and social reality are deeply connected.",
      p3:
        "For Sahil, DCF is not just an organisation. It is a long-term mission to restore creativity, confidence and cultural pride in children by integrating arts, empathy and local context into how learning happens in villages.",
      signature: "Sahil Dogra, Founder, DurlabhCLAP Foundation",
    },
    contact: {
      title: "Let’s build stronger beginnings together.",
      paragraph:
        "If you're a parent, educator, institution or someone who cares about early childhood education, we would love to connect. Together, we can make the first experiences of school joyful for many more children.",
      lookingForTitle: "What we are looking for:",
      lookingFor: [
        "Partners for early learning interventions",
        "Support for arts-based curriculum development",
        "Fellows and volunteers from local communities",
      ],
      locationLabel: "Location",
      basedIn: "Based in Himachal Pradesh, India",
      rights: "All rights reserved.",
    },
  },

  hi: {
    nav: {
      impact: "प्रभाव",
      programs: "कार्यक्रम",
      founder: "संस्थापक",
      journey: "हमारी यात्रा",
      contact: "संपर्क",
      connect: "हमसे जुड़ें",
    },
    lang: { label: "भाषा", auto: "Auto", en: "EN", hi: "हिंदी", hing: "Hinglish" },
    hero: {
      badge: "हिमाचल प्रदेश · प्रीस्कूल और प्राइमरी · NEP 2020",
      title: "ग्रामीण शिक्षा को नया रूप —",
      highlight: "रचनात्मकता, देखभाल और संस्कृति के साथ।",
      description:
        "DurlabhCLAP Foundation (DCF) हिमाचल प्रदेश के ग्रामीण क्षेत्रों में प्रीस्कूल और प्राइमरी बच्चों के साथ काम करता है, ताकि उनकी शुरुआती सीखने की नींव मजबूत हो सके — कला, आनंद और स्थानीय संस्कृति के साथ।",
      primaryCta: "हमारी यात्रा देखें",
      secondaryCta: "हम क्या करते हैं देखें",
      quote:
        "“Hamare gaon mein pehli baar aisa khel-khel mein padhne wala jagah bana.”",
      quoteFrom: "शाहपुर, कांगड़ा के एक अभिभावक",
    },
    stats: [
      { label: "बच्चों तक पहुँच", value: "50+" },
      { label: "केंद्र अवधि", value: "1.5 वर्ष" },
      { label: "लर्निंग स्पेस", value: "1 पायलट केंद्र" },
    ],
    impact: {
      title: "मजबूत शुरुआत, जिज्ञासु बचपन।",
      paragraph:
        "हम उन बच्चों पर फोकस करते हैं जो अपनी शैक्षणिक यात्रा की शुरुआत कर रहे हैं। हम चाहते हैं कि उनका पहला “स्कूल” अनुभव जिज्ञासा, सुरक्षा और खुशी से भरा हो — डर या दबाव से नहीं। धनोटू केंद्र (शाहपुर, कांगड़ा) में हमने देखा कि कला और खेल बच्चों को सीखने के लिए खुलने में मदद करते हैं।",
      cards: [
        {
          title: "खुशहाल पहली कक्षाएँ",
          body: "कई बच्चों के लिए DCF उनकी पहली सीखने की जगह थी — हमने किताबों से पहले भरोसा और warmth पर काम किया।",
        },
        {
          title: "भाषा और बोली का सम्मान",
          body: "बच्चे अलग-अलग बोलियाँ और मातृभाषाएँ लेकर आते हैं — हमने इसे बाधा नहीं, ताकत माना।",
        },
        {
          title: "NEP 2020 से प्रेरित",
          body: "हमारा तरीका अनुभवात्मक, रचनात्मक और बच्चे के संदर्भ में rooted है — NEP 2020 की भावना के साथ।",
        },
      ],
      readMore: "हिमाचल के पायलट की पूरी कहानी पढ़ें →",
    },
    programs: {
      title: "बच्चों के साथ हम किन बातों पर फोकस करते हैं।",
      ageTag: "Early years · Ages 4–10",
      items: [
        {
          title: "अंग्रेज़ी की शुरुआती समझ",
          description:
            "कहानियों, गानों, रोल-प्ले और रोज़मर्रा की बातचीत के जरिए spoken English और basic literacy।",
        },
        {
          title: "मूलभूत गणित",
          description:
            "खेल, objects और age-appropriate activities के जरिए number sense, patterns और basic operations।",
        },
        {
          title: "कला, अभिव्यक्ति और कंप्यूटर",
          description:
            "ड्रॉइंग, रंग भरना, local art, basic computer exposure और expressive activities — ताकि curiosity बनी रहे।",
        },
      ],
    },
    founder: {
      label: "संस्थापक की बात",
      quote: "शिक्षा बच्चों की आवाज़ दबाए नहीं — उन्हें बोलने का अवसर दे।",
      p1:
        "साहिल डोगरा, DurlabhCLAP Foundation के संस्थापक, दिल्ली में पले-बढ़े हैं और उन्होंने भारत के ग्रामीण क्षेत्रों में लंबे समय तक ऑन-ग्राउंड काम किया है।",
      p2:
        "उन्होंने बड़े शहर से शुरुआत करने के बजाय, अपने roots से — शाहपुर, कांगड़ा (हिमाचल प्रदेश) — इस पायलट को शुरू किया।",
      p3:
        "साहिल के लिए DCF एक long-term mission है: बच्चों में रचनात्मकता, आत्मविश्वास और cultural pride को वापस लाना।",
      signature: "साहिल डोगरा, संस्थापक, DurlabhCLAP Foundation",
    },
    contact: {
      title: "आइए मिलकर मजबूत शुरुआत बनाएं।",
      paragraph:
        "अगर आप अभिभावक, शिक्षक, संस्था या early childhood education की परवाह करने वाले हैं — हमसे जुड़िए। मिलकर हम बच्चों के लिए स्कूल का पहला अनुभव खुशहाल बना सकते हैं।",
      lookingForTitle: "हम किस तरह का सहयोग ढूँढ रहे हैं:",
      lookingFor: [
        "Early learning interventions के लिए partners",
        "Arts-based curriculum development के लिए support",
        "Local communities से fellows और volunteers",
      ],
      locationLabel: "स्थान",
      basedIn: "हिमाचल प्रदेश, भारत में आधारित",
      rights: "सभी अधिकार सुरक्षित।",
    },
  },

  hing: {
    nav: {
      impact: "Impact",
      programs: "Programs",
      founder: "Founder",
      journey: "Our Journey",
      contact: "Contact",
      connect: "Connect",
    },
    lang: { label: "Language", auto: "Auto", en: "EN", hi: "हिंदी", hing: "Hinglish" },
    hero: {
      badge: "Himachal Pradesh · Preschool & Primary · NEP 2020",
      title: "Gaon ki education ko naya shape —",
      highlight: "creativity, care aur culture ke saath.",
      description:
        "DCF rural Himachal ke preschool aur primary kids ke saath kaam karta hai — early learning ko strong banane ke liye, joy + arts + local culture ke through.",
      primaryCta: "Journey dekho",
      secondaryCta: "Hum kya karte hain",
      quote:
        "“Hamare gaon mein pehli baar aisa khel-khel mein padhne wala jagah bana.”",
      quoteFrom: "Parent, Shahpur (Kangra)",
    },
    stats: [
      { label: "Children reached", value: "50+" },
      { label: "Centre duration", value: "1.5 years" },
      { label: "Learning spaces", value: "1 pilot centre" },
    ],
    impact: {
      title: "Strong start, curious childhood.",
      paragraph:
        "Hum un kids ke saath kaam karte hain jo apni academic journey start kar rahe hain. First “school” experience safe, joyful aur curious hona chahiye — fear-based nahi. Dhanotu centre me arts + play ne kids ko learning ke liye open hone me help ki.",
      cards: [
        {
          title: "Joyful first classrooms",
          body: "Kai kids ke liye DCF unki pehli learning space thi — textbook se pehle trust aur warmth.",
        },
        {
          title: "Languages & dialects respected",
          body: "Different boliyan aur mother tongues — humne isko strength maana, barrier nahi.",
        },
        {
          title: "NEP 2020 aligned",
          body: "Experiential, creative aur child context me rooted — bilkul NEP 2020 ke spirit me.",
        },
      ],
      readMore: "Himachal pilot ki full story पढ़ो →",
    },
    programs: {
      title: "Kids ke saath hum kispe focus karte hain.",
      ageTag: "Early years · Ages 4–10",
      items: [
        {
          title: "Early English Exposure",
          description:
            "Stories, songs, role play aur daily conversation se spoken English + basic literacy.",
        },
        {
          title: "Foundational Mathematics",
          description:
            "Play, objects, games aur age-appropriate activities se number sense + patterns + basics.",
        },
        {
          title: "Art, Expression & Computers",
          description:
            "Drawing, colouring, local art, basic computers aur expressive activities — curiosity alive.",
        },
      ],
    },
    founder: {
      label: "Founder ka message",
      quote: "Education ka kaam kids ki awaaz ko dabana nahi — unko voice dena hai.",
      p1:
        "Sahil Dogra Delhi me bade hue, aur rural India me ground-level kaam karte hue unhone ek cheez clearly dekhi — creativity aur expression kids ki life se dheere-dheere kam ho rahe the.",
      p2:
        "Is initiative ko big city se start karne ke bajay, unhone apne roots se — Shahpur, Kangra (HP) — pilot start kiya.",
      p3:
        "DCF ka long-term mission simple hai: kids me creativity, confidence aur cultural pride ko wapas lana.",
      signature: "Sahil Dogra, Founder, DurlabhCLAP Foundation",
    },
    contact: {
      title: "Stronger beginnings, together.",
      paragraph:
        "Aap parent/educator/institution ya supporter hain, toh please connect. Saath milkar kids ke liye school ka first experience joyful bana sakte hain.",
      lookingForTitle: "Hum kya dhoondh rahe hain:",
      lookingFor: [
        "Early learning interventions ke partners",
        "Arts-based curriculum development support",
        "Local community fellows & volunteers",
      ],
      locationLabel: "Location",
      basedIn: "Himachal Pradesh, India",
      rights: "All rights reserved.",
    },
  },
};
