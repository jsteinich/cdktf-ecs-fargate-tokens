import { TerraformAttribute } from "./terraform-attribute";
import { TerraformInterpolable } from "./terraform-interpolable";
import { stringToTerraform } from "cdktf";

export class TerraformStringAttribute extends TerraformAttribute {
    public constructor(parent: TerraformInterpolable, terraformAttribute: string, value?: string, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): string | undefined {
        return this.realValue;
    }

    public set value(val: string | undefined) {
        this.realValue = val;
    }

    public static Create(parent: TerraformInterpolable, terraformAttribute: string, value: TerraformString) {
        if (typeof(value) === 'string') {
            return new TerraformStringAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformStringAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        return stringToTerraform(this.value);
    }
}

export type TerraformString = string | TerraformStringAttribute;