# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

Samuel Soares tem 17 anos, é estudante do ensino médio. Pretende se preparar para o vestibular e adequar a nova rotina sem perder muito dos seus momentos de diversão. Escola, tarefas, namorada, futebol no fim de semana e agora o vetibular estão lhe dando dor de cabeça. Está à procura de algo que o ajude a se displinar.   

Claudia Ferreira tem 43 anos, é promotora de vendas. Recém divorciada, dividir a guarda da filha pequena está sendo uma dor de cabeça. Seja busca-la na natacão, escola ou festa, ou passar o fim de semana na casa do pai, percebeu que precisa se gerenciar melhor. Não esquece algo com frequência mas anda estressada recentemente.

Joaquim Cleto tem 68 anos, é mecânico aposentado. Seu médico do coração recomendou a fazer atividades físicas. Sua esposa tem que ficar lembrando-o dos horários do pilates, de tomar remédios e até mesmo dos retornos das consultas. Pediu ao seu filho para ajuda-lo, principalmente para dar sossego a mulher.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário viajante  |Ajustar automaticamente os fusos horários para compromissos         | Garantir que meus eventos estejam corretamente programados              |
|Usuário que tem uma agenda lotada       | Visualizar meus compromissos em um calendário mensal| Ter uma visão geral clara do meu mês e planejar melhor meus horários|
|Usuário que compartilha a agenda com colegas de trabalho       |  Compartilhar eventos e compromissos com outras pessoas| TCoordenar melhor os horários e evitar conflitos|
|Administrador       | Visualizar relatórios de uso do sistema| Monitorar a frequência de uso e identificar possíveis melhorias para a aplicação|
|Administrador       | Ter a capacidade de excluir ou editar compromissos de qualquer usuário| Resolver problemas de agendamentos incorretos ou duplicados|



Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário gerencie itens (tarefas/reuniões) | ALTA | 
|RF-002| Emitir relatórios de tarefas no mês/semana/dia | MÉDIA |
|RF-003| Ajustar automaticamente os fusos horários para itens | ALTA |
|RF-004| Visualizar compromissos em um calendário mensal/semanal/diário | ALTA |
|RF-005| Compartilhar eventos e compromissos com outras pessoas | ALTA |
|RF-006| Administradores podem visualizar relatórios de uso do sistema | MÉDIA |
|RF-007| Administradores podem gerenciar itens de qualquer usuário | ALTA |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s | BAIXA | 
|RNF-003| O sistema deve garantir a segurança dos dados dos usuários | ALTA |
|RNF-002| A interface deve ser intuitiva e fácil de usar para todas as personas | ALTA |


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
