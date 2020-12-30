export async function addLoggedFile(path: string, host: string) {
  if (host.length === 0) {
    return;
  }

  return fetch(`${host}addFile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ path }),
  });
}

export async function removeLoggedFile(path: string, host: string) {
  if (host.length === 0) {
    return;
  }

  return fetch(`${host}removeFile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ path }),
  });
}
