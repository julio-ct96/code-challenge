import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-warning-icon',
  imports: [],
  templateUrl: './warning-icon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarningIcon {
  readonly size: InputSignal<string> = input<string>('1.5rem');
}
