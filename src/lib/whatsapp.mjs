export const WHATSAPP_NUMBER = '5531972541945';

/** @param {string} message */
export function whatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** @param {{name: string, city: string, service: string}} values */
export function buildWhatsAppUrl({ name, city, service }) {
  const fields = [name, city, service].map(value => value.trim());
  if (fields.some(value => !value)) throw new Error('Preencha nome, cidade e exame.');
  return whatsAppUrl([
    '*Solicitação de Agendamento - Site*', '',
    `Nome: ${fields[0]}`, `Cidade: ${fields[1]}`, `O que precisa: ${fields[2]}`,
  ].join('\n'));
}

export function buildQuestionWhatsAppUrl() {
  return whatsAppUrl('Olá! Vim pelo site e gostaria de tirar uma dúvida.');
}
