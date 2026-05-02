import { Title } from "./styles";

interface HeaderTitleProps {
    title: string;
}

export function HeaderTitle({title}: HeaderTitleProps) {
    return(
        <Title>{title}</Title>
    );
}