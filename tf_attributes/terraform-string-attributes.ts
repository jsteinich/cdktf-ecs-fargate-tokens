import { TerraformAttribute } from "./terraform-attribute";
import { TerraformInterpolable } from "./terraform-interpolable";

export class TerraformStringAttribute extends TerraformAttribute {
    public constructor(parent: TerraformInterpolable, terraformAttribute: string, public value?: string) {
        super(parent, terraformAttribute);
    }
}

export type TerraformString = string | TerraformStringAttribute;