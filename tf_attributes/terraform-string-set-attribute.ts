import { TerraformSetAttribute } from "./terraform-set-attribute";
import { TerraformAttributeOptions } from "./terraform-attribute";
import { listMapper, stringToTerraform } from "cdktf";
import { TerraformString } from "./terraform-string-attribute";
import { ITerraformAddressable } from "./terraform-addressable";
import { TerraformStringListAttribute } from "./terraform-string-list-attribute";

export class TerraformStringSetAttribute extends TerraformSetAttribute {
    public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: TerraformString[] /* Set<T> isn't supported by jsii */, options?: TerraformAttributeOptions) {
        super(parent, terraformAttribute, value, options);
    }

    public get value(): TerraformString[] /* Set<T> isn't supported by jsii */ | undefined {
        return this.realValue;
    }

    public toList(): TerraformStringListAttribute {
        return new TerraformStringListAttribute(this.parent, this.terraformAttribute, this.value, { nested: this.nested, operation: fqn => `tolist(${fqn})` });
    }

    public static Create(parent: ITerraformAddressable, terraformAttribute: string, value: TerraformStringSet) {
        if (!(value instanceof TerraformStringSetAttribute)) {
            return new TerraformStringSetAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformStringSetAttribute(parent, terraformAttribute, value.value, { nested: value });
        }
    }

    protected valueToTerraform() {
        //TODO make a setMapper which iterates over the set
        return listMapper(stringToTerraform)(this.value);
    }
}

export type TerraformStringSet = TerraformString[] /* Set<T> isn't supported by jsii */ | TerraformStringSetAttribute;