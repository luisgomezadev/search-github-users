import { FormControl } from "@angular/forms";

export function searchValidator() {
  return (control: FormControl) => {
    const value = (control.value || '').trim();
    if (!value) return { required: true };
    if (value.toLowerCase() === 'doublevpartners') return null;
    if (value.length < 4) return { minlength: { requiredLength: 4, actualLength: value.length } };
    return null;
  };
}
