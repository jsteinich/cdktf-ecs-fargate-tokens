// https://www.terraform.io/docs/providers/aws/r/subnet.html
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';
import { TerraformString, TerraformStringAttribute } from '../tf_attributes/terraform-string-attribute';
import { TerraformAttributeOptions } from '../tf_attributes/terraform-attribute';
import { TerraformObjectAttribute } from '../tf_attributes/terraform-object-attribute';
import { ITerraformAddressable } from '../tf_attributes/terraform-addressable';

// Configuration

export interface SubnetConfig extends cdktf.TerraformMetaArguments {
  readonly assignIpv6AddressOnCreation?: boolean;
  readonly availabilityZone?: string;
  readonly availabilityZoneId?: string;
  readonly cidrBlock: string;
  readonly customerOwnedIpv4Pool?: string;
  readonly ipv6CidrBlock?: string;
  readonly mapCustomerOwnedIpOnLaunch?: boolean;
  readonly mapPublicIpOnLaunch?: boolean;
  readonly outpostArn?: string;
  readonly tags?: { [key: string]: string };
  readonly tagsAll?: { [key: string]: string };
  readonly vpcId: TerraformString;
  /** timeouts block */
  readonly timeouts?: SubnetTimeouts;
}
export interface SubnetTimeouts {
  readonly create?: string;
  readonly delete?: string;
}

// This isn't the best example since I'm not actually sure timeouts can be referenced (nor any reason to), but should be the same principal for any object type
export class TerraformSubnetTimeoutsAttribute extends TerraformObjectAttribute {
  public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: SubnetTimeouts, options?: TerraformAttributeOptions) {
    super(parent, terraformAttribute, value, options);
  }

  // I don't think we need to expose this since can get at everything in it
  private get value(): SubnetTimeouts | undefined {
    return this.realValue;
  }

  public static Create(parent: ITerraformAddressable, terraformAttribute: string, value: TerraformSubnetTimeouts) {
    if (!(value instanceof TerraformSubnetTimeoutsAttribute)) {
        return new TerraformSubnetTimeoutsAttribute(parent, terraformAttribute, value);
    }
    else if (value.parent === parent) {
        return value;
    }
    else {
        return new TerraformSubnetTimeoutsAttribute(parent, terraformAttribute, value.value, { nested: value });
    }
  }

  protected valueToTerraform() {
    return subnetTimeoutsToTerraform(this.realValue);
  }

  public get create(): TerraformStringAttribute {
    return new TerraformStringAttribute(this, 'create', this.value?.create);
  }

  public get delete(): TerraformStringAttribute {
    return new TerraformStringAttribute(this, 'delete', this.value?.delete);
  }
}

export type TerraformSubnetTimeouts = SubnetTimeouts | TerraformSubnetTimeoutsAttribute;

function subnetTimeoutsToTerraform(struct?: SubnetTimeouts): any {
  if (!cdktf.canInspect(struct)) { return struct; }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}


// Resource

export class Subnet extends cdktf.TerraformResource {

  // ===========
  // INITIALIZER
  // ===========

