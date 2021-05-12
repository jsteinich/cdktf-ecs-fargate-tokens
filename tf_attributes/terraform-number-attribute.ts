import { TerraformAttribute } from "./terraform-attribute";
import { TerraformInterpolable } from "./terraform-interpolable";
import { numberToTerraform } from "cdktf";

export class TerraformNumberAttribute extends TerraformAttribute {
    public constructor(parent: TerraformInterpolable, terraformAttribute: string, value?: number, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): number | undefined {
        return this.realValue;
    }

    public static Create(parent: TerraformInterpolable, terraformAttribute: string, value: TerraformNumber) {
        if (typeof(value) === 'number') {
            return new TerraformNumberAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformNumberAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        return numberToTerraform(this.value);
    }
}

export type TerraformNumber = number | TerraformNumberAttribute;