import { TerraformListAttribute } from "./terraform-list-attribute";
import { TerraformAttribute } from "./terraform-attribute";
import { listMapper, anyToTerraform } from "cdktf";
import { TerraformAny, TerraformAnyAttribute } from "./terraform-any-attribute";
import { ITerraformAddressable } from "./terraform-addressable";

export class TerraformAnyListAttribute extends TerraformListAttribute {
    public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: TerraformAny[], nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): TerraformAny[] | undefined {
        return this.realValue;
    }

    public get(index: number): TerraformAnyAttribute {
        return new TerraformAnyAttribute(this, index.toString());
    }

    public static Create(parent: ITerraformAddressable, terraformAttribute: string, value: TerraformAnyList) {
        if (!(value instanceof TerraformAnyListAttribute)) {
            return new TerraformAnyListAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformAnyListAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        return listMapper(anyToTerraform)(this.value);
    }
}

export type TerraformAnyList = TerraformAny[] | TerraformAnyListAttribute;