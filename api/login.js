export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método não permitido" });
    }

    const { username, password } = req.body;

    const response = await fetch("https://keyauth.win/api/1.2/", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            type: "login",
            username,
            password,
            name: process.env.APP_NAME,
            ownerid: process.env.OWNER_ID,
            secret: process.env.APP_SECRET,
            version: "1.0"
        })
    });

    const data = await response.json();
    return res.status(200).json(data);
}
