import express from 'express'

import { StaticDatabase } from '../utils/staticDatabase.js'
export const database = new StaticDatabase()
;(function () {
  let shuffle = (array) => {
    let currentIndex = array.length
    let randomIndex

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]

      return array
    }
  }

  const titles = shuffle([
    'Melhores projetos NLW 2022',
    'Como participar da próxima NLW Rocketseat?',
    'Tutoriais NLW para iniciantes',
    'NLW: Dicas para se destacar nos projetos',
    'Comunidade NLW: Conecte-se com desenvolvedores',
    'NLW vs Outras Hackathons: Comparação completa',
    'Desafios avançados NLW para desenvolvedores experientes',
    'Recursos NLW para aprimorar suas habilidades',
    'Destaques NLW: Projetos inovadores e criativos',
    'Experiências dos participantes em Todas as NLW',
    'NLW onde assistir',
    'Projetos NLW para codar',
    'NLW Rocketseat',
    'Todas as NLW',
    'Desafios Diários da Rocketseat: Como Participar?',
    'NLW CodeLab: Novas Tecnologias e Desenvolvimento Ágil',
    'Rocketseat Summit: Evento Online sobre Inovação e Tecnologia',
    'Edições Passadas da NLW: Um Resumo Completo',
    'Carreiras na Rocketseat: Oportunidades e Caminhos Profissionais',
    'Segredos do Sucesso: Entrevistas com Participantes Destacados da NLW',
    'Workshops Exclusivos da Rocketseat: Aprenda com Especialistas',
    'NLW Hackathon: Desenvolva Soluções Inovadoras em Tempo Real',
    'Rocketseat Pro: Benefícios e Recursos para Assinantes',
    'História da NLW: Como Tudo Começou e Evoluiu',
    'Rocketseat Live Coding: Sessões Práticas com Profissionais',
    'NLW Open Source: Colabore em Projetos de Código Aberto',
    'Mentorias na Rocketseat: Orientação Personalizada para Desenvolvedores',
    'Desenvolvimento Mobile: NLW React Native em Foco',
    'Rocketseat Tech Talks: Palestras sobre as Últimas Tendências em Tecnologia',
    'NLW Desafio Full Stack: Teste Suas Habilidades de Frontend e Backend',
    'Paçoca',
  ])

  for (let i = 0; i < titles.length; i++) {
    database.create({
      title: titles[i],
      url: 'https://mayk.brito',
      description: titles[i],
    })
  }
})()

export const router = express.Router()

router.get('/api', (req, res) => {
  const { search } = req.query

  if (search.trim() != '') {
    res.status(200).json({
      SearchedDataAmount: database.getSearchDataByQuery(search.trim()).length,
      SearchedData: database.getSearchDataByQuery(search.trim()),
    })
  } else {
    res.status(200).json({
      DataAmount: database.getManySearchData().length,
      Data: database.getManySearchData(),
    })
  }
})
