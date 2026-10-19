import { computed, Directive, input } from '@angular/core';

@Directive({
  selector: '[appHighlightMatch]',
  host: {
    '[class.search-match]': 'matches()',
  },
})
export class HighlightMatchDirective {
  readonly query = input('', { alias: 'appHighlightMatch' });
  readonly text = input.required<string>({ alias: 'appHighlightText' });

  readonly matches = computed(() => {
    // TODO: normaliza query y text y devuelve si existe coincidencia.
    return false;
  });
}
