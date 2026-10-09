import type { Lesson, QuizQuestionData, RegionalScenario, ScamItem, Achievement } from '../types';

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Where did my pocket money go?',
    estimatedTime: '5 min',
    difficulty: 'Beginner',
    category: 'Budgeting',
    description: 'Learn the simple art of tracking small daily cash & UPI spends before they vanish into thin air.',
    content: {
      overview: 'Ever received ₹500 at the start of the week and wondered by Thursday where every rupee went? You are not bad with money; you just haven’t made your spending visible.',
      keyConcept: 'Cash leaks happen in micro-transactions: ₹20 chai, ₹40 metro recharge, ₹60 canteen samosa. Small numbers feel invisible in the moment but compound quickly.',
      realIndianStory: 'Kavya, an 11th grader in Delhi, thought she only spent ₹100 a week. When she jotted down every UPI tap in her notes app for 7 days, she discovered ₹480 went to post-school packaged snacks and quick auto rides.',
      practicalTip: 'The 3-Second Note Rule: Whenever you tap your UPI or hand over cash, open your notes app and type the amount before taking the first bite or stepping away.',
      ruleOfThumb: 'Track for just 7 consecutive days. You don’t have to stop spending; simply observe where your rupees naturally gravitate.',
      reflectionQuestion: 'What is one recurring ₹30 to ₹50 expense you make without thinking about it twice?'
    }
  },
  {
    id: 'lesson-2',
    title: 'Needs, wants, and the ₹500 decision',
    estimatedTime: '6 min',
    difficulty: 'Beginner',
    category: 'Saving',
    description: 'A calm framework to separate essential everyday survival costs from lifestyle upgrades without feeling deprived.',
    content: {
      overview: 'Understanding the difference between a need and a want isn’t about denying yourself treats. It is about prioritizing peace of mind first, so you can enjoy treats guilt-free.',
      keyConcept: 'A Need is something essential to your daily functioning, health, or education (bus fare, textbook, modest lunch). A Want is an upgrade or comfort (branded drink, cab surge, limited-edition case).',
      realIndianStory: 'Arjun received ₹500 from his grandmother on Diwali. His friends were heading to a multiplex with ₹300 tickets. Instead of saying no outright, Arjun asked: "Does this leave me enough for my bus pass and stationery?" He chose a student matinee and saved ₹250.',
      practicalTip: 'The 48-Hour Pause: For any non-essential purchase above ₹300, wait 48 hours. If you still feel the same pull after two sunrises, budget for it intentionally.',
      ruleOfThumb: '50/30/20 adapted for teens: 50% for school/transit needs, 30% for guilt-free wants, 20% untouched in your savings jar.',
      reflectionQuestion: 'If you had to choose between an immediate dessert today or saving towards a pair of running shoes next month, which creates lasting value?'
    }
  },
  {
    id: 'lesson-3',
    title: 'UPI: Fast, useful, and safe',
    estimatedTime: '5 min',
    difficulty: 'Beginner',
    category: 'Digital payments',
    description: 'Master India’s revolutionary payment network: how QR codes work, UPI PIN rules, and transaction safety.',
    content: {
      overview: 'UPI (Unified Payments Interface) has transformed Indian commerce from vegetable vendors to mega retailers. With speed comes the responsibility to safeguard your access credentials.',
      keyConcept: 'CRITICAL RULE: You ONLY enter your UPI PIN when SENDING money or checking your bank balance. You NEVER enter your PIN to RECEIVE cashback, rewards, or payments.',
      realIndianStory: 'Rohan saw a QR code sent by a buyer on OLX saying "Scan this and enter PIN to accept ₹1,200 for your old cycle". Remembering his safety rule, Rohan refused. The buyer was attempting a reverse collect scam.',
      practicalTip: 'Set transaction limits on your bank’s mobile app (e.g., maximum ₹1,000 per transaction for teenagers) to limit exposure if a phone is misplaced.',
      ruleOfThumb: 'Green checkmarks and SMS notifications: Always wait for the merchant soundbox or official bank SMS before assuming a transfer succeeded.',
      reflectionQuestion: 'Why do you think scammers try to rush you when requesting a UPI payment?'
    }
  },
  {
    id: 'lesson-4',
    title: 'How a bank account actually works',
    estimatedTime: '7 min',
    difficulty: 'Intermediate',
    category: 'Banking',
    description: 'Demystifying minor savings accounts, IFSC codes, debit cards, interest accrual, and monthly statements.',
    content: {
      overview: 'In India, teenagers above 10 years can open independent minor savings accounts in public and private banks. Having your own account is the foundation of financial identity.',
      keyConcept: 'A savings bank account keeps your funds secure from physical loss, earns quarterly interest (usually 3%–4% per annum), and generates a digital audit trail.',
      realIndianStory: 'Naina opened an SBI PehlaKadam account at age 15 with her parent. With her personalized debit card and zero-fee mobile alerts, she learned to read monthly statements and audit debits.',
      practicalTip: 'Check your e-statement monthly. Verify every line item against your memories. It takes less than 3 minutes and catches unauthorized subscription renewals early.',
      ruleOfThumb: 'Keep your account number public if needed for receiving fees or scholarships, but keep your CVV, OTP, and PIN strictly confidential.',
      reflectionQuestion: 'What is the main difference between keeping cash under a mattress versus in a regulated bank account?'
    }
  },
  {
    id: 'lesson-5',
    title: 'Saving for your first phone',
    estimatedTime: '8 min',
    difficulty: 'Intermediate',
    category: 'Saving',
    description: 'Turn an intimidating ₹14,000 gadget goal into an achievable 6-month visual sinking fund without relying on debt.',
    content: {
      overview: 'A large purchase feels impossible when viewed as a single giant lump sum. Breaking it into small milestones makes discipline feel rewarding rather than punishing.',
      keyConcept: 'A Sinking Fund is a dedicated pocket of money where you set aside small fixed amounts every week or month for a specific, predetermined purchase.',
      realIndianStory: 'Vikram wanted a ₹12,000 smartphone for college coursework. Instead of asking his parents to pay entirely, he proposed a match: he would save ₹6,000 over 5 months by tutoring a neighbor’s kid and cutting takeaway, and his parents matched the rest.',
      practicalTip: 'Use visual milestone markers. Draw a thermometer or 10-box grid in your diary. Fill a box for every ₹500 saved into your dedicated account.',
      ruleOfThumb: 'Target date = Target cost ÷ monthly capacity. If you need ₹6,000 and can save ₹1,000/month, your horizon is exactly 6 calm months.',
      reflectionQuestion: 'How does it feel to hold something you worked and saved for patiently, compared to receiving an impulsive impulse gift?'
    }
  },
  {
    id: 'lesson-6',
    title: 'Interest: Money that grows',
    estimatedTime: '7 min',
    difficulty: 'Intermediate',
    category: 'Investing basics',
    description: 'Understand simple versus compound interest, fixed deposits (FD), and how time is your greatest asset at age 16.',
    content: {
      overview: 'Albert Einstein reportedly called compound interest the eighth wonder of the world. For young Indians with decades ahead, compounding is a quiet financial superpower.',
      keyConcept: 'Compounding means earning interest not just on your initial principal, but also on the interest previously earned. Your rupees create junior rupees that work for you 24/7.',
      realIndianStory: 'If 16-year-old Meera puts ₹5,000 into a 7% Recurring Deposit (RD) and leaves it to compound, the snowball effect creates vastly more wealth over 10 years than someone starting at 30.',
      practicalTip: 'Ask your bank or parents about opening a Recurring Deposit (RD) for ₹500/month. It automates discipline and locks in a steady, guaranteed return.',
      ruleOfThumb: 'The Rule of 72: Divide 72 by the annual interest rate to find out how many years it takes for your money to double (e.g., 72 ÷ 7.2% ≈ 10 years).',
      reflectionQuestion: 'Why is starting with ₹200 a month at age 16 often more powerful than starting with ₹2,000 a month at age 35?'
    }
  },
  {
    id: 'lesson-7',
    title: 'Scams, OTPs, and staying safe online',
    estimatedTime: '6 min',
    difficulty: 'Beginner',
    category: 'Online safety',
    description: 'Recognize fake electricity bills, fraudulent courier alerts, lottery scams, and impersonators preying on students.',
    content: {
      overview: 'Cyber fraudsters rely on urgency, fear, and greed. Understanding their psychological scripts protects your hard-earned pocket money and your family’s savings.',
      keyConcept: 'No legitimate Indian institution (RBI, your bank, electricity board, police) will EVER ask for your One Time Password (OTP) or demand urgent UPI transfer to avoid legal action.',
      realIndianStory: 'Aman got an SMS: "Dear consumer, your electricity will be disconnected tonight at 9:30 PM due to unpaid bill. Call 89201xxxxx immediately." Aman checked the official power company app; his bill was paid. The SMS was an impersonation fraud.',
      practicalTip: 'When in doubt, initiate contact independently. Never call numbers printed inside an alarming SMS or click links inside urgent WhatsApp messages.',
      ruleOfThumb: 'The Golden Pause: Whenever a message induces panic or excitement ("Win ₹25,000 instantly"), take a deep breath and wait 5 minutes before tapping anything.',
      reflectionQuestion: 'What are the three most common emotional triggers scammers exploit to bypass rational thought?'
    }
  },
  {
    id: 'lesson-8',
    title: 'Your first small business',
    estimatedTime: '8 min',
    difficulty: 'Intermediate',
    category: 'Earning and entrepreneurship',
    description: 'How Indian students earn through skills: freelancing, graphic design, tutoring, handmade items, and basic unit economics.',
    content: {
      overview: 'Earning your first rupee through your own skill shifts your mindset from passive consumer to creator. Teen entrepreneurship teaches budgeting, pricing, and communication.',
      keyConcept: 'Unit Economics: Revenue minus Direct Costs equals Gross Profit. If baking 10 brownies costs ₹150 in ingredients and you sell them for ₹300, your profit is ₹150.',
      realIndianStory: 'Diya in Pune enjoyed calligraphy. During festival season, she offered customized Diwali gift tags for ₹15 each. She invested ₹200 in craft paper and pens, sold 60 tags, and earned ₹900.',
      practicalTip: 'Price based on value and time, not just materials. Factor in your research, revisions, and packaging.',
      ruleOfThumb: 'Keep business money separate from personal pocket money. Use a simple notebook ledger to record every raw material purchase.',
      reflectionQuestion: 'What is one skill you enjoy (drawing, video editing, coding, cooking) that someone in your neighborhood or online community would value?'
    }
  },
  {
    id: 'lesson-9',
    title: 'The Borrowing Trap: BNPL & Friends',
    estimatedTime: '6 min',
    difficulty: 'Intermediate',
    category: 'Borrowing',
    description: 'How "Buy Now, Pay Later" schemes and casual peer loans create invisible stress, and how to borrow ethically if ever needed.',
    content: {
      overview: 'Credit feels like free money when you click "checkout in 3 zero-cost EMIs". But unpaid balances carry hidden penalty fees and jeopardize financial discipline.',
      keyConcept: 'Debt is spending tomorrow’s income today. When you owe money, your future choices become restricted before you even wake up.',
      realIndianStory: 'Karthik used a BNPL app to buy headphones for ₹1,800. He missed the due date by 3 days because his pocket money was delayed. A late fee of ₹350 was slapped on top, turning a discount into a loss.',
      practicalTip: 'If you can’t afford to buy something twice in cash right now, you cannot afford to buy it on credit.',
      ruleOfThumb: 'Keep peer loans crystal clear. If you borrow ₹50 for metro ticket from a friend, repay them the same evening without being reminded.',
      reflectionQuestion: 'Why does paying later make us spend more than handing over physical notes in person?'
    }
  }
];

