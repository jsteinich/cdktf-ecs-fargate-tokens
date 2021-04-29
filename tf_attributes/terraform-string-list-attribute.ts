import { TerraformListAttribute } from "./terraform-list-attribute";
import { TerraformInterpolable } from "./terraform-interpolable";
import { TerraformAttribute } from "./terraform-attribute";
import { listMapper, stringToTerraform } from "cdktf";
import { TerraformString, TerraformStringAttribute } from "./terraform-string-attribute";

export class TerraformStringListAttribute extends TerraformListAttribute {
    public constructor(parent: TerraformInterpolable, terraformAttribute: string, value?: TerraformString[], nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): TerraformString[] | undefined {
        return this.realValue;
    }

    public set value(val: TerraformString[] | undefined) {
        this.realValue = val;
    }

    public get(index: number): TerraformStringAttribute {
        return new TerraformStringAttribute(this, `[${index}]`);
    }

    public static Create(parent: TerraformInterpolable, terraformAttribute: string, value: TerraformStringList) {
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