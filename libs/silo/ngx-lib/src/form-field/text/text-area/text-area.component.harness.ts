import { ComponentHarness } from '@angular/cdk/testing';

export class TextAreaComponentHarness extends ComponentHarness {
  static hostSelector = 'silo-text-area';

  protected getRootElement = this.locatorFor(
    `.${TextAreaComponentHarness.hostSelector}`,
  );
  protected getLabelElement = this.locatorFor('.silo-label');
  protected getInputElement = this.locatorFor('textarea');
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
    const textAreaElement = await this.getInputElement();
    return textAreaElement.getAttribute('placeholder');
  }

  async getHint() {
    const hintElement = await this.getHintElement();
    return hintElement.text();
  }

  async isReadOnly() {
    const textAreaElement = await this.getInputElement();
    return (await textAreaElement.getAttribute('readonly')) == 'true';
  }

  async hasError() {
    const rootElement = await this.getRootElement();
    const hasError = await rootElement.hasClass(`silo-form-field--has-error`);
    return hasError;
  }
}
