# Visão Automotiva
## (Em desenvolvimento)

**Visão Automotiva** é uma aplicação web focada em análise de dados veiculares no Brasil. Utilizando a API da Tabela FIPE (Parallelum), o sistema fornece uma visão clara e organizada de preços médios, marcas, modelos e variações ao longo do tempo.

## Objetivo

Oferecer uma plataforma que permita ao usuário explorar e analisar dados de veículos (carros, motos e caminhões) com base na Tabela FIPE, com foco em clareza visual e insights úteis.

## Funcionalidades

- Listagem de marcas disponíveis por tipo de veículo  
- Visualização de modelos e versões por marca  
- Consulta por ano/modelo com exibição de preço médio FIPE  
- UI responsiva e intuitiva  

## Diferenciais

- 100% focado no contexto brasileiro  
- Dados em tempo real com a Tabela FIPE  
- Uso de **URL State** para navegação fluida e compartilhamento de contexto atual  
- Estrutura pensada para expansão futura  
- **Arquitetura limpa**, com separação clara de responsabilidades e foco em manutenibilidade  
- **Cache inteligente com tags únicas** para cada requisição, otimizando o uso da API  

## Limitação da API

A API da Tabela FIPE (Parallelum) é **gratuita**, mas possui um **limite de 1000 requisições por dia**.  
Por isso, o sistema utiliza **cache nativo do Next.js com tags únicas por requisição**, garantindo desempenho e evitando ultrapassar o limite diário de chamadas.

### Termos técnicos

**URL State**  
  Técnica que armazena o estado da interface diretamente na URL, usando query strings ou path dinâmico. Isso permite:
  - Compartilhar links com filtros já aplicados (ex: seleção de modelo e ano)  
  - Persistência de estado ao atualizar a página  
  - Melhor usabilidade e SEO  

**API da Tabela FIPE (Parallelum)**  
  Serviço gratuito que expõe os dados da Tabela FIPE por meio de endpoints REST. Permite consultar marcas, modelos, anos e valores médios de veículos. Possui limite de 1000 requisições diárias.  

**UI Responsiva**  
  Interface adaptável a diferentes tamanhos de tela, garantindo boa experiência tanto em mobile quanto desktop.  

**Arquitetura Limpa (Clean Architecture)**  
  Organização do código que separa responsabilidades (ex: domínio, aplicação, infraestrutura), facilitando manutenção, testes e escalabilidade.