export const QUIZ_QUESTIONS: QuizQuestionData[] = [
  {
    id: 1,
    question: 'You receive ₹1,500. Which action is the best first step?',
    context: 'Think about building lasting financial calm rather than immediate consumption.',
    options: [
      'Spend ₹1,000 on shopping and think about the rest later',
      'Set aside 20% (₹300) into savings before allocating the rest',
      'Lend it to friends immediately so they think you are generous',
      'Put all ₹1,500 into risky crypto tokens for overnight returns'
    ],
    correctAnswer: 1,
    explanation: 'Paying yourself first (allocating 20% to savings as soon as money arrives) ensures your future fund grows automatically before discretionary spending kicks in.',
    tag: 'Saving Basics'
  },
  {
    id: 2,
    question: 'What is an emergency fund?',
    context: 'A cornerstone concept in personal finance for Indian families and students.',
    options: [
      'Money saved exclusively for festive shopping and Diwali fireworks',
      'A stash of cash reserved for unexpected essential needs like urgent travel or medical costs',
      'A loan you take from an online quick-credit app when broke',
      'A wallet balance meant for ordering late-night snacks'
    ],
    correctAnswer: 1,
    explanation: 'An emergency fund is a safety cushion set aside exclusively for unplanned essential events (e.g., sudden doctor visit, lost transit card). It prevents you from falling into debt during surprises.',
    tag: 'Financial Safety'
  },
  {
    id: 3,
    question: 'Should you share your UPI PIN to receive money?',
    context: 'Digital payment security across apps like PhonePe, Google Pay, and Paytm.',
    options: [
      'Yes, entering your PIN confirms your bank identity to the sender',
      'Yes, but only if the amount is greater than ₹1,000',
      'No, you NEVER enter your UPI PIN to receive money',
      'Yes, if the person sends an official-looking QR code'
    ],
    correctAnswer: 2,
    explanation: 'Your UPI PIN is exclusively for AUTHORIZING DEDUCTIONS from your account. Receiving money requires zero authorization from your side. Any prompt asking for PIN to receive funds is a scam.',
    tag: 'Digital Payments'
  },
  {
    id: 4,
    question: 'What does interest mean in personal finance?',
    context: 'Understanding banking returns and the cost of borrowed money.',
    options: [
      'How much you care about the stock market',
      'Money earned on savings, or the extra fee paid when borrowing money',
      'A government penalty for not maintaining minimum balance',
      'The discount offered by food delivery apps during sales'
    ],
    correctAnswer: 1,
    explanation: 'Interest works both ways: it is the reward your bank pays you for keeping savings with them, or the rental cost you pay a lender for using their money.',
    tag: 'Banking & Growth'
  },
  {
    id: 5,
    question: 'Which of the following is a "need" rather than a "want"?',
    context: 'Evaluating daily purchases for school and life.',
    options: [
      'A monthly metro pass to travel to your coaching institute',
      'A limited-edition sneaker collab worn by your favorite influencer',
      'Premium streaming subscription with 4K Ultra HD add-on',
      'An iced caramel macchiato after evening tuition'
    ],
    correctAnswer: 0,
    explanation: 'A monthly metro pass directly impacts your ability to attend school or coaching classes, making it a foundational need. The others are lifestyle enhancements or wants.',
    tag: 'Budgeting'
  },
  {
    id: 6,
    question: 'Why should you compare a loan’s total repayment amount instead of just the monthly EMI?',
    context: 'Looking beyond attractive marketing offers on smartphones and gadgets.',
    options: [
      'Because banks prefer larger numbers on their printed brochures',
      'Because low monthly EMIs often disguise high interest rates and hidden processing charges',
      'Because total repayment is always identical regardless of duration',
      'Because EMIs are only paid once a year in India'
    ],
    correctAnswer: 1,
    explanation: 'A ₹1,200/month EMI might look painless, but if stretched over 24 months for an ₹18,000 phone, you end up paying ₹28,800 in total. Always calculate the true final cost.',
    tag: 'Borrowing Wisely'
  }
];

