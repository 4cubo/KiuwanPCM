# ng2-slide-toggle

This is a slide toggle switch with dynamic color and text depending on the state.


## Usage

```bash
npm install --save ng2-slide-toggle
```

```typescript
import { SlideToggleModule } from 'ng2-slide-toggle';

@NgModule({
  ...
  imports: [
    ...
    SlideToggleModule,
    ...
  ],
  ...
})
```

```html
<slide-toggle></slide-toggle>
```

## @Input() and @Output() with defaults

```typescript
  @Input() onText = 'ON';
  @Input() offText = 'OFF';
  @Input() onColor = '#0088cc';
  @Input() value = false;

  @Output() valueChange = new EventEmitter<boolean>();
```