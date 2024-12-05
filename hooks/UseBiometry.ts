import * as LocalAuthentication from "expo-local-authentication";

interface IAuthenticateUser {
  successAuth: () => void;
}

async function authenticateUser({ successAuth }: IAuthenticateUser) {
  try {
    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      successAuth();
    } else {
      alert(`Autenticação falhou: ${result}`);
    }
  } catch (error) {
    alert(`Erro durante a autenticação: ${error}`);
  }
}

export default authenticateUser;