  public constructor(scope: Construct, id: string, config: SubnetConfig) {
    super(scope, id, {
      terraformResourceType: 'aws_subnet',
      terraformGeneratorMetadata: {
        providerName: 'aws'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle
    });
    this._assignIpv6AddressOnCreation = config.assignIpv6AddressOnCreation;
    this._availabilityZone = config.availabilityZone;
    this._availabilityZoneId = config.availabilityZoneId;
    this._cidrBlock = config.cidrBlock;
    this._customerOwnedIpv4Pool = config.customerOwnedIpv4Pool;
    this._ipv6CidrBlock = config.ipv6CidrBlock;
    this._mapCustomerOwnedIpOnLaunch = config.mapCustomerOwnedIpOnLaunch;
    this._mapPublicIpOnLaunch = config.mapPublicIpOnLaunch;
    this._outpostArn = config.outpostArn;
    this._tags = config.tags;
    this._tagsAll = config.tagsAll;
    this.putVpcId(config.vpcId);
    this.putTimeouts(config.timeouts ?? new TerraformSubnetTimeoutsAttribute(this, 'timeouts'));
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // arn - computed: true, optional: false, required: false
  public get arn() {
    return this.getStringAttribute('arn');
  }

  // assign_ipv6_address_on_creation - computed: false, optional: true, required: false
  private _assignIpv6AddressOnCreation?: boolean;
  public get assignIpv6AddressOnCreation() {
    return this.getBooleanAttribute('assign_ipv6_address_on_creation');
  }
  public set assignIpv6AddressOnCreation(value: boolean ) {
    this._assignIpv6AddressOnCreation = value;
  }
  public resetAssignIpv6AddressOnCreation() {
    this._assignIpv6AddressOnCreation = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get assignIpv6AddressOnCreationInput() {
    return this._assignIpv6AddressOnCreation
  }

  // availability_zone - computed: true, optional: true, required: false
  private _availabilityZone?: string;
  public get availabilityZone() {
    return this.getStringAttribute('availability_zone');
  }
  public set availabilityZone(value: string) {
    this._availabilityZone = value;
  }
  public resetAvailabilityZone() {
    this._availabilityZone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get availabilityZoneInput() {
    return this._availabilityZone
  }

  // availability_zone_id - computed: true, optional: true, required: false
  private _availabilityZoneId?: string;
  public get availabilityZoneId() {
    return this.getStringAttribute('availability_zone_id');
  }
  public set availabilityZoneId(value: string) {
    this._availabilityZoneId = value;
  }
  public resetAvailabilityZoneId() {
    this._availabilityZoneId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get availabilityZoneIdInput() {
    return this._availabilityZoneId
  }

  // cidr_block - computed: false, optional: false, required: true
  private _cidrBlock: string;
  public get cidrBlock() {
    return this.getStringAttribute('cidr_block');
  }
  public set cidrBlock(value: string) {
    this._cidrBlock = value;
  }
  // Temporarily expose input value. Use with caution.
  public get cidrBlockInput() {
    return this._cidrBlock
  }

  // customer_owned_ipv4_pool - computed: false, optional: true, required: false
  private _customerOwnedIpv4Pool?: string;
  public get customerOwnedIpv4Pool() {
    return this.getStringAttribute('customer_owned_ipv4_pool');
  }
  public set customerOwnedIpv4Pool(value: string ) {
    this._customerOwnedIpv4Pool = value;
  }
  public resetCustomerOwnedIpv4Pool() {
    this._customerOwnedIpv4Pool = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customerOwnedIpv4PoolInput() {
    return this._customerOwnedIpv4Pool
  }

  // id - computed: true, optional: true, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // ipv6_cidr_block - computed: false, optional: true, required: false
  private _ipv6CidrBlock?: string;
  public get ipv6CidrBlock() {
    return this.getStringAttribute('ipv6_cidr_block');
  }
  public set ipv6CidrBlock(value: string ) {
    this._ipv6CidrBlock = value;
  }
  public resetIpv6CidrBlock() {
    this._ipv6CidrBlock = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipv6CidrBlockInput() {
    return this._ipv6CidrBlock
  }

  // ipv6_cidr_block_association_id - computed: true, optional: false, required: false
  public get ipv6CidrBlockAssociationId() {
    return this.getStringAttribute('ipv6_cidr_block_association_id');
  }

  // map_customer_owned_ip_on_launch - computed: false, optional: true, required: false
  private _mapCustomerOwnedIpOnLaunch?: boolean;
  public get mapCustomerOwnedIpOnLaunch() {
    return this.getBooleanAttribute('map_customer_owned_ip_on_launch');
  }
  public set mapCustomerOwnedIpOnLaunch(value: boolean ) {
    this._mapCustomerOwnedIpOnLaunch = value;
  }
  public resetMapCustomerOwnedIpOnLaunch() {
    this._mapCustomerOwnedIpOnLaunch = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get mapCustomerOwnedIpOnLaunchInput() {
    return this._mapCustomerOwnedIpOnLaunch
  }

  // map_public_ip_on_launch - computed: false, optional: true, required: false
  private _mapPublicIpOnLaunch?: boolean;
  public get mapPublicIpOnLaunch() {
    return this.getBooleanAttribute('map_public_ip_on_launch');
  }
  public set mapPublicIpOnLaunch(value: boolean ) {
    this._mapPublicIpOnLaunch = value;
  }
  public resetMapPublicIpOnLaunch() {
    this._mapPublicIpOnLaunch = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get mapPublicIpOnLaunchInput() {
    return this._mapPublicIpOnLaunch
  }

  // outpost_arn - computed: false, optional: true, required: false
  private _outpostArn?: string;
  public get outpostArn() {
    return this.getStringAttribute('outpost_arn');
  }
  public set outpostArn(value: string ) {
    this._outpostArn = value;
  }
  public resetOutpostArn() {
    this._outpostArn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get outpostArnInput() {
    return this._outpostArn
  }

  // owner_id - computed: true, optional: false, required: false
  public get ownerId() {
    return this.getStringAttribute('owner_id');
  }

  // tags - computed: false, optional: true, required: false
  private _tags?: { [key: string]: string };
  public get tags() {
    return this.interpolationForAttribute('tags') as any;
  }
  public set tags(value: { [key: string]: string } ) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags
  }

  // tags_all - computed: true, optional: true, required: false
  private _tagsAll?: { [key: string]: string }
  public get tagsAll(): { [key: string]: string } {
    return this.interpolationForAttribute('tags_all') as any; // Getting the computed value is not yet implemented
  }
  public set tagsAll(value: { [key: string]: string }) {
    this._tagsAll = value;
  }
  public resetTagsAll() {
    this._tagsAll = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsAllInput() {
    return this._tagsAll
  }

  // vpc_id - computed: false, optional: false, required: true
  private _vpcId!: TerraformStringAttribute;
  public get vpcId(): TerraformStringAttribute {
    return this._vpcId;
  }
  public putVpcId(value: TerraformString) {
    this._vpcId = TerraformStringAttribute.Create(this, 'vpc_id', value);
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts!: TerraformSubnetTimeoutsAttribute;
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: TerraformSubnetTimeouts | undefined) {
    if(value === undefined){
      this._timeouts.reset();
    }
    else {
      this._timeouts = TerraformSubnetTimeoutsAttribute.Create(this, 'timeouts', value);
    }
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      assign_ipv6_address_on_creation: cdktf.booleanToTerraform(this._assignIpv6AddressOnCreation),
      availability_zone: cdktf.stringToTerraform(this._availabilityZone),
      availability_zone_id: cdktf.stringToTerraform(this._availabilityZoneId),
      cidr_block: cdktf.stringToTerraform(this._cidrBlock),
      customer_owned_ipv4_pool: cdktf.stringToTerraform(this._customerOwnedIpv4Pool),
      ipv6_cidr_block: cdktf.stringToTerraform(this._ipv6CidrBlock),
      map_customer_owned_ip_on_launch: cdktf.booleanToTerraform(this._mapCustomerOwnedIpOnLaunch),
      map_public_ip_on_launch: cdktf.booleanToTerraform(this._mapPublicIpOnLaunch),
      outpost_arn: cdktf.stringToTerraform(this._outpostArn),
      tags: cdktf.hashMapper(cdktf.anyToTerraform)(this._tags),
      tags_all: cdktf.hashMapper(cdktf.anyToTerraform)(this._tagsAll),
      vpc_id: this._vpcId.toTerraform(),
      timeouts: this._timeouts.toTerraform(),
    };
  }
}
