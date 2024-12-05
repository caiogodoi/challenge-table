/**
 * Aplica a máscara de CPF no formato 000.000.000-00
 * @param cpf - O número de CPF como string ou número.
 * @returns O CPF formatado ou uma mensagem de erro se o valor for inválido.
 */
export const cpfMask = (cpf: string | number): string => {
    const cpfStr = cpf.toString().replace(/\D/g, '');
    return cpfStr.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
