/* SILENCE — данные изделий и систем.

   ИСТОЧНИК: «Журнал Silence 20.04.2026», страницы 2–35.
   Все числа, названия и описания перенесены из журнала. Русские описания —
   дословные цитаты. Казахские и английские — перевод этих же абзацев.

   Числа хранятся ОДИН раз: единицы измерения подставляются при отрисовке
   (см. UNITS в content.js), названия слоёв и подписи характеристик берутся
   из словаря. Поэтому исправление цифры делается в одном месте.

   Обозначения даны так, как в журнале: для облицовок и систем облицовки
   Rw — индекс ДОПОЛНИТЕЛЬНОЙ звукоизоляции, для перегородок Rw —
   собственный индекс конструкции.                                          */

window.CATALOG = (function () {
  'use strict';

  /* ═══ Материалы (журнал, с. 4–9) ══════════════════════════════════════ */

  var materials = [
    {
      id: 'stena',
      name: 'Панель «Silence стена»',
      full: true,
      page: 6,
      group: 'panel',
      place: 'wall',
      specs: [
        ['th', '40'], ['weight', '25'], ['rw', '8–16'],
        ['sizeGab', '670 × 1560'], ['sizeWork', '600 × 1490'],
        ['load', '120'], ['fire', 'Г1']
      ],
      desc: {
        ru: 'Современная панель для звукоизоляции стен, сочетающая высокую эффективность, простоту и удобство. Применяется внутри жилых и общественных зданий с целью снижения звукового воздействия от соседних помещений, уличного шума и для создания акустического комфорта. Благодаря многослойной структуре, панель эффективно уменьшает уровень слышимости на всем диапозоне частот, повышая акустический комфорт.',
        kz: 'Қабырғаларды дыбыстан оқшаулауға арналған заманауи панель: жоғары тиімділік, қарапайымдылық және қолайлылық. Тұрғын және қоғамдық ғимараттардың ішінде көрші бөлмелерден және көше шуынан келетін дыбыс әсерін азайту, акустикалық жайлылық жасау үшін қолданылады. Көпқабатты құрылымының арқасында панель дыбыс естілу деңгейін бүкіл жиілік ауқымында тиімді төмендетеді.',
        en: 'A modern panel for wall sound insulation combining high efficiency with simple, convenient installation. Used inside residential and public buildings to reduce sound coming from adjacent rooms and from the street, and to create acoustic comfort. Thanks to its multi-layer structure the panel effectively lowers audibility across the whole frequency range.'
      }
    },
    {
      id: 'potolok',
      name: 'Панель «Silence потолок/стена»',
      full: true,
      page: 7,
      group: 'panel',
      place: 'ceiling',
      specs: [
        ['th', '31'], ['weight', '22'], ['rw', '8–16'],
        ['sizeGab', '670 × 1560'], ['sizeWork', '600 × 1490'],
        ['load', '80']
      ],
      desc: {
        ru: '«Silence Потолок» — панель дополнительной звукоизоляции потолка, предназначенная для снижения шума, проникающего из соседних помещений сверху, в жилых и общественных зданиях. Благодаря многослойной структуре, панель эффективно уменьшает уровень слышимости на всем диапозоне частот, повышая акустический комфорт.',
        kz: '«Silence Потолок» — тұрғын және қоғамдық ғимараттарда жоғарыдағы көрші бөлмелерден өтетін шуды азайтуға арналған төбенің қосымша дыбыс оқшаулау панелі. Көпқабатты құрылымының арқасында панель дыбыс естілу деңгейін бүкіл жиілік ауқымында тиімді төмендетеді.',
        en: '“Silence Ceiling” is a panel for additional ceiling sound insulation, intended to reduce noise penetrating from the rooms above in residential and public buildings. Thanks to its multi-layer structure the panel effectively lowers audibility across the whole frequency range.'
      }
    },
    {
      id: 'pol',
      name: 'Плита «Silence пол»',
      full: true,
      page: 8,
      group: 'panel',
      place: 'floor',
      specs: [
        ['th', '29'], ['weight', '19'], ['lw', '9'],
        ['sizeGab', '670 × 1320'], ['sizeWork', '600 × 1250']
      ],
      desc: {
        ru: 'Плита «Silence Пол» — высокоэффективная плита для дополнительной звукоизоляции межэтажных перекрытий в жилых и коммерческих помещениях. Плита эффективно поглощает и рассеивает звуковые волны, препятствуя их передаче на нижние этажи и в соседние помещения, сохраняя эффективность на протяжении многих лет.',
        kz: '«Silence Пол» — тұрғын және коммерциялық бөлмелерде қабаттар арасындағы жабындарды қосымша дыбыстан оқшаулауға арналған жоғары тиімді тақта. Тақта дыбыс толқындарын тиімді сіңіріп, таратады, олардың төменгі қабаттарға және көрші бөлмелерге берілуіне жол бермейді және тиімділігін ұзақ жылдар сақтайды.',
        en: 'The “Silence Floor” board is a high-efficiency board for additional sound insulation of floor slabs in residential and commercial spaces. It absorbs and scatters sound waves, preventing their transmission to the floors below and to adjacent rooms, and retains its efficiency for many years.'
      }
    },
    {
      id: 'vibroguard',
      name: 'VibroGuard',
      full: true,
      page: 5,
      group: 'sheet',
      place: 'any',
      specs: [
        ['th', '15'], ['dens', '16'], ['rw', '3–5'],
        ['size', '1250 × 1495'], ['size2', '1250 × 3000'], ['load', '120']
      ],
      desc: {
        ru: 'VibroGuard — высокоэффективный композитный лист толщиной 15 мм с демпфирующим слоем. Выпускается в двух видах: с прямой кромкой, как черновой материал, и с фальцевой кромкой — для заделки швов между листами, в качестве предчистового материала. Материал сочетает прочность жёсткого основания и эластичность амортизирующего слоя, который гасит вибрации и препятствует передаче звука через строительные конструкции. Применяется как дополнительный лицевой слой в звукоизоляционных конструкциях.',
        kz: 'VibroGuard — демпферлеуші қабаты бар қалыңдығы 15 мм жоғары тиімді композиттік парақ. Екі түрде шығарылады: тік жиекті — қара жұмыс материалы ретінде, және бүктемелі жиекті — парақтар арасындағы жіктерді бітеуге, тазалық алдындағы материал ретінде. Материал қатты негіздің беріктігін және дірілді басатын серпімді қабаттың қасиетін біріктіреді. Дыбыс оқшаулау конструкцияларында қосымша беткі қабат ретінде қолданылады.',
        en: 'VibroGuard is a high-efficiency 15 mm composite sheet with a damping layer. Supplied in two versions: with a straight edge as a rough-work material, and with a rabbeted edge for sealing joints between sheets as a pre-finish material. The material combines the strength of a rigid base with the elasticity of a damping layer that suppresses vibration and impedes sound transmission through building structures. Used as an additional facing layer in sound-insulating structures.'
      }
    },
    {
      id: 'echoguard',
      name: 'EchoGuard',
      full: true,
      page: 9,
      group: 'sheet',
      place: 'any',
      specs: [['th', '20'], ['weight', '8,5'], ['rw', '8'], ['size', '1490 × 590']],
      desc: {
        ru: 'EchoGuard — звукопоглощающий материал с демпфирующими свойствами, используемый внутри звукоизоляционных конструкций. Трёхслойная акустическая панель для эффективной шумо- и виброизоляции. Благодаря совокупности слоев из различных материалов, панель имеет отличные звукопоглощающие свойства наряду с достаточной жесткостью.',
        kz: 'EchoGuard — дыбыс оқшаулау конструкцияларының ішінде қолданылатын демпферлеуші қасиеті бар дыбыс сіңіргіш материал. Шу мен дірілді тиімді оқшаулауға арналған үшқабатты акустикалық панель. Әртүрлі материалдардан тұратын қабаттардың жиынтығы арқасында панель жеткілікті қатаңдықпен қатар тамаша дыбыс сіңіру қасиетіне ие.',
        en: 'EchoGuard is a sound-absorbing material with damping properties, used inside sound-insulating structures. A three-layer acoustic panel for effective noise and vibration insulation. The combination of layers of different materials gives the panel excellent sound absorption together with sufficient rigidity.'
      }
    },
    {
      id: 'soundfiber',
      name: 'SoundFiber',
      img: 'assets/prod/soundfiber.webp',
      page: 4,
      group: 'sheet',
      place: 'any',
      specs: [
        ['th', '3–5'], ['dens2', '300–500'], ['size', '2100 × 30000'],
        ['rw', '2–3'], ['lw', '2–3']
      ],
      desc: {
        ru: 'SoundFiber — акустическое нетканное иглопробивное полотно. Полотно SoundFiber имеет высокие звукопоглощающие и демпфирущие свойства. Состав: полиэфирные, полипропиленовые, полиамидные волокна. Материал не оказывает вредного влияния на организм при непосредственном контакте, не выделяет вредных веществ. SoundFiber применяется как дополнительный демпфирующий и звукопоглощающий слой в звукоизоляционных конструкциях.',
        kz: 'SoundFiber — акустикалық тоқылмаған инемен тесілген мата. SoundFiber матасы жоғары дыбыс сіңіргіш және демпферлеуші қасиетке ие. Құрамы: полиэфир, полипропилен, полиамид талшықтары. Материал тікелей жанасқанда организмге зиянды әсер етпейді, зиянды заттар шығармайды. Дыбыс оқшаулау конструкцияларында қосымша демпферлеуші және дыбыс сіңіргіш қабат ретінде қолданылады.',
        en: 'SoundFiber is an acoustic non-woven needle-punched fabric with high sound-absorbing and damping properties. Composition: polyester, polypropylene and polyamide fibres. On direct contact the material has no harmful effect on the body and releases no harmful substances. SoundFiber is used as an additional damping and sound-absorbing layer in sound-insulating structures.'
      }
    }
  ];

  /* ═══ Декоративно-акустические линейки (журнал, с. 11–17) ═════════════ */

  var decor = [
    {
      id: 'acousticwood',
      name: 'AcousticWood',
      page: 12,
      img: 'assets/prod/acousticwood.webp',
      variants: 'Hexa · Rhomb · Line · Art',
      formats: ['23 × 580 × 745', '23 × 613 × 592', '26 × 600 × 2400', '23 × 600 × 2400'],
      desc: {
        ru: 'AcousticWood — декоративные акустические панели для стильного и комфортного интерьера. Состоят из натуральных и экологически чистых материалов. Применены инновационные скрытые системы звукопоглощения, для создания акустического комфорта. Идеальны для жилых помещений, офисов, студий, переговорных и гостиниц, сочетая шумопоглощение и выразительный дизайн. Hexa — объёмная структура в форме сот; Rhomb — геометрический рисунок в виде ромбов; Line — строгий линейный рельеф; Art — художественная композиция свободной формы.',
        kz: 'AcousticWood — сәнді және жайлы интерьерге арналған декоративті акустикалық панельдер. Табиғи және экологиялық таза материалдардан тұрады. Акустикалық жайлылық жасау үшін жасырын дыбыс сіңіру жүйелері қолданылған. Тұрғын бөлмелер, кеңселер, студиялар, келіссөз бөлмелері мен қонақүйлер үшін тамаша. Hexa — ұя пішініндегі көлемді құрылым; Rhomb — ромб түріндегі геометриялық сурет; Line — қатаң сызықтық рельеф; Art — еркін пішіндегі көркем композиция.',
        en: 'AcousticWood — decorative acoustic panels for a stylish and comfortable interior, made of natural and environmentally clean materials. Innovative concealed sound-absorption systems are used to create acoustic comfort. Ideal for homes, offices, studios, meeting rooms and hotels, combining noise absorption with expressive design. Hexa — a three-dimensional honeycomb structure; Rhomb — a geometric rhombus pattern; Line — a strict linear relief; Art — a free-form artistic composition.'
      }
    },
    {
      id: 'reverboard',
      name: 'ReverBoard',
      img: 'assets/prod/reverboard.webp',
      page: 14,
      variants: 'Quad · Spiral · Hexa · Rhomb',
      formats: ['14 × 590 × 1190', '14 × 300 × 520', '14 × 400 × 460'],
      desc: {
        ru: 'ReverBoard — интерьерные акустические панели с выразительной трёхмерной структурой. Панели подходят для жилых помещений, офисов, студий, холлов и коммерческих зон, легко вписываются в любой стиль интерьера — от минимализма до loft и арт-декора. Quad — прямоугольники: универсальные панели для стен и потолков с ровной геометрией и лаконичным дизайном. Spiral — спираль: декоративно-акустические панели со спиралевидной фактурой. Hexa — шестигранники: панели для модульных композиций и ярких интерьерных акцентов. Rhomb — ромбы: панели для создания динамичных узоров и современных геометрических композиций. Изготавливаются как в натуральном цвете с дальнейшей покраской непосредственно при монтажных работах, так и в покрашенном виде по индивидуальному пожеланию заказчика.',
        kz: 'ReverBoard — айқын үшөлшемді құрылымы бар интерьерлік акустикалық панельдер. Тұрғын бөлмелер, кеңселер, студиялар, холлдар мен коммерциялық аймақтарға жарайды, минимализмнен loft және арт-декорға дейінгі кез келген интерьер стиліне оңай кіріседі. Quad — тіктөртбұрыштар: қабырғалар мен төбелерге арналған әмбебап панельдер. Spiral — спираль: спираль тәрізді бетті декоративті-акустикалық панельдер. Hexa — алтыбұрыштар: модульдік композициялар мен интерьер акценттеріне арналған панельдер. Rhomb — ромбтар: динамикалық өрнектер жасауға арналған панельдер. Табиғи түсте (монтаж кезінде боялатын) және тапсырыс берушінің тілегі бойынша боялған түрде дайындалады.',
        en: 'ReverBoard — interior acoustic panels with an expressive three-dimensional structure. Suitable for homes, offices, studios, lobbies and commercial areas, they fit any interior style from minimalism to loft and art deco. Quad — rectangles: universal panels for walls and ceilings with plain geometry and a laconic design. Spiral — spiral: decorative acoustic panels with a spiral texture. Hexa — hexagons: panels for modular compositions and bright interior accents. Rhomb — rhombuses: panels for dynamic patterns and modern geometric compositions. Made either in the natural colour, to be painted during installation, or pre-painted to the customer’s individual request.'
      }
    },
    {
      id: 'acousticloft',
      name: 'AcousticLoft',
      img: 'assets/prod/acousticloft.webp',
      page: 16,
      variants: 'Hexa Detail · Quad Detail · Complex Detail',
      formats: ['26 × 580 × 665', '26 × 600 × 980'],
      desc: {
        ru: 'AcousticLoft — декоративно-акустические панели с фактурой бетона, созданные для современных, минималистичных и индустриальных интерьеров. Панели снижают эхо, улучшают разборчивость речи и создают комфортную звуковую среду. Конструкция панели сочетает эстетичный бетонный рисунок с высокоэффективными звукопоглощающими материалами, благодаря чему интерьер остаётся лёгким и визуально просторным. Hexa Detail — шестигранные панели с эффектной текстурой. Quad Detail — квадратные панели с модульной структурой для стен и перегородок. Complex Detail — комплексная панельная система с разными формами и текстурами для помещений с высокими требованиями к акустике и дизайну.',
        kz: 'AcousticLoft — заманауи, минималистік және индустриялық интерьерлерге жасалған бетон бетті декоративті-акустикалық панельдер. Панельдер жаңғырықты азайтады, сөйлеу түсініктілігін жақсартады және жайлы дыбыстық орта жасайды. Панель құрылымы эстетикалық бетон суретін жоғары тиімді дыбыс сіңіргіш материалдармен біріктіреді. Hexa Detail — әсерлі бетті алтыбұрышты панельдер. Quad Detail — қабырғалар мен қалқаларға арналған модульдік құрылымы бар шаршы панельдер. Complex Detail — акустика мен дизайнға талабы жоғары бөлмелерге арналған әртүрлі пішін мен беттердің кешенді панельдік жүйесі.',
        en: 'AcousticLoft — decorative acoustic panels with a concrete texture, created for modern, minimalist and industrial interiors. The panels reduce echo, improve speech intelligibility and create a comfortable sound environment. The panel combines an aesthetic concrete pattern with highly effective sound-absorbing materials, so the interior stays light and visually spacious. Hexa Detail — hexagonal panels with a striking texture. Quad Detail — square panels with a modular structure for walls and partitions. Complex Detail — a combined panel system of different shapes and textures for rooms with high acoustic and design requirements.'
      }
    }
  ];

  /* ═══ Системы (журнал, с. 25–35) ══════════════════════════════════════
     index: обозначение и значение так, как напечатано в журнале.
     load:  несущая способность, кг на одну точку крепления.
     layers: ключи слоёв, названия — в словаре LAYERS.                      */

  var systems = [
    { id: 'wf-standart', name: 'Silence Frameless Standart', place: 'wall', kind: 'frameless', img: 'assets/prod/sys-wall-frameless.webp',
      ix: 'ΔRw', from: 8, to: 10, load: 120, page: 25,
      layers: ['base', 'glue', 'damper', 'wall', 'finish'],
      desc: {
        ru: 'Базовая бескаркасная система дополнительной звукоизоляции, предназначенная для существующих стен и перегородок внутри жилых и общественных зданий. Система монтируется непосредственно на поверхность стены или перегородки без устройства металлического или деревянного каркаса.',
        kz: 'Тұрғын және қоғамдық ғимараттардың ішіндегі бар қабырғалар мен қалқаларға арналған қосымша дыбыс оқшаулаудың базалық қаңқасыз жүйесі. Жүйе металл немесе ағаш қаңқа орнатпай, тікелей қабырға бетіне монтаждалады.',
        en: 'A basic frameless system of additional sound insulation for existing walls and partitions inside residential and public buildings. The system is mounted directly onto the surface of the wall or partition without a metal or timber frame.' } },

    { id: 'wf-comfort', name: 'Silence Frameless Comfort', place: 'wall', kind: 'frameless', img: 'assets/prod/sys-wall-frameless.webp',
      ix: 'ΔRw', from: 10, to: 12, load: 200, page: 25,
      layers: ['base', 'glue', 'damper', 'wall', 'vg', 'finish'],
      desc: {
        ru: 'Улучшенная бескаркасная система дополнительной звукоизоляции, предназначенная для существующих стен и перегородок внутри жилых и общественных зданий. Монтаж выполняется непосредственно на основание без применения металлического каркаса, что позволяет сохранить полезную площадь помещения.',
        kz: 'Тұрғын және қоғамдық ғимараттардың ішіндегі бар қабырғалар мен қалқаларға арналған қосымша дыбыс оқшаулаудың жетілдірілген қаңқасыз жүйесі. Монтаж металл қаңқасыз, тікелей негізге орындалады, бұл бөлменің пайдалы ауданын сақтауға мүмкіндік береді.',
        en: 'An improved frameless system of additional sound insulation for existing walls and partitions inside residential and public buildings. Installation is carried out directly onto the base without a metal frame, which preserves the usable floor area of the room.' } },

    { id: 'w-frame', name: 'Silence Frame', place: 'wall', kind: 'frame', img: 'assets/prod/sys-wall-frame.webp',
      ix: 'ΔRw', from: 7, to: 9, load: 100, page: 26,
      layers: ['base', 'frame', 'damper', 'wool', 'gsp', 'seal', 'finish', 'hanger'],
      desc: {
        ru: 'Каркасная система начального уровня, предназначенная для дополнительной звукоизоляции существующих стен и перегородок внутри жилых и общественных зданий. Конструкция выполняется на основе металлического каркаса с применением звукопоглощающих материалов, с применением звукопоглощающих материалов и упругой развязки для снижения передачи шума через ограждающую конструкцию.',
        kz: 'Тұрғын және қоғамдық ғимараттардың ішіндегі бар қабырғалар мен қалқаларды қосымша дыбыстан оқшаулауға арналған бастапқы деңгейдегі қаңқалы жүйе. Конструкция дыбыс сіңіргіш материалдар қолданылған металл қаңқа негізінде орындалады, бұл қаңқасыз шешімдермен салыстырғанда акустикалық тиімділіктің жоғары деңгейін береді.',
        en: 'An entry-level framed system for additional sound insulation of existing walls and partitions inside residential and public buildings. The structure is built on a metal frame with sound-absorbing materials, using sound-absorbing materials and resilient decoupling to reduce noise transmission through the enclosing structure.' } },

    { id: 'w-plus', name: 'Silence Frame Plus', place: 'wall', kind: 'frame', img: 'assets/prod/sys-wall-frame.webp',
      ix: 'ΔRw', from: 9, to: 11, load: 150, page: 26,
      layers: ['base', 'frame', 'damper', 'wool', 'csp', 'vg', 'finish', 'seal', 'hanger'],
      desc: {
        ru: 'Каркасная система, предназначенная для дополнительной звукоизоляции существующих стен и перегородок внутри жилых и общественных зданий. Конструкция выполняется на основе металлического каркаса с применением звукопоглощающих материалов. Благодаря двухслойной облицовке с демпфирующим материалом обеспечивает высокий уровень акустической эффективности по сравнению с бескаркасными решениями.',
        kz: 'Тұрғын және қоғамдық ғимараттардың ішіндегі бар қабырғалар мен қалқаларды қосымша дыбыстан оқшаулауға арналған қаңқалы жүйе. Конструкция дыбыс сіңіргіш материалдар қолданылған металл қаңқа негізінде орындалады. Демпферлеуші материалы бар екіқабатты қаптаманың арқасында қаңқасыз шешімдермен салыстырғанда акустикалық тиімділіктің жоғары деңгейін береді.',
        en: 'A framed system for additional sound insulation of existing walls and partitions inside residential and public buildings. The structure is built on a metal frame with sound-absorbing materials. Thanks to a two-layer facing with a damping material it provides a high level of acoustic efficiency compared with frameless solutions.' } },

    { id: 'w-comfort', name: 'Silence Frame Comfort', place: 'wall', kind: 'frame', img: 'assets/prod/sys-wall-frame.webp',
      ix: 'ΔRw', from: 10, to: 13, load: 150, page: 27,
      layers: ['base', 'frame', 'damper', 'wool', 'wall', 'gsp10', 'finish', 'seal', 'hanger'],
      desc: {
        ru: 'Каркасная система, предназначенная для дополнительной звукоизоляции существующих стен и перегородок внутри жилых и общественных зданий. Конструкция выполняется на основе металлического каркаса с применением звукопоглощающих материалов и многослойной облицовки, что обеспечивает более высокий уровень акустической эффективности по сравнению с бескаркасными решениями.',
        kz: 'Тұрғын және қоғамдық ғимараттардың ішіндегі бар қабырғалар мен қалқаларды қосымша дыбыстан оқшаулауға арналған қаңқалы жүйе. Конструкция дыбыс сіңіргіш материалдар мен көпқабатты қаптама қолданылған металл қаңқа негізінде орындалады, бұл қаңқасыз шешімдермен салыстырғанда акустикалық тиімділіктің неғұрлым жоғары деңгейін береді.',
        en: 'A framed system for additional sound insulation of existing walls and partitions inside residential and public buildings. The structure is built on a metal frame with sound-absorbing materials and a multi-layer facing, which provides a higher level of acoustic efficiency than frameless solutions.' } },

    { id: 'w-premium', name: 'Silence Frame Premium', place: 'wall', kind: 'frame', img: 'assets/prod/sys-wall-frame.webp',
      ix: 'ΔRw', from: 12, to: 15, load: 150, page: 27,
      layers: ['base', 'frame', 'damper', 'wool', 'wall', 'vg', 'finish', 'seal', 'hanger'],
      desc: {
        ru: 'Премиальная каркасная система, предназначенная для дополнительной звукоизоляции существующих стен и перегородок внутри жилых и общественных зданий. Конструкция выполняется на основе металлического каркаса с использованием высокоэффективных звукопоглощающих материалов и многослойной облицовки, что обеспечивает максимальный уровень акустической защиты.',
        kz: 'Тұрғын және қоғамдық ғимараттардың ішіндегі бар қабырғалар мен қалқаларды қосымша дыбыстан оқшаулауға арналған премиум қаңқалы жүйе. Конструкция жоғары тиімді дыбыс сіңіргіш материалдар мен көпқабатты қаптама қолданылған металл қаңқа негізінде орындалады, бұл акустикалық қорғаныстың ең жоғары деңгейін береді.',
        en: 'A premium framed system for additional sound insulation of existing walls and partitions inside residential and public buildings. The structure is built on a metal frame using highly effective sound-absorbing materials and a multi-layer facing, providing the maximum level of acoustic protection.' } },

    { id: 'w-business', name: 'Silence wall Business', place: 'wall', kind: 'frame', img: 'assets/prod/sys-wall-frame.webp',
      ix: 'ΔRw', from: 16, to: 20, load: 150, page: 28,
      layers: ['base', 'eg', 'csp12', 'damper', 'frameSusp', 'wool', 'wall', 'vg', 'finish'],
      desc: {
        ru: 'Система звукоизоляции стен бизнес класса. Сочетает в себе преимущества бескаркасных и каркасных систем, благодаря чему обладает высочайшими показателями дополнительной звукоизоляции. Применяется в помещениях жилых и общественных зданий с наивысшими требованиями к звукоизоляции. Рекомендуется к применению в помещениях смежных с сильными источниками шума: котельные, насосные, электрощитовые, спортзалы, кафе. Благодаря многослойной структуре система отлично работает на всем диапазоне слышимых частот и изолирует не только от воздушного, но и от структурного шума.',
        kz: 'Бизнес-класты қабырға дыбыс оқшаулау жүйесі. Қаңқасыз және қаңқалы жүйелердің артықшылықтарын біріктіреді, соның арқасында қосымша дыбыс оқшаулаудың ең жоғары көрсеткіштеріне ие. Дыбыс оқшаулауға талабы ең жоғары тұрғын және қоғамдық ғимарат бөлмелерінде қолданылады. Қатты шу көздерімен іргелес бөлмелерде қолдануға ұсынылады: қазандықтар, сорап бөлмелері, электр қалқандары, спортзалдар, кафелер. Көпқабатты құрылымының арқасында жүйе естілетін жиіліктердің бүкіл ауқымында жақсы жұмыс істейді және ауа шуынан ғана емес, құрылымдық шудан да оқшаулайды.',
        en: 'A business-class wall sound-insulation system. It combines the advantages of frameless and framed systems and therefore offers the highest figures of additional sound insulation. Used in rooms of residential and public buildings with the strictest sound-insulation requirements. Recommended for rooms adjacent to strong noise sources: boiler rooms, pump rooms, electrical switchrooms, gyms and cafés. Thanks to its multi-layer structure the system works well across the whole range of audible frequencies and insulates not only against airborne but also against structure-borne noise.' } },

    { id: 'cf-standart', name: 'Silence Frameless Apex Standart', place: 'ceiling', kind: 'frameless', img: 'assets/prod/sys-ceiling-frameless.webp',
      ix: 'ΔRw', from: 8, to: 10, load: 120, page: 29,
      layers: ['base', 'glue', 'damper', 'ceil', 'finish'],
      desc: {
        ru: 'Базовая бескаркасная система дополнительной звукоизоляции потолков, предназначенная для применения внутри жилых и общественных зданий. Монтаж выполняется непосредственно на поверхность перекрытия без устройства металлического каркаса, что позволяет минимально снизить высоту помещения и упростить процесс установки.',
        kz: 'Тұрғын және қоғамдық ғимараттардың ішінде қолдануға арналған төбелерді қосымша дыбыстан оқшаулаудың базалық қаңқасыз жүйесі. Монтаж металл қаңқасыз, тікелей жабын бетіне орындалады, бұл бөлме биіктігін ең аз төмендетуге және орнатуды жеңілдетуге мүмкіндік береді.',
        en: 'A basic frameless system of additional ceiling sound insulation for use inside residential and public buildings. Installation is carried out directly onto the slab surface without a metal frame, which keeps the loss of room height to a minimum and simplifies the process.' } },

    { id: 'cf-comfort', name: 'Silence Frameless Apex Comfort', place: 'ceiling', kind: 'frameless', img: 'assets/prod/sys-ceiling-frameless.webp',
      ix: 'ΔRw', from: 10, to: 12, load: 120, page: 29,
      layers: ['base', 'glue', 'damper', 'ceil', 'vg', 'finish'],
      desc: {
        ru: 'Улучшенная бескаркасная система дополнительной звукоизоляции потолков, предназначенная для жилых и общественных зданий с повышенными требованиями к акустическому комфорту. Монтаж осуществляется непосредственно на поверхность перекрытия без металлического каркаса, что обеспечивает минимальное снижение высоты помещения и упрощает установку.',
        kz: 'Акустикалық жайлылыққа талабы жоғары тұрғын және қоғамдық ғимараттарға арналған төбелерді қосымша дыбыстан оқшаулаудың жетілдірілген қаңқасыз жүйесі. Монтаж металл қаңқасыз, тікелей жабын бетіне жүзеге асырылады, бұл бөлме биіктігінің ең аз төмендеуін қамтамасыз етеді.',
        en: 'An improved frameless system of additional ceiling sound insulation for residential and public buildings with increased acoustic-comfort requirements. Installation is carried out directly onto the slab surface without a metal frame, giving minimal loss of room height and simpler installation.' } },

    { id: 'c-apex', name: 'Silence Frame Apex', place: 'ceiling', kind: 'frame', img: 'assets/prod/sys-ceiling-frame.webp',
      ix: 'ΔRw', from: 7, to: 9, load: 120, page: 30,
      layers: ['base', 'frame', 'damper', 'wool', 'gsp10', 'finish', 'seal', 'hanger'],
      desc: {
        ru: 'Каркасная система дополнительной звукоизоляции потолков начального уровня, предназначенная для применения внутри жилых и общественных зданий. Конструкция выполняется на основе металлического каркаса с применением эффективных звукопоглощающих материалов и многослойной облицовки.',
        kz: 'Тұрғын және қоғамдық ғимараттардың ішінде қолдануға арналған төбелерді қосымша дыбыстан оқшаулаудың бастапқы деңгейдегі қаңқалы жүйесі. Конструкция тиімді дыбыс сіңіргіш материалдар мен көпқабатты қаптама қолданылған металл қаңқа негізінде орындалады.',
        en: 'An entry-level framed system of additional ceiling sound insulation for use inside residential and public buildings. The structure is built on a metal frame with effective sound-absorbing materials and a multi-layer facing.' } },

    { id: 'c-comfort', name: 'Silence Frame Apex Comfort', place: 'ceiling', kind: 'frame', img: 'assets/prod/sys-ceiling-frame.webp',
      ix: 'ΔRw', from: 11, to: 13, load: 120, page: 30,
      layers: ['base', 'frame', 'damper', 'wool', 'ceil', 'gsp10', 'finish', 'seal', 'hanger'],
      desc: {
        ru: 'Каркасная система дополнительной звукоизоляции потолков, предназначенная для применения внутри жилых и общественных зданий. Конструкция выполняется на основе металлического каркаса с применением эффективных звукопоглощающих материалов и многослойной облицовки.',
        kz: 'Тұрғын және қоғамдық ғимараттардың ішінде қолдануға арналған төбелерді қосымша дыбыстан оқшаулаудың қаңқалы жүйесі. Конструкция тиімді дыбыс сіңіргіш материалдар мен көпқабатты қаптама қолданылған металл қаңқа негізінде орындалады.',
        en: 'A framed system of additional ceiling sound insulation for use inside residential and public buildings. The structure is built on a metal frame with effective sound-absorbing materials and a multi-layer facing.' } },

    { id: 'c-premium', name: 'Silence Frame Apex Premium', place: 'ceiling', kind: 'frame', img: 'assets/prod/sys-ceiling-frame.webp',
      ix: 'ΔRw', from: 12, to: 15, load: 120, page: 31,
      layers: ['base', 'frame', 'damper', 'wool', 'ceil', 'vg', 'finish', 'seal', 'hanger'],
      desc: {
        ru: 'Улучшенная каркасная система дополнительной звукоизоляции потолков, предназначенная для применения внутри жилых и общественных зданий. Конструкция выполняется на основе металлического каркаса с использованием высокоэффективных звукопоглощающих материалов и многослойной облицовки.',
        kz: 'Тұрғын және қоғамдық ғимараттардың ішінде қолдануға арналған төбелерді қосымша дыбыстан оқшаулаудың жетілдірілген қаңқалы жүйесі. Конструкция жоғары тиімді дыбыс сіңіргіш материалдар мен көпқабатты қаптама қолданылған металл қаңқа негізінде орындалады.',
        en: 'An improved framed system of additional ceiling sound insulation for use inside residential and public buildings. The structure is built on a metal frame using highly effective sound-absorbing materials and a multi-layer facing.' } },

    { id: 'c-business', name: 'Silence Frame Apex Business', place: 'ceiling', kind: 'frame', img: 'assets/prod/sys-ceiling-frame.webp',
      ix: 'ΔRw', from: 16, to: 18, load: 120, page: 31,
      layers: ['base', 'eg', 'frame', 'damper', 'wool', 'gsp10', 'vg', 'finish', 'seal', 'hanger'],
      desc: {
        ru: 'Премиальная каркасная система дополнительной звукоизоляции потолков, предназначенная для применения внутри зданий. Конструкция выполняется на основе металлического каркаса с использованием высокоэффективных звукопоглощающих материалов и многослойной облицовки, что обеспечивает максимальный уровень акустической защиты от воздушного шума.',
        kz: 'Ғимараттардың ішінде қолдануға арналған төбелерді қосымша дыбыстан оқшаулаудың премиум қаңқалы жүйесі. Конструкция жоғары тиімді дыбыс сіңіргіш материалдар мен көпқабатты қаптама қолданылған металл қаңқа негізінде орындалады, бұл ауа шуынан акустикалық қорғаныстың ең жоғары деңгейін береді.',
        en: 'A premium framed system of additional ceiling sound insulation for use inside buildings. The structure is built on a metal frame using highly effective sound-absorbing materials and a multi-layer facing, providing the maximum level of acoustic protection against airborne noise.' } },

    { id: 'f-antistomp', name: 'Silence Antistomp', place: 'floor', kind: 'floor', img: 'assets/prod/sys-floor-dry.webp',
      ix: 'ΔLn,w', from: 9, to: 11, load: 0, page: 32,
      layers: ['base', 'mastic', 'damper', 'floorp', 'finish'],
      desc: {
        ru: 'Система дополнительной звукоизоляции пола и межэтажных перекрытий, предназначенная для применения внутри жилых и общественных зданий. Монтаж выполняется на подготовленное основание пола (выравнивающая стяжка, наливной пол) на универсальную клеящую мастику, что позволяет упростить процесс установки.',
        kz: 'Тұрғын және қоғамдық ғимараттардың ішінде қолдануға арналған еден мен қабат аралық жабындарды қосымша дыбыстан оқшаулау жүйесі. Монтаж дайындалған еден негізіне (тегістеу тұтқасы, құйылатын еден) әмбебап желімдеуші мастикамен орындалады, бұл орнатуды жеңілдетеді.',
        en: 'A system of additional sound insulation for floors and floor slabs, for use inside residential and public buildings. Installation is carried out on a prepared floor base (levelling screed, self-levelling floor) using a universal adhesive mastic, which simplifies the process.' } },

    { id: 'f-sfgb', name: 'SoundFiber + GB', place: 'floor', kind: 'floor', img: 'assets/prod/sys-floor-screed.webp',
      ix: 'ΔLn,w', from: 11, to: 13, load: 0, page: 32,
      layers: ['base', 'sf', 'gb', 'damper', 'screed', 'finish', 'film'],
      desc: {
        ru: 'Система звукоизоляции пола, предназначенная для снижения ударного шума в жилых и общественных зданиях. Конструкция укладывается по подготовленному основанию пола (выравнивающая стяжка, наливной пол) с обязательным устройством краевой виброразвязки вдоль стен, что предотвращает передачу структурного и ударного шумов на ограждающие конструкции.',
        kz: 'Тұрғын және қоғамдық ғимараттарда соққы шуын азайтуға арналған еденді дыбыстан оқшаулау жүйесі. Конструкция дайындалған еден негізіне қабырғалар бойымен шеткі діріл ажыратқышын міндетті орнатумен төселеді, бұл құрылымдық және соққы шуының қоршау конструкцияларына берілуіне жол бермейді.',
        en: 'A floor sound-insulation system intended to reduce impact noise in residential and public buildings. The structure is laid on a prepared floor base (levelling screed, self-levelling floor) with a mandatory perimeter vibration break along the walls, which prevents transmission of structure-borne and impact noise to the enclosing structures.' } },

    { id: 'f-sf', name: 'SoundFiber', place: 'floor', kind: 'floor', img: 'assets/prod/sys-floor-dry.webp',
      ix: 'ΔLn,w', from: 3, to: 3, load: 0, page: 33,
      layers: ['base', 'damper', 'sf', 'finish'],
      desc: {
        ru: 'Дополнительная звукоизоляция пола с применением полотна SoundFiber перед укладкой напольного покрытия (ламинат, паркет и аналогичные решения) в жилых и общественных зданиях.',
        kz: 'Тұрғын және қоғамдық ғимараттарда еден жабынын (ламинат, паркет және ұқсас шешімдер) төсеу алдында SoundFiber матасын қолдана отырып еденді қосымша дыбыстан оқшаулау.',
        en: 'Additional floor sound insulation using SoundFiber fabric before laying the floor covering (laminate, parquet and similar solutions) in residential and public buildings.' } },

    { id: 'p-basic', name: 'Basic', place: 'partition', kind: 'partition', img: 'assets/prod/sys-partition-basic.webp',
      ix: 'Rw', from: 44, to: 44, load: 90, page: 34,
      layers: ['frame', 'damper', 'wool', 'gsp', 'finish', 'seal'],
      desc: {
        ru: 'Звукоизоляционная внутренняя перегородка каркасного типа, применяемая внутри жилых и общественных зданий. Конструкция предназначена для эффективного снижения воздушного шума и разделения помещений. Система отличается простотой монтажа, малым весом и возможностью установки без существенного увеличения нагрузки на перекрытия, что делает её оптимальной для нового строительства, ремонта и реконструкции.',
        kz: 'Тұрғын және қоғамдық ғимараттардың ішінде қолданылатын қаңқалы түрдегі дыбыс оқшаулағыш ішкі қалқа. Конструкция ауа шуын тиімді азайтуға және бөлмелерді бөлуге арналған. Жүйе монтаждың қарапайымдылығымен, жеңіл салмағымен және жабындарға жүктемені айтарлықтай арттырмай орнату мүмкіндігімен ерекшеленеді.',
        en: 'A framed sound-insulating internal partition for use inside residential and public buildings. The structure is intended to reduce airborne noise effectively and to divide rooms. The system is simple to install, light in weight and can be erected without a significant increase in the load on the floor slabs, which makes it well suited to new construction, renovation and refurbishment.' } },

    { id: 'p-standart', name: 'Standart', place: 'partition', kind: 'partition', img: 'assets/prod/sys-partition-basic.webp',
      ix: 'Rw', from: 47, to: 47, load: 150, page: 34,
      layers: ['frame', 'damper', 'wool', 'gsp10', 'vg', 'finish', 'seal'],
      desc: {
        ru: 'Звукоизоляционная внутренняя перегородка каркасного типа, предназначенная для применения внутри жилых и общественных зданий. Конструкция обеспечивает повышенный уровень защиты от воздушного шума по сравнению с базовыми решениями и подходит для помещений с повышенными требованиями к акустическому комфорту.',
        kz: 'Тұрғын және қоғамдық ғимараттардың ішінде қолдануға арналған қаңқалы түрдегі дыбыс оқшаулағыш ішкі қалқа. Конструкция базалық шешімдермен салыстырғанда ауа шуынан қорғаныстың жоғары деңгейін береді және акустикалық жайлылыққа талабы жоғары бөлмелерге жарайды.',
        en: 'A framed sound-insulating internal partition for use inside residential and public buildings. The structure provides a higher level of protection against airborne noise than basic solutions and suits rooms with increased acoustic-comfort requirements.' } },

    { id: 'p-comfort', name: 'Comfort', place: 'partition', kind: 'partition', img: 'assets/prod/sys-partition-multi.webp',
      ix: 'Rw', from: 53, to: 55, load: 150, page: 35,
      layers: ['frame', 'damper', 'wool', 'gsp12', 'gsp10', 'wall', 'gsp10', 'finish', 'seal'],
      desc: {
        ru: 'Звукоизоляционная внутренняя перегородка каркасного типа, применяемая внутри жилых и общественных зданий. Конструкция ориентирована на эффективную защиту от воздушного шума и предназначена для помещений с повышенными требованиями к акустике.',
        kz: 'Тұрғын және қоғамдық ғимараттардың ішінде қолданылатын қаңқалы түрдегі дыбыс оқшаулағыш ішкі қалқа. Конструкция ауа шуынан тиімді қорғауға бағытталған және акустикаға талабы жоғары бөлмелерге арналған.',
        en: 'A framed sound-insulating internal partition used inside residential and public buildings. The structure is aimed at effective protection against airborne noise and is intended for rooms with increased acoustic requirements.' } },

    { id: 'p-premium', name: 'Premium', place: 'partition', kind: 'partition', img: 'assets/prod/sys-partition-multi.webp',
      ix: 'Rw', from: 56, to: 60, load: 150, page: 35,
      layers: ['frame', 'damper', 'wool', 'wall', 'vg', 'finish', 'seal'],
      desc: {
        ru: 'Звукоизоляционная внутренняя перегородка каркасного типа, предназначенная для применения внутри жилых и общественных зданий. Конструкция обеспечивает максимально эффективную защиту от воздушного шума и ориентирована на объекты с повышенными требованиями к акустике.',
        kz: 'Тұрғын және қоғамдық ғимараттардың ішінде қолдануға арналған қаңқалы түрдегі дыбыс оқшаулағыш ішкі қалқа. Конструкция ауа шуынан барынша тиімді қорғауды береді және акустикаға талабы жоғары нысандарға бағытталған.',
        en: 'A framed sound-insulating internal partition for use inside residential and public buildings. The structure provides the most effective protection against airborne noise and is aimed at projects with increased acoustic requirements.' } }
  ];

  /* ═══ Комплектующие (журнал, с. 19–24) ════════════════════════════════ */

  var parts = [
    {
      id: 'hangers', name: { ru: 'Виброподвесы', kz: 'Дірілге қарсы аспалар', en: 'Vibration hangers' },
      img: 'assets/prod/hangers.webp',
      page: 19,
      desc: {
        ru: 'Виброподвес для стен минимизирует передачу структурного шума и вибраций через стеновые конструкции, обеспечивая надёжное крепление профилей при сохранении эластичности. Виброподвес для потолка применяется для установки подвесных конструкций с защитой от вибраций и ударного шума от межэтажных перекрытий. Универсальный виброподвес подходит для стен и потолков; его эластичная конструкция гарантирует долговечность, простоту монтажа и совместимость с различными звукоизоляционными системами.',
        kz: 'Қабырғаға арналған дірілге қарсы аспа қабырға конструкциялары арқылы құрылымдық шу мен дірілдің берілуін азайтады, серпімділікті сақтай отырып профильдерді сенімді бекітуді қамтамасыз етеді. Төбеге арналған аспа қабат аралық жабындардан келетін діріл мен соққы шуынан қорғай отырып аспалы конструкцияларды орнатуға қолданылады. Әмбебап аспа қабырғаларға да, төбелерге де жарайды.',
        en: 'The wall hanger minimises transmission of structure-borne noise and vibration through wall structures, holding the profiles securely while remaining elastic. The ceiling hanger is used to install suspended structures with protection against vibration and impact noise from floor slabs. The universal hanger suits both walls and ceilings; its elastic design ensures durability, simple installation and compatibility with different sound-insulating systems.'
      }
    },
    {
      id: 'wool', name: { ru: 'Звукоизоляционная вата', kz: 'Дыбыс оқшаулағыш мақта', en: 'Acoustic mineral wool' },
      img: 'assets/prod/wool.webp',
      page: 20,
      desc: {
        ru: 'Изготовленная из различных типов волокон, вата обладает низкой плотностью и пористой структурой, что позволяет эффективно поглощать звуковые волны и снижать резонанс в стенах, перегородках и потолках. Укладывается в каркасные конструкции, полости между стенами и подвесные потолки. Устойчива к деформации, долговечна, не выделяет токсичных веществ, устойчива к влаге и биоповреждениям.',
        kz: 'Әртүрлі талшық түрлерінен жасалған мақтаның тығыздығы төмен және құрылымы кеуекті, бұл дыбыс толқындарын тиімді сіңіріп, қабырғалар, қалқалар мен төбелердегі резонансты азайтуға мүмкіндік береді. Қаңқалы конструкцияларға, қабырғалар арасындағы қуыстарға және аспалы төбелерге салынады. Деформацияға төзімді, ұзақ мерзімді, улы заттар шығармайды.',
        en: 'Made of various fibre types, the wool has a low density and porous structure, which lets it absorb sound waves effectively and reduce resonance in walls, partitions and ceilings. It is laid into framed structures, cavities between walls and suspended ceilings. Resistant to deformation, durable, free of toxic emissions and resistant to moisture and biological damage.'
      }
    },
    {
      id: 'boxes', name: { ru: 'Звукоизоляционные подрозетники', kz: 'Дыбыс оқшаулағыш розетка қаптары', en: 'Acoustic socket boxes' },
      img: 'assets/prod/boxes.webp',
      page: 21,
      desc: {
        ru: 'Разработаны для применения со звукоизоляционными панелями «Silence стена» для простой и эффективной установки розеток и выключателей с целью предотвращения прохождения шума через конструкцию. Применимы как в каркасных, так и бескаркасных конструкциях. Изготовлены из экологичных материалов класса горючести Г1. Бывают одинарные, 2-х, 3-х, 4-х, 5-ти местными.',
        kz: '«Silence стена» панельдерімен бірге розеткалар мен ажыратқыштарды қарапайым және тиімді орнатуға, шудың конструкция арқылы өтуіне жол бермеуге арналған. Қаңқалы да, қаңқасыз да конструкцияларда қолданылады. Г1 жанғыштық класты экологиялық материалдардан жасалған. Бір, 2, 3, 4, 5 орынды болады.',
        en: 'Designed for use with “Silence wall” panels for simple, effective installation of sockets and switches while preventing noise from passing through the structure. Suitable for both framed and frameless structures. Made of environmentally sound materials of fire class Г1. Available in single, 2-, 3-, 4- and 5-gang versions.'
      }
    },
    {
      id: 'tapes', name: { ru: 'Ленты и шпаклёвки', kz: 'Таспалар мен шпаклёвкалар', en: 'Tapes and fillers' },
      img: 'assets/prod/tapes.webp',
      page: 22,
      desc: {
        ru: 'Лента уплотнительная — самоклеящаяся микропористая полимерная лента для плотного сопряжения металлических профилей каркаса и облицовочных материалов, 2–3 мм, ширина 50–70 мм. Демпферная лента для профиля — эластичная звукоизоляционная лента между профилями каркаса и основанием: гасит вибрации, предотвращает передачу ударного и структурного шума, 5–10 мм, ширина 50–200 мм. Шпаклёвки: крупнозернистая и мелкозернистая безусадочные акриловые эластичные, для заделки швов и мест примыканий, разработаны специально для звукоизоляционных систем Silence, фасовка 2,5 кг и 1 кг.',
        kz: 'Тығыздағыш таспа — қаңқа профильдері мен қаптау материалдарын тығыз түйістіруге арналған өздігінен жабысатын микрокеуекті полимер таспа, 2–3 мм, ені 50–70 мм. Профильге арналған демпферлік таспа — қаңқа профильдері мен негіз арасындағы серпімді дыбыс оқшаулағыш таспа: дірілді басады, соққы және құрылымдық шудың берілуіне жол бермейді, 5–10 мм, ені 50–200 мм. Шпаклёвкалар: ірі және ұсақ түйіршікті, отырмайтын акрилді серпімді, жіктер мен түйісу орындарын бітеуге, Silence жүйелеріне арнайы жасалған, 2,5 кг және 1 кг.',
        en: 'Sealing tape — a self-adhesive micro-porous polymer tape for a tight joint between the metal frame profiles and the facing materials, 2–3 mm thick, 50–70 mm wide. Profile damping tape — an elastic sound-insulating tape between the frame profiles and the base: it damps vibration and prevents transmission of impact and structure-borne noise, 5–10 mm thick, 50–200 mm wide. Fillers: coarse and fine non-shrink elastic acrylic fillers for sealing joints and abutments, developed specifically for Silence systems, in 2.5 kg and 1 kg packs.'
      }
    },
    {
      id: 'profiles', name: { ru: 'Профили', kz: 'Профильдер', en: 'Profiles' },
      img: 'assets/prod/profiles.webp',
      page: 23,
      desc: {
        ru: 'Стоечный профиль — вертикальный элемент каркаса для стен и перегородок: обеспечивает прочность конструкции и поддерживает звукоизоляционные и отделочные материалы. Направляющий профиль — горизонтальный или опорный элемент, фиксирующий стоечные профили и задающий контур конструкции. Потолочный профиль — горизонтальный элемент каркаса для потолочных конструкций.',
        kz: 'Тіреу профилі — қабырғалар мен қалқаларға арналған қаңқаның тік элементі: конструкцияның беріктігін қамтамасыз етеді және дыбыс оқшаулағыш, әрлеу материалдарын ұстап тұрады. Бағыттауыш профиль — тіреу профильдерін бекітетін және конструкция контурын белгілейтін көлденең немесе тірек элемент. Төбе профилі — төбе конструкцияларына арналған қаңқаның көлденең элементі.',
        en: 'Stud profile — the vertical frame element for walls and partitions: it gives the structure strength and supports the sound-insulating and finishing materials. Track profile — the horizontal or bearing element that fixes the stud profiles and sets the outline of the structure. Ceiling profile — the horizontal frame element for ceiling structures.'
      },
      table: [
        ['Профиль стоечный', '50 × 50', '0,7–0,9'],
        ['Профиль стоечный', '75 × 50', '0,7–0,9'],
        ['Профиль стоечный', '100 × 50', '0,7–0,9'],
        ['Профиль направляющий', '27 × 28', '0,7–0,9'],
        ['Профиль направляющий', '50 × 40', '0,7–0,9'],
        ['Профиль направляющий', '75 × 40', '0,7–0,9'],
        ['Профиль направляющий', '100 × 40', '0,7–0,9'],
        ['Профиль потолочный', '60 × 27', '0,7–0,9']
      ]
    },
    {
      id: 'trims', name: { ru: 'Доборные планки', kz: 'Қосымша тақтайшалар', en: 'Trim strips' },
      img: 'assets/prod/trims.webp',
      page: 24,
      desc: {
        ru: 'Доборные планки для панелей «Silence» — важный элемент в начале установки, который нейтрализует звуковые мостики при пазогребневом строении панели. Планки минимизируют утечку воздушного шума и обеспечивают стабильный барьер для звука. Установка проста: они легко фиксируются на стене либо панели и служат точкой отсчёта для монтажа.',
        kz: '«Silence» панельдеріне арналған қосымша тақтайшалар — панельдің ойық-қырлы құрылымындағы дыбыс көпірлерін бейтараптандыратын, орнатудың басындағы маңызды элемент. Тақтайшалар ауа шуының ағуын азайтады және дыбысқа тұрақты тосқауыл жасайды. Орнату қарапайым: олар қабырғаға немесе панельге оңай бекітіледі және монтаждың бастапқы нүктесі болады.',
        en: 'Trim strips for “Silence” panels are an important element at the start of installation: they neutralise sound bridges at the tongue-and-groove joints of the panel. The strips minimise leakage of airborne noise and provide a stable barrier to sound. Installation is simple: they fix easily to the wall or the panel and serve as the reference point for mounting.'
      },
      table: [
        ['Добор стена', '68 × 1500 × 28', '1,2 кг'],
        ['Добор потолок', '68 × 1500 × 21', '1,15 кг'],
        ['Добор пол', '68 × 600 × 17', '0,33 кг']
      ]
    }
  ];


  /* ═══ Плиты ГСП и ЦСП ═════════════════════════════════════════════════
     Описания и области применения — из таблиц «Область применения ГСП» и
     «область применения ЦСП по толщине». Место под снимок оставлено пустым:
     впишите путь в поле img. */

  var boards = [
    {
      id: 'gsp',
      detail: {
        ru: [
          ['Исполнения и размеры', [
            ['Марки', 'ГСП и влагостойкая ГСПВ'],
            ['Кромка', 'прямая или фальцевая'],
            ['Толщина', '8–24 мм'],
            ['Предельные отклонения по толщине', '± 0,5–0,6 мм'],
            ['Допуск лицевой поверхности', 'не более двух углублений Ø до 20 мм и глубиной до 0,3 мм на 1 м²']
          ]],
          ['Нормативная база', [
            ['Технические условия', 'ГОСТ 34719-2021, ТУ 5742-004-05292444-2010'],
            ['Условия применения ГСПВ', 'влажный режим по СНиП 23-02-2003, без прямого контакта с водой']
          ]],
          ['Заделка швов и отделка', [
            ['Температура в помещении при обработке швов', 'не ниже +10 °C, стабильная двое суток'],
            ['Швы при прямой кромке', 'шпатлевание на гипсовом вяжущем без армирующей ленты'],
            ['Швы ГСПВ во влажных помещениях', 'гидрофобизированная шпатлёвка'],
            ['Подготовка под финиш', 'грунтовка глубокого проникновения по поверхности и швам'],
            ['Окраска', 'любые краски для внутренних работ, рекомендованы вододисперсионные'],
            ['Не допускается', 'известковые краски и краски на жидком стекле'],
            ['Температура поверхности при окраске', 'не ниже +5 °C']
          ]],
          ['Облицовка плиткой', [
            ['Шаг стоечных профилей каркаса', 'не более 400 мм'],
            ['Марка плиты во влажных помещениях', 'только ГСПВ'],
            ['Гидроизоляция', 'обязательна при прямом воздействии влаги'],
            ['Внутренние углы и примыкания', 'герметик с устойчивой эластичностью']
          ]]
        ],
        kz: [
          ['Орындалуы мен өлшемдері', [
            ['Маркалары', 'ГСП және ылғалға төзімді ГСПВ'],
            ['Жиегі', 'тік немесе бүктемелі'],
            ['Қалыңдығы', '8–24 мм'],
            ['Қалыңдық бойынша шекті ауытқу', '± 0,5–0,6 мм'],
            ['Беткі жағының рұқсаты', '1 м²-ге Ø 20 мм-ге дейін және тереңдігі 0,3 мм-ге дейін екі шұңқырдан аспайды']
          ]],
          ['Нормативтік негіз', [
            ['Техникалық шарттар', 'ГОСТ 34719-2021, ТУ 5742-004-05292444-2010'],
            ['ГСПВ қолдану шарттары', 'СНиП 23-02-2003 бойынша ылғалды режим, сумен тікелей жанаспай']
          ]],
          ['Жіктерді бітеу және әрлеу', [
            ['Жіктерді өңдеу кезіндегі бөлме температурасы', '+10 °C-тан төмен емес, екі тәулік тұрақты'],
            ['Тік жиектегі жіктер', 'арматуралық таспасыз гипс байланыстырғышпен шпатлевкалау'],
            ['Ылғалды бөлмелердегі ГСПВ жіктері', 'гидрофобтандырылған шпаклёвка'],
            ['Әрлеу алдындағы дайындық', 'бет пен жіктерді терең сіңетін грунтовкамен өңдеу'],
            ['Бояу', 'ішкі жұмыстарға арналған кез келген бояу, су-дисперсиялық ұсынылады'],
            ['Жол берілмейді', 'әк бояулары және сұйық шыны негізіндегі бояулар'],
            ['Бояу кезіндегі бет температурасы', '+5 °C-тан төмен емес']
          ]],
          ['Плиткамен қаптау', [
            ['Қаңқа тіреу профильдерінің қадамы', '400 мм-ден аспайды'],
            ['Ылғалды бөлмелердегі тақта маркасы', 'тек ГСПВ'],
            ['Гидрооқшаулау', 'ылғалдың тікелей әсері кезінде міндетті'],
            ['Ішкі бұрыштар мен түйісулер', 'тұрақты серпімді герметик']
          ]]
        ],
        en: [
          ['Grades and dimensions', [
            ['Grades', 'ГСП and moisture-resistant ГСПВ'],
            ['Edge', 'straight or rabbeted'],
            ['Thickness', '8–24 mm'],
            ['Thickness tolerance', '± 0.5–0.6 mm'],
            ['Face surface tolerance', 'no more than two dents Ø up to 20 mm and up to 0.3 mm deep per 1 m²']
          ]],
          ['Standards', [
            ['Technical specifications', 'ГОСТ 34719-2021, ТУ 5742-004-05292444-2010'],
            ['Conditions for ГСПВ', 'humid regime per СНиП 23-02-2003, no direct contact with water']
          ]],
          ['Joints and finishing', [
            ['Room temperature during joint work', 'not below +10 °C, stable for two days'],
            ['Joints with a straight edge', 'gypsum-based filler without reinforcing tape'],
            ['ГСПВ joints in wet rooms', 'water-repellent filler'],
            ['Preparation for the finish', 'deep-penetration primer on the surface and the joints'],
            ['Painting', 'any interior paint; water-dispersion paints recommended'],
            ['Not permitted', 'lime paints and water-glass paints'],
            ['Surface temperature when painting', 'not below +5 °C']
          ]],
          ['Tiling', [
            ['Stud profile spacing', 'not more than 400 mm'],
            ['Board grade in wet rooms', 'ГСПВ only'],
            ['Waterproofing', 'mandatory under direct water exposure'],
            ['Internal corners and abutments', 'permanently elastic sealant']
          ]]
        ]
      },
      name: { ru: 'Гипсостружечная плита',
              kz: 'Гипс-жаңқалы тақта',
              en: 'Gypsum-fibre board' },
      img: 'assets/prod/gsp.webp',
      specs: [['th', '8–24']],
      desc: {
        ru: 'Гипсостружечная плита — листовой материал из природного гипса, армированного древесной стружкой, без фенолов и формальдегида. Экологически чистая и безопасная для жилых помещений. Пожаробезопасна (группа горючести Г1): не поддерживает горение, не распространяет пламя и не выделяет токсичный дым. Прочная и ударостойкая, надёжно держит крепёж — служит и отделочным, и конструкционным материалом под окраску, обои, штукатурку и кафель, а в залах работает как звукоизоляционный слой. Толщина 8–24 мм; влагостойкое исполнение ГСПВ применяется в ванных, на балконах, в паркингах и бассейнах.',
        kz: 'Гипс-жаңқалы тақта — фенолсыз және формальдегидсіз, ағаш жаңқасымен арматураланған табиғи гипстен жасалған парақ материал. Экологиялық таза, тұрғын үй-жайлар үшін қауіпсіз. Өртке қауіпсіз (жанғыштық тобы Г1): жануды қолдамайды, жалынды таратпайды және улы түтін шығармайды. Берік әрі соққыға төзімді, бекітпені сенімді ұстайды — әрі әрлеу, әрі конструкциялық материал: бояу, тұсқағаз, сылақ пен кафель астына, ал залдарда дыбыс оқшаулағыш қабат ретінде. Қалыңдығы 8–24 мм; ылғалға төзімді ГСПВ орындалуы жуынатын бөлмелерде, балкондарда, паркингтерде және бассейндерде қолданылады.',
        en: 'A gypsum-fibre board made of natural gypsum reinforced with wood shavings, free of phenol and formaldehyde. Environmentally clean and safe for living spaces. Fire-safe (fire class Г1): it does not support combustion, does not spread flame and does not release toxic smoke. Strong and impact-resistant, it holds fasteners securely — serving as both a finishing and a structural material under paint, wallpaper, plaster and tiles, and in halls it works as a sound-insulating layer. Thickness 8–24 mm; the moisture-resistant ГСПВ grade is used in bathrooms, on balconies, in car parks and swimming pools.'
      },
      use: {
        ru: [
          ['Стены', 'Отделка и облицовка под окраску, обои, штукатурку; под кафель в сухих и влажных помещениях; усиление стен под облицовку ГКЛ'],
          ['Кинотеатры и залы', 'Облицовка стен кинотеатров и концертных залов как звукоизоляционный и конструкционный материал; основа перфорированных акустических и декоративных панелей'],
          ['Перегородки', 'Звукоакустические межкомнатные и межквартирные перегородки; конструкционные антивандальные стены; противопожарные перегородки'],
          ['Конструкционные здания', 'СИП-панели; отделка зданий из ЛСТК и деревянного бруса; отделка мансарды'],
          ['Влажные зоны', 'Стены паркинга, крытых бассейнов, внутренняя часть балкона — исполнение ГСПВ'],
          ['Места общего пользования', 'Коридоры и лестничные клетки — как поверхность с повышенной износостойкостью'],
          ['Потолки', 'Подшивка потолка по металлическому и по деревянному каркасу'],
          ['Прочее', 'Откосы; несъёмная опалубка внутренних стен; лифтовые шахты; декоративные перфорированные, шпонированные и ламинированные панели']
        ],
        kz: [
          ['Қабырғалар', 'Бояу, тұсқағаз, сылақ астына әрлеу және қаптау; құрғақ және ылғалды бөлмелерде кафель астына; ГКЛ қаптамасы астына қабырғаны күшейту'],
          ['Кинотеатрлар мен залдар', 'Кинотеатрлар мен концерт залдарының қабырғаларын дыбыс оқшаулағыш әрі конструкциялық материал ретінде қаптау; тесікті акустикалық және декоративті панельдердің негізі'],
          ['Қалқалар', 'Бөлмеаралық және пәтераралық дыбыс-акустикалық қалқалар; конструкциялық вандализмге төзімді қабырғалар; өртке қарсы қалқалар'],
          ['Конструкциялық ғимараттар', 'СИП-панельдер; ЛСТК және ағаш брустан жасалған ғимараттарды әрлеу; мансарданы әрлеу'],
          ['Ылғалды аймақтар', 'Паркинг, жабық бассейн қабырғалары, балконның ішкі бөлігі — ГСПВ орындалуы'],
          ['Ортақ пайдалану орындары', 'Дәліздер мен баспалдақ алаңдары — тозуға төзімділігі жоғары бет ретінде'],
          ['Төбелер', 'Металл және ағаш қаңқа бойынша төбе қаптау'],
          ['Басқасы', 'Еңістер; ішкі қабырғалардың алынбайтын қалыбы; лифт шахталары; декоративті тесікті, шпонды және ламинатталған панельдер']
        ],
        en: [
          ['Walls', 'Finishing and facing under paint, wallpaper and plaster; under tiles in dry and wet rooms; reinforcing walls under plasterboard facing'],
          ['Cinemas and halls', 'Facing the walls of cinemas and concert halls as a sound-insulating and structural material; a base for perforated acoustic and decorative panels'],
          ['Partitions', 'Sound-insulating partitions between rooms and between flats; structural vandal-resistant walls; fire partitions'],
          ['Structural buildings', 'SIP panels; finishing of light-gauge steel and timber-frame buildings; attic finishing'],
          ['Wet areas', 'Car-park and indoor-pool walls, the inner side of balconies — the ГСПВ grade'],
          ['Common areas', 'Corridors and stairwells — as a surface with increased wear resistance'],
          ['Ceilings', 'Ceiling lining on a metal or a timber frame'],
          ['Other', 'Reveals; permanent formwork for internal walls; lift shafts; decorative perforated, veneered and laminated panels']
        ]
      }
    },
    {
      id: 'csp',
      detail: {
        ru: [
          ['Физико-механические свойства', [
            ['Плотность', '1100–1400 кг/м³'],
            ['Влажность', '9 ± 3 %'],
            ['Разбухание по толщине за 24 ч', 'не более 1,5 %'],
            ['Водопоглощение за 24 ч', 'не более 16 %'],
            ['Прочность при изгибе, до 12 мм', 'не менее 12 МПа'],
            ['Прочность при изгибе, 12–19 мм', 'не менее 10 МПа'],
            ['Прочность при изгибе, свыше 19 мм', 'не менее 9 МПа'],
            ['Прочность при растяжении перпендикулярно пласти', 'не менее 0,5 МПа'],
            ['Модуль упругости при изгибе', 'не менее 4500 МПа'],
            ['Ударная вязкость', '1800 Дж/м²'],
            ['Твёрдость', '46–65 МПа'],
            ['Удельное сопротивление выдёргиванию шурупов', '4–7 Н/м'],
            ['Класс биостойкости', '4'],
            ['Группа горючести', 'Г1, слабогорючие'],
            ['Морозостойкость, 50 циклов', 'снижение прочности не более 10 %']
          ]],
          ['Теплотехнические свойства', [
            ['Коэффициент теплопроводности', '0,26 Вт/(м·К)'],
            ['Удельная теплоёмкость', '1,15 кДж/(кг·К)'],
            ['Коэффициент линейного расширения', '0,0235 мм/(п.м.·°C)'],
            ['Коэффициент паропроницаемости', '0,03 мг/(м·ч·Па)'],
            ['Температурное сопротивление, 12 мм', '0,046 м²·°C/Вт'],
            ['Температурное сопротивление, 24 мм', '0,092 м²·°C/Вт']
          ]],
          ['Звукоизоляция', [
            ['Изоляция воздушного шума, 10 мм', 'Rw 30 дБ'],
            ['Изоляция воздушного шума, 12 мм', 'Rw 31 дБ'],
            ['Улучшение изоляции ударного шума, 20 и 24 мм по перекрытию', '16–17 дБ'],
            ['То же по упругому слою — дополнительно', '9–10 дБ']
          ]],
          ['Номенклатура', [
            ['Форматы листа', '2700 × 1250 и 3200 × 1250 мм'],
            ['Толщины', '8, 10, 12, 16, 20, 24, 36 мм'],
            ['Вес листа 2700 × 1250 × 12 мм', '54,68 кг'],
            ['Вес листа 3200 × 1250 × 12 мм', '64,80 кг'],
            ['Предельные отклонения по толщине, шлифованные', '± 0,3 мм'],
            ['Предельные отклонения по длине и ширине', '± 3 мм']
          ]]
        ],
        kz: [
          ['Физика-механикалық қасиеттері', [
            ['Тығыздығы', '1100–1400 кг/м³'],
            ['Ылғалдылығы', '9 ± 3 %'],
            ['24 сағатта қалыңдығы бойынша ісінуі', '1,5 %-дан аспайды'],
            ['24 сағатта су сіңіруі', '16 %-дан аспайды'],
            ['Иілу беріктігі, 12 мм-ге дейін', '12 МПа-дан кем емес'],
            ['Иілу беріктігі, 12–19 мм', '10 МПа-дан кем емес'],
            ['Иілу беріктігі, 19 мм-ден жоғары', '9 МПа-дан кем емес'],
            ['Тақтаға перпендикуляр созылу беріктігі', '0,5 МПа-дан кем емес'],
            ['Иілу кезіндегі серпімділік модулі', '4500 МПа-дан кем емес'],
            ['Соққы тұтқырлығы', '1800 Дж/м²'],
            ['Қаттылығы', '46–65 МПа'],
            ['Бұранданы суыруға меншікті кедергі', '4–7 Н/м'],
            ['Биотөзімділік класы', '4'],
            ['Жанғыштық тобы', 'Г1, әлсіз жанатын'],
            ['Аязға төзімділік, 50 цикл', 'беріктік 10 %-дан аспай төмендейді']
          ]],
          ['Жылу техникалық қасиеттері', [
            ['Жылу өткізгіштік коэффициенті', '0,26 Вт/(м·К)'],
            ['Меншікті жылу сыйымдылығы', '1,15 кДж/(кг·К)'],
            ['Сызықтық ұлғаю коэффициенті', '0,0235 мм/(п.м.·°C)'],
            ['Бу өткізгіштік коэффициенті', '0,03 мг/(м·сағ·Па)'],
            ['Температуралық кедергі, 12 мм', '0,046 м²·°C/Вт'],
            ['Температуралық кедергі, 24 мм', '0,092 м²·°C/Вт']
          ]],
          ['Дыбыс оқшаулау', [
            ['Ауа шуын оқшаулау, 10 мм', 'Rw 30 дБ'],
            ['Ауа шуын оқшаулау, 12 мм', 'Rw 31 дБ'],
            ['Соққы шуын оқшаулауды жақсарту, 20 және 24 мм жабын бойынша', '16–17 дБ'],
            ['Серпімді қабат бойынша — қосымша', '9–10 дБ']
          ]],
          ['Номенклатура', [
            ['Парақ форматтары', '2700 × 1250 және 3200 × 1250 мм'],
            ['Қалыңдықтары', '8, 10, 12, 16, 20, 24, 36 мм'],
            ['2700 × 1250 × 12 мм парақтың салмағы', '54,68 кг'],
            ['3200 × 1250 × 12 мм парақтың салмағы', '64,80 кг'],
            ['Қалыңдық бойынша шекті ауытқу, тегістелген', '± 0,3 мм'],
            ['Ұзындығы мен ені бойынша шекті ауытқу', '± 3 мм']
          ]]
        ],
        en: [
          ['Physical and mechanical properties', [
            ['Density', '1100–1400 kg/m³'],
            ['Moisture content', '9 ± 3 %'],
            ['Thickness swelling in 24 h', 'max 1.5 %'],
            ['Water absorption in 24 h', 'max 16 %'],
            ['Bending strength, up to 12 mm', 'min 12 MPa'],
            ['Bending strength, 12–19 mm', 'min 10 MPa'],
            ['Bending strength, over 19 mm', 'min 9 MPa'],
            ['Tensile strength perpendicular to the board', 'min 0.5 MPa'],
            ['Modulus of elasticity in bending', 'min 4500 MPa'],
            ['Impact strength', '1800 J/m²'],
            ['Hardness', '46–65 MPa'],
            ['Specific screw withdrawal resistance', '4–7 N/m'],
            ['Biological resistance class', '4'],
            ['Fire class', 'Г1, low combustibility'],
            ['Frost resistance, 50 cycles', 'strength loss max 10 %']
          ]],
          ['Thermal properties', [
            ['Thermal conductivity', '0.26 W/(m·K)'],
            ['Specific heat capacity', '1.15 kJ/(kg·K)'],
            ['Coefficient of linear expansion', '0.0235 mm/(m·°C)'],
            ['Vapour permeability', '0.03 mg/(m·h·Pa)'],
            ['Thermal resistance, 12 mm', '0.046 m²·°C/W'],
            ['Thermal resistance, 24 mm', '0.092 m²·°C/W']
          ]],
          ['Sound insulation', [
            ['Airborne sound insulation, 10 mm', 'Rw 30 dB'],
            ['Airborne sound insulation, 12 mm', 'Rw 31 dB'],
            ['Impact sound improvement, 20 and 24 mm on a slab', '16–17 dB'],
            ['Same on a resilient layer — additionally', '9–10 dB']
          ]],
          ['Range', [
            ['Sheet formats', '2700 × 1250 and 3200 × 1250 mm'],
            ['Thicknesses', '8, 10, 12, 16, 20, 24, 36 mm'],
            ['Weight of a 2700 × 1250 × 12 mm sheet', '54.68 kg'],
            ['Weight of a 3200 × 1250 × 12 mm sheet', '64.80 kg'],
            ['Thickness tolerance, sanded', '± 0.3 mm'],
            ['Length and width tolerance', '± 3 mm']
          ]]
        ]
      },
      name: { ru: 'Цементно-стружечная плита',
              kz: 'Цемент-жаңқалы тақта',
              en: 'Cement-bonded particle board' },
      img: 'assets/prod/csp.webp',
      specs: [['th', '8–24']],
      desc: {
        ru: 'Цементно-стружечная плита — прочный листовой материал из портландцемента и древесной стружки с минерализаторами, без асбеста, фенолов и формальдегида. Экологически чистая. Пожаробезопасна (группа горючести Г1): не поддерживает горение, не распространяет пламя и не выделяет токсичный дым. Влагостойкая и биостойкая — не разбухает при длительном контакте с водой, не гниёт и не плесневеет, устойчива к ультрафиолету, морозу и агрессивным средам. Толщина подбирается под задачу: от 8 мм на подшивку до 24 мм на опалубку, полы и фальшполы.',
        kz: 'Цемент-жаңқалы тақта — портландцемент пен ағаш жаңқасынан минерализаторлармен жасалған, асбессіз, фенолсыз және формальдегидсіз берік парақ материал. Экологиялық таза. Өртке қауіпсіз (жанғыштық тобы Г1): жануды қолдамайды, жалынды таратпайды және улы түтін шығармайды. Ылғалға және биологиялық әсерге төзімді — сумен ұзақ жанасқанда ісінбейді, шірімейді және зең баспайды, ультракүлгінге, аязға және агрессивті ортаға төзімді. Қалыңдығы міндетке қарай таңдалады: қаптауға 8 мм-ден бастап еден мен жалған едендерге 24 мм-ге дейін.',
        en: 'A cement-bonded particle board — a strong sheet material made of Portland cement and wood shavings with mineralisers, free of asbestos, phenol and formaldehyde. Environmentally clean. Fire-safe (fire class Г1): it does not support combustion, does not spread flame and does not release toxic smoke. Moisture- and bio-resistant — it does not swell in prolonged contact with water, does not rot or grow mould, and withstands ultraviolet light, frost and aggressive environments. The thickness is chosen for the task: from 8 mm for lining up to 24 mm for formwork, floors and raised floors.'
      },
      use: {
        ru: [
          ['Опалубка', 'Вертикальная и горизонтальная, съёмная и несъёмная; несъёмная опалубка бассейнов — 8–24 мм'],
          ['Полы', 'Плавающие полы на акустическом утеплителе и на минеральной отсыпке; тёплые полы; полы на лагах; фальшполы на стойках — 12–24 мм'],
          ['Кинотеатры', 'Полы и ступени на металлическом каркасе; акустические стены кинотеатров и театров — 10–24 мм'],
          ['Стены и перегородки', 'Межкомнатные перегородки вместо кирпичной кладки, огнеупорные и антивандальные, стиль лофт; внутренние и наружные стены на профиле; влагостойкие стены ванных — 10–12 мм'],
          ['Конструктивные решения', 'Обшивка ЛСТК, каркасных зданий из бруса, несущих стен с двух сторон; быстровозводимые конструкции — 10–12 мм'],
          ['Панели', 'СИП-панели и композитные панели — 10–24 мм'],
          ['Фасад', 'Вентилируемый фасад нагружаемый и ненагружаемый; выравнивание кирпичной кладки и монолита — 10–16 мм'],
          ['Колонны и шахты', 'Колонны паркинга и входных групп; обшивка лифтовой шахты как отделка и как конструкция — 10–20 мм'],
          ['Потолок и кровля', 'Подшивка потолка, карниза, зашивка фронтона; чердачное перекрытие; наклонная и плоская кровля — 8–16 мм'],
          ['Сельское хозяйство', 'Полы животноводческих ферм и птицеферм; зернохранилища; тёплые грядки; садовые дорожки и отмостки — 12–24 мм']
        ],
        kz: [
          ['Қалып', 'Тік және көлденең, алынатын және алынбайтын; бассейндердің алынбайтын қалыбы — 8–24 мм'],
          ['Едендер', 'Акустикалық жылытқыш пен минералды төсеме үстіндегі қалқымалы едендер; жылы едендер; арқалық үстіндегі едендер; тіректегі жалған едендер — 12–24 мм'],
          ['Кинотеатрлар', 'Металл қаңқадағы едендер мен басқыштар; кинотеатрлар мен театрлардың акустикалық қабырғалары — 10–24 мм'],
          ['Қабырғалар мен қалқалар', 'Кірпіш қалаудың орнына бөлмеаралық қалқалар, отқа төзімді және вандализмге төзімді, лофт стилі; профильдегі ішкі және сыртқы қабырғалар; жуынатын бөлменің ылғалға төзімді қабырғалары — 10–12 мм'],
          ['Конструкциялық шешімдер', 'ЛСТК, брус қаңқалы ғимараттарды, көтергіш қабырғаларды екі жағынан қаптау; тез тұрғызылатын конструкциялар — 10–12 мм'],
          ['Панельдер', 'СИП-панельдер және композиттік панельдер — 10–24 мм'],
          ['Фасад', 'Жүктелетін және жүктелмейтін желдетілетін фасад; кірпіш қалау мен монолитті тегістеу — 10–16 мм'],
          ['Бағаналар мен шахталар', 'Паркинг пен кіреберіс топтарының бағаналары; лифт шахтасын әрлеу және конструкция ретінде қаптау — 10–20 мм'],
          ['Төбе мен шатыр', 'Төбе, карниз қаптау, фронтон жабу; шатыр асты жабыны; көлбеу және жазық шатыр — 8–16 мм'],
          ['Ауыл шаруашылығы', 'Мал және құс фермаларының едендері; астық қоймалары; жылы жүйектер; бақ жолдары мен соқпақтар — 12–24 мм']
        ],
        en: [
          ['Formwork', 'Vertical and horizontal, removable and permanent; permanent formwork for pools — 8–24 mm'],
          ['Floors', 'Floating floors on acoustic insulation and on mineral fill; underfloor heating; floors on joists; raised floors on pedestals — 12–24 mm'],
          ['Cinemas', 'Floors and tiers on a steel frame; acoustic walls of cinemas and theatres — 10–24 mm'],
          ['Walls and partitions', 'Room partitions instead of brickwork, fire-resistant and vandal-resistant, loft style; internal and external walls on profiles; moisture-resistant bathroom walls — 10–12 mm'],
          ['Structural solutions', 'Sheathing of light-gauge steel and timber-frame buildings, load-bearing walls on both sides; rapidly erected structures — 10–12 mm'],
          ['Panels', 'SIP panels and composite panels — 10–24 mm'],
          ['Façade', 'Ventilated façade, loaded and unloaded; levelling brickwork and cast concrete — 10–16 mm'],
          ['Columns and shafts', 'Car-park and entrance-group columns; lift-shaft sheathing as a finish and as a structure — 10–20 mm'],
          ['Ceiling and roof', 'Ceiling and eaves lining, gable sheathing; attic floor; pitched and flat roofs — 8–16 mm'],
          ['Agriculture', 'Floors of livestock and poultry farms; grain stores; warm beds; garden paths and blind areas — 12–24 mm']
        ]
      }
    }
  ];

  return { materials: materials, decor: decor, systems: systems,
           parts: parts, boards: boards };
})();
