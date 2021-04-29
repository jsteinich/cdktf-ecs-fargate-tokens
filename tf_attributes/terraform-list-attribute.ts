import { TerraformAttribute } from "./terraform-attribute";
import { TerraformInterpolable } from "./terraform-interpolable";

export abstract class TerraformListAttribute extends TerraformAttribute implements TerraformInterpolable {
    public constructor(parent: TerraformInterpolable, terraformAttribute: string, value?: any, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public interpolationForAttribute(_attribute: string | undefined): string {
        return this.parent.interpolationForAttribute(this.terraformAttribute);
    }
}