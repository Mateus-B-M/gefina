interface SummaryCard{
    label: string;
    value: string;
}

export default function SummaryCard(props: SummaryCard){
    return <div>
        <p>{props.label}</p>
        <p>{props.value}</p>
    </div>;
}