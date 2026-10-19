import type { ComponentFixture } from '@angular/core/testing';

function setInput(host: HTMLElement, selector: string, value: string): void {
  const input = host.querySelector(selector);
  if (!(input instanceof HTMLInputElement) && !(input instanceof HTMLTextAreaElement)) {
    throw new Error(`No se encontró el input ${selector}.`);
  }
  input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function setSelect(host: HTMLElement, selector: string, value: string): void {
  const select = host.querySelector(selector);
  if (!(select instanceof HTMLSelectElement)) {
    throw new Error(`No se encontró el select ${selector}.`);
  }
  select.value = value;
  select.dispatchEvent(new Event('change', { bubbles: true }));
}

function submit(host: HTMLElement): void {
  const form = host.querySelector('form');
  if (!(form instanceof HTMLFormElement)) {
    throw new Error('No se encontró el formulario.');
  }
  form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
}

export async function verifyProductFormContract(
  fixture: ComponentFixture<unknown>,
  prefix: 'reactive' | 'signal',
): Promise<void> {
  await fixture.whenStable();
  const host = fixture.nativeElement as HTMLElement;

  submit(host);
  await fixture.whenStable();
  expect(host.textContent).toContain('nombre');
  expect(host.querySelector('[data-testid="submitted-payload"]')).toBeNull();

  setInput(host, `#${prefix}-name`, 'Teclado compacto');
  setSelect(host, `#${prefix}-category`, 'hardware');
  await fixture.whenStable();
  setSelect(host, `#${prefix}-subcategory`, 'keyboards');
  setInput(host, `#${prefix}-base-price`, '100');
  setInput(host, `#${prefix}-sale-price`, '120');
  setInput(host, `#${prefix}-stock`, '4');

  submit(host);
  await fixture.whenStable();
  expect(host.textContent).toContain('inferior al precio base');
  expect(host.querySelector('[data-testid="submitted-payload"]')).toBeNull();

  setInput(host, `#${prefix}-sale-price`, '80');
  setSelect(host, `#${prefix}-category`, 'software');
  await fixture.whenStable();
  const subcategory = host.querySelector(`#${prefix}-subcategory`) as HTMLSelectElement;
  expect(subcategory.value).toBe('');
  setSelect(host, `#${prefix}-subcategory`, 'development');

  submit(host);
  await fixture.whenStable();
  const payload = host.querySelector('[data-testid="submitted-payload"]');
  expect(payload?.textContent).toContain('Teclado compacto');
  expect(payload?.textContent).toContain('development');
}
