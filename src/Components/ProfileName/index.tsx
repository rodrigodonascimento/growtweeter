import { Name } from "./styles";

interface ProfileNameProps {
    $name: string;
}

export function ProfileName({$name}: ProfileNameProps) {
    return(
        <Name>{$name}</Name>
    );
}