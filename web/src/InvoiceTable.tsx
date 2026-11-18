import InvoiceRow from './InvoiceRow.tsx';
import type { Invoice } from './invoiceType.ts';

interface InvoiceTableProps {
  invoices: Invoice[];
  edit: (invoice: Invoice) => void;
}

export default function InvoiceTable(props: InvoiceTableProps) {
  const base =
    'p-3 text-sm font-medium border-b border-border text-text-muted';

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className={`${base} text-left`}>Cliente</th>
          <th className={`${base} text-left`}>Valor</th>
          <th className={base}>Data de Emissão</th>
          <th className={base}>Data de Vencimento</th>
          <th className={base}>Situação</th>
          <th className={base}></th>
        </tr>
      </thead>
      <tbody>
        {props.invoices.map((invoice) => (
          <InvoiceRow
            key={invoice.id}
            invoice={invoice}
            edit={props.edit}
          />
        ))}
      </tbody>
    </table>
  );
}
