import { TerraformAttribute } from "./terraform-attribute";
import { hashMapper, stringToTerraform } from "cdktf";
import { TerraformMapAttribute } from "./terraform-map-attribute";
import { TerraformString, TerraformStringAttribute } from "./terraform-string-attribute";
import { ITerraformAddressable } from "./terraform-addressable";

export class TerraformStringMapAttribute extends TerraformMapAttribute {
    public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: { [key: string]: TerraformString }, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): { [key: string]: TerraformString } | undefined {
        return this.realValue;
    }

    public get(key: string): TerraformStringAttribute {
        return new TerraformStringAttribute(this, `${key}`);
    }

    public static Create(parent: ITerraformAddressable, terraformAttribute: string, value: TerraformStringMap) {
        if (!(value instanceof TerraformStringMapAttribute)) {
            return new TerraformStringMapAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformStringMapAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        return hashMapper(stringToTerraform)(this.value);
    }
}

export type TerraformStringMap = { [key: string]: TerraformString } | TerraformStringMapAttribute;