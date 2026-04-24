import { ButtonForm, CardLogin, CardLoginForm, CardWelcome, ContainerLogin, FormLogin, HasAnAccount, InputFormLogin, LabelFormLogin, LinkCreateAccount, TitleEnterAccount } from "./styles";

export function Login() {
    return (
        <ContainerLogin>
            <CardLogin>
                <CardWelcome>
                    <h1>Growtwitter</h1>
                    <p>O Growtwitter é a plataforma definitiva para todos os apaixonados por redes sociais que buscam uma experiência familiar e poderosa, semelhante ao Twitter, mas com um toque único. Seja parte desta comunidade que valoriza a liberdade de expressão, a conexão com pessoas de todo o mundo e a disseminação de ideias.</p>
                </CardWelcome>
                <CardLoginForm>
                    <TitleEnterAccount>Entrar no Growtwitter</TitleEnterAccount>
                    <FormLogin>
                        <LabelFormLogin htmlFor="">Username</LabelFormLogin>
                        <InputFormLogin type="text" />
                        <LabelFormLogin htmlFor="">Password</LabelFormLogin>
                        <InputFormLogin type="password" />
                        <ButtonForm>Entrar</ButtonForm>
                    </FormLogin>
                    <HasAnAccount>Ainda não tem uma conta?</HasAnAccount>
                    <LinkCreateAccount to={'/signup'}>Cadastre-se</LinkCreateAccount>
                </CardLoginForm>
            </CardLogin>
        </ContainerLogin>
    );
}