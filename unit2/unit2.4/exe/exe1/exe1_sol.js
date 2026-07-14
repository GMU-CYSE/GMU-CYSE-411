const express = require('express');
const session = require('express-session');
const crypto = require('crypto'); // Para gerar tokens seguros
const app = express();

app.use(express.urlencoded({ extended: true }));

// 1. Defesa SameSite no Cookie de Sessão
app.use(session({
    secret: 'seu_segredo_super_seguro',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: true, // Requer HTTPS em produção
        sameSite: 'strict' // Impede o envio do cookie em requisições vindas de fora do site
    }
}));

// Endpoint para servir a página com o Token CSRF
app.get("/transfer", (req, res) => {
    // Cria um token único se não existir na sessão
    if (!req.session.csrfToken) {
        req.session.csrfToken = crypto.randomBytes(32).toString('hex');
    }
    
    // Retorna o formulário passando o token para o HTML
    res.send(`
        <form action="https://bank.com/transfer" method="POST">
            <input type="hidden" name="csrf_token" value="${req.session.csrfToken}">
            <input type="hidden" name="to" value="attacker">
            <input type="hidden" name="amount" value="1000">
            <input type="submit" value="Transfer">
        </form>
    `);
});

// Processamento da Transferência
app.post("/transfer", (req, res) => {
    const user = req.session.user;
    const targetOrigin = "https://bank.com";

    // 3. Validação do Origin / Referer (Origin Validation)
    const origin = req.headers.origin || req.headers.referer;
    if (!origin || !origin.startsWith(targetOrigin)) {
        return res.status(403).send("Erro: Requisição de origem não confiável (Falha na validação de Origem).");
    }

    // 4. Validação do Token CSRF
    const clientToken = req.body.csrf_token;
    const sessionToken = req.session.csrfToken;

    if (!clientToken || clientToken !== sessionToken) {
        return res.status(403).send("Erro: Token CSRF inválido ou ausente.");
    }

    // Se passou em todas as defesas, executa a ação segura
    transfer(user, req.body.to, req.body.amount);
    res.send("Transferência realizada com sucesso!");
});