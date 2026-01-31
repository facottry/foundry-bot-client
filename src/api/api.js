export class ApiClient {
    constructor(serverUrl, token) {
        this.serverUrl = serverUrl;
        this.token = token;
    }

    async startSession() {
        const res = await fetch(`${this.serverUrl}/api/session/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({})
        });

        if (!res.ok) {
            throw new Error(`Session Start Error: ${res.statusText}`);
        }

        return await res.json();
    }

    async askPersona(query, persona = null, productId = null) {
        const res = await fetch(`${this.serverUrl}/api/persona/ask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({
                query,
                persona,
                productId
            })
        });

        if (!res.ok) {
            throw new Error(`Persona Ask Error: ${res.statusText}`);
        }

        return await res.json();
    }

    async query(text, context) {
        const res = await fetch(`${this.serverUrl}/api/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({
                query: text,
                context: context
            })
        });

        if (!res.ok) {
            throw new Error(`API Error: ${res.statusText}`);
        }

        return await res.json();
    }
}

