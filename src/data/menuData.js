/**
 * Cardápio Digital Completo — Café Mor (VucaFood)
 * Todos os itens, preços exatos e links individuais do catálogo oficial.
 * Zero em-dash (—) ou en-dash (–).
 */

export const VUCAFOOD_MENU_URL = 'https://www.vucafood.com.br/morcafe/3083/cardapio-digital';

const vucaItem = (id) => `${VUCAFOOD_MENU_URL}/${id}`;

export const MENU_FAVORITES = [
  {
    id: 287,
    badge: 'Combo Café da Manhã',
    nome: 'Combo do Chefe',
    preco: 'R$ 56,60',
    descricao:
      'Pão na chapa dourado, ovos mexidos cremosos, café filtrado V60 (150ml) ou Cappuccino 1397, salada de frutas com mel, granola, iogurte natural e geleia de frutas amarelas.',
    fotoIndex: 1, // Toast / gastronomia real
    url: vucaItem(287),
  },
  {
    id: 234,
    badge: 'Clássico da Casa',
    nome: 'Porção Bolinho de Chuva Recheado - Brigadeiro',
    preco: 'R$ 17,65',
    descricao:
      '6 unidades servidas quentinhas até as 17h. Combinação perfeita com nossos espressos SCAA ou filtrados na V60.',
    fotoIndex: 2, // Xícara Café Mor + bolinho de chuva real
    url: vucaItem(234),
  },
  {
    id: 57,
    badge: 'Café e Criatividade',
    nome: 'Mocaccino Mor',
    preco: 'R$ 28,80',
    descricao:
      '180ml equilibrando blend de chocolate especial na base, espresso encorpado e leite vaporizado cremoso.',
    fotoIndex: 8, // Foto real do Mocaccino em camadas
    url: vucaItem(57),
  },
];

