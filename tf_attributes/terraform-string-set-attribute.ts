import { TerraformSetAttribute } from "./terraform-set-attribute";
import { TerraformAttribute } from "./terraform-attribute";
import { listMapper, stringToTerraform } from "cdktf";
import { TerraformString } from "./terraform-string-attribute";
import { ITerraformAddressable } from "./terraform-addressable";

export class TerraformStringSetAttribute extends TerraformSetAttribute {
    public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: TerraformString[] /* Set<T> isn't supported by jsii */, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): TerraformString[] /* Set<T> isn't supported by jsii */ | undefined {
        return this.realValue;
    }

    public static Create(parent: ITerraformAddressable, terraformAttribute: string, value: TerraformStringSet) {
        if (!(value instanceof TerraformStringSetAttribute)) {
            return new TerraformStringSetAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformStringSetAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        //TODO make a setMapper which iterates over the set
        return listMapper(stringToTerraform)(this.value);
    }
}

export type TerraformStringSet = TerraformString[] /* Set<T> isn't supported by jsii */ | TerraformStringSetAttribute;