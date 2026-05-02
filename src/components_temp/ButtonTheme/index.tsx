import { BsMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa6";
import { useTheme } from './../../contexts/ThemeContext';
import { IconWrapper } from './styles';

export function ButtonTheme() {
    const {themeTitle, toggleTheme} = useTheme();

    return (
        <IconWrapper onClick={toggleTheme}>
            {themeTitle === 'light' ? <BsMoonStarsFill /> : <FaSun />}
        </IconWrapper>
    );
}