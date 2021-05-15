import { TerraformAttribute } from "./terraform-attribute";
import { booleanToTerraform } from "cdktf";
import { ITerraformAddressable } from "./terraform-addressable";

export class TerraformBooleanAttribute extends TerraformAttribute {
    public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: boolean, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): boolean | undefined {
        return this.realValue;
    }

    public static Create(parent: ITerraformAddressable, terraformAttribute: string, value: TerraformBoolean) {
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