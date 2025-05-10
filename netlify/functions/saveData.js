const fetch = require('node-fetch');

const token = process.env.GITHUB_TOKEN;
const repo = "Diego2377872/Registro-de-Actividades";
const filePath = "data.json";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método no permitido" };
  }

  try {
    const nuevoRegistro = JSON.parse(event.body);

    const getFile = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      }
    });

    if (!getFile.ok) {
      throw new Error("No se pudo obtener el archivo data.json");
    }

    const fileData = await getFile.json();
    const content = Buffer.from(fileData.content, "base64").toString("utf-8");
    const registros = JSON.parse(content);

    registros.push(nuevoRegistro);

    const newContent = Buffer.from(JSON.stringify(registros, null, 2)).toString("base64");

    const update = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        message: "Nuevo registro desde Netlify",
        content: newContent,
        sha: fileData.sha,
        committer: {
          name: "Netlify Bot",
          email: "bot@netlify.com",
        }
      }),
    });

    if (!update.ok) {
      const errorText = await update.text();
      throw new Error(`Fallo al guardar: ${errorText}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Registro guardado exitosamente." }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
