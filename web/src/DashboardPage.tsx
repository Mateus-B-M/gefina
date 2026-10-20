import { useState, useEffect } from 'react';

import type {Dashboard} from './dashboardType.ts';

import SummaryCard from './SummaryCard.tsx';
import InvoiceSummaryTable from './InvoiceSummaryTable.tsx';

import {formatCurrency} from './utils.ts';

export default function DashboardPage() {
 const [dashboard, setDashboard ] = useState<null | Dashboard>(null);
 const [error, setError] = useState<string | null>(null)
 const[loading, setloading] = useState(true);

 
useEffect(() => {
  async function getDashboard() {
    try {
      const response = await fetch('/api/dashboard');

     if( !response.ok){
      setError('Não foi possível carregar faturas.');
      setloading(false);
      return;
     }

     const datas = await response.json();
     setDashboard(datas);

    } catch{
      setError('Não foi possível carregar faturas.');

    }
    
    setloading(false);
}


  getDashboard();
    
  },[]);
  if (loading) return <p>Carregando faturas...</p>


  if (error || dashboard===null) return <p>{error}</p>;

 return <>
    <h1>Painel Inicial</h1>

    <div>
        <SummaryCard label='Total Recebido:' value={formatCurrency(dashboard.totals.paid)}/>
        <SummaryCard label='Total Pendente:' value={formatCurrency(dashboard?.totals.pending)}/>
        <SummaryCard label='Faturas:' value={String(dashboard.totals.invoiceCount)}/>
        <SummaryCard label='Clientes' value={String(dashboard.totals.customerCount)}/>
        </div>
 

 <InvoiceSummaryTable
    title='Faturas recentes'
    dateLabel='Emissão'
    invoices={dashboard.recentInvoices}
    date={(invoice) => invoice.issueDate}
 />
 <InvoiceSummaryTable
    title='Faturas atrasadas'
    dateLabel='Vencimento'
    invoices={dashboard.overdueInvoices}
    date={(invoice) => invoice.dueDate}
 />
 </>;
}