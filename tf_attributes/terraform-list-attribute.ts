import { TerraformAttribute } from "./terraform-attribute";
import { ITerraformAddressable } from "./terraform-addressable";

export abstract class TerraformListAttribute extends TerraformAttribute {
    public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: any[], nestedAttribute?: TerraformAttribute) {
        super(parent, terraformAttribute, value, nestedAttribute);
    }
}