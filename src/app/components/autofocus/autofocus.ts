import { CommonModule } from '@angular/common';
import { Directive, ElementRef, Input, NgModule, booleanAttribute } from '@angular/core';
import { DomHandler } from 'primeng/dom';
/**
 * AutoFocus manages focus on focusable element on load.
 * @group Components
 */
@Directive({
    selector: '[pAutoFocus]',
    host: {
        class: 'p-element'
    }
})
export class AutoFocus {
    constructor(private host: ElementRef) {}
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean = false;

    focused: boolean = false;

    ngAfterContentChecked() {
        // This sets the `attr.autofocus` which is different than the Input `autofocus` attribute.
        if (this.autofocus === false) {
            this.host.nativeElement.removeAttribute('autofocus');
        } else {
            this.host.nativeElement.setAttribute('autofocus', true);
        }

        if (!this.focused) {
            if (this.autofocus) {
                setTimeout(() => {
                    const focusableElements = DomHandler.getFocusableElements(this.host.nativeElement);

                    if (focusableElements.length === 0) {
                        this.host.nativeElement.focus();
                    }
                    if (focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }

                    this.focused = true;
                });
            }
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [AutoFocus],
    declarations: [AutoFocus]
})
export class AutoFocusModule {}
