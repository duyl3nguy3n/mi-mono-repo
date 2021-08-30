import { ComponentHarness } from '@angular/cdk/testing';

export class SingleSelectComponentHarness extends ComponentHarness {
  static hostSelector = 'silo-single-select';

  protected getRootElement = this.locatorFor(
    `.${SingleSelectComponentHarness.hostSelector}`,
  );
  protected getLabelElement = this.locatorFor('.silo-label');
  protected getInputElement = this.locatorFor('.mat-select');
  protected getPlaceholderElement = this.locatorFor('.mat-select-placeholder');
  protected getHintElement = this.locatorFor('.mat-hint');

  async getLabel() {
    const labelElement = await this.getLabelElement();
    return labelElement.text();
  }

  async getLabelId() {
    const labelElement = await this.getLabelElement();
    return labelElement.getAttribute('id');
  }

  async getPlaceholder() {
    const placeholderElement = await this.getPlaceholderElement();
    return placeholderElement.text();
  }

  async getHint() {
    const hintElement = await this.getHintElement();
    return hintElement.text();
  }

  async isReadOnly() {
    const inputElement = await this.getInputElement();
    return (await inputElement.getAttribute('readonly')) == 'true';
  }

  async hasError() {
    const rootElement = await this.getRootElement();
    const hasError = await rootElement.hasClass(`silo-form-field--has-error`);
    return hasError;
  }
}
