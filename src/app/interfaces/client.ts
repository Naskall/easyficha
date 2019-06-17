export interface Client {
  id?: string; //Código do cliente;
  fullName?: string; //Nome completo do cliente
  cpf?: string; // CPF do cliente
  address?: string; //Endereço do Cliente
  phone?: string; //Telefone
  maxValue?: string; //Valor limite máximo
  maxPaymentDay?: number; //Quantidade de dias para pagamento
  timeToPush?: number; //Intervalo de notificão
  pushType?: string; //Método de notificação
  createdAt?: number; //Data de criação do cliente
  userId?: string; //Resposável pelo cadastro
}
