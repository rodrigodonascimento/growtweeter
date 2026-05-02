import { useContext } from "react";
import { TweetContext } from "../contexts/TweetContext"; // Ajuste o caminho se necessário

export const useTweets = () => {
    const context = useContext(TweetContext);

    // Segurança: avisa se você esquecer de colocar o Provider em volta do App
    if (!context) {
        throw new Error("useTweets deve ser usado dentro de um TweetProvider");
    }

    return context;
};