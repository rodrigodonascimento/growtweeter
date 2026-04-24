import { Username } from "./styles";

export interface ProfileUsernameProps {
    $userName: string;
    $dateCreated?: string;
}

export function ProfileUsername({$userName, $dateCreated=''}: ProfileUsernameProps) {
    return (
        <Username >{$userName} {$dateCreated}</Username>
    );
}