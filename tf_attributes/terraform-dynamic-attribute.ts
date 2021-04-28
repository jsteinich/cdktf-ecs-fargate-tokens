import { TerraformAttribute } from "./terraform-attribute";
import { TerraformInterpolable } from "./terraform-interpolable";
import { hashMapper, anyToTerraform } from "cdktf";

export class TerraformDynamicAttribute extends TerraformAttribute {
    public constructor(parent: TerraformInterpolable, terraformAttribute: string, value?: { [key: string]: any }, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): { [key: string]: any } | undefined {
        return this.realValue;
    }

    public set value(val: { [key: string]: any } | undefined) {
        this.realValue = val;
    }

    public static Create(parent: TerraformInterpolable, terraformAttribute: string, value: TerraformDynamic) {
        if (!(value instanceof TerraformDynamicAttribute)) {
            return new TerraformDynamicAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformDynamicAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        return hashMapper(anyToTerraform)(this.value);
    }
}

export type TerraformDynamic = { [key: string]: any } | TerraformDynamicAttribute;