export const REGIONAL_SCENARIOS: RegionalScenario[] = [
  {
    id: 'scen-bengaluru',
    location: 'Bengaluru',
    state: 'Karnataka',
    characterName: 'Aaditya',
    age: 17,
    role: 'Junior College Student & Tech Intern',
    story: 'Aaditya commutes from Indiranagar to Jayanagar daily for prep classes. He receives ₹2,500 monthly pocket money. Cab surge prices during monsoon and cafe hangouts with batchmates are draining his funds within 12 days.',
    moneyDecision: 'How should Aaditya optimize his transport and food budget without missing out on study group conversations?',
    regionalPhrase: 'Bega Baa (Come quickly) / Smart Metro Jugaad',
    phraseMeaning: 'Balancing Bangalore rush hours with smart commuter discipline.',
    choices: [
      {
        id: 'c1',
        text: 'Buy a Namma Metro smart card with 5% fare discount, and organize group study at the public library instead of expensive third-wave cafes.',
        consequence: 'He cuts transport by ₹900, enjoys reliable commute times, and his friends appreciate the quiet study atmosphere.',
        financialHealthImpact: 20,
        isOptimal: true
      },
      {
        id: 'c2',
        text: 'Continue taking auto aggregators during surge hours and skip lunch to balance the math.',
        consequence: 'He runs out of energy for evening classes and his health suffers. Skipping essentials to fund conveniences is unsustainable.',
        financialHealthImpact: -15,
        isOptimal: false
      },
      {
        id: 'c3',
        text: 'Ask his parents for an extra ₹1,500 emergency allowance every time it rains.',
        consequence: 'Delays learning personal budgeting boundaries and creates dependence on bailouts.',
        financialHealthImpact: -5,
        isOptimal: false
      }
    ],
    lessonLearned: 'Fixed transit passes and mindful venue choices protect your baseline budget while keeping social bonds intact.'
  },
  {
    id: 'scen-mumbai',
    location: 'Mumbai',
    state: 'Maharashtra',
    characterName: 'Priya',
    age: 16,
    role: '11th Grade Science Student',
    story: 'Priya lives in Thane and travels to Dadar for JEE coaching. She needs ₹3,000 for specialized reference books by next month, but her family’s budget is tight.',
    moneyDecision: 'What is the most sustainable way for Priya to fund her study materials?',
    regionalPhrase: 'Kifayati (Economical / Value-focused)',
    phraseMeaning: 'The Mumbai spirit of resourcefulness and making every rupee count.',
    choices: [
      {
        id: 'c1',
        text: 'Visit the second-hand book stalls near Fort / Matunga, buy used editions in good condition for ₹1,100, and sell them back after her exams.',
        consequence: 'She gets all identical study content, saves ₹1,900, and leaves zero financial strain on her family.',
        financialHealthImpact: 25,
        isOptimal: true
      },
      {
        id: 'c2',
        text: 'Sign up for a quick student instant-cash app that offers instant ₹3,000 with a 30-day repayment deadline.',
        consequence: 'Predatory lending apps charge exorbitant interest and access contacts. A dangerous spiral for teenagers.',
        financialHealthImpact: -30,
        isOptimal: false
      },
      {
        id: 'c3',
        text: 'Borrow from three different classmates with promises to pay back from unknown future pocket money.',
        consequence: 'Creates social awkwardness and stress when friends ask for their money back.',
        financialHealthImpact: -10,
        isOptimal: false
      }
    ],
    lessonLearned: 'Second-hand markets and circular economy choices offer 100% utility at a fraction of the sticker price.'
  },
  {
    id: 'scen-jaipur',
    location: 'Jaipur',
    state: 'Rajasthan',
    characterName: 'Raghav',
    age: 17,
    role: 'Helping at Family Handloom Workshop',
    story: 'Raghav helps his uncle at their textile craft shop in Johari Bazaar during weekends. The store loses sales when tourist customers only carry UPI or foreign cards, but his uncle is hesitant about digital accounts.',
    moneyDecision: 'How can Raghav help modernize the shop’s payment flow securely?',
    regionalPhrase: 'Hisab-Kitab (Balanced Accounts)',
    phraseMeaning: 'Traditional Rajasthani merchant precision combined with modern tools.',
    choices: [
      {
        id: 'c1',
        text: 'Help his uncle set up an official Merchant QR Soundbox linked to the firm’s current account with audio verification for every transaction.',
        consequence: 'Shop eliminates cash-change delays, tourists pay effortlessly, and uncle gains trust from immediate audio payment alerts.',
        financialHealthImpact: 25,
        isOptimal: true
      },
      {
        id: 'c2',
        text: 'Accept payments into Raghav’s personal UPI and hand over cash from his school bag.',
        consequence: 'Mixes business revenue with personal student money, creating accounting confusion and tax record headaches.',
        financialHealthImpact: -10,
        isOptimal: false
      },
      {
        id: 'c3',
        text: 'Insist that tourists visit nearby ATMs to fetch paper cash notes.',
        consequence: 'Customers walk away to other shops with digital payment signs; shop loses up to 35% of weekend sales.',
        financialHealthImpact: -5,
        isOptimal: false
      }
    ],
    lessonLearned: 'Clear separation of business and personal accounts is the golden rule of commerce.'
  },
  {
    id: 'scen-kochi',
    location: 'Kochi',
    state: 'Kerala',
    characterName: 'Ananya',
    age: 18,
    role: 'First-Year College Student',
    story: 'Ananya noticed small deductions of ₹119, ₹179, and ₹299 hitting her bank account every month for music, photo editing, and cloud storage subscriptions she forgot she signed up for.',
    moneyDecision: 'What step will clean up Ananya’s leaking digital subscriptions?',
    regionalPhrase: 'Micro-chitharal (Scattered micro-expenses)',
    phraseMeaning: 'Noticing how auto-debits silently eat away monthly allowances.',
    choices: [
      {
        id: 'c1',
        text: 'Conduct a 20-minute digital audit: cancel unused auto-debit mandates in her UPI app and share a family plan with classmates for essential tools.',
        consequence: 'She frees up ₹450 every month (₹5,400 per year) with zero loss in lifestyle satisfaction.',
        financialHealthImpact: 20,
        isOptimal: true
      },
      {
        id: 'c2',
        text: 'Block her entire debit card and stop using digital banking entirely.',
        consequence: 'An overreaction that eliminates convenience rather than fixing the underlying habit of managing subscriptions.',
        financialHealthImpact: -5,
        isOptimal: false
      },
      {
        id: 'c3',
        text: 'Ignore the charges since ₹119 feels too small to matter on a single day.',
        consequence: 'Compounded over college, over ₹15,000 vanishes on services never opened.',
        financialHealthImpact: -15,
        isOptimal: false
      }
    ],
    lessonLearned: 'Audit auto-debit mandates quarterly. What you don’t actively use should never silently deduct from your account.'
  },
  {
    id: 'scen-guwahati',
    location: 'Guwahati',
    state: 'Assam',
    characterName: 'Dhiren',
    age: 17,
    role: 'Higher Secondary Student',
    story: 'Dhiren is preparing to move into a university hostel in Shillong. His family allocated ₹15,000 for set-up costs (mattress, bucket, study lamp, books, pantry supplies).',
    moneyDecision: 'How should Dhiren pace his setup expenditure?',
    regionalPhrase: 'Hosa-Sosa (Thoughtful thrift)',
    phraseMeaning: 'Distinguishing day-one necessities from items you can acquire gradually.',
    choices: [
      {
        id: 'c1',
        text: 'Create a Tier-1 (Day 1 survival) vs Tier-2 (Week 2 comfort) checklist, buying basics first and sharing bulk items with his roommate.',
        consequence: 'Spends ₹9,500 on essentials and retains a ₹5,500 emergency buffer for mid-semester needs.',
        financialHealthImpact: 20,
        isOptimal: true
      },
      {
        id: 'c2',
        text: 'Spend all ₹15,000 on day one at a luxury mall buying matching branded room decor and kitchen appliances.',
        consequence: 'Runs out of cash before the second week starts, leaving zero room for university lab manuals.',
        financialHealthImpact: -20,
        isOptimal: false
      },
      {
        id: 'c3',
        text: 'Buy nothing and rely entirely on borrowing items from seniors in the dorm.',
        consequence: 'Strains personal relationships and creates social discomfort.',
        financialHealthImpact: -5,
        isOptimal: false
      }
    ],
    lessonLearned: 'Staggered purchasing prevents buyer’s remorse and preserves liquidity during major life transitions.'
  },
  {
    id: 'scen-hyderabad',
    location: 'Hyderabad',
    state: 'Telangana',
    characterName: 'Sameera',
    age: 17,
    role: 'Aspiring Illustrator & High Schooler',
    story: 'Sameera just delivered a set of social media graphics for a local cafe in Jubilee Hills and earned her very first freelance paycheck of ₹4,500.',
    moneyDecision: 'How should Sameera allocate her first earned income?',
    regionalPhrase: 'Modati Sampadana (First Earning)',
    phraseMeaning: 'Honoring your first independent income with balance and foresight.',
    choices: [
      {
        id: 'c1',
        text: 'Treat her family to a modest celebratory sweet box (₹500), reinvest ₹1,500 into a digital drawing tablet stylus, and save ₹2,500 into an RD.',
        consequence: 'Builds self-worth, equips her to take bigger freelance gigs, and anchors savings discipline.',
        financialHealthImpact: 25,
        isOptimal: true
      },
      {
        id: 'c2',
        text: 'Spend all ₹4,500 in one afternoon on fast-fashion clothes to celebrate.',
        consequence: 'Fleeting satisfaction with zero tools or savings to show for days of creative labor.',
        financialHealthImpact: -15,
        isOptimal: false
      },
      {
        id: 'c3',
        text: 'Leave the entire cash amount in an open drawer without recording or depositing it.',
        consequence: 'Prone to accidental loss or trickle-spending without mindful awareness.',
        financialHealthImpact: -5,
        isOptimal: false
      }
    ],
    lessonLearned: 'Divide first earnings: Celebrate slightly, reinvest in your craft, and save the lion’s share.'
  },
  {
    id: 'scen-lucknow',
    location: 'Lucknow',
    state: 'Uttar Pradesh',
    characterName: 'Kabir',
    age: 16,
    role: 'Class 11 Student',
    story: 'During a Big Billion Days online sale, Kabir sees a branded smartwatch listed at "70% OFF: Was ₹7,999, Now ₹2,399 for the next 4 hours only!" He already has a working digital watch.',
    moneyDecision: 'How should Kabir analyze this urgent promotional deal?',
    regionalPhrase: 'Tameez aur Samajh (Refined discernment)',
    phraseMeaning: 'Looking beyond loud marketing spectacles with cool composure.',
    choices: [
      {
        id: 'c1',
        text: 'Recognize artificial countdown timers as FOMO triggers: if he didn’t need a watch yesterday, spending ₹2,399 isn’t saving 70%, it is losing ₹2,399.',
        consequence: 'He keeps his ₹2,399 intact, avoids clutter, and builds immunity against predatory sales tactics.',
        financialHealthImpact: 20,
        isOptimal: true
      },
      {
        id: 'c2',
        text: 'Panic and buy it immediately because "it will never be this cheap again".',
        consequence: 'Within two weeks the gadget sits unused in a drawer, while he lacks funds for school project materials.',
        financialHealthImpact: -15,
        isOptimal: false
      },
      {
        id: 'c3',
        text: 'Take a loan from his elder sibling to buy two watches and try reselling one to a classmate.',
        consequence: 'Unsolicited speculative reselling creates family friction and unsold inventory risk.',
        financialHealthImpact: -10,
        isOptimal: false
      }
    ],
    lessonLearned: 'You don’t save money by buying something on discount that you never intended to purchase.'
  },
  {
    id: 'scen-pune',
    location: 'Pune',
    state: 'Maharashtra',
    characterName: 'Tanvi',
    age: 17,
    role: 'Arts Student & Cyclist',
    story: 'Tanvi wants to choose between a trendy ₹1,200/month boutique yoga studio pass that her friends attend, versus putting ₹1,200/month towards her goal of upgrading her 4-year-old laptop for college applications.',
    moneyDecision: 'What is the balanced approach for Tanvi’s fitness and tech goals?',
    regionalPhrase: 'Moolya (Intrinsic Value)',
    phraseMeaning: 'Evaluating which investments yield genuine long-term compound dividends.',
    choices: [
      {
        id: 'c1',
        text: 'Form a free weekend cycling & yoga park group with classmates, and direct the full ₹1,200 monthly into her laptop sinking fund.',
        consequence: 'She stays fit, creates a closer circle of friends, and has ₹9,600 ready by laptop upgrade season.',
        financialHealthImpact: 20,
        isOptimal: true
      },
      {
        id: 'c2',
        text: 'Join the yoga studio and put the laptop on an expensive zero-downpayment EMI next year.',
        consequence: 'Takes on high-cost consumer debt right as she enters university.',
        financialHealthImpact: -15,
        isOptimal: false
      },
      {
        id: 'c3',
        text: 'Drop both fitness and laptop dreams and spend the money on random weekend cafe visits.',
        consequence: 'Drifts along without building either physical health or academic capability.',
        financialHealthImpact: -10,
        isOptimal: false
      }
    ],
    lessonLearned: 'Smart substitutions let you achieve health and happiness without sabotaging your major long-term goals.'
  }
];

