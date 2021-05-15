import { TerraformListAttribute } from "./terraform-list-attribute";
import { TerraformAttribute } from "./terraform-attribute";
import { listMapper, stringToTerraform } from "cdktf";
import { TerraformString, TerraformStringAttribute } from "./terraform-string-attribute";
import { ITerraformAddressable } from "./terraform-addressable";

export class TerraformStringListAttribute extends TerraformListAttribute {
    public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: TerraformString[], nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): TerraformString[] | undefined {
        return this.realValue;
    }

    public get(index: number): TerraformStringAttribute {
        return new TerraformStringAttribute(this, index.toString());
    }

    public static Create(parent: ITerraformAddressable, terraformAttribute: string, value: TerraformStringList) {
        if (!(value instanceof TerraformStringListAttribute)) {
            return new TerraformStringListAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformStringListAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        return listMapper(stringToTerraform)(this.value);
    }
}

export type TerraformStringList = TerraformString[] | TerraformStringListAttribute;