import { TerraformAttribute } from "./terraform-attribute";
import { TerraformInterpolable } from "./terraform-interpolable";
import { booleanToTerraform } from "cdktf";

export class TerraformBooleanAttribute extends TerraformAttribute {
    public constructor(parent: TerraformInterpolable, terraformAttribute: string, value?: boolean, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): boolean | undefined {
        return this.realValue;
    }

    public set value(val: boolean | undefined) {
        this.realValue = val;
    }

    public static Create(parent: TerraformInterpolable, terraformAttribute: string, value: TerraformBoolean) {
        if (typeof(value) === 'boolean') {
            return new TerraformBooleanAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformBooleanAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        return booleanToTerraform(this.value);
    }
}

export type TerraformBoolean = boolean | TerraformBooleanAttribute;