export const SCAM_ITEMS: ScamItem[] = [
  {
    id: 'scam-1',
    channel: 'SMS',
    sender: 'VM-SBINB',
    timestamp: 'Today, 2:42 PM',
    messageContent: 'Dear SBI User, Your YONO Account will be DEACTIVATED today due to pending PAN/KYC verification. Kindly click immediately to update your documents: http://sbi-kyc-verify-portal.in/pan',
    type: 'scam',
    explanation: 'Banks in India NEVER send unverified third-party links or threaten same-day deactivation via SMS. Official banking URLs always end in .sbi or .bank.sbi, never obscure .in/pan domains.',
    redFlags: [
      'Artificial panic ("DEACTIVATED today")',
      'Unverified external link (sbi-kyc-verify-portal.in)',
      'Demanding KYC submission via open web form'
    ]
  },
  {
    id: 'scam-2',
    channel: 'UPI App',
    sender: 'CashbackRewards_9821',
    timestamp: 'Today, 4:15 PM',
    messageContent: 'PAYMENT REQUEST: ₹1,500. Message from sender: "Congratulations! You won Diwali Dhamaka Cashback. Enter UPI PIN now to accept ₹1,500 into your account."',
    type: 'scam',
    explanation: 'This is a classic UPI Collect fraud. In UPI architecture, you NEVER enter your PIN to receive money. Entering your PIN authorises an IMMEDIATE DEDUCTION of ₹1,500 from your bank.',
    redFlags: [
      'Collect request framed as "Cashback"',
      'Asking for UPI PIN to receive money',
      'Unsolicited reward message'
    ]
  },
  {
    id: 'scam-3',
    channel: 'SMS',
    sender: 'AD-HDFCBK',
    timestamp: 'Yesterday, 10:14 AM',
    messageContent: 'OTP for your transaction of INR 340.00 at Swiggy on HDFC Bank Card ending 4012 is 849201. Valid for 5 mins. DO NOT SHARE this OTP with anyone, including bank officials.',
    type: 'safe',
    explanation: 'This is a genuine transactional OTP triggered by an authentic user purchase. The bank clearly states the merchant, exact amount, and warns you to never share the code.',
    redFlags: [
      'None. This is an authentic transactional verification message.'
    ]
  },
  {
    id: 'scam-4',
    channel: 'Instagram DM',
    sender: 'StudentDeals_India_Official',
    timestamp: 'Today, 11:30 AM',
    messageContent: 'Hey Aarav! You have been selected as our Campus Brand Ambassador. We will courier you free headphones + ₹2,000 stipend. Just send us ₹199 courier registration fee via GPay to verify your address.',
    type: 'scam',
    explanation: 'Legitimate brand partnerships never ask students to pay upfront "registration" or "courier fees" via personal UPI handles. Once you send ₹199, they block you.',
    redFlags: [
      'Unsolicited DM offering free high-value gifts',
      'Demanding upfront payment to receive a "free" prize',
      'Payment directed to personal UPI handle'
    ]
  },
  {
    id: 'scam-5',
    channel: 'WhatsApp',
    sender: '+91 99120 48291',
    timestamp: 'Today, 9:02 AM',
    messageContent: 'Part-Time Work From Home for Students! Like 3 YouTube videos and earn ₹500 per day. No investment. Payout every 2 hours via UPI. Contact HR Manager on Telegram: @WorkEasyJobs',
    type: 'suspicious',
    explanation: 'This is the notorious "YouTube Like / Task" pyramid scam. They initially pay ₹100 to build trust, then trap students into investing ₹5,000 or ₹20,000 into fake crypto tasks that cannot be withdrawn.',
    redFlags: [
      'Unrealistic pay for trivial effort (₹500 for liking 3 videos)',
      'Redirecting off-platform to anonymous Telegram channels',
      'Unverified phone number claiming to be HR'
    ]
  },
  {
    id: 'scam-6',
    channel: 'SMS',
    sender: 'DM-UPSIDC',
    timestamp: 'Today, 1:12 PM',
    messageContent: 'Dear Consumer, Your electricity bill for meter no. 481903 is due on 15th of this month. Pay online at official portal upenergy.in or via your regular UPI app before due date.',
    type: 'safe',
    explanation: 'Notice the difference: this message gives days of advance notice, refers to the official state portal, does not threaten power cut tonight, and provides no suspicious personal phone number.',
    redFlags: [
      'None. Standard reminder with reasonable due date and official portal.'
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Completed your first interactive lesson on FinNest',
    icon: 'Compass',
    criteria: 'Complete 1 lesson',
    unlocked: false
  },
  {
    id: 'saving-starter',
    title: 'Saving Starter',
    description: 'Mastered the 50/30/20 principle and set aside a 20%+ savings buffer',
    icon: 'PiggyBank',
    criteria: 'Achieve >20% savings in Budget Builder',
    unlocked: false
  },
  {
    id: 'scam-spotter',
    title: 'Scam Spotter',
    description: 'Correctly identified digital payment frauds and phishing attempts',
    icon: 'ShieldCheck',
    criteria: 'Score 80%+ in Scam Detective',
    unlocked: false
  },
  {
    id: 'budget-builder',
    title: 'Budget Builder',
    description: 'Successfully balanced a ₹2,000 monthly teen pocket money allocation',
    icon: 'Sliders',
    criteria: 'Submit a balanced budget in Game 1',
    unlocked: false
  },
  {
    id: 'consistent-learner',
    title: 'Consistent Learner',
    description: 'Kept the momentum going with a 3-day daily learning streak',
    icon: 'Flame',
    criteria: 'Reach a 3-day learning streak',
    unlocked: false
  },
  {
    id: 'smart-spender',
    title: 'Smart Spender',
    description: 'Navigated tough peer pressure & impulsive choices in Money Maze',
    icon: 'Compass',
    criteria: 'Complete Money Maze with Money Health > 75',
    unlocked: false
  },
  {
    id: 'future-planner',
    title: 'Future Planner',
    description: 'Solved real regional case studies from Bengaluru to Guwahati',
    icon: 'MapPin',
    criteria: 'Resolve 3 regional scenarios',
    unlocked: false
  }
];

export const TODAY_DECISION_SCENARIO = {
  id: 'daily-oct-9',
  title: "Today's money decision",
  prompt: "Your coaching friends are heading to a trendy cafe where a milkshake costs ₹320. You have ₹450 left for the week, and your bus pass needs a ₹200 top-up on Friday.",
  options: [
    {
      id: 'd1',
      label: 'Order the ₹320 shake',
      detail: 'Hang out with the gang, but you will fall short on bus fare by ₹70 on Friday.',
      feedback: 'Social comfort today creates logistical panic on Friday. You would need to scramble for transit money.',
      scoreChange: -10,
      xpGain: 10
    },
    {
      id: 'd2',
      label: 'Order a ₹60 iced lemonade or just water',
      detail: 'Enjoy the company and laughs without blowing your essential transport budget.',
      feedback: 'Masterstroke! True friends care about your presence, not your drink bill. You protect your bus pass and have ₹190 leftover.',
      scoreChange: 15,
      xpGain: 35
    },
    {
      id: 'd3',
      label: 'Make up an excuse and walk away',
      detail: 'Avoid spending anything, but miss out on chatting with your classmates.',
      feedback: 'Frugality doesn’t mean social isolation. Learning to be comfortable ordering within your means is more empowering.',
      scoreChange: 5,
      xpGain: 15
    }
  ]
};
