import { TerraformSetAttribute } from "./terraform-set-attribute";
import { TerraformAttribute } from "./terraform-attribute";
import { listMapper, booleanToTerraform } from "cdktf";
import { TerraformBoolean } from "./terraform-boolean-attribute";
import { ITerraformAddressable } from "./terraform-addressable";

export class TerraformBooleanSetAttribute extends TerraformSetAttribute {
    public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: TerraformBoolean[] /* Set<T> isn't supported by jsii */, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): TerraformBoolean[] /* Set<T> isn't supported by jsii */ | undefined {
        return this.realValue;
    }

    public static Create(parent: ITerraformAddressable, terraformAttribute: string, value: TerraformBooleanSet) {
        if (!(value instanceof TerraformBooleanSetAttribute)) {
            return new TerraformBooleanSetAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformBooleanSetAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        //TODO make a setMapper which iterates over the set
        return listMapper(booleanToTerraform)(this.value);
    }
}

export type TerraformBooleanSet = TerraformBoolean[] /* Set<T> isn't supported by jsii */ | TerraformBooleanSetAttribute;