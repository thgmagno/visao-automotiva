'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { motion } from 'framer-motion'

export function TabAbout() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-12 mb-20 space-y-4"
    >
      <p>
        <strong>Visão Automotiva</strong> é uma aplicação web focada em análise
        de dados veiculares no Brasil. Utilizando a API da Tabela FIPE
        (Parallelum), o sistema fornece uma visão clara e organizada de preços
        médios, marcas, modelos e variações ao longo do tempo.
      </p>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="objetivo">
          <AccordionTrigger>Objetivo</AccordionTrigger>
          <AccordionContent>
            Oferecer uma plataforma que permita ao usuário explorar e analisar
            dados de veículos (carros, motos e caminhões) com base na Tabela
            FIPE, com foco em clareza visual e insights úteis.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="funcionalidades">
          <AccordionTrigger>Funcionalidades</AccordionTrigger>
          <AccordionContent className="space-y-1">
            <ul className="list-inside list-disc">
              <li>Listagem de marcas disponíveis por tipo de veículo</li>
              <li>Visualização de modelos e versões por marca</li>
              <li>Consulta por ano/modelo com exibição de preço médio FIPE</li>
              <li>UI responsiva e intuitiva</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="diferenciais">
          <AccordionTrigger>Diferenciais</AccordionTrigger>
          <AccordionContent className="space-y-1">
            <ul className="list-inside list-disc">
              <li>100% focado no contexto brasileiro</li>
              <li>Dados em tempo real com a Tabela FIPE</li>
              <li>
                Uso de <strong>URL State</strong> para navegação fluida e
                compartilhamento de contexto atual
              </li>
              <li>Estrutura pensada para expansão futura</li>
              <li>
                <strong>Arquitetura limpa</strong>, com separação clara de
                responsabilidades e foco em manutenibilidade
              </li>
              <li>
                <strong>Cache inteligente com tags únicas</strong> para cada
                requisição, otimizando o uso da API
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="limitacoes">
          <AccordionTrigger>Limitação da API</AccordionTrigger>
          <AccordionContent>
            A API da Tabela FIPE (Parallelum) é <strong>gratuita</strong>, mas
            possui um <strong>limite de 1000 requisições por dia</strong>.<br />
            Por isso, o sistema utiliza{' '}
            <strong>
              cache nativo do Next.js com tags únicas por requisição
            </strong>
            , garantindo desempenho e evitando ultrapassar o limite diário de
            chamadas.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="termos">
          <AccordionTrigger>Termos Técnicos</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div>
              <strong>URL State</strong>
              <br />
              Técnica que armazena o estado da interface diretamente na URL,
              usando query strings ou path dinâmico. Isso permite:
              <ul className="list-inside list-disc">
                <li>
                  Compartilhar links com filtros já aplicados (ex: seleção de
                  modelo e ano)
                </li>
                <li>Persistência de estado ao atualizar a página</li>
                <li>Melhor usabilidade e SEO</li>
              </ul>
            </div>

            <div>
              <strong>API da Tabela FIPE (Parallelum)</strong>
              <br />
              Serviço gratuito que expõe os dados da Tabela FIPE por meio de
              endpoints REST. Permite consultar marcas, modelos, anos e valores
              médios de veículos. Possui limite de 1000 requisições diárias.
            </div>

            <div>
              <strong>UI Responsiva</strong>
              <br />
              Interface adaptável a diferentes tamanhos de tela, garantindo boa
              experiência tanto em mobile quanto desktop.
            </div>

            <div>
              <strong>Arquitetura Limpa (Clean Architecture)</strong>
              <br />
              Organização do código que separa responsabilidades (ex: domínio,
              aplicação, infraestrutura), facilitando manutenção, testes e
              escalabilidade.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="referencias">
          <AccordionTrigger>Referências</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <ul className="list-inside list-disc">
              <li>
                <a
                  href="https://fipe.online/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Site FIPE Online
                </a>
              </li>
              <li>
                <a
                  href="https://deividfortuna.github.io/fipe/v2/#tag/Fipe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Documentação da API
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/deividfortuna/fipe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Repositório no GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://stats.uptimerobot.com/LRYkBHkBJ4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Status da API (UptimeRobot)
                </a>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  )
}
