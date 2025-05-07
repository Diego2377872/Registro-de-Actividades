const { Octokit } = require("@octokit/rest");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = "tu_usuario";   // Cambia esto por tu usuario GitHub
const REPO = "tu_repo";       // Cambia esto por tu repositorio
const FILE_PATH = "data.json";

exports.handler = async (event) => {
  const registro = JSON.parse(event.body);
  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  try {
    const { data: file } = await octokit.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path: FILE_PATH
    });

    const decoded = Buffer.from(file.content, 'base64').toString();
    const registros = JSON.parse(decoded);
    registros.push(registro);

    const updatedContent = Buffer.from(JSON.stringify(registros, null, 2)).toString('base64');

    await octokit.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: FILE_PATH,
      message: "Actualizar registros",
      content: updatedContent,
      sha: file.sha
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Registro guardado" })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
