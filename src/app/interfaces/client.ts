//Esta interface equivale à tabela num DB relacional

export interface Client {
  id?: string; //Código do cliente;
  fullName?: string; //Nome completo do cliente
  cpf?: string; // CPF do cliente
  cep?: string; // CEP do cliente
  logradouro?: string; //Endereço do Cliente
  bairro?: string;
  cidade?: string;
  numero?: string;
  uf?: string;
  phone?: string; //Telefone
  maxValue?: string; //Valor limite máximo
  maxPaymentDay?: number; //Quantidade de dias para pagamento
  timeToPush?: number; //Intervalo de notificação
  pushType?: string; //Método de notificação
  createdAt?: number; //Data de criação do cliente
  userId?: string; //Responsável pelo cadastro
}
