import { TerraformListAttribute } from "./terraform-list-attribute";
import { TerraformInterpolable } from "./terraform-interpolable";
import { TerraformAttribute } from "./terraform-attribute";
import { listMapper, numberToTerraform } from "cdktf";
import { TerraformNumber, TerraformNumberAttribute } from "./terraform-number-attribute";

export class TerraformNumberListAttribute extends TerraformListAttribute {
    public constructor(parent: TerraformInterpolable, terraformAttribute: string, value?: TerraformNumber[], nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }

    public get value(): TerraformNumber[] | undefined {
        return this.realValue;
    }

    public get(index: number): TerraformNumberAttribute {
        return new TerraformNumberAttribute(this, `[${index}]`);
    }

    public static Create(parent: TerraformInterpolable, terraformAttribute: string, value: TerraformNumberList) {
        if (!(value instanceof TerraformNumberListAttribute)) {
            return new TerraformNumberListAttribute(parent, terraformAttribute, value);
        }
        else if (value.parent === parent) {
            return value;
        }
        else {
            return new TerraformNumberListAttribute(parent, terraformAttribute, value.value, value);
        }
    }

    protected valueToTerraform() {
        return listMapper(numberToTerraform)(this.value);
    }
}

export type TerraformNumberList = TerraformNumber[] | TerraformNumberListAttribute;