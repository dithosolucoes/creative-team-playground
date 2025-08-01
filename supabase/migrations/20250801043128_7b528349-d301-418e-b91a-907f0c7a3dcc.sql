-- Corrigir RLS policies da tabela experiences para permitir que admins gerenciem experiências
DROP POLICY IF EXISTS "Experiences are viewable by everyone" ON public.experiences;
DROP POLICY IF EXISTS "Only authenticated users can create experiences" ON public.experiences;

-- Novas policies para experiences
CREATE POLICY "Experiences are viewable by everyone" 
ON public.experiences 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can create experiences" 
ON public.experiences 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update experiences" 
ON public.experiences 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete experiences" 
ON public.experiences 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Limpar a experiência incompleta atual e inserir a experiência original completa
DELETE FROM public.experiences WHERE title = 'Transformação 21 Dias';

-- Inserir a experiência original "Transformação 21 Dias" com todos os 21 dias
INSERT INTO public.experiences (title, description, template_id, content, is_active) VALUES (
  'Transformação 21 Dias',
  'Desperte seu potencial divino através de uma experiência devocional única e transformadora',
  1,
  '{
    "daily_content": [
      {
        "day": 1,
        "title": "O Despertar da Alma",
        "verse": "Portanto, se alguém está em Cristo, é nova criação. As coisas antigas já passaram; eis que surgiram coisas novas! - 2 Coríntios 5:17",
        "devotional": "Hoje iniciamos uma jornada de transformação espiritual. Deus tem um propósito único para sua vida, e cada novo dia é uma oportunidade de descobrir mais sobre quem Ele criou você para ser. A transformação começa quando reconhecemos que somos amados incondicionalmente por Deus.",
        "reflection": "Permita que o amor de Deus transforme cada área da sua vida. Hoje, abra seu coração para receber tudo o que Ele tem preparado para você.",
        "meditation": "Respire profundamente e sinta a presença de Deus ao seu redor. Você é amado, você é escolhido, você tem propósito.",
        "action": "Dedique 10 minutos para orar e agradecer a Deus por esta nova jornada de transformação que está começando.",
        "questions": [
          "Como posso abrir meu coração para a transformação que Deus quer fazer em minha vida?",
          "Quais áreas da minha vida preciso entregar nas mãos de Deus hoje?"
        ]
      },
      {
        "day": 2,
        "title": "Descobrindo Sua Identidade",
        "verse": "Mas vocês são geração eleita, sacerdócio real, nação santa, povo exclusivo de Deus, para anunciar as grandezas daquele que os chamou das trevas para a sua maravilhosa luz. - 1 Pedro 2:9",
        "devotional": "Sua identidade não está no que você faz, mas em quem você é em Cristo. Deus o escolheu e o separou para algo grandioso. Hoje, vamos descobrir mais sobre como Deus vê você e qual é sua verdadeira identidade espiritual.",
        "reflection": "Você é escolhido, real, santo e exclusivo de Deus. Permita que essa verdade transforme a forma como você se vê e como vive.",
        "meditation": "Medite na verdade de que você é filho amado de Deus, criado com propósito e destinado para coisas grandiosas.",
        "action": "Escreva três características de sua identidade em Cristo e declare-as em voz alta hoje.",
        "questions": [
          "Como minha identidade em Cristo muda a forma como eu me vejo?",
          "De que maneiras posso viver hoje de acordo com minha identidade real?"
        ]
      },
      {
        "day": 3,
        "title": "O Poder da Gratidão",
        "verse": "Deem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus. - 1 Tessalonicenses 5:18",
        "devotional": "A gratidão tem o poder de transformar nossa perspectiva e nosso coração. Quando escolhemos ser gratos, mesmo nas dificuldades, abrimos espaço para que Deus aja em nossa vida de maneiras extraordinárias.",
        "reflection": "A gratidão é uma escolha diária que muda nossa perspectiva e nos aproxima do coração de Deus.",
        "meditation": "Pense em três coisas pelas quais você é grato hoje e agradeça a Deus por cada uma delas.",
        "action": "Crie uma lista de 10 coisas pelas quais você é grato e compartilhe sua gratidão com alguém especial.",
        "questions": [
          "Como a gratidão pode transformar minha perspectiva sobre os desafios que enfrento?",
          "Quais bênçãos em minha vida eu tenho dado como certas?"
        ]
      },
      {
        "day": 4,
        "title": "Confiança no Plano de Deus",
        "verse": "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz e não de mal, para vos dar o fim que esperais. - Jeremias 29:11",
        "devotional": "Deus tem um plano perfeito para sua vida. Mesmo quando não conseguimos entender o caminho que Ele está nos levando, podemos confiar que Seus pensamentos para nós são de bem e não de mal. Sua vida tem propósito e direção divina.",
        "reflection": "Confie no timing e no plano de Deus para sua vida. Ele está trabalhando todas as coisas para o seu bem.",
        "meditation": "Entregue seus planos e sonhos nas mãos de Deus, confiando que Ele sabe o que é melhor para você.",
        "action": "Escreva uma oração entregando seus planos a Deus e pedindo discernimento para seguir Sua vontade.",
        "questions": [
          "Em que áreas da minha vida preciso confiar mais no plano de Deus?",
          "Como posso me alinhar melhor com os propósitos que Deus tem para mim?"
        ]
      },
      {
        "day": 5,
        "title": "Renovação da Mente",
        "verse": "E não vos conformeis com este mundo, mas transformai-vos pela renovação do vosso entendimento, para que experimenteis qual seja a boa, agradável e perfeita vontade de Deus. - Romanos 12:2",
        "devotional": "A transformação real começa na mente. Quando renovamos nossos pensamentos com a Palavra de Deus, nossa vida inteira é transformada. Hoje vamos focar em substituir pensamentos negativos por verdades bíblicas.",
        "reflection": "Permita que a Palavra de Deus renove sua mente e transforme sua perspectiva sobre a vida.",
        "meditation": "Identifique um pensamento negativo recorrente e substitua-o por uma verdade bíblica.",
        "action": "Escolha um versículo bíblico para memorizar e meditar durante toda a semana.",
        "questions": [
          "Quais pensamentos negativos eu preciso substituir por verdades bíblicas?",
          "Como posso renovar minha mente diariamente com a Palavra de Deus?"
        ]
      },
      {
        "day": 6,
        "title": "Relacionamentos Restaurados",
        "verse": "Acima de tudo, porém, revistam-se do amor, que é o elo perfeito. - Colossenses 3:14",
        "devotional": "Deus nos chamou para amar uns aos outros como Ele nos amou. Relacionamentos saudáveis são fundamentais para uma vida plena. Hoje, vamos refletir sobre como podemos demonstrar o amor de Cristo em nossos relacionamentos.",
        "reflection": "O amor é a base de todos os relacionamentos saudáveis. Permita que o amor de Deus flua através de você.",
        "meditation": "Pense em alguém com quem você precisa restaurar um relacionamento e ore por essa pessoa.",
        "action": "Entre em contato com alguém de quem você se afastou e demonstre amor e perdão.",
        "questions": [
          "Como posso demonstrar o amor de Cristo em meus relacionamentos hoje?",
          "Há alguém que eu preciso perdoar ou pedir perdão?"
        ]
      },
      {
        "day": 7,
        "title": "Propósito Divino",
        "verse": "Porque somos criação de Deus realizada em Cristo Jesus para fazermos boas obras, as quais Deus preparou antes para que andássemos nelas. - Efésios 2:10",
        "devotional": "Você foi criado com um propósito único e específico. Deus preparou boas obras para você realizar. Sua vida tem significado e impacto no Reino de Deus. Hoje, vamos descobrir mais sobre seu chamado divino.",
        "reflection": "Você é obra-prima de Deus, criado para fazer a diferença no mundo através do seu propósito único.",
        "meditation": "Pergunte a Deus qual é o propósito específico que Ele tem para sua vida nesta temporada.",
        "action": "Identifique um talento ou dom que Deus lhe deu e pense em como pode usá-lo para abençoar outros.",
        "questions": [
          "Quais talentos e dons Deus me deu para cumprir meu propósito?",
          "Como posso usar meus dons para fazer a diferença na vida de outras pessoas?"
        ]
      },
      {
        "day": 8,
        "title": "Fé em Movimento",
        "verse": "Porque andamos por fé e não por vista. - 2 Coríntios 5:7",
        "devotional": "A fé é o combustível da vida cristã. Quando andamos por fé, vemos o impossível acontecer. Deus nos chama para confiar Nele mesmo quando não conseguimos ver o caminho completo à nossa frente.",
        "reflection": "A fé não é a ausência de dúvidas, mas a escolha de confiar em Deus apesar das circunstâncias.",
        "meditation": "Entregue suas dúvidas e medos a Deus, escolhendo caminhar pela fé e não pela vista.",
        "action": "Dê um passo de fé em uma área da sua vida onde você tem sentido medo ou hesitação.",
        "questions": [
          "Em que áreas da minha vida preciso exercitar mais fé?",
          "Como posso fortalecer minha fé através da oração e da Palavra?"
        ]
      },
      {
        "day": 9,
        "title": "Libertação e Cura",
        "verse": "Se, pois, o Filho vos libertar, verdadeiramente sereis livres. - João 8:36",
        "devotional": "Jesus veio para nos libertar de tudo que nos impede de viver em plenitude. Hoje é um dia de libertação e cura interior. Deus quer curar suas feridas e quebrar todas as correntes que te prendem.",
        "reflection": "Em Cristo, você tem liberdade total. Permita que Ele cure suas feridas e quebre todas as correntes.",
        "meditation": "Entregue a Jesus toda dor, trauma ou ferida que ainda carrega e receba Sua cura e libertação.",
        "action": "Perdoe alguém que te machucou e liberte-se do peso do ressentimento.",
        "questions": [
          "Quais feridas ou traumas eu preciso entregar a Jesus para receber cura?",
          "De que correntes ou vícios eu preciso ser libertado hoje?"
        ]
      },
      {
        "day": 10,
        "title": "Adoração Verdadeira",
        "verse": "Mas a hora vem, e agora é, em que os verdadeiros adoradores adorarão o Pai em espírito e em verdade; porque o Pai procura a tais que assim o adorem. - João 4:23",
        "devotional": "A adoração não é apenas música ou liturgia, é um estilo de vida. Quando adoramos a Deus em espírito e verdade, nossa vida inteira se torna uma oferta de louvor a Ele. Hoje, vamos descobrir o que significa ser um verdadeiro adorador.",
        "reflection": "Sua vida inteira pode ser uma expressão de adoração a Deus. Viva cada momento para Sua glória.",
        "meditation": "Ofereça sua vida como sacrifício vivo de adoração a Deus, consagrando cada área ao Senhor.",
        "action": "Dedique momentos do seu dia para adorar a Deus através de música, oração ou simplesmente reconhecendo Sua bondade.",
        "questions": [
          "Como posso fazer da minha vida uma expressão de adoração a Deus?",
          "Quais aspectos da minha vida preciso consagrar mais a Deus?"
        ]
      },
      {
        "day": 11,
        "title": "Generosidade do Coração",
        "verse": "Mais bem-aventurada coisa é dar do que receber. - Atos 20:35",
        "devotional": "Deus nos abençoa para que sejamos uma bênção para outros. A generosidade reflete o coração de Deus e nos conecta com Seu propósito. Quando damos, experimentamos a alegria de participar da obra de Deus na terra.",
        "reflection": "A generosidade não é apenas sobre dinheiro, mas sobre tempo, talentos e amor. Seja generoso em todas as áreas.",
        "meditation": "Pense em como você pode ser uma bênção para alguém hoje através da sua generosidade.",
        "action": "Pratique um ato de generosidade hoje, seja através de tempo, recursos ou encorajamento.",
        "questions": [
          "Como posso ser mais generoso com meu tempo e talentos?",
          "De que maneiras Deus quer usar minha generosidade para abençoar outros?"
        ]
      },
      {
        "day": 12,
        "title": "Paz Interior",
        "verse": "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize. - João 14:27",
        "devotional": "A paz de Jesus é diferente da paz que o mundo oferece. É uma paz que permanece mesmo no meio das tempestades. Essa paz vem da certeza de que Deus está no controle e cuida de nós.",
        "reflection": "A verdadeira paz vem de confiar em Deus e descansar em Suas promessas, independente das circunstâncias.",
        "meditation": "Experimente a paz de Jesus respirando profundamente e entregando todas as suas preocupações a Ele.",
        "action": "Identifique uma área de ansiedade em sua vida e entregue-a conscientemente a Deus em oração.",
        "questions": [
          "O que está roubando minha paz e como posso entregar isso a Deus?",
          "Como posso cultivar mais momentos de paz e tranquilidade em minha rotina?"
        ]
      },
      {
        "day": 13,
        "title": "Sabedoria Divina",
        "verse": "Se algum de vocês tem falta de sabedoria, peça-a a Deus, que a todos dá livremente, de boa vontade; e lhe será dada. - Tiago 1:5",
        "devotional": "Deus quer nos dar sabedoria para tomar as melhores decisões. Sua sabedoria é superior à nossa compreensão e nos guia pelos caminhos certos. Hoje, vamos buscar a sabedoria divina para as decisões que precisamos tomar.",
        "reflection": "A sabedoria de Deus está disponível para você. Busque-a em oração e na Sua Palavra.",
        "meditation": "Peça a Deus sabedoria para uma decisão importante que você precisa tomar.",
        "action": "Busque conselho bíblico ou de mentores espirituais para uma situação que requer sabedoria.",
        "questions": [
          "Em que áreas da minha vida preciso mais da sabedoria de Deus?",
          "Como posso discernir melhor a vontade de Deus em minhas decisões?"
        ]
      },
      {
        "day": 14,
        "title": "Força nas Fraquezas",
        "verse": "E disse-me: A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza. - 2 Coríntios 12:9",
        "devotional": "Nossas fraquezas não nos desqualificam, elas nos qualificam para experimentar o poder de Deus. Quando reconhecemos nossas limitações, abrimos espaço para que a força divina opere através de nós.",
        "reflection": "Suas fraquezas são oportunidades para que o poder de Deus se manifeste em sua vida.",
        "meditation": "Entregue suas fraquezas e limitações a Deus, permitindo que Ele demonstre Seu poder através de você.",
        "action": "Identifique uma área de fraqueza e peça a Deus para usar essa área para Sua glória.",
        "questions": [
          "Como Deus pode usar minhas fraquezas para demonstrar Seu poder?",
          "Que limitações eu preciso entregar a Deus para experimentar Sua força?"
        ]
      },
      {
        "day": 15,
        "title": "Perseverança na Jornada",
        "verse": "Corramos, com perseverança, a carreira que nos está proposta. - Hebreus 12:1",
        "devotional": "A vida cristã é uma maratona, não uma corrida de 100 metros. Precisamos de perseverança para continuar mesmo quando o caminho fica difícil. Deus nos dá força para perseverar e completar o que Ele começou em nós.",
        "reflection": "A perseverança é desenvolvida através das dificuldades. Cada desafio é uma oportunidade de crescer em fé.",
        "meditation": "Reflita sobre como Deus tem sido fiel em sua jornada e confie que Ele continuará sendo.",
        "action": "Não desista de algo importante que Deus colocou em seu coração, mesmo que pareça difícil.",
        "questions": [
          "Em que áreas da minha vida preciso ter mais perseverança?",
          "Como posso encontrar força para continuar quando sinto vontade de desistir?"
        ]
      },
      {
        "day": 16,
        "title": "Alegria do Senhor",
        "verse": "A alegria do Senhor é a vossa força. - Neemias 8:10",
        "devotional": "A alegria cristã não depende das circunstâncias, mas da nossa relação com Deus. É uma alegria profunda que vem da certeza de sermos amados e aceitos por Ele. Essa alegria nos fortalece para enfrentar qualquer situação.",
        "reflection": "A verdadeira alegria é encontrada em Deus e é uma fonte de força para nossa alma.",
        "meditation": "Conecte-se com a alegria que vem de conhecer a Deus e ser conhecido por Ele.",
        "action": "Compartilhe alegria com alguém hoje através de um sorriso, encorajamento ou ato de bondade.",
        "questions": [
          "O que rouba minha alegria e como posso proteger este tesouro?",
          "Como posso ser fonte de alegria para outras pessoas?"
        ]
      },
      {
        "day": 17,
        "title": "Comunhão Verdadeira",
        "verse": "E perseveravam na doutrina dos apóstolos, e na comunhão, e no partir do pão, e nas orações. - Atos 2:42",
        "devotional": "Fomos criados para viver em comunidade. A comunhão com outros cristãos fortalece nossa fé e nos ajuda a crescer espiritualmente. Deus usa outras pessoas para nos abençoar e nos ensinar mais sobre Ele.",
        "reflection": "A comunhão genuína é essencial para o crescimento espiritual. Invista em relacionamentos profundos e significativos.",
        "meditation": "Agradeça a Deus pelas pessoas que Ele colocou em sua vida para fortalecê-lo na fé.",
        "action": "Procure alguém da sua comunidade de fé para orar junto ou compartilhar uma necessidade.",
        "questions": [
          "Como posso investir mais em relacionamentos cristãos genuínos?",
          "De que maneiras posso contribuir para a comunhão em minha igreja ou grupo?"
        ]
      },
      {
        "day": 18,
        "title": "Missão e Chamado",
        "verse": "Portanto, vão e façam discípulos de todas as nações... - Mateus 28:19",
        "devotional": "Todo cristão tem o privilégio e a responsabilidade de compartilhar o amor de Cristo com outros. Sua vida e seu testemunho são ferramentas poderosas nas mãos de Deus para alcançar pessoas que precisam conhecê-Lo.",
        "reflection": "Você é um embaixador de Cristo onde quer que esteja. Sua vida fala sobre Ele.",
        "meditation": "Pense em pessoas em sua vida que ainda não conhecem a Jesus e ore por elas.",
        "action": "Compartilhe o amor de Cristo com alguém hoje, seja através de palavras ou ações.",
        "questions": [
          "Como posso ser um melhor testemunho de Cristo em meu ambiente?",
          "Quem em minha vida precisa conhecer o amor de Jesus?"
        ]
      },
      {
        "day": 19,
        "title": "Esperança Inabalável",
        "verse": "Porque eu sei em quem tenho crido e estou certo de que é poderoso para guardar o meu depósito até àquele Dia. - 2 Timóteo 1:12",
        "devotional": "Nossa esperança não está baseada em circunstâncias temporárias, mas na fidelidade eterna de Deus. Ele é fiel para cumprir todas as Suas promessas e guardar tudo o que confiamos a Ele.",
        "reflection": "A esperança cristã é uma âncora para a alma, firme e segura na fidelidade de Deus.",
        "meditation": "Renove sua esperança lembrando-se das promessas fiéis de Deus para sua vida.",
        "action": "Seja portador de esperança para alguém que está desanimado ou passando por dificuldades.",
        "questions": [
          "Em que promessas de Deus posso ancorar minha esperança?",
          "Como posso ser fonte de esperança para outros?"
        ]
      },
      {
        "day": 20,
        "title": "Santidade Progressiva",
        "verse": "Mas, como é santo aquele que vos chamou, sede vós também santos em toda a vossa maneira de viver. - 1 Pedro 1:15",
        "devotional": "Deus nos chama para uma vida de santidade, não por nossos esforços, mas através da Sua obra em nós. A santificação é um processo contínuo onde o Espírito Santo nos transforma à imagem de Cristo.",
        "reflection": "A santidade não é perfeição, mas uma vida separada para Deus e em constante transformação.",
        "meditation": "Permita que o Espírito Santo examine seu coração e revele áreas que precisam de transformação.",
        "action": "Tome uma decisão prática para viver de forma mais santa em uma área específica da sua vida.",
        "questions": [
          "Quais áreas da minha vida precisam ser mais alinhadas com a santidade de Deus?",
          "Como posso cooperar com o Espírito Santo no processo de santificação?"
        ]
      },
      {
        "day": 21,
        "title": "Nova Criação",
        "verse": "E aquele que estava assentado sobre o trono disse: Eis que faço novas todas as coisas. - Apocalipse 21:5",
        "devotional": "Chegamos ao final desta jornada de 21 dias, mas na verdade é apenas o começo. Deus está constantemente fazendo coisas novas em nossa vida. Você não é mais a mesma pessoa que começou esta jornada. Celebre a transformação que Deus operou em você.",
        "reflection": "Você é uma nova criação em Cristo. Celebre a transformação e continue crescendo na graça e no conhecimento de Deus.",
        "meditation": "Agradeça a Deus por tudo que Ele fez em sua vida durante estes 21 dias e peça direção para os próximos passos.",
        "action": "Compartilhe com alguém como Deus transformou sua vida durante esta jornada e encoraje essa pessoa a buscar a Deus.",
        "questions": [
          "Como posso continuar crescendo espiritualmente após esta jornada?",
          "Que mudanças positivas posso ver em minha vida após estes 21 dias?"
        ]
      }
    ]
  }',
  true
);