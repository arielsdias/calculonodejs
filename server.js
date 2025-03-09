const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsing de JSON
app.use(express.json());

// Rota para operações matemáticas
app.get('/calculate', (req, res) => {
    const { num1, num2, operation } = req.query;
    
    if (!num1 || !num2 || !operation) {
        return res.status(400).json({ error: 'Por favor, forneça num1, num2 e operation.' });
    }

    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (isNaN(number1) || isNaN(number2)) {
        return res.status(400).json({ error: 'Os valores de num1 e num2 devem ser números válidos.' });
    }

    let result;
    switch (operation) {
        case 'add':
            result = number1 + number2;
            break;
        case 'subtract':
            result = number1 - number2;
            break;
        case 'multiply':
            result = number1 * number2;
            break;
        case 'divide':
            if (number2 === 0) {
                return res.status(400).json({ error: 'Divisão por zero não é permitida.' });
            }
            result = number1 / number2;
            break;
        default:
            return res.status(400).json({ error: 'Operação inválida. Use add, subtract, multiply ou divide.' });
    }

    res.json({ result });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
