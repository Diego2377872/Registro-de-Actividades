const { Octokit } = require("@octokit/core");

exports.handler = async (event) => {
  const token = process.env.GITHUB_TOKEN;
  const repo = 'Registro-de-Actividades';
  const owner = 'Diego_Rodriguez.Py';
  const path = 'data.json';
  const branch = 'main';

  const octokit = new Octokit({ auth: token });

  try {
    const registroNuevo = JSON.parse(event.body);

    const { data: fileData } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path,
      ref: branch
    });

    const contenidoActual = Buffer.from(fileData.content, 'base64').toString();
    const json = JSON.parse(contenidoActual);
    json.push(registroNuevo);

    const nuevoContenido = Buffer.from(JSON.stringify(json, null, 2)).toString('base64');

    await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path,
      message: 'Nuevo registro agregado',
      content: nuevoContenido,
      sha: fileData.sha,
      branch
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
