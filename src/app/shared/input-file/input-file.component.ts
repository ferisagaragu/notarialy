import { Component, forwardRef, Host, Optional, SkipSelf } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFileComponent),
      multi: true
    }
  ]
})
export class InputFileComponent implements ControlValueAccessor {

  icon: string;
  showCancelButton: boolean;
  disabled: boolean;

  private value: File | string;
  private onChange: Function;
  private onTouch: Function;

  private inputFile: HTMLInputElement;
  private defaultIcon: string;
  private readonly defaultValue: File;

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer
  ) {
    this.inputFile = document.createElement('input');
    this.defaultIcon = environment.logoIconDefault;
    this.defaultValue = new File([], "undefined");

    this.icon = this.defaultIcon;
    this.showCancelButton = false;

    this.addOnChangeListener();
  }

  writeValue(value: File | string): void {
    this.value = value;
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
    fn(this.defaultValue);

    if (this.value && (typeof this.value === 'string')) {
      this.defaultIcon = this.value;
      this.icon = this.value;
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  addOnChangeListener(): void {
    this.inputFile.addEventListener('change', _ => {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.icon = e.target.result.toString();
        this.showCancelButton = true;
        this.onChange(this.inputFile.files[0]);
      }

      reader.readAsDataURL(this.inputFile.files[0]);
    });
  }

  openFileDialog(): void {
    this.inputFile.type = 'file';
    this.inputFile.accept = 'image/x-png, image/gif, image/jpeg';
    this.inputFile.click();
  }

  unselectFile(): void {
    this.icon = this.defaultIcon;
    this.showCancelButton = false;
    this.onChange(this.defaultValue);
  }

}
