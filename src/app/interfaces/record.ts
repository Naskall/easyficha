export interface CustomerRecord {
  id?: string;
  clientId?: string;
  recordCode?: number;
  maxPaymentDay?: string;
  recordValue?: string;
  sellDate?: string;
  description?: string;
  recordPaid?: string;
  createdAt?: number; //Data de criação da ficha
}
