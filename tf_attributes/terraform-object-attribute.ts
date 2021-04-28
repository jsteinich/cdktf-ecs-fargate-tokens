import { TerraformAttribute } from "./terraform-attribute";
import { TerraformInterpolable } from "./terraform-interpolable";

export abstract class TerraformObjectAttribute extends TerraformAttribute implements TerraformInterpolable {
    public constructor(parent: TerraformInterpolable, terraformAttribute: string, value?: any, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public interpolationForAttribute(attribute: string | undefined): string {
        return this.parent.interpolationForAttribute(`${this.terraformAttribute}.${attribute}`);
      }
}