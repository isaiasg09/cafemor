/**
 * Fonte Única da Verdade - Café Mor (Goiânia - GO)
 * Dados processados diretamente do JSON oficial do cliente,
 * sem chaves privadas ou parâmetros de rastreio transitórios.
 */

const WHATSAPP_BASE = 'https://wa.me/5562982886635';

export function buildWhatsappUrl(customMessage) {
  const text =
    customMessage ||
    'Olá! Vim pelo site do Café Mor e gostaria de fazer um pedido ou consultar disponibilidade.';
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
}

export const siteData = {
  nome: 'Café Mor',
  nicho: 'OPERATIONAL',
  statusNegocio: 'Aberto',
  statusNegocioDetalhe: 'Aberto agora',
  taglineCurta: 'Setor Oeste, Goiânia · Próximo ao Lago das Rosas',
  enderecoCompleto: 'Alameda das Rosas, N° 1.397 - St. Oeste, Goiânia - GO, 74125-010, Brasil',
  logradouro: 'Alameda das Rosas, N° 1.397',
  bairro: 'Setor Oeste',
  cidadeEstado: 'Goiânia - GO',
  cep: '74125-010',
  referenciaLocal: 'Próximo ao Lago das Rosas',

  telefone: '(62) 98288-6635',
  telefoneInternacional: '+55 62 98288-6635',
  linkWhatsapp: WHATSAPP_BASE,
  linkWhatsappPedido: buildWhatsappUrl(
    'Olá! Vim pelo site do Café Mor e gostaria de fazer um pedido pelo WhatsApp.'
  ),
  linkWhatsappMesa: buildWhatsappUrl(
    'Olá! Gostaria de consultar disponibilidade de mesa ou informações sobre o cardápio de hoje no Café Mor.'
  ),
  linkGoogleMaps: 'https://maps.google.com/?cid=7722444965080334398',

  nota: 4.5,
  totalAvaliacoes: 626,
  provaSocialResumo: '600+ avaliações verificadas',

  canaisExternos: {
    instagram: null,
    ifood: null,
    anotaAi: null,
  },

  horarioVerificadoEm: '2026-11-24T17:54:26.543Z',
  horarios: [
    { dia: 'Segunda-feira', horario: 'Fechado', diaSemanaIndex: 1, fechado: true },
    { dia: 'Terça-feira', horario: '09:30 - 18:00', diaSemanaIndex: 2, fechado: false },
    { dia: 'Quarta-feira', horario: '09:30 - 18:00', diaSemanaIndex: 3, fechado: false },
    { dia: 'Quinta-feira', horario: '09:30 - 18:00', diaSemanaIndex: 4, fechado: false },
    { dia: 'Sexta-feira', horario: '09:30 - 18:00', diaSemanaIndex: 5, fechado: false },
    { dia: 'Sábado', horario: '09:00 - 18:00', diaSemanaIndex: 6, fechado: false },
    { dia: 'Domingo', horario: '10:00 - 18:00', diaSemanaIndex: 0, fechado: false },
  ],

  /**
   * URLs reais do Google Places (sem chaves privadas ou parâmetros de cache)
   */
  fotos: [
    {
      id: 'foto-1',
      titulo: 'Arquitetura Afetiva & Luz Natural',
      categoria: 'A Casa',
      legenda: 'Madeira maciça, plantas vivas e luz natural filtrada pelas janelas altas na Alameda das Rosas.',
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLd95m3gFIqP4_ZLIc953_vZIjxMOG3ONyc-qk1K1j6zJzvr-FyD0xI4mPFzTheMXNg0gfHof5vE44_8h9WqQ7DoLuZ-q5ZikAz2KdGjAdW99yHH4Cl3715tg6WBqvRzCvsQp1gJEA=s4800-w1080-h1067',
      origem: 'Google Places',
      destaqueHero: true,
    },
    {
      id: 'foto-2',
      titulo: 'Cafés Especiais & Confeitaria da Casa',
      categoria: 'Cafés & Doces',
      legenda: 'Extrações cuidadosas acompanhadas por bolos caseiros, brownies e vitrine artesanal.',
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLdnqUjrrbPchzQ8cmHWZNbGcZFQKWaCSBqQB3xcL4L7fib-bARuygTvEAK6doetv6-wTaFr0VUL9kOrSLDwvXsPItJxFVMexYwqA4CpukoVWdaE-VV1BJXUYaoqh6v7bZcy4C8baw=s4800-w1080-h1080',
      origem: 'Google Places',
      destaqueHero: true,
    },
    {
      id: 'foto-3',
      titulo: 'Detalhes Artesanais & Memória Goiana',
      categoria: 'Identidade',
      legenda: 'Cristaleira, louças antigas e a parede dedicada a Cora Coralina: História, Talento e Sabedoria.',
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLfEt_Mi5eMc4Lg5m4zBlIbYaeZbQWcGCeqZKm4uE3sly7Bx-dH1tVLqAzSbYfFV3SnCZerFR_jhY2eWTlIYUK422rVxEdudrr6jOblk4wDCDHRdhK1f56XrI1kL6_aIdeZ74OUbHuAQunqy=s4800-w1080-h1080',
      origem: 'Google Places',
      destaqueHero: false,
    },
    {
      id: 'foto-4',
      titulo: 'Almoço Fresco & Apresentação Impecável',
      categoria: 'Gastronomia',
      legenda: 'Mais que cafeteria: pratos frescos preparados com esmero para um almoço tranquilo no Setor Oeste.',
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLesTsCitCndELRy7av2VbhYgTwNCMRAFa-cWDUKT9UZIk0Uw7hEVsRmlgFjbvNJwieDZ1sHOHUYXVjBCUztCvwHaKN5OUGFybR8kEPdXCg6QwPrgMkdvkg4lM3Yt1s56PodvvZEH4GLoJHc=s4800-w1080-h1080',
      origem: 'Google Places',
      destaqueHero: false,
    },
    {
      id: 'foto-5',
      titulo: 'Cantinho da Janela Azul & Jardim',
      categoria: 'A Casa',
      legenda: 'Poltronas confortáveis voltadas para o verde, pensadas para desacelerar no meio do dia.',
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLfu7jvrNN8YGe4sxjCfHkRTcHM3xLpZq7KeFbaZltb3z6CjnJWYoxs6d0tQUdoYpzmD4wKpqQPZWnBp-iNVM95DNcnp63Bj5Yklnbbu3QPSrUh84INpb1XSyMRIvRQQWkLlTyksyA-hfr0=s4800-w1080-h1080',
      origem: 'Google Places',
      destaqueHero: false,
    },
    {
      id: 'foto-6',
      titulo: 'Vitrine de Confeitaria levada a sério',
      categoria: 'Cafés & Doces',
      legenda: 'Sobremesas caprichadas para emendar depois do almoço ou num café demorado de fim de tarde.',
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLcrzAaryAKw_3cwz2idSJK8XN0YPyMF_HPSEugkOHoqJL9_XsGvimlzC84mJ4tVkUKZblBX4dwB4HnSa9-xPnnuhVlnwEPw229cX1zt2lbPZkJZIJl4YQ151zSqprgsjSqqARjdabiZNOe6=s4800-w1080-h1080',
      origem: 'Google Places',
      destaqueHero: false,
    },
    {
      id: 'foto-7',
      titulo: 'Salão Climatizado & Mesas Espaçadas',
      categoria: 'A Casa',
      legenda: 'Ambiente interno limpo, claro, climatizado e silencioso na medida certa para conversar ou trabalhar.',
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLdgXqEs-LlI1XotCGM1LDAncXJ_JJebYjNA91QlmB8Hwi_KtJrAyTyl2z4uEharRlPmEWamUMpa_aGP-XEeowt6mACQDwWCgO7kFnBxEQPNSGtJvMuLOtLd0FkURqF8luVI9oXk8FvMJEC5=s4800-w1080-h1080',
      origem: 'Google Places',
      destaqueHero: false,
    },
    {
      id: 'foto-8',
      titulo: 'Chás Deliciosos & Bebidas Autorais',
      categoria: 'Cafés & Doces',
      legenda: 'Infusões aromáticas, cafés especiais e acompanhamentos servidos com flores frescas à mesa.',
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLeqzM1GZbLfDyS_XOH8DKutkEf5MaUxNmZ2_LdXOFaCTUEI4Q48zU1rnOEf2sasM312bUtXrsa13A2ZbakGsJ2SjWNvrPi1o7mvGenFBGl_8Lsvoki9GrLn6dVUqNJ30nWSd9mKduLVVBE=s4800-w1080-h1080',
      origem: 'Google Places',
      destaqueHero: false,
    },
    {
      id: 'foto-9',
      titulo: 'Mesa Posta com Carinho',
      categoria: 'Gastronomia',
      legenda: 'Do design do cardápio aos pequenos vasos de flor em cada mesa: o cuidado aparece em tudo.',
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLcd0qQUkw9q3PcywV3nLTY8tZt_5MXYiKBMas0pFjh0qWOdHWQRQVKeGV-BSMv9r4-_JqnT9pPTc7r3M48CZi2NLjb7hFXeFGYR8T4sI-ym30wTi_eI_rncelTbGx122YQBHjFKCvfDY5B5=s4800-w1080-h1080',
      origem: 'Google Places',
      destaqueHero: false,
    },
    {
      id: 'foto-10',
      titulo: 'Pausa no Fim da Tarde',
      categoria: 'Gastronomia',
      legenda: 'Um refúgio próximo ao Lago das Rosas para reunião de trabalho, almoço em família ou pausa solo.',
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLfkwoETqIejanjXHNkD5z0O0fUct8MREifzSCfciwMakVqf_xBIYDD5c23ZymHkwt66vjS97NbUckWNwDLTMOFckXVpp-9oRDf5iqFGGpELT11SXdD5ptx6xVc5bbWAfWL7IhGcAg=s4800-w1080-h1080',
      origem: 'Google Places',
      destaqueHero: false,
    },
  ],

  /**
   * 4 avaliações reais destacadas dos clientes do JSON oficial ("Por que Café Mor")
   */
  avaliacoesDestaque: [
    {
      id: 'rev-roberto',
      autor: 'Roberto Cardoso',
      nota: 5,
      selo: 'Experiência Completa & Identidade Goiana',
      destaqueCurto: 'Um pedacinho de charme em Goiânia',
      citacao:
        'Descobrir o Café Mor foi uma das melhores surpresas que tive em Goiânia. As mesas de madeira maciça, a parede dedicada à Cora Coralina com "História, Talento, Sabedoria" e aquele cantinho com poltronas na janela azul, de frente para o jardim, são simplesmente perfeitos. Dá para resolver o almoço com tranquilidade e emendar com bolos caseiros, brownies e cafés especiais.',
    },
    {
      id: 'rev-elida',
      autor: 'Élida Evanikel',
      nota: 5,
      selo: 'Frescor & Cuidado no Preparo',
      destaqueCurto: 'Atendimento e comida perfeitos, nota dez!',
      citacao:
        'Atendimento e comida perfeitos, nota dez! A comida é muito bem feita, tudo fresco, extremamente agradável. O ambiente interno é lindo.',
    },
    {
      id: 'rev-filipe',
      autor: 'Filipe Siqueira de Oliveira',
      nota: 5,
      selo: 'Sabor, Chás & Hospitalidade',
      destaqueCurto: 'Experiência indescritível',
      citacao:
        'Experiência indescritível. Comida boa, chás deliciosos. Atendimento excelente. Ambiente incrível. Não tem o que reclamar.',
    },
    {
      id: 'rev-mh',
      autor: 'M. H.',
      nota: 4,
      selo: 'Arquitetura & Primeira Impressão',
      destaqueCurto: 'Que ambiente lindo',
      citacao:
        'Comida ótima. Mas o que chama mesmo a atenção é a casa. Que ambiente lindo.',
    },
  ],

  /**
   * Momentos do cardápio e da casa fundamentados exclusivamente nos relatos verificados
   */
  momentosDaCasa: [
    {
      id: 'momento-almoco',
      horarioSugerido: 'Meio-dia, Almoço Fresco',
      titulo: 'Mais que café, um restaurante completo',
      descricao:
        'Pratos frescos e muito bem feitos para resolver o almoço com tranquilidade no Setor Oeste, seja em família, a sós ou em reunião de trabalho.',
      itensCitados: ['Pratos de almoço frescos', 'Apresentação cuidadosa', 'Salão climatizado'],
    },
    {
      id: 'momento-confeitaria',
      horarioSugerido: 'Tarde, Vitrine & Grãos',
      titulo: 'Cafés especiais, chás & confeitaria séria',
      descricao:
        'A vitrine de doces ao fundo do balcão entrega a dedicação da casa: bolos caseiros, brownies densos, chás deliciosos e cafés especiais passados no ponto.',
      itensCitados: ['Cafés especiais', 'Brownies & bolos caseiros', 'Chás selecionados'],
    },
    {
      id: 'momento-ambiente',
      horarioSugerido: 'Todo o dia, Alma de Goiás',
      titulo: 'Casa de vó com elegância editorial',
      descricao:
        'Móveis de madeira maciça, cristaleira, louças antigas, vasos de flor em cada mesa e a homenagem à Cora Coralina celebrando História, Talento e Sabedoria.',
      itensCitados: ['Poltronas na janela azul', 'Jardim & luz natural', 'Homenagem à Cora Coralina'],
    },
  ],

  /**
   * Dicas práticas & tratamento transparente de objeções reais (CRO)
   */
  perguntasFrequentes: [
    {
      pergunta: 'Como faço pedidos ou consulto o cardápio do dia?',
      resposta:
        'O atendimento digital do Café Mor acontece diretamente pelo nosso WhatsApp oficial (62) 98288-6635, sem intermediários de aplicativos. Basta tocar em "Pedir pelo WhatsApp" para falar com nossa equipe.',
    },
    {
      pergunta: 'Qual o melhor horário para conseguir mesa perto da janela ou no salão climatizado?',
      resposta:
        'Nos horários de pico do almoço e no final da tarde a casa costuma ficar bastante movimentada. Recomendamos chegar alguns minutos mais cedo ou enviar uma mensagem pelo WhatsApp antes de sair para alinhar sua visita com tranquilidade.',
    },
    {
      pergunta: 'O espaço funciona bem para trabalhar ou fazer reuniões?',
      resposta:
        'Sim. O salão interno é claro, climatizado, com mesas de madeira bem espaçadas, poltronas confortáveis e acústica silenciosa na medida certa tanto para quem vem sozinho quanto para pequenos grupos.',
    },
    {
      pergunta: 'Onde exatamente fica o Café Mor em Goiânia?',
      resposta:
        'Estamos na Alameda das Rosas, N° 1.397, no Setor Oeste (CEP 74125-010), bem próximo ao Lago das Rosas. Funcionamos de terça a sexta das 09:30 às 18:00, sábado das 09:00 às 18:00 e domingo das 10:00 às 18:00.',
    },
  ],
};
