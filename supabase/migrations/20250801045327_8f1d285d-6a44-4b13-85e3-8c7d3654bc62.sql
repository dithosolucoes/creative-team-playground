-- Inserir a experiência devocional original com 21 dias de conteúdo
INSERT INTO experiences (
  title,
  description,
  template_id,
  content,
  is_active
) VALUES (
  'Experiência Devocional - Jornada Espiritual',
  'Uma jornada de crescimento espiritual através de devocionais diários, passagens bíblicas interativas, quiz de reflexão e momentos de oração guiada',
  1,
  '{
    "totalDays": 21,
    "days": {
      "1": {
        "titulo": "A Importância da Oração",
        "devocional": "A oração é o meio pelo qual nos comunicamos com Deus. É através dela que expressamos nossa gratidão, apresentamos nossos pedidos e buscamos direcionamento divino. Quando oramos, entramos em intimidade com o Criador do universo...",
        "passagem": {
          "referencia": "Filipenses 4:6-7",
          "texto": "Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. E a paz de Deus, que excede todo o entendimento, guardará o coração e a mente de vocês em Cristo Jesus."
        },
        "quiz": {
          "pergunta": "Segundo o texto de hoje, o que devemos fazer quando estamos ansiosos?",
          "opcoes": ["Nos preocupar mais", "Orar e apresentar nossos pedidos a Deus", "Ignorar os problemas", "Buscar soluções sozinhos"],
          "resposta_correta": 1
        },
        "oracao": {
          "titulo": "Oração de Gratidão",
          "conteudo": "Senhor, obrigado por este novo dia. Obrigado pela oportunidade de crescer espiritualmente através desta jornada. Ajude-me a aplicar os ensinamentos em minha vida..."
        }
      },
      "2": {
        "titulo": "A Fé que Move Montanhas",
        "devocional": "A fé é a certeza de coisas que se esperam, a convicção de fatos que não se veem. Quando exercitamos nossa fé, demonstramos confiança absoluta em Deus e em Suas promessas...",
        "passagem": {
          "referencia": "Mateus 17:20",
          "texto": "Por causa da pequenez da vossa fé. Em verdade vos digo que, se tiverdes fé como um grão de mostarda, direis a este monte: Passa daqui para acolá - e há de passar; e nada vos será impossível."
        },
        "quiz": {
          "pergunta": "O que Jesus comparou com a fé para mostrar seu poder?",
          "opcoes": ["Uma árvore grande", "Um grão de mostarda", "Uma rocha", "Um oceano"],
          "resposta_correta": 1
        },
        "oracao": {
          "titulo": "Oração pela Fé",
          "conteudo": "Deus, aumenta a minha fé. Ajuda-me a confiar em Ti mesmo quando as circunstâncias parecem impossíveis. Que eu possa ver além do visível..."
        }
      },
      "3": {
        "titulo": "O Amor Incondicional",
        "devocional": "O amor de Deus por nós é incondicional e eterno. Não há nada que possamos fazer para conquistá-lo ou perdê-lo. Este amor nos transforma e nos capacita a amar outros da mesma forma...",
        "passagem": {
          "referencia": "1 João 4:19",
          "texto": "Nós amamos porque ele nos amou primeiro."
        },
        "quiz": {
          "pergunta": "Por que conseguimos amar verdadeiramente?",
          "opcoes": ["Porque somos bons por natureza", "Porque Deus nos amou primeiro", "Porque aprendemos com outros", "Porque é um instinto natural"],
          "resposta_correta": 1
        },
        "oracao": {
          "titulo": "Oração de Amor",
          "conteudo": "Pai celestial, obrigado por Teu amor incondicional. Enche meu coração com este mesmo amor para que eu possa compartilhá-lo com outros..."
        }
      }
    }
  }',
  true
);