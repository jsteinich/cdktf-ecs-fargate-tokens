import { TerraformListAttribute } from "./terraform-list-attribute";
import { TerraformAttribute } from "./terraform-attribute";
import { listMapper, booleanToTerraform } from "cdktf";
import { TerraformBoolean, TerraformBooleanAttribute } from "./terraform-boolean-attribute";
import { ITerraformAddressable } from "./terraform-addressable";

export class TerraformBooleanListAttribute extends TerraformListAttribute {
    public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: TerraformBoolean[], nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): TerraformBoolean[] | undefined {
        return this.realValue;
    }

    public get(index: number): TerraformBooleanAttribute {
        return new TerraformBooleanAttribute(this, index.toString());
    }

    public static Create(parent: ITerraformAddressable, terraformAttribute: string, value: TerraformBooleanList) {
        if (!(value instanceof TerraformBooleanListAttribute)) {
            return new TerraformBooleanListAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformBooleanListAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        return listMapper(booleanToTerraform)(this.value);
    }
}

export type TerraformBooleanList = TerraformBoolean[] | TerraformBooleanListAttribute;