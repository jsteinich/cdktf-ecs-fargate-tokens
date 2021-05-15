import { TerraformSetAttribute } from "./terraform-set-attribute";
import { TerraformAttribute } from "./terraform-attribute";
import { listMapper, anyToTerraform } from "cdktf";
import { TerraformAny } from "./terraform-any-attribute";
import { ITerraformAddressable } from "./terraform-addressable";

export class TerraformAnySetAttribute extends TerraformSetAttribute {
    public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: TerraformAny[] /* Set<T> isn't supported by jsii */, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): TerraformAny[] /* Set<T> isn't supported by jsii */ | undefined {
        return this.realValue;
    }

    public static Create(parent: ITerraformAddressable, terraformAttribute: string, value: TerraformAnySet) {
        if (!(value instanceof TerraformAnySetAttribute)) {
            return new TerraformAnySetAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformAnySetAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        //TODO make a setMapper which iterates over the set
        return listMapper(anyToTerraform)(this.value);
    }
}

export type TerraformAnySet = TerraformAny[] /* Set<T> isn't supported by jsii */ | TerraformAnySetAttribute;