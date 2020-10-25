export function haveUserIdInPath(path: string) {
  const pathSplit = path.split('/');

  const index = pathSplit.indexOf('users');

  let id: number = 0;

  try {
    if(index !== pathSplit.length - 1) {
      id = Number(pathSplit[index + 1]);
    }
  }
  catch { }

  return id;
}

export function verifyMandatoryFields(body: Record<string, any>, mandatoryFields: string[]) {
  const emptyFields: string[] = [];

  for(const field of mandatoryFields) {
    if(!body[field]) {
      emptyFields.push(field);
    }
  }

  return emptyFields;
}