export const MENU_SECTIONS = [
  {
    tabId: 'destaques-almoco',
    tabLabel: 'Destaques & Almoço',
    groups: [
      {
        title: 'Combos Café da Manhã',
        items: [
          {
            id: 287,
            nome: 'Combo do Chefe',
            descricao:
              'Criado por nossa cozinha, reúne pão na chapa dourado, ovos mexidos cremosos, café filtrado V60 (150ml) ou Cappuccino tradicional 1397, salada de frutas com mel, granola, iogurte natural e geleia de frutas amarelas.',
            preco: 'R$ 56,60',
            url: vucaItem(287),
          },
        ],
      },
      {
        title: 'Almoço Executivo',
        items: [
          {
            id: 13,
            nome: 'Salada Mor',
            descricao:
              'Mix especial de folhas frescas (alface americana, crespa e roxa, rúcula e repolho), cenoura ralada, abobrinha salteada, tomate cereja e mussarela de búfala. Finalizada com filé de frango fatiado e lâminas de amêndoa.',
            preco: 'R$ 41,70',
            url: vucaItem(13),
          },
          {
            id: 206,
            nome: 'Filé de Frango',
            descricao:
              'Suculento filé de frango servido com arroz tradicional, feijão caseiro, farofa com bacon cheirosa e legumes salteados no ponto perfeito. Acompanha salada.',
            preco: 'R$ 38,95',
            url: vucaItem(206),
          },
          {
            id: 207,
            nome: 'Picadinho de Filé',
            descricao:
              'Picadinho de filé mignon servido com arroz enriquecido com brócolis, feijão caseiro, ovo frito com gema cremosa e legumes salteados no ponto perfeito. Acompanha salada.',
            preco: 'R$ 58,60',
            url: vucaItem(207),
          },
        ],
      },
      {
        title: 'Ofertas Especiais',
        items: [
          {
            id: 15,
            nome: 'Combo Mané Doce Tradicional 2',
            descricao: 'Mané Mor com café coado V60 (150ml) de grão especial. Todos os dias.',
            preco: 'R$ 28,40',
            url: vucaItem(15),
          },
          {
            id: 16,
            nome: 'Combo Doce Tradicional 2 V60',
            descricao: 'Café coado (filtrado) V60 (150ml) com grão especial.',
            preco: 'Consultar no VucaFood',
            url: vucaItem(16),
          },
        ],
      },
    ],
  },
  {
    tabId: 'cafes-especiais',
    tabLabel: 'Cafés Especiais',
    groups: [
      {
        title: 'Os Espressos',
        items: [
          {
            id: 17,
            nome: 'Espresso Mor',
            descricao:
              '40ml. Extração conforme parâmetros internacionais da SCAA. Grãos de café especial, encorpado e feito sob pressão.',
            preco: 'R$ 9,50',
            url: vucaItem(17),
          },
          {
            id: 18,
            nome: 'Espresso Mor Duplo',
            descricao:
              '80ml. Extração conforme parâmetros internacionais da SCAA com grãos de café especial encorpados.',
            preco: 'R$ 17,75',
            url: vucaItem(18),
          },
          {
            id: 19,
            nome: 'Macchiato Mor',
            descricao: '55ml. Espresso acompanhado de um toque de espuma de leite vaporizado.',
            preco: 'R$ 13,95',
            url: vucaItem(19),
          },
          {
            id: 20,
            nome: 'Café Latte',
            descricao: '190ml. Espresso, boa quantidade de leite vaporizado e fina camada de espuma.',
            preco: 'R$ 18,55',
            url: vucaItem(20),
          },
          {
            id: 21,
            nome: 'Cappuccino 1397',
            descricao: '180ml. Clássico italiano preparado com espresso e leite vaporizado.',
            preco: 'R$ 17,85',
            url: vucaItem(21),
          },
          {
            id: 22,
            nome: 'Cappuccino Cacau',
            descricao: '180ml. Espresso, toque de chocolate 50% e leite vaporizado.',
            preco: 'R$ 21,75',
            url: vucaItem(22),
          },
          {
            id: 23,
            nome: 'Cappuccino de Caramelo',
            descricao: '180ml. Clássico italiano preparado com espresso, leite vaporizado, caramelo e canela.',
            preco: 'R$ 20,45',
            url: vucaItem(23),
          },
          {
            id: 24,
            nome: 'Cappuccino Milk 1397',
            descricao: '180ml. Clássico italiano preparado com espresso e leite de aveia bem vaporizado.',
            preco: 'R$ 21,70',
            url: vucaItem(24),
          },
          {
            id: 25,
            nome: 'Cappuccino Milk Cacau',
            descricao: '180ml de espresso, leite de aveia vaporizado e um toque de chocolate 50%.',
            preco: 'R$ 23,60',
            url: vucaItem(25),
          },
          {
            id: 26,
            nome: 'Cappuccino Milk Caramelo',
            descricao:
              '180ml. Clássico italiano preparado com espresso, leite de aveia vaporizado cremoso, caramelo e canela.',
            preco: 'R$ 22,60',
            url: vucaItem(26),
          },
        ],
      },
      {
        title: 'Os Filtrados',
        items: [
          {
            id: 27,
            nome: 'Chemex',
            descricao:
              '300ml. Método de café coado com filtragem tripla que não absorve resíduos. Puro, limpo e suave, em torra média.',
            preco: 'R$ 27,45',
            url: vucaItem(27),
          },
          {
            id: 28,
            nome: 'Prensa Francesa',
            descricao:
              '220ml. Método por infusão com moagem mais grossa, resultando em café encorpado com óleos naturais da semente.',
            preco: 'R$ 21,50',
            url: vucaItem(28),
          },
          {
            id: 29,
            nome: 'V60 - 150ml',
            descricao:
              '150ml. Método coado que realça aromas e notas da torra. Bebida suave, uniforme e sem resíduos.',
            preco: 'R$ 20,45',
            url: vucaItem(29),
          },
        ],
      },
      {
        title: 'Café e Criatividade',
        items: [
          {
            id: 56,
            nome: 'Mocaccino de Caramelo',
            descricao: '180ml. Espresso, leite vaporizado, caramelo e canela.',
            preco: 'R$ 28,80',
            url: vucaItem(56),
          },
          {
            id: 57,
            nome: 'Mocaccino Mor',
            descricao: '180ml. Espresso, chocolate (blend) e leite vaporizado.',
            preco: 'R$ 28,80',
            url: vucaItem(57),
          },
          {
            id: 58,
            nome: 'Afogatto',
            descricao: '180ml. Espresso duplo servido com 2 bolas de sorvete de creme.',
            preco: 'R$ 19,20',
            url: vucaItem(58),
          },
        ],
      },
      {
        title: 'Adicionais',
        items: [
          {
            id: 31,
            nome: 'Chantilly Adicional',
            descricao: 'Porção adicional de chantilly para bebidas ou sobremesas.',
            preco: 'R$ 7,55',
            url: vucaItem(31),
          },
          {
            id: 49,
            nome: 'Banoffee Combo Pratos do Chefe',
            descricao: 'Porção complementar de Banoffee para acompanhar pratos do chefe.',
            preco: 'R$ 14,50',
            url: vucaItem(49),
          },
        ],
      },
    ],
  },
  {
    tabId: 'gelados-chas-bebidas',
    tabLabel: 'Gelados, Chás & Bebidas',
    groups: [
      {
        title: 'Os Gelados',
        items: [
          {
            id: 63,
            nome: 'Frapé Mor',
            descricao: '300ml. Espresso, sorvete de creme, calda de chocolate e chantilly.',
            preco: 'R$ 35,60',
            url: vucaItem(63),
          },
          {
            id: 64,
            nome: 'Frapé Cookies',
            descricao: '300ml. Espresso, sorvete de creme, cookies, calda de chocolate e chantilly.',
            preco: 'R$ 31,60',
            url: vucaItem(64),
          },
          {
            id: 67,
            nome: 'Cappuccino Gelado Mor',
            descricao:
              '180ml. Cappuccino tradicional italiano refrescante, preparado com espresso, caramelo salgado, gelo e creme de leite.',
            preco: 'R$ 20,80',
            url: vucaItem(67),
          },
          {
            id: 328,
            nome: 'Milk Shake de Frutas Vermelhas',
            descricao: '370g com geleia de frutas vermelhas, leite integral, sorvete de creme e chantilly.',
            preco: 'R$ 28,15',
            url: vucaItem(328),
          },
        ],
      },
      {
        title: 'Chocolate Para Variar',
        items: [
          {
            id: 59,
            nome: 'Chocolate Quente',
            descricao: '130ml. Feito com chocolate especial (blend) e chantilly.',
            preco: 'R$ 17,80',
            url: vucaItem(59),
          },
          {
            id: 61,
            nome: 'Dois Amores',
            descricao: '180ml. Chocolate (blend) quente cremoso, uma bola de sorvete de creme e toque de canela.',
            preco: 'R$ 20,90',
            url: vucaItem(61),
          },
        ],
      },
      {
        title: 'Chai e Chá Gelado',
        items: [
          {
            id: 214,
            nome: 'Chá Mate Batido c/ Limão e Espuma Cremosa',
            descricao: '320ml. Chá mate batido com gelo, limão taiti e espuma cremosa.',
            preco: 'R$ 13,65',
            url: vucaItem(214),
          },
          {
            id: 216,
            nome: 'Chá Intimidade Frio',
            descricao:
              'Capim-limão, pera, flores de clitória, botões de jasmim e maçã. Refrescante, floral e equilibrado.',
            preco: 'R$ 15,95',
            url: vucaItem(216),
          },
          {
            id: 69,
            nome: 'Chá Aconchego Frio',
            descricao: 'Infusão gelada aromática servida no ponto certo de frescor.',
            preco: 'R$ 15,95',
            url: vucaItem(69),
          },
          {
            id: 70,
            nome: 'Chai Mama Chai Frio (com ou sem leite integral)',
            descricao:
              'Erva mate tostada, chá preto, canela, gengibre, cravo, cardamomo, pimenta rosa, folha de estévia e anis estrelado.',
            preco: 'R$ 15,95',
            url: vucaItem(70),
          },
          {
            id: 189,
            nome: 'Chai Aconchego Frio - Cítrico & Herbal',
            descricao: 'Camomila, capim-limão, melissa, tangerina, calêndula e laranja.',
            preco: 'R$ 15,95',
            url: vucaItem(189),
          },
        ],
      },
      {
        title: 'Chai e Chá Quente',
        items: [
          {
            id: 75,
            nome: 'Chá Intimidade Quente',
            descricao: 'Capim-limão, pera, flores de clitória, botões de jasmim e maçã.',
            preco: 'R$ 12,60',
            url: vucaItem(75),
          },
          {
            id: 76,
            nome: 'Chá Aconchego Quente',
            descricao: 'Camomila, melissa, capim-limão, calêndula, tangerina e laranja.',
            preco: 'R$ 12,60',
            url: vucaItem(76),
          },
          {
            id: 77,
            nome: 'Chai Mama Chai Quente (com ou sem leite)',
            descricao:
              'Erva mate tostada, chá preto, canela, gengibre, cravo, cardamomo, pimenta rosa, folha de estévia e anis estrelado.',
            preco: 'R$ 12,60',
            url: vucaItem(77),
          },
          {
            id: 192,
            nome: 'Chá Intuição Quente',
            descricao: 'Maçã, morango, framboesa, amora, blueberry e hibisco. Experiência de tomar o chá e comer as frutas.',
            preco: 'R$ 12,60',
            url: vucaItem(192),
          },
        ],
      },
      {
        title: 'Drinks sem Álcool, Sodas & Sucos',
        items: [
          {
            id: 73,
            nome: 'Espresso Mascavo 32',
            descricao: '320ml. Espresso, açúcar mascavo, limão e água com gás.',
            preco: 'R$ 23,60',
            url: vucaItem(73),
          },
          {
            id: 79,
            nome: 'Soda Italiana de Abacaxi e Mojito',
            descricao: '300ml. Água com gás, gelo e xarope de abacaxi e mojito.',
            preco: 'R$ 20,70',
            url: vucaItem(79),
          },
          {
            id: 82,
            nome: 'Lemonade de Grenadine Cranberry e Limão',
            descricao: '300ml. Água mineral com gás, limão taiti, gelo e xarope de cranberry e grenadine.',
            preco: 'R$ 20,35',
            url: vucaItem(82),
          },
          {
            id: 83,
            nome: 'Suco de Limão da Polpa da Fruta (300ml)',
            descricao: 'Suco natural feito da polpa de limão.',
            preco: 'R$ 18,95',
            url: vucaItem(83),
          },
          {
            id: 84,
            nome: 'Suco de Caju da Polpa da Fruta (300ml)',
            descricao: 'Suco natural feito da polpa de caju.',
            preco: 'R$ 18,95',
            url: vucaItem(84),
          },
          {
            id: 184,
            nome: 'Suco de Abacaxi da Polpa da Fruta (300ml)',
            descricao: 'Suco natural feito da polpa de abacaxi.',
            preco: 'R$ 18,95',
            url: vucaItem(184),
          },
          {
            id: 185,
            nome: 'Suco de Maracujá da Polpa da Fruta (300ml)',
            descricao: 'Suco natural feito da polpa de maracujá.',
            preco: 'R$ 18,95',
            url: vucaItem(185),
          },
          {
            id: 186,
            nome: 'Suco de Cupuaçu da Polpa da Fruta (300ml)',
            descricao: 'Suco natural feito da polpa de cupuaçu.',
            preco: 'R$ 18,95',
            url: vucaItem(186),
          },
        ],
      },
      {
        title: 'Águas, Refrigerantes, Cervejas & Vinhos',
        items: [
          {
            id: 94,
            nome: 'Água Lindóia Premium Pet sem Gás 510ml',
            descricao: 'Água mineral sem gás 510ml.',
            preco: 'R$ 9,00',
            url: vucaItem(94),
          },
          {
            id: 296,
            nome: 'Água Pet com Gás Prata 510ml',
            descricao: 'Água mineral com gás Prata 510ml.',
            preco: 'R$ 11,00',
            url: vucaItem(296),
          },
          {
            id: 210,
            nome: 'Coca-Cola Lata 350ml',
            descricao: 'Refrigerante em lata 350ml.',
            preco: 'R$ 9,90',
            url: vucaItem(210),
          },
          {
            id: 88,
            nome: 'Coca-Cola Zero Lata 350ml',
            descricao: 'Refrigerante sem açúcar em lata 350ml.',
            preco: 'R$ 12,20',
            url: vucaItem(88),
          },
          {
            id: 96,
            nome: 'IPA Santa Dica 355ml',
            descricao: 'Cerveja artesanal goiana estilo IPA.',
            preco: 'R$ 31,75',
            url: vucaItem(96),
          },
          {
            id: 100,
            nome: 'Champagne Peterlongo Nature Br',
            descricao: 'Espumante nacional garrafa.',
            preco: 'R$ 236,60',
            url: vucaItem(100),
          },
          {
            id: 103,
            nome: 'Vinho Vulcanici Rosado Espumante',
            descricao: 'Vinho rosado espumante.',
            preco: 'R$ 180,00',
            url: vucaItem(103),
          },
        ],
      },
    ],
  },
  {
    tabId: 'bolinhos-e-bolos',
    tabLabel: 'Bolinhos & Bolos',
    groups: [
      {
        title: 'Bolinho de Chuva',
        items: [
          {
            id: 234,
            nome: 'Porção Bolinho de Chuva Recheado - Brigadeiro',
            descricao: '6 unidades servidas quentinhas até as 17h.',
            preco: 'R$ 17,65',
            url: vucaItem(234),
          },
          {
            id: 235,
            nome: 'Porção Bolinho de Chuva Tradicional',
            descricao: '6 unidades servidas até as 17h.',
            preco: 'R$ 13,70',
            url: vucaItem(235),
          },
          {
            id: 117,
            nome: 'Porção Bolinho de Chuva Recheado - Doce de Leite',
            descricao: '3 unidades com recheio cremoso de doce de leite.',
            preco: 'R$ 13,20',
            url: vucaItem(117),
          },
          {
            id: 118,
            nome: 'Bolinho de Chuva Recheado - Romeu e Julieta (Porção)',
            descricao: '1 unidade recheada com queijo e goiabada.',
            preco: 'R$ 14,75',
            url: vucaItem(118),
          },
          {
            id: 211,
            nome: 'Unidade Bolinho de Chuva Recheado - Romeu e Julieta',
            descricao: '1 unidade avulsa recheada com Romeu e Julieta.',
            preco: 'R$ 5,80',
            url: vucaItem(211),
          },
          {
            id: 119,
            nome: 'Unidade Bolinho de Chuva Recheado - Doce de Leite',
            descricao: '1 unidade avulsa recheada com doce de leite.',
            preco: 'R$ 5,25',
            url: vucaItem(119),
          },
        ],
      },
      {
        title: 'Bolo do Dia',
        items: [
          {
            id: 106,
            nome: 'Bolo Banana, Uva Passa e Toque de Canela (95g)',
            descricao: 'Bolo de aveia, banana, uvas-passas, canela e açúcar mascavo. Sem leite e sem glúten.',
            preco: 'R$ 10,20',
            url: vucaItem(106),
          },
          {
            id: 107,
            nome: 'Mané Mor (98g)',
            descricao: 'Massa tradicional de mandioca, coco ralado e queijo.',
            preco: 'R$ 11,45',
            url: vucaItem(107),
          },
          {
            id: 115,
            nome: 'Bolo de Milho (180g)',
            descricao: 'Bolo caseiro de milho com queijo e coco ralado.',
            preco: 'R$ 14,70',
            url: vucaItem(115),
          },
          {
            id: 108,
            nome: 'Bolo de Limão sem Calda (95g)',
            descricao: 'Fatia leve de bolo caseiro de limão.',
            preco: 'R$ 10,20',
            url: vucaItem(108),
          },
          {
            id: 109,
            nome: 'Bolo de Limão com Calda de Limão',
            descricao: 'Fatia de bolo de limão finalizada com calda cítrica da casa.',
            preco: 'R$ 16,50',
            url: vucaItem(109),
          },
          {
            id: 111,
            nome: 'Bolo de Chocolate com Café sem Cobertura (95g)',
            descricao: 'Massa aromática de chocolate e café sem cobertura.',
            preco: 'R$ 10,20',
            url: vucaItem(111),
          },
          {
            id: 112,
            nome: 'Bolo de Chocolate com Café com Calda de Chocolate',
            descricao: 'Massa de chocolate com café coberta com calda cremosa de chocolate.',
            preco: 'R$ 16,50',
            url: vucaItem(112),
          },
          {
            id: 113,
            nome: 'Bolo de Cenoura sem Cobertura (95g)',
            descricao: 'Fatia clássica de bolo de cenoura sem cobertura.',
            preco: 'R$ 10,20',
            url: vucaItem(113),
          },
          {
            id: 114,
            nome: 'Bolo de Cenoura com Calda de Chocolate',
            descricao: 'Clássico caseiro servido com calda generosa de chocolate.',
            preco: 'R$ 16,50',
            url: vucaItem(114),
          },
          {
            id: 237,
            nome: 'Bolo de Laranja sem Calda (95g)',
            descricao: 'Massa macia de laranja fresca sem calda.',
            preco: 'R$ 10,20',
            url: vucaItem(237),
          },
          {
            id: 236,
            nome: 'Bolo de Laranja com Calda de Chocolate',
            descricao: 'Bolo fofinho de laranja contrastado com calda de chocolate.',
            preco: 'R$ 16,50',
            url: vucaItem(236),
          },
        ],
      },
    ],
  },
  {
    tabId: 'confeitaria-doces',
    tabLabel: 'Confeitaria & Doces',
    groups: [
      {
        title: 'Doces do Dia',
        items: [
          {
            id: 123,
            nome: 'Brownie Castanha de Caju sem Sorvete',
            descricao: 'Preparado com chocolate 70% e 50% e castanha de caju crocante.',
            preco: 'R$ 16,80',
            url: vucaItem(123),
          },
          {
            id: 125,
            nome: 'Brownie Castanha de Caju com Sorvete',
            descricao: 'Chocolate 50%, castanha de caju e bola de sorvete de creme.',
            preco: 'R$ 27,70',
            url: vucaItem(125),
          },
          {
            id: 126,
            nome: 'Torta Banoffee c/ Chocolate',
            descricao:
              'Massa crocante de bolacha amanteigada recheada de banana, doce de leite, chantilly e raspas de chocolate.',
            preco: 'R$ 24,25',
            url: vucaItem(126),
          },
          {
            id: 219,
            nome: 'Torta Banoffee com Canela',
            descricao:
              'Massa crocante de bolacha amanteigada recheada de banana, doce de leite, chantilly e um toque de canela.',
            preco: 'R$ 22,25',
            url: vucaItem(219),
          },
          {
            id: 120,
            nome: 'Toalha Felpuda Bolo de Abacaxi com Coco',
            descricao: 'Bolo gelado úmido de abacaxi finalizado com coco.',
            preco: 'R$ 16,40',
            url: vucaItem(120),
          },
          {
            id: 124,
            nome: 'Bolo Toalha Felpuda de Coco',
            descricao: 'Clássico bolo gelado bem molhadinho com coco ralado.',
            preco: 'R$ 14,30',
            url: vucaItem(124),
          },
          {
            id: 129,
            nome: 'Fondue de Chocolate com Fruta',
            descricao: 'Chocolate derretido acompanhado de frutas frescas (morango, kiwi, uva, manga ou banana).',
            preco: 'R$ 18,90',
            url: vucaItem(129),
          },
          {
            id: 121,
            nome: 'Brigadeiro',
            descricao: 'Brigadeiro artesanal de chocolate 50%.',
            preco: 'R$ 8,15',
            url: vucaItem(121),
          },
          {
            id: 239,
            nome: 'Salada de Frutas',
            descricao: 'Salada de frutas frescas acompanhada de mel, iogurte natural e granola.',
            preco: 'R$ 16,95',
            url: vucaItem(239),
          },
          {
            id: 30,
            nome: 'Bola de Sorvete',
            descricao: 'Bola extra de sorvete de creme.',
            preco: 'R$ 7,55',
            url: vucaItem(30),
          },
        ],
      },
    ],
  },
  {
    tabId: 'toasts-salgados',
    tabLabel: 'Toasts, Croissants & Salgados',
    groups: [
      {
        title: 'Toast e Sabores',
        items: [
          {
            id: 147,
            nome: 'Toast Mor',
            descricao: 'Creme de queijo, queijo branco, peito de peru e rúcula.',
            preco: 'R$ 39,25',
            url: vucaItem(147),
          },
          {
            id: 148,
            nome: 'Toast Espanhol',
            descricao: 'Creme de queijo, mussarela, presunto parma, tomatinho cereja, amêndoas laminadas e toque de manjericão.',
            preco: 'R$ 43,50',
            url: vucaItem(148),
          },
          {
            id: 228,
            nome: 'Toast Toque Natural',
            descricao:
              'Mix de cogumelos salteados, amêndoas laminadas crocantes e geleia de frutas amarelas em equilíbrio umami, crocante e doce.',
            preco: 'R$ 43,50',
            url: vucaItem(228),
          },
          {
            id: 149,
            nome: 'Mini Toast de Banana',
            descricao: 'Toast de banana com pasta de amendoim, mel e mussarela maçaricada.',
            preco: 'R$ 17,75',
            url: vucaItem(149),
          },
        ],
      },
      {
        title: 'Croissant',
        items: [
          {
            id: 135,
            nome: 'Croissant',
            descricao: 'Folhado dourado na hora. Acompanhamento opcional: manteiga, requeijão ou mel.',
            preco: 'R$ 24,50',
            url: vucaItem(135),
          },
          {
            id: 139,
            nome: 'Croissant Napole',
            descricao: 'Recheio de queijo branco, tomate confit e rúcula.',
            preco: 'R$ 41,60',
            url: vucaItem(139),
          },
          {
            id: 140,
            nome: 'Croissant Agridoce',
            descricao: 'Recheio de queijo branco, peito de peru e geleia de ameixa.',
            preco: 'R$ 43,60',
            url: vucaItem(140),
          },
          {
            id: 227,
            nome: 'Croissant Choco Mor',
            descricao: 'Recheado com chocolate meio amargo e morangos frescos.',
            preco: 'R$ 41,60',
            url: vucaItem(227),
          },
        ],
      },
      {
        title: 'Tortas Salgadas',
        items: [
          {
            id: 143,
            nome: 'Quiche Caprese',
            descricao: 'Base de ovos e creme de leite com tomate confit, manjericão fresco, queijo parmesão e mussarela.',
            preco: 'R$ 19,80',
            url: vucaItem(143),
          },
          {
            id: 144,
            nome: 'Quiche de Alho Poró',
            descricao: 'Base de ovos e creme de leite com alho poró, queijo parmesão e mussarela.',
            preco: 'R$ 19,80',
            url: vucaItem(144),
          },
          {
            id: 145,
            nome: 'Quiche Lorraine',
            descricao: 'Base de ovos e creme de leite com bacon, queijo parmesão e mussarela.',
            preco: 'R$ 19,80',
            url: vucaItem(145),
          },
          {
            id: 146,
            nome: 'Torta de Frango',
            descricao: 'Fatia generosa de torta caseira de frango.',
            preco: 'R$ 20,90',
            url: vucaItem(146),
          },
        ],
      },
      {
        title: 'Sanduíche, Ovos & Parceiros do Café',
        items: [
          {
            id: 150,
            nome: 'Filé Mor (Sanduíche)',
            descricao: 'Pão ciabatta, filé mignon, tomate confit, mussarela, rúcula e aioli.',
            preco: 'R$ 60,95',
            url: vucaItem(150),
          },
          {
            id: 151,
            nome: 'Ovos Mexidos à Francesa',
            descricao: 'Ovos, creme de leite, cebola, cebolinha e fatia de pão italiano.',
            preco: 'R$ 24,45',
            url: vucaItem(151),
          },
          {
            id: 152,
            nome: 'Ovos Mexidos à Francesa com Bacon',
            descricao: 'Ovos, bacon, creme de leite, cebola, cebolinha e fatia de pão italiano.',
            preco: 'R$ 31,25',
            url: vucaItem(152),
          },
          {
            id: 141,
            nome: 'Pão da Toast',
            descricao: 'Pão de fermentação natural tostado na manteiga ou no azeite.',
            preco: 'R$ 10,95',
            url: vucaItem(141),
          },
          {
            id: 142,
            nome: 'Pão de Queijo (Porção c/ 3 unid.)',
            descricao: 'Porção com 3 pães de queijo assados na hora (tempo de preparo aproximado: 20 min).',
            preco: 'R$ 11,90',
            url: vucaItem(142),
          },
        ],
      },
    ],
  },
  {
    tabId: 'graos-emporio',
    tabLabel: 'Grãos, Empório & Presentes',
    groups: [
      {
        title: 'Grãos de Café',
        items: [
          {
            id: 285,
            nome: 'Grão Café 86',
            descricao: 'Pacote de café especial selecionado pela casa.',
            preco: 'R$ 64,80',
            url: vucaItem(285),
          },
          {
            id: 329,
            nome: 'Grão Café 1988 Cinema Paradiso (250g)',
            descricao:
              'Notas doces, frutas vermelhas, chocolate meio amargo, laranja e abacaxi. Fermentação natural, variedade Paraíso.',
            preco: 'R$ 59,80',
            url: vucaItem(329),
          },
          {
            id: 330,
            nome: 'Grão Café 1927 Metrópolis (250g)',
            descricao:
              'Chocolate ao leite, doce de leite e amêndoas, acidez cítrica e corpo suave. Variedade Mundo Novo, processo natural.',
            preco: 'R$ 65,15',
            url: vucaItem(330),
          },
        ],
      },
      {
        title: 'Cesta Presente',
        items: [
          {
            id: 180,
            nome: 'Caixa p/ Cesta Presente Tamanho P',
            descricao: '1 caixa presenteável tamanho pequeno.',
            preco: 'R$ 22,90',
            url: vucaItem(180),
          },
          {
            id: 289,
            nome: 'Caixa p/ Cesta Presente Tamanho G',
            descricao: 'Caixa presenteável tamanho grande.',
            preco: 'R$ 30,90',
            url: vucaItem(289),
          },
          {
            id: 294,
            nome: 'Cestinha em Palha Tamanho P',
            descricao: 'Cesta artesanal em palha tamanho P para montar presente.',
            preco: 'R$ 19,90',
            url: vucaItem(294),
          },
        ],
      },
      {
        title: 'Empório, Latinhas de Chá & Diversos',
        items: [
          {
            id: 164,
            nome: 'Xícara Mor 200ml',
            descricao: 'Xícara oficial Café Mor em porcelana 200ml.',
            preco: 'R$ 82,50',
            url: vucaItem(164),
          },
          {
            id: 165,
            nome: 'Xícara Mor 80ml',
            descricao: 'Xícara oficial de espresso Café Mor 80ml.',
            preco: 'R$ 56,50',
            url: vucaItem(165),
          },
          {
            id: 163,
            nome: 'Prensa Francesa 350ml Cafeteira',
            descricao: 'Cafeteira prensa francesa de 350ml para preparar seu café em casa.',
            preco: 'R$ 110,75',
            url: vucaItem(163),
          },
          {
            id: 166,
            nome: 'Latinha Chá Intimidade - 50g',
            descricao: 'Capim-limão, maçã, pera, flores de clitória e jasmim.',
            preco: 'R$ 110,50',
            url: vucaItem(166),
          },
          {
            id: 167,
            nome: 'Latinha Chá Intuição - 70g',
            descricao: 'Morango, maçã, blueberry, amora, framboesa e hibisco.',
            preco: 'R$ 110,50',
            url: vucaItem(167),
          },
          {
            id: 168,
            nome: 'Latinha Chá Aconchego - 50g',
            descricao: 'Camomila, capim-limão, melissa, calêndula, tangerina e laranja.',
            preco: 'R$ 78,30',
            url: vucaItem(168),
          },
          {
            id: 190,
            nome: 'Latinha Chá Aconchego Especial - 50g',
            descricao: 'Blend relaxante de camomila, capim-limão, melissa, tangerina, calêndula e laranja.',
            preco: 'R$ 84,80',
            url: vucaItem(190),
          },
          {
            id: 170,
            nome: 'Latinha Chá Namastê Chai - 70g',
            descricao: 'Chá preto, gengibre, cravo, canela, cardamomo, anis e pimenta preta.',
            preco: 'R$ 84,80',
            url: vucaItem(170),
          },
          {
            id: 68,
            nome: 'Latinha Chá Intimidade Frio - 50g',
            descricao: 'Blend aromático de capim-limão, pera, flores de clitória, jasmim e maçã.',
            preco: 'R$ 15,75',
            url: vucaItem(68),
          },
          {
            id: 260,
            nome: 'Lata Presente Café Mor 200g',
            descricao: 'Lata presenteável com tampa 200g.',
            preco: 'R$ 22,65',
            url: vucaItem(260),
          },
          {
            id: 314,
            nome: 'Biscoito Estrela Petit Mor 60g',
            descricao: 'Petit four inspirado na torta de maçã, em formato de estrela, o mesmo que acompanha seu café.',
            preco: 'R$ 10,90',
            url: vucaItem(314),
          },
          {
            id: 316,
            nome: 'Iogurte Integral Natural 130ml',
            descricao: 'Iogurte natural caseiro de leite integral, sem conservantes.',
            preco: 'R$ 6,40',
            url: vucaItem(316),
          },
          {
            id: 159,
            nome: 'Kit p/ Vinho 4 Peças Garrafa Wine',
            descricao: 'Kit presenteável para vinho com 4 acessórios.',
            preco: 'R$ 168,65',
            url: vucaItem(159),
          },
          {
            id: 160,
            nome: 'Caneca Star Wars 300ml',
            descricao: 'Caneca temática colecionável 300ml.',
            preco: 'R$ 63,35',
            url: vucaItem(160),
          },
          {
            id: 231,
            nome: 'Luminária Disney Stitch',
            descricao: 'Luminária decorativa Disney Stitch.',
            preco: 'R$ 329,45',
            url: vucaItem(231),
          },
          {
            id: 232,
            nome: 'Luminária Box A Gente Se Ama',
            descricao: 'Luminária decorativa Box A Gente Se Ama.',
            preco: 'R$ 245,75',
            url: vucaItem(232),
          },
          {
            id: 230,
            nome: 'Sessão Fotos e Vídeos 15 Minutos',
            descricao: 'Reserva do espaço da casa para sessão fotográfica de 15 minutos.',
            preco: 'R$ 23,75',
            url: vucaItem(230),
          },
          {
            id: 302,
            nome: 'Sessão Fotos e Vídeos 30 Minutos',
            descricao: 'Reserva do espaço da casa para sessão fotográfica de 30 minutos.',
            preco: 'R$ 47,50',
            url: vucaItem(302),
          },
          {
            id: 229,
            nome: 'Sessão Fotos e Vídeos 60 Minutos',
            descricao: 'Reserva do espaço da casa para sessão fotográfica de 60 minutos.',
            preco: 'R$ 95,00',
            url: vucaItem(229),
          },
        ],
      },
    ],
  },
];
