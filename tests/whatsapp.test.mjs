import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildQuestionWhatsAppUrl, buildWhatsAppUrl } from '../src/lib/whatsapp.mjs';

test('preserves accents, trims fields, and safely encodes the scheduling message', () => {
  const url = new URL(buildWhatsAppUrl({ name: '  João & Ana  ', city: 'São João', service: 'Tomografia com contraste + orientação' }));
  assert.equal(url.origin + url.pathname, 'https://wa.me/5531972541945');
  assert.equal(url.searchParams.get('text'), '*Solicitação de Agendamento - Site*\n\nNome: João & Ana\nCidade: São João\nO que precisa: Tomografia com contraste + orientação');
});

test('does not create an appointment link with empty or whitespace-only fields', () => {
  for (const field of ['name', 'city', 'service']) {
    assert.throws(() => buildWhatsAppUrl({ name: 'Maria', city: 'Itaguara', service: 'Tomografia', [field]: '  ' }), /Preencha/);
  }
});

test('builds a direct WhatsApp link for quick questions', () => {
  const url = new URL(buildQuestionWhatsAppUrl());
  assert.equal(url.origin + url.pathname, 'https://wa.me/5531972541945');
  assert.equal(url.searchParams.get('text'), 'Olá! Vim pelo site e gostaria de tirar uma dúvida.');
});
