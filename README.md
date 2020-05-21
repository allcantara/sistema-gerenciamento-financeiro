# Sistema de Gerenciamento Financeiro
Sistema desenvolvido para o teste de desenvolvedor junior da Perithus.
Clique aqui para [acessar a aplicação.](https://sigefi-frontend.herokuapp.com/)


### Desafio
"Temos pequenos distribuidores de sabonete que fazem esta atividade como uma renda extra familiar. Como não há uma educação econômica adequadamente provida a estes, faremos um pequeno sistema Web para ajudá-los a entender melhor como faturar e lucrar com a venda e distribuição dos produtos."

O principal desafio para a implementação dos requisitos foram os cálculos e em como aplicá-los de forma coerente no código. Deixei todo o "trabalho duro" pro backend e usei o frontend exclusivamente para a criação e exibição dos dados.

O desafio para dev junior teria o prazo de 5 dias. Minha alternativa foi focar no frontend para que ficasse com uma aparência moderna e criativa, que levou 3 dias. Os útimos dois dias foram exclusivos para o backend e a integração de ambas as aplicações.

### Solução
- Layout: Todo o layout foi criado utilizando o MaterialUI, para agilizar o processo de desenvolvimento.
- Criação dos registro: Para que o usuário cadastre as informações de uma forma mais simples, utilizei um componente de Modal, como os campos necessário para o cadastro.
- Exibição: Para a exibição dos dados utilizei uma tabela do MaterialUI. Ao clicar no item da lista é aberto um outro modal específico para atualização dos dados cadastrados como, por exemplo, marcar o imposto como pago.
- Rotas: O sistema possui apenas quatro rotas. Uma para cadastro de usuário, login, dashboard e impostos. 
- Dashboard: Esta é a rota principal da aplicação. Nela contém os relatórios de venda, a lista das vendas e as funcionalidades de cadastrar e excluir os registros.
- Impostos: Esta é a rota que contém os impostos. Nela é possível marcar o imposto como pago e filtrar a pesquisa.
- Relatório de vendas: No momento em que uma venda é cadastrada o dashboard é atualizado com as novas informações já calculadas pelo backend. As informações em iniciais são a quantidade de venda e o lucro que o usuário terá após efetuar o pagamento das taxas e impostos.
- Marcar imposto e taxas como pagas: Ao marcar o imposto da venda como pago, o relatório é atualizado automaticamente com a soma da quantidade de impostos que forão pagos. E ao marcar a taxa do distribuidor como paga, o relatório também é atualizado informando ao usuário as despesas com a venda.

Também fiz o uso de contextos na aplicação para controlar os componentes e compartilhar informações de estado e funções comuns entre os componentes pai e filho. Com o objetivo de componentizar todas as partes do sistema e facilitar na solução de erros e busca de partes específicas, dividi a implementação em vários arquivos e pastas.
