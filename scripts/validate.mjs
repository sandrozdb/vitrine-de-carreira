import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync('index.html', 'utf8');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);

if (!html.includes('<!DOCTYPE html>')) throw new Error('DOCTYPE ausente.');
if (!html.includes('name="viewport"')) throw new Error('Viewport responsivo ausente.');
if (!html.includes('id="view-landing"')) throw new Error('Landing page ausente.');
if (!html.includes('startDiagnosis()')) throw new Error('Início do diagnóstico ausente.');
if (!html.includes('resumeProgress()')) throw new Error('Retomada de progresso ausente.');
if (!html.includes('restartDiagnosis()')) throw new Error('Reinício do diagnóstico ausente.');
if (!html.includes("goTo('landing')")) throw new Error('Retorno à landing page ausente.');
if (!html.includes('localStorage.setItem')) throw new Error('Persistência local ausente.');
if (!html.includes('localStorage.removeItem')) throw new Error('Limpeza do progresso ausente.');
if (!/@media\(max-width:430px\)/.test(html)) throw new Error('Regra mobile principal ausente.');
if (scripts.length === 0) throw new Error('JavaScript da aplicação ausente.');

for (const [index, source] of scripts.entries()) {
  new vm.Script(source, { filename: `inline-script-${index + 1}.js` });
}

console.log('Validação estrutural e sintática concluída com sucesso.');
