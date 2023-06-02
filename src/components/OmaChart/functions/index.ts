export function formatLink({
  version,
  repository,
  agency,
}: {
  version: string;
  repository: string;
  agency: string;
}): string {
  // Caso tenhamos a versão, o link redirecionará para o repositório na versão utilizada.
  // Caso contrário, retornará o link do próprio repositório (versão atual).
  // Tbm verificamos se a versão refere-se ao id de um container ou commit.
  if (version !== undefined && version !== 'unspecified') {
    if (version.includes('sha256')) {
      const p = repository.includes('coletor') ? 'coletor' : 'parser';
      const ag = repository.includes('cnj') ? 'cnj' : agency;

      return `${repository}/pkgs/container/${p}-${ag}/${version}`;
    }

    return `${repository}/tree/${version}`;
  }

  return `${repository}`;
}
