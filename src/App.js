import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Importando o arquivo CSS

function App() {
    const [cidade, setCidade] = useState('');
    const [clima, setClima] = useState(null);
    const [erro, setErro] = useState('');

    const apiKey = 'eeb7f2a26301847eb4e27e7212c6f44e'; // Substitua pela sua chave da API

    const buscarClima = () => {
        if (!cidade) {
            setErro('Por favor, insira o nome da cidade.');
            return;
        }
        
        setErro('');
        
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric`)
            .then(response => {
                const { temp, humidity } = response.data.main;
                const { speed } = response.data.wind;
                const weatherDescription = response.data.weather[0].description;

                setClima({
                    temperatura: temp,
                    umidade: humidity,
                    velocidadeVento: speed,
                    descricao: weatherDescription,
                });
            })
            .catch(error => {
                setClima(null);
                setErro('Cidade não encontrada. Tente novamente.');
                console.error(`Erro ao buscar dados para ${cidade}:`, error);
            });
    };

    return (
        <div className="app-container">
            <h1 className="titulo">Consulta de Clima</h1>
            <input 
                className="input-cidade"
                type="text" 
                placeholder="Digite o nome da cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
            />
            <button className="botao" onClick={buscarClima}>Buscar Clima</button>
            {erro && <p className="erro">{erro}</p>}
            {clima && (
                <div className="resultado">
                    <p>A temperatura em {cidade} é: {clima.temperatura} °C</p>
                    <p>Umidade: {clima.umidade}%</p>
                    <p>Velocidade do vento: {clima.velocidadeVento} m/s</p>
                    <p>Condições climáticas: {clima.descricao}</p>
                </div>
            )}
        </div>
    );
}

export default App;