import type {Invoice} from './invoiceType.tsx';
import {
    situationLabel,
    formatCurrency,
    formatDate
} from './utils.ts';

interface InvoiceRowProps {
    invoice: Invoice;
}

export default function ImportRow(props: InvoiceRowProps){
    return <tr>
        <td>{props.invoice.customer.name}</td>
        <td>{formatCurrency(props.invoice.amount)}</td>
        <td>{formatDate(props.invoice.issueDate)}</td>
        <td>{formatDate(props.invoice.dueDate)}</td>
        <td>{situationLabel(props.invoice.situation)}</td>
    </tr>;
}