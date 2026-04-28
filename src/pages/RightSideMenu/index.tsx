import { ContainerSideBar } from "../../components/SideBar/styles";
import { CardInformation, CardRightSide, Information, InformationItem, InfromationTopic, MoreInformation, TitleRightSide } from "./styles";

export function RightSideMenu() {
    return (
        <ContainerSideBar>
            <CardRightSide>
                <TitleRightSide>O que está acontecendo?</TitleRightSide>
                <CardInformation>
                    <InformationItem>
                        <Information>Esportes - Há 45 min</Information>
                        <InfromationTopic>Assunto sobre esportes</InfromationTopic>
                    </InformationItem>
                    <InformationItem>
                        <Information>Assunto do Momento em Brasil</Information>
                        <InfromationTopic>Assunto do Momento</InfromationTopic>
                    </InformationItem>
                    <InformationItem>
                        <Information>Música - Assunto do Momento</Information>
                        <InfromationTopic>Assunto sobre Música</InfromationTopic>
                    </InformationItem>
                    <InformationItem>
                        <Information>Cinema - Assunto do Momento</Information>
                        <InfromationTopic>Assunto sobre Filmes e Cinema</InfromationTopic>
                    </InformationItem>
                </CardInformation>
                <div>
                    <MoreInformation to={'explore'}>Mostrar mais</MoreInformation>
                </div>
            </CardRightSide>
        </ContainerSideBar>
    );
}