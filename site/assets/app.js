// ═══════════════════════════════════════════════════
//  FIREBASE CONFIG — preencha com seus dados
//  (firebase.google.com > seu projeto > configurações)
// ═══════════════════════════════════════════════════
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyDzJARamoxx52ORfQAvqlJfaWRoQt_yUQo",
  authDomain:        "ns-criacao.firebaseapp.com",
  databaseURL:       "https://ns-criacao-default-rtdb.firebaseio.com",
  projectId:         "ns-criacao",
  storageBucket:     "ns-criacao.firebasestorage.app",
  messagingSenderId: "825541864828",
  appId:             "1:825541864828:web:a69f05a473e916f35f08f9"
};
const FB_PATH = "demandas"; // chave no Realtime Database

// ═══════════════════════════════════════════════════
//  CONSTANTES
// ═══════════════════════════════════════════════════
const CATS    = ['NSCO','CIDADE','EVENTOS','OUTROS'];
const SCYCLE  = ['pendente','em andamento','concluído'];
const PALETTE = ['#FF6B6B','#FF9F43','#F9CA24','#6AB04C','#4ECDC4','#45B7D1','#0A84FF','#BF5AF2','#FF453A','#636E72'];

// ═══════════════════════════════════════════════════
//  ESTADO
// ═══════════════════════════════════════════════════
let team = [
  {name:'Luiza',           color:'#FF6B6B', svg:null, startDate:'', role:''},
  {name:'Vitão',           color:'#FF9F43', svg:null, startDate:'', role:''},
  {name:'Thiago',          color:'#45B7D1', svg:null, startDate:'', role:''},
  {name:'Marcela',         color:'#BF5AF2', svg:null, startDate:'', role:''},
  {name:'Marcelo',         color:'#0A84FF', svg:null, startDate:'', role:''},
  {name:'Pedro Melo',      color:'#4ECDC4', svg:null, startDate:'', role:''},
  {name:'Gabs',            color:'#6AB04C', svg:null, startDate:'', role:''},
  {name:'Cris',            color:'#F9CA24', svg:null, startDate:'', role:''},
  {name:'Vitor Chalezinho',color:'#EE5A6F', svg:null, startDate:'', role:''},
];

const SIZES = ['P','M','G'];
const SIZE_LABELS = {P:'Pequeno', M:'Médio', G:'Grande'};
// workload weight per project size
const SIZE_WEIGHT = {P:1, M:2, G:3};

let tasks = [
  {id:1,title:"PPT Nestlé",category:"NSCO",description:"",responsible:["—"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:2,title:"PPT Tribe Accor",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:3,title:"Sympla Ação Junina",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:4,title:"Red Bull Sarará",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:5,title:"Alterações Thomaz Bellucci",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:6,title:"Localiza",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:7,title:"Red Bull Sarará Ajuste QR",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:8,title:"Sympla Circuito Junino",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:9,title:"IFF / FCE Pharma Copo / Bottom Tag / Cordinha ajustes",category:"NSCO",description:"",responsible:["Marcelo","Pedro Melo"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:10,title:"IFF / Novos Ajustes",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:11,title:"Globo Brinde Fim de Ano Apresentação",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:12,title:"Globo Dona de Mim IDV + Simulação",category:"NSCO",description:"",responsible:["Pedro Melo","Vitão"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:13,title:"Arcelor Mockup",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:14,title:"BudZone Fifa Ceno",category:"NSCO",description:"",responsible:["Pedro Melo","Vitão"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:15,title:"Cidade Camisas",category:"NSCO",description:"",responsible:["—"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:16,title:"Bernoulli | Moyra 22/05",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-05-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:17,title:"Hot n Code Sacola e elevador 27/05",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-05-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:18,title:"3 Lambes Cidade 26/05",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-05-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:19,title:"Hot n Code Credenciais 27/05",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-05-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:20,title:"OBoticário Cidade 27/05 Ativações pt1",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-05-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:21,title:"OBoticário Cidade 27/05 Convite Save the Date",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-05-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:22,title:"Arcelor ativações 28/05",category:"NSCO",description:"",responsible:["Pedro Melo","Marcelo"],dueDate:"2026-05-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:23,title:"Hotmart Lolla Meets Fire 28/05 Cardápio",category:"NSCO",description:"",responsible:["Pedro Melo","Vitão"],dueDate:"2026-05-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:24,title:"CIDADE Displays PDVs Nephew",category:"NSCO",description:"",responsible:["—"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:25,title:"OBoticário Her Code 30/05",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-05-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:26,title:"Cadiveu 30/05 IDV, Apresentação e Brindes",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-05-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:27,title:"OBoticário Cidade GB Encontro de Líderes 30/05",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-05-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:28,title:"Feira VR Floripa 30/05",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-05-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:29,title:"Red Bull Zero Ação 30/05",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-05-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:30,title:"Cardápio Hot N'Code 02/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:31,title:"CIDADE Carrinho 02/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:32,title:"OBoticário artes virtuais 02/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:33,title:"CIDADE campanhas das marcas patrocinadoras Vivo / Mccain 02/06",category:"NSCO",description:"",responsible:["—"],dueDate:"2026-06-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:34,title:"Tardezinha Convite nSco. 02/06",category:"NSCO",description:"",responsible:["—"],dueDate:"2026-06-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:35,title:"Kopenhagen apresentação + campanha 02/06 ref dia dos namorados + cereja",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:36,title:"Budweiser FIFA saídas 04/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:37,title:"CIDADE campanhas das marcas patrocinadoras principais + base geral 06/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-06",presentDate:"",status:"concluído",size:"M",won:false},
  {id:38,title:"Quintal Sessions by Budweiser FIFA postagem trio feed + Avatar 06/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-06",presentDate:"",status:"concluído",size:"M",won:false},
  {id:39,title:"Hotmart WarmUp Fire 09/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-09",presentDate:"",status:"concluído",size:"M",won:false},
  {id:40,title:"Roleta Vale Tudo Globo 09/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-09",presentDate:"",status:"concluído",size:"M",won:false},
  {id:41,title:"Cenografia Mangalarga Expo 09/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-09",presentDate:"",status:"concluído",size:"M",won:false},
  {id:42,title:"Arcelor chamada vídeo 09/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-09",presentDate:"",status:"concluído",size:"M",won:false},
  {id:43,title:"CIDADE Ceno 09/06",category:"NSCO",description:"",responsible:["Cris","Marcelo"],dueDate:"2026-06-09",presentDate:"",status:"concluído",size:"M",won:false},
  {id:44,title:"Arte Contratação Produção Tuffy 09/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-09",presentDate:"",status:"concluído",size:"M",won:false},
  {id:45,title:"Prêmio Live 10/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:46,title:"Arcelor Stand Made in Minas 10/06",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-06-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:47,title:"CIDADE Molduras Vivo 11/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:48,title:"O Boticário Quadros e Números Ativações 12/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:49,title:"Uniforme Promotoras Bud 12/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:50,title:"Tardezinha Ajuste de Arte 12/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:51,title:"Bernoulli 360° 12/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:52,title:"Localiza / Cinemark Presentation 13/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:53,title:"Budweiser Camisa Kit 13/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:54,title:"CIDADE Card Zig 13/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:55,title:"HotMart 8 Dígitos Backlight 13/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:56,title:"Aura Community 13/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:57,title:"Fini Apresentação 16/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:58,title:"Aura Dia Dos Namorados 17/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-17",presentDate:"",status:"concluído",size:"M",won:false},
  {id:59,title:"Cimento Nacional 16/06 - 18/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:60,title:"Aura ação Dia dos Namorados 18/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:61,title:"O Boticário CIDADE Convites 18/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:62,title:"Mockups Ludo 18/06",category:"NSCO",description:"",responsible:["Vitão","Ju"],dueDate:"2026-06-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:63,title:"Arcelor KV Base 18/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:64,title:"Card Palco Hotmart 18/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:65,title:"O Boticário CIDADE Intruções 20/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:66,title:"Cardápio Hotmart 20/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:67,title:"Cardápios GLOBO Triedro 10x21cm 23/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-23",presentDate:"",status:"concluído",size:"M",won:false},
  {id:68,title:"Conacarne 23/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-23",presentDate:"",status:"concluído",size:"M",won:false},
  {id:69,title:"Melissa Grendene 23/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-23",presentDate:"",status:"concluído",size:"M",won:false},
  {id:70,title:"Quintal Sessions Convites Virtuais + Capa Ambev e Influs 23/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-23",presentDate:"",status:"concluído",size:"M",won:false},
  {id:71,title:"Aura Moletom e Conteúdo Leds Ação Dia dos Namorados 24/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:72,title:"Bud Convite QR Code Influx & Ambev 24/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:73,title:"O Boticário CIDADE Cardápio 25/06",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-06-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:74,title:"O Boticário CIDADE Instruções convites 24/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:75,title:"Stellantis Backdrop Tardezinha 25/06",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-06-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:76,title:"Arcelor Concorrência 25/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:77,title:"Her Code VS2 25/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:78,title:"Hotmart Troopers 26/06 KV",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:79,title:"CIDADE ASSAÍ 27/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:80,title:"Lindt + Chalezinho 30/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:81,title:"Artes Tardezinha Camarote Citroen 01/07",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-07-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:82,title:"Bud Selo 5x5cm 01/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:83,title:"Conacarne 02/07",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-07-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:84,title:"Cardápio Hotmart 03/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:85,title:"Cardápio Hotmart 03/07 BSB",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:86,title:"Budweiser Card Influs 03/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:87,title:"Card / Tag / Voucher nSco. 04/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:88,title:"Cactus Layout 04/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:89,title:"Núcleo Metropolitano Premiação 04/07",category:"NSCO",description:"",responsible:["Vitão","Pedro Melo"],dueDate:"2025-07-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:90,title:"Hotmart Fire 10 anos Layout Cenografia 04/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:91,title:"Mockup Her Code Uniforme 07/07",category:"NSCO",description:"",responsible:["—"],dueDate:"2025-07-07",presentDate:"",status:"concluído",size:"M",won:false},
  {id:92,title:"Minas Máquinas 08/07",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-07-08",presentDate:"",status:"concluído",size:"M",won:false},
  {id:93,title:"Arcelor Fim de Ano 08/07",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-07-08",presentDate:"",status:"concluído",size:"M",won:false},
  {id:94,title:"Cadiveu Beauty Fair 10/07",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-07-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:95,title:"RedBull Ação Ativação Academias 10/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:96,title:"RedBull Ação Apresentação Academias 10/07",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-07-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:97,title:"O Boticário Convite Franqueados Tiradentes 09/07",category:"NSCO",description:"",responsible:["—"],dueDate:"2025-07-09",presentDate:"",status:"concluído",size:"M",won:false},
  {id:98,title:"Mangalarga ajustes cenografia 09/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-09",presentDate:"",status:"concluído",size:"M",won:false},
  {id:99,title:"Camiseta Amstel 10/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:100,title:"Mangalarga Calçada 11/07",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-07-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:101,title:"Localiza Fartura 11/07",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-07-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:102,title:"Moodboard nSco. 11/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:103,title:"Complex 11/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:104,title:"Mangalarga Ballena Peças 11/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:105,title:"Arte Boas-Vindas Marcela 14/07",category:"NSCO",description:"",responsible:["—"],dueDate:"2025-07-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:106,title:"Card Institucional nSco 14/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:107,title:"Mangalarga Igreja 14/07",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-07-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:108,title:"CIDADE flyer 14/07",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-07-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:109,title:"H2 Poker 15/07",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-07-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:110,title:"FAEMG Conacarne 16/07",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-07-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:111,title:"RedBelt 17/07",category:"NSCO",description:"",responsible:["—"],dueDate:"2025-07-17",presentDate:"",status:"concluído",size:"M",won:false},
  {id:112,title:"Camiseta HotMart Arte Brownie Troopers 17/07",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-07-17",presentDate:"",status:"concluído",size:"M",won:false},
  {id:113,title:"Mangalarga Amstel Bares 16/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:114,title:"Mangalarga Bar Autosserviço 17/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-17",presentDate:"",status:"concluído",size:"M",won:false},
  {id:115,title:"Purify Orange Day - Save The Date 18/07",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-07-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:116,title:"Boticário Confraria 18/07",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-07-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:117,title:"Arcelor Economia Circular 21/07",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-07-21",presentDate:"",status:"concluído",size:"M",won:false},
  {id:118,title:"COPASA Memórias das Águas 22/07",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-07-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:119,title:"Concorrência Hotmart Troopers Party 22/07",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-07-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:120,title:"Henrique & Juliano Save The Date 22/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:121,title:"Globo Produção / Cenografia 22/07",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-07-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:122,title:"CIDADE Relatório Templates 23/07",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-07-23",presentDate:"",status:"concluído",size:"M",won:false},
  {id:123,title:"Boticário Her Code 24/07 Apresentação",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-07-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:124,title:"Hotmart Experience 24/07 Produção",category:"NSCO",description:"",responsible:["Pedro Melo","Marcela"],dueDate:"2025-07-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:125,title:"Invest Festuris e ABAV 24/07",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-07-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:126,title:"AMCHAM 24/07",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-07-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:127,title:"Guaraná Propositivo 25/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:128,title:"Guaraná Cenografia 25/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:129,title:"Purify Orange Day Convite + Agradecimento 25/07",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-07-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:130,title:"Nuvem Shop 28/07",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-07-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:131,title:"Omelete + TikTok IDV 29/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-29",presentDate:"",status:"concluído",size:"M",won:false},
  {id:132,title:"Conacarne Guia 30/07",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-07-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:133,title:"Casa Lindt Mockups 30/07",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-07-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:134,title:"Purify Lambes 30/07",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-07-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:135,title:"Her Code Mockups 31/07",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-07-31",presentDate:"",status:"concluído",size:"M",won:false},
  {id:136,title:"CIDADE manipulação posters 31/07",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-07-31",presentDate:"",status:"concluído",size:"M",won:false},
  {id:137,title:"Vollumens 5 Painéis",category:"NSCO",description:"",responsible:["Pedro Melo","Marcela"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:138,title:"Conacarne Ajustes Guia e Apresentação 31/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-31",presentDate:"",status:"concluído",size:"M",won:false},
  {id:139,title:"Sigraweb 01/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:140,title:"Casa Lindt Mockups Ajustes 01/08",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-08-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:141,title:"EXA Fim de Ano 01/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:142,title:"Vollmens 01/08",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-08-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:143,title:"Sigraweb Ajustes 01/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:144,title:"Omelete + TikTok 01/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:145,title:"Copasa 04/08",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-08-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:146,title:"Complex Slides 04/08",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-08-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:147,title:"RAM Layout Apresentação 04/08",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-08-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:148,title:"Boticário Fartura Tiradentes 05/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:149,title:"O Boticário Encontro de Líderes GB Ajustes 05/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:150,title:"Hotmart Manipulação Fotos 05/08",category:"NSCO",description:"",responsible:["Pedro Melo","Marcelo"],dueDate:"2025-08-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:151,title:"Purify Peças Restantes - Confirmação / Lembrete e Agradecimento 05/08",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-08-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:152,title:"Arcelor Corrida KV + Apresentação 07/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-07",presentDate:"",status:"concluído",size:"M",won:false},
  {id:153,title:"Vaga Arquitetura 07/08",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-08-07",presentDate:"",status:"concluído",size:"M",won:false},
  {id:154,title:"Bradesco 08/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-08",presentDate:"",status:"concluído",size:"M",won:false},
  {id:155,title:"Cidade Vídeo 08/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-08",presentDate:"",status:"concluído",size:"M",won:false},
  {id:156,title:"Guia Conacarne Alterações V5 11/08",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-08-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:157,title:"Purefy Ceno 11/08",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-08-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:158,title:"Fire WarmUp Refação Completa da IDV 11/08",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-08-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:159,title:"Vollmens In Cosmetics 11/08",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-08-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:160,title:"CNBC Brindes 11/08",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-08-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:161,title:"Select 12/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:162,title:"Her Code Mockups e refino de slides 13/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:163,title:"Park Shopping 14/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:164,title:"CNN 14/08",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-08-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:165,title:"Localiza Meeo Ceno 14/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:166,title:"Syngenta 14/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:167,title:"Grupo Boticário 14/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:168,title:"CNBC Backdrops 14/08",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-08-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:169,title:"Countdown Fire Cenografia 14/08",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-08-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:170,title:"Alteração TVs Demanda Kiko 14/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:171,title:"Guaraná Novos Mockups e Slides 18/08",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-08-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:172,title:"nSco. Marca v1 18/08",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-08-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:173,title:"Red Bull Fire 18/08",category:"NSCO",description:"",responsible:["Marcelo","Pedro Melo"],dueDate:"2025-08-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:174,title:"Localiza Ação Mastercard 18/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:175,title:"Boticário Her Code alterações 18/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:176,title:"Purefy Agradecimento Foto BH 19/08",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-08-19",presentDate:"",status:"concluído",size:"M",won:false},
  {id:177,title:"Guaraná Ação Cabine SP Wandinha 19/08",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-08-19",presentDate:"",status:"concluído",size:"M",won:false},
  {id:178,title:"Boticário Malbec 19/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-19",presentDate:"",status:"concluído",size:"M",won:false},
  {id:179,title:"Conacarne Brindes 19/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-19",presentDate:"",status:"concluído",size:"M",won:false},
  {id:180,title:"Boticário Her Code Alterações 19/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-19",presentDate:"",status:"concluído",size:"M",won:false},
  {id:181,title:"EstrelaBet 20/08",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-08-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:182,title:"Hotmart Warmup Cardápio 20/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:183,title:"Localiza Fartura Adesivo Pousadas 20/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:184,title:"Boticário Her Code Mockups Alterações 20/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:185,title:"Hotmart Countdown Cardápio Triedro 21/08",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-08-21",presentDate:"",status:"concluído",size:"M",won:false},
  {id:186,title:"Conarcarne Guia Alteração V6 21/08",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-08-21",presentDate:"",status:"concluído",size:"M",won:false},
  {id:187,title:"Arcelor Corrida Alteração Logo 21/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-21",presentDate:"",status:"concluído",size:"M",won:false},
  {id:188,title:"Boticário Her Code Mockups Alterações V4 21/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-21",presentDate:"",status:"concluído",size:"M",won:false},
  {id:189,title:"Hotmart Fire 9 Cardápios 22/08",category:"NSCO",description:"",responsible:["Vitão","Gabs"],dueDate:"2025-08-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:190,title:"Omelete + TikTok Virtuais 22/08",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-08-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:191,title:"CIMED Cenografia 25/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:192,title:"Omelete + TikTok Ceno 25/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:193,title:"Omelete + TikTok Brindes 25/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:194,title:"Hotmart Fire Warmup Cardápio Alterações 25/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:195,title:"Ram Festival 25/08 Apresentação",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-08-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:196,title:"Ram Chalezinho Ceno Totem + Tag Porta 25/08",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-08-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:197,title:"Boticário Her Code Mockups Alterações 25/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:198,title:"Carta Hotmart Fire 26/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:199,title:"Boticário Confraria Malbec Ajustes 26/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:200,title:"Hotmart Fire Cardápio Área Vip Ajuste 26/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:201,title:"Conceito KV Halloween Moodboard 26/08",category:"NSCO",description:"",responsible:["Vitão","Pedro Melo"],dueDate:"2025-08-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:202,title:"Boticário Her Code Mockups Alterações 26/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:203,title:"Aura Beauty Fair Camiseta Promo 26/08",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-08-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:204,title:"Omelete + TikTok RSVP 26/08",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-08-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:205,title:"Ram Cuiabá Backdrop 26/08",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-08-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:206,title:"Omelete + TikTok Apresentação Roteiro 26/08",category:"NSCO",description:"",responsible:["Gabs"],dueDate:"2025-08-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:207,title:"Halloween IDV Base - Logo Edição + Cores + Fontes 26/08",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-08-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:208,title:"Boticário Her Code Mockups Alterações 27/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:209,title:"Ram Ativação Promoters 27/08",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-08-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:210,title:"Omelete + TikTok Ceno Ajustes e Brindes 28/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:211,title:"Conacarne Avental 27/08",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-08-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:212,title:"Halloween SaveTheDate Motion + Estático + Sympla 28/08",category:"NSCO",description:"",responsible:["Pedro Melo","Vitão"],dueDate:"2025-08-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:213,title:"Hotmart Fire Display e Fichas 28/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:214,title:"nSco. Apresentação Marca V2 28/08",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-08-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:215,title:"Ram Cuiabá 28/08 Apresentação + RSVP",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-08-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:216,title:"Boticário Her Code Mockups Alterações V9 28/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:217,title:"Conacarne Crachás 29/09",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-09-29",presentDate:"",status:"concluído",size:"M",won:false},
  {id:218,title:"Boticário Her Code Mockups Alterações V10 29/08",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-08-29",presentDate:"",status:"concluído",size:"M",won:false},
  {id:219,title:"Aura Beauty Fair Fichas + Totem 01/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:220,title:"Hotmart Fire Carta Agradecimento + Tampa Caixa + Tag 01/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:221,title:"Cimento Nacional 01/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:222,title:"Halloween Faltam 10 Dias Abertura de Vendas 01/09",category:"NSCO",description:"",responsible:["Vitão","Pedro Melo"],dueDate:"2025-09-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:223,title:"RAM Cuiabá Ajustes 01/09",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-09-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:224,title:"SABESP KV 01/09",category:"NSCO",description:"",responsible:["Gabs"],dueDate:"2025-09-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:225,title:"CIMED Apresentação 02/09",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-09-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:226,title:"Halloween Geral 02/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:227,title:"Fire Festival Agradecimento Pós-Evento Ajustes 03/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:228,title:"Ram Alterações + Rótulo 03/09",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-09-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:229,title:"Dominguinho Estática 04/09",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-09-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:230,title:"Guaraná Propositivo Carrinho, Ceno e Camiseta 05/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:231,title:"Boticário Trade Mission Ceno e Mockups 05/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:232,title:"Boticário Trade Mission Apresentação e Mockups 05/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:233,title:"Conacarne 05/09",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-09-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:234,title:"Dominguinho Reels 05/09 - 08/09",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-09-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:235,title:"Arcelor ENATS 08/09",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-09-08",presentDate:"",status:"concluído",size:"M",won:false},
  {id:236,title:"Boticário Trade Mission Ajustes 08/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-08",presentDate:"",status:"concluído",size:"M",won:false},
  {id:237,title:"Arcelor Semana Valores 09/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-09",presentDate:"",status:"concluído",size:"M",won:false},
  {id:238,title:"Syngenta Seeds Premiação de Vendas / Nexus 09/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-09",presentDate:"",status:"concluído",size:"M",won:false},
  {id:239,title:"Grupo Boticário - Pontapé Curitiba 10/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:240,title:"Bradesco Apresentação + Mockups 10/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:241,title:"Arcelor Globo Premiação Led Patrocínios 10/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:242,title:"Omelete Cartaz 11/09",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-09-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:243,title:"Hotmart Cardápios Wendel Day + Micha 11/09",category:"NSCO",description:"",responsible:["Gabs"],dueDate:"2025-09-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:244,title:"Syngenta Seeds Premiação de Vendas / Nexus 11/09",category:"NSCO",description:"",responsible:["Pedro Melo","Vitão"],dueDate:"2025-09-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:245,title:"Syngenta Golden Harvest 11/09",category:"NSCO",description:"",responsible:["Marcelo","Marcela"],dueDate:"2025-09-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:246,title:"Capa Linkedin 12/09",category:"NSCO",description:"",responsible:["Gabs"],dueDate:"2025-09-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:247,title:"Boas-Vindas Sofia 12/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:248,title:"Criação de peças base Chalezinho Canva 12/09",category:"NSCO",description:"",responsible:["Gabs"],dueDate:"2025-09-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:249,title:"Guaraná Impresso 10x20cm 15/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:250,title:"Bradesco Ajustes 15/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:251,title:"Butantan 125 Anos Ceno 15/09",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-09-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:252,title:"Conacarne Ajustes 15/09",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-09-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:253,title:"Dominguinho Estática 15/09",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-09-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:254,title:"Boticário Pontapé Certificado 15/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:255,title:"Brahma Peças 16/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:256,title:"Arcelor Globo Premiação Led 16/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:257,title:"Dominguinho peça de reaquecimento Estáticas + Reels 17/09",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-09-17",presentDate:"",status:"concluído",size:"M",won:false},
  {id:258,title:"Dominguinho Book Captação 17/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-17",presentDate:"",status:"concluído",size:"M",won:false},
  {id:259,title:"Syngenta Apoio Ceno 17/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-17",presentDate:"",status:"concluído",size:"M",won:false},
  {id:260,title:"Conacarne Ajustes 17/09",category:"NSCO",description:"",responsible:["Marcelo","Pedro Melo"],dueDate:"2025-09-17",presentDate:"",status:"concluído",size:"M",won:false},
  {id:261,title:"Bradesco Experience Ajustes 18/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:262,title:"Butantan 125 Anos Apresentação 18/09",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-09-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:263,title:"JSL IDV 19/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-19",presentDate:"",status:"concluído",size:"M",won:false},
  {id:264,title:"Localiza Fenauto Leds 19/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-19",presentDate:"",status:"concluído",size:"M",won:false},
  {id:265,title:"SABESP Apresentação 19/09",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-09-19",presentDate:"",status:"concluído",size:"M",won:false},
  {id:266,title:"Arcelor Cenografia 22/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:267,title:"Ram Ajustes apresentação 23/09",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-09-23",presentDate:"",status:"concluído",size:"M",won:false},
  {id:268,title:"Localiza Fenauto 23/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-23",presentDate:"",status:"concluído",size:"M",won:false},
  {id:269,title:"Strategicos Ceno 24/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:270,title:"Localiza GF SP 24/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:271,title:"Dominguinho Ajuste Proposta 24/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:272,title:"Golden Harvest Logo 24/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:273,title:"Strategicos Ajustes 25/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:274,title:"Natal Liberdade 25/09",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-09-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:275,title:"Hotmart Hot Heroes 25/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:276,title:"Globo Novela 3 Graças 25/09",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-09-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:277,title:"Projeto Led Ajustes 25/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:278,title:"Bradesco Experience Lançamento + Ajustes 26/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:279,title:"Minas Máquinas 26/09 KV",category:"NSCO",description:"",responsible:["Gabs"],dueDate:"2025-09-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:280,title:"Syngenta Seeds Feiras Agrícolas 26/09",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-09-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:281,title:"Purefy Cardápio, Convite, Agradecimento e totem 29/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-29",presentDate:"",status:"concluído",size:"M",won:false},
  {id:282,title:"Omelete Tik Tok saída materiais 29/09",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-09-29",presentDate:"",status:"concluído",size:"M",won:false},
  {id:283,title:"Supermercados BH Ceno 29/09",category:"NSCO",description:"",responsible:["Marcelo","Vitão"],dueDate:"2025-09-29",presentDate:"",status:"concluído",size:"M",won:false},
  {id:284,title:"Boticário Lidere-se Convite RJ 29/09",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-09-29",presentDate:"",status:"concluído",size:"M",won:false},
  {id:285,title:"Globo 3 Graças Ajustes 30/09",category:"NSCO",description:"",responsible:["Marcela","Marcelo"],dueDate:"2025-09-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:286,title:"Arcelor Queima Diária 30/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:287,title:"O Boticário Carrinho 30/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:288,title:"Prêmio LED Ajustes 30/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:289,title:"Purefy Ajustes 30/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:290,title:"Strategicos Ajustes Banner 30/09",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-09-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:291,title:"Bel Next 01/10",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-10-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:292,title:"Purefy Ajustes Totem 01/10",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-10-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:293,title:"Queima Diária Ajustes 01/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:294,title:"Hotmart Mission 01/10",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-10-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:295,title:"Prêmio Led Ajustes 01/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:296,title:"JSL 70 Anos Vinheta 02/09",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-09-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:297,title:"JSL 70 Anos 02/10",category:"NSCO",description:"",responsible:["Marcela","Gabs"],dueDate:"2025-10-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:298,title:"Roda IDV Ajustes 02/10",category:"NSCO",description:"",responsible:["Pedro Melo","Vitor Chalezinho"],dueDate:"2025-10-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:299,title:"Casa Marun Mil Sorrisos 03/10",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-10-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:300,title:"Dominguinho Carrossel 03/10",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-10-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:301,title:"Supermercados BH Apresentação 06/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-06",presentDate:"",status:"concluído",size:"M",won:false},
  {id:302,title:"Localiza Meeo Mockups Ajustes 06/10",category:"NSCO",description:"",responsible:["Vitão","Pedro Melo"],dueDate:"2025-10-06",presentDate:"",status:"concluído",size:"M",won:false},
  {id:303,title:"Bel Next Ajustes PPT 07/10",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-10-07",presentDate:"",status:"concluído",size:"M",won:false},
  {id:304,title:"Minas Máquinas Apresentação 07/10",category:"NSCO",description:"",responsible:["Gabs"],dueDate:"2025-10-07",presentDate:"",status:"concluído",size:"M",won:false},
  {id:305,title:"Globo Três Graças Ajuste 07/10",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-10-07",presentDate:"",status:"concluído",size:"M",won:false},
  {id:306,title:"Syngenta Feiras Médias 07/10",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-10-07",presentDate:"",status:"concluído",size:"M",won:false},
  {id:307,title:"Arcelor Economia Circular Ajuste Moleskine 07/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-07",presentDate:"",status:"concluído",size:"M",won:false},
  {id:308,title:"Bradesco Principal 09/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-09",presentDate:"",status:"concluído",size:"M",won:false},
  {id:309,title:"Bradeco Ajustes 09/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-09",presentDate:"",status:"concluído",size:"M",won:false},
  {id:310,title:"Halloween RedBull 10/10",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-10-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:311,title:"Dominguinho Carrossel de Músicas 10/10",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-10-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:312,title:"Dominguinho Carrossel Frases 10/10",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-10-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:313,title:"Golden Harvest Papelaria 13/10",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-10-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:314,title:"Projeto Kiko + Marcellinho 13/10",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-10-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:315,title:"Halloween CENO 13/10",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-10-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:316,title:"Localiza Ação de Venda Zarp 13/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:317,title:"Prêmio Led Ajustes 1 13/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:318,title:"Localiza COP30 14/10",category:"NSCO",description:"",responsible:["Vitão","Gabs"],dueDate:"2025-10-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:319,title:"Diamond Mall Halloween 14/10",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-10-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:320,title:"Boticário Her Code Ajustes 14/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:321,title:"Projeto Kiko + Marcellinho Ajustes 14/10",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-10-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:322,title:"Queima Diária Ajustes 15/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:323,title:"Prêmio Led Ajustes 2 15/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:324,title:"Dominguinho Mídia OOH 15/10",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-10-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:325,title:"Dominguinho Vídeo Show 15/10",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-10-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:326,title:"Chalezinho Itaim SP Adesivo Neve Fachada 16/10",category:"NSCO",description:"",responsible:["Gabs"],dueDate:"2025-10-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:327,title:"Diamond Natal 16/10",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-10-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:328,title:"Concentrix Apresentação 16/10",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-10-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:329,title:"Hotmart Experience Cardápio 17/10",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-10-17",presentDate:"",status:"concluído",size:"M",won:false},
  {id:330,title:"Ajuste Prêmio Led 1 20/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:331,title:"Ajuste Queima Diária 20/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:332,title:"Bradesco Principal Cartão 20/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:333,title:"Estrela Bet 21/10",category:"NSCO",description:"",responsible:["Marcela","Gabs"],dueDate:"2025-10-21",presentDate:"",status:"concluído",size:"M",won:false},
  {id:334,title:"Era um Vez Chalezinho Demanda Kiko 22/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:335,title:"Globo Três Graças Ajustes 22/10",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-10-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:336,title:"Beats Propositivo PPT e Mockups 22/10",category:"NSCO",description:"",responsible:["Gabs"],dueDate:"2025-10-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:337,title:"CIDADE nova IDV Book Captação 24/10",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-10-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:338,title:"Bradesco Principal Lona 24/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:339,title:"Ajuste Prêmio Led 2 24/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:340,title:"Chalezinho SP Kit Convite 24/10",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-10-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:341,title:"Globo Lambes Plim Plim 24/10",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-10-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:342,title:"Concentrix Ajustes 24/10",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-10-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:343,title:"Halloween Ceno 24/10",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-10-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:344,title:"O Boticário Convite 27/10",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-10-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:345,title:"Hotmart Cardápios 27/10",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-10-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:346,title:"Ajustes Omelete 27/10",category:"NSCO",description:"",responsible:["Gabs"],dueDate:"2025-10-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:347,title:"Ajustes Premio Led 3 27/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:348,title:"Ajustes Estrela Bet 27/10",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-10-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:349,title:"Halloween Ceno 27/10",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-10-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:350,title:"Halloween Ceno - Bares Beats + Tanqueray 28/10",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-10-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:351,title:"Ajustes Premio Led 4 28/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:352,title:"Localiza Elevo 28/10",category:"NSCO",description:"",responsible:["Gabs"],dueDate:"2025-10-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:353,title:"Techbiz 29/10",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-10-29",presentDate:"",status:"concluído",size:"M",won:false},
  {id:354,title:"Hotmart Totem 29/10",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-10-29",presentDate:"",status:"concluído",size:"M",won:false},
  {id:355,title:"Complex Avatares 29/10",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-10-29",presentDate:"",status:"concluído",size:"M",won:false},
  {id:356,title:"Ajustes JSL 30/10",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-10-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:357,title:"Ajustes Book Cidade 31/10",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-10-31",presentDate:"",status:"concluído",size:"M",won:false},
  {id:358,title:"Syngenta Virtuais 31/10",category:"NSCO",description:"",responsible:["Gabs"],dueDate:"2025-10-31",presentDate:"",status:"concluído",size:"M",won:false},
  {id:359,title:"Natal Vetores 31/10",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-10-31",presentDate:"",status:"concluído",size:"M",won:false},
  {id:360,title:"Halloween Vídeos Internos + Videos de Abertura 31/10",category:"NSCO",description:"",responsible:["Pedro Melo","Marcelo","Vitão"],dueDate:"2025-10-31",presentDate:"",status:"concluído",size:"M",won:false},
  {id:361,title:"Bernoulli Ceno 03/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:362,title:"Faciso 03/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:363,title:"Lô Borges 03/11",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-11-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:364,title:"RD Station Prêmio Limitless 04/11",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-11-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:365,title:"Omelete Copo Café Saída 04/11",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-11-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:366,title:"Dominguinho Post Estático 04/11",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-11-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:367,title:"Localiza Concorrência 05/11",category:"NSCO",description:"",responsible:["Gabs"],dueDate:"2025-11-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:368,title:"Diamond Mall Natal 07/11",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-11-07",presentDate:"",status:"concluído",size:"M",won:false},
  {id:369,title:"Syngenta Ajustes 07/11",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-11-07",presentDate:"",status:"concluído",size:"M",won:false},
  {id:370,title:"NaSala Logos Aplicações 07/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-07",presentDate:"",status:"concluído",size:"M",won:false},
  {id:371,title:"Complex IDV V2 10/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:372,title:"Complex Virtuais IG 11/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:373,title:"Roda Camiseta Promoção 11/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:374,title:"O Boticário Carta Palavra 11/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:375,title:"O Boticário Peças da semana + Save The Date 11/11",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-11-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:376,title:"O Boticário Backdrop / Lona 11/11",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-11-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:377,title:"O Boticário Natal 11/11",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-11-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:378,title:"Localiza Ajustes 11/11",category:"NSCO",description:"",responsible:["Gabs"],dueDate:"2025-11-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:379,title:"Arcelor Excelência em Logística 12/11",category:"NSCO",description:"",responsible:["Marcela","Gabs"],dueDate:"2025-11-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:380,title:"O Boticário Ajuste Envelope PMR 12/11",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-11-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:381,title:"Stellar Nova Proposta de Copo 12/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:382,title:"Ram Ajustes 12/11",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-11-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:383,title:"Natal Mineiridade Praça da Liberdade 13/11",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-11-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:384,title:"O Boticário Árvore 13/11",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-11-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:385,title:"O Boticário Natal Peças e Ajustes 13/11",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-11-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:386,title:"Red Bull Confra IDV 13/11",category:"NSCO",description:"",responsible:["—"],dueDate:"2025-11-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:387,title:"Red Bull Confra PPT 14/11",category:"NSCO",description:"",responsible:["—"],dueDate:"2025-11-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:388,title:"Natal Mineiridade Praça da Liberdade Peças Novas 14/11",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-11-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:389,title:"CIDADE Sistema IDV Ceno 14/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:390,title:"Isaac - Apresentação 17/11",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-11-17",presentDate:"",status:"concluído",size:"M",won:false},
  {id:391,title:"ACELERA.AI Ficha de Palco A5 18/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:392,title:"O Boticário TOTEM Vitória 18/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:393,title:"Belgo Impacta 19/11",category:"NSCO",description:"",responsible:["Marcela","Marcelo"],dueDate:"2025-11-19",presentDate:"",status:"concluído",size:"M",won:false},
  {id:394,title:"Natal Mineiridade Post 20/11",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-11-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:395,title:"O Boticário DET Vitória 21/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-21",presentDate:"",status:"concluído",size:"M",won:false},
  {id:396,title:"O Boticário DET Gramado 21/11",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-11-21",presentDate:"",status:"concluído",size:"M",won:false},
  {id:397,title:"O Boticário DET BH 21/11",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-11-21",presentDate:"",status:"concluído",size:"M",won:false},
  {id:398,title:"O Boticário Outras Cidades 22/11",category:"NSCO",description:"",responsible:["Pedro Melo","Marcela","Marcelo"],dueDate:"2025-11-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:399,title:"Hotmart Troopers Party / Kickoff V1 24/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:400,title:"Arcelor Aceler.Ai Ativação 24/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:401,title:"Syngenta Ajustes 24/11",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-11-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:402,title:"Estrela Bet Ativações 24/11",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-11-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:403,title:"O Boticário DET Volta Redonda 25/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:404,title:"O Boticário Jurídico para Impressão 25/11",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-11-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:405,title:"Arcelor Cubo 25/11",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-11-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:406,title:"BLIP PPT 30 páginas 25/11",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-11-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:407,title:"BLIP PPT MIL páginas 25/11",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-11-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:408,title:"Hotmart Troopers Party / Kickoff V2 25/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:409,title:"Natal Mineiridade 2 vídeos 27/11",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-11-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:410,title:"Hotmart Troopers Party / Kickoff V3 27/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:411,title:"Complex Containers V1 27/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:412,title:"Complex Containers V2 28/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:413,title:"Hotmart Troopers Party / Kickoff V4 28/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:414,title:"Top Perfomance Syngenta 28/11",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-11-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:415,title:"O Boticário Natal Gramado + Diversos 28/11",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-11-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:416,title:"Estrela Bet Peças Avulsas 28/12",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-12-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:417,title:"O Boticário Natal GV 30/11",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-11-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:418,title:"O Boticário Natal GV 01/12 Reajustes",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-12-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:419,title:"O Boticário Jantar Franqueados 01/12",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-12-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:420,title:"Top Perfomance Syngenta 01/12",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-12-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:421,title:"Hotmart Troopers Party / Kickoff V5 02/12",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-12-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:422,title:"IDV naSala de Verão 03/12",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-12-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:423,title:"Save the Date naSala de Verão 03/12",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-12-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:424,title:"Minas Máquinas Entrega V1 03/12",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-12-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:425,title:"Captação Bud Copa 03/12",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-12-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:426,title:"Dominguinho Peças 03/12",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-12-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:427,title:"Estrela Bet Leds 04/12",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-12-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:428,title:"Hotmart Troopers Peças Finais 04/12",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-12-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:429,title:"Verão save the date e base 04/12",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-12-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:430,title:"Blip Ajustes 04/12",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-12-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:431,title:"Dominguinho Peças 04/12",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-12-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:432,title:"O Boticário Jantar Franqueados Peças 04/12",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-12-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:433,title:"O Boticário Totem Sinalização 04/12",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-12-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:434,title:"naSala de Verão Enxoval impresso + Sympla + Programação 05/12",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-12-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:435,title:"DELTA Sementes 05/12",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-12-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:436,title:"Minas Máquinas Entrega V2 05/12",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-12-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:437,title:"naSala de Verão motion 07/12",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-12-07",presentDate:"",status:"concluído",size:"M",won:false},
  {id:438,title:"EXA Carnaval 08/12",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-12-08",presentDate:"",status:"concluído",size:"M",won:false},
  {id:439,title:"CIDADE Verão IDV 12/12",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-12-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:440,title:"CIDADE Verão Peças Modelo 12/12",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-12-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:441,title:"Concentrix Brindes Arte e PPT 15/12",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-12-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:442,title:"NaSala de Verão Lineup 15/12",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-12-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:443,title:"Mensagem + Kit naSala 16/12",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-12-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:444,title:"Caveo KV PPT 17/12",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-12-17",presentDate:"",status:"concluído",size:"M",won:false},
  {id:445,title:"Lidero Syngenta 17/12",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-12-17",presentDate:"",status:"concluído",size:"M",won:false},
  {id:446,title:"Propositivo AMBEV 18/12",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-12-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:447,title:"Caveo PPT 18/12",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-12-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:448,title:"Arcelor Barra Mansa 19/12 PPT institucional",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-12-19",presentDate:"",status:"concluído",size:"M",won:false},
  {id:449,title:"Exa Ajustes 22/12",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-12-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:450,title:"Hotmart Nova Sede 29/12",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-12-29",presentDate:"",status:"concluído",size:"M",won:false},
  {id:451,title:"Hotmart 8D",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:452,title:"Concentrix Mockups Aplicados 08/01",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-01-08",presentDate:"",status:"concluído",size:"M",won:false},
  {id:453,title:"BTG 08/01",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-01-08",presentDate:"",status:"concluído",size:"M",won:false},
  {id:454,title:"Escritório Complex 08/01",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-01-08",presentDate:"",status:"concluído",size:"M",won:false},
  {id:455,title:"Localiza Carnaval 09/01",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-01-09",presentDate:"",status:"concluído",size:"M",won:false},
  {id:456,title:"Fiat 50 Anos 12/01",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-01-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:457,title:"CNBC Ajustes Brindes 13/01",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-01-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:458,title:"Park Shopping Páscoa e Copa KV 14/01",category:"NSCO",description:"",responsible:["Vitão","Marcelo"],dueDate:"2026-01-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:459,title:"Cartão e Agenda Complex 14/01",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-01-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:460,title:"CEMIG + Carnaval QCSL 15/01",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-01-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:461,title:"Caveo Summit com IDV 15/01",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-01-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:462,title:"Fiat 50 Anos 16/01 Ajustes",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-01-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:463,title:"Bradesco 16/01",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-01-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:464,title:"Be naSalest Logo 16/01",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-01-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:465,title:"McCain + Carnaval MBQSP 19/01",category:"NSCO",description:"",responsible:["Thiago"],dueDate:"2026-01-19",presentDate:"",status:"concluído",size:"M",won:false},
  {id:466,title:"Syngenta 19/01",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-01-19",presentDate:"",status:"concluído",size:"M",won:false},
  {id:467,title:"Bradesco Ajustes 19/01",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-01-19",presentDate:"",status:"concluído",size:"M",won:false},
  {id:468,title:"Komatsu 20/01",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-01-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:469,title:"Localiza Carnaval 20/01",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-01-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:470,title:"Boticário Carnaval 20/01",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-01-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:471,title:"BE.NASALEST Logo 21/01",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-01-21",presentDate:"",status:"concluído",size:"M",won:false},
  {id:472,title:"nSco. Vagas 21/01",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-01-21",presentDate:"",status:"concluído",size:"M",won:false},
  {id:473,title:"nSco. Institucional Bday Cards 21/01",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-01-21",presentDate:"",status:"concluído",size:"M",won:false},
  {id:474,title:"naSala Vagas 22/01",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-01-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:475,title:"EXA Artes 22/01",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-01-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:476,title:"CEMIG template PPT Institucional 22/01",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-01-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:477,title:"Arcelor Exc. Logística 23/01",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-01-23",presentDate:"",status:"concluído",size:"M",won:false},
  {id:478,title:"Caveo Summit 27/01",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-01-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:479,title:"Fiat Cidade + 50 Anos 27/01",category:"NSCO",description:"",responsible:["—"],dueDate:"2026-01-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:480,title:"nSco. Institucional Bday Cards Opção V2 27/01",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-01-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:481,title:"Swile MASP Planeta Firma 28/01",category:"NSCO",description:"",responsible:["Marcela","Luiza"],dueDate:"2026-01-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:482,title:"McCain Peças Produção 30/01",category:"NSCO",description:"",responsible:["Thiago"],dueDate:"2026-01-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:483,title:"Boticário + Carnaval QCSL Ceno 30/01",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-01-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:484,title:"CEMIG + Carnaval QCSL Bandeirão 02/02",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:485,title:"Boas-Vindas Nicole 02/02",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:486,title:"HOTMART 7D Cardápio e Ficha de Palco 02/02",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:487,title:"Boticário + Carnaval QCSL Ceno Ajustes 02/02",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:488,title:"Boticário + Carnaval QCSL Peças 03/02",category:"NSCO",description:"",responsible:["Pedro Melo","Luiza"],dueDate:"2026-02-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:489,title:"Parque Vila Lobos Páscoa 03/02",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-02-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:490,title:"CEMIG + Carnaval QCSL Carrinho Açaí 04/02",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:491,title:"Localiza ABAV 04/02",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-02-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:492,title:"Card Bday 04/02",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-02-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:493,title:"CEMIG + Carnaval QCSL Comunicados & Impressos 05/02",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-02-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:494,title:"CEMIG + Carnaval QCSL Ativações 05/02",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:495,title:"McCain MBQSP Bandeja 05/02",category:"NSCO",description:"",responsible:["Thiago"],dueDate:"2026-02-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:496,title:"Swile Nova Era PPT + Emailmkt e RSVP 05/02",category:"NSCO",description:"",responsible:["Marcela","Luiza"],dueDate:"2026-02-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:497,title:"AgroCP 06/02",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-02-06",presentDate:"",status:"concluído",size:"M",won:false},
  {id:498,title:"Bett Arcoplus Nave à Vela Mar Alto 06/02",category:"NSCO",description:"",responsible:["Marcelo","Luiza"],dueDate:"2026-02-06",presentDate:"",status:"concluído",size:"M",won:false},
  {id:499,title:"Boticário + Carnaval QCSL Ceno Ajustes Trio 06/02",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-06",presentDate:"",status:"concluído",size:"M",won:false},
  {id:500,title:"CEMIG + Carnaval QCSL Ceno Trio 06/02",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-06",presentDate:"",status:"concluído",size:"M",won:false},
  {id:501,title:"McCain MBQSP Trio Cenografia 06/02",category:"NSCO",description:"",responsible:["Thiago"],dueDate:"2026-02-06",presentDate:"",status:"concluído",size:"M",won:false},
  {id:502,title:"Boticário + Carnaval QCSL Crachás, Bandeja Maquiagem, Tinas 10/02",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:503,title:"Boticário + Carnaval QCSL Ceno Ajustes 10/02",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:504,title:"Boticário + Carnaval QCSL Virtuais Ajustes 10/02",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-02-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:505,title:"CEMIG + Carnaval QCSL Tinas, Crachás 10/02",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:506,title:"CEMIG + Carnaval QCSL Ceno Ajustes 10/02",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:507,title:"Torcida naSala Ambev 10/02",category:"NSCO",description:"",responsible:["Thiago"],dueDate:"2026-02-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:508,title:"Syngenta Lidero Brindes e Impressos 10/02",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-02-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:509,title:"CNBC Mockups 11/02",category:"NSCO",description:"",responsible:["Thiago"],dueDate:"2026-02-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:510,title:"Concentrix Mockups 11/02",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-02-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:511,title:"nSco. Assinaturas E-mail 12/02",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:512,title:"CEMIG + Carnaval QCSL Leds 12/02",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-02-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:513,title:"Boticário Dia das Mães 12/02",category:"NSCO",description:"",responsible:["Pedro Melo","Marcela","Luiza"],dueDate:"2026-02-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:514,title:"Bett Arcoplus International School 13/02",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-02-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:515,title:"Bett Arcoplus Meu Arco Educação 13/02",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-02-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:516,title:"Bett Arcoplus Pleno + Genio 13/02",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-02-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:517,title:"Bett Arcoplus IE-PES 13/02",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-02-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:518,title:"Arcelor Mittal Encontro Produtores + Ponto Focal 13/02",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-02-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:519,title:"Torcida naSala Ambev PPT 13/02",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-02-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:520,title:"IFF Leagal 20/02",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-02-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:521,title:"Cinemark 24/02",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-02-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:522,title:"CNBC Mockup Brinde 25/02",category:"NSCO",description:"",responsible:["Thiago"],dueDate:"2026-02-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:523,title:"nSco. Planejamento Invite 27/02",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-02-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:524,title:"Complex / naSala Camisa Hostess 27/02",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:525,title:"Swile Nova Era Ajustes PPT 27/02",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-02-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:526,title:"SWLX Ajustes PPT Primeira Semana de Março",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:527,title:"SWLX Digitais Templates e Interno Start 02/03",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-03-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:528,title:"SWLX Digitais Templates Motion Interno Start 02/03",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-03-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:529,title:"Swile Bradesco 03/03",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-03-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:530,title:"Martminas 25 Anos 04/03",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-03-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:531,title:"Cactus 04/03",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-03-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:532,title:"nSco. Caixa Luminária 05/03",category:"NSCO",description:"",responsible:["Thiago"],dueDate:"2026-03-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:533,title:"RD Off Site 05/03",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-03-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:534,title:"Localiza WTM LA 05/03",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-03-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:535,title:"Skeelo Brindes Relacionamento 06/03",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-03-06",presentDate:"",status:"concluído",size:"M",won:false},
  {id:536,title:"Xeque Mate APAS 06/03",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-03-06",presentDate:"",status:"concluído",size:"M",won:false},
  {id:537,title:"CEMIG Fim de Ano 09/03",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-03-09",presentDate:"",status:"concluído",size:"M",won:false},
  {id:538,title:"CNBC Brindes 10/03",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-03-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:539,title:"RD Station Ajustes 17/03",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-03-17",presentDate:"",status:"concluído",size:"M",won:false},
  {id:540,title:"Arena Brasileira de Estrelas / DSP KV 18/03",category:"NSCO",description:"",responsible:["Pedro Melo","Marcela"],dueDate:"2026-03-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:541,title:"Fiat 50 anos Funcionários 20/03",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-03-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:542,title:"Arena Brasileira de Estrelas / DSP PPT 20/03",category:"NSCO",description:"",responsible:["Pedro Melo","Marcela"],dueDate:"2026-03-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:543,title:"Átrio Festival 23/03",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-03-23",presentDate:"",status:"concluído",size:"M",won:false},
  {id:544,title:"Syngenta CoperCitrus 23/03",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-03-23",presentDate:"",status:"concluído",size:"M",won:false},
  {id:545,title:"XP Concorrência 24/03",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-03-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:546,title:"Syngenta Synergia 24/03",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-03-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:547,title:"Swile Nova Era Convite Ministros 24/03",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-03-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:548,title:"Swile Nova Era Convite Convidados Caixa 25/03",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-03-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:549,title:"Swile Nova Era PPT Mapa de Convidados 25/02",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-02-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:550,title:"Swile Nova Era Cinta, Tag e Sacola Convidados Caixa 26/03",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-03-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:551,title:"Bradesco + Cidade 26/03",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-03-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:552,title:"Banco Stellantis 26/03",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-03-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:553,title:"XP Viagem 31/03",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-03-31",presentDate:"",status:"concluído",size:"M",won:false},
  {id:554,title:"Sympla Início Ano Fiscal 31/03",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-03-31",presentDate:"",status:"concluído",size:"M",won:false},
  {id:555,title:"Bradesco e Diabo Veste Prada 06/04",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-04-06",presentDate:"",status:"concluído",size:"M",won:false},
  {id:556,title:"MRV Encontro de Fornecedores 06/04",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-04-06",presentDate:"",status:"concluído",size:"M",won:false},
  {id:557,title:"Strategicos Group Backdrops 06/04",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-04-06",presentDate:"",status:"concluído",size:"M",won:false},
  {id:558,title:"Strategicos Group APAS 07/04",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-04-07",presentDate:"",status:"concluído",size:"M",won:false},
  {id:559,title:"Bradesco Ajustes PPT 07/04",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-04-07",presentDate:"",status:"concluído",size:"M",won:false},
  {id:560,title:"Syngenta Camisas Ajustes 08/04",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-04-08",presentDate:"",status:"concluído",size:"M",won:false},
  {id:561,title:"Cidade Araujo 08/04",category:"NSCO",description:"",responsible:["Thiago"],dueDate:"2026-04-08",presentDate:"",status:"concluído",size:"M",won:false},
  {id:562,title:"Swile Ajustes 08/04",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-04-08",presentDate:"",status:"concluído",size:"M",won:false},
  {id:563,title:"nSco. Happy Hour 08/04",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-04-08",presentDate:"",status:"concluído",size:"M",won:false},
  {id:564,title:"Natal das Montanhas 08/04",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-04-08",presentDate:"",status:"concluído",size:"M",won:false},
  {id:565,title:"Bradesco Camisa Ajustes 09/04",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-04-09",presentDate:"",status:"concluído",size:"M",won:false},
  {id:566,title:"Arcelor Mittal Concrete Show e Fenasucro 09/04",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-04-09",presentDate:"",status:"concluído",size:"M",won:false},
  {id:567,title:"99Food Cidade 10/04",category:"NSCO",description:"",responsible:["Thiago"],dueDate:"2026-04-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:568,title:"Bradesco Ingressos 10/04",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-04-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:569,title:"XP Viagem Ajustes 10/04",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-04-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:570,title:"Arcelor Mittal Fundação Diversão em Cena 10/04",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-04-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:571,title:"CDL DLI 13/04",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-04-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:572,title:"Bradesco Ajuste Ingressos 14/04",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-04-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:573,title:"FIAT 50 ANOS V2 15/04",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-04-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:574,title:"Syngenta Cenografia e Impressos 15/04",category:"NSCO",description:"",responsible:["Luiza","Marcelo"],dueDate:"2026-04-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:575,title:"CDL DLI - Novo PPT 15/04",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-04-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:576,title:"Globo BBB26 16/04",category:"NSCO",description:"",responsible:["Pedro Melo","Marcela"],dueDate:"2026-04-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:577,title:"Bradesco Ajustes PPT 16/04",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-04-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:578,title:"O Boticário Crachás 16/04",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-04-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:579,title:"MRV Integralize 16/04",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-04-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:580,title:"Globo BBB26 Restante Ceno 17/04",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-04-17",presentDate:"",status:"concluído",size:"M",won:false},
  {id:581,title:"Bradesco Experience Pulseiras 17/04",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-04-17",presentDate:"",status:"concluído",size:"M",won:false},
  {id:582,title:"Natal das Montanhas PT2 17/04",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-04-17",presentDate:"",status:"concluído",size:"M",won:false},
  {id:583,title:"SWLX Start 17/04",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-04-17",presentDate:"",status:"concluído",size:"M",won:false},
  {id:584,title:"Bradesco Prime Ajustes PPT 20/04",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-04-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:585,title:"Mangalarga 43a Exposição IDV 22/04 V1",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-04-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:586,title:"Mangalarga 43a Exposição IDV 24/04 V2",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-04-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:587,title:"Syngenta Além do Limite Agenda Dias, Adesivos, Convites Virtuais 25/04",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-04-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:588,title:"Mangalarga 43a Exposição IDV 28/04 V3",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-04-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:589,title:"Syngenta Além do Limite Ajustes 28/04",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-04-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:590,title:"nSco. Slide SP 29/04",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-04-29",presentDate:"",status:"concluído",size:"M",won:false},
  {id:591,title:"O Boticário Ceno 29/04",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-04-29",presentDate:"",status:"concluído",size:"M",won:false},
  {id:592,title:"Xeque Mate Stand 30/04",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-04-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:593,title:"nSco. Presentation Marca + Mockups 04/05",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-05-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:594,title:"Localiza Brindes Meoo 06/05",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-05-06",presentDate:"",status:"concluído",size:"M",won:false},
  {id:595,title:"Mangalarga 43a Exposição Manual + KVs 06/05",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-05-06",presentDate:"",status:"concluído",size:"M",won:false},
  {id:596,title:"Mangalarga 43a Exposição PPT 06/05",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-05-06",presentDate:"",status:"concluído",size:"M",won:false},
  {id:597,title:"Swile Peças Emergenciais 11/05",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-05-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:598,title:"Globo Ceno e PPT 12/05",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-05-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:599,title:"Bradesco Camisa de Time 12/05",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-05-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:600,title:"XP Concorrência 12/05",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-05-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:601,title:"Bradesco Mockups 13/05",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-05-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:602,title:"O Boticário Ceno e Peças Complementares 13/05",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-05-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:603,title:"Localiza Zarp 13/05",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-05-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:604,title:"Syngenta Ajustes e Novas Peças 13/05",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-05-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:605,title:"Mangalarga 43a Exposição Ajustes 15/05",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-05-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:606,title:"Bradesco BEX Peças 15/05",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-05-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:607,title:"Onfly PPT 15/05",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-05-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:608,title:"Cinemark 15/05",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-05-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:609,title:"Arcelor Mittal Top 18/05",category:"NSCO",description:"",responsible:["Vitão","Marcelo"],dueDate:"2026-05-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:610,title:"Convites Clientes Cidade 20/05",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-05-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:611,title:"ABM Week 20/05",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-05-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:612,title:"Syngenta Synergia 22/05",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-05-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:613,title:"Bradesco Copa 25/05",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-05-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:614,title:"Átrio Festival Ceno 25/05",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-05-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:615,title:"DSP Brindes Mockups 26/05",category:"NSCO",description:"",responsible:["Pedro Melo","Thiago"],dueDate:"2026-05-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:616,title:"Cinemark PPT 26/05",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-05-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:617,title:"DSP Ceno Ajustes 27/05",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-05-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:618,title:"DSP Brindes Mockups Ajustes 27/05",category:"NSCO",description:"",responsible:["Pedro Melo","Thiago"],dueDate:"2026-05-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:619,title:"Convites Clientes Era Uma Vez Um Chalezinho 27/05",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-05-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:620,title:"Syngenta Camisa Copa Ajustes 27/05",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-05-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:621,title:"Michelob PPT V1 27/05",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-05-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:622,title:"Átrio Festival 27/05",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-05-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:623,title:"Complex PPT 28/05 Layout V1",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-05-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:624,title:"DSP Ceno Saída V1 28/05",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-05-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:625,title:"NSCO. Contratação Arquitetura Pleno 28/05",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-05-28",presentDate:"",status:"concluído",size:"M",won:false},
  {id:626,title:"DSP Brindes Saída 29/05",category:"NSCO",description:"",responsible:["Pedro Melo","Thiago"],dueDate:"2026-05-29",presentDate:"",status:"concluído",size:"M",won:false},
  {id:627,title:"Delta Sementes Ajustes 01/06",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-06-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:628,title:"Localiza Meeo Expert 01/06",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-06-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:629,title:"DSP Nova Camisa Saída 01/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:630,title:"Bradesco Maracanã 01/06",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-06-01",presentDate:"",status:"concluído",size:"M",won:false},
  {id:631,title:"CEMIG Ajustes 02/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:632,title:"Michelob PPT V2 02/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:633,title:"DSP Ceno Saída V2 03/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:634,title:"DSP + NSCO. Camisas 03/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:635,title:"Syngenta Andav 03/06",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-06-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:636,title:"DSP Balcão Engov Ajustes 08/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-08",presentDate:"",status:"concluído",size:"M",won:false},
  {id:637,title:"Michelob Ajustes 09/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-09",presentDate:"",status:"concluído",size:"M",won:false},
  {id:638,title:"Localiza Offsite 09/06",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-06-09",presentDate:"",status:"concluído",size:"M",won:false},
  {id:639,title:"FIAT 50 ANOS Ajustes 10/06",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-06-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:640,title:"FIAT 50 ANOS Ajustes 11/06",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-06-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:641,title:"Bradesco Toy Story 12/06",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-06-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:642,title:"Bradesco Camisas 12/06",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-06-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:643,title:"MRV + nSco. PPT IDV 12/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:644,title:"DSP Motions 12/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:645,title:"Syngenta Era da Transformação 12/06",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-06-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:646,title:"Syngenta GTEC Integração 12/06",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2026-06-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:647,title:"Stellar Gaming 12-15/06",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-06-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:648,title:"FIAT 50 ANOS Ajustes 15/06",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-06-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:649,title:"Localiza Minions 15/06",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-06-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:650,title:"Syngenta Lidero",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:651,title:"Like Bananas Carrinho Ceno 15/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:652,title:"Bradesco Ajustes 15/06",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-06-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:653,title:"Red Bull Feira Abrafarma 16/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:654,title:"MRV 16/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:655,title:"O Boticário Cidade 18/06",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-06-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:656,title:"nSco. + Vallourec 18/06",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-06-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:657,title:"Bradesco Camisas Diretoria 19/06",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-06-19",presentDate:"",status:"concluído",size:"M",won:false},
  {id:658,title:"Stellar Bet Ajustes 19/06",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2026-06-19",presentDate:"",status:"concluído",size:"M",won:false},
  {id:659,title:"Cimento Nacional Dia da Família 22/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:660,title:"Red Bull F1 KV V1 22/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:661,title:"Red Bull F1 KV V2 23/06",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2026-06-23",presentDate:"",status:"concluído",size:"M",won:false},
  {id:662,title:"Bradesco Ajustes 23/06",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-06-23",presentDate:"",status:"concluído",size:"M",won:false},
  {id:663,title:"Swile Natal Árvore 24/06 PPT - Ceno",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2026-06-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:664,title:"Bradesco Ajustes 25/06",category:"NSCO",description:"",responsible:["Luiza","Marcelo"],dueDate:"2026-06-25",presentDate:"",status:"concluído",size:"M",won:false},
  {id:665,title:"Bradesco Ajustes 26/06",category:"NSCO",description:"",responsible:["Luiza","Marcelo"],dueDate:"2026-06-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:666,title:"Complex PPT Comercial 26/06",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:667,title:"Frebrabram 30/06",category:"NSCO",description:"",responsible:["Marcelo","Luiza"],dueDate:"2026-06-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:668,title:"Red Bull Lounge Stellantis / FIAT PPT 02/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:669,title:"Amstel Bar Mangalarga Ajustes 02/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:670,title:"Red Bull Lounge Stellantis / FIAT PPT Ajustes 03/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:671,title:"Red Bull F1 PPT 03/07",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"2025-07-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:672,title:"Bradesco Sessão Alta Renda Homem Aranha 07/07",category:"NSCO",description:"",responsible:["Marcelo"],dueDate:"2025-07-07",presentDate:"",status:"concluído",size:"M",won:false},
  {id:673,title:"O Boticário 10 Milhas Corrida Garoto 08/07",category:"NSCO",description:"",responsible:["Vitão","Marcelo","Pedro Melo"],dueDate:"2025-07-08",presentDate:"",status:"concluído",size:"M",won:false},
  {id:674,title:"nSco. PPT 08/07",category:"NSCO",description:"",responsible:["Marcelo","Luiza","Marcela"],dueDate:"2025-07-08",presentDate:"",status:"concluído",size:"M",won:false},
  {id:675,title:"Complex PPT Comercial Ajustes V3 e PPT Vendas 10/07",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-10",presentDate:"",status:"pendente",size:"M",won:false},
  {id:676,title:"Swile Viagem França 27/07",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-07-27",presentDate:"",status:"pendente",size:"M",won:false},
  {id:677,title:"Sesc Arraial de Belo 14/07",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"2025-07-14",presentDate:"",status:"pendente",size:"M",won:false},
  {id:678,title:"O Boticário C14 13/07 Planejamento Touchpoint + Moodboard",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"2025-07-13",presentDate:"",status:"pendente",size:"M",won:false},
  {id:679,title:"Techbiz",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"",presentDate:"",status:"pendente",size:"M",won:false},
  {id:680,title:"Superminas",category:"NSCO",description:"",responsible:["Luiza"],dueDate:"",presentDate:"",status:"pendente",size:"M",won:false},
  {id:681,title:"Red Bull Lounge Stellantis / FIAT PPT Ajustes",category:"NSCO",description:"",responsible:["Pedro Melo"],dueDate:"",presentDate:"",status:"pendente",size:"M",won:false},
  {id:682,title:"RD OffSite",category:"NSCO",description:"",responsible:["Vitão"],dueDate:"",presentDate:"",status:"pendente",size:"M",won:false},
  {id:683,title:"Natal Parque Villa Lobos Até Dezembro",category:"NSCO",description:"",responsible:["Luiza","Marcelo"],dueDate:"",presentDate:"",status:"pendente",size:"M",won:false},
  {id:684,title:"Natal dos Sonhos Até Dezembro",category:"NSCO",description:"",responsible:["Marcela"],dueDate:"",presentDate:"",status:"pendente",size:"M",won:false},
  {id:685,title:"CIDADE Natal Book 09/01",category:"CIDADE",description:"",responsible:["Thiago"],dueDate:"2026-01-09",presentDate:"",status:"concluído",size:"M",won:false},
  {id:686,title:"CIDADE Verão IDV 12/01",category:"CIDADE",description:"",responsible:["Pedro Melo"],dueDate:"2026-01-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:687,title:"PPT VIVO 14/01",category:"CIDADE",description:"",responsible:["Thiago"],dueDate:"2026-01-14",presentDate:"",status:"concluído",size:"M",won:false},
  {id:688,title:"CIDADE Verão IDV Ajustes 15/01",category:"CIDADE",description:"",responsible:["Pedro Melo"],dueDate:"2026-01-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:689,title:"CIDADE Junina IDV Ajustes 21/01",category:"CIDADE",description:"",responsible:["Pedro Melo"],dueDate:"2026-01-21",presentDate:"",status:"concluído",size:"M",won:false},
  {id:690,title:"CIDADE Verão Peças Iniciais 21/01",category:"CIDADE",description:"",responsible:["Thiago"],dueDate:"2026-01-21",presentDate:"",status:"concluído",size:"M",won:false},
  {id:691,title:"CIDADE Junina 3 Peças Base Iniciais 23/01",category:"CIDADE",description:"",responsible:["Pedro Melo"],dueDate:"2026-01-23",presentDate:"",status:"concluído",size:"M",won:false},
  {id:692,title:"CIDADE Verão Start Comunicação 26/01",category:"CIDADE",description:"",responsible:["Thiago"],dueDate:"2026-01-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:693,title:"CIDADE Verão Carrossel 27/01",category:"CIDADE",description:"",responsible:["Thiago"],dueDate:"2026-01-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:694,title:"CIDADE Calendário Novo - Start Quarta-feira de Cinzas",category:"CIDADE",description:"",responsible:["Thiago"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:695,title:"CIDADE JUNINA troca de logo 23/02",category:"CIDADE",description:"",responsible:["Thiago"],dueDate:"2026-02-23",presentDate:"",status:"concluído",size:"M",won:false},
  {id:696,title:"CIDADEZINHA IDV 03/03",category:"CIDADE",description:"",responsible:["Pedro Melo"],dueDate:"2026-03-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:697,title:"CIDADE JUNINA SITE LP BASE 04/03",category:"CIDADE",description:"",responsible:["Pedro Melo","Thiago"],dueDate:"2026-03-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:698,title:"CIDADEZINHA IDV AJUSTES 11/03",category:"CIDADE",description:"",responsible:["Pedro Melo"],dueDate:"2026-03-11",presentDate:"",status:"concluído",size:"M",won:false},
  {id:699,title:"CIDADE JUNINA CENO 13/03",category:"CIDADE",description:"",responsible:["Thiago"],dueDate:"2026-03-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:700,title:"CIDADE JUNINA LP AJUSTES 18/03",category:"CIDADE",description:"",responsible:["Thiago"],dueDate:"2026-03-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:701,title:"CIDADE JUNINA Pré-Venda 18/03",category:"CIDADE",description:"",responsible:["Thiago"],dueDate:"2026-03-18",presentDate:"",status:"concluído",size:"M",won:false},
  {id:702,title:"CIDADE JUNINA FOLDER ARTISTAS 24/04",category:"CIDADE",description:"",responsible:["Thiago"],dueDate:"2026-04-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:703,title:"CIDADE JUNINA RÉGUA DE PATROCÍNIO",category:"CIDADE",description:"",responsible:["—"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:704,title:"CIDADE JUNINA KV 20/06",category:"CIDADE",description:"",responsible:["Pedro Melo"],dueDate:"2026-06-20",presentDate:"",status:"concluído",size:"M",won:false},
  {id:705,title:"CIDADE JUNINA VIDEO ABERTURA 23/05",category:"CIDADE",description:"",responsible:["Marcelo"],dueDate:"2026-05-23",presentDate:"",status:"concluído",size:"M",won:false},
  {id:706,title:"CIDADE JUNINA VINHETAS (Vitor Chalezinho)",category:"CIDADE",description:"",responsible:["—"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:707,title:"CIDADE JUNINA ASSETS CIDADEZINHA 26/05",category:"CIDADE",description:"",responsible:["Pedro Melo"],dueDate:"2026-05-26",presentDate:"",status:"concluído",size:"M",won:false},
  {id:708,title:"CIDADE JUNINA O BOTICÁRIO 29/05",category:"CIDADE",description:"",responsible:["Marcela"],dueDate:"2026-05-29",presentDate:"",status:"concluído",size:"M",won:false},
  {id:709,title:"CIDADE JUNINA BOTICÁRIO 12/06",category:"CIDADE",description:"",responsible:["Marcela"],dueDate:"2026-06-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:710,title:"HENRIQUE & JULIANO CONVITE 15/06",category:"CIDADE",description:"",responsible:["—"],dueDate:"2026-06-15",presentDate:"",status:"concluído",size:"M",won:false},
  {id:711,title:"CIDADE JUNINA PEÇAS ATÉ 04/07",category:"CIDADE",description:"",responsible:["Thiago","Equipe"],dueDate:"2025-07-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:712,title:"Dominguinho Ajustes 12/01",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-01-12",presentDate:"",status:"concluído",size:"M",won:false},
  {id:713,title:"Dominguinho Reabertura de Vendas 13/01",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-01-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:714,title:"Dominguinho Mídias OOH 13/01",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-01-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:715,title:"naSala Verão Camiseta 13/01",category:"EVENTOS",description:"",responsible:["Pedro Melo"],dueDate:"2026-01-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:716,title:"naSala Verão Cenografia 16/01",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-01-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:717,title:"naSala de Verão Cenografia 23/01",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-01-23",presentDate:"",status:"concluído",size:"M",won:false},
  {id:718,title:"naSala de Verão dia 31 27/01",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-01-27",presentDate:"",status:"concluído",size:"M",won:false},
  {id:719,title:"Dominguinho: copo, tirante e balcão",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:720,title:"naSala de Verão peças antecipadas",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"",presentDate:"",status:"concluído",size:"M",won:false},
  {id:721,title:"Dominguinho Cenografia 30/01",category:"EVENTOS",description:"",responsible:["Pedro Melo","Thiago"],dueDate:"2026-01-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:722,title:"Dominguinho Cenografia Ajustes 02/02",category:"EVENTOS",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:723,title:"naSala de Verão peças antecipadas da semana 02/02",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-02-02",presentDate:"",status:"concluído",size:"M",won:false},
  {id:724,title:"Dominguinho Cenografia Ajustes 03/02",category:"EVENTOS",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:725,title:"Dominguinho Cenografia Bar Red Bull 03/02",category:"EVENTOS",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:726,title:"Dominguinho Cenografia Bar Brahma 03/02",category:"EVENTOS",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-03",presentDate:"",status:"concluído",size:"M",won:false},
  {id:727,title:"Dominguinho Cenografia Ajustes 04/02",category:"EVENTOS",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:728,title:"Dominguinho Fake Tattoo, Pulseira Senhor do Bonfim e Adesivo 04/02",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-02-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:729,title:"nsEventos Highlights 30/01",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-01-30",presentDate:"",status:"concluído",size:"M",won:false},
  {id:730,title:"Dominguinho Cenografia Ajustes 05/02",category:"EVENTOS",description:"",responsible:["Pedro Melo"],dueDate:"2026-02-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:731,title:"Dominguinho LEDS 06/02",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-02-06",presentDate:"",status:"concluído",size:"M",won:false},
  {id:732,title:"naSala de Verão Peças Semana 07/02",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-02-07",presentDate:"",status:"concluído",size:"M",won:false},
  {id:733,title:"Torcida naSala IDV 10/02",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-02-10",presentDate:"",status:"concluído",size:"M",won:false},
  {id:734,title:"Torcida naSala Save the Date 23/02",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-02-23",presentDate:"",status:"concluído",size:"M",won:false},
  {id:735,title:"naSala de Verão Save the Date 23/03",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-03-23",presentDate:"",status:"concluído",size:"M",won:false},
  {id:736,title:"Copa naSala IDV Ajuste 04/02",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-02-04",presentDate:"",status:"concluído",size:"M",won:false},
  {id:737,title:"RODA Ajustes 13/03",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-03-13",presentDate:"",status:"concluído",size:"M",won:false},
  {id:738,title:"RODA 23/03 - 18/04",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-03-23",presentDate:"",status:"concluído",size:"M",won:false},
  {id:739,title:"Dominguinho Mapa 16/06",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-06-16",presentDate:"",status:"concluído",size:"M",won:false},
  {id:740,title:"Above IDV 22/06",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-06-22",presentDate:"",status:"concluído",size:"M",won:false},
  {id:741,title:"Sona IDV 24/06",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2026-06-24",presentDate:"",status:"concluído",size:"M",won:false},
  {id:742,title:"Copa naSala 05/07 BRxNOR",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2025-07-05",presentDate:"",status:"concluído",size:"M",won:false},
  {id:743,title:"Mangalarga Ceno 06/07",category:"EVENTOS",description:"",responsible:["Pedro Melo"],dueDate:"2025-07-06",presentDate:"",status:"concluído",size:"M",won:false},
  {id:744,title:"Mangalarga Ceno Calçada da Fama Ajustes 08/07",category:"EVENTOS",description:"",responsible:["Marcelo"],dueDate:"2025-07-08",presentDate:"",status:"concluído",size:"M",won:false},
  {id:745,title:"Henrique e Juliano Ceno 18/07",category:"EVENTOS",description:"",responsible:["Thiago"],dueDate:"2025-07-18",presentDate:"",status:"pendente",size:"M",won:false},
  {id:746,title:"naSala + nSeventos + nSessions KV Guide 30/07",category:"EVENTOS",description:"",responsible:["Thiago","Pedro Melo"],dueDate:"2025-07-30",presentDate:"",status:"pendente",size:"M",won:false},
];
// Letreiros das casas — extraídos dos SVGs originais; `fill` herda currentColor,
// então o letreiro acende junto com o estado do controle que o contém.
const MARKS = {
  NSCO: `<svg fill="currentColor" aria-hidden="true" focusable="false" viewBox="1520 30 490 345"><path d="M1995.77,363.78h-473.29V37.93h473.29v325.85ZM1533.84,352.41h450.56V49.3h-450.56v303.12Z"/><polygon points="1608.3 321.72 1584.44 187.55 1583.75 187.55 1583.75 321.72 1555.05 321.72 1555.05 80.01 1593.08 80.01 1614.53 210.03 1614.87 210.03 1614.87 80.01 1646 80.01 1646 321.72 1608.3 321.72"/><path d="M1698.89,177.18v-57.41c0-4.84-.34-8.24-1.03-10.2-.69-1.95-1.96-2.94-3.81-2.94h-.69c-1.85,0-3.11.98-3.81,2.94-.69,1.96-1.03,5.48-1.03,10.55v25.59c0,7.84,1.09,14.76,3.29,20.75,2.19,6,4.95,11.58,8.29,16.77,3.34,5.18,6.92,10.08,10.72,14.7,3.81,4.61,7.37,9.51,10.72,14.7,3.34,5.18,6.11,10.83,8.29,16.94,2.19,6.11,3.29,13.09,3.29,20.92v36.3c0,6.46-.98,12.05-2.93,16.77-1.96,4.73-4.62,8.59-7.96,11.58-3.34,3-7.2,5.19-11.59,6.57-4.37,1.38-8.87,2.08-13.48,2.08h-5.88c-4.62,0-9.11-.69-13.49-2.08-4.38-1.38-8.3-3.57-11.76-6.57-3.46-2.99-6.28-6.85-8.47-11.58-2.2-4.72-3.29-10.31-3.29-16.77v-62.58h31.11v57.4c0,4.84.58,8.3,1.73,10.37,1.15,2.08,2.76,3.11,4.84,3.11h.7c2.08,0,3.63-1.04,4.66-3.11,1.04-2.08,1.55-5.53,1.55-10.37v-25.94c0-7.83-1.09-14.75-3.29-20.75-2.19-5.99-4.95-11.52-8.29-16.6-3.35-5.07-6.92-9.91-10.72-14.53-3.81-4.61-7.38-9.51-10.72-14.7-3.34-5.19-6.11-10.77-8.29-16.77-2.2-5.99-3.29-13.02-3.29-21.09v-36.31c0-6.45,1.03-12.04,3.11-16.77,2.08-4.72,4.84-8.58,8.3-11.58,3.45-2.99,7.32-5.18,11.58-6.57,4.26-1.39,8.7-2.08,13.32-2.08h3.45c4.61,0,9.05.69,13.32,2.08,4.26,1.38,8.06,3.57,11.41,6.57,3.33,3,6.05,6.87,8.13,11.58,2.06,4.73,3.11,10.32,3.11,16.77v62.25h-31.13Z"/><path d="M1810.58,323.8c-4.62,0-9.06-.69-13.32-2.08-4.26-1.38-8.07-3.57-11.41-6.57-3.34-2.99-6.05-6.85-8.13-11.58-2.08-4.72-3.11-10.31-3.11-16.77V114.93c0-6.45,1.03-12.04,3.11-16.77,2.08-4.72,4.78-8.58,8.13-11.58,3.34-2.99,7.15-5.18,11.41-6.57,4.26-1.39,8.7-2.08,13.32-2.08h6.92c4.37,0,8.76.69,13.13,2.08,4.38,1.38,8.25,3.57,11.59,6.57,3.34,3,6.05,6.87,8.13,11.58,2.08,4.73,3.11,10.32,3.11,16.77v62.25h-34.23v-57.41c0-4.84-.34-8.24-1.03-10.2-.69-1.95-1.96-2.94-3.81-2.94h-.69c-1.85,0-3.11.98-3.81,2.94-.69,1.96-1.03,5.48-1.03,10.55v161.48c0,4.84.34,8.3,1.03,10.37.7,2.08,1.95,3.11,3.81,3.11h.69c1.84,0,3.12-1.04,3.81-3.11.69-2.08,1.03-5.53,1.03-10.37v-57.75h34.23v62.93c0,6.46-1.03,12.05-3.11,16.77-2.08,4.73-4.78,8.59-8.13,11.58-3.34,3-7.2,5.19-11.59,6.57-4.37,1.38-8.76,2.08-13.13,2.08h-6.92Z"/><path d="M1937.45,98.14c-2.05-4.66-4.77-8.53-8.07-11.59-3.41-2.96-7.27-5.12-11.59-6.59-4.43-1.36-8.75-2.05-13.19-2.05h-6.93c-4.55,0-8.98.68-13.3,2.05-4.21,1.48-8.07,3.64-11.37,6.59-3.3,3.07-6.02,6.93-8.18,11.59-2.05,4.77-3.07,10.34-3.07,16.82v171.87c0,6.37,1.02,12.05,3.07,16.71,2.16,4.77,4.89,8.64,8.18,11.59,3.3,3.07,7.16,5.23,11.37,6.59,4.32,1.36,8.75,2.05,13.3,2.05h6.93c4.43,0,8.75-.68,13.19-2.05,4.32-1.36,8.18-3.52,11.59-6.59,3.3-2.96,6.02-6.82,8.07-11.59,2.16-4.66,3.18-10.34,3.18-16.71V114.97c0-6.48-1.02-12.05-3.18-16.82ZM1906.31,281.61c0,4.89-.34,8.3-1.02,10.34-.68,2.16-1.93,3.18-3.75,3.18h-.68c-1.82,0-3.18-1.02-3.86-3.18-.68-2.05-1.02-5.46-1.02-10.34V120.08c0-8.98,1.59-13.41,4.89-13.41h.68c3.18,0,4.77,4.43,4.77,13.41v161.52Z"/><path d="M1960.93,297.95c3.15,0,5.9,1.16,8.27,3.47,2.31,2.31,3.47,5.12,3.47,8.41s-1.16,6.1-3.47,8.42c-2.36,2.31-5.17,3.47-8.41,3.47s-6.05-1.16-8.41-3.47c-2.31-2.36-3.47-5.17-3.47-8.42s1.16-6.15,3.47-8.41c2.41-2.31,5.26-3.47,8.56-3.47Z"/></svg>`,
  EVENTOS: `<svg fill="currentColor" aria-hidden="true" focusable="false" viewBox="2390 55 985 325"><path d="M2516.44,272.89s-11.75,6.34-22.57,7.67c-35.25,4.29-25.19-56.58-25.19-56.58,0,0-24.71,14.94-39.55,25.91-19.42,14.35-21,26.71-32.24,27.89-14.18,1.5-6.25-12.62-5.86-15.93,0,0,18.26-39.51,19.05-42.63.78-3.11,6.65-14.35,1.95-15.13-4.69-.79-28.32,14.73-41.12,23.98-12.79,9.25-30.17,23.65-27.94,25.57,2.24,1.92,13.28,8-6.25,10.58-12.01,1.57-11.17-8.08-4.11-14.45,13.39-12.06,51.88-39.41,51.88-39.41,0,0,26.76-19.44,36.04-18.83,7.12.45,8.21,5.08,7.43,12.35-.78,7.28-17.88,46.59-17.88,46.59,0,0,55.81-40.73,67.48-37.93,13.18,3.16,3.51,26.5,5.09,31.65,0,0-2.06,24,12.76,24.96,11.6.76,27.18-8.25,30.7-11.22"/><path d="M2643.91,214.5c5.98,14.56,9.88,29.89,6.59,41.01-9.1,30.76-56.17,33.48-58.72,8.93-1.05-10.23,7.47-18.02,18.14-20.06.62-.19,11.08-1.55,12.53,6.37.72,3.99-3.29,7.88-8.6,8.63-4.33.61-8.24-.99-9.87-3.78-4.09,9.31,14.93,21.83,32.1,2.09,8-9.18,3.7-26.86-3.24-43.21h11.07ZM2580.27,214.5c-41.05,44.66-108.96,116.02-134.06,127.32-22.91,10.33-24.09-14.18-7.98-17.63,6.97-1.49,4.48,8.95,9.37,8.51,9.7-.86,74.77-70.43,118.42-118.21h14.25Z"/><path d="M2636.6,136.52c-6.01-1.98-12.87-6.63-19.38-15.59-6.65-9.14-18.15-33.07-23.65-29.5-17.29,11.25,20.37,70.54,20.37,70.54,0,0,22.96-25.35,22.66-25.45M2664.35,109.84s29.88-42.52,17.48-43.37c-9.47-.64-17.41,43.29-17.48,43.37M2566.02,214.5c22.91-25.07,39.9-44.14,39.9-44.14,0,0-51.93-84.02-15.09-94.87,17.25-5.09,36.94,68.18,58.47,47.93,9.75-9.17,11.73-38.34,15.78-50.32,4.05-11.99,16.13-22.38,26.3-10.46,8.26,9.69-.92,28.32-30.18,62.57-9.21,10.77-40.9,45.83-40.9,45.83,0,0,14.32,20.78,23.62,43.45h-11.07c-8.08-19.04-19.75-36.29-19.75-36.29,0,0-13.4,15.16-32.81,36.29h-14.25Z"/><path d="M2937.89,195.61h49.27v-25.46h-79.55v102.45h79.55v-25.46h-49.27v-13.41h42.19v-24.41h-42.19v-13.71ZM2902.03,170.15h-33.44l-25.46,63.43-25.31-63.43h-33.6l42.63,103.06h32.54l42.63-103.06ZM2732.84,195.61h49.27v-25.46h-79.55v102.45h79.55v-25.46h-49.27v-13.41h42.19v-24.41h-42.19v-13.71Z"/><path d="M3094.58,170.15h-30.43v49.27l-42.64-49.27h-23.65v102.45h30.29v-48.36l42.79,48.36h23.65v-102.45ZM3194.31,196.51v-26.36h-91.3v26.36h30.43v76.09h30.43v-76.09h30.43Z"/><path d="M3250.06,246.38c-14.32,0-24.41-11.6-24.41-25.01s10.09-25.01,24.41-25.01,24.41,11.6,24.41,25.01-10.1,25.01-24.41,25.01M3250.06,167.89c-32.4,0-55.29,23.21-55.29,53.49s22.9,53.49,55.29,53.49,55.29-23.21,55.29-53.49-22.9-53.49-55.29-53.49"/><path d="M3356.87,167.89c-24.85,0-42.18,12.66-42.18,34.35,0,16.43,9.79,25.16,29.98,30.29l17.17,4.22c6.63,1.5,7.99,3.76,7.99,6.33,0,3.76-3.32,6.47-11,6.47-9.79,0-16.27-3.91-17.78-11.45h-30.58c3.16,28.63,27.27,36.76,47.91,36.76,27.42,0,44.9-12.95,44.9-34.2,0-18.38-12.65-25.92-29.98-30.13l-16.73-4.07c-5.57-1.2-8.28-2.86-8.28-6.93,0-4.52,4.36-6.93,10.39-6.93,7.99,0,11.75,4.06,13.11,10.09h30.59c-2.72-29.08-29.38-34.81-45.5-34.81"/></svg>`,
  CIDADE: `<svg fill="currentColor" aria-hidden="true" focusable="false" viewBox="3690 148 620 140"><path d="M3718.69,217.27c-3.3-23.19,4.6-39.47,14.37-49.98,1.39-1.49-.1-3.84-2.05-3.25-25.67,7.81-42.49,33.46-38.45,60.8,4.4,30.27,30.01,51.48,60.28,47.08,10.51-1.5,18.75-6.02,24.02-12.43,1.21-1.47-.2-3.62-2.06-3.16-28.14,6.99-52.05-10.45-56.11-39.05"/><path d="M3762.34,196.15c9.51,0,17.16-7.66,17.16-17.07s-7.65-17.07-17.16-17.07-17.07,7.66-17.07,17.07,7.66,17.07,17.07,17.07"/><path d="M3827.04,270.82l.4-.32,7.29-5.96c.91-.74.98-2.11.15-2.94l-6.86-6.86c-.37-.37-.58-.88-.58-1.4v-89.26c0-1.6-1.8-2.55-3.12-1.63l-23.13,16.07c-.53.37-.85.98-.85,1.63v88.69c0,1.1.89,1.99,1.99,1.99h24.72Z"/><path d="M3906.12,162.94c-2-.42-3.23,2.09-1.71,3.44,8.19,7.26,17.87,22.13,17.87,50.97,0,32.53-18.13,45.17-29.49,51.33-1.86,1.01-1.07,3.84,1.04,3.73,27.37-1.35,59.15-10.57,59.15-55.06,0-29.6-26.21-50.1-46.87-54.42"/><path d="M4075.08,161.98l-.4.32-8.42,6.89c-.3.25-.33.7-.05.98l8.28,8.28c.12.12.19.29.19.47v92.34c0,.53.6.85,1.04.54l25.78-17.91c.18-.12.28-.33.28-.54v-90.71c0-.37-.3-.66-.66-.66h-26.05Z"/><path d="M4114.61,162.2c-.68-.05-.98.83-.42,1.21,8.61,5.76,21.7,20.4,21.7,53.95,0,38.12-24.89,48.93-34.62,54-.62.32-.38,1.26.32,1.25,28.46-.38,65-7.53,65-55.24,0-32.12-30.85-53.52-52-55.16"/><path d="M4251.29,270.56v-20.7c0-1.68-1.96-2.6-3.26-1.53l-24.83,20.7c-1.43,1.19-.59,3.51,1.27,3.51h24.83c1.1,0,1.99-.89,1.99-1.99"/><path d="M4223.2,165.62l24.83,20.7c1.29,1.08,3.26.16,3.26-1.53v-20.7c0-1.1-.89-1.99-1.99-1.99h-24.83c-1.86,0-2.7,2.32-1.27,3.51"/><path d="M4232.19,214.05c1.25-1.25.37-3.39-1.4-3.39h-17.02l-.25-.68v-45.91c0-1.1-.89-1.99-1.99-1.99h-24.72l-.4.32-7.3,5.96c-.91.74-.98,2.11-.15,2.94l6.86,6.85c.37.37.58.88.58,1.41v89.26c0,1.6,1.8,2.55,3.12,1.63l23.13-16.07c.53-.37.85-.98.85-1.63v-20.64l.25.34,18.42-18.41Z"/><path d="M4002.9,165.53l-12.99,25.61c-.29.56-.29,1.23,0,1.79l39.65,78.53c.34.67,1.02,1.09,1.77,1.09h25.99c1.48,0,2.44-1.56,1.77-2.88l-52.65-104.14c-.73-1.45-2.81-1.45-3.54,0"/><path d="M3956.93,272.56h23.89c1.48,0,2.44-1.56,1.77-2.88l-11.93-23.59c-.73-1.45-2.81-1.45-3.54,0l-11.97,23.59c-.67,1.32.29,2.89,1.77,2.89"/><path d="M3861.47,161.98l-.4.32-7.29,5.96c-.91.74-.98,2.11-.15,2.94l6.86,6.86c.37.37.58.88.58,1.4v89.26c0,1.6,1.8,2.55,3.12,1.63l23.13-16.07c.53-.37.85-.98.85-1.63v-88.69c0-1.1-.89-1.99-1.99-1.99h-24.72Z"/></svg>`,
};
// altura ótica de cada letreiro (as proporções são muito diferentes entre si)
const MARK_H  = {NSCO:21, EVENTOS:13, CIDADE:11};
const MARK_H2 = {NSCO:23, EVENTOS:14, CIDADE:12};

// ═══════════════════════════════════════════════════
//  FIREBASE INIT
// ═══════════════════════════════════════════════════
function isFirebaseConfigured() {
  return FIREBASE_CONFIG.databaseURL && FIREBASE_CONFIG.apiKey;
}

async function initFirebase() {
  if (!isFirebaseConfigured()) return false;
  try {
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
    const db = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js');
    fbApp = initializeApp(FIREBASE_CONFIG);
    fbDb  = db.getDatabase(fbApp);
    fbRef = db.ref(fbDb, FB_PATH);
    fb    = db;

    const snap = await db.get(fbRef);
    const data = snap.exists() ? snap.val() : null;

    if (!data || !data.tasks) {
      // banco vazio: semeia já no formato novo
      await db.set(fbRef, {tasks: byId(tasks), team, appTitle, log, users: {}, schema: 2});
    } else if (Array.isArray(data.tasks)) {
      await migrateTasksToMap(data);
    }

    fbReady = true;

    db.onValue(fbRef, snapshot => {
      const d = snapshot.val();
      if (d) applyRemoteData(d);
    });

    showSync('ok', 'Sincronizado');
    return true;
  } catch(e) {
    console.error('Firebase error:', e);
    fbReady = false;
    showSync('error', 'Sem sincronização');
    return false;
  }
}

/**
 * Converte `tasks` de lista para mapa indexado por id, uma única vez.
 *
 * Enquanto as demandas eram uma lista, salvar qualquer coisa reescrevia o
 * bloco inteiro: duas pessoas editando ao mesmo tempo perdiam trabalho, e não
 * havia como o banco saber de quem é cada demanda. Com o mapa, cada demanda é
 * um nó próprio — dá para gravar uma só e dá para escrever regra em cima dela.
 *
 * A lista original é copiada para `_backup/tasks_v1` ANTES da conversão e não
 * é tocada depois. Se algo der errado, ela continua lá inteira.
 */
async function migrateTasksToMap(data) {
  showSync('saving', 'Convertendo o banco…');
  const original = data.tasks;
  await fb.set(fb.ref(fbDb, `${FB_PATH}/_backup/tasks_v1`), {
    savedAt: new Date().toISOString(),
    count: original.filter(Boolean).length,
    tasks: original,
  });
  await fb.update(fbRef, {tasks: byId(original.filter(Boolean).map(normalizeTask)), schema: 2});
  console.info(`Banco convertido para schema 2. Backup em ${FB_PATH}/_backup/tasks_v1.`);
}

const byId = list => Object.fromEntries(list.filter(Boolean).map(t => [String(t.id), t]));
const toList = v => !v ? [] : (Array.isArray(v) ? v.filter(Boolean) : Object.values(v));

function applyRemoteData(data) {
  // Chega do banco só o que é do time. Tema e seções recolhidas são preferência
  // de cada pessoa e ficam no navegador — senão a escolha de um vira a de todos.
  if (data.tasks)    tasks    = toList(data.tasks).map(normalizeTask);
  if (data.team)     team     = data.team.map(normalizeMember);
  if (data.log)      log      = data.log;
  if (data.appTitle) appTitle = data.appTitle;
  if (data.users)    users    = data.users;
  cacheLocal();
  document.getElementById('titleDisplay').textContent = appTitle;
  if (!session) { renderAuth(); return; }   // ainda na tela de entrada
  syncUserFromStore();
  buildFilters();
  render();
  refreshOpenPanels();
}

// ═══════════════════════════════════════════════════
//  ESTADO DA INTERFACE
// ═══════════════════════════════════════════════════
let theme      = 'auto';        // 'auto' | 'light' | 'dark' — preferência LOCAL, não sincroniza
let hideDone   = false;
let fCat       = 'CASAS';
let fResp      = 'TIME';
let fStatus    = 'todos';   // todos | pendente | em andamento | concluído | atrasadas
let appTitle   = 'Gestão de Demandas';
let collapsed  = {NSCO:false, CIDADE:false, EVENTOS:false, OUTROS:false};
let catOpen    = true;
let respOpen   = true;
let log        = [];
let selectedResp  = [];
let editingAvIdx  = null;
let avEditContext = 'team';
let avDraftColor  = '';
let avDraftSvg    = null;
let draftTeam     = [];

// quantas demandas cada seção mostra antes do "mostrar mais"
const PAGE = 40;
let shown = {};


// Firebase handles
let fbApp = null, fbDb = null, fbRef = null;
let fbReady = false;
let syncTimeout = null;

// ═══════════════════════════════════════════════════
//  SINCRONIZAÇÃO (indicador)
// ═══════════════════════════════════════════════════
function showSync(state, msg) {
  const banner = document.getElementById('syncBanner');
  if (!banner) return;
  document.getElementById('syncDot').className = 'sync-dot ' + state;
  document.getElementById('syncLabel').textContent = msg;
  banner.hidden = false;
  clearTimeout(syncTimeout);
  // "ok" some rápido; o erro fica mais tempo mas TAMBÉM some. Um aviso
  // permanente na tela deixa de ser aviso e vira sujeira.
  if (state !== 'saving') syncTimeout = setTimeout(() => { banner.hidden = true; }, state === 'ok' ? 2200 : 7000);
}

// ═══════════════════════════════════════════════════
//  PERSISTÊNCIA
//  O que é do time (tarefas, pessoas, log, título) vai para o Firebase.
//  O que é de cada pessoa (tema, seções recolhidas) fica só neste navegador —
//  a aparência é preferência de quem está olhando, não estado compartilhado.
// ═══════════════════════════════════════════════════
function savePrefs() {
  try { localStorage.setItem('demandas-prefs', JSON.stringify({theme, collapsed})); } catch(_) {}
}
function loadPrefs() {
  try {
    const p = JSON.parse(localStorage.getItem('demandas-prefs') || '{}');
    if (['auto','light','dark'].includes(p.theme)) theme = p.theme;
    if (p.collapsed) collapsed = {...collapsed, ...p.collapsed};
  } catch(_) {}
}

function cacheLocal() {
  try { localStorage.setItem('demandas-data', JSON.stringify({tasks, team, appTitle, log, users})); } catch(_) {}
}

/** Grava um nó só do banco. `value === null` apaga. */
function writeNode(path, value) {
  cacheLocal();
  if (!fbReady || !fb) return Promise.resolve();
  showSync('saving', 'Salvando…');
  const p = value === null
    ? fb.remove(fb.ref(fbDb, `${FB_PATH}/${path}`))
    : fb.set(fb.ref(fbDb, `${FB_PATH}/${path}`), value);
  return p.then(() => showSync('ok', 'Salvo')).catch(e => {
    console.error('Erro ao salvar', path, e);
    showSync('error', 'Erro ao salvar');
  });
}

const saveTaskNode = t  => writeNode(`tasks/${t.id}`, t);
const removeTaskNode = id => writeNode(`tasks/${id}`, null);
const saveTeam2    = () => writeNode('team', team);
const saveUsers    = () => writeNode('users', users);
const saveLog      = () => writeNode('log', log.slice(0, 200));
const saveTitle    = () => writeNode('appTitle', appTitle);

/** Salva tudo. Só para casos raros (importação, reset); o dia a dia grava um nó. */
function persist() {
  cacheLocal();
  if (!fbReady || !fb) return;
  showSync('saving', 'Salvando…');
  fb.update(fbRef, {tasks: byId(tasks), team, appTitle, log: log.slice(0, 200), users})
    .then(() => showSync('ok', 'Salvo'))
    .catch(() => showSync('error', 'Erro ao salvar'));
}

async function load() {
  loadPrefs();
  try {
    const raw = localStorage.getItem('demandas-data');
    if (raw) {
      const p = JSON.parse(raw);
      if (p.tasks)    tasks    = toList(p.tasks).map(normalizeTask);
      if (p.team)     team     = p.team.map(normalizeMember);
      if (p.log)      log      = p.log;
      if (p.appTitle) appTitle = p.appTitle;
      if (p.users)    users    = p.users;
    }
  } catch(_) {}

  document.getElementById('titleDisplay').textContent = appTitle;
  applyTheme();
  if (restoreSession()) enterApp(); else renderAuth();

  try {
    await initFirebase();
  } catch (e) {
    console.error('initFirebase falhou:', e);
    showSync('error', 'Sem sincronização');
  }
}

/** Redesenha qualquer painel que esteja aberto, para nenhum mostrar dado velho. */
function refreshOpenPanels() {
  const aberto = id => { const el = document.getElementById(id); return el && !el.hidden; };
  if (aberto('profilesOverlay')) renderProfiles();
  if (aberto('dashOverlay'))     renderDashboard();
  if (aberto('meOverlay'))       renderMe();
  if (aberto('teamOverlay'))     renderTeamList();
  renderUserChip();
}

const normalizeTask   = t => ({...t, responsible: Array.isArray(t.responsible) ? t.responsible : [t.responsible].filter(Boolean)});
const normalizeMember = m => typeof m === 'string' ? {name:m, color:'#888', svg:null, startDate:'', role:''} : m;

// ═══════════════════════════════════════════════════
//  TELA DE CONFIGURAÇÃO
// ═══════════════════════════════════════════════════
function saveSetupConfig() {
  const txt = 'Para ativar a sincronização:\n\n'
            + '1. Abra assets/app.js\n'
            + '2. Preencha FIREBASE_CONFIG com os dados do seu projeto\n'
            + '3. Faça commit e push no GitHub';
  navigator.clipboard?.writeText(txt);
  toast('Instruções copiadas para a área de transferência.', {ms: 5000});
}
function skipSetup() {
  document.getElementById('setupScreen').hidden = true;
  load();
}

// ═══════════════════════════════════════════════════
//  UTILIDADES
// ═══════════════════════════════════════════════════
function today() { const d = new Date(); d.setHours(0,0,0,0); return d; }
function parseLocalDate(s) { const [y,m,d] = s.split('-').map(Number); return new Date(y,m-1,d); }
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function attr(s) { return esc(s).replace(/`/g,'&#96;'); }

const NEAR_DAYS = 3;
/** Classifica o prazo. Devolve {kind:'overdue'|'near'|'normal', days} ou null. */
function dueStatus(d, s) {
  if (!d || s === 'concluído') return null;
  const days = Math.round((parseLocalDate(d).getTime() - today().getTime()) / 86400000);
  if (days <  0) return {kind:'overdue', days:-days};
  if (days <= NEAR_DAYS) return {kind:'near', days};
  return {kind:'normal', days};
}
function plural(n, sing, plur) { return n + ' ' + (n === 1 ? sing : plur); }
function fmtDate(d) {
  if (!d) return null;
  const [y,m,day] = d.split('-');
  return `${day}/${m}/${y}`;
}

function memberOf(name) { return team.find(m => m.name === name) || {name, color:'#8E8E93', svg:null}; }
/**
 * Time visível: todo mundo que o administrador não ocultou.
 * Ocultar é o oposto de remover — nada é apagado. As demandas da pessoa
 * continuam na lista com o nome, a cor e o avatar dela (quem desenha isso é
 * o `memberOf` acima, que enxerga o time inteiro). O que some é só a presença
 * dela nos lugares onde se escolhe gente: a gaveta de filtro, o seletor de
 * responsáveis de uma demanda nova e a carga por pessoa do dashboard.
 */
const teamVisivel = () => team.filter(m => !m.hidden);

/* Olho aberto / cortado: a razão de traço é a mesma dos outros ícones. */
const OLHO = `<svg width="15" height="15" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M1.2 6.5S3.3 3.2 6.5 3.2s5.3 3.3 5.3 3.3-2.1 3.3-5.3 3.3S1.2 6.5 1.2 6.5Z" stroke="currentColor" stroke-width="1.24" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6.5" cy="6.5" r="1.45" stroke="currentColor" stroke-width="1.24"/></svg>`;
const OLHO_OFF = `<svg width="15" height="15" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M4.1 3.9C2.4 4.8 1.2 6.5 1.2 6.5s2.1 3.3 5.3 3.3c1 0 1.9-.3 2.6-.7M10.6 8.2c.8-.8 1.2-1.7 1.2-1.7S9.7 3.2 6.5 3.2c-.4 0-.8.05-1.1.13" stroke="currentColor" stroke-width="1.24" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.3 5.4a1.6 1.6 0 0 0 2.3 2.2" stroke="currentColor" stroke-width="1.24" stroke-linecap="round"/><path d="M2.1 2.1l8.8 8.8" stroke="currentColor" stroke-width="1.24" stroke-linecap="round"/></svg>`;

function avInits(name)  { return (name||'?').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase(); }

/** Tempo de casa a partir da data de início, em pt-BR. */
function calcTenure(startStr) {
  if (!startStr) return '—';
  const start = parseLocalDate(startStr);
  const now = today();
  if (start > now) return '—';
  let years  = now.getFullYear() - start.getFullYear();
  let months = now.getMonth()    - start.getMonth();
  const days = now.getDate()     - start.getDate();
  if (days < 0)   months -= 1;
  if (months < 0) { months += 12; years -= 1; }
  const parts = [];
  if (years  > 0) parts.push(plural(years,  'ano', 'anos'));
  if (months > 0) parts.push(plural(months, 'mês', 'meses'));
  if (!parts.length) {
    const d = Math.floor((now - start) / 86400000);
    return d <= 0 ? 'Hoje' : plural(d, 'dia', 'dias');
  }
  return parts.join(' e ');
}

/**
 * Avatar. `interactive:false` devolve um <span> — necessário quando o avatar
 * mora dentro de outro botão (pill de filtro), porque botão dentro de botão
 * é HTML inválido e o leitor de tela se perde.
 */
/**
 * Tinta legível sobre uma cor de fundo qualquer. As cores de avatar são
 * escolhidas pelas pessoas, e branco sobre o amarelo da paleta dá 1.6:1 —
 * ilegível. Isto devolve branco ou quase-preto, o que ganhar, e nunca fica
 * abaixo de 4.7:1 em nenhuma cor da paleta.
 */
function inkOn(bg) {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(bg || '').trim());
  if (!m) return '#fff';
  let h = m[1];
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const n = parseInt(h, 16);
  const lin = c => { c /= 255; return c <= 0.03928 ? c/12.92 : ((c + 0.055)/1.055) ** 2.4; };
  const lum = 0.2126*lin(n >> 16 & 255) + 0.7152*lin(n >> 8 & 255) + 0.0722*lin(n & 255);
  const cw = 1.05 / (lum + 0.05);              // contraste do branco
  const ck = (lum + 0.05) / (0.0111 + 0.05);   // contraste do #1A1A1C
  return cw >= ck ? '#fff' : '#1A1A1C';
}

function avHTML(name, sz, {interactive = false, ring = 'var(--surf)'} = {}) {
  const m = memberOf(name);
  // piso de 11px nas iniciais: abaixo disso não é texto, é mancha
  const fs = Math.max(11, Math.round(sz * .4));
  const base = `width:${sz}px;height:${sz}px;font-size:${fs}px;background:${attr(m.color)};color:${inkOn(m.color)};border-color:${ring}`;
  const inner = m.svg ? `<img src="${attr(m.svg)}" alt=""/>` : esc(avInits(name));
  if (!interactive) return `<span class="av" style="${base}" aria-hidden="true">${inner}</span>`;
  return `<button type="button" class="av" style="${base}" onclick="openAvForName('${attr(name)}')" aria-label="Editar avatar de ${attr(name)}">${inner}</button>`;
}

/** Ponto da cor da pessoa. Nos pills o nome vem escrito ao lado, então
 *  iniciais minúsculas ali seriam ruído ilegível. */
function dotHTML(name) {
  return `<span class="pdot" style="background:${attr(memberOf(name).color)}" aria-hidden="true"></span>`;
}

function markHTML(cat, h) {
  if (!MARKS[cat]) return '';
  return MARKS[cat].replace('<svg ', `<svg class="mark" style="height:${h}px" `);
}

// ═══════════════════════════════════════════════════
//  CONTAS E PERMISSÕES
//
//  ⚠ LEIA ANTES DE CONFIAR NISTO
//  A conferência da senha acontece AQUI, no navegador, contra a lista de
//  usuários guardada no próprio banco. Isso organiza o time e evita engano no
//  dia a dia — não é segurança. Quem tiver o link e abrir o console do
//  navegador lê e altera tudo sem passar por esta tela, porque as regras do
//  Realtime Database continuam abertas.
//
//  Para virar segurança de verdade é preciso Firebase Authentication + regras
//  com `auth != null`. O README tem o passo a passo.
//
//  O que esta camada AINDA assim faz direito: nunca guarda senha em texto.
//  Cada conta tem um sal aleatório e a senha vira uma derivação PBKDF2-SHA256
//  de 210 mil iterações, que é o que impede o vazamento do banco de virar
//  vazamento das senhas que as pessoas reusam em outros lugares.
// ═══════════════════════════════════════════════════

const PBKDF2_ITER = 210000;

// Conta semente: é ela que faz o primeiro administrador existir antes de haver
// banco. A senha não está aqui — só a derivação dela e o sal.
const SEED_USER = {
  uid:        'u-thiago',
  name:       'Thiago',
  email:      'thiago@nasala.com.br',
  salt:       'uU48N8kUReCQ+ku5RhXafw==',
  hash:       'Sv+5o0R1RpMujsDJvMAEnsM8/Spobca7VJ6n9Pswkt4=',
  admin:      true,
  memberName: 'Thiago',
  createdAt:  '2026-09-12T00:00:00.000Z',
};

let users   = {};      // { uid: {name, email, salt, hash, admin, memberName, createdAt} }
let session = null;    // usuário logado (sem salt nem hash)

const b64 = buf => btoa(String.fromCharCode(...new Uint8Array(buf)));
const unb64 = str => Uint8Array.from(atob(str), c => c.charCodeAt(0));
const normEmail = e => String(e || '').trim().toLowerCase();

async function derive(password, saltB64) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    {name:'PBKDF2', salt: unb64(saltB64), iterations: PBKDF2_ITER, hash:'SHA-256'}, key, 256);
  return b64(bits);
}
function newSalt() { return b64(crypto.getRandomValues(new Uint8Array(16))); }

/** Comparação de tempo constante — não vaza o quanto o palpite chegou perto. */
function sameHash(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function allUsers() {
  const map = {...users};
  if (!Object.values(map).some(u => normEmail(u.email) === SEED_USER.email)) map[SEED_USER.uid] = SEED_USER;
  return map;
}
function userByEmail(email) {
  const e = normEmail(email);
  return Object.values(allUsers()).find(u => normEmail(u.email) === e) || null;
}
const publicUser = u => u && ({uid:u.uid, name:u.name, email:u.email, admin:!!u.admin, memberName:u.memberName || u.name});

// ── permissões ───────────────────────────────────────
const isAdmin = () => !!(session && session.admin);
/** Quem está inserido na demanda mexe nela; administrador mexe em todas. */
function canEdit(t) {
  if (!session) return false;
  if (session.admin) return true;
  return (t.responsible || []).includes(session.memberName);
}
/** Avisa e devolve false quando a ação não é permitida. */
function denied(msg) {
  toast(msg + ' Fale com um administrador.', {tone: 'warn'});
  return false;
}

// ── sessão ───────────────────────────────────────────
function saveSession() {
  try {
    if (session) localStorage.setItem('demandas-sessao', JSON.stringify({uid: session.uid, email: session.email}));
    else localStorage.removeItem('demandas-sessao');
  } catch(_) {}
}
function restoreSession() {
  try {
    const raw = localStorage.getItem('demandas-sessao');
    if (!raw) return false;
    const {uid, email} = JSON.parse(raw);
    const u = allUsers()[uid] || userByEmail(email);
    if (!u) return false;
    session = publicUser(u);
    return true;
  } catch(_) { return false; }
}
/** Depois de um sync, a sessão reflete o que o banco diz agora (papel, nome). */
function syncUserFromStore() {
  if (!session) return;
  const u = allUsers()[session.uid] || userByEmail(session.email);
  if (!u) { signOut(); return; }          // conta removida por um administrador
  const was = session.admin;
  session = publicUser(u);
  applyRole();
  if (was !== session.admin) { renderUserChip(); render(); }
}

async function doLogin(email, password) {
  const u = userByEmail(email);
  // Deriva mesmo sem usuário, para a resposta demorar igual nos dois casos.
  const hash = await derive(password, u ? u.salt : newSalt());
  if (!u || !sameHash(hash, u.hash)) return {error: 'E-mail ou senha não conferem.'};
  session = publicUser(u);
  saveSession();
  return {ok: true};
}

async function doSignup({name, email, password}) {
  name = String(name || '').trim();
  email = normEmail(email);
  if (name.length < 2)  return {error: 'Escreva seu nome.'};
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return {error: 'E-mail inválido.'};
  if (String(password).length < 8) return {error: 'A senha precisa de pelo menos 8 caracteres.'};
  if (userByEmail(email)) return {error: 'Já existe uma conta com esse e-mail.'};

  const salt = newSalt();
  const uid  = 'u-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  // Liga a conta a quem já está no time, se o nome bater. Senão entra como
  // pessoa nova — um administrador pode reapontar depois, em Perfis.
  const match = team.find(m => m.name.toLowerCase() === name.toLowerCase());
  if (!match) {
    team = [...team, {name, color: PALETTE[team.length % PALETTE.length], svg:null, startDate:'', role:''}];
  }
  users = {...allUsers(), [uid]: {
    uid, name, email, salt,
    hash: await derive(password, salt),
    admin: false,
    memberName: match ? match.name : name,
    createdAt: new Date().toISOString(),
  }};
  session = publicUser(users[uid]);
  saveSession();
  if (!match) saveTeam2();
  saveUsers();
  addLog('team', `${name} criou uma conta`);
  saveLog();
  return {ok: true};
}

function signOut() {
  session = null;
  saveSession();
  closeMe();
  authMode = 'login';
  renderAuth();
  const mail = document.getElementById('authEmail');
  if (mail) mail.value = '';   // porta limpa para a próxima pessoa
}

/** Administrador promove, rebaixa ou remove contas (na tela de Perfis). */
function setUserAdmin(uid, value) {
  if (!isAdmin()) return denied('Só administradores mudam papéis.');
  if (uid === session.uid && !value) return denied('Você não pode tirar o próprio acesso de administrador.');
  const map = allUsers();
  if (!map[uid]) return;
  users = {...map, [uid]: {...map[uid], admin: !!value}};
  addLog('team', `${map[uid].name} ${value ? 'virou administrador' : 'deixou de ser administrador'}`);
  saveUsers(); saveLog(); renderProfiles();
}

// ═══════════════════════════════════════════════════
//  TEMA
//  'auto' segue o sistema; a escolha explícita vence nos dois sentidos.
// ═══════════════════════════════════════════════════
const mqDark = window.matchMedia('(prefers-color-scheme: dark)');
function isDark() {
  if (theme === 'dark')  return true;
  if (theme === 'light') return false;
  // 'auto': se quem hospeda a página já carimbou o tema do leitor, respeita.
  const stamped = document.documentElement.getAttribute('data-theme');
  return stamped ? stamped === 'dark' : mqDark.matches;
}

const ICON_SUN = `<svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="2.6" stroke="currentColor" stroke-width="1.33"/><path d="M7 .6v1.5M7 11.9v1.5M.6 7h1.5M11.9 7h1.5M2.5 2.5l1 1M10.5 10.5l1 1M11.5 2.5l-1 1M3.5 10.5l-1 1" stroke="currentColor" stroke-width="1.33" stroke-linecap="round"/></svg>`;
const ICON_MOON = `<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.2 10.1a5.9 5.9 0 0 1-7.3-7.3A.55.55 0 0 0 5.1 2a6.9 6.9 0 1 0 8.9 8.9.55.55 0 0 0-.8-.8z" fill="currentColor"/></svg>`;

function applyTheme() {
  const root = document.documentElement;
  // Em 'auto' não mexe no atributo: ele pode ter sido posto por quem hospeda.
  if (theme !== 'auto') root.setAttribute('data-theme', theme);
  const dk = isDark();
  const ic = document.getElementById('themeIcon');
  const lb = document.getElementById('themeLabel');
  if (ic) ic.innerHTML = dk ? ICON_SUN : ICON_MOON;
  if (lb) lb.textContent = dk ? 'Tema claro' : 'Tema escuro';
}
function toggleTheme() {
  theme = isDark() ? 'light' : 'dark';
  applyTheme();
  savePrefs();
}
mqDark.addEventListener('change', () => { if (theme === 'auto') applyTheme(); });
// e se quem hospeda trocar o carimbo de tema, o rótulo do botão acompanha
new MutationObserver(() => { if (theme === 'auto') applyTheme(); })
  .observe(document.documentElement, {attributes:true, attributeFilter:['data-theme']});

// ═══════════════════════════════════════════════════
//  CONFIRMAÇÃO
//  O confirm() do navegador é bloqueado quando a página roda dentro de um
//  iframe sem permissão de modal — e bloqueado ele devolve false, fazendo a
//  ação falhar em silêncio. Isto não depende do navegador.
// ═══════════════════════════════════════════════════
let askDone = null;

/** @returns {Promise<boolean>} */
function ask(titulo, msg, rotuloOk = 'Confirmar', perigo = false) {
  document.getElementById('askTitle').textContent = titulo;
  document.getElementById('askMsg').textContent = msg;
  const ok = document.getElementById('askOk');
  ok.textContent = rotuloOk;
  ok.classList.toggle('btn-danger-solid', perigo);
  openOverlay('askOverlay', '#askOk');
  return new Promise(res => { askDone = res; });
}
function askResolve(v) {
  closeOverlay('askOverlay');
  const f = askDone; askDone = null;
  f?.(v);
}

// ═══════════════════════════════════════════════════
//  AVISOS NA INTERFACE
//
//  Substitui os alert() do navegador. A orientação é explícita: retorno de
//  estado mora na interface, perto do que ele descreve, e alerta modal fica
//  reservado para o que é crítico e acionável. Um alert() para dizer "esta
//  demanda não é sua" interrompe muito para o que informa pouco.
// ═══════════════════════════════════════════════════

let toastSeq = 0;

/**
 * @param {string} msg
 * @param {{tone?:'info'|'warn'|'ok', action?:string, onAction?:Function, ms?:number}} opts
 */
function toast(msg, {tone = 'info', action, onAction, ms = 5000} = {}) {
  const host = document.getElementById('toasts');
  if (!host) return;
  const id = 'toast-' + (++toastSeq);
  const el = document.createElement('div');
  el.className = `toast toast-${tone}`;
  el.id = id;
  el.setAttribute('role', tone === 'warn' ? 'alert' : 'status');
  el.innerHTML = `<span class="toast-msg">${esc(msg)}</span>` +
    (action ? `<button type="button" class="toast-action">${esc(action)}</button>` : '') +
    `<button type="button" class="toast-x" aria-label="Fechar aviso">
      <svg width="11" height="11" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="currentColor" stroke-width="0.95" stroke-linecap="round"/></svg>
    </button>`;
  host.appendChild(el);

  const close = () => {
    el.classList.add('is-out');
    el.addEventListener('animationend', () => el.remove(), {once: true});
    setTimeout(() => el.remove(), 400);   // rede de segurança com movimento reduzido
  };
  el.querySelector('.toast-x').onclick = close;
  if (action) el.querySelector('.toast-action').onclick = () => { close(); onAction?.(); };
  const timer = setTimeout(close, ms);
  el.addEventListener('mouseenter', () => clearTimeout(timer));   // não some com o ponteiro em cima
  return close;
}

// ═══════════════════════════════════════════════════
//  TELA DE ENTRADA
// ═══════════════════════════════════════════════════
let authMode = 'login';   // 'login' | 'cadastro'
let authBusy = false;

function cryptoReady() { return !!(window.crypto && crypto.subtle && crypto.subtle.deriveBits); }

function renderAuth() {
  document.documentElement.classList.remove('is-admin');
  document.getElementById('authScreen').hidden = false;
  document.getElementById('appShell').hidden = true;
  setAuthMode(authMode);

  // O navegador só oferece crypto.subtle em contexto seguro. Abrir o
  // index.html por duplo-clique (file://) não é um, e a senha não teria como
  // ser conferida — melhor dizer isso do que deixar o botão falhando calado.
  if (!cryptoReady()) {
    authError('Abra o quadro pelo endereço publicado (https) ou por um servidor local. '
            + 'Por duplo-clique no arquivo o navegador não libera a conferência de senha.');
    document.getElementById('authSubmit').disabled = true;
    return;
  }
  setTimeout(() => document.getElementById('authEmail')?.focus(), 40);
}
function enterApp() {
  document.getElementById('authScreen').hidden = true;
  document.getElementById('appShell').hidden = false;
  authError('');
  document.getElementById('authPass').value = '';
  document.getElementById('authPass2').value = '';
  renderUserChip();
  applyHideIcon();
  buildFilters();
  render();
  // o movimento de entrada acontece uma vez, ao abrir o quadro
  const lista = document.getElementById('lista');
  lista.classList.add('boot');
  setTimeout(() => lista.classList.remove('boot'), 700);
}

function setAuthMode(mode) {
  authMode = mode;
  const entrar = mode === 'login';
  document.getElementById('authTitle').textContent = entrar ? 'Entrar' : 'Criar conta';
  document.getElementById('authSub').textContent = entrar
    ? 'O quadro de demandas da naSala.'
    : 'Use o seu e-mail da naSala.';
  document.getElementById('authNameField').hidden = entrar;
  document.getElementById('authPass2Field').hidden = entrar;
  document.getElementById('authSubmit').textContent = entrar ? 'Entrar' : 'Criar conta';
  document.getElementById('authSwitchText').textContent = entrar ? 'Ainda não tem conta?' : 'Já tem conta?';
  document.getElementById('authSwitchBtn').textContent = entrar ? 'Criar uma' : 'Entrar';
  document.getElementById('authPass').setAttribute('autocomplete', entrar ? 'current-password' : 'new-password');
  authError('');
}
function toggleAuthMode() { setAuthMode(authMode === 'login' ? 'cadastro' : 'login'); }

function authError(msg) {
  const el = document.getElementById('authError');
  el.textContent = msg || '';
  el.hidden = !msg;
}

async function submitAuth(event) {
  if (event) event.preventDefault();
  if (authBusy) return;
  const btn = document.getElementById('authSubmit');
  const email = document.getElementById('authEmail').value;
  const pass  = document.getElementById('authPass').value;

  authBusy = true; btn.disabled = true;
  btn.textContent = authMode === 'login' ? 'Entrando…' : 'Criando…';
  authError('');
  try {
    let res;
    if (authMode === 'login') {
      res = await doLogin(email, pass);
    } else {
      const name = document.getElementById('authName').value;
      if (pass !== document.getElementById('authPass2').value) res = {error: 'As duas senhas não são iguais.'};
      else res = await doSignup({name, email, password: pass});
    }
    if (res.error) { authError(res.error); document.getElementById('authPass').focus(); return; }
    enterApp();
  } catch (e) {
    console.error(e);
    authError('Não deu para concluir agora. Tente de novo.');
  } finally {
    authBusy = false; btn.disabled = false;
    btn.textContent = authMode === 'login' ? 'Entrar' : 'Criar conta';
  }
}

/** Marca a raiz para o CSS esconder o que é só de administrador. */
function applyRole() {
  document.documentElement.classList.toggle('is-admin', isAdmin());
}

function renderUserChip() {
  applyRole();
  if (!session) return;
  // Botão de conta na barra: a pessoa vê de quem é a sessão sem precisar clicar.
  const btn = document.getElementById('btnAccount');
  if (btn) {
    btn.innerHTML = `${avHTML(session.memberName, 24)}
      <span class="account-name">${esc(session.name.split(' ')[0])}</span>
      <svg width="10" height="10" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M2.5 4l3 3 3-3" stroke="currentColor" stroke-width="1.04" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    btn.setAttribute('aria-label', `Conta de ${session.name}. Abrir menu`);
    btn.title = `${session.name} · ${session.email}`;
  }
  const head = document.getElementById('menuUser');
  if (head) {
    head.innerHTML = `${avHTML(session.memberName, 34)}
      <span class="menu-user-id">
        <span class="menu-user-name">${esc(session.name)}</span>
        <span class="menu-user-mail">${esc(session.email)}</span>
      </span>
      ${session.admin ? '<span class="badge-admin">admin</span>' : ''}`;
  }
}

// ═══════════════════════════════════════════════════
//  TÍTULO EDITÁVEL
// ═══════════════════════════════════════════════════
function startTitleEdit() {
  if (!isAdmin()) return denied('Só administradores renomeiam o quadro.');
  const disp = document.getElementById('titleDisplay');
  const inp  = document.getElementById('titleInput');
  disp.style.display = 'none';
  inp.value = appTitle;
  inp.style.display = 'block';
  inp.focus(); inp.select();
}
function endTitleEdit() {
  const inp = document.getElementById('titleInput');
  inp.style.display = 'none';
  document.getElementById('titleDisplay').style.display = '';
}
function saveTitleEdit() {
  const inp = document.getElementById('titleInput');
  if (inp.style.display === 'none') return;
  appTitle = inp.value.trim() || 'Gestão de Demandas';
  document.getElementById('titleDisplay').textContent = appTitle;
  document.title = appTitle + ' — naSala';
  endTitleEdit();
  saveTitle();
}
function cancelTitleEdit() { endTitleEdit(); }

// ═══════════════════════════════════════════════════
//  CONTROLES DE VISÃO
// ═══════════════════════════════════════════════════
const ICON_OLHO = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1.1 8S3.4 3.2 8 3.2 14.9 8 14.9 8 12.6 12.8 8 12.8 1.1 8 1.1 8z" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2.1" stroke="currentColor" stroke-width="1.5"/></svg>`;
const ICON_OLHO_CORTADO = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6.2 3.5A7 7 0 0 1 8 3.2C12.6 3.2 14.9 8 14.9 8a12 12 0 0 1-2.3 3M4.2 4.9A12 12 0 0 0 1.1 8S3.4 12.8 8 12.8a7 7 0 0 0 2.3-.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M6.5 6.5a2.1 2.1 0 0 0 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M2.2 2.2l11.6 11.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;

function applyHideIcon() {
  const b = document.getElementById('btnHide');
  if (!b) return;
  b.setAttribute('aria-pressed', String(hideDone));
  b.setAttribute('aria-label', hideDone ? 'Mostrar entregues' : 'Ocultar entregues');
  b.title = (hideDone ? 'Mostrar entregues' : 'Ocultar entregues') + ' (H)';
  document.getElementById('btnHideIcon').innerHTML = hideDone ? ICON_OLHO_CORTADO : ICON_OLHO;
}

function toggleHide() {
  hideDone = !hideDone;
  applyHideIcon();
  shown = {};
  render();
}

function toggleMore() {
  const m = document.getElementById('moreMenu');
  const b = document.getElementById('btnAccount');
  const open = m.hidden;
  m.hidden = !open;
  b.setAttribute('aria-expanded', String(open));
  if (open) m.querySelector('button')?.focus();
}
function closeMore() {
  const m = document.getElementById('moreMenu');
  if (m.hidden) return;
  m.hidden = true;
  document.getElementById('btnAccount').setAttribute('aria-expanded', 'false');
}
document.addEventListener('click', e => {
  if (!e.target.closest('.menu-wrap')) closeMore();
});

// A busca varre 746 demandas; sem isso o campo engasga a cada tecla.
let renderTimer = null;
function queueRender() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(() => { shown = {}; updateDockTags(); render(); }, 120);
}

// ═══════════════════════════════════════════════════
//  FILTROS
// ═══════════════════════════════════════════════════

// ═══════════════════════════════════════════════════
//  MENU FLUTUANTE (filtros e busca)
//  Os filtros saíram do topo e flutuam sobre a lista. Uma gaveta aberta por
//  vez; Esc fecha, clique fora fecha. O que está filtrado fica escrito no
//  próprio botão, então não é preciso abrir para saber.
// ═══════════════════════════════════════════════════
let dockOpen = null;   // 'Cat' | 'Resp' | 'Search' | null

function toggleDock(which) {
  const abrir = dockOpen !== which;
  ['Cat','Resp','Search'].forEach(k => {
    const pop = document.getElementById('pop' + k);
    const btn = document.getElementById('dock' + k);
    if (!pop || !btn) return;
    const on = abrir && k === which;
    pop.hidden = !on;
    btn.setAttribute('aria-expanded', String(on));
    btn.classList.toggle('is-open', on);
  });
  dockOpen = abrir ? which : null;
  if (dockOpen === 'Search') setTimeout(() => document.getElementById('srch').focus(), 60);
  else if (dockOpen) requestAnimationFrame(wirePillArrows);   // largura só existe depois de visível
}
function closeDock() {
  if (!dockOpen) return;
  const era = dockOpen;
  toggleDock(era);
  document.getElementById('dock' + era)?.focus();
}
function clearSearch() {
  const inp = document.getElementById('srch');
  inp.value = '';
  inp.focus();
  queueRender();
}
document.addEventListener('click', e => {
  if (dockOpen && !e.target.closest('#dock')) toggleDock(dockOpen);
});

/** Escreve no botão o que está filtrado. */
function updateDockTags() {
  const cat = document.getElementById('dockCatTag');
  if (cat) {
    const ativo = fCat !== 'CASAS';
    cat.hidden = !ativo;
    cat.textContent = ativo ? fCat : '';
    document.getElementById('dockCat').classList.toggle('has-sel', ativo);
  }
  const resp = document.getElementById('dockRespTag');
  if (resp) {
    const ativo = fResp !== 'TIME';
    resp.hidden = !ativo;
    resp.textContent = ativo ? fResp.split(' ')[0] : '';
    document.getElementById('dockResp').classList.toggle('has-sel', ativo);
  }
  const inp = document.getElementById('srch');
  const btn = document.getElementById('dockSearch');
  const clr = document.getElementById('srchClear');
  if (inp && btn) {
    btn.classList.toggle('has-sel', !!inp.value);
    if (clr) clr.hidden = !inp.value;
  }
}

function buildFilters() {
  const cp = document.getElementById('catPills');
  cp.innerHTML = CATS.map(c => {
    const on = fCat === c;
    const mark = markHTML(c, MARK_H[c]);
    const label = mark ? `${mark}<span class="sr-only">${esc(c)}</span>` : esc(c);
    return `<button type="button" class="fp${on ? ' on' : ''}" onclick="setCat('${attr(c)}')"
      aria-pressed="${on}" title="${attr(c)}">${label}</button>`;
  }).join('');

  const rp = document.getElementById('respPills');
  rp.innerHTML = teamVisivel().map(m => {
    const on = fResp === m.name;
    return `<button type="button" class="fp${on ? ' on' : ''}" onclick="setResp('${attr(m.name)}')" aria-pressed="${on}">
      ${dotHTML(m.name)}${esc(m.name.split(' ')[0])}</button>`;
  }).join('');

  updateDockTags();
  wirePillArrows();
}

/** Setas da faixa de pills: rolam de meia largura e desabilitam nas pontas. */
function wirePillArrows() {
  document.querySelectorAll('.pill-track').forEach(track => {
    const faixa = track.querySelector('.fpills');
    const setas = track.querySelectorAll('.pill-arrow');
    const estado = () => {
      const sobra = faixa.scrollWidth - faixa.clientWidth - 1;
      const temEsq = faixa.scrollLeft > 0;
      const temDir = faixa.scrollLeft < sobra;
      setas[0].disabled = !temEsq;
      setas[1].disabled = !temDir;
      setas.forEach(b => { b.hidden = sobra <= 0; });
      // O esmaecido acompanha o lado que ainda tem conteúdo: sem isso o nome
      // seguinte era cortado a faca junto da seta.
      faixa.classList.toggle('fade-l', temEsq);
      faixa.classList.toggle('fade-r', temDir);
    };
    setas.forEach(b => {
      b.onclick = e => {
        e.stopPropagation();
        faixa.scrollBy({left: Number(b.dataset.scroll) * faixa.clientWidth * 0.6, behavior: 'smooth'});
      };
    });
    faixa.onscroll = estado;
    estado();
    requestAnimationFrame(estado);   // depois do layout, quando a largura existe
  });
}

function setCat(c)  { fCat  = (fCat  === c ? 'CASAS' : c); shown = {}; buildFilters(); render(); }
function setResp(r) { fResp = (fResp === r ? 'TIME'  : r); shown = {}; buildFilters(); render(); }
function setStatusFilter(v) { fStatus = (fStatus === v ? 'todos' : v); shown = {}; render(); }

function toggleSection(cat) {
  collapsed[cat] = !collapsed[cat];
  savePrefs();
  render();
}
function showMore(cat) {
  shown[cat] = (shown[cat] || PAGE) + 60;
  render();
}

// ═══════════════════════════════════════════════════
//  RENDER
// ═══════════════════════════════════════════════════

/** Aberto primeiro, e dentro do aberto o mais urgente primeiro. */
function sortTasks(list) {
  const rank = t => {
    if (t.status === 'concluído') return 3;
    const ds = dueStatus(t.dueDate, t.status);
    if (ds && ds.kind === 'overdue') return 0;
    if (ds && ds.kind === 'near')    return 1;
    return 2;
  };
  return [...list].sort((a,b) => {
    const ra = rank(a), rb = rank(b);
    if (ra !== rb) return ra - rb;
    // entregues: mais recentes no topo. Abertas: prazo mais próximo no topo.
    if (ra === 3) return (b.dueDate || '').localeCompare(a.dueDate || '');
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return a.dueDate.localeCompare(b.dueDate);
  });
}

/**
 * Situação da carteira — e o filtro por ela.
 *
 * Antes era um enfeite: uma frase, um trilho e três bolinhas que não faziam
 * nada. Agora cada faixa é um botão. Os números respeitam os filtros de casa,
 * pessoa e busca, então dizem respeito ao que está na tela, não ao arquivo
 * inteiro — e "6 atrasadas" vira um clique para ver quais são.
 */
function renderState(scope) {
  const done = scope.filter(t => t.status === 'concluído').length;
  const prog = scope.filter(t => t.status === 'em andamento').length;
  const late = scope.filter(t => (dueStatus(t.dueDate, t.status) || {}).kind === 'overdue').length;
  const pend = scope.length - done - prog;

  const segs = [
    {key:'concluído',    n:done, label:'Entregues',    fill:'var(--grn)', ink:'var(--grn-i)', tint:'var(--grn-t)'},
    {key:'em andamento', n:prog, label:'Em andamento', fill:'var(--acc)', ink:'var(--acc-i)', tint:'var(--acc-t)'},
    {key:'pendente',     n:pend, label:'Pendentes',    fill:'var(--org)', ink:'var(--org-i)', tint:'var(--org-t)'},
  ];

  // Atrasadas não é um quarto status: é um recorte das que estão em aberto.
  // Por isso fica separada do trilho, depois de um divisor.
  const chip = s => {
    const on = fStatus === s.key;
    // Zero continua sendo informação — mas filtrar para nada não é ação.
    // Com "ocultar entregues" ligado, a ficha de entregues mantém o número e
    // apenas esmaece: o dado não mudou, só saiu da lista.
    const mudo = s.key === 'concluído' && hideDone;
    return `<button type="button" class="stat${on ? ' is-on' : ''}${s.danger ? ' is-danger' : ''}${mudo ? ' is-muted' : ''}"
      style="--c-ink:${s.ink};--c-tint:${s.tint};--c-fill:${s.fill}"
      ${s.n && !mudo ? '' : 'disabled'} onclick="setStatusFilter('${s.key}')" aria-pressed="${on}"
      ${mudo ? 'title="Entregues estão ocultas da lista"' : ''}>
      ${s.danger
        ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1.5l5 9H1l5-9z" stroke="currentColor" stroke-width="1.14" stroke-linejoin="round"/><path d="M6 5v2.3" stroke="currentColor" stroke-width="1.14" stroke-linecap="round"/><circle cx="6" cy="8.9" r=".7" fill="currentColor"/></svg>`
        : `<span class="stat-dot" style="background:${s.fill}" aria-hidden="true"></span>`}
      <b>${s.n}</b><span>${s.label}</span>
    </button>`;
  };

  document.getElementById('stateChips').innerHTML =
    segs.map(chip).join('') +
    (late ? `<span class="stat-div" aria-hidden="true"></span>` +
            chip({key:'atrasadas', n:late, label:'Atrasadas', ink:'var(--red-i)', tint:'var(--red-t)', fill:'var(--red)', danger:true})
          : '');

  document.getElementById('stateSummary').textContent =
    `${scope.length} demandas: ${done} entregues, ${prog} em andamento, ${pend} pendentes, ${late} atrasadas.`;
}

function render() {
  const q = (document.getElementById('srch').value || '').trim().toLowerCase();

  // Escopo = casa + pessoa + busca, SEM o "ocultar entregues": as fichas
  // contam o que existe. Esconder da lista não é o mesmo que deixar de
  // existir, então o contador de entregues continua dizendo a verdade e só
  // fica esmaecido.
  const scope = tasks.filter(t => {
    if (fCat  !== 'CASAS' && t.category !== fCat) return false;
    if (fResp !== 'TIME'  && !(t.responsible||[]).includes(fResp)) return false;
    if (q && !t.title.toLowerCase().includes(q) && !(t.description||'').toLowerCase().includes(q)) return false;
    return true;
  });

  renderState(scope);

  // O filtro de status e o "ocultar entregues" fatiam o escopo, depois de os
  // números já terem sido ditos.
  let fil = fStatus === 'todos' ? scope : scope.filter(t =>
    fStatus === 'atrasadas'
      ? (dueStatus(t.dueDate, t.status) || {}).kind === 'overdue'
      : t.status === fStatus);
  if (hideDone) fil = fil.filter(t => t.status !== 'concluído');

  const el = document.getElementById('lista');
  if (!fil.length) {
    const filtering = q || fCat !== 'CASAS' || fResp !== 'TIME' || hideDone || fStatus !== 'todos';
    el.innerHTML = `<p class="empty"><strong>${filtering ? 'Nada com esses filtros' : 'Nenhuma demanda ainda'}</strong>
      ${filtering ? 'Tire um filtro ou mude a busca para ver mais.' : 'Comece criando a primeira em “Nova”.'}</p>`;
    return;
  }

  el.innerHTML = CATS.map(cat => {
    const its = sortTasks(fil.filter(t => t.category === cat));
    if (!its.length) return '';

    const open   = its.filter(t => t.status !== 'concluído').length;
    const isOpen = !collapsed[cat];
    const limit  = shown[cat] || PAGE;
    const slice  = its.slice(0, limit);
    const rest   = its.length - slice.length;
    const mark   = markHTML(cat, MARK_H2[cat]);

    return `<section class="cat-sec">
      <button type="button" class="cat-hdr" onclick="toggleSection('${attr(cat)}')"
              aria-expanded="${isOpen}" aria-controls="sec-${attr(cat)}">
        ${mark || ''}<span class="${mark ? 'sr-only' : 'cat-lbl'}">${esc(cat)}</span>
        ${open ? `<span class="cat-open">${plural(open, 'em aberto', 'em aberto')}</span>` : ''}
        <span class="cat-cnt">${its.length} no total</span>
        <span class="cat-line" aria-hidden="true"></span>
        <span class="cat-arrow${isOpen ? '' : ' closed'}" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </button>
      <div class="cat-body${isOpen ? '' : ' collapsed'}" id="sec-${attr(cat)}">
        ${slice.map(cardHTML).join('')}
        ${rest > 0 ? `<button type="button" class="more-btn" onclick="showMore('${attr(cat)}')">Mostrar mais ${rest > 60 ? 60 : rest} de ${rest}</button>` : ''}
      </div>
    </section>`;
  }).join('');
}

// ── card ────────────────────────────────────────────
const SIZE_BARS = {P:1, M:2, G:3};

function sizeTag(sz) {
  if (!sz || sz === 'M') return '';   // Médio é o padrão: marcar todo card não diz nada
  const n = SIZE_BARS[sz] || 2;
  // Porte não usa cor: a magnitude é dita pela quantidade de traços cheios.
  // Verde/laranja/vermelho ficam reservados para status e prazo.
  const bars = [1,2,3].map(i => `<i class="${i <= n ? 'fill' : ''}"></i>`).join('');
  return `<span class="tag tag-size"><span class="bars" aria-hidden="true">${bars}</span>${esc(SIZE_LABELS[sz] || 'Médio')}</span>`;
}

const ICO_CAL = `<svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><rect x="1.2" y="2.4" width="9.6" height="8.4" rx="2" stroke="currentColor" stroke-width="1.14"/><path d="M1.2 5h9.6M4 1.2v2M8 1.2v2" stroke="currentColor" stroke-width="1.14" stroke-linecap="round"/></svg>`;
const ICO_EYE = `<svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M.9 6S2.8 2.6 6 2.6 11.1 6 11.1 6 9.2 9.4 6 9.4.9 6 .9 6z" stroke="currentColor" stroke-width="1.14"/><circle cx="6" cy="6" r="1.5" stroke="currentColor" stroke-width="1.14"/></svg>`;

function cardHTML(t) {
  const done = t.status === 'concluído';
  const prog = t.status === 'em andamento';
  const ds   = dueStatus(t.dueDate, t.status);
  const late = ds && ds.kind === 'overdue';

  const resp = Array.isArray(t.responsible) ? t.responsible : [t.responsible].filter(Boolean);
  const avs  = resp.map(n => avHTML(n, 24)).join('');
  const names = resp.length > 2
    ? `${esc(resp[0].split(' ')[0])} +${resp.length - 1}`
    : esc(resp.map(n => n.split(' ')[0]).join(', '));

  const mine = canEdit(t);
  const sInk = done ? 'var(--grn-i)' : prog ? 'var(--acc-i)' : 'var(--org-i)';
  const sBg  = done ? 'var(--grn-t)' : prog ? 'var(--acc-t)' : 'var(--org-t)';
  const statusLabel = done ? 'Concluído' : prog ? 'Em andamento' : 'Pendente';
  // Demanda de outra pessoa mostra o status como etiqueta, não como controle:
  // um dropdown que recusa o clique é pior do que um dropdown que não existe.
  const statusSelect = mine
    ? `<span class="status-wrap" style="--s-ink:${sInk};--s-bg:${sBg}">
        <select class="status-select" onchange="setStatus(${t.id}, this.value)" aria-label="Status de ${attr(t.title)}">
          ${[['pendente','Pendente'],['em andamento','Em andamento'],['concluído','Concluído']]
            .map(([v,l]) => `<option value="${v}"${t.status === v ? ' selected' : ''}>${l}</option>`).join('')}
        </select>
        <svg class="status-caret" width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true"><path d="M1.5 3l3 3 3-3" stroke="currentColor" stroke-width="0.85" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>`
    : `<span class="status-static" style="--s-ink:${sInk};--s-bg:${sBg}">${statusLabel}</span>`;

  // Prazo: o número de dias é informação, não enfeite. A etiqueta traz
  // símbolo + palavra, então nunca depende só da cor.
  let dueTag = '';
  if (late) {
    dueTag = `<span class="tag tag-late"><svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1.5l5 9H1l5-9z" stroke="currentColor" stroke-width="1.14" stroke-linejoin="round"/><path d="M6 5v2.3" stroke="currentColor" stroke-width="1.14" stroke-linecap="round"/><circle cx="6" cy="8.9" r=".65" fill="currentColor"/></svg>Atrasada · ${plural(ds.days, 'dia', 'dias')}</span>`;
  } else if (ds && ds.kind === 'near') {
    const quando = ds.days === 0 ? 'hoje' : ds.days === 1 ? 'amanhã' : `em ${plural(ds.days, 'dia', 'dias')}`;
    dueTag = `<span class="tag tag-near"><svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.14"/><path d="M6 3.2V6l1.9 1.1" stroke="currentColor" stroke-width="1.14" stroke-linecap="round" stroke-linejoin="round"/></svg>Entrega ${quando}</span>`;
  }

  const dueChip = t.dueDate
    ? `<span class="meta-chip${late ? ' is-late' : ds && ds.kind === 'near' ? ' is-near' : ''}">${ICO_CAL}Entrega ${fmtDate(t.dueDate)}</span>` : '';
  const presChip = t.presentDate
    ? `<span class="meta-chip">${ICO_EYE}Apresentação ${fmtDate(t.presentDate)}</span>` : '';

  const wonTag = t.won
    ? `<span class="tag tag-won"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 3h6l-.5 3.5h-5L2 3z" stroke="currentColor" stroke-width="0.95"/><path d="M3.5 7h3M2 3.5C1 3.5.8 5 2 5M8 3.5c1 0 1.2 1.5 0 1.5" stroke="currentColor" stroke-width="0.95" stroke-linecap="round"/></svg>Ganha</span>`
    : '';

  return `<article class="card${done ? ' is-done' : ''}${late ? ' is-late' : ''}">
    <div class="card-row">
      <div class="card-body">
        <div class="title-row">
          <h3 class="card-title">${esc(t.title)}</h3>
          ${dueTag}${wonTag}${sizeTag(t.size || 'M')}
        </div>
        ${t.description ? `<p class="card-desc">${esc(t.description)}</p>` : ''}
        <div class="card-meta">
          ${statusSelect}
          <span class="meta-chip"><span class="avatars">${avs}</span><span class="resp-names">${names}</span></span>
          ${dueChip}${presChip}
        </div>
      </div>
      <div class="card-acts">
        ${mine ? `
        <button type="button" class="act" onclick="openModal(${t.id})" aria-label="Editar ${attr(t.title)}">
          <svg width="14" height="14" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M9 1.5l2.5 2.5-7.5 7.5H1.5v-2.5l7.5-7.5z" stroke="currentColor" stroke-width="1.24" stroke-linejoin="round"/></svg>
        </button>
        <button type="button" class="act act-del" onclick="delTask(${t.id})" aria-label="Remover ${attr(t.title)}">
          <svg width="14" height="14" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2 3.5h9M5 3.5V2h3v1.5M5 6v4M8 6v4M3 3.5l.5 7h6l.5-7" stroke="currentColor" stroke-width="1.24" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>` : `
        <span class="act-lock" title="Você não está entre os responsáveis">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><rect x="2.5" y="5.8" width="8" height="5.7" rx="1.6" stroke="currentColor" stroke-width="1.24"/><path d="M4.4 5.8V4.2a2.1 2.1 0 0 1 4.2 0v1.6" stroke="currentColor" stroke-width="1.24" stroke-linecap="round"/></svg>
          <span class="sr-only">Só quem está entre os responsáveis edita esta demanda</span>
        </span>` }
      </div>
    </div>
  </article>`;
}

// ═══════════════════════════════════════════════════
//  MODAIS
//  Toda janela tem saída óbvia: botão de fechar, clique fora e Esc.
//  O foco entra na janela ao abrir e volta para onde estava ao fechar.
// ═══════════════════════════════════════════════════
const modalStack = [];
const FOCUSABLE = 'button:not([disabled]),input:not([type="hidden"]),select,textarea,a[href],[tabindex]:not([tabindex="-1"])';

function openOverlay(id, firstSel) {
  const ov = document.getElementById(id);
  modalStack.push({id, prev: document.activeElement});
  ov.hidden = false;
  const first = (firstSel && ov.querySelector(firstSel)) || ov.querySelector(FOCUSABLE);
  setTimeout(() => first?.focus(), 30);
}
function closeOverlay(id) {
  const ov = document.getElementById(id);
  ov.hidden = true;
  const i = modalStack.findIndex(m => m.id === id);
  if (i > -1) { modalStack.splice(i, 1)[0].prev?.focus?.(); }
}

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (dockOpen) { closeDock(); return; }
  if (!document.getElementById('moreMenu').hidden) { closeMore(); document.getElementById('btnAccount').focus(); return; }
  const top = modalStack[modalStack.length - 1];
  if (top && top.id === 'askOverlay') { askResolve(false); return; }
  if (top) closeOverlay(top.id);
});

// Tab circula dentro da janela aberta em vez de escapar para a página atrás.
document.addEventListener('keydown', e => {
  if (e.key !== 'Tab' || !modalStack.length) return;
  const ov = document.getElementById(modalStack[modalStack.length - 1].id);
  const items = [...ov.querySelectorAll(FOCUSABLE)].filter(el => el.offsetParent !== null);
  if (!items.length) return;
  const first = items[0], last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

// ═══════════════════════════════════════════════════
//  AÇÕES DE DEMANDA
// ═══════════════════════════════════════════════════
function setStatus(id, value) {
  const t = tasks.find(x => x.id === id);
  if (!t || t.status === value) return;
  if (!canEdit(t)) { render(); return denied('Esta demanda não é sua.'); }
  t.status = value;
  addLog('status', `"${t.title}" → ${value}`);
  saveTaskNode(t); saveLog(); render();
}

function delTask(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  if (!canEdit(t)) return denied('Esta demanda não é sua.');
  const pos = tasks.indexOf(t);
  tasks = tasks.filter(x => x.id !== id);
  addLog('delete', `"${t.title}" removida`);
  removeTaskNode(id); saveLog(); render();
  toast(`"${t.title}" removida.`, {
    action: 'Desfazer',
    ms: 9000,
    onAction: () => {
      tasks.splice(pos, 0, t);          // volta para o mesmo lugar da lista
      addLog('create', `"${t.title}" restaurada`);
      saveTaskNode(t); saveLog(); render();
      toast(`"${t.title}" de volta.`, {tone: 'ok', ms: 2600});
    },
  });
}

function openModal(id) {
  const t = id ? tasks.find(x => x.id === id) : null;
  if (t && !canEdit(t)) return denied('Esta demanda não é sua.');
  document.getElementById('taskModalTitle').textContent = t ? 'Editar demanda' : 'Nova demanda';
  document.getElementById('eId').value      = t ? t.id : '';
  document.getElementById('fTitle').value   = t ? t.title : '';
  document.getElementById('fDesc').value    = t ? (t.description || '') : '';
  document.getElementById('fCat').innerHTML = CATS.map(c => `<option value="${c}"${t && t.category === c ? ' selected' : ''}>${c}</option>`).join('');
  document.getElementById('fStatus').value  = t ? t.status : 'pendente';
  document.getElementById('fDate').value    = t ? (t.dueDate || '') : '';
  document.getElementById('fPresent').value = t ? (t.presentDate || '') : '';
  document.getElementById('fSize').value    = t ? (t.size || 'M') : 'M';
  document.getElementById('fWon').checked   = t ? !!t.won : false;
  selectedResp = t ? [...(t.responsible || [])] : [];
  document.getElementById('multiDrop').hidden = true;
  document.getElementById('multiWrap').setAttribute('aria-expanded', 'false');
  renderMulti();
  openOverlay('taskOverlay', '#fTitle');
}
function closeTask() { closeOverlay('taskOverlay'); }

function renderMulti() {
  const wrap = document.getElementById('multiWrap');
  wrap.innerHTML = selectedResp.length
    ? selectedResp.map(n => `<span class="chip">${esc(n)}
        <button type="button" class="chip-x" onclick="event.stopPropagation();rmResp('${attr(n)}')" aria-label="Tirar ${attr(n)}">
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="currentColor" stroke-width="0.95" stroke-linecap="round"/></svg>
        </button></span>`).join('')
    : `<span class="multi-ph">Ninguém definido</span>`;

  // Quem está oculto sai da lista, a não ser que já seja responsável por esta
  // demanda — senão editar uma demanda antiga apagaria a pessoa dela sem querer.
  document.getElementById('multiDrop').innerHTML = team
    .filter(m => !m.hidden || selectedResp.includes(m.name))
    .map(m => {
    const sel = selectedResp.includes(m.name);
    return `<button type="button" class="mopt${sel ? ' sel' : ''}" onclick="togResp('${attr(m.name)}')" aria-pressed="${sel}">
      <span class="mopt-check" aria-hidden="true">${sel ? '<svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2l2.3 2.3 4.7-4.9" stroke="currentColor" stroke-width="1.14" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}</span>
      ${esc(m.name)}</button>`;
  }).join('');
}
function toggleDrop() {
  const d = document.getElementById('multiDrop');
  d.hidden = !d.hidden;
  document.getElementById('multiWrap').setAttribute('aria-expanded', String(!d.hidden));
}
function togResp(n) { selectedResp = selectedResp.includes(n) ? selectedResp.filter(x => x !== n) : [...selectedResp, n]; renderMulti(); }
function rmResp(n)  { selectedResp = selectedResp.filter(x => x !== n); renderMulti(); }

function saveTask() {
  const title = document.getElementById('fTitle').value.trim();
  if (!title) {
    toast('A demanda precisa de um título.', {tone: 'warn', ms: 3500});
    document.getElementById('fTitle').focus();
    return;
  }
  const id = document.getElementById('eId').value;
  const payload = {
    title,
    description: document.getElementById('fDesc').value.trim(),
    category:    document.getElementById('fCat').value,
    responsible: [...selectedResp],
    status:      document.getElementById('fStatus').value,
    dueDate:     document.getElementById('fDate').value,
    presentDate: document.getElementById('fPresent').value,
    size:        document.getElementById('fSize').value,
    won:         document.getElementById('fWon').checked,
  };
  let saved;
  if (id) {
    saved = tasks.find(x => x.id === Number(id));
    if (!canEdit(saved)) return denied('Esta demanda não é sua.');
    // Quem não é administrador não pode se tirar da demanda e perder o acesso.
    if (!isAdmin() && !payload.responsible.includes(session.memberName)) {
      return denied('Você precisa continuar entre os responsáveis desta demanda.');
    }
    Object.assign(saved, payload);
    addLog('edit', `"${title}" editada`);
  } else {
    // Demanda nova sem responsável nenhum fica com quem criou.
    if (!payload.responsible.length) payload.responsible = [session.memberName];
    saved = {id: Math.max(0, ...tasks.map(t => t.id)) + 1, ...payload};
    tasks.push(saved);
    addLog('create', `"${title}" criada`);
  }
  closeTask();
  saveTaskNode(saved); saveLog(); render();
}

// ═══════════════════════════════════════════════════
//  TIME
// ═══════════════════════════════════════════════════
function openTeam() {
  if (!isAdmin()) return denied('Só administradores editam o time.');
  draftTeam = team.map(m => ({...m}));
  renderTeamList();
  openOverlay('teamOverlay');
}
function closeTeam() { closeOverlay('teamOverlay'); }

function renderTeamList() {
  document.getElementById('teamList').innerHTML = draftTeam.map((m, i) => {
    const inner = m.svg ? `<img src="${attr(m.svg)}" alt=""/>` : esc(avInits(m.name));
    return `<div class="team-item">
      <button type="button" class="av" style="width:30px;height:30px;font-size:11px;background:${attr(m.color)};color:${inkOn(m.color)};border-color:transparent"
              onclick="openAvEdit(${i},'team')" aria-label="Editar avatar de ${attr(m.name)}">${inner}</button>
      <input type="text" value="${attr(m.name)}" aria-label="Nome da pessoa ${i + 1}" oninput="draftTeam[${i}].name=this.value"/>
      <button type="button" class="team-eye${m.hidden ? ' is-off' : ''}" onclick="toggleDraftHidden(${i})"
              aria-pressed="${!!m.hidden}" title="${m.hidden ? 'Mostrar' : 'Ocultar'} ${attr(m.name)}"
              aria-label="${m.hidden ? 'Mostrar' : 'Ocultar'} ${attr(m.name)}">${m.hidden ? OLHO_OFF : OLHO}</button>
      <button type="button" class="team-del" onclick="delMember(${i})" aria-label="Remover ${attr(m.name)}">
        <svg width="14" height="14" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2 3.5h9M5 3.5V2h3v1.5M3 3.5l.5 7h6l.5-7" stroke="currentColor" stroke-width="1.24" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>`;
  }).join('');
}
function addMember() {
  draftTeam.push({name:'', color: PALETTE[draftTeam.length % PALETTE.length], svg:null, startDate:'', role:''});
  renderTeamList();
  document.querySelector('#teamList .team-item:last-child input')?.focus();
}
function delMember(i) { draftTeam.splice(i, 1); renderTeamList(); }
/** Ocultar no rascunho do editor; só vale quando o admin salvar o time. */
function toggleDraftHidden(i) {
  if (!draftTeam[i]) return;
  draftTeam[i].hidden = !draftTeam[i].hidden;
  renderTeamList();
}
function saveTeam() {
  const clean = draftTeam.filter(m => m.name.trim()).map(m => ({...m, name: m.name.trim()}));
  if (!clean.length) { toast('O time precisa de pelo menos uma pessoa.', {tone:'warn', ms:3500}); return; }
  team = clean;
  if (!teamVisivel().some(m => m.name === fResp)) fResp = 'TIME';
  addLog('team', 'Time atualizado');
  closeTeam();
  saveTeam2(); saveLog(); buildFilters(); render();
}

// ═══════════════════════════════════════════════════
//  EDITOR DE AVATAR
// ═══════════════════════════════════════════════════
function openAvForName(name) {
  const idx = (modalStack.some(m => m.id === 'teamOverlay') ? draftTeam : team).findIndex(m => m.name === name);
  if (idx < 0) return;
  openAvEdit(idx, modalStack.some(m => m.id === 'teamOverlay') ? 'team' : 'direct');
}
function openAvForNameFromProfile(name) {
  const idx = team.findIndex(m => m.name === name);
  if (idx > -1) openAvEdit(idx, 'direct');
}
function openAvEdit(idx, ctx) {
  editingAvIdx  = idx;
  avEditContext = ctx;
  const m = (ctx === 'team' ? draftTeam : team)[idx];
  avDraftColor = m.color;
  avDraftSvg   = m.svg;
  document.getElementById('colorSwatches').innerHTML = PALETTE.map(c =>
    `<button type="button" class="swatch" style="background:${c}" onclick="setAvColor('${c}')"
      aria-pressed="${c.toLowerCase() === (m.color || '').toLowerCase()}" aria-label="Cor ${c}"></button>`).join('');
  document.getElementById('customColor').value = /^#[0-9a-f]{6}$/i.test(m.color || '') ? m.color : '#888888';
  document.getElementById('removeSvgBtn').hidden = !avDraftSvg;
  updateAvPreview();
  openOverlay('avOverlay');
}
function closeAv() { closeOverlay('avOverlay'); }
function setAvColor(c) {
  avDraftColor = c;
  document.querySelectorAll('#colorSwatches .swatch').forEach(s =>
    s.setAttribute('aria-pressed', String(s.style.backgroundColor === hexToRgb(c))));
  updateAvPreview();
}
function hexToRgb(h) {
  const m = /^#?([0-9a-f]{6})$/i.exec(h);
  if (!m) return h;
  const n = parseInt(m[1], 16);
  return `rgb(${n >> 16 & 255}, ${n >> 8 & 255}, ${n & 255})`;
}
function updateAvPreview() {
  const src = (avEditContext === 'team' ? draftTeam : team)[editingAvIdx];
  const el  = document.getElementById('avPreviewLg');
  el.style.background = avDraftColor;
  el.style.color = inkOn(avDraftColor);
  el.innerHTML = avDraftSvg ? `<img src="${attr(avDraftSvg)}" alt=""/>` : esc(avInits(src?.name || ''));
  el.setAttribute('aria-label', `Prévia do avatar de ${src?.name || ''}`);
}
function removeAvSvg() {
  avDraftSvg = null;
  document.getElementById('removeSvgBtn').hidden = true;
  updateAvPreview();
}
function handleSvg(e) {
  const f = e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = ev => { avDraftSvg = ev.target.result; document.getElementById('removeSvgBtn').hidden = false; updateAvPreview(); };
  r.readAsDataURL(f);
}
function saveAv() {
  const list = avEditContext === 'team' ? draftTeam : team;
  const m = list[editingAvIdx];
  if (m) { m.color = avDraftColor; m.svg = avDraftSvg; }
  closeAv();
  if (avEditContext === 'team') renderTeamList();
  else {
    addLog('team', `Avatar de ${m?.name} atualizado`);
    saveTeam2(); saveLog(); buildFilters(); render();
    refreshOpenPanels();   // sem isto a cor salvava e a tela continuava a antiga
  }
}

// ═══════════════════════════════════════════════════
//  LOG
// ═══════════════════════════════════════════════════
const LOG_COLORS = {create:'var(--grn)', edit:'var(--acc)', status:'var(--org)', delete:'var(--red)', team:'var(--pur)'};
const LOG_NAMES  = {create:'criação', edit:'edição', status:'mudança de status', delete:'exclusão', team:'time'};

function addLog(type, msg) {
  log.unshift({type, msg, ts: Date.now()});
  if (log.length > 200) log.length = 200;
}
function openLog() {
  document.getElementById('logCount').textContent = log.length
    ? plural(log.length, 'registro', 'registros')
    : 'Nada registrado ainda.';
  document.getElementById('logList').innerHTML = log.length
    ? log.map(e => `<div class="log-entry">
        <span class="log-dot" style="background:${LOG_COLORS[e.type] || 'var(--txs)'}" aria-hidden="true"></span>
        <span class="log-msg"><span class="sr-only">${LOG_NAMES[e.type] || ''}: </span>${esc(e.msg)}</span>
        <span class="log-ts">${new Date(e.ts).toLocaleString('pt-BR', {day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit'})}</span>
      </div>`).join('')
    : '';
  openOverlay('logOverlay');
}
function closeLog() { closeOverlay('logOverlay'); }
function clearLog() {
  if (!log.length) return;
  if (!isAdmin()) return denied('Só administradores limpam o histórico.');
  ask('Limpar o histórico?', 'Todos os registros de atividade somem. Isso não pode ser desfeito.',
      'Limpar', true).then(sim => {
    if (!sim) return;
    log = [];
    saveLog();
    closeLog();
    toast('Histórico limpo.', {ms: 3000});
  });
}

// ═══════════════════════════════════════════════════
//  PERFIS
// ═══════════════════════════════════════════════════
function memberStats(name) {
  const mine   = tasks.filter(t => (t.responsible || []).includes(name));
  const active = mine.filter(t => t.status !== 'concluído');
  return {
    total:  mine.length,
    active: active.length,
    done:   mine.length - active.length,
    won:    mine.filter(t => t.won).length,
    weight: active.reduce((s,t) => s + (SIZE_WEIGHT[t.size] || 2), 0),
  };
}

function openProfiles() {
  if (!isAdmin()) return denied('Perfis do time é um painel de administrador. O seu está em “Meu perfil”.');
  renderProfiles();
  openOverlay('profilesOverlay');
}
function closeProfiles() { closeOverlay('profilesOverlay'); }

function renderProfiles() {
  const grid = document.getElementById('profilesGrid');
  if (!grid) return;
  const accounts = Object.values(allUsers());

  // O índice é o da posição real em `team` — os campos editáveis escrevem por
  // ele. Ocultos vão para o fim da grade, mas guardando o índice de origem.
  const ordem = team.map((m, i) => ({m, i}))
    .sort((a, b) => (a.m.hidden ? 1 : 0) - (b.m.hidden ? 1 : 0));

  grid.innerHTML = ordem.map(({m, i}) => {
    const st   = memberStats(m.name);
    const acc  = accounts.find(u => (u.memberName || u.name) === m.name);
    const mine = isAdmin();          // painel de administrador: edita todos
    const pct  = st.total ? Math.round(st.done / st.total * 100) : 0;

    return `<article class="profile${mine ? '' : ' is-locked'}${m.hidden ? ' is-hidden' : ''}">
      <header class="profile-hd">
        ${avatarButton(m, mine)}
        <div class="profile-id">
          <h3 class="profile-name">${esc(m.name)}</h3>
          <div class="profile-sub">
            ${m.hidden
              ? `<span class="profile-tag is-off">oculto</span>`
              : acc
                ? `<span class="profile-tag${acc.admin ? ' is-admin' : ''}" title="${attr(acc.email)}">${acc.admin ? 'admin' : 'conta'}</span>`
                : `<span class="profile-tag is-none" title="Ainda não criou conta">sem conta</span>`}
            <input type="text" class="profile-role" value="${attr(m.role || '')}" placeholder="Cargo / função"
                   aria-label="Cargo de ${attr(m.name)}" ${mine ? '' : 'disabled'}
                   oninput="setMemberField(${i},'role',this.value)" onchange="commitTeam()" onblur="commitTeam()"/>
          </div>
        </div>
        ${mine ? `<button type="button" class="profile-eye${m.hidden ? ' is-off' : ''}" onclick="toggleMemberHidden(${i})"
              aria-pressed="${!!m.hidden}"
              title="${m.hidden ? 'Mostrar ' + attr(m.name) + ' nos filtros' : 'Ocultar ' + attr(m.name) + ' sem apagar as demandas'}"
              aria-label="${m.hidden ? 'Mostrar' : 'Ocultar'} ${attr(m.name)}">${m.hidden ? OLHO_OFF : OLHO}</button>` : ''}
      </header>

      <div class="profile-body">
        <div class="profile-field">
          <label for="start-${i}">Entrou na naSala</label>
          <div class="date-row">
            <input type="date" class="profile-date" id="start-${i}" value="${attr(m.startDate || '')}"
                   max="${new Date().toISOString().slice(0,10)}" ${mine ? '' : 'disabled'}
                   oninput="setStartDate(${i}, this.value)" onchange="commitTeam()"/>
            <span class="tenure-val" id="tenure-${i}">${esc(calcTenure(m.startDate))}</span>
          </div>
        </div>

        <div class="profile-progress">
          <div class="pp-head">
            <span>${st.done} de ${st.total} entregues</span>
            <span class="pp-pct">${pct}%</span>
          </div>
          <div class="pp-track"><div class="pp-fill" style="width:${pct}%"></div></div>
        </div>

        <dl class="metrics">
          ${metricHTML('Abertas',   st.active, 'var(--org-i)')}
          ${metricHTML('Entregues', st.done,   'var(--grn-i)')}
          ${metricHTML('Total',     st.total,  'var(--tx)')}
        </dl>

        ${isAdmin() && acc ? `<div class="profile-admin">
          <label class="switch">
            <input type="checkbox" ${acc.admin ? 'checked' : ''} ${acc.uid === session.uid ? 'disabled' : ''}
                   onchange="setUserAdmin('${attr(acc.uid)}', this.checked)"/>
            <span>Administrador</span>
          </label>
          <span class="profile-email">${esc(acc.email)}</span>
        </div>` : ''}
      </div>
    </article>`;
  }).join('');
}

/**
 * Avatar + botão de editar.
 *
 * Antes o círculo INTEIRO era o botão e o lápis era enfeite por cima. No hover
 * o círculo crescia e engolia o lápis, e não dava para saber onde clicar.
 * Agora o círculo é só imagem e o lápis é o único alvo — 28px, do tamanho
 * mínimo de controle, encostado na borda mas sem sobrepor.
 */
function avatarButton(m, enabled) {
  const inner = m.svg ? `<img src="${attr(m.svg)}" alt=""/>` : esc(avInits(m.name));
  const style = `width:52px;height:52px;font-size:18px;background:${attr(m.color)};color:${inkOn(m.color)};border-color:transparent`;
  const face  = `<span class="av" style="${style}" aria-hidden="true">${inner}</span>`;
  if (!enabled) return `<span class="av-wrap">${face}</span>`;
  return `<span class="av-wrap">
    ${face}
    <button type="button" class="av-edit-btn"
            onclick="openAvForNameFromProfile('${attr(m.name)}')"
            aria-label="Trocar cor e ícone de ${attr(m.name)}"
            title="Trocar cor e ícone">
      <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M9 1.5l2.5 2.5-7.5 7.5H1.5v-2.5l7.5-7.5z" stroke="currentColor" stroke-width="1.24" stroke-linejoin="round"/></svg>
    </button>
  </span>`;
}

function metricHTML(label, val, color) {
  return `<div class="metric"><dt class="metric-l">${label}</dt><dd class="metric-v" style="color:${color}">${val}</dd></div>`;
}

// ── edição dos campos do perfil ───────────────────────────────────────────
//
// O bug antigo: `onchange` chamava renderProfiles(), que refazia a grade
// inteira e destruía o próprio campo que estava sendo digitado. O foco pulava
// fora no meio da data e parecia que nada tinha sido salvo. Agora o campo
// sobrevive: só o texto de tempo de casa é atualizado, e a gravação é adiada
// para não mandar uma escrita por tecla.

let teamSaveTimer = null;

/**
 * Ocultar alguém do time. Só administrador, e nada é apagado: as demandas
 * dela continuam onde estavam, com o nome e o avatar de sempre. O que muda é
 * que a pessoa some da gaveta de filtro, do seletor de responsáveis e da
 * carga por pessoa. Dá para desfazer no mesmo botão.
 */
function toggleMemberHidden(i) {
  if (!isAdmin()) return denied('Só administradores ocultam perfis.');
  const m = team[i];
  if (!m) return;
  m.hidden = !m.hidden;
  if (m.hidden && fResp === m.name) fResp = 'TIME';   // senão o filtro trava
  addLog('team', `${m.name} foi ${m.hidden ? 'ocultado' : 'reexibido'} no time`);
  saveTeam2(); saveLog();
  buildFilters(); render();
  renderProfiles();
  toast(m.hidden
    ? `${m.name.split(' ')[0]} saiu dos filtros. As demandas continuam na lista.`
    : `${m.name.split(' ')[0]} voltou para os filtros.`, {ms:3200});
}

function setMemberField(i, field, value) {
  if (!team[i]) return;
  if (!isAdmin() && session?.memberName !== team[i].name) return;
  team[i][field] = value;
  queueTeamSave();
}

function setStartDate(i, value) {
  if (!team[i]) return;
  if (!isAdmin() && session?.memberName !== team[i].name) return;
  team[i].startDate = value;
  // atualiza só o texto ao lado, sem tocar no campo que está em uso
  const el = document.getElementById('tenure-' + i);
  if (el) el.textContent = calcTenure(value);
  queueTeamSave();
}

function queueTeamSave() {
  clearTimeout(teamSaveTimer);
  showSync('saving', 'Salvando…');
  teamSaveTimer = setTimeout(commitTeam, 700);
}
function commitTeam() {
  clearTimeout(teamSaveTimer);
  saveTeam2();
  buildFilters();
}

/** Administrador aponta a conta de alguém para outra pessoa do time. */
function setUserMember(uid, memberName) {
  if (!isAdmin()) return denied('Só administradores mudam isso.');
  const map = allUsers();
  if (!map[uid]) return;
  users = {...map, [uid]: {...map[uid], memberName}};
  saveUsers();
  syncUserFromStore();
  renderProfiles();
}

// ═══════════════════════════════════════════════════
//  MEU PERFIL
//  Cada pessoa vê e edita o próprio cadastro aqui. "Perfis do time" continua
//  existindo, mas passa a ser painel de administrador: ver e editar o cadastro
//  dos outros é tarefa de quem administra, não de todo mundo.
// ═══════════════════════════════════════════════════
function openMe() {
  if (!session) return;
  renderMe();
  openOverlay('meOverlay');
}
function closeMe() { closeOverlay('meOverlay'); }

function myMember() {
  const i = team.findIndex(m => m.name === session.memberName);
  return {i, m: team[i] || {name: session.memberName, color:'#8E8E93', svg:null, startDate:'', role:''}};
}

function renderMe() {
  const el = document.getElementById('meBody');
  if (!el || !session) return;
  const {i, m} = myMember();
  const st = memberStats(m.name);
  const pct = st.total ? Math.round(st.done / st.total * 100) : 0;

  const abertas = sortTasks(tasks.filter(t =>
    (t.responsible || []).includes(m.name) && t.status !== 'concluído'));

  el.innerHTML = `
    <header class="me-hd">
      ${avatarButton(m, i > -1)}
      <div class="me-id">
        <h3 class="me-name">${esc(m.name)}</h3>
        <p class="me-mail">${esc(session.email)}</p>
      </div>
      <span class="profile-tag${session.admin ? ' is-admin' : ''}">${session.admin ? 'administrador' : 'conta'}</span>
    </header>

    <div class="me-fields">
      <div class="profile-field">
        <label for="meRole">Cargo</label>
        <input type="text" id="meRole" class="me-input" value="${attr(m.role || '')}" placeholder="Cargo / função"
               oninput="setMemberField(${i},'role',this.value)" onchange="commitTeam()" onblur="commitTeam()"/>
      </div>
      <div class="profile-field">
        <label for="meStart">Entrou na naSala</label>
        <div class="date-row">
          <input type="date" id="meStart" class="profile-date" value="${attr(m.startDate || '')}"
                 max="${new Date().toISOString().slice(0,10)}"
                 oninput="setStartDate(${i}, this.value)" onchange="commitTeam()"/>
          <span class="tenure-val" id="tenure-${i}">${esc(calcTenure(m.startDate))}</span>
        </div>
      </div>
    </div>

    <div class="profile-progress">
      <div class="pp-head"><span>${st.done} de ${st.total} entregues</span><span class="pp-pct">${pct}%</span></div>
      <div class="pp-track"><div class="pp-fill" style="width:${pct}%"></div></div>
    </div>

    <dl class="metrics">
      ${metricHTML('Abertas',   st.active, 'var(--org-i)')}
      ${metricHTML('Entregues', st.done,   'var(--grn-i)')}
      ${metricHTML('Total',     st.total,  'var(--tx)')}
    </dl>

    <section class="me-open">
      <h4>Na sua mão agora</h4>
      ${abertas.length
        ? `<ul class="me-list">${abertas.slice(0, 8).map(t => {
            const ds = dueStatus(t.dueDate, t.status);
            const late = ds && ds.kind === 'overdue';
            return `<li>
              <button type="button" class="me-item" onclick="closeMe();openModal(${t.id})">
                <span class="me-item-title">${esc(t.title)}</span>
                ${late ? `<span class="tag tag-late">${plural(ds.days,'dia','dias')}</span>`
                       : t.dueDate ? `<span class="me-item-date">${fmtDate(t.dueDate)}</span>` : ''}
              </button></li>`;
          }).join('')}</ul>${abertas.length > 8 ? `<p class="me-more">e mais ${abertas.length - 8}</p>` : ''}`
        : `<p class="me-none">Nada em aberto. Bom trabalho.</p>`}
    </section>

    <div class="me-actions">
      <button class="btn btn-danger" onclick="signOut()">
        <svg width="14" height="14" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M5 1.8H2.6A1.1 1.1 0 0 0 1.5 2.9v7.2a1.1 1.1 0 0 0 1.1 1.1H5" stroke="currentColor" stroke-width="1.24" stroke-linecap="round"/><path d="M8.4 9.1L11 6.5 8.4 3.9M11 6.5H4.8" stroke="currentColor" stroke-width="1.24" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Sair
      </button>
    </div>
    <button class="me-delete" onclick="deleteMyAccount()">Excluir minha conta</button>`;
}

/**
 * Quem cria conta tem de poder apagá-la. Aqui é perda inesperada e sem volta,
 * então esta é uma das poucas ações que ainda pedem confirmação modal.
 */
function deleteMyAccount() {
  const map = allUsers();
  const admins = Object.values(map).filter(u => u.admin);
  if (session.admin && admins.length <= 1) {
    return denied('Você é o único administrador. Promova outra pessoa antes de sair.');
  }
  ask('Excluir sua conta?',
      'Você perde o acesso ao quadro. As demandas continuam lá, com seu nome. Isso não pode ser desfeito.',
      'Excluir conta', true).then(sim => {
    if (!sim) return;
    const {[session.uid]: _, ...rest} = allUsers();
    users = rest;
    addLog('team', `${session.name} excluiu a própria conta`);
    saveUsers(); saveLog();
    closeMe();
    signOut();
    toast('Conta excluída.', {ms: 4000});
  });
}

// ═══════════════════════════════════════════════════
//  DASHBOARD
//
//  Regras de gráfico que este bloco segue:
//  · Cor de status (verde/azul/laranja/vermelho) só aparece onde significa
//    status. Grandeza — carga por pessoa — usa tinta neutra: o comprimento da
//    barra já é a medida, pintar de colorido roubaria o significado da cor.
//  · Nada é dito só pela cor: toda marca tem rótulo e número visíveis.
//  · Sequencial é um matiz só, do claro ao escuro. Nunca arco-íris.
//  · A paleta foi validada: separação para daltonismo ΔE 12,1 (deutan), bem
//    acima do piso de 8.
// ═══════════════════════════════════════════════════

const MESES = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];

let dashAno = 'todos';   // 'todos' | 2025 | 2026 …

/** Anos presentes nos dados, do mais recente para o mais antigo. */
function anosComDados() {
  const anos = new Set();
  tasks.forEach(t => { if (t.dueDate) anos.add(Number(t.dueDate.slice(0, 4))); });
  return [...anos].filter(Boolean).sort((a, b) => b - a);
}
const doAno = t => dashAno === 'todos' || (t.dueDate && Number(t.dueDate.slice(0, 4)) === dashAno);

function setDashAno(v) {
  dashAno = v === 'todos' ? 'todos' : Number(v);
  renderDashboard();
}

/**
 * Rampa de volume, com a paleta de referência do cliente:
 *   menos ← Mint #66D4CF · Green #32D74B · Yellow #FFD60A · Orange #FF9F0A → mais
 *
 * Cada barra recebe DUAS cores: a da sua posição na rampa e a do passo
 * seguinte, num gradiente vertical.
 *
 * Nota honesta: esta rampa não é monotônica em luminosidade — o amarelo é
 * mais claro que os vizinhos. Isso só é aceitável porque aqui a cor é
 * REFORÇO, não o canal da medida: quem mede é a altura da barra, e cada mês
 * tem o número no tooltip e na lista para leitor de tela. Não reaproveite
 * esta rampa em mapa de calor ou qualquer gráfico onde a cor seja a medida.
 */
const RAMPA = [[102,212,207], [50,215,75], [255,214,10], [255,159,10]];

function rampa4(t) {
  const x = Math.min(1, Math.max(0, t)) * (RAMPA.length - 1);
  const i = Math.min(RAMPA.length - 2, Math.floor(x));
  const f = x - i;
  const a = RAMPA[i], b = RAMPA[i + 1];
  return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * f)).join(',')})`;
}

/** Duas cores por mês: a posição do volume e o passo seguinte. */
function gradienteVolume(t) {
  return `linear-gradient(to top, ${rampa4(t)}, ${rampa4(Math.min(1, t + 0.16))})`;
}

function openDashboard() { renderDashboard(); openOverlay('dashOverlay'); }
function closeDashboard() { closeOverlay('dashOverlay'); }

function renderDashboard() {
  const el = document.getElementById('dashBody');
  if (!el) return;

  const escopo = tasks.filter(doAno);
  const done = escopo.filter(t => t.status === 'concluído').length;
  const prog = escopo.filter(t => t.status === 'em andamento').length;
  const late = escopo.filter(t => (dueStatus(t.dueDate, t.status) || {}).kind === 'overdue').length;
  const open = escopo.length - done;
  const pend = open - prog;

  el.innerHTML =
      anoFiltroHTML()
    + tilesHTML({open, late, done, total: escopo.length})
    + monthlyChartHTML(escopo)
    + `<div class="dash-row">${statusPanelHTML({done, prog, pend})}${housePanelHTML(escopo)}</div>`
    // Carga é medida de AGORA — quantas cada pessoa tem em aberto hoje. Num
    // recorte de ano passado ela não quer dizer nada, então não aparece.
    + (dashAno === 'todos' ? loadPanelHTML(escopo) : '');

  wireChartHover();
}

function anoFiltroHTML() {
  const anos = anosComDados();
  if (anos.length < 2) return '';
  const item = (v, rot) => `<button type="button" class="yr${String(dashAno) === String(v) ? ' is-on' : ''}"
      onclick="setDashAno('${v}')" aria-pressed="${String(dashAno) === String(v)}">${rot}</button>`;
  return `<div class="yr-bar" role="group" aria-label="Filtrar o dashboard por ano">
    ${item('todos', 'Tudo')}${anos.map(a => item(a, a)).join('')}
  </div>`;
}

/* ── números de cabeçalho ───────────────────────────────────────────── */
function tilesHTML({open, late, done, total}) {
  // Só "Atrasadas" é bloco tingido, e só quando existe alguma. Três blocos
  // coloridos lado a lado anulam uns aos outros; um só diz onde olhar.
  const tile = (n, label, ink, tint, icon, hint, alerta) => `
    <div class="tile${alerta ? ' is-alert' : ''}" style="--t-ink:${ink};--t-tint:${tint}">
      <span class="tile-ico" aria-hidden="true">${icon}</span>
      <span class="tile-n">${n}</span>
      <span class="tile-l">${label}</span>
      ${hint ? `<span class="tile-hint">${hint}</span>` : ''}
    </div>`;
  return `<div class="tiles">
    ${tile(open, 'Em aberto', 'var(--org-i)', 'var(--org-t)',
      '<svg width="15" height="15" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="currentColor" stroke-width="1.24"/><path d="M6.5 3.4v3.1l2 1.2" stroke="currentColor" stroke-width="1.24" stroke-linecap="round" stroke-linejoin="round"/></svg>')}
    ${tile(late, 'Atrasadas', 'var(--red-i)', 'var(--red-t)',
      '<svg width="15" height="15" viewBox="0 0 13 13" fill="none"><path d="M6.5 1.6l5.4 9.8H1.1l5.4-9.8z" stroke="currentColor" stroke-width="1.24" stroke-linejoin="round"/><path d="M6.5 5.4v2.5" stroke="currentColor" stroke-width="1.24" stroke-linecap="round"/><circle cx="6.5" cy="9.6" r=".75" fill="currentColor"/></svg>',
      late ? 'precisam de atenção' : 'nada atrasado', late > 0)}
    ${tile(done, 'Entregues', 'var(--grn-i)', 'var(--grn-t)',
      '<svg width="15" height="15" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="currentColor" stroke-width="1.24"/><path d="M4.2 6.7l1.7 1.7 3.2-3.5" stroke="currentColor" stroke-width="1.24" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      `${Math.round(done / (total || 1) * 100)}% ${dashAno === 'todos' ? 'da carteira' : 'do ano'}`)}
  </div>`;
}

/* ── entregas por mês: série única, um matiz só ─────────────────────── */
function monthlyChartHTML(escopo) {
  const hoje = today();
  const cols = [];
  if (dashAno === 'todos') {
    for (let i = 11; i >= 0; i--) {
      const d = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
      cols.push({y: d.getFullYear(), m: d.getMonth(), n: 0});
    }
  } else {
    for (let m = 0; m < 12; m++) cols.push({y: dashAno, m, n: 0});
  }

  escopo.forEach(t => {
    if (t.status !== 'concluído' || !t.dueDate) return;
    const d = parseLocalDate(t.dueDate);
    const c = cols.find(c => c.y === d.getFullYear() && c.m === d.getMonth());
    if (c) c.n++;
  });

  const max = Math.max(1, ...cols.map(c => c.n));
  const total = cols.reduce((s, c) => s + c.n, 0);
  const periodo = dashAno === 'todos' ? 'nos últimos 12 meses' : `em ${dashAno}`;
  if (!total) return painelVazio('Entregas por mês', `Nada entregue ${periodo}.`);

  return `<section class="panel">
    <header class="panel-hd">
      <h3>Entregas por mês</h3>
      <p class="panel-sub">${plural(total, 'entrega', 'entregas')} ${periodo}</p>
    </header>
    <div class="chart" id="chartMes">
      <div class="chart-grid" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      <div class="chart-bars">
        ${cols.map(c => {
          const t = c.n / max;
          const h = c.n ? Math.max(3, Math.round(t * 100)) : 0;
          return `<div class="bar-col" data-label="${MESES[c.m]}/${String(c.y).slice(2)}" data-n="${c.n}">
            <div class="bar" style="height:${h}%;background:${c.n ? gradienteVolume(t) : 'var(--surf3)'}"></div>
            <span class="bar-x">${MESES[c.m]}</span>
          </div>`;
        }).join('')}
      </div>
      <div class="chart-tip" id="chartTip" hidden></div>
    </div>
    <p class="sr-only">${cols.map(c => `${MESES[c.m]} de ${c.y}: ${c.n}`).join('. ')}</p>
  </section>`;
}

function wireChartHover() {
  const box = document.getElementById('chartMes');
  const tip = document.getElementById('chartTip');
  if (!box || !tip) return;
  box.querySelectorAll('.bar-col').forEach(col => {
    const show = () => {
      tip.textContent = `${col.dataset.label} · ${plural(Number(col.dataset.n), 'entrega', 'entregas')}`;
      tip.hidden = false;
      const r = col.getBoundingClientRect(), b = box.getBoundingClientRect();
      tip.style.left = (r.left - b.left + r.width / 2) + 'px';
    };
    col.addEventListener('mouseenter', show);
    col.addEventListener('focus', show);
    col.addEventListener('mouseleave', () => { tip.hidden = true; });
    col.addEventListener('blur', () => { tip.hidden = true; });
    col.tabIndex = 0;
    col.setAttribute('role', 'img');
    col.setAttribute('aria-label', `${col.dataset.label}: ${col.dataset.n} entregues`);
  });
}

/* ── situação: barra 100% empilhada, com legenda ────────────────────── */
/** Painel sem dado no recorte escolhido. Barra zerada lê como defeito. */
function painelVazio(titulo, msg) {
  return `<section class="panel">
    <header class="panel-hd"><h3>${esc(titulo)}</h3></header>
    <p class="panel-empty">${esc(msg)}</p>
  </section>`;
}

function statusPanelHTML({done, prog, pend}) {
  const total = done + prog + pend || 1;
  const segs = [
    {n:done, label:'Entregues',    fill:'var(--grn)', ink:'var(--grn-i)'},
    {n:prog, label:'Em andamento', fill:'var(--acc)', ink:'var(--acc-i)'},
    {n:pend, label:'Pendentes',    fill:'var(--org)', ink:'var(--org-i)'},
  ];
  return `<section class="panel">
    <header class="panel-hd"><h3>Situação</h3>
      <p class="panel-sub">${plural(total, 'demanda', 'demandas')} no total</p></header>
    <div class="stack" role="img" aria-label="${segs.map(s => `${s.label}: ${s.n}`).join(', ')}">
      ${segs.filter(s => s.n).map(s => `<span style="flex:${s.n};background:${s.fill}"></span>`).join('')}
    </div>
    <dl class="stack-key">
      ${segs.map(s => `<div>
        <dt><span class="key-dot" style="background:${s.fill}" aria-hidden="true"></span>${s.label}</dt>
        <dd>${s.n} <small>· ${Math.round(s.n / total * 100)}%</small></dd>
      </div>`).join('')}
    </dl>
  </section>`;
}

/* ── por casa: aberto vs entregue ───────────────────────────────────── */
function housePanelHTML(escopo) {
  const rows = CATS.map(c => {
    const mine = escopo.filter(t => t.category === c);
    const d = mine.filter(t => t.status === 'concluído').length;
    return {c, total: mine.length, done: d, open: mine.length - d};
  }).filter(r => r.total).sort((a, b) => b.total - a.total);
  if (!rows.length) return painelVazio('Por casa', 'Nenhuma demanda neste recorte.');
  const max = Math.max(1, ...rows.map(r => r.total));

  return `<section class="panel">
    <header class="panel-hd"><h3>Por casa</h3>
      <p class="panel-sub">entregues e em aberto</p></header>
    <div class="house-rows">
      ${rows.map(r => `<div class="house-row">
        <span class="house-name">${markHTML(r.c, 13) || esc(r.c)}<span class="sr-only">${esc(r.c)}</span></span>
        <div class="house-track" role="img" aria-label="${esc(r.c)}: ${r.done} entregues, ${r.open} em aberto">
          ${r.done ? `<span style="flex:${r.done};background:var(--grn)"></span>` : ''}
          ${r.open ? `<span style="flex:${r.open};background:var(--org)"></span>` : ''}
          <span class="house-pad" style="flex:${max - r.total}"></span>
        </div>
        <span class="house-n">${r.total}</span>
      </div>`).join('')}
    </div>
  </section>`;
}

/* ── carga por pessoa: grandeza, então tinta neutra ─────────────────── */
function loadPanelHTML(escopo) {
  const abertasDe = n => escopo.filter(t => t.status !== 'concluído' && (t.responsible||[]).includes(n)).length;
  const rows = teamVisivel().map(m => ({...m, val: abertasDe(m.name)}))
    .sort((a, b) => b.val - a.val);
  const max = Math.max(1, ...rows.map(r => r.val));
  const avg = rows.reduce((s, r) => s + r.val, 0) / (rows.length || 1);
  if (!max || rows.every(r => !r.val)) {
    return painelVazio('Carga por pessoa',
      dashAno === 'todos' ? 'Ninguém com demanda em aberto.'
                          : `Ninguém com demanda em aberto com entrega em ${dashAno}.`);
  }

  return `<section class="panel">
    <header class="panel-hd"><h3>Carga por pessoa</h3>
      <p class="panel-sub">demandas em aberto · média de ${avg.toFixed(1)}</p></header>
    <div class="load-rows">
      ${rows.map(r => {
        const inner = r.svg ? `<img src="${attr(r.svg)}" alt=""/>` : esc(avInits(r.name));
        return `<div class="load-row">
          <span class="av" style="width:26px;height:26px;font-size:11px;background:${attr(r.color)};color:${inkOn(r.color)};border-color:transparent" aria-hidden="true">${inner}</span>
          <span class="load-name">${esc(r.name.split(' ')[0])}</span>
          <div class="load-track" role="img" aria-label="${esc(r.name)}: ${plural(r.val,'demanda em aberto','demandas em aberto')}">
            <div class="load-fill" style="width:${Math.round(r.val / max * 100)}%"></div>
          </div>
          <span class="load-n">${r.val}</span>
        </div>`;
      }).join('')}
    </div>
  </section>`;
}


// ═══════════════════════════════════════════════════
//  ATALHOS
//  Convenção de teclado do desktop: quem passa o dia no quadro não devia
//  precisar do ponteiro para buscar ou abrir uma demanda nova.
// ═══════════════════════════════════════════════════
document.addEventListener('keydown', e => {
  if (!session || modalStack.length) return;
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '');
  const cmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';

  if (cmdK || (!typing && e.key === '/')) {
    e.preventDefault();
    if (dockOpen !== 'Search') toggleDock('Search');
    else document.getElementById('srch').focus();
    return;
  }
  if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key.toLowerCase() === 'n') { e.preventDefault(); openModal(null); }
  else if (e.key.toLowerCase() === 'h') { e.preventDefault(); toggleHide(); }
});

// ═══════════════════════════════════════════════════
//  INÍCIO
// ═══════════════════════════════════════════════════
function boot() {
  loadPrefs(); applyTheme();
  if (!isFirebaseConfigured()) {
    document.getElementById('setupScreen').hidden = false;
    return;
  }
  load();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

// ═══════════════════════════════════════════════════
//  HANDLERS GLOBAIS
//  Este arquivo é um <script type="module">: as funções de topo são de módulo
//  e não são enxergadas pelos onclick inline do HTML. Toda função nova chamada
//  por onclick/onchange/oninput precisa entrar nesta lista.
// ═══════════════════════════════════════════════════
Object.assign(window, {
  // visão
  toggleHide, applyHideIcon, toggleTheme, queueRender,
  setCat, setResp, setStatusFilter, toggleSection, showMore,
  toggleDock, closeDock, clearSearch, updateDockTags, wirePillArrows,
  toggleMore, closeMore,
  startTitleEdit, saveTitleEdit, cancelTitleEdit,
  // demanda
  openModal, closeTask, saveTask, toggleDrop, togResp, rmResp, setStatus, delTask,
  // time
  openTeam, closeTeam, addMember, delMember, saveTeam, toggleDraftHidden,
  // avatar
  openAvEdit, openAvForName, openAvForNameFromProfile, closeAv,
  setAvColor, removeAvSvg, handleSvg, saveAv,
  // perfis, carga, log, tutorial, setup
  openProfiles, closeProfiles, renderProfiles,
  openMe, closeMe, renderMe, deleteMyAccount,
  setMemberField, setStartDate, commitTeam, toggleMemberHidden,
  openDashboard, closeDashboard, renderDashboard, setDashAno,
  openLog, closeLog, clearLog,
  saveSetupConfig, skipSetup,
  // contas e avisos
  submitAuth, toggleAuthMode, signOut, ask, askResolve, setUserAdmin, setUserMember, toast,
  render, persist,
});
