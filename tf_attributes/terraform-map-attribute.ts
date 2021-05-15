import { TerraformAttribute } from "./terraform-attribute";
import { ITerraformAddressable } from "./terraform-addressable";

export abstract class TerraformMapAttribute extends TerraformAttribute {
    public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: { [key: string]: any }, nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